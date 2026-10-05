"use client";

import React from "react";
import { Container } from "@/components/shared/ui/Container";

interface Milestone {
  date: string;
  isHighlight?: boolean;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    date: "13 Jun 2021",
    isHighlight: true,
    title: "The Beginning",
    description: "XSPACEWEB started as a freelance initiative on 13 June 2021.",
  },
  {
    date: "2022",
    title: "First Operating Space",
    description:
      "Operated for 1 year from a room near City Centre, Karibandh, Dhanbad.",
  },
  {
    date: "2023",
    title: "Expanded to Hazaribagh",
    description: "Operations shifted to Hazaribagh, Jharkhand in 2023.",
  },
  {
    date: "31 May 2024",
    isHighlight: true,
    title: "Private Limited Company",
    description:
      "XSPACEWEB Private Limited was incorporated on 31 May 2024.",
  },
  {
    date: "2024 – 2026",
    title: "Hazaribagh Operations",
    description:
      "Continued operations from Hazaribagh until March 2026.",
  },
  {
    date: "Mar 2026",
    title: "Registered Office Shifted",
    description:
      "Registered address shifted to Dhanbad (Muraidih) in March 2026.",
  },
  {
    date: "Jun 2026",
    title: "Kolkata Presence",
    description:
      "Additional place of business established in Kolkata, West Bengal in June 2026.",
  },
];

export const CompanyMilestonesSection: React.FC = () => {
  return (
    <section id="journey" className="relative w-full bg-[#FAFBFD] py-14 sm:py-20 border-b border-slate-100">
      <Container size="wide">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-2">
            OUR JOURNEY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#07152B] tracking-tight leading-tight mb-3">
            Key Milestones
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A journey built through learning, hard work, and the support of our
            clients, team and community.
          </p>
        </div>

        {/* Desktop / Large Screen Horizontal Timeline */}
        <div className="hidden xl:block relative w-full pt-4 pb-2">
          {/* Connecting Line */}
          <div className="absolute top-[38px] left-[2%] right-[2%] h-[2px] bg-slate-200" />

          <div className="grid grid-cols-7 gap-4 relative">
            {milestones.map((item, index) => (
              <div key={index} className="flex flex-col group">
                {/* Date Tag */}
                <div className="mb-3">
                  <span
                    className={`inline-block text-[12px] font-bold ${
                      item.isHighlight
                        ? "text-[#1668E8]"
                        : "text-[#1668E8]"
                    }`}
                  >
                    {item.date}
                  </span>
                </div>

                {/* Node Point */}
                <div className="relative mb-5 flex items-center">
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                      item.isHighlight
                        ? "bg-[#1668E8] ring-4 ring-blue-100 group-hover:scale-125"
                        : "bg-slate-300 group-hover:bg-[#1668E8] group-hover:scale-125 ring-2 ring-white"
                    }`}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-[14px] font-bold text-[#07152B] leading-snug mb-1.5 group-hover:text-[#1668E8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet & Mobile Timeline */}
        <div className="xl:hidden relative border-l-2 border-slate-200 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8 sm:space-y-10">
          {milestones.map((item, index) => (
            <div key={index} className="relative group">
              {/* Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full ${
                  item.isHighlight
                    ? "bg-[#1668E8] ring-4 ring-blue-100"
                    : "bg-slate-300 ring-4 ring-white"
                }`}
              />

              {/* Date */}
              <span className="inline-block text-xs font-bold text-[#1668E8] mb-1">
                {item.date}
              </span>

              {/* Title */}
              <h3 className="text-base font-bold text-[#07152B] leading-snug mb-1">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
