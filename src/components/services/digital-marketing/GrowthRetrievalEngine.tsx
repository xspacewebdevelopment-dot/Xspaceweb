"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { 
  ArrowRight, 
  Filter
} from "lucide-react";

interface GrowthBlueprint {
  id: string;
  category: string;
  name: string;
  summary: string;
  budgetRatio: { channel: string; pct: number; color: string }[];
  milestones: { phase: string; timing: string; action: string }[];
  projectedKpis: { label: string; metric: string; context: string }[];
  techStack: string[];
}

const BLUEPRINTS: GrowthBlueprint[] = [
  {
    id: "b2b-saas",
    category: "B2B & High-Value Services",
    name: "Pipeline & Demo Velocity",
    summary:
      "Capturing enterprise decision-makers via high-intent search queries and hyper-targeted LinkedIn account lists, funneling qualified leads directly into sales CRM pipelines.",
    budgetRatio: [
      { channel: "Google Search (High-Intent B2B)", pct: 45, color: "#2563eb" },
      { channel: "LinkedIn Account Targeting", pct: 30, color: "#0284c7" },
      { channel: "Technical Content & Schema SEO", pct: 15, color: "#10b981" },
      { channel: "CRO & Lead Form Optimization", pct: 10, color: "#f59e0b" },
    ],
    milestones: [
      { phase: "Phase 1: Signal Instrumentation", timing: "Days 1–14", action: "Server-side GTM, Hubspot/CRM two-way closed-loop attribution, and account-list enrichment." },
      { phase: "Phase 2: Intent Interception", timing: "Days 15–45", action: "Launch exact-match phrase clusters and competitor conquesting campaigns with negative filters." },
      { phase: "Phase 3: Pipeline Acceleration", timing: "Days 46–90", action: "Scale budget into winning cohorts, reduce cost per demo by 35%, and deploy retargeting sequences." },
    ],
    projectedKpis: [
      { label: "Cost Per Qualified Demo", metric: "-38%", context: "Decreased across 60 days" },
      { label: "MQL to SQL Conversion Rate", metric: "32.4%", context: "Qualified pipeline velocity" },
      { label: "Closed-Won ROAS", metric: "5.2x", context: "Full-cycle pipeline return" },
    ],
    techStack: ["Google Ads", "LinkedIn Campaign Manager", "HubSpot CRM", "Semrush", "GA4 BigQuery"],
  },
  {
    id: "ecommerce-dtc",
    category: "E-Commerce & Retail DTC",
    name: "Omnichannel ROAS & LTV Scale",
    summary:
      "Combining Meta dynamic creative testing with Google Performance Max and automated email retention sequences to maximize first-order margin and 90-day repeat purchase rate.",
    budgetRatio: [
      { channel: "Meta Dynamic Creative (Scale)", pct: 40, color: "#a855f7" },
      { channel: "Google Shopping & PMax", pct: 35, color: "#2563eb" },
      { channel: "Retention & Lifecycle Email", pct: 15, color: "#ec4899" },
      { channel: "Checkout CRO & AOV Bundles", pct: 10, color: "#10b981" },
    ],
    milestones: [
      { phase: "Phase 1: Catalog & Pixel Audit", timing: "Days 1–10", action: "Clean Merchant Center product feed, set up Meta CAPI with 9.2+ Event Match Quality." },
      { phase: "Phase 2: Creative Testing Sprints", timing: "Days 11–35", action: "Deploy 20+ UGC hooks, product feature spotlights, and discount angle tests per week." },
      { phase: "Phase 3: Omnichannel Scale", timing: "Days 36–90", action: "Scale spend to 5x daily budget while maintaining minimum 3.8x blended MER (Marketing Efficiency Ratio)." },
    ],
    projectedKpis: [
      { label: "Blended Return On Ad Spend", metric: "4.6x", context: "Sustainable scaling floor" },
      { label: "Average Order Value (AOV)", metric: "+24%", context: "Through bundle test engines" },
      { label: "Repeat Purchase Rate (60d)", metric: "36.8%", context: "Automated retention flows" },
    ],
    techStack: ["Shopify Plus", "Meta Ads Manager", "Google Merchant Center", "Klaviyo", "Triple Whale"],
  },
  {
    id: "enterprise-seo",
    category: "Organic Authority & Entity Search",
    name: "AI-Era Semantic Search Dominance",
    summary:
      "Future-proofing organic visibility against AI search overviews by building dense topical authority, structured entity relationships, and ultra-fast Core Web Vitals performance.",
    budgetRatio: [
      { channel: "Programmatic Topical Clusters", pct: 40, color: "#10b981" },
      { channel: "Core Web Vitals & Next.js Architecture", pct: 30, color: "#2563eb" },
      { channel: "Digital PR & High-Authority Links", pct: 20, color: "#0284c7" },
      { channel: "Schema & Knowledge Graph Entity", pct: 10, color: "#8b5cf6" },
    ],
    milestones: [
      { phase: "Phase 1: Architecture & Technical Sweep", timing: "Days 1–20", action: "Resolve indexation bloat, render budget bottlenecks, and implement JSON-LD Schema markup." },
      { phase: "Phase 2: Semantic Hub Launch", timing: "Days 21–60", action: "Publish 40+ comprehensive authoritative pillar pages with internal contextual link maps." },
      { phase: "Phase 3: Domain Authority Moat", timing: "Days 61–120", action: "Secure placements on top tier publications and dominate AI search citations." },
    ],
    projectedKpis: [
      { label: "Organic Inbound Sessions", metric: "+380%", context: "Target compound growth" },
      { label: "Page 1 Keyword Holdings", metric: "2,400+", context: "High-intent commercial terms" },
      { label: "Organic Customer CAC", metric: "₹0", context: "Zero marginal ad spend" },
    ],
    techStack: ["Ahrefs", "Google Search Console", "Screaming Frog", "Schema App", "Vercel Analytics"],
  },
];

