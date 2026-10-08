"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Star,
  PhoneCall,
} from "lucide-react";

interface GmbFaqCtaSectionProps {
  onOpenConsultation?: (serviceName?: string) => void;
}

const FAQS = [
  {
    question: "How long does it take to rank in Google Maps' top 3 pins?",
    answer:
      "Most local businesses start seeing measurable rank climbs within 14 to 30 days. For competitive metropolitan markets, achieving dominant #1 to #3 rankings across a 10-mile radius typically takes 60 to 90 days of consistent citation building, geo-tagged photo uploads, and review acceleration.",
  },
  {
    question: "Can XSPACEWEB help if my Google profile is suspended or disabled?",
    answer:
      "Yes. We specialize in Google Business Profile reinstatements. Our team audits your documentation (utility bills, business licenses, signage proof), fixes policy violations, and submits direct appeals through Google internal escalation channels to restore your verified status.",
  },
  {
    question: "How does your Review Acceleration Engine work legally?",
    answer:
      "We strictly comply with Google's Anti-Review Gating policies. We supply custom QR code review stands, automated post-service SMS/email review invites, and staff incentives that make leaving authentic 5-star Google reviews effortless for your satisfied customers.",
  },
  {
    question: "Do you handle multi-location franchises or service-area businesses?",
    answer:
      "Absolutely. We manage multi-location accounts across cities and states, as well as Service-Area Businesses (SABs) like plumbers, electricians, and contractors where physical address privacy is required.",
  },
  {
    question: "Why invest in Google My Business over paid Google Ads?",
    answer:
      "Google Maps 3-Pack listings capture over 70% of high-intent clicks and boast a 300% higher trust factor than sponsored ads. Furthermore, once your organic map rank is established, your inbound calls are 100% free with zero pay-per-click costs.",
  },
];

export const GmbFaqCtaSection: React.FC<GmbFaqCtaSectionProps> = ({
  onOpenConsultation,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full py-20 sm:py-28 bg-white border-t border-slate-100 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            PART 1: FREQUENTLY ASKED QUESTIONS
            ========================================================= */}
        <div className="max-w-3xl mx-auto mb-20 sm:mb-28">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-[#1668E8] uppercase block mb-2">
              COMMON QUESTIONS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#07152B] tracking-tight">
              Everything You Need to Know About GMB.
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-500">
              Clear, transparent answers on how we rank and protect your local business on Google.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/50 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#07152B]">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#1668E8]" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            PART 2: FINAL CALL TO ACTION BANNER (GLASSMORPHIC BLUE PANEL)
            ========================================================= */}
        <div className="relative rounded-[32px] overflow-hidden border border-slate-200/90 bg-gradient-to-br from-[#07152B] via-[#0D2344] to-[#07152B] text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Ambient Glow Orbs */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#1668E8]/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute left-10 -bottom-20 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
            {/* Left Column: Heading & Perks */}
            <div className="flex-1 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-300 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>Ready to Claim #1 on Google Maps?</span>
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Dominate Your Local Territory with <br className="hidden sm:inline" />
                XSPACEWEB Google My Business.
              </h3>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                Get your complimentary 15-point Google Business Profile audit today. We'll identify exactly what is holding your profile back from ranking #1 and map out a clear growth strategy.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onOpenConsultation?.("Google Business Profile Audit & Setup")
                  }
                  className="px-7 py-3.5 rounded-full bg-[#1668E8] hover:bg-[#1255C0] text-white font-bold text-sm shadow-[0_8px_24px_rgba(22,104,232,0.4)] transition-all flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <span>Claim Your Free Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/contact"
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  <span>Contact Our Team</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Floating 3D X Logo */}
            <div className="flex items-center justify-center shrink-0">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex items-center justify-center pointer-events-none select-none">
                <div className="absolute inset-4 rounded-full bg-blue-500/25 blur-2xl pointer-events-none" />
                <Image
                  src="/images/xspace-3d-x.png"
                  alt="XSPACEWEB 3D Logo"
                  fill
                  className="relative z-10 object-contain drop-shadow-[0_20px_50px_rgba(22,104,232,0.5)]"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
