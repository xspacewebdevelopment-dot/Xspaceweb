import React from "react";
import Image from "next/image";
import { Container } from "@/components/shared/ui/Container";

interface PartnerBrand {
  name: string;
  src: string;
  width: number;
  height: number;
  className?: string;
}

const partners: PartnerBrand[] = [
  { name: "TATA", src: "/images/brands/tata_clean.png", width: 100, height: 48, className: "h-7 sm:h-8 md:h-9 w-auto" },
  { name: "Reliance", src: "/images/brands/reliance_clean.png", width: 130, height: 48, className: "h-8 sm:h-[36px] md:h-[40px] w-auto" },
  { name: "Infosys", src: "/images/brands/infosys_clean.png", width: 130, height: 48, className: "h-7 sm:h-8 md:h-9 w-auto" },
  { name: "Amazon", src: "/images/brands/amazon_clean.png", width: 130, height: 48, className: "h-6 sm:h-7 md:h-8 w-auto" },
  { name: "Flipkart", src: "/images/brands/flipkart_clean.png", width: 135, height: 48, className: "h-6 sm:h-7 md:h-8 w-auto" },
  { name: "BYJU'S", src: "/images/brands/byjus_clean.png", width: 165, height: 48, className: "h-7 sm:h-8 md:h-9 w-auto" },
  { name: "OYO", src: "/images/brands/oyo_clean.png", width: 120, height: 48, className: "h-6 sm:h-7 md:h-8 w-auto" },
];

export const PartnerLogos: React.FC = () => {
  return (
    <section className="w-full pt-6 sm:pt-8 pb-12 sm:pb-16 bg-[#F6F8FB]/80 border-t border-b border-slate-100/80 overflow-hidden">
      <Container size="wide">
        {/* Divider with Center Label matching Reference Image */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="h-[1px] flex-1 bg-slate-200/90" />
          <span className="text-[11px] sm:text-[12px] md:text-[13px] font-bold tracking-[0.22em] text-[#7A8A9E] uppercase whitespace-nowrap select-none">
            PARTNERED BY FORWARD-THINKING BRANDS
          </span>
          <div className="h-[1px] flex-1 bg-slate-200/90" />
        </div>

        {/* Static Horizontal Logo Row with larger, clearer branding matching reference PDF */}
        <div className="w-full flex items-center justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 overflow-x-auto py-2 px-1 no-scrollbar">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex-shrink-0 flex items-center justify-center min-h-[48px] py-1 opacity-75 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-200 select-none mix-blend-multiply"
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
          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 pl-2">
            <div className="w-[1px] h-8 bg-slate-300/80 hidden sm:block" />
            <span className="text-sm sm:text-base font-medium text-[#6B7C93] whitespace-nowrap select-none">
              and many more
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};
