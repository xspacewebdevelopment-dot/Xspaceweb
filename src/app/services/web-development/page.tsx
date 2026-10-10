"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { WebDevHeroSection } from "@/components/services/web-development";

const WebDevCapabilitiesSection = dynamic(
  () => import("@/components/services/web-development/WebDevCapabilitiesSection").then((m) => m.WebDevCapabilitiesSection),
  { ssr: true }
);

const WebDevProjectsSection = dynamic(
  () => import("@/components/services/web-development/WebDevProjectsSection").then((m) => m.WebDevProjectsSection),
  { ssr: true }
);

const WebDevTechStackSection = dynamic(
  () => import("@/components/services/web-development/WebDevTechStackSection").then((m) => m.WebDevTechStackSection),
  { ssr: true }
);

const WebDevProcessSection = dynamic(
  () => import("@/components/services/web-development/WebDevProcessSection").then((m) => m.WebDevProcessSection),
  { ssr: true }
);

const ProjectModal = dynamic(
  () => import("@/components/shared/ProjectModal").then((m) => m.ProjectModal),
  { ssr: false }
);

export default function WebDevelopmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleStartProject = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-blue-600 selection:text-white">
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
