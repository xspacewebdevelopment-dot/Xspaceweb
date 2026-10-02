"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { ProductItem } from "./product-data";

interface ProductPaginationProps {
  products: ProductItem[];
  activeIndex: number;
  isAutoPlaying: boolean;
  autoplayDurationMs: number;
  onSelectIndex: (index: number) => void;
  onToggleAutoplay: () => void;
}

export const ProductPagination: React.FC<ProductPaginationProps> = ({
  products,
  activeIndex,
  isAutoPlaying,
  autoplayDurationMs,
  onSelectIndex,
  onToggleAutoplay,
}) => {
  const activeProduct = products[activeIndex] || products[0];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 my-2 relative z-30 select-none">
      {/* Progress Items */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-md">
        {products.map((product, idx) => {
          const isActive = idx === activeIndex;

          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelectIndex(idx)}
              aria-label={`Go to slide ${idx + 1} (${product.name})`}
              className="group relative flex items-center justify-center h-8 focus:outline-none cursor-pointer px-1"
            >
              {isActive ? (
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-mono font-black"
                    style={{ color: activeProduct.accent }}
                  >
                    {product.number.split(" / ")[0] || `0${idx + 1}`}
                  </span>

                  {/* Animated Progress Bar */}
                  <div className="relative w-12 sm:w-16 h-2 rounded-full bg-slate-200/80 overflow-hidden">
                    <motion.div
                      key={`progress-${activeIndex}-${isAutoPlaying}`}
                      initial={{ width: "0%" }}
                      animate={{
                        width: isAutoPlaying ? "100%" : "0%",
                      }}
                      transition={{
                        duration: autoplayDurationMs / 1000,
                        ease: "linear",
                      }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: activeProduct.accent,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-[11px] font-mono font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                    {product.number.split(" / ")[0] || `0${idx + 1}`}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-500 transition-colors" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Autoplay Play/Pause Toggle */}
      <button
        type="button"
        onClick={onToggleAutoplay}
        aria-label={isAutoPlaying ? "Pause automatic slideshow" : "Start automatic slideshow"}
        title={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
        className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center border border-white/90 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
      >
        {isAutoPlaying ? (
          <Pause className="w-3.5 h-3.5" />
        ) : (
          <Play className="w-3.5 h-3.5 ml-0.5" />
        )}
      </button>
    </div>
  );
};
