"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BlurText from "@/components/ui/BlurText";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Monitor,
  Heart,
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
  Send,
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
    id: "makegstbill",
    number: "01 / 04",
    name: "MakeGSTBill",
    tagline: "Simple GST Billing for Every Business.",
    href: "/products/makegstbill",
    badge: "Featured",
    featured: true,
    accentColor: "#EA4335",
    cardBgClass: "bg-white/98 backdrop-blur-md shadow-2xl",
    borderColor: "border-white",
    glowColor: "shadow-blue-500/20",
    renderTopIcon: () => (
      <div className="w-13 h-13 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center p-2">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path d="M4 19V7.5L12 13.5L20 7.5V19" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7.5L12 13.5L20 7.5" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 19V10" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 19V10" stroke="#FBBC05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    renderPreviewGraphics: () => (
      <div className="w-full h-[115px] rounded-2xl bg-gradient-to-br from-blue-50/70 via-sky-50/40 to-white/90 border border-blue-100/80 p-3 flex items-center justify-between relative shadow-inner">
        {/* 3D Frosted Document Card with M logo */}
        <div className="w-13 h-13 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center p-2 flex-shrink-0">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M4 19V7.5L12 13.5L20 7.5V19" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 7.5L12 13.5L20 7.5" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 19V10" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 19V10" stroke="#FBBC05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Floating 3D Badge "GST Invoice Sent!" with Paper Plane */}
        <div className="px-2.5 py-1.5 rounded-xl bg-white shadow-xl border border-slate-100 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-sm">
            <Send className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-extrabold text-slate-800 leading-tight">GST Invoice</div>
            <div className="text-[9px] font-bold text-blue-600 leading-tight">Sent!</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "goldengst",
    number: "02 / 04",
    name: "GoldenGST",
    tagline: "Advanced GST Billing & Business Management.",
    href: "/products/goldengst",
    accentColor: "#D97706",
    cardBgClass: "bg-white/95 backdrop-blur-md shadow-xl",
    borderColor: "border-white/80",
    glowColor: "shadow-amber-500/15",
    renderTopIcon: () => (
      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#731818] to-[#450A0A] flex items-center justify-center text-amber-300 font-black text-2xl shadow-lg border border-amber-400/40">
        G
      </div>
    ),
    renderPreviewGraphics: () => (
      <div className="w-full h-[115px] rounded-2xl bg-gradient-to-br from-amber-50/70 via-orange-50/40 to-white/90 border border-amber-100/80 p-3 flex items-center justify-between relative shadow-inner">
        {/* Dark Red/Gold "G" Tile */}
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#731818] to-[#450A0A] flex items-center justify-center text-amber-300 font-black text-2xl shadow-lg border border-amber-400/40 flex-shrink-0">
          G
        </div>

        {/* 3D Bar Chart Card "Business Growth" */}
        <div className="px-3 py-2 rounded-xl bg-white shadow-xl border border-slate-100 flex flex-col justify-between h-13 w-28">
          <div className="flex items-center justify-between text-[9px] font-bold text-slate-500">
            <span>Business Growth</span>
            <span className="text-emerald-500 font-extrabold">↗</span>
          </div>
          {/* 4 Growing Orange Bars */}
          <div className="flex items-end gap-1.5 justify-between px-1 h-4">
            <div className="w-2 h-1.5 rounded-t-sm bg-orange-300" />
            <div className="w-2 h-2.5 rounded-t-sm bg-orange-400" />
            <div className="w-2 h-3.5 rounded-t-sm bg-orange-500" />
            <div className="w-2 h-4.5 rounded-t-sm bg-orange-600" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "freedeskpro",
    number: "03 / 04",
    name: "FreeDeskPro",
    tagline: "Remote Access, Support & Device Management.",
    href: "/products/freedeskpro",
    accentColor: "#2563EB",
    cardBgClass: "bg-white/95 backdrop-blur-md shadow-xl",
    borderColor: "border-white/80",
    glowColor: "shadow-blue-500/15",
    renderTopIcon: () => (
      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
        <Monitor className="w-6 h-6 stroke-[2.2]" />
      </div>
    ),
    renderPreviewGraphics: () => (
      <div className="w-full h-[115px] rounded-2xl bg-gradient-to-br from-blue-50/70 via-sky-50/40 to-white/90 border border-blue-100/80 p-3 flex items-center justify-between relative shadow-inner">
        {/* Vibrant Blue Monitor Tile */}
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 flex-shrink-0">
          <Monitor className="w-6 h-6 stroke-[2.2]" />
        </div>

        {/* 3D Window Preview Mockup */}
        <div className="px-3 py-2 rounded-xl bg-white shadow-xl border border-slate-100 flex flex-col justify-between h-13 w-28">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center justify-between">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-blue-600">60 FPS</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "modhuralap",
    number: "04 / 04",
    name: "Modhuralap",
    tagline: "Connect. Meet. Create Memories.",
    href: "/products/modhuralap",
    accentColor: "#E11D48",
    cardBgClass: "bg-white/95 backdrop-blur-md shadow-xl",
    borderColor: "border-white/80",
    glowColor: "shadow-rose-500/15",
    renderTopIcon: () => (
      <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/25">
        <Heart className="w-6 h-6 fill-current" />
      </div>
    ),
    renderPreviewGraphics: () => (
      <div className="w-full h-[115px] rounded-2xl bg-gradient-to-br from-rose-50/70 via-pink-50/40 to-white/90 border border-rose-100/80 p-3 flex items-center justify-between relative shadow-inner">
        {/* Pink/Rose Heart Tile */}
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 flex-shrink-0">
          <Heart className="w-6 h-6 fill-white" />
        </div>

        {/* "Find Your People" card with avatars */}
        <div className="px-2.5 py-1.5 rounded-xl bg-white shadow-xl border border-slate-100 flex flex-col justify-between h-13 w-28">
          <span className="text-[8.5px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-full text-center">
            Find Your People
          </span>
          <div className="flex items-center justify-center -space-x-1.5">
            <div className="w-4 h-4 rounded-full bg-amber-400 border border-white" />
            <div className="w-4 h-4 rounded-full bg-blue-400 border border-white" />
            <div className="w-4 h-4 rounded-full bg-emerald-400 border border-white" />
            <span className="text-[8px] font-bold text-slate-500 pl-1">12k+</span>
          </div>
        </div>
      </div>
    ),
  },
];

export const ProductShowcaseSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0); // MakeGSTBill (01 / 04) default active
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const scrollToCard = (index: number) => {
    if (window.innerWidth < 1024 && cardRefs.current[index]) {
      cardRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const goToNext = () => {
    const nextIndex = (activeIndex + 1) % products.length;
    setActiveIndex(nextIndex);
    scrollToCard(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (activeIndex - 1 + products.length) % products.length;
    setActiveIndex(prevIndex);
    scrollToCard(prevIndex);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      goToNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex]);

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
          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.14] flex flex-wrap items-center justify-center gap-x-[0.3em]">
            <BlurText
              text="Powering Ideas for a"
              delay={100}
              animateBy="words"
              direction="top"
              stepDuration={0.4}
              className="text-[#07152B] justify-center"
              as="h2"
            />
            <BlurText
              text="Smarter Tomorrow"
              delay={100}
              animateBy="words"
              direction="top"
              stepDuration={0.4}
              className="text-[#1668E8] justify-center"
              as="span"
            />
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed pt-1">
            A growing ecosystem of SaaS products to simplify work, empower businesses and create a better tomorrow.
          </p>
        </div>

        {/* 4 Products Showcase Track */}
        <div className="relative w-full my-4">
          {/* Floating Left Arrow Navigation */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous Product"
            className="hidden sm:flex absolute -left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-xl items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/90"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Floating Right Arrow Navigation */}
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next Product"
            className="hidden sm:flex absolute -right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-xl items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/90"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* All 4 Cards in One Row (Grid on Desktop, Smooth Snap Scroll on Mobile) */}
          <div
            ref={scrollRef}
            className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none py-6 px-2 sm:px-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((item, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    setActiveIndex(idx);
                    scrollToCard(idx);
                  }}
                  className={`relative w-[280px] sm:w-[310px] lg:w-full flex-shrink-0 snap-center rounded-[32px] p-6 flex flex-col justify-between cursor-pointer select-none border transition-all duration-300 ${
                    isActive
                      ? "bg-white shadow-[0_22px_50px_-10px_rgba(22,104,232,0.22)] ring-2 ring-[#1668E8] -translate-y-2 z-20"
                      : "bg-white/92 backdrop-blur-md shadow-lg border-white/80 hover:shadow-xl hover:-translate-y-1 hover:bg-white z-10 opacity-90 hover:opacity-100"
                  }`}
                >
                  <div className="relative z-10">
                    {/* Top Row: Badge / Crown & Number */}
                    <div className="flex items-center justify-between mb-4 h-6">
                      {item.badge ? (
                        <span className="px-3 py-0.5 rounded-full bg-[#EBF3FE] text-[#1668E8] text-[11px] font-bold tracking-tight border border-blue-200/60 shadow-sm">
                          {item.badge}
                        </span>
                      ) : item.id === "goldengst" ? (
                        <Crown className="w-5 h-5 text-amber-500 fill-amber-400" />
                      ) : (
                        <div />
                      )}
                      <span className="text-[12px] font-bold text-slate-400 tracking-wider font-mono">
                        {item.number}
                      </span>
                    </div>

                    {/* 3D Preview Graphics Area (Upper Card) */}
                    <div className="mb-5 flex items-center justify-center">
                      {item.renderPreviewGraphics()}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight tracking-tight mb-1.5">
                      {item.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-4">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Bottom Action Row matching Reference Design */}
                  <div className="relative z-10 pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(item);
                      }}
                      className="text-left group/btn focus:outline-none"
                    >
                      <span className="text-sm font-bold text-slate-800 group-hover/btn:text-[#1668E8] transition-colors">
                        Learn More
                      </span>
                      {isActive && (
                        <div className="w-12 h-[2.5px] bg-[#1668E8] mt-1 rounded-full" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(item);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${
                        isActive
                          ? "bg-[#07152B] text-white hover:bg-[#1668E8] shadow-slate-900/20"
                          : "bg-white text-slate-700 hover:bg-[#1668E8] hover:text-white border border-slate-100"
                      }`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls Bar: Pagination Track & Autoplay Toggle */}
        <div className="flex items-center justify-center gap-4 mt-4 mb-8 relative z-30">
          <div className="flex items-center gap-2">
            {products.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  scrollToCard(idx);
                }}
                aria-label={`Go to product slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? "w-8 h-2.5 bg-[#1668E8] shadow-md"
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
