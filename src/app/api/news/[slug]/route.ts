import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import { and, eq, isNull, ne, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/news/[slug]
 * Public endpoint to fetch an individual published article by slug.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

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
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Fetch related articles (same category or latest, excluding current)
    const related = await db
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

    return NextResponse.json({ article, related }, { status: 200 });
  } catch (error) {
    console.error("Public news detail fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load article details" },
      { status: 500 }
    );
  }
}
