"use client";

import React, { useState } from "react";
import {
  VfxHeroSpotlightSection,
  VfxPipelineCapabilitiesSection,
  VfxBreakdownShowcaseSection,
} from "@/components/services/animation-vfx";
import { ProjectModal } from "@/components/shared/ProjectModal";

export default function AnimationVfxPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialService, setInitialService] = useState<string>("Animation & VFX");
  const [initialEmail, setInitialEmail] = useState<string>("");

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
