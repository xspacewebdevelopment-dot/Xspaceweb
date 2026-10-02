"use client";

import React from "react";
import { Container } from "@/components/shared/ui/Container";
import { PresenceHubCard } from "./PresenceHubCard";

export const OurPresenceSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-14 sm:py-20">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* LEFT: Text Content */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4">
            <span className="text-[12px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block">
              OUR PRESENCE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#07152B] tracking-tight leading-[1.16]">
              Growing Across India and Beyond
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              XSPACEWEB is an emerging technology and digital services company
              with operations across major regions including{" "}
              <strong className="text-[#07152B] font-semibold">
                Jharkhand and Kolkata
              </strong>
              , while providing remote support nationwide.
            </p>
          </div>

          {/* RIGHT: Presence Hub Card */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[500px]">
              <PresenceHubCard />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
