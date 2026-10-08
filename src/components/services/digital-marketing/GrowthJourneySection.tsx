"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { 
  Search, 
  Sparkles, 
  Target, 
  ArrowRight, 
  Database, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Zap,
  Activity,
  BarChart3,
  MousePointerClick
} from "lucide-react";

interface Stage {
  number: string;
  tag: string;
  title: string;
  description: string;
  bulletPoints: string[];
}

const STAGES: Stage[] = [
  {
    number: "01",
    tag: "Signal Discovery",
    title: "FIND DEMAND",
    description: "Identify search demand, paid-media opportunities, audience signals, and high-intent traffic ready to convert.",
    bulletPoints: [
      "Semantic search query volume & intent mapping",
      "Competitor keyword conquesting gaps",
      "First-party customer demographic synthesis"
    ],
  },
  {
    number: "02",
    tag: "Creative Delivery",
    title: "CAPTURE ATTENTION",
    description: "Deploy high-velocity direct-response creative cells and algorithmic audience testing to capture attention at lowest CPM.",
    bulletPoints: [
      "Dynamic creative hook experimentation",
      "Lookalike & in-market audience layering",
      "Multi-format video reel & carousel distribution"
    ],
  },
  {
    number: "03",
    tag: "Funnel Velocity",
    title: "CONVERT INTENT",
    description: "Guide engaged prospects through high-speed, friction-free landing pages that maximize revenue per visit.",
    bulletPoints: [
      "Sub-second Core Web Vitals landing architectures",
      "Multivariate headline & value proposition testing",
      "High-converting micro-commitment lead flows"
    ],
  },
  {
    number: "04",
    tag: "Attribution Moat",
    title: "MEASURE EVERYTHING",
    description: "Connect multi-channel data streams into a unified server-side telemetry layer for 100% attribution certainty.",
    bulletPoints: [
      "Server-side GTM & Meta Conversions API (CAPI)",
      "Cross-channel Google Ads & CRM sync",
      "Boardroom-ready ROI & CAC telemetry"
    ],
  },
  {
    number: "05",
    tag: "Algorithmic Growth",
    title: "SCALE WINNERS",
    description: "Aggressively scale winning creative and bidding clusters while automatically scrubbing unproductive ad spend.",
    bulletPoints: [
      "Algorithmic daily budget scaling without decay",
      "Automatic negative keyword spend pruning",
      "Compounding 90-day blended ROAS lift"
    ],
  },
];

// Interactive light visual panel for Stage 01
const Stage01Visual = () => (
  <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-blue-50/50 to-indigo-50/30">
    <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Demand Radar</span>
      <span className="text-[11px] font-mono font-medium text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-full">Active Ingestion</span>
    </div>
    
    <div className="flex flex-col gap-2.5 my-4">
      {[
        { query: "enterprise digital growth agency", vol: "8,400/mo", intent: "High Commercial" },
        { query: "b2b pipeline acceleration", vol: "4,200/mo", intent: "Transaction" },
        { query: "server-side attribution setup", vol: "2,900/mo", intent: "Decision-Maker" },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 }}
          className="p-3 bg-white rounded-xl border border-slate-200/70 shadow-2xs flex items-center justify-between text-xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-medium text-slate-700">{item.query}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-[11px]">{item.vol}</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold">{item.intent}</span>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
      <span className="text-slate-500 font-medium">Audience Signals Detected</span>
      <span className="font-bold text-[#0a1b33]">42 High-Intent Cohorts</span>
    </div>
  </div>
);

