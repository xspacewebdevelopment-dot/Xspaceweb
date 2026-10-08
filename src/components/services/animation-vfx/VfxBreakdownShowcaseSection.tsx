"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Film,
  Layers,
  Cpu,
  MonitorCheck,
  CheckCircle,
} from "lucide-react";

interface VfxBreakdownShowcaseSectionProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

const HERO_FRONT_URL =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/658f62c6-fdb2-41b9-aa0f-10837f9e72cb.png";
const HERO_BACK_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260914_123603_5ac5732a-900b-4919-9d9c-3c454194b0a5.png";

const SHOWCASE_PROJECTS = [
  {
    id: "project-1",
    title: "Apex Android Series 07",
    category: "Character VFX & Digital Human",
    duration: "4K Master Delivery",
    software: "Maya · ZBrush · Nuke",
    image: HERO_FRONT_URL,
    description:
      "A complete character breakdown featuring 18 million polygon sculpt, anatomical muscle deformation, and multi-layered anisotropic skin shaders.",
  },
  {
    id: "project-2",
    title: "Orbital Recon Heavy Armor",
    category: "Hard-Surface CGI & Simulation",
    duration: "8K HDR Delivery",
    software: "Blender · Houdini · Substance",
    image: HERO_BACK_URL,
    description:
      "Micro-detailed mechanical armor modeling with procedural micro-scratches, carbon-fiber panels, and dynamic ballistic simulation passes.",
  },
  {
    id: "project-3",
    title: "Quantum Holographic HUD",
    category: "Sci-Fi Spatial UI & Motion",
    duration: "Real-Time Unreal 5",
    software: "Cinema 4D · Unreal Engine 5",
    image: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/96ef2bcd-ed69-4b7e-ab83-8a18d2129d99.png",
    description:
      "Volumetric fictional user interface elements with real-time reactive glow, particle bloom, and spatial depth engineered for immersive platforms.",
  },
];

const STUDIO_METRICS = [
  { value: "+150", label: "Completed VFX Deliverables", sub: "For global brands & films" },
  { value: "8K HDR", label: "Master Resolution Standard", sub: "True ACES color pipeline" },
  { value: "100+", label: "GPU Cloud Render Nodes", sub: "Ultra-fast turnaround" },
  { value: "99.8%", label: "Client Approval Rate", sub: "Zero compromise on quality" },
];

