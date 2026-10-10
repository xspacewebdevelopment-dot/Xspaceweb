"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Radio, Compass, Orbit, ArrowUpRight, Zap } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface StageData {
  id: string;
  stageNumber: string;
  badge: string;
  headline: string;
  copy: string;
  metrics?: { label: string; value: string }[];
}

const stages: StageData[] = [
  {
    id: "strategy",
    stageNumber: "01",
    badge: "PHASE 01 // STRATEGY & POSITIONING",
    headline: "Every enduring brand begins with strategic clarity.",
    copy: "We audit category whitespace, competitive moats, and customer psychographics. Before designing a single pixel, we define your core brand positioning, archetype, and narrative tone.",
    metrics: [
      { label: "Category Moat", value: "Defined" },
      { label: "Audience Clarity", value: "100%" },
    ],
  },
  {
    id: "identity",
    stageNumber: "02",
    badge: "PHASE 02 // VISUAL IDENTITY & CRAFT",
    headline: "Strategic insight crystallizes into distinctive visual identity.",
    copy: "Bespoke logomarks, proprietary typography pairings, and a multi-spectrum chromatic system come to life. The brand takes shape with razor-sharp distinction that commands authority.",
    metrics: [
      { label: "Vector Logomark", value: "Bespoke" },
      { label: "Typography Ramps", value: "Editorial" },
    ],
  },
  {
    id: "system",
    stageNumber: "03",
    badge: "PHASE 03 // LIVING DESIGN SYSTEMS",
    headline: "Identity scales effortlessly through living design systems.",
    copy: "We engineer 400+ Figma design tokens synced directly to production code. Every color, spacing ramp, card surface, and component remains in perfect synchrony across designers and developers.",
    metrics: [
      { label: "Figma Variables", value: "400+" },
      { label: "Handoff Speed", value: "Sub-Second" },
    ],
  },
  {
    id: "omnichannel",
    stageNumber: "04",
    badge: "PHASE 04 // OMNICHANNEL EXECUTION",
    headline: "Physical packaging and sub-second storefronts align.",
    copy: "From physical luxury packaging dielines and 8K CGI renders to headless Next.js digital storefronts and social design kits—every customer touchpoint speaks with unified authority.",
    metrics: [
      { label: "Brand Recall", value: "+85%" },
      { label: "Pricing Power", value: "3.2x" },
    ],
  },
  {
    id: "dominance",
    stageNumber: "05",
    badge: "PHASE 05 // CATEGORY LEADERSHIP",
    headline: "Relentless brand consistency drives category leadership.",
    copy: "When brand identity, product packaging, and digital experiences operate as a unified system, customer trust compounds and enterprise valuation accelerates.",
    metrics: [
      { label: "Funnel Lift", value: "+48%" },
      { label: "Enterprise Value", value: "Compounding" },
    ],
  },
];

