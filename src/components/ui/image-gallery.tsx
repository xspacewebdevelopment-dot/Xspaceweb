import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

export interface ImageGalleryProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  images?: string[];
  className?: string;
}

const defaultImages = [
  "/images/selected-work/select1.png",
  "/images/selected-work/select2.png",
  "/images/selected-work/select3.png",
  "/images/selected-work/select4.png",
  "/images/selected-work/select5.png",
  "/images/selected-work/select6.png",
  "/images/selected-work/paper_dunes_sunrise.png",
];

/* Zigzag vertical offsets — even indices shift down, odd indices shift up */
const ZIGZAG_OFFSETS = [
  "translate-y-6",   // 0: down
  "-translate-y-6",  // 1: up
  "translate-y-10",  // 2: down more
  "-translate-y-4",  // 3: up
  "translate-y-8",   // 4: down
  "-translate-y-8",  // 5: up more
  "translate-y-4",   // 6: down
  "-translate-y-6",  // 7: up
  "translate-y-6",   // 8: down
  "-translate-y-10", // 9: up more
  "translate-y-4",   // 10: down
  "-translate-y-4",  // 11: up
];

/* Slight height variation for organic feel */
const HEIGHT_VARIANTS = [
  "h-[380px] sm:h-[440px] md:h-[480px]",
  "h-[340px] sm:h-[400px] md:h-[440px]",
  "h-[360px] sm:h-[420px] md:h-[460px]",
  "h-[390px] sm:h-[450px] md:h-[490px]",
  "h-[350px] sm:h-[410px] md:h-[450px]",
  "h-[370px] sm:h-[430px] md:h-[470px]",
  "h-[345px] sm:h-[405px] md:h-[445px]",
  "h-[385px] sm:h-[445px] md:h-[485px]",
  "h-[355px] sm:h-[415px] md:h-[455px]",
  "h-[375px] sm:h-[435px] md:h-[475px]",
  "h-[365px] sm:h-[425px] md:h-[465px]",
  "h-[380px] sm:h-[440px] md:h-[480px]",
];

export default function ImageGallery({
  eyebrow = "Studio XSW®",
  title = "Selected Work",
  subtitle = "Ideas we've designed, built & brought to life.",
  images = defaultImages,
  className,
}: ImageGalleryProps) {
  return (
    <section className={cn("w-full flex flex-col items-center justify-start py-12 sm:py-16 select-none", className)}>
      {/* Header */}
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

      {/* Zigzag Image Strip Gallery — no animation, static staggered layout */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 w-full max-w-6xl mt-6 sm:mt-8 px-4 py-12 sm:py-16 overflow-visible">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={cn(
              "relative flex-1 min-w-0 rounded-2xl overflow-hidden shadow-lg border border-slate-200/60",
              ZIGZAG_OFFSETS[idx % ZIGZAG_OFFSETS.length],
              HEIGHT_VARIANTS[idx % HEIGHT_VARIANTS.length]
            )}
          >
            <Image
              className="object-cover object-center"
              src={src}
              alt={`selected-work-${idx + 1}`}
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 160px"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
