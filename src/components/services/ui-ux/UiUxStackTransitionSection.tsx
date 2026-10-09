"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceCard } from "./ServiceCard";
import { SERVICE_CARDS } from "./data";

export interface UiUxStackTransitionSectionProps {
  onStartProject?: () => void;
  className?: string;
}

/**
 * SECTION 3: Card Convergence, Downward Travel & Right-Side Diagonal Split Section
 *
 * Implements the exact sequence requested:
 * 1. Initial State: Cards are aligned in ONE compact unified card/stack near the upper center.
 *    (No duplicate separated cards at the start of Section 3).
 * 2. Phase 1 (0.00 – 0.30): That ONE closed card travels DOWNWARD into Section 3 and shifts rightward
 *    ("then the one card will be like down in the third section").
 * 3. Phase 2 (0.30 – 0.78): On the right side, the cards SPLIT in a spacious DIAGONAL cascade
 *    stepping down to the right ("and then they will split in the diagonal, okay? Make the diagonal so that images are clearly visible!").
 * 4. Phase 2B (0.30 – 0.78): Concurrently on the LEFT side, editorial content reveals progressively:
 *    - Category: UI / UX DESIGN
 *    - Headline: Design experiences people remember.
 *    - Description: From user research and interaction design to polished interfaces...
 *    - CTA: Start a Project ->
 * 5. Phase 3 (0.78 – 1.00): Holds the final composition (LEFT = Text, RIGHT = Spacious Diagonal Cards).
 * 6. Bi-directional scrub via GSAP ScrollTrigger (smoothly reverses on scroll up).
 */
