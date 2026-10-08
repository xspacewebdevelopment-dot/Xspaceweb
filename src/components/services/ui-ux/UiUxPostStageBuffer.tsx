"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export interface UiUxPostStageBufferProps {
  onStartProject?: () => void;
}

/**
 * Post-Animation Buffer Section
 * Provides a clean editorial transition that ensures the UI/UX animation
 * finishes and unpins completely before the global footer enters the viewport.
 */
export const UiUxPostStageBuffer: React.FC<UiUxPostStageBufferProps> = ({ onStartProject }) => {
  return (
    <section className="relative w-full bg-white py-20 sm:py-28 md:py-32 border-t border-slate-100 select-none">
      <Container size="wide" className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Subtle Section Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/80 text-[11px] sm:text-xs font-semibold tracking-wider text-[#556987] uppercase mb-4 sm:mb-5 font-mono">
          <span>COMPREHENSIVE UI/UX CAPABILITIES</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#07152B] tracking-tight leading-[1.18] max-w-2xl">
          End-to-End Design Architecture <br className="hidden sm:inline" />
          Across Every Screen & Platform.
        </h2>

        {/* Subtitle */}
        <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base text-[#556987] leading-relaxed max-w-xl">
          From early discovery and user research to high-fidelity design systems and production-ready handoff — crafted to scale with your engineering team.
        </p>

        {/* Core Capabilities Pills */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-xl">
          {[
            "UI Design",
            "UX Research",
            "Web Systems",
            "Mobile Apps",
            "Design Systems",
            "Developer Handoff",
          ].map((pill) => (
            <div
              key={pill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-xs font-medium text-[#07152B]"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1668E8]" />
              <span>{pill}</span>
            </div>
          ))}
        </div>

        {/* Consultation CTA */}
        <div className="mt-8 sm:mt-10">
          <button
            type="button"
            onClick={onStartProject}
            className="px-7 py-3 sm:py-3.5 rounded-full bg-[#1668E8] text-white text-xs sm:text-sm font-semibold hover:bg-[#1255C0] shadow-[0_4px_16px_rgba(22,104,232,0.22)] hover:shadow-[0_6px_22px_rgba(22,104,232,0.32)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <span>Start a Project with Our Design Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </Container>
    </section>
  );
};
