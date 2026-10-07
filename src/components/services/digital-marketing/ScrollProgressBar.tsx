"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[2px]">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#1668E8] via-[#4f46e5] to-[#8b5cf6]"
        style={{ scaleX }}
      />
    </div>
  );
};
