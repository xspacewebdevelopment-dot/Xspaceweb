"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  MapPin,
  ExternalLink,
  Clock,
  Radio,
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
  zoom: number;
  mapUrl: string;
  status: string;
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
    zoom: 13,
    mapUrl: "https://maps.google.com/?q=Kolkata+Airport+Jangalpur+Road",
    status: "Active Hub",
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
    zoom: 13,
    mapUrl: "https://maps.google.com/?q=Dhanbad+Muraidih+Jharkhand",
    status: "Active Hub",
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
    zoom: 5,
    mapUrl: "/contact",
    status: "24/7 Delivery",
    icon: Globe2,
    tag: "28+ States",
  },
];

function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = 2 ** zoom;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return { x, y };
}

function getTileUrl(x: number, y: number, z: number) {
  return `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;
}

function formatCoordinates(lat: number, lng: number) {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

export const PresenceHubCard: React.FC = () => {
  const [activeHubId, setActiveHubId] = useState<"kolkata" | "dhanbad" | "pan-india">("kolkata");
  const [currentTime, setCurrentTime] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

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

  // 3D Tilt Spring Physics (Inspired by 21st.dev LocationMap)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-70, 70], [6, -6]);
  const rotateY = useTransform(mouseX, [-70, 70], [-6, 6]);
  const springRotateX = useSpring(rotateX, { stiffness: 280, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 280, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Generate 3x3 tiles around center coordinate
  const tiles = useMemo(() => {
    const center = latLngToTile(activeHub.lat, activeHub.lng, activeHub.zoom);
    const result: { url: string; offsetX: number; offsetY: number }[] = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        result.push({
          url: getTileUrl(center.x + dx, center.y + dy, activeHub.zoom),
          offsetX: dx,
          offsetY: dy,
        });
      }
    }
    return result;
  }, [activeHub.lat, activeHub.lng, activeHub.zoom]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full"
      style={{ perspective: 1100 }}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
      >
        {/* Top Header: Switcher Tabs */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between gap-2">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200/70 shadow-2xs">
            {HUBS.map((hub) => {
              const isSelected = hub.id === activeHubId;
              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => setActiveHubId(hub.id)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
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

          {/* Live Status Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="hidden sm:inline">{activeHub.status}</span>
            <span className="sm:hidden">Live</span>
          </div>
        </div>

        {/* Middle Interactive Map Viewport with Radar Ping */}
        <div className="relative w-full h-[180px] sm:h-[195px] overflow-hidden bg-slate-100 border-b border-slate-100">
          {/* Map Tiles 3x3 Container */}
          <div
            className="absolute"
            style={{
              width: "768px",
              height: "768px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {tiles.map((tile, i) => (
              <div
                key={`${tile.url}-${i}`}
                className="absolute"
                style={{
                  width: "256px",
                  height: "256px",
                  left: `${(tile.offsetX + 1) * 256}px`,
                  top: `${(tile.offsetY + 1) * 256}px`,
                }}
              >
                <Image
                  src={tile.url}
                  alt="Hub map tile"
                  width={256}
                  height={256}
                  unoptimized
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Map subtle overlay tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-white/40 pointer-events-none" />

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
              className="mt-1.5 px-2.5 py-0.5 rounded-md bg-[#07152B]/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-wide shadow-md whitespace-nowrap"
            >
              {activeHub.title}
            </motion.div>
          </div>

          {/* Top-Right Geographic Coordinates Pill */}
          <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs border border-slate-200/80 text-[10px] font-mono font-medium text-slate-700 shadow-2xs">
            {formatCoordinates(activeHub.lat, activeHub.lng)}
          </div>

          {/* Bottom-Left Live IST Clock Badge */}
          {currentTime && (
            <div className="absolute bottom-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs border border-slate-200/80 text-[10px] font-medium text-slate-700 shadow-2xs">
              <Clock className="w-3 h-3 text-[#1668E8]" />
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
            className="p-4 sm:p-5 flex flex-col justify-between gap-3 bg-white"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-[#1668E8] uppercase tracking-wider">
                  {activeHub.badge}
                </span>
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {activeHub.tag}
                </span>
              </div>
              <h4 className="text-base font-extrabold text-[#07152B] tracking-tight">
                {activeHub.role}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{activeHub.address}</span>
              </p>
            </div>

            {/* Quick Action Button */}
            <div className="pt-1 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Radio className="w-3 h-3 text-emerald-500" />
                <span>Synchronized with client ops</span>
              </div>

              {activeHub.mapUrl.startsWith("http") ? (
                <a
                  href={activeHub.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1668E8] hover:text-[#07152B] transition-colors py-1 cursor-pointer"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <a
                  href={activeHub.mapUrl}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1668E8] hover:text-[#07152B] transition-colors py-1 cursor-pointer"
                >
                  <span>Get in Touch</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
