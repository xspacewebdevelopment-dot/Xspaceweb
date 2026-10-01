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

interface HubData {
  id: "kolkata" | "dhanbad" | "pan-india";
  tabLabel: string;
  badge: string;
  title: string;
  role: string;
  address: string;
  lat: number;
  lng: number;
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
    address: "Airport Gate No. 03, Jangalpur Rd, Kolkata 700081",
    lat: 22.652,
    lng: 88.4463,
    mapUrl: "https://maps.google.com/?q=Kolkata+Airport+Jangalpur+Road",
    icon: Building2,
    tag: "Design & Exec",
  },
  {
    id: "dhanbad",
    tabLabel: "Dhanbad Hub",
    badge: "Delivery Hub",
    title: "Dhanbad Operations",
    role: "Tech Delivery & Operations Center",
    address: "Muraidih, Dhanbad, Jharkhand – 828306",
    lat: 23.7957,
    lng: 86.4304,
    mapUrl: "https://maps.google.com/?q=Dhanbad+Muraidih+Jharkhand",
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
    lat: 22.5,
    lng: 82.5,
    mapUrl: "/contact",
    icon: Globe2,
    tag: "28+ States",
  },
];

function formatCoordinates(lat: number, lng: number) {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

export const PresenceHubCard: React.FC = () => {
  const [activeHubId, setActiveHubId] = useState<"kolkata" | "dhanbad" | "pan-india">("kolkata");
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

      {/* Middle Map/Radar Viewport Graphic (Clean vector grid without watermarks) */}
      <div className="relative w-full h-[185px] sm:h-[200px] overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 border-b border-slate-100">
        {/* Subtle Geometric Coordinate Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="presence-grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#94A3B8" strokeWidth="0.75" strokeDasharray="3 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#presence-grid)" />
        </svg>

        {/* Concentric Radar Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-56 h-56 rounded-full border border-blue-200/50" />
          <div className="absolute inset-7 rounded-full border border-blue-200/60" />
          <div className="absolute inset-14 rounded-full border border-blue-300/70" />
          <div className="absolute inset-21 rounded-full border border-blue-400/80" />
        </div>

        {/* Center Location Radar Beacon Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center">
          {/* Animated Pulse Waves */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-14 h-14 rounded-full bg-[#1668E8]/20 animate-ping" />
            <div className="absolute w-8 h-8 rounded-full bg-[#1668E8]/30 animate-pulse" />
            <div className="w-5 h-5 rounded-full bg-[#1668E8] text-white flex items-center justify-center shadow-lg border-2 border-white">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Floating Tag */}
          <motion.div
            key={activeHub.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 px-2.5 py-0.5 rounded-md bg-[#07152B] text-white text-[11px] font-bold tracking-wide shadow-md whitespace-nowrap"
          >
            {activeHub.title}
          </motion.div>
        </div>

        {/* Top-Right Geographic Coordinates Pill */}
        <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs border border-slate-200 text-[11px] font-mono font-semibold text-slate-700 shadow-2xs">
          {formatCoordinates(activeHub.lat, activeHub.lng)}
        </div>

        {/* Bottom-Left Live IST Clock Badge */}
        {currentTime && (
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs border border-slate-200 text-[11px] font-medium text-slate-700 shadow-2xs">
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

          {/* Quick Action Button (Right Aligned, without extra ops text) */}
          <div className="pt-2 flex items-center justify-end border-t border-slate-100">
            {activeHub.mapUrl.startsWith("http") ? (
              <a
                href={activeHub.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-[#07152B] text-slate-700 hover:text-white text-xs font-bold border border-slate-200/80 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href={activeHub.mapUrl}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-50 hover:bg-[#07152B] text-slate-700 hover:text-white text-xs font-bold border border-slate-200/80 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span>Connect with Us</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
