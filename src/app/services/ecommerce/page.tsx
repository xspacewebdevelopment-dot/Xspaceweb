"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { EcommerceScrollHero } from "@/components/services/ecommerce";

const EcommerceMarketplacesSection = dynamic(
  () => import("@/components/services/ecommerce").then((m) => m.EcommerceMarketplacesSection),
  { ssr: true }
);

const BrandingCreativeSection = dynamic(
  () => import("@/components/services/branding").then((m) => m.BrandingCreativeSection),
  { ssr: true }
);

const BrandingCaseStudiesSection = dynamic(
  () => import("@/components/services/branding").then((m) => m.BrandingCaseStudiesSection),
  { ssr: true }
);

const BrandingProcessSection = dynamic(
  () => import("@/components/services/branding").then((m) => m.BrandingProcessSection),
  { ssr: true }
);

const BrandingTechStackSection = dynamic(
  () => import("@/components/services/branding").then((m) => m.BrandingTechStackSection),
  { ssr: true }
);

const BrandingFaqSection = dynamic(
  () => import("@/components/services/branding").then((m) => m.BrandingFaqSection),
  { ssr: true }
);

const BrandingConsultationSection = dynamic(
  () => import("@/components/services/branding").then((m) => m.BrandingConsultationSection),
  { ssr: true }
);

const ProjectModal = dynamic(
  () => import("@/components/shared/ProjectModal").then((m) => m.ProjectModal),
  { ssr: false }
);

export default function EcommerceSolutionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialService, setInitialService] = useState<string>("eCommerce Solutions & Omnichannel Launch");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleLaunchStore = () => {
    setInitialService("eCommerce Solutions & Omnichannel Launch");
    setIsModalOpen(true);
  };

  const handleOpenConsultation = (serviceName?: string) => {
    setInitialService(serviceName || "Marketplace Architecture & Syndication");
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#020412] text-white selection:bg-[#38bdf8] selection:text-[#020412]">
      {/* 1. Cinematic Realistic Space 3D Hero: Living Starfield, Moving Particles, Purple/Blue Nebula Atmosphere */}
      <EcommerceScrollHero
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
        onOpenConsultation={() => handleOpenConsultation("eCommerce & Marketplace FAQ")}
      />

      {/* 8. Dedicated Cosmic Proposal & Architecture Consultation Form */}
      <BrandingConsultationSection />

      {/* Global Interactive Project / Consultation Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="service"
        source="ecommerce-solutions-page"
        initialService={initialService}
        title="Launch Your eCommerce Ecosystem"
        subtitle="Connect with our commerce architects to design, syndicate, and scale your brand across multiple marketplaces."
      />
    </div>
  );
}