export const VfxBreakdownShowcaseSection: React.FC<VfxBreakdownShowcaseSectionProps> = ({
  onOpenConsultation,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pct);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section className="w-full py-20 lg:py-28 bg-gradient-to-b from-white via-[#f0f6fc] to-[#e4f0fa] text-[#06192f] relative overflow-hidden border-t border-white/80">
      {/* Background Accent Gradients & Micro-Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-br from-[#1169dc]/10 via-[#d6e6f5]/40 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.20] bg-[radial-gradient(#1169dc_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12 z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 border border-white text-xs font-semibold text-[#1169dc] uppercase tracking-widest shadow-xs backdrop-blur-md">
            <Film className="w-3.5 h-3.5" />
            <span>Interactive VFX Breakdown</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#06192f] leading-tight">
            See the Magic: <br />
            <span className="bg-gradient-to-r from-[#06192f] via-[#1169dc] to-[#2563eb] bg-clip-text text-transparent">
              Raw 3D Previz vs. Final Photoreal Comp
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#556987] leading-relaxed">
            Drag the interactive breakdown divider below to reveal the transformation from the raw untextured cybernetic mesh to the final multi-pass beauty composite.
          </p>
        </div>

        {/* =========================================================
            INTERACTIVE BEFORE / AFTER SLIDER (GLASSMORPHIC FRAME)
            ========================================================= */}
        <div className="max-w-4xl mx-auto mb-24">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-full h-[420px] sm:h-[540px] lg:h-[620px] rounded-[32px] overflow-hidden border border-white/95 bg-gradient-to-br from-white/90 via-white/60 to-[#d6e6f5]/50 shadow-[inset_0_1px_2px_rgba(255,255,255,1),inset_0_0_36px_rgba(255,255,255,0.8),0_24px_60px_-10px_rgba(35,57,79,0.12)] cursor-ew-resize select-none touch-none backdrop-blur-2xl"
          >
            {/* Background Layer: Right Side (Finished Composite - White Android) */}
            <div className="absolute inset-0 w-full h-full bg-radial from-white via-[#edf5fd] to-[#d4e6f6] flex items-center justify-center p-6 sm:p-10">
              <div className="relative w-full h-full max-w-[480px]">
                <Image
                  src={HERO_FRONT_URL}
                  alt="Finished Composite Layer"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Label Right */}
              <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-full bg-white/90 border border-white text-xs font-semibold text-[#06192f] shadow-md backdrop-blur-md">
                Final Beauty Composite · 8K HDR
              </div>
            </div>

            {/* Foreground Layer: Left Side (Raw Heavy Armor Mesh) Clipped by Slider */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden bg-radial from-[#cedff2] via-[#b6d0e8] to-[#9dbfe0] flex items-center justify-center p-6 sm:p-10 pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="relative w-full h-full max-w-[480px]">
                <Image
                  src={HERO_BACK_URL}
                  alt="Raw 3D Armor Mesh Layer"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Label Left */}
              <div className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-full bg-[#06192f]/90 border border-white/30 text-xs font-semibold text-white shadow-md backdrop-blur-md">
                Raw 3D Armor Wireframe / Mesh
              </div>
            </div>

            {/* Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_18px_rgba(255,255,255,1),0_0_30px_rgba(17,105,220,0.45)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Central Draggable Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-[#1169dc] shadow-[0_4px_16px_rgba(17,105,220,0.3),0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center border-2 border-[#1169dc] hover:scale-110 active:scale-95 transition-transform">
                <SlidersHorizontal className="w-5 h-5 text-[#1169dc]" />
              </div>
            </div>

            {/* Interactive Instruction Badge */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/90 border border-white text-[11px] font-medium text-[#06192f] shadow-sm backdrop-blur-md flex items-center gap-2 pointer-events-none">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#1169dc]" />
              <span>Drag or click anywhere across the frame to slide breakdown</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            STUDIO METRICS BAR (GLASSMORPHIC CARDS)
            ========================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24">
          {STUDIO_METRICS.map((metric) => (
            <div
              key={metric.label}
              className="p-6 sm:p-7 rounded-2xl border border-white/90 bg-gradient-to-br from-white/90 via-white/60 to-[#edf6fd]/75 backdrop-blur-2xl text-center shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_0_20px_rgba(255,255,255,0.7),0_10px_30px_-6px_rgba(35,57,79,0.06)] hover:border-[#1169dc]/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#06192f] via-[#1169dc] to-[#2563eb] bg-clip-text text-transparent mb-1">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#06192f] mb-1">
                {metric.label}
              </div>
              <div className="text-[11px] text-[#556987]">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>


        {/* =========================================================
            FINAL CALL TO ACTION BANNER (FROSTED GLASS PANEL)
            ========================================================= */}
        <div className="relative rounded-[32px] border border-white/95 bg-gradient-to-br from-white/95 via-white/80 to-[#d6e6f5]/75 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,1),inset_0_0_40px_rgba(255,255,255,0.8),0_20px_50px_rgba(35,57,79,0.08)] backdrop-blur-2xl">
          {/* Ambient glow orbs */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-[#1169dc]/20 to-transparent rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute right-56 top-0 w-64 h-64 bg-gradient-to-br from-[#1169dc]/10 to-transparent rounded-full blur-[70px] pointer-events-none" />

          <style>{`
            @keyframes vfx-float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-14px) rotate(2.5deg); }
            }
            .vfx-float { animation: vfx-float 5s ease-in-out infinite; }
          `}</style>

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-10 lg:gap-16">
            {/* Left: Text & CTAs */}
            <div className="flex-1 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1169dc]/10 border border-[#1169dc]/20 text-xs font-semibold text-[#1169dc] uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready for Production?</span>
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#06192f] tracking-tight leading-tight">
                Bring Your Vision to Life with <br className="hidden sm:inline" />
                XSPACEWEB Animation &amp; VFX.
              </h3>

              <p className="text-sm sm:text-base text-[#556987] leading-relaxed max-w-2xl">
                Whether you need photoreal digital humans, cinematic commercials, dynamic simulations, or real-time Unreal Engine 5 production — our studio delivers world-class execution on time and with zero compromise.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenConsultation?.("High-End Animation & VFX Project")}
                  className="px-7 py-3.5 rounded-xl bg-[#06192f] hover:bg-[#1169dc] text-white font-bold text-sm shadow-md hover:shadow-[0_8px_24px_rgba(17,105,220,0.3)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Launch Your VFX Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/services"
                  className="px-7 py-3.5 rounded-xl bg-white/85 hover:bg-white border border-slate-200/80 text-[#06192f] font-semibold text-sm shadow-xs transition-colors flex items-center gap-2"
                >
                  <span>Explore All Services</span>
                </Link>
              </div>
            </div>

            {/* Right: Floating 3D X Logo */}
            <div className="flex items-center justify-center shrink-0 self-center lg:self-stretch lg:items-center">
              <div className="vfx-float relative w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 flex items-center justify-center pointer-events-none select-none">
                {/* Ambient back glow */}
                <div className="absolute inset-4 rounded-full bg-[#1169dc]/20 blur-2xl pointer-events-none" />
                <Image
                  src="/images/xspace-3d-x.png"
                  alt="XSPACEWEB 3D Logo"
                  fill
                  className="relative z-10 object-contain drop-shadow-[0_25px_60px_rgba(22,104,232,0.4)]"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
