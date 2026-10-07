"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { Compass, CheckCircle2 } from "lucide-react";

interface Step {
  num: string;
  phase: string;
  timeline: string;
  title: string;
  description: string;
  deliverables: string[];
}

const STEPS: Step[] = [
  {
    num: "01",
    phase: "Diagnostic & Audit",
    timeline: "Days 1–7",
    title: "Deep Funnel & Signal Audit",
    description: "We dissect past ad accounts, technical SEO health, conversion leaks, and tracking accuracy to uncover the biggest leverage points.",
    deliverables: ["Full ad spend waste audit", "Server-side tracking telemetry review", "Top competitor keyword & creative tear-down"],
  },
  {
    num: "02",
    phase: "Foundation & Setup",
    timeline: "Days 8–14",
    title: "Instrumentation & Creative Sprints",
    description: "We configure clean attribution pipelines, build landing page variations, and produce the initial batch of high-converting creative angles.",
    deliverables: ["Meta CAPI & Google enhanced conversions", "High-converting CRO landing page builds", "15+ multi-format direct-response creatives"],
  },
  {
    num: "03",
    phase: "Controlled Launch",
    timeline: "Days 15–30",
    title: "Algorithmic Testing & Signal Calibration",
    description: "We launch structured search clusters and creative test cells, systematically validating winning hooks and eliminating unprofitable queries.",
    deliverables: ["Negative keyword scrubbing loops", "Creative dynamic test cells", "Rapid cohort feedback and CAC baseline stabilization"],
  },
  {
    num: "04",
    phase: "Scale & Dominate",
    timeline: "Days 31+",
    title: "Aggressive Scale & Market Dominance",
    description: "With proven unit economics established, we pour fuel on winning channels, expand into retargeting, and scale monthly revenue predictably.",
    deliverables: ["Gradual budget scaling without efficiency decay", "Lookalike & intent audience expansion", "Weekly executive telemetry & ROI reporting"],
  },
];

export const GrowthProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const beamHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="w-full py-20 md:py-28 bg-white border-t border-slate-200/60 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-slate-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <Compass className="w-3.5 h-3.5 text-[#1668E8]" />
            <span>Structured Execution</span>
          </div>
          <h2
            className="text-[32px] md:text-[44px] font-medium tracking-tight text-[#0a1b33] leading-[1.12]"
            style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
          >
            A disciplined, four-stage protocol for predictable scale
          </h2>
          <p
            className="mt-3 text-[15px] md:text-[16px] text-[#64748b] leading-relaxed"
            style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
          >
            Growth is not achieved through random guesswork. We execute a phased deployment cycle designed to de-risk investment and validate channel unit economics.
          </p>
        </div>

        {/* Tracing Beam Timeline Container */}
        <div className="relative pl-8 md:pl-16">
          {/* Background Guide Line */}
          <div className="absolute left-3 md:left-6 top-3 bottom-8 w-[2px] bg-slate-200/80 rounded-full" />

          {/* Active Tracing Beam Line */}
          <motion.div
            style={{ height: beamHeight }}
            className="absolute left-3 md:left-6 top-3 w-[2px] bg-gradient-to-b from-[#1668E8] via-[#4f46e5] to-[#8b5cf6] rounded-full origin-top"
          >
            {/* Luminous Pulsing Head Dot */}
            <div className="absolute bottom-0 -left-[5px] w-3 h-3 rounded-full bg-[#1668E8] shadow-[0_0_12px_rgba(22,104,232,0.8)] ring-2 ring-white" />
          </motion.div>

          {/* 4 Process Stages */}
          <div className="flex flex-col gap-12 md:gap-16">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Stage Step Indicator Marker on the beam */}
                <div className="absolute -left-8 md:-left-16 top-1.5 flex items-center justify-center">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center shadow-xs">
                    <span className="text-[10px] md:text-[11px] font-mono font-bold text-slate-700">
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* Stage Card */}
                <div className="p-7 md:p-9 rounded-3xl bg-[#f9fafb] border border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {step.phase}
                    </span>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                      {step.timeline}
                    </span>
                  </div>

                  <h3
                    className="text-[22px] md:text-[26px] font-semibold text-[#0a1b33] tracking-tight leading-snug"
                    style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-[14px] md:text-[15px] text-slate-600 mt-2.5 leading-relaxed max-w-2xl"
                    style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
                  >
                    {step.description}
                  </p>

                  <div className="pt-5 mt-6 border-t border-slate-200/70">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                      Core Deliverables
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {step.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-[12.5px] text-slate-700 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1668E8] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
