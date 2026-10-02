"use client";

import React from "react";
import { motion } from "framer-motion";
import { Box } from "lucide-react";

export const ProductHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-2.5 mb-3 sm:mb-5 max-w-3xl mx-auto relative z-20">
      {/* 1. Small Pill: [ cube icon ] Our Products */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-200/80 shadow-xs text-xs sm:text-sm font-bold text-blue-700 select-none"
      >
        <Box className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
        <span>Our Products</span>
      </motion.div>

      {/* 2. Main Heading: Powering Ideas for a Smarter Tomorrow */}
      <motion.h2
        initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-[#07152B]"
      >
        <span>Powering Ideas for a </span>
        <span className="text-[#1668E8] inline-block">Smarter Tomorrow</span>
      </motion.h2>

      {/* 3. Description */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed pt-1"
      >
        A growing ecosystem of SaaS products to simplify work, empower businesses and create a better tomorrow.
      </motion.p>
    </div>
  );
};
