"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

const galleryImages = [
  {
    id: 1,
    title: "Team Outing & Ideation Day",
    caption: "XSPACEWEB core engineering and design team at Tech Park.",
    src: "/images/news/gallery_outdoor_team.jpg",
  },
  {
    id: 2,
    title: "Corporate Headquarters Reception",
    caption: "Our modern technology and studio facilities in Kolkata & Dhanbad.",
    src: "/images/news/gallery_office_reception.jpg",
  },
  {
    id: 3,
    title: "National Tech Summit 2026",
    caption: "Product teams representing XSPACEWEB across multi-track sessions.",
    src: "/images/news/gallery_team_event.jpg",
  },
  {
    id: 4,
    title: "Keynote at Grand Auditorium",
    caption: "CEO delivering the keynote on the future of web architecture and SaaS.",
    src: "/images/news/news_conference_stage.jpg",
  },
  {
    id: 5,
    title: "Sprint Planning & UI/UX Lab",
    caption: "Cross-functional collaborative session designing next-gen SaaS interfaces.",
    src: "/images/news/gallery_meeting.jpg",
  },
];

export const EventGallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const prevPhoto = () => {
    if (activePhoto === null) return;
    setActivePhoto((prev) => (prev! === 0 ? galleryImages.length - 1 : prev! - 1));
  };

  const nextPhoto = () => {
    if (activePhoto === null) return;
    setActivePhoto((prev) => (prev! === galleryImages.length - 1 ? 0 : prev! + 1));
  };

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
            onClick={() => setActivePhoto(0)}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Gallery Carousel Row with side controls */}
        <div className="relative group/carousel">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setActivePhoto(index)}
                className="relative h-44 sm:h-52 md:h-60 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-100 border border-slate-200/70"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold leading-tight line-clamp-1">
                      {img.title}
                    </p>
                    <ZoomIn className="w-4 h-4 text-white/90" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Image Lightbox Modal */}
        {activePhoto !== null && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl w-full flex flex-col items-center">
              <div className="relative w-full h-[320px] sm:h-[480px] md:h-[560px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={galleryImages[activePhoto].src}
                  alt={galleryImages[activePhoto].title}
                  fill
                  className="object-contain sm:object-cover"
                />
              </div>
              <div className="mt-4 text-center text-white">
                <h4 className="text-lg font-bold">
                  {galleryImages[activePhoto].title}
                </h4>
                <p className="text-sm text-slate-300 mt-1">
                  {galleryImages[activePhoto].caption}
                </p>
                <span className="inline-block mt-2 text-xs text-slate-400">
                  {activePhoto + 1} / {galleryImages.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
