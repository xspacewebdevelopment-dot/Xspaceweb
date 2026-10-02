"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { ProjectModal } from "@/components/shared/ProjectModal";

export const OurBeliefCtaSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative w-full bg-white pb-16 sm:pb-20 overflow-hidden select-none">
        <Container size="wide">
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-slate-100 bg-[#F4E9DC]">
            {/* Clean Background Photography without baked-in text */}
            <div className="relative w-full min-h-[420px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[540px] flex items-center">
              <Image
                src="/images/about/belief_banner_clean.jpg"
                alt="Ideas. People. Technology. Real Impact. - XSPACEWEB"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1400px"
                className="object-cover object-center"
                unoptimized
              />

              {/* Soft atmospheric gradient on left for contrast readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent pointer-events-none" />

              {/* Content Container */}
              <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-16 py-12 flex flex-col justify-between">
                <div className="max-w-xl">
                  <span className="text-[12px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-3">
                    OUR BELIEF
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight leading-[1.14] mb-4">
                    Ideas. People. Technology.
                    <br />
                    Real Impact.
                  </h2>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
                    At XSPACEWEB, we don&apos;t just build digital solutions. We
                    build possibilities for a brighter tomorrow.
                  </p>
                  <div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-[#1668E8] text-white text-sm sm:text-base font-bold shadow-lg shadow-blue-500/25 hover:bg-[#1255c4] hover:shadow-xl transition-all duration-200 active:scale-95 group"
                    >
                      <span>Let&apos;s Build Together</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Handwritten Annotation on Right: "Building digital experiences beyond boundaries." */}
              <div className="absolute top-5 right-5 sm:top-8 sm:right-10 md:top-10 md:right-14 pointer-events-none select-none z-10">
                <div
                  className="flex flex-col items-end text-[#1E293B] text-right drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  <span className="text-2xl sm:text-3xl md:text-[34px] font-bold leading-[1.1] rotate-[-2deg]">
                    Building
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-[34px] font-bold leading-[1.1] rotate-[1deg]">
                    digital experiences
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-[34px] font-bold leading-[1.1] rotate-[-1deg]">
                    beyond
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-[34px] font-bold leading-[1.1] rotate-[2deg]">
                    boundaries.
                  </span>
                  {/* Subtle hand-drawn blue underline */}
                  <svg
                    className="w-28 sm:w-36 h-4 mt-1"
                    viewBox="0 0 100 12"
                    fill="none"
                    stroke="#1668E8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M 4 8 Q 30 3 55 8 T 96 5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Service Request / Project Consultation Inquiry Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="service"
        source="about-page"
      />
    </>
  );
};
