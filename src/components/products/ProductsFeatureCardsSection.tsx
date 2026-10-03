"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Users,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe,
  Plus,
  Monitor,
  GraduationCap,
  Calendar,
  Clock,
  Shield,
  Search,
  Check,
  Building,
  FileText,
  Briefcase,
  Play,
  Layers,
} from "lucide-react";
interface ProductsFeatureCardsSectionProps {
  onOpenProductDemo?: (productId: string) => void;
}

export const ProductsFeatureCardsSection: React.FC<ProductsFeatureCardsSectionProps> = ({
  onOpenProductDemo,
}) => {

  return (
    <section className="w-full bg-[#F8FAFC] py-8 sm:py-10 text-slate-900 overflow-hidden">
      <Container size="wide">

        {/* ========================================================= */}
        {/* 2X2 PRODUCTS SHOWCASE GRID */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
          
          {/* ------------------------------------------------------------- */}
          {/* CARD 1: SimpleKaam (Top-Left) */}
          {/* ------------------------------------------------------------- */}
          <div id="simplekaam" className="scroll-mt-24 rounded-[22px] sm:rounded-[24px] border border-blue-100 p-4 sm:p-6 lg:p-7 shadow-[0_4px_20px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300 min-h-[240px] sm:min-h-[270px] lg:min-h-[285px] bg-slate-50">
            {/* Official Background Image from Saas Product page (5.png) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src="/images/products/5.png"
                alt="SimpleKaam Work OS"
                fill
                priority
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
            </div>

            {/* Left Details */}
            <div className="relative z-10 max-w-[58%] xs:max-w-[62%] sm:max-w-[270px] lg:max-w-[300px] space-y-1.5 sm:space-y-2.5">
              {/* Logo & Badge */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1668E8] text-white font-black text-sm sm:text-base flex items-center justify-center shadow-sm shadow-blue-500/30 flex-shrink-0">
                  S
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm md:text-base font-black text-[#07152B] leading-none truncate">SimpleKaam</h3>
                  <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-100 text-[#1668E8] text-[8.5px] sm:text-[9.5px] font-bold mt-0.5">
                    Coming Soon (Oct 2026)
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h4 className="text-[15px] sm:text-lg lg:text-xl font-extrabold text-[#07152B] tracking-tight leading-snug pt-0.5">
                Manage Your Business, Simply.
              </h4>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2">
                Unified Work OS and platform for managing employment workflows, team collaboration, and daily operations.
              </p>

              {/* Action Buttons */}
              <div className="pt-1 sm:pt-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <a
                  href="http://simplekaam.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-[#07152B] hover:bg-[#1668E8] text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm active:scale-95 inline-flex items-center gap-1 sm:gap-1.5 cursor-pointer"
                >
                  <span>Visit Website</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => onOpenProductDemo?.("simplekaam")}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/85 hover:bg-white text-slate-700 text-[11px] sm:text-xs font-semibold border border-slate-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARD 2: Gurukul Coaching App (Top-Right) */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-[22px] sm:rounded-[24px] border border-purple-100 p-4 sm:p-6 lg:p-7 shadow-[0_4px_20px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300 min-h-[240px] sm:min-h-[270px] lg:min-h-[285px] bg-slate-50">
            {/* Official Background Image from Saas Product page (3.png) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src="/images/products/3.png"
                alt="Gurukul Coaching App"
                fill
                priority
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
            </div>

            {/* Left Details */}
            <div className="relative z-10 max-w-[58%] xs:max-w-[62%] sm:max-w-[270px] lg:max-w-[300px] space-y-1.5 sm:space-y-2.5">
              {/* Logo & Badge */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#7C3AED] text-white font-black text-sm sm:text-base flex items-center justify-center shadow-sm shadow-purple-500/30 flex-shrink-0">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm md:text-base font-black text-[#07152B] leading-none truncate">Gurukul App</h3>
                  <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded-full bg-purple-100 text-[#7C3AED] text-[8.5px] sm:text-[9.5px] font-bold mt-0.5">
                    Coming Soon (Oct 2026)
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h4 className="text-[15px] sm:text-lg lg:text-xl font-extrabold text-[#07152B] tracking-tight leading-snug pt-0.5">
                Modern Learning for a Brighter Future.
              </h4>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2">
                Complete coaching &amp; learning management system for institutions, teachers and students.
              </p>

              {/* Action Buttons */}
              <div className="pt-1 sm:pt-1.5 flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => onOpenProductDemo?.("gurukul")}
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-[#07152B] hover:bg-[#7C3AED] text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm active:scale-95 inline-flex items-center gap-1 sm:gap-1.5 cursor-pointer"
                >
                  <span>Explore Gurukul</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARD 3: MakeGSTBill (Middle-Left) */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-[22px] sm:rounded-[24px] border border-orange-100 p-4 sm:p-6 lg:p-7 shadow-[0_4px_20px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-lg transition-all duration-300 min-h-[240px] sm:min-h-[270px] lg:min-h-[285px] bg-slate-50">
            {/* Official Background Image from Saas Product page (4.png) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src="/images/products/4.png"
                alt="MakeGSTBill"
                fill
                priority
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
            </div>

            {/* Left Details */}
            <div className="relative z-10 max-w-[58%] xs:max-w-[62%] sm:max-w-[270px] lg:max-w-[300px] space-y-1.5 sm:space-y-2.5">
              {/* Logo */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="px-1.5 sm:px-2 py-0.5 rounded-lg bg-white border border-orange-200 shadow-2xs flex items-center gap-0.5 flex-shrink-0">
                  <span className="font-black text-[#EA4335] text-[11px] sm:text-xs">M</span>
                  <span className="font-black text-[#FBBC05] text-[11px] sm:text-xs">G</span>
                  <span className="font-black text-[#4285F4] text-[11px] sm:text-xs">B</span>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-black text-[#07152B] truncate">MakeGSTBill</h3>
              </div>

              {/* Heading */}
              <h4 className="text-[15px] sm:text-lg lg:text-xl font-extrabold text-[#07152B] tracking-tight leading-snug pt-0.5">
                GST Billing Made Easy for Everyone.
              </h4>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2">
                Simple and powerful GST billing &amp; accounting software for Indian businesses.
              </p>

              {/* Action Buttons */}
              <div className="pt-1 sm:pt-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <a
                  href="https://makegstbill.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-[#07152B] hover:bg-[#EA4335] text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm active:scale-95 inline-flex items-center gap-1 sm:gap-1.5 cursor-pointer"
                >
                  <span>Visit Website</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => onOpenProductDemo?.("makegstbill")}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/85 hover:bg-white text-slate-700 text-[11px] sm:text-xs font-semibold border border-slate-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARD 4: GoldenGST (Middle-Right) */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-[22px] sm:rounded-[24px] border border-amber-200/80 p-4 sm:p-6 lg:p-7 shadow-[0_4px_25px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 min-h-[240px] sm:min-h-[270px] lg:min-h-[285px] bg-[#FAF3E0] text-[#07152B]">
            {/* Official Background Image from Saas Product page (2.png) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <Image
                src="/images/products/2.png"
                alt="GoldenGST Business Suite"
                fill
                priority
                className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
            </div>

            {/* Left Details */}
            <div className="relative z-10 max-w-[58%] xs:max-w-[62%] sm:max-w-[240px] lg:max-w-[270px] space-y-1.5 sm:space-y-2.5">
              {/* Logo */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#601414] text-amber-400 font-black text-xs sm:text-sm flex items-center justify-center shadow-sm border border-amber-400/40 flex-shrink-0">
                  G
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#07152B] truncate">GoldenGST</h3>
              </div>

              {/* Heading */}
              <h4 className="text-[15px] sm:text-lg lg:text-xl font-extrabold text-[#07152B] tracking-tight leading-snug pt-0.5">
                Advanced GST &amp; Business Suite.
              </h4>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-slate-700 font-medium leading-relaxed line-clamp-2">
                A complete business suite with advanced accounting, multi-branch management and powerful analytics.
              </p>

              {/* Action Buttons */}
              <div className="pt-1 sm:pt-1.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <a
                  href="https://www.goldengst.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-[#07152B] hover:bg-[#D97706] text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm active:scale-95 inline-flex items-center gap-1 sm:gap-1.5 cursor-pointer"
                >
                  <span>Visit Website</span>
                  <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => onOpenProductDemo?.("goldengst")}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/85 hover:bg-white text-slate-700 text-[11px] sm:text-xs font-semibold border border-slate-200/80 transition-all active:scale-95 cursor-pointer shadow-2xs"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* CARD 5: FreeDeskPro (Full-Width Cinematic Bottom Banner) */}
        {/* ========================================================= */}
        <div className="rounded-[24px] sm:rounded-[26px] bg-[#E8F4FD] text-[#07152B] border border-blue-100 shadow-md relative overflow-hidden group min-h-[220px] sm:min-h-[265px] lg:min-h-[280px] flex items-center">
          
          {/* High-res Photorealistic Workstation Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/images/products/6.png"
              alt="FreeDeskPro Ultra-Fast Remote Desktop Workstation"
              fill
              priority
              className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
            />
          </div>

          {/* Banner Content Container (Left Side Text) */}
          <div className="relative z-10 p-4 sm:p-8 lg:p-9 max-w-[60%] sm:max-w-md lg:max-w-lg space-y-1.5 sm:space-y-3">
            
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-[#06B6D4] text-white font-black text-sm sm:text-lg md:text-xl flex items-center justify-center shadow-md shadow-cyan-500/20 flex-shrink-0">
                P
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-base md:text-lg font-black text-[#07152B] leading-tight truncate">FreeDeskPro</h3>
                <span className="text-[9.5px] sm:text-[11px] text-cyan-800 font-mono font-bold tracking-tight block">Ultra Low-Latency Engine</span>
              </div>
            </div>

            {/* Main Headline */}
            <h4 className="text-[16px] sm:text-2xl lg:text-3xl font-extrabold text-[#07152B] tracking-tight leading-tight">
              Secure &amp; Fast Remote Access.
            </h4>

            {/* Subtitle */}
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-700 leading-relaxed font-normal line-clamp-2 sm:line-clamp-none">
              A powerful remote desktop platform for individuals and teams with sub-30ms latency, multi-monitor switching, and bank-grade security.
            </p>

            {/* Action Buttons */}
            <div className="pt-1 sm:pt-1.5 flex flex-wrap items-center gap-2 sm:gap-2.5">
              <a
                href="https://freedeskpro.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#07152B] hover:bg-[#06B6D4] text-white font-bold text-[11px] sm:text-xs md:text-sm transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-1 sm:gap-1.5 border border-slate-700/20"
              >
                <span>Visit FreeDeskPro</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => onOpenProductDemo?.("freedeskpro")}
                className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/85 hover:bg-white text-slate-800 font-semibold text-[11px] sm:text-xs md:text-sm transition-all border border-blue-200/80 shadow-2xs cursor-pointer inline-flex items-center gap-1 sm:gap-1.5"
              >
                <span>Test Live Connection</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
};
