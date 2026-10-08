"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown, Compass, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/shared/Logo";
import { Container } from "@/components/shared/ui/Container";
import { ProjectModal } from "@/components/shared/ProjectModal";
import { cn } from "@/lib/utils";

interface SubNavItem {
  label: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavItem {
  label: string;
  href: string;
  id: string;
  children?: SubNavItem[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", id: "home" },
  { label: "Services", href: "/services", id: "services" },
  {
    label: "About",
    href: "/about",
    id: "about",
    children: [
      {
        label: "About Us",
        description: "Our story, vision, approach & leadership",
        href: "/about",
        icon: Compass,
      },
      {
        label: "Company Details",
        description: "Legal registration, CIN, GST & milestones",
        href: "/company",
        icon: Building2,
      },
    ],
  },
  { label: "Product", href: "/products", id: "products" },
  { label: "News & Event", href: "/news-and-updates", id: "news-and-events" },
  { label: "Careers", href: "/careers", id: "careers" },
  { label: "Contact", href: "/contact", id: "contact" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on route change
  useEffect(() => {
    setAboutDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setAboutDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 180);
  };

  // Do not render public consumer navbar on CRM routes
  if (pathname?.startsWith("/crm")) {
    return null;
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (item.href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    } else if (item.href.startsWith("/#")) {
      const targetId = item.href.replace("/#", "");
      if (pathname === "/") {
        const el = document.getElementById(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
          if (mobileMenuOpen) setMobileMenuOpen(false);
        }
      }
    }
  };

  const checkIsActive = (item: NavItem) => {
    if (item.href === "/") {
      return pathname === "/";
    }
    if (item.id === "about") {
      return pathname.startsWith("/about") || pathname.startsWith("/company");
    }
    if (item.href === "/news-and-updates") {
      return (
        pathname.startsWith("/news-and-updates") ||
        pathname.startsWith("/news-and-events") ||
        pathname.startsWith("/insights")
      );
    }
    return pathname.startsWith(item.href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 border-b border-slate-100/90 transition-colors backdrop-blur-md">
        <Container size="wide">
          <div className="flex items-center justify-between h-[72px]">
            {/* Brand Logo on Left */}
            <div className="flex-shrink-0">
              <Logo variant="dark" />
            </div>

            {/* Centered Desktop Navigation - 7 balanced links with generous spacing */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = checkIsActive(item);

                // Dropdown link (About / Company)
                if (item.children) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button
                        type="button"
                        onClick={() => setAboutDropdownOpen((prev) => !prev)}
                        className={cn(
                          "relative py-1 text-[14px] tracking-tight transition-colors duration-200 flex items-center gap-1 cursor-pointer select-none",
                          isActive
                            ? "text-[#07152B] font-semibold"
                            : "text-[#556987] hover:text-[#07152B] font-medium"
                        )}
                        aria-expanded={aboutDropdownOpen}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200 text-slate-400",
                            aboutDropdownOpen && "rotate-180 text-[#1668E8]"
                          )}
                        />
                        {isActive && (
                          <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#1668E8] rounded-full" />
                        )}
                      </button>

                      {/* Dropdown Floating Card */}
                      <AnimatePresence>
                        {aboutDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-72"
                          >
                            <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/90 p-2 space-y-1">
                              {item.children.map((sub) => {
                                const isSubActive = pathname.startsWith(sub.href);
                                const Icon = sub.icon;

                                return (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={() => setAboutDropdownOpen(false)}
                                    className={cn(
                                      "flex items-start gap-3 p-2.5 rounded-xl transition-all group/item",
                                      isSubActive
                                        ? "bg-blue-50/80 text-[#1668E8]"
                                        : "hover:bg-slate-50 text-slate-700"
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors mt-0.5",
                                        isSubActive
                                          ? "bg-[#1668E8] text-white"
                                          : "bg-slate-100 text-slate-500 group-hover/item:bg-[#1668E8] group-hover/item:text-white"
                                      )}
                                    >
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <div className="text-[13px] font-semibold text-[#07152B] group-hover/item:text-[#1668E8] transition-colors leading-tight">
                                        {sub.label}
                                      </div>
                                      <p className="text-[11px] text-slate-500 font-normal leading-snug mt-0.5">
                                        {sub.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
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

            {/* Right Actions: Brand Blue Pill CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={() => setProjectModalOpen(true)}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1668E8] text-white text-[13px] font-semibold hover:bg-[#1255C0] transition-all duration-200 shadow-sm hover:shadow-[0_4px_16px_rgba(22,104,232,0.35)] active:scale-[0.98] cursor-pointer"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Menu Action */}
            <div className="flex items-center gap-2 lg:hidden">
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
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = checkIsActive(item);

                if (item.children) {
                  return (
                    <div key={item.label} className="py-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                        {item.label}
                      </div>
                      <div className="pl-2 space-y-1">
                        {item.children.map((sub) => {
                          const isSubActive = pathname.startsWith(sub.href);
                          const Icon = sub.icon;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "flex items-center gap-2.5 text-sm font-medium py-2 px-3 rounded-lg transition-colors",
                                isSubActive
                                  ? "bg-[#EBF3FE] text-[#1668E8] font-semibold"
                                  : "text-[#556987] hover:bg-slate-50 hover:text-[#07152B]"
                              )}
                            >
                              <Icon className="w-4 h-4 text-slate-400" />
                              <span>{sub.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item);
                      setMobileMenuOpen(false);
                    }}
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
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setProjectModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1668E8] text-white text-sm font-semibold hover:bg-[#1255C0] transition-all shadow-sm cursor-pointer"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

    {/* Project Form Modal */}
    <ProjectModal
      isOpen={projectModalOpen}
      onClose={() => setProjectModalOpen(false)}
      inquiryType="project"
      source="navbar"
    />
  </>
);
};