// Interactive visual for Stage 02
const Stage02Visual = () => (
  <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-purple-50/50 to-pink-50/30">
    <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Creative Delivery Cells</span>
      <span className="text-[11px] font-mono font-medium text-purple-600 bg-purple-100/60 px-2 py-0.5 rounded-full">Multi-Variant</span>
    </div>

    <div className="grid grid-cols-2 gap-3 my-4">
      {[
        { format: "Short Reel #01", hook: "Problem/Agitation", ctr: "3.8% CTR", win: true },
        { format: "Static Carousel", hook: "Product Breakdown", ctr: "2.9% CTR", win: false },
        { format: "Case Teaser", hook: "Proof / Revenue", ctr: "4.4% CTR", win: true },
        { format: "Search Ad Copy B", hook: "ROI Guarantee", ctr: "3.1% CTR", win: false },
      ].map((cell, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className={`p-3 rounded-xl border flex flex-col justify-between text-xs ${
            cell.win ? "bg-white border-purple-200 shadow-xs ring-1 ring-purple-100" : "bg-white/60 border-slate-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-800 text-[11px]">{cell.format}</span>
            {cell.win && <span className="px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 text-[9px] font-bold">WINNER</span>}
          </div>
          <span className="text-slate-500 text-[10px] my-1">{cell.hook}</span>
          <span className="font-bold text-[#0a1b33] text-[12px]">{cell.ctr}</span>
        </motion.div>
      ))}
    </div>

    <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
      <span className="text-slate-500 font-medium">Algorithmic Spend Distribution</span>
      <span className="font-bold text-purple-700">Top 2 Creative Hooks Active</span>
    </div>
  </div>
);

// Interactive visual for Stage 03
const Stage03Visual = () => (
  <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-amber-50/50 to-orange-50/30">
    <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Conversion Pipeline</span>
      <span className="text-[11px] font-mono font-medium text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded-full">+46% Yield</span>
    </div>

    <div className="flex flex-col gap-2 my-4">
      {[
        { step: "Landing Page Inbound", rate: "100%", count: "10,000 Visitors" },
        { step: "Interactive Engagement", rate: "64.2%", count: "6,420 Active" },
        { step: "CTA Trigger Selected", rate: "28.5%", count: "2,850 Leads" },
        { step: "Final Conversion (SQL)", rate: "12.8%", count: "1,280 Qualified" },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center">
              0{i + 1}
            </span>
            <span className="font-medium text-slate-700 text-[11px]">{item.step}</span>
          </div>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-slate-400 text-[10px]">{item.count}</span>
            <span className="font-bold text-[#0a1b33] text-[11px]">{item.rate}</span>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
      <span className="text-slate-500 font-medium">Conversion Rate Optimization</span>
      <span className="font-bold text-amber-700">Sub-second Speed Lift</span>
    </div>
  </div>
);

// Interactive visual for Stage 04
const Stage04Visual = () => (
  <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-emerald-50/50 to-teal-50/30">
    <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Telemetry & Data Layer</span>
      <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">Server-Side CAPI</span>
    </div>

    <div className="grid grid-cols-2 gap-3 my-4">
      {["Google Ads", "Meta Ads", "Organic Search", "CRM & Pipeline"].map((src, i) => (
        <div key={i} className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between text-xs">
          <span className="font-medium text-slate-700">{src}</span>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      ))}
    </div>

    <div className="p-4 bg-white rounded-2xl border border-emerald-200 shadow-xs flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-[#0a1b33]">XSPACEWEB SIGNAL LAYER</span>
        <span className="font-mono text-emerald-600 font-bold">99.2% Matched</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full bg-emerald-500 w-[99%]" />
      </div>
      <span className="text-[10px] text-slate-400">Zero data drop from client-side ad blockers</span>
    </div>

    <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
      <span className="text-slate-500 font-medium">Closed-Loop Attribution</span>
      <span className="font-bold text-emerald-700">Full Pipeline Traceability</span>
    </div>
  </div>
);

// Interactive visual for Stage 05
const Stage05Visual = () => (
  <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-blue-50/50 to-violet-50/30">
    <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Algorithmic Scaling Engine</span>
      <span className="text-[11px] font-mono font-medium text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-full">4.8× Target ROAS</span>
    </div>

    <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs my-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-400 font-medium uppercase">Scaled Spend Velocity</span>
          <h5 className="text-[26px] font-bold text-[#0a1b33]" style={{ fontFamily: "'Outfit', sans-serif" }}>
            ₹14.2 Cr+
          </h5>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-emerald-600 font-semibold">+42% Margin Yield</span>
          <p className="text-[10px] text-slate-400">Zero ad spend waste</p>
        </div>
      </div>
      
      {/* Visual Mini Graph Bars */}
      <div className="flex items-end gap-2 h-20 pt-2">
        {[28, 38, 44, 52, 68, 85, 96].map((h, i) => (
          <div key={i} className="flex-1 bg-slate-100 rounded-t-md h-full flex items-end overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`w-full rounded-t-md ${i >= 5 ? "bg-[#1668E8]" : "bg-blue-300"}`}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="p-3 bg-white/80 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
      <span className="text-slate-500 font-medium">Underperforming Nodes Pruned</span>
      <span className="font-bold text-blue-700">100% Capital Efficiency</span>
    </div>
  </div>
);

export const GrowthJourneySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const stageIndex = Math.min(
      STAGES.length - 1,
      Math.max(0, Math.floor(latest * STAGES.length))
    );
    setActiveStage(stageIndex);
  });

  const renderVisual = (index: number) => {
    switch (index) {
      case 0:
        return <Stage01Visual />;
      case 1:
        return <Stage02Visual />;
      case 2:
        return <Stage03Visual />;
      case 3:
        return <Stage04Visual />;
      case 4:
        return <Stage05Visual />;
      default:
        return <Stage01Visual />;
    }
  };

  return (
    <section ref={containerRef} className="relative w-full bg-[#f9fafb] py-16 md:py-24 border-t border-slate-200/60">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-slate-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#1668E8]" />
            <span>The Growth Architecture</span>
          </div>
          <h2
            className="text-[34px] md:text-[46px] font-medium tracking-tight text-[#0a1b33] leading-[1.12]"
            style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
          >
            How sustainable growth actually happens
          </h2>
          <p
            className="mt-3 text-[15px] md:text-[16px] text-[#64748b] leading-relaxed"
            style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
          >
            From raw search intent to compounding enterprise scale, scroll through our 5-phase growth acceleration sequence.
          </p>
        </div>

        {/* Desktop Split-Screen Sticky Scroll (>= 1024px) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-start relative min-h-[220vh]">
          {/* Left: Scrolling Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-32 py-12">
            {STAGES.map((stage, idx) => (
              <div
                key={stage.number}
                className={`transition-opacity duration-300 ${
                  activeStage === idx ? "opacity-100" : "opacity-35"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-sm font-bold text-[#1668E8] px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100">
                    STAGE {stage.number}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {stage.tag}
                  </span>
                </div>

                <h3
                  className="text-[32px] md:text-[38px] font-semibold tracking-tight text-[#0a1b33]"
                  style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
                >
                  {stage.title}
                </h3>

                <p
                  className="text-[16px] text-[#64748b] mt-3 leading-relaxed max-w-lg"
                  style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
                >
                  {stage.description}
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  {stage.bulletPoints.map((bp, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#1668E8] shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Sticky Animated Visual Panel */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 h-[480px]">
            <div className="w-full h-full rounded-3xl bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  {renderVisual(activeStage)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Sequential Stack (< 1024px) */}
        <div className="lg:hidden flex flex-col gap-8">
          {STAGES.map((stage, idx) => (
            <div
              key={stage.number}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col gap-5"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[#1668E8] px-2 py-0.5 rounded bg-blue-50">
                    STAGE {stage.number}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {stage.tag}
                  </span>
                </div>
                <h3
                  className="text-[22px] font-semibold text-[#0a1b33]"
                  style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
                >
                  {stage.title}
                </h3>
                <p className="text-[14px] text-[#64748b] mt-1 leading-relaxed">
                  {stage.description}
                </p>
              </div>

              <div className="h-[320px] rounded-2xl overflow-hidden border border-slate-100">
                {renderVisual(idx)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
