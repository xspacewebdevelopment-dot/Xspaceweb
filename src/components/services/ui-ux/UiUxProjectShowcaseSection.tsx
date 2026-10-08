"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectShowcaseCard } from "./ProjectShowcaseCard";
import { SECTION4_PROJECTS } from "./projectsData";

export interface UiUxProjectShowcaseSectionProps {
  onStartProject?: () => void;
  className?: string;
}

/**
 * SECTION 4: Dedicated UI/UX Project Showcase Section
 *
 * Implements a completely isolated showcase with new digital product artwork:
 * 1. Concept: Introduces 6 brand-new visual cards representing XSPACEWEB digital products
 *    (Landing Page, Mobile App, SaaS Dashboard, E-commerce, Web App, Design System).
 * 2. Visual Feel: Diagonal + Square composition forming a balanced, dynamic visual area.
 * 3. Prominent Headline: Headline sits clearly below the 72px navbar with generous clearance above the cards.
 * 4. Scroll Animation: 100% scroll-driven via GSAP ScrollTrigger with scrub.
 *    - 0%–20%: The first project card enters and begins scaling into view.
 *    - 20%–40%: Additional cards enter progressively.
 *    - 40%–70%: Cards glide along dynamic diagonal paths.
 *    - 70%–90%: Cards settle into the editorial square/rectangular constellation.
 *    - 90%–100%: Final composition is fully visible, holds stably.
 * 5. Strict Isolation: Completely scoped refs and selectors.
 *    DOES NOT modify or depend on Section 1, 2, or 3.
 */
