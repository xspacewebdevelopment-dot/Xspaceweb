import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { careerOpenings, careerApplications, OpeningSnapshot } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { applicationSubmissionSchema } from "@/lib/validations/applications";
import {
  generateApplicationId,
  isDuplicateApplication,
} from "@/lib/services/applications";
import { saveUploadedResume } from "@/lib/storage/resumeUpload";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let openingId = "";
    let fullName = "";
    let email = "";
    let phone = "";
    let currentLocation = "";
    let availability = "";
    let preferredWorkMode = "";
    let expectedStartDate: string | null = null;
    let experience = "";
    let currentRole: string | null = null;
    let currentCompany: string | null = null;
    let highestQualification: string | null = null;
    let college: string | null = null;
    let yearOfStudy: string | null = null;
    let fieldOfStudy: string | null = null;
    let portfolioUrl: string | null = null;
    let githubUrl: string | null = null;
    let linkedinUrl: string | null = null;
    let coverLetter: string | null = null;
    let resumeFile: File | null = null;
    let existingResumeInfo: { url: string; fileName: string; mimeType: string; size: number } | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      openingId = (formData.get("openingId") as string) || "";
      fullName = (formData.get("fullName") as string) || "";
      email = (formData.get("email") as string) || "";
      phone = (formData.get("phone") as string) || "";
      currentLocation = (formData.get("currentLocation") as string) || "";
      availability = (formData.get("availability") as string) || "";
      preferredWorkMode = (formData.get("preferredWorkMode") as string) || "";
      expectedStartDate = (formData.get("expectedStartDate") as string) || null;
      experience = (formData.get("experience") as string) || "";
      currentRole = (formData.get("currentRole") as string) || null;
      currentCompany = (formData.get("currentCompany") as string) || null;
      highestQualification = (formData.get("highestQualification") as string) || null;
      college = (formData.get("college") as string) || null;
      yearOfStudy = (formData.get("yearOfStudy") as string) || null;
      fieldOfStudy = (formData.get("fieldOfStudy") as string) || null;
      portfolioUrl = (formData.get("portfolioUrl") as string) || null;
      githubUrl = (formData.get("githubUrl") as string) || null;
      linkedinUrl = (formData.get("linkedinUrl") as string) || null;
      coverLetter = (formData.get("coverLetter") as string) || null;

      const file = formData.get("resume");
      if (file && typeof file === "object" && "name" in file && (file as File).size > 0) {
        resumeFile = file as File;
      }
    } else if (contentType.includes("application/json")) {
      const body = await req.json();
      openingId = body.openingId || "";
      fullName = body.fullName || "";
      email = body.email || "";
      phone = body.phone || "";
      currentLocation = body.currentLocation || "";
      availability = body.availability || "";
      preferredWorkMode = body.preferredWorkMode || "";
      expectedStartDate = body.expectedStartDate || null;
      experience = body.experience || "";
      currentRole = body.currentRole || null;
      currentCompany = body.currentCompany || null;
      highestQualification = body.highestQualification || null;
      college = body.college || null;
      yearOfStudy = body.yearOfStudy || null;
      fieldOfStudy = body.fieldOfStudy || null;
      portfolioUrl = body.portfolioUrl || null;
      githubUrl = body.githubUrl || null;
      linkedinUrl = body.linkedinUrl || null;
      coverLetter = body.coverLetter || null;
      if (body.resume && body.resume.url) {
        existingResumeInfo = body.resume;
      }
    } else {
      return NextResponse.json(
        { success: false, error: "Unsupported content type" },
        { status: 400 }
      );
    }

    // 1. Validate Form Fields with Zod
    const validationResult = applicationSubmissionSchema.safeParse({
      openingId,
      fullName,
      email,
      phone,
      currentLocation,
      availability,
      preferredWorkMode,
      expectedStartDate: expectedStartDate || null,
      experience,
      currentRole: currentRole || null,
      currentCompany: currentCompany || null,
      highestQualification: highestQualification || null,
      college: college || null,
      yearOfStudy: yearOfStudy || null,
      fieldOfStudy: fieldOfStudy || null,
      portfolioUrl: portfolioUrl || null,
      githubUrl: githubUrl || null,
      linkedinUrl: linkedinUrl || null,
      coverLetter: coverLetter || null,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Validation failed";
      return NextResponse.json(
        { success: false, error: firstError, details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // 2. Validate Opening Existence & Status in Database
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      validatedData.openingId
    );

    let opening;
    if (isUuid) {
      const results = await db
        .select()
        .from(careerOpenings)
        .where(eq(careerOpenings.id, validatedData.openingId))
        .limit(1);
      opening = results[0];
    } else {
      const results = await db
        .select()
        .from(careerOpenings)
        .where(eq(careerOpenings.slug, validatedData.openingId))
        .limit(1);
      opening = results[0];
    }

    if (!opening) {
      return NextResponse.json(
        { success: false, error: "Career opening not found" },
        { status: 404 }
      );
    }

    // Rule: Application must be allowed ONLY when opening.status === "published"
    if (opening.status !== "published") {
      return NextResponse.json(
        { success: false, error: "This position is no longer accepting applications." },
        { status: 400 }
      );
    }

    // 3. Duplicate Application Protection
    const isDuplicate = await isDuplicateApplication(opening.id, validatedData.email);
    if (isDuplicate) {
      return NextResponse.json(
        { success: false, error: "You have already applied for this position." },
        { status: 400 }
      );
    }

    // 4. Handle Resume File Upload
    let resumeInfo = existingResumeInfo;
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

    if (!resumeInfo || !resumeInfo.url) {
      return NextResponse.json(
        { success: false, error: "Resume / CV document is required." },
        { status: 400 }
      );
    }

    // 5. Create Opening Snapshot to preserve history
    const openingSnapshot: OpeningSnapshot = {
      title: opening.title,
      slug: opening.slug,
      openingType: opening.openingType as "job" | "internship",
      department: opening.department,
      location: opening.location,
      workMode: opening.workMode,
      employmentType: opening.employmentType,
    };

    // 6. Generate readable unique application ID
    const applicationId = await generateApplicationId();

    const now = new Date();
    const nowIso = now.toISOString();

    // 7. Insert into career_applications
    const [createdApp] = await db
      .insert(careerApplications)
      .values({
        applicationId,
        openingId: opening.id,
        openingSnapshot,
        applicant: {
          fullName: validatedData.fullName,
          email: validatedData.email,
          phone: validatedData.phone,
          currentLocation: validatedData.currentLocation,
        },
        application: {
          availability: validatedData.availability,
          preferredWorkMode: validatedData.preferredWorkMode,
          expectedStartDate: validatedData.expectedStartDate,
          experience: validatedData.experience,
          currentCompany: validatedData.currentCompany,
          currentRole: validatedData.currentRole,
          highestQualification: validatedData.highestQualification,
          college: validatedData.college,
          yearOfStudy: validatedData.yearOfStudy,
          fieldOfStudy: validatedData.fieldOfStudy,
          portfolioUrl: validatedData.portfolioUrl,
          githubUrl: validatedData.githubUrl,
          linkedinUrl: validatedData.linkedinUrl,
          coverLetter: validatedData.coverLetter,
          resume: resumeInfo,
        },
        status: "new",
        source: "website",
        internalNotes: [],
        statusHistory: [
          {
            from: null,
            to: "new",
            changedBy: "System / Candidate Application",
            changedAt: nowIso,
          },
        ],
        appliedAt: now,
        createdAt: now,
        updatedAt: now,
      })
      .returning({
        id: careerApplications.id,
        applicationId: careerApplications.applicationId,
      });

    // Return public-safe response
    return NextResponse.json({
      success: true,
      applicationId: createdApp.applicationId,
      message: "Application submitted successfully",
    });
  } catch (error: unknown) {
    console.error("Error submitting career application:", error);
    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while submitting your application.";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
