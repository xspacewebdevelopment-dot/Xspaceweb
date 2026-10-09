"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Play,
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  Star,
  CheckCircle2,
  ShieldCheck,
  PhoneCall,
  Search,
} from "lucide-react";

interface GmbHeroSectionProps {
  onOpenConsultation: (service?: string) => void;
  onExploreStages?: () => void;
}

export const GmbHeroSection: React.FC<GmbHeroSectionProps> = ({
  onOpenConsultation,
  onExploreStages,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToStages = () => {
    if (onExploreStages) {
      onExploreStages();
      return;
    }
    const elem = document.getElementById("gmb-three-stages");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden bg-white select-none">
      {/* ══════════════════════════════════════════════════════════════
          1. BACKGROUND VIDEO LAYER (Vibrant Scenic Trees Video)
          ══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-100 filter saturate-[1.18] contrast-[1.04]"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
            type="video/mp4"
          />
          <source src="/videos/hero-trees.mp4" type="video/mp4" />
        </video>

        {/* Soft center backlight only — ensures text readability without diminishing the side trees */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 32%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.2) 42%, transparent 72%)",
          }}
        />

        {/* Bottom soft gradient fade into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          2. MAIN CONTENT
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 flex flex-col items-center text-center">
        {/* Badge 1: Top Pill */}
        <div className="mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-4 py-1.5 text-xs sm:text-sm text-slate-700 shadow-xs backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-[#1668E8] animate-pulse" />
            <span className="font-medium text-[#0A1128]">
              Google Maps AI &amp; Local 3-Pack Optimization
            </span>
            <span className="text-[#1668E8] font-bold">✨</span>
          </div>
        </div>

        {/* Headline with Instrument Serif */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.98] tracking-[-0.03em] text-[#0A1128] max-w-4xl font-normal">
          Turn Google Searches Into{" "}
          <span
            className="italic font-normal text-[#1668E8]"
            style={{ fontFamily: "var(--font-instrument), Georgia, serif" }}
          >
            Paying
          </span>{" "}
          Customers.
        </h1>

        {/* Subheadline */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-600 max-w-[680px] leading-relaxed">
          We optimize, protect, and scale your Google Business Profile to rank #1 on Google Maps. Capture high-intent nearby customers searching for your services today.
        </p>

        {/* CTA Buttons Row */}
        <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3.5">
          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => onOpenConsultation("Google My Business Optimization")}
            className="rounded-full px-7 py-3.5 text-sm font-semibold bg-[#1668E8] hover:bg-[#1255C0] text-white shadow-[0_8px_20px_rgba(22,104,232,0.28)] hover:shadow-[0_12px_28px_rgba(22,104,232,0.38)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <span>Get Free GMB Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Interactive How It Works Button */}
          <button
            type="button"
            onClick={scrollToStages}
            aria-label="See how Google My Business works"
            className="rounded-full px-5 py-3.5 text-sm font-semibold bg-white/90 hover:bg-white border border-slate-200 text-[#0A1128] shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-2.5 cursor-pointer backdrop-blur-md"
          >
            <div className="w-7 h-7 rounded-full bg-blue-50 text-[#1668E8] flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span>See 3-Stage Process</span>
          </button>
        </div>

        {/* Micro-Social Proof */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Guaranteed Local 3-Pack Placement</span>
          </div>
          <span className="hidden sm:inline text-slate-300">·</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1668E8]" />
            <span>Google Policy &amp; Reinstatement Safe</span>
          </div>
          <span className="hidden sm:inline text-slate-300">·</span>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>Average +340% Call Increase</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          3. DASHBOARD PREVIEW WRAPPER (Frosted Glass Container)
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 -mb-16 sm:-mb-24 lg:-mb-32">
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-2.5 sm:p-4 backdrop-blur-xl transition-all duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 25px 80px -12px rgba(7, 21, 43, 0.12), 0 0 0 1px rgba(7, 21, 43, 0.05)",
          }}
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 px-2 sm:px-3 border-b border-slate-100/90 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="ml-2 font-semibold text-[#0A1128] text-[11px] sm:text-xs">
                Google Business Profile Manager · XSPACEWEB
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[11px]">
              <span>Updated 3 mins ago</span>
            </div>
          </div>

          {/* High-Resolution Dashboard Mockup Image */}
          <div className="relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden mt-2 bg-slate-50 shadow-inner">
            <Image
              src="/images/services/gmb-dashboard.jpg"
              alt="Google Business Profile Analytics Dashboard - XSPACEWEB"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />

            {/* Interactive Floating Micro-Badges on Top of Mockup */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:flex flex-col gap-2 pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-xl bg-white/95 border border-white shadow-md text-xs font-bold text-[#0A1128] flex items-center gap-2 backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-[#1668E8]" />
                <span>Google Maps #1 Verified</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-white/95 border border-white shadow-md text-xs font-bold text-emerald-600 flex items-center gap-2 backdrop-blur-md">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>+348% Customer Inquiries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