export const BrandGravityJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Track active stage as user scrolls through the sticky section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      const index = Math.min(stages.length - 1, Math.floor(progress * stages.length));
      setActiveStageIndex(index);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeStage = stages[activeStageIndex];

  return (
    <section
      ref={containerRef}
      id="brand-gravity-journey"
      className="relative w-full bg-[#020817] text-white border-t border-blue-900/40"
    >
      {/* Environmental Section Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div
            className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[190px] opacity-20 transition-colors duration-700 pointer-events-none"
            style={{
              background:
                activeStageIndex === 0
                  ? "radial-gradient(circle, #38bdf8 0%, transparent 70%)"
                  : activeStageIndex === 1
                  ? "radial-gradient(circle, #818cf8 0%, transparent 70%)"
                  : activeStageIndex === 2
                  ? "radial-gradient(circle, #2563eb 0%, transparent 70%)"
                  : activeStageIndex === 3
                  ? "radial-gradient(circle, #0284c7 0%, transparent 70%)"
                  : "radial-gradient(circle, #10b981 0%, transparent 70%)",
            }}
          />
        </div>
      </div>

      {/* =========================================================
          DESKTOP STICKY SCROLL REVEAL VIEWPORT (Hidden on mobile)
          ========================================================= */}
      <div className="hidden lg:block relative min-h-[360vh] max-w-7xl mx-auto px-8">
        <div className="sticky top-0 h-screen w-full flex items-center justify-between gap-12 py-16">
          {/* Left Column: Narrative Story Progression */}
          <div className="w-full max-w-[480px] space-y-6 z-20">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/70 text-cyan-400 text-xs font-mono font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>STRATEGIC BRAND METHODOLOGY</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 tracking-wider">
                <span className="text-cyan-400 font-bold">{activeStage.stageNumber}</span>
                <span>/ 05</span>
                <span className="text-blue-900">—</span>
                <span className="text-slate-300 font-semibold">{activeStage.badge}</span>
              </div>

              <h2 className="text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight transition-all duration-300">
                {activeStage.headline}
              </h2>

              <p className="text-sm xl:text-base text-slate-300 leading-relaxed transition-all duration-300">
                {activeStage.copy}
              </p>
            </div>

            {/* Metrics pills */}
            {activeStage.metrics && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                {activeStage.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#07112b]/85 border border-blue-900/60 shadow-lg"
                  >
                    <div className="text-xl font-black text-cyan-400 font-mono">{m.value}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Stage Indicator Rail */}
            <div className="flex items-center gap-2 pt-4 border-t border-blue-900/40">
              {stages.map((st, i) => (
                <div
                  key={st.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === activeStageIndex
                      ? "w-10 bg-gradient-to-r from-blue-600 to-cyan-400 shadow-md shadow-cyan-400/30"
                      : i < activeStageIndex
                      ? "w-4 bg-blue-800"
                      : "w-2 bg-blue-950"
                  }`}
                />
              ))}
            </div>

            {activeStageIndex === 4 && (
              <div className="pt-2">
                <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  FORGE THE IDENTITY. SCALE THE SYSTEM.
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic SVG/CSS Gravity Visual Scene */}
          <div className="w-full max-w-[560px] h-[520px] rounded-3xl bg-[#07112b]/90 border border-blue-900/70 shadow-2xl shadow-blue-950/80 p-8 relative flex items-center justify-center overflow-hidden z-20">
            {/* Stage 01: Scattered Primitives */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                activeStageIndex === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <div className="relative w-full h-full">
                {/* Floating disconnected items */}
                <span className="absolute top-[20%] left-[25%] text-2xl font-serif text-cyan-400/80 animate-pulse">A</span>
                <span className="absolute top-[65%] left-[20%] text-xl font-mono text-indigo-400/80">Aa</span>
                <span className="absolute top-[30%] right-[25%] w-8 h-8 rounded-lg bg-purple-500/30 border border-purple-400/40" />
                <span className="absolute bottom-[25%] right-[30%] w-6 h-6 rounded-full bg-cyan-500/30 border border-cyan-400/40" />
                <span className="absolute top-[50%] left-[48%] w-3 h-3 rotate-45 bg-slate-400/40" />
                <span className="absolute top-[18%] right-[40%] text-xs font-mono text-slate-500">token: color_null</span>
                <span className="absolute bottom-[35%] left-[38%] text-xs font-mono text-slate-500">grid_unbound</span>
                <div className="absolute inset-x-8 bottom-8 text-center text-xs font-mono text-slate-500">
                  // SCATTERED PRIMITIVES WITHOUT ARCHITECTURAL GRAVITY
                </div>
              </div>
            </div>

            {/* Stage 02: Geometric Convergence */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                activeStageIndex === 1 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <div className="relative w-[340px] h-[340px] flex items-center justify-center">
                {/* Construction circles & grid lines */}
                <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/30 animate-spin" style={{ animationDuration: "40s" }} />
                <div className="absolute inset-10 rounded-full border border-cyan-500/30" />
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-indigo-500/30" />
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-indigo-500/30" />
                {/* Converging mark */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-600/30 border border-cyan-400/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                  <span className="text-4xl font-black text-white tracking-tighter">X</span>
                </div>
                <div className="absolute bottom-2 text-center text-xs font-mono text-indigo-300">
                  // OPTICAL KERNING &amp; BÉZIER HARMONY ESTABLISHED
                </div>
              </div>
            </div>

            {/* Stage 03: System Relations */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                activeStageIndex === 2 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central mark */}
                <div className="z-10 w-20 h-20 rounded-2xl bg-slate-900 border border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.4)] flex items-center justify-center">
                  <span className="text-3xl font-black text-white">X</span>
                </div>

                {/* Orbiting nodes connected by lines */}
                {[
                  { label: "Typography", top: "15%", left: "50%", transform: "-translate-x-1/2" },
                  { label: "3D Packaging", top: "45%", right: "12%", transform: "" },
                  { label: "Web UI", bottom: "18%", right: "25%", transform: "" },
                  { label: "Motion", bottom: "18%", left: "25%", transform: "" },
                  { label: "Social", top: "45%", left: "12%", transform: "" },
                ].map((node, i) => (
                  <div
                    key={i}
                    className={`absolute px-3 py-1.5 rounded-xl bg-slate-900/90 border border-purple-500/40 text-[11px] font-mono text-purple-200 shadow-md ${node.transform}`}
                    style={{ top: node.top, left: node.left, right: node.right, bottom: node.bottom }}
                  >
                    {node.label}
                  </div>
                ))}

                {/* Orbit ring */}
                <div className="absolute w-[360px] h-[360px] rounded-full border border-purple-500/20" />
              </div>
            </div>

            {/* Stage 04: Consistency Creates Gravity */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                activeStageIndex === 3 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Dominant Gravity Well */}
                <div className="absolute w-[280px] h-[280px] rounded-full border border-pink-500/30 animate-pulse" />
                <div className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-pink-500/20 animate-spin" style={{ animationDuration: "50s" }} />

                <div className="z-10 w-28 h-28 rounded-3xl bg-gradient-to-tr from-pink-600/40 to-indigo-600/40 border-2 border-pink-400 shadow-[0_0_50px_rgba(236,72,153,0.5)] flex items-center justify-center">
                  <span className="text-5xl font-black text-white">X</span>
                </div>

                <div className="absolute bottom-6 text-center text-xs font-mono text-pink-300">
                  // UNIFIED ACCRETION: ALL TOUCHPOINTS IN HARMONIC ORBIT
                </div>
              </div>
            </div>

            {/* Stage 05: Orbital Momentum & Velocity */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                activeStageIndex === 4 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {/* Velocity Streaks */}
                <div className="absolute inset-0 opacity-40">
                  <div className="absolute top-[25%] -left-10 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                  <div className="absolute top-[50%] -left-10 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  <div className="absolute top-[75%] -left-10 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
                </div>

                <div className="z-10 flex flex-col items-center gap-3">
                  <div className="w-24 h-24 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.5)] flex items-center justify-center">
                    <span className="text-4xl font-black text-white">X</span>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg">
                    <Zap className="w-3.5 h-3.5" />
                    <span>ORBITAL VELOCITY LOCKED</span>
                  </div>
                </div>

                <div className="absolute bottom-4 text-center text-[11px] font-mono text-slate-400">
                  RECOGNITION • RECALL • CONSISTENCY • CONVERSION
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE VIEWPORT: Clean Vertical Sequence (No scroll locks)
          ========================================================= */}
      <div className="block lg:hidden px-4 py-16 space-y-8 max-w-lg mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            STRATEGIC BRAND METHODOLOGY
          </span>
          <h2 className="text-2xl font-black text-white">
            How We Build Category-Defining Enterprise Brands.
          </h2>
        </div>

        <div className="space-y-4">
          {stages.map((st) => (
            <div
              key={st.id}
              className="p-5 rounded-2xl bg-[#07112b]/85 border border-blue-900/60 shadow-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">{st.badge}</span>
                <span className="text-xs font-mono text-slate-400">STAGE {st.stageNumber}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{st.headline}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{st.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandGravityJourney;
