"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProductItem } from "./product-data";

interface ProductBackgroundProps {
  activeProduct: ProductItem;
}

export const ProductBackground: React.FC<ProductBackgroundProps> = ({ activeProduct }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Scenic Mountain Background Image */}
      <Image
        src="/images/products/background.webp"
        alt="XSPACEWEB SaaS Ecosystem Sunset Mountain Background"
        fill
        className="object-cover object-center"
        loading="lazy"
        sizes="100vw"
      />

      {/* 2. Soft White Top Atmospheric Gradient Overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-[380px] z-1"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.82) 24%, rgba(255,255,255,0.30) 65%, rgba(255,255,255,0.05) 100%)",
        }}
      />

      {/* 3. Dynamic Active-Product Radial Blurred Glow */}
      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-2 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            backgroundColor: activeProduct.accent,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full blur-[140px] opacity-25"
        />
      </div>

      {/* 4. Soft Bottom Vignette Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-white via-white/40 to-transparent z-3" />
    </div>
  );
};
