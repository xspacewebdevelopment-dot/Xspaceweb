"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/shared/ui/Container";

export const OurPresenceSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-12 sm:py-16">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT: Text Content */}
          <div className="lg:col-span-5">
            <span className="text-[12px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-3">
              OUR PRESENCE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#07152B] tracking-tight leading-[1.18] mb-4">
              Growing Across India and Beyond
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              XSPACEWEB is an emerging technology and digital services company
              with operations across major regions including{" "}
              <strong className="text-[#07152B] font-semibold">
                Jharkhand and Kolkata
              </strong>
              , while providing remote support nationwide.
            </p>
          </div>

          {/* RIGHT: Map & Merchants Growth Card */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
            {/* Crisp Recognizable India Map */}
            <div className="sm:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-[340px] rounded-2xl overflow-hidden bg-white p-2">
                <Image
                  src="/images/about/india_presence_map_clean.jpg"
                  alt="XSPACEWEB operations in Jharkhand and Kolkata, connecting across India"
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>
            </div>

            {/* Merchant Growth Card with Pristine Vector Logos */}
            <div className="sm:col-span-6">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight mb-6">
                  We help merchants grow on
                </p>

                <div className="grid grid-cols-3 gap-y-7 gap-x-3 items-center justify-items-center">
                  {/* Amazon */}
                  <div className="flex items-center justify-center h-8 hover:scale-110 transition-transform duration-200">
                    <Image
                      src="/images/about/amazon.svg"
                      alt="Amazon"
                      width={90}
                      height={28}
                      className="h-6 w-auto object-contain"
                    />
                  </div>

                  {/* Flipkart */}
                  <div className="flex items-center justify-center gap-1.5 h-8 hover:scale-110 transition-transform duration-200">
                    <span className="text-[#2874F0] font-black italic text-base sm:text-lg tracking-tight select-none">
                      Flipkart
                    </span>
                    <div className="relative w-5 h-5 rounded overflow-hidden shrink-0 shadow-xs">
                      <Image
                        src="/images/about/flipkart.png"
                        alt="Flipkart"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Meesho */}
                  <div className="flex items-center justify-center h-8 hover:scale-110 transition-transform duration-200">
                    <span
                      className="font-black text-lg sm:text-xl tracking-tight text-[#DE1161] select-none"
                      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                    >
                      meesho
                    </span>
                  </div>

                  {/* Snapdeal */}
                  <div className="flex items-center justify-center h-8 hover:scale-110 transition-transform duration-200">
                    <Image
                      src="/images/about/snapdeal.svg"
                      alt="Snapdeal"
                      width={100}
                      height={24}
                      className="h-5 w-auto object-contain"
                    />
                  </div>

                  {/* eBay */}
                  <div className="flex items-center justify-center h-8 hover:scale-110 transition-transform duration-200">
                    <Image
                      src="/images/about/ebay.svg"
                      alt="eBay"
                      width={70}
                      height={28}
                      className="h-6 w-auto object-contain"
                    />
                  </div>

                  {/* Alibaba */}
                  <div className="flex items-center justify-center h-8 hover:scale-110 transition-transform duration-200">
                    <Image
                      src="/images/about/alibaba.svg"
                      alt="Alibaba"
                      width={95}
                      height={22}
                      className="h-4.5 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
