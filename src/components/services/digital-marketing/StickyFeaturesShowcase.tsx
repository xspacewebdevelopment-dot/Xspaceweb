"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Sparkles,
  Zap,
  ArrowRight
} from "lucide-react";

interface Feature {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  metrics: { label: string; value: string; trend?: string }[];
  accentColor: string;
  badgeBg: string;
}

const FEATURES: Feature[] = [
  {
    id: "search-ppc",
    tag: "High-Intent Acquisition",
    title: "Algorithmic PPC & Google Ads",
    subtitle: "Precision bidding architecture targeting buyer intent at the exact micro-moment.",
    description:
      "We replace bloated ad spend with rigorous negative keyword scrubbing, smart bidding calibrations, and hyper-targeted search and shopping funnels engineered for maximum return.",
    deliverables: [
      "Target ROAS & Smart Bidding calibration",
      "Dynamic search ad architecture & responsive copy",
      "Negative keyword exclusion algorithms",
      "Landing page intent alignment & quality score lift"
    ],
    metrics: [
      { label: "Target ROAS", value: "4.8x", trend: "+42% vs baseline" },
      { label: "Cost Per Acquisition", value: "-34%", trend: "Reduced in 60 days" },
      { label: "Ad Quality Score", value: "9.6/10", trend: "Top 5% across sector" }
    ],
    accentColor: "#2563eb",
    badgeBg: "rgba(37, 99, 235, 0.08)",
  },
  {
    id: "technical-seo",
    tag: "Organic Search Authority",
    title: "Technical SEO & Semantic Graphs",
    subtitle: "Dominating search engine results pages and AI citation engines organically.",
    description:
      "Modern search requires structured data hierarchies, rapid Core Web Vitals, and semantic topic clusters that establish irreversible topical authority for high-value keywords.",
    deliverables: [
      "Core Web Vitals & technical crawl optimization",
      "Topic cluster & programmatic content architectures",
      "Entity-based schema markup for AI search engines",
      "High-authority editorial backlink acquisition"
    ],
    metrics: [
      { label: "Organic Growth", value: "+310%", trend: "Year-over-year lift" },
      { label: "Top 3 Rankings", value: "1,240+", trend: "High-intent queries" },
      { label: "Domain Authority", value: "68/100", trend: "Authoritative profile" }
    ],
    accentColor: "#0284c7",
    badgeBg: "rgba(2, 132, 199, 0.08)",
  },
  {
    id: "paid-social",
    tag: "Audience Synthesis",
    title: "Performance Social & Creative Engines",
    subtitle: "High-velocity creative iteration across Meta, LinkedIn, and YouTube.",
    description:
      "We combine narrative-driven creative production with algorithmic lookalike audience testing. Our creative engine tests dozens of visual hooks and angles weekly.",
    deliverables: [
      "Direct-response video reel & asset production",
      "Algorithmic dynamic creative testing (DCT)",
      "B2B LinkedIn decision-maker account targeting",
      "Cohort retargeting & lifetime value expansion"
    ],
    metrics: [
      { label: "Creative Testing Pace", value: "24/mo", trend: "Hooks tested weekly" },
      { label: "Click-Through Rate", value: "3.4%", trend: "2.1x industry average" },
      { label: "Cohort Retention", value: "48%", trend: "Month-3 re-orders" }
    ],
    accentColor: "#a855f7",
    badgeBg: "rgba(168, 85, 247, 0.08)",
  },
  {
    id: "cro-funnel",
    tag: "Funnel Engineering",
    title: "Conversion Rate Optimization (CRO)",
    subtitle: "Turning every visitor click into qualified revenue through scientific testing.",
    description:
      "Traffic is only half the equation. We use behavioral heatmapping, user session replays, and multivariate experimentation to remove checkout friction and maximize revenue per session.",
    deliverables: [
      "Full-funnel drop-off diagnostics & heatmaps",
      "Multivariate headline & value proposition testing",
      "Mobile checkout friction elimination",
      "Dynamic social proof & urgency calibration"
    ],
    metrics: [
      { label: "Conversion Lift", value: "+46%", trend: "Average cross-funnel" },
      { label: "Cart Abandonment", value: "-22%", trend: "After checkout re-design" },
      { label: "Revenue / Visitor", value: "₹280", trend: "+55% yield increase" }
    ],
    accentColor: "#eab308",
    badgeBg: "rgba(234, 179, 8, 0.08)",
  },
  {
    id: "analytics-telemetry",
    tag: "Attribution Modeling",
    title: "Full-Funnel Telemetry & Analytics",
    subtitle: "Eliminating guesswork with server-side tracking and true attribution models.",
    description:
      "Cookie depreciation broke traditional tracking. We build server-side GTM, Conversions API (CAPI), and custom telemetry pipelines so you know which rupee generated revenue.",
    deliverables: [
      "Server-side Google Tag Manager & Meta CAPI",
      "Multi-touch Markov attribution modeling",
      "Custom Looker Studio executive board dashboards",
      "Automated budget re-allocation alerts"
    ],
    metrics: [
      { label: "Attribution Accuracy", value: "99.2%", trend: "Server-side matched" },
      { label: "Data Latency", value: "< 2 min", trend: "Real-time updates" },
      { label: "Waste Spend Cut", value: "28%", trend: "Budget saved & re-invested" }
    ],
    accentColor: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.08)",
  },
];

