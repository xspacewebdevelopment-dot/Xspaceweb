"use client";

import React from "react";
import Image from "next/image";
export const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-[calc(100vh-72px)] min-h-[580px] overflow-hidden select-none bg-[#FFFDF7]">
      {/* 1. Original Clean Background Image (About.png) */}
      <Image
        src="/images/about/About.png"
        alt="It All Started Here - One person. One computer. Just a vision."
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        unoptimized
      />

            {/* 2. Top-Center Branding (HTML / CSS) */}
            <div className="absolute top-4 sm:top-6 md:top-8 inset-x-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-10">
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                <span className="text-[#07152B]">XSPACE</span>
                <span className="text-[#1668E8]">WEB</span>
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-[0.25em] text-[#334155] uppercase mt-1">
                BUILDING DIGITAL EXPERIENCES BEYOND BOUNDARIES
              </span>
            </div>

            {/* 3. Main Hero Typography on Left (HTML / CSS) */}
            <div className="absolute top-[16%] sm:top-[18%] md:top-[20%] left-6 sm:left-10 md:left-14 lg:left-20 xl:left-28 max-w-sm sm:max-w-md md:max-w-lg z-10 pointer-events-none">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight leading-[1.05] text-[#07152B]">
                It All Started <br />
                <span className="text-[#1668E8]">Here.</span>
              </h1>
              <div className="mt-4 sm:mt-5 space-y-1 text-slate-700 font-medium text-xs sm:text-sm md:text-base leading-snug">
                <p>One person. One computer.</p>
                <p>No big team. No big office.</p>
                <p>Just a vision.</p>
              </div>
            </div>

            {/* 4. Handwritten Annotations & Curved Arrows (SVG Vector Overlay) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 1000 563"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                {/* Arrowhead marker pointing to target */}
                <marker
                  id="handwritten-arrow"
                  viewBox="0 0 12 12"
                  refX="8"
                  refY="6"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path
                    d="M 1 2 L 9 6 L 1 10"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>

                {/* Subtle text and arrow shadow for contrast */}
                <filter id="handwritten-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.55" />
                </filter>
              </defs>

              {/* STYLES FOR HANDWRITTEN LABELS */}
              <g
                style={{
                  fontFamily: "var(--font-caveat), cursive",
                  fontSize: "20px",
                  fontWeight: 600,
                  fill: "#FFFFFF",
                  filter: "url(#handwritten-glow)",
                }}
              >
                {/* ANNOTATION 1: "Just Me" */}
                <g>
                  <text x="382" y="278" textAnchor="middle" transform="rotate(-3 382 278)">
                    Just
                  </text>
                  <text x="385" y="296" textAnchor="middle" transform="rotate(-3 385 296)">
                    Me
                  </text>
                  {/* Arrow pointing down to the founder */}
                  <path
                    d="M 395 304 Q 403 320 418 332"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    markerEnd="url(#handwritten-arrow)"
                  />
                </g>

                {/* ANNOTATION 2: "One Computer (Windows XP)" */}
                <g>
                  <text x="668" y="260" textAnchor="middle" transform="rotate(4 668 260)">
                    One
                  </text>
                  <text x="656" y="280" textAnchor="middle" transform="rotate(4 656 280)">
                    Computer
                  </text>
                  <text x="672" y="300" textAnchor="middle" transform="rotate(4 672 300)">
                    (Windows XP)
                  </text>
                  {/* Arrow pointing down-left to monitor */}
                  <path
                    d="M 618 288 Q 598 296 588 318"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    markerEnd="url(#handwritten-arrow)"
                  />
                </g>

                {/* ANNOTATION 3: "No Big Office" */}
                <g>
                  <text x="252" y="360" textAnchor="middle" transform="rotate(2 252 360)">
                    No Big Office
                  </text>
                  {/* Arrow pointing down-right toward empty hills */}
                  <path
                    d="M 298 368 Q 316 376 328 388"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    markerEnd="url(#handwritten-arrow)"
                  />
                </g>

                {/* ANNOTATION 4: "No Team" */}
                <g>
                  <text x="190" y="475" textAnchor="middle" transform="rotate(3 190 475)">
                    No Team
                  </text>
                  {/* Arrow pointing down-right toward grass */}
                  <path
                    d="M 230 482 Q 248 492 260 504"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    markerEnd="url(#handwritten-arrow)"
                  />
                </g>

                {/* ANNOTATION 5: "No Investment" */}
                <g>
                  <text x="810" y="394" textAnchor="middle" transform="rotate(2 810 394)">
                    No Investment
                  </text>
                  {/* Arrow pointing down-left toward empty landscape */}
                  <path
                    d="M 752 404 Q 736 414 722 426"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    markerEnd="url(#handwritten-arrow)"
                  />
                </g>

                {/* ANNOTATION 6: "Only a Vision" */}
                <g>
                  <text x="862" y="468" textAnchor="middle" transform="rotate(3 862 468)">
                    Only a Vision
                  </text>
                  {/* Arrow pointing down-left toward sunrise horizon */}
                  <path
                    d="M 816 478 Q 798 492 784 508"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    markerEnd="url(#handwritten-arrow)"
                  />
                </g>
              </g>
            </svg>
    </section>
  );
};
