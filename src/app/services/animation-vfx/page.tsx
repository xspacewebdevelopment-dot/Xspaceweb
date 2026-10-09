"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { VfxHeroSpotlightSection } from "@/components/services/animation-vfx";

const VfxPipelineCapabilitiesSection = dynamic(
  () => import("@/components/services/animation-vfx/VfxPipelineCapabilitiesSection").then((m) => m.VfxPipelineCapabilitiesSection),
  { ssr: true }
);

const VfxBreakdownShowcaseSection = dynamic(
  () => import("@/components/services/animation-vfx/VfxBreakdownShowcaseSection").then((m) => m.VfxBreakdownShowcaseSection),
  { ssr: true }
);

const ProjectModal = dynamic(
  () => import("@/components/shared/ProjectModal").then((m) => m.ProjectModal),
  { ssr: false }
);

export default function AnimationVfxPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialService, setInitialService] = useState<string>("Animation & VFX");
  const [initialEmail, setInitialEmail] = useState<string>("");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleOpenConsultation = (serviceName?: string) => {
    setInitialService(serviceName || "Animation & VFX");
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#d6e6f5] selection:bg-[#1169dc] selection:text-white flex flex-col">
      {/* 1. Signature Hero Section with Spotlight Reveal Mechanic */}
      <VfxHeroSpotlightSection onOpenConsultation={handleOpenConsultation} />

      {/* 2. Production Capabilities & 3D Pipeline Section */}
      <VfxPipelineCapabilitiesSection onOpenConsultation={handleOpenConsultation} />

      {/* 3. Interactive VFX Breakdown, Project Showcase & Final CTA */}
      <VfxBreakdownShowcaseSection onOpenConsultation={handleOpenConsultation} />

      {/* Interactive Global Project Inquiry Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setInitialService("Animation & VFX");
          setInitialEmail("");
        }}
        inquiryType="service"
        source="animation-vfx-page"
        initialEmail={initialEmail}
        initialService={initialService}
        title="Start Your VFX & Animation Project"
        subtitle="Tell us about your 3D, CGI, or visual effects requirements and our studio leads will deliver a customized technical proposal."
      />
    </div>
  );
}
