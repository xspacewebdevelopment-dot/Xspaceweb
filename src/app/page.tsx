import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { RatingsStrip } from "@/components/home/RatingsStrip";
import { PartnerLogos } from "@/components/home/PartnerLogos";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RatingsStrip />
      <PartnerLogos />
    </>
  );
}
