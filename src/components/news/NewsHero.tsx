"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

const featuredStories = [
  {
    id: 1,
    tag: "LATEST NEWS",
    date: "12 Sep 2026",
    title: "XSPACEWEB Expands Global Presence with New Partnerships",
    summary:
      "We are excited to announce new strategic partnerships to bring our digital solutions to more businesses worldwide.",
    link: "#latest-news",
  },
  {
    id: 2,
    tag: "PRODUCT UPDATE",
    date: "09 Sep 2026",
    title: "MakeGSTBill 3.0 Enterprise Engine Released",
    summary:
      "Introducing advanced financial reporting, multi-user real-time access, and enterprise automated invoice syncing.",
    link: "#latest-news",
  },
  {
    id: 3,
    tag: "EVENT ANNOUNCEMENT",
    date: "28 Aug 2026",
    title: "Tech Innovators Meet 2026 - A Grand Success",
    summary:
      "Over 500 technology leaders and developers gathered for an inspiring day of networking and SaaS innovation.",
    link: "#events",
  },
  {
    id: 4,
    tag: "PRESS RELEASE",
    date: "15 Jul 2026",
    title: "XSPACEWEB Featured in Leading National Business Media",
    summary:
      "National publications highlight our rapid expansion in MSME digital transformation and bespoke software engineering.",
    link: "#media",
  },
];

export const NewsHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredStories.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredStories.length - 1 ? 0 : prev + 1));
  };

  const story = featuredStories[currentSlide];

  return (
    <section className="relative w-full bg-[#07152B] text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Globe Network Background Accent on Right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-25 lg:opacity-40 pointer-events-none">
        <Image
          src="/images/news/globe_network.jpg"
          alt="Globe Network"
          fill
          className="object-cover rounded-full filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#07152B]" />
      </div>

      {/* Decorative Glow elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1668E8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1668E8]/20 border border-[#1668E8]/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span className="text-[12px] font-semibold tracking-wider text-[#38BDF8] uppercase">
                NEWS & EVENTS
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              What&apos;s New <br />
              at XSPACE<span className="text-[#1668E8]">WEB</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Stay updated with our latest announcements, product launches,
              partnerships, events and milestones.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                <span>Updated in Real Time from Headquarters</span>
              </div>
            </div>
          </div>

          {/* Right Hero Featured Slider Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300 hover:border-white/20">
              {/* Badge & Date */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#38BDF8] uppercase bg-[#1668E8]/30 px-3 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                  {story.tag}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {story.date}
                </span>
              </div>

              {/* Title & Description */}
              <div className="min-h-[140px] sm:min-h-[160px] flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-snug">
                  {story.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {story.summary}
                </p>
              </div>

              {/* Action Buttons and Pagination */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={story.link}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1668E8] text-white text-sm font-semibold hover:bg-[#1255c2] active:scale-95 transition-all shadow-lg shadow-[#1668E8]/30 group"
                >
                  <span>Read Full News</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                {/* Slider Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous story"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-semibold text-slate-300 tracking-wider">
                    {currentSlide + 1} / {featuredStories.length}
                  </span>
                  <button
                    onClick={nextSlide}
                    aria-label="Next story"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
