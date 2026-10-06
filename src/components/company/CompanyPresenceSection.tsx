"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { ProjectModal } from "@/components/shared/ProjectModal";

export const CompanyPresenceSection: React.FC = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <>
      <section className="relative w-full bg-white py-14 sm:py-20 overflow-hidden">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block">
                OUR PRESENCE
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold text-[#07152B] tracking-tight leading-[1.15]">
                Across Two States, Serving Clients Nationwide
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                With an operational presence in Jharkhand and West Bengal, we work
                with clients across India through remote digital operations.
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1668E8] text-white text-sm font-semibold hover:bg-[#1255C0] transition-all duration-200 shadow-sm hover:shadow-[0_4px_16px_rgba(22,104,232,0.35)] active:scale-[0.98] cursor-pointer"
                >
                  <span>Work With Us</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Hub Indicators */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1668E8]" />
                  <span>
                    <strong className="text-[#07152B]">Dhanbad:</strong> Registered Office
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0E7490]" />
                  <span>
                    <strong className="text-[#07152B]">Kolkata:</strong> Business Hub
                  </span>
                </div>
              </div>
            </div>

            {/* Right Map Visual with Pins */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[480px] aspect-square rounded-2xl bg-gradient-to-b from-slate-50/80 to-white p-6 border border-slate-100 shadow-[0_4px_24px_rgba(7,21,43,0.03)] flex items-center justify-center">
                <Image
                  src="/images/about/india_presence_map_clean.jpg"
                  alt="XSPACEWEB India Presence Map"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-contain p-4"
                />

                {/* Interactive Tooltip Card 1: Kolkata */}
                <div className="hidden sm:flex absolute right-4 top-[40%] bg-white/95 backdrop-blur-md rounded-xl p-2.5 px-3 border border-slate-200 shadow-md items-center gap-2.5 pointer-events-none animate-bounce-subtle">
                  <div className="w-2 h-2 rounded-full bg-[#1668E8]" />
                  <div>
                    <p className="text-[12px] font-bold text-[#07152B] leading-none mb-0.5">
                      Kolkata, West Bengal
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Additional Place of Business
                    </p>
                  </div>
                </div>

                {/* Interactive Tooltip Card 2: Dhanbad */}
                <div className="hidden sm:flex absolute right-8 top-[60%] bg-white/95 backdrop-blur-md rounded-xl p-2.5 px-3 border border-slate-200 shadow-md items-center gap-2.5 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-[#0E7490]" />
                  <div>
                    <p className="text-[12px] font-bold text-[#07152B] leading-none mb-0.5">
                      Dhanbad, Jharkhand
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Registered Office
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProjectModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </>
  );
};
