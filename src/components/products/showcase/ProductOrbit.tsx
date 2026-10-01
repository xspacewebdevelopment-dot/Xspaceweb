"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Send, Monitor, Users, TrendingUp, Cloud, FileText } from "lucide-react";

interface FloatingIconItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  position: string;
  xRange: number[];
  yRange: number[];
  duration: number;
  delay: number;
}

export const ProductOrbit: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const icons: FloatingIconItem[] = [
    {
      id: "analytics",
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />,
      label: "Analytics",
      position: "left-[14%] sm:left-[22%] top-2 sm:top-4",
      xRange: [0, 8, -6, 0],
      yRange: [0, -10, 6, 0],
      duration: 20,
      delay: 0,
    },
    {
      id: "mail",
      icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
      label: "Mail & Invoicing",
      position: "left-[3%] sm:left-[8%] top-[38%] sm:top-[34%]",
      xRange: [0, 10, -8, 0],
      yRange: [0, 8, -8, 0],
      duration: 22,
      delay: 2,
    },
    {
      id: "send",
      icon: <Send className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />,
      label: "Instant Dispatch",
      position: "left-[6%] sm:left-[12%] bottom-[12%] sm:bottom-[15%]",
      xRange: [0, -8, 10, 0],
      yRange: [0, -8, 10, 0],
      duration: 18,
      delay: 4,
    },
    {
      id: "cloud",
      icon: <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />,
      label: "Cloud Sync",
      position: "right-[18%] sm:right-[26%] top-1 sm:top-3",
      xRange: [0, -10, 8, 0],
      yRange: [0, 8, -6, 0],
      duration: 24,
      delay: 1,
    },
    {
      id: "desktop",
      icon: <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />,
      label: "Remote Access",
      position: "right-[3%] sm:right-[8%] top-[36%] sm:top-[32%]",
      xRange: [0, -8, 10, 0],
      yRange: [0, -10, 8, 0],
      duration: 19,
      delay: 3,
    },
    {
      id: "users",
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />,
      label: "Community",
      position: "right-[6%] sm:right-[13%] bottom-[10%] sm:bottom-[14%]",
      xRange: [0, 10, -6, 0],
      yRange: [0, 8, -10, 0],
      duration: 21,
      delay: 5,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10"
    >
      {icons.map((item) => (
        <motion.div
          key={item.id}
          initial={false}
          animate={
            shouldReduceMotion
              ? { x: 0, y: 0 }
              : {
                  x: item.xRange,
                  y: item.yRange,
                }
          }
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
          className={`absolute ${item.position} w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white/85 backdrop-blur-md shadow-[0_10px_25px_-5px_rgba(7,21,43,0.08)] border border-white/90 flex items-center justify-center transition-opacity opacity-70 hover:opacity-100`}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
};
