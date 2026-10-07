"use client";

import React, { useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Mail } from "lucide-react";

interface MarketingCTASectionProps {
  onOpenConsultation?: (email?: string) => void;
}

export const MarketingCTASection: React.FC<MarketingCTASectionProps> = ({ onOpenConsultation }) => {
  const [email, setEmail] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Subtle magnetic hover springs
  const btnX = useSpring(0, { stiffness: 200, damping: 15 });
  const btnY = useSpring(0, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Maximum movement is small (up to 6px)
    btnX.set(Math.max(-6, Math.min(6, x * 0.2)));
    btnY.set(Math.max(-6, Math.min(6, y * 0.2)));
  };

  const handleMouseLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onOpenConsultation?.(email.trim());
    } else {
      onOpenConsultation?.();
    }
  };

  return (
    <section className="w-full py-20 md:py-28 bg-[#f9fafb] border-t border-slate-200/60 relative">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <div className="relative rounded-[40px] bg-[#0a152d] text-white p-10 md:p-14 lg:p-16 overflow-hidden shadow-[0_30px_90px_-20px_rgba(10,21,45,0.25)] border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          {/* Subtle Ambient Radial Gradients */}
          <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Heading, Subhead, Email Form, Trust Badges */}
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-blue-200 text-xs font-semibold tracking-wide uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Scale With Certainty</span>
            </div>

            <h2
              className="text-[34px] sm:text-[42px] md:text-[48px] font-medium tracking-tight text-white leading-[1.08]"
              style={{ fontFamily: "'Outfit', var(--font-display), sans-serif" }}
            >
              Ready to construct an unfair advantage in your market?
            </h2>

            <p
              className="mt-4 text-[15px] md:text-[16px] text-slate-300 leading-relaxed font-normal"
              style={{ fontFamily: "'Inter', var(--font-sans), sans-serif" }}
            >
              Get a complimentary diagnostic review of your current conversion funnels, keyword gaps, and ad performance telemetry.
            </p>

            {/* Quick Email Form */}
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                />
              </div>

              <motion.button
                ref={buttonRef}
                style={{ x: btnX, y: btnY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-7 py-3.5 bg-white text-[#0a152d] font-semibold text-sm rounded-full shadow-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>

            <div className="flex flex-wrap items-center gap-6 mt-8 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 24-Hour Diagnostic Turnaround
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> NDA-Protected Data
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Hard Pitch
              </span>
            </div>
          </div>

          {/* Right Column: Floating 3D Model of the X Logo */}
          <div className="relative z-10 flex items-center justify-center lg:justify-end shrink-0 self-center">
            <motion.div
              animate={{ 
                y: [0, -14, 0],
                rotate: [0, 2.5, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center pointer-events-none select-none"
            >
              {/* Subtle ambient back glow */}
              <div className="absolute inset-4 rounded-full bg-blue-500/25 blur-2xl pointer-events-none" />

              <img
                src="/images/xspace-3d-x.png"
                alt="XSPACEWEB 3D Logo"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_25px_60px_rgba(22,104,232,0.5)] transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
