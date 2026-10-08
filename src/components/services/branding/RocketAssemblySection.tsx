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
} from "lucide-react";
import {
  MarketplaceBrandLogo,
  MarketplaceId,
} from "@/components/services/ecommerce/MarketplaceBrandLogo";

export interface RocketAssemblySectionProps {
  onLaunchStore?: () => void;
  onMarketplaceConsultation?: () => void;
}

const FRAME_PATHS = [
  "/animations/rocket/frames/ezgif-frame-001.jpg",
  "/animations/rocket/frames/ezgif-frame-002.jpg",
  "/animations/rocket/frames/ezgif-frame-003.jpg",
  "/animations/rocket/frames/ezgif-frame-004.jpg",
  "/animations/rocket/frames/ezgif-frame-005.jpg",
  "/animations/rocket/frames/ezgif-frame-006.jpg",
  "/animations/rocket/frames/ezgif-frame-007.jpg",
  "/animations/rocket/frames/ezgif-frame-008.jpg",
];

const UNASSEMBLED_VIDEO_SRC = "/Branding/unassembled.mp4";
const ASSEMBLED_VIDEO_SRC = "/Branding/assembled.mp4";

interface MarketplaceNodeInfo {
  id: MarketplaceId;
  name: string;
  category: string;
  metric: string;
  color: string;
}

const marketplaceNodes: MarketplaceNodeInfo[] = [
  { id: "amazon", name: "Amazon India & Global", category: "Prime FBA & Multi-Region", metric: "99.9% Buy Box Win", color: "#FF9900" },
  { id: "flipkart", name: "Flipkart", category: "Pan-India Assured Reach", metric: "Instant Stock Sync", color: "#2874F0" },
  { id: "meesho", name: "Meesho", category: "High-Velocity Social Commerce", metric: "Zero-Commission", color: "#F43397" },
  { id: "ajio", name: "AJIO", category: "Curated Fashion & Lifestyle", metric: "Reliance JIT Distribution", color: "#94A3B8" },
  { id: "myntra", name: "Myntra", category: "Premium Apparel & Trends", metric: "PPMP Unified Portal", color: "#E72757" },
  { id: "shopify", name: "Shopify Plus", category: "Custom Headless D2C Core", metric: "Sub-second Global Checkout", color: "#95BF47" },
];

const liveTickers = [
  "Order #8921 routed to Amazon FBA (38ms latency)",
  "SKU-409 stock updated across 6 channels simultaneously",
  "Flipkart algorithmic repricing won buy box at ₹1,499",
  "Meesho bulk batch 420 orders dispatched to logistics hub",
  "AJIO autumn fashion collection catalog attributes enriched",
  "Shopify headless checkout processed in 380ms",
];

