"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Calendar, X } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { cn } from "@/lib/utils";
import { NewsArticle } from "@/lib/db/schema";

interface NewsFilterAndGridProps {
  initialArticles?: NewsArticle[];
  limitToFour?: boolean;
}

const categories = [
  "All",
  "Company Updates",
  "Product Updates",
  "Events",
  "Press Coverage",
  "Achievements",
  "CSR",
];

const getBadgeStyles = (category: string) => {
  switch (category) {
    case "Product Updates":
      return { badge: "PRODUCT UPDATE", color: "bg-[#1668E8] text-white" };
    case "Company Updates":
      return { badge: "PARTNERSHIP", color: "bg-[#0284C7] text-white" };
    case "Events":
      return { badge: "EVENT", color: "bg-[#7C3AED] text-white" };
    case "Press Coverage":
      return { badge: "PRESS COVERAGE", color: "bg-[#D97706] text-white" };
    case "Achievements":
      return { badge: "ACHIEVEMENT", color: "bg-[#059669] text-white" };
    case "CSR":
      return { badge: "CSR", color: "bg-[#E11D48] text-white" };
    default:
      return { badge: category.toUpperCase(), color: "bg-[#1668E8] text-white" };
  }
};

const formatNewsDate = (date: Date | string | null | undefined) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const NewsFilterAndGrid: React.FC<NewsFilterAndGridProps> = ({
  initialArticles = [],
  limitToFour = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = useMemo(() => {
    let items = initialArticles.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (limitToFour && !searchQuery && selectedCategory === "All") {
      items = items.slice(0, 4);
    }

    return items;
  }, [initialArticles, selectedCategory, searchQuery, limitToFour]);

  return (
    <section id="latest-news" className="w-full bg-white py-12 sm:py-16 scroll-mt-20">
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
          {limitToFour ? (
            <Link
              href="/news-and-updates/all"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors"
            >
              <span>View All News</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-xs sm:text-sm font-semibold text-[#1668E8] hover:underline"
            >
              Reset Filters
            </button>
          )}
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
            {filteredNews.map((item) => {
              const { badge, color } = getBadgeStyles(item.category);
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                >
                  {/* Image Container with Badge */}
                  <Link
                    href={`/news-and-updates/${item.slug}`}
                    className="relative w-full h-48 bg-slate-100 overflow-hidden block"
                  >
                    <Image
                      src={item.coverImageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-sm",
                          color
                        )}
                      >
                        {badge}
                      </span>
                    </div>
                  </Link>

                  {/* Content Box */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-2">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{formatNewsDate(item.publishedAt)}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-snug line-clamp-2 mb-2">
                        <Link href={`/news-and-updates/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed line-clamp-3 mb-4">
                        {item.summary}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <Link
                      href={`/news-and-updates/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors pt-2 group/btn"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};
