"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Inbox,
  LogOut,
  ShieldCheck,
  Newspaper,
  Calendar,
  Images,
  Tv,
  Mail,
  Send,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

interface CrmSidebarProps {
  adminEmail: string;
}

export const CrmSidebar: React.FC<CrmSidebarProps> = ({ adminEmail }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/crm/login" });
  };

  const navGroups = [
    {
      title: "Main",
      items: [
        { href: "/crm", label: "Dashboard", icon: LayoutDashboard, exact: true },
        { href: "/crm/inquiries", label: "Inquiries", icon: Inbox, exact: false },
      ],
    },
    {
      title: "News & Updates",
      items: [
        { href: "/crm/news", label: "News & Articles", icon: Newspaper, exact: false },
        { href: "/crm/events", label: "Events", icon: Calendar, exact: false },
        { href: "/crm/events/gallery", label: "Event Gallery", icon: Images, exact: false },
        { href: "/crm/media", label: "Media Mentions", icon: Tv, exact: false },
        { href: "/crm/newsletter", label: "Audience", icon: Mail, exact: true },
        { href: "/crm/newsletter/send", label: "Broadcast", icon: Send, exact: false },
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
    return pathname.startsWith(href);
  };

  const renderNavContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        {/* Brand Logo & Portal Tag */}
        <div className="px-4 py-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/crm" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#07152B] flex items-center justify-center text-white font-black text-sm tracking-tight shadow-2xs group-hover:scale-105 transition-transform">
              X
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-slate-900 block leading-none">
                XSPACEWEB
              </span>
              <span className="text-[10px] font-bold text-[#1668E8] uppercase tracking-wider">
                CRM Portal
              </span>
            </div>
          </Link>
          <Link
            href="/"
            target="_blank"
            title="Open live public website"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="px-3 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="px-3 pb-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = checkIsActive(item.href, item.exact);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-blue-50 text-[#1668E8] font-bold shadow-2xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-[#1668E8]" : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin User Info & Logout Footer */}
      <div className="p-3 border-t border-slate-100 mt-auto bg-slate-50/50">
        <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                Admin
              </span>
              <span
                className="font-mono text-xs font-semibold text-slate-700 block truncate"
                title={adminEmail}
              >
                {adminEmail}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-600 hover:text-red-700 text-xs font-bold transition-all cursor-pointer active:scale-98"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between shadow-2xs">
        <Link href="/crm" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#07152B] flex items-center justify-center text-white font-black text-xs">
            X
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
            XSPACEWEB <span className="text-[#1668E8] font-bold">CRM</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex">
          <div className="w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="font-extrabold text-sm text-slate-900">Navigation</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{renderNavContent()}</div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white border-r border-slate-200 h-screen sticky top-0 z-30 overflow-y-auto">
        {renderNavContent()}
      </aside>
    </>
  );
};
