"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { CENTRAL_ARTWORK, CentralArtworkMeta } from "./data";

export interface CentralUiArtworkProps {
  meta?: CentralArtworkMeta;
  className?: string;
}

/**
 * Central UI Artwork Component
 * Represents the single digital interface designed by the company.
 * Clean, compact, minimal editorial aesthetic with subtle depth and rounded corners.
 * Serves as the primary visual foundation that will split into multiple service cards in Prompt 2.
 */
export const CentralUiArtwork = forwardRef<HTMLDivElement, CentralUiArtworkProps>(
  ({ meta = CENTRAL_ARTWORK, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        id="uiux-central-artwork"
        className={`relative w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[640px] rounded-2xl bg-white border border-slate-200/90 shadow-[0_18px_45px_rgba(15,23,42,0.07)] overflow-hidden transition-all duration-300 select-none ${className}`}
      >
        {/* Subtle Minimal Window Header Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-50/85 border-b border-slate-100 select-none">
          {/* Traffic-light dots */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          </div>

          {/* Centered clean address pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-slate-200/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10.5px] font-mono text-slate-500 font-medium tracking-tight">
              {meta.windowUrl}
            </span>
          </div>

          {/* Minimal Status badge */}
          <div className="text-[10px] font-medium text-slate-400 tracking-wider">
            PREVIEW
          </div>
        </div>

        {/* Interface Visual Artwork: 16:10 aspect ratio */}
        <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
          <Image
            src={meta.imageSrc}
            alt={meta.alt}
            fill
            priority
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 580px, 640px"
            className="object-cover object-top"
          />
        </div>
      </div>
    );
  }
);

CentralUiArtwork.displayName = "CentralUiArtwork";
