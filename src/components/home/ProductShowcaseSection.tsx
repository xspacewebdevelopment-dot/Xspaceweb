"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Monitor,
  CheckCircle2,
  Heart,
  Leaf,
  TrendingUp,
  Users,
  ShieldCheck,
  Rocket,
  X,
  Crown,
  Play,
  Pause,
  Receipt,
  Zap,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export interface ProductItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  href: string;
  badge?: string | null;
  featured?: boolean;
  accentColor: string;
  cardBgClass: string;
  borderColor: string;
  glowColor: string;
  renderTopIcon: () => React.ReactNode;
  renderPreviewGraphics: () => React.ReactNode;
}

const products: ProductItem[] = [
  {
    id: "goldengst",
    number: "02 / 05",
    name: "GoldenGST",
    tagline: "Advanced GST Billing & Business Management.",
    href: "/products/goldengst",
    accentColor: "#D97706",
    cardBgClass: "bg-gradient-to-b from-[#FFFDF5] via-[#FFFBEB] to-[#FFF9E6] shadow-xl",
    borderColor: "border-amber-200/90",
    glowColor: "shadow-amber-500/15",
    renderTopIcon: () => (
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-2xl bg-[#601414] flex items-center justify-center text-amber-300 font-extrabold text-2xl shadow-md border border-amber-400/40">
          G
        </div>
        <Crown className="w-5 h-5 text-amber-500 fill-amber-400 -mt-5 -ml-3" />
      </div>
    ),
    renderPreviewGraphics: () => (
      <div className="w-full rounded-2xl bg-[#FFFDEE] border border-amber-200/60 p-3.5 flex flex-col justify-between relative space-y-3">
        {/* Top pill right-aligned */}
        <div className="flex justify-end">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-[11px] font-bold border border-emerald-200/60">
            <span>Business Growth</span>
            <TrendingUp className="w-3 h-3 text-emerald-700" />
          </span>
        </div>
        {/* White metric box matching input_file_0.png */}
        <div className="bg-white rounded-xl p-3 shadow-sm border border-amber-100/80 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Monthly Revenue</div>
            <div className="text-sm font-extrabold text-slate-900">₹ 4,82,500</div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-amber-100/90 text-amber-900 text-xs font-black">
            +34%
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "makegstbill",
    number: "01 / 05",
    name: "MakeGSTBill",
    tagline: "Simple GST Billing for Every Business.",
    href: "/products/makegstbill",
    badge: "Featured",
    featured: true,
    accentColor: "#EA4335",
    cardBgClass: "bg-white/98 shadow-[0_30px_70px_rgba(37,99,235,0.25)]",
    borderColor: "border-blue-200/90",
    glowColor: "shadow-blue-500/20",
    renderTopIcon: () => (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#EA4335] via-[#4285F4] to-[#34A853] p-0.5 shadow-md">
        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
          <span className="text-2xl font-black text-[#EA4335] tracking-tighter">M</span>
        </div>
      </div>
    ),
    renderPreviewGraphics: () => (
      <div className="w-full rounded-2xl bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-white border border-blue-100 p-3.5 flex flex-col justify-between relative space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-blue-700 font-bold text-xs">
            <Receipt className="w-4 h-4 text-blue-600" />
            <span>Instant Invoicing</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 text-[10px] font-bold border border-blue-200">
            <span>GST Ready</span>
          </span>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Invoices</div>
            <div className="text-sm font-extrabold text-slate-900">1,240+ Created</div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
            100% Valid
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "freedeskpro",
    number: "03 / 05",
    name: "FreeDeskPro",
    tagline: "Remote Access, Support & Device Management.",
    href: "/products/freedeskpro",
    accentColor: "#2563EB",
    cardBgClass: "bg-gradient-to-b from-blue-50/95 via-sky-50/80 to-white/95 shadow-xl",
    borderColor: "border-blue-200/90",
    glowColor: "shadow-blue-500/15",
    renderTopIcon: () => (
      <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
        <Monitor className="w-6 h-6 stroke-[2]" />
      </div>
    ),
    renderPreviewGraphics: () => (
      <div className="w-full rounded-2xl bg-blue-50/60 border border-blue-100 p-3.5 flex flex-col justify-between relative space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[10px] font-mono text-slate-500 font-bold">Session #842</span>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-800">Desktop Connected</span>
          </div>
          <span className="text-[11px] font-extrabold text-blue-600">60 FPS</span>
        </div>
      </div>
    ),
  },
  {
    id: "modhuralap",
    number: "04 / 05",
    name: "Modhuralap",
    tagline: "Connect. Meet. Create Memories.",
    href: "/products/modhuralap",
    accentColor: "#E11D48",
    cardBgClass: "bg-gradient-to-b from-rose-50/95 via-pink-50/80 to-white/95 shadow-xl",
    borderColor: "border-rose-200/90",
    glowColor: "shadow-rose-500/15",
    renderTopIcon: () => (
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md">
        <Heart className="w-6 h-6 fill-current" />
      </div>
    ),
    renderPreviewGraphics: () => (
      <div className="w-full rounded-2xl bg-rose-50/60 border border-rose-100 p-3.5 flex flex-col justify-between relative space-y-3">
        <div className="flex justify-end">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500/10 text-rose-700 text-[11px] font-bold border border-rose-200">
            <span>Find Your People</span>
          </span>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
              <Users className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-800">Community Circles</span>
          </div>
          <span className="text-xs font-extrabold text-rose-600">12k+ Active</span>
        </div>
      </div>
    ),
  },
  {
    id: "dravanta-nexus",
    number: "05 / 05",
    name: "Dravanta Nexus",
    tagline: "Natural Products for a Healthier Tomorrow.",
    href: "/products/dravanta-nexus",
    accentColor: "#059669",
    cardBgClass: "bg-gradient-to-b from-emerald-50/95 via-teal-50/80 to-white/95 shadow-xl",
    borderColor: "border-emerald-200/90",
    glowColor: "shadow-emerald-500/15",
    renderTopIcon: () => (
      <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-md">
        <Leaf className="w-6 h-6" />
      </div>
    ),
    renderPreviewGraphics: () => (
      <div className="w-full rounded-2xl bg-emerald-50/60 border border-emerald-100 p-3.5 flex flex-col justify-between relative space-y-3">
        <div className="flex items-center gap-1 text-emerald-800 text-[11px] font-bold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Organic & Certified</span>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border border-emerald-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800">Health & Purity Score</span>
          <span className="text-xs font-extrabold text-emerald-600">98 / 100</span>
        </div>
      </div>
    ),
  },
];

export const ProductShowcaseSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0); // GoldenGST default focus
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % products.length);
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <section id="products" className="relative w-full overflow-hidden bg-white text-slate-900 pt-0 pb-20">
      {/* 
        TOP TRANSITION & UNBLURRED BACKGROUND:
        1. Pure white top boundary seamlessly connecting with Who We Are section above.
        2. Soft sky white-to-blue atmospheric gradient behind section header.
        3. Crisp, unblurred sunset mountain background in lower 75% area.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Crisp unblurred mountain background image */}
        <Image
          src="/images/assets/background.png"
          alt="XSPACEWEB Ecosystem Sunset Mountain Background"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Top Seamless Sky Gradient Overlay */}
        <div className="absolute top-0 left-0 right-0 h-[280px] bg-gradient-to-b from-white via-[#F0F5FF]/90 via-40% to-transparent z-10" />

        {/* Soft bottom vignette overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[140px] bg-gradient-to-t from-white via-white/40 to-transparent z-10" />
      </div>

      <Container size="wide" className="relative z-20 pt-10 sm:pt-14">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10 sm:mb-14 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-bold tracking-[0.24em] text-slate-500 uppercase select-none">
              — XSPACEWEB ECOSYSTEM —
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#07152B] leading-[1.14]">
            Powering Ideas for a{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
              Smarter Tomorrow
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed pt-1">
            A growing ecosystem of SaaS products to simplify work, empower businesses and create a better tomorrow.
          </p>
        </div>

        {/* 3D Framer Motion Parallax Card Showcase Container (NO HOVER BLUR) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="relative min-h-[460px] sm:min-h-[500px] flex items-center justify-center my-2"
          style={{ perspective: "1200px" }}
        >
          {/* Floating Left Arrow Navigation */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous Product"
            className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/90"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Floating Right Arrow Navigation */}
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next Product"
            className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/90"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Cards Track with 3D Perspective Transforms */}
          <div className="w-full flex items-center justify-center gap-4 sm:gap-6 px-8 sm:px-12 py-6 overflow-hidden">
            {products.map((item, idx) => {
              const isActive = idx === activeIndex;
              const offset = (idx - activeIndex + products.length) % products.length;
              let adjustedOffset = offset;
              if (offset > products.length / 2) adjustedOffset = offset - products.length;

              // Compute 3D rotations and positions (NO BLUR FILTER)
              const xPos = adjustedOffset * 290;
              const scale = isActive ? 1.05 : 0.88 - Math.abs(adjustedOffset) * 0.04;
              const zIndex = 30 - Math.abs(adjustedOffset) * 5;
              const opacity = isActive ? 1 : 0.82 - Math.abs(adjustedOffset) * 0.12;

              const rotateY = isActive ? -mousePos.x * 16 : adjustedOffset * -12;
              const rotateX = isActive ? mousePos.y * 12 : 0;
              const translateZ = isActive ? 40 : -50;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(idx)}
                  animate={{
                    x: xPos,
                    scale,
                    opacity,
                    rotateY,
                    rotateX,
                    translateZ,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  }}
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  className={`absolute w-[270px] sm:w-[290px] md:w-[310px] rounded-[32px] ${item.cardBgClass} ${item.borderColor} p-6 flex flex-col justify-between cursor-pointer select-none border transition-shadow duration-300 ${
                    isActive ? "shadow-2xl ring-2 ring-blue-500/30" : "shadow-lg"
                  }`}
                >
                  <div className="relative z-10">
                    {/* Top Row: Badge & Number */}
                    <div className="flex items-center justify-between mb-4">
                      {item.badge ? (
                        <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                          {item.badge}
                        </span>
                      ) : (
                        <div />
                      )}
                      <span className="text-[12px] font-bold text-slate-400 tracking-wider font-mono">
                        {item.number}
                      </span>
                    </div>

                    {/* Icon & Name */}
                    <div className="space-y-4 mb-4">
                      <div className="flex items-center gap-3">
                        {item.renderTopIcon()}
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                      {item.renderPreviewGraphics()}
                    </div>

                    {/* Tagline */}
                    <p className="text-[13.5px] text-slate-600 leading-relaxed font-medium mb-4">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Bottom Action Row matching input_file_0.png */}
                  <div className="relative z-10 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(item);
                      }}
                      className="text-sm font-bold text-[#1668E8] hover:text-blue-800 transition-colors flex items-center gap-1 group/btn"
                    >
                      <span>Learn More</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(item);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${
                        isActive
                          ? "bg-[#07152B] text-white hover:bg-blue-600"
                          : "bg-white text-slate-700 hover:bg-blue-600 hover:text-white"
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Controls Bar: Pagination Track & Autoplay Toggle */}
        <div className="flex items-center justify-center gap-4 mt-6 mb-8 relative z-30">
          <div className="flex items-center gap-2">
            {products.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to product slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? "w-8 h-2.5 bg-blue-600 shadow-md"
                    : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            title={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-md flex items-center justify-center border border-slate-200 transition-transform active:scale-95"
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
        </div>

        {/* Center Pill Button: Explore All Products */}
        <div className="flex justify-center mb-12 relative z-30">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#07152B] text-white text-sm font-semibold hover:bg-[#0D2344] transition-all duration-200 shadow-xl border border-white/20 active:scale-[0.98]"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 
          BOTTOM FEATURE PILLARS BAR (input_file_1.png Feedback Fix):
          All icons monochromatic crisp white over dark mountain background.
          All titles and subtitles in high contrast white text for 100% legibility.
        */}
        <div className="w-full pt-8 border-t border-white/25 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center relative z-30">
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/25 flex items-center justify-center flex-shrink-0 backdrop-blur-md shadow-md">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Innovative Solutions</h4>
              <p className="text-xs text-slate-200 font-normal">For real-world businesses</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2">
            <div className="w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/25 flex items-center justify-center flex-shrink-0 backdrop-blur-md shadow-md">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Built for India</h4>
              <p className="text-xs text-slate-200 font-normal">Trusted by thousands</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2">
            <div className="w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/25 flex items-center justify-center flex-shrink-0 backdrop-blur-md shadow-md">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Always Evolving</h4>
              <p className="text-xs text-slate-200 font-normal">New tools & capabilities</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2">
            <div className="w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/25 flex items-center justify-center flex-shrink-0 backdrop-blur-md shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">People First</h4>
              <p className="text-xs text-slate-200 font-normal">Your success drives us</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Product Preview Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 text-slate-900 shadow-2xl space-y-5 border border-slate-100">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              {selectedProduct.renderTopIcon()}
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider font-mono">
                  {selectedProduct.number} SaaS Product
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900">{selectedProduct.name}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {selectedProduct.tagline}
            </p>

            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 space-y-2">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Early Access & Rollout Status</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                This SaaS product is currently in active deployment for enterprise partners. Full self-service registration and live portal onboarding are opening soon.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Close Preview
              </button>
              <a
                href="/contact"
                className="px-6 py-2.5 rounded-full bg-[#07152B] text-white text-sm font-semibold hover:bg-blue-600 transition-colors inline-flex items-center gap-2 shadow-md"
              >
                <span>Request Demo Access</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
