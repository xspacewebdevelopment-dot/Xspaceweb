"use client";

import React from "react";
import Image from "next/image";
import {
  Newspaper,
  Video,
  Calendar,
  MapPin,
  Sun,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export const MastheadHeader: React.FC = () => {
  return (
    <section className="w-full bg-white pt-2 pb-6 sm:pb-10">
      {/* Top Vintage / Editorial Masthead Bar & Hero */}
      <Container size="full" className="max-w-[1540px] px-2 sm:px-4 lg:px-6">
        <div className="border-t border-b border-slate-200/90 py-2 sm:py-2.5 my-1">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            {/* Left Black Box */}
            <div className="w-full lg:w-auto flex-shrink-0 bg-[#07152B] text-white px-3.5 py-2 rounded-lg flex flex-col justify-center shadow-sm">
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-white uppercase leading-tight">
                NEWS &amp; EVENTS
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium tracking-wide text-slate-300">
                THE OFFICIAL UPDATE HUB
              </span>
            </div>

            {/* Center Editorial Masthead */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
              <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-black tracking-tight text-[#07152B] leading-none mb-1">
                XSPACE<span className="text-[#1668E8]">WEB</span>
              </h1>
              <div className="w-full max-w-2xl h-[1px] bg-slate-200 mb-1" />
              <div className="flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-2.5 gap-y-0.5 text-[9.5px] sm:text-[10.5px] text-slate-600 font-medium whitespace-nowrap">
                <span>Wednesday, September 24, 2026</span>
                <span className="text-slate-300">|</span>
                <span className="inline-flex items-center gap-1">
                  <Newspaper className="w-2.5 h-2.5 text-slate-500" />
                  Today&apos;s News
                </span>
                <span className="text-slate-300">|</span>
                <span className="inline-flex items-center gap-1">
                  <Video className="w-2.5 h-2.5 text-slate-500" />
                  Videos
                </span>
                <span className="text-slate-300">|</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5 text-slate-500" />
                  Events
                </span>
                <span className="text-slate-300">|</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 text-slate-500" />
                  Dhanbad, Jharkhand
                </span>
                <span className="text-slate-300">|</span>
                <span className="inline-flex items-center gap-1">
                  <Sun className="w-2.5 h-2.5 text-amber-500" />
                  28°C
                </span>
                <span className="text-slate-300">|</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                  <span>XSW</span>
                  <span>+2.34%</span>
                  <TrendingUp className="w-2.5 h-2.5 text-emerald-600" />
                </span>
              </div>
            </div>

            {/* Right Black Box */}
            <div className="w-full lg:w-auto flex-shrink-0 bg-[#07152B] text-white px-3.5 py-2 rounded-lg flex flex-col justify-center text-left lg:text-right shadow-sm">
              <span className="text-[11px] sm:text-xs font-bold tracking-wider text-white uppercase leading-tight">
                BUILT BY XSPACEWEB
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium tracking-wide text-slate-300">
                TECHNOLOGY FOR A BETTER TOMORROW
              </span>
            </div>
          </div>
        </div>

        {/* Hero Newspaper Banner Image - Crisp sharp rectangle, wide span with reduced side margins */}
        <div className="mt-2.5 sm:mt-3">
          <div className="relative w-full aspect-[16/9] max-h-[520px] rounded-none overflow-hidden shadow-sm border border-slate-200/80 bg-slate-100">
            <Image
              src="/images/news/news_hero_centered.jpg"
              alt="XSPACEWEB News and Events Newspaper"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
