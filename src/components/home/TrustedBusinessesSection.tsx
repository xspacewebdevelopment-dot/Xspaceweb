"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import BlurText from "@/components/ui/BlurText";
import { MechanicalKeycap } from "@/components/ui/MechanicalKeycap";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface BrandItem {
  name: string;
  brandColor: string;
  icon: React.ReactNode;
  industry: string;
}

interface BrandSlide {
  id: string;
  label: string;
  brands: BrandItem[];
}

const BRAND_SLIDES: BrandSlide[] = [
  {
    id: "slide-1",
    label: "Trusted Clients & Partners",
    brands: [
      {
        name: "Eclique",
        brandColor: "#028A7E",
        industry: "Branding & Web Development",
        icon: (
          <img
            src="/images/clientImages/Eclique-norm.png"
            alt="Eclique"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-full h-full object-contain p-0.5"
          />
        ),
      },
      {
        name: "Prahar Filing & Advisory",
        brandColor: "#0A7D8C",
        industry: "Corporate & GST Advisory",
        icon: (
          <img
            src="/images/clientImages/Prahar-norm.png"
            alt="Prahar Filing & Advisory"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-full h-full object-contain p-0.5"
          />
        ),
      },
      {
        name: "School Infra Solutions",
        brandColor: "#001B69",
        industry: "Education Infrastructure & CRM",
        icon: (
          <img
            src="/images/clientImages/SIS-norm.png"
            alt="School Infra Solutions"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-full h-full object-cover rounded-[8px]"
          />
        ),
      },
      {
        name: "Shiv Shambhu Group",
        brandColor: "#E11D48",
        industry: "Enterprise Group & Branding",
        icon: (
          <img
            src="/images/clientImages/SSG-norm.png"
            alt="Shiv Shambhu Group"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-full h-full object-contain p-0.5"
          />
        ),
      },
      {
        name: "AV CART",
        brandColor: "#0284C7",
        industry: "E-Commerce & Retail",
        icon: (
          <img
            src="/images/clientImages/AV-cart-norm.png"
            alt="AV CART"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-full h-full object-contain p-0.5"
          />
        ),
      },
      {
        name: "AproTrader",
        brandColor: "#000B76",
        industry: "Trading & EdTech Platform",
        icon: (
          <img
            src="/images/clientImages/Apro-norm.png"
            alt="AproTrader"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-full h-full object-contain p-0.5"
          />
        ),
      },
      {
        name: "B2T",
        brandColor: "#0066FF",
        industry: "Technology Consulting",
        icon: (
          <img
            src="/images/clientImages/B2T-norm.png"
            alt="B2T"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-full h-full object-contain p-0.5"
          />
        ),
      },
      {
        name: "Dravanta Nexus",
        brandColor: "#1E3A34",
        industry: "Agri-Business & Trade",
        icon: (
          <img
            src="/images/clientImages/Dravanat-Nexus-norm.png"
            alt="Dravanta Nexus"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-full h-full object-contain p-0.5"
          />
        ),
      },
      {
        name: "B2T Global",
        brandColor: "#38B6FF",
        industry: "Digital Solutions",
        icon: (
          <img
            src="/images/clientImages/B2T-1-norm.png"
            alt="B2T Global"
            loading="lazy"
            decoding="async"
            width={48}
            height={48}
            className="w-full h-full object-cover rounded-[8px]"
          />
        ),
      },
    ],
  },
];

export const TrustedBusinessesSection: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const currentSlide = BRAND_SLIDES[currentSlideIndex];

  const handleNext = () => {
    setSlideDirection(1);
    setCurrentSlideIndex((prev) => (prev + 1) % BRAND_SLIDES.length);
  };

  const handlePrev = () => {
    setSlideDirection(-1);
    setCurrentSlideIndex((prev) => (prev - 1 + BRAND_SLIDES.length) % BRAND_SLIDES.length);
  };

  const handleSelectSlide = (idx: number) => {
    setSlideDirection(idx > currentSlideIndex ? 1 : -1);
    setCurrentSlideIndex(idx);
  };

  return (
    <section id="clients" className="w-full bg-white text-slate-900 pt-16 sm:pt-20 pb-16 sm:pb-20 relative overflow-hidden">
      <Container size="wide" className="relative z-10">
        
        {/* Section Header with top-right 'View All Clients' button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            {/* Eyebrow with flanking lines */}
            <div className="inline-flex items-center gap-3 sm:gap-4 select-none">
              <span className="w-6 sm:w-10 h-[1.5px] bg-[#1668E8]/60" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#1668E8] uppercase">
                TRUSTED BY BUSINESSES
              </span>
              <span className="w-6 sm:w-10 h-[1.5px] bg-[#1668E8]/60" />
            </div>

            {/* Heading */}
            <BlurText
              text="Building Success Together"
              delay={100}
              animateBy="words"
              direction="top"
              stepDuration={0.4}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight leading-tight"
              as="h2"
            />

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
              We are proud to work with businesses, startups and organizations across India and beyond.
            </p>
          </div>

          {/* View All Clients Pill Button */}
          <div className="flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#1668E8] text-[#1668E8] font-semibold text-sm hover:bg-[#1668E8] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 group"
            >
              <span>View All Clients</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3D Keycaps Carousel Container */}
        <div className="relative w-full max-w-7xl mx-auto px-2 sm:px-4">
          
          {/* Left Arrow Button (if multiple slides) */}
          {BRAND_SLIDES.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous client partners"
              className="absolute left-0 sm:-left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-slate-700 hover:text-blue-600 focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Right Arrow Button (if multiple slides) */}
          {BRAND_SLIDES.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next client partners"
              className="absolute right-0 sm:-right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-slate-700 hover:text-blue-600 focus:outline-none"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Keycaps Grid with Animated Slicing Slide */}
          <div className="overflow-hidden py-4 sm:py-6 px-4 sm:px-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: slideDirection * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection * -60 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6"
              >
                {currentSlide.brands.map((brand) => (
                  <MechanicalKeycap
                    key={brand.name}
                    label=""
                    title={brand.name}
                    theme="light"
                    icon={brand.icon}
                    brandColor={brand.brandColor}
                    size="md"
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Indicators (only if multiple slides) */}
          {BRAND_SLIDES.length > 1 && (
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 mt-4 sm:mt-6">
              {BRAND_SLIDES.map((_, idx) => {
                const isActive = idx === currentSlideIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Jump to brand slide ${idx + 1}`}
                    onClick={() => handleSelectSlide(idx)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-8 sm:w-10 bg-[#1668E8]"
                        : "w-5 sm:w-6 bg-slate-200 hover:bg-slate-300"
                    }`}
                  />
                );
              })}
            </div>
          )}

        </div>

      </Container>
    </section>
  );
};
