"use client";

import React, { useState } from "react";
import { ArrowRight, ExternalLink, Newspaper, X } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface MediaMention {
  id: string;
  source: string;
  logoType: "bs" | "et" | "ys" | "dh";
  date: string;
  headline: string;
  excerpt: string;
  url: string;
}

const mediaData: MediaMention[] = [
  {
    id: "bs-saas",
    source: "Business Standard",
    logoType: "bs",
    date: "12 Aug 2026",
    headline: "XSPACEWEB's SaaS Solutions Gain Momentum in Indian Market",
    excerpt:
      "Business Standard analysis reveals how XSPACEWEB's flagship products MakeGSTBill and GoldenGST are empowering Indian small businesses with compliant, cloud-native automated billing.",
    url: "https://www.business-standard.com",
  },
  {
    id: "et-msme",
    source: "The Economic Times",
    logoType: "et",
    date: "28 Jul 2026",
    headline: "XSPACEWEB Focuses on Digital Transformation for MSMEs",
    excerpt:
      "The Economic Times reports on XSPACEWEB's rapid expansion into tier-2 and tier-3 business ecosystems, providing comprehensive digital services and enterprise tech suites.",
    url: "https://economictimes.indiatimes.com",
  },
  {
    id: "ys-beyond-boundaries",
    source: "YourStory",
    logoType: "ys",
    date: "15 Jun 2026",
    headline: "XSPACEWEB: Building Digital Experiences Beyond Boundaries",
    excerpt:
      "YourStory feature story explores the founding journey of XSPACEWEB, spotlighting its culture of innovation, deep product architecture, and customer-first SaaS development.",
    url: "https://yourstory.com",
  },
  {
    id: "dh-innovation",
    source: "Dailyhunt",
    logoType: "dh",
    date: "10 Jul 2026",
    headline: "XSPACEWEB Featured for Innovation in Digital Solutions",
    excerpt:
      "Dailyhunt tech spotlight honors XSPACEWEB for bridging cutting-edge technology, creative web development, and accessible SaaS software for everyday entrepreneurs.",
    url: "https://dailyhunt.in",
  },
];

export const MediaMentionsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<MediaMention | null>(null);

  const renderLogo = (type: MediaMention["logoType"], source: string) => {
    switch (type) {
      case "bs":
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#B91C1C] text-white font-serif font-black text-xs flex items-center justify-center shadow-sm">
              BS
            </div>
            <span className="font-serif font-bold text-sm tracking-tight text-[#07152B]">
              Business Standard
            </span>
          </div>
        );
      case "et":
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#DC2626] text-white font-serif font-black text-xs flex items-center justify-center shadow-sm">
              ET
            </div>
            <span className="font-serif font-bold text-sm tracking-tight text-[#07152B]">
              The Economic Times
            </span>
          </div>
        );
      case "ys":
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#E11D48] text-white font-black text-xs flex items-center justify-center shadow-sm">
              YS
            </div>
            <span className="font-bold text-sm tracking-tight text-[#07152B]">
              YourStory
            </span>
          </div>
        );
      case "dh":
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-slate-900 grid grid-cols-2 gap-0.5 p-1.5 shadow-sm">
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
      default:
        return <span className="font-bold text-sm">{source}</span>;
    }
  };

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
          <a
            href="#media"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors"
          >
            <span>View All Coverage</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {mediaData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#1668E8]/30 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Brand Logo Header */}
                <div className="mb-4">
                  {renderLogo(item.logoType, item.source)}
                </div>

                {/* Date */}
                <div className="text-[11px] font-medium text-slate-400 mb-2">
                  {item.date}
                </div>

                {/* Headline */}
                <h3 className="text-sm sm:text-base font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-snug line-clamp-3 mb-3">
                  {item.headline}
                </h3>
              </div>

              {/* Read Article link */}
              <div className="pt-3 border-t border-slate-100 mt-2">
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors group/link"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Article Excerpt */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                {renderLogo(selectedArticle.logoType, selectedArticle.source)}
              </div>

              <div className="text-xs text-slate-400 font-medium mb-3">
                Published on {selectedArticle.date}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#07152B] mb-4">
                {selectedArticle.headline}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {selectedArticle.excerpt}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#07152B] text-sm font-semibold transition-colors"
                >
                  Close
                </button>
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#1668E8] hover:bg-[#1255c2] text-white text-sm font-semibold transition-colors shadow-md"
                >
                  <span>Visit Publisher</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
