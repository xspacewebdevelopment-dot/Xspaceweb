"use client";

import React, { useState } from "react";
import {
  GmbHeroSection,
  GmbThreeStagesSection,
  GmbFaqCtaSection,
} from "@/components/services/google-my-business";
import { ProjectModal } from "@/components/shared/ProjectModal";

export default function GoogleMyBusinessPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialService, setInitialService] = useState<string>(
    "Google My Business"
  );
  const [initialEmail, setInitialEmail] = useState<string>("");

  const handleOpenConsultation = (serviceName?: string) => {
    setInitialService(serviceName || "Google My Business Optimization");
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-white selection:bg-[#1668E8] selection:text-white flex flex-col">
      {/* 1. Signature Hero Section with CloudFront Video & GMB Dashboard Glass Preview */}
      <GmbHeroSection
        onOpenConsultation={handleOpenConsultation}
        onExploreStages={() => {
          const el = document.getElementById("gmb-three-stages");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 2. Three Stages Scrollable Blueprint + Sticky GMB Command Dashboard */}
      <GmbThreeStagesSection
        onOpenConsultation={handleOpenConsultation}
      />

      {/* 3. FAQ Accordion & Final High-Conversion Blue CTA Panel */}
      <GmbFaqCtaSection
        onOpenConsultation={handleOpenConsultation}
      />

      {/* Interactive Global Project Inquiry Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setInitialService("Google My Business");
          setInitialEmail("");
        }}
        inquiryType="service"
        source="google-my-business-page"
        initialEmail={initialEmail}
        initialService={initialService}
        title="Start Your Google My Business Growth"
        subtitle="Get your verified Google Business Profile ranking in the Local 3-Pack and driving steady inbound calls."
      />
    </div>
  );
}
