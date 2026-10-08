"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How does XSPACEWEB ensure unified branding across Amazon, Flipkart, and our D2C store?",
    answer:
      "We build a single master Design System and Asset Repository. When we create A+ Content, Brand Stores, or product packaging, all creative guidelines, color codes, typography, and copy guidelines are strictly enforced across your D2C store, Amazon Brand Registry, Flipkart Assured portal, and social commerce channels.",
  },
  {
    question: "Can we integrate our existing ERP or warehouse inventory with your omnichannel architecture?",
    answer:
      "Yes. Our engineering team integrates directly with enterprise ERPs (SAP, Tally, Zoho, Unicommerce, Vinculum, Increff) via REST APIs and Webhooks. Stock changes update in sub-seconds across Amazon, Flipkart, Meesho, AJIO, and Shopify Plus without manual spreadsheet uploads.",
  },
  {
    question: "What is the typical timeline for an end-to-end brand redesign and multi-channel launch?",
    answer:
      "A complete brand architecture and visual identity sprint takes 2 to 3 weeks. Full headless storefront engineering and marketplace syndication typically takes 4 to 6 weeks. We work in agile weekly milestones so you have full visibility into live staging demos throughout the engagement.",
  },
  {
    question: "Do you offer automated Buy Box repricing and ongoing marketplace optimization?",
    answer:
      "Yes. We configure proprietary algorithmic repricing engines that monitor competing seller SKUs 24/7, maintaining your profit margins while ensuring up to 99.8% Buy Box retention. We also manage Sponsored Ads and DSP programmatic campaigns to scale GMV profitably.",
  },
  {
    question: "Who owns the intellectual property and copyright of the brand assets created?",
    answer:
      "You retain 100% full intellectual property, trademark, and copyright ownership of all logos, packaging dielines, 3D renders, source code, and design tokens upon project completion and handover.",
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
      className="relative w-full bg-[#020412] text-white py-20 sm:py-28 overflow-hidden border-t border-slate-900/90"
    >
      {/* Background Cosmic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-10 w-[600px] h-[600px] rounded-full bg-purple-700/10 blur-[160px]" />
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-700/10 blur-[150px]" />
      </div>

      <Container size="wide" className="relative z-10 max-w-4xl space-y-14">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-purple-400 text-xs font-mono font-bold shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            Everything You Need <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              to Know Before Scaling.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Have questions about marketplace syndication, timelines, or our tech stack? Here are the answers to our most common questions.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/40 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-purple-950 border-purple-500" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-slate-300" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-900">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="text-center p-6 rounded-2xl bg-slate-950/50 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h4 className="text-sm font-bold text-white">Have a specific technical requirement?</h4>
            <p className="text-xs text-slate-400">Speak directly with our eCommerce &amp; branding architects.</p>
          </div>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-transform cursor-pointer flex-shrink-0"
          >
            <span>Ask Our Architects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Container>
    </section>
  );
};
