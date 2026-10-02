"use client";

import React from "react";
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
  Briefcase,
  FileText,
  Users,
  Layers,
} from "lucide-react";

interface CrmNavbarProps {
  adminEmail: string;
}

export const CrmNavbar: React.FC<CrmNavbarProps> = ({ adminEmail }) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/crm/login" });
  };

  const navLinks = [
    { href: "/crm", label: "Dashboard", icon: LayoutDashboard },
    { href: "/crm/inquiries", label: "Inquiries", icon: Inbox },
    { href: "/crm/inquiries/services", label: "Services", icon: Layers },
    { href: "/crm/careers/openings", label: "Openings", icon: Briefcase },
    { href: "/crm/careers/applications", label: "Applications", icon: FileText },
    { href: "/crm/careers/talent-pool", label: "Talent Pool", icon: Users },
    { href: "/crm/news", label: "News", icon: Newspaper },
    { href: "/crm/events", label: "Events", icon: Calendar },
    { href: "/crm/events/gallery", label: "Gallery", icon: Images },
    { href: "/crm/media", label: "Media", icon: Tv },
    { href: "/crm/newsletter", label: "Audience", icon: Mail },
    { href: "/crm/newsletter/send", label: "Broadcast", icon: Send },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Main Nav Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/crm" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-blue-50 text-[#1668E8] font-bold shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
        </nav>

        {/* User Info & Logout Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono font-medium truncate max-w-[200px]">{adminEmail}</span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-700 hover:text-red-700 text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
            title="Log out from CRM"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
};
