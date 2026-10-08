"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "How quickly can we expect to see measurable results from our campaigns?",
    a: "For paid search and performance social, signal calibration and initial ROAS lifts typically occur within days 14 to 30 as negative filters and algorithmic bidding normalize. For technical SEO and semantic topic clusters, sustainable compounding organic traffic generally materializes between days 60 to 90.",
  },
  {
    q: "How does XSPACEWEB handle tracking after iOS privacy updates and cookie deprecation?",
    a: "We deploy full server-side Google Tag Manager containers coupled with direct Meta Conversions API (CAPI) and Google Enhanced Conversions pipelines. This bypasses client-side ad blockers and browser cookie restrictions, ensuring 99%+ attribution accuracy and superior algorithmic bidding data.",
  },
  {
    q: "Do you require long-term lock-in contracts?",
    a: "No. We operate with zero long-term lock-in requirements. Our retention rate is 99.4% because of empirical business results and transparent weekly telemetry reporting, not legal handcuffs.",
  },
  {
    q: "What ad spend budgets do you manage?",
    a: "We typically partner with growing startups, scale-ups, and established enterprises managing monthly media budgets starting from ₹75,000 up to ₹50,00,000+ across Google, Meta, YouTube, and LinkedIn.",
  },
  {
    q: "What makes your growth approach different from typical digital agencies?",
    a: "Most agencies treat digital marketing as isolated ad buying. We engineer full-funnel digital architecture: blending engineering-level technical SEO, direct-response creative production, landing page CRO, and real-time attribution modeling to compound enterprise value.",
  },
];

export const MarketingFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full py-20 md:py-28 bg-[#f9fafb] border-t border-slate-200/60 relative">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/60 text-slate-700 text-xs font-semibold tracking-wide uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#1668E8]" />
            <span>Clarity & Answers</span>
          </div>
          <h2
            className="text-[32px] md:text-[42px] font-medium tracking-tight text-[#0a1b33] leading-tight"
            style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
          >
            Frequently Asked Questions
          </h2>
          <p
            className="mt-3 text-[15px] text-[#64748b]"
            style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
          >
            Direct answers on our engagement structure, attribution telemetry, and timeline.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/70 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span
                    className="text-[16px] md:text-[17px] font-medium text-[#0a1b33]"
                    style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-[#1668E8]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div
                        className="px-5 md:px-6 pb-6 text-[14px] md:text-[15px] text-[#64748b] leading-relaxed border-t border-slate-100 pt-3"
                        style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