interface GrowthRetrievalEngineProps {
  onOpenConsultation?: () => void;
}

export const GrowthRetrievalEngine: React.FC<GrowthRetrievalEngineProps> = ({ onOpenConsultation }) => {
  const [selectedId, setSelectedId] = useState("b2b-saas");
  const selectedBlueprint = BLUEPRINTS.find((b) => b.id === selectedId) || BLUEPRINTS[0];

  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion || !isDesktop ? [0, 0] : [22, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion || !isDesktop ? [1, 1] : [0.88, 1]
  );
  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion || !isDesktop ? [0, 0] : [80, 0]
  );

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-28 bg-white border-y border-slate-200/60 relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Pre-Tool Callout Heading (Container Scroll Reference) */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#1668E8] text-xs font-semibold tracking-wide uppercase mb-3">
            <Filter className="w-3.5 h-3.5" />
            <span>Mathematical Precision</span>
          </div>
          <h2
            className="text-[34px] md:text-[46px] font-medium tracking-tight text-[#0a1b33] leading-[1.1]"
            style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
          >
            Every growth plan starts
            <br />
            with a different equation.
          </h2>
          <p
            className="mt-3 text-[15px] md:text-[16px] text-[#64748b] leading-relaxed"
            style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
          >
            Select your primary business model below to retrieve the exact channel allocation, milestone roadmap, and target performance KPIs engineered for your growth stage.
          </p>
        </div>

        {/* 3D Container Scroll Entrance Wrapper */}
        <div style={{ perspective: "1000px" }}>
          <motion.div
            style={{
              rotateX,
              scale,
              y: translateY,
              transformStyle: "preserve-3d",
            }}
            className="w-full"
          >
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              {/* Blueprint Selector Tabs */}
              <div className="flex flex-wrap gap-2.5 p-1.5 bg-[#f8fafc] border border-slate-200/80 rounded-2xl w-max max-w-full overflow-x-auto">
                {BLUEPRINTS.map((bp) => {
                  const isSelected = bp.id === selectedId;
                  return (
                    <button
                      key={bp.id}
                      type="button"
                      onClick={() => setSelectedId(bp.id)}
                      className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? "bg-white text-[#0a1b33] shadow-sm border border-slate-200/80"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {bp.name}
                    </button>
                  );
                })}
              </div>

              {/* Quick Consultation Trigger */}
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0a1b33] hover:bg-[#071324] text-white text-xs font-semibold tracking-wide transition-all shadow-sm shrink-0 cursor-pointer"
              >
                <span>Request Bespoke Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dynamic Retrieved Architecture Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBlueprint.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Left Blueprint Overview & Channel Allocation (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6 p-7 md:p-8 rounded-3xl bg-[#f9fafb] border border-slate-200/80">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {selectedBlueprint.category}
                    </span>
                    <h3
                      className="text-[22px] md:text-[26px] font-semibold text-[#0a1b33] mt-1"
                      style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
                    >
                      {selectedBlueprint.name}
                    </h3>
                    <p className="text-[13.5px] text-[#64748b] mt-3 leading-relaxed">
                      {selectedBlueprint.summary}
                    </p>
                  </div>

                  {/* Recommended Budget Allocation Breakdown */}
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Optimal Budget & Effort Ratio
                    </h4>
                    <div className="flex flex-col gap-2.5">
                      {selectedBlueprint.budgetRatio.map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-slate-700">{item.channel}</span>
                            <span className="font-bold text-[#0a1b33]">{item.pct}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-200/70 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified Tools Deployed */}
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                      Integrated Toolchain
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedBlueprint.techStack.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-[11px] font-medium text-slate-600 shadow-2xs"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Blueprint: Milestones & KPIs (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Target KPI Impact Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {selectedBlueprint.projectedKpis.map((kpi, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex flex-col justify-between"
                      >
                        <span className="text-[12px] font-medium text-slate-500">
                          {kpi.label}
                        </span>
                        <div className="mt-2">
                          <span
                            className="text-[28px] font-bold tracking-tight text-[#0a1b33]"
                            style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
                          >
                            {kpi.metric}
                          </span>
                          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                            {kpi.context}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 3-Phase Execution Roadmap */}
                  <div className="p-7 md:p-8 rounded-3xl bg-white border border-slate-200/70 shadow-sm flex flex-col gap-5">
                    <h4
                      className="text-[18px] font-semibold text-[#0a1b33]"
                      style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
                    >
                      90-Day Deployment Execution Roadmap
                    </h4>

                    <div className="flex flex-col gap-4">
                      {selectedBlueprint.milestones.map((ms, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-[#f9fafb] border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-200 transition-colors"
                        >
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1668E8] text-[11px] font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <span className="text-xs font-semibold text-slate-900">
                                {ms.phase}
                              </span>
                            </div>
                            <p className="text-[13px] text-slate-600 mt-1 pl-7 leading-relaxed">
                              {ms.action}
                            </p>
                          </div>
                          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 shrink-0 self-start sm:self-center ml-7 sm:ml-0">
                            {ms.timing}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
