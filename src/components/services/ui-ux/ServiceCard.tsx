"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { ServiceCardData } from "./data";

export interface ServiceCardProps {
  card: ServiceCardData;
  index: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Service Card Component
 * Represents one of the 5 UI/UX service disciplines.
 * Features an editorial window frame, high-resolution UI artwork, and a concise discipline caption.
 */
export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ card, index, style, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        id={`service-card-${index}`}
        data-card-id={card.id}
        style={style}
        className={`absolute left-1/2 top-1/2 w-[185px] xs:w-[200px] sm:w-[235px] md:w-[255px] lg:w-[268px] rounded-2xl bg-white border border-slate-200/90 shadow-[0_12px_32px_rgba(15,23,42,0.10)] overflow-hidden transition-all duration-300 select-none will-change-transform hover:shadow-[0_18px_42px_rgba(15,23,42,0.16)] ${className}`}
      >
        {/* Subtle Window Header Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50/90 border-b border-slate-100">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-slate-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8]" />
            <span className="text-[9px] sm:text-[9.5px] font-mono font-semibold tracking-wide text-slate-700 uppercase">
              {`${card.number} // ${card.tag}`}
            </span>
          </div>

          <span className="text-[8.5px] font-mono text-slate-400">
            XSW
          </span>
        </div>

        {/* Artwork Canvas (Compact 16:10 Aspect Ratio) */}
        <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
          <Image
            src={card.imageSrc}
            alt={card.alt}
            fill
            sizes="(max-width: 640px) 210px, (max-width: 1024px) 255px, 268px"
            className="object-cover object-top"
          />
        </div>

        {/* Caption & Concise Description (Fully visible, no truncation) */}
        <div className="px-3 sm:px-3.5 py-2 sm:py-2.5 bg-white border-t border-slate-100/90 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] sm:text-xs font-extrabold text-[#07152B] tracking-tight uppercase">
                {card.title}
              </h3>
              <span className="text-[9px] font-mono font-semibold text-[#1668E8]">
                {card.tag}
              </span>
            </div>
            <p className="text-[9.5px] sm:text-[10.5px] text-[#556987] leading-snug">
              {card.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";
