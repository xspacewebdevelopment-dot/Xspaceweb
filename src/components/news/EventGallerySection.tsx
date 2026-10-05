"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Images,
  Grid,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { EventGalleryImage } from "@/lib/db/schema";

interface EventGallerySectionProps {
  initialImages?: EventGalleryImage[];
}

const MAX_VISIBLE_IMAGES = 8;

export const EventGallerySection: React.FC<EventGallerySectionProps> = ({
  initialImages = [],
}) => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // Show all featured images first (sorted by displayOrder), followed by non-featured images
  const displayImages = React.useMemo(() => {
    if (!initialImages || initialImages.length === 0) return [];

    const featured = initialImages
      .filter((img) => img.isFeatured)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const remaining = initialImages
      .filter((img) => !img.isFeatured)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    return [...featured, ...remaining];
  }, [initialImages]);

  const totalCount = displayImages.length;
  const hasMoreThanEight = totalCount > MAX_VISIBLE_IMAGES;
  const visibleImages = hasMoreThanEight
    ? displayImages.slice(0, MAX_VISIBLE_IMAGES)
    : displayImages;

  // Keyboard navigation for Lightbox and Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activePhoto !== null) {
          setActivePhoto(null);
        } else if (isGalleryModalOpen) {
          setIsGalleryModalOpen(false);
        }
      } else if (activePhoto !== null) {
        if (e.key === "ArrowLeft") {
          setActivePhoto((prev) => (prev! === 0 ? displayImages.length - 1 : prev! - 1));
        } else if (e.key === "ArrowRight") {
          setActivePhoto((prev) => (prev! === displayImages.length - 1 ? 0 : prev! + 1));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, isGalleryModalOpen, displayImages.length]);

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

  // Dynamic grid columns based on visible count
  const gridColClass =
    visibleImages.length === 1
      ? "grid-cols-1 max-w-md mx-auto"
      : visibleImages.length === 2
      ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
      : visibleImages.length === 3
      ? "grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto"
      : visibleImages.length === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : visibleImages.length === 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

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
            onClick={() => setIsGalleryModalOpen(true)}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors cursor-pointer"
          >
            <span>
              View Full Gallery{hasMoreThanEight ? ` (${totalCount})` : ""}
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Gallery Grid (Max 8 images displayed) */}
        <div className="relative group/carousel">
          <div className={`grid ${gridColClass} gap-3 sm:gap-4`}>
            {visibleImages.map((img, index) => {
              const isEighthCard = hasMoreThanEight && index === MAX_VISIBLE_IMAGES - 1;
              const remainingOverEighth = totalCount - (MAX_VISIBLE_IMAGES - 1);

              return (
                <div
                  key={img.id}
                  onClick={() => {
                    if (isEighthCard) {
                      setIsGalleryModalOpen(true);
                    } else {
                      setActivePhoto(index);
                    }
                  }}
                  className="relative h-44 sm:h-52 md:h-60 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-100 border border-slate-200/70"
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.title || "Event photo"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* 8th Card Special "+N More" Overlay */}
                  {isEighthCard ? (
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-4 text-center group-hover:bg-slate-950/80 transition-all">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
                        <Images className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        +{remainingOverEighth}
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-200 mt-1">
                        View All Photos
                      </span>
                    </div>
                  ) : (
                    /* Regular Hover Overlay */
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold leading-tight line-clamp-1">
                          {img.title || img.caption || "Event Moment"}
                        </p>
                        <ZoomIn className="w-4 h-4 text-white/90" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── FULL GALLERY MODAL (Displays ALL images in a complete grid) ── */}
        {isGalleryModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100/80 text-[#1668E8] flex items-center justify-center">
                    <Grid className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#07152B]">
                      Event Gallery — All Photos
                    </h3>
                    <p className="text-xs text-slate-500">
                      {totalCount} photos captured across our team events & celebrations
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsGalleryModalOpen(false);
                      setActivePhoto(0);
                    }}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-[#1668E8] hover:bg-blue-100 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Start Slideshow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsGalleryModalOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    aria-label="Close full gallery modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Grid of ALL images */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                  {displayImages.map((img, idx) => (
                    <div
                      key={img.id}
                      onClick={() => {
                        setActivePhoto(idx);
                      }}
                      className="relative h-40 sm:h-48 md:h-52 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 bg-slate-100 border border-slate-200/80"
                    >
                      <Image
                        src={img.imageUrl}
                        alt={img.title || `Event photo ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 text-white">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold leading-tight line-clamp-1">
                            {img.title || img.caption || `Photo ${idx + 1}`}
                          </p>
                          <ZoomIn className="w-4 h-4 text-white/90" />
                        </div>
                      </div>
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-medium backdrop-blur-xs">
                        {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500">
                <span>Showing all {totalCount} photos</span>
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="px-4 py-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── FULL IMAGE LIGHTBOX MODAL (Slideshow with Thumbnail Bar) ── */}
        {activePhoto !== null && displayImages[activePhoto] && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-150">
            {/* Top Bar */}
            <div className="w-full max-w-5xl flex items-center justify-between z-50 mb-2">
              <span className="text-xs sm:text-sm font-semibold text-slate-300">
                Photo {activePhoto + 1} of {displayImages.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActivePhoto(null);
                    setIsGalleryModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>All Photos</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Prev Button */}
            {displayImages.length > 1 && (
              <button
                type="button"
                onClick={prevPhoto}
                aria-label="Previous image"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50 hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {displayImages.length > 1 && (
              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Next image"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50 hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Main Lightbox Image */}
            <div className="relative w-full max-w-4xl h-[45vh] sm:h-[55vh] md:h-[62vh] rounded-2xl overflow-hidden bg-black/60 shadow-2xl flex items-center justify-center my-auto">
              <Image
                src={displayImages[activePhoto].imageUrl}
                alt={displayImages[activePhoto].title || "Event photo"}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Photo Info & Scrollable Thumbnails Strip */}
            <div className="w-full max-w-4xl flex flex-col items-center mt-3 z-50">
              {displayImages[activePhoto].title && (
                <h4 className="text-base sm:text-lg font-bold text-white text-center">
                  {displayImages[activePhoto].title}
                </h4>
              )}
              {displayImages[activePhoto].caption && (
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl text-center line-clamp-2">
                  {displayImages[activePhoto].caption}
                </p>
              )}

              {/* Horizontal Thumbnail Strip for Quick Navigation */}
              {displayImages.length > 1 && (
                <div className="flex items-center gap-2 mt-3 overflow-x-auto max-w-full py-1 px-2 no-scrollbar">
                  {displayImages.map((thumb, idx) => (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => setActivePhoto(idx)}
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all cursor-pointer ${
                        idx === activePhoto
                          ? "ring-2 ring-[#1668E8] scale-105 opacity-100"
                          : "opacity-40 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={thumb.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

