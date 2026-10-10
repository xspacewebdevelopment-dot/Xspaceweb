"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  FileCheck,
  Cpu,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface ComparisonRow {
  aspect: string;
  category: string;
  aiSlop: string;
  aiRisk: string;
  xspaceCraft: string;
  xspaceMoat: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    aspect: "Trademark & Legal IP Ownership",
    category: "LEGAL DEFENSIBILITY",
    aiSlop: "Unprotectable by law. Public domain risk with zero trademark defensibility.",
    aiRisk: "Zero IP Protection",
    xspaceCraft: "100% Exclusive Copyright Assignment & Worldwide Trademark Clearance.",
    xspaceMoat: "Global Defensibility",
  },
  {
    aspect: "Vector Geometry & Typography",
    category: "MATHEMATICAL PRECISION",
    aiSlop: "Hallucinated paths, jagged anchor points, and distorted font curves.",
    aiRisk: "Raster Distortion",
    xspaceCraft: "Mathematical Bézier curves, optical kerning pairs, and custom display ligatures.",
    xspaceMoat: "100% Scalable Vector",
  },
  {
    aspect: "Physical Packaging & Production",
    category: "INDUSTRIAL MANUFACTURING",
    aiSlop: "RGB uncalibrated mockups that fail on factory die-cutters and smear in CMYK.",
    aiRisk: "Factory Press Fail",
    xspaceCraft: "Industrial CAD dielines, spot Pantone codes, and factory-verified prepress files.",
    xspaceMoat: "Zero Production Flaw",
  },
  {
    aspect: "Living Design System Integration",
    category: "DIGITAL INFRASTRUCTURE",
    aiSlop: "Isolated static PNG graphics with no connection to web tokens or UI components.",
    aiRisk: "Fragmented Assets",
    xspaceCraft: "Figma design tokens mapped directly to Tailwind variables and production code.",
    xspaceMoat: "Living Code Sync",
  },
  {
    aspect: "Category Positioning & Moat",
    category: "PRICING POWER",
    aiSlop: "Repetitive visual clichés that blend into the crowd and dilute pricing power.",
    aiRisk: "Commoditized Brand",
    xspaceCraft: "Psychologically anchored brand archetype engineered to command 3x higher pricing.",
    xspaceMoat: "3x Pricing Moat",
  },
];

interface BrandCraftsmanshipShowcaseProps {
  onOpenConsultation?: () => void;
}

export const BrandCraftsmanshipShowcase: React.FC<BrandCraftsmanshipShowcaseProps> = ({
  onOpenConsultation,
}) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "moat" | "risk">("all");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filteredRows = comparisonRows.filter(() => {
    return true; // We highlight rather than hide to maintain structure, or style accordingly
  });

  return (
    <section
      id="brand-craftsmanship"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 overflow-hidden border-t border-blue-900/40"
    >
      {/* Local Ambient Cosmic Aura */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-blue-600/10 blur-[190px]" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[180px]" />
      </div>

      <Container size="wide" className="relative z-10 space-y-14 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-cyan-400 text-xs font-mono font-bold shadow-sm backdrop-blur-xl">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>ARCHITECTURAL RIGOR VS. AI TEMPLATES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12]">
            Why Enterprise Brands Can&apos;t Rely on <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-red-400 via-amber-300 to-cyan-400 bg-clip-text text-transparent">
              Generic AI Shortcuts.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            In an era flooded with generic AI graphics, human architectural precision is your ultimate competitive moat. We forge mathematically sound, legally defensible brand systems that command enduring market value.
          </p>

          {/* End State Badge & Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>ENGINEERED &gt; GENERATED</span>
            </span>

            <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                  activeFilter === "all"
                    ? "bg-slate-900 text-cyan-300 border border-slate-700 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                All 5 Criteria
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("moat")}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                  activeFilter === "moat"
                    ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                XSPACE Moat Focus
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("risk")}
                className={`px-3 py-1 rounded-xl transition-all cursor-pointer ${
                  activeFilter === "risk"
                    ? "bg-rose-950/80 text-rose-300 border border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                AI Shortcut Liabilities
              </button>
            </div>
          </div>
        </div>

        {/* Premium High-Contrast Comparison Matrix Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#07112b]/85 border border-blue-900/60 backdrop-blur-2xl p-6 sm:p-10 overflow-hidden shadow-[0_25px_60px_rgba(2,8,23,0.9)] relative group">
          {/* Subtle Horizon Radar Glow at Top */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-75" />

          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-6 border-b border-slate-800/80 text-xs font-mono font-bold uppercase tracking-wider">
            <div className="md:col-span-4 text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              <span>ARCHITECTURAL CRITERIA</span>
            </div>
            <div className="md:col-span-4 text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>GENERIC AI GENERATORS</span>
            </div>
            <div className="md:col-span-4 text-cyan-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>XSPACE BRAND STUDIO</span>
            </div>
          </div>

          {/* Comparison Rows with Smooth Staggered Hover Elevation */}
          <div className="divide-y divide-slate-900/90 pt-1">
            {filteredRows.map((row, idx) => {
              const isHovered = hoveredIdx === idx;
              const isMoatHighlight = activeFilter === "moat";
              const isRiskHighlight = activeFilter === "risk";

              return (
                <motion.div
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 py-5 items-center rounded-2xl px-3 transition-all duration-300 ${
                    isHovered
                      ? "bg-slate-900/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-slate-800/80"
                      : "border border-transparent hover:bg-slate-900/30"
                  }`}
                >
                  {/* Aspect Title & Category Badge */}
                  <div className="md:col-span-4 space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
                      {row.category}
                    </span>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      {isHovered && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                      )}
                      <span>{row.aspect}</span>
                    </h3>
                  </div>

                  {/* AI Slop Box */}
                  <div
                    className={`md:col-span-4 flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-300 ${
                      isRiskHighlight || isHovered
                        ? "bg-rose-950/30 border-rose-800/60 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                        : "bg-rose-950/15 border-rose-900/30 opacity-80"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-rose-200/90 leading-relaxed">
                        {row.aiSlop}
                      </span>
                    </div>
                    <div className="pt-2 text-right">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-950/80 border border-rose-800/50 text-rose-400 uppercase">
                        {row.aiRisk}
                      </span>
                    </div>
                  </div>

                  {/* XSPACE Craft Box */}
                  <div
                    className={`md:col-span-4 flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-300 ${
                      isMoatHighlight || isHovered
                        ? "bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_20px_rgba(56,189,248,0.25)] scale-[1.01]"
                        : "bg-cyan-950/25 border-cyan-500/30"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-cyan-100 font-medium leading-relaxed">
                        {row.xspaceCraft}
                      </span>
                    </div>
                    <div className="pt-2 text-right">
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 uppercase shadow-sm">
                        {row.xspaceMoat}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Card Summary */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs text-slate-300 font-mono">
                EVERY ENGAGEMENT BACKED BY COMPLETE HANDOVER OF SOURCE ASSETS &amp; IP
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Audit Your Existing Brand</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrandCraftsmanshipShowcase;
