"use client";

import React from "react";
import { motion } from "framer-motion";

interface LetterSwap3DProps {
  label: string;
  className?: string;
  staggerDelay?: number;
  reverse?: boolean;
}

export const LetterSwap3D: React.FC<LetterSwap3DProps> = ({
  label,
  className = "",
  staggerDelay = 0.035,
  reverse = false,
}) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hover"
      className={`inline-flex overflow-hidden cursor-pointer select-none leading-none ${className}`}
      style={{ perspective: "1000px" }}
    >
      {label.split("").map((char, index) => {
        if (char === " ") {
          return (
            <span key={index} className="inline-block">
              &nbsp;
            </span>
          );
        }

        const delay = reverse
          ? (label.length - 1 - index) * staggerDelay
          : index * staggerDelay;

        return (
          <span
            key={index}
            className="relative inline-block overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Primary Top Letter */}
            <motion.span
              variants={{
                initial: { rotateX: 0, y: "0%", opacity: 1 },
                hover: { rotateX: -90, y: "-100%", opacity: 0 },
              }}
              transition={{
                duration: 0.35,
                delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block origin-bottom"
            >
              {char}
            </motion.span>

            {/* Swapped 3D Bottom Letter */}
            <motion.span
              variants={{
                initial: { rotateX: 90, y: "100%", opacity: 0 },
                hover: { rotateX: 0, y: "0%", opacity: 1 },
              }}
              transition={{
                duration: 0.35,
                delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 inline-block origin-top text-blue-400"
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};

export default LetterSwap3D;
