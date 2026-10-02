"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Bell,
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";

export interface CrmBadgeCounts {
  projectInquiries?: number;
  serviceRequests?: number;
  applications?: number;
  talentPool?: number;
}

interface CrmSidebarProps {
  adminEmail: string;
  initialCounts?: CrmBadgeCounts;
}

export const CrmSidebar: React.FC<CrmSidebarProps> = ({
  adminEmail,
  initialCounts = {
    projectInquiries: 0,
    serviceRequests: 0,
    applications: 0,
    talentPool: 0,
  },
}) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [counts, setCounts] = useState<CrmBadgeCounts>(initialCounts);
  const [toastNotification, setToastNotification] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Play subtle web audio notification chime
  const playNotificationChime = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio autoplay restrictions or unsupported
    }
  };

  const triggerToast = (msg: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastNotification(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastNotification(null);
    }, 5000);
  };

  // Fetch updated notification counts
  const fetchCounts = async () => {
    try {
      const res = await fetch("/api/admin/notifications/counts", {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setCounts((prev) => {
          const prevTotal =
            (prev.projectInquiries || 0) +
            (prev.serviceRequests || 0) +
            (prev.applications || 0) +
            (prev.talentPool || 0);
          const newTotal =
            (data.projectInquiries || 0) +
            (data.serviceRequests || 0) +
            (data.applications || 0) +
            (data.talentPool || 0);

          if (newTotal > prevTotal && prevTotal > 0) {
            let msg = "New notification received";
            if ((data.projectInquiries || 0) > (prev.projectInquiries || 0)) {
              msg = "New Project Inquiry received!";
            } else if ((data.serviceRequests || 0) > (prev.serviceRequests || 0)) {
              msg = "New Service Request received!";
            } else if ((data.applications || 0) > (prev.applications || 0)) {
              msg = "New Job Application received!";
            } else if ((data.talentPool || 0) > (prev.talentPool || 0)) {
              msg = "New Talent Pool profile received!";
            }
            triggerToast(msg);
            playNotificationChime();
          }

          return {
            projectInquiries: data.projectInquiries ?? 0,
            serviceRequests: data.serviceRequests ?? 0,
            applications: data.applications ?? 0,
            talentPool: data.talentPool ?? 0,
          };
        });
      }
    } catch {
      // Silent error on background poll
    }
  };

  // Poll counts every 15s and on window focus
  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 15000);

    const onFocus = () => {
      fetchCounts();
    };
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // Also refetch when navigating between CRM pages
  useEffect(() => {
    fetchCounts();
  }, [pathname]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/crm/login" });
  };

  const navGroups: {
    groupTitle: string;
    links: {
      href: string;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      exact?: boolean;
      badgeKey?: keyof CrmBadgeCounts;
    }[];
  }[] = [
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
          badgeKey: "applications",
        },
        {
          href: "/crm/careers/talent-pool",
          label: "Talent Pool",
          icon: Users,
          exact: false,
          badgeKey: "talentPool",
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
          badgeKey: "projectInquiries",
        },
        {
          href: "/crm/inquiries/services",
          label: "Service Requests",
          icon: Layers,
          exact: false,
          badgeKey: "serviceRequests",
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

  const checkIsActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    if (href === "/crm/news") {
      return pathname === "/crm/news" || pathname.startsWith("/crm/news/");
    }
    if (href === "/crm/events") {
      return (
        (pathname === "/crm/events" || pathname.startsWith("/crm/events/")) &&
        !pathname.startsWith("/crm/events/gallery")
      );
    }
    if (href === "/crm/events/gallery") {
      return pathname === "/crm/events/gallery" || pathname.startsWith("/crm/events/gallery/");
    }
    if (href === "/crm/careers/openings") {
      return pathname === "/crm/careers/openings" || pathname.startsWith("/crm/careers/openings/");
    }
    if (href === "/crm/careers/applications") {
      return pathname === "/crm/careers/applications" || pathname.startsWith("/crm/careers/applications/");
    }
    if (href === "/crm/careers/talent-pool") {
      return pathname === "/crm/careers/talent-pool" || pathname.startsWith("/crm/careers/talent-pool/");
    }
    if (href === "/crm/newsletter") {
      return pathname === "/crm/newsletter";
    }
    if (href === "/crm/newsletter/send") {
      return pathname === "/crm/newsletter/send" || pathname.startsWith("/crm/newsletter/send/");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
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
                const badgeCount = link.badgeKey ? counts[link.badgeKey] ?? 0 : 0;
                const hasBadge = badgeCount > 0;
                const badgeText = badgeCount > 99 ? "99+" : `${badgeCount}+`;

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
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? "text-white scale-110"
                            : "text-slate-400 group-hover:text-white group-hover:scale-105"
                        }`}
                      />
                      <span className="truncate">{link.label}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {hasBadge && (
                        <span
                          className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-extrabold rounded-full transition-all tracking-wide ${
                            isActive
                              ? "bg-white text-[#1668E8] shadow-xs"
                              : "bg-blue-500/20 text-blue-300 border border-blue-400/30 group-hover:bg-[#1668E8] group-hover:text-white group-hover:border-transparent"
                          }`}
                        >
                          {badgeText}
                        </span>
                      )}

                      {isActive && (
                        <ChevronRight className="w-3.5 h-3.5 text-blue-200" />
                      )}
                    </div>
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
              <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#38BDF8]" />
              <span>Public News & Events</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
          </Link>

          <Link
            href="/services"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#38BDF8]" />
              <span>Public Services</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
          </Link>
        </div>
      </div>

      {/* Admin User Footer Profile Card */}
      <div className="p-3.5 border-t border-white/10 shrink-0 space-y-3 bg-[#050E1D]/50">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-[#1668E8]/20 border border-[#1668E8]/40 flex items-center justify-center shrink-0 text-[#38BDF8]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              ADMINISTRATOR
            </p>
            <p className="text-xs font-semibold text-white truncate" title={adminEmail}>
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

      {/* Floating Real-Time Notification Toast */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#07152B] text-white border border-blue-500/40 rounded-2xl p-4 shadow-2xl shadow-blue-500/20 flex items-start gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="p-2 rounded-xl bg-[#1668E8]/20 text-[#38BDF8] border border-blue-500/30 shrink-0">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Live Notification
            </h4>
            <p className="text-sm font-semibold text-slate-100 mt-0.5">
              {toastNotification}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setToastNotification(null)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
};
