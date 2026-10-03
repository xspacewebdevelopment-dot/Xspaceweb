"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import {
  Sparkles,
  Cpu,
  ShieldCheck,
  Clock,
  Headphones,
  ArrowRight,
  Building2,
  GraduationCap,
  Users,
  User,
  Globe,
  Activity,
  Target,
  Server,
  CheckCircle2,
} from "lucide-react";

interface ProductsEcosystemSectionProps {
  onExploreClick?: () => void;
}

export const ProductsEcosystemSection: React.FC<ProductsEcosystemSectionProps> = ({
  onExploreClick,
}) => {
  const audienceCards = [
    {
      icon: Building2,
      title: "For Businesses",
      description: "Streamline operations, manage teams and grow with modern tools.",
    },
    {
      icon: GraduationCap,
      title: "For Educational Institutes",
      description: "Manage your coaching or school with ease and smart tools.",
    },
    {
      icon: Users,
      title: "For IT Teams",
      description: "Remote support and device management made simple.",
    },
    {
      icon: User,
      title: "For Individuals",
      description: "Powerful tools to work, learn and manage better.",
    },
  ];

  const metrics = [
    {
      icon: Building2,
      value: "1000+",
      label: "Businesses",
    },
    {
      icon: Users,
      value: "50000+",
      label: "Users",
    },
    {
      icon: Activity,
      value: "99.99%",
      label: "Uptime",
    },
    {
      icon: Target,
      value: "24×7",
      label: "Support",
    },
    {
      icon: Globe,
      value: "Global",
      label: "Infrastructure",
    },
  ];

  const handleScrollToCatalog = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }
    const el = document.getElementById("catalog");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#FAFCFF] py-14 sm:py-20 text-slate-900 overflow-hidden relative border-t border-slate-100">
      <Container size="wide">
        
        {/* ========================================================= */}
        {/* TOP SPLIT: WHY XSPACEWEB & DEVICES ON MOUNTAIN ROCK */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          
          {/* Left Column: Heading, Subtitle, Highlights & CTA (5.5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#1668E8] text-xs font-bold uppercase tracking-wider select-none">
              <span className="w-2 h-2 rounded-full bg-[#1668E8]" />
              <span>WHY XSPACEWEB</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#07152B] tracking-tight leading-[1.14]">
              More Than Products. <br />
              A Complete <span className="text-[#1668E8]">Ecosystem.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              We build software that solves real problems. From business management to education, GST billing to remote support — XSPACEWEB empowers individuals, teams and enterprises.
            </p>

            {/* 5 Feature Highlights with Clean Icons */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1668E8] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-800">
                  Purpose-Built Solutions
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1668E8] flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-800">
                  Scalable Architecture
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1668E8] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-800">
                  Secure &amp; Reliable
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1668E8] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-800">
                  Regular Updates
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1668E8] flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-800">
                  Dedicated Support
                </span>
              </div>
            </div>

            {/* Blue Pill Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleScrollToCatalog}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1668E8] hover:bg-[#1255C0] text-white text-sm sm:text-base font-bold transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <span>Explore Our Ecosystem</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

          {/* Right Column: High-Res Devices On Mountain Rock Image (6.5 cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[460px] rounded-[32px] overflow-hidden shadow-2xl border border-slate-200/80 group">
              <Image
                src="/images/products/ecosystem_devices.jpg"
                alt="XSPACEWEB Ecosystem on Laptop, Tablet and Mobile across mountains"
                fill
                className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* MIDDLE SECTION: BUILT FOR EVERYONE (4 CARDS) */}
        {/* ========================================================= */}
        <div className="space-y-6 mb-12">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#1668E8] text-xs font-bold uppercase tracking-wider select-none">
              <span className="w-2 h-2 rounded-full bg-[#1668E8]" />
              <span>BUILT FOR EVERYONE</span>
            </div>
          </div>

          {/* 4 Audience Cards Grid (2 columns on mobile, responsive up to 4 on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {audienceCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl sm:rounded-[24px] bg-white border border-slate-200/80 p-3.5 sm:p-6 shadow-[0_4px_20px_rgba(7,21,43,0.04)] hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center space-y-2 sm:space-y-3 group"
                >
                  {/* Icon Circle */}
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#EBF3FE] text-[#1668E8] flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#1668E8] group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-lg font-black text-[#07152B] tracking-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10.5px] sm:text-[13px] text-slate-500 font-normal leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM METRICS / TRUST BAR (DARK NAVY CONTAINER) */}
        {/* ========================================================= */}
        <div className="w-full rounded-[24px] bg-[#071E3D] text-white p-6 sm:p-7 shadow-2xl border border-blue-900/40">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-blue-900/60 items-center justify-items-center">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className={`w-full flex items-center justify-center gap-3.5 px-2 ${
                    idx > 0 ? "pt-4 sm:pt-0" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-400/30 text-cyan-300 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div className="text-left">
                    <div className="text-lg sm:text-xl font-black text-white tracking-tight leading-none">
                      {metric.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 font-medium mt-1">
                      {metric.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </Container>
    </section>
  );
};
