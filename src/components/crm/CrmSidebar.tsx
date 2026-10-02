"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  Inbox,
  Layers,
  Newspaper,
  Calendar,
  Images,
  Tv,
  Mail,
  Send,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Globe,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";

interface CrmSidebarProps {
  adminEmail: string;
}

export const CrmSidebar: React.FC<CrmSidebarProps> = ({ adminEmail }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/crm/login" });
  };

  const navGroups = [
    {
      groupTitle: "OVERVIEW",
      links: [
        {
          href: "/crm",
          label: "Dashboard",
          icon: LayoutDashboard,
          exact: true,
        },
      ],
    },
    {
      groupTitle: "CAREERS & RECRUITMENT",
      links: [
        {
          href: "/crm/careers/openings",
          label: "Openings",
          icon: Briefcase,
          exact: false,
        },
        {
          href: "/crm/careers/applications",
          label: "Applications",
          icon: FileText,
          exact: false,
        },
        {
          href: "/crm/careers/talent-pool",
          label: "Talent Pool",
          icon: Users,
          exact: false,
        },
      ],
    },
    {
      groupTitle: "INQUIRIES & LEADS",
      links: [
        {
          href: "/crm/inquiries",
          label: "Project Inquiries",
          icon: Inbox,
          exact: true,
        },
        {
          href: "/crm/inquiries/services",
          label: "Service Requests",
          icon: Layers,
          exact: false,
        },
      ],
    },
    {
      groupTitle: "NEWS & UPDATES",
      links: [
        {
          href: "/crm/news",
          label: "News & Articles",
          icon: Newspaper,
          exact: false,
        },
        {
          href: "/crm/events",
          label: "Events",
          icon: Calendar,
          exact: false,
        },
        {
          href: "/crm/events/gallery",
          label: "Event Gallery",
          icon: Images,
          exact: false,
        },
        {
          href: "/crm/media",
          label: "Media Mentions",
          icon: Tv,
          exact: false,
        },
        {
          href: "/crm/newsletter",
          label: "Audience",
          icon: Mail,
          exact: true,
        },
        {
          href: "/crm/newsletter/send",
          label: "Broadcast",
          icon: Send,
          exact: false,
        },
      ],
    },
  ];

  const checkIsActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    if (href === "/crm/events") {
      return (
        pathname === "/crm/events" ||
        (pathname.startsWith("/crm/events/") && !pathname.startsWith("/crm/events/gallery"))
      );
    }
    if (href === "/crm/events/gallery") {
      return pathname.startsWith("/crm/events/gallery");
    }
    if (href === "/crm/careers/openings") {
      return pathname.startsWith("/crm/careers/openings");
    }
    if (href === "/crm/careers/applications") {
      return pathname.startsWith("/crm/careers/applications");
    }
    if (href === "/crm/careers/talent-pool") {
      return pathname.startsWith("/crm/careers/talent-pool");
    }
    if (href === "/crm/newsletter/send") {
      return pathname.startsWith("/crm/newsletter/send");
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#07152B] text-white border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="h-18 px-5 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2.5">
          <Logo variant="light" />
          <span className="text-[10px] font-black uppercase tracking-widest bg-[#1668E8] text-white px-2 py-0.5 rounded-full shadow-xs">
            CRM
          </span>
        </div>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Links Container */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6 custom-scrollbar">
        {navGroups.map((group) => (
          <div key={group.groupTitle} className="space-y-1.5">
            <div className="px-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
              {group.groupTitle}
            </div>

            <div className="space-y-1">
              {group.links.map((link) => {
                const isActive = checkIsActive(link.href, link.exact);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 group ${
                      isActive
                        ? "bg-[#1668E8] text-white font-bold shadow-md shadow-blue-500/20"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? "text-white scale-110"
                            : "text-slate-400 group-hover:text-white group-hover:scale-105"
                        }`}
                      />
                      <span>{link.label}</span>
                    </div>

                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-blue-200" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Quick Links Section */}
        <div className="pt-2 border-t border-white/10 space-y-1.5">
          <div className="px-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
            QUICK ACCESS
          </div>
          <Link
            href="/careers"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#38BDF8]" />
              <span>Public Careers Page</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
          </Link>

          <Link
            href="/news-and-updates"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Newspaper className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#38BDF8]" />
              <span>News & Events Page</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
          </Link>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#38BDF8]" />
              <span>Main Website</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
          </Link>
        </div>
      </div>

      {/* Admin Profile & Logout Footer */}
      <div className="p-3.5 border-t border-white/10 bg-[#050E1E] shrink-0 space-y-2">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl bg-white/5 border border-white/5">
          <div className="w-8 h-8 rounded-lg bg-[#1668E8]/20 border border-[#1668E8]/40 flex items-center justify-center text-[#38BDF8] shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-[#38BDF8] uppercase tracking-wider block">
              Administrator
            </span>
            <p className="text-xs text-slate-200 font-mono font-medium truncate" title={adminEmail}>
              {adminEmail}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/5 hover:border-red-500/30 text-xs font-bold transition-all cursor-pointer group shadow-2xs"
        >
          <LogOut className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex lg:w-64 xl:w-72 h-screen sticky top-0 shrink-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Top Header (with hamburger toggle) */}
      <div className="lg:hidden h-16 bg-[#07152B] text-white px-4 flex items-center justify-between sticky top-0 z-30 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo variant="light" />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1668E8] text-white px-2 py-0.5 rounded-full">
          CRM
        </span>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-in fade-in duration-150">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
