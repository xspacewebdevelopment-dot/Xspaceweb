"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { ProjectModal } from "@/components/shared/ProjectModal";

export const CompanyHeroSection: React.FC = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const scrollToJourney = () => {
    const el = document.getElementById("journey");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative w-full bg-white pt-10 sm:pt-14 pb-14 sm:pb-20 overflow-hidden border-b border-slate-100">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-6">
              <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase">
                COMPANY INFORMATION
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-extrabold text-[#07152B] tracking-tight leading-[1.12]">
                A Journey from Freelance to a Private Limited Company
              </h1>

              <p className="text-slate-600 text-base sm:text-[17px] leading-relaxed max-w-xl">
                What started as a small freelance initiative in 2021 has now grown
                into XSPACEWEB Private Limited — a technology and digital solutions
                company with a presence across Jharkhand and West Bengal.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={scrollToJourney}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1668E8] text-white text-sm font-semibold hover:bg-[#1255C0] transition-all duration-200 shadow-sm hover:shadow-[0_4px_16px_rgba(22,104,232,0.35)] active:scale-[0.98] cursor-pointer"
                >
                  <span>Our Journey</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setProjectModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 text-[#07152B] text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-xs cursor-pointer"
                >
                  <span>Get in Touch</span>
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-5 xl:col-span-6 flex flex-col items-end">
              {/* Top Tagline */}
              <div className="w-full text-right mb-3">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-slate-400 uppercase">
                  BUILDING DIGITAL EXPERIENCES BEYOND BOUNDARIES.
                </span>
              </div>

              {/* Hero Image Card */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(7,21,43,0.08)] border border-slate-100 group">
                <Image
                  src="/images/company/company_hero_x.png"
                  alt="XSPACEWEB 3D Emblem"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Brand Watermark Emblem */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-white/60 shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1668E8] animate-pulse" />
                  <span className="text-[11px] font-bold tracking-wider text-[#07152B] uppercase">
                    XSPACEWEB
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </>
  );
};
