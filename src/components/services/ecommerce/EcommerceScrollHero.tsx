"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  Zap,
  Globe2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Layers,
  TrendingUp,
  Activity,
  CheckCircle2,
  Sliders,
  ExternalLink,
} from "lucide-react";
import {
  EcommerceHeroCanvas,
} from "./EcommerceHeroCanvas";
import {
  MarketplaceBrandLogo,
  MarketplaceId,
} from "./MarketplaceBrandLogo";

interface MarketplaceNodeInfo {
  id: MarketplaceId;
  name: string;
  category: string;
  metric: string;
  color: string;
  screenPos?: { x: number; y: number; visible: boolean };
}

const marketplaceNodes: MarketplaceNodeInfo[] = [
  {
    id: "amazon",
    name: "Amazon India & Global",
    category: "Prime FBA & Multi-Region",
    metric: "99.9% Buy Box Win Rate",
    color: "#FF9900",
  },
  {
    id: "flipkart",
    name: "Flipkart",
    category: "Pan-India Assured Reach",
    metric: "Instant Stock Synchronization",
    color: "#2874F0",
  },
  {
    id: "meesho",
    name: "Meesho",
    category: "High-Velocity Social Commerce",
    metric: "Zero-Commission Fulfillment",
    color: "#F43397",
  },
  {
    id: "ajio",
    name: "AJIO",
    category: "Curated Fashion & Lifestyle",
    metric: "Reliance JIT Distribution",
    color: "#94A3B8",
  },
  {
    id: "myntra",
    name: "Myntra",
    category: "Premium Apparel & Trends",
    metric: "PPMP Unified Portal",
    color: "#E72757",
  },
  {
    id: "shopify",
    name: "Shopify Plus",
    category: "Custom Headless D2C Core",
    metric: "Sub-second Global Checkout",
    color: "#95BF47",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    category: "Autonomous Open Architecture",
    metric: "High-Concurrency REST API",
    color: "#7F54B3",
  },
];

const liveTickers = [
  "Order #8921 routed to Amazon FBA (38ms latency)",
  "SKU-409 stock updated across 6 channels simultaneously",
  "Flipkart algorithmic repricing won buy box at ₹1,499",
  "Meesho bulk batch 420 orders dispatched to logistics hub",
  "AJIO autumn fashion collection catalog attributes enriched",
  "Shopify headless checkout processed in 380ms",
];

interface EcommerceScrollHeroProps {
  onLaunchStore?: () => void;
  onMarketplaceConsultation?: () => void;
}

