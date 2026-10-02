import React from "react";
import { db } from "@/lib/db";
import { talentProfiles, careerOpenings, TalentProfile } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { CrmTalentPoolTable } from "@/components/crm/careers/CrmTalentPoolTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Talent Pool | Careers CRM | XSPACEWEB",
  description: "Review profiles submitted by candidates who are interested in future opportunities.",
};

export default async function CrmTalentPoolPage() {
  // 1. Fetch initial talent profiles (latest first)
  const profiles = await db
    .select()
    .from(talentProfiles)
    .orderBy(desc(talentProfiles.submittedAt));

  // 2. Fetch published openings for conversion modal
  const publishedOpenings = await db
    .select({
      id: careerOpenings.id,
      title: careerOpenings.title,
      slug: careerOpenings.slug,
      department: careerOpenings.department,
      location: careerOpenings.location,
      openingType: careerOpenings.openingType,
      status: careerOpenings.status,
    })
    .from(careerOpenings)
    .where(eq(careerOpenings.status, "published"))
    .orderBy(desc(careerOpenings.createdAt));

  // 3. Compute KPI stats
  const initialStats = {
    total: profiles.length,
    new: profiles.filter((p) => p.status === "new").length,
    reviewed: profiles.filter((p) => p.status === "reviewed").length,
    potential: profiles.filter((p) => p.status === "potential").length,
    contacted: profiles.filter((p) => p.status === "contacted").length,
    converted: profiles.filter((p) => p.status === "converted").length,
    archived: profiles.filter((p) => p.status === "archived").length,
  };

  // 4. Extract unique preferred roles for filter dropdown
  const uniqueRoles = Array.from(
    new Set(profiles.map((p) => p.preferredRole).filter(Boolean))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <CrmTalentPoolTable
        initialProfiles={profiles}
        initialStats={initialStats}
        publishedOpenings={publishedOpenings}
        rolesList={uniqueRoles}
      />
    </div>
  );
}
