import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface ServiceItem {
  id: string;
  number: string;
  title: string[];
  subTitle?: string;
  description: string;
  href: string;
  iconGlowColor: string;
  iconBorderColor: string;
  iconBgColor: string;
  renderIcon: () => React.ReactNode;
}

const services: ServiceItem[] = [
  {
    id: "digital-marketing",
    number: "01",
    title: ["Digital", "Marketing"],
    description: "Performance-driven marketing to grow your brand online.",
    href: "/services",
    iconGlowColor: "rgba(168, 85, 247, 0.15)",
    iconBorderColor: "rgba(168, 85, 247, 0.2)",
    iconBgColor: "bg-purple-50/70",
    renderIcon: () => (
      <svg
        className="w-7 h-7 text-[#9333EA]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Megaphone */}
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        {/* Sound Waves */}
        <path d="M6 14.5V18a2 2 0 0 0 2 2h.5" />
        <path d="M19 7a4 4 0 0 1 0 10" />
      </svg>
    ),
  },
  {
    id: "website-development",
    number: "02",
    title: ["Website", "Development"],
    description: "Responsive, scalable and modern websites for your business.",
    href: "/services",
    iconGlowColor: "rgba(37, 99, 235, 0.15)",
    iconBorderColor: "rgba(37, 99, 235, 0.2)",
    iconBgColor: "bg-blue-50/70",
    renderIcon: () => (
      <svg
        className="w-7 h-7 text-[#2563EB]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Desktop Screen */}
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
        {/* Screen Content / Code sparkles */}
        <circle cx="6" cy="7" r="1" fill="currentColor" />
        <circle cx="9" cy="7" r="1" fill="currentColor" />
        <path d="m9 12 2-2-2-2" />
        <path d="M13 14h2" />
      </svg>
    ),
  },
  {
    id: "mobile-app-development",
    number: "03",
    title: ["Mobile App", "Development"],
    description: "Android, iOS & cross-platform apps that create real impact.",
    href: "/services",
    iconGlowColor: "rgba(124, 58, 237, 0.15)",
    iconBorderColor: "rgba(124, 58, 237, 0.2)",
    iconBgColor: "bg-indigo-50/70",
    renderIcon: () => (
      <svg
        className="w-7 h-7 text-[#7C3AED]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Smartphone */}
        <rect width="14" height="20" x="5" y="2" rx="2.5" />
        <path d="M12 18h.01" strokeWidth="2.5" />
        <circle cx="12" cy="7" r="1.5" />
        <rect width="6" height="5" x="9" y="10" rx="1" />
      </svg>
    ),
  },
  {
    id: "seo",
    number: "04",
    title: ["SEO"],
    subTitle: "(Search Engine Optimization)",
    description: "Higher rankings, more traffic and better conversions.",
    href: "/services",
    iconGlowColor: "rgba(16, 185, 129, 0.15)",
    iconBorderColor: "rgba(16, 185, 129, 0.2)",
    iconBgColor: "bg-emerald-50/70",
    renderIcon: () => (
      <svg
        className="w-7 h-7 text-[#10B981]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Bar chart & Trending Arrow */}
        <path d="M3 3v18h18" />
        <rect x="6" y="13" width="3" height="5" rx="0.5" fill="currentColor" fillOpacity="0.2" />
        <rect x="11" y="9" width="3" height="9" rx="0.5" fill="currentColor" fillOpacity="0.2" />
        <rect x="16" y="5" width="3" height="13" rx="0.5" fill="currentColor" fillOpacity="0.2" />
        <path d="m6 13 5-4 5-4 4-2" />
        <path d="M17 3h4v4" />
      </svg>
    ),
  },
  {
    id: "ui-ux-design",
    number: "05",
    title: ["UI/UX", "Design"],
    description: "User-centric designs that make your product stand out.",
    href: "/services",
    iconGlowColor: "rgba(236, 72, 153, 0.15)",
    iconBorderColor: "rgba(236, 72, 153, 0.2)",
    iconBgColor: "bg-rose-50/70",
    renderIcon: () => (
      <svg
        className="w-7 h-7 text-[#EC4899]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Pen Tool / Drafting Stylus */}
        <path d="m12 19 7-7 3 3-7 7-3-3z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="m2 2 7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: "graphic-design",
    number: "06",
    title: ["Graphic", "Design"],
    description: "Creative designs that communicate your brand story.",
    href: "/services",
    iconGlowColor: "rgba(139, 92, 246, 0.15)",
    iconBorderColor: "rgba(139, 92, 246, 0.2)",
    iconBgColor: "bg-purple-50/70",
    renderIcon: () => (
      <svg
        className="w-7 h-7 text-[#8B5CF6]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Artist Palette */}
        <circle cx="13.5" cy="6.5" r="1.5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r="1.5" fill="currentColor" />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878.75.118 1.562-.438 1.562-1.2v-1.178c0-.828.672-1.5 1.5-1.5h1.5c4.418 0 8-3.582 8-8 0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="w-full pt-10 sm:pt-14 pb-4 sm:pb-6 bg-white relative">
      <Container size="wide">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-9">
          <div className="space-y-2 max-w-3xl">
            {/* Eyebrow */}
            <span className="text-[12px] sm:text-[13px] font-bold tracking-[0.22em] text-[#556987] uppercase select-none block">
              OUR SERVICES
            </span>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#07152B] tracking-tight leading-[1.15]">
              Your Complete{" "}
              <span className="text-[#1668E8]">Digital Growth Partner</span>
            </h2>

            {/* Description Subtitle */}
            <p className="text-sm sm:text-base md:text-[17px] text-[#556987] leading-relaxed pt-1">
              From strategy to execution, we help businesses build, grow and stay ahead in the digital world.
            </p>
          </div>

          {/* Right Action Button */}
          <div className="flex-shrink-0 self-start md:self-end">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1668E8] text-white text-sm sm:text-[15px] font-semibold hover:bg-[#1255C0] transition-all duration-200 shadow-[0_4px_16px_rgba(22,104,232,0.25)] hover:shadow-[0_6px_20px_rgba(22,104,232,0.35)] active:scale-[0.98]"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 6 Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-4.5 items-stretch">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-[20px] bg-white border border-slate-200/80 p-5 sm:p-5.5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-4px_rgba(7,21,43,0.08)] hover:border-blue-200/80"
              style={{
                boxShadow: "0 4px 20px -2px rgba(7, 21, 43, 0.04)",
              }}
            >
              <div>
                {/* Top Icon Badge with Glow */}
                <div className="relative mb-5 inline-block">
                  <div
                    className={`w-13 h-13 rounded-2xl ${service.iconBgColor} flex items-center justify-center border transition-transform duration-300 group-hover:scale-105`}
                    style={{
                      borderColor: service.iconBorderColor,
                      boxShadow: `0 8px 20px -4px ${service.iconGlowColor}`,
                    }}
                  >
                    {service.renderIcon()}
                  </div>
                </div>

                {/* Step Number */}
                <div className="text-[12px] font-bold text-slate-400 tracking-wide mb-1 select-none">
                  {service.number}
                </div>

                {/* Card Title */}
                <h3 className="text-[17px] font-extrabold text-[#07152B] leading-[1.25] mb-2 group-hover:text-[#1668E8] transition-colors">
                  {service.title.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                  {service.subTitle && (
                    <span className="text-[11px] font-normal text-slate-400 block mt-0.5 tracking-tight font-sans">
                      {service.subTitle}
                    </span>
                  )}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-[#556987] leading-relaxed mb-5">
                  {service.description}
                </p>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-2">
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1668E8] group-hover:text-[#1255C0] transition-all group/link"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
