"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/shared/ui/Container";

export const InnovationCoreSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-8 sm:py-12">
      <Container size="wide">
        {/* Soft rounded card enclosure matching reference */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#F9FBFF] via-[#F4F8FE] to-[#EEF5FD] border border-slate-100/90 p-6 sm:p-10 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN: Innovation Mindset */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-[12px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-3">
                INNOVATION
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#07152B] tracking-tight leading-[1.18] mb-5">
                Innovation Is Our Core
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p className="font-semibold text-[#07152B]">
                  Innovation is not a department at XSPACEWEB — it&apos;s our
                  mindset.
                </p>
                <p>
                  We constantly explore new technologies, tools, and creative
                  processes to help our clients stay ahead in an ever-evolving
                  digital world. From automation to performance optimization, we
                  focus on solutions that are smart, secure, and scalable.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Generated High-Res Cockpit Graphic + Code Overlay Annotation */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full aspect-[16/9] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-slate-100/80 bg-slate-950 group">
                <Image
                  src="/images/about/innovation_cockpit.jpg"
                  alt="Innovation at XSPACEWEB - High-tech development and cyber telemetry workstation"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  unoptimized
                />

                {/* Subtle soft dark vignette on the edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                {/* Handwritten Annotation in code: "Always Exploring What's Next..." */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none z-10">
                  <div
                    className="flex flex-col items-end text-white select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  >
                    <span className="text-xl sm:text-2xl md:text-[26px] font-bold leading-tight rotate-[-4deg]">
                      Always
                    </span>
                    <span className="text-xl sm:text-2xl md:text-[26px] font-bold leading-tight rotate-[-2deg]">
                      Exploring
                    </span>
                    <span className="text-xl sm:text-2xl md:text-[26px] font-bold leading-tight rotate-[1deg]">
                      What&apos;s Next...
                    </span>
                    {/* Hand-drawn style decorative curved underline arrow */}
                    <svg
                      className="w-16 sm:w-20 h-4 mt-0.5"
                      viewBox="0 0 80 16"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M 4 8 Q 40 14 74 6" />
                      <path d="M 68 2 L 76 6 L 69 11" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
