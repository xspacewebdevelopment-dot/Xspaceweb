"use client";

import React from "react";
import {
  Calendar,
  FileCheck2,
  Building2,
  Hash,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface InfoCard {
  icon: React.ElementType;
  value: string;
  label: string;
  detail: string;
  isValueMono?: boolean;
}

const infoCards: InfoCard[] = [
  {
    icon: Calendar,
    value: "13 June 2021",
    label: "Started",
    detail: "As a freelance initiative",
  },
  {
    icon: FileCheck2,
    value: "31 May 2024",
    label: "Incorporated",
    detail: "As a Private Limited Company",
  },
  {
    icon: Building2,
    value: "Private Limited",
    label: "Company Type",
    detail: "XSPACEWEB Private Limited",
  },
  {
    icon: Hash,
    value: "U62012JH2024PTC022737",
    label: "CIN",
    detail: "Corporate Identification Number",
    isValueMono: true,
  },
  {
    icon: ShieldCheck,
    value: "2 States",
    label: "Business Presence",
    detail: "Jharkhand, West Bengal",
  },
  {
    icon: Compass,
    value: "5+ Years",
    label: "Journey",
    detail: "From freelance to incorporation and beyond",
  },
];

export const CompanyEssentialInfoSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-14 sm:py-20 border-b border-slate-100">
      <Container size="wide">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-2">
            COMPANY AT A GLANCE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#07152B] tracking-tight leading-tight">
            Essential Information
          </h2>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
          {infoCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_12px_rgba(7,21,43,0.03)] hover:shadow-lg hover:border-[#1668E8]/25 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100/60 flex items-center justify-center text-[#1668E8] mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Value */}
                  <h3
                    className={`font-bold text-[#07152B] mb-1 leading-snug break-words ${
                      card.isValueMono
                        ? "text-[12px] font-mono tracking-tight"
                        : "text-[16px] sm:text-[17px]"
                    }`}
                  >
                    {card.value}
                  </h3>

                  {/* Label */}
                  <p className="text-[12px] font-semibold text-[#1668E8] mb-2">
                    {card.label}
                  </p>
                </div>

                {/* Detail */}
                <p className="text-[12px] text-slate-500 leading-relaxed border-t border-slate-50 pt-2 mt-2">
                  {card.detail}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
