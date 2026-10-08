"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  MapPin,
  Search,
  CheckCircle2,
  TrendingUp,
  PhoneCall,
  Navigation,
  Star,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Layers,
  Activity,
  Award,
  Zap,
} from "lucide-react";

interface GmbThreeStagesSectionProps {
  onOpenConsultation?: (service?: string) => void;
}

const STAGES = [
  {
    id: "01",
    label: "Stage 01",
    tag: "THE FOUNDATION",
    title: "What is Google Business Profile & Why It Dominates Local Sales",
    description:
      "When nearby customers need a service or store, 84% turn directly to Google Maps. Google's Local 3-Pack captures over 70% of high-intent clicks before users even see traditional websites. If your business isn't in those top 3 map pins, your competitors are claiming your local market share.",
    badge: "High-Intent Discovery",
    stat: "76% Visit Within 24h",
    statSub: "of smartphone searchers visit a local business within a day",
    takeaways: [
      {
        icon: Search,
        title: "46% of All Google Searches Have Local Intent",
        desc: "Nearly half of the world's 8.5 billion daily searches are looking for products and services nearby.",
      },
      {
        icon: MapPin,
        title: "Google Maps 3-Pack Command",
        desc: "Position 1, 2, and 3 on the map receive 5x more inquiries than organic website rankings below.",
      },
      {
        icon: TrendingUp,
        title: "28% Immediate Purchase Rate",
        desc: "Local searchers are ready to buy—over a quarter convert into paying customers on the same day.",
      },
    ],
    dashboardFocus: {
      headline: "Local Search Grid Dominance",
      sub: "Ranking #1 across target zip codes in Google Maps",
      metric: "Rank #1",
      metricLabel: "Google Maps 3-Pack",
      detail: "Capturing 74% of nearby commercial search queries",
    },
  },
  {
    id: "02",
    label: "Stage 02",
    tag: "THE EXECUTION",
    title: "How XSPACEWEB Optimizes & Engineers Your Profile for #1",
    description:
      "We don't just fill in basic business hours. We deploy our battle-tested, 360-degree local ranking architecture that signals undisputed geographic authority and trust to Google's ranking algorithms.",
    badge: "Algorithmic Authority",
    stat: "+348% Profile Views",
    statSub: "average boost in total local map impressions within 60 days",
    takeaways: [
      {
        icon: ShieldCheck,
        title: "NAP & Schema Synchronization",
        desc: "100% exact Name, Address, and Phone verification synced across 50+ tier-1 business directories.",
      },
      {
        icon: Layers,
        title: "Geo-Tagged Media & 360° Imagery",
        desc: "High-resolution photos embedded with precise GPS metadata to prove active, authentic on-site operations.",
      },
      {
        icon: Zap,
        title: "Category & High-Value Keyword Indexing",
        desc: "Primary category precision plus secondary high-intent services Google indexes for semantic search.",
      },
      {
        icon: Star,
        title: "Review Acceleration Engine",
        desc: "Automated review generation workflows, QR cards, and AI response protocols to climb review velocity.",
      },
    ],
    dashboardFocus: {
      headline: "Real-Time Algorithmic Health",
      sub: "Optimized categories, geotagged assets & verified schema",
      metric: "4.9 Stars",
      metricLabel: "412 Verified Reviews",
      detail: "100% profile completeness score with Google verified badge",
    },
  },
  {
    id: "03",
    label: "Stage 03",
    tag: "THE REVENUE",
    title: "Measurable Phone Calls, Driving Directions & Revenue Growth",
    description:
      "We track what matters to your bottom line. Every phone call, direction request, and website click is measured and attributed, so you know exactly how many new customers your Google profile generates every single week.",
    badge: "Verified Attribution",
    stat: "2,100+ Monthly Calls",
    statSub: "direct inbound phone calls from ready-to-buy local searchers",
    takeaways: [
      {
        icon: PhoneCall,
        title: "Direct Call Volume Tracking",
        desc: "Track every inbound call originating from your Google Maps listing with timestamps and duration.",
      },
      {
        icon: Navigation,
        title: "Customer Direction Heatmaps",
        desc: "Analyze exactly which neighborhoods and zip codes your customers are traveling from to reach you.",
      },
      {
        icon: Activity,
        title: "15-Mile Geo-Grid Rank Monitoring",
        desc: "Weekly ranking scans showing your map pin position #1 across hundreds of coordinate checkpoints.",
      },
      {
        icon: Award,
        title: "Transparent ROI & Lead Reporting",
        desc: "Straightforward monthly reporting showing exactly how your GMB profile translates into closed revenue.",
      },
    ],
    dashboardFocus: {
      headline: "Direct Inbound Conversion Log",
      sub: "2.1K phone calls · 1.4K direction requests · 5.8K clicks",
      metric: "+1,348%",
      metricLabel: "30-Day Growth",
      detail: "Consistent inbound lead flow without paying for expensive ads",
    },
  },
];

