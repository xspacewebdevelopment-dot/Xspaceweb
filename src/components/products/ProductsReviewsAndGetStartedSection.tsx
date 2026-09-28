"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import {
  ArrowLeft,
  ArrowRight,
  Globe2,
  GraduationCap,
  Sparkles,
  Quote,
} from "lucide-react";

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "review-1",
    quote:
      "MakeGSTBill has simplified our invoicing and GST compliance. It's exactly what Indian businesses need.",
    author: "Rahul Mehta",
    role: "Founder, Mehta Solutions",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: "review-2",
    quote:
      "Gurukul Coaching App made online classes so easy for our institution. Students and parents love it.",
    author: "Priya Sharma",
    role: "Director, BrightFuture Academy",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: "review-3",
    quote:
      "FreeDeskPro is incredibly fast and secure. Our IT support has never been this efficient.",
    author: "Arjun Nair",
    role: "IT Head, CloudStack",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: "review-4",
    quote:
      "GoldenGST's multi-branch reporting and automated e-way bill generation saved us over 20 hours every week.",
    author: "Vikram Malhotra",
    role: "CFO, Apex LogiTech",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80",
  },
];

export const ProductsReviewsAndGetStartedSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  // Get 3 visible reviews
  const visibleReviews = [
    TESTIMONIALS[startIndex % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 2) % TESTIMONIALS.length],
  ];

  return (
    <section className="w-full bg-[#FAFCFF] py-16 sm:py-20 text-slate-900 border-t border-slate-100 overflow-hidden">
      <Container size="wide">
        
        {/* ========================================================= */}
        {/* PART 1: WHAT OUR USERS SAY / TESTIMONIALS CAROUSEL */}
        {/* ========================================================= */}
        <div className="mb-20 sm:mb-24">
          
          {/* Header Row with Eyebrow & Navigation Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#1668E8] text-xs font-bold uppercase tracking-wider select-none">
                <span className="w-2 h-2 rounded-full bg-[#1668E8]" />
                <span>WHAT OUR USERS SAY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#07152B] tracking-tight">
                Trusted by Teams. Loved for Simplicity.
              </h2>
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Reviews"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-400 hover:text-[#1668E8] text-slate-600 shadow-xs flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Reviews"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-blue-400 hover:text-[#1668E8] text-slate-600 shadow-xs flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3 Testimonials Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleReviews.map((item, idx) => (
                <motion.div
                  key={`${item.id}-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[28px] bg-white border border-slate-200/80 p-6 sm:p-7 shadow-[0_4px_20px_rgba(7,21,43,0.04)] hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    {/* Blue Quote Icon Bubble */}
                    <div className="w-10 h-10 rounded-2xl bg-[#EBF3FE] text-[#1668E8] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <Quote className="w-5 h-5 fill-current" />
                    </div>

                    {/* Quote Text */}
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Author Avatar & Info */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                    <div className="w-11 h-11 rounded-full ring-2 ring-blue-100 overflow-hidden relative shadow-xs flex-shrink-0">
                      <Image
                        src={item.avatar}
                        alt={item.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[#07152B] leading-tight">
                        {item.author}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>

        {/* ========================================================= */}
        {/* PART 2: READY TO GET STARTED / WORLD MAP CTA */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Action Buttons (5.5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#1668E8] text-xs font-bold uppercase tracking-wider select-none">
              <span className="w-2 h-2 rounded-full bg-[#1668E8]" />
              <span>READY TO GET STARTED?</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#07152B] tracking-tight leading-[1.12]">
              Explore the XSPACEWEB <br />
              <span className="text-[#1668E8]">Ecosystem.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-md">
              Powering businesses, education and remote work with simple, scalable and intelligent software.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1668E8] hover:bg-[#1255C0] text-white text-sm sm:text-base font-bold transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-105 active:scale-95 group"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#1668E8] border-2 border-[#1668E8] text-sm sm:text-base font-bold transition-all duration-200 shadow-xs hover:shadow hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <span>Explore All Products</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Dotted World Map Graphic with Pinned Product Badges (6.5 cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl bg-white/60 border border-slate-100 p-4 flex items-center justify-center overflow-hidden">
              
              {/* Dotted Global Continents SVG Matrix */}
              <svg className="w-full h-full opacity-70" viewBox="0 0 760 380" fill="none">
                <defs>
                  <pattern id="worldDotGrid" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#BFDBFE" />
                  </pattern>
                </defs>

                {/* Continents approximated with dotted arrays matching screenshot */}
                <g fill="#93C5FD" opacity="0.6">
                  {/* North America */}
                  <ellipse cx="180" cy="110" rx="90" ry="50" fill="url(#worldDotGrid)" />
                  <ellipse cx="130" cy="150" rx="50" ry="30" fill="url(#worldDotGrid)" />
                  
                  {/* South America */}
                  <ellipse cx="230" cy="240" rx="45" ry="70" fill="url(#worldDotGrid)" />
                  
                  {/* Europe */}
                  <ellipse cx="380" cy="90" rx="60" ry="35" fill="url(#worldDotGrid)" />
                  
                  {/* Africa */}
                  <ellipse cx="390" cy="200" rx="60" ry="65" fill="url(#worldDotGrid)" />
                  
                  {/* Asia / India */}
                  <ellipse cx="530" cy="120" rx="100" ry="55" fill="url(#worldDotGrid)" />
                  <circle cx="500" cy="170" r="30" fill="url(#worldDotGrid)" />
                  
                  {/* Australia */}
                  <ellipse cx="620" cy="260" rx="45" ry="35" fill="url(#worldDotGrid)" />
                </g>

                {/* Curved connecting data transmission rays */}
                <path d="M190,140 Q350,60 480,110" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" fill="none" />
                <path d="M480,110 Q560,180 620,200" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" fill="none" />
                <path d="M380,110 Q420,230 460,260" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" fill="none" />
              </svg>

              {/* Pinned Product Badge 1: SimpleKaam (S) in North America */}
              <div className="absolute top-[38%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-20 group">
                <div className="w-10 h-10 rounded-xl bg-[#1668E8] text-white font-black text-lg flex items-center justify-center shadow-lg shadow-blue-500/30 ring-4 ring-white animate-bounce duration-1000">
                  S
                </div>
              </div>

              {/* Pinned Product Badge 2: Gurukul in Europe */}
              <div className="absolute top-[26%] left-[47%] -translate-x-1/2 -translate-y-1/2 z-20 group">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center shadow-lg shadow-purple-500/30 ring-4 ring-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>

              {/* Pinned Product Badge 3: MakeGSTBill in Asia */}
              <div className="absolute top-[28%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20 group">
                <div className="px-2 py-1.5 rounded-xl bg-white border border-slate-200 shadow-lg ring-4 ring-white flex items-center gap-0.5">
                  <span className="font-black text-[#EA4335] text-xs">M</span>
                  <span className="font-black text-[#FBBC05] text-xs">G</span>
                  <span className="font-black text-[#4285F4] text-xs">B</span>
                </div>
              </div>

              {/* Pinned Product Badge 4: GoldenGST (G) in Africa */}
              <div className="absolute top-[64%] left-[49%] -translate-x-1/2 -translate-y-1/2 z-20 group">
                <div className="w-9 h-9 rounded-xl bg-[#601414] text-amber-300 font-extrabold text-base flex items-center justify-center shadow-lg border border-amber-400/40 ring-4 ring-white">
                  G
                </div>
              </div>

              {/* Pinned Product Badge 5: FreeDeskPro (P) in East Asia */}
              <div className="absolute top-[52%] left-[88%] -translate-x-1/2 -translate-y-1/2 z-20 group">
                <div className="w-10 h-10 rounded-xl bg-[#06B6D4] text-white font-black text-lg flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-4 ring-white">
                  P
                </div>
              </div>

              {/* Floating Global Proof Pill Badge */}
              <div className="absolute bottom-4 right-4 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-[#1668E8] flex items-center justify-center flex-shrink-0">
                  <Globe2 className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-[#07152B]">
                    Used in 20+ countries
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    and growing rapidly
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </Container>
    </section>
  );
};
