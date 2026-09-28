"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { ProjectModal } from "@/components/shared/ProjectModal";

interface ServicesHeroSectionProps {
  onGetStarted?: (email?: string) => void;
}

export const ServicesHeroSection: React.FC<ServicesHeroSectionProps> = ({ onGetStarted }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    if (onGetStarted) {
      onGetStarted(email);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section className="relative w-full min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] xl:min-h-[820px] flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 overflow-hidden select-none">
        {/* Full-bleed Photo Background: Windows XP Bliss Landscape with Retro CRT Monitor & Wildflowers */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/services/services_hero_hills.jpg"
            alt="Digital Solutions Landscape with Retro Computer"
            fill
            priority
            unoptimized
            className="object-cover object-[center_35%] lg:object-[center_30%]"
          />

          {/* Gentle Sky Sunlight Glow Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/30" />

          {/* Bottom misty white fade to seamlessly merge into the next section */}
          <div className="absolute bottom-0 inset-x-0 h-32 sm:h-40 md:h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </div>

        {/* HERO CENTER CONTENT */}
        <Container size="wide" className="relative z-10 my-auto text-center flex flex-col items-center">
          {/* Top Social Proof Pill Badge: 3 Overlapping Avatars + 7,000+ Businesses Growing */}
          <div className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/25 shadow-lg mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
            {/* 3 Circular Avatar Stack */}
            <div className="flex items-center -space-x-2">
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image
                  src="/images/services/avatar1.jpg"
                  alt="Client Avatar 1"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image
                  src="/images/services/avatar2.jpg"
                  alt="Client Avatar 2"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image
                  src="/images/services/avatar3.jpg"
                  alt="Client Avatar 3"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            {/* Social Proof Counter Text */}
            <span className="text-[12px] sm:text-[13px] md:text-[14px] font-medium text-white tracking-tight drop-shadow-sm">
              7,000+ businesses already growing with us
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-white tracking-tight leading-[1.12] max-w-4xl mx-auto drop-shadow-md">
            Digital Solutions for a <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#00D2FF] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(56,189,248,0.6)]">
              Brighter Tomorrow
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow">
            From strategy and design to development and marketing — we provide end-to-end digital services that help your business build, grow and stay ahead.
          </p>

          {/* Email Subscription & Get Started CTA Pill */}
          <div className="w-full max-w-md sm:max-w-lg mt-7 sm:mt-9">
            <form
              onSubmit={handleSubmit}
              className="relative p-1 sm:p-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/35 shadow-[0_12px_36px_rgba(0,0,0,0.25)] flex items-center justify-between gap-2 transition-all duration-300 hover:bg-white/25 focus-within:ring-2 focus-within:ring-white/60 focus-within:bg-white/30"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                required
                className="w-full bg-transparent px-4 sm:px-6 py-2.5 sm:py-3 text-white placeholder-white/75 text-xs sm:text-sm md:text-[15px] font-medium focus:outline-none"
              />
              <button
                type="submit"
                className="flex-shrink-0 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white text-[#07152B] font-bold text-xs sm:text-sm hover:bg-slate-100 active:scale-[0.98] transition-all duration-200 shadow-md flex items-center gap-1.5 sm:gap-2 cursor-pointer group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#07152B] transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </Container>

        {/* Floating Quick Feature Highlights */}
        <div className="relative z-10 hidden md:block max-w-6xl mx-auto w-full px-6 mt-6">
          <div className="flex items-center justify-center gap-8 lg:gap-12 text-white/80 text-xs sm:text-[13px] font-medium drop-shadow">
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/15">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full-Stack Development</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/15">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>UI/UX & Brand Design</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/15">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>Performance Marketing & SEO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Proposal Popup Modal */}
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
