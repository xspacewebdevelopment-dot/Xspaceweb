"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Sparkles, Play, Shuffle, Eye, ArrowUpRight, Check, Compass, Layers, ShieldCheck } from "lucide-react";

interface VfxHeroSpotlightSectionProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

const HERO_FRONT_URL =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/658f62c6-fdb2-41b9-aa0f-10837f9e72cb.png";
const HERO_BACK_URL = "/images/services/hero_back_aligned.png";
const HERO_BACK_FALLBACK_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260914_123603_5ac5732a-900b-4919-9d9c-3c454194b0a5.png";
const MATERIAL_URL =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/96ef2bcd-ed69-4b7e-ab83-8a18d2129d99.png";

const AVATARS = [
  {
    id: 1,
    url: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/caf08036-c63c-4d0c-9b81-43c5a7a49343.png",
    name: "Cybernetic Alpha",
    hue: 2,
    sat: 1.2,
    iw: "112.3%",
    il: "-5.84%",
    it: "-3.65%",
    bg: "#1e3048",
  },
  {
    id: 2,
    url: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/599a5a28-c9f1-44f9-b01b-adb8b22e8c12.png",
    name: "Obsidian Core",
    hue: 0,
    sat: 0.42,
    iw: "111.5%",
    il: "-8.82%",
    it: "-4.41%",
    bg: "rgba(240,247,252,.56)",
  },
  {
    id: 3,
    url: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/fc804805-b23c-40ba-97b0-9ab2ba3efb5d.png",
    name: "Ethereal Ghost",
    hue: 6,
    sat: 1.3,
    iw: "113.1%",
    il: "-4.35%",
    it: "-0.72%",
    bg: "rgba(240,247,252,.56)",
  },
  {
    id: 4,
    url: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0cb0c1f0-f84a-47bb-bfa1-43b6c7f1575d.png",
    name: "Quantum Synthetic",
    hue: 0,
    sat: 0.2,
    iw: "108.2%",
    il: "-6.82%",
    it: "0.76%",
    bg: "rgba(240,247,252,.56)",
  },
  {
    id: 5,
    url: "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/64e651b1-a8ba-44e8-8fbe-e85fcd6e5cf0.png",
    name: "Solar Android",
    hue: 0,
    sat: 0.68,
    iw: "114.8%",
    il: "-10.71%",
    it: "-2.14%",
    bg: "rgba(240,247,252,.56)",
  },
];

