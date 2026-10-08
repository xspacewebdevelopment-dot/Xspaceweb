"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Do we retain 100% intellectual property, trademark and copyright ownership of our brand assets?",
    answer:
      "Yes, absolutely. Upon final project milestone handover, all intellectual property, worldwide copyrights, raw vector files (SVG, EPS, AI), 3D CAD dielines, and design tokens become 100% your exclusive legal property without any recurring royalties or licensing restrictions.",
  },
  {
    question: "How do your living design tokens connect from Figma directly to our development code?",
    answer:
      "We build tokens using standard design token specifications. Colors, typography scales, spacing grids, and component radii are exported directly into Tailwind CSS configuration files and CSS Custom Variables, ensuring that any visual update in Figma can be deployed to production web apps within minutes.",
  },
  {
    question: "How does 3D packaging rendering replace costly physical studio photoshoots?",
    answer:
      "We build mathematically precise 3D CAD models of your packaging in Cinema 4D and Octane Render with real-world material physics (foil debossing, matte finishes, glass refractions). We can generate hundreds of high-resolution e-commerce angles, lifestyle scenes, and video animations before a single physical unit is manufactured.",
  },
  {
    question: "What is the typical sprint timeline for an enterprise brand architecture engagement?",
    answer:
      "A focused Brand Architecture and Visual Identity sprint typically takes 2 to 3 weeks. Full omnichannel rollouts with 3D packaging systems, design tokens, and headless storefront design take 4 to 6 weeks. Every sprint includes structured weekly design reviews and live staging links.",
  },
  {
    question: "Can you assist with Amazon Brand Registry and marketplace brand store compliance?",
    answer:
      "Yes. Our brand packages include pre-formatted Amazon A+ Content, Brand Story modules, and Flipkart Assured catalog templates calibrated to strict platform resolution and layout guidelines, ensuring immediate approval without brand registry delays.",
  },
];

interface BrandingFaqSectionProps {
  onOpenConsultation?: () => void;
}

export const BrandingFaqSection: React.FC<BrandingFaqSectionProps> = ({
  onOpenConsultation,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="brand-faqs"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 overflow-hidden border-t border-slate-900/80"
    >
      {/* Background Cosmic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-10 w-[600px] h-[600px] rounded-full bg-purple-700/10 blur-[170px]" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-700/10 blur-[170px]" />
      </div>

      <Container size="wide" className="relative z-10 max-w-4xl space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-purple-400 text-xs font-mono font-bold shadow-sm backdrop-blur-xl">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>EXECUTIVE QUESTIONS &amp; ARCHITECTURAL CLARITY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12]">
            Frequently Addressed <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Brand Architecture Inquiries.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about deliverables, IP legal ownership, file formats, and timelines before launching your brand sprint.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border backdrop-blur-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-slate-950/85 border-cyan-500/40 shadow-[0_10px_30px_rgba(56,189,248,0.15)]"
                    : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-900 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Support Prompt */}
        <div className="p-6 rounded-3xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">Have a unique brand requirement?</div>
            <div className="text-xs text-slate-400">Our design directors are available for confidential executive alignment calls.</div>
          </div>

          <button
            type="button"
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            <span>Ask a Specialist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default BrandingFaqSection;
