"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, ArrowRight, Calendar, Sparkles, X } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  category: string;
  badge: string;
  badgeColor: string;
  date: string;
  title: string;
  description: string;
  fullContent: string;
  image: string;
}

const newsData: NewsItem[] = [
  {
    id: "makegstbill-update",
    category: "Product Updates",
    badge: "PRODUCT UPDATE",
    badgeColor: "bg-[#1668E8] text-white",
    date: "09 Sep 2026",
    title: "MakeGSTBill New Features Released",
    description:
      "Introducing advanced reporting, multi-user access and new customization options.",
    fullContent:
      "MakeGSTBill has launched its comprehensive 3.0 update, bringing enterprise-grade GST billing, multi-user role management, auto-reconciliation with the GST portal, and customizable invoice templates tailored for Indian businesses and retail chains.",
    image: "/images/news/news_laptop_code.jpg",
  },
  {
    id: "strategic-partnership",
    category: "Company Updates",
    badge: "PARTNERSHIP",
    badgeColor: "bg-[#0284C7] text-white",
    date: "05 Sep 2026",
    title: "Strategic Collaboration with Industry Leaders",
    description:
      "XSPACEWEB partners with leading organizations to deliver innovative digital solutions.",
    fullContent:
      "XSPACEWEB announced strategic alliances with key national technology partners and cloud providers to accelerate digital transformation, custom SaaS architecture, and omnichannel digital strategies for enterprises across India and global markets.",
    image: "/images/news/news_handshake.jpg",
  },
  {
    id: "tech-innovators-meet",
    category: "Events",
    badge: "EVENT",
    badgeColor: "bg-[#7C3AED] text-white",
    date: "28 Aug 2026",
    title: "Tech Innovators Meet 2026 - A Grand Success",
    description:
      "A day full of insights, networking and exciting opportunities.",
    fullContent:
      "The flagship annual Tech Innovators Meet 2026 brought together over 500 startup founders, engineers, and product designers. Keynotes covered AI-driven SaaS workflows, modern cloud web architectures, and high-performance product scaling.",
    image: "/images/news/news_conference_stage.jpg",
  },
  {
    id: "press-featured",
    category: "Press Coverage",
    badge: "PRESS COVERAGE",
    badgeColor: "bg-[#D97706] text-white",
    date: "15 July 2026",
    title: "XSPACEWEB Featured in Leading News Platform",
    description:
      "Our journey and vision covered by top media publications.",
    fullContent:
      "Leading Indian business publications spotlighted XSPACEWEB's rapid journey from Dhanbad and Kolkata into a premier software and SaaS powerhouse, celebrating our commitment to MSME digital enablement and boundary-pushing web engineering.",
    image: "/images/news/news_press_clip.jpg",
  },
];

const categories = [
  "All",
  "Company Updates",
  "Product Updates",
  "Events",
  "Press Coverage",
  "Achievements",
  "CSR",
];

export const NewsFilterAndGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="latest-news" className="w-full bg-white py-12 sm:py-16">
      <Container size="wide">
        {/* Filter Tabs & Search Bar Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-slate-100">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap cursor-pointer",
                    isSelected
                      ? "bg-[#1668E8] text-white shadow-sm font-semibold"
                      : "bg-[#F3F4F6] text-[#556987] hover:bg-slate-200 hover:text-[#07152B]"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, events..."
              className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-slate-200 rounded-full text-xs sm:text-sm text-[#07152B] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mt-10 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#1668E8] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#07152B] tracking-tight">
              Latest News & Updates
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors"
          >
            <span>View All News</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        {filteredNews.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-sm">No articles match your search or filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-3 text-xs font-semibold text-[#1668E8] hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Image Container with Badge */}
                <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-sm",
                        item.badgeColor
                      )}
                    >
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-2">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-snug line-clamp-2 mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed line-clamp-3 mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <button
                    onClick={() => setActiveArticle(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors pt-2 group/btn"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Article Preview */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-56 rounded-xl overflow-hidden mb-5">
                <Image
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span
                  className={cn(
                    "px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase",
                    activeArticle.badgeColor
                  )}
                >
                  {activeArticle.badge}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeArticle.date}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#07152B] mb-4">
                {activeArticle.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {activeArticle.fullContent}
              </p>

              <button
                onClick={() => setActiveArticle(null)}
                className="w-full py-2.5 rounded-full bg-[#07152B] text-white text-sm font-semibold hover:bg-[#1668E8] transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
