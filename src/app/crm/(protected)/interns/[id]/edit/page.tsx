import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { CrmInternForm } from "@/components/crm/interns/CrmInternForm";

export const dynamic = "force-dynamic";

export default async function CrmEditInternPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [intern] = await db
    .select()
    .from(interns)
    .where(or(eq(interns.id, id), eq(interns.internshipId, id.toUpperCase())));

  if (!intern) {
    notFound();
  }

  return <CrmInternForm initialData={intern} isEdit={true} />;
}
