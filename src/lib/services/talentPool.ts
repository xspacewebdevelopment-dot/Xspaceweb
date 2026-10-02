import { db } from "@/lib/db";
import {
  talentProfiles,
  careerOpenings,
  careerApplications,
  TalentProfile,
  OpeningSnapshot,
  ConversionRecord,
} from "@/lib/db/schema";
import { sql, eq, and } from "drizzle-orm";
import { generateApplicationId } from "@/lib/services/applications";

/**
 * Generate a readable unique Profile ID like TP-2026-0001
 * Server-only database helper
 */
export async function generateTalentProfileId(): Promise<string> {
  const currentYear = new Date().getFullYear();
  const prefix = `TP-${currentYear}-`;

  try {
    const result = await db
      .select({
        count: sql<number>`count(*)::int`,
      })
      .from(talentProfiles)
      .where(sql`${talentProfiles.profileId} LIKE ${prefix + "%"}`);

    const nextNumber = (result[0]?.count || 0) + 1;
    const formattedNumber = String(nextNumber).padStart(4, "0");
    const candidateId = `${prefix}${formattedNumber}`;

    // Verify uniqueness
    const exists = await db
      .select({ id: talentProfiles.id })
      .from(talentProfiles)
      .where(sql`${talentProfiles.profileId} = ${candidateId}`)
      .limit(1);

    if (exists.length > 0) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      return `${prefix}${formattedNumber}-${randomSuffix}`;
    }

    return candidateId;
  } catch {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomSuffix}`;
  }
}

/**
 * Check for duplicate talent submission (same normalized email within last 24 hours)
 * Server-only database helper
 */
export async function isDuplicateTalentProfile(email: string): Promise<boolean> {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const existing = await db
      .select({ id: talentProfiles.id })
      .from(talentProfiles)
      .where(
        sql`LOWER(${talentProfiles.email}) = ${normalizedEmail} AND ${talentProfiles.submittedAt} >= ${twentyFourHoursAgo}`
      )
      .limit(1);

    return existing.length > 0;
  } catch (err) {
    console.error("Error checking duplicate talent profile:", err);
    return false;
  }
}

export interface ConvertTalentProfileParams {
  talentProfileId: string;
  openingId: string;
  convertedByEmail: string;
  initialStatus?: string;
  availability?: string;
  preferredWorkMode?: string;
  experience?: string;
  expectedStartDate?: string | null;
  currentRole?: string | null;
  currentCompany?: string | null;
  highestQualification?: string | null;
  college?: string | null;
}

export interface ConversionResult {
  success: boolean;
  error?: string;
  applicationId?: string;
  applicationDbId?: string;
  openingTitle?: string;
}

/**
 * Convert a Talent Profile to a Career Application
 * Validates opening, prevents duplicates for the same opening, creates application, updates talent profile
 */
export async function convertTalentProfileToApplication(
  params: ConvertTalentProfileParams
): Promise<ConversionResult> {
  try {
    // 1. Fetch Talent Profile
    const [profile] = await db
      .select()
      .from(talentProfiles)
      .where(eq(talentProfiles.id, params.talentProfileId))
      .limit(1);

    if (!profile) {
      return { success: false, error: "Talent profile not found." };
    }

    // 2. Fetch Selected Career Opening
    const [opening] = await db
      .select()
      .from(careerOpenings)
      .where(eq(careerOpenings.id, params.openingId))
      .limit(1);

    if (!opening) {
      return { success: false, error: "Selected career opening not found." };
    }

    // Rule: Only currently published openings can be converted into
    if (opening.status !== "published") {
      return {
        success: false,
        error: `Selected opening is "${opening.status}" and no longer accepting applications. Please select a published opening.`,
      };
    }

    // 3. Prevent duplicate conversion for the SAME opening
    const existingConversion = (profile.conversionHistory || []).find(
      (c) => c.openingId === opening.id
    );

    if (existingConversion) {
      return {
        success: false,
        error: `This candidate has already been converted to "${opening.title}" (Application: ${existingConversion.applicationCode || existingConversion.applicationId}).`,
      };
    }

    // Also check direct DB check on careerApplications
    const existingApp = await db
      .select({ id: careerApplications.id, applicationId: careerApplications.applicationId })
      .from(careerApplications)
      .where(
        and(
          eq(careerApplications.talentProfileId, profile.id),
          eq(careerApplications.openingId, opening.id)
        )
      )
      .limit(1);

    if (existingApp.length > 0) {
      return {
        success: false,
        error: `This candidate already has an application (${existingApp[0].applicationId}) for "${opening.title}".`,
      };
    }

    // 4. Build Opening Snapshot
    const openingSnapshot: OpeningSnapshot = {
      title: opening.title,
      slug: opening.slug,
      openingType: opening.openingType as "job" | "internship",
      department: opening.department,
      location: opening.location,
      workMode: opening.workMode,
      employmentType: opening.employmentType,
    };

    // 5. Generate new Application ID
    const newApplicationId = await generateApplicationId();
    const now = new Date();
    const nowIso = now.toISOString();

    // 6. Assemble Application Details
    // Use submitted resume if present, or create placeholder resume metadata referencing candidate's profile/links
    const resumeData = profile.resume?.url
      ? {
          url: profile.resume.url,
          fileName: profile.resume.fileName || `${profile.fullName.replace(/\s+/g, "_")}_Resume.pdf`,
          mimeType: profile.resume.mimeType || "application/pdf",
          size: profile.resume.size || 0,
        }
      : {
          url: profile.profileUrl || profile.profileLinks?.portfolioUrl || profile.profileLinks?.linkedinUrl || "",
          fileName: "Talent_Pool_Profile_Links",
          mimeType: "text/plain",
          size: 0,
        };

    const applicationDetails = {
      availability: params.availability || profile.availability || "Immediate",
      preferredWorkMode: params.preferredWorkMode || profile.preferredWorkMode || "Flexible",
      expectedStartDate: params.expectedStartDate || null,
      experience: params.experience || profile.experience || "Fresher",
      currentRole: params.currentRole || null,
      currentCompany: params.currentCompany || null,
      highestQualification: params.highestQualification || null,
      college: params.college || null,
      yearOfStudy: null,
      fieldOfStudy: profile.expertise || null,
      portfolioUrl: profile.profileLinks?.portfolioUrl || null,
      githubUrl: profile.profileLinks?.githubUrl || null,
      linkedinUrl: profile.profileLinks?.linkedinUrl || null,
      coverLetter: profile.message || `Converted from Talent Profile (${profile.profileId})`,
      resume: resumeData,
    };

    // 7. Insert new CareerApplication
    const [createdApplication] = await db
      .insert(careerApplications)
      .values({
        applicationId: newApplicationId,
        openingId: opening.id,
        talentProfileId: profile.id,
        openingSnapshot,
        applicant: {
          fullName: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          currentLocation: profile.currentLocation || opening.location,
        },
        application: applicationDetails,
        status: params.initialStatus || "reviewing",
        source: "talent-pool",
        internalNotes: [
          {
            id: `note-${Date.now()}`,
            text: `Converted from Talent Pool profile ${profile.profileId} by ${params.convertedByEmail}.`,
            createdBy: params.convertedByEmail,
            createdAt: nowIso,
          },
        ],
        statusHistory: [
          {
            from: null,
            to: params.initialStatus || "reviewing",
            changedBy: `Converted by ${params.convertedByEmail} (${profile.profileId})`,
            changedAt: nowIso,
          },
        ],
        appliedAt: now,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    // 8. Update TalentProfile status and append conversionHistory
    const newConversionRecord: ConversionRecord = {
      applicationId: createdApplication.id,
      openingId: opening.id,
      openingTitle: opening.title,
      applicationCode: createdApplication.applicationId,
      convertedBy: params.convertedByEmail,
      convertedAt: nowIso,
    };

    const updatedHistory = [...(profile.conversionHistory || []), newConversionRecord];

    await db
      .update(talentProfiles)
      .set({
        status: "converted",
        conversionHistory: updatedHistory,
        updatedAt: now,
      })
      .where(eq(talentProfiles.id, profile.id));

    return {
      success: true,
      applicationId: createdApplication.applicationId,
      applicationDbId: createdApplication.id,
      openingTitle: opening.title,
    };
  } catch (error) {
    console.error("Error in convertTalentProfileToApplication:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to convert talent profile",
    };
  }
}
