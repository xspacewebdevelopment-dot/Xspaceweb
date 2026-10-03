"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Quote,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  BookOpen,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { Testimonial } from "@/lib/db/schema";

interface InternTestimonialsSectionProps {
  initialTestimonials?: Testimonial[];
}

export const InternTestimonialsSection: React.FC<InternTestimonialsSectionProps> = ({
  initialTestimonials,
}) => {
  const items = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : [];

  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // 1. Identify the Portrait Centerpiece (Column 3)
  // Strictly prioritize cards explicitly assigned 'portrait' variant
  const portraitCard =
    items.find((t) => t.cardVariant === "portrait" && t.isFeatured) ||
    items.find((t) => t.cardVariant === "portrait") ||
    items.find((t) => t.isFeatured) ||
    items[0];

  // 2. Filter remaining cards for side columns
  const sideCards = portraitCard
    ? items.filter((t) => t.id !== portraitCard.id)
    : items;

  // 3. Sort side cards: Featured first, then displayOrder ascending, then newest
  const sortedSideCards = [...sideCards].sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) {
      return a.isFeatured ? -1 : 1;
    }
    if (a.displayOrder !== b.displayOrder) {
      return a.displayOrder - b.displayOrder;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // 4. Primary Bento Slots (strictly capped at 6 side cards to preserve the 4-column 2+2+1+2 layout)
  const primarySideCards = sortedSideCards.slice(0, 6);
  const extraCards = sortedSideCards.slice(6);

  // Column distribution for the primary Bento grid
  const col1 = primarySideCards.slice(0, 2);
  const col2 = primarySideCards.slice(2, 4);
  const col4 = primarySideCards.slice(4, 6);

  // Modal navigation
  const handleModalPrev = () => {
    setModalIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleModalNext = () => {
    setModalIndex((prev) => (prev + 1) % items.length);
  };

  const renderCard = (
    item: Testimonial,
    index: number,
    isFirstInCol = false,
    extraCard = false
  ) => {
    const variant = item.cardVariant || "standard";

    // ── PORTRAIT CARD VARIANT ──
    if (variant === "portrait") {
      return (
        <div
          key={item.id}
          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between h-full"
        >
          <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-100 mb-4">
            <Image
              src={item.profileImageUrl || "/images/careers/intern_hero_portrait.jpg"}
              alt={item.name}
              fill
              className="object-cover object-top"
              unoptimized
            />
          </div>
          <div className="text-center px-2 pb-2">
            {item.rating && item.rating > 0 && (
              <div className="flex justify-center gap-0.5 text-amber-400 mb-1.5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            )}
            {item.headline && (
              <h4 className="text-xs font-bold text-[#07152B] mb-1">{item.headline}</h4>
            )}
            <p className="text-xs font-medium text-slate-700 italic leading-relaxed mb-2">
              &ldquo;{item.testimonialText}&rdquo;
            </p>
            <span className="font-serif italic text-sm font-bold text-[#07152B] block">
              {item.name}
            </span>
            {item.designation && (
              <span className="text-[10px] text-slate-400">{item.designation}</span>
            )}
          </div>
        </div>
      );
    }

    // ── CENTERED CARD VARIANT ──
    if (variant === "centered") {
      const isMultiTeam =
        item.name.toLowerCase().includes("multi") ||
        item.name.toLowerCase().includes("team");

      return (
        <div
          key={item.id}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col justify-between h-full"
        >
          <div>
            {item.profileImageUrl && !isMultiTeam && (
              <div className="w-12 h-12 rounded-full mx-auto mb-2 overflow-hidden relative shadow-sm border border-slate-100">
                <Image
                  src={item.profileImageUrl}
                  alt={item.name}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            )}
            {item.rating && item.rating > 0 && (
              <div className="flex justify-center gap-0.5 text-amber-400 mb-1.5">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            )}
            {item.headline && (
              <h4 className="text-xs font-bold text-[#07152B] mb-1">{item.headline}</h4>
            )}
            <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
              &ldquo;{item.testimonialText}&rdquo;
            </p>
          </div>

          {isMultiTeam ? (
            <div className="flex items-center justify-center -space-x-2 pt-2">
              <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden relative bg-slate-300">
                <Image
                  src="/images/careers/intern_hero_portrait.jpg"
                  alt="Intern 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden relative bg-slate-300">
                <Image
                  src="/images/news/news_hero_centered.jpg"
                  alt="Intern 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden relative bg-slate-300">
                <Image
                  src="/images/news/gallery_outdoor_team.jpg"
                  alt="Intern 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="pt-2">
              <p className="text-[11px] font-bold text-[#07152B]">{item.name}</p>
              {item.designation && (
                <p className="text-[10px] text-slate-400">{item.designation}</p>
              )}
            </div>
          )}
        </div>
      );
    }

    // ── COMPACT CARD VARIANT ──
    if (variant === "compact") {
      const isMultiTeam =
        item.name.toLowerCase().includes("multi") ||
        item.name.toLowerCase().includes("team");

      return (
        <div
          key={item.id}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              {item.profileImageUrl && !isMultiTeam && (
                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={item.profileImageUrl}
                    alt={item.name}
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              )}
              <div>
                {item.rating && item.rating > 0 && (
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                )}
                {item.headline && (
                  <h4 className="text-xs font-bold text-[#07152B]">{item.headline}</h4>
                )}
              </div>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
              &ldquo;{item.testimonialText}&rdquo;
            </p>
          </div>

          {isMultiTeam ? (
            <div className="flex items-center justify-center -space-x-2 pt-2">
              <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden relative bg-slate-300">
                <Image
                  src="/images/careers/intern_hero_portrait.jpg"
                  alt="Intern 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden relative bg-slate-300">
                <Image
                  src="/images/news/news_hero_centered.jpg"
                  alt="Intern 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden relative bg-slate-300">
                <Image
                  src="/images/news/gallery_outdoor_team.jpg"
                  alt="Intern 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="text-right pt-2 border-t border-slate-100">
              <span className="font-serif italic text-xs font-bold text-[#07152B] block">
                {item.name}
              </span>
              {item.designation && (
                <span className="text-[10px] text-slate-400">{item.designation}</span>
              )}
            </div>
          )}
        </div>
      );
    }

    // ── STANDARD CARD VARIANT (default) ──
    return (
      <div
        key={item.id}
        className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between h-full"
      >
        <div>
          {isFirstInCol && index === 0 && !extraCard && (
            <Quote className="w-6 h-6 text-[#1668E8] fill-[#1668E8] mb-2" />
          )}
          {item.rating && item.rating > 0 && (
            <div className="flex gap-0.5 text-amber-400 mb-2">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
          )}
          {item.headline && (
            <h4 className="text-xs font-bold text-[#07152B] mb-1.5">{item.headline}</h4>
          )}
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            &ldquo;{item.testimonialText}&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
          {item.profileImageUrl && (
            <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 relative">
              <Image
                src={item.profileImageUrl}
                alt={item.name}
                fill
                className="object-cover object-top"
                unoptimized
              />
            </div>
          )}
          <div>
            <h4 className="text-xs font-bold text-[#07152B]">{item.name}</h4>
            {item.designation && (
              <p className="text-[10px] text-slate-400">{item.designation}</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const activeStory = items[modalIndex] || items[0];

  return (
    <section className="w-full bg-[#F8FAFC] py-16 sm:py-24 border-b border-slate-200/80">
      <Container size="wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1668E8]/10 text-[#1668E8] border border-[#1668E8]/20 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#1668E8]" />
            <span className="text-[11px] font-bold tracking-wider uppercase">
              INTERNSHIP TESTIMONIALS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07152B] tracking-tight">
            What Our <span className="text-[#1668E8]">Interns</span> Say
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
            Real experiences. Real growth. Hear directly from our interns about their journey, learning, and life at XSPACEWEB.
          </p>
        </div>

        {/* Bento / Masonry Testimonials Grid (Fixed-capacity layout that never breaks) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch">
          {/* Column 1: Left 2 Cards (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {col1.map((item, idx) => (
              <div key={item.id} className="flex-1">
                {renderCard(item, idx, idx === 0)}
              </div>
            ))}
          </div>

          {/* Column 2: Middle Left (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {col2.map((item, idx) => (
              <div key={item.id} className="flex-1">
                {renderCard(item, idx)}
              </div>
            ))}
          </div>

          {/* Column 3: Centerpiece Featured Portrait Card (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col">
            {portraitCard && (
              <div className="h-full">
                {renderCard(portraitCard, 0)}
              </div>
            )}
          </div>

          {/* Column 4: Right 2 Cards (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {col4.map((item, idx) => (
              <div key={item.id} className="flex-1">
                {renderCard(item, idx)}
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls for More Testimonials */}
        {extraCards.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-12 pt-8 border-t border-slate-200/80">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>{showAll ? "Show Curated Bento" : `View All Testimonials (${items.length})`}</span>
              <ChevronDown
                className={`w-4 h-4 text-[#1668E8] transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() => {
                setModalIndex(0);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1668E8] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse All Stories ({items.length})</span>
            </button>
          </div>
        )}

        {/* Smooth Expandable Section for Additional Testimonials */}
        <AnimatePresence>
          {showAll && extraCards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="mt-8 pt-8 border-t border-slate-200/80 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#07152B]">
                    More Internship Stories
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Showing {extraCards.length} additional review{extraCards.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {extraCards.map((item, idx) => (
                  <div key={item.id} className="min-h-[220px]">
                    {renderCard(item, idx, false, true)}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BROWSE ALL STORIES MODAL CAROUSEL / VIEWER ── */}
        <AnimatePresence>
          {isModalOpen && activeStory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 overflow-hidden"
              >
                {/* Header with Counter and Close Button */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#1668E8] text-xs font-bold">
                      Story {modalIndex + 1} of {items.length}
                    </span>
                    {activeStory.cardVariant && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase tracking-wider">
                        {activeStory.cardVariant}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main Testimonial Body */}
                <div className="space-y-6">
                  {/* Rating Stars */}
                  {activeStory.rating && activeStory.rating > 0 && (
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(activeStory.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  )}

                  {/* Headline */}
                  {activeStory.headline && (
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#07152B] tracking-tight">
                      &ldquo;{activeStory.headline}&rdquo;
                    </h3>
                  )}

                  {/* Quote Text */}
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
                    &ldquo;{activeStory.testimonialText}&rdquo;
                  </p>

                  {/* Author Profile */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                    {activeStory.profileImageUrl && (
                      <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white shadow-sm shrink-0 bg-slate-100">
                        <Image
                          src={activeStory.profileImageUrl}
                          alt={activeStory.name}
                          fill
                          className="object-cover object-top"
                          unoptimized
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-[#07152B] text-base">
                        {activeStory.name}
                      </h4>
                      {activeStory.designation && (
                        <p className="text-xs text-slate-500 font-medium">
                          {activeStory.designation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation Footer */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleModalPrev}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {/* Thumbnail Dots */}
                  <div className="flex items-center gap-1.5">
                    {items.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setModalIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === modalIndex
                            ? "w-6 bg-[#1668E8]"
                            : "w-2 bg-slate-200 hover:bg-slate-300"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleModalNext}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1668E8] text-white text-xs font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};
