"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import BlurText from "@/components/ui/BlurText";
import { ProjectModal } from "@/components/shared/ProjectModal";

export const BrighterTomorrowSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const sectionRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="brighter-tomorrow"
        className="relative w-full min-h-[640px] sm:min-h-[700px] md:min-h-[760px] flex flex-col justify-between py-8 sm:py-12 overflow-hidden select-none bg-gradient-to-b from-[#EBF3FE] to-[#DCEBFC]"
      >
        {/* Full-width Background Video (lazy-mounted on scroll to save 14.5MB bandwidth on initial load) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {shouldLoadVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center"
            >
              <source src="/videos/brighter_tomorrow.mp4" type="video/mp4" />
            </video>
          )}
          {/* Top light blue gradient blend to flow seamlessly with section above */}
          <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-[#EBF3FE] via-[#EBF3FE]/70 to-transparent z-1" />
          {/* Subtle light vignette for maximum readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/30" />
        </div>

        {/* TOP CONTENT AREA */}
        <Container size="wide" className="relative z-10 pt-2 sm:pt-4 text-center space-y-3 sm:space-y-4">
          {/* Eyebrow */}
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-slate-600 uppercase block mb-1">
            IDEAS &middot; TECHNOLOGY &middot; CREATIVE &middot; REAL IMPACT
          </span>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.12] max-w-3xl mx-auto flex flex-col items-center justify-center">
            <BlurText
              text="Digital Experiences"
              delay={100}
              animateBy="words"
              direction="top"
              stepDuration={0.4}
              className="text-[#07152B] justify-center"
              as="span"
            />
            <div className="flex flex-wrap items-center justify-center gap-x-[0.3em]">
              <BlurText
                text="for a Brighter"
                delay={120}
                animateBy="words"
                direction="top"
                stepDuration={0.4}
                className="text-[#07152B] justify-center"
                as="span"
              />
              <BlurText
                text="Tomorrow."
                delay={140}
                animateBy="words"
                direction="top"
                stepDuration={0.4}
                className="text-[#1668E8] justify-center"
                as="span"
              />
            </div>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-slate-700 font-medium max-w-xl mx-auto leading-relaxed">
            We design, build and grow digital products, brands and experiences that help businesses create real impact.
          </p>

          {/* Compact Email Subscription & Get Started Bar (positioned cleanly in the sky above the man's head) */}
          <form
            onSubmit={handleGetStarted}
            className="w-full max-w-sm sm:max-w-md mx-auto mt-3 sm:mt-4 p-1 sm:p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/95 shadow-[0_12px_32px_-8px_rgba(7,21,43,0.14)] flex items-center justify-between gap-2 transition-all hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-500"
          >
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent px-3.5 sm:px-4 py-1.5 sm:py-2 text-slate-900 placeholder-slate-400 font-medium text-xs sm:text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="flex-shrink-0 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#07152B] hover:bg-[#1668E8] text-white font-bold text-xs transition-all duration-300 shadow-md flex items-center gap-1.5 group cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </form>
        </Container>

        {/* MIDDLE FLOATING LABELS MATCHING REFERENCE IMAGE 1 */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 hidden md:flex justify-between items-center my-auto pointer-events-none opacity-80">
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-widest text-slate-800 uppercase block">WEBSITE &rarr;</span>
            <span className="text-[11px] font-bold tracking-widest text-slate-700 uppercase block mt-12">BRANDING &rarr;</span>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-xs font-bold tracking-widest text-slate-800 uppercase block">APP DESIGN &rarr;</span>
            <span className="text-[11px] font-bold tracking-widest text-slate-700 uppercase block mt-8">CREATIVE &rarr;</span>
          </div>
        </div>

        {/* BOTTOM STATS BAR */}
        <Container size="wide" className="relative z-10 pb-4 sm:pb-8 pt-8 hidden md:block">
          <div className="w-full grid grid-cols-4 gap-6 sm:gap-8 items-end border-t border-slate-300/60 pt-6">
            {/* Stat 1 */}
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#07152B] tracking-tight">50+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-600">Projects Delivered</div>
              <div className="w-8 h-[2px] bg-slate-400 mt-2" />
            </div>

            {/* Stat 2 */}
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#07152B] tracking-tight">10+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-600">Industries Served</div>
              <div className="w-8 h-[2px] bg-slate-400 mt-2" />
            </div>

            {/* Stat 3 */}
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#07152B] tracking-tight">3+</div>
              <div className="text-xs sm:text-sm font-medium text-slate-600">Years of Experience</div>
              <div className="w-8 h-[2px] bg-slate-400 mt-2" />
            </div>

            {/* Stat 4 */}
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#07152B] tracking-tight">100%</div>
              <div className="text-xs sm:text-sm font-medium text-slate-600">Client Satisfaction</div>
              <div className="w-8 h-[2px] bg-slate-400 mt-2" />
            </div>
          </div>
        </Container>
      </section>

      {/* Service Request Inquiry Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inquiryType="service"
        source="homepage-digital-solutions"
        initialEmail={email}
      />
    </>
  );
};

