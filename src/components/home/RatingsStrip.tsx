"use client";

import React from "react";

export interface ReviewPlatform {
  id: string;
  name: string;
  rating: string;
  stars: number;
  caption: string;
  logo: React.ReactNode;
}

export const reviewPlatforms: ReviewPlatform[] = [
  {
    id: "clutch",
    name: "Clutch",
    rating: "4.8",
    stars: 5,
    caption: "Based on client reviews",
    logo: (
      <div className="flex items-center gap-1 select-none">
        <span className="text-lg font-black tracking-tight text-[#07152B] font-sans">
          Clutch
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#E5484D] inline-block -mt-2" />
      </div>
    ),
  },
  {
    id: "trustpilot",
    name: "Trustpilot",
    rating: "4.6",
    stars: 5,
    caption: "Trusted by global clients",
    logo: (
      <div className="flex items-center gap-1.5 select-none">
        <svg className="w-4 h-4 text-[#00B67A] fill-current flex-shrink-0" viewBox="0 0 24 24">
          <path d="m12 1.5 3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.27l-6.18 3.23L7 13.63l-5-4.87 6.91-1L12 1.5z" />
        </svg>
        <span className="text-sm font-bold tracking-tight text-[#07152B]">
          Trustpilot
        </span>
      </div>
    ),
  },
  {
    id: "google",
    name: "Google",
    rating: "4.9",
    stars: 5,
    caption: "Google Business Reviews",
    logo: (
      <div className="flex items-center gap-1.5 select-none">
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        <span className="text-sm font-bold tracking-tight text-[#07152B]">
          Google
        </span>
      </div>
    ),
  },
  {
    id: "upwork",
    name: "Upwork",
    rating: "4.8",
    stars: 5,
    caption: "Rated by clients worldwide",
    logo: (
      <div className="flex items-center gap-1 select-none">
        <span className="text-base font-extrabold tracking-tight text-[#14A800] font-sans">
          Upwork
        </span>
      </div>
    ),
  },
];

/**
 * The review panel is seamlessly integrated into HeroSection as part of the unified
 * case-study/hero composition. This component returns null so that any existing import
 * does not duplicate the review strip.
 */
export const RatingsStrip: React.FC = () => {
  return null;
};
