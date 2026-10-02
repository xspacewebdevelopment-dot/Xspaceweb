import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaMentions, MediaMentionStatus } from "@/lib/db/schema";
import { desc, asc, ilike, or, eq, isNull, isNotNull, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "all";
    const search = searchParams.get("search") || "";

    const conditions = [];

    // Filter status
    if (filter === "published") {
      conditions.push(eq(mediaMentions.status, "published"), isNull(mediaMentions.archivedAt));
    } else if (filter === "draft") {
      conditions.push(eq(mediaMentions.status, "draft"), isNull(mediaMentions.archivedAt));
    } else if (filter === "unpublished") {
      conditions.push(eq(mediaMentions.status, "unpublished"), isNull(mediaMentions.archivedAt));
    } else if (filter === "archived") {
      conditions.push(isNotNull(mediaMentions.archivedAt));
    } else {
      // "all" - exclude archived by default unless requested
      conditions.push(isNull(mediaMentions.archivedAt));
    }

    // Search query
    if (search.trim()) {
      const q = `%${search.trim()}%`;
      conditions.push(
        or(
          ilike(mediaMentions.publicationName, q),
          ilike(mediaMentions.headline, q)
        )
      );
    }

    const mentions = await db
      .select()
      .from(mediaMentions)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(asc(mediaMentions.displayOrder), desc(mediaMentions.publishedAt));

    return NextResponse.json({ mentions });
  } catch (error: any) {
    console.error("Admin media mentions GET error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch media mentions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      publicationName,
      headline,
      articleUrl,
      logoUrl,
      logoPublicId,
      publishedAt,
      status,
      displayOrder,
    } = body;

    if (!publicationName || !headline || !articleUrl) {
      return NextResponse.json(
        { error: "Publication name, headline, and article URL are required" },
        { status: 400 }
      );
    }

    const [newMention] = await db
      .insert(mediaMentions)
      .values({
        publicationName,
        headline,
        articleUrl,
        logoUrl: logoUrl || "",
        logoPublicId: logoPublicId || null,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        status: (status as MediaMentionStatus) || "draft",
        displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
      })
      .returning();

    return NextResponse.json({ success: true, mention: newMention }, { status: 201 });
  } catch (error: any) {
    console.error("Admin media mention POST error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create media mention" },
      { status: 500 }
    );
  }
}
