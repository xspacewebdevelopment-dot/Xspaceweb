import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { eventGalleryImages, events } from "@/lib/db/schema";
import { desc, asc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/events/gallery
 * Lists all gallery images with optional linked event titles.
 */
export async function GET() {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const images = await db
      .select({
        id: eventGalleryImages.id,
        eventId: eventGalleryImages.eventId,
        title: eventGalleryImages.title,
        caption: eventGalleryImages.caption,
        imageUrl: eventGalleryImages.imageUrl,
        imagePublicId: eventGalleryImages.imagePublicId,
        isFeatured: eventGalleryImages.isFeatured,
        displayOrder: eventGalleryImages.displayOrder,
        createdAt: eventGalleryImages.createdAt,
        eventTitle: events.title,
      })
      .from(eventGalleryImages)
      .leftJoin(events, eq(eventGalleryImages.eventId, events.id))
      .orderBy(
        desc(eventGalleryImages.isFeatured),
        asc(eventGalleryImages.displayOrder),
        desc(eventGalleryImages.createdAt)
      );

    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch gallery images:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/admin/events/gallery
 * Adds gallery images (supports single or multiple image payloads).
 */
export async function POST(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Support single object or array of images
    const items = Array.isArray(body) ? body : [body];

    const insertedList = [];
    for (const item of items) {
      if (!item.imageUrl) continue;

      const [inserted] = await db
        .insert(eventGalleryImages)
        .values({
          imageUrl: item.imageUrl.trim(),
          imagePublicId: item.imagePublicId || null,
          title: item.title?.trim() || null,
          caption: item.caption?.trim() || null,
          eventId: item.eventId || null,
          isFeatured: Boolean(item.isFeatured),
          displayOrder: Number(item.displayOrder) || 0,
        })
        .returning();

      insertedList.push(inserted);
    }

    return NextResponse.json({ images: insertedList }, { status: 201 });
  } catch (error) {
    console.error("Failed to save gallery image(s):", error);
    return NextResponse.json({ error: "Failed to add gallery images" }, { status: 500 });
  }
}
