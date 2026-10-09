"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  ScrollProgressBar,
  DigitalMarketingHero,
  BackgroundWord,
} from "@/components/services/digital-marketing";

const GrowthJourneySection = dynamic(
  () => import("@/components/services/digital-marketing/GrowthJourneySection").then((m) => m.GrowthJourneySection),
  { ssr: true }
);

const GrowthShowcaseCarousel = dynamic(
  () => import("@/components/services/digital-marketing/GrowthShowcaseCarousel").then((m) => m.GrowthShowcaseCarousel),
  { ssr: true }
);

const StickyFeaturesShowcase = dynamic(
  () => import("@/components/services/digital-marketing/StickyFeaturesShowcase").then((m) => m.StickyFeaturesShowcase),
  { ssr: true }
);

const DataStreamTransition = dynamic(
  () => import("@/components/services/digital-marketing/DataStreamTransition").then((m) => m.DataStreamTransition),
  { ssr: true }
);

const GrowthRetrievalEngine = dynamic(
  () => import("@/components/services/digital-marketing/GrowthRetrievalEngine").then((m) => m.GrowthRetrievalEngine),
  { ssr: true }
);

const MarketingMetricsBento = dynamic(
  () => import("@/components/services/digital-marketing/MarketingMetricsBento").then((m) => m.MarketingMetricsBento),
  { ssr: true }
);

const GrowthProcessSection = dynamic(
  () => import("@/components/services/digital-marketing/GrowthProcessSection").then((m) => m.GrowthProcessSection),
  { ssr: true }
);

const MarketingFAQSection = dynamic(
  () => import("@/components/services/digital-marketing/MarketingFAQSection").then((m) => m.MarketingFAQSection),
  { ssr: true }
);

const MarketingCTASection = dynamic(
  () => import("@/components/services/digital-marketing/MarketingCTASection").then((m) => m.MarketingCTASection),
  { ssr: true }
);

const ProjectModal = dynamic(
  () => import("@/components/shared/ProjectModal").then((m) => m.ProjectModal),
  { ssr: false }
);

export default function DigitalMarketingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialEmail, setInitialEmail] = useState<string>("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleOpenConsultation = (email?: string) => {
    setInitialEmail(email || "");
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] selection:bg-[#1668E8] selection:text-white relative">
      {/* 1. Page Scroll Progress Indicator (Under navbar, thin blue-violet gradient) */}
      <ScrollProgressBar />

      {/* 2. Main Hero Container with CloudFront Video Layer, Text Animation, Depth Badges & Metric Bar */}
      <DigitalMarketingHero onOpenConsultation={() => handleOpenConsultation()} />

      {/* Environmental Word: DEMAND */}
      <BackgroundWord word="DEMAND" />

      {/* 3. New Section: How Growth Happens (Aceternity Sticky Scroll Reveal with 5 Stages) */}
      <GrowthJourneySection />

      {/* Environmental Word: PROOF */}
      <BackgroundWord word="PROOF" />

      {/* 4. Verified Case Models Showcase (Desktop GSAP Horizontal Pinned Journey + Mobile Carousel) */}
      <GrowthShowcaseCarousel />

      {/* 5. Scroll-Driven Sticky Split-Screen Capabilities Showcase (with Animated Mini-Systems) */}
      <StickyFeaturesShowcase />

      {/* 6. Lightweight Data Stream Transition (Google Ads, Meta, SEO, CRM -> XSPACEWEB SIGNAL LAYER -> REVENUE) */}
      <DataStreamTransition />

      {/* Environmental Word: SIGNAL */}
      <BackgroundWord word="SIGNAL" />

      {/* 7. Interactive Strategy Retrieval Engine (Wrapped in 3D Container Scroll Entrance) */}
      <GrowthRetrievalEngine onOpenConsultation={() => handleOpenConsultation()} />

      {/* 8. Proven Benchmarks & Empirical Proof Bento Grid (Calm reading section) */}
      <MarketingMetricsBento />

      {/* Environmental Word: SCALE */}
      <BackgroundWord word="SCALE" />

      {/* 9. 4-Stage Phased Execution Protocol with Scroll-Linked Tracing Beam */}
      <GrowthProcessSection />

      {/* 10. High-Clarity FAQ Accordion (Calm reading section) */}
      <MarketingFAQSection />

      {/* 11. Cinematic Closing Consultation CTA with Subtle Magnetic Button Physics */}
      <MarketingCTASection onOpenConsultation={(email) => handleOpenConsultation(email)} />

      {/* Interactive Consultation Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setInitialEmail("");
        }}
        inquiryType="service"
        source="digital-marketing-page"
        initialEmail={initialEmail}
        initialService="Digital Marketing"
      />
    </div>
  );
}
