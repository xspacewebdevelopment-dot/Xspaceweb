"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Crown } from "lucide-react";
import { ProductItem } from "./product-data";
import { ProductMiniPreview } from "./ProductMiniPreview";

interface ProductCardProps {
  product: ProductItem;
  active: boolean;
  isAdjacent: boolean;
  offset: number; // e.g. -2, -1, 0, 1, 2
  onSelect: () => void;
  onLearnMore: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  active,
  isAdjacent,
  offset,
  onSelect,
  onLearnMore,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Pointer movement for subtle 3D card tilt (Aceternity-inspired, restrained to ~2-3 deg)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!active || shouldReduceMotion || window.matchMedia("(pointer: coarse)").matches) {
        return;
      }
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -2.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;

      setTilt({ rotateX, rotateY });
    },
    [active, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  // Compute transform values based on offset
  const scale = shouldReduceMotion
    ? 1
    : active
    ? 1.07
    : isAdjacent
    ? 0.94
    : 0.86;

  const y = shouldReduceMotion
    ? 0
    : active
    ? -18
    : isAdjacent
    ? 8
    : 18;

  const opacity = active ? 1 : isAdjacent ? 0.88 : 0.60;

  const baseRotateY = shouldReduceMotion
    ? 0
    : active
    ? 0
    : offset < 0
    ? Math.min(7, Math.abs(offset) * 4)
    : Math.max(-7, -Math.abs(offset) * 4);

  const zIndex = active ? 30 : isAdjacent ? 20 : 10;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      animate={{
        scale,
        y,
        opacity,
        rotateY: active ? tilt.rotateY : baseRotateY,
        rotateX: active ? tilt.rotateX : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 24,
      }}
      style={{
        zIndex,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-[285px] sm:w-[320px] md:w-[345px] lg:w-[355px] flex-shrink-0 rounded-[28px] p-5 sm:p-5.5 flex flex-col justify-between cursor-pointer select-none transition-shadow duration-300 product-card-3d-root ${
        active
          ? "bg-white/98 shadow-[0_24px_60px_-12px_rgba(7,21,43,0.18)]"
          : "bg-white/92 backdrop-blur-md shadow-[0_12px_32px_-8px_rgba(7,21,43,0.08)] border border-white/80 hover:shadow-[0_18px_40px_-8px_rgba(7,21,43,0.12)] hover:bg-white"
      }`}
    >
      {/* Dynamic active card outline glow */}
      {active && (
        <div
          className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-300"
          style={{
            boxShadow: `0 0 0 2px ${product.accent}, 0 20px 50px -10px ${product.accentGlow}`,
          }}
        />
      )}

      {/* Top Section */}
      <div className="relative z-10">
        {/* Top Row: Badge & Number */}
        <div className="flex items-center justify-between mb-3.5 h-6">
          {product.badge ? (
            <span
              className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold tracking-tight border shadow-xs flex items-center gap-1"
              style={{
                backgroundColor: active ? `${product.accent}12` : "#EBF3FE",
                color: active ? product.accent : "#1668E8",
                borderColor: active ? `${product.accent}30` : "#BFDBFE",
              }}
            >
              {product.id === "goldengst" ? (
                <Crown className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Sparkles className="w-3 h-3" />
              )}
              {product.badge}
            </span>
          ) : (
            <div />
          )}

          <span className="text-[11.5px] font-bold text-slate-400 tracking-wider font-mono">
            {product.number}
          </span>
        </div>

        {/* Mini UI Graphics Preview */}
        <div className="mb-3.5">
          <ProductMiniPreview product={product} active={active} />
        </div>

        {/* Product Title */}
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
            {product.name}
          </h3>
        </div>

        {/* Tagline */}
        <p className="text-[12.5px] text-slate-600 font-medium leading-snug mb-2.5">
          {product.tagline}
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold text-slate-500 bg-slate-100/90 px-2 py-0.5 rounded-md border border-slate-200/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="relative z-10 pt-2.5 border-t border-slate-100/80">
        {active ? (
          <div className="flex items-center gap-2">
            <a
              href={product.liveUrl || product.href}
              target={(product.liveUrl || product.href).startsWith("http") ? "_blank" : undefined}
              rel={(product.liveUrl || product.href).startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 group/btn py-2.5 px-4 rounded-xl flex items-center justify-between text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.98] cursor-pointer"
              style={{
                backgroundColor: "#07152B",
              }}
            >
              <span className="tracking-tight">{product.ctaText}</span>
              <div
                className="w-6.5 h-6.5 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-1"
                style={{ backgroundColor: product.accent }}
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
              </div>
            </a>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLearnMore();
              }}
              title="Overview details"
              className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center flex-shrink-0 cursor-pointer"
            >
              Overview
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between py-0.5">
            <a
              href={product.liveUrl || product.href}
              target={(product.liveUrl || product.href).startsWith("http") ? "_blank" : undefined}
              rel={(product.liveUrl || product.href).startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={(e) => e.stopPropagation()}
              className="group/btn text-left focus:outline-none cursor-pointer"
            >
              <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover/btn:text-[#1668E8] transition-colors inline-flex items-center gap-1">
                Learn More
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-[#1668E8]" />
              </span>
            </a>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLearnMore();
              }}
              aria-label={`View details for ${product.name}`}
              className="w-8 h-8 rounded-full bg-slate-50 hover:bg-[#1668E8] text-slate-600 hover:text-white border border-slate-200/70 flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-3 h-3 stroke-[2.2]" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
