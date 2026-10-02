"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import BlurText from "@/components/ui/BlurText";

interface FeaturePillar {
  title: string;
  description: string;
  renderIcon: () => React.ReactNode;
}

const pillars: FeaturePillar[] = [
  {
    title: "Innovation First",
    description: "We build solutions for real-world problems.",
    renderIcon: () => (
      <svg
        className="w-7 h-7 text-[#1668E8]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Lightbulb with idea sparks */}
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2v1" />
        <path d="M4.93 4.93l.7.7" />
        <path d="M19.07 4.93l-.7.7" />
      </svg>
    ),
  },
  {
    title: "Reliable Technology",
    description: "Secure, scalable and future-ready products.",
    renderIcon: () => (
      <svg
        className="w-7 h-7 text-[#1668E8]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Shield with protection leaf / check */}
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "People-Centric",
    description: "Designed for businesses, creators and communities.",
    renderIcon: () => (
      <svg
        className="w-7 h-7 text-[#1668E8]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Group of people */}
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Global Vision",
    description: "From India to the world.",
    renderIcon: () => (
      <svg
        className="w-7 h-7 text-[#1668E8]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Globe */}
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
];

export const WhoWeAreSection: React.FC = () => {
  return (
    <section id="about" className="w-full pt-4 sm:pt-6 pb-16 sm:pb-24 bg-white relative">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN: Dark Team Banner Card */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#040D1B] border border-slate-800/80 shadow-2xl p-7 sm:p-9 md:p-11 flex flex-col justify-between min-h-[420px] sm:min-h-[460px] group">
            {/* Background Office Image with smooth fade gradient */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
              <Image
                src="/images/about/team_impact.jpg"
                alt="XSPACEWEB team collaboration in modern studio"
                fill
                className="object-cover object-center opacity-30 md:opacity-35 scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              {/* Dark Navy Atmospheric Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#040D1B] via-[#040D1B]/95 md:via-[#040D1B]/90 to-[#07152B]/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040D1B] via-transparent to-transparent opacity-80" />
            </div>

            {/* Top Text Content */}
            <div className="relative z-10 space-y-4 sm:space-y-5">
              {/* Eyebrow */}
              <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.22em] text-[#94A3B8] uppercase select-none block">
                WHO WE ARE
              </span>

              {/* Main Heading */}
              <BlurText
                text="A Team That Turns Ideas Into Impact"
                delay={100}
                animateBy="words"
                direction="top"
                stepDuration={0.4}
                className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-white tracking-tight leading-[1.16]"
                as="h2"
              />

              {/* Body Text */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl pt-1">
                XSPACEWEB PRIVATE LIMITED is an Indian technology company focused
                on building innovative SaaS products and delivering end-to-end
                digital solutions.
              </p>
            </div>

            {/* Bottom Content: Bullet Pills & CTA Button */}
            <div className="relative z-10 pt-6 sm:pt-8 space-y-6">
              {/* 3 Checkmark Pills */}
              <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2.5">
                <div className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-white select-none">
                  <Check className="w-4 h-4 text-white stroke-[2.8]" />
                  <span>Product Driven</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-white select-none">
                  <Check className="w-4 h-4 text-white stroke-[2.8]" />
                  <span>Client Focused</span>
                </div>
                <div className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-white select-none">
                  <Check className="w-4 h-4 text-white stroke-[2.8]" />
                  <span>Future Ready</span>
                </div>
              </div>

              {/* White Pill CTA Button */}
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-white text-[#07152B] text-sm sm:text-[15px] font-bold hover:bg-slate-100 hover:shadow-xl transition-all duration-200 active:scale-[0.98] group/btn"
                >
                  <span>More About Us</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1 text-[#07152B]" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 2x2 Pillars Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8 content-center h-full py-2 lg:py-6 pl-0 lg:pl-2">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col items-start group"
              >
                {/* Circular Icon Badge */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#EBF3FE] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-[0_4px_16px_rgba(22,104,232,0.1)]">
                  {pillar.renderIcon()}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-[19px] font-extrabold text-[#07152B] tracking-tight mb-1.5 group-hover:text-[#1668E8] transition-colors">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#556987] leading-relaxed max-w-[240px]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};
