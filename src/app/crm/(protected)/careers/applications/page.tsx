import React from "react";
import { db } from "@/lib/db";
import { careerApplications, careerOpenings } from "@/lib/db/schema";
import { desc, sql } from "drizzle-orm";
import { CrmApplicationsTable } from "@/components/crm/careers/CrmApplicationsTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Candidate Applications | Careers CRM | XSPACEWEB",
  description: "Review and manage job and internship candidate applications.",
};

export default async function CrmApplicationsPage() {
  // 1. Fetch initial applications list (latest first)
  const applications = await db
    .select()
    .from(careerApplications)
    .orderBy(desc(careerApplications.appliedAt));

  // 2. Fetch all openings for dropdown filter
  const openingsList = await db
    .select({
      id: careerOpenings.id,
      title: careerOpenings.title,
      slug: careerOpenings.slug,
    })
    .from(careerOpenings)
    .orderBy(desc(careerOpenings.createdAt));

  // 3. Compute KPI stats
  const initialStats = {
    total: applications.length,
    new: applications.filter((a) => a.status === "new").length,
    reviewing: applications.filter((a) => a.status === "reviewing").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    interview: applications.filter((a) => a.status === "interview").length,
    selected: applications.filter((a) => a.status === "selected").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    withdrawn: applications.filter((a) => a.status === "withdrawn").length,
  };

  // 4. Extract unique departments
  const departments = Array.from(
    new Set(applications.map((a) => a.openingSnapshot.department).filter(Boolean))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <CrmApplicationsTable
        initialApplications={applications}
        initialStats={initialStats}
        departments={departments}
        openingsList={openingsList}
      />
    </div>
  );
}
