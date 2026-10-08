"use client";

import React from "react";
import { Sparkles, ArrowRight, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface BrandCaseStudy {
  id: string;
  client: string;
  industry: string;
  badge: string;
  badgeColor: string;
  headline: string;
  challenge: string;
  solution: string;
  metrics: { value: string; label: string }[];
}

const studies: BrandCaseStudy[] = [
  {
    id: "velvet-luxe",
    client: "Velvet Luxe Apparel",
    industry: "Luxury Direct-to-Consumer Fashion",
    badge: "FASHION & APPAREL",
    badgeColor: "border-purple-500/40 text-purple-300 bg-purple-950/40",
    headline: "Scaling a D2C Fashion Label from ₹20L to ₹1.8Cr Monthly GMV with Headless Next.js & Rebranding",
    challenge:
      "Struggling with a 72% mobile checkout drop-off rate, high customer acquisition costs (CAC) on Meta Ads, and brand fragmentation across Flipkart and Amazon.",
    solution:
      "Engineered a high-speed headless Next.js storefront with 1-click UPI checkout, unified visual branding system across marketplaces, and automated inventory sync.",
    metrics: [
      { value: "9x", label: "Monthly Revenue Growth" },
      { value: "4.8x", label: "Blended Return on Ad Spend" },
      { value: "1.2s", label: "Average Page Load Time" },
    ],
  },
  {
    id: "apex-electronics",
    client: "Apex Audio & Tech",
    industry: "Consumer Electronics & Audio",
    badge: "ELECTRONICS & TECH",
    badgeColor: "border-cyan-500/40 text-cyan-300 bg-cyan-950/40",
    headline: "Dominating Amazon FBA & Quick Commerce with 3D CGI Visuals and Algorithmic Repricing",
    challenge:
      "Frequent loss of Buy Box to unauthorized undercutters, poor search listing conversion, and high Return-to-Origin (RTO) rates on cash-on-delivery orders.",
    solution:
      "Deployed automated Buy Box protection webhooks with 450ms latency, enriched listings with photorealistic 3D product CGI renders, and integrated regional 3PL routing.",
    metrics: [
      { value: "99.8%", label: "Buy Box Retention Rate" },
      { value: "₹42M+", label: "Q4 Peak Season GMV" },
      { value: "-28%", label: "RTO Logistics Reduction" },
    ],
  },
  {
    id: "nectar-organics",
    client: "Nectar Botanical Living",
    industry: "Organic Wellness & Personal Care",
    badge: "WELLNESS & D2C",
    badgeColor: "border-emerald-500/40 text-emerald-300 bg-emerald-950/40",
    headline: "Doubling Average Order Value (AOV) Through Sustainable 3D Packaging & Custom Bundling UX",
    challenge:
      "Low repeat customer rate and commoditized market perception against legacy FMCG giants with multi-million dollar ad budgets.",
    solution:
      "Complete brand reinvention with bespoke sustainable packaging dielines, subscription checkout architecture, and automated cross-sell bundles.",
    metrics: [
      { value: "+114%", label: "Average Order Value Lift" },
      { value: "62%", label: "Repeat Purchase Rate" },
      { value: "140K+", label: "Active D2C Subscribers" },
    ],
  },
];

interface BrandingCaseStudiesSectionProps {
  onOpenConsultation?: () => void;
}

export const BrandingCaseStudiesSection: React.FC<BrandingCaseStudiesSectionProps> = ({
  onOpenConsultation,
}) => {
  return (
    <section
      id="brand-case-studies"
      className="relative w-full bg-[#020412] text-white py-20 sm:py-28 overflow-hidden border-t border-slate-900/90"
    >
      {/* Background Cosmic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/3 w-[700px] h-[700px] rounded-full bg-blue-700/10 blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full bg-purple-700/10 blur-[150px]" />
      </div>

      <Container size="wide" className="relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-400 text-xs font-mono font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROVEN ENTERPRISE IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            Transforming Stores into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              High-Velocity Commerce Engines.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real outcomes from real brands. Explore how our end-to-end design and engineering architecture unlocks explosive multi-channel growth.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {studies.map((study) => (
            <div
              key={study.id}
              className="relative rounded-3xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl group"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${study.badgeColor}`}
                  >
                    {study.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{study.client}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
                  {study.headline}
                </h3>

                <div className="space-y-3 text-xs text-slate-300 leading-relaxed border-t border-slate-900 pt-4">
                  <div>
                    <span className="font-bold text-slate-400 block mb-0.5">THE CHALLENGE:</span>
                    <p className="text-slate-400">{study.challenge}</p>
                  </div>
                  <div>
                    <span className="font-bold text-cyan-400 block mb-0.5">OUR ARCHITECTURE:</span>
                    <p className="text-slate-300">{study.solution}</p>
                  </div>
                </div>
              </div>

              {/* Metrics Bar */}
              <div className="pt-6 border-t border-slate-900 mt-6 grid grid-cols-3 gap-2 text-center">
                {study.metrics.map((m, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-lg sm:text-xl font-extrabold text-cyan-400">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium leading-tight">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onOpenConsultation}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>Discuss Your Brand’s Growth Blueprint</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </Container>
    </section>
  );
};
