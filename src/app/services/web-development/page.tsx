"use client";

import React, { useState } from "react";
import {
  WebDevHeroSection,
  WebDevCapabilitiesSection,
  WebDevProjectsSection,
  WebDevTechStackSection,
  WebDevProcessSection,
} from "@/components/services/web-development";
import { ProjectModal } from "@/components/shared/ProjectModal";

export default function WebDevelopmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartProject = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#020204] text-white overflow-x-hidden selection:bg-[#38bdf8] selection:text-[#020204]">
      {/* 1. Rotatable 3D Glass Cuboid Chromatic Refraction Hero */}
      <WebDevHeroSection onStartProject={handleStartProject} />

      {/* 2. Core Engineering Capabilities */}
      <WebDevCapabilitiesSection onStartProject={handleStartProject} />

      {/* 3. Flagship Production Web Platforms Showcase */}
      <WebDevProjectsSection onStartProject={handleStartProject} />

      {/* 4. Modern Enterprise Tech Stack */}
      <WebDevTechStackSection />

      {/* 5. 5-Stage Development Lifecycle */}
      <WebDevProcessSection />

      {/* Interactive Project Inquiry Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="service"
        source="web-development-page"
        initialService="Web Development"
        title="Start Your Web Development Project"
        subtitle="Collaborate with our full-stack engineers and cloud architects to build high-concurrency SaaS, custom web apps, and headless platforms."
      />
    </div>
  );
}
