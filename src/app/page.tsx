import React from "react";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq, and, isNull, asc, desc } from "drizzle-orm";
import { HeroSection } from "@/components/home/HeroSection";
import { RatingsStrip } from "@/components/home/RatingsStrip";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProductShowcaseSection } from "@/components/home/ProductShowcaseSection";
import { WebProcessSection } from "@/components/home/WebProcessSection";
import { WhoWeAreSection } from "@/components/home/WhoWeAreSection";
import { OurImpactSection } from "@/components/home/OurImpactSection";
import { StudioXSWSection } from "@/components/home/StudioXSWSection";
import { TechnologiesSection } from "@/components/home/TechnologiesSection";
import { SpidermanBannerSection } from "@/components/home/SpidermanBannerSection";
import { TrustedBusinessesSection } from "@/components/home/TrustedBusinessesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SelectedWorkSection } from "@/components/home/SelectedWorkSection";
import { RecentWorkSection } from "@/components/home/RecentWorkSection";
import { StartProjectBannerSection } from "@/components/home/StartProjectBannerSection";
import { BrighterTomorrowSection } from "@/components/home/BrighterTomorrowSection";

export const dynamic = "force-dynamic";

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
      {/* Temporarily hidden - will be added back later */}
      {/* <PartnerLogos /> */}
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


