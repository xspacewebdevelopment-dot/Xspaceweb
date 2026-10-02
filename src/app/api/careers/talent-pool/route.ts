import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { talentProfiles, TalentResumeInfo } from "@/lib/db/schema";
import { talentProfileSubmissionSchema } from "@/lib/validations/talentPool";
import {
  generateTalentProfileId,
  isDuplicateTalentProfile,
} from "@/lib/services/talentPool";
import { saveUploadedResume } from "@/lib/storage/resumeUpload";

export const dynamic = "force-dynamic";

/**
 * Public Talent Profile Submission Endpoint
 * POST /api/careers/talent-pool
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let fullName = "";
    let email = "";
    let phone = "";
    let currentLocation = "";
    let preferredRole = "";
    let expertise = "";
    let experience = "";
    let availability = "";
    let preferredWorkMode = "";
    let portfolioUrl = "";
    let githubUrl = "";
    let linkedinUrl = "";
    let profileUrl = "";
    let message = "";
    let resumeFile: File | null = null;
    let existingResumeInfo: TalentResumeInfo | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      fullName = (formData.get("fullName") as string) || "";
      email = (formData.get("email") as string) || "";
      phone = (formData.get("phone") as string) || "";
      currentLocation = (formData.get("currentLocation") as string) || "";
      preferredRole = (formData.get("preferredRole") as string) || "";
      expertise = (formData.get("expertise") as string) || "";
      experience = (formData.get("experience") as string) || "";
      availability = (formData.get("availability") as string) || "";
      preferredWorkMode = (formData.get("preferredWorkMode") as string) || "";
      portfolioUrl = (formData.get("portfolioUrl") as string) || "";
      githubUrl = (formData.get("githubUrl") as string) || "";
      linkedinUrl = (formData.get("linkedinUrl") as string) || "";
      profileUrl = (formData.get("profileUrl") as string) || "";
      message = (formData.get("message") as string) || "";

      const file = formData.get("resume");
      if (file && typeof file === "object" && "name" in file && (file as File).size > 0) {
        resumeFile = file as File;
      }
    } else if (contentType.includes("application/json")) {
      const body = await req.json();
      fullName = body.fullName || "";
      email = body.email || "";
      phone = body.phone || "";
      currentLocation = body.currentLocation || "";
      preferredRole = body.preferredRole || "";
      expertise = body.expertise || "";
      experience = body.experience || "";
      availability = body.availability || "";
      preferredWorkMode = body.preferredWorkMode || "";
      portfolioUrl = body.portfolioUrl || "";
      githubUrl = body.githubUrl || "";
      linkedinUrl = body.linkedinUrl || "";
      profileUrl = body.profileUrl || "";
      message = body.message || "";
      if (body.resume && body.resume.url) {
        existingResumeInfo = body.resume;
      }
    } else {
      return NextResponse.json(
        { success: false, error: "Unsupported content type" },
        { status: 400 }
      );
    }

    // 1. Zod validation for base fields
    const validationResult = talentProfileSubmissionSchema.safeParse({
      fullName,
      email,
      phone,
      currentLocation: currentLocation || null,
      preferredRole,
      expertise: expertise || null,
      experience: experience || null,
      availability: availability || null,
      preferredWorkMode: preferredWorkMode || null,
      portfolioUrl: portfolioUrl || null,
      githubUrl: githubUrl || null,
      linkedinUrl: linkedinUrl || null,
      profileUrl: profileUrl || null,
      message: message || null,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Validation failed";
      return NextResponse.json(
        { success: false, error: firstError, details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // 2. Duplicate submission cooldown protection (same normalized email in last 24h)
    const isDuplicate = await isDuplicateTalentProfile(validatedData.email);
    if (isDuplicate) {
      return NextResponse.json(
        {
          success: false,
          error: "We already received your profile recently. Thank you for your interest!",
        },
        { status: 400 }
      );
    }

    // 3. Process Resume Upload if provided
    let resumeInfo: TalentResumeInfo | null = existingResumeInfo;
    if (resumeFile) {
      const uploadResult = await saveUploadedResume(
        resumeFile,
        resumeFile.name,
        resumeFile.type
      );
      if (!uploadResult.success || !uploadResult.resumeInfo) {
        return NextResponse.json(
          { success: false, error: uploadResult.error || "Failed to process resume upload." },
          { status: 400 }
        );
      }
      resumeInfo = uploadResult.resumeInfo;
    }

    // 4. Validate that at least ONE profile link or resume is provided
    const hasLinkOrResume =
      (resumeInfo && resumeInfo.url) ||
      validatedData.portfolioUrl ||
      validatedData.githubUrl ||
      validatedData.linkedinUrl ||
      validatedData.profileUrl;

    if (!hasLinkOrResume) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a resume file or at least one profile link (Portfolio, GitHub, LinkedIn, or Profile URL).",
        },
        { status: 400 }
      );
    }

    // 5. Generate unique Profile ID
    const profileId = await generateTalentProfileId();
    const now = new Date();

    // 6. Insert into database
    await db.insert(talentProfiles).values({
      profileId,
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      currentLocation: validatedData.currentLocation || null,
      preferredRole: validatedData.preferredRole,
      expertise: validatedData.expertise || null,
      experience: validatedData.experience || null,
      availability: validatedData.availability || null,
      preferredWorkMode: validatedData.preferredWorkMode || null,
      profileLinks: {
        portfolioUrl: validatedData.portfolioUrl || null,
        githubUrl: validatedData.githubUrl || null,
        linkedinUrl: validatedData.linkedinUrl || null,
      },
      resume: resumeInfo,
      profileUrl: validatedData.profileUrl || null,
      message: validatedData.message || null,
      status: "new",
      tags: [],
      source: "website",
      internalNotes: [],
      conversionHistory: [],
      submittedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    // 7. Return safe public response
    return NextResponse.json(
      {
        success: true,
        profileId,
        message: "Profile submitted successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in public talent profile submission:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while submitting your profile." },
      { status: 500 }
    );
  }
}
