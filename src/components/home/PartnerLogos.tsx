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
  { name: "TATA", src: "/images/brands/tata.svg", width: 140, height: 70, className: "h-9 sm:h-11 md:h-12 lg:h-14 w-auto object-contain", colorClass: "text-[#004F9F]" },
  { name: "Reliance", src: "/images/brands/reliance.svg", width: 180, height: 80, className: "h-11 sm:h-14 md:h-16 lg:h-20 w-auto object-contain", colorClass: "text-[#D32F2F]" },
  { name: "Infosys", src: "/images/brands/infosys.svg", width: 160, height: 70, className: "h-9 sm:h-11 md:h-12 lg:h-14 w-auto object-contain", colorClass: "text-[#007CC3]" },
  { name: "Amazon", src: "/images/brands/amazon.svg", width: 160, height: 70, className: "h-8 sm:h-10 md:h-11 lg:h-13 w-auto object-contain", colorClass: "text-[#FF9900]" },
  { name: "Flipkart", src: "/images/brands/flipkart.svg", width: 160, height: 70, className: "h-8 sm:h-10 md:h-11 lg:h-13 w-auto object-contain", colorClass: "text-[#2874F0]" },
  { name: "BYJU'S", src: "/images/brands/byjus.svg", width: 180, height: 70, className: "h-9 sm:h-11 md:h-12 lg:h-14 w-auto object-contain", colorClass: "text-[#813588]" },
  { name: "OYO", src: "/images/brands/oyo.svg", width: 140, height: 70, className: "h-8 sm:h-10 md:h-11 lg:h-13 w-auto object-contain", colorClass: "text-[#EE2E24]" },
];

export const PartnerLogos: React.FC = () => {
  return (
    <section className="w-full pt-8 sm:pt-10 pb-14 sm:pb-18 bg-[#F6F8FB]/90 border-t border-b border-slate-200/80 overflow-hidden">
      <Container size="wide">
        {/* Divider with Center Label matching Reference Image */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="h-[1px] flex-1 bg-slate-200/90" />
          <span className="text-xs sm:text-[13px] md:text-sm font-bold tracking-[0.22em] text-[#64748B] uppercase whitespace-nowrap select-none">
            PARTNERED BY FORWARD-THINKING BRANDS
          </span>
          <div className="h-[1px] flex-1 bg-slate-200/90" />
        </div>

        {/* Static Horizontal Logo Row with crisp vector SVGs matching reference PDF */}
        <div className="w-full flex items-center justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-14 overflow-x-auto py-3 px-2 no-scrollbar">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className={`flex-shrink-0 flex items-center justify-center min-h-[56px] sm:min-h-[72px] md:min-h-[84px] py-1 opacity-90 hover:opacity-100 transition-all duration-200 select-none hover:scale-105 transform ${partner.colorClass}`}
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

          {/* Divider and Prominent "and many more" */}
          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 pl-3">
            <div className="w-[1px] h-10 sm:h-12 bg-slate-300/80 hidden sm:block" />
            <span className="text-sm sm:text-base md:text-lg font-semibold text-[#475569] whitespace-nowrap select-none">
              and many more
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