// Mini-System Diagrams (SVG + Motion)
const MiniSystemDiagram: React.FC<{ featureId: string; color: string }> = ({ featureId, color }) => {
  if (featureId === "search-ppc") {
    // Keyword → Ad → Landing → Conversion
    const steps = ["Keyword Intent", "Dynamic Ad", "Tailored Landing", "Conversion"];
    return (
      <div className="w-full p-4 rounded-2xl bg-blue-50/40 border border-blue-100/70 my-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 block mb-3">
          Algorithmic Acquisition Pipeline
        </span>
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
          {steps.map((st, i) => (
            <React.Fragment key={st}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12 }}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-[11px] font-semibold text-slate-800 text-center whitespace-nowrap shrink-0"
              >
                {st}
              </motion.div>
              {i < steps.length - 1 && (
                <div className="flex items-center px-1 shrink-0">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 24 }}
                    transition={{ delay: i * 0.12 + 0.05, duration: 0.3 }}
                    className="h-0.5 bg-blue-400 relative"
                  >
                    <motion.div
                      animate={{ x: [0, 20] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-blue-600 shadow-xs"
                    />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  if (featureId === "technical-seo") {
    // Crawl → Index → Rank → Traffic
    const steps = ["Crawl Health", "Schema Index", "#1 SERP Rank", "Compounding Traffic"];
    return (
      <div className="w-full p-4 rounded-2xl bg-sky-50/40 border border-sky-100/70 my-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-600 block mb-3">
          Organic Topical Architecture Flow
        </span>
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
          {steps.map((st, i) => (
            <React.Fragment key={st}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12 }}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-[11px] font-semibold text-slate-800 text-center whitespace-nowrap shrink-0"
              >
                {st}
              </motion.div>
              {i < steps.length - 1 && (
                <div className="flex items-center px-1 shrink-0">
                  <div className="w-6 h-0.5 bg-sky-400 relative overflow-hidden">
                    <motion.div
                      animate={{ x: [-10, 30] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                      className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-sky-600"
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  if (featureId === "paid-social") {
    // Audience clusters → Creative → Engagement
    const steps = ["Audience Clusters", "Dynamic Creative Cells", "Viral Engagement Surge"];
    return (
      <div className="w-full p-4 rounded-2xl bg-purple-50/40 border border-purple-100/70 my-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-600 block mb-3">
          Creative Iteration Engine
        </span>
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
          {steps.map((st, i) => (
            <React.Fragment key={st}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12 }}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-[11px] font-semibold text-slate-800 text-center whitespace-nowrap shrink-0"
              >
                {st}
              </motion.div>
              {i < steps.length - 1 && (
                <div className="w-8 h-0.5 bg-purple-400 relative overflow-hidden shrink-0">
                  <motion.div
                    animate={{ x: [-10, 35] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-purple-600"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  if (featureId === "cro-funnel") {
    // Visitor nodes → Landing → CTA → Lead
    const steps = ["Visitor Traffic", "Zero-Friction Landing", "Micro CTA Trigger", "Qualified Lead"];
    return (
      <div className="w-full p-4 rounded-2xl bg-amber-50/40 border border-amber-100/70 my-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 block mb-3">
          Conversion Friction Elimination
        </span>
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
          {steps.map((st, i) => (
            <React.Fragment key={st}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.12 }}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-[11px] font-semibold text-slate-800 text-center whitespace-nowrap shrink-0"
              >
                {st}
              </motion.div>
              {i < steps.length - 1 && (
                <div className="w-6 h-0.5 bg-amber-400 relative overflow-hidden shrink-0">
                  <motion.div
                    animate={{ x: [-10, 30] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-amber-600"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Telemetry: Google Ads, Meta, SEO, CRM → unified analytics layer
  return (
    <div className="w-full p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100/70 my-2">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 block mb-3">
        Server-Side Attribution Pipeline
      </span>
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex flex-col gap-1 shrink-0">
          {["Google Ads", "Meta CAPI", "Organic SEO", "CRM Pipeline"].map((item, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-slate-700">
              {item}
            </span>
          ))}
        </div>
        <div className="flex-1 max-w-[80px] h-0.5 bg-emerald-400 relative overflow-hidden shrink-0">
          <motion.div
            animate={{ x: [-10, 80] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-emerald-600"
          />
        </div>
        <div className="px-3.5 py-3 rounded-xl bg-white border border-emerald-300 shadow-xs text-[11px] font-bold text-emerald-800 text-center shrink-0">
          XSPACEWEB Telemetry Layer
        </div>
      </div>
    </div>
  );
};

export const StickyFeaturesShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = FEATURES[activeIndex];

  return (
    <section className="w-full py-20 md:py-28 bg-[#f9fafb] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-slate-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#1668E8]" />
            <span>Growth Architecture</span>
          </div>
          <h2
            className="text-[34px] md:text-[46px] font-medium tracking-tight text-[#0a1b33] leading-[1.12]"
            style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
          >
            Engineering sustainable, compounding digital growth
          </h2>
          <p
            className="mt-4 text-[15px] md:text-[16px] text-[#64748b] leading-relaxed"
            style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
          >
            No generic playbooks or vanity impressions. We deploy disciplined, full-funnel systems engineered to capture high-intent demand and scale enterprise market share.
          </p>
        </div>

        {/* Sticky Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Interactive Feature Navigator */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {FEATURES.map((feature, idx) => {
              const isActive = activeIndex === idx;
              return (
                <motion.div
                  key={feature.id}
                  onClick={() => setActiveIndex(idx)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`p-5 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? "bg-white border-slate-300 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)] ring-1 ring-slate-200"
                      : "bg-white/60 border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: isActive ? feature.badgeBg : "#f1f5f9",
                        color: isActive ? feature.accentColor : "#64748b",
                      }}
                    >
                      {feature.tag}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3
                    className={`text-[17px] md:text-[19px] font-semibold tracking-tight transition-colors ${
                      isActive ? "text-[#0a1b33]" : "text-slate-700"
                    }`}
                    style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="text-[13px] md:text-[14px] text-slate-500 mt-1 line-clamp-2 leading-relaxed"
                    style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
                  >
                    {feature.subtitle}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Sticky Media & Live Telemetry Panel */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="w-full bg-white rounded-3xl border border-slate-200/70 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.04)] overflow-hidden p-7 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-6"
                >
                  {/* Top Badge & Header */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3"
                      style={{
                        backgroundColor: activeFeature.badgeBg,
                        color: activeFeature.accentColor,
                      }}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>{activeFeature.tag}</span>
                    </div>

                    <h4
                      className="text-[26px] md:text-[32px] font-medium tracking-tight text-[#0a1b33] leading-tight"
                      style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
                    >
                      {activeFeature.title}
                    </h4>

                    <p
                      className="mt-3 text-[15px] text-[#64748b] leading-relaxed"
                      style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
                    >
                      {activeFeature.description}
                    </p>
                  </div>

                  {/* Animated Mini-System Diagram */}
                  <MiniSystemDiagram
                    featureId={activeFeature.id}
                    color={activeFeature.accentColor}
                  />

                  {/* Benchmark Metrics Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                    {activeFeature.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex flex-col justify-between"
                      >
                        <span className="text-[11.5px] font-medium text-slate-500">
                          {m.label}
                        </span>
                        <div className="mt-1.5">
                          <span
                            className="text-[22px] font-bold tracking-tight text-[#0a1b33]"
                            style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
                          >
                            {m.value}
                          </span>
                          {m.trend && (
                            <p className="text-[10.5px] font-medium text-emerald-600 mt-0.5">
                              {m.trend}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Execution Deliverables */}
                  <div className="pt-2 border-t border-slate-100">
                    <h5 className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Strategic Deliverables
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeFeature.deliverables.map((d, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-4 h-4 shrink-0 mt-0.5"
                            style={{ color: activeFeature.accentColor }}
                          />
                          <span className="text-[12.5px] text-slate-700 leading-snug">
                            {d}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
