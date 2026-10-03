"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Monitor, Heart, Check, ArrowUpRight, Wifi, Shield } from "lucide-react";
import { ProductItem } from "./product-data";

interface ProductMiniPreviewProps {
  product: ProductItem;
  active: boolean;
}

export const ProductMiniPreview: React.FC<ProductMiniPreviewProps> = ({ product, active }) => {
  switch (product.id) {
    case "makegstbill":
      return <MakeGSTBillPreview active={active} />;
    case "goldengst":
      return <GoldenGSTPreview active={active} />;
    case "freedeskpro":
      return <FreeDeskProPreview active={active} />;
    case "modhuralap":
      return <ModhuralapPreview active={active} />;
    default:
      return null;
  }
};

/* 1. MakeGSTBill Mini Preview */
const MakeGSTBillPreview: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className="w-full h-[105px] sm:h-[120px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-white/95 border border-blue-100/90 p-2.5 sm:p-3.5 flex items-center justify-between relative shadow-inner overflow-hidden select-none">
      {/* Background subtle invoice grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none" />

      {/* Brand Icon Tile */}
      <motion.div
        animate={active ? { scale: [0.95, 1.05, 1], rotate: [0, -2, 0] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center p-1.5 sm:p-2 flex-shrink-0 relative z-10 [&_svg]:w-6 [&_svg]:h-6 sm:[&_svg]:w-8 sm:[&_svg]:h-8"
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path d="M4 19V7.5L12 13.5L20 7.5V19" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 7.5L12 13.5L20 7.5" stroke="#EA4335" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 19V10" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 19V10" stroke="#FBBC05" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Floating Animated GST Invoice Sent Card */}
      <motion.div
        key={active ? "active-makegst" : "inactive-makegst"}
        initial={active ? { y: -8, opacity: 0.7, scale: 0.95 } : { y: 0, opacity: 1, scale: 1 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white shadow-xl border border-slate-100 flex flex-col justify-between h-[68px] sm:h-[76px] w-[130px] sm:w-[150px] relative z-10"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-700">GST Invoice</span>
          </div>
          <span className="text-[8px] sm:text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
            Paid
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-[8px] sm:text-[8.5px] font-medium text-slate-400">Amount</div>
            <motion.div
              animate={active ? { opacity: [0.4, 1], scale: [0.95, 1] } : {}}
              className="text-[11px] sm:text-[12px] font-extrabold text-slate-900 tracking-tight"
            >
              ₹24,800
            </motion.div>
          </div>

          <motion.div
            animate={active ? { x: [0, 4, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25"
          >
            <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

/* 2. GoldenGST Mini Preview */
const GoldenGSTPreview: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className="w-full h-[105px] sm:h-[120px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-white/95 border border-amber-100/90 p-2.5 sm:p-3.5 flex items-center justify-between relative shadow-inner overflow-hidden select-none">
      {/* Background warm radial shine */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Brand Icon Tile */}
      <motion.div
        animate={active ? { scale: [0.95, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#731818] via-[#550c0c] to-[#3a0707] flex items-center justify-center text-amber-300 font-black text-xl sm:text-2xl shadow-lg border border-amber-400/40 flex-shrink-0 relative z-10"
      >
        G
      </motion.div>

      {/* 3D Animated Bar Chart Card */}
      <motion.div
        key={active ? "active-goldengst" : "inactive-goldengst"}
        initial={active ? { y: -6, opacity: 0.8 } : { y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white shadow-xl border border-slate-100 flex flex-col justify-between h-[68px] sm:h-[76px] w-[130px] sm:w-[150px] relative z-10"
      >
        <div className="flex items-center justify-between">
          <span className="text-[8.5px] sm:text-[9.5px] font-bold text-slate-700">Business Growth</span>
          <motion.span
            animate={active ? { y: [-2, 0], x: [1, 0] } : {}}
            className="text-[9.5px] sm:text-[10px] font-extrabold text-emerald-600 flex items-center bg-emerald-50 px-1 py-0.5 rounded"
          >
            +38%
            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
          </motion.span>
        </div>

        {/* 4 Growing Orange/Amber Bars */}
        <div className="flex items-end gap-1.5 sm:gap-2 justify-between px-1 h-6 sm:h-7">
          {[
            { height: "35%", delay: 0.05, color: "bg-amber-300" },
            { height: "55%", delay: 0.15, color: "bg-amber-400" },
            { height: "75%", delay: 0.25, color: "bg-amber-500" },
            { height: "100%", delay: 0.35, color: "bg-amber-600" },
          ].map((bar, i) => (
            <motion.div
              key={i}
              initial={active ? { height: "15%" } : { height: bar.height }}
              animate={{ height: bar.height }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 18,
                delay: active ? bar.delay : 0,
              }}
              className={`w-3 sm:w-4 rounded-t-sm shadow-sm ${bar.color}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/* 3. FreeDeskPro Mini Preview */
const FreeDeskProPreview: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className="w-full h-[105px] sm:h-[120px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50/90 via-sky-50/50 to-white/95 border border-blue-100/90 p-2.5 sm:p-3.5 flex items-center justify-between relative shadow-inner overflow-hidden select-none">
      {/* Background subtle cyber grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px] opacity-25 pointer-events-none" />

      {/* Brand Icon Tile */}
      <motion.div
        animate={active ? { scale: [0.95, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 flex-shrink-0 relative z-10 [&_svg]:w-5 [&_svg]:h-5 sm:[&_svg]:w-6 sm:[&_svg]:h-6"
      >
        <Monitor className="w-6 h-6 stroke-[2.2]" />
      </motion.div>

      {/* 3D Window Preview Mockup */}
      <motion.div
        key={active ? "active-freedesk" : "inactive-freedesk"}
        initial={active ? { y: -6, opacity: 0.8 } : { y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white shadow-xl border border-slate-100 flex flex-col justify-between h-[68px] sm:h-[76px] w-[130px] sm:w-[150px] relative z-10"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-1">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[8px] sm:text-[8.5px] font-mono font-bold text-slate-400">TLS 1.3</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              {active && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[8.5px] sm:text-[9.5px] font-bold text-slate-800">Connected</span>
          </div>

          <motion.span
            animate={active ? { opacity: [0.6, 1], scale: [0.92, 1] } : {}}
            className="text-[9px] sm:text-[10px] font-mono font-black text-blue-600 bg-blue-50 px-1 sm:px-1.5 py-0.5 rounded"
          >
            60 FPS
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

/* 4. Modhuralap Mini Preview */
const ModhuralapPreview: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <div className="w-full h-[105px] sm:h-[120px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-50/90 via-pink-50/50 to-white/95 border border-rose-100/90 p-2.5 sm:p-3.5 flex items-center justify-between relative shadow-inner overflow-hidden select-none">
      {/* Background warm blush shine */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Brand Icon Tile */}
      <motion.div
        animate={
          active
            ? { scale: [1, 1.15, 1, 1.1, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.8 }}
        className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 flex-shrink-0 relative z-10 [&_svg]:w-5 [&_svg]:h-5 sm:[&_svg]:w-6 sm:[&_svg]:h-6"
      >
        <Heart className="w-6 h-6 fill-current" />
      </motion.div>

      {/* "Find Your People" card with animated avatars */}
      <motion.div
        key={active ? "active-modhuralap" : "inactive-modhuralap"}
        initial={active ? { y: -6, opacity: 0.8 } : { y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white shadow-xl border border-slate-100 flex flex-col justify-between h-[68px] sm:h-[76px] w-[130px] sm:w-[150px] relative z-10"
      >
        <div className="flex items-center justify-between">
          <span className="text-[8px] sm:text-[8.5px] font-bold text-rose-600 bg-rose-50 px-1.5 sm:px-2 py-0.5 rounded-full">
            Find Your People
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
        </div>

        <div className="flex items-center justify-between pt-1">
          {/* Overlapping avatars with staggered entrance */}
          <div className="flex items-center -space-x-1.5">
            {[
              { bg: "bg-gradient-to-br from-amber-400 to-orange-500", delay: 0.05 },
              { bg: "bg-gradient-to-br from-blue-400 to-indigo-600", delay: 0.15 },
              { bg: "bg-gradient-to-br from-emerald-400 to-teal-600", delay: 0.25 },
              { bg: "bg-gradient-to-br from-pink-400 to-rose-500", delay: 0.35 },
            ].map((avatar, i) => (
              <motion.div
                key={i}
                initial={active ? { scale: 0, x: -6 } : { scale: 1, x: 0 }}
                animate={{ scale: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: active ? avatar.delay : 0,
                }}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${avatar.bg} border-2 border-white shadow-sm`}
              />
            ))}
          </div>

          <motion.span
            animate={active ? { scale: [0.9, 1.05, 1] } : {}}
            className="text-[8.5px] sm:text-[9px] font-black text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-md"
          >
            12k+
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};
