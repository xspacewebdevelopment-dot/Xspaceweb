"use client";

import React from "react";
import Link from "next/link";
import { Award, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export const CareerCertificationsBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#F8FAFC] py-10 sm:py-14">
      <Container size="wide">
        <div className="relative rounded-3xl bg-[#07152B] text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl">
          {/* Luminous Ambient Background Glow & Decorative Graphic */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 lg:opacity-35 pointer-events-none flex items-center justify-end pr-8 sm:pr-14">
            <div className="w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1668E8] via-[#38BDF8] to-indigo-600 rounded-full blur-3xl opacity-35" />
              <div className="relative w-full h-full flex items-center justify-center text-white/10 select-none">
                <ShieldCheck className="w-48 h-48 sm:w-64 sm:h-64 stroke-[1]" />
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
                <span className="text-xs font-bold tracking-wider text-[#38BDF8] uppercase">
                  INTERNSHIP CREDENTIALS
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Looking for your certificate? <br />
                <span className="text-[#38BDF8]">Verify your credential.</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Completed an internship at XSPACEWEB? Access, download, and verify your official Certificate of Completion, credential ID, and performance record.
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                  <span>Instant Verification</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                  <span>Official Credential ID</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8]" />
                  <span>Tamper-proof Record</span>
                </div>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/certification"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-[#07152B] text-sm sm:text-base font-bold transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <span>Verify Internship Certificate</span>
                <Award className="w-4 h-4 text-[#1668E8] transition-transform group-hover:scale-110" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
