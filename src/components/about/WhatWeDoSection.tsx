"use client";

import Link from "next/link";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  TrendingUp,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface ServiceItem {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    icon: <Globe className="w-6 h-6" />,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#6366F1]",
    title: "Website & Web Application Development",
    description: "Modern, scalable and high-performance web solutions.",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    iconBg: "bg-[#E0F2FE]",
    iconColor: "text-[#0284C7]",
    title: "Mobile App Development",
    description: "Powerful mobile experiences for Android & iOS.",
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    iconBg: "bg-[#E6FFFA]",
    iconColor: "text-[#0D9488]",
    title: "E-Commerce Solutions",
    description: "End-to-end online store development & integration.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    iconBg: "bg-[#FFF1F2]",
    iconColor: "text-[#E11D48]",
    title: "Digital Marketing & Performance Growth",
    description: "Strategy-driven marketing that delivers real results.",
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    iconBg: "bg-[#EFF6FF]",
    iconColor: "text-[#2563EB]",
    title: "Marketplace Management",
    description: "Amazon, Flipkart, Meesho, Snapdeal, eBay and more.",
  },
];

export const WhatWeDoSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-8 sm:py-12">
      <Container size="wide">
        {/* Soft rounded card enclosure matching reference */}
        <div className="w-full rounded-3xl bg-gradient-to-b from-[#F9FBFF] to-[#F1F5FD] border border-slate-100/80 p-6 sm:p-10 lg:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          {/* Section Header */}
          <div className="max-w-3xl mb-8 sm:mb-10">
            <span className="text-[12px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-2">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07152B] tracking-tight leading-tight mb-3">
              What We Do Today
            </h2>
            <div className="text-slate-600 text-sm sm:text-[15px] leading-relaxed space-y-1">
              <p>
                We specialize in building end-to-end digital ecosystems for
                brands and businesses.
              </p>
              <p>
                We create custom digital strategies that align with your goals,
                timelines, and budgets — ensuring not just presence, but
                performance.
              </p>
            </div>
          </div>

          {/* 5 Service Cards Grid (2 columns on mobile, responsive up to 5 on desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5">
            {services.map((item, index) => (
              <Link
                key={index}
                href="/services"
                className="bg-white rounded-2xl p-3.5 sm:p-6 border border-slate-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-[#1668E8]/30 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Circular Icon Container */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300 [&_svg]:w-5 [&_svg]:h-5 sm:[&_svg]:w-6 sm:[&_svg]:h-6`}
                  >
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-[17px] font-bold text-[#07152B] leading-snug mb-1.5 sm:mb-2 group-hover:text-[#1668E8] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] sm:text-sm text-slate-500 leading-relaxed mb-2.5 sm:mb-0">
                    {item.description}
                  </p>
                </div>

                {/* Learn More link */}
                <div className="pt-2 sm:pt-4 mt-auto">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold text-[#1668E8] group-hover:text-[#1255c4] transition-colors">
                    Learn More{" "}
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
