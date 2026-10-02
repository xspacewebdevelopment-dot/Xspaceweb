import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { CrmNewsForm } from "@/components/crm/CrmNewsForm";

export const dynamic = "force-dynamic";

interface EditNewsPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNewsArticlePage({ params }: EditNewsPageProps) {
  const { id } = await params;

  const [article] = await db
    .select()
    .from(newsArticles)
    .where(eq(newsArticles.id, id))
    .limit(1);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Edit News Article
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Update article content, metadata, or publishing status.
        </p>
      </div>

      <CrmNewsForm initialArticle={article} />
    </div>
  );
}
