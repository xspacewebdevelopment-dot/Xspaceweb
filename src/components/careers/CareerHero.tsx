"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Users, Lightbulb, TrendingUp, Heart } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

const benefitItems = [
  {
    icon: Users,
    line1: "Great",
    line2: "Team",
  },
  {
    icon: Lightbulb,
    line1: "Meaningful",
    line2: "Work",
  },
  {
    icon: TrendingUp,
    line1: "Growth",
    line2: "Opportunities",
  },
  {
    icon: Heart,
    line1: "Work-Life",
    line2: "Balance",
  },
];

export const CareerHero: React.FC = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden border-b border-slate-200/80">
      {/* Background Office Image on Right with Seamless Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] pointer-events-none select-none z-0">
        <Image
          src="/images/careers/career_hero_office.jpg"
          alt="XSPACEWEB Office"
          fill
          priority
          className="object-cover object-left lg:object-center"
        />
        {/* Left-to-Right Soft Gradient blend into clean white left canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 via-25% to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent h-24 bottom-0 top-auto" />
      </div>

      <Container size="wide" className="relative z-10 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
        {/* Main Hero Content */}
        <div className="max-w-xl space-y-6 lg:space-y-7">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#07152B] leading-[1.08]">
            Find Your <br />
            <span className="text-[#1668E8]">Opportunity.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-md font-normal">
            Build, learn and grow with a team that creates impactful digital products.
          </p>

          <div className="pt-2">
            <a
              href="#open-positions"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1668E8] hover:bg-[#1255c2] active:scale-95 text-white text-sm sm:text-base font-semibold transition-all duration-200 shadow-md shadow-[#1668E8]/30 group cursor-pointer"
            >
              <span>View Open Positions</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* 4 Value Proposition Strip across Bottom with Divider Bars */}
        <div className="mt-20 sm:mt-24 lg:mt-28 pt-8 border-t border-slate-200/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-0 items-center">
            {benefitItems.map((item, index) => {
              const Icon = item.icon;
              const isNotLast = index < benefitItems.length - 1;

              return (
                <div
                  key={item.line1 + item.line2}
                  className={`flex items-center gap-4 ${
                    isNotLast
                      ? "lg:border-r lg:border-slate-200/90 lg:pr-8"
                      : ""
                  } ${index > 0 ? "lg:pl-8" : ""}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF3FE] flex items-center justify-center text-[#1668E8] flex-shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="text-sm sm:text-[15px] font-bold text-[#07152B] leading-tight">
                    <span>{item.line1}</span> <br />
                    <span>{item.line2}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
