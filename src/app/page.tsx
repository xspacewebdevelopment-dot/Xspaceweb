import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { RatingsStrip } from "@/components/home/RatingsStrip";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WebProcessSection } from "@/components/home/WebProcessSection";
import { WhoWeAreSection } from "@/components/home/WhoWeAreSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RatingsStrip />
      <PartnerLogos />
      <ServicesSection />
      <WebProcessSection />
      <WhoWeAreSection />
    </>
  );
}
