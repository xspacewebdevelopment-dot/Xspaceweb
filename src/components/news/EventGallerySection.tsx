"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn, Images } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { EventGalleryImage } from "@/lib/db/schema";

interface EventGallerySectionProps {
  initialImages?: EventGalleryImage[];
}

export const EventGallerySection: React.FC<EventGallerySectionProps> = ({
  initialImages = [],
}) => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  // Up to 5 featured images, fallback to latest
  const displayImages = React.useMemo(() => {
    if (!initialImages || initialImages.length === 0) return [];

    const featured = initialImages
      .filter((img) => img.isFeatured)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    if (featured.length >= 5) {
      return featured.slice(0, 5);
    }

    // Fill remaining positions using latest non-featured gallery images
    const remaining = initialImages.filter((img) => !img.isFeatured);
    return [...featured, ...remaining].slice(0, 5);
  }, [initialImages]);

  const prevPhoto = () => {
    if (activePhoto === null || displayImages.length === 0) return;
    setActivePhoto((prev) => (prev! === 0 ? displayImages.length - 1 : prev! - 1));
  };

  const nextPhoto = () => {
    if (activePhoto === null || displayImages.length === 0) return;
    setActivePhoto((prev) => (prev! === displayImages.length - 1 ? 0 : prev! + 1));
  };

  if (displayImages.length === 0) {
    return null;
  }

  // Dynamic grid columns based on count: if fewer than 5 images, adapt cleanly
  const gridColClass =
    displayImages.length === 1
      ? "grid-cols-1 max-w-md mx-auto"
      : displayImages.length === 2
      ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
      : displayImages.length === 3
      ? "grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto"
      : displayImages.length === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";

  return (
    <section className="w-full bg-white py-14 sm:py-18 border-t border-slate-100">
      <Container size="wide">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#1668E8] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#07152B] tracking-tight">
              Event Gallery
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setActivePhoto(0)}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors cursor-pointer"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Gallery Carousel / Grid Row */}
        <div className="relative group/carousel">
          <div className={`grid ${gridColClass} gap-3 sm:gap-4`}>
            {displayImages.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setActivePhoto(index)}
                className="relative h-44 sm:h-52 md:h-60 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-100 border border-slate-200/70"
              >
                <Image
                  src={img.imageUrl}
                  alt={img.title || "Event photo"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold leading-tight line-clamp-1">
                      {img.title || img.caption || "Event Moment"}
                    </p>
                    <ZoomIn className="w-4 h-4 text-white/90" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Image Lightbox Modal */}
        {activePhoto !== null && displayImages[activePhoto] && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            {displayImages.length > 1 && (
              <button
                onClick={prevPhoto}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {displayImages.length > 1 && (
              <button
                onClick={nextPhoto}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            <div className="max-w-4xl w-full flex flex-col items-center">
              <div className="relative w-full h-[320px] sm:h-[480px] md:h-[560px] rounded-2xl overflow-hidden shadow-2xl bg-black/40">
                <Image
                  src={displayImages[activePhoto].imageUrl}
                  alt={displayImages[activePhoto].title || "Event photo"}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="mt-4 text-center text-white">
                {displayImages[activePhoto].title && (
                  <h4 className="text-lg font-bold">
                    {displayImages[activePhoto].title}
                  </h4>
                )}
                {displayImages[activePhoto].caption && (
                  <p className="text-sm text-slate-300 mt-1 max-w-xl mx-auto">
                    {displayImages[activePhoto].caption}
                  </p>
                )}
                <span className="inline-block mt-2 text-xs text-slate-400">
                  {activePhoto + 1} / {displayImages.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
