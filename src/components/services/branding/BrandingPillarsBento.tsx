"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Palette,
  Box,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Compass,
  FileCheck,
  Eye,
  Maximize2,
  Monitor,
  Smartphone,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface BentoCard {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  metric: { value: string; label: string };
  colSpan: string;
}

const bentoCards: BentoCard[] = [
  {
    id: "identity",
    badge: "01 // ATOMIC BLUEPRINT",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40",
    title: "Brand Identity & Mathematical Geometry",
    subtitle: "Custom logomarks, proprietary typography & chromatic psychology.",
    description:
      "We design brand identities that cut through market noise. Beyond an icon, we forge mathematical grid systems, custom typography ligatures, and responsive lockups tested across every scale from favicon to giant stadium billboards.",
    image: "/images/services/branding/visual_identity.jpg",
    features: [
      "Vector Logomark, Monogram & System Lockups",
      "Tailored Typography Hierarchies & Kerning Pairs",
      "Accessible Multi-Spectrum Chromatic Palettes",
      "60+ Page Master Brand Bible & Usage Matrix",
    ],
    metric: { value: "+85%", label: "Category Memorability" },
    colSpan: "lg:col-span-7",
  },
  {
    id: "packaging",
    badge: "02 // 3D TACTILE EXPERIENCE",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-950/40",
    title: "3D Packaging & Industrial CGI",
    subtitle: "Turn physical products into irresistible shelf magnets.",
    description:
      "Your packaging is your silent salesperson. We engineer sustainable structural packaging, dielines, and studio-grade 8K Octane renders that eliminate costly physical photoshoots while dramatically lifting marketplace click-through rates.",
    image: "/images/services/branding/luxury_packaging.jpg",
    features: [
      "Precision Production Dielines for Cartons & Bottles",
      "8K Photorealistic 3D Renders & Lighting Studies",
      "Amazon A+ Content & Hero Image Syndication Assets",
      "Unboxing Experience Design with Sensory Detailing",
    ],
    metric: { value: "3.2x", label: "Search Click-Through" },
    colSpan: "lg:col-span-5",
  },
  {
    id: "design-system",
    badge: "03 // LIVING TOKENS",
    badgeColor: "text-indigo-400 border-indigo-500/30 bg-indigo-950/40",
    title: "Omnichannel Living Design Systems",
    subtitle: "Design tokens linked directly from Figma to production code.",
    description:
      "Never lose brand cohesion across departments. We build centralized design systems with hundreds of reusable Figma components, spacing grids, typography styles, and color tokens that keep designers and developers perfectly aligned.",
    image: "/images/services/branding/design_tokens.jpg",
    features: [
      "Figma Tokens Synced to Tailwind & CSS Variables",
      "Cross-Platform UI Component Libraries",
      "Dark / Light Mode Chromatic Mapping",
      "Comprehensive Living Digital Documentation",
    ],
    metric: { value: "-65%", label: "Frontend Handoff Time" },
    colSpan: "lg:col-span-5",
  },
  {
    id: "omnichannel",
    badge: "04 // DIGITAL STOREFRONTS",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40",
    title: "Omnichannel Storefront UX & Motion",
    subtitle: "Sub-second digital storefronts engineered for ruthless conversion.",
    description:
      "We fuse brand aesthetics with headless Next.js speed. Every digital interaction is crafted with smooth micro-animations, effortless navigation, and 1-click checkout flows that maximize average order value (AOV).",
    image: "/images/services/branding/omnichannel_showcase.jpg",
    features: [
      "Mobile-First Responsive Layouts & Micro-Interactions",
      "Native 1-Click Checkout & Multi-Currency Flow",
      "Kinetic 3D Product Viewers & Video Stings",
      "99+ Core Web Vitals & Sub-Second Page Speeds",
    ],
    metric: { value: "+48%", label: "Funnel Conversion Lift" },
    colSpan: "lg:col-span-7",
  },
];

interface BrandingPillarsBentoProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

