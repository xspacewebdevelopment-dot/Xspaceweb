"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev?: boolean;
  canNext?: boolean;
}

export const ProductControls: React.FC<ProductControlsProps> = ({
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
}) => {
  return (
    <>
      {/* Previous Arrow Button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous product"
        className="group hidden sm:flex absolute -left-2 sm:-left-3 md:-left-4 lg:-left-7 xl:-left-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-[0_10px_25px_-5px_rgba(7,21,43,0.15)] items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/90 backdrop-blur-md disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.5] transition-transform duration-200 group-hover:-translate-x-0.5" />
      </button>

      {/* Next Arrow Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next product"
        className="group hidden sm:flex absolute -right-2 sm:-right-3 md:-right-4 lg:-right-7 xl:-right-10 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-[0_10px_25px_-5px_rgba(7,21,43,0.15)] items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/90 backdrop-blur-md disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </>
  );
};