export const UiUxStackTransitionSection: React.FC<UiUxStackTransitionSectionProps> = ({
  onStartProject,
  className = "",
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Left-side editorial content refs
  const textContainerRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!trackRef.current || !stageRef.current) return;

      const mm = gsap.matchMedia();

      const createSection3Animation = (config: {
        initialStack: { x: number; y: number; z: number; rZ: number; scale: number; zIndex: number }[];
        downwardStack: { x: number; y: number; z: number; rZ: number; scale: number; zIndex: number }[];
        diagonalOpen: { x: number; y: number; z: number; rZ: number; scale: number; zIndex: number }[];
      }) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stageRef.current,
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            },
          },
        });

        // Set initial state: cards start ALIGNED IN ONE COMPACT CARD near upper-center
        // (NO duplicate separated cards in Section 3)
        config.initialStack.forEach((stk, idx) => {
          const cardEl = cardRefs.current[idx];
          if (!cardEl) return;
          gsap.set(cardEl, {
            xPercent: -50,
            yPercent: -50,
            x: stk.x,
            y: stk.y,
            z: stk.z,
            rotationZ: stk.rZ,
            rotationY: 0,
            scale: stk.scale,
            transformPerspective: 1400,
            zIndex: stk.zIndex,
          });
        });

        // Set initial state for left text (hidden)
        if (textContainerRef.current) {
          gsap.set(textContainerRef.current, { opacity: 0, pointerEvents: "none" });
        }
        if (categoryRef.current) {
          gsap.set(categoryRef.current, { opacity: 0, y: 20 });
        }
        if (headingRef.current) {
          gsap.set(headingRef.current, { opacity: 0, y: 25 });
        }
        if (descRef.current) {
          gsap.set(descRef.current, { opacity: 0, y: 20 });
        }
        if (ctaRef.current) {
          gsap.set(ctaRef.current, { opacity: 0, y: 15 });
        }

        // =========================================================================
        // PHASE 1: THAT ONE CARD TRAVELS DOWNWARD INTO SECTION 3 (0.00 – 0.30)
        // User sees the closed card move down into this section and shift rightward
        // =========================================================================
        config.downwardStack.forEach((down, idx) => {
          const cardEl = cardRefs.current[idx];
          if (!cardEl) return;

          tl.to(
            cardEl,
            {
              xPercent: -50,
              yPercent: -50,
              x: down.x,
              y: down.y,
              z: down.z,
              rotationZ: down.rZ,
              rotationY: 0,
              scale: down.scale,
              zIndex: down.zIndex,
              duration: 0.30,
              ease: "power2.inOut",
            },
            0.0
          );
        });

        // =========================================================================
        // PHASE 2: CARDS SPLIT IN THE DIAGONAL (0.30 – 0.78)
        // Spacious, prominent diagonal fan stepping down to the right so EVERY image is clearly visible
        // =========================================================================
        config.diagonalOpen.forEach((diag, idx) => {
          const cardEl = cardRefs.current[idx];
          if (!cardEl) return;

          tl.to(
            cardEl,
            {
              xPercent: -50,
              yPercent: -50,
              x: diag.x,
              y: diag.y,
              z: diag.z,
              rotationZ: diag.rZ,
              rotationY: 0,
              scale: diag.scale,
              zIndex: diag.zIndex,
              duration: 0.48,
              ease: "power2.out",
            },
            0.30
          );
        });

        // =========================================================================
        // PHASE 2B: CONCURRENT LEFT CONTENT REVEAL (0.30 – 0.78)
        // Progressive reveal: Container -> Category -> Heading -> Description -> CTA
        // =========================================================================
        if (textContainerRef.current) {
          tl.to(
            textContainerRef.current,
            {
              opacity: 1,
              pointerEvents: "auto",
              duration: 0.08,
            },
            0.30
          );
        }

        // 1. Category label appears
        if (categoryRef.current) {
          tl.to(
            categoryRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.14,
              ease: "power2.out",
            },
            0.32
          );
        }

        // 2. Main heading begins appearing & completes
        if (headingRef.current) {
          tl.to(
            headingRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.18,
              ease: "power2.out",
            },
            0.42
          );
        }

        // 3. Supporting description slides into view
        if (descRef.current) {
          tl.to(
            descRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.16,
              ease: "power2.out",
            },
            0.54
          );
        }

        // 4. Action CTA button appears last
        if (ctaRef.current) {
          tl.to(
            ctaRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.14,
              ease: "power2.out",
            },
            0.64
          );
        }

        // =========================================================================
        // PHASE 3: FINAL COMPOSITION HOLD (0.78 – 1.00)
        // LEFT = Text & CTA | RIGHT = Cards Open in Spacious Diagonal Cascade
        // =========================================================================
        tl.to({}, { duration: 0.22 });
      };

      // 1. Large Desktop (min-width: 1280px) — Wide, prominent diagonal cascade
      mm.add("(min-width: 1280px)", () => {
        createSection3Animation({
          // Initial: 1 compact unified card stack at upper-center
          initialStack: [
            { x: -8, y: -70, z: 10, rZ: -2.0, scale: 0.94, zIndex: 10 },
            { x: -4, y: -67, z: 20, rZ: -1.0, scale: 0.96, zIndex: 20 },
            { x: 0, y: -64, z: 30, rZ: 0, scale: 0.98, zIndex: 30 },
            { x: 4, y: -61, z: 40, rZ: 1.0, scale: 1.00, zIndex: 40 },
            { x: 8, y: -58, z: 50, rZ: 2.0, scale: 1.02, zIndex: 50 },
          ],
          // Downward move: 1 compact stack travels down into section and shifts right
          downwardStack: [
            { x: 132, y: 14, z: 10, rZ: -2.0, scale: 0.94, zIndex: 10 },
            { x: 136, y: 17, z: 20, rZ: -1.0, scale: 0.96, zIndex: 20 },
            { x: 140, y: 20, z: 30, rZ: 0, scale: 0.98, zIndex: 30 },
            { x: 144, y: 23, z: 40, rZ: 1.0, scale: 1.00, zIndex: 40 },
            { x: 148, y: 26, z: 50, rZ: 2.0, scale: 1.02, zIndex: 50 },
          ],
          // Spacious Diagonal Split: ΔX = 110px, ΔY = 45px, cards clearly visible!
          diagonalOpen: [
            { x: 50, y: -80, z: 10, rZ: -1.5, scale: 0.90, zIndex: 10 },
            { x: 160, y: -35, z: 20, rZ: 0.0, scale: 0.92, zIndex: 20 },
            { x: 270, y: 10, z: 30, rZ: 1.5, scale: 0.94, zIndex: 30 },
            { x: 380, y: 55, z: 40, rZ: 3.0, scale: 0.96, zIndex: 40 },
            { x: 490, y: 100, z: 50, rZ: 4.5, scale: 0.98, zIndex: 50 },
          ],
        });
      });

      // 2. Medium Desktop / Laptop (1024px – 1279px)
      mm.add("(min-width: 1024px) and (max-width: 1279px)", () => {
        createSection3Animation({
          initialStack: [
            { x: -6, y: -60, z: 10, rZ: -1.8, scale: 0.92, zIndex: 10 },
            { x: -3, y: -57, z: 20, rZ: -0.9, scale: 0.94, zIndex: 20 },
            { x: 0, y: -54, z: 30, rZ: 0, scale: 0.96, zIndex: 30 },
            { x: 3, y: -51, z: 40, rZ: 0.9, scale: 0.98, zIndex: 40 },
            { x: 6, y: -48, z: 50, rZ: 1.8, scale: 1.00, zIndex: 50 },
          ],
          downwardStack: [
            { x: 104, y: 15, z: 10, rZ: -1.8, scale: 0.92, zIndex: 10 },
            { x: 107, y: 18, z: 20, rZ: -0.9, scale: 0.94, zIndex: 20 },
            { x: 110, y: 21, z: 30, rZ: 0, scale: 0.96, zIndex: 30 },
            { x: 113, y: 24, z: 40, rZ: 0.9, scale: 0.98, zIndex: 40 },
            { x: 116, y: 27, z: 50, rZ: 1.8, scale: 1.00, zIndex: 50 },
          ],
          // Spacious Diagonal Split: ΔX = 95px, ΔY = 40px
          diagonalOpen: [
            { x: 30, y: -65, z: 10, rZ: -1.5, scale: 0.84, zIndex: 10 },
            { x: 125, y: -25, z: 20, rZ: 0.0, scale: 0.86, zIndex: 20 },
            { x: 220, y: 15, z: 30, rZ: 1.5, scale: 0.88, zIndex: 30 },
            { x: 315, y: 55, z: 40, rZ: 3.0, scale: 0.90, zIndex: 40 },
            { x: 410, y: 95, z: 50, rZ: 4.5, scale: 0.92, zIndex: 50 },
          ],
        });
      });

      // 3. Tablet (768px – 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        createSection3Animation({
          initialStack: [
            { x: -5, y: -40, z: 10, rZ: -1.5, scale: 0.86, zIndex: 10 },
            { x: -2, y: -38, z: 20, rZ: -0.7, scale: 0.88, zIndex: 20 },
            { x: 0, y: -36, z: 30, rZ: 0, scale: 0.90, zIndex: 30 },
            { x: 2, y: -34, z: 40, rZ: 0.7, scale: 0.92, zIndex: 40 },
            { x: 5, y: -32, z: 50, rZ: 1.5, scale: 0.94, zIndex: 50 },
          ],
          downwardStack: [
            { x: 25, y: 65, z: 10, rZ: -1.5, scale: 0.86, zIndex: 10 },
            { x: 28, y: 68, z: 20, rZ: -0.7, scale: 0.88, zIndex: 20 },
            { x: 30, y: 70, z: 30, rZ: 0, scale: 0.90, zIndex: 30 },
            { x: 32, y: 72, z: 40, rZ: 0.7, scale: 0.92, zIndex: 40 },
            { x: 35, y: 75, z: 50, rZ: 1.5, scale: 0.94, zIndex: 50 },
          ],
          diagonalOpen: [
            { x: -80, y: 70, z: 10, rZ: -1.0, scale: 0.74, zIndex: 10 },
            { x: -15, y: 100, z: 20, rZ: 0.5, scale: 0.76, zIndex: 20 },
            { x: 50, y: 130, z: 30, rZ: 2.0, scale: 0.78, zIndex: 30 },
            { x: 115, y: 160, z: 40, rZ: 3.5, scale: 0.80, zIndex: 40 },
            { x: 180, y: 190, z: 50, rZ: 5.0, scale: 0.82, zIndex: 50 },
          ],
        });
      });

      // 4. Mobile (< 768px)
      mm.add("(max-width: 767px)", () => {
        createSection3Animation({
          initialStack: [
            { x: -4, y: -20, z: 10, rZ: -1.0, scale: 0.72, zIndex: 10 },
            { x: -2, y: -18, z: 20, rZ: -0.5, scale: 0.74, zIndex: 20 },
            { x: 0, y: -16, z: 30, rZ: 0, scale: 0.76, zIndex: 30 },
            { x: 2, y: -14, z: 40, rZ: 0.5, scale: 0.78, zIndex: 40 },
            { x: 4, y: -12, z: 50, rZ: 1.0, scale: 0.80, zIndex: 50 },
          ],
          downwardStack: [
            { x: 0, y: 75, z: 10, rZ: -1.0, scale: 0.72, zIndex: 10 },
            { x: 2, y: 77, z: 20, rZ: -0.5, scale: 0.74, zIndex: 20 },
            { x: 4, y: 79, z: 30, rZ: 0, scale: 0.76, zIndex: 30 },
            { x: 6, y: 81, z: 40, rZ: 0.5, scale: 0.78, zIndex: 40 },
            { x: 8, y: 83, z: 50, rZ: 1.0, scale: 0.80, zIndex: 50 },
          ],
          diagonalOpen: [
            { x: -56, y: 55, z: 10, rZ: -2.5, scale: 0.68, zIndex: 10 },
            { x: -28, y: 75, z: 20, rZ: -1.0, scale: 0.70, zIndex: 20 },
            { x: 0, y: 95, z: 30, rZ: 0.5, scale: 0.72, zIndex: 30 },
            { x: 28, y: 115, z: 40, rZ: 2.0, scale: 0.74, zIndex: 40 },
            { x: 56, y: 135, z: 50, rZ: 3.5, scale: 0.76, zIndex: 50 },
          ],
        });
      });
    }, trackRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={trackRef}
      id="uiux-section3-stack-trigger"
      className={`relative w-full bg-[#FAFBFD] text-[#0A1128] min-h-[280vh] sm:min-h-[320vh] border-t border-slate-100/60 ${className}`}
    >
      {/* 
        SECTION 3 DEDICATED PINNED STAGE (100vh):
        Stages 1 Card Downward Travel, Right-Side Diagonal Split,
        and Left-Side Editorial Content Reveal.
      */}
      <div
        ref={stageRef}
        id="uiux-section3-pinned-stage"
        className="relative w-full h-[100dvh] min-h-[580px] max-h-[1080px] flex items-center justify-center px-3 sm:px-6 lg:px-12 select-none overflow-hidden"
      >
        {/* Subtle luminous ambient background lighting */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 75% 55%, rgba(2, 132, 199, 0.14) 0%, rgba(219, 39, 119, 0.08) 40%, transparent 68%),
              radial-gradient(circle at 20% 45%, rgba(56, 189, 248, 0.10) 0%, rgba(129, 140, 248, 0.06) 40%, transparent 65%)
            `,
          }}
          aria-hidden="true"
        />

        {/* Top subtle stage indicator */}
        <div className="absolute top-4 sm:top-8 inset-x-0 flex items-center justify-between px-4 sm:px-12 max-w-7xl mx-auto z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-slate-200/80 shadow-xs backdrop-blur-xs">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                scrollProgress > 0.3 ? "bg-[#1668E8]" : "bg-emerald-500 animate-pulse"
              }`}
            />
            <span className="text-[10px] sm:text-[11px] font-mono text-[#556987] font-semibold tracking-wider uppercase">
              {scrollProgress < 0.3
                ? "Unified Card Entry"
                : scrollProgress < 0.75
                ? "Diagonal Service Cascade"
                : "UI/UX Architecture"}
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
          LEFT-SIDE EDITORIAL REVEAL CONTENT:
          Appears progressively as cards open diagonally on the right
          Category -> Heading -> Description -> CTA
        */}
        <div
          ref={textContainerRef}
          className="absolute left-4 sm:left-10 lg:left-16 xl:left-24 top-[9%] xs:top-[11%] sm:top-1/2 sm:-translate-y-1/2 max-w-[92%] sm:max-w-md lg:max-w-[440px] xl:max-w-[480px] z-30 pointer-events-none text-center sm:text-left mx-auto sm:mx-0 inset-x-0 sm:inset-x-auto"
          style={{ opacity: 0 }}
        >
          {/* 1. Category Badge */}
          <div
            ref={categoryRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.04)] mb-2 sm:mb-4 backdrop-blur-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.20em] text-[#1668E8] uppercase font-mono">
              UI / UX DESIGN
            </span>
          </div>

          {/* 2. Display Heading */}
          <h2
            ref={headingRef}
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#07152B] tracking-tight leading-[1.14] mb-2 sm:mb-4"
          >
            <span className="block">Design experiences</span>
            <span className="block bg-gradient-to-r from-[#07152B] via-[#1668E8] to-[#DB2777] bg-clip-text text-transparent">
              people remember.
            </span>
          </h2>

          {/* 3. Short Supporting Description */}
          <p
            ref={descRef}
            className="text-xs sm:text-sm md:text-base text-[#556987] leading-relaxed mb-3 sm:mb-6 max-w-sm sm:max-w-md mx-auto sm:mx-0 line-clamp-3 sm:line-clamp-none"
          >
            From user research and interaction design to polished interfaces, we create digital experiences that are intuitive, engaging and built for real users.
          </p>

          {/* 4. Action CTA Button */}
          <div ref={ctaRef} className="pointer-events-auto">
            <button
              type="button"
              onClick={onStartProject}
              className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#07152B] text-white text-xs sm:text-sm font-semibold hover:bg-[#1668E8] shadow-[0_4px_16px_rgba(7,21,43,0.18)] hover:shadow-[0_6px_22px_rgba(22,104,232,0.32)] transition-all inline-flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* 
          CARDS CANVAS:
          Starts in ONE compact card stack -> travels downward -> SPLITS into spacious diagonal cascade on right
        */}
        <div
          id="uiux-section3-cards-canvas"
          className="relative z-10 w-full max-w-5xl h-[240px] xs:h-[265px] sm:h-[310px] md:h-[330px] flex items-center justify-center overflow-visible"
          style={{
            perspective: 1400,
          }}
        >
          {SERVICE_CARDS.map((card, idx) => (
            <ServiceCard
              key={card.id}
              card={card}
              index={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{
                zIndex: idx === 4 ? 50 : idx === 3 ? 40 : idx === 2 ? 30 : idx === 1 ? 20 : 10,
              }}
            />
          ))}
        </div>

        {/* Bottom subtle guidance */}
        <div className="absolute bottom-6 sm:bottom-8 inset-x-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-200/60 text-[10.5px] sm:text-[11px] font-mono text-[#556987]">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>
              {scrollProgress < 0.3
                ? "Scroll down: Card travels downward"
                : scrollProgress < 0.75
                ? "Diagonal service cascade"
                : "UI/UX capabilities preview"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
