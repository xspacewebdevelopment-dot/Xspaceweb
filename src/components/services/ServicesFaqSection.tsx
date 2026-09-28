"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How long does a typical website or app development project take?",
    answer:
      "Most high-performance landing pages and standard corporate websites are delivered within 2 to 4 weeks. Custom full-stack web applications or mobile apps typically range between 6 to 10 weeks depending on custom feature requirements, 3rd-party API integrations, and testing cycles. We work in 1-week agile sprints with continuous staging demos.",
  },
  {
    question: "Do I retain 100% ownership of the source code and design assets?",
    answer:
      "Yes, absolutely. Upon final project sign-off and settlement, you retain 100% intellectual property (IP) and full ownership of all source code repositories (GitHub/GitLab), Figma design files, database schemas, and digital assets. There are no vendor lock-ins.",
  },
  {
    question: "Can you help maintain and update our platform after launch?",
    answer:
      "Yes! We provide flexible post-launch SLA support and maintenance packages that cover regular security patches, server performance monitoring, feature upgrades, dependency maintenance, and bug fixes.",
  },
  {
    question: "How do we get started and what is the onboarding process?",
    answer:
      "Getting started is simple. You can submit your requirements via the proposal form on this page or schedule a 15-minute discovery call. We will review your vision, prepare a detailed scope document with fixed milestone pricing, and kick off Sprint 0 within 48 hours.",
  },
  {
    question: "Can XSPACEWEB work with our existing in-house engineering or marketing team?",
    answer:
      "Definitely. We often operate as an augmented specialized squad alongside internal teams — whether handling end-to-end UI/UX design, building dedicated microservices, or executing high-growth performance marketing campaigns.",
  },
];

export const ServicesFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-[#F8FAFC] relative border-t border-slate-200/80">
      <Container size="wide">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1668E8] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our engagement models, timelines, code ownership, and pricing.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-slate-50/60 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-[#07152B] pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-blue-50 text-[#1668E8]" : "text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
