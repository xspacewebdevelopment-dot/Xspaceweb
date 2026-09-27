"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

export interface ImageGalleryProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  images?: string[];
  className?: string;
}

const defaultImages = [
  "/select/select1.png",
  "/select/select2.png",
  "/select/select3.png",
  "/select/select4.png",
  "/select/select5.png",
  "/select/select6.png",
  "/select/Paper Dunes at Sunrise.png",
];

export default function ImageGallery({
  eyebrow = "Studio XSW®",
  title = "Selected Work",
  subtitle = "Ideas we've designed, built & brought to life.",
  images = defaultImages,
  className,
}: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className={cn("w-full flex flex-col items-center justify-start py-12 sm:py-16 select-none", className)}>
      {/* Header Container */}
      <div className="max-w-3xl text-center px-4 space-y-2">
        {eyebrow && (
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#64748B] uppercase block">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight">
          Selected <span className="text-[#1668E8]">Work</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Accordion Image Gallery */}
      <div className="flex items-center gap-2 sm:gap-3 h-[420px] sm:h-[480px] md:h-[520px] w-full max-w-6xl mt-8 sm:mt-12 px-4 overflow-hidden">
        {images.map((src, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              className={cn(
                "relative group flex-grow transition-all duration-500 ease-in-out rounded-2xl overflow-hidden h-full cursor-pointer shadow-lg border border-slate-200/80",
                "w-16 sm:w-24 md:w-32 hover:w-full hover:flex-[3]",
                isActive ? "flex-[3] ring-2 ring-blue-500/50 shadow-2xl" : "flex-1"
              )}
            >
              <img
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                src={src}
                alt={`selected-work-${idx + 1}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
