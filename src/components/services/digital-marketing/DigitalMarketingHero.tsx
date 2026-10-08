"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Zap } from "lucide-react";

interface DigitalMarketingHeroProps {
  onOpenConsultation?: (email?: string) => void;
}

const ROTATING_WORDS = [
  "Intelligent PPC",
  "Semantic SEO",
  "Scalable Revenue",
  "High-Intent Demand",
  "Conversion Funnels"
];

const METRICS_BAR = [
  { label: "Target ROAS", value: "4.8×", change: "+42% vs baseline" },
  { label: "Organic Search Lift", value: "+340%", change: "1,240+ #1 Rankings" },
  { label: "CAC Reduction", value: "-38%", change: "Within 60 Days" },
  { label: "Client Retention", value: "99.4%", change: "Zero Lock-In Contracts" },
];

export const DigitalMarketingHero: React.FC<DigitalMarketingHeroProps> = ({ onOpenConsultation }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle Mouse Parallax Springs (4px, 8px, 12px)
  const springConfig = { stiffness: 150, damping: 20 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply on pointer devices that support hover
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(relX);
    mouseY.set(relY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const headlineFirst = "Dominating Modern Markets Through";

  return (
    <div className="w-full bg-[#f9fafb] py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8">
      {/* =========================================================
          MAIN HERO CONTAINER & VIDEO BACKGROUND
          ========================================================= */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[1400px] mx-auto rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden min-h-[620px] md:h-[660px] flex flex-col justify-between"
      >
        {/* Underlying Layer for Background Video */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 transition-transform duration-1000"
          />
        </div>

        {/* SUBTLE FLOATING DEPTH ELEMENTS (Right side, non-obscuring, light-touch parallax) */}
        <div className="hidden xl:block absolute right-16 top-16 z-10 pointer-events-none select-none">
          {/* Layer 1: 4px movement */}
          <motion.div
            style={{
              x: mouseX ? mouseX.get() * 8 : 0,
              y: mouseY ? mouseY.get() * 8 : 0,
            }}
            className="p-3 px-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-sm flex items-center gap-2.5 text-xs font-semibold text-[#0a1b33] mb-4 w-max"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Google Ads PMax • 4.8× ROAS</span>
          </motion.div>

          {/* Layer 2: 8px movement */}
          <motion.div
            style={{
              x: mouseX ? mouseX.get() * 16 : 0,
              y: mouseY ? mouseY.get() * 16 : 0,
            }}
            className="p-3 px-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-sm flex items-center gap-2.5 text-xs font-semibold text-[#0a1b33] mb-4 ml-8 w-max"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Meta CAPI • 99.2% Server Matched</span>
          </motion.div>

          {/* Layer 3: 12px movement */}
          <motion.div
            style={{
              x: mouseX ? mouseX.get() * 24 : 0,
              y: mouseY ? mouseY.get() * 24 : 0,
            }}
            className="p-3 px-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-sm flex items-center gap-2.5 text-xs font-semibold text-[#0a1b33] ml-4 w-max"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span>#1 Rank • 1,240+ Commercial Queries</span>
          </motion.div>
        </div>

        {/* HERO TEXT CONTENT */}
        <div className="relative z-20 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start max-w-3xl">
          {/* Brand Promise Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-xs mb-5"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0a1b33]">
              XSPACEWEB • ENTERPRISE DIGITAL GROWTH ENGINE
            </span>
          </motion.div>

          {/* Animated Headline with React Bits Blur/Split Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            <h1
              className="font-display text-[38px] sm:text-[46px] md:text-[56px] font-medium tracking-tight text-[#0a1b33] leading-[1.08]"
              style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
            >
              <span>{headlineFirst}</span>
              <br />
              <span className="inline-block relative h-[1.15em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_WORDS[currentWordIndex]}
                    initial={{ y: 35, opacity: 0, filter: "blur(8px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -35, opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block bg-gradient-to-r from-[#1668E8] via-[#2563eb] to-[#4f46e5] bg-clip-text text-transparent font-semibold"
                  >
                    {ROTATING_WORDS[currentWordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Subheadline aligned with real XSPACEWEB promises */}
            <p
              className="font-sans text-[14px] md:text-[16px] text-[#556987] max-w-xl mt-4 leading-relaxed font-normal"
              style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
            >
              We engineer full-funnel digital marketing, algorithmic Google & Meta campaigns, and high-authority search architectures designed to compound market share beyond boundaries.
            </p>

            {/* CTA Group */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                type="button"
                onClick={() => onOpenConsultation?.()}
                className="px-7 py-3.5 bg-[#0a152d] text-white font-medium text-[14px] rounded-full shadow-md hover:bg-[#071024] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Claim Growth Consultation</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#growth-showcase"
                className="px-6 py-3.5 bg-white/80 hover:bg-white text-slate-700 font-medium text-[14px] rounded-full border border-slate-200/80 shadow-xs backdrop-blur-md transition-all cursor-pointer"
              >
                Explore Growth Engines ↓
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM METRIC STRIP */}
        <div className="relative z-20 px-6 sm:px-10 md:px-16 pb-8 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-white/85 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/90 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.06)] p-4 sm:p-6"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {METRICS_BAR.map((item, idx) => (
                <div key={idx} className={`flex flex-col ${idx > 0 ? "pt-3 sm:pt-0 sm:pl-6" : ""}`}>
                  <span className="text-[12px] font-medium text-slate-500 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span
                      className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#0a1b33]"
                      style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
                    >
                      {item.value}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 mt-0.5">
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
