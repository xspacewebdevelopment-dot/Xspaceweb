"use client";

import React from "react";
import Image from "next/image";
import { Shield, Cloud, Cpu, Clapperboard } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface VisionGoalCard {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  highlight: string;
  description: string;
}

const goals: VisionGoalCard[] = [
  {
    icon: <Shield className="w-6 h-6" />,
    iconBg: "bg-[#EFF6FF]",
    iconColor: "text-[#1668E8]",
    title: "Cyber Security",
    highlight: "Secure. Monitor. Defend.",
    description:
      "Proactive defense, real-time monitoring, and long-term security resilience.",
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    iconBg: "bg-[#E0F2FE]",
    iconColor: "text-[#0284C7]",
    title: "Cloud Computing",
    highlight: "Build. Scale. Perform.",
    description:
      "High-performance, secure and scalable cloud solutions for businesses of all sizes.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
    title: "Artificial Intelligence",
    highlight: "Think Smart. Work Smarter.",
    description:
      "Intelligent, ethical, and business-driven automation using proven development lifecycle.",
  },
  {
    icon: <Clapperboard className="w-6 h-6" />,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
    title: "XSW Studio",
    highlight: "Stories That Move.",
    description:
      "Our in-house PR, media, and cinematic production studio for brand shoots, product shoots, short films, and creative campaigns.",
  },
];

export const OurVisionGoalsSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-12 sm:py-16">
      <Container size="wide">
        {/* Top Header Row: Text on Left, Panoramic Mountain Climber Banner on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-14">
          <div className="lg:col-span-6">
            <span className="text-[12px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-3">
              OUR VISION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#07152B] tracking-tight leading-[1.18] mb-4">
              Our Vision & Future Goals
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              While today we empower businesses through websites, apps, and
              eCommerce, our vision goes far beyond. We are building a
              future-ready digital ecosystem with technology, creativity, and
              innovation at its core.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[16/8] sm:aspect-[16/7.5] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-900 group">
              <Image
                src="/images/about/vision_mountain.jpg"
                alt="Our Vision - Bigger Possibilities Ahead summit"
                fill
                className="object-cover object-[center_35%] group-hover:scale-105 transition-transform duration-700 ease-out"
                unoptimized
              />

              {/* Handwritten Annotation in code: "Bigger Possibilities Ahead" matching design reference */}
              <div className="absolute top-4 right-5 sm:top-6 sm:right-7 pointer-events-none z-10">
                <div
                  className="flex flex-col items-end text-[#1E293B] select-none drop-shadow-[0_1px_3px_rgba(255,255,255,0.85)]"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  <span className="text-2xl sm:text-3xl md:text-[32px] font-bold leading-[1.05] rotate-[-4deg] tracking-wide">
                    Bigger
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-[32px] font-bold leading-[1.05] rotate-[-2deg] tracking-wide">
                    Possibilities
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-[32px] font-bold leading-[1.05] rotate-[3deg] tracking-wide">
                    Ahead
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid (2 columns on mobile, responsive up to 4 on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-3.5 sm:p-7 border border-slate-100/90 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-[#1668E8]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${goal.iconBg} ${goal.iconColor} flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300 [&_svg]:w-5 [&_svg]:h-5 sm:[&_svg]:w-6 sm:[&_svg]:h-6`}
                >
                  {goal.icon}
                </div>
                <h3 className="text-sm sm:text-[19px] font-extrabold text-[#07152B] tracking-tight mb-1">
                  {goal.title}
                </h3>
                <p className="text-[11px] sm:text-sm font-semibold text-[#1668E8] mb-1.5 sm:mb-3">
                  {goal.highlight}
                </p>
                <p className="text-[11px] sm:text-sm text-slate-500 leading-relaxed">
                  {goal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
