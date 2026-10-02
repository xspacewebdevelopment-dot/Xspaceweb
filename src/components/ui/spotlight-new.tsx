"use client";

import React from "react";
import { motion } from "framer-motion";

export interface SpotlightProps {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
  className?: string;
}

export const SpotlightNew: React.FC<SpotlightProps> = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(37, 99, 235, 0.10) 0, rgba(37, 99, 235, 0.03) 50%, transparent 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, rgba(56, 189, 248, 0.08) 0, rgba(56, 189, 248, 0.02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, rgba(99, 102, 241, 0.06) 0, rgba(99, 102, 241, 0.01) 80%, transparent 100%)",
  translateY = -350,
  width = 750,
  height = 1200,
  smallWidth = 300,
  duration = 9,
  xOffset = 80,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          x: [0, xOffset, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-[900px] h-full pointer-events-none"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0"
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(-140%, -60%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className="absolute top-0 right-0 origin-top-right"
        />
      </motion.div>
    </motion.div>
  );
};
