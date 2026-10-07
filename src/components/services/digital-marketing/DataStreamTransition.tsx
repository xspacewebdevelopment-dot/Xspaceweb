"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Database, Sparkles, TrendingUp } from "lucide-react";

export const DataStreamTransition: React.FC = () => {
  const sources = [
    { name: "Google Ads", color: "#2563eb" },
    { name: "Meta Ads", color: "#a855f7" },
    { name: "Organic SEO", color: "#10b981" },
    { name: "CRM Pipeline", color: "#f59e0b" },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#f9fafb] relative overflow-hidden border-t border-slate-200/60">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Subtle section sub-badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-slate-600 text-xs font-semibold tracking-wide uppercase mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#1668E8]" />
          <span>Real-Time Convergence</span>
        </div>

        {/* Desktop Interactive SVG Stream (>= 768px) */}
        <div className="hidden md:flex items-center justify-between w-full max-w-4xl gap-6">
          {/* Left Inputs */}
          <div className="flex flex-col gap-3 shrink-0">
            {sources.map((src, i) => (
              <motion.div
                key={src.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between w-40 text-xs font-semibold text-slate-700"
              >
                <span>{src.name}</span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: src.color }} />
              </motion.div>
            ))}
          </div>

          {/* Center SVG Convergence Channels */}
          <div className="flex-1 h-36 relative flex items-center justify-center">
            <svg
              className="w-full h-full"
              viewBox="0 0 300 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Converging Paths */}
              <path d="M 0 15 C 100 15, 150 60, 200 60" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 0 45 C 80 45, 150 60, 200 60" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M 0 75 C 80 75, 150 60, 200 60" stroke="#cbd5e1" strokeWidth="2" />
              <path d="M 0 105 C 100 105, 150 60, 200 60" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />

              {/* Luminous Animated Particles traveling along paths */}
              <motion.circle
                r="3.5"
                fill="#2563eb"
                animate={{ cx: [0, 80, 150, 200], cy: [15, 25, 55, 60], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                r="3.5"
                fill="#a855f7"
                animate={{ cx: [0, 80, 150, 200], cy: [45, 50, 58, 60], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.circle
                r="3.5"
                fill="#10b981"
                animate={{ cx: [0, 80, 150, 200], cy: [75, 70, 62, 60], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 1.0, ease: "easeInOut" }}
              />
              <motion.circle
                r="3.5"
                fill="#f59e0b"
                animate={{ cx: [0, 80, 150, 200], cy: [105, 95, 65, 60], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 1.5, ease: "easeInOut" }}
              />

              {/* Forward Line to Hub */}
              <path d="M 200 60 L 300 60" stroke="#1668E8" strokeWidth="2.5" />
              <motion.circle
                r="4"
                fill="#1668E8"
                animate={{ cx: [200, 300], opacity: [1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Central Hub */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-2xl bg-white border border-blue-200 shadow-sm flex flex-col items-center justify-center shrink-0 w-56 text-center ring-1 ring-blue-100"
          >
            <Database className="w-5 h-5 text-[#1668E8] mb-1.5" />
            <span className="text-[12px] font-bold text-[#0a1b33] uppercase tracking-wider">
              XSPACEWEB SIGNAL LAYER
            </span>
            <span className="text-[10.5px] text-emerald-600 font-mono mt-0.5">
              99.2% CAPI Attribution
            </span>
          </motion.div>

          <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />

          {/* Output Node: Revenue */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-2xl bg-[#0a1b33] text-white shadow-md flex flex-col items-center justify-center shrink-0 w-44 text-center"
          >
            <TrendingUp className="w-5 h-5 text-emerald-400 mb-1" />
            <span className="text-[14px] font-bold tracking-tight">PREDICTABLE REVENUE</span>
            <span className="text-[11px] text-slate-300 mt-0.5">Compounding Scale</span>
          </motion.div>
        </div>

        {/* Mobile Vertical Flow (< 768px) */}
        <div className="flex md:hidden flex-col items-center gap-3 w-full max-w-xs">
          <div className="grid grid-cols-2 gap-2 w-full">
            {sources.map((src) => (
              <div key={src.name} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 text-center">
                {src.name}
              </div>
            ))}
          </div>
          <div className="w-0.5 h-6 bg-blue-300" />
          <div className="p-4 rounded-xl bg-white border border-blue-200 text-center w-full shadow-2xs">
            <span className="text-xs font-bold text-[#0a1b33] block">XSPACEWEB SIGNAL LAYER</span>
            <span className="text-[11px] text-emerald-600">99.2% Attribution</span>
          </div>
          <div className="w-0.5 h-6 bg-blue-300" />
          <div className="p-4 rounded-xl bg-[#0a1b33] text-white text-center w-full shadow-xs">
            <span className="text-xs font-bold block">PREDICTABLE REVENUE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
