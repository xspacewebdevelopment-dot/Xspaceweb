"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { reviewPlatforms } from "@/components/home/RatingsStrip";

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || (typeof window !== "undefined" && window.innerWidth < 768)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8; // -4 to +4 px
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6; // -3 to +3 px
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full pt-8 sm:pt-12 md:pt-14 pb-8 sm:pb-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(110deg, #ffffff 0%, #ffffff 28%, #f7fbff 48%, #eef7ff 72%, #f7fbff 100%)",
      }}
    >
      {/* 
        ORGANIC ATMOSPHERE LAYERS:
        Smooth, non-rectangular blurred radial gradients blending across the entire section
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 72% 30%, rgba(54, 153, 255, 0.18), transparent 32%),
            radial-gradient(circle at 92% 45%, rgba(110, 190, 255, 0.10), transparent 30%),
            radial-gradient(circle at 35% 90%, rgba(60, 130, 255, 0.04), transparent 38%)
          `,
        }}
        aria-hidden="true"
      />

      {/* ORGANIC CURVED SVG BACKGROUND LINES & SHAPES */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -100 250 C 300 200, 600 480, 1200 220 C 1450 120, 1700 320, 2000 180"
          fill="none"
          stroke="rgba(80, 150, 255, 0.08)"
          strokeWidth="1.2"
        />
        <path
          d="M 200 -50 C 450 180, 800 200, 1100 -20 C 1350 -180, 1650 100, 1900 50"
          fill="none"
          stroke="rgba(80, 150, 255, 0.06)"
          strokeWidth="1"
        />
        <circle
          cx="82%"
          cy="32%"
          r="280"
          fill="none"
          stroke="rgba(80, 150, 255, 0.05)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <circle
          cx="82%"
          cy="32%"
          r="420"
          fill="none"
          stroke="rgba(80, 150, 255, 0.035)"
          strokeWidth="1"
        />
      </svg>

      {/* LARGE SOFT HALO BEHIND WOMAN (Centered around upper body & head) */}
      <motion.div
        style={{
          background:
            "radial-gradient(circle, rgba(105, 185, 255, 0.18) 0%, rgba(130, 200, 255, 0.08) 38%, transparent 70%)",
          filter: "blur(60px)",
          ...(shouldReduceMotion
            ? {}
            : {
                x: -mousePos.x * 0.5,
                y: -mousePos.y * 0.5,
              }),
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="hidden sm:block absolute top-10 right-8 sm:right-16 lg:right-28 w-[580px] sm:w-[680px] h-[480px] sm:h-[560px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* MAIN CONTAINER */}
      <Container size="wide" className="relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-2 items-center min-h-[460px] sm:min-h-[500px] lg:min-h-[530px]">
          
          {/* LEFT COLUMN: Eyebrow, Display Heading, and Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4 sm:space-y-5 z-20 text-left pt-1 lg:pt-0">
            {/* 1. Eyebrow */}
            <div className="inline-flex items-center gap-2 hero-critical-text">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2957E8]" />
              <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.20em] text-[#2957E8] uppercase select-none">
                TRUSTED WORLDWIDE
              </span>
            </div>

            {/* 2. Display Heading */}
            <h1 className="text-3xl sm:text-4.5xl md:text-5xl lg:text-[46px] xl:text-[54px] 2xl:text-[56px] font-extrabold text-[#07152B] tracking-tight leading-[1.14] max-w-[600px] hero-critical-text">
              <span className="block">A Popular Choice</span>
              <span className="bg-gradient-to-r from-[#2957E8] via-[#1E6BFF] to-[#1693FF] bg-clip-text text-transparent inline-block mt-1 sm:mt-1.5 pb-2 -mb-2 pr-1">
                Among Businesses
              </span>
            </h1>

            {/* 3. Supporting Copy */}
            <p className="text-base sm:text-lg text-[#556987] leading-relaxed max-w-[570px] font-normal pt-0.5 hero-critical-text">
              Trusted by clients, partners, and communities for our quality, reliability, and real impact.
            </p>
          </div>

          {/* 
            RIGHT COLUMN: 
            Woman sitting on the large double-shelled Search Bar podium, 
            with balanced handwritten annotations & floating badges
          */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center lg:pl-0">
            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : {
                      x: mousePos.x,
                      y: mousePos.y,
                    }
              }
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="relative w-full max-w-[760px] flex flex-col items-center select-none"
            >
              {/* Handwritten Annotation 1: Left ("Searching for better ways to build") */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1 sm:left-2 md:left-2 top-0 sm:top-2 z-30 select-none pointer-events-none transition-transform -rotate-6"
              >
                <Image
                  src="/images/hero/note_searching_transparent.webp"
                  alt="Searching for better ways to build"
                  width={150}
                  height={130}
                  className="w-20 sm:w-28 md:w-36 h-auto drop-shadow-sm"
                />
              </motion.div>

              {/* Handwritten Annotation 2: Right ("Real People Real Reviews") */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-2 sm:right-6 md:right-14 top-1 sm:top-6 md:top-14 z-30 select-none pointer-events-none transition-transform rotate-6"
              >
                <Image
                  src="/images/hero/note_reviews_transparent.webp"
                  alt="Real People Real Reviews"
                  width={120}
                  height={170}
                  className="w-16 sm:w-22 md:w-28 h-auto drop-shadow-sm"
                />
              </motion.div>

              {/* Floating Signal 1: Verified Badge (Desktop only) */}
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:block absolute -left-1 sm:left-1 md:left-3 top-[38%] sm:top-[42%] z-30 select-none pointer-events-auto"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, -4, 0],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 6.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                >
                  <div className="w-[185px] sm:w-[195px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-[20px] bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_18px_45px_rgba(24,70,130,0.10)] transition-transform hover:scale-105">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#2957E8] flex-shrink-0">
                      <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12.5px] font-bold text-[#07152B] leading-none">
                          Verified
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      </div>
                      <p className="text-[10.5px] text-[#556987] font-medium leading-tight mt-0.5 truncate">
                        Trusted by businesses
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Signal 2: Rating Pill Badge (Desktop only) */}
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:block absolute right-12 sm:right-24 md:right-32 top-2 sm:top-5 z-30 select-none pointer-events-auto"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, 4, 0],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 7.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                >
                  <div className="h-[42px] sm:h-[46px] inline-flex items-center gap-2 px-4 sm:px-5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_14px_35px_rgba(24,70,130,0.10)] transition-transform hover:scale-105">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FF7A00] text-[#FF7A00]" />
                      ))}
                    </div>
                    <span className="text-[13px] sm:text-[14px] font-black text-[#07152B] tracking-tight">
                      4.9
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Signal 3: Happy Clients Badge (Desktop only) */}
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:block absolute -right-1 sm:right-1 md:right-3 top-[46%] sm:top-[50%] z-30 select-none pointer-events-auto"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: [0, -4, 0],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 6.0,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                >
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[20px] bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_18px_45px_rgba(24,70,130,0.10)] transition-transform hover:scale-105">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gradient-to-tr from-blue-600 to-indigo-500 text-white text-[9px] font-bold flex items-center justify-center">
                        AK
                      </div>
                      <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gradient-to-tr from-sky-500 to-cyan-400 text-white text-[9px] font-bold flex items-center justify-center">
                        SM
                      </div>
                      <div className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gradient-to-tr from-emerald-500 to-teal-400 text-white text-[9px] font-bold flex items-center justify-center">
                        RD
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="text-[13px] font-extrabold text-[#07152B] leading-none block">
                        500+
                      </span>
                      <span className="text-[10px] text-[#556987] font-medium leading-none block mt-0.5">
                        Happy Clients
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Main Visual: women.webp (Woman sitting on 3D search bar podium) */}
              <div className="relative w-full flex items-center justify-center pt-2 sm:pt-4">
                <div className="relative z-20 w-full flex items-center justify-center">
                  <picture className="w-full max-w-[680px] sm:max-w-[720px] flex items-center justify-center">
                    <source media="(max-width: 640px)" srcSet="/images/hero/women-mobile.webp" type="image/webp" />
                    <img
                      src="/images/hero/women.webp"
                      alt="Woman with laptop on XSPACEWEB technology partner search podium"
                      width={1200}
                      height={693}
                      fetchPriority="high"
                      decoding="async"
                      className="w-full max-w-[680px] sm:max-w-[720px] h-auto object-contain filter sm:drop-shadow-[0_24px_50px_rgba(20,60,130,0.12)]"
                    />
                  </picture>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 
          TRUST REVIEW PANEL:
          Slightly overlaps the bottom of the hero atmosphere (negative margin) for seamless integration
        */}
        <motion.div
          initial={false}
          className="w-full -mt-4 sm:-mt-8 md:-mt-10 rounded-[30px] sm:rounded-[34px] p-5 sm:p-7 lg:p-7.5 relative z-20 hero-critical-text trust-panel"
          style={{
            background: "rgba(255, 255, 255, 0.94)",
            border: "1px solid rgba(255, 255, 255, 0.80)",
            boxShadow: "0 25px 80px rgba(48, 95, 160, 0.08)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
            {/* Column 1: Intro Heading & Subtitle */}
            <div className="lg:col-span-3 pr-0 lg:pr-5 lg:border-r border-[rgba(40,80,130,0.12)]">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#07152B] tracking-tight leading-snug">
                Loved by businesses
                <br className="hidden sm:inline" /> worldwide.
              </h2>
              <p className="text-xs sm:text-sm text-[#556987] mt-1.5 font-normal">
                Real feedback. Real impact.
              </p>
            </div>

            {/* Column 2-5: Review Cards (Clutch, Trustpilot, Google, Upwork) */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
              {reviewPlatforms.map((platform) => (
                <motion.div
                  key={platform.id}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -3,
                          transition: { type: "spring", stiffness: 260, damping: 22 },
                        }
                  }
                  className="rounded-[20px] p-4.5 sm:p-5 flex flex-col justify-between space-y-3 transition-colors hover:border-[#1668E8]/20 select-none group/card"
                  style={{
                    background: "rgba(255, 255, 255, 0.78)",
                    border: "1px solid rgba(50, 100, 160, 0.06)",
                  }}
                >
                  {/* Top row: Platform logo + Rating score */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="h-6 flex items-center">{platform.logo}</div>
                    <span className="text-2xl font-black text-[#07152B] tracking-tight group-hover/card:text-[#2957E8] transition-colors">
                      {platform.rating}
                    </span>
                  </div>

                  {/* Middle row: 5 Stars */}
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${platform.rating} out of 5 stars`}
                  >
                    {[...Array(platform.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#FF7A00] text-[#FF7A00]"
                      />
                    ))}
                  </div>

                  {/* Bottom row: Caption */}
                  <p className="text-xs text-[#556987] font-medium leading-tight">
                    {platform.caption}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>

      {/* 
        ATMOSPHERIC BOTANICAL CORNER OVERLAYS:
        Soft blurred foreground/background corner leaves creeping into frame from the outer corners.
        Layered under the review panel card (z-10 vs review card z-20) with graceful edge crop.
      */}
      {/* Bottom-Left Plant 1 */}
      <div
        className="hidden sm:block pointer-events-none select-none absolute bottom-0 sm:bottom-2 md:bottom-3 lg:bottom-4 -left-4 sm:-left-6 md:-left-8 lg:-left-10 z-10 w-[200px] sm:w-[270px] md:w-[330px] lg:w-[400px] xl:w-[440px] aspect-square"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse at bottom left, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)",
          maskImage: "radial-gradient(ellipse at bottom left, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)",
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/hero/plant1.webp"
          alt=""
          width={600}
          height={600}
          loading="lazy"
          className="w-full h-full object-contain filter blur-[1px] sm:blur-[1.5px] opacity-70 sm:opacity-75 lg:opacity-80 scale-100 transform-gpu origin-bottom-left"
        />
      </div>

      {/* Bottom-Right Plant 2 */}
      <div
        className="hidden sm:block pointer-events-none select-none absolute bottom-0 sm:bottom-2 md:bottom-3 lg:bottom-4 -right-4 sm:-right-6 md:-right-8 lg:-right-10 z-10 w-[200px] sm:w-[270px] md:w-[330px] lg:w-[400px] xl:w-[440px] aspect-square"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse at bottom right, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)",
          maskImage: "radial-gradient(ellipse at bottom right, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 95%)",
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/hero/plant2.webp"
          alt=""
          width={600}
          height={600}
          loading="lazy"
          className="w-full h-full object-contain filter blur-[1px] sm:blur-[1.5px] opacity-70 sm:opacity-75 lg:opacity-80 scale-100 transform-gpu origin-bottom-right"
        />
      </div>
    </section>
  );
};
