"use client";

import React, { useRef, useState, useEffect } from "react";
import { Compass, Lightbulb, Code2, Rocket, ArrowRight, CheckCircle2, Sparkles, Orbit, Check } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface ProcessPhase {
  number: string;
  stageName: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
  icon: React.ReactNode;
  accent: string;
}

const phases: ProcessPhase[] = [
  {
    number: "01",
    stageName: "STAGE 01 // AUDIT & POSITIONING",
    title: "Category Archetype & Brand Architecture",
    description:
      "Deep-dive competitive audit, target customer psychographics, pricing elasticity mapping, and category white-space positioning to engineer an untouchable value proposition.",
    deliverables: [
      "Competitive Landscape & Brand Moat Matrix",
      "Customer Psychographics & Emotional Triggers",
      "Brand Archetype & Verbal Communication Bible",
    ],
    duration: "Week 1",
    icon: <Compass className="w-5 h-5 text-cyan-400" />,
    accent: "#38bdf8",
  },
  {
    number: "02",
    stageName: "STAGE 02 // VISUAL IDENTITY & 3D CGI",
    title: "Vector Logomarks & 3D Packaging Systems",
    description:
      "Forging mathematical vector typography, custom insigne geometry, chromatic systems, and factory-ready 3D product packaging dielines with photorealistic 8K Octane renders.",
    deliverables: [
      "70+ Page Master Brand Identity Guidelines",
      "Industrial CAD Dielines for Physical Cartons & Bottles",
      "Photorealistic 8K 3D Product Packaging Renders",
    ],
    duration: "Weeks 2 – 3",
    icon: <Lightbulb className="w-5 h-5 text-indigo-400" />,
    accent: "#818cf8",
  },
  {
    number: "03",
    stageName: "STAGE 03 // LIVING TOKENS & DIGITAL UX",
    title: "Design Tokens & Headless Digital Storefronts",
    description:
      "Connecting Figma components to Tailwind variables and Next.js frontend code. Ensuring instant developer velocity and sub-second performance across mobile and desktop.",
    deliverables: [
      "Figma Tokens Synced to Production Tailwind Theme",
      "Mobile-First Component System & Micro-Interactions",
      "Amazon Brand Registry & A+ Content Asset Matrix",
    ],
    duration: "Weeks 4 – 5",
    icon: <Code2 className="w-5 h-5 text-purple-400" />,
    accent: "#c084fc",
  },
  {
    number: "04",
    stageName: "STAGE 04 // LAUNCH & IP GOVERNANCE",
    title: "Market Velocity & Global Trademark Shield",
    description:
      "Full IP assignment, raw vector source files handover, and launch-day creative rollout across public relations, digital storefronts, and performance advertising.",
    deliverables: [
      "100% Trademark IP & Copyright Ownership Handover",
      "Complete Production Vector Repositories (SVG, EPS, AI)",
      "Ongoing Brand Governance & Creative Refresh Support",
    ],
    duration: "Ongoing Scale",
    icon: <Rocket className="w-5 h-5 text-emerald-400" />,
    accent: "#10b981",
  },
];

interface BrandingProcessSectionProps {
  onOpenConsultation?: () => void;
}

