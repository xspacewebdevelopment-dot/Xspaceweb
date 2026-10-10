import React from "react";
import dynamic from "next/dynamic";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq, and, isNull, asc, desc } from "drizzle-orm";
import { HeroSection } from "@/components/home/HeroSection";
import { RatingsStrip } from "@/components/home/RatingsStrip";

// Pure Server Components (Zero-JS sent to client, full SSR for SEO & instant paint)
import { ServicesSection } from "@/components/home/ServicesSection";
import { WebProcessSection } from "@/components/home/WebProcessSection";
import { WhoWeAreSection } from "@/components/home/WhoWeAreSection";
import { RecentWorkSection } from "@/components/home/RecentWorkSection";
import { OurImpactSection } from "@/components/home/OurImpactSection";
import { StudioXSWSection } from "@/components/home/StudioXSWSection";
import { SelectedWorkSection } from "@/components/home/SelectedWorkSection";
import { StartProjectBannerSection } from "@/components/home/StartProjectBannerSection";

// Below-the-fold interactive client widgets (code-split & viewport-deferred to keep initial bundle tiny)
import {
  DeferredProductShowcaseSection,
  DeferredTechnologiesSection,
  DeferredTrustedBusinessesSection,
  DeferredTestimonialsSection,
  DeferredBrighterTomorrowSection,
} from "@/components/home/DeferredInteractiveSections";

// Use Incremental Static Regeneration (ISR) so homepage responds instantly (<50ms) from edge CDN
// Reviews refresh in background every 2 minutes
export const revalidate = 120;

export default async function Home() {
  let clientReviews: any[] = [];
  try {
    clientReviews = await db
      .select()
      .from(testimonials)
      .where(
        and(
          eq(testimonials.testimonialType, "client"),
          eq(testimonials.status, "published"),
          isNull(testimonials.archivedAt)
        )
      )
      .orderBy(desc(testimonials.isFeatured), asc(testimonials.displayOrder), desc(testimonials.createdAt));
  } catch (err) {
    console.error("Failed to fetch client testimonials from DB:", err);
  }

  return (
    <>
      <HeroSection />
      <RatingsStrip />
      <ServicesSection />
      <WebProcessSection />
      <WhoWeAreSection />
      <DeferredProductShowcaseSection />
      <RecentWorkSection />
      <div id="studio">
        <OurImpactSection />
        <StudioXSWSection />
      </div>
      <DeferredTechnologiesSection />
      <DeferredTrustedBusinessesSection />
      <DeferredTestimonialsSection initialReviews={clientReviews} />
      <SelectedWorkSection />
      <StartProjectBannerSection />
      <DeferredBrighterTomorrowSection />
    </>
  );
}
