import React from "react";
import dynamic from "next/dynamic";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq, and, isNull, asc, desc } from "drizzle-orm";
import { HeroSection } from "@/components/home/HeroSection";
import { RatingsStrip } from "@/components/home/RatingsStrip";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WebProcessSection } from "@/components/home/WebProcessSection";
import { WhoWeAreSection } from "@/components/home/WhoWeAreSection";

// Dynamically import below-the-fold sections so the initial mobile bundle stays ultra-lightweight (<100KB)
// Full HTML is still pre-rendered on the server (SSR enabled), protecting SEO and fast first paint
const ProductShowcaseSection = dynamic(() =>
  import("@/components/home/ProductShowcaseSection").then((mod) => mod.ProductShowcaseSection)
);
const RecentWorkSection = dynamic(() =>
  import("@/components/home/RecentWorkSection").then((mod) => mod.RecentWorkSection)
);
const OurImpactSection = dynamic(() =>
  import("@/components/home/OurImpactSection").then((mod) => mod.OurImpactSection)
);
const StudioXSWSection = dynamic(() =>
  import("@/components/home/StudioXSWSection").then((mod) => mod.StudioXSWSection)
);
const TechnologiesSection = dynamic(() =>
  import("@/components/home/TechnologiesSection").then((mod) => mod.TechnologiesSection)
);
const SpidermanBannerSection = dynamic(() =>
  import("@/components/home/SpidermanBannerSection").then((mod) => mod.SpidermanBannerSection)
);
const TrustedBusinessesSection = dynamic(() =>
  import("@/components/home/TrustedBusinessesSection").then((mod) => mod.TrustedBusinessesSection)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/home/TestimonialsSection").then((mod) => mod.TestimonialsSection)
);
const SelectedWorkSection = dynamic(() =>
  import("@/components/home/SelectedWorkSection").then((mod) => mod.SelectedWorkSection)
);
const StartProjectBannerSection = dynamic(() =>
  import("@/components/home/StartProjectBannerSection").then((mod) => mod.StartProjectBannerSection)
);
const BrighterTomorrowSection = dynamic(() =>
  import("@/components/home/BrighterTomorrowSection").then((mod) => mod.BrighterTomorrowSection)
);

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
      <ProductShowcaseSection />
      <RecentWorkSection />
      <div id="studio">
        <OurImpactSection />
        <StudioXSWSection />
      </div>
      <TechnologiesSection />
      <SpidermanBannerSection />
      <TrustedBusinessesSection />
      <TestimonialsSection initialReviews={clientReviews} />
      <SelectedWorkSection />
      <StartProjectBannerSection />
      <BrighterTomorrowSection />
    </>
  );
}
