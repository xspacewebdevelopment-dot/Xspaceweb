import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export const StartProjectBannerSection: React.FC = () => {
  return (
    <>
      <section className="w-full bg-gradient-to-b from-white via-slate-50 to-[#EBF3FE] py-10 sm:py-14 relative select-none">
        <Container size="wide">
          {/* Main Rounded Banner Card */}
          <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-r from-[#DCEBFF] via-[#EBF3FE] to-[#D5E6FF] border border-blue-100/90 shadow-[0_20px_60px_-15px_rgba(22,104,232,0.12)] p-8 sm:p-12 md:p-14 min-h-[220px] sm:min-h-[260px] md:min-h-[300px] flex items-center justify-between">
            
            {/* Background Architectural & Sky Graphic Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Fluffy clouds atmospheric gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-100/80 via-blue-50/60 to-transparent" />

              {/* Right Side White Architecture Building & Green Tree Image */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-2/5 h-full opacity-90">
                <Image
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Architecture & Sky Background"
                  fill
                  unoptimized
                  className="object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#EBF3FE] via-[#EBF3FE]/70 to-transparent" />
              </div>
            </div>

            {/* Content Layout */}
            <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Left Column: Eyebrow, Title, Subtitle */}
              <div className="space-y-2 sm:space-y-3 max-w-2xl">
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#64748B] uppercase block">
                  HAVE SOMETHING IN MIND?
                </span>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight leading-tight">
                  Let&apos;s make it worth seeing.
                </h2>

                <p className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide pt-1">
                  Websites &middot; Apps &middot; SaaS &middot; Branding &middot; Creative &middot; Digital Experiences
                </p>
              </div>

              {/* Right Column: Start a Project Button */}
              <div className="flex-shrink-0 pt-2 md:pt-0">
                <a
                  href="#project-inquiry"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#1668E8] text-white font-bold text-sm sm:text-base hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </>
  );
};