export const BrandingPillarsBento: React.FC<BrandingPillarsBentoProps> = ({
  onOpenConsultation,
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Perspective Scroll Entrance (10deg -> 0deg, 0.94 -> 1, 50px -> 0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.4, 0.8, 1]);

  return (
    <section
      ref={containerRef}
      id="brand-pillars-bento"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 overflow-hidden border-t border-slate-900/80 [perspective:1400px]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] rounded-full bg-cyan-700/10 blur-[160px]" />
        <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] rounded-full bg-purple-700/10 blur-[160px]" />
      </div>

      <Container size="wide" className="relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-cyan-400 text-xs font-mono font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>FOUR PILLARS OF BRAND GRAVITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12]">
            Engineered for Memorability. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Built for Compounding Scale.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We reject templated graphics. Our senior design studio integrates brand psychology, industrial 3D rendering, and modern web architecture into cohesive systems that dominate your category.
          </p>
        </div>

        {/* Bento Grid with Perspective Scroll Entrance */}
        <motion.div
          style={{
            rotateX,
            scale,
            y: translateY,
            opacity,
            transformStyle: "preserve-3d",
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 will-change-transform"
        >
          {bentoCards.map((card) => {
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`${card.colSpan} relative rounded-3xl bg-slate-950/75 border border-slate-800/80 hover:border-slate-700/90 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 group hover:-translate-y-1`}
              >
                {/* Subtle Glow upon hover */}
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-1"
                />

                <div className="space-y-6">
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider border ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-cyan-400">
                        {card.metric.value}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono uppercase max-w-[80px] leading-tight">
                        {card.metric.label}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium">
                      {card.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Visual Image Preview with Distinct Pillar Micro-Animations */}
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/60 shadow-lg group-hover:border-slate-700 transition-colors">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* MICRO-ANIMATION 1: Brand Identity — Construction Grid Lines */}
                    {card.id === "identity" && (
                      <div className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-500">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#818cf8" strokeWidth="1" strokeDasharray="4 4" />
                          <circle cx="50%" cy="50%" r="22%" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 6" className="animate-spin" style={{ transformOrigin: "50% 50%", animationDuration: "30s" }} />
                        </svg>
                        <div className="absolute top-2 right-2 text-[9px] font-mono text-cyan-400/80 bg-slate-950/70 px-2 py-0.5 rounded">
                          BÉZIER GRID CALIBRATED
                        </div>
                      </div>
                    )}

                    {/* MICRO-ANIMATION 2: Packaging — Wireframe rotates 2-3 degrees */}
                    {card.id === "packaging" && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="w-[70%] h-[70%] border border-dashed border-purple-400/40 rounded-xl transition-transform duration-700 ease-out group-hover:rotate-[2.8deg] group-hover:scale-102 flex items-center justify-center bg-purple-950/10">
                          <span className="text-[10px] font-mono text-purple-300/80 bg-slate-950/80 px-2.5 py-1 rounded-md border border-purple-500/30">
                            OCTANE 8K DIELINE // 2.8° TILT
                          </span>
                        </div>
                      </div>
                    )}

                    {/* MICRO-ANIMATION 3: Living Design System — Tokens connect with thin lines */}
                    {card.id === "design-system" && (
                      <div className="absolute inset-0 pointer-events-none">
                        <svg className="w-full h-full opacity-40 group-hover:opacity-75 transition-opacity" xmlns="http://www.w3.org/2000/svg">
                          <path d="M 40 80 Q 140 30 240 80 T 440 80" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
                          <circle cx="140" cy="55" r="4" fill="#a855f7" />
                          <circle cx="240" cy="80" r="4" fill="#38bdf8" />
                          <circle cx="340" cy="55" r="4" fill="#10b981" />
                        </svg>
                        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-indigo-300 bg-slate-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                          FIGMA TOKENS ⇄ CSS SYNCED
                        </div>
                      </div>
                    )}

                    {/* MICRO-ANIMATION 4: Storefront UX — Small interface frames shift between devices */}
                    {card.id === "omnichannel" && (
                      <div className="absolute bottom-3 right-3 pointer-events-none flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/85 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 transition-transform duration-500 group-hover:-translate-y-1">
                          <Monitor className="w-3 h-3 text-emerald-400" />
                          <span>DESKTOP 99+</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/85 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 transition-transform duration-500 group-hover:translate-x-1">
                          <Smartphone className="w-3 h-3 text-cyan-400" />
                          <span>MOBILE 1.1s</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {card.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-xl bg-slate-900/50 border border-slate-800/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 border-t border-slate-800/70 mt-6 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    PRODUCTION-READY
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenConsultation && onOpenConsultation(`Pillar: ${card.title}`)
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white transition-colors cursor-pointer group/btn"
                  >
                    <span>Commission System</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default BrandingPillarsBento;
