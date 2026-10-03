import React, { Suspense } from "react";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import {
  normalizeInternshipId,
  isValidInternshipId,
  calculateInternshipProgress,
} from "@/lib/internship-utils";
import { getCertificateSerialNumber } from "@/lib/certificate-generator";
import { CertificationPageContent } from "@/components/certification/CertificationPageContent";
import { VerifiedInternData } from "@/components/certification/CertificationResultCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ internshipId: string }>;
}): Promise<Metadata> {
  const { internshipId } = await params;
  const normalized = normalizeInternshipId(internshipId);

  return {
    title: `Verify ${normalized} Internship Certificate | XSPACEWEB`,
    description: `Official verification portal for XSPACEWEB internship record ${normalized}. View credentials, timeline, and authenticated certificates.`,
  };
}

export default async function CertificationIdPage({
  params,
}: {
  params: Promise<{ internshipId: string }>;
}) {
  const { internshipId } = await params;
  const normalizedId = normalizeInternshipId(internshipId);

  let initialIntern: VerifiedInternData | null = null;
  let initialError: string | null = null;

  if (!isValidInternshipId(normalizedId)) {
    initialError = "Please enter a valid Internship ID, for example XSW-INTERN-001.";
  } else {
    const [record] = await db
      .select()
      .from(interns)
      .where(and(eq(interns.internshipId, normalizedId), eq(interns.isPublished, true)));

    if (!record) {
      initialError = "Internship record not found. Please check your Internship ID and try again.";
    } else {
      const progress = calculateInternshipProgress(
        record.startDate,
        record.endDate,
        record.status
      );
      const canAccessCertificate = progress.isCompleted && record.status !== "TERMINATED";

      initialIntern = {
        internshipId: record.internshipId,
        fullName: record.fullName,
        profileImage: record.profileImage,
        role: record.role,
        department: record.department,
        internshipType: record.internshipType,
        startDate: record.startDate,
        endDate: record.endDate,
        duration: record.duration || "3 Months",
        status: record.status as VerifiedInternData["status"],
        skills: record.skills || [],
        description: record.description,
        performanceSummary: record.performanceSummary,
        progress: {
          progressPercentage: progress.progressPercentage,
          daysCompleted: progress.daysCompleted,
          totalDays: progress.totalDays,
          daysRemaining: progress.daysRemaining,
          isCompleted: progress.isCompleted,
          isPending: progress.isPending,
          isInProgress: progress.isInProgress,
        },
        certificate: canAccessCertificate
          ? {
              certificateFile: record.certificateFile || null,
              certificateNumber:
                record.certificateNumber ||
                getCertificateSerialNumber(record.internshipId, record.endDate),
              certificateIssuedAt: record.certificateIssuedAt || record.endDate,
            }
          : null,
        hasCertificateUploaded: canAccessCertificate,
        isTerminated: record.status === "TERMINATED",
        isOnHold: record.status === "ON_HOLD",
      };
    }
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-[#1668E8] rounded-full animate-spin" />
        </div>
      }
    >
      <CertificationPageContent
        initialIntern={initialIntern}
        initialId={normalizedId}
        initialError={initialError}
      />
    </Suspense>
  );
}
