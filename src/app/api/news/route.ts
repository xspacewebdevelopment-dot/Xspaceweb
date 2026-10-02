import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import { and, eq, isNull, desc, asc, ilike, or, SQL } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/news
 * Public endpoint to fetch published and non-archived news articles.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category")?.trim();
    const search = searchParams.get("search")?.trim();
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10), 1), 100) : 50;

    const conditions: SQL[] = [
      eq(newsArticles.status, "published"),
      isNull(newsArticles.archivedAt),
    ];

    if (category && category !== "All") {
      conditions.push(eq(newsArticles.category, category));
    }

    if (search) {
      const searchCondition = or(
        ilike(newsArticles.title, `%${search}%`),
        ilike(newsArticles.summary, `%${search}%`),
        ilike(newsArticles.category, `%${search}%`)
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    const articles = await db
      .select({
        id: newsArticles.id,
        title: newsArticles.title,
        slug: newsArticles.slug,
        category: newsArticles.category,
        summary: newsArticles.summary,
        coverImageUrl: newsArticles.coverImageUrl,
        isFeatured: newsArticles.isFeatured,
        displayOrder: newsArticles.displayOrder,
        publishedAt: newsArticles.publishedAt,
        createdAt: newsArticles.createdAt,
      })
      .from(newsArticles)
      .where(and(...conditions))
      .orderBy(
        desc(newsArticles.isFeatured),
        asc(newsArticles.displayOrder),
        desc(newsArticles.publishedAt),
        desc(newsArticles.createdAt)
      )
      .limit(limit);

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error("Public news fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load news articles" },
      { status: 500 }
    );
  }
}