export const EcommerceScrollHero: React.FC<EcommerceScrollHeroProps> = ({
  onLaunchStore,
  onMarketplaceConsultation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress (0.0 to 1.0)
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [tickerIndex, setTickerIndex] = useState<number>(0);
  const [nodePositions, setNodePositions] = useState<
    Array<{ id: string; x: number; y: number; visible: boolean }>
  >([]);

  // Rotate live order dispatch ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveTickers.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Update active stage based on progress
  useEffect(() => {
    if (scrollProgress < 0.33) {
      setActiveStage(1);
    } else if (scrollProgress < 0.66) {
      setActiveStage(2);
    } else {
      setActiveStage(3);
    }
  }, [scrollProgress]);

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  // Handle stage jump click
  const handleJumpToStage = (stageNum: number) => {
    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    const totalHeight = triggerEl.offsetHeight - window.innerHeight;
    let targetProgress = 0;
    if (stageNum === 1) targetProgress = 0.05;
    if (stageNum === 2) targetProgress = 0.45;
    if (stageNum === 3) targetProgress = 0.78;

    const targetScrollY = triggerEl.offsetTop + totalHeight * targetProgress;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const handleNodesUpdate = useCallback(
    (nodes: Array<{ id: string; x: number; y: number; visible: boolean }>) => {
      setNodePositions(nodes);
    },
    []
  );

  return (
    <div
      ref={triggerRef}
      className="relative w-full bg-[#020412] text-white selection:bg-[#38bdf8] selection:text-[#020412]"
      style={{ height: "460vh" }}
    >
      {/* Sticky Hero Viewport */}
      <div
        ref={containerRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Background Ambient Cosmic Nebula Gradients & Space Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Deep Space Base Cosmic Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, #080d26 0%, #030617 45%, #020410 100%)",
            }}
          />

          {/* Upper-Left Cosmic Violet / Purple Nebula Cloud */}
          <div
            className="absolute -top-24 -left-24 w-[750px] h-[750px] rounded-full blur-[140px] opacity-40 transition-all duration-1000 animate-pulse pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, rgba(126, 34, 206, 0.18) 45%, transparent 70%)",
              animationDuration: "8s",
            }}
          />

          {/* Right-Center Celestial Sapphire & Electric Cyan Nebula Cloud */}
          <div
            className="absolute top-1/4 -right-28 w-[850px] h-[850px] rounded-full blur-[160px] opacity-45 transition-all duration-1000 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(6, 182, 212, 0.20) 45%, transparent 75%)",
            }}
          />

          {/* Dynamic Core Glow reacting to scroll stage */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[980px] h-[980px] rounded-full blur-[160px] opacity-35 transition-all duration-700 pointer-events-none"
            style={{
              background:
                activeStage === 1
                  ? "radial-gradient(circle, rgba(56,189,248,0.32) 0%, rgba(147,51,234,0.22) 40%, rgba(30,58,138,0.12) 70%, transparent 100%)"
                  : activeStage === 2
                  ? "radial-gradient(circle, rgba(168,85,247,0.38) 0%, rgba(14,165,233,0.22) 45%, rgba(67,56,202,0.15) 70%, transparent 100%)"
                  : "radial-gradient(circle, rgba(16,185,129,0.30) 0%, rgba(56,189,248,0.25) 45%, rgba(147,51,234,0.18) 70%, transparent 100%)",
            }}
          />

          {/* Bottom Galactic Rim Glow (Seamless flow into following sections) */}
          <div
            className="absolute -bottom-28 left-1/4 w-[900px] h-[600px] rounded-full blur-[150px] opacity-35 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(79, 70, 229, 0.32) 0%, rgba(6, 182, 212, 0.18) 50%, transparent 75%)",
            }}
          />

          {/* Technical Fine Coordinate Grid Overlay with Cyan/Stellar Hues */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(rgba(56,189,248,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.7) 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />

          {/* Deep Space Vignette Border */}
          <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
        </div>

        {/* 3D WebGL Canvas Layer */}
        <EcommerceHeroCanvas
          progress={scrollProgress}
          onNodesUpdate={handleNodesUpdate}
        />

        {/* =========================================================
            TOP HUD HEADER BAR
            ========================================================= */}
        <header className="relative z-20 w-full pt-4 sm:pt-6 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Eyebrow & Status */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#38bdf8] uppercase">
                ECOMMERCE SOLUTIONS
              </span>
            </div>

            <span className="hidden md:inline-block text-xs font-medium text-slate-400 border-l border-slate-800 pl-3">
              From Store to eCommerce Ecosystem
            </span>
          </div>

          {/* Center / Right Stage Progress Scrubber */}
          <nav
            aria-label="Story Stages"
            className="flex items-center gap-1 sm:gap-2 p-1 rounded-full bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl shadow-lg"
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
                  onClick={() => handleJumpToStage(stage.num)}
                  className={`group px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]"
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
            STAGE CONTENT CONTAINER (Interpolated by scroll progress)
            ========================================================= */}
        <main className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-center my-auto pointer-events-none">
          {/* -------------------------------------------------------
              STAGE 1: BUILD (0.00 -> 0.35)
              ------------------------------------------------------- */}
          <section
            aria-label="Stage 1: Build"
            className={`transition-all duration-500 ease-out ${
              scrollProgress < 0.35
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-6 pointer-events-none hidden"
            }`}
          >
            <div className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] xl:max-w-[520px] space-y-3.5 sm:space-y-4">
              {/* Eyebrow & Controlled Typography */}
              <div className="space-y-1 sm:space-y-1.5">
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.22em] text-cyan-400 uppercase block select-none">
                  STAGE 01 // ARCHITECTURAL CORE
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-extrabold tracking-tight text-white leading-[1.12]">
                  Build, Launch &amp;{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent inline-block">
                    Scale Your
                  </span>{" "}
                  eCommerce Business.
                </h1>
              </div>

              {/* Business Messaging Subtitle */}
              <p className="text-xs sm:text-sm md:text-[14px] text-slate-300 font-normal leading-relaxed max-w-[440px]">
                End-to-end eCommerce solutions to help you sell online, expand reach and
                grow your brand across multiple channels with enterprise stability.
              </p>

              {/* 3 Technical Trust Badges (Compact & Balanced) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 max-w-[460px]">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                  <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white">Secure</div>
                    <div className="text-[9px] text-slate-400">SOC2 &amp; 256-bit</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white">Scalable</div>
                    <div className="text-[9px] text-slate-400">100k+ Concurrency</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Globe2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-white">Marketplace Ready</div>
                    <div className="text-[9px] text-slate-400">Unified API Mesh</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1.5 pointer-events-auto">
                <button
                  type="button"
                  onClick={onLaunchStore}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:shadow-[0_0_30px_rgba(56,189,248,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <span>Launch Your Store</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={onMarketplaceConsultation}
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/70 font-semibold text-xs sm:text-sm backdrop-blur-sm transition-all duration-200 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Marketplace Consultation</span>
                </button>
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------
              STAGE 2: LAUNCH (0.33 -> 0.66)
              ------------------------------------------------------- */}
          <section
            aria-label="Stage 2: Launch"
            className={`transition-all duration-500 ease-out ${
              scrollProgress >= 0.35 && scrollProgress < 0.68
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-6 pointer-events-none hidden"
            }`}
          >
            <div className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] space-y-3 sm:space-y-3.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-[11px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                STAGE 02 // NEURAL STOREFRONT SYNDICATION
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.15]">
                From Isolated Store to{" "}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent inline-block">
                  Multi-Marketplace Mesh.
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-[440px]">
                As your store launches, intelligent connection lines grow organically
                connecting your central product catalog to India&apos;s leading consumer
                destinations. Orders, stock levels, and pricing synchronize autonomously.
              </p>

              {/* Dynamic Marketplace Quick Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1 max-w-[460px]">
                {marketplaceNodes.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800/80 backdrop-blur-md shadow-sm"
                  >
                    <MarketplaceBrandLogo id={item.id} size={15} />
                    <span className="text-[10px] font-semibold text-slate-300">
                      {item.name}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-0.5" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* -------------------------------------------------------
              STAGE 3: SCALE (0.66 -> 1.00)
              ------------------------------------------------------- */}
          <section
            aria-label="Stage 3: Scale"
            className={`transition-all duration-500 ease-out ${
              scrollProgress >= 0.68
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-6 pointer-events-none hidden"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Scale Narrative */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-3 sm:space-y-3.5 max-w-[480px]">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-mono font-bold">
                  <TrendingUp className="w-3 h-3" />
                  STAGE 03 // EXPONENTIAL SCALE &amp; VELOCITY
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-[1.15]">
                  Autonomous Velocity.{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent inline-block">
                    Compounding Growth.
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-[440px]">
                  Unified analytics, automated buy box pricing, cross-channel stock locking,
                  and lightning-fast fulfillment routing empower your business to scale
                  without operational complexity.
                </p>

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
                    className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-xs sm:text-sm cursor-pointer"
                  >
                    <span>Talk to an Architect</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live Telemetry Glass Card */}
              <div className="lg:col-span-6 xl:col-span-6 flex justify-end">
                <div className="w-full max-w-sm rounded-2xl bg-slate-950/85 border border-slate-800/90 p-4 sm:p-5 backdrop-blur-xl shadow-2xl space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                        Live Commerce Telemetry
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      LIVE 24/7
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-medium">Omnichannel GMV</div>
                      <div className="text-lg font-extrabold text-white mt-0.5">₹48.6M+</div>
                      <div className="text-[10px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +318% YoY
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-medium">Sync Latency</div>
                      <div className="text-lg font-extrabold text-cyan-400 mt-0.5">&lt; 850ms</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Across 7 Nodes</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-medium">Fulfillment Rate</div>
                      <div className="text-lg font-extrabold text-white mt-0.5">99.98%</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">Zero overselling</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                      <div className="text-[10px] text-slate-400 font-medium">Active Channels</div>
                      <div className="text-lg font-extrabold text-white mt-0.5">Unified</div>
                      <div className="text-[10px] text-cyan-400 mt-0.5">1-Click Publish</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* =========================================================
            BOTTOM HUD FOOTER: LIVE TICKER & SCROLL PROMPT
            ========================================================= */}
        <footer className="relative z-20 w-full pb-4 sm:pb-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          {/* Live Order Dispatch Ticker */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-800/90 backdrop-blur-md text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping flex-shrink-0" />
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider hidden sm:inline">
              LIVE NETWORK:
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-slate-200 truncate max-w-xs sm:max-w-md">
              {liveTickers[tickerIndex]}
            </span>
          </div>

          {/* Scroll Down Prompt Indicator */}
          <div className="flex items-center gap-2 text-slate-400 select-none">
            <span className="text-[11px] font-mono tracking-widest uppercase">
              {scrollProgress > 0.85 ? "TRANSITIONING" : "SCROLL TO EXPLORE"}
            </span>
            <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center animate-bounce">
              <ChevronDown className="w-3 h-3 text-cyan-400" />
            </div>
          </div>
        </footer>

        {/* Subtle Upward Transition Bridge at End of Hero */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(3,7,18,0.85) 60%, #030712 100%)",
            opacity: scrollProgress > 0.8 ? 1 : 0.6,
          }}
        />
      </div>
    </div>
  );
};
