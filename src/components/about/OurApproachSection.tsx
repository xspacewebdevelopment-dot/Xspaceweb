"use client";

import React from "react";
import { Users, Target, Compass, Zap } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface ApproachItem {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
}

const approachItems: ApproachItem[] = [
  {
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    iconBg: "bg-[#EBF3FE]",
    iconColor: "text-[#1668E8]",
    title: "Client-centric",
    subtitle: "Your goals come first",
  },
  {
    icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
    iconBg: "bg-[#E6FFFA]",
    iconColor: "text-[#0D9488]",
    title: "Strategy-driven",
    subtitle: "Every decision backed by insight",
  },
  {
    icon: <Compass className="w-5 h-5 sm:w-6 sm:h-6" />,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
    title: "Design-led",
    subtitle: "Visuals with purpose",
  },
  {
    icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
    iconBg: "bg-[#EFF6FF]",
    iconColor: "text-[#2563EB]",
    title: "Technology-powered",
    subtitle: "Scalable, secure, future-ready.",
  },
];

export const OurApproachSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-12 sm:py-16">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <span className="text-[12px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-2">
            OUR APPROACH
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#07152B] tracking-tight leading-tight mb-4">
            Built Around You.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            At XSW, we don&apos;t believe in one-size-fits-all solutions. We build{" "}
            <strong className="text-[#07152B] font-semibold">
              long-term partnerships
            </strong>{" "}
            by understanding your business deeply and delivering solutions that
            create measurable growth and meaningful user experiences.
          </p>
        </div>

        {/* 4 Pillars Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {approachItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-[#1668E8]/30 hover:shadow-md transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="text-base sm:text-[17px] font-bold text-[#07152B] leading-snug group-hover:text-[#1668E8] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
