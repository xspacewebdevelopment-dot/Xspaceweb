"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { MediaMentionItem } from "@/lib/db/schema";

interface MediaMentionsSectionProps {
  initialMentions?: MediaMentionItem[];
}

export const MediaMentionsSection: React.FC<MediaMentionsSectionProps> = ({
  initialMentions = [],
}) => {
  // Filter published & non-archived, order by displayOrder then publishedAt
  const displayMentions = React.useMemo(() => {
    return [...initialMentions]
      .filter((m) => m.status === "published" && !m.archivedAt)
      .sort((a, b) => {
        if (a.displayOrder !== b.displayOrder) {
          return a.displayOrder - b.displayOrder;
        }
        const timeB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        const timeA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        return timeB - timeA;
      })
      .slice(0, 4);
  }, [initialMentions]);

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

    // Default stylized badge for custom publications
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

  if (displayMentions.length === 0) {
    return null;
  }

  return (
    <section id="media" className="w-full bg-[#F8FAFC] py-14 sm:py-18 border-t border-slate-100">
      <Container size="wide">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#1668E8] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#07152B] tracking-tight">
              Media Mentions
            </h2>
          </div>
          <Link
            href="/news-and-updates/media"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors"
          >
            <span>View All Coverage</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayMentions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#1668E8]/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Brand Logo Header */}
                <div className="mb-4">
                  {renderLogo(item.publicationName, item.logoUrl)}
                </div>

                {/* Date */}
                <div className="text-[11px] font-medium text-slate-400 mb-2">
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </div>

                {/* Headline */}
                <h3 className="text-sm sm:text-base font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-snug line-clamp-3 mb-3">
                  {item.headline}
                </h3>
              </div>

              {/* Read Article external link */}
              <div className="pt-3 border-t border-slate-100 mt-2">
                <a
                  href={item.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors group/link"
                >
                  <span>Read Article</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
