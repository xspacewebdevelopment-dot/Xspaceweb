import React from "react";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { CrmInternsTable } from "@/components/crm/interns/CrmInternsTable";

export const dynamic = "force-dynamic";

export default async function CrmInternsPage() {
  const allInterns = await db
    .select()
    .from(interns)
    .orderBy(desc(interns.createdAt));

  return <CrmInternsTable initialInterns={allInterns} />;
}
