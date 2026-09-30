"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/shared/ui/Container";

export const OurStoryTimelineSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-12 sm:py-16 lg:py-20">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN: Story Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <span className="text-[12px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-3">
              OUR STORY
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#07152B] tracking-tight leading-[1.18] mb-6">
              From Freelancing to a Private Limited Company
            </h2>

            {/* Body Copy */}
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                XSPACEWEB was founded by{" "}
                <strong className="text-[#07152B] font-semibold">
                  Dhrub Kumar Karmkar
                </strong>
                , a visionary entrepreneur who believed that technology, when
                combined with creativity and strategy, can transform businesses
                of any scale.
              </p>
              <p>
                The journey began with hands-on freelance work — building
                websites, applications, and eCommerce solutions for growing
                businesses. With consistent results, client trust, and a deep
                understanding of the digital ecosystem, XSPACEWEB steadily
                expanded its capabilities, team, and ambitions.
              </p>
              <p>
                In 2024, this growing vision took its next milestone —{" "}
                <strong className="text-[#07152B] font-semibold">
                  XSPACEWEB Private Limited
                </strong>
                , marking our transition from an individual venture to a
                professionally structured digital enterprise.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Milestone Timeline */}
          <div className="lg:col-span-6 relative pl-6 sm:pl-8">
            {/* Continuous Vertical Timeline Line */}
            <div className="absolute left-[13px] sm:left-[17px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#1668E8] via-[#1668E8]/70 to-[#1668E8]/40" />

            <div className="space-y-6 sm:space-y-8">
              {/* MILESTONE 1: 2021 */}
              <div className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Node Indicator */}
                <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 -ml-[27px] sm:-ml-[32px] rounded-full bg-white border-2 border-[#1668E8] flex items-center justify-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1668E8]" />
                </div>

                {/* Content Card */}
                <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-colors shadow-sm">
                  <div className="flex-1 pr-2">
                    <span className="text-xl sm:text-2xl font-black text-[#07152B] tracking-tight block">
                      2021
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#07152B] mt-0.5 mb-1.5">
                      Freelance Journey
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      Started as an individual, working on websites, applications
                      and eCommerce solutions for growing businesses.
                    </p>
                  </div>
                  <div className="relative w-full sm:w-36 md:w-44 h-28 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-100">
                    <Image
                      src="/images/about/story/timeline_2021.jpg"
                      alt="2021 Freelance Journey"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* MILESTONE 2: Growth */}
              <div className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Node Indicator */}
                <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 -ml-[27px] sm:-ml-[32px] rounded-full bg-white border-2 border-[#1668E8] flex items-center justify-center shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1668E8]" />
                </div>

                {/* Content Card */}
                <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-colors shadow-sm">
                  <div className="flex-1 pr-2">
                    <span className="text-xl sm:text-2xl font-black text-[#07152B] tracking-tight block">
                      Growth
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#07152B] mt-0.5 mb-1.5">
                      Client Trust & Expansion
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      Consistent results, strong client relationships, and
                      deeper understanding of the digital ecosystem.
                    </p>
                  </div>
                  <div className="relative w-full sm:w-36 md:w-44 h-28 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-100">
                    <Image
                      src="/images/about/story/timeline_growth.jpg"
                      alt="Growth - Client Trust & Expansion"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* MILESTONE 3: 2024 (Highlighted Card) */}
              <div className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Node Indicator */}
                <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 -ml-[27px] sm:-ml-[32px] rounded-full bg-[#1668E8] border-2 border-white flex items-center justify-center shadow-md">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Highlighted Milestone Card */}
                <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#F0F6FF] to-[#E8F1FD] border border-[#1668E8]/30 shadow-[0_4px_20px_rgba(22,104,232,0.08)]">
                  <div className="flex-1 pr-2">
                    <span className="text-xl sm:text-2xl font-black text-[#1668E8] tracking-tight block">
                      2024
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#07152B] mt-0.5 mb-1.5">
                      XSPACEWEB Private Limited
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      A new milestone — a professionally structured digital
                      enterprise, ready for bigger possibilities.
                    </p>
                  </div>
                  <div className="relative w-full sm:w-36 md:w-44 h-28 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-md border border-[#1668E8]/20">
                    <Image
                      src="/images/about/story/timeline_2024.jpg"
                      alt="2024 XSPACEWEB Private Limited"
                      fill
                      className="object-cover"
                      unoptimized
                    />
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
