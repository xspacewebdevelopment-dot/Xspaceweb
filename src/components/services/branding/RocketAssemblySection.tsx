"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ShieldCheck,
  Zap,
  Globe2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  TrendingUp,
  Activity,
  Layers,
  Cpu,
  Orbit,
  CheckCircle2,
  Compass,
  Palette,
  Rocket,
} from "lucide-react";

export interface RocketAssemblySectionProps {
  onLaunchStore?: () => void;
  onMarketplaceConsultation?: () => void;
  onOpenConsultation?: (service?: string) => void;
}

// All 70 frames extracted from the user's zip file
const TOTAL_FRAMES = 70;
const FRAME_PATHS: string[] = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
  `/animations/rocket/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`
);

const ROCKET_VIDEO_SRC = "/videos/rocket.mp4";

const liveTickers = [
  "Telemetry: Core brand identity tokens synthesized [100% Vector]",
  "Telemetry: Chromatic system calibrated for multi-spectrum display",
  "Telemetry: 3D packaging geometry docked with photorealistic materials",
  "Telemetry: Omnichannel guidelines synchronized across digital touchpoints",
  "Telemetry: Brand architecture primed for high-velocity market rollout",
  "Telemetry: Autonomous velocity achieved — category leadership locked",
];

export const RocketAssemblySection: React.FC<RocketAssemblySectionProps> = ({
  onLaunchStore,
  onMarketplaceConsultation,
  onOpenConsultation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [firstFrameLoaded, setFirstFrameLoaded] = useState<boolean>(false);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [tickerIndex, setTickerIndex] = useState<number>(0);

  const handleCta = (serviceName: string) => {
    if (onOpenConsultation) {
      onOpenConsultation(serviceName);
    } else if (onLaunchStore) {
      onLaunchStore();
    } else if (onMarketplaceConsultation) {
      onMarketplaceConsultation();
    }
  };

  // Rotate telemetry ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveTickers.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // Frame rendering with sub-frame cross-fade interpolation (native 1280x720 canvas)
  const renderFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = imagesRef.current;
    if (!images[0]) return;

    const total = TOTAL_FRAMES;
    const clampedProgress = Math.min(1, Math.max(0, progress));
    const floatIndex = clampedProgress * (total - 1);
    const indexA = Math.floor(floatIndex);
    const indexB = Math.min(total - 1, indexA + 1);
    const fraction = floatIndex - indexA;

    // Fall back to nearest loaded image if current frame isn't ready yet
    let imgA = images[indexA];
    if (!imgA) {
      for (let i = indexA; i >= 0; i--) {
        if (images[i]) {
          imgA = images[i];
          break;
        }
      }
      if (!imgA) imgA = images[0];
    }

    const imgB = images[indexB] || imgA;
    if (!imgA) return;

    const cw = 1920;
    const ch = 1080;

    ctx.clearRect(0, 0, cw, ch);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Draw primary frame in Full HD
    ctx.globalAlpha = 1.0;
    ctx.drawImage(imgA, 0, 0, cw, ch);

    // Smooth sub-frame cross-fade
    if (imgB && imgA !== imgB && fraction > 0.01) {
      ctx.globalAlpha = fraction;
      ctx.drawImage(imgB, 0, 0, cw, ch);
      ctx.globalAlpha = 1.0;
    }
  }, []);

  // Preload frames progressively: Frame 1 immediately, then remainder in background
  useEffect(() => {
    // 1. Priority load Frame 1
    const frameOne = new Image();
    frameOne.src = FRAME_PATHS[0];
    frameOne.onload = () => {
      imagesRef.current[0] = frameOne;
      setFirstFrameLoaded(true);
      setLoadedCount((c) => c + 1);
    };

    // 2. Load remaining frames in batches
    let batchIndex = 1;
    const loadNextBatch = () => {
      const end = Math.min(TOTAL_FRAMES, batchIndex + 12);
      for (let i = batchIndex; i < end; i++) {
        const img = new Image();
        img.src = FRAME_PATHS[i];
        const idx = i;
        img.onload = () => {
          imagesRef.current[idx] = img;
          setLoadedCount((c) => c + 1);
        };
      }
      batchIndex = end;
      if (batchIndex < TOTAL_FRAMES) {
        setTimeout(loadNextBatch, 50);
      }
    };

    const timer = setTimeout(loadNextBatch, 30);
    return () => clearTimeout(timer);
  }, []);

  // Draw initial frame as soon as Frame 1 is ready
  useEffect(() => {
    if (firstFrameLoaded) {
      renderFrame(0);
    }
  }, [firstFrameLoaded, renderFrame]);

  // Scroll listener tracking scroll progress through the 300vh track
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));

      setScrollProgress(progress);

      // 3 Stages: BUILD (0 - 0.33), SCALE (0.34 - 0.66), LAUNCH (0.67 - 1.0)
      if (progress < 0.34) {
        setActiveStage(1);
      } else if (progress < 0.67) {
        setActiveStage(2);
      } else {
        setActiveStage(3);
      }

      // Transition between static video and scroll scrubber
      if (progress < 0.02) {
        // At the top: Video plays
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      } else {
        // Scrolling: Canvas scrubs, pause video to save resources
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
        renderFrame(progress);
      }
    };

    const onScrollTick = () => {
      handleScroll();
      animationFrameId = requestAnimationFrame(onScrollTick);
    };

    animationFrameId = requestAnimationFrame(onScrollTick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [renderFrame]);

  // Stage tab jumping
  const handleStageJump = (stageNum: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

    let targetScroll = containerTop;
    if (stageNum === 1) targetScroll = containerTop;
    else if (stageNum === 2) targetScroll = containerTop + totalScrollable * 0.48;
    else if (stageNum === 3) targetScroll = containerTop + totalScrollable * 0.98;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const handleScrollDownToNext = () => {
    const target =
      document.getElementById("brand-gravity-journey") ||
      document.getElementById("brand-pillars-bento");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop + containerRef.current.offsetHeight,
        behavior: "smooth",
      });
    }
  };

  const isStaticTop = scrollProgress < 0.02;

  const currentFrameNumber = Math.min(
    TOTAL_FRAMES,
    Math.max(1, Math.round(scrollProgress * (TOTAL_FRAMES - 1)) + 1)
  );

  return (
    <div
      ref={containerRef}
      id="rocket-assembly-hero"
      className="relative w-full h-[300vh] text-white selection:bg-[#38bdf8] selection:text-[#02040c]"
    >
      {/* =========================================================
          STICKY FULL-SCREEN CINEMATIC VIEWPORT
          ========================================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* =========================================================
            BACKGROUND COSMIC AMBIENCE & COLOR-MATCHED GLOW
            ========================================================= */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          {/* Central radial space glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full blur-[190px] opacity-25 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(99, 102, 241, 0.25) 40%, transparent 75%)",
            }}
          />
        </div>

        {/* =========================================================
            ROCKET MEDIA CONTAINER: VIDEO AT TOP, CANVAS ON SCROLL
            Equipped with Cloud-like Gradient Masks & Vignettes
            ========================================================= */}
        <div className="absolute inset-0 z-10 pointer-events-none select-none flex items-center justify-center pt-16 sm:pt-20 pb-16">
          <div
            className="relative w-full max-w-[1280px] h-full max-h-[76vh] sm:max-h-[80vh] flex items-center justify-center"
            style={{
              // Elliptical radial mask dissolving outer edges completely
              maskImage:
                "radial-gradient(ellipse 72% 68% at 50% 50%, black 42%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.3) 80%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 72% 68% at 50% 50%, black 42%, rgba(0,0,0,0.85) 62%, rgba(0,0,0,0.3) 80%, transparent 100%)",
            }}
          >
            {/* 1. Static Top: rocket.mp4 Playing Seamlessly */}
            <video
              ref={videoRef}
              src={ROCKET_VIDEO_SRC}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className={`absolute w-full h-full object-contain transition-opacity duration-500 ${
                isStaticTop ? "opacity-100 z-12" : "opacity-0 z-0 pointer-events-none"
              }`}
              style={{
                filter: "brightness(1.08) contrast(1.06)",
              }}
            />

            {/* 2. Scrolling: Frame-Scrubbed Canvas taking over instantly */}
            <canvas
              ref={canvasRef}
              width={1920}
              height={1080}
              className={`absolute w-full h-full object-contain transition-opacity duration-300 ${
                !isStaticTop ? "opacity-100 z-12" : "opacity-0 z-0 pointer-events-none"
              }`}
              style={{
                filter: "brightness(1.08) contrast(1.06)",
              }}
            />

            {/* Cloud-Like Gradient Overlays to Hide Any Video/Canvas Rectangle Lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              {/* Top feathering cloud */}
              <div className="absolute -top-6 inset-x-0 h-28 bg-gradient-to-b from-[#02040c] via-[#02040c]/80 to-transparent blur-md" />
              {/* Bottom feathering cloud */}
              <div className="absolute -bottom-6 inset-x-0 h-32 bg-gradient-to-t from-[#02040c] via-[#02040c]/80 to-transparent blur-md" />
              {/* Left feathering cloud */}
              <div className="absolute inset-y-0 -left-6 w-32 bg-gradient-to-r from-[#02040c] via-[#02040c]/80 to-transparent blur-md" />
              {/* Right feathering cloud */}
              <div className="absolute inset-y-0 -right-6 w-32 bg-gradient-to-l from-[#02040c] via-[#02040c]/80 to-transparent blur-md" />

              {/* 4 Corner Organic Cloud Blobs */}
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#02040c] blur-2xl opacity-90" />
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#02040c] blur-2xl opacity-90" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#02040c] blur-2xl opacity-90" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[#02040c] blur-2xl opacity-90" />
            </div>
          </div>
        </div>

        {/* =========================================================
            TOP HUD HEADER BAR
            ========================================================= */}
        <header className="relative z-25 w-full pt-16 sm:pt-20 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Eyebrow & Status */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 border border-slate-800/80 backdrop-blur-xl shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-[0.22em] text-[#38bdf8] uppercase">
                BRAND ARCHITECTURE
              </span>
            </div>

            <span className="hidden md:inline-block text-xs font-mono text-slate-400 border-l border-slate-800 pl-3">
              SCALE • BUILD • LAUNCH PROTOCOL
            </span>
          </div>

          {/* Center Stage Progress Scrubber (Clickable jump tabs) */}
          <nav
            aria-label="Brand Rocket Stages"
            className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-slate-950/85 border border-slate-800/90 backdrop-blur-xl shadow-2xl"
          >
            {[
              { num: 1, label: "BUILD", sub: "Core" },
              { num: 2, label: "SCALE", sub: "System" },
              { num: 3, label: "LAUNCH", sub: "Velocity" },
            ].map((stage) => {
              const isActive = activeStage === stage.num;
              return (
                <button
                  key={stage.num}
                  type="button"
                  onClick={() => handleStageJump(stage.num)}
                  className={`group px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.45)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/80"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono ${
                      isActive ? "text-cyan-200" : "text-slate-500"
                    }`}
                  >
                    0{stage.num}
                  </span>
                  <span>{stage.label}</span>
                </button>
              );
            })}
          </nav>
        </header>

        {/* =========================================================
            FLANKING HUD STAGE CONTENT (COMFORTABLY FRAMING ROCKET)
            ========================================================= */}
        <main className="relative z-25 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-6 pointer-events-none my-auto py-2">
          {/* -------------------------------------------------------
              LEFT COLUMN: INTERACTIVE STAGE STORY CARD
              ------------------------------------------------------- */}
          <div className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] pointer-events-auto">
            {/* STAGE 1: BUILD (Brand Architecture & Blueprint) */}
            {activeStage === 1 && (
              <section
                aria-label="Stage 1: Build"
                className="animate-in fade-in slide-in-from-left-4 duration-500"
              >
                <div className="p-5 sm:p-6 rounded-3xl bg-slate-950/80 border border-cyan-500/25 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-3.5">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase select-none">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      <span>STAGE 01 // BUILD ARCHITECTURE</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-[30px] font-extrabold tracking-tight text-white leading-[1.14]">
                      Build an Iconic Brand{" "}
                      <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent inline-block">
                        From First Principles.
                      </span>
                    </h1>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                    Every category leader begins with atomic precision. We construct memorable visual identities, mathematical vector typography, and strategic positioning engineered for market authority.
                  </p>

                  {/* 3 Technical Trust Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                        <Palette className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white">Identity</div>
                        <div className="text-[9px] text-slate-400">Pure Vector Core</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white">Precision</div>
                        <div className="text-[9px] text-slate-400">Grid Harmony</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white">Ownership</div>
                        <div className="text-[9px] text-slate-400">100% IP Protected</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleCta("Brand Architecture & Identity Sprint")}
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    >
                      <span>Build Your Brand Core</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCta("Brand Audit & Consultation")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/85 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all duration-200 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Executive Consultation</span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* STAGE 2: SCALE (Multi-System Assembly & Omnichannel Design System) */}
            {activeStage === 2 && (
              <section
                aria-label="Stage 2: Scale"
                className="animate-in fade-in slide-in-from-left-4 duration-500"
              >
                <div className="p-5 sm:p-6 rounded-3xl bg-slate-950/80 border border-indigo-500/35 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-3.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-[10px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    STAGE 02 // MULTI-SYSTEM DOCKING & SCALE
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-[30px] font-extrabold tracking-tight text-white leading-[1.14]">
                    Scale with a Unified{" "}
                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block">
                      Design System.
                    </span>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    As components dock in space, your brand scales into a living ecosystem. 3D packaging, headless UI components, motion guidelines, and print dielines lock into cohesive alignment.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Design Tokens</div>
                      <div className="text-sm font-extrabold text-white">400+ Figma Assets</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400">3D Packaging</div>
                      <div className="text-sm font-extrabold text-indigo-400">8K Octane Renders</div>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleCta("Design System & 3D Packaging Architecture")}
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <span>Scale Your Design System</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* STAGE 3: LAUNCH (Orbital Velocity & Market Dominance) */}
            {activeStage === 3 && (
              <section
                aria-label="Stage 3: Launch"
                className="animate-in fade-in slide-in-from-left-4 duration-500"
              >
                <div className="p-5 sm:p-6 rounded-3xl bg-slate-950/80 border border-emerald-500/35 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-3.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    STAGE 03 // ORBITAL LAUNCH VELOCITY
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-[30px] font-extrabold tracking-tight text-white leading-[1.14]">
                    Launch Into Market{" "}
                    <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent inline-block">
                      With Total Authority.
                    </span>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    With full assembly locked in, your brand vehicle ignites market penetration. High recall, premium pricing tolerance, and omnichannel dominance command the competitive landscape.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Brand Equity Lift</div>
                      <div className="text-sm font-extrabold text-emerald-400">+240% Average</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Conversion Impact</div>
                      <div className="text-sm font-extrabold text-white">4.8x Visual CTR</div>
                    </div>
                  </div>

                  <div className="pt-1 flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleCta("Full-Spectrum Brand Launch")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
                    >
                      <span>Ignite Brand Launch</span>
                      <Rocket className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCta("Executive Brand Strategy")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/85 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-xs sm:text-sm cursor-pointer"
                    >
                      <span>Talk to a Brand Architect</span>
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* -------------------------------------------------------
              RIGHT COLUMN: FLIGHT CONTROLLER TELEMETRY HUD
              ------------------------------------------------------- */}
          <div className="hidden xl:block w-[310px] pointer-events-auto">
            <div className="p-5 rounded-3xl bg-slate-950/80 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
                    VEHICLE TELEMETRY
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">
                  {Math.round(scrollProgress * 100)}% ASSEMBLED
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>ORBITAL SCRUBBER</span>
                  <span>FRAME {currentFrameNumber}/{TOTAL_FRAMES}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-150"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </div>
              </div>

              {/* Status pills */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                  <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-cyan-400" />
                    Stage 01: Core Architecture
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                    {activeStage >= 1 ? "ASSEMBLED" : "PENDING"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                  <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-indigo-400" />
                    Stage 02: System Docking
                  </span>
                  <span className="text-[10px] font-mono text-indigo-400 font-semibold">
                    {activeStage >= 2 ? "LOCKED" : "FLOATING"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                  <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <Orbit className="w-3 h-3 text-emerald-400" />
                    Stage 03: Orbital Trajectory
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                    {activeStage >= 3 ? "IGNITION READY" : "SYNCHRONIZING"}
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 border-t border-slate-800/60 pt-2 flex items-center justify-between font-mono">
                <span>BUFFER STATUS:</span>
                <span className="text-cyan-400 font-semibold">
                  {isStaticTop ? "PLAYING ROCKET.MP4" : `${loadedCount}/${TOTAL_FRAMES} FRAMES READY`}
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* =========================================================
            BOTTOM HUD FOOTER BAR & LIVE TICKER
            ========================================================= */}
        <footer className="relative z-25 w-full pb-4 sm:pb-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/60 pt-3">
          {/* Live Mission Telemetry Ticker */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping flex-shrink-0" />
            <span className="font-mono text-cyan-400 uppercase font-bold">MISSION TELEMETRY:</span>
            <span className="text-slate-300 font-medium truncate max-w-xs sm:max-w-md transition-opacity duration-300">
              {liveTickers[tickerIndex]}
            </span>
          </div>

          {/* Center Animated Scroll Guide Prompt */}
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 select-none">
            {isStaticTop ? (
              <span className="flex items-center gap-1.5 text-cyan-400 animate-bounce">
                <span>SCROLL TO ASSEMBLE ROCKET</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </span>
            ) : scrollProgress >= 0.95 ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ROCKET FULLY ASSEMBLED // READY FOR LAUNCH</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-indigo-300">
                <span>ASSEMBLING ROCKET ({Math.round(scrollProgress * 100)}%)</span>
                <ChevronDown className="w-3.5 h-3.5 animate-pulse" />
              </span>
            )}
          </div>

          {/* Scroll Guide / Next Section Button */}
          <button
            type="button"
            onClick={handleScrollDownToNext}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Explore Brand Gravity Journey</span>
            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default RocketAssemblySection;
