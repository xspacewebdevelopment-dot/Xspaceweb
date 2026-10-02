import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eventGalleryImages } from "@/lib/db/schema";
import { desc, asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/events/gallery
 * Public endpoint to fetch up to 5 featured/ordered event gallery images.
 */
export async function GET() {
  try {
    const images = await db
      .select({
        id: eventGalleryImages.id,
        title: eventGalleryImages.title,
        caption: eventGalleryImages.caption,
        imageUrl: eventGalleryImages.imageUrl,
        isFeatured: eventGalleryImages.isFeatured,
        displayOrder: eventGalleryImages.displayOrder,
      })
      .from(eventGalleryImages)
      .orderBy(
        desc(eventGalleryImages.isFeatured),
        asc(eventGalleryImages.displayOrder),
        desc(eventGalleryImages.createdAt)
      )
      .limit(5);

    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error("Public gallery fetch error:", error);
    return NextResponse.json({ error: "Failed to load gallery images" }, { status: 500 });
  }
}
