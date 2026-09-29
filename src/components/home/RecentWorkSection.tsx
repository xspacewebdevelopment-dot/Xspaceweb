"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import BlurText from "@/components/ui/BlurText";

export interface WorkCardItem {
  id: string;
  number: string;
  title: string;
  tags: string;
  description: string;
  imageSrc: string;
  href: string;
}

const recentWorks: WorkCardItem[] = [
  {
    id: "makegstbill",
    number: "01",
    title: "MakeGSTBill",
    tags: "Fintech SaaS · Product Design · Branding",
    description: "Simplifying GST billing and business management for Indian businesses.",
    imageSrc: "/images/recent-work/3.png",
    href: "/products/makegstbill",
  },
  {
    id: "goldengst",
    number: "02",
    title: "GoldenGST",
    tags: "SaaS · Brand Identity · UI/UX",
    description: "A premium GST and business management experience built for growing businesses.",
    imageSrc: "/new.png",
    href: "/products/goldengst",
  },
  {
    id: "dravanta-nexus",
    number: "03",
    title: "Dravanta Nexus",
    tags: "Branding · E-commerce · Creative Direction",
    description: "Building a modern identity for an Indian natural & organic products brand.",
    imageSrc: "/Nexus.png",
    href: "/products/dravanta-nexus",
  },
  {
    id: "freedeskpro",
    number: "04",
    title: "FreeDeskPro",
    tags: "SaaS · UI/UX · Product Design",
    description: "A next-generation remote support and device management platform.",
    imageSrc: "/images/recent-work/6.png",
    href: "/products/freedeskpro",
  },
  {
    id: "modhuralap",
    number: "05",
    title: "Modhuralap",
    tags: "App Design · Brand Identity · Social Platform",
    description: "A modern social companion platform built around meaningful connections.",
    imageSrc: "/images/recent-work/7.png",
    href: "/products/modhuralap",
  },
  {
    id: "simplekaam",
    number: "06",
    title: "SimpleKaam",
    tags: "Work OS · Employment Platform · Team SaaS",
    description: "A unified platform for all kinds of employment works, team workflows, and project management.",
    imageSrc: "/images/recent-work/8.png",
    href: "/products#simplekaam",
  },
];

export const RecentWorkSection: React.FC = () => {
  return (
    <section id="recent-work" className="w-full bg-white text-slate-900 py-16 sm:py-24 relative border-t border-b border-slate-200/80">
      <Container size="wide">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-[#64748B] uppercase select-none block">
              RECENT WORK
            </span>
            <BlurText
              text="A few things we've been building lately."
              delay={100}
              animateBy="words"
              direction="top"
              stepDuration={0.4}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight leading-tight"
              as="h2"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between md:justify-end gap-4 max-w-md">
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              From digital products to brand identities and campaigns — here&apos;s a glimpse of our latest work.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#07152B] hover:text-[#1668E8] transition-colors whitespace-nowrap group select-none"
            >
              <span>View All Work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* 6 Cards 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recentWorks.map((work) => (
            <Link
              key={work.id}
              href={work.href}
              className="group flex flex-col justify-between rounded-2xl bg-white border border-slate-200/80 p-3 sm:p-4 hover:border-slate-300 hover:shadow-xl transition-all duration-300 select-none"
            >
              {/* Card Image Container */}
              <div className="relative w-full h-[220px] sm:h-[250px] md:h-[270px] rounded-xl overflow-hidden bg-slate-100 mb-4">
                <Image
                  src={work.imageSrc}
                  alt={work.title}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Number Badge at Top Left */}
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-slate-950/70 backdrop-blur-md text-white text-xs font-mono font-bold">
                  {work.number}
                </div>
              </div>

              {/* Card Info Content */}
              <div className="flex flex-col justify-between flex-1 space-y-3 px-1 pb-1">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors">
                      {work.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 group-hover:border-[#1668E8] group-hover:bg-[#1668E8] group-hover:text-white transition-all flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 tracking-wide">
                    {work.tags}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {work.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
