import React from "react";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import { CrmSidebar, CrmBadgeCounts } from "@/components/crm/CrmSidebar";
import { db } from "@/lib/db";
import {
  projectInquiries,
  careerApplications,
  talentProfiles,
} from "@/lib/db/schema";
import { count, eq, and, isNull } from "drizzle-orm";

export const metadata = {
  title: "XSPACEWEB CRM",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CrmProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminSession();

  if (!session || !session.user?.email) {
    redirect("/crm/login?error=AccessDenied");
  }

  let initialCounts: CrmBadgeCounts = {
    projectInquiries: 0,
    serviceRequests: 0,
    applications: 0,
    talentPool: 0,
  };

  try {
    const [
      [projectRes],
      [serviceRes],
      [appsRes],
      [talentRes],
    ] = await Promise.all([
      db
        .select({ value: count() })
        .from(projectInquiries)
        .where(
          and(
            eq(projectInquiries.inquiryType, "project"),
            eq(projectInquiries.status, "new"),
            isNull(projectInquiries.archivedAt)
          )
        ),
      db
        .select({ value: count() })
        .from(projectInquiries)
        .where(
          and(
            eq(projectInquiries.inquiryType, "service"),
            eq(projectInquiries.status, "new"),
            isNull(projectInquiries.archivedAt)
          )
        ),
      db
        .select({ value: count() })
        .from(careerApplications)
        .where(eq(careerApplications.status, "new")),
      db
        .select({ value: count() })
        .from(talentProfiles)
        .where(eq(talentProfiles.status, "new")),
    ]);

    initialCounts = {
      projectInquiries: projectRes?.value ?? 0,
      serviceRequests: serviceRes?.value ?? 0,
      applications: appsRes?.value ?? 0,
      talentPool: talentRes?.value ?? 0,
    };
  } catch (error) {
    console.error("Failed to fetch initial badge counts:", error);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col lg:flex-row">
      {/* Left Sidebar */}
      <CrmSidebar
        adminEmail={session.user.email}
        initialCounts={initialCounts}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
