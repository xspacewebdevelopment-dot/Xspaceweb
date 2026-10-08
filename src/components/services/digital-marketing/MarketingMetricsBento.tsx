"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  CheckCircle, 
  LineChart, 
  Zap, 
  ArrowUpRight 
} from "lucide-react";

export const MarketingMetricsBento: React.FC = () => {
  return (
    <section className="w-full py-20 md:py-28 bg-[#f9fafb] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-slate-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <Award className="w-3.5 h-3.5 text-[#1668E8]" />
            <span>Proven Benchmarks</span>
          </div>
          <h2
            className="text-[32px] md:text-[44px] font-medium tracking-tight text-[#0a1b33] leading-[1.12]"
            style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
          >
            Empirical outcomes, not theoretical impressions
          </h2>
          <p
            className="mt-3 text-[15px] md:text-[16px] text-[#64748b] leading-relaxed"
            style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
          >
            Every rupee invested is tracked against bottom-line revenue. Here is what disciplined, data-first digital growth produces across our client portfolios.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Tile 1: Hero Stat (2 cols) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="md:col-span-2 p-8 md:p-10 rounded-3xl bg-white border border-slate-200/70 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1668E8] text-xs font-semibold">
                  Cross-Portfolio Average
                </span>
                <span className="text-xs font-mono text-slate-400">90-Day Verified</span>
              </div>
              <h3
                className="text-[52px] md:text-[68px] font-medium tracking-tight text-[#0a1b33] leading-none"
                style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
              >
                4.8×
              </h3>
              <p
                className="text-[18px] md:text-[20px] font-semibold text-[#0a1b33] mt-2"
                style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
              >
                Blended Return on Ad Spend (ROAS)
              </p>
              <p className="text-[14px] text-slate-500 mt-2 max-w-md leading-relaxed">
                By removing non-converting keywords and optimizing dynamic creative hooks, our enterprise accounts achieve nearly 5x blended pipeline yield.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <TrendingUp className="w-4 h-4" /> +42% vs baseline
              </span>
              <span>•</span>
              <span>Over ₹14 Cr ad spend managed</span>
            </div>
          </motion.div>

          {/* Tile 2: CAC Reduction (1 col) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-3xl bg-white border border-slate-200/70 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
                Efficiency Lift
              </span>
              <h3
                className="text-[44px] md:text-[52px] font-medium tracking-tight text-[#0a1b33] mt-6 leading-none"
                style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
              >
                -38%
              </h3>
              <p
                className="text-[17px] font-semibold text-[#0a1b33] mt-2"
                style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
              >
                Customer Acquisition Cost
              </p>
              <p className="text-[13px] text-slate-500 mt-2 leading-relaxed">
                Through programmatic landing page CRO and negative audience filtering.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
              Measured within 60 days of launch
            </div>
          </motion.div>

          {/* Tile 3: Client Retention (1 col) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-3xl bg-white border border-slate-200/70 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold">
                Partnership Trust
              </span>
              <h3
                className="text-[44px] md:text-[52px] font-medium tracking-tight text-[#0a1b33] mt-6 leading-none"
                style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
              >
                99.4%
              </h3>
              <p
                className="text-[17px] font-semibold text-[#0a1b33] mt-2"
                style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
              >
                Client Retention Rate
              </p>
              <p className="text-[13px] text-slate-500 mt-2 leading-relaxed">
                We act as an integrated growth team with full transparent reporting.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
              Zero lock-in contracts required
            </div>
          </motion.div>

          {/* Tile 4: Organic Growth (1 col) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-3xl bg-white border border-slate-200/70 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold">
                Organic Scalability
              </span>
              <h3
                className="text-[44px] md:text-[52px] font-medium tracking-tight text-[#0a1b33] mt-6 leading-none"
                style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
              >
                +310%
              </h3>
              <p
                className="text-[17px] font-semibold text-[#0a1b33] mt-2"
                style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
              >
                Organic Traffic Compounding
              </p>
              <p className="text-[13px] text-slate-500 mt-2 leading-relaxed">
                Technical SEO, Core Web Vitals, and programmatic semantic clusters.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
              Sustained 12-month trajectory
            </div>
          </motion.div>

          {/* Tile 5: Server-side tracking telemetry (2 cols) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="md:col-span-2 p-8 md:p-10 rounded-3xl bg-white border border-slate-200/70 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1668E8] text-xs font-semibold">
                  Measurement Moat
                </span>
                <span className="text-xs font-mono text-emerald-600 font-semibold">100% CAPI Compliant</span>
              </div>
              <h3
                className="text-[24px] md:text-[28px] font-semibold text-[#0a1b33]"
                style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
              >
                Server-Side Telemetry & Zero Data Loss
              </h3>
              <p className="text-[14px] text-slate-500 mt-2 leading-relaxed">
                While traditional agencies struggle with iOS privacy updates and ad blockers, we deploy server-side Google Tag Manager and direct Meta Conversions API (CAPI) pipelines to guarantee 99%+ attribution accuracy for your marketing campaigns.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100 text-xs">
              <div>
                <span className="font-bold text-[#0a1b33] text-sm">9.2+ / 10</span>
                <p className="text-slate-400">Meta Match Quality</p>
              </div>
              <div>
                <span className="font-bold text-[#0a1b33] text-sm">&lt; 150ms</span>
                <p className="text-slate-400">Telemetry Latency</p>
              </div>
              <div>
                <span className="font-bold text-[#0a1b33] text-sm">GDPR / DPDP</span>
                <p className="text-slate-400">Compliant Tracking</p>
              </div>
            </div>
          </motion.div>

          {/* Tile 6: Guaranteed Velocity (1 col) */}
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-8 rounded-3xl bg-white border border-slate-200/70 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                Deployment Speed
              </span>
              <h3
                className="text-[44px] md:text-[52px] font-medium tracking-tight text-[#0a1b33] mt-6 leading-none"
                style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
              >
                14 Days
              </h3>
              <p
                className="text-[17px] font-semibold text-[#0a1b33] mt-2"
                style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
              >
                From Audit to Live Campaigns
              </p>
              <p className="text-[13px] text-slate-500 mt-2 leading-relaxed">
                Rapid onboarding without bureaucratic delays.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
              Full analytics instrumentation included
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
