import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaMentions, MediaMentionStatus } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const [mention] = await db
      .select()
      .from(mediaMentions)
      .where(eq(mediaMentions.id, id))
      .limit(1);

    if (!mention) {
      return NextResponse.json({ error: "Media mention not found" }, { status: 404 });
    }

    return NextResponse.json({ mention });
  } catch (error: any) {
    console.error("Admin media mention GET error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch media mention" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await req.json();

    const [existing] = await db
      .select()
      .from(mediaMentions)
      .where(eq(mediaMentions.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Media mention not found" }, { status: 404 });
    }

    // Handle Archive / Restore shortcut
    if (body.action === "archive") {
      const [updated] = await db
        .update(mediaMentions)
        .set({
          archivedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(mediaMentions.id, id))
        .returning();
      return NextResponse.json({ success: true, mention: updated });
    }

    if (body.action === "restore") {
      const [updated] = await db
        .update(mediaMentions)
        .set({
          archivedAt: null,
          updatedAt: new Date(),
        })
        .where(eq(mediaMentions.id, id))
        .returning();
      return NextResponse.json({ success: true, mention: updated });
    }

    // Handle logo replacement: if new logoPublicId provided and differs, delete old
    if (body.logoPublicId && existing.logoPublicId && body.logoPublicId !== existing.logoPublicId) {
      await deleteCloudinaryAsset(existing.logoPublicId);
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (body.publicationName !== undefined) updateData.publicationName = body.publicationName;
    if (body.headline !== undefined) updateData.headline = body.headline;
    if (body.articleUrl !== undefined) updateData.articleUrl = body.articleUrl;
    if (body.logoUrl !== undefined) updateData.logoUrl = body.logoUrl;
    if (body.logoPublicId !== undefined) updateData.logoPublicId = body.logoPublicId;
    if (body.publishedAt !== undefined) updateData.publishedAt = new Date(body.publishedAt);
    if (body.status !== undefined) updateData.status = body.status as MediaMentionStatus;
    if (body.displayOrder !== undefined) updateData.displayOrder = Number(body.displayOrder);

    const [updated] = await db
      .update(mediaMentions)
      .set(updateData)
      .where(eq(mediaMentions.id, id))
      .returning();

    return NextResponse.json({ success: true, mention: updated });
  } catch (error: any) {
    console.error("Admin media mention PATCH error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update media mention" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const [existing] = await db
      .select()
      .from(mediaMentions)
      .where(eq(mediaMentions.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Media mention not found" }, { status: 404 });
    }

    // Cleanup Cloudinary logo asset if present
    if (existing.logoPublicId) {
      await deleteCloudinaryAsset(existing.logoPublicId);
    }

    await db.delete(mediaMentions).where(eq(mediaMentions.id, id));

    return NextResponse.json({
      success: true,
      message: "Media mention deleted permanently",
    });
  } catch (error: any) {
    console.error("Admin media mention DELETE error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete media mention" },
      { status: 500 }
    );
  }
}
