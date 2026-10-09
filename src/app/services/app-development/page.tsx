"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AppDevHeroSection } from "@/components/services/app-development";

const AppDevProjectsSection = dynamic(
  () => import("@/components/services/app-development/AppDevProjectsSection").then((m) => m.AppDevProjectsSection),
  { ssr: true }
);

const ProjectModal = dynamic(
  () => import("@/components/shared/ProjectModal").then((m) => m.ProjectModal),
  { ssr: false }
);

export default function AppDevelopmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

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
