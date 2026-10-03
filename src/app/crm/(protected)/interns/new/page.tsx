import React from "react";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { generateNextInternshipId } from "@/lib/internship-utils";
import { CrmInternForm } from "@/components/crm/interns/CrmInternForm";

export const dynamic = "force-dynamic";

export default async function CrmNewInternPage() {
  const allIds = await db
    .select({ internshipId: interns.internshipId })
    .from(interns);

  const nextId = generateNextInternshipId(allIds.map((r) => r.internshipId));

  return <CrmInternForm suggestedInternshipId={nextId} isEdit={false} />;
}
