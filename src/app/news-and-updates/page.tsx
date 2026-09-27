import React from "react";
import { Metadata } from "next";
import { MastheadHeader } from "@/components/news/MastheadHeader";
import { NewsHero } from "@/components/news/NewsHero";
import { NewsFilterAndGrid } from "@/components/news/NewsFilterAndGrid";
import { EventsWebinarsSection } from "@/components/news/EventsWebinarsSection";
import { EventGallerySection } from "@/components/news/EventGallerySection";
import { MediaMentionsSection } from "@/components/news/MediaMentionsSection";
import { NewsNewsletterSection } from "@/components/news/NewsNewsletterSection";

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

export default function NewsAndUpdatesPage() {
  return (
    <main className="min-h-screen bg-white">
      <MastheadHeader />
      <NewsHero />
      <NewsFilterAndGrid />
      <EventsWebinarsSection />
      <EventGallerySection />
      <MediaMentionsSection />
      <NewsNewsletterSection />
    </main>
  );
}
