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

          {/* Right Column: Ecosystem World Map Image & 20+ Countries Banner */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] flex items-center justify-center">
              <Image
                src="/glob.png"
                alt="XSPACEWEB Global Ecosystem"
                fill
                className="object-contain object-center select-none"
                priority
              />

              {/* Floating Global Proof Pill Badge */}
              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/90 shadow-xl shadow-blue-900/10 flex items-center gap-2.5">
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
