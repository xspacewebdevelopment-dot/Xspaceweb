"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search, ExternalLink, Newspaper, X } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { MediaMentionItem } from "@/lib/db/schema";

interface MediaCoverageListProps {
  initialMentions: MediaMentionItem[];
}

export const MediaCoverageList: React.FC<MediaCoverageListProps> = ({
  initialMentions = [],
}) => {
  const [search, setSearch] = useState("");

  const filteredMentions = initialMentions.filter((m) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      m.publicationName.toLowerCase().includes(q) ||
      m.headline.toLowerCase().includes(q)
    );
  });

  const renderLogo = (publicationName: string, logoUrl?: string | null) => {
    if (logoUrl) {
      return (
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg bg-white border border-slate-200 overflow-hidden flex items-center justify-center p-0.5 shadow-2xs">
            <Image
              src={logoUrl}
              alt={publicationName}
              fill
              className="object-contain p-0.5"
            />
          </div>
          <span className="font-bold text-sm tracking-tight text-[#07152B]">
            {publicationName}
          </span>
        </div>
      );
    }

    const norm = publicationName.toLowerCase();
    if (norm.includes("business standard")) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#B91C1C] text-white font-serif font-black text-xs flex items-center justify-center shadow-xs">
            BS
          </div>
          <span className="font-serif font-bold text-sm tracking-tight text-[#07152B]">
            Business Standard
          </span>
        </div>
      );
    }
    if (norm.includes("economic times")) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#DC2626] text-white font-serif font-black text-xs flex items-center justify-center shadow-xs">
            ET
          </div>
          <span className="font-serif font-bold text-sm tracking-tight text-[#07152B]">
            The Economic Times
          </span>
        </div>
      );
    }
    if (norm.includes("yourstory")) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#E11D48] text-white font-black text-xs flex items-center justify-center shadow-xs">
            YS
          </div>
          <span className="font-bold text-sm tracking-tight text-[#07152B]">
            YourStory
          </span>
        </div>
      );
    }
    if (norm.includes("dailyhunt")) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-slate-900 grid grid-cols-2 gap-0.5 p-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          </div>
          <span className="font-bold text-sm tracking-tight text-[#07152B]">
            Dailyhunt
          </span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#07152B] text-white font-bold text-xs flex items-center justify-center shadow-xs uppercase">
          {publicationName.slice(0, 2)}
        </div>
        <span className="font-bold text-sm tracking-tight text-[#07152B] truncate">
          {publicationName}
        </span>
      </div>
    );
  };

  return (
    <div className="py-12 sm:py-16 space-y-10">
      <Container size="wide">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by publication name or headline..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full border border-slate-200 bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1668E8] shadow-2xs"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mentions Grid */}
        {filteredMentions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-xs">
            <Newspaper className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#07152B] mb-1">
              No media mentions found
            </h3>
            <p className="text-xs text-slate-500">
              {search
                ? `No coverage matching "${search}". Try searching another keyword.`
                : "Press coverage and media features will appear here."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentions.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#1668E8]/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="mb-4">
                    {renderLogo(item.publicationName, item.logoUrl)}
                  </div>

                  <div className="text-[11px] font-medium text-slate-400 mb-2">
                    {item.publishedAt
                      ? new Date(item.publishedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </div>

                  <h3 className="text-base font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-snug line-clamp-3 mb-4">
                    {item.headline}
                  </h3>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={item.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1668E8] hover:text-[#0D2344] transition-colors group/link"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </a>
                  <span className="text-[11px] text-slate-400">External Publisher</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};