export const UiUxProjectShowcaseSection: React.FC<UiUxProjectShowcaseSectionProps> = ({
  onStartProject,
  className = "",
}) => {
  const section4TrackRef = useRef<HTMLDivElement>(null);
  const section4StageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!section4TrackRef.current || !section4StageRef.current) return;

      const mm = gsap.matchMedia();

      const createSection4Timeline = (config: {
        entryOrigins: { x: number; y: number; scale: number; rotZ: number }[];
        intermediateSpread: { x: number; y: number; scale: number; rotZ: number }[];
        finalTwoLineLayout: { x: number; y: number; scale: number; rotZ: number; zIndex: number }[];
      }) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section4TrackRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: section4StageRef.current,
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            },
          },
        });

        // Set initial state: cards collapsed at origin, scaled down and transparent
        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const entry = config.entryOrigins[idx] || { x: 0, y: 0, scale: 0.4, rotZ: 0 };
          gsap.set(cardEl, {
            xPercent: -50,
            yPercent: -50,
            x: entry.x,
            y: entry.y,
            scale: entry.scale,
            rotationZ: entry.rotZ,
            opacity: 0,
            transformPerspective: 1400,
            zIndex: idx + 10,
          });
        });

        // =========================================================================
        // PHASE 1: LINE 1 CARDS ENTER & GLIDE OUTWARD (0.00 – 0.32)
        // Cards 0, 1, 2 expand and transition toward top row positions
        // =========================================================================
        [0, 1, 2].forEach((idx, i) => {
          const cardEl = cardRefs.current[idx];
          if (!cardEl) return;

          tl.to(
            cardEl,
            {
              opacity: 1,
              x: config.intermediateSpread[idx].x,
              y: config.intermediateSpread[idx].y,
              scale: config.intermediateSpread[idx].scale,
              rotationZ: config.intermediateSpread[idx].rotZ,
              duration: 0.26,
              ease: "power2.out",
            },
            0.02 + i * 0.05
          );
        });

        // =========================================================================
        // PHASE 2: LINE 2 CARDS ENTER & GLIDE OUTWARD (0.22 – 0.58)
        // Cards 3, 4, 5 expand and transition toward bottom row positions
        // =========================================================================
        [3, 4, 5].forEach((idx, i) => {
          const cardEl = cardRefs.current[idx];
          if (!cardEl) return;

          tl.to(
            cardEl,
            {
              opacity: 1,
              x: config.intermediateSpread[idx].x,
              y: config.intermediateSpread[idx].y,
              scale: config.intermediateSpread[idx].scale,
              rotationZ: config.intermediateSpread[idx].rotZ,
              duration: 0.26,
              ease: "power2.out",
            },
            0.18 + i * 0.05
          );
        });

        // =========================================================================
        // PHASE 3: SETTLE CLEANLY INTO TWO LINES (3 CARDS & 3 CARDS) (0.45 – 0.85)
        // Line 1: Top 3 cards (Landing Page, Mobile App, SaaS Dashboard)
        // Line 2: Bottom 3 cards (E-Commerce, Product Design, Design System)
        // =========================================================================
        config.finalTwoLineLayout.forEach((target, idx) => {
          const cardEl = cardRefs.current[idx];
          if (!cardEl) return;

          tl.to(
            cardEl,
            {
              xPercent: -50,
              yPercent: -50,
              x: target.x,
              y: target.y,
              scale: target.scale,
              rotationZ: target.rotZ,
              zIndex: target.zIndex,
              duration: 0.28,
              ease: "power2.out",
            },
            0.45
          );
        });

        // =========================================================================
        // PHASE 4: FINAL COMPOSITION REST & HOLD (0.85 – 1.00)
        // Clean hold showcasing the two lines with pristine clearance
        // =========================================================================
        tl.to({}, { duration: 0.15 });
      };

      // 1. Large Desktop (min-width: 1280px) — Two Lines (3 cards top, 3 cards bottom)
      mm.add("(min-width: 1280px)", () => {
        createSection4Timeline({
          entryOrigins: [
            { x: -80, y: -30, scale: 0.45, rotZ: 0 },
            { x: 0, y: -30, scale: 0.45, rotZ: 0 },
            { x: 80, y: -30, scale: 0.45, rotZ: 0 },
            { x: -80, y: 30, scale: 0.45, rotZ: 0 },
            { x: 0, y: 30, scale: 0.45, rotZ: 0 },
            { x: 80, y: 30, scale: 0.45, rotZ: 0 },
          ],
          intermediateSpread: [
            { x: -180, y: -70, scale: 0.78, rotZ: 0 },
            { x: 0, y: -70, scale: 0.78, rotZ: 0 },
            { x: 180, y: -70, scale: 0.78, rotZ: 0 },
            { x: -180, y: 70, scale: 0.78, rotZ: 0 },
            { x: 0, y: 70, scale: 0.78, rotZ: 0 },
            { x: 180, y: 70, scale: 0.78, rotZ: 0 },
          ],
          // Clean Two Lines: 3 cards top (y: -125), 3 cards bottom (y: +125)
          finalTwoLineLayout: [
            { x: -305, y: -125, scale: 0.95, rotZ: 0, zIndex: 14 },
            { x: 0, y: -125, scale: 0.95, rotZ: 0, zIndex: 16 },
            { x: 305, y: -125, scale: 0.95, rotZ: 0, zIndex: 14 },
            { x: -305, y: 125, scale: 0.95, rotZ: 0, zIndex: 14 },
            { x: 0, y: 125, scale: 0.95, rotZ: 0, zIndex: 16 },
            { x: 305, y: 125, scale: 0.95, rotZ: 0, zIndex: 14 },
          ],
        });
      });

      // 2. Medium Desktop / Laptop (1024px – 1279px)
      mm.add("(min-width: 1024px) and (max-width: 1279px)", () => {
        createSection4Timeline({
          entryOrigins: [
            { x: -70, y: -25, scale: 0.42, rotZ: 0 },
            { x: 0, y: -25, scale: 0.42, rotZ: 0 },
            { x: 70, y: -25, scale: 0.42, rotZ: 0 },
            { x: -70, y: 25, scale: 0.42, rotZ: 0 },
            { x: 0, y: 25, scale: 0.42, rotZ: 0 },
            { x: 70, y: 25, scale: 0.42, rotZ: 0 },
          ],
          intermediateSpread: [
            { x: -150, y: -60, scale: 0.70, rotZ: 0 },
            { x: 0, y: -60, scale: 0.70, rotZ: 0 },
            { x: 150, y: -60, scale: 0.70, rotZ: 0 },
            { x: -150, y: 60, scale: 0.70, rotZ: 0 },
            { x: 0, y: 60, scale: 0.70, rotZ: 0 },
            { x: 150, y: 60, scale: 0.70, rotZ: 0 },
          ],
          finalTwoLineLayout: [
            { x: -255, y: -110, scale: 0.86, rotZ: 0, zIndex: 14 },
            { x: 0, y: -110, scale: 0.86, rotZ: 0, zIndex: 16 },
            { x: 255, y: -110, scale: 0.86, rotZ: 0, zIndex: 14 },
            { x: -255, y: 110, scale: 0.86, rotZ: 0, zIndex: 14 },
            { x: 0, y: 110, scale: 0.86, rotZ: 0, zIndex: 16 },
            { x: 255, y: 110, scale: 0.86, rotZ: 0, zIndex: 14 },
          ],
        });
      });

      // 3. Tablet (768px – 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        createSection4Timeline({
          entryOrigins: [
            { x: -50, y: -20, scale: 0.38, rotZ: 0 },
            { x: 0, y: -20, scale: 0.38, rotZ: 0 },
            { x: 50, y: -20, scale: 0.38, rotZ: 0 },
            { x: -50, y: 20, scale: 0.38, rotZ: 0 },
            { x: 0, y: 20, scale: 0.38, rotZ: 0 },
            { x: 50, y: 20, scale: 0.38, rotZ: 0 },
          ],
          intermediateSpread: [
            { x: -110, y: -50, scale: 0.60, rotZ: 0 },
            { x: 0, y: -50, scale: 0.60, rotZ: 0 },
            { x: 110, y: -50, scale: 0.60, rotZ: 0 },
            { x: -110, y: 50, scale: 0.60, rotZ: 0 },
            { x: 0, y: 50, scale: 0.60, rotZ: 0 },
            { x: 110, y: 50, scale: 0.60, rotZ: 0 },
          ],
          finalTwoLineLayout: [
            { x: -195, y: -95, scale: 0.74, rotZ: 0, zIndex: 14 },
            { x: 0, y: -95, scale: 0.74, rotZ: 0, zIndex: 16 },
            { x: 195, y: -95, scale: 0.74, rotZ: 0, zIndex: 14 },
            { x: -195, y: 95, scale: 0.74, rotZ: 0, zIndex: 14 },
            { x: 0, y: 95, scale: 0.74, rotZ: 0, zIndex: 16 },
            { x: 195, y: 95, scale: 0.74, rotZ: 0, zIndex: 14 },
          ],
        });
      });

      // 4. Mobile (< 768px)
      mm.add("(max-width: 767px)", () => {
        createSection4Timeline({
          entryOrigins: [
            { x: -30, y: -15, scale: 0.30, rotZ: 0 },
            { x: 0, y: -15, scale: 0.30, rotZ: 0 },
            { x: 30, y: -15, scale: 0.30, rotZ: 0 },
            { x: -30, y: 15, scale: 0.30, rotZ: 0 },
            { x: 0, y: 15, scale: 0.30, rotZ: 0 },
            { x: 30, y: 15, scale: 0.30, rotZ: 0 },
          ],
          intermediateSpread: [
            { x: -60, y: -35, scale: 0.42, rotZ: 0 },
            { x: 0, y: -35, scale: 0.42, rotZ: 0 },
            { x: 60, y: -35, scale: 0.42, rotZ: 0 },
            { x: -60, y: 35, scale: 0.42, rotZ: 0 },
            { x: 0, y: 35, scale: 0.42, rotZ: 0 },
            { x: 60, y: 35, scale: 0.42, rotZ: 0 },
          ],
          finalTwoLineLayout: [
            { x: -110, y: -65, scale: 0.50, rotZ: 0, zIndex: 14 },
            { x: 0, y: -65, scale: 0.50, rotZ: 0, zIndex: 16 },
            { x: 110, y: -65, scale: 0.50, rotZ: 0, zIndex: 14 },
            { x: -110, y: 65, scale: 0.50, rotZ: 0, zIndex: 14 },
            { x: 0, y: 65, scale: 0.50, rotZ: 0, zIndex: 16 },
            { x: 110, y: 65, scale: 0.50, rotZ: 0, zIndex: 14 },
          ],
        });
      });
    }, section4TrackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={section4TrackRef}
      id="uiux-section4-projects-trigger"
      className={`relative w-full bg-[#FAFBFD] text-[#0A1128] min-h-[300vh] sm:min-h-[340vh] border-t border-slate-100/80 ${className}`}
    >
      {/* 
        SECTION 4 PINNED STAGE (100vh):
        Dedicated flex column layout:
        1. Top: Headline & eyebrow cleanly cleared below sticky navbar
        2. Middle: Cards Canvas hosting the two lines (3 cards & 3 cards)
        3. Bottom: Subtle telemetry scrubber
      */}
      <div
        ref={section4StageRef}
        id="uiux-section4-pinned-stage"
        className="relative w-full h-screen min-h-[640px] max-h-[1080px] flex flex-col justify-between items-center pt-20 sm:pt-22 md:pt-24 pb-5 sm:pb-7 px-4 sm:px-6 lg:px-8 select-none overflow-hidden"
      >
        {/* Subtle luminous ambient background lighting */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.08) 0%, rgba(99, 102, 241, 0.05) 35%, transparent 65%),
              radial-gradient(circle at 85% 20%, rgba(219, 39, 119, 0.06) 0%, transparent 50%),
              radial-gradient(circle at 15% 80%, rgba(14, 165, 233, 0.08) 0%, transparent 50%)
            `,
          }}
          aria-hidden="true"
        />

        {/* 
          TOP PROMINENT SECTION HEADLINE:
          Sits directly below the 72px sticky navbar in the normal flex flow (shrink-0).
          Guaranteed 100% visible, crisp, and never overlapped by cards!
        */}
        <div
          ref={headerRef}
          className="relative z-30 flex flex-col items-center text-center max-w-2xl mx-auto pt-1 sm:pt-2 px-4 shrink-0 pointer-events-none"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.04)] mb-2 backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8]" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.20em] text-[#1668E8] uppercase font-mono">
              SELECTED WORK // DIGITAL PRODUCTS
            </span>
          </div>

          {/* Main Display Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#07152B] tracking-tight leading-tight">
            Built for people.{" "}
            <span className="bg-gradient-to-r from-[#1668E8] via-[#6366F1] to-[#DB2777] bg-clip-text text-transparent">
              Designed for impact.
            </span>
          </h2>
        </div>

        {/* 
          PROJECT CARDS CANVAS:
          Hosts the 6 brand-new visual cards forming the two-line composition (3 cards & 3 cards).
          Sits in the middle flex space, completely separate from and well below the headline.
        */}
        <div
          id="uiux-section4-cards-canvas"
          className="relative z-10 w-full max-w-6xl flex-1 flex items-center justify-center my-auto overflow-visible"
          style={{
            perspective: 1400,
          }}
        >
          {SECTION4_PROJECTS.map((project, idx) => (
            <ProjectShowcaseCard
              key={project.id}
              project={project}
              index={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
            />
          ))}
        </div>

        {/* Bottom subtle scroll telemetry indicator */}
        <div className="relative z-20 w-full max-w-7xl flex items-center justify-between px-2 sm:px-6 shrink-0 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-200/60 text-[10px] sm:text-[11px] font-mono text-[#556987]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8]" />
            <span>
              {scrollProgress < 0.25
                ? "Scroll down to reveal project showcase"
                : scrollProgress < 0.70
                ? "Spreading into two curated tiers"
                : "Digital Product Architecture"}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>Showcase Scrub</span>
            <span className="text-slate-300">|</span>
            <span className="font-semibold text-slate-700">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
