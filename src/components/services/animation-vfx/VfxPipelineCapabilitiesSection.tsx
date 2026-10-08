"use client";

import React, { useState } from "react";
import {
  Layers,
  Sparkles,
  Flame,
  Cpu,
  MonitorPlay,
  Box,
  Workflow,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";

interface VfxPipelineCapabilitiesSectionProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

const PIPELINE_STAGES = [
  {
    step: "01",
    title: "Concept & Previz",
    subtitle: "Storyboarding, 3D Camera Blocking & Mood Direction",
    description:
      "We begin by defining the visual language, camera motion trajectories, lighting keys, and narrative pacing through rapid 3D animatics before high-resolution execution.",
    deliverables: ["Visual Treatment Deck", "3D Camera Animatic", "Color Script & Keys"],
  },
  {
    step: "02",
    title: "Sculpting & Shading",
    subtitle: "High-Poly Topology, PBR Texturing & Custom Rigs",
    description:
      "Precision hard-surface modeling and anatomical sculpting. We craft custom multi-layered PBR materials with anisotropic gloss, subsurface scattering, and micro-surface displacement.",
    deliverables: ["Sub-Millimeter 3D Assets", "Procedural Texture Maps", "Deformation Rigging"],
  },
  {
    step: "03",
    title: "Simulation & FX",
    subtitle: "Houdini Particle Networks, Smoke, Fire & Fluids",
    description:
      "Complex procedural physics simulations built using Houdini and custom VEX scripts. From turbulent combustion and atmospheric dust to photorealistic fluid dynamics and cloth tearing.",
    deliverables: ["VDB Pyro Volumes", "Fluid & Splash Meshes", "Particle Field Caches"],
  },
  {
    step: "04",
    title: "Lighting & 8K Comp",
    subtitle: "Ray-Traced Volumetrics, Multi-Pass Nuke Compositing",
    description:
      "Global illumination, realistic depth of field, anamorphic optical flare integration, and multi-pass beauty re-compositing to seamlessly marry CGI elements into live-action plates.",
    deliverables: ["Multi-Channel EXR Comp", "Optical Lens Treatment", "Master 8K HDR Grade"],
  },
];

const CAPABILITIES = [
  {
    id: "characters",
    title: "Digital Humans & 3D Characters",
    category: "Character & Creature VFX",
    description:
      "Photorealistic digital doubles and stylized cyberpunk character models rigged for cinematic performance, realistic facial micro-expressions, and real-time gaming engines.",
    icon: Box,
    badge: "Cinema 4D · Maya · ZBrush",
    metrics: "Subsurface Scattering · Muscle Deformers",
  },
  {
    id: "simulations",
    title: "Procedural Physics & Particle FX",
    category: "FX Simulations",
    description:
      "Heavy volumetric simulations engineered for physical accuracy. Large-scale fluid dynamics, realistic atmospheric fog, combustion, explosive forcefields, and molecular disintegrations.",
    icon: Flame,
    badge: "Houdini · VEX · EmberGen",
    metrics: "Billion-Particle Scale · GPU Solvers",
  },
  {
    id: "virtual-production",
    title: "Unreal Engine 5 Real-Time Production",
    category: "Real-Time / Spatial",
    description:
      "Cutting-edge virtual studio sets with real-time camera tracking, dynamic Nanite geometry, and Lumen bounce lighting for broadcast, virtual events, and interactive immersive storytelling.",
    icon: Cpu,
    badge: "Unreal Engine 5.4 · Nanite · Lumen",
    metrics: "60+ FPS Realtime · Live LED Wall Ready",
  },
  {
    id: "motion-ui",
    title: "Motion Design & Holographic Sci-Fi UI",
    category: "Broadcast & Motion Graphics",
    description:
      "Futuristic fictional user interfaces (FUI), kinetic typography, and high-impact 3D commercial product reveals crafted to captivate viewers across digital campaigns and product launches.",
    icon: MonitorPlay,
    badge: "After Effects · Cinema 4D · Blender",
    metrics: "Vector Precision · Kinetic Motion",
  },
];

const TECH_STACK = [
  { name: "Unreal Engine 5", category: "Real-Time Engine" },
  { name: "Houdini FX", category: "Procedural & Dynamics" },
  { name: "Blender 4.x", category: "Modeling & Cycles" },
  { name: "Autodesk Maya", category: "Rigging & Anim" },
  { name: "Foundry Nuke", category: "Deep Compositing" },
  { name: "Cinema 4D", category: "Motion Graphics" },
  { name: "DaVinci Resolve", category: "Color & Finish" },
  { name: "ZBrush", category: "High-Poly Sculpt" },
];

export const VfxPipelineCapabilitiesSection: React.FC<VfxPipelineCapabilitiesSectionProps> = ({
  onOpenConsultation,
}) => {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section className="w-full py-20 lg:py-28 bg-gradient-to-b from-[#d6e6f5]/40 via-[#edf6fd] to-white text-[#06192f] relative overflow-hidden border-t border-white/60">
      {/* Background Soft Glow & Specular Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-gradient-to-br from-[#1169dc]/8 via-[#d6e6f5]/40 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[350px] bg-gradient-to-tr from-white/90 via-[#d6e6f5]/30 to-transparent rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Micro-Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25] bg-[radial-gradient(#1169dc_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/80">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-white shadow-xs text-xs font-semibold text-[#1169dc] uppercase tracking-wider backdrop-blur-md">
              <Workflow className="w-3.5 h-3.5" />
              <span>End-to-End VFX Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#06192f] leading-tight">
              Production Capabilities &amp; <br />
              <span className="bg-gradient-to-r from-[#06192f] via-[#1169dc] to-[#2563eb] bg-clip-text text-transparent">
                Technical 3D Engineering
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#556987] leading-relaxed">
            From initial previz animatics to deep multi-pass optical compositing, our specialized pipeline delivers photorealistic CG assets built for films, commercials, and digital products.
          </p>
        </div>

        {/* =========================================================
            PART 1: 4 GLASSMORPHIC CAPABILITY CARDS
            ========================================================= */}
        {/* =========================================================
            PART 1: 4 GLASSMORPHIC CAPABILITY CARDS (MCP-INSPIRED GLASS SHINE & REFRACTIVE RIMS)
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="group relative rounded-[26px] border border-white/90 bg-gradient-to-br from-white/90 via-white/60 to-[#eff7fd]/75 p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_0_24px_rgba(255,255,255,0.7),0_12px_36px_-6px_rgba(35,57,79,0.06),0_4px_16px_-2px_rgba(17,105,220,0.04)] backdrop-blur-2xl hover:border-[#1169dc]/40 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),inset_0_0_32px_rgba(255,255,255,0.95),0_20px_45px_-10px_rgba(17,105,220,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:-translate-x-[150%] hover:before:translate-x-[150%] before:transition-transform before:duration-1000 before:ease-in-out before:pointer-events-none"
              >
                <div>
                  {/* Top Category Badge & Frosted Glass Icon Chamber */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-white/90 text-[11px] font-mono font-bold text-[#77899c] uppercase tracking-wider shadow-xs backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1169dc]" />
                      {cap.category}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/95 to-[#e0effe]/75 border border-white text-[#1169dc] flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_4px_12px_rgba(17,105,220,0.08)] group-hover:bg-[#1169dc] group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(17,105,220,0.3)] transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#06192f] mb-3 group-hover:text-[#1169dc] transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#556987] leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/70 space-y-2.5">
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-white/70 border border-white/90 text-[11px] font-mono text-[#1169dc] font-semibold shadow-xs">
                    {cap.badge}
                  </div>
                  <div className="text-[11px] text-[#556987] flex items-center gap-1.5 font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{cap.metrics}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================
            PART 2: INTERACTIVE GLASS PIPELINE TIMELINE
            ========================================================= */}
        <div className="rounded-[32px] border border-white/90 bg-gradient-to-br from-white/90 via-white/70 to-[#eff7fd]/75 backdrop-blur-2xl p-7 sm:p-12 shadow-[inset_0_0_30px_rgba(255,255,255,0.85),0_16px_44px_rgba(35,57,79,0.07)] mb-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#1169dc] uppercase block mb-1">
                STUDIO WORKFLOW
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#06192f]">
                How Your Vision Moves Through Production
              </h3>
            </div>
            <span className="text-xs text-[#77899c] font-medium">
              Click any stage below to inspect deliverables
            </span>
          </div>

          {/* Stepper Tabs with Frosted Glass Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-8">
            {PIPELINE_STAGES.map((stg, idx) => {
              const isSelected = idx === activeStage;
              return (
                <button
                  key={stg.step}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-white border-white shadow-[0_8px_24px_rgba(17,105,220,0.14),inset_0_0_14px_rgba(255,255,255,0.95)]"
                      : "bg-white/45 border-white/70 hover:bg-white/75 hover:border-white text-[#556987]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-extrabold ${
                        isSelected ? "text-[#1169dc]" : "text-[#77899c]"
                      }`}
                    >
                      STAGE {stg.step}
                    </span>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1169dc] animate-pulse" />
                    )}
                  </div>
                  <div
                    className={`text-sm sm:text-base font-bold leading-tight ${
                      isSelected ? "text-[#06192f]" : "text-[#556987]"
                    }`}
                  >
                    {stg.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Glass Panel */}
          <div className="rounded-[24px] border border-white/95 bg-white/80 p-6 sm:p-9 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center backdrop-blur-md">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#1169dc]/10 text-[#1169dc] font-bold border border-[#1169dc]/20">
                  Active Focus · Stage {PIPELINE_STAGES[activeStage].step}
                </span>
                <span className="text-sm font-semibold text-[#556987]">
                  {PIPELINE_STAGES[activeStage].subtitle}
                </span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-extrabold text-[#06192f]">
                {PIPELINE_STAGES[activeStage].title}
              </h4>

              <p className="text-sm sm:text-base text-[#556987] leading-relaxed">
                {PIPELINE_STAGES[activeStage].description}
              </p>

              {/* Deliverables tags */}
              <div className="pt-2">
                <span className="text-xs font-mono text-[#77899c] uppercase tracking-wider block mb-2 font-semibold">
                  Key Production Milestones:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {PIPELINE_STAGES[activeStage].deliverables.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-[#06192f] shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1169dc]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end border-t lg:border-t-0 lg:border-l border-slate-200/70 pt-6 lg:pt-0 lg:pl-8">
              <span className="text-xs text-[#77899c] block mb-2.5 font-medium">
                Ready to review our technical treatment for your project?
              </span>
              <button
                type="button"
                onClick={() =>
                  onOpenConsultation?.(
                    `VFX Pipeline Consultation: ${PIPELINE_STAGES[activeStage].title}`
                  )
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#06192f] hover:bg-[#1169dc] text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-98 cursor-pointer"
              >
                <span>Request Pipeline Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
