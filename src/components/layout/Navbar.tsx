"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/shared/ui/Container";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "News & Updates", href: "/news-and-updates" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 border-b border-slate-100/90 transition-colors">
      <Container size="wide">
        <div className="flex items-center justify-between h-[72px]">
          {/* Brand Logo on Left */}
          <div className="flex-shrink-0">
            <Logo variant="dark" />
          </div>

          {/* Centered Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative py-1 text-[14px] tracking-tight transition-colors duration-200",
                    isActive
                      ? "text-[#07152B] font-semibold"
                      : "text-[#556987] hover:text-[#07152B] font-medium"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#1668E8] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Small Search Icon + Dark Navy Pill CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              type="button"
              aria-label="Search"
              className="p-1.5 text-[#07152B] hover:text-[#1668E8] transition-colors rounded-full hover:bg-slate-50 cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2.2]" />
            </button>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#07152B] text-white text-[13px] font-semibold hover:bg-[#0D2344] transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Action */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              aria-label="Search"
              className="p-2 text-[#07152B] hover:text-[#1668E8] transition-colors rounded-full"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#07152B] rounded-lg hover:bg-slate-50 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-6 py-5 space-y-4 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium py-2 px-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-[#EBF3FE] text-[#1668E8] font-semibold"
                      : "text-[#556987] hover:bg-slate-50 hover:text-[#07152B]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#07152B] text-white text-sm font-semibold hover:bg-[#0D2344] transition-all"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
