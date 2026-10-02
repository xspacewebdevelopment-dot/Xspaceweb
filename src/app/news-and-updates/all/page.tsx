import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MastheadHeader } from "@/components/news/MastheadHeader";
import { NewsFilterAndGrid } from "@/components/news/NewsFilterAndGrid";
import { Container } from "@/components/shared/ui/Container";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import { and, eq, isNull, desc, asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All News & Updates Archive | XSPACEWEB",
  description:
    "Explore our complete archive of company updates, product launches, event recaps, and press mentions.",
};

export default async function ViewAllNewsPage() {
  const publishedArticles = await db
    .select()
    .from(newsArticles)
    .where(
      and(
        eq(newsArticles.status, "published"),
        isNull(newsArticles.archivedAt)
      )
    )
    .orderBy(
      desc(newsArticles.isFeatured),
      asc(newsArticles.displayOrder),
      desc(newsArticles.publishedAt)
    );

  return (
    <main className="min-h-screen bg-white">
      <MastheadHeader />

      {/* Archive Header Banner */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-10">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Link
                href="/news-and-updates"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1668E8] hover:underline mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to News & Events Hub</span>
              </Link>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#07152B] tracking-tight">
                All News & Updates
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Browse our complete archive of announcements, feature releases, press coverage, and milestones.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
                {publishedArticles.length} Published Stories
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid with All Articles, Category Filters, and Search */}
      <NewsFilterAndGrid initialArticles={publishedArticles} limitToFour={false} />
    </main>
  );
}
