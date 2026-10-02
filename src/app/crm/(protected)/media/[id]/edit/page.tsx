import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { mediaMentions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { CrmMediaForm } from "@/components/crm/CrmMediaForm";

export const dynamic = "force-dynamic";

interface EditMediaPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Media Mention | CRM | XSPACEWEB",
};

export default async function EditMediaMentionPage({ params }: EditMediaPageProps) {
  const { id } = await params;

  const [mention] = await db
    .select()
    .from(mediaMentions)
    .where(eq(mediaMentions.id, id))
    .limit(1);

  if (!mention) {
    notFound();
  }

  return <CrmMediaForm initialMention={mention} />;
}
