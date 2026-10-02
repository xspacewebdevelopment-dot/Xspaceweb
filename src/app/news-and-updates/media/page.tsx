import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MastheadHeader } from "@/components/news/MastheadHeader";
import { Container } from "@/components/shared/ui/Container";
import { MediaCoverageList } from "@/components/news/MediaCoverageList";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { mediaMentions } from "@/lib/db/schema";
import { and, eq, isNull, asc, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Media Mentions & Press Coverage | XSPACEWEB",
  description:
    "Explore comprehensive news coverage, feature articles, and press mentions spotlighting XSPACEWEB innovations.",
};

export default async function ViewAllMediaPage() {
  const publishedMentions = await db
    .select()
    .from(mediaMentions)
    .where(
      and(
        eq(mediaMentions.status, "published"),
        isNull(mediaMentions.archivedAt)
      )
    )
    .orderBy(asc(mediaMentions.displayOrder), desc(mediaMentions.publishedAt));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <MastheadHeader />

      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200/80 py-12">
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
                Media Mentions &amp; Press
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Read feature stories, industry analyses, and press coverage of XSPACEWEB products and milestones across India.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
                {publishedMentions.length} Featured Articles
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Media Coverage Listing */}
      <MediaCoverageList initialMentions={publishedMentions} />
    </main>
  );
}
