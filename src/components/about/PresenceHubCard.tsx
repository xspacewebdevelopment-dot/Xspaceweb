"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ExternalLink,
  Clock,
  Building2,
  Cpu,
  Globe2,
} from "lucide-react";
import { GoogleMapEmbed } from "@/components/shared/ui/GoogleMapEmbed";

interface HubData {
  id: "kolkata" | "dhanbad" | "pan-india";
  tabLabel: string;
  badge: string;
  title: string;
  role: string;
  address: string;
  mapQuery: string;
  zoom?: number;
  mapUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const HUBS: HubData[] = [
  {
    id: "kolkata",
    tabLabel: "Kolkata (HQ)",
    badge: "Corporate HQ",
    title: "Kolkata Office",
    role: "Corporate HQ & Design Studio",
    address:
      "Floor No.: 0, Holding number 131 (95), 131, Jangalpur Road, Airport Gate No. 03, International Airport, Kolkata, North Twenty Four Parganas, West Bengal – 700081",
    mapQuery:
      "Floor No.: 0, Holding number 131 (95), 131, Jangalpur Road, Airport Gate No. 03, International Airport, Kolkata, North Twenty Four Parganas, West Bengal 700081",
    zoom: 16,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Floor+No.%3A+0%2C+Holding+number+131+%2895%29%2C+131%2C+Jangalpur+Road%2C+Airport+Gate+No.+03%2C+International+Airport%2C+Kolkata%2C+North+Twenty+Four+Parganas%2C+West+Bengal+700081",
    icon: Building2,
    tag: "Design & Exec",
  },
  {
    id: "dhanbad",
    tabLabel: "Dhanbad Hub",
    badge: "Delivery Hub",
    title: "Dhanbad Operations",
    role: "Tech Delivery & Operations Center",
    address:
      "Floor No.: 0, Plot no. 766 & 767, C/O- Khepa Kumar, Post Pochari, Near Petrol Pump, New Colony, Muraidih, Dhanbad, Jharkhand – 828306",
    mapQuery:
      "Floor No.: 0, Plot no. 766 & 767, C/O- Khepa Kumar, Post Pochari, Near Petrol Pump, New Colony, Muraidih, Dhanbad, Jharkhand 828306",
    zoom: 16,
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Floor+No.%3A+0%2C+Plot+no.+766+%26+767%2C+C%2FO-+Khepa+Kumar%2C+Post+Pochari%2C+Near+Petrol+Pump%2C+New+Colony%2C+Muraidih%2C+Dhanbad%2C+Jharkhand+828306",
    icon: Cpu,
    tag: "Core Engineering",
  },
  {
    id: "pan-india",
    tabLabel: "Pan-India",
    badge: "Nationwide",
    title: "Pan-India Network",
    role: "Remote Support & Enterprise Delivery",
    address: "Providing 100% remote digital support across 28+ States",
    mapQuery: "India",
    zoom: 4,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=India",
    icon: Globe2,
    tag: "28+ States",
  },
];

export const PresenceHubCard: React.FC = () => {
  const [activeHubId, setActiveHubId] = useState<
    "kolkata" | "dhanbad" | "pan-india"
  >("kolkata");
  const [currentTime, setCurrentTime] = useState<string>("");

  const activeHub = HUBS.find((h) => h.id === activeHubId) || HUBS[0];

  // Live IST Clock
  useEffect(() => {
    const updateIST = () => {
      try {
        const ist = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setCurrentTime(ist);
      } catch {
        setCurrentTime("Active");
      }
    };
    updateIST();
    const timer = setInterval(updateIST, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_25px_rgba(7,21,43,0.06)] overflow-hidden flex flex-col">
      {/* Top Header: Full-Width Switcher Tabs for Kolkata, Dhanbad, and Pan-India */}
      <div className="p-3 sm:p-3.5 border-b border-slate-100 bg-slate-50/70">
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-white rounded-xl border border-slate-200/70 shadow-2xs">
          {HUBS.map((hub) => {
            const isSelected = hub.id === activeHubId;
            return (
              <button
                key={hub.id}
                type="button"
                onClick={() => setActiveHubId(hub.id)}
                className={`py-1.5 px-2 text-xs font-bold rounded-lg transition-all cursor-pointer text-center truncate ${
                  isSelected
                    ? "bg-[#07152B] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                {hub.tabLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Middle: Interactive Google Map Embed Viewport */}
      <div className="relative w-full h-[220px] sm:h-[250px] overflow-hidden bg-slate-100 border-b border-slate-100">
        <GoogleMapEmbed
          key={activeHub.id}
          query={activeHub.mapQuery}
          zoom={activeHub.zoom}
          title={`${activeHub.title} Location`}
          className="h-full rounded-none"
        />

        {/* Bottom-Left Live IST Clock Badge (Subtle Metadata) */}
        {currentTime && (
          <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs border border-slate-200/80 text-[11px] font-medium text-slate-700 shadow-2xs pointer-events-none select-none">
            <Clock className="w-3.5 h-3.5 text-[#1668E8]" />
            <span>{currentTime} IST</span>
          </div>
        )}
      </div>

      {/* Bottom Details Footer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeHub.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="p-4 sm:p-5 flex flex-col justify-between gap-3.5 bg-white"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold text-[#1668E8] uppercase tracking-wider">
                {activeHub.badge}
              </span>
              <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                {activeHub.tag}
              </span>
            </div>
            <h4 className="text-base sm:text-[17px] font-extrabold text-[#07152B] tracking-tight">
              {activeHub.role}
            </h4>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-1.5 flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>{activeHub.address}</span>
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="pt-2 flex items-center justify-end border-t border-slate-100">
            <a
              href={activeHub.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-[#07152B] text-slate-700 hover:text-white text-xs font-bold border border-slate-200/80 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
