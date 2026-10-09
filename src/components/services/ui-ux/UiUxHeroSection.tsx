"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceCard } from "./ServiceCard";
import { SERVICE_CARDS, HERO_CONTENT } from "./data";

export interface UiUxHeroSectionProps {
  onStartProject?: () => void;
  className?: string;
}

/**
 * Unified UI/UX Hero & 5-Card Fanning Section (Section 1 & 2)
 *
 * Implements the pristine hero composition:
 * 1. Top: Category Eyebrow & Bold Centered Display Headline with 'beautifully.' gradient
 * 2. Middle: Interactive Fanning Cards in the DEAD CENTER of the screen
 *    with floating discipline speech bubbles (@design_system, @interactive_ux)
 * 3. Bottom: Supporting description paragraph & Dual CTA action buttons
 * 4. Background: Rich, luminous electric cyan & magenta ambient lighting
 * 5. Bottom: Translucent gradient corner waves
 * 6. Scroll Interaction: Pinned during scrub, cards fan out horizontally from center,
 *    holds in the 5-card spread, then unpins cleanly into Section 3.
 */
export const UiUxHeroSection: React.FC<UiUxHeroSectionProps> = ({
  onStartProject,
  className = "",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagLeftRef = useRef<HTMLDivElement>(null);
  const tagRightRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!trackRef.current || !stageRef.current) return;

      const mm = gsap.matchMedia();

      const createFanningAnimation = (config: {
        spreads: { x: number; y: number; z: number; rZ: number; rY: number; scale: number }[];
        tagLeft: { x: number; y: number };
        tagRight: { x: number; y: number };
      }) => {
        // Master scroll-driven timeline pinned to the hero track
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stageRef.current,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            },
          },
        });

        // Set initial state: all 5 cards overlap at origin (0, 0, 0)
        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          gsap.set(cardEl, {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            z: 0,
            rotationZ: 0,
            rotationY: 0,
            scale: 1,
            transformPerspective: 1400,
            zIndex: idx === 2 ? 30 : idx === 1 || idx === 3 ? 25 : 20,
          });
        });

        // Initial state for speech bubbles: hidden & scaled down above center card
        if (tagLeftRef.current) {
          gsap.set(tagLeftRef.current, {
            xPercent: -50,
            yPercent: -100,
            x: 0,
            y: -130,
            scale: 0.6,
            opacity: 0,
          });
        }
        if (tagRightRef.current) {
          gsap.set(tagRightRef.current, {
            xPercent: -50,
            yPercent: -100,
            x: 0,
            y: -130,
            scale: 0.6,
            opacity: 0,
          });
        }

        // Phase 1: Initial Hold (0% – 12%) — User sees ONE centered artwork in the hero
        tl.to({}, { duration: 0.12 });

        // Phase 2: Card Split & Spread (12% – 72%) — Cards fan out horizontally
        config.spreads.forEach((spread, idx) => {
          const cardEl = cardRefs.current[idx];
          if (!cardEl) return;

          tl.to(
            cardEl,
            {
              xPercent: -50,
              yPercent: -50,
              x: spread.x,
              y: spread.y,
              z: spread.z,
              rotationZ: spread.rZ,
              rotationY: spread.rY,
              scale: spread.scale,
              duration: 0.60,
              ease: "power2.out",
            },
            0.12
          );
        });

        // Animate floating speech bubbles outward into their fanned positions
        if (tagLeftRef.current) {
          tl.to(
            tagLeftRef.current,
            {
              xPercent: -50,
              yPercent: -100,
              x: config.tagLeft.x,
              y: config.tagLeft.y,
              scale: 1,
              opacity: 1,
              duration: 0.55,
              ease: "back.out(1.5)",
            },
            0.20
          );
        }

        if (tagRightRef.current) {
          tl.to(
            tagRightRef.current,
            {
              xPercent: -50,
              yPercent: -100,
              x: config.tagRight.x,
              y: config.tagRight.y,
              scale: 1,
              opacity: 1,
              duration: 0.55,
              ease: "back.out(1.5)",
            },
            0.20
          );
        }

        // Phase 3: Final Fan Hold (72% – 100%) — Cards and tags rest stably in full spread
        tl.to({}, { duration: 0.28 });
      };

      // 1. Large Desktop (min-width: 1280px) — Exact fanning matching Reference
      mm.add("(min-width: 1280px)", () => {
        createFanningAnimation({
          spreads: [
            { x: -340, y: 14, z: -25, rZ: -8.0, rY: 4.0, scale: 0.94 },
            { x: -170, y: 7, z: -10, rZ: -4.0, rY: 2.0, scale: 0.98 },
            { x: 0, y: 0, z: 20, rZ: 0, rY: 0, scale: 1.02 },
            { x: 170, y: 7, z: -10, rZ: 4.0, rY: -2.0, scale: 0.98 },
            { x: 340, y: 14, z: -25, rZ: 8.0, rY: -4.0, scale: 0.94 },
          ],
          tagLeft: { x: -170, y: -145 },
          tagRight: { x: 170, y: -145 },
        });
      });

      // 2. Medium Desktop / Laptop (1024px – 1279px)
      mm.add("(min-width: 1024px) and (max-width: 1279px)", () => {
        createFanningAnimation({
          spreads: [
            { x: -270, y: 12, z: -20, rZ: -7.0, rY: 3.5, scale: 0.90 },
            { x: -135, y: 6, z: -10, rZ: -3.5, rY: 1.8, scale: 0.95 },
            { x: 0, y: 0, z: 15, rZ: 0, rY: 0, scale: 1.0 },
            { x: 135, y: 6, z: -10, rZ: 3.5, rY: -1.8, scale: 0.95 },
            { x: 270, y: 12, z: -20, rZ: 7.0, rY: -3.5, scale: 0.90 },
          ],
          tagLeft: { x: -135, y: -140 },
          tagRight: { x: 135, y: -140 },
        });
      });

      // 3. Tablet (768px – 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        createFanningAnimation({
          spreads: [
            { x: -180, y: 8, z: -15, rZ: -5.5, rY: 2.2, scale: 0.85 },
            { x: -90, y: 4, z: -8, rZ: -2.8, rY: 1.1, scale: 0.90 },
            { x: 0, y: 0, z: 12, rZ: 0, rY: 0, scale: 0.95 },
            { x: 90, y: 4, z: -8, rZ: 2.8, rY: -1.1, scale: 0.90 },
            { x: 180, y: 8, z: -15, rZ: 5.5, rY: -2.2, scale: 0.85 },
          ],
          tagLeft: { x: -90, y: -130 },
          tagRight: { x: 90, y: -130 },
        });
      });

      // 4. Mobile (< 768px) — Balanced deck fan without horizontal overflow or speech bubble collision
      mm.add("(max-width: 767px)", () => {
        createFanningAnimation({
          spreads: [
            { x: -84, y: 8, z: -15, rZ: -5.0, rY: 1.5, scale: 0.76 },
            { x: -42, y: 4, z: -8, rZ: -2.5, rY: 0.8, scale: 0.80 },
            { x: 0, y: 0, z: 12, rZ: 0, rY: 0, scale: 0.85 },
            { x: 42, y: 4, z: -8, rZ: 2.5, rY: -0.8, scale: 0.80 },
            { x: 84, y: 8, z: -15, rZ: 5.0, rY: -1.5, scale: 0.76 },
          ],
          tagLeft: { x: -68, y: -110 },
          tagRight: { x: 68, y: -110 },
        });
      });
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollDown = () => {
    if (trackRef.current) {
      const bottom = trackRef.current.offsetTop + trackRef.current.offsetHeight;
      window.scrollTo({ top: bottom, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={trackRef}
      id="uiux-hero-stage-trigger"
      className={`relative w-full bg-[#FAFBFD] text-[#0A1128] min-h-[220vh] sm:min-h-[250vh] ${className}`}
    >
      {/* 
        DEDICATED FULL-VIEWPORT HERO PINNED STAGE:
        Owns 100vh of screen space.
        Clears 72px sticky navbar cleanly with pt-20 sm:pt-22 md:pt-24.
      */}
      <div
        ref={stageRef}
        id="uiux-hero-pinned-stage"
        className="relative w-full h-[100dvh] min-h-[580px] max-h-[1080px] flex flex-col justify-between items-center pt-16 xs:pt-20 sm:pt-22 md:pt-24 pb-4 sm:pb-7 px-3 sm:px-6 lg:px-8 select-none overflow-hidden"
      >
        {/* 
          1. AMBIENT BACKGROUND GRADIENTS:
          Rich, luminous electric cyan/blue on the left and vivid magenta/purple on the right
        */}
        <div
          className="absolute -top-10 -left-16 w-[420px] sm:w-[650px] md:w-[780px] h-[420px] sm:h-[650px] md:h-[780px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(2, 132, 199, 0.55) 0%, rgba(14, 165, 233, 0.42) 32%, rgba(56, 189, 248, 0.22) 58%, transparent 75%)",
            filter: "blur(52px)",
          }}
          aria-hidden="true"
        />

        <div
          className="absolute -top-10 -right-16 w-[420px] sm:w-[650px] md:w-[780px] h-[420px] sm:h-[650px] md:h-[780px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(219, 39, 119, 0.52) 0%, rgba(236, 72, 153, 0.40) 32%, rgba(192, 132, 252, 0.22) 58%, transparent 75%)",
            filter: "blur(52px)",
          }}
          aria-hidden="true"
        />

        {/* Center Card Backlight Bloom */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[620px] h-[300px] sm:h-[340px] rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse, rgba(14, 165, 233, 0.22) 0%, rgba(217, 70, 239, 0.18) 45%, transparent 75%)",
            filter: "blur(38px)",
          }}
          aria-hidden="true"
        />

        {/* 
          2. TOP HERO HEADER AREA:
          Category pill and display headline with vibrant gradient on 'beautifully.'
        */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto shrink-0 px-2">
          {/* Category Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-2.5 xs:px-3 py-1 rounded-full bg-white/95 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] mb-1.5 sm:mb-2 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8]" />
            <span className="text-[9.5px] xs:text-[10px] sm:text-[11px] font-semibold tracking-[0.20em] text-[#1668E8] uppercase font-mono">
              {HERO_CONTENT.category}
            </span>
          </div>

          {/* Main Display Headline with Gradient on 'beautifully.' */}
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#07152B] tracking-tight leading-[1.18] sm:leading-[1.14]">
            <span className="inline sm:block">Designing digital experiences </span>
            <span className="inline sm:block text-[#07152B]">
              that work{" "}
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#EC4899] bg-clip-text text-transparent inline-block font-extrabold">
                beautifully.
              </span>
            </span>
          </h1>
        </div>

        {/* 
          3. MIDDLE CARDS CANVAS (DEAD CENTER OF THE HERO):
          Matches the reference image (Pallet Ross) layout:
          - Sits right between the headline and bottom description
          - Speech bubble tags float above the cards (@design_system, @interactive_ux)
          - 5 cards fan out outward on scroll scrub
        */}
        <div
          id="uiux-cards-center-canvas"
          className="relative z-10 w-full max-w-5xl h-[230px] xs:h-[250px] sm:h-[285px] md:h-[305px] flex items-center justify-center overflow-visible my-auto"
          style={{
            perspective: 1400,
          }}
        >
          {/* Floating Speech Bubble 1 (Left: @design_system) */}
          <div
            ref={tagLeftRef}
            className="absolute left-1/2 top-1/2 z-40 pointer-events-none will-change-transform"
          >
            <div className="relative px-3.5 py-1 rounded-full bg-[#1668E8] text-white text-[11px] font-mono font-medium shadow-[0_6px_16px_rgba(22,104,232,0.35)] flex items-center gap-1.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              <span>@design_system</span>
              <div
                className="absolute -bottom-1.5 left-5 w-0 h-0"
                style={{
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "6px solid #1668E8",
                }}
              />
            </div>
          </div>

          {/* Floating Speech Bubble 2 (Right: @interactive_ux) */}
          <div
            ref={tagRightRef}
            className="absolute left-1/2 top-1/2 z-40 pointer-events-none will-change-transform"
          >
            <div className="relative px-3.5 py-1 rounded-full bg-[#10B981] text-white text-[11px] font-mono font-medium shadow-[0_6px_16px_rgba(16,185,129,0.35)] flex items-center gap-1.5 select-none">
              <Sparkles className="w-3 h-3 text-white/90" />
              <span>@interactive_ux</span>
              <div
                className="absolute -bottom-1.5 right-5 w-0 h-0"
                style={{
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "6px solid #10B981",
                }}
              />
            </div>
          </div>

          {/* 5 Service Discipline Cards */}
          {SERVICE_CARDS.map((card, idx) => (
            <ServiceCard
              key={card.id}
              card={card}
              index={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{
                zIndex: idx === 2 ? 30 : idx === 1 || idx === 3 ? 25 : 20,
              }}
            />
          ))}
        </div>

        {/* 
          4. BOTTOM SUPPORTING DESCRIPTION & ACTION BUTTONS:
          Positioned neatly below the cards canvas with comfortable breathing room
        */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto space-y-2 sm:space-y-3 shrink-0 pb-1 px-3">
          {/* Supporting Description */}
          <p className="text-[11px] xs:text-xs sm:text-[13px] text-[#556987] leading-relaxed max-w-xl font-normal px-2">
            {HERO_CONTENT.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pointer-events-auto">
            <button
              type="button"
              onClick={onStartProject}
              className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#07152B] text-white text-xs sm:text-sm font-semibold hover:bg-[#1668E8] shadow-[0_4px_16px_rgba(7,21,43,0.18)] hover:shadow-[0_6px_22px_rgba(22,104,232,0.32)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>{HERO_CONTENT.primaryCta.label}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>

            <button
              type="button"
              onClick={handleScrollDown}
              className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white text-[#07152B] border border-slate-200/90 text-xs sm:text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>{HERO_CONTENT.secondaryCta.label}</span>
              <Compass className="w-3.5 h-3.5 text-[#556987]" />
            </button>
          </div>

          {/* Dynamic telemetry indicator */}
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-[#556987]/80 pt-0.5">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                scrollProgress > 0.45 ? "bg-[#1668E8]" : "bg-emerald-500 animate-pulse"
              }`}
            />
            <span>
              {scrollProgress < 0.15
                ? "Scroll down to expand capabilities"
                : scrollProgress < 0.8
                ? `Fanning design disciplines (${Math.round(scrollProgress * 100)}%)`
                : "Scroll down to continue"}
            </span>
          </div>
        </div>

        {/* 
          5. BOTTOM CORNER WAVES:
          Rich, deep, translucent gradient waves on the left and right corners
        */}
        <div className="absolute bottom-0 inset-x-0 w-full h-20 sm:h-24 md:h-28 pointer-events-none z-10 overflow-hidden">
          <svg
            className="absolute -bottom-1 -left-4 w-72 sm:w-96 md:w-[460px] h-20 sm:h-24 md:h-28 text-sky-500/70"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,150 L0,50 Q120,0 240,65 T480,40 L500,150 Z"
              fill="currentColor"
              className="opacity-75"
            />
            <path
              d="M0,150 L0,80 Q140,20 280,85 T500,70 L500,150 Z"
              fill="rgba(2, 132, 199, 0.72)"
              className="opacity-90"
            />
          </svg>

          <svg
            className="absolute -bottom-1 -right-4 w-72 sm:w-96 md:w-[460px] h-20 sm:h-24 md:h-28 text-fuchsia-500/70"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M500,150 L500,50 Q380,0 260,65 T20,40 L0,150 Z"
              fill="currentColor"
              className="opacity-75"
            />
            <path
              d="M500,150 L500,80 Q360,20 220,85 T0,70 L0,150 Z"
              fill="rgba(219, 39, 119, 0.72)"
              className="opacity-90"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};
