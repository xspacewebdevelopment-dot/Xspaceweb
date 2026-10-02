"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/shared/ui/Container";
import { LetterSwap3D } from "@/components/ui/3d-letter-swap";

export const StudioXSWSection: React.FC = () => {
  return (
    <section className="w-full bg-white text-slate-900 py-12 sm:py-16 relative overflow-hidden">
      <Container size="wide" className="space-y-4 sm:space-y-6">
        
        {/* ROW 1: 2 Wide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {/* Card 1: Cinematic Man facing warm orange neon light with blue shadows */}
          <div className="relative group overflow-hidden rounded-[24px] sm:rounded-[28px] h-[260px] sm:h-[320px] md:h-[360px] bg-slate-900 border border-slate-200/80 shadow-xl">
            <Image
              src="/images/studio/cinematic_man.jpg"
              alt="Studio XSW Creative Portraiture"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30" />

            {/* Top Left Branding Overlay: Studio XSW © with 3D Letter Swap */}
            <div className="absolute top-5 left-6 z-10 flex items-center gap-2">
              <span className="text-white text-sm sm:text-base font-bold tracking-tight select-none drop-shadow-md flex items-center gap-1.5">
                <LetterSwap3D label="Studio" className="font-bold text-white" />
                <LetterSwap3D label="XSW" className="font-extrabold text-blue-400" />
                <span>©</span>
              </span>
            </div>
          </div>

          {/* Card 2: Abstract 3D Sphere Sculpture with Dramatic Lighting */}
          <div className="relative group overflow-hidden rounded-[24px] sm:rounded-[28px] h-[260px] sm:h-[320px] md:h-[360px] bg-slate-900 border border-slate-200/80 shadow-xl">
            <Image
              src="/images/studio/abstract_sphere.jpg"
              alt="Studio XSW 3D Sculpture Art"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          </div>
        </div>

        {/* ROW 2: 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
          {/* Card 3: Broad Windswept Woman Sunlight Portrait */}
          <div className="relative group overflow-hidden rounded-[24px] sm:rounded-[28px] h-[240px] sm:h-[290px] md:h-[320px] bg-slate-900 border border-slate-200/80 shadow-xl">
            <Image
              src="/images/studio/portrait_woman.jpg"
              alt="Studio XSW Editorial Fashion Portrait"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          </div>

          {/* Card 4: Pilates Reformer Sunbeam Silhouette */}
          <div className="relative group overflow-hidden rounded-[24px] sm:rounded-[28px] h-[240px] sm:h-[290px] md:h-[320px] bg-slate-900 border border-slate-200/80 shadow-xl">
            <Image
              src="/images/studio/pilates_reformer.jpg"
              alt="Studio XSW Architectural Motion Shoot"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          </div>

          {/* Card 5: High-End Cinema Camera Lens with Golden Reflections */}
          <div className="relative group overflow-hidden rounded-[24px] sm:rounded-[28px] h-[240px] sm:h-[290px] md:h-[320px] bg-slate-900 border border-slate-200/80 shadow-xl sm:col-span-2 md:col-span-1">
            <Image
              src="/images/studio/camera_lens.jpg"
              alt="Studio XSW Cinema Lens Photography"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          </div>
        </div>

        {/* ROW 3: Studio ———————— XSW Banner Card with Staggered 3D Letter Swap Animation */}
        <div className="relative group overflow-hidden rounded-[24px] sm:rounded-[28px] h-[160px] sm:h-[200px] md:h-[230px] bg-slate-950 border border-slate-200/80 shadow-xl flex items-center justify-between px-6 sm:px-12 lg:px-16">
          {/* Real Fabric Background Image */}
          <Image
            src="/images/studio/banner_bg.jpg"
            alt="Studio XSW Texture Background"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Dark Vignette Overlay for High-Contrast White Text */}
          <div className="absolute inset-0 bg-slate-950/40 z-0 pointer-events-none" />

          {/* Giant Typography Banner with 3D Letter Swap Hover Animation */}
          <div className="relative z-10 w-full flex items-center justify-between gap-4 sm:gap-8">
            <LetterSwap3D
              label="Studio"
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter drop-shadow-2xl"
              staggerDelay={0.04}
            />

            {/* Connecting Horizontal Line */}
            <div className="flex-1 h-[2px] sm:h-[3px] bg-white/80 mx-2 sm:mx-6 rounded-full shadow-lg" />

            <LetterSwap3D
              label="XSW"
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter drop-shadow-2xl"
              staggerDelay={0.04}
              reverse
            />
          </div>
        </div>

      </Container>
    </section>
  );
};
