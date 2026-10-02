import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { newsArticles } from "@/lib/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { deleteNewsCoverImage } from "@/lib/cloudinary";
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
 * GET /api/admin/news/[id]
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const [article] = await db
      .select()
      .from(newsArticles)
      .where(eq(newsArticles.id, id))
      .limit(1);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/news/[id]
 * Updates news article fields, handles publish/unpublish, archive/restore.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const [existing] = await db
      .select()
      .from(newsArticles)
      .where(eq(newsArticles.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const body = await req.json();
    const updateData: Partial<typeof newsArticles.$inferInsert> = {
      updatedAt: new Date(),
    };

    // Title & slug
    if (body.title !== undefined) {
      updateData.title = body.title.trim();
    }

    if (body.slug !== undefined) {
      const baseSlug = slugify(body.slug || body.title || existing.title);
      let uniqueSlug = baseSlug;
      let counter = 1;
      while (true) {
        const conflict = await db
          .select({ id: newsArticles.id })
          .from(newsArticles)
          .where(and(eq(newsArticles.slug, uniqueSlug), ne(newsArticles.id, id)))
          .limit(1);

        if (conflict.length === 0) break;
        uniqueSlug = `${baseSlug}-${counter++}`;
      }
      updateData.slug = uniqueSlug;
    }

    if (body.category !== undefined) {
      updateData.category = body.category.trim();
    }

    if (body.summary !== undefined) {
      updateData.summary = body.summary.trim();
    }

    if (body.content !== undefined) {
      updateData.content = body.content.trim();
    }

    // Cover image replacement check
    if (body.coverImageUrl !== undefined) {
      updateData.coverImageUrl = body.coverImageUrl.trim();

      // If new coverImagePublicId provided, check if old asset needs deletion
      if (body.coverImagePublicId !== undefined) {
        updateData.coverImagePublicId = body.coverImagePublicId;

        if (
          existing.coverImagePublicId &&
          existing.coverImagePublicId !== body.coverImagePublicId
        ) {
          // Remove old Cloudinary asset asynchronously
          deleteNewsCoverImage(existing.coverImagePublicId).catch((err) =>
            console.warn("Failed to delete replaced Cloudinary asset:", err)
          );
        }
      }
    }

    if (body.isFeatured !== undefined) {
      updateData.isFeatured = Boolean(body.isFeatured);
    }

    if (body.displayOrder !== undefined) {
      updateData.displayOrder = Number(body.displayOrder) || 0;
    }

    // Publication status
    if (body.status !== undefined) {
      if (["draft", "published", "unpublished"].includes(body.status)) {
        updateData.status = body.status;
        if (body.status === "published" && !existing.publishedAt && !body.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }
    }

    if (body.publishedAt !== undefined) {
      updateData.publishedAt = body.publishedAt ? new Date(body.publishedAt) : null;
    }

    // Archive / restore
    if (body.isArchived !== undefined) {
      updateData.archivedAt = body.isArchived ? new Date() : null;
    } else if (body.archivedAt !== undefined) {
      updateData.archivedAt = body.archivedAt ? new Date(body.archivedAt) : null;
    }

    const [updated] = await db
      .update(newsArticles)
      .set(updateData)
      .where(eq(newsArticles.id, id))
      .returning();

    // Notify newsletter subscribers if requested
    if (body.notifySubscribers === true && updated.status === "published" && !updated.archivedAt) {
      try {
        await sendNewsNotificationBroadcast({
          title: updated.title,
          slug: updated.slug,
          summary: updated.summary,
          category: updated.category,
          coverImageUrl: updated.coverImageUrl,
        });
      } catch (notifyErr) {
        console.error("Failed to broadcast news update to subscribers:", notifyErr);
      }
    }

    return NextResponse.json({ article: updated }, { status: 200 });
  } catch (error) {
    console.error("Failed to update article:", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/news/[id]
 * Permanently deletes article and cleans up Cloudinary cover image.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const [existing] = await db
      .select()
      .from(newsArticles)
      .where(eq(newsArticles.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Safely remove Cloudinary asset if one exists
    if (existing.coverImagePublicId) {
      await deleteNewsCoverImage(existing.coverImagePublicId);
    }

    await db.delete(newsArticles).where(eq(newsArticles.id, id));

    return NextResponse.json(
      { success: true, message: "Article permanently deleted." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to permanently delete article:", error);
    return NextResponse.json(
      { error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
