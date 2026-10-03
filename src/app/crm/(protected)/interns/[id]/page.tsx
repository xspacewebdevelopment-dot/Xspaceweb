import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { CrmInternProfileView } from "@/components/crm/interns/CrmInternProfileView";

export const dynamic = "force-dynamic";

export default async function CrmInternDetailPage({
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

  return <CrmInternProfileView intern={intern} />;
}
