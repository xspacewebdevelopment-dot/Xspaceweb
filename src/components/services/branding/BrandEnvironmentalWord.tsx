"use client";

import React, { useRef, useEffect, useState } from "react";

interface BrandEnvironmentalWordProps {
  word: string;
  className?: string;
}

export const BrandEnvironmentalWord: React.FC<BrandEnvironmentalWordProps> = ({
  word,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate relative position within viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        // Parallax from +60px to -60px
        const offset = (progress - 0.5) * -120;
        setTranslateY(offset);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`relative w-full overflow-hidden pointer-events-none select-none flex items-center justify-center my-[-40px] sm:my-[-60px] z-0 ${className}`}
    >
      <span
        className="text-[18vw] sm:text-[16vw] font-black uppercase tracking-tight text-white/[0.05] whitespace-nowrap will-change-transform leading-none select-none"
        style={{
          transform: `translate3d(0, ${translateY}px, 0)`,
          opacity: 0.06,
        }}
      >
        {word}
      </span>
    </div>
  );
};

export default BrandEnvironmentalWord;
