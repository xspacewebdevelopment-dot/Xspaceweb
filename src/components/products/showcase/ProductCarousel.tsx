"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ProductItem } from "./product-data";
import { ProductCard } from "./ProductCard";
import { ProductControls } from "./ProductControls";

interface ProductCarouselProps {
  products: ProductItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  isAutoPlaying: boolean;
  onSelectProduct: (product: ProductItem) => void;
  autoplayDurationMs: number;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  activeIndex,
  setActiveIndex,
  isAutoPlaying,
  onSelectProduct,
  autoplayDurationMs,
}) => {
  // Repeating the 4 items twice (8 slides total) ensures smooth, seamless infinite looping
  // without empty edge gaps across any desktop/mobile screen width
  const slides = [...products, ...products];

  const autoplay = useRef(
    Autoplay({
      delay: autoplayDurationMs,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [autoplay.current]
  );

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const selected = emblaApi.selectedScrollSnap();
    setCurrentSlideIndex(selected);
    const prodIdx = selected % products.length;
    setActiveIndex(prodIdx);
  }, [emblaApi, products.length, setActiveIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Sync autoplay state
  useEffect(() => {
    const autoplayPlugin = emblaApi?.plugins()?.autoplay;
    if (!autoplayPlugin) return;

    if (isAutoPlaying) {
      autoplayPlugin.play();
    } else {
      autoplayPlugin.stop();
    }
  }, [emblaApi, isAutoPlaying]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement?.tagName === "INPUT" ||
        activeElement?.tagName === "TEXTAREA";
      if (isInputFocused) return;

      if (e.key === "ArrowLeft") {
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollPrev, scrollNext]);

  return (
    <div className="relative w-full py-1 sm:py-2 product-showcase-perspective">
      {/* Navigation Arrows */}
      <ProductControls onPrev={scrollPrev} onNext={scrollNext} />

      {/* Embla Viewport */}
      <div
        ref={emblaRef}
        className="product-embla-viewport overflow-hidden cursor-grab active:cursor-grabbing px-2 sm:px-4"
      >
        <div className="product-embla-container flex items-center py-4 sm:py-5">
          {slides.map((product, index) => {
            const totalSlides = slides.length;
            let offset = (index - currentSlideIndex) % totalSlides;
            if (offset > totalSlides / 2) offset -= totalSlides;
            if (offset < -totalSlides / 2) offset += totalSlides;

            const isActive = offset === 0;
            const isAdjacent = Math.abs(offset) === 1;

            return (
              <div
                key={`${product.id}-${index}`}
                className="flex-shrink-0 px-2 sm:px-3 flex justify-center items-center"
                style={{
                  perspective: 1200,
                }}
              >
                <ProductCard
                  product={product}
                  active={isActive}
                  isAdjacent={isAdjacent}
                  offset={offset}
                  onSelect={() => scrollTo(index)}
                  onLearnMore={() => onSelectProduct(product)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
