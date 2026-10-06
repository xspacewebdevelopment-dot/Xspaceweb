"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";

export interface WorkCardItem {
  id: string;
  number: string;
  title: string;
  badge: string;
  category: string;
  tags: string[];
  displayTags: string;
  description: string;
  imageSrc: string;
  href: string;
  objectPosition: string;
  featured?: boolean;
}

const recentWorks: WorkCardItem[] = [
  {
    id: "makegstbill",
    number: "01",
    title: "MakeGSTBill",
    badge: "Live Product",
    category: "Fintech SaaS",
    tags: ["SaaS", "Fintech", "UI/UX"],
    displayTags: "Fintech SaaS · Product Design · Branding",
    description: "Simplifying GST billing and business management for Indian businesses.",
    imageSrc: "/images/recent-work/3.png",
    href: "https://makegstbill.com/",
    objectPosition: "center 48%",
    featured: true,
  },
  {
    id: "goldengst",
    number: "02",
    title: "GoldenGST",
    badge: "Brand Identity",
    category: "SaaS",
    tags: ["SaaS", "Branding", "UI/UX"],
    displayTags: "SaaS · Brand Identity · UI/UX",
    description: "A premium GST and business management experience built for growing businesses.",
    imageSrc: "/images/recent-work/new.png",
    href: "https://www.goldengst.com/",
    objectPosition: "center center",
  },
  {
    id: "dravanta-nexus",
    number: "03",
    title: "Dravanta Nexus",
    badge: "E-commerce",
    category: "E-commerce",
    tags: ["E-commerce", "Branding"],
    displayTags: "Branding · E-commerce · Creative Direction",
    description: "Building a modern identity for an Indian natural & organic products brand.",
    imageSrc: "/images/recent-work/nexus_card.png",
    href: "/products/dravanta-nexus",
    objectPosition: "center 55%",
  },
  {
    id: "freedeskpro",
    number: "04",
    title: "FreeDeskPro",
    badge: "Remote Access",
    category: "SaaS",
    tags: ["SaaS", "UI/UX"],
    displayTags: "SaaS · UI/UX · Product Design",
    description: "A next-generation remote support and device management platform.",
    imageSrc: "/images/recent-work/6.png",
    href: "https://freedeskpro.com/",
    objectPosition: "center center",
  },
  {
    id: "modhuralap",
    number: "05",
    title: "Modhuralap",
    badge: "Social Platform",
    category: "Social Platform",
    tags: ["Social Platform", "UI/UX", "Branding"],
    displayTags: "App Design · Brand Identity · Social Platform",
    description: "A modern social companion platform built around meaningful connections.",
    imageSrc: "/images/recent-work/7.png",
    href: "/products/modhuralap",
    objectPosition: "center center",
  },
  {
    id: "simplekaam",
    number: "06",
    title: "SimpleKaam",
    badge: "Work OS",
    category: "Productivity",
    tags: ["SaaS", "UI/UX"],
    displayTags: "Work OS · Employment Platform · Team SaaS",
    description: "A unified platform for all kinds of employment works, team workflows, and project management.",
    imageSrc: "/images/recent-work/8.png",
    href: "http://simplekaam.com/",
    objectPosition: "center 48%",
  },
];

const filterOptions = ["All", "SaaS", "Branding", "E-commerce", "UI/UX", "Fintech"];

