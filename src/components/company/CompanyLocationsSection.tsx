"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export const CompanyLocationsSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-14 sm:py-20 border-b border-slate-100">
      <Container size="wide">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-2">
            OUR OFFICES
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#07152B] tracking-tight leading-tight">
            Locations
          </h2>
        </div>

        {/* Top 2 Cards: Dhanbad & Kolkata */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 mb-6 sm:gap-y-7">
          {/* Card 1: Dhanbad */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_2px_16px_rgba(7,21,43,0.04)] hover:shadow-xl hover:border-[#1668E8]/30 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-stretch group">
            {/* Image */}
            <div className="relative w-full sm:w-[190px] h-[170px] sm:h-auto rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
              <Image
                src="/images/contact/dhanbad.jpg"
                alt="Dhanbad Registered Office"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200/60 text-[#0E7490] text-[11px] font-bold tracking-wide uppercase mb-2.5">
                  Current Registered Office
                </span>

                <h3 className="text-lg sm:text-[19px] font-extrabold text-[#07152B] mb-2 leading-snug">
                  Dhanbad, Jharkhand
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                  C/O Khepa Kumar, Plot No. 746 &amp; 747, New Colony Muraidih,
                  Pochari, Dhanbad, Jharkhand, India – 828306
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Floor+No.+0+Plot+no.+766+767+C/O+Khepa+Kumar+Muraidih+Dhanbad+Jharkhand+828306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1668E8] hover:text-[#1255C0] group-hover:translate-x-0.5 transition-all"
                >
                  <span>View on Map</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Kolkata */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_2px_16px_rgba(7,21,43,0.04)] hover:shadow-xl hover:border-[#1668E8]/30 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-stretch group">
            {/* Image */}
            <div className="relative w-full sm:w-[190px] h-[170px] sm:h-auto rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
              <Image
                src="/images/contact/kolkata.jpg"
                alt="Kolkata Office"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#1668E8] text-[11px] font-bold tracking-wide uppercase mb-2.5">
                  Additional Place of Business
                </span>

                <h3 className="text-lg sm:text-[19px] font-extrabold text-[#07152B] mb-2 leading-snug">
                  Kolkata, West Bengal
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                  Floor No.: 0, Holding Number 131 (95), 131, Jessop Road, Near
                  Airport Gate No. 03, International Airport, Kolkata, North
                  Twenty Four Parganas, West Bengal – 700081
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Airport+Gate+Holding+number+131+95+131+03+Jangalpur+Rd+Kolkata+700081"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1668E8] hover:text-[#1255C0] group-hover:translate-x-0.5 transition-all"
                >
                  <span>View on Map</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Card: Hazaribagh */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_2px_16px_rgba(7,21,43,0.04)] hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col sm:flex-row gap-5 sm:gap-6 items-stretch group">
          {/* Image */}
          <div className="relative w-full sm:w-[260px] h-[180px] sm:h-auto rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
            <Image
              src="/images/company/hazaribagh.jpg"
              alt="Hazaribagh Operating Base"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold tracking-wide uppercase border border-slate-200">
                  Previous Operating Base
                </span>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[11px] font-semibold border border-slate-200">
                  2023 - March 2026
                </span>
              </div>

              <h3 className="text-lg sm:text-[19px] font-extrabold text-[#07152B] mb-2 leading-snug">
                Hazaribagh, Jharkhand
              </h3>

              <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-2xl">
                C/O Nitesh Kumar Mehta, Sindoor, Hazaribagh, Jharkhand, India -
                825301
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400">
                Operating history archive (2023 - 2026)
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
