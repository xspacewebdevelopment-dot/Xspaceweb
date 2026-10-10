"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Palette,
  Box,
  Monitor,
  CheckCircle2,
  TrendingUp,
  Eye,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export interface BrandIdentityHeroSectionProps {
  onOpenConsultation?: (service?: string) => void;
  onLaunchStore?: () => void;
  onMarketplaceConsultation?: () => void;
  className?: string;
}

interface ProjectShowcase {
  id: string;
  client: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  deliverables: string[];
  metrics: { stat: string; label: string };
  badgeColor: string;
}

const SHOWCASE_PROJECTS: ProjectShowcase[] = [
  {
    id: "identity",
    client: "Aura Studio",
    category: "Brand Strategy & Visual Identity",
    tagline: "High-fashion minimalist identity with bespoke editorial typography.",
    description:
      "A complete reimagining of modern luxury. Proprietary logomarks, serif display typography, and a cohesive stationery suite calibrated across physical print and digital touchpoints.",
    image: "/images/services/branding/visual_identity.jpg",
    deliverables: ["Vector Logomark", "Editorial Type System", "60+ Page Brand Bible", "Print Dielines"],
    metrics: { stat: "+85%", label: "Category Recall" },
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40",
  },
  {
    id: "packaging",
    client: "Vesper Botanical",
    category: "Structural Packaging & 3D CGI",
    tagline: "Sustainable luxury dielines with photorealistic 8K Octane renders.",
    description:
      "Engineered to dominate both physical shelves and digital marketplaces. Precision structural carton dielines, foil-stamping masks, and studio-grade 3D renders that eliminated physical photoshoot costs.",
    image: "/images/services/branding/luxury_packaging.jpg",
    deliverables: ["CAD Dielines", "8K Octane CGI", "Blind Deboss Masks", "Amazon A+ Content"],
    metrics: { stat: "3.4x", label: "Search Click-Through" },
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-950/40",
  },
  {
    id: "tokens",
    client: "Helix Core",
    category: "Living Design Systems & Tokens",
    tagline: "400+ Figma variables synced directly to production code.",
    description:
      "Bridging the divide between design and engineering. Centralized token architecture mapped directly to Tailwind CSS variables, accelerating shipping velocity across multi-disciplinary teams.",
    image: "/images/services/branding/design_tokens.jpg",
    deliverables: ["400+ Figma Tokens", "Tailwind Theme Sync", "Atomic UI Components", "Handoff Playbook"],
    metrics: { stat: "-70%", label: "Handoff Time" },
    badgeColor: "text-indigo-400 border-indigo-500/30 bg-indigo-950/40",
  },
  {
    id: "digital",
    client: "Vortex Spatial",
    category: "Omnichannel Storefront UX & Motion",
    tagline: "Sub-second headless storefronts engineered for ruthless conversion.",
    description:
      "Fusing aesthetic precision with Next.js 15 performance. Mobile-first micro-interactions, responsive 3D asset viewers, and frictionless 1-click checkouts optimized for high average order values.",
    image: "/images/services/branding/omnichannel_showcase.jpg",
    deliverables: ["Headless Next.js", "Kinetic Motion", "1-Click Checkout", "99+ Core Web Vitals"],
    metrics: { stat: "+48%", label: "Conversion Lift" },
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40",
  },
];

const MARQUEE_DISCIPLINES = [
  "BRAND STRATEGY",
  "VISUAL IDENTITY",
  "LIVING DESIGN SYSTEMS",
  "STRUCTURAL 3D PACKAGING",
  "EDITORIAL TYPOGRAPHY",
  "OMNICHANNEL STOREFRONTS",
  "CREATIVE DIRECTION",
  "MOTION DESIGN",
  "TRADEMARK CLEARANCE",
];

