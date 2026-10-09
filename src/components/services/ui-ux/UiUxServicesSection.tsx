"use client";

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SECTION5_SERVICES, UiUxServiceItem } from "./servicesData";

export interface UiUxServicesSectionProps {
  onStartProject?: () => void;
  className?: string;
}

/**
 * SECTION 5: UI/UX Services & Capabilities Information
 *
 * A clean, editorial, text-based information section explaining XSPACEWEB's 9 core UI/UX services.
 * Strictly isolated:
 * - Normal scrolling (NO PINNING, NO HORIZONTAL SCROLL)
 * - Text-first focus with 9 structured service cards
 * - 3 columns desktop, 2 columns tablet, 1 column mobile
 * - Subtle staggered viewport entrance animation (respects prefers-reduced-motion)
 * - Micro-interaction on hover (subtle upward shift + arrow slide)
 */
export const UiUxServicesSection: React.FC<UiUxServicesSectionProps> = ({
  className = "",
}) => {
  const section5Ref = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Reduced motion accessibility check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Show all elements immediately without animation
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
      if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, y: 0 });
      if (descriptionRef.current) gsap.set(descriptionRef.current, { opacity: 1, y: 0 });
      cardRefs.current.forEach((card) => {
        if (card) gsap.set(card, { opacity: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      if (!section5Ref.current) return;

      const validCards = cardRefs.current.filter(Boolean);

      // Initial hidden state for entrance animation
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 16 });
      if (headingRef.current) gsap.set(headingRef.current, { opacity: 0, y: 18 });
      if (descriptionRef.current) gsap.set(descriptionRef.current, { opacity: 0, y: 16 });
      if (validCards.length > 0) gsap.set(validCards, { opacity: 0, y: 20 });

      // Subtle viewport entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section5Ref.current,
          start: "top 80%",
          once: true,
        },
      });

      // 1. Eyebrow appears
      if (eyebrowRef.current) {
        tl.to(eyebrowRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      // 2. Main heading reveals
      if (headingRef.current) {
        tl.to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.25"
        );
      }

      // 3. Supporting paragraph appears
      if (descriptionRef.current) {
        tl.to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.25"
        );
      }

      // 4. Nine service cards reveal with subtle stagger
      if (validCards.length > 0) {
        tl.to(
          validCards,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    }, section5Ref);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={section5Ref}
      id="section5-services"
      className={`relative w-full bg-[#FAFBFD] text-[#0A1128] py-16 xs:py-20 sm:py-28 md:py-32 px-3.5 sm:px-6 lg:px-12 border-t border-slate-100 select-none ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* ========================================================================= */}
        {/* SECTION 5 HEADER / INTRO */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
          {/* Eyebrow Pill */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(15,23,42,0.03)] mb-3 sm:mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8]" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.20em] text-[#1668E8] uppercase font-mono">
              UI / UX SERVICES
            </span>
          </div>

          {/* Main Display Heading */}
          <h2
            ref={headingRef}
            id="section5-heading"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight leading-[1.14]"
          >
            Designing experiences{" "}
            <span className="block sm:inline bg-gradient-to-r from-[#1668E8] via-[#6366F1] to-[#DB2777] bg-clip-text text-transparent">
              from idea to impact.
            </span>
          </h2>

          {/* Supporting Paragraph */}
          <p
            ref={descriptionRef}
            id="section5-description"
            className="mt-3.5 sm:mt-5 text-xs sm:text-base text-[#556987] leading-relaxed max-w-2xl px-2"
          >
            We create thoughtful digital experiences that connect user needs with
            business goals — from research and strategy to intuitive interfaces,
            prototypes and scalable design systems.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 9-CARD RESPONSIVE GRID (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
        {/* ========================================================================= */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7"
        >
          {SECTION5_SERVICES.map((service: UiUxServiceItem, idx: number) => (
            <div
              key={service.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              id={`section5-service-card-${idx}`}
              className="group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 md:p-8 shadow-[0_4px_16px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 ease-out cursor-default"
            >
              {/* Card Top: Number & Subtle Action Arrow */}
              <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-slate-100/90">
                <span className="text-xs font-mono font-bold tracking-widest text-[#1668E8] group-hover:text-[#0B4FC0] transition-colors duration-300">
                  {service.number}
                </span>
                <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#1668E8] group-hover:border-[#1668E8]/30 group-hover:bg-[#1668E8]/5 transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </div>

              {/* Card Middle & Bottom Content */}
              <div className="pt-5 flex-1 flex flex-col">
                <h3 className="text-base sm:text-[17px] font-bold text-[#07152B] tracking-tight uppercase group-hover:text-[#1668E8] transition-colors duration-300">
                  {service.name}
                </h3>

                <p className="mt-2 text-xs sm:text-[13px] font-medium text-slate-800 leading-snug">
                  {service.tagline}
                </p>

                <p className="mt-3 text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Subtle Bottom Accent Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8]" />
                <span className="text-[10px] font-mono font-semibold tracking-wider text-[#1668E8] uppercase">
                  Service Capability
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
