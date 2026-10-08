"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceCard } from "./ServiceCard";
import { SERVICE_CARDS, ServiceCardData } from "./data";

export interface UiUxAnimationStageProps {
  className?: string;
}

/**
 * Dedicated Full-Viewport UI/UX Animation Stage
 *
 * Implements:
 * 1. An independent scroll-pinned stage that owns its own 100vh viewport.
 * 2. Visual artwork is centered in the DEAD CENTER of the screen (both X & Y).
 * 3. Starts with ONE single UI artwork in the center.
 * 4. As user scrolls, the cards split & fan out outward from the origin.
 * 5. Card 3 remains near center as visual anchor.
 * 6. Smooth bidirectional scrub via GSAP ScrollTrigger.
 * 7. When the transformation finishes, the pin releases cleanly BEFORE the footer.
 */
export const UiUxAnimationStage: React.FC<UiUxAnimationStageProps> = ({ className = "" }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!trackRef.current || !stageRef.current) return;

      const mm = gsap.matchMedia();

      const createFanningAnimation = (spreads: { x: number; y: number; z: number; rZ: number; rY: number; scale: number }[]) => {
        // Master scroll-driven timeline pinned to the dedicated track
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stageRef.current,
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            },
          },
        });

        // Set initial state: all 5 cards overlap exactly at center (0, 0, 0)
        cardRefs.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          gsap.set(cardEl, {
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

        // Phase 1: Initial Hold (0% – 15%) — User sees ONE centered artwork
        tl.to({}, { duration: 0.15 });

        // Phase 2: Card Split & Spread (15% – 75%) — Cards separate outward from center
        spreads.forEach((spread, idx) => {
          const cardEl = cardRefs.current[idx];
          if (!cardEl) return;

          tl.to(
            cardEl,
            {
              x: spread.x,
              y: spread.y,
              z: spread.z,
              rotationZ: spread.rZ,
              rotationY: spread.rY,
              scale: spread.scale,
              duration: 0.60,
              ease: "power2.out",
            },
            0.15
          );
        });

        // Phase 3: Final Fan Hold (75% – 100%) — Cards rest in stable fan before pin release
        tl.to({}, { duration: 0.25 });
      };

      // 1. Large Desktop (min-width: 1280px)
      mm.add("(min-width: 1280px)", () => {
        createFanningAnimation([
          { x: -390, y: 20, z: -30, rZ: -8.5, rY: 4.5, scale: 0.95 },
          { x: -195, y: 10, z: -15, rZ: -4.2, rY: 2.2, scale: 0.98 },
          { x: 0, y: 0, z: 20, rZ: 0, rY: 0, scale: 1.03 },
          { x: 195, y: 10, z: -15, rZ: 4.2, rY: -2.2, scale: 0.98 },
          { x: 390, y: 20, z: -30, rZ: 8.5, rY: -4.5, scale: 0.95 },
        ]);
      });

      // 2. Medium Desktop / Laptop (1024px – 1279px)
      mm.add("(min-width: 1024px) and (max-width: 1279px)", () => {
        createFanningAnimation([
          { x: -310, y: 16, z: -25, rZ: -7.5, rY: 3.5, scale: 0.92 },
          { x: -155, y: 8, z: -10, rZ: -3.8, rY: 1.8, scale: 0.96 },
          { x: 0, y: 0, z: 15, rZ: 0, rY: 0, scale: 1.0 },
          { x: 155, y: 8, z: -10, rZ: 3.8, rY: -1.8, scale: 0.96 },
          { x: 310, y: 16, z: -25, rZ: 7.5, rY: -3.5, scale: 0.92 },
        ]);
      });

      // 3. Tablet (768px – 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        createFanningAnimation([
          { x: -210, y: 12, z: -20, rZ: -6.0, rY: 2.5, scale: 0.88 },
          { x: -105, y: 6, z: -10, rZ: -3.0, rY: 1.2, scale: 0.94 },
          { x: 0, y: 0, z: 12, rZ: 0, rY: 0, scale: 0.98 },
          { x: 105, y: 6, z: -10, rZ: 3.0, rY: -1.2, scale: 0.94 },
          { x: 210, y: 12, z: -20, rZ: 6.0, rY: -2.5, scale: 0.88 },
        ]);
      });

      // 4. Mobile (< 768px) — Stacked Deck Fan without Horizontal Overflow
      mm.add("(max-width: 767px)", () => {
        createFanningAnimation([
          { x: -64, y: -14, z: -20, rZ: -4.5, rY: 1.5, scale: 0.86 },
          { x: -32, y: -7, z: -10, rZ: -2.2, rY: 0.8, scale: 0.90 },
          { x: 0, y: 0, z: 10, rZ: 0, rY: 0, scale: 0.96 },
          { x: 32, y: 7, z: -10, rZ: 2.2, rY: -0.8, scale: 0.90 },
          { x: 64, y: 14, z: -20, rZ: 4.5, rY: -1.5, scale: 0.86 },
        ]);
      });
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={trackRef}
      id="uiux-animation-stage-trigger"
      className={`relative w-full bg-[#FAFBFD] text-[#0A1128] overflow-x-hidden min-h-[220vh] sm:min-h-[240vh] ${className}`}
    >
      {/* 
        DEDICATED FULL-VIEWPORT PINNED STAGE:
        Stays fixed in the center of the viewport (100vh) while pinned.
      */}
      <div
        ref={stageRef}
        id="uiux-animation-pinned-stage"
        className="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 select-none overflow-hidden"
      >
        {/* Subtle stage ambient radial background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(22, 104, 232, 0.05) 0%, transparent 65%),
              radial-gradient(circle at 15% 15%, rgba(148, 163, 184, 0.03) 0%, transparent 50%)
            `,
          }}
          aria-hidden="true"
        />

        {/* Top Stage Indicator: Clean, non-intrusive discipline counter */}
        <div className="absolute top-6 sm:top-8 inset-x-0 flex items-center justify-between px-6 sm:px-12 max-w-7xl mx-auto z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200/80 shadow-sm backdrop-blur-sm">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                scrollProgress > 0.25 ? "bg-[#1668E8]" : "bg-emerald-500 animate-pulse"
              }`}
            />
            <span className="text-[11px] font-mono text-[#556987] font-medium tracking-wider uppercase">
              {scrollProgress < 0.2
                ? "Unified Digital Product"
                : scrollProgress < 0.75
                ? "Splitting Design Disciplines"
                : "5 Integrated Design Disciplines"}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span>Scroll Scrub</span>
            <span className="text-slate-300">|</span>
            <span className="font-semibold text-slate-700">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* 
          DEAD-CENTER ARTWORK & CARDS CANVAS:
          Centered both horizontally and vertically in this 100vh stage.
          All 5 cards originate directly from (0, 0, 0).
        */}
        <div
          id="uiux-center-stage"
          className="relative z-10 w-full max-w-5xl h-[380px] sm:h-[420px] md:h-[460px] flex items-center justify-center overflow-visible my-auto"
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

        {/* Bottom Stage Hint: Guides user smoothly through the scroll */}
        <div className="absolute bottom-6 sm:bottom-8 inset-x-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-200/60 text-[11px] font-mono text-[#556987]">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>
              {scrollProgress < 0.8
                ? "Scroll down to expand capabilities"
                : "Scroll down to continue"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