export const BrandingProcessSection: React.FC<BrandingProcessSectionProps> = ({
  onOpenConsultation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const total = rect.height + viewportHeight;
        const current = viewportHeight - rect.top;
        const progress = Math.min(1, Math.max(0, current / total));
        setScrollProgress(progress);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="brand-process"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 overflow-hidden border-t border-slate-900/80"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/3 w-[800px] h-[800px] rounded-full bg-purple-900/10 blur-[180px]" />
      </div>

      <Container size="wide" className="relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-purple-400 text-xs font-mono font-bold shadow-sm backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>MISSION TRAJECTORY PROTOCOL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12]">
            The Proven Launch Path to <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Category Dominance.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From strategic discovery to production-ready design tokens and legal trademark clearance. Our sprint-based methodology delivers with predictable velocity.
          </p>
        </div>

        {/* =========================================================
            DESKTOP TRACING BEAM LAUNCH TRAJECTORY (Hidden on mobile)
            ========================================================= */}
        <div className="hidden lg:block relative max-w-5xl mx-auto py-8">
          {/* Central Vertical SVG Tracing Beam Track */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              {/* Background inactive trajectory guide */}
              <line
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                stroke="rgba(51, 65, 85, 0.4)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {/* Active illuminated tracing beam */}
              <line
                x1="50%"
                y1="0%"
                x2="50%"
                y2={`${Math.min(100, scrollProgress * 120)}%`}
                stroke="url(#beamGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                className="transition-all duration-75"
              />
              <defs>
                <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="40%" stopColor="#818cf8" />
                  <stop offset="80%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing rocket head tracking beam progress */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-slate-950 border-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all duration-75 flex items-center justify-center -z-0"
              style={{ top: `${Math.min(98, scrollProgress * 120)}%` }}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
          </div>

          {/* 4 Phases along alternating trajectory */}
          <div className="space-y-20 relative z-10">
            {phases.map((phase, idx) => {
              const threshold = (idx + 1) * 0.22;
              const isReached = scrollProgress >= threshold;
              const isLeft = idx % 2 === 0;

              return (
                <div
                  key={phase.number}
                  className={`flex items-center gap-10 ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content Card (Half Width) */}
                  <div className="w-1/2">
                    <div
                      className={`rounded-3xl bg-slate-950/80 border p-7 backdrop-blur-2xl transition-all duration-500 shadow-xl ${
                        isReached
                          ? "border-slate-700 shadow-[0_15px_35px_rgba(0,0,0,0.8)] opacity-100 translate-y-0"
                          : "border-slate-800/60 opacity-60 translate-y-2"
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                        <span
                          className="text-xs font-mono font-bold tracking-wider"
                          style={{ color: phase.accent }}
                        >
                          {phase.stageName}
                        </span>
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                          {phase.duration}
                        </span>
                      </div>

                      <div className="space-y-3 pt-3">
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {phase.title}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {phase.description}
                        </p>
                      </div>

                      {/* Deliverables */}
                      <div className="space-y-2 pt-4 border-t border-slate-800/60 mt-4">
                        {phase.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-center gap-2 text-xs text-slate-300"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: phase.accent }}
                            />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="w-12 flex items-center justify-center">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border font-mono text-sm font-bold transition-all duration-500 backdrop-blur-xl ${
                        isReached
                          ? "bg-slate-900 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-110"
                          : "bg-slate-950 text-slate-500 border-slate-800"
                      }`}
                      style={
                        isReached
                          ? { borderColor: phase.accent, color: phase.accent }
                          : undefined
                      }
                    >
                      {phase.number}
                    </div>
                  </div>

                  {/* Empty Spacer Half */}
                  <div className="w-1/2" />
                </div>
              );
            })}
          </div>

          {/* =========================================================
              FINAL STATE: BEAM ASCENDS INTO STARFIELD
              ========================================================= */}
          <div className="text-center pt-16 relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950/90 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-300 uppercase">
                SYSTEM CLEARED FOR LAUNCH.
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            MOBILE VIEWPORT: STRAIGHT VERTICAL PATH
            ========================================================= */}
        <div className="block lg:hidden space-y-6 max-w-lg mx-auto">
          {phases.map((p) => (
            <div
              key={p.number}
              className="rounded-3xl bg-slate-950/80 border border-slate-800/80 p-6 space-y-4 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: p.accent }}
                >
                  {p.stageName}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  {p.duration}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{p.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>

              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                {p.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-cyan-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 border border-emerald-500/40 text-[11px] font-mono font-bold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEM CLEARED FOR LAUNCH.</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrandingProcessSection;
