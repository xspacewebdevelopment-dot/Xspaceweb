import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import { desc, eq, and, isNull, isNotNull, or, ilike, SQL } from "drizzle-orm";
import { sendNewsNotificationBroadcast } from "@/lib/resend";

export const dynamic = "force-dynamic";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * GET /api/admin/news
 * Lists news articles with filtering and search.
 */
export async function GET(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "all"; // all, draft, published, unpublished, archived
    const search = searchParams.get("search")?.trim() || "";

    const conditions: SQL[] = [];

    // Filter by status / archive
    if (status === "archived") {
      conditions.push(isNotNull(newsArticles.archivedAt));
    } else {
      // For all active views, exclude archived unless explicitly requested
      conditions.push(isNull(newsArticles.archivedAt));

      if (status === "draft") {
        conditions.push(eq(newsArticles.status, "draft"));
      } else if (status === "published") {
        conditions.push(eq(newsArticles.status, "published"));
      } else if (status === "unpublished") {
        conditions.push(eq(newsArticles.status, "unpublished"));
      }
    }

    // Search by title or category
    if (search) {
      const searchCondition = or(
        ilike(newsArticles.title, `%${search}%`),
        ilike(newsArticles.category, `%${search}%`)
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const articles = await db
      .select()
      .from(newsArticles)
      .where(whereClause)
      .orderBy(desc(newsArticles.createdAt));

    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch admin news articles:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/news
 * Creates a new news article.
 */
export async function POST(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      slug: customSlug,
      category,
      summary,
      content,
      coverImageUrl,
      coverImagePublicId,
      status = "draft",
      isFeatured = false,
      displayOrder = 0,
      publishedAt,
    } = body;

    if (!title || !summary || !content || !coverImageUrl) {
      return NextResponse.json(
        { error: "Title, summary, full content, and cover image are required." },
        { status: 400 }
      );
    }

    let baseSlug = slugify(customSlug || title);
    if (!baseSlug) {
      baseSlug = `article-${Date.now()}`;
    }

    // Ensure unique slug
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (true) {
      const existing = await db
        .select({ id: newsArticles.id })
        .from(newsArticles)
        .where(eq(newsArticles.slug, uniqueSlug))
        .limit(1);

      if (existing.length === 0) break;
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const effectivePublishedAt =
      status === "published"
        ? publishedAt ? new Date(publishedAt) : new Date()
        : publishedAt ? new Date(publishedAt) : null;

    const [inserted] = await db
      .insert(newsArticles)
      .values({
        title: title.trim(),
        slug: uniqueSlug,
        category: category?.trim() || "Company Updates",
        summary: summary.trim(),
        content: content.trim(),
        coverImageUrl: coverImageUrl.trim(),
        coverImagePublicId: coverImagePublicId || null,
        status: ["draft", "published", "unpublished"].includes(status) ? status : "draft",
        isFeatured: Boolean(isFeatured),
        displayOrder: Number(displayOrder) || 0,
        publishedAt: effectivePublishedAt,
      })
      .returning();

    // Notify newsletter subscribers if requested
    if (body.notifySubscribers === true && inserted.status === "published") {
      try {
        await sendNewsNotificationBroadcast({
          title: inserted.title,
          slug: inserted.slug,
          summary: inserted.summary,
          category: inserted.category,
          coverImageUrl: inserted.coverImageUrl,
        });
      } catch (notifyErr) {
        console.error("Failed to broadcast news to subscribers:", notifyErr);
      }
    }

    return NextResponse.json({ article: inserted }, { status: 201 });
  } catch (error) {
    console.error("Failed to create news article:", error);
    return NextResponse.json(
      { error: "Failed to create news article." },
      { status: 500 }
    );
  }
}
