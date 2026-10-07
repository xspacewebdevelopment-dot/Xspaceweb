"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface BackgroundWordProps {
  word: string;
  className?: string;
}

export const BackgroundWord: React.FC<BackgroundWordProps> = ({ word, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [60, -60]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative w-full overflow-hidden select-none pointer-events-none flex justify-center items-center py-6 md:py-10 ${className}`}
    >
      <motion.span
        style={{ y }}
        className="font-display font-black uppercase tracking-widest text-slate-900/[0.035] text-[80px] sm:text-[140px] md:text-[200px] lg:text-[240px] leading-none whitespace-nowrap"
      >
        {word}
      </motion.span>
    </div>
  );
};
