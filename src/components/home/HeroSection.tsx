"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import BlurText from "@/components/ui/BlurText";

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative w-full pt-10 sm:pt-14 md:pt-16 pb-0 overflow-visible bg-white">
      {/* Soft atmospheric blue glow behind hero visual */}
      <div className="absolute top-1/4 right-0 sm:right-10 w-[550px] h-[420px] bg-gradient-to-bl from-blue-50/70 via-indigo-50/25 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center animate-hero-load">
          {/* LEFT COLUMN: Eyebrow, Display Heading, and Description */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-5 sm:space-y-6 z-10 text-left pt-2 lg:pt-0">
            {/* Eyebrow */}
            <div className="inline-block">
              <BlurText
                text="TRUSTED WORLDWIDE"
                delay={80}
                animateBy="letters"
                direction="top"
                stepDuration={0.3}
                className="text-[12px] sm:text-[13px] font-bold tracking-[0.24em] text-[#556987] uppercase select-none"
                as="span"
              />
            </div>

            {/* Display Heading matching reference - strictly 2 lines */}
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] 2xl:text-[58px] font-extrabold text-[#07152B] tracking-tight leading-[1.12]">
              <BlurText
                text="A Popular Choice"
                delay={120}
                animateBy="words"
                direction="top"
                stepDuration={0.4}
                className="block sm:whitespace-nowrap"
                as="h1"
              />
              <BlurText
                text="Among Businesses"
                delay={120}
                animateBy="words"
                direction="top"
                stepDuration={0.4}
                className="block sm:whitespace-nowrap mt-1 sm:mt-2"
                as="span"
              />
            </div>

            {/* Supporting Copy */}
            <BlurText
              text="Trusted by clients, partners, and communities for our quality, reliability, and real impact."
              delay={60}
              animateBy="words"
              direction="bottom"
              stepDuration={0.35}
              className="text-base sm:text-lg text-[#556987] leading-relaxed max-w-lg pt-1"
              as="p"
            />
          </div>

          {/* CENTER / RIGHT COLUMN: Woman on 3D Search Bar Podium with Handwritten Annotations */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-center">
            <div className="relative w-full max-w-[700px] flex flex-col items-center">
              
              {/* Decorative Handwritten Annotation 1: Left ("Searching for better ways to build") */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(6px)", y: -10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 sm:left-4 md:left-6 top-0 sm:top-4 z-30 select-none pointer-events-none transition-transform"
              >
                <Image
                  src="/images/hero/note_searching_transparent.png"
                  alt="Searching for better ways to build"
                  width={150}
                  height={130}
                  className="w-24 sm:w-32 md:w-36 h-auto drop-shadow-sm -rotate-6"
                  priority
                />
              </motion.div>

              {/* Decorative Handwritten Annotation 2: Right ("Real People Real Reviews") */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(6px)", y: -10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 sm:right-2 md:right-4 top-4 sm:top-8 z-30 select-none pointer-events-none transition-transform"
              >
                <Image
                  src="/images/hero/note_reviews_transparent.png"
                  alt="Real People Real Reviews"
                  width={120}
                  height={170}
                  className="w-20 sm:w-24 md:w-28 h-auto drop-shadow-sm rotate-6"
                  priority
                />
              </motion.div>

              {/* Main Visual: women.png (Woman sitting on 3D search bar podium with search button) */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 w-full flex items-center justify-center select-none"
              >
                <Image
                  src="/images/hero/women.png"
                  alt="Woman with laptop on XSPACEWEB technology partner search podium"
                  width={1651}
                  height={953}
                  className="w-full max-w-[680px] h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(7,21,43,0.1)]"
                  priority
                />
              </motion.div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
