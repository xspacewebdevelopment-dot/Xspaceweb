import React, { Suspense } from "react";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { eq, and, asc } from "drizzle-orm";
import {
  normalizeInternshipId,
  isValidInternshipId,
  calculateInternshipProgress,
} from "@/lib/internship-utils";
import { getCertificateSerialNumber } from "@/lib/certificate-generator";
import { CertificationPageContent } from "@/components/certification/CertificationPageContent";
import { VerifiedInternData } from "@/components/certification/CertificationResultCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verify Internship Record & Official Certificate | XSPACEWEB",
  description:
    "Verify your official XSPACEWEB internship record, timeline progress, and access authenticated digital certificates of completion with your unique Internship ID.",
  openGraph: {
    title: "Verify Internship Certificate | XSPACEWEB",
    description:
      "Enter your unique Intern ID to view complete details, performance record, and download your official internship certificate.",
    type: "website",
  },
};

const defaultQuoteMap: Record<string, string> = {
  "Amarendra Kumar Saxena":
    "Working on modern web architectures and responsive interfaces at XSPACEWEB gave me hands-on mastery of full-stack web development. The mentorship and real-world project delivery transformed my engineering confidence.",
  "Arijit Banerjee":
    "Building scalable backend systems, architecting high-performance APIs, and collaborating with cross-functional teams at XSPACEWEB gave me invaluable exposure to production-grade software engineering.",
  "Nancy Verma":
    "At XSPACEWEB, transforming UI designs into accessible, pixel-perfect web applications taught me best practices in modern web development and state-of-the-art frontend workflows.",
  "Priya Kumari":
    "My internship at XSPACEWEB offered an exceptional environment to engineer robust software solutions, write clean code, and tackle complex technical challenges alongside experienced developers.",
};

export default async function CertificationPage({
  searchParams,
}: {
  searchParams?: Promise<{ id?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  const rawId = resolvedParams?.id;

  let initialIntern: VerifiedInternData | null = null;
  let initialError: string | null = null;
  const initialId = rawId ? normalizeInternshipId(rawId) : "";

  let showcaseInterns;
  try {
    const dbInterns = await db
      .select()
      .from(interns)
      .where(eq(interns.isPublished, true))
      .orderBy(asc(interns.internshipId));

    if (dbInterns && dbInterns.length > 0) {
      showcaseInterns = dbInterns.map((i) => ({
        id: i.id,
        internshipId: i.internshipId,
        fullName: i.fullName,
        role: i.role,
        department: i.department,
        image: i.profileImage || "/images/InternImages/Amrendra_Kumar_Saxena.jpeg",
        quote: defaultQuoteMap[i.fullName] || i.description || undefined,
      }));
    }
  } catch (err) {
    console.error("Failed to query showcase interns from DB:", err);
  }

  if (rawId && rawId.trim()) {
    if (!isValidInternshipId(initialId)) {
      initialError = "Please enter a valid Internship ID, for example XSW-INTERN-001.";
    } else {
      const [record] = await db
        .select()
        .from(interns)
        .where(and(eq(interns.internshipId, initialId), eq(interns.isPublished, true)));

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
        initialId={initialId}
        initialError={initialError}
        showcaseInterns={showcaseInterns}
      />
    </Suspense>
  );
}