export const VfxHeroSpotlightSection: React.FC<VfxHeroSpotlightSectionProps> = ({
  onOpenConsultation,
}) => {
  const [activeAvatarIndex, setActiveAvatarIndex] = useState(0);

  const [isAwake, setIsAwake] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  const heroStackRef = useRef<HTMLDivElement>(null);
  const heroBackRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothRef = useRef({ x: -9999, y: -9999 });
  const animFrameRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 1800);
  }, []);

  // Spotlight Reveal Loop
  useEffect(() => {
    const stack = heroStackRef.current;
    const back = heroBackRef.current;
    const canvas = canvasRef.current;
    if (!stack || !back || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const SPOTLIGHT_R = 195;

    const resizeCanvas = () => {
      if (stack && canvas) {
        canvas.width = stack.offsetWidth || 600;
        canvas.height = stack.offsetHeight || 759;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = (x: number, y: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (x < -1000 || y < -1000) {
        back.style.maskImage = "none";
        back.style.webkitMaskImage = "none";
        back.style.opacity = "0";
        return;
      }
      back.style.opacity = "1";
      const grad = ctx.createRadialGradient(x, y, 0, x, y, SPOTLIGHT_R);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.85, "rgba(255,255,255,1)");
      grad.addColorStop(0.96, "rgba(255,255,255,0.2)");
      grad.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fill();

      const url = canvas.toDataURL("image/png");
      back.style.maskImage = `url(${url})`;
      back.style.webkitMaskImage = `url(${url})`;
    };

    let lastRenderedX = -9999;
    let lastRenderedY = -9999;

    const loop = () => {
      const dx = mouseRef.current.x - smoothRef.current.x;
      const dy = mouseRef.current.y - smoothRef.current.y;
      smoothRef.current.x += dx * 0.12;
      smoothRef.current.y += dy * 0.12;

      if (
        Math.abs(smoothRef.current.x - lastRenderedX) > 0.4 ||
        Math.abs(smoothRef.current.y - lastRenderedY) > 0.4
      ) {
        lastRenderedX = smoothRef.current.x;
        lastRenderedY = smoothRef.current.y;
        render(smoothRef.current.x, smoothRef.current.y);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const stack = heroStackRef.current;
    if (!stack) return;
    const r = stack.getBoundingClientRect();
    const sx = (stack.offsetWidth || 600) / r.width;
    const sy = (stack.offsetHeight || 759) / r.height;
    mouseRef.current.x = (e.clientX - r.left) * sx;
    mouseRef.current.y = (e.clientY - r.top) * sy;
    if (!isHoveringHero) setIsHoveringHero(true);
  };

  const handlePointerLeave = () => {
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
    setIsHoveringHero(false);
  };

  const selectAvatar = (index: number) => {
    const wrapped = (index + AVATARS.length) % AVATARS.length;
    setActiveAvatarIndex(wrapped);
    showToast(`VFX Character ${String(wrapped + 1).padStart(2, "0")} Selected`);
  };



  const toggleAwake = () => {
    setIsAwake((prev) => {
      const next = !prev;
      showToast(next ? "Live Render Rig Activated" : "Render Rig Paused");
      return next;
    });
  };

  const currentAvatar = AVATARS[activeAvatarIndex];

  return (
    <section className="relative w-full overflow-hidden bg-radial from-[#e8f3fb] via-[#d6e6f5] to-[#d4e5f4] text-[#06192f] select-none pt-14 pb-16 lg:pt-20 lg:pb-20">
      {/* Background Micro Noise / Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.13] pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.32'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Atmospheric Sheen Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/[0.08] via-transparent to-white/[0.05]" />

      {/* Main Responsive Container */}
      <div className="relative max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* TOP ROW: Studio Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 border border-white/80 shadow-xs text-xs font-semibold tracking-wider text-[#06192f] uppercase backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#1169dc] animate-pulse" />
              XSPACEWEB Studios · Service 07
            </span>
            <span className="text-xs text-[#77899c] font-medium hidden sm:inline">
              Production-Grade 3D & VFX
            </span>
          </div>
        </div>

        {/* HEADLINE: Refined to fit perfectly without wrapping or colliding with the character */}
        <div className="relative z-30 max-w-xl lg:max-w-[480px] xl:max-w-xl mt-1 mb-3 pointer-events-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-normal leading-[1.04] tracking-[-0.03em] text-[#06192f]">
            <span className="block font-medium">
              Animation &amp; VFX
            </span>
            <span className="flex items-center gap-2.5 sm:gap-3.5 mt-2">
              {/* Interlinked Chain SVG from Prompt */}
              <svg
                className="w-11 h-4 sm:w-14 sm:h-5 shrink-0 text-[#06192f]"
                viewBox="0 0 151 48"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 0C10.745 0 0 10.745 0 24s10.745 24 24 24c8.455 0 15.897-4.382 20.174-11h-9.176C31.57 40.543 28.058 43 24 43c-10.493 0-19-8.507-19-19S13.507 5 24 5c4.058 0 7.57 2.457 10.998 7h9.176C39.897 4.382 32.455 0 24 0zm103 0c-8.455 0-15.897 4.382-20.174 11h9.176C119.43 7.457 122.942 5 127 5c10.493 0 19 8.507 19 19s-8.507 19-19 19c-4.058 0-7.57-2.457-10.998-7h-9.176c4.277 6.618 11.719 11 20.174 11 13.255 0 24-10.745 24-24S140.255 0 127 0zm-62 6c-9.941 0-18 8.059-18 18s8.059 18 18 18 18-8.059 18-18-8.059-18-18-18zm0 5c7.18 0 13 5.82 13 13s-5.82 13-13 13-13-5.82-13-13 5.82-13 13-13z" />
              </svg>
              <span className="font-light tracking-tight text-[#06192f] whitespace-nowrap">
                Real Meets Virtual
              </span>
            </span>
          </h1>

          <div className="flex items-center gap-3 mt-3 text-[#77899c] text-sm">
            <span className="w-5 h-5 rounded-full bg-[#06192f] inline-flex items-center justify-center text-white">
              <Check className="w-3 h-3 stroke-[3]" />
            </span>
            <span>
              By <strong className="text-[#06192f] font-medium">XSPACEWEB Studios</strong> · Identity Series 07
            </span>
          </div>
        </div>

        {/* =========================================================
            STAGE COMPOSITION (Desktop & Responsive Hybrid Stage)
            ========================================================= */}
        <div className="relative w-full min-h-[580px] lg:min-h-[640px] flex flex-col lg:block mt-4">
          {/* GHOST TYPOGRAPHY (Rendered behind the hero character) */}
          <div
            className="hidden lg:block absolute left-4 top-[90px] text-[180px] font-bold leading-none tracking-[-0.05em] text-white/50 select-none pointer-events-none z-0"
            aria-hidden="true"
          >
            R<span className="inline-block w-[110px]" />BO
          </div>
          <div
            className="hidden lg:block absolute left-[56%] top-[250px] text-[155px] font-bold leading-none tracking-[-0.05em] text-white/45 select-none pointer-events-none z-0"
            aria-hidden="true"
          >
            VFX
          </div>

          {/* CIRCULAR ROBO-O AVATAR PORTAL (Occupies the 'O' gap in ROBO) */}
          <div
            className="hidden lg:flex absolute left-[158px] top-[110px] w-[140px] h-[140px] rounded-full border-[7px] border-white/60 bg-[#92b2d1]/20 overflow-hidden shadow-lg items-center justify-center pointer-events-none z-10"
            aria-hidden="true"
          >
            <div className="relative w-[116px] h-[147px] drop-shadow-md">
              <Image
                src={HERO_FRONT_URL}
                alt=""
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* =========================================================
              ★ SIGNATURE SPOTLIGHT HERO COMPONENT (CENTER LAYER) ★
              ========================================================= */}
          <div
            className={`relative lg:absolute lg:left-1/2 lg:-translate-x-[44%] lg:top-[-340px] w-full max-w-[560px] lg:max-w-[640px] h-[580px] sm:h-[720px] lg:h-[880px] mx-auto z-20 pointer-events-none ${
              isAwake ? "animate-breathe" : ""
            }`}
            style={{
              ["--hero-hue" as string]: `${currentAvatar.hue}deg`,
              ["--hero-sat" as string]: `${currentAvatar.sat}`,
            }}
          >
            {/* The Interactive Stack Container */}
            <div
              ref={heroStackRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              id="heroStack"
              className="relative w-full h-full pointer-events-auto cursor-crosshair group overflow-hidden hero-stack"
              style={{
                maskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 97%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 97%)",
              }}
            >
              {/* Front Base Layer: White/Silver Android */}
              {/* CRITICAL: Filter applied solely to hero-front, preventing navy halo artifact */}
              <div
                className={`absolute inset-0 w-full h-full pointer-events-none transition-[filter] duration-400 ${
                  isAwake ? "animate-breatheGlow" : ""
                }`}
                style={{
                  filter:
                    "drop-shadow(12px 17px 24px rgba(35,57,79,0.14)) hue-rotate(var(--hero-hue,0deg)) saturate(var(--hero-sat,1))",
                }}
              >
                <Image
                  src={HERO_FRONT_URL}
                  alt="White and silver female android 3D CGI render base layer"
                  fill
                  priority
                  className="object-contain select-none"
                  unoptimized
                />
              </div>

              {/* Back Reveal Layer: Heavy Gunmetal Armor (Masked by Canvas) */}
              <div
                ref={heroBackRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-200"
                style={{
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "100% 100%",
                  WebkitMaskSize: "100% 100%",
                }}
                aria-hidden="true"
              >
                <Image
                  src={HERO_BACK_URL}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-contain select-none"
                />
              </div>

              {/* Offscreen / Mask Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none hidden"
                aria-hidden="true"
              />

              {/* Soft Gradient Overlay hiding body ending */}
              <div
                className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#d6e6f5] via-[#d6e6f5]/90 to-transparent pointer-events-none z-20"
                aria-hidden="true"
              />

              {/* Interactive Hover Prompt Pill */}
              <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/90 border border-white shadow-md backdrop-blur-md text-[11px] font-semibold text-[#06192f] flex items-center gap-2 pointer-events-none transition-all duration-300 z-30 ${
                  isHoveringHero ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1169dc]" />
                <span>Move cursor over character to reveal armored VFX layer</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              LEFT: INTERACTIVE GLASS CARD (Controls & Stats - MCP Glassmorphism)
              ========================================================= */}
          <div className="relative lg:absolute lg:left-0 lg:top-[60px] w-full lg:w-[365px] rounded-[26px] border border-white/90 bg-gradient-to-br from-white/85 via-white/60 to-[#edf6fd]/75 shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_0_24px_rgba(255,255,255,0.7),0_12px_36px_-6px_rgba(35,57,79,0.07)] backdrop-blur-2xl p-6 z-30 mt-6 lg:mt-0 transition-all duration-300 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),inset_0_0_30px_rgba(255,255,255,0.95),0_18px_45px_-8px_rgba(17,105,220,0.12)] hover:-translate-y-1">
            {/* Top row: Pill & Eye */}
            <div className="flex items-start justify-between">
              <div className="-ml-3 px-5 py-2 rounded-full bg-gradient-to-br from-[#0b2b50] to-[#06192f] text-white shadow-sm">
                <strong className="block text-xl font-semibold leading-none">+150</strong>
                <small className="block text-[11px] text-slate-300 mt-1">VFX Assets Delivered</small>
              </div>

              <button
                type="button"
                onClick={toggleAwake}
                aria-label="Toggle Live 3D Render Rig"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isAwake ? "bg-[#1169dc] text-white" : "bg-white/60 text-[#06192f] hover:bg-white"
                }`}
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>

            {/* Middle copy */}
            <p className="mt-5 text-[16px] sm:text-[17px] leading-snug text-[#06192f] font-normal">
              Explore hyperreal digital humans, procedural simulations, and photoreal CGI crafted for cinematic impact.
            </p>

            {/* Bottom Controls */}
            <div className="mt-8 pt-4 border-t border-white/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#77899c] uppercase font-semibold tracking-wider block">
                  Studio Pipeline
                </span>
                <button
                  type="button"
                  onClick={() => onOpenConsultation?.("High-End Animation & VFX")}
                  className="text-left font-medium text-[#06192f] hover:text-[#1169dc] transition-colors leading-tight"
                >
                  <span className="text-sm block">Start</span>
                  <strong className="text-lg font-bold">creating &rarr;</strong>
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* Shuffle Button: Cycles Avatar */}
                <button
                  type="button"
                  onClick={() => selectAvatar(activeAvatarIndex + 1)}
                  aria-label="Shuffle VFX Character"
                  className="w-11 h-11 rounded-full bg-white/60 hover:bg-white text-[#06192f] flex items-center justify-center shadow-xs transition-transform hover:scale-105 active:scale-95"
                >
                  <Shuffle className="w-5 h-5" />
                </button>

                {/* Play Button: Toggles Awake / Breathing */}
                <button
                  type="button"
                  onClick={toggleAwake}
                  aria-pressed={isAwake}
                  aria-label="Activate Live Render Simulation"
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-md ${
                    isAwake
                      ? "bg-[#1169dc] shadow-[0_0_0_6px_rgba(17,105,220,0.15),0_0_30px_rgba(17,105,220,0.4)] scale-105"
                      : "bg-[#06192f] hover:scale-105"
                  }`}
                >
                  <Play className={`w-5 h-5 ml-0.5 fill-current ${isAwake ? "animate-pulse" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT: VERTICAL STUDIO PILLARS (Presenting Vertically)
              ========================================================= */}
          <div className="relative lg:absolute lg:right-0 lg:top-[40px] z-30 flex flex-col items-start lg:items-end gap-3.5 sm:gap-4 mt-6 lg:mt-0 select-none text-right">
            {[
              { id: "/01", title: "CGI & 3D Modeling" },
              { id: "/02", title: "Simulation & Visual FX" },
              { id: "/03", title: "Real-Time Unreal 5" },
            ].map((pillar) => (
              <div
                key={pillar.id}
                className="group flex items-center justify-end gap-3.5 sm:gap-4 text-[#06192f] hover:text-[#1169dc] transition-colors duration-200 cursor-default"
              >
                <span className="text-base sm:text-[18px] lg:text-[20px] font-medium tracking-tight text-[#06192f] group-hover:text-[#1169dc] transition-colors leading-none">
                  {pillar.title}
                </span>
                <span className="text-xs sm:text-sm font-mono font-medium text-[#77899c] group-hover:text-[#1169dc] transition-colors shrink-0">
                  {pillar.id}
                </span>
              </div>
            ))}
          </div>


          {/* =========================================================
              BOTTOM RIGHT: 5-AVATAR GALLERY SELECTOR
              ========================================================= */}
          <div className="relative lg:absolute lg:right-0 lg:bottom-[20px] w-full lg:w-[440px] z-30 mt-6 lg:mt-0">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#77899c]">
                Select Digital Asset Rig
              </span>
              <span className="text-xs text-[#06192f] font-medium">
                {currentAvatar.name}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2.5 sm:gap-3">
              {AVATARS.map((av, idx) => {
                const isActive = idx === activeAvatarIndex;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => selectAvatar(idx)}
                    aria-label={`Select ${av.name}`}
                    className={`relative w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full border-[5px] transition-all duration-200 overflow-hidden shrink-0 shadow-sm ${
                      isActive
                        ? "border-white shadow-[0_0_0_2px_rgba(17,105,220,0.35),0_8px_20px_rgba(46,74,101,0.2)] scale-105"
                        : "border-white/70 hover:border-white hover:scale-102"
                    }`}
                    style={{ backgroundColor: av.bg }}
                  >
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        width: av.iw,
                        height: av.iw,
                        transform: `translate(${av.il}, ${av.it})`,
                      }}
                    >
                      <Image
                        src={av.url}
                        alt={av.name}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================
              BOTTOM LEFT: SOCIALS & PROOF
              ========================================================= */}
          <div className="relative lg:absolute lg:left-0 lg:bottom-[20px] z-30 flex items-center gap-3 mt-6 lg:mt-0">
            <div className="flex items-center gap-2 text-xs font-medium text-[#06192f] bg-white/60 border border-white/80 px-3.5 py-2 rounded-full shadow-xs backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-[#1169dc]" />
              <span>Studio Master Pipeline · 8K HDR</span>
            </div>
            <button
              type="button"
              onClick={() => showToast("ArtStation / VFX Reel Loaded")}
              className="px-3.5 py-2 rounded-full bg-white/60 hover:bg-white border border-white/80 text-xs font-semibold text-[#06192f] transition-colors shadow-xs backdrop-blur-md"
            >
              Watch Showreel
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE TOAST NOTIFICATION */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#06192f]/95 text-white text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none ${
          toastMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {toastMessage}
      </div>

      <style jsx global>{`
        @keyframes breathe {
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes breatheGlow {
          50% {
            filter: drop-shadow(10px 15px 34px rgba(16, 105, 220, 0.22))
              hue-rotate(var(--hero-hue, 0deg)) saturate(calc(var(--hero-sat, 1) * 1.08));
          }
        }
        .animate-breathe {
          animation: breathe 3.5s ease-in-out infinite;
        }
        .animate-breatheGlow {
          animation: breatheGlow 3.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
