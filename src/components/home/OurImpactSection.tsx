"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/shared/ui/Container";
import BlurText from "@/components/ui/BlurText";

interface StatItem {
  number: string;
  label: string;
}

const stats: StatItem[] = [
  { number: "500+", label: "Happy Clients" },
  { number: "1,000+", label: "Projects Completed" },
  { number: "10,000+", label: "Active Users" },
  { number: "99%", label: "Client Satisfaction" },
];

export const OurImpactSection: React.FC = () => {
  return (
    <section className="w-full bg-[#020A18] text-white py-20 sm:py-24 relative overflow-hidden border-t border-slate-800/80">
      {/* Background Blue Dotted World Map Image matching uploaded reference image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <Image
          src="/images/home/world_map.png"
          alt="XSPACEWEB Global Reach World Map Background"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-90"
        />
        {/* Soft atmospheric gradient dark overlay for maximum legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020A18]/50 via-transparent to-[#020A18]/70" />
      </div>

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.24em] text-slate-300 uppercase select-none">
            — OUR IMPACT —
          </span>
          <BlurText
            text="Trusted by Businesses Across Industries"
            delay={100}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
            as="h2"
          />
        </div>

        {/* 4 Columns Stats Grid with crisp dividing lines */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 items-center border-t border-b border-white/20 py-10 sm:py-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center px-4 sm:px-6 ${
                idx < stats.length - 1 ? "md:border-r border-white/20" : ""
              }`}
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#3B82F6] tracking-tight mb-2 font-sans drop-shadow-md">
                {stat.number}
              </span>
              <span className="text-xs sm:text-sm text-slate-200 font-medium tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
