import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { eventGalleryImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/admin/events/gallery/[id]
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
      .from(eventGalleryImages)
      .where(eq(eventGalleryImages.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 });
    }

    const body = await req.json();
    const updateData: Partial<typeof eventGalleryImages.$inferInsert> = {};

    if (body.title !== undefined) updateData.title = body.title?.trim() || null;
    if (body.caption !== undefined) updateData.caption = body.caption?.trim() || null;
    if (body.eventId !== undefined) updateData.eventId = body.eventId || null;
    if (body.isFeatured !== undefined) updateData.isFeatured = Boolean(body.isFeatured);
    if (body.displayOrder !== undefined) updateData.displayOrder = Number(body.displayOrder) || 0;

    const [updated] = await db
      .update(eventGalleryImages)
      .set(updateData)
      .where(eq(eventGalleryImages.id, id))
      .returning();

    return NextResponse.json({ image: updated }, { status: 200 });
  } catch (error) {
    console.error("Failed to update gallery image:", error);
    return NextResponse.json({ error: "Failed to update gallery image" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/events/gallery/[id]
 * Deletes gallery image record and deletes Cloudinary asset.
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
      .from(eventGalleryImages)
      .where(eq(eventGalleryImages.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 });
    }

    if (existing.imagePublicId) {
      await deleteCloudinaryAsset(existing.imagePublicId);
    }

    await db.delete(eventGalleryImages).where(eq(eventGalleryImages.id, id));

    return NextResponse.json(
      { success: true, message: "Gallery image permanently removed." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete gallery image:", error);
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 });
  }
}
