import React from "react";
import Image from "next/image";
import { Container } from "@/components/shared/ui/Container";

interface PartnerBrand {
  name: string;
  src: string;
  width: number;
  height: number;
  className?: string;
  colorClass?: string;
}

const partners: PartnerBrand[] = [
  { name: "TATA", src: "/images/brands/tata.svg", width: 140, height: 80, className: "h-10 sm:h-11 md:h-12 lg:h-[50px] w-auto object-contain", colorClass: "text-[#004F9F]" },
  { name: "Reliance", src: "/images/brands/reliance.svg", width: 180, height: 80, className: "h-10 sm:h-11 md:h-12 lg:h-[50px] w-auto object-contain", colorClass: "text-[#D32F2F]" },
  { name: "Infosys", src: "/images/brands/infosys.svg", width: 180, height: 80, className: "h-8 sm:h-9 md:h-10 lg:h-[42px] w-auto object-contain", colorClass: "text-[#007CC3]" },
  { name: "Amazon", src: "/images/brands/amazon.svg", width: 180, height: 80, className: "h-8 sm:h-9 md:h-10 lg:h-[42px] w-auto object-contain", colorClass: "text-[#FF9900]" },
  { name: "Flipkart", src: "/images/brands/flipkart.svg", width: 180, height: 80, className: "h-8 sm:h-9 md:h-10 lg:h-[40px] w-auto object-contain", colorClass: "text-[#2874F0]" },
  { name: "BYJU'S", src: "/images/brands/byjus.svg", width: 200, height: 80, className: "h-8 sm:h-9 md:h-10 lg:h-[42px] w-auto object-contain", colorClass: "text-[#813588]" },
  { name: "OYO", src: "/images/brands/oyo.svg", width: 160, height: 80, className: "h-8 sm:h-9 md:h-10 lg:h-[40px] w-auto object-contain", colorClass: "text-[#EE2E24]" },
];

export const PartnerLogos: React.FC = () => {
  return (
    <section className="w-full pt-8 sm:pt-10 pb-12 sm:pb-16 bg-[#F6F8FB]/90 border-t border-b border-slate-200/80 overflow-hidden">
      <Container size="wide">
        {/* Divider with Center Label matching Reference Image */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="h-[1px] flex-1 bg-slate-200/90" />
          <span className="text-xs sm:text-[13px] md:text-sm font-bold tracking-[0.22em] text-[#64748B] uppercase whitespace-nowrap select-none">
            PARTNERED BY FORWARD-THINKING BRANDS
          </span>
          <div className="h-[1px] flex-1 bg-slate-200/90" />
        </div>

        {/* Static Horizontal Logo Row in a single line with balanced spacing */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12 overflow-x-auto py-2 px-2 sm:px-6 no-scrollbar">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className={`flex-shrink-0 flex items-center justify-center min-h-[48px] sm:min-h-[56px] md:min-h-[64px] py-1 opacity-90 hover:opacity-100 transition-all duration-200 select-none hover:scale-105 transform ${partner.colorClass}`}
            >
              <Image
                src={partner.src}
                alt={`${partner.name} logo`}
                width={partner.width}
                height={partner.height}
                className={partner.className}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

