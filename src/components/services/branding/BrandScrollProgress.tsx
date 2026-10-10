"use client";

import React, { useEffect, useState } from "react";

const STAGE_MARKERS = [
  { label: "BUILD", pos: 0.12 },
  { label: "GRAVITY", pos: 0.32 },
  { label: "SYSTEM", pos: 0.52 },
  { label: "SCALE", pos: 0.72 },
  { label: "LAUNCH", pos: 0.92 },
];

export const BrandScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / scrollHeight));
        setScrollProgress(progress);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-50 pointer-events-none select-none h-[2.5px] bg-[#020817]/90 border-b border-blue-950/40 backdrop-blur-md"
    >
      {/* Telemetry Progress Gradient Track */}
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(6,182,212,0.8)]"
        style={{ width: `${Math.round(scrollProgress * 100)}%` }}
      />

      {/* Subtle Desktop Mission Phase Indicators */}
      <div className="hidden lg:flex absolute top-1.5 inset-x-0 max-w-7xl mx-auto px-6 justify-between items-center text-[9px] font-mono tracking-widest text-slate-400">
        {STAGE_MARKERS.map((marker) => {
          const isPassed = scrollProgress >= marker.pos;
          return (
            <div
              key={marker.label}
              className={`transition-colors duration-300 flex items-center gap-1 ${
                isPassed ? "text-cyan-400 font-bold" : "text-slate-600"
              }`}
              style={{ left: `${marker.pos * 100}%` }}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isPassed ? "bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(6,182,212,0.8)]" : "bg-slate-800"}`} />
              <span>{marker.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrandScrollProgress;
