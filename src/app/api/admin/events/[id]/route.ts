import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { events, eventGalleryImages } from "@/lib/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";
import { sendEventNotificationBroadcast } from "@/lib/resend";

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
 * GET /api/admin/events/[id]
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
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/events/[id]
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
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const body = await req.json();
    const updateData: Partial<typeof events.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (body.title !== undefined) updateData.title = body.title.trim();

    if (body.slug !== undefined) {
      const baseSlug = slugify(body.slug || body.title || existing.title);
      let uniqueSlug = baseSlug;
      let counter = 1;
      while (true) {
        const conflict = await db
          .select({ id: events.id })
          .from(events)
          .where(and(eq(events.slug, uniqueSlug), ne(events.id, id)))
          .limit(1);

        if (conflict.length === 0) break;
        uniqueSlug = `${baseSlug}-${counter++}`;
      }
      updateData.slug = uniqueSlug;
    }

    if (body.shortDescription !== undefined) updateData.shortDescription = body.shortDescription.trim();
    if (body.fullDescription !== undefined) updateData.fullDescription = body.fullDescription?.trim() || null;
    if (body.eventDate !== undefined) updateData.eventDate = new Date(body.eventDate);
    if (body.startTime !== undefined) updateData.startTime = body.startTime?.trim() || null;
    if (body.endTime !== undefined) updateData.endTime = body.endTime?.trim() || null;
    if (body.locationType !== undefined) updateData.locationType = body.locationType;
    if (body.location !== undefined) updateData.location = body.location.trim();
    if (body.registrationUrl !== undefined) updateData.registrationUrl = body.registrationUrl?.trim() || null;

    if (body.coverImageUrl !== undefined) {
      updateData.coverImageUrl = body.coverImageUrl?.trim() || null;
      if (body.coverImagePublicId !== undefined) {
        updateData.coverImagePublicId = body.coverImagePublicId;

        // If replacing image, clean up old Cloudinary asset
        if (existing.coverImagePublicId && existing.coverImagePublicId !== body.coverImagePublicId) {
          deleteCloudinaryAsset(existing.coverImagePublicId).catch((err) =>
            console.warn("Failed to delete replaced event cover asset:", err)
          );
        }
      }
    }

    if (body.isFeatured !== undefined) updateData.isFeatured = Boolean(body.isFeatured);
    if (body.displayOrder !== undefined) updateData.displayOrder = Number(body.displayOrder) || 0;
    if (body.status !== undefined) updateData.status = body.status;

    // Archive / restore
    if (body.isArchived !== undefined) {
      updateData.archivedAt = body.isArchived ? new Date() : null;
    } else if (body.archivedAt !== undefined) {
      updateData.archivedAt = body.archivedAt ? new Date(body.archivedAt) : null;
    }

    const [updated] = await db
      .update(events)
      .set(updateData)
      .where(eq(events.id, id))
      .returning();

    // Notify newsletter subscribers if requested
    if (body.notifySubscribers === true && updated.status === "published" && !updated.archivedAt) {
      try {
        await sendEventNotificationBroadcast({
          title: updated.title,
          slug: updated.slug,
          shortDescription: updated.shortDescription,
          eventDate: updated.eventDate,
          location: updated.location,
          startTime: updated.startTime,
          endTime: updated.endTime,
          locationType: updated.locationType,
          coverImageUrl: updated.coverImageUrl,
        });
      } catch (notifyErr) {
        console.error("Failed to broadcast event to subscribers:", notifyErr);
      }
    }

    return NextResponse.json({ event: updated }, { status: 200 });
  } catch (error) {
    console.error("Failed to update event:", error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/events/[id]
 * Permanently deletes event record, detaches associated gallery images, and removes Cloudinary cover asset.
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
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Safely detach any associated gallery images
    await db
      .update(eventGalleryImages)
      .set({ eventId: null })
      .where(eq(eventGalleryImages.eventId, id));

    // Remove Cloudinary cover asset if present
    if (existing.coverImagePublicId) {
      await deleteCloudinaryAsset(existing.coverImagePublicId);
    }

    await db.delete(events).where(eq(events.id, id));

    return NextResponse.json(
      { success: true, message: "Event permanently deleted." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to permanently delete event:", error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
