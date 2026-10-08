"use client";

import React, { useState } from "react";
import {
  EcommerceMarketplacesSection,
} from "@/components/services/ecommerce";
import {
  BrandingRocketHero,
  BrandingCreativeSection,
  BrandingCaseStudiesSection,
  BrandingProcessSection,
  BrandingTechStackSection,
  BrandingFaqSection,
  BrandingConsultationSection,
} from "@/components/services/branding";
import { ProjectModal } from "@/components/shared/ProjectModal";

export default function BrandingAndEcommercePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialService, setInitialService] = useState<string>("Brand Identity & Omnichannel Launch");

  const handleLaunchStore = () => {
    setInitialService("Brand Identity & Omnichannel Launch");
    setIsModalOpen(true);
  };

  const handleOpenConsultation = (serviceName?: string) => {
    setInitialService(serviceName || "Marketplace Architecture & Syndication");
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#020412] text-white selection:bg-[#38bdf8] selection:text-[#020412]">
      {/* 1. Cinematic Rocket Video Background Hero (No scrolling animation lock) */}
      <BrandingRocketHero
        onLaunchStore={handleLaunchStore}
        onMarketplaceConsultation={() => handleOpenConsultation("Marketplace Architecture & Syndication")}
      />

      {/* 2. Omnichannel Marketplace Ecosystem Architecture */}
      <EcommerceMarketplacesSection
        onOpenConsultation={() => handleOpenConsultation("Omnichannel Marketplace Architecture")}
      />

      {/* 3. Brand Identity & Creative Systems: 3D Packaging, Headless UI, Visual Assets */}
      <BrandingCreativeSection
        onOpenConsultation={() => handleOpenConsultation("Brand Identity & Design System")}
      />

      {/* 4. Proven Enterprise Case Studies & Metrics */}
      <BrandingCaseStudiesSection
        onOpenConsultation={() => handleOpenConsultation("Enterprise Commerce Case Studies")}
      />

      {/* 5. 4-Stage Architectural Roadmap */}
      <BrandingProcessSection
        onOpenConsultation={() => handleOpenConsultation("Architectural Roadmap Consultation")}
      />

      {/* 6. Enterprise Commerce & Marketplace Technology Stack */}
      <BrandingTechStackSection />

      {/* 7. Frequently Asked Questions */}
      <BrandingFaqSection
        onOpenConsultation={() => handleOpenConsultation("Brand & Marketplace FAQ")}
      />

      {/* 8. Dedicated Cosmic Proposal & Architecture Consultation Form */}
      <BrandingConsultationSection />

      {/* Global Interactive Project / Consultation Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="service"
        source="branding-services-page"
        initialService={initialService}
        title="Launch Your Brand & eCommerce Architecture"
        subtitle="Connect directly with our senior commerce specialists and design architects to build a custom scaling roadmap."
      />
    </div>
  );
}
