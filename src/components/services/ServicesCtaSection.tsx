"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquare, PhoneCall, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface ServicesCtaSectionProps {
  onOpenModal: () => void;
}

export const ServicesCtaSection: React.FC<ServicesCtaSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="w-full py-16 sm:py-24 bg-white relative overflow-hidden">
      <Container size="wide">
        <div className="relative rounded-[32px] bg-gradient-to-br from-[#07152B] via-[#0D2344] to-[#1668E8] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Let&apos;s Build Something Extraordinary</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Ready to Accelerate Your <br className="hidden sm:inline" />
              Digital Growth?
            </h2>

            <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed">
              Partner with XSPACEWEB to build cutting-edge software, elevate your brand identity, and achieve measurable marketing ROI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={onOpenModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#07152B] font-bold text-sm sm:text-base hover:bg-slate-100 transition-all duration-200 shadow-xl active:scale-95 cursor-pointer group"
              >
                <span>Request a Free Proposal</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#07152B]" />
              </button>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/25 transition-all duration-200 backdrop-blur-sm active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-blue-300" />
                <span>Talk with an Expert</span>
              </Link>
            </div>

            <div className="pt-6 flex items-center justify-center gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NDA & Confidentiality Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>24-Hour Proposal Turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
