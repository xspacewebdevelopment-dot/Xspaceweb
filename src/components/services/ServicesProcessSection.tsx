"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight, Lightbulb, Compass, Code, Rocket } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
  icon: React.ReactNode;
}

const steps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Strategy",
    subtitle: "Goal alignment, architecture blueprint, market positioning",
    description:
      "We begin by thoroughly understanding your business objectives, target audience demographics, competitive landscape, and technical requirements. We then craft a strategic roadmap with clear milestones.",
    deliverables: [
      "Technical Architecture Blueprint",
      "User Persona & Journey Maps",
      "Project Scope & Sprint Milestones",
      "Tech Stack & Infrastructure Plan",
    ],
    duration: "Week 1",
    icon: <Compass className="w-6 h-6 text-[#1668E8]" />,
  },
  {
    step: "02",
    title: "UI/UX & Prototyping",
    subtitle: "Wireframes, high-fidelity UI, interactive clickable prototype",
    description:
      "Our design squad translates strategy into intuitive visual experiences. We build comprehensive design systems in Figma, conduct user flow tests, and deliver clickable prototypes before writing a line of code.",
    deliverables: [
      "Wireframe Information Architecture",
      "High-Fidelity Figma Component Library",
      "Interactive Prototype for Validation",
      "UX Usability & Accessibility Audit",
    ],
    duration: "Weeks 2 – 3",
    icon: <Lightbulb className="w-6 h-6 text-[#9333EA]" />,
  },
  {
    step: "03",
    title: "Agile Development",
    subtitle: "Clean code sprints, CI/CD pipelines, staging demos",
    description:
      "We build robust, scalable, and high-speed applications using modern web and mobile frameworks. Weekly sprint reviews and live staging environments keep you in complete control of development progress.",
    deliverables: [
      "Clean, Documented Source Code",
      "Weekly Staging Builds & Live Demos",
      "Automated CI/CD Deployment Pipelines",
      "End-to-End API Integration",
    ],
    duration: "Weeks 4 – 8",
    icon: <Code className="w-6 h-6 text-[#10B981]" />,
  },
  {
    step: "04",
    title: "QA, Launch & Scale",
    subtitle: "Security tests, sub-second speed optimization, live rollout",
    description:
      "Before production deployment, your product undergoes thorough stress testing, cross-browser audits, SEO optimization, and security checks. After launch, we provide dedicated support to scale your growth.",
    deliverables: [
      "Comprehensive QA Test Matrix",
      "SEO & Core Web Vitals Optimization",
      "Production Cloud Deployment & DNS",
      "Post-Launch Analytics & SLA Support",
    ],
    duration: "Ongoing",
    icon: <Rocket className="w-6 h-6 text-[#F59E0B]" />,
  },
];

export const ServicesProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="w-full py-16 sm:py-24 bg-[#F8FAFC] relative overflow-hidden border-y border-slate-200/80">
      <Container size="wide">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 text-[#1668E8] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Delivery Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight">
            How We Turn Ideas into <br className="hidden sm:inline" />
            <span className="text-[#1668E8]">High-Impact Reality</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our transparent 4-stage engineering and design lifecycle guarantees predictable timelines, zero surprises, and exceptional quality.
          </p>
        </div>

        {/* Process Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const isActive = activeStep === index;

            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(index)}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-white border-blue-400 shadow-[0_12px_32px_rgba(22,104,232,0.15)] ring-2 ring-blue-500/20 -translate-y-1.5"
                    : "bg-white/80 border-slate-200/90 hover:border-slate-300 hover:shadow-lg"
                }`}
              >
                <div>
                  {/* Step Top Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-sm">
                      {item.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                        {item.duration}
                      </span>
                      <span className="text-2xl font-black text-slate-300">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-extrabold text-[#07152B] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-4 border-t border-slate-100 space-y-2 mt-auto">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Outcomes
                  </span>
                  {item.deliverables.map((del, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
