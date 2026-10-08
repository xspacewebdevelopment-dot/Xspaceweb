"use client";

import React, { useState } from "react";
import { AppDevHeroSection, AppDevProjectsSection } from "@/components/services/app-development";
import { ProjectModal } from "@/components/shared/ProjectModal";

export default function AppDevelopmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartProject = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#020204] text-white overflow-x-hidden selection:bg-[#38bdf8] selection:text-[#020204]">
      {/* 1. 3D Cylindrical Hero Section */}
      <AppDevHeroSection onStartProject={handleStartProject} />

      {/* 2. Flagship App Development Projects Section */}
      <AppDevProjectsSection onStartProject={handleStartProject} />

      {/* Interactive Project Inquiry Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="service"
        source="app-development-page"
        initialService="App Development"
        title="Start Your Mobile App Project"
        subtitle="Collaborate with our senior mobile engineers and product architects to build native iOS, Android, and cross-platform applications."
      />
    </div>
  );
}
