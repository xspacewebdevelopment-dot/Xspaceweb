"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import {
  ArrowRight,
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
    <section className="w-full bg-[#F8FAFC] py-10 sm:py-14 text-slate-900 overflow-hidden">
      <Container size="wide">

        {/* ========================================================= */}
        {/* 2X2 PRODUCTS SHOWCASE GRID */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 mb-6 sm:mb-7">
          
          {/* ------------------------------------------------------------- */}
          {/* CARD 1: SimpleKaam (Top-Left) */}
          {/* ------------------------------------------------------------- */}
          <div id="simplekaam" className="scroll-mt-24 rounded-[32px] border border-blue-100 p-6 sm:p-8 shadow-[0_4px_25px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 min-h-[340px] sm:min-h-[360px] bg-slate-50">
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
            <div className="relative z-10 max-w-[280px] sm:max-w-[310px] space-y-3">
              {/* Logo & Badge */}
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#1668E8] text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-500/30">
                  S
                </div>
                <div>
                  <h3 className="text-base font-black text-[#07152B]">SimpleKaam</h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1668E8] text-[10px] font-bold">
                    Coming Soon (Oct 2026)
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h4 className="text-2xl sm:text-[26px] font-extrabold text-[#07152B] tracking-tight leading-tight pt-1">
                Manage Your Business, Simply.
              </h4>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Unified Work OS and platform for managing employment workflows, team collaboration, and daily operations.
              </p>

              {/* Arrow Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenProductDemo?.("simplekaam")}
                  className="w-10 h-10 rounded-xl bg-[#07152B] hover:bg-[#1668E8] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARD 2: Gurukul Coaching App (Top-Right) */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-[32px] border border-purple-100 p-6 sm:p-8 shadow-[0_4px_25px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 min-h-[340px] sm:min-h-[360px] bg-slate-50">
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
            <div className="relative z-10 max-w-[280px] sm:max-w-[310px] space-y-3">
              {/* Logo & Badge */}
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED] text-white font-black text-xl flex items-center justify-center shadow-md shadow-purple-500/30">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#07152B]">Gurukul Coaching App</h3>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 text-[#7C3AED] text-[10px] font-bold">
                    Coming Soon (Oct 2026)
                  </span>
                </div>
              </div>

              {/* Heading */}
              <h4 className="text-2xl sm:text-[26px] font-extrabold text-[#07152B] tracking-tight leading-tight pt-1">
                Modern Learning for a Brighter Future.
              </h4>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Complete coaching &amp; learning management system for institutions, teachers and students.
              </p>

              {/* Arrow Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenProductDemo?.("gurukul")}
                  className="w-10 h-10 rounded-xl bg-[#07152B] hover:bg-[#7C3AED] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARD 3: MakeGSTBill (Middle-Left) */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-[32px] border border-orange-100 p-6 sm:p-8 shadow-[0_4px_25px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 min-h-[340px] sm:min-h-[360px] bg-slate-50">
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
            <div className="relative z-10 max-w-[280px] sm:max-w-[310px] space-y-3">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 rounded-xl bg-white border border-orange-200 shadow-xs flex items-center gap-0.5">
                  <span className="font-black text-[#EA4335] text-xs">M</span>
                  <span className="font-black text-[#FBBC05] text-xs">G</span>
                  <span className="font-black text-[#4285F4] text-xs">B</span>
                </div>
                <h3 className="text-base font-black text-[#07152B]">MakeGSTBill</h3>
              </div>

              {/* Heading */}
              <h4 className="text-2xl sm:text-[26px] font-extrabold text-[#07152B] tracking-tight leading-tight pt-1">
                GST Billing Made Easy for Everyone.
              </h4>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Simple and powerful GST billing &amp; accounting software for Indian businesses.
              </p>

              {/* Arrow Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenProductDemo?.("makegstbill")}
                  className="w-10 h-10 rounded-xl bg-[#07152B] hover:bg-[#EA4335] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARD 4: GoldenGST (Middle-Right) */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-[32px] border border-amber-200/80 p-6 sm:p-8 shadow-[0_4px_25px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300 min-h-[340px] sm:min-h-[360px] bg-[#FAF3E0] text-[#07152B]">
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
            <div className="relative z-10 max-w-[280px] sm:max-w-[310px] space-y-3">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#601414] text-amber-400 font-black text-lg flex items-center justify-center shadow-md border border-amber-400/40">
                  G
                </div>
                <h3 className="text-base font-black text-[#07152B]">GoldenGST</h3>
              </div>

              {/* Heading */}
              <h4 className="text-2xl sm:text-[26px] font-extrabold text-[#07152B] tracking-tight leading-tight pt-1">
                Advanced GST &amp; Business Suite.
              </h4>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed">
                A complete business suite with advanced accounting, multi-branch management and powerful analytics.
              </p>

              {/* Arrow Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenProductDemo?.("goldengst")}
                  className="w-10 h-10 rounded-xl bg-[#07152B] hover:bg-[#D97706] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* CARD 5: FreeDeskPro (Full-Width Cinematic Bottom Banner) */}
        {/* ========================================================= */}
        <div className="rounded-[36px] bg-[#E8F4FD] text-[#07152B] border border-blue-100 shadow-xl relative overflow-hidden group min-h-[360px] sm:min-h-[400px] flex items-center">
          
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
          <div className="relative z-10 p-8 sm:p-12 lg:p-14 max-w-xl space-y-4">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#06B6D4] text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                P
              </div>
              <div>
                <h3 className="text-xl font-black text-[#07152B] leading-tight">FreeDeskPro</h3>
                <span className="text-xs text-cyan-800 font-mono font-bold">Ultra Low-Latency Engine</span>
              </div>
            </div>

            {/* Main Headline */}
            <h4 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#07152B] tracking-tight leading-[1.12]">
              Secure &amp; Fast <br />
              Remote Access.
            </h4>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              A powerful remote desktop platform for individuals and teams with sub-30ms latency, multi-monitor switching, and bank-grade security.
            </p>

            {/* Action Button */}
            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenProductDemo?.("freedeskpro")}
                className="w-12 h-12 rounded-2xl bg-[#07152B] hover:bg-[#06B6D4] text-white flex items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer border border-slate-700/20"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <span className="text-xs text-slate-700 font-bold">
                Click to test live 60 FPS remote connection
              </span>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
};
