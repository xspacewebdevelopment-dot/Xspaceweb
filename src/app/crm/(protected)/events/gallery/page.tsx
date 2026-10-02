import React from "react";
import { db } from "@/lib/db";
import { eventGalleryImages, events } from "@/lib/db/schema";
import { desc, asc, eq, isNull } from "drizzle-orm";
import { CrmGalleryManager, GalleryImageWithEvent } from "@/components/crm/CrmGalleryManager";

export const dynamic = "force-dynamic";

export default async function CrmEventGalleryPage() {
  const images = (await db
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
    )) as GalleryImageWithEvent[];

  const availableEvents = await db
    .select({
      id: events.id,
      title: events.title,
    })
    .from(events)
    .where(isNull(events.archivedAt))
    .orderBy(desc(events.eventDate));

  return (
    <CrmGalleryManager
      initialImages={images}
      availableEvents={availableEvents}
    />
  );
}
