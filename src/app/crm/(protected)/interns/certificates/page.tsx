import React from "react";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { CrmCertificatesTable } from "@/components/crm/interns/CrmCertificatesTable";

export const dynamic = "force-dynamic";

export default async function CrmInternCertificatesPage() {
  const allInterns = await db
    .select()
    .from(interns)
    .orderBy(desc(interns.createdAt));

  return <CrmCertificatesTable initialInterns={allInterns} />;
}
