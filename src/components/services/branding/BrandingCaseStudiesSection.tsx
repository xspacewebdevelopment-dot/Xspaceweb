"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Award,
  Layers,
  Activity,
  Droplets,
  Crown,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface BrandCaseStudy {
  id: string;
  client: string;
  industry: string;
  badge: string;
  badgeColor: string;
  headline: string;
  challenge: string;
  solution: string;
  image: string;
  metrics: { value: string; label: string }[];
  accentColor: string;
  assetTheme: "luxury" | "botanical" | "spatial";
}

const studies: BrandCaseStudy[] = [
  {
    id: "aura-luxe",
    client: "Aura Luxe Haute Couture",
    industry: "Luxury Direct-to-Consumer Fashion",
    badge: "LUXURY FASHION & LIFESTYLE",
    badgeColor: "border-purple-500/40 text-purple-300 bg-purple-950/40",
    headline: "Scaling a Heritage Fashion Label into a High-Converting Omnichannel Powerhouse",
    challenge:
      "Legacy brand fragmentation across global channels, 68% mobile drop-off rate, and inconsistent visual identity diluted premium pricing tolerance.",
    solution:
      "Constructed a comprehensive 70-page master identity guide, bespoke vector serif typography, and a headless Next.js digital experience with sub-second checkout.",
    image: "/images/services/branding/visual_identity.jpg",
    metrics: [
      { value: "+340%", label: "Brand Equity Valuation Lift" },
      { value: "4.8x", label: "Blended Return on Ad Spend (ROAS)" },
      { value: "1.1s", label: "Sub-Second Global Load Time" },
    ],
    accentColor: "#a855f7",
    assetTheme: "luxury",
  },
  {
    id: "aether-parfum",
    client: "Aether Botanicals & Fragrance",
    industry: "Luxury Beauty & Sustainable Packaging",
    badge: "SUSTAINABLE 3D PACKAGING",
    badgeColor: "border-cyan-500/40 text-cyan-300 bg-cyan-950/40",
    headline: "Doubling Shelf Velocity with 8K Octane 3D Packaging Renders and Tactile Foil Dielines",
    challenge:
      "High photography studio overhead, slow turnaround on new fragrance releases, and low marketplace click-through against legacy cosmetics conglomerates.",
    solution:
      "Engineered sustainable factory-ready dielines with metallic hot-stamp foil, accompanied by 8K photorealistic 3D CGI product renders that eliminated physical shoot costs.",
    image: "/images/services/branding/luxury_packaging.jpg",
    metrics: [
      { value: "3.2x", label: "Marketplace Search CTR" },
      { value: "-70%", label: "Time-to-Market for New SKUs" },
      { value: "+118%", label: "Average Order Value (AOV)" },
    ],
    accentColor: "#38bdf8",
    assetTheme: "botanical",
  },
  {
    id: "vortex-tech",
    client: "Vortex Spatial & Audio",
    industry: "Consumer Electronics & Hardware",
    badge: "SPATIAL HARDWARE & UX",
    badgeColor: "border-emerald-500/40 text-emerald-300 bg-emerald-950/40",
    headline: "Dominating Global Categories Through Living Design Tokens and Kinetic 3D UI",
    challenge:
      "High customer acquisition cost and loss of category distinctiveness in a crowded hardware segment dominated by generic tech aesthetics.",
    solution:
      "Forged an industrial-grade cybernetic brand language with 400+ Figma design tokens synced directly to production code, backed by 3D product viewports.",
    image: "/images/services/branding/omnichannel_showcase.jpg",
    metrics: [
      { value: "99.4%", label: "Category Recall & Memorability" },
      { value: "₹45Cr+", label: "Annual Omnichannel GMV" },
      { value: "100%", label: "Worldwide Trademark Defensibility" },
    ],
    accentColor: "#10b981",
    assetTheme: "spatial",
  },
];

interface BrandingCaseStudiesSectionProps {
  onOpenConsultation?: () => void;
}

