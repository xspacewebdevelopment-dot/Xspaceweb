"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MechanicalKeycapProps {
  label: string;
  sublabel?: string;
  theme?: "light" | "dark";
  icon?: React.ReactNode;
  brandColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  soundEnabled?: boolean;
}

// Lightweight synthesized mechanical keyboard switch audio (Cherry MX style)
let audioCtx: AudioContext | null = null;

function playMechanicalClick(frequency = 1800) {
  try {
    if (typeof window === "undefined") return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // High click transient (stem impact)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(frequency, now);
    osc1.frequency.exponentialRampToValueAtTime(300, now + 0.025);

    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);

    // Deep housing clack resonance
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(220, now);
    osc2.frequency.exponentialRampToValueAtTime(80, now + 0.04);

    gain2.gain.setValueAtTime(0.12, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.03);
    osc2.stop(now + 0.045);
  } catch {
    // Graceful fallback if audio is not permitted
  }
}

export const MechanicalKeycap: React.FC<MechanicalKeycapProps> = ({
  label,
  sublabel,
  theme = "light",
  icon,
  brandColor = "#1668E8",
  size = "md",
  className,
  onClick,
  soundEnabled = true,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const pressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePress = useCallback(() => {
    setIsPressed(true);
    if (soundEnabled) {
      playMechanicalClick(theme === "dark" ? 1600 : 1900);
    }
    onClick?.();
  }, [onClick, soundEnabled, theme]);

  const handleRelease = useCallback(() => {
    setIsPressed(false);
  }, []);

  const sizeStyles = {
    sm: {
      cap: "w-14 h-14 sm:w-16 sm:h-16",
      iconSize: "w-full h-full text-xl",
      textSize: "text-[11px] sm:text-xs",
      dishPadding: "p-1",
      borderBottom: isPressed ? "border-b-[2px]" : "border-b-[4px] sm:border-b-[5px]",
      travelY: 3,
    },
    md: {
      cap: "w-18 h-18 sm:w-22 sm:h-22 md:w-[96px] md:h-[96px]",
      iconSize: "w-full h-full flex items-center justify-center px-1 text-2xl sm:text-3xl md:text-4xl",
      textSize: "text-xs sm:text-[13px] md:text-sm font-semibold",
      dishPadding: "p-1 sm:p-1.5",
      borderBottom: isPressed ? "border-b-[2px]" : "border-b-[5px] sm:border-b-[7px]",
      travelY: 5,
    },
    lg: {
      cap: "w-22 h-22 sm:w-26 sm:h-26 md:w-30 md:h-30",
      iconSize: "w-full h-full text-3xl sm:text-4xl",
      textSize: "text-sm sm:text-base font-bold",
      dishPadding: "p-2 sm:p-3",
      borderBottom: isPressed ? "border-b-[3px]" : "border-b-[7px] sm:border-b-[9px]",
      travelY: 6,
    },
  }[size];

  const isDark = theme === "dark";

  return (
    <div className={cn("group flex flex-col items-center select-none cursor-pointer", className)}>
      {/* 3D Keycap Wrapper */}
      <div
        className="relative flex items-center justify-center p-1"
        style={{ perspective: "1000px" }}
      >
        {/* Ambient Brand Glow on Hover */}
        <div
          className="absolute -inset-1 rounded-[22px] opacity-0 blur-md transition-opacity duration-300 pointer-events-none group-hover:opacity-40"
          style={{ backgroundColor: brandColor }}
        />

        {/* The 3D Keycap Body */}
        <motion.button
          type="button"
          aria-label={`Keycap for ${label}`}
          onPointerDown={handlePress}
          onPointerUp={handleRelease}
          onPointerLeave={() => {
            handleRelease();
            setIsHovered(false);
          }}
          onPointerEnter={() => setIsHovered(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handlePress();
              if (pressTimeoutRef.current) clearTimeout(pressTimeoutRef.current);
              pressTimeoutRef.current = setTimeout(handleRelease, 150);
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleRelease();
            }
          }}
          animate={{
            y: isPressed ? sizeStyles.travelY : isHovered ? -2 : 0,
            scale: isPressed ? 0.98 : isHovered ? 1.02 : 1,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : isPressed
                ? { duration: 0.05, ease: "easeOut" }
                : { type: "spring", stiffness: 450, damping: 20 }
          }
          className={cn(
            "relative flex items-center justify-center rounded-[16px] sm:rounded-[20px] transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            sizeStyles.cap,
            sizeStyles.borderBottom,
            isDark
              ? [
                  "bg-gradient-to-b from-[#233147] via-[#131D2D] to-[#0A101C]",
                  "border-t border-l border-r border-[#2C3E59]/80",
                  "border-b-[#05080E]",
                  isPressed
                    ? "shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    : "shadow-[0_12px_24px_-4px_rgba(5,8,14,0.65),0_4px_8px_-2px_rgba(5,8,14,0.4)]",
                ]
              : [
                  "bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#EEF2F6]",
                  "border-t border-l border-r border-white/95",
                  "border-b-[#CBD5E1]",
                  isPressed
                    ? "shadow-[0_2px_4px_rgba(15,23,42,0.1)]"
                    : "shadow-[0_14px_28px_-6px_rgba(15,23,42,0.14),0_6px_10px_-2px_rgba(15,23,42,0.06)]",
                ]
          )}
        >
          {/* Subtle Top-Face Curved Dish Surface */}
          <div
            className={cn(
              "w-[90%] h-[88%] rounded-[12px] sm:rounded-[15px] flex items-center justify-center relative overflow-hidden transition-all",
              sizeStyles.dishPadding,
              isDark
                ? "bg-gradient-to-b from-[#1A2637] to-[#0E1624] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.18),inset_0_-2px_3px_rgba(0,0,0,0.4)]"
                : "bg-gradient-to-b from-[#FFFFFF] to-[#F1F5F9] shadow-[inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1.5px_3px_rgba(0,0,0,0.05)] border border-slate-200/50"
            )}
          >
            {/* Specular sheen on top edge */}
            <div className={cn(
              "absolute inset-x-1 top-0 h-[2px] rounded-t-full pointer-events-none",
              isDark ? "bg-white/20" : "bg-white/80"
            )} />

            {/* Icon Render */}
            <div className={cn("relative z-10 w-full h-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105", sizeStyles.iconSize)}>
              {icon}
            </div>
          </div>
        </motion.button>
      </div>

      {/* Label Underneath */}
      <span
        className={cn(
          "mt-2 text-slate-800 tracking-tight text-center transition-colors duration-200 group-hover:text-blue-600 select-none",
          sizeStyles.textSize
        )}
      >
        {label}
      </span>
      {sublabel && (
        <span className="text-[10px] text-slate-400 font-normal leading-none mt-0.5">
          {sublabel}
        </span>
      )}
    </div>
  );
};
