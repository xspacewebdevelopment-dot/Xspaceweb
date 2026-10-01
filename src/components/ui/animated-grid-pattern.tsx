"use client";

import React, { useEffect, useId, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string | number;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export const AnimatedGridPattern: React.FC<AnimatedGridPatternProps> = ({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 25,
  className,
  maxOpacity = 0.04,
  duration = 5,
  repeatDelay = 1.5,
  ...props
}) => {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Array<{ id: number; pos: [number, number] }>>([]);

  const getPos = useCallback((w: number, h: number): [number, number] => {
    if (!w || !h) return [0, 0];
    return [
      Math.floor((Math.random() * w) / width),
      Math.floor((Math.random() * h) / height),
    ];
  }, [width, height]);

  const updateSquarePosition = useCallback(
    (idToUpdate: number) => {
      setSquares((currentSquares) =>
        currentSquares.map((sq) =>
          sq.id === idToUpdate
            ? {
                ...sq,
                pos: getPos(dimensionsRef.current.width, dimensionsRef.current.height),
              }
            : sq
        )
      );
    },
    [getPos]
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        dimensionsRef.current = { width: w, height: h };

        const generated = Array.from({ length: numSquares }, (_, i) => ({
          id: i,
          pos: getPos(w, h),
        }));
        setSquares(generated);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [numSquares, getPos]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-blue-500/10 stroke-blue-500/15",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [sqX, sqY], id: sqId }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              repeatDelay,
              delay: index * 0.12,
              repeatType: "reverse",
              onComplete: () => updateSquarePosition(sqId),
            }}
            key={`${sqX}-${sqY}-${index}`}
            width={width - 1}
            height={height - 1}
            x={sqX * width + 1}
            y={sqY * height + 1}
            fill="rgba(37, 99, 235, 0.35)"
            stroke="none"
          />
        ))}
      </svg>
    </svg>
  );
};
