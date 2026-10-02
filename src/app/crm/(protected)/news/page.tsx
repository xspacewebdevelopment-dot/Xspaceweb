import React from "react";
import { db } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { CrmNewsTable } from "@/components/crm/CrmNewsTable";

export const dynamic = "force-dynamic";

export default async function CrmNewsPage() {
  const articles = await db
    .select()
    .from(newsArticles)
    .orderBy(desc(newsArticles.createdAt));

  return <CrmNewsTable initialArticles={articles} />;
}
