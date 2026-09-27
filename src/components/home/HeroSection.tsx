import React from "react";
import Image from "next/image";
import { Container } from "@/components/shared/ui/Container";

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
              <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.24em] text-[#556987] uppercase select-none">
                TRUSTED WORLDWIDE
              </span>
            </div>

            {/* Display Heading matching reference - strictly 2 lines */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] 2xl:text-[58px] font-extrabold text-[#07152B] tracking-tight leading-[1.12]">
              <span className="block sm:whitespace-nowrap">A Popular Choice</span>
              <span className="block sm:whitespace-nowrap mt-1 sm:mt-2">Among Businesses</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#556987] leading-relaxed max-w-lg pt-1">
              Trusted by clients, partners, and communities for our quality,
              reliability, and real impact.
            </p>
          </div>

          {/* CENTER / RIGHT COLUMN: Woman on 3D Search Bar Podium with Handwritten Annotations */}
          <div className="lg:col-span-6 relative flex flex-col items-center lg:items-end justify-center">
            <div className="relative w-full max-w-[700px] flex flex-col items-center">
              
              {/* Decorative Handwritten Annotation 1: Left ("Searching for better ways to build") */}
              <div className="absolute left-0 sm:left-4 md:left-6 top-0 sm:top-4 z-30 select-none pointer-events-none transition-transform">
                <Image
                  src="/images/hero/note_searching_transparent.png"
                  alt="Searching for better ways to build"
                  width={150}
                  height={130}
                  className="w-24 sm:w-32 md:w-36 h-auto drop-shadow-sm -rotate-6"
                  priority
                />
              </div>

              {/* Decorative Handwritten Annotation 2: Right ("Real People Real Reviews") */}
              <div className="absolute right-0 sm:right-2 md:right-4 top-4 sm:top-8 z-30 select-none pointer-events-none transition-transform">
                <Image
                  src="/images/hero/note_reviews_transparent.png"
                  alt="Real People Real Reviews"
                  width={120}
                  height={170}
                  className="w-20 sm:w-24 md:w-28 h-auto drop-shadow-sm rotate-6"
                  priority
                />
              </div>

              {/* Main Visual: women.png (Woman sitting on 3D search bar podium with search button) */}
              <div className="relative z-20 w-full flex items-center justify-center select-none">
                <Image
                  src="/images/hero/women.png"
                  alt="Woman with laptop on XSPACEWEB technology partner search podium"
                  width={1651}
                  height={953}
                  className="w-full max-w-[680px] h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(7,21,43,0.1)]"
                  priority
                />
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