export const BrandingCaseStudiesSection: React.FC<BrandingCaseStudiesSectionProps> = ({
  onOpenConsultation,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeStudy = studies[activeIdx];

  // 3D Scroll Entrance (Container Scroll style entrance: rotateX 18deg -> 0, scale 0.88 -> 1, translateY 70px -> 0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.4, 0.85, 1]);

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % studies.length);
  };

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + studies.length) % studies.length);
  };

  return (
    <section
      ref={containerRef}
      id="brand-case-studies"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 overflow-hidden border-t border-slate-900/80 [perspective:1400px]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full blur-[190px] opacity-20 transition-colors duration-700"
          style={{
            background: `radial-gradient(circle, ${activeStudy.accentColor} 0%, transparent 70%)`,
          }}
        />
      </div>

      <Container size="wide" className="relative z-10 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-cyan-400 text-xs font-mono font-bold shadow-sm backdrop-blur-xl">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>EMPIRICAL BENCHMARKS &amp; ENTERPRISE PROOF</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Transforming Brands into <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Category-Defining Leaders.
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Real metrics from brands that scaled from regional players to market authorities with our bespoke architectural brand systems.
            </p>
          </div>

          {/* Interactive Case Study Selectors */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-xl">
              {studies.map((s, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white border shadow-md"
                        : "text-slate-400 hover:text-white"
                    }`}
                    style={
                      isActive
                        ? {
                            borderColor: s.accentColor,
                            color: s.accentColor,
                          }
                        : undefined
                    }
                  >
                    <span>{s.client.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous case"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 hover:text-white transition-colors cursor-pointer"
                aria-label="Next case"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Container Scroll Portfolio Deck Entrance */}
        <motion.div
          style={{
            rotateX,
            scale,
            y: translateY,
            opacity,
            transformStyle: "preserve-3d",
          }}
          className="relative rounded-3xl bg-slate-950/75 border border-slate-800/90 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] group will-change-transform"
        >
          {/* Subtle Outer Neon Border Glow */}
          <div
            className="absolute -inset-0.5 rounded-3xl opacity-30 pointer-events-none -z-1 transition-colors duration-700"
            style={{
              background: `radial-gradient(circle at top right, ${activeStudy.accentColor} 0%, transparent 60%)`,
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStudy.id}
              initial={{ opacity: 0, scale: 0.96, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.97, filter: "blur(5px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider border ${activeStudy.badgeColor}`}
                    >
                      {activeStudy.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {activeStudy.industry}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {activeStudy.headline}
                  </h3>
                </div>

                {/* Problem / Solution split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-rose-400 uppercase">
                      CHALLENGE
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeStudy.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
                      ARCHITECTURAL SOLUTION
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Outcome Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {activeStudy.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800"
                    >
                      <div
                        className="text-2xl sm:text-3xl font-black tracking-tight"
                        style={{ color: activeStudy.accentColor }}
                      >
                        {m.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenConsultation}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-slate-950 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    style={{
                      backgroundColor: activeStudy.accentColor,
                      boxShadow: `0 0 25px ${activeStudy.accentColor}50`,
                    }}
                  >
                    <span>Replicate These Results</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Showcase Image with Animated Thematic Visual Layers */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 bg-slate-900/70 p-2 shadow-2xl group/img">
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950">
                    <Image
                      src={activeStudy.image}
                      alt={activeStudy.client}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* THEME 1: Aura Luxe — Luxury metallic / fashion visual layer */}
                    {activeStudy.assetTheme === "luxury" && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/30 via-transparent to-amber-500/10" />
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-purple-400/40 text-[9px] font-mono text-purple-200">
                          <Crown className="w-3 h-3 text-amber-300" />
                          <span>HAUTE COUTURE SPEC</span>
                        </div>
                      </div>
                    )}

                    {/* THEME 2: Aether Parfum — Botanical / fragrance layer */}
                    {activeStudy.assetTheme === "botanical" && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/30 via-transparent to-emerald-500/10" />
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-cyan-400/40 text-[9px] font-mono text-cyan-200">
                          <Droplets className="w-3 h-3 text-cyan-300" />
                          <span>8K OCTANE GLASS REFRACTION</span>
                        </div>
                      </div>
                    )}

                    {/* THEME 3: Vortex Tech — Spatial / audio geometry layer */}
                    {activeStudy.assetTheme === "spatial" && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/30 via-transparent to-cyan-500/10" />
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-emerald-400/40 text-[9px] font-mono text-emerald-200">
                          <Activity className="w-3 h-3 text-emerald-300 animate-pulse" />
                          <span>SPATIAL OSCILLOSCOPE MATRIX</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md">
                    <span className="text-xs font-bold text-white">
                      {activeStudy.client}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400">
                      VERIFIED CLIENT CASE
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};

export default BrandingCaseStudiesSection;
