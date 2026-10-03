"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus,
  Newspaper,
  Calendar,
  Briefcase,
  GraduationCap,
  Tv,
  MessageSquareQuote,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface QuickActionItem {
  label: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  badge?: string;
}

const quickActions: QuickActionItem[] = [
  {
    label: "Post News",
    description: "Publish news, press release, or update",
    href: "/crm/news/new",
    icon: Newspaper,
    colorClass: "bg-blue-50 text-blue-600 group-hover:bg-[#1668E8] group-hover:text-white",
  },
  {
    label: "Add Event",
    description: "Schedule new company event or webinar",
    href: "/crm/events/new",
    icon: Calendar,
    colorClass: "bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white",
  },
  {
    label: "New Opening",
    description: "Post a new job or internship vacancy",
    href: "/crm/careers/openings/new",
    icon: Briefcase,
    colorClass: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
  },
  {
    label: "Add Intern",
    description: "Enroll intern for verified certification",
    href: "/crm/interns/new",
    icon: GraduationCap,
    colorClass: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    badge: "Verified",
  },
  {
    label: "Add Media",
    description: "Feature brand coverage or press mention",
    href: "/crm/media/new",
    icon: Tv,
    colorClass: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
  },
  {
    label: "Manage Testimonials",
    description: "Add or publish client & intern feedback",
    href: "/crm/testimonials",
    icon: MessageSquareQuote,
    colorClass: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
  },
];

export const CrmQuickActionsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Sleek Plus Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={isOpen ? "Close Quick Actions" : "Create New (Quick Actions)"}
        className={`group relative flex items-center justify-center w-11 h-11 rounded-2xl transition-all duration-200 shadow-sm cursor-pointer ${
          isOpen
            ? "bg-[#07152B] text-white shadow-md ring-4 ring-blue-500/20"
            : "bg-[#1668E8] hover:bg-[#1255C0] text-white hover:shadow-md hover:scale-105 active:scale-95"
        }`}
      >
        <Plus
          className={`w-5 h-5 transition-transform duration-200 ease-out ${
            isOpen ? "rotate-45" : "group-hover:rotate-90"
          }`}
        />
        <span className="sr-only">Quick Actions Menu</span>
      </button>

      {/* Dropdown Floating Panel */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2.5 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Dropdown Header */}
          <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#1668E8]" />
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                Quick Create
              </span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400">
              {quickActions.length} Actions
            </span>
          </div>

          {/* Quick Actions List */}
          <div className="p-1.5 space-y-1">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-all duration-150 text-left cursor-pointer"
                  role="menuitem"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-150 ${action.colorClass}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#1668E8] transition-colors truncate">
                          {action.label}
                        </p>
                        {action.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700">
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {action.description}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#1668E8] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
