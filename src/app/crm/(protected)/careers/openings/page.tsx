import React from "react";
import { db } from "@/lib/db";
import { careerOpenings } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { CrmOpeningsTable } from "@/components/crm/careers/CrmOpeningsTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Career Openings | XSPACEWEB CRM",
};

export default async function CrmOpeningsPage() {
  const openings = await db
    .select()
    .from(careerOpenings)
    .orderBy(desc(careerOpenings.createdAt));

  const departments = Array.from(
    new Set(openings.map((o) => o.department))
  ).filter(Boolean);

  return (
    <div className="space-y-6">
      <CrmOpeningsTable initialOpenings={openings} departments={departments} />
    </div>
  );
}
