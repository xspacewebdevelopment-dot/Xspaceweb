"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { UiUxHeroSection } from "@/components/services/ui-ux";

const UiUxStackTransitionSection = dynamic(
  () => import("@/components/services/ui-ux/UiUxStackTransitionSection").then((m) => m.UiUxStackTransitionSection),
  { ssr: true }
);

const UiUxProjectShowcaseSection = dynamic(
  () => import("@/components/services/ui-ux/UiUxProjectShowcaseSection").then((m) => m.UiUxProjectShowcaseSection),
  { ssr: true }
);

const UiUxServicesSection = dynamic(
  () => import("@/components/services/ui-ux/UiUxServicesSection").then((m) => m.UiUxServicesSection),
  { ssr: true }
);

const UiUxPostStageBuffer = dynamic(
  () => import("@/components/services/ui-ux/UiUxPostStageBuffer").then((m) => m.UiUxPostStageBuffer),
  { ssr: true }
);

const ProjectModal = dynamic(
  () => import("@/components/shared/ProjectModal").then((m) => m.ProjectModal),
  { ssr: false }
);

/**
 * Dedicated UI/UX Service Page
 * Aligned with Reference Composition (Pallet Ross):
 * 1. First & Second Section (UiUxHeroSection):
 *    - Category pill & Display headline at top
 *    - Interactive 5-card horizontal spread in the center with floating speech bubbles
 *    - Description paragraph & CTA buttons at bottom
 * 2. Third Section (UiUxStackTransitionSection):
 *    - 1 compact card enters near upper-center and travels downward into this section
 *    - Splits in a spacious, prominent diagonal cascade on the right
 *    - Section 3 editorial content ("Design experiences people remember.") on the left
 * 3. Fourth Section (UiUxProjectShowcaseSection):
 *    - 6 brand-new visual digital product showcase cards
 *    - Progressive scroll entry into a two-line composition
 * 4. Fifth Section (UiUxServicesSection):
 *    - Text-first editorial services & capabilities information (9 core services)
 * 5. Post-Stage Buffer:
 *    - Clean editorial capabilities section, fully separated from global footer
 */
export default function UiUxServicePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleStartProject = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFBFD] text-[#0A1128] overflow-x-hidden">
      {/* 
        1. FIRST & SECOND SECTION (LOCKED):
        Hero with Category pill, Display headline, and 5-card horizontal fan spread.
      */}
      <UiUxHeroSection onStartProject={handleStartProject} />

      {/* 
        2. THIRD SECTION (LOCKED):
        1 compact card comes downward and splits in a spacious diagonal cascade on the right;
        editorial text reveals on the left.
      */}
      <UiUxStackTransitionSection onStartProject={handleStartProject} />

      {/* 
        3. FOURTH SECTION (LOCKED):
        New UI/UX digital products in a dynamic two-tier composition.
      */}
      <UiUxProjectShowcaseSection onStartProject={handleStartProject} />

      {/* 
        4. FIFTH SECTION (UI/UX SERVICES & CAPABILITIES INFORMATION):
        Clean, premium information section with 9 editorial service cards.
      */}
      <UiUxServicesSection onStartProject={handleStartProject} />

      {/* 
        5. POST-STAGE BUFFER:
        Ensures the animation completes cleanly before the site footer appears.
      */}
      <UiUxPostStageBuffer onStartProject={handleStartProject} />

      {/* Global Interactive Proposal Form Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="service"
        source="ui-ux-service-page"
        initialService="UI/UX Design"
        title="Start Your UI/UX Design Project"
        subtitle="Collaborate with our product designers and UX architects to build interfaces that convert and delight."
      />
    </div>
  );
}
