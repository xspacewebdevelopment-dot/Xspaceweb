"use client";

import React from "react";
import { ArrowRight, Compass, ChevronDown } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { HERO_CONTENT } from "./data";

export interface UiUxHeroHeaderProps {
  onStartProject?: () => void;
  onExploreServices?: () => void;
}

/**
 * Editorial Hero Header Component
 * Sits in normal document flow at the top of the UI/UX service page.
 * Clean, minimal, spacious without unnecessary empty vertical gap.
 */
export const UiUxHeroHeader: React.FC<UiUxHeroHeaderProps> = ({
  onStartProject,
  onExploreServices,
}) => {
  const handleScrollToStage = () => {
    if (onExploreServices) {
      onExploreServices();
    } else {
      const stageEl = document.getElementById("uiux-animation-stage-trigger");
      if (stageEl) {
        stageEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="relative w-full bg-[#FAFBFD] pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 text-center select-none overflow-hidden border-b border-slate-100/80">
      {/* Subtle atmospheric ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(22, 104, 232, 0.05) 0%, transparent 70%),
            radial-gradient(circle at 85% 80%, rgba(148, 163, 184, 0.03) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10 flex flex-col items-center">
        {/* 1. Category Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] mb-4 sm:mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.20em] text-[#1668E8] uppercase select-none font-mono">
            {HERO_CONTENT.category}
          </span>
        </div>

        {/* 2. Strong Display Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-[#07152B] tracking-tight leading-[1.12] max-w-3xl">
          <span className="block">{HERO_CONTENT.headlineLine1}</span>
          <span className="block text-[#07152B]/90 mt-1 sm:mt-1.5">
            {HERO_CONTENT.headlineLine2}
          </span>
        </h1>

        {/* 3. Supporting Description */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#556987] leading-relaxed max-w-2xl font-normal">
          {HERO_CONTENT.description}
        </p>

        {/* 4. Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pointer-events-auto">
          <button
            type="button"
            onClick={onStartProject}
            className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#1668E8] text-white text-xs sm:text-sm font-semibold hover:bg-[#1255C0] shadow-[0_4px_16px_rgba(22,104,232,0.22)] hover:shadow-[0_6px_22px_rgba(22,104,232,0.32)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <span>{HERO_CONTENT.primaryCta.label}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>

          <button
            type="button"
            onClick={handleScrollToStage}
            className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-[#07152B] border border-slate-200/90 text-xs sm:text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <span>{HERO_CONTENT.secondaryCta.label}</span>
            <Compass className="w-4 h-4 text-[#556987]" />
          </button>
        </div>

        {/* Subtle scroll cue down to dedicated animation stage */}
        <button
          type="button"
          onClick={handleScrollToStage}
          className="mt-10 sm:mt-12 inline-flex items-center gap-2 text-xs font-mono text-[#556987] hover:text-[#1668E8] transition-colors cursor-pointer group"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive Service Showcase Below</span>
          <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </Container>
    </header>
  );
};
