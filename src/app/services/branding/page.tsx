"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  CosmicParticleBackground,
  BrandScrollProgress,
  BrandEnvironmentalWord,
  RocketAssemblySection,
} from "@/components/services/branding";

const BrandGravityJourney = dynamic(
  () => import("@/components/services/branding/BrandGravityJourney").then((m) => m.BrandGravityJourney),
  { ssr: true }
);

const BrandingPillarsBento = dynamic(
  () => import("@/components/services/branding/BrandingPillarsBento").then((m) => m.BrandingPillarsBento),
  { ssr: true }
);

const BrandSystemEvolution = dynamic(
  () => import("@/components/services/branding/BrandSystemEvolution").then((m) => m.BrandSystemEvolution),
  { ssr: true }
);

const BrandTrajectoryCarousel = dynamic(
  () => import("@/components/services/branding/BrandTrajectoryCarousel").then((m) => m.BrandTrajectoryCarousel),
  { ssr: true }
);

const BrandCraftsmanshipShowcase = dynamic(
  () => import("@/components/services/branding/BrandCraftsmanshipShowcase").then((m) => m.BrandCraftsmanshipShowcase),
  { ssr: true }
);

const BrandingCaseStudiesSection = dynamic(
  () => import("@/components/services/branding/BrandingCaseStudiesSection").then((m) => m.BrandingCaseStudiesSection),
  { ssr: true }
);

const BrandingProcessSection = dynamic(
  () => import("@/components/services/branding/BrandingProcessSection").then((m) => m.BrandingProcessSection),
  { ssr: true }
);

const BrandingTechStackSection = dynamic(
  () => import("@/components/services/branding/BrandingTechStackSection").then((m) => m.BrandingTechStackSection),
  { ssr: true }
);

const BrandingFaqSection = dynamic(
  () => import("@/components/services/branding/BrandingFaqSection").then((m) => m.BrandingFaqSection),
  { ssr: true }
);

const BrandingConsultationSection = dynamic(
  () => import("@/components/services/branding/BrandingConsultationSection").then((m) => m.BrandingConsultationSection),
  { ssr: true }
);

const ProjectModal = dynamic(
  () => import("@/components/shared/ProjectModal").then((m) => m.ProjectModal),
  { ssr: false }
);

export default function BrandingServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialService, setInitialService] = useState<string>("Brand Identity & Visual Architecture");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleOpenConsultation = (serviceName?: string) => {
    setInitialService(serviceName || "Brand Identity & Visual Architecture");
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#02040c] text-white selection:bg-[#38bdf8] selection:text-[#02040c] relative">
      {/* Page-Wide Mission Telemetry Scroll Progress Line (Directly Below Global Navbar) */}
      <BrandScrollProgress />

      {/* Global Persistent Cosmic Starfield & Floating Space Particles */}
      <CosmicParticleBackground />

      <div className="relative z-10 w-full">
        {/* 1. Cinematic Rocket Frame-by-Frame Scroll Assembly Hero (70 Frames, Zero Black-Gap, Fully Visible Tip) */}
        <RocketAssemblySection
          onLaunchStore={() => handleOpenConsultation("Brand Identity & Visual Architecture")}
          onMarketplaceConsultation={() => handleOpenConsultation("Enterprise Brand Audit")}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Continuous Atmospheric Transition Word: IDENTITY */}
        <BrandEnvironmentalWord word="IDENTITY" />

        {/* 2. Brand Gravity Sticky Scroll Journey (Signal → Identity → System → Gravity → Velocity) */}
        <BrandGravityJourney />

        {/* Atmospheric Transition Word: SYSTEM */}
        <BrandEnvironmentalWord word="SYSTEM" />

        {/* 3. Four Pillars of Brand Gravity (3D Perspective Bento Grid with Micro-Animations) */}
        <BrandingPillarsBento
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 4. Brand System Evolution: Pinned Horizontal Scroll Journey (Foundation → Identity → System → Market) */}
        <BrandSystemEvolution />

        {/* Atmospheric Transition Word: SCALE */}
        <BrandEnvironmentalWord word="SCALE" />

        {/* 5. The 3 Stages of Brand Gravity: Scale, Build & Launch Carousel (with Stage Rail & Nebula Transitions) */}
        <BrandTrajectoryCarousel
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 6. Human Architectural Precision vs. Generic AI Templates (Scroll Reveal Comparison Divider) */}
        <BrandCraftsmanshipShowcase
          onOpenConsultation={() => handleOpenConsultation("Brand Defensibility & Trademark Audit")}
        />

        {/* 7. Proven Enterprise Case Studies (3D Container Scroll Entrance + Thematic Identity Layers) */}
        <BrandingCaseStudiesSection
          onOpenConsultation={() => handleOpenConsultation("Enterprise Brand Transformation")}
        />

        {/* 8. 4-Stage Architectural Mission Trajectory (Tracing Beam Launch Path) */}
        <BrandingProcessSection
          onOpenConsultation={() => handleOpenConsultation("Brand Roadmap Consultation")}
        />

        {/* Atmospheric Transition Word: LAUNCH */}
        <BrandEnvironmentalWord word="LAUNCH" />

        {/* 9. Studio Arsenal & Technology Stack (Production Core Depth System) */}
        <BrandingTechStackSection />

        {/* 10. Frequently Asked Executive Questions (Calm Breathing Room Section) */}
        <BrandingFaqSection
          onOpenConsultation={() => handleOpenConsultation("Brand Strategy Q&A")}
        />

        {/* 11. Final Cosmic Brand Proposal & Architecture Consultation Terminal */}
        <BrandingConsultationSection />
      </div>

      {/* Global Interactive Consultation Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="service"
        source="branding-services-page"
        initialService={initialService}
        title="Commission Your Brand Architecture"
        subtitle="Connect directly with our senior brand architects and 3D visual directors to forge a category-defining identity."
      />
    </div>
  );
}
