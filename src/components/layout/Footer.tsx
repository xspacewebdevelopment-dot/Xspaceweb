"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/shared/ui/Container";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const companyLinks: FooterColumn = {
  title: "COMPANY",
  links: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Our Process", href: "/#process" },
    { label: "Contact", href: "/contact" },
  ],
};

const productLinks: FooterColumn = {
  title: "PRODUCTS",
  links: [
    { label: "MakeGSTBill", href: "https://makegstbill.com/" },
    { label: "GoldenGST", href: "https://www.goldengst.com/" },
    { label: "FreeDeskPro", href: "https://freedeskpro.com/" },
    { label: "SimpleKaam", href: "http://simplekaam.com/" },
    { label: "All Products", href: "/products" },
  ],
};

const serviceLinks: FooterColumn = {
  title: "SERVICES",
  links: [
    { label: "Digital Marketing", href: "/services" },
    { label: "Web Development", href: "/services" },
    { label: "App Development", href: "/services" },
    { label: "Studio XSW", href: "/services" },
    { label: "UI/UX Design", href: "/services" },
    { label: "Graphic Design", href: "/services" },
  ],
};

const resourceLinks: FooterColumn = {
  title: "RESOURCES",
  links: [
    { label: "Blog", href: "/insights" },
    { label: "Certification", href: "/certification" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Help Center", href: "/contact" },
  ],
};

const legalLinks: FooterLink[] = [
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Do not render public consumer footer on CRM routes
  if (pathname?.startsWith("/crm")) {
    return null;
  }

  return (
    <footer className="w-full bg-[#07152B] text-white pt-16 sm:pt-20 pb-12 overflow-hidden relative">
      {/* Background ambient decorative curve */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(22,104,232,0.15),rgba(255,255,255,0))]" />

      <Container size="wide" className="relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          {/* Brand Info (col 1-3) */}
          <div className="lg:col-span-3 space-y-6">
            <Logo variant="light" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
              Building digital experiences beyond boundaries.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://in.linkedin.com/company/xspaceweb"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1668E8] flex items-center justify-center text-white transition-colors duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0-.01-3.34 1.67 1.67 0 0 0 .01 3.34M7.86 18.5V10.13H5.07V18.5h2.79Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/xspaceweb/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1668E8] flex items-center justify-center text-white transition-colors duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/Xspace.web"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1668E8] flex items-center justify-center text-white transition-colors duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-xs font-bold tracking-[0.15em] text-white uppercase">
                {companyLinks.title}
              </h3>
              <div className="w-6 h-[2px] bg-[#1668E8] mt-1.5 rounded-full" />
            </div>
            <ul className="space-y-2.5">
              {companyLinks.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-xs font-bold tracking-[0.15em] text-white uppercase">
                {productLinks.title}
              </h3>
              <div className="w-6 h-[2px] bg-[#1668E8] mt-1.5 rounded-full" />
            </div>
            <ul className="space-y-2.5">
              {productLinks.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group/link"
                  >
                    <span>{link.label}</span>
                    {link.href.startsWith("http") && (
                      <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover/link:text-white transition-colors" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-xs font-bold tracking-[0.15em] text-white uppercase">
                {serviceLinks.title}
              </h3>
              <div className="w-6 h-[2px] bg-[#1668E8] mt-1.5 rounded-full" />
            </div>
            <ul className="space-y-2.5">
              {serviceLinks.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-5">
            <div>
              <h3 className="text-xs font-bold tracking-[0.15em] text-white uppercase">
                STAY UPDATED
              </h3>
              <div className="w-6 h-[2px] bg-[#1668E8] mt-1.5 rounded-full" />
            </div>
            <p className="text-sm text-slate-300">
              Get the latest insights and updates.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex items-center max-w-sm"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-[#0D2344]/80 border border-slate-700/80 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#1668E8] transition-colors"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 w-8 h-8 rounded-full bg-[#1668E8] hover:bg-[#1255C0] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} XSPACEWEB PRIVATE LIMITED. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <span className="text-red-500" aria-label="love">❤️</span>
            <span>in India</span>
            <span>🇮🇳</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
