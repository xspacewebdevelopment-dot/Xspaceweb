import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light"; // dark = navy text (for light background), light = white text (for navy background)
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className,
  variant = "dark",
  showText = true,
}) => {
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 group focus:outline-none transition-opacity hover:opacity-95 select-none",
        className
      )}
      aria-label="XSPACEWEB Home"
    >
      {/* Precision Full Geometric X Logo Symbol matching PDF */}
      <svg
        className="w-8 h-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stroke 1: Royal Blue diagonal (Top-Left to Bottom-Right) */}
        <path
          d="M6 6.5H15L30 29.5H21L6 6.5Z"
          fill="url(#blue-grad-left)"
        />
        {/* Stroke 2: Cyan/Sky Blue diagonal (Top-Right to Bottom-Left) */}
        <path
          d="M30 6.5H21L6 29.5H15L30 6.5Z"
          fill="url(#blue-grad-right)"
        />
        {/* Overlapping Center Intersection Diamond */}
        <path
          d="M18 12.2L22.4 18L18 23.8L13.6 18L18 12.2Z"
          fill="#0B42A0"
          fillOpacity="0.4"
        />
        <defs>
          <linearGradient
            id="blue-grad-left"
            x1="6"
            y1="6.5"
            x2="30"
            y2="29.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#1652C9" />
          </linearGradient>
          <linearGradient
            id="blue-grad-right"
            x1="30"
            y1="6.5"
            x2="6"
            y2="29.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00A3FF" />
            <stop offset="1" stopColor="#1668E8" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span
          className={cn(
            "text-xl font-extrabold tracking-tight font-sans transition-colors",
            isDark ? "text-[#07152B]" : "text-white"
          )}
        >
          XSPACEWEB
        </span>
      )}
    </Link>
  );
};
