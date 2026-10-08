"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Palette,
  Box,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Eye,
  Sliders,
  FileCheck,
  Shield,
  Zap,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface BrandPillar {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  metrics: { value: string; label: string };
  gradient: string;
  accentColor: string;
}

const brandPillars: BrandPillar[] = [
  {
    id: "identity",
    tabLabel: "01 // Brand Identity",
    badge: "FOUNDATIONAL CORE",
    title: "Distinctive Visual Architecture & Brand Identity",
    subtitle: "From memorable insignia to comprehensive brand guidelines.",
    description:
      "A great brand commands premium pricing. We craft high-recall logos, curated typography pairings, chromatic systems, and verbal brand books engineered for instant recognition across mobile screens, billboards, and product unboxing.",
    features: [
      "Vector Logomark, Monogram & Responsive Lockups",
      "Tailored Typography Hierarchies & Editorial Styling",
      "Accessible Multi-Spectrum Color Tokens (RGB, CMYK, Pantone)",
      "Comprehensive 60+ Page Brand Identity Architecture Guide",
    ],
    metrics: { value: "+85%", label: "Brand Recall & Category Memorability" },
    gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
    accentColor: "#a855f7",
  },
  {
    id: "packaging",
    tabLabel: "02 // 3D Packaging",
    badge: "TACTILE EXPERIENCE",
    title: "High-Converting Packaging & Photorealistic 3D Renders",
    subtitle: "Packaging that stands out on the shelf and dominates marketplace search results.",
    description:
      "Your physical packaging is your final marketing touchpoint. We engineer sustainable structural packaging, dielines, and studio-grade 3D renders that eliminate costly studio photoshoots and drastically increase click-through rates.",
    features: [
      "Precision Dielines for Cartons, Pouches, Bottles & Mailers",
      "360° Photorealistic 3D Product Mockups & Animations",
      "Amazon A+ Content & Hero Image Syndication Assets",
      "Unboxing Experience Design with QR Review Prompts",
    ],
    metrics: { value: "3.2x", label: "Marketplace Search Click-Through Rate" },
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentColor: "#38bdf8",
  },
  {
    id: "storefront",
    tabLabel: "03 // Omnichannel UI",
    badge: "HIGH-CONVERTING UX",
    title: "Headless D2C Storefronts & Omnichannel UI Systems",
    subtitle: "Bespoke digital storefronts engineered for sub-second mobile checkouts.",
    description:
      "We design and build bespoke headless storefronts on Next.js and Shopify Plus. Every interface element is calibrated for frictionless 1-click UPI payments, rapid catalog navigation, and ruthless checkout conversion.",
    features: [
      "Mobile-First Component Libraries & Design Tokens in Figma",
      "Instant 1-Click Native UPI & Global Multi-Currency Checkout",
      "Algorithmic Product Recommendations & Dynamic Upsells",
      "Sub-Second Core Web Vitals & 99+ Performance Scoring",
    ],
    metrics: { value: "48%", label: "Average Checkout Funnel Conversion Lift" },
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    accentColor: "#60a5fa",
  },
  {
    id: "creative",
    tabLabel: "04 // Visual Production",
    badge: "CONVERSION ASSETS",
    title: "Full-Funnel Advertising Creatives & 3D Visuals",
    subtitle: "Thumb-stopping social ads, CGI motion graphics, and editorial content.",
    description:
      "Static ads don't scale. Our studio produces high-velocity motion graphics, 3D CGI product renders, and lifestyle video hooks designed to lower customer acquisition costs (CAC) across Meta, Google, and Amazon DSP campaigns.",
    features: [
      "High-Velocity UGC & Editorial Video Ad Variations",
      "CGI 3D Product Exploders & Kinetic Motion Loops",
      "Flipkart & Amazon Brand Story Banner Ecosystems",
      "Continuous Creative Refresh Testing for Scale",
    ],
    metrics: { value: "4.6x", label: "Blended Return on Ad Spend (ROAS)" },
    gradient: "from-fuchsia-500/20 via-purple-500/10 to-transparent",
    accentColor: "#e879f9",
  },
];

interface BrandingCreativeSectionProps {
  onOpenConsultation?: () => void;
}

export const BrandingCreativeSection: React.FC<BrandingCreativeSectionProps> = ({
  onOpenConsultation,
}) => {
  const [activePillarId, setActivePillarId] = useState<string>(brandPillars[0].id);
  const currentPillar =
    brandPillars.find((p) => p.id === activePillarId) || brandPillars[0];

  return (
    <section
      id="brand-creative-systems"
      className="relative w-full bg-[#020412] text-white py-20 sm:py-28 overflow-hidden border-t border-slate-900/90"
    >
      {/* Background Cosmic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] rounded-full bg-purple-700/10 blur-[150px]" />
        <div className="absolute bottom-1/4 left-10 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(56,189,248,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.7) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      <Container size="wide" className="relative z-10 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-purple-400 text-xs font-mono font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>BRAND ARCHITECTURE &amp; CREATIVE SYSTEMS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            Build an Iconic Brand That <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Dominates Every Touchpoint.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From zero to category leadership. We merge brand psychology with technical
            eCommerce architecture to create cohesive identities that captivate customers and scale effortlessly.
          </p>
        </div>

        {/* Interactive Tab Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 max-w-4xl mx-auto rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl">
          {brandPillars.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarId(pillar.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                }`}
              >
                {pillar.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Dynamic Pillar Card */}
        <div className="relative rounded-3xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-2xl p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">
          {/* Subtle Pillar Atmosphere Glow */}
          <div
            className={`absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-40 bg-gradient-to-br ${currentPillar.gradient}`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span
                  className="text-xs font-mono font-bold tracking-widest uppercase block"
                  style={{ color: currentPillar.accentColor }}
                >
                  {currentPillar.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {currentPillar.title}
                </h3>
                <p className="text-sm font-medium text-slate-300">
                  {currentPillar.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {currentPillar.description}
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentPillar.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/70"
                  >
                    <CheckCircle2
                      className="w-4 h-4 flex-shrink-0 mt-0.5"
                      style={{ color: currentPillar.accentColor }}
                    />
                    <span className="text-xs text-slate-200 font-medium leading-tight">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <span>Build Your Brand Blueprint</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Metric Card / Visual Spotlight */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-purple-950/40 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                    PROVEN OUTCOME METRIC
                  </div>
                  <div
                    className="text-4xl sm:text-5xl font-extrabold tracking-tight"
                    style={{ color: currentPillar.accentColor }}
                  >
                    {currentPillar.metrics.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200">
                    {currentPillar.metrics.label}
                  </div>
                </div>

                <div className="h-[1px] w-full bg-slate-800/80" />

                {/* Micro Guarantee Badges */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>100% Trademark IP &amp; Brand Copyright Ownership</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Synchronized with Amazon Brand Registry &amp; Flipkart QC</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-300">
                    <FileCheck className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>Complete Figma Production Files &amp; Print-Ready Dielines</span>
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