export const RecentWorkSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const shouldReduceMotion = useReducedMotion();

  const featured = recentWorks[0]; // MakeGSTBill
  const goldenGst = recentWorks[1];
  const dravanta = recentWorks[2];
  const bottomRow = [recentWorks[3], recentWorks[4], recentWorks[5]];

  const isProjectActive = (work: WorkCardItem) => {
    if (activeFilter === "All") return true;
    return work.tags.includes(activeFilter);
  };

  return (
    <section
      id="recent-work"
      className="w-full relative py-12 sm:py-14 lg:py-16 border-t border-slate-100 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 52%, #ffffff 100%)",
      }}
    >
      {/* Extremely subtle ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 45%, rgba(59, 130, 246, 0.05), transparent 28%),
            radial-gradient(circle at 100% 35%, rgba(99, 102, 241, 0.035), transparent 28%)
          `,
        }}
      />

      {/* Decorative dotted pattern at far edges only */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] select-none"
        style={{
          backgroundImage: "radial-gradient(#07152B 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse at center, transparent 48%, black 95%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 48%, black 95%)",
        }}
      />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-7 sm:mb-9 lg:mb-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8]" />
              <span className="text-[11px] font-bold tracking-[0.22em] text-[#64748B] uppercase select-none">
                RECENT WORK
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#07152B] tracking-tight leading-tight">
              A few things we&apos;ve been{" "}
              <span className="bg-gradient-to-r from-[#1668E8] via-[#2563EB] to-[#38BDF8] bg-clip-text text-transparent inline-block">
                building lately.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex items-center gap-4">
              <p className="hidden md:block text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed text-right">
                Digital products, brand identities &amp; SaaS platforms.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#07152B] hover:text-[#1668E8] transition-colors whitespace-nowrap group/link select-none"
              >
                <span>View All Work</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </div>

            {/* Compact Filter Controls */}
            <div className="flex items-center gap-1.5 flex-wrap sm:justify-end select-none">
              {filterOptions.map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`h-[34px] px-3.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? "bg-[#1668E8] text-white border-[#1668E8] shadow-xs"
                        : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-[#E6EDF7] hover:border-slate-300"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 
          CASE-STUDY SPOTLIGHT LAYOUT:
          TOP GRID (12 Cols):
            - MakeGSTBill (7 Cols) - Dominant Featured Case Study with Bottom Overlay
            - Supporting Stack (5 Cols) - GoldenGST (top) & Dravanta Nexus (below)
          BOTTOM GRID (3 Cols):
            - FreeDeskPro, Modhuralap, SimpleKaam (Compact Cards, 4 cols each)
        */}
        <div className="space-y-5 sm:space-y-6 lg:space-y-7">
          {/* TOP GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* 1. MakeGSTBill (Featured - 7 Columns) */}
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={shouldReduceMotion ? undefined : { y: -3 }}
              className={`lg:col-span-7 group flex flex-col transition-all duration-500 ${
                !isProjectActive(featured) ? "grayscale contrast-[105%] pointer-events-none" : "grayscale-0 opacity-100"
              }`}
            >
              <Link
                href={featured.href}
                target={featured.href.startsWith("http") ? "_blank" : undefined}
                rel={featured.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block h-full focus:outline-none select-none group/featured"
              >
                <div className="relative w-full aspect-[1.48/1] rounded-[22px] sm:rounded-[24px] lg:rounded-[26px] overflow-hidden bg-slate-100 border border-slate-200/70 shadow-[0_4px_20px_-4px_rgba(7,21,43,0.06)] group-hover/featured:shadow-[0_16px_36px_-6px_rgba(7,21,43,0.12)] transition-shadow duration-300">
                  <Image
                    src={featured.imageSrc}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    style={{ objectPosition: featured.objectPosition }}
                    className="object-cover transition-transform duration-500 ease-out group-hover/featured:scale-[1.025]"
                  />

                  {/* Top-Left: Number Pill */}
                  <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-full bg-[#040D1E]/75 backdrop-blur-md text-white text-xs font-mono font-bold tracking-wider select-none border border-white/15 shadow-xs">
                    {featured.number}
                  </div>

                  {/* Top-Right: Live Product Badge */}
                  <div className="absolute top-3.5 right-3.5 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-xs text-xs font-bold text-slate-800 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{featured.badge}</span>
                  </div>

                  {/* Content Overlay ON BOTTOM OF IMAGE */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 lg:p-7 bg-gradient-to-t from-[#040D1E]/90 via-[#040D1E]/45 to-transparent flex items-end justify-between gap-4 text-white">
                    <div className="max-w-lg">
                      <h3 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-white tracking-tight leading-tight group-hover/featured:text-blue-200 transition-colors">
                        {featured.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] font-semibold text-blue-200/90 mt-1">
                        {featured.displayTags}
                      </p>
                      <p className="text-xs sm:text-[13px] text-slate-300 font-normal leading-relaxed line-clamp-2 mt-1.5">
                        {featured.description}
                      </p>
                    </div>

                    {/* Small circular ↗ button */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/[0.94] text-slate-900 flex items-center justify-center shadow-md transition-all duration-200 group-hover/featured:scale-105 flex-shrink-0">
                      <ArrowUpRight className="w-5 h-5 text-slate-900 stroke-[2.2] transition-transform duration-200 group-hover/featured:translate-x-0.5 group-hover/featured:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>

            {/* 2. Supporting Column (5 Columns: GoldenGST & Dravanta Nexus) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 lg:gap-6 justify-between">
              {[goldenGst, dravanta].map((work, idx) => (
                <motion.article
                  key={work.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.6,
                    delay: (idx + 1) * 0.06,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  className={`group flex flex-col transition-all duration-500 ${
                    !isProjectActive(work) ? "grayscale contrast-[105%] pointer-events-none" : "grayscale-0 opacity-100"
                  }`}
                >
                  <Link
                    href={work.href}
                    target={work.href.startsWith("http") ? "_blank" : undefined}
                    rel={work.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block focus:outline-none select-none group/card"
                  >
                    {/* Supporting Image Container */}
                    <div className="relative w-full aspect-[16/9] sm:aspect-[1.8/1] lg:aspect-[2/0.82] rounded-[18px] lg:rounded-[20px] overflow-hidden bg-slate-100 border border-slate-200/60 shadow-[0_3px_14px_-3px_rgba(7,21,43,0.06)] group-hover/card:shadow-[0_12px_24px_-4px_rgba(7,21,43,0.10)] transition-shadow duration-300">
                      <Image
                        src={work.imageSrc}
                        alt={work.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        style={{ objectPosition: work.objectPosition }}
                        className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.025]"
                      />

                      {/* Subtle hover overlay */}
                      <div className="absolute inset-0 bg-slate-950/0 group-hover/card:bg-slate-950/[0.03] transition-colors duration-300 pointer-events-none" />

                      {/* Top-Left: Number Pill */}
                      <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-full bg-[#040D1E]/75 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider select-none border border-white/15 shadow-xs">
                        {work.number}
                      </div>

                      {/* Top-Right: Category Tag */}
                      <div className="absolute top-3 right-3 z-20 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[10.5px] font-bold border border-white/80 shadow-xs select-none">
                        {work.badge}
                      </div>
                    </div>

                    {/* Metadata Row: Clean 12px gap, NO huge box */}
                    <div className="mt-3 px-0.5 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-[#07152B] tracking-tight group-hover/card:text-[#1668E8] transition-colors leading-snug truncate">
                          {work.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                          {work.displayTags}
                        </p>
                      </div>
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 group-hover/card:bg-[#1668E8] group-hover/card:text-white flex items-center justify-center text-slate-500 transition-all duration-200 flex-shrink-0 mt-0.5 shadow-xs">
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>

          {/* BOTTOM ROW: 3 Compact Cards (FreeDeskPro, Modhuralap, SimpleKaam) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {bottomRow.map((work, idx) => (
              <motion.article
                key={work.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: (idx + 3) * 0.06,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                className={`group flex flex-col transition-all duration-500 ${
                  !isProjectActive(work) ? "grayscale contrast-[105%] pointer-events-none" : "grayscale-0 opacity-100"
                }`}
              >
                <Link
                  href={work.href}
                  target={work.href.startsWith("http") ? "_blank" : undefined}
                  rel={work.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block focus:outline-none select-none group/card"
                >
                  {/* Compact Image Container */}
                  <div className="relative w-full aspect-[1.8/1] sm:aspect-[1.8/1] lg:aspect-[1.7/0.75] rounded-[18px] lg:rounded-[20px] overflow-hidden bg-slate-100 border border-slate-200/60 shadow-[0_3px_14px_-3px_rgba(7,21,43,0.06)] group-hover/card:shadow-[0_12px_24px_-4px_rgba(7,21,43,0.10)] transition-shadow duration-300">
                    <Image
                      src={work.imageSrc}
                      alt={work.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectPosition: work.objectPosition }}
                      className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.025]"
                    />

                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-slate-950/0 group-hover/card:bg-slate-950/[0.03] transition-colors duration-300 pointer-events-none" />

                    {/* Top-Left: Number Pill */}
                    <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-full bg-[#040D1E]/75 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider select-none border border-white/15 shadow-xs">
                      {work.number}
                    </div>

                    {/* Top-Right: Category Tag */}
                    <div className="absolute top-3 right-3 z-20 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[10.5px] font-bold border border-white/80 shadow-xs select-none">
                      {work.badge}
                    </div>
                  </div>

                  {/* Metadata Row: Clean 12px gap, NO huge box */}
                  <div className="mt-3 px-0.5 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-[#07152B] tracking-tight group-hover/card:text-[#1668E8] transition-colors leading-snug truncate">
                        {work.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                        {work.displayTags}
                      </p>
                    </div>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 group-hover/card:bg-[#1668E8] group-hover/card:text-white flex items-center justify-center text-slate-500 transition-all duration-200 flex-shrink-0 mt-0.5 shadow-xs">
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