export const BrandIdentityHeroSection: React.FC<BrandIdentityHeroSectionProps> = ({
  onOpenConsultation,
  onLaunchStore,
  onMarketplaceConsultation,
  className = "",
}) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 21st Interactive Mouse Gravity coordinates
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [smoothPos, setSmoothPos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    let animationFrameId: number;

    const smoothUpdate = () => {
      setSmoothPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.08,
        y: prev.y + (mousePos.y - prev.y) * 0.08,
      }));
      animationFrameId = requestAnimationFrame(smoothUpdate);
    };

    animationFrameId = requestAnimationFrame(smoothUpdate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const activeProject = SHOWCASE_PROJECTS[activeProjectIdx];

  const handleCta = () => {
    if (onOpenConsultation) {
      onOpenConsultation("Brand Identity & Design System Architecture");
    }
  };

  const scrollToWork = () => {
    const el = document.getElementById("brand-case-studies");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="brand-hero-forge"
      className={`relative w-full bg-[#020817] text-white overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-24 select-none border-b border-blue-900/40 ${className}`}
    >
      {/* =========================================================
          21ST-INSPIRED INTERACTIVE FLUID GRADIENT MESH BACKGROUND
          ========================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Midnight Blue Deep Base Surface */}
        <div className="absolute inset-0 bg-[#020817]" />

        {/* Morphing Liquid Fluid Gradient Spheres (21st Mesh System) */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[140px] opacity-25 transition-transform duration-700 pointer-events-none animate-pulse"
          style={{
            background: "radial-gradient(circle, #2563eb 0%, #1d4ed8 50%, transparent 75%)",
            left: `${smoothPos.x * 60}%`,
            top: `${smoothPos.y * 50}%`,
            transform: "translate(-50%, -50%)",
            animationDuration: "12s",
          }}
        />

        <div
          className="absolute top-1/4 right-[-100px] w-[700px] h-[700px] rounded-full blur-[160px] opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, #0284c7 40%, transparent 70%)",
          }}
        />

        <div
          className="absolute bottom-[-150px] left-[-100px] w-[750px] h-[750px] rounded-full blur-[170px] opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #4f46e5 0%, #3730a3 40%, transparent 70%)",
          }}
        />

        {/* High-End Tactile Film Grain Overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle Architectural Horizontal Line Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to bottom, #38bdf8 1px, transparent 1px)`,
            backgroundSize: "100% 64px",
          }}
        />
      </div>

      <Container size="wide" className="relative z-10 space-y-16 sm:space-y-20">
        {/* =========================================================
            HEADER KICKER STRIP: STATUS & AGENCY DECLARATION
            ========================================================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#07112b]/90 border border-blue-800/60 shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.2em] text-cyan-300 uppercase font-mono">
              XSPACEWEB // STRATEGIC BRANDING &amp; DESIGN STUDIO
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Now Scheduling Q4 / Q1 Brand Architecture Sprints</span>
          </div>
        </div>

        {/* =========================================================
            EDITORIAL HERO HEADLINE (COLLINS & STUDIO FREIGHT STYLE)
            ========================================================= */}
        <div className="space-y-6 max-w-5xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tight leading-[0.98] uppercase">
            We Shape Brands <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              That Lead Categories.
            </span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 font-normal leading-relaxed max-w-3xl">
            We partner with ambitious founders and enterprise leaders to forge distinctive visual identities, scalable living design systems, and tactile packaging that command undeniable market authority.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleCta}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/40 flex items-center gap-2.5 cursor-pointer active:scale-98"
            >
              <span>Commission Brand Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={scrollToWork}
              className="px-8 py-4 rounded-2xl bg-[#07112b]/80 hover:bg-blue-950 border border-blue-900/70 hover:border-cyan-500/40 text-slate-200 hover:text-white font-bold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Selected Works</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* =========================================================
            INTERACTIVE FEATURED WORKS SHOWCASE (KOTO & STUDIO FREIGHT)
            Full-bleed interactive cards with photography, not fake widgets
            ========================================================= */}
        <div className="space-y-6 pt-4">
          {/* Project Switcher Navigation Rail */}
          <div className="flex items-center justify-between border-b border-blue-900/40 pb-4 flex-wrap gap-4">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto max-w-full pb-1">
              {SHOWCASE_PROJECTS.map((proj, idx) => {
                const isActive = activeProjectIdx === idx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProjectIdx(idx)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-cyan-400/40 scale-[1.02]"
                        : "text-slate-400 hover:text-white hover:bg-blue-950/60 border border-transparent"
                    }`}
                  >
                    <span className="opacity-70">0{idx + 1}</span>
                    <span>{proj.client}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Selected Identity Works &amp; Systems
            </span>
          </div>

          {/* Active Work Showcase Feature Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-3xl bg-[#07112b]/85 border border-blue-900/60 shadow-2xl backdrop-blur-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10"
            >
              {/* Left Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${activeProject.badgeColor}`}>
                    {activeProject.category}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {activeProject.client}
                  </h3>

                  <p className="text-sm font-semibold text-cyan-400">
                    {activeProject.tagline}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                {/* Deliverables Pills */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
                    Core Deliverables:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-3 py-1 rounded-lg bg-blue-950/70 border border-blue-900/60 text-xs font-mono text-slate-200"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Result Highlight */}
                <div className="flex items-center gap-4 pt-4 border-t border-blue-900/40">
                  <div>
                    <div className="text-3xl font-black text-cyan-400 font-mono">
                      {activeProject.metrics.stat}
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      {activeProject.metrics.label}
                    </div>
                  </div>

                  <div className="h-10 w-[1px] bg-blue-900/60" />

                  <button
                    type="button"
                    onClick={handleCta}
                    className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Request Case Study Deck</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Large Photography Artwork */}
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-blue-800/80 shadow-2xl group">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.client}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/70 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-[#07112b]/90 border border-blue-800 text-[11px] font-mono text-cyan-300 backdrop-blur-md">
                    ARCHITECTURAL SPECIMEN
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* =========================================================
            DISCIPLINES MARQUEE TICKER (KOTO INSPIRATION)
            ========================================================= */}
        <div className="relative w-full overflow-hidden py-3 border-y border-blue-900/40">
          <div className="flex gap-8 whitespace-nowrap animate-marquee">
            {[...MARQUEE_DISCIPLINES, ...MARQUEE_DISCIPLINES].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-xs sm:text-sm font-mono tracking-widest text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            ARCHITECTURAL AGENCY STATS GRID
            ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {[
            { value: "120+", label: "Global Brands Scaled", sub: "Enterprise & High-Growth" },
            { value: "4.8x", label: "Average Valuation Lift", sub: "Documented Post-Rebrand" },
            { value: "8K", label: "Studio CGI Production", sub: "Photorealistic Octane CGI" },
            { value: "100%", label: "Worldwide Trademark Defensibility", sub: "Exclusive Legal Ownership" },
          ].map((stat, sIdx) => (
            <div
              key={sIdx}
              className="p-6 rounded-2xl bg-[#07112b]/80 border border-blue-900/60 shadow-lg space-y-1 hover:border-cyan-500/40 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-cyan-400">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BrandIdentityHeroSection;