export const RocketAssemblySection: React.FC<RocketAssemblySectionProps> = ({
  onLaunchStore,
  onMarketplaceConsultation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const unassembledVideoRef = useRef<HTMLVideoElement>(null);
  const assembledVideoRef = useRef<HTMLVideoElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [tickerIndex, setTickerIndex] = useState<number>(0);

  // Rotate telemetry ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveTickers.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Preload all 8 assembly frames into memory
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    FRAME_PATHS.forEach((path, index) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === FRAME_PATHS.length) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        // Even if one fails, continue
        loadedCount += 1;
        if (loadedCount === FRAME_PATHS.length) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };
      loadedImages[index] = img;
    });
  }, []);

  // Frame rendering with dual-frame cross-fade interpolation
  const renderFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    const totalFrames = images.length;
    // Map progress (0 to 1) to frame index range
    const floatIndex = progress * (totalFrames - 1);
    const indexA = Math.floor(floatIndex);
    const indexB = Math.min(totalFrames - 1, indexA + 1);
    const fraction = floatIndex - indexA;

    const imgA = images[indexA];
    const imgB = images[indexB];

    if (!imgA) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw first frame
    ctx.globalAlpha = 1.0;
    ctx.drawImage(imgA, 0, 0, canvas.width, canvas.height);

    // Blend in second frame for silky-smooth fluid progression
    if (imgB && fraction > 0.01 && indexA !== indexB) {
      ctx.globalAlpha = fraction;
      ctx.drawImage(imgB, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;
    }
  }, []);

  // Initial draw once frames are loaded
  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(scrollProgress);
    }
  }, [imagesLoaded, renderFrame, scrollProgress]);

  // Scroll listener tracking scroll progress through the 280vh track
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

      // Determine active stage
      if (progress < 0.33) {
        setActiveStage(1);
      } else if (progress < 0.67) {
        setActiveStage(2);
      } else {
        setActiveStage(3);
      }

      // Render interpolated canvas frame during the scroll scrub phase
      if (progress > 0.03 && progress < 0.94) {
        renderFrame(progress);
      }

      // Handle video playback synchronization
      if (progress <= 0.04) {
        if (unassembledVideoRef.current && unassembledVideoRef.current.paused) {
          unassembledVideoRef.current.play().catch(() => {});
        }
        if (assembledVideoRef.current && !assembledVideoRef.current.paused) {
          assembledVideoRef.current.pause();
        }
      } else if (progress >= 0.94) {
        if (assembledVideoRef.current && assembledVideoRef.current.paused) {
          assembledVideoRef.current.play().catch(() => {});
        }
        if (unassembledVideoRef.current && !unassembledVideoRef.current.paused) {
          unassembledVideoRef.current.pause();
        }
      } else {
        // Pausing background videos while scrubbing saves CPU/GPU
        if (unassembledVideoRef.current && !unassembledVideoRef.current.paused) {
          unassembledVideoRef.current.pause();
        }
        if (assembledVideoRef.current && !assembledVideoRef.current.paused) {
          assembledVideoRef.current.pause();
        }
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
    else if (stageNum === 3) targetScroll = containerTop + totalScrollable * 0.97;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const handleScrollDownToNext = () => {
    const target = document.getElementById("marketplaces-ecosystem");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop + containerRef.current.offsetHeight,
        behavior: "smooth",
      });
    }
  };

  // State determination
  const isStaticTop = scrollProgress <= 0.04;
  const isStaticBottom = scrollProgress >= 0.94;
  const isScrubbing = !isStaticTop && !isStaticBottom;

  return (
    <div
      ref={containerRef}
      id="rocket-assembly-hero"
      className="relative w-full h-[280vh] bg-[#020412] text-white selection:bg-[#38bdf8] selection:text-[#020412]"
    >
      {/* =========================================================
          STICKY FULL-SCREEN CINEMATIC VIEWPORT
          ========================================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* =========================================================
            BACKGROUND COSMIC AMBIENCE & STAR GLOW
            ========================================================= */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          {/* Subtle space grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(rgba(56,189,248,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.6) 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />

          {/* Central radial glow behind the rocket */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] sm:w-[1100px] sm:h-[1100px] rounded-full blur-[160px] opacity-25 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(168, 85, 247, 0.25) 45%, transparent 75%)",
            }}
          />

          {/* Edge blends for smooth navigation transition */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#020412]/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#020412]/90 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* =========================================================
            DIMENSIONAL HEADLINE LAYER (BEHIND THE ROCKET)
            ========================================================= */}
        <div
          className={`absolute inset-0 z-5 flex flex-col items-center justify-center text-center px-4 pointer-events-none select-none transition-all duration-700 ${
            activeStage === 1 ? "opacity-35 scale-100" : "opacity-15 scale-95"
          }`}
        >
          <div className="max-w-6xl space-y-2.5 transform -translate-y-6 sm:-translate-y-12">
            <span className="inline-block text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.38em] text-cyan-400 uppercase font-bold drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
              FROM CONCEPT TO CREATION
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white/95 via-slate-200/75 to-slate-400/30 uppercase leading-[0.94] drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]">
              EVERY GREAT IDEA STARTS WITH A VISION.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed hidden md:block opacity-90">
              Every extraordinary journey begins with the right pieces. We bring strategy,
              creativity, and technology together to build what&apos;s next.
            </p>
          </div>
        </div>

        {/* =========================================================
            MAIN ROCKET MEDIA CONTAINER (FULL WIDTH - NO BLACK SPACE ON SIDES)
            ========================================================= */}
        <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden">
          {/* 1. STATE A: UNASSEMBLED VIDEO (Plays seamlessly at scroll = 0) */}
          <video
            ref={unassembledVideoRef}
            src={UNASSEMBLED_VIDEO_SRC}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
              isStaticTop ? "opacity-100 z-12" : "opacity-0 z-0 pointer-events-none"
            }`}
            style={{
              filter: "brightness(1.25) contrast(1.15) saturate(1.1)",
            }}
          />

          {/* 2. STATE B: SCROLL-DRIVEN FRAME-BY-FRAME CANVAS (Scrubbed forward & reverse) */}
          <canvas
            ref={canvasRef}
            width={1920}
            height={1080}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
              isScrubbing || (!isStaticBottom && !isStaticTop)
                ? "opacity-100 z-12"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            style={{
              filter: "brightness(1.25) contrast(1.15) saturate(1.1)",
            }}
          />

          {/* 3. STATE C: ASSEMBLED VIDEO (Plays seamlessly once scroll completes) */}
          <video
            ref={assembledVideoRef}
            src={ASSEMBLED_VIDEO_SRC}
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
              isStaticBottom ? "opacity-100 z-12" : "opacity-0 z-0 pointer-events-none"
            }`}
            style={{
              filter: "brightness(1.25) contrast(1.15) saturate(1.1)",
            }}
          />
        </div>

        {/* =========================================================
            TOP HUD HEADER BAR
            ========================================================= */}
        <header className="relative z-25 w-full pt-4 sm:pt-6 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Eyebrow & Status */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/85 border border-slate-700/60 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#38bdf8] uppercase">
                ECOMMERCE &amp; BRANDING
              </span>
            </div>

            <span className="hidden md:inline-block text-xs font-medium text-slate-300 border-l border-slate-800 pl-3">
              From Store to eCommerce Ecosystem
            </span>
          </div>

          {/* Center / Right Stage Progress Scrubber (Clickable jump tabs) */}
          <nav
            aria-label="Story Stages"
            className="flex items-center gap-1 sm:gap-2 p-1 rounded-full bg-slate-950/85 border border-slate-800/80 backdrop-blur-xl shadow-lg"
          >
            {[
              { num: 1, label: "BUILD" },
              { num: 2, label: "LAUNCH" },
              { num: 3, label: "SCALE" },
            ].map((stage) => {
              const isActive = activeStage === stage.num;
              return (
                <button
                  key={stage.num}
                  type="button"
                  onClick={() => handleStageJump(stage.num)}
                  className={`group px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-900/80"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono opacity-80 ${
                      isActive ? "text-cyan-100" : "text-slate-500"
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
        <main className="relative z-25 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-6 pointer-events-none my-auto py-4">
          {/* -------------------------------------------------------
              LEFT COLUMN: INTERACTIVE STAGE STORY CARD
              ------------------------------------------------------- */}
          <div className="w-full max-w-[360px] sm:max-w-[410px] lg:max-w-[440px] pointer-events-auto">
            {/* STAGE 1: BUILD (Architectural Core) */}
            {activeStage === 1 && (
              <section
                aria-label="Stage 1: Build"
                className="animate-in fade-in slide-in-from-left-4 duration-500"
              >
                <div className="p-5 sm:p-6 lg:p-7 rounded-3xl bg-slate-950/65 border border-white/10 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-3.5">
                  <div className="space-y-1">
                    <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-cyan-400 uppercase block select-none">
                      STAGE 01 // ARCHITECTURAL CORE
                    </span>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-extrabold tracking-tight text-white leading-[1.15]">
                      Build, Launch &amp;{" "}
                      <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent inline-block">
                        Scale Your
                      </span>{" "}
                      eCommerce Business.
                    </h1>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                    End-to-end eCommerce and brand solutions to help you sell online, expand reach
                    and grow your brand across multiple channels with enterprise stability.
                  </p>

                  {/* 3 Technical Trust Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white">Secure</div>
                        <div className="text-[9px] text-slate-400">SOC2 &amp; 256-bit</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white">Scalable</div>
                        <div className="text-[9px] text-slate-400">100k+ Concurrency</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/80 border border-slate-800/80">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <Globe2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-white">Market Ready</div>
                        <div className="text-[9px] text-slate-400">Unified API Mesh</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
                    <button
                      type="button"
                      onClick={onLaunchStore}
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    >
                      <span>Launch Your Store</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    <button
                      type="button"
                      onClick={onMarketplaceConsultation}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/85 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold text-xs sm:text-sm backdrop-blur-md transition-all duration-200 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Marketplace Consultation</span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* STAGE 2: LAUNCH (Syndication & Assembly) */}
            {activeStage === 2 && (
              <section
                aria-label="Stage 2: Launch"
                className="animate-in fade-in slide-in-from-left-4 duration-500"
              >
                <div className="p-5 sm:p-6 lg:p-7 rounded-3xl bg-slate-950/65 border border-indigo-500/20 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-3.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-[11px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    STAGE 02 // MULTI-MARKETPLACE ASSEMBLY
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-extrabold tracking-tight text-white leading-[1.15]">
                    From Isolated Store to{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent inline-block">
                      Commerce Mesh.
                    </span>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    As components snap together, intelligent connections expand across India&apos;s
                    premier platforms. Inventory, pricing, and orders synchronize seamlessly.
                  </p>

                  {/* Marketplace Badges Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {marketplaceNodes.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 shadow-sm"
                      >
                        <MarketplaceBrandLogo id={item.id} size={14} />
                        <span className="text-[10px] font-semibold text-slate-200 truncate">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1.5 flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={onMarketplaceConsultation}
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <span>Explore Marketplace Mesh</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* STAGE 3: SCALE (Assembled & Orbital Ready) */}
            {activeStage === 3 && (
              <section
                aria-label="Stage 3: Scale"
                className="animate-in fade-in slide-in-from-left-4 duration-500"
              >
                <div className="p-5 sm:p-6 lg:p-7 rounded-3xl bg-slate-950/65 border border-emerald-500/20 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-3.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-mono font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    STAGE 03 // FULLY ASSEMBLED VELOCITY
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-extrabold tracking-tight text-white leading-[1.15]">
                    Autonomous Scale.{" "}
                    <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent inline-block">
                      Compounding Growth.
                    </span>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    With all stages assembled and locked in, your eCommerce ecosystem runs with
                    automated buy-box repricing, high-concurrency routing, and global reach.
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Order Routing</div>
                      <div className="text-sm font-extrabold text-white">38ms Avg</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400">Buy Box Retention</div>
                      <div className="text-sm font-extrabold text-emerald-400">99.8%</div>
                    </div>
                  </div>

                  <div className="pt-1.5 flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={onLaunchStore}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
                    >
                      <span>Scale Your Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={onMarketplaceConsultation}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/85 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-xs sm:text-sm cursor-pointer"
                    >
                      <span>Talk to an Architect</span>
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* -------------------------------------------------------
              RIGHT COLUMN: FLIGHT CONTROLLER TELEMETRY HUD
              ------------------------------------------------------- */}
          <div className="hidden xl:block w-[320px] pointer-events-auto">
            <div className="p-5 rounded-3xl bg-slate-950/65 border border-white/10 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.7)] space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                    Flight Telemetry
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">
                  {Math.round(scrollProgress * 100)}% ASSEMBLED
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>ASSEMBLY SEQUENCE</span>
                  <span>FRAME {Math.min(8, Math.max(1, Math.round(scrollProgress * 7) + 1))}/8</span>
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
                    Core Architecture
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                    {activeStage >= 1 ? "ONLINE" : "PENDING"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                  <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-indigo-400" />
                    Booster Docking
                  </span>
                  <span className="text-[10px] font-mono text-indigo-400 font-semibold">
                    {activeStage >= 2 ? "LOCKED" : "FLOATING"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                  <span className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <Orbit className="w-3 h-3 text-emerald-400" />
                    Multi-Channel Mesh
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                    {activeStage >= 3 ? "ORBITAL READY" : "SYNCHRONIZING"}
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 border-t border-slate-800/60 pt-2 flex items-center justify-between">
                <span>MODE:</span>
                <span className="font-mono text-slate-200">
                  {isStaticTop
                    ? "UNASSEMBLED VIDEO"
                    : isStaticBottom
                    ? "ASSEMBLED VIDEO"
                    : "SCROLL SCRUBBER"}
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* =========================================================
            BOTTOM HUD FOOTER BAR & TICKER
            ========================================================= */}
        <footer className="relative z-25 w-full pb-4 sm:pb-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/60 pt-3">
          {/* Live Order Dispatch Ticker */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping flex-shrink-0" />
            <span className="font-mono text-cyan-400 uppercase font-bold">TELEMETRY:</span>
            <span className="text-slate-300 font-medium truncate max-w-xs sm:max-w-md transition-opacity duration-300">
              {liveTickers[tickerIndex]}
            </span>
          </div>

          {/* Center Animated Scroll Guide Prompt */}
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 select-none">
            {isStaticTop ? (
              <span className="flex items-center gap-1.5 text-cyan-400 animate-bounce">
                <span>SCROLL TO BUILD THE FUTURE</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </span>
            ) : isStaticBottom ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ROCKET FULLY ASSEMBLED</span>
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
            <span>Explore Marketplaces &amp; Architecture</span>
            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>
        </footer>
      </div>
    </div>
  );
};
