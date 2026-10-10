"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Compass,
  Layers,
  Rocket,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Shield,
  Box,
  Palette,
  Play,
  Pause,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface TrajectorySlide {
  id: string;
  stageNumber: string;
  stageBadge: string;
  stageName: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
  metrics: {
    stat: string;
    label: string;
  }[];
  accentColor: string;
  gradient: string;
  borderGlow: string;
  nebulaColor: string;
}

const slides: TrajectorySlide[] = [
  {
    id: "stage-build",
    stageNumber: "01",
    stageBadge: "STAGE 01 // FOUNDATION & IDENTITY",
    stageName: "BUILD",
    title: "Atomic Brand Architecture & Typographic Science",
    tagline: "Every iconic brand starts with mathematical geometric precision.",
    description:
      "We strip away generic templates to forge proprietary logomarks, tailored typographic hierarchies, and chromatic systems calibrated for emotional resonance and memorability across physical and digital mediums.",
    image: "/images/services/branding/visual_identity.jpg",
    imageAlt: "Aura Studio Brand Identity Book and Stationery Mockup",
    features: [
      "Proprietary Vector Logomarks, Monograms & Responsive Lockups",
      "Mathematical Kerning, Custom Display Fonts & Editorial Hierarchies",
      "Accessible Multi-Spectrum Chromatic Palettes (RGB, CMYK, Pantone)",
      "Comprehensive 60+ Page Master Brand Blueprint & Usage Matrix",
    ],
    metrics: [
      { stat: "+85%", label: "Category Recall & Memorability" },
      { stat: "100%", label: "Trademark IP Copyright Protection" },
    ],
    accentColor: "#38bdf8",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    borderGlow: "rgba(56,189,248,0.35)",
    nebulaColor: "radial-gradient(circle, rgba(56,189,248,0.28) 0%, rgba(14,165,233,0.12) 40%, transparent 70%)",
  },
  {
    id: "stage-scale",
    stageNumber: "02",
    stageBadge: "STAGE 02 // MULTI-SYSTEM DOCKING",
    stageName: "SCALE",
    title: "Photorealistic 3D Packaging & Living Design Systems",
    tagline: "Unifying tactile physical presence with scalable digital tokens.",
    description:
      "As your product line expands, fragmentation kills momentum. We engineer studio-grade 3D product renders, sustainable dielines, and 400+ Figma design tokens that keep every team and vendor in absolute visual sync.",
    image: "/images/services/branding/luxury_packaging.jpg",
    imageAlt: "Luxury Minimalist 3D Packaging and Fragrance Bottle Render",
    features: [
      "Precision Dielines for Cartons, Bottles, Pouches & Luxury Mailers",
      "8K Octane 3D Product Visualizations with Real Materials Physics",
      "Living Design Tokens Synced Directly to Code Repositories",
      "Automated Asset Generators for Amazon A+ & Retail Catalogs",
    ],
    metrics: [
      { stat: "3.2x", label: "Marketplace Search Click-Through Rate" },
      { stat: "-65%", label: "Time-to-Market for New SKUs" },
    ],
    accentColor: "#818cf8",
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    borderGlow: "rgba(129,140,248,0.35)",
    nebulaColor: "radial-gradient(circle, rgba(129,140,248,0.28) 0%, rgba(99,102,241,0.14) 40%, transparent 70%)",
  },
  {
    id: "stage-launch",
    stageNumber: "03",
    stageBadge: "STAGE 03 // ORBITAL VELOCITY",
    stageName: "LAUNCH",
    title: "Omnichannel Storefronts & High-Velocity Market Trajectory",
    tagline: "Dominating customer touchpoints with relentless conversion clarity.",
    description:
      "When the rocket enters orbit, speed and precision define category leaders. We design sub-second headless digital storefronts, kinetic motion graphics, and cohesive customer touchpoints that turn first-time visitors into brand evangelists.",
    image: "/images/services/branding/omnichannel_showcase.jpg",
    imageAlt: "Omnichannel Luxury Digital Brand Storefront Ecosystem",
    features: [
      "Sub-Second Headless Next.js Storefront UX Architecture",
      "1-Click Native Frictionless Checkout Choreography",
      "Full-Funnel Motion Graphics, CGI Stings & Editorial Video Hooks",
      "Global Brand Registry Governance & Multi-Marketplace Sync",
    ],
    metrics: [
      { stat: "+240%", label: "Average Brand Equity Valuation Lift" },
      { stat: "4.8x", label: "Paid Campaign Return on Ad Spend" },
    ],
    accentColor: "#c084fc",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    borderGlow: "rgba(192,132,252,0.35)",
    nebulaColor: "radial-gradient(circle, rgba(192,132,252,0.25) 0%, rgba(244,244,245,0.12) 35%, transparent 70%)",
  },
];

interface BrandTrajectoryCarouselProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

