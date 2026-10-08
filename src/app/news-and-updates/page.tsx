import React from "react";
import { Metadata } from "next";
import { MastheadHeader } from "@/components/news/MastheadHeader";
import { NewsHero } from "@/components/news/NewsHero";
import { NewsFilterAndGrid } from "@/components/news/NewsFilterAndGrid";
import { EventsWebinarsSection } from "@/components/news/EventsWebinarsSection";
import { EventGallerySection } from "@/components/news/EventGallerySection";
import { MediaMentionsSection } from "@/components/news/MediaMentionsSection";
import { NewsNewsletterSection } from "@/components/news/NewsNewsletterSection";
import { db } from "@/lib/db";
import { newsArticles, events, eventGalleryImages, mediaMentions } from "@/lib/db/schema";
import { and, eq, isNull, desc, asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News & Updates | XSPACEWEB",
  description:
    "Stay updated with the latest news, product releases, events, webinars, media coverage and milestones from XSPACEWEB.",
  openGraph: {
    title: "News & Updates | XSPACEWEB",
    description:
      "Stay updated with the latest news, product releases, events, webinars, media coverage and milestones from XSPACEWEB.",
  },
};

export default async function NewsAndUpdatesPage() {
  const [publishedArticles, publishedEvents, galleryImages, publishedMediaMentions] = await Promise.all([
    db
      .select()
      .from(newsArticles)
      .where(
        and(
          eq(newsArticles.status, "published"),
          isNull(newsArticles.archivedAt)
        )
      )
      .orderBy(
        desc(newsArticles.isFeatured),
        asc(newsArticles.displayOrder),
        desc(newsArticles.publishedAt)
      ),
    db
      .select()
      .from(events)
      .where(
        and(
          eq(events.status, "published"),
          isNull(events.archivedAt)
        )
      )
      .orderBy(asc(events.eventDate)),
    db
      .select()
      .from(eventGalleryImages)
      .orderBy(
        desc(eventGalleryImages.isFeatured),
        asc(eventGalleryImages.displayOrder),
        desc(eventGalleryImages.createdAt)
      ),
    db
      .select()
      .from(mediaMentions)
      .where(
        and(
          eq(mediaMentions.status, "published"),
          isNull(mediaMentions.archivedAt)
        )
      )
      .orderBy(
        asc(mediaMentions.displayOrder),
        desc(mediaMentions.publishedAt)
      ),
  ]);

  return (
    <main className="min-h-screen bg-white">
      <MastheadHeader />
      <NewsHero />
      <NewsFilterAndGrid initialArticles={publishedArticles} />
      {/* Temporarily hidden - will be added back later */}
      {/* <EventsWebinarsSection initialEvents={publishedEvents} /> */}
      <EventGallerySection initialImages={galleryImages} />
      {/* Temporarily hidden - will be added back later */}
      {/* <MediaMentionsSection initialMentions={publishedMediaMentions} /> */}
      <NewsNewsletterSection />
    </main>
  );
}

