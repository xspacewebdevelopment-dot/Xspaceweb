"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const CertificationCtaBanner: React.FC = () => {
  return (
    <section className="w-full bg-white py-12 sm:py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#F0F6FE] via-[#EBF3FE] to-[#F5F8FF] p-8 sm:p-12 border border-blue-100/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="space-y-2 relative z-10">
            <span className="text-[11px] font-black tracking-widest text-[#1668E8] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERNSHIP PROGRAM</span>
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-[#07152B] tracking-tight">
              Start Your 30-Day Free Trial
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm">
              Join 4,000+ learners and kickstart your career with XSPACEWEB.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 relative z-10 shrink-0">
            <Link
              href="/careers"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all shadow-2xs hover:shadow-xs"
            >
              Learn More
            </Link>

            <Link
              href="/careers"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-2xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
