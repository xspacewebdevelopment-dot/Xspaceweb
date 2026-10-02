import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import { and, eq, isNull, ne, desc } from "drizzle-orm";
import { Container } from "@/components/shared/ui/Container";
import { ArrowLeft, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

const getBadgeStyles = (category: string) => {
  switch (category) {
    case "Product Updates":
      return { badge: "PRODUCT UPDATE", color: "bg-[#1668E8] text-white" };
    case "Company Updates":
      return { badge: "PARTNERSHIP", color: "bg-[#0284C7] text-white" };
    case "Events":
      return { badge: "EVENT", color: "bg-[#7C3AED] text-white" };
    case "Press Coverage":
      return { badge: "PRESS COVERAGE", color: "bg-[#D97706] text-white" };
    case "Achievements":
      return { badge: "ACHIEVEMENT", color: "bg-[#059669] text-white" };
    case "CSR":
      return { badge: "CSR", color: "bg-[#E11D48] text-white" };
    default:
      return { badge: category.toUpperCase(), color: "bg-[#1668E8] text-white" };
  }
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const [article] = await db
    .select({
      title: newsArticles.title,
      summary: newsArticles.summary,
      coverImageUrl: newsArticles.coverImageUrl,
    })
    .from(newsArticles)
    .where(
      and(
        eq(newsArticles.slug, slug),
        eq(newsArticles.status, "published"),
        isNull(newsArticles.archivedAt)
      )
    )
    .limit(1);

  if (!article) {
    return {
      title: "Article Not Found | XSPACEWEB",
    };
  }

  return {
    title: `${article.title} | XSPACEWEB News`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [{ url: article.coverImageUrl }],
    },
  };
}

export default async function NewsArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;

  // Fetch article strictly ensuring it is published and not archived
  const [article] = await db
    .select()
    .from(newsArticles)
    .where(
      and(
        eq(newsArticles.slug, slug),
        eq(newsArticles.status, "published"),
        isNull(newsArticles.archivedAt)
      )
    )
    .limit(1);

  if (!article) {
    notFound();
  }

  // Fetch up to 3 related articles
  const relatedArticles = await db
    .select({
      id: newsArticles.id,
      title: newsArticles.title,
      slug: newsArticles.slug,
      category: newsArticles.category,
      summary: newsArticles.summary,
      coverImageUrl: newsArticles.coverImageUrl,
      publishedAt: newsArticles.publishedAt,
    })
    .from(newsArticles)
    .where(
      and(
        eq(newsArticles.status, "published"),
        isNull(newsArticles.archivedAt),
        ne(newsArticles.id, article.id)
      )
    )
    .orderBy(desc(newsArticles.publishedAt))
    .limit(3);

  const { badge, color } = getBadgeStyles(article.category);

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <article className="min-h-screen bg-white py-10 sm:py-16">
      <Container size="default" className="max-w-4xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/news-and-updates"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All News & Updates</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase shadow-xs",
                color
              )}
            >
              {badge}
            </span>

            {formattedDate && (
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152B] tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[#556987] leading-relaxed border-l-4 border-[#1668E8] pl-4 py-1 font-medium bg-slate-50/70 rounded-r-xl">
            {article.summary}
          </p>
        </header>

        {/* Cover Image */}
        <div className="relative w-full h-[280px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden mb-10 shadow-lg border border-slate-100 bg-slate-100">
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Full Article Content */}
        <div className="prose prose-slate max-w-none text-[#1E293B] text-base sm:text-lg leading-relaxed space-y-6 border-b border-slate-100 pb-12">
          {article.content.split("\n\n").map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            // Simple markdown bullet detection
            if (trimmed.startsWith("- ")) {
              const items = trimmed.split("\n").map((li) => li.replace(/^-\s*/, ""));
              return (
                <ul key={index} className="list-disc pl-6 space-y-2 text-slate-700">
                  {items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              );
            }

            // Simple markdown header detection
            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={index} className="text-xl sm:text-2xl font-bold text-[#07152B] pt-4">
                  {trimmed.replace(/^###\s*/, "")}
                </h3>
              );
            }
            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={index} className="text-2xl sm:text-3xl font-extrabold text-[#07152B] pt-6">
                  {trimmed.replace(/^##\s*/, "")}
                </h2>
              );
            }

            // Simple blockquote detection
            if (trimmed.startsWith("> ")) {
              return (
                <blockquote
                  key={index}
                  className="border-l-4 border-[#1668E8] pl-4 italic text-slate-600 my-4 py-1"
                >
                  {trimmed.replace(/^>\s*/, "")}
                </blockquote>
              );
            }

            return (
              <p key={index} className="whitespace-pre-line leading-relaxed text-slate-700">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Bottom Back Button */}
        <div className="py-8 flex items-center justify-between">
          <Link
            href="/news-and-updates"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to News Hub</span>
          </Link>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="pt-10 border-t border-slate-200">
            <h3 className="text-xl sm:text-2xl font-bold text-[#07152B] tracking-tight mb-6">
              More News & Updates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => {
                const relBadge = getBadgeStyles(rel.category);
                return (
                  <Link
                    key={rel.id}
                    href={`/news-and-updates/${rel.slug}`}
                    className="group bg-white rounded-xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col hover:-translate-y-1"
                  >
                    <div className="relative w-full h-36 bg-slate-100 overflow-hidden">
                      <Image
                        src={rel.coverImageUrl}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider",
                            relBadge.color
                          )}
                        >
                          {relBadge.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <h4 className="text-sm font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors line-clamp-2 mb-2 leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                        {rel.summary}
                      </p>
                      <span className="text-[11px] font-semibold text-[#1668E8] flex items-center gap-1 group-hover:underline">
                        Read Story <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
