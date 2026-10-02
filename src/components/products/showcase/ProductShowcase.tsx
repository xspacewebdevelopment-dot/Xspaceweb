"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Users, ShieldCheck, Rocket } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { productsData, ProductItem } from "./product-data";
import { ProductBackground } from "./ProductBackground";
import { ProductOrbit } from "./ProductOrbit";
import { ProductHeader } from "./ProductHeader";
import { ProductCarousel } from "./ProductCarousel";
import { ProductPagination } from "./ProductPagination";
import { ProductDemoModal } from "./ProductDemoModal";
import "./product-showcase.css";

const AUTOPLAY_DURATION_MS = 5500;

export const ProductShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const activeProduct = productsData[activeIndex] || productsData[0];

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
  };

  const handleToggleAutoplay = () => {
    setIsAutoPlaying((prev) => !prev);
  };

  return (
    <section
      id="products"
      className="relative w-full overflow-hidden bg-white text-slate-900 pt-0 pb-16 sm:pb-20 select-none"
    >
      {/* 1. Multi-Layer Background (Scenic Mountain, Dynamic Glow, Top & Bottom Gradients) */}
      <ProductBackground activeProduct={activeProduct} />

      <Container size="wide" className="relative z-20 pt-4 sm:pt-7">
        {/* 2. Floating Orbiting App Tiles framing Header */}
        <ProductOrbit />

        {/* 3. Section Header: Cube Pill, Heading with Blue Highlight, Subtitle */}
        <ProductHeader />

        {/* 4. Center-Focused 3D Product Carousel */}
        <div className="relative w-full max-w-7xl mx-auto my-1 sm:my-2">
          <ProductCarousel
            products={productsData}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            isAutoPlaying={isAutoPlaying}
            onSelectProduct={handleSelectProduct}
            autoplayDurationMs={AUTOPLAY_DURATION_MS}
          />
        </div>

        {/* 5. Autoplay Progress Bar & Dots Pagination */}
        <ProductPagination
          products={productsData}
          activeIndex={activeIndex}
          isAutoPlaying={isAutoPlaying}
          autoplayDurationMs={AUTOPLAY_DURATION_MS}
          onSelectIndex={setActiveIndex}
          onToggleAutoplay={handleToggleAutoplay}
        />

        {/* 6. Center Pill Button: Explore All Products */}
        <div className="flex justify-center mt-3 sm:mt-4 mb-8 sm:mb-10 relative z-30">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#07152B] text-white text-sm font-semibold hover:bg-[#0D2344] transition-all duration-200 shadow-xl border border-white/20 active:scale-[0.98] cursor-pointer"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 7. Bottom Feature Pillars Bar (Preserved for seamless transition to next section) */}
        <div className="w-full pt-8 border-t border-white/25 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center relative z-30">
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/25 flex items-center justify-center flex-shrink-0 backdrop-blur-md shadow-md">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Innovative Solutions</h4>
              <p className="text-xs text-slate-200 font-normal">For real-world businesses</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2">
            <div className="w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/25 flex items-center justify-center flex-shrink-0 backdrop-blur-md shadow-md">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Built for India</h4>
              <p className="text-xs text-slate-200 font-normal">Trusted by thousands</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2">
            <div className="w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/25 flex items-center justify-center flex-shrink-0 backdrop-blur-md shadow-md">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Always Evolving</h4>
              <p className="text-xs text-slate-200 font-normal">New tools & capabilities</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2">
            <div className="w-11 h-11 rounded-2xl bg-white/10 text-white border border-white/25 flex items-center justify-center flex-shrink-0 backdrop-blur-md shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">People First</h4>
              <p className="text-xs text-slate-200 font-normal">Your success drives us</p>
            </div>
          </div>
        </div>
      </Container>

      {/* 8. Interactive Demo & Preview Modal */}
      <ProductDemoModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