export const GmbThreeStagesSection: React.FC<GmbThreeStagesSectionProps> = ({
  onOpenConsultation,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll spy to update active stage when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      stageRefs.current.forEach((el, idx) => {
        if (!el) return;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveStageIndex(idx);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeStage = STAGES[activeStageIndex];

  return (
    <section
      id="gmb-three-stages"
      className="relative w-full pt-28 sm:pt-36 lg:pt-44 pb-20 sm:pb-28 bg-[#f8fafc] text-[#0A1128]"
    >
      {/* Background Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold text-[#1668E8] tracking-widest uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE 3-STAGE LOCAL BLUEPRINT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152B] tracking-tight leading-[1.1]">
            How XSPACEWEB Scales Your <br className="hidden sm:inline" />
            Google Business Profile.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            From establishing foundational map trust to dominating every neighborhood coordinate, here is our 3-stage methodology for turn-key local market leadership.
          </p>

          {/* Quick Stage Tabs Navigation */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {STAGES.map((s, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setActiveStageIndex(idx);
                    stageRefs.current[idx]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#1668E8] text-white shadow-md shadow-blue-500/25 scale-102"
                      : "bg-white text-slate-600 hover:text-[#0A1128] hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  <span className="font-mono text-xs opacity-80">{s.id}</span>
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SPLIT SCREEN: 3 STAGES SCROLLABLE (LEFT) + STICKY GMB DASHBOARD (RIGHT)
            ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* =========================================================
              LEFT COLUMN: 3 INTERACTIVE STAGE STORYBOARDS
              ========================================================= */}
          <div className="lg:col-span-6 space-y-20 sm:space-y-28">
            {STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                ref={(el) => {
                  stageRefs.current[idx] = el;
                }}
                className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
                  idx === activeStageIndex
                    ? "bg-white border-blue-200 shadow-[0_16px_40px_-12px_rgba(22,104,232,0.12)] ring-1 ring-blue-500/10"
                    : "bg-white/80 border-slate-200/80 shadow-xs hover:border-slate-300"
                }`}
              >
                {/* Stage Header Pill */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
                    <span className="text-[#1668E8]">STAGE {stage.id}</span>
                    <span>·</span>
                    <span className="text-slate-500">{stage.tag}</span>
                  </div>

                  <span className="text-xs font-bold text-[#1668E8] bg-blue-50 px-2.5 py-1 rounded-md">
                    {stage.badge}
                  </span>
                </div>

                {/* Stage Main Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07152B] tracking-tight leading-snug">
                  {stage.title}
                </h3>

                {/* Stage Body Copy */}
                <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {stage.description}
                </p>

                {/* Stat Highlight Card */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-blue-50/40 border border-blue-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#1668E8] block leading-tight">
                      {stage.stat}
                    </span>
                    <span className="text-xs text-slate-600 font-medium">
                      {stage.statSub}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#1668E8] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

                {/* 3-4 Key Takeaway Cards */}
                <div className="mt-7 space-y-3.5">
                  {stage.takeaways.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start gap-3.5 hover:bg-white hover:border-slate-200 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#1668E8] flex items-center justify-center shrink-0 mt-0.5">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#0A1128]">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenConsultation?.(
                        `GMB Inquiry on ${stage.title}`
                      )
                    }
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1668E8] hover:text-[#1255C0] transition-colors cursor-pointer"
                  >
                    <span>Implement This Stage For My Business</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs text-slate-400 font-mono">
                    Step {stage.id} of 03
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* =========================================================
              RIGHT COLUMN: STICKY GOOGLE BUSINESS PROFILE DASHBOARD
              ========================================================= */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative rounded-3xl border border-slate-200/90 bg-white p-3 sm:p-5 shadow-[0_20px_60px_-15px_rgba(7,21,43,0.12)] backdrop-blur-2xl">
              {/* Top Dashboard Control Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-[#07152B] tracking-tight">
                    XSPACEWEB GMB Command Center
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {STAGES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setActiveStageIndex(idx);
                        stageRefs.current[idx]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                        idx === activeStageIndex
                          ? "bg-[#1668E8] text-white shadow-xs"
                          : "bg-slate-100 text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {s.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* The Dashboard Mockup Image Display */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
                <Image
                  src="/images/services/gmb-dashboard.jpg"
                  alt="Google My Business Local SEO Dashboard"
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Active Focus Overlay Pill */}
                <div className="absolute inset-x-3 bottom-3 p-3 rounded-xl bg-white/95 border border-white/90 shadow-lg backdrop-blur-md flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1668E8] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#07152B]">
                        {activeStage.dashboardFocus.headline}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {activeStage.dashboardFocus.sub}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-extrabold text-[#1668E8] block">
                      {activeStage.dashboardFocus.metric}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {activeStage.dashboardFocus.metricLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Stage Insight Summary Banner */}
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50/30 border border-slate-100">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#1668E8] uppercase tracking-wider block">
                      Active Stage {activeStage.id} Focus
                    </span>
                    <h4 className="text-sm font-bold text-[#07152B] mt-0.5">
                      {activeStage.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {activeStage.dashboardFocus.detail}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenConsultation?.("Google Business Profile Audit")
                    }
                    className="px-4 py-2 rounded-xl bg-[#07152B] hover:bg-[#1668E8] text-white text-xs font-semibold shadow-sm transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Audit Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