export const BrandTrajectoryCarousel: React.FC<BrandTrajectoryCarouselProps> = ({
  onOpenConsultation,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const currentSlide = slides[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex]);

  // 3D perspective mouse tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="brand-trajectory-carousel"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 overflow-hidden border-t border-slate-900/80"
    >
      {/* Background Ambience with Subtly Shifting Nebula */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[190px] opacity-25 transition-all duration-1000 ease-out"
          style={{
            background: currentSlide.nebulaColor,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(56,189,248,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.7) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <Container size="wide" className="relative z-10 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-cyan-400 text-xs font-mono font-bold shadow-sm">
              <Rocket className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE THREE STAGES OF BRAND GRAVITY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Scale, Build &amp; Launch: <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                The Architectural Trajectory.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              An enterprise brand is forged from mathematical blueprints, assembled into a living design system, and launched with market-dominating category velocity.
            </p>
          </div>

          {/* Controls & Nav */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isAutoPlaying ? "Pause Autoplay" : "Enable Autoplay"}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            VISUAL STAGE RAIL (01 BUILD → 02 SCALE → 03 LAUNCH)
            With smoothly traveling indicator line and active glow
            ========================================================= */}
        <div className="w-full relative py-2">
          <div className="relative flex items-center justify-between max-w-4xl mx-auto px-4">
            {/* Background Base Rail Line */}
            <div className="absolute top-1/2 left-8 right-8 h-[2px] -translate-y-1/2 bg-slate-800/80 -z-0" />

            {/* Traveling Illuminated Indicator Line */}
            <div
              className="absolute top-1/2 left-8 h-[2px] -translate-y-1/2 transition-all duration-500 ease-out -z-0"
              style={{
                width: `${(activeIndex / (slides.length - 1)) * 100}%`,
                maxWidth: "calc(100% - 64px)",
                background: `linear-gradient(90deg, #38bdf8, ${currentSlide.accentColor})`,
                boxShadow: `0 0 10px ${currentSlide.accentColor}`,
              }}
            />

            {/* Stage Rail Buttons */}
            {slides.map((s, idx) => {
              const isActive = idx === activeIndex;
              const isPassed = idx <= activeIndex;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="group relative z-10 flex flex-col items-center gap-2 cursor-pointer outline-none focus:outline-none"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border ${
                      isActive
                        ? "bg-slate-900 text-white shadow-lg scale-110"
                        : isPassed
                        ? "bg-slate-950 text-cyan-300 border-cyan-500/50"
                        : "bg-slate-950 text-slate-500 border-slate-800 hover:border-slate-700 hover:text-slate-300"
                    }`}
                    style={
                      isActive
                        ? {
                            borderColor: s.accentColor,
                            boxShadow: `0 0 20px ${s.borderGlow}`,
                            color: s.accentColor,
                          }
                        : undefined
                    }
                  >
                    <span>{s.stageNumber}</span>
                  </div>

                  <span
                    className={`text-xs font-mono tracking-wider transition-colors duration-300 uppercase ${
                      isActive
                        ? "text-white font-extrabold"
                        : isPassed
                        ? "text-slate-300"
                        : "text-slate-500 group-hover:text-slate-400"
                    }`}
                  >
                    {s.stageName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Tilted Interactive Slide Container */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-3xl bg-[#07112b]/85 border border-blue-900/60 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_20px_50px_rgba(2,8,23,0.85)] transition-all duration-300"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Subtle Outer Neon Border Glow */}
          <div
            className="absolute -inset-0.5 rounded-3xl opacity-30 pointer-events-none -z-1 transition-colors duration-700"
            style={{
              background: `radial-gradient(circle at top right, ${currentSlide.accentColor} 0%, transparent 60%)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider border shadow-sm"
                    style={{
                      borderColor: `${currentSlide.accentColor}40`,
                      color: currentSlide.accentColor,
                      backgroundColor: `${currentSlide.accentColor}15`,
                    }}
                  >
                    {currentSlide.stageBadge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {currentSlide.title}
                </h3>

                <p className="text-sm font-medium text-slate-300">
                  {currentSlide.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {currentSlide.description}
              </p>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-1">
                {currentSlide.features.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/70"
                  >
                    <CheckCircle2
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: currentSlide.accentColor }}
                    />
                    <span className="text-xs sm:text-sm text-slate-200 font-medium leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {currentSlide.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800"
                  >
                    <div
                      className="text-2xl sm:text-3xl font-black tracking-tight"
                      style={{ color: currentSlide.accentColor }}
                    >
                      {m.stat}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 font-medium">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onOpenConsultation &&
                    onOpenConsultation(`Trajectory Stage: ${currentSlide.stageName}`)
                  }
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-slate-950 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  style={{
                    backgroundColor: currentSlide.accentColor,
                    boxShadow: `0 0 25px ${currentSlide.borderGlow}`,
                  }}
                >
                  <span>Commission {currentSlide.stageName} Architecture</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Visual Image Showcase with Glassmorphism Framing */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800/90 bg-slate-900/70 p-2 shadow-2xl group">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-slate-950">
                  <Image
                    src={currentSlide.image}
                    alt={currentSlide.imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Subtle inner shadow & lighting vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Image Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-slate-950/85 border border-slate-800/80 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: currentSlide.accentColor }}
                    />
                    <span className="text-[11px] font-mono text-slate-300 uppercase">
                      ACTIVE SPRINT ARTIFACT: {currentSlide.stageName}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    STAGE {currentSlide.stageNumber} OF 03
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrandTrajectoryCarousel;
