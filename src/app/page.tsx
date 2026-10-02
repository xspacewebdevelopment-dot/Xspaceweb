import React from "react";
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

export default function Home() {
  return (
    <>
      <HeroSection />
      <RatingsStrip />
      <PartnerLogos />
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
      <TestimonialsSection />
      <SelectedWorkSection />
      <StartProjectBannerSection />
      <BrighterTomorrowSection />
    </>
  );
}


