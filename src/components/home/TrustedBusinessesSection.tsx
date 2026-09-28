"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import BlurText from "@/components/ui/BlurText";
import { MechanicalKeycap } from "@/components/ui/MechanicalKeycap";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import {
  SiPaytm,
  SiZomato,
  SiSwiggy,
  SiGooglecloud,
  SiStripe,
  SiSpotify,
  SiNetflix,
  SiShopify,
  SiGithub,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

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
    label: "India & Global Enterprises",
    brands: [
      {
        name: "TATA",
        brandColor: "#004F9F",
        industry: "Conglomerate",
        icon: (
          <div className="flex flex-col items-center justify-center select-none w-full px-1">
            <span className="font-black text-[#004F9F] text-xs sm:text-sm tracking-widest uppercase">
              TATA
            </span>
          </div>
        ),
      },
      {
        name: "Reliance",
        brandColor: "#D32F2F",
        industry: "Conglomerate",
        icon: (
          <div className="flex flex-col items-center justify-center select-none w-full px-1">
            <span className="font-serif font-bold text-[#D32F2F] text-xs sm:text-sm tracking-tight">
              Reliance
            </span>
          </div>
        ),
      },
      {
        name: "Infosys",
        brandColor: "#007CC3",
        industry: "IT Services",
        icon: (
          <div className="flex items-center justify-center select-none w-full px-1">
            <span className="font-sans font-extrabold text-[#007CC3] text-xs sm:text-sm tracking-tight">
              Infosys
            </span>
          </div>
        ),
      },
      {
        name: "Amazon",
        brandColor: "#FF9900",
        industry: "E-Commerce & Cloud",
        icon: (
          <div className="flex flex-col items-center justify-center select-none w-full px-1">
            <span className="font-extrabold text-[#141920] text-xs sm:text-sm tracking-tighter">
              amazon<span className="text-[#FF9900] text-sm leading-none">.in</span>
            </span>
            <div className="w-6 h-[2px] bg-[#FF9900] rounded-full -mt-0.5" />
          </div>
        ),
      },
      {
        name: "Flipkart",
        brandColor: "#2874F0",
        industry: "E-Commerce",
        icon: (
          <div className="flex items-center gap-1 select-none w-full justify-center px-1">
            <span className="w-3.5 h-3.5 rounded bg-[#FCEB00] text-[#2874F0] flex items-center justify-center font-black text-[9px]">f</span>
            <span className="font-bold italic text-[#2874F0] text-xs sm:text-sm tracking-tight">
              Flipkart
            </span>
          </div>
        ),
      },
      {
        name: "BYJU'S",
        brandColor: "#813588",
        industry: "EdTech",
        icon: (
          <div className="flex items-center justify-center select-none w-full px-1">
            <span className="font-black text-[#813588] text-xs sm:text-sm tracking-tight">
              BYJU&apos;S
            </span>
          </div>
        ),
      },
      {
        name: "OYO",
        brandColor: "#EE2E24",
        industry: "Hospitality",
        icon: (
          <div className="px-2 py-0.5 rounded bg-[#EE2E24] text-white font-black text-xs sm:text-sm tracking-wider select-none">
            OYO
          </div>
        ),
      },
      {
        name: "Paytm",
        brandColor: "#00BAF2",
        industry: "Fintech",
        icon: (
          <span className="font-black text-[#002E6E] text-xs sm:text-sm tracking-tight select-none flex items-center">
            pay<span className="text-[#00BAF2]">tm</span>
          </span>
        ),
      },
      {
        name: "Zomato",
        brandColor: "#E23744",
        industry: "Food Delivery",
        icon: (
          <span className="font-black italic text-[#E23744] text-xs sm:text-sm tracking-tight select-none">
            zomato
          </span>
        ),
      },
      {
        name: "Swiggy",
        brandColor: "#FC8019",
        industry: "Quick Commerce",
        icon: (
          <div className="flex items-center gap-0.5 select-none justify-center">
            <SiSwiggy className="text-[#FC8019] text-base sm:text-lg" />
            <span className="font-extrabold text-[#FC8019] text-[10px] sm:text-xs tracking-tight">
              swiggy
            </span>
          </div>
        ),
      },
    ],
  },
  {
    id: "slide-2",
    label: "Fintech & Digital Leaders",
    brands: [
      {
        name: "CRED",
        brandColor: "#00E5A3",
        industry: "Fintech",
        icon: (
          <div className="px-1.5 py-0.5 rounded bg-slate-900 border border-[#00E5A3]/50 select-none">
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00E5A3] to-[#38BDF8] tracking-widest text-[10px] sm:text-xs">
              CRED
            </span>
          </div>
        ),
      },
      {
        name: "PhonePe",
        brandColor: "#5F259F",
        industry: "UPI & Payments",
        icon: (
          <div className="flex items-center gap-1 select-none">
            <div className="w-3.5 h-3.5 rounded-full bg-[#5F259F] text-white flex items-center justify-center font-bold text-[8px]">
              पे
            </div>
            <span className="font-bold text-[#5F259F] text-[11px] sm:text-xs">PhonePe</span>
          </div>
        ),
      },
      {
        name: "Razorpay",
        brandColor: "#00BAF2",
        industry: "Payment Gateway",
        icon: (
          <div className="flex items-center gap-0.5 select-none">
            <span className="font-extrabold text-[#0C2340] text-[10px] sm:text-xs">Razor</span>
            <span className="font-extrabold text-[#00BAF2] text-[10px] sm:text-xs">pay</span>
          </div>
        ),
      },
      {
        name: "Zerodha",
        brandColor: "#387ED1",
        industry: "Fintech / Brokerage",
        icon: (
          <span className="font-bold text-[#387ED1] text-[10px] sm:text-xs tracking-wider">
            ZERODHA
          </span>
        ),
      },
      {
        name: "MakeMyTrip",
        brandColor: "#EB2026",
        industry: "Online Travel",
        icon: (
          <span className="font-extrabold text-[#EB2026] text-[10px] sm:text-xs select-none">
            make<span className="text-[#0084FF]">my</span>trip
          </span>
        ),
      },
      {
        name: "Nykaa",
        brandColor: "#FC2779",
        industry: "Beauty & Fashion",
        icon: (
          <span className="font-black text-[#FC2779] text-xs sm:text-sm tracking-wider select-none">
            NYKAA
          </span>
        ),
      },
      {
        name: "Zepto",
        brandColor: "#E00085",
        industry: "10-Min Grocery",
        icon: (
          <span className="font-black text-[#540075] text-xs sm:text-sm select-none">
            z<span className="text-[#E00085]">epto</span>
          </span>
        ),
      },
      {
        name: "Urban Company",
        brandColor: "#6E3CBC",
        industry: "Home Services",
        icon: (
          <div className="flex items-center gap-1 select-none max-w-full">
            <div className="w-4 h-4 rounded bg-[#6E3CBC] text-white flex items-center justify-center font-black text-[8px] flex-shrink-0">
              UC
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="font-bold text-[#1E293B] text-[8px] sm:text-[9px]">Urban</span>
              <span className="font-bold text-[#6E3CBC] text-[8px] sm:text-[9px]">Company</span>
            </div>
          </div>
        ),
      },
      {
        name: "Delhivery",
        brandColor: "#E31837",
        industry: "Logistics",
        icon: (
          <div className="flex flex-col items-center select-none max-w-full">
            <span className="font-black text-[#E31837] text-[9px] sm:text-[10px] tracking-wider">
              DELHIVERY
            </span>
            <div className="w-full h-[1.5px] bg-[#E31837] rounded-full mt-0.5" />
          </div>
        ),
      },
      {
        name: "PolicyBazaar",
        brandColor: "#0055A5",
        industry: "InsurTech",
        icon: (
          <div className="flex items-center select-none max-w-full">
            <span className="font-extrabold text-[#0055A5] text-[9px] sm:text-[10px]">policy</span>
            <span className="font-extrabold text-[#FF5A00] text-[9px] sm:text-[10px]">bazaar</span>
          </div>
        ),
      },
    ],
  },
  {
    id: "slide-3",
    label: "Enterprise Conglomerates",
    brands: [
      {
        name: "TCS",
        brandColor: "#004F9F",
        industry: "IT & Consulting",
        icon: (
          <div className="flex items-center gap-0.5 select-none">
            <span className="font-black text-[#004F9F] text-xs sm:text-sm uppercase tracking-tight">tcs</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E83A3A]" />
          </div>
        ),
      },
      {
        name: "Wipro",
        brandColor: "#582C83",
        industry: "IT & Cloud",
        icon: (
          <div className="flex flex-col items-center select-none">
            <div className="flex gap-0.5 mb-0.5">
              <span className="w-1 h-1 rounded-full bg-[#00B050]" />
              <span className="w-1 h-1 rounded-full bg-[#FFC000]" />
              <span className="w-1 h-1 rounded-full bg-[#FF0000]" />
              <span className="w-1 h-1 rounded-full bg-[#0070C0]" />
            </div>
            <span className="font-bold text-[#582C83] text-[10px] sm:text-xs tracking-tight">wipro</span>
          </div>
        ),
      },
      {
        name: "HCL Tech",
        brandColor: "#005EB8",
        industry: "Technology",
        icon: <span className="font-black text-[#005EB8] text-xs sm:text-sm">HCL</span>,
      },
      {
        name: "Airtel",
        brandColor: "#E40000",
        industry: "Telecom & Cloud",
        icon: <span className="font-extrabold text-[#E40000] text-xs sm:text-sm">airtel</span>,
      },
      {
        name: "Jio",
        brandColor: "#0A2885",
        industry: "Digital Services",
        icon: (
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#E31837] text-white flex items-center justify-center font-black text-[10px] sm:text-xs">
            Jio
          </div>
        ),
      },
      {
        name: "Mahindra",
        brandColor: "#E31837",
        industry: "Mobility & Tech",
        icon: <span className="font-bold text-[#E31837] text-[10px] sm:text-xs">Mahindra</span>,
      },
      {
        name: "Adani",
        brandColor: "#00838F",
        industry: "Infra & Energy",
        icon: (
          <div className="flex items-center gap-0.5 select-none">
            <span className="font-bold text-[#1B365D] text-[10px] sm:text-xs">adani</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00838F]" />
          </div>
        ),
      },
      {
        name: "L&T",
        brandColor: "#003A70",
        industry: "Engineering & Tech",
        icon: (
          <div className="px-1.5 py-0.5 rounded bg-[#003A70] text-white font-black text-[10px] sm:text-xs select-none">
            L&amp;T
          </div>
        ),
      },
      {
        name: "Ola",
        brandColor: "#84CC16",
        industry: "Electric Mobility",
        icon: (
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#84CC16]/20 border border-[#84CC16]/50 select-none">
            <div className="w-2 h-2 rounded-full bg-[#84CC16]" />
            <span className="font-black text-[#1E293B] text-[10px] sm:text-xs">OLA</span>
          </div>
        ),
      },
      {
        name: "BigBasket",
        brandColor: "#84C225",
        industry: "Retail & Commerce",
        icon: (
          <div className="flex items-center select-none">
            <span className="font-extrabold text-[#84C225] text-[9px] sm:text-[10px]">big</span>
            <span className="font-extrabold text-[#E23744] text-[9px] sm:text-[10px]">basket</span>
          </div>
        ),
      },
    ],
  },
  {
    id: "slide-4",
    label: "Global Technology Ecosystem",
    brands: [
      {
        name: "Google Cloud",
        brandColor: "#4285F4",
        industry: "Cloud & AI",
        icon: <SiGooglecloud className="text-[#4285F4] text-2xl sm:text-3xl" />,
      },
      {
        name: "AWS",
        brandColor: "#FF9900",
        industry: "Cloud Infrastructure",
        icon: <FaAws className="text-[#FF9900] text-2xl sm:text-3xl" />,
      },
      {
        name: "Stripe",
        brandColor: "#635BFF",
        industry: "Global Payments",
        icon: <SiStripe className="text-[#635BFF] text-2xl sm:text-3xl" />,
      },
      {
        name: "Shopify",
        brandColor: "#7AB55C",
        industry: "Commerce Platform",
        icon: <SiShopify className="text-[#7AB55C] text-2xl sm:text-3xl" />,
      },
      {
        name: "Spotify",
        brandColor: "#1DB954",
        industry: "Media Streaming",
        icon: <SiSpotify className="text-[#1DB954] text-2xl sm:text-3xl" />,
      },
      {
        name: "Netflix",
        brandColor: "#E50914",
        industry: "Entertainment",
        icon: <SiNetflix className="text-[#E50914] text-2xl sm:text-3xl" />,
      },
      {
        name: "GitHub",
        brandColor: "#8A2BE2",
        industry: "Developer Platform",
        icon: <SiGithub className="text-[#8A2BE2] text-2xl sm:text-3xl" />,
      },
      {
        name: "TATA",
        brandColor: "#004F9F",
        industry: "Conglomerate",
        icon: (
          <span className="font-black text-[#004F9F] text-xs sm:text-sm tracking-widest uppercase">
            TATA
          </span>
        ),
      },
      {
        name: "Reliance",
        brandColor: "#D32F2F",
        industry: "Conglomerate",
        icon: (
          <span className="font-serif font-bold text-[#D32F2F] text-xs sm:text-sm tracking-tight">
            Reliance
          </span>
        ),
      },
      {
        name: "Infosys",
        brandColor: "#007CC3",
        industry: "IT Services",
        icon: (
          <span className="font-sans font-extrabold text-[#007CC3] text-xs sm:text-sm tracking-tight">
            Infosys
          </span>
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
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous client partners"
            className="absolute left-0 sm:-left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-slate-700 hover:text-blue-600 focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next client partners"
            className="absolute right-0 sm:-right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-slate-700 hover:text-blue-600 focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Keycaps Grid with Animated Slicing Slide */}
          <div className="overflow-hidden py-4 sm:py-6 px-8 sm:px-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: slideDirection * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection * -60 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-y-6 gap-x-2 sm:gap-x-4 items-end justify-items-center"
              >
                {currentSlide.brands.map((brand) => (
                  <MechanicalKeycap
                    key={brand.name}
                    label=""
                    theme="light"
                    icon={brand.icon}
                    brandColor={brand.brandColor}
                    size="md"
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Indicators (4 Slices) */}
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

        </div>

      </Container>
    </section>
  );
};
