"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Compass, Layers } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { ServiceCard } from "./ServiceCard";
import { HERO_CONTENT, SERVICE_CARDS, ServiceCardData } from "./data";

export interface UiUxHeroScrollSectionProps {
  onStartProject?: () => void;
  onExploreServices?: () => void;
}

/**
 * UI/UX Hero + Scroll-Driven Card Splitting & Fanning Showcase (Prompt 2)
 *
 * Implements:
 * 1. Pinned stage: begins with ONE single UI artwork in the hero.
 * 2. 5 service cards (UI, UX, Web, Mobile, Product) start overlapping at center origin.
 * 3. As user scrolls down, cards progressively split & fan out into an editorial composition.
 * 4. Card 3 remains the visual anchor in the center with subtle rotations on flanking cards:
 *    Card 1 (-8deg) | Card 2 (-4deg) | Card 3 (0deg) | Card 4 (+4deg) | Card 5 (+8deg).
 * 5. Strictly controlled by user scroll via GSAP ScrollTrigger scrub (reverses cleanly on scroll up).
 * 6. Responsive fanning tuned via gsap.matchMedia for desktop, tablet, and mobile.
 */
export const UiUxHeroScrollSection: React.FC<UiUxHeroScrollSectionProps> = ({
  onStartProject,
  onExploreServices,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // References to the 5 service cards
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current || !pinWrapperRef.current || !stageRef.current) return;

      const mm = gsap.matchMedia();

      // Master Timeline Builder
      const setupTimeline = (spreads: { x: number; y: number; z: number; rZ: number; rY: number; scale: number }[]) => {
        // Master scroll-driven timeline
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: pinWrapperRef.current,
            pinSpacing: true,
            scrub: 0.7, // Silky smooth 60fps bidirectional scrub
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            },
          },
        });

        timelineRef.current = masterTl;

        // Set initial state: all 5 cards overlap at origin (0, 0, 0), zero rotation
        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          gsap.set(cardEl, {
            x: 0,
            y: 0,
            z: 0,
            rotationZ: 0,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            transformPerspective: 1400,
            zIndex: idx === 2 ? 30 : idx === 1 || idx === 3 ? 25 : 20,
          });
        });

        // -----------------------------------------------------------
        // PHASE 1 (0% – 15%): Initial Hold
        // Hero text and single central artwork remain stable.
        // -----------------------------------------------------------
        masterTl.to({}, { duration: 0.15 });

        // -----------------------------------------------------------
        // PHASE 2 (15% – 30%): Focus Transition
        // Header text gently lifts and softens, elevating focus onto the artwork.
        // -----------------------------------------------------------
        if (headerRef.current) {
          masterTl.to(
            headerRef.current,
            {
              y: -24,
              opacity: 0.28,
              duration: 0.15,
              ease: "power1.out",
            },
            0.15
          );
        }

        // -----------------------------------------------------------
        // PHASE 3 (30% – 75%): Artwork Splits → 5 Cards Fan Out
        // Cards progressively separate outwards with subtle 3D depth & rotation.
        // Card 3 remains near center as visual anchor.
        // -----------------------------------------------------------
        spreads.forEach((spread, idx) => {
          const cardEl = cardRefs.current[idx];
          if (!cardEl) return;

          masterTl.to(
            cardEl,
            {
              x: spread.x,
              y: spread.y,
              z: spread.z,
              rotationZ: spread.rZ,
              rotationY: spread.rY,
              scale: spread.scale,
              duration: 0.45,
              ease: "power2.out",
            },
            0.30
          );
        });

        // -----------------------------------------------------------
        // PHASE 4 (75% – 100%): Final Stable Fan Hold
        // Cards rest in their final stable spread for inspection.
        // -----------------------------------------------------------
        masterTl.to({}, { duration: 0.25 });
      };

      // Breakpoint 1: Large Desktop (1280px+)
      mm.add("(min-width: 1280px)", () => {
        setupTimeline([
          { x: -390, y: 22, z: -35, rZ: -8.5, rY: 4.5, scale: 0.95 },
          { x: -195, y: 10, z: -15, rZ: -4.2, rY: 2.2, scale: 0.98 },
          { x: 0, y: 0, z: 20, rZ: 0, rY: 0, scale: 1.03 },
          { x: 195, y: 10, z: -15, rZ: 4.2, rY: -2.2, scale: 0.98 },
          { x: 390, y: 22, z: -35, rZ: 8.5, rY: -4.5, scale: 0.95 },
        ]);
      });

      // Breakpoint 2: Medium Desktop / Laptop (1024px – 1279px)
      mm.add("(min-width: 1024px) and (max-width: 1279px)", () => {
        setupTimeline([
          { x: -310, y: 18, z: -30, rZ: -7.5, rY: 3.5, scale: 0.92 },
          { x: -155, y: 8, z: -12, rZ: -3.8, rY: 1.8, scale: 0.96 },
          { x: 0, y: 0, z: 15, rZ: 0, rY: 0, scale: 1.0 },
          { x: 155, y: 8, z: -12, rZ: 3.8, rY: -1.8, scale: 0.96 },
          { x: 310, y: 18, z: -30, rZ: 7.5, rY: -3.5, scale: 0.92 },
        ]);
      });

      // Breakpoint 3: Tablet (768px – 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        setupTimeline([
          { x: -210, y: 14, z: -25, rZ: -6.0, rY: 2.5, scale: 0.88 },
          { x: -105, y: 6, z: -10, rZ: -3.0, rY: 1.2, scale: 0.94 },
          { x: 0, y: 0, z: 12, rZ: 0, rY: 0, scale: 0.98 },
          { x: 105, y: 6, z: -10, rZ: 3.0, rY: -1.2, scale: 0.94 },
          { x: 210, y: 14, z: -25, rZ: 6.0, rY: -2.5, scale: 0.88 },
        ]);
      });

      // Breakpoint 4: Mobile (< 768px) — Stacked Deck Fan without Horizontal Overflow
      mm.add("(max-width: 767px)", () => {
        setupTimeline([
          { x: -64, y: -14, z: -20, rZ: -4.5, rY: 1.5, scale: 0.86 },
          { x: -32, y: -7, z: -10, rZ: -2.2, rY: 0.8, scale: 0.90 },
          { x: 0, y: 0, z: 10, rZ: 0, rY: 0, scale: 0.96 },
          { x: 32, y: 7, z: -10, rZ: 2.2, rY: -0.8, scale: 0.90 },
          { x: 64, y: 14, z: -20, rZ: 4.5, rY: -1.5, scale: 0.86 },
        ]);
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleExploreClick = () => {
    if (onExploreServices) {
      onExploreServices();
    } else if (containerRef.current) {
      const targetScroll = containerRef.current.offsetTop + window.innerHeight * 0.75;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      id="uiux-showcase-container"
      className="relative w-full bg-[#FAFBFD] text-[#0A1128] overflow-x-hidden min-h-[290vh] sm:min-h-[310vh]"
    >
      {/* 
        PINNED VIEWPORT STAGE:
        Stays fixed in place while user scrolls through the 300vh track.
      */}
      <div
        ref={pinWrapperRef}
        id="uiux-pinned-stage"
        className="relative w-full h-screen min-h-[660px] max-h-[1100px] flex flex-col justify-between py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 select-none overflow-hidden"
      >
        {/* Soft atmospheric background gradient (restrained blue & slate) */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 10%, rgba(22, 104, 232, 0.04) 0%, transparent 60%),
              radial-gradient(circle at 85% 90%, rgba(148, 163, 184, 0.04) 0%, transparent 50%)
            `,
          }}
          aria-hidden="true"
        />

        <Container size="wide" className="relative z-10 w-full h-full flex flex-col justify-between">
          {/* =========================================================
              UPPER SECTION: CATEGORY, HEADING, DESCRIPTION & CTAs
              Gently lifts and softens between 15% and 30% scroll.
              ========================================================= */}
          <header
            ref={headerRef}
            className="w-full flex flex-col items-center text-center pt-4 sm:pt-6 md:pt-8 max-w-4xl mx-auto will-change-transform"
          >
            {/* 1. Category Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.20em] text-[#1668E8] uppercase select-none font-mono">
                {HERO_CONTENT.category}
              </span>
            </div>

            {/* 2. Strong Editorial Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#07152B] tracking-tight leading-[1.12] max-w-3xl">
              <span className="block">{HERO_CONTENT.headlineLine1}</span>
              <span className="block text-[#07152B]/90 mt-0.5 sm:mt-1">
                {HERO_CONTENT.headlineLine2}
              </span>
            </h1>

            {/* 3. Supporting Description */}
            <p className="mt-3 sm:mt-3.5 text-xs sm:text-sm md:text-base text-[#556987] leading-relaxed max-w-2xl font-normal">
              {HERO_CONTENT.description}
            </p>

            {/* 4. Action Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto">
              <button
                type="button"
                onClick={onStartProject}
                className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#1668E8] text-white text-xs sm:text-sm font-semibold hover:bg-[#1255C0] shadow-[0_4px_16px_rgba(22,104,232,0.22)] hover:shadow-[0_6px_22px_rgba(22,104,232,0.32)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>{HERO_CONTENT.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </button>

              <button
                type="button"
                onClick={handleExploreClick}
                className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white text-[#07152B] border border-slate-200/90 text-xs sm:text-sm font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>{HERO_CONTENT.secondaryCta.label}</span>
                <Compass className="w-4 h-4 text-[#556987]" />
              </button>
            </div>
          </header>

          {/* =========================================================
              CENTER STAGE: 1 ARTWORK → 5 SERVICE CARDS FAN
              All 5 cards originate from the exact center (0, 0, 0).
              ========================================================= */}
          <main className="w-full flex-1 flex items-center justify-center py-4 sm:py-6 overflow-visible">
            <div
              ref={stageRef}
              id="uiux-card-stage"
              className="relative w-full max-w-4xl h-[360px] sm:h-[400px] md:h-[430px] flex items-center justify-center overflow-visible"
              style={{
                perspective: 1400,
              }}
            >
              {SERVICE_CARDS.map((card: ServiceCardData, idx: number) => (
                <div
                  key={card.id}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
                  style={{
                    zIndex: idx === 2 ? 30 : idx === 1 || idx === 3 ? 25 : 20,
                  }}
                >
                  <ServiceCard
                    card={card}
                    index={idx}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                  />
                </div>
              ))}
            </div>
          </main>

          {/* =========================================================
              BOTTOM TELEMETRY / STATUS INDICATOR
              Minimal feedback indicating scroll progress & discipline count.
              ========================================================= */}
          <footer className="w-full flex items-center justify-between text-[11px] font-mono text-[#556987] pt-2 border-t border-slate-200/60">
            <div className="flex items-center gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  scrollProgress > 0.3 ? "bg-[#1668E8]" : "bg-emerald-500 animate-pulse"
                }`}
              />
              <span>
                {scrollProgress < 0.25
                  ? "Scroll to Separate Capabilities"
                  : scrollProgress < 0.75
                  ? "Separating System Disciplines..."
                  : "5 Core UI/UX Disciplines Deployed"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-slate-400">
                1 Product System → 5 Disciplines
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="font-semibold text-slate-700">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </footer>
        </Container>
      </div>
    </div>
  );
};
