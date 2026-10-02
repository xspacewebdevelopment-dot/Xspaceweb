"use client";

import React, { useState } from "react";
import { ServicesHeroSection } from "@/components/services/ServicesHeroSection";
import { ServicesSolutionsGrid } from "@/components/services/ServicesSolutionsGrid";
import { ServicesApproachSection } from "@/components/services/ServicesApproachSection";
import { ServicesCosmicContactSection } from "@/components/services/ServicesCosmicContactSection";
import { ProjectModal } from "@/components/shared/ProjectModal";

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialEmail, setInitialEmail] = useState<string>("");
  const [initialService, setInitialService] = useState<string>("");

  const handleOpenGeneralQuote = (email?: string) => {
    setInitialEmail(email || "");
    setIsModalOpen(true);
  };

  const handleSelectService = (serviceTitle: string) => {
    setInitialService(serviceTitle);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#07152B] min-h-screen text-white">
      {/* 1. Hero Section */}
      <ServicesHeroSection onOpenModal={handleOpenGeneralQuote} />

      {/* 2. Eight Core Solutions Grid */}
      <ServicesSolutionsGrid onSelectService={handleSelectService} />

      {/* 3. Methodology & Approach */}
      <ServicesApproachSection />

      {/* 4. Cosmic Creative CTA (Bottom) */}
      <ServicesCosmicContactSection onOpenModal={handleOpenGeneralQuote} />

      {/* Reusable Inquiry Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setInitialService("");
          setInitialEmail("");
        }}
        inquiryType="service"
        source="services-page"
        initialEmail={initialEmail}
        initialService={initialService}
      />
    </div>
  );
}
