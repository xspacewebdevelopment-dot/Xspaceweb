"use client";

import React from "react";
import { Compass, Lightbulb, Code2, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface ProcessPhase {
  number: string;
  stageName: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
  icon: React.ReactNode;
  gradient: string;
  accent: string;
}

const phases: ProcessPhase[] = [
  {
    number: "01",
    stageName: "STAGE 01 // AUDIT & POSITIONING",
    title: "Brand Architecture & Category Positioning",
    description:
      "Deep-dive competitive audit, SKU margin breakdown, target customer psychographics, and category white-space mapping to establish an untouchable value proposition.",
    deliverables: [
      "Competitive Landscape & SKU Profitability Matrix",
      "Customer Persona Demographics & Purchase Triggers",
      "Multi-Channel Pricing Strategy & Channel Rules",
    ],
    duration: "Week 1",
    icon: <Compass className="w-6 h-6 text-cyan-400" />,
    gradient: "from-cyan-500/20 to-transparent",
    accent: "#38bdf8",
  },
  {
    number: "02",
    stageName: "STAGE 02 // VISUAL IDENTITY & UX",
    title: "Brand Identity, 3D Assets & Headless UI",
    description:
      "Crafting the visual identity, logomarks, color science, photorealistic 3D product packaging, and high-converting Figma component systems for sub-second checkouts.",
    deliverables: [
      "60+ Page Brand Book & Vector Design Tokens",
      "3D Product Packaging Dielines & Unboxing Renders",
      "Figma Prototype for Next.js Headless Storefront",
    ],
    duration: "Weeks 2 – 3",
    icon: <Lightbulb className="w-6 h-6 text-purple-400" />,
    gradient: "from-purple-500/20 to-transparent",
    accent: "#c084fc",
  },
  {
    number: "03",
    stageName: "STAGE 03 // SYNDICATION & INTEGRATION",
    title: "Omnichannel API Mesh & Marketplace Launch",
    description:
      "Hooking up live inventory synchronization across Amazon SP-API, Flipkart v3, Meesho, AJIO, and Shopify Plus with automated inventory locking and 3PL logistics routing.",
    deliverables: [
      "Unified Multi-Channel Inventory Lock Webhooks",
      "Amazon Brand Registry & A+ Content Live Publishing",
      "Regional 3PL Warehouse Routing & RTO Automation",
    ],
    duration: "Weeks 4 – 5",
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    gradient: "from-blue-500/20 to-transparent",
    accent: "#60a5fa",
  },
  {
    number: "04",
    stageName: "STAGE 04 // AUTOMATION & VELOCITY",
    title: "Algorithmic Growth Engine & Scale",
    description:
      "Deploying 24/7 Buy Box repricing algorithms, programmatic sponsored ad campaigns, and real-time sales telemetry to compound GMV across every marketplace.",
    deliverables: [
      "Algorithmic Dynamic Repricing Engine",
      "Full-Funnel Sponsored Ads & DSP Campaign Architecture",
      "Executive Real-Time GMV & Margin Telemetry Dashboard",
    ],
    duration: "Ongoing Scale",
    icon: <Rocket className="w-6 h-6 text-emerald-400" />,
    gradient: "from-emerald-500/20 to-transparent",
    accent: "#34d399",
  },
];

interface BrandingProcessSectionProps {
  onOpenConsultation?: () => void;
}

export const BrandingProcessSection: React.FC<BrandingProcessSectionProps> = ({
  onOpenConsultation,
}) => {
  return (
    <section
      id="brand-process"
      className="relative w-full bg-[#020412] text-white py-20 sm:py-28 overflow-hidden border-t border-slate-900/90"
    >
      {/* Background Cosmic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-purple-900/10 blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[150px]" />
      </div>

      <Container size="wide" className="relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-purple-400 text-xs font-mono font-bold shadow-sm">
            <span>THE 4-STAGE ARCHITECTURAL ROADMAP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            From Strategic Blueprint to <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Omnichannel Market Domination.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Our structured, sprint-based deployment framework ensures zero operational downtime, seamless marketplace compliance, and accelerated speed-to-market.
          </p>
        </div>

        {/* Process Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className="relative rounded-3xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group overflow-hidden"
            >
              {/* Subtle Ambient Back-Glow */}
              <div
                className={`absolute -top-16 -right-16 w-32 h-32 rounded-full blur-2xl opacity-30 bg-gradient-to-br ${phase.gradient} pointer-events-none`}
              />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm">
                    {phase.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {phase.duration}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span
                    className="text-[10px] font-mono font-bold tracking-widest uppercase block"
                    style={{ color: phase.accent }}
                  >
                    {phase.stageName}
                  </span>
                  <h3 className="text-lg font-extrabold text-white tracking-tight leading-snug">
                    {phase.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {phase.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2 pt-3 border-t border-slate-900">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                    KEY DELIVERABLES:
                  </span>
                  {phase.deliverables.map((d, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                      <CheckCircle2
                        className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                        style={{ color: phase.accent }}
                      />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
