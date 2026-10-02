"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Play,
  Pause,
  Star,
  Activity,
  Workflow,
  BarChart2,
  Check,
  Globe,
  Sliders,
  PieChart,
  Layers,
  Search,
  Bell,
  Cpu,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export interface ProductsHeroCard {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  accentColor: string;
  widthClass?: string;
  renderCard: (isActive: boolean) => React.ReactNode;
}

interface ProductsHeroSectionProps {
  onOpenDemo?: () => void;
}

export const ProductsHeroSection: React.FC<ProductsHeroSectionProps> = ({ onOpenDemo }) => {
  const [activeIndex, setActiveIndex] = useState<number>(3); // Dashboard in center by default
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const heroCards: ProductsHeroCard[] = [
    // 1. Far Left: Activity & User Profile Card
    {
      id: "card-user-management",
      title: "Team Management",
      accentColor: "#3B82F6",
      renderCard: (isActive) => (
        <div className="w-full h-full flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Sarah Miller"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-800 leading-tight">Sarah Miller</div>
                <div className="text-[9px] text-slate-400">Admin Lead</div>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100 animate-pulse" />
          </div>

          {/* Settings Toggles List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span className="text-[10px] font-semibold text-slate-700">Auto Invoicing</span>
              <div className="w-7 h-4 bg-blue-600 rounded-full p-0.5 flex justify-end">
                <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
              </div>
            </div>
            <div className="flex items-center justify-between bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span className="text-[10px] font-semibold text-slate-700">GST Sync</span>
              <div className="w-7 h-4 bg-emerald-500 rounded-full p-0.5 flex justify-end">
                <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
              </div>
            </div>
            <div className="flex items-center justify-between bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              <span className="text-[10px] font-semibold text-slate-700">2FA Security</span>
              <div className="w-7 h-4 bg-slate-200 rounded-full p-0.5 flex justify-start">
                <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
              </div>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
            <span className="font-mono">ID: XSW-8821</span>
            <span className="text-blue-600 font-bold">100% Active</span>
          </div>
        </div>
      ),
    },

    // 2. Left Card: 28% Growth Card
    {
      id: "card-growth-28",
      title: "Revenue Growth",
      accentColor: "#10B981",
      renderCard: (isActive) => (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="space-y-1">
            <div className="text-3xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
              <span>28%</span>
              <span className="text-xs font-bold text-emerald-600">▲ +4.2%</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md w-fit border border-emerald-200/60">
              <TrendingUp className="w-3 h-3" />
              <span>Weekly Growth</span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-4">
            <div className="h-24 flex items-end justify-between gap-1.5 px-1">
              {[35, 48, 42, 60, 52, 75, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div
                    style={{ height: `${h}%` }}
                    className={`w-full rounded-t-md transition-all duration-500 ${
                      i === 6
                        ? "bg-gradient-to-t from-blue-600 to-indigo-500 shadow-md shadow-blue-500/30"
                        : "bg-blue-200/80 group-hover:bg-blue-300"
                    }`}
                  />
                  <span className="text-[8px] font-mono text-slate-400">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Target Reached</span>
            <span className="font-bold text-slate-800">₹ 4.8L / Wk</span>
          </div>
        </div>
      ),
    },

    // 3. Left Center: Team Collaboration Card
    {
      id: "card-collaboration",
      title: "Team Collaboration",
      accentColor: "#6366F1",
      renderCard: (isActive) => (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden relative shadow-xs">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Alex"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-9 h-9 rounded-full ring-2 ring-white overflow-hidden relative shadow-xs">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                    alt="Priya"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 leading-tight">Team Collaboration</h4>
                <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>5 Members Active</span>
                </div>
              </div>
            </div>

            {/* Live Collaboration Chat Pills */}
            <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[9px] font-bold">
                  P
                </div>
                <div className="bg-white px-2 py-1 rounded-lg text-[10px] text-slate-700 font-medium shadow-2xs border border-slate-100 flex-1 truncate">
                  GST Audit report ready! 📊
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[9px] font-bold">
                  A
                </div>
                <div className="bg-white px-2 py-1 rounded-lg text-[10px] text-slate-700 font-medium shadow-2xs border border-slate-100 flex-1 truncate">
                  Approved deployment v2.4 🚀
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">Sync status:</span>
            <span className="text-indigo-600 font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> Real-time
            </span>
          </div>
        </div>
      ),
    },

    // 4. Center Main Feature: Comprehensive Analytics Dashboard Card
    {
      id: "card-main-dashboard",
      title: "Interactive Analytics Hub",
      accentColor: "#1668E8",
      renderCard: (isActive) => (
        <div className="w-full h-full flex flex-col justify-between space-y-3">
          {/* Top Control Bar of Dashboard */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-xs" />
              <div className="h-2 w-16 bg-blue-600/20 rounded-full" />
              <div className="h-2 w-8 bg-slate-200 rounded-full" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-[8px]">
                <Search className="w-2.5 h-2.5" />
              </div>
              <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-[8px]">
                <Bell className="w-2.5 h-2.5" />
              </div>
              <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[8px] font-bold">
                XS
              </div>
            </div>
          </div>

          {/* Split Dashboard Content (Area Chart + Circular Donut Chart) */}
          <div className="grid grid-cols-12 gap-3 items-center py-1">
            {/* Left Area Line Chart (7 cols) */}
            <div className="col-span-7 bg-blue-50/40 rounded-2xl p-2.5 border border-blue-100/80 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-slate-800">Ecosystem Traffic</span>
                <span className="text-[9px] font-bold text-blue-600 bg-white px-1.5 py-0.5 rounded shadow-2xs">
                  +38.5%
                </span>
              </div>
              
              {/* Smooth Curved Line Graph SVG */}
              <div className="h-20 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 160 70" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Area Fill */}
                  <path
                    d="M 0,55 Q 25,48 50,38 T 100,28 T 130,12 L 160,18 L 160,70 L 0,70 Z"
                    fill="url(#blueGradient)"
                  />
                  {/* Main Curve */}
                  <path
                    d="M 0,55 Q 25,48 50,38 T 100,28 T 130,12 L 160,18"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Key Glowing Data Points */}
                  <circle cx="50" cy="38" r="2.5" fill="#2563EB" />
                  <circle cx="100" cy="28" r="2.5" fill="#2563EB" />
                  <circle cx="130" cy="12" r="3.5" fill="#1668E8" className="animate-pulse" />
                  <circle cx="160" cy="18" r="2.5" fill="#2563EB" />
                </svg>
              </div>

              <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                <span>Jan</span>
                <span>Apr</span>
                <span>Jul</span>
                <span>Oct</span>
              </div>
            </div>

            {/* Right Donut Chart (5 cols) */}
            <div className="col-span-5 bg-white rounded-2xl p-2.5 border border-slate-100 shadow-xs flex flex-col items-center justify-center text-center">
              <div className="relative w-16 h-16 mb-1">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="4"
                  />
                  {/* Segment 1: Blue (60%) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#1668E8"
                    strokeWidth="4"
                    strokeDasharray="60, 100"
                    strokeLinecap="round"
                  />
                  {/* Segment 2: Cyan (25%) */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="4"
                    strokeDasharray="25, 100"
                    strokeDashoffset="-65"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[11px] font-black text-slate-800">85%</span>
                </div>
              </div>
              <span className="text-[9px] font-bold text-slate-600">SaaS Health</span>
              <span className="text-[8px] text-emerald-600 font-semibold">Optimal 99.9%</span>
            </div>
          </div>

          {/* Bottom Live Metric Pills */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
            <div className="bg-slate-50 p-1.5 rounded-xl text-center">
              <div className="text-[8px] text-slate-400 font-medium">Uptime</div>
              <div className="text-[11px] font-extrabold text-slate-800">99.99%</div>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-xl text-center">
              <div className="text-[8px] text-slate-400 font-medium">Speed</div>
              <div className="text-[11px] font-extrabold text-blue-600">&lt; 85ms</div>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-xl text-center">
              <div className="text-[8px] text-slate-400 font-medium">Security</div>
              <div className="text-[11px] font-extrabold text-emerald-600">SOC2</div>
            </div>
          </div>
        </div>
      ),
    },

    // 5. Right Center: Automate Workflows (Dark Theme Card)
    {
      id: "card-automate-workflows",
      title: "Automate Workflows",
      accentColor: "#0F172A",
      renderCard: (isActive) => (
        <div className="w-full h-full bg-[#0A1128] text-white rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Workflow className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-black text-white tracking-tight">Automate Workflows</h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[8px] font-bold border border-cyan-500/30">
                Live Engine
              </span>
            </div>
            <p className="text-[9.5px] text-slate-300 font-normal">
              Trigger events across APIs, GST & payments.
            </p>
          </div>

          {/* High-tech Connected Node Graph */}
          <div className="relative z-10 my-2 h-20 bg-slate-900/80 rounded-xl border border-cyan-500/20 p-2 flex items-center justify-between">
            {/* Left Trigger Node */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-7 h-7 rounded-lg bg-blue-600/40 border border-blue-400 text-blue-300 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span className="text-[8px] text-slate-400 font-mono">Invoice</span>
            </div>

            {/* Connecting Animated Line */}
            <div className="flex-1 mx-2 relative h-0.5 bg-slate-700">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 absolute -top-0.5 left-1/2 -translate-x-1/2" />
            </div>

            {/* Center Process Node */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/30 border border-cyan-400 text-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="text-[8px] text-cyan-300 font-mono font-bold">Auto GST</span>
            </div>

            {/* Connecting Line */}
            <div className="flex-1 mx-2 relative h-0.5 bg-slate-700">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 absolute -top-0.5 left-1/2 -translate-x-1/2" />
            </div>

            {/* Right Complete Node */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/30 border border-emerald-400 text-emerald-300 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-[8px] text-slate-400 font-mono">Dispatched</span>
            </div>
          </div>

          <div className="relative z-10 pt-1 flex items-center justify-between text-[9px] text-slate-400">
            <span>Execution time</span>
            <span className="text-cyan-400 font-mono font-bold">12ms • 0 Errors</span>
          </div>
        </div>
      ),
    },

    // 6. Right Card: Higher Productivity Ring
    {
      id: "card-productivity",
      title: "Higher Productivity",
      accentColor: "#06B6D4",
      renderCard: (isActive) => (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="space-y-1">
            <h4 className="text-xs font-black text-slate-900 leading-tight">Higher Productivity</h4>
            <div className="text-[10px] text-slate-500">Automated business operations</div>
          </div>

          {/* Donut Ring Visualization */}
          <div className="py-2 flex items-center justify-center">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E0F2FE"
                  strokeWidth="3.8"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="3.8"
                  strokeDasharray="88, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-base font-black text-slate-900">+42%</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase">Efficiency</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">Manual hours saved:</span>
            <span className="text-sky-600 font-bold">14 hrs / wk</span>
          </div>
        </div>
      ),
    },

    // 7. Far Right: 520K+ Scalability Card
    {
      id: "card-scalability-520k",
      title: "Scale & Volume",
      accentColor: "#2563EB",
      renderCard: (isActive) => (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="space-y-1">
            <div className="text-3xl font-black text-slate-900 tracking-tight flex items-baseline gap-1">
              <span>520K+</span>
            </div>
            <div className="flex items-center gap-1 text-[10.5px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md w-fit border border-blue-200/60">
              <Activity className="w-3 h-3" />
              <span>Operations Monthly</span>
            </div>
          </div>

          {/* Stepped Scale Visual */}
          <div className="pt-3">
            <div className="h-20 flex items-end justify-between gap-1.5 px-1">
              {[20, 32, 45, 62, 78, 92, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    style={{ height: `${h}%` }}
                    className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-sky-400 shadow-xs"
                  />
                  <span className="text-[7.5px] font-mono text-slate-400">
                    Q{Math.floor(i / 2) + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Peak Capacity</span>
            <span className="font-bold text-slate-800">1.2M Ready</span>
          </div>
        </div>
      ),
    },
  ];

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroCards.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroCards.length]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % heroCards.length);
  const goToPrev = () => setActiveIndex((prev) => (prev - 1 + heroCards.length) % heroCards.length);

  return (
    <section className="relative w-full overflow-hidden text-slate-900 pt-6 sm:pt-10 pb-16 sm:pb-24">
      {/* 
        HERO VIBRANT SKY BACKGROUND VIDEO:
        Replaced static image with product.mp4 video loop.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-top"
        >
          <source src="/videos/product.mp4" type="video/mp4" />
        </video>
        {/* Soft atmospheric radial sun glow at top center */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-200/30 rounded-full blur-3xl" />
        
        {/* Subtle bottom fade to transition gracefully into content sections below */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
      </div>

      <Container size="wide" className="relative z-20">
        
        {/* Hero Title & Subtitle Area */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto pt-4 sm:pt-6 mb-8 sm:mb-12">
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,35,100,0.45)]">
            Building a Smarter <br className="hidden sm:inline" />
            Tomorrow with <br className="hidden sm:inline" />
            Technology and Innovation.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,30,80,0.4)] px-4">
            We help businesses grow with powerful SaaS products, digital solutions and intelligent automation.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3 sm:pt-4">
            
            {/* 1. View Demo Pill Button */}
            <button
              type="button"
              onClick={onOpenDemo}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#07152B]/85 hover:bg-[#07152B] text-white text-sm sm:text-base font-bold transition-all duration-200 shadow-xl backdrop-blur-md border border-white/20 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>View Demo</span>
            </button>

            {/* 2. Get Started Lime-Green Pill Button */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-[#CCFF00] hover:bg-[#B8E600] text-slate-950 text-sm sm:text-base font-black transition-all duration-200 shadow-xl shadow-lime-400/25 hover:scale-105 active:scale-95 group"
            >
              <span>Get Started</span>
              <div className="w-7 h-7 rounded-full bg-slate-950 text-[#CCFF00] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </div>
            </Link>

          </div>
        </div>

        {/* 
          3D PERSPECTIVE SLIDEABLE CARDS SHOWCASE DECK:
          Matches the 7-card 3D perspective fan shown in the user's reference image.
        */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="relative min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center justify-center my-4 select-none"
          style={{ perspective: "1300px" }}
        >
          {/* Floating Left Arrow Navigation */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous Showcase Card"
            className="absolute left-1 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/90"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Floating Right Arrow Navigation */}
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next Showcase Card"
            className="absolute right-1 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer border border-white/90"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Cards Track with 3D Transforms */}
          <div className="w-full flex items-center justify-center py-4 overflow-hidden">
            {heroCards.map((card, idx) => {
              const isActive = idx === activeIndex;
              const offset = (idx - activeIndex + heroCards.length) % heroCards.length;
              let adjustedOffset = offset;
              if (offset > heroCards.length / 2) adjustedOffset = offset - heroCards.length;

              // Compute responsive position calculations
              const isCenterDashboard = card.id === "card-main-dashboard";
              const baseWidth = isCenterDashboard ? 360 : 250;
              const xPos = adjustedOffset * 220;
              const scale = isActive ? 1.06 : 0.86 - Math.abs(adjustedOffset) * 0.05;
              const zIndex = 35 - Math.abs(adjustedOffset) * 6;
              const opacity = isActive ? 1 : 0.88 - Math.abs(adjustedOffset) * 0.14;

              // 3D rotations based on offset and mouse interaction
              const rotateY = isActive ? -mousePos.x * 14 : adjustedOffset * -10;
              const rotateX = isActive ? mousePos.y * 10 : 0;
              const translateZ = isActive ? 50 : -60 - Math.abs(adjustedOffset) * 20;

              return (
                <motion.div
                  key={card.id}
                  onClick={() => setActiveIndex(idx)}
                  animate={{
                    x: xPos,
                    scale,
                    opacity,
                    rotateY,
                    rotateX,
                    translateZ,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 270,
                    damping: 25,
                  }}
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  className={`absolute rounded-[28px] p-5 sm:p-6 cursor-pointer select-none transition-shadow duration-300 border ${
                    card.id === "card-automate-workflows"
                      ? "bg-slate-950 border-slate-800 text-white shadow-2xl"
                      : "bg-white/95 backdrop-blur-md border-white/90 text-slate-900 shadow-[0_20px_50px_rgba(7,21,43,0.18)]"
                  } ${
                    isCenterDashboard
                      ? "w-[310px] sm:w-[380px] md:w-[440px] h-[280px] sm:h-[310px]"
                      : "w-[220px] sm:w-[250px] md:w-[270px] h-[260px] sm:h-[280px]"
                  } ${
                    isActive ? "ring-4 ring-blue-500/30 shadow-[0_30px_70px_rgba(22,104,232,0.3)]" : "hover:opacity-100"
                  }`}
                >
                  {card.renderCard(isActive)}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots & Play/Pause Controls */}
        <div className="flex items-center justify-center gap-3 mt-4 mb-8 relative z-30">
          <div className="flex items-center gap-2">
            {heroCards.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? "w-8 h-2 bg-white shadow-md shadow-blue-900/30"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            title={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
            className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center border border-white transition-transform active:scale-95 ml-1"
          >
            {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
          </button>
        </div>

        {/* 
          BOTTOM CUSTOMER PROOF BADGE:
          Avatars + "Trusted by 10,000+ businesses across India" + 5 Golden Stars
        */}
        <div className="flex flex-col items-center justify-center text-center space-y-2 relative z-30 pt-2">
          <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/80 shadow-xl shadow-blue-950/10">
            {/* 4 Overlapping Avatar Photos */}
            <div className="flex -space-x-2.5 overflow-hidden">
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden relative shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Customer 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden relative shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Customer 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden relative shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                  alt="Customer 3"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden relative shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                  alt="Customer 4"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Proof Text */}
            <div className="text-left">
              <span className="text-xs sm:text-[13px] font-bold text-[#07152B]">
                Trusted by <span className="text-[#1668E8]">10,000+ businesses</span> across India
              </span>
              <div className="flex items-center gap-1 text-amber-400 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-[10.5px] font-extrabold text-slate-700 ml-1">4.9 / 5.0</span>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </section>
  );
};
