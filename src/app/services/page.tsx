"use client";

import React, { useState } from "react";
import {
  ServicesHeroSection,
  ServicesSolutionsSection,
  ServicesCosmicContactSection,
} from "@/components/services";
import { ProjectModal } from "@/components/shared/ProjectModal";

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialEmail, setInitialEmail] = useState<string>("");
  const [initialService, setInitialService] = useState<string>("");

  const handleOpenGeneralQuote = (email?: string) => {
    setInitialEmail(email || "");
    setIsModalOpen(true);
  };

  const handleSelectServiceQuote = (serviceName: string) => {
    setInitialService(serviceName);
    setIsModalOpen(true);
  };

  const handleScrollToSolutions = () => {
    const el = document.getElementById("services-solutions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Exact Replica Hero Section Matching Reference Image 1 */}
      <ServicesHeroSection onGetStarted={handleOpenGeneralQuote} />

      {/* 2. Solutions for Every Business Need (8 Services Grid Matching Reference Image 2) */}
      <div id="services-solutions">
        <ServicesSolutionsSection onExploreService={handleSelectServiceQuote} />
      </div>

      {/* 3. Cosmic Creation of Adam AI Section + Contact Form Matching Reference Image 3 */}
      <ServicesCosmicContactSection onExploreServicesClick={handleScrollToSolutions} />

      {/* Global Interactive Proposal Form Modal */}
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
