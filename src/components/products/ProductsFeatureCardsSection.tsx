"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import {
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe,
  Plus,
  Monitor,
  GraduationCap,
  Calendar,
  Clock,
  Shield,
  Search,
  Check,
  Building,
  FileText,
  Briefcase,
  Play,
  Layers,
} from "lucide-react";
import {
  SiRazorpay,
  SiGoogle,
  SiAirtel,
  SiPhonepe,
} from "react-icons/si";

interface ProductsFeatureCardsSectionProps {
  onOpenProductDemo?: (productId: string) => void;
}

export const ProductsFeatureCardsSection: React.FC<ProductsFeatureCardsSectionProps> = ({
  onOpenProductDemo,
}) => {
  const [quickConnectId, setQuickConnectId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedSession, setConnectedSession] = useState(false);

  const handleQuickConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickConnectId) return;
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setConnectedSession(true);
      setTimeout(() => setConnectedSession(false), 3000);
    }, 1000);
  };

  return (
    <section className="w-full bg-[#F8FAFC] py-10 sm:py-14 text-slate-900 overflow-hidden">
      <Container size="wide">
        
        {/* ========================================================= */}
        {/* TOP ENTERPRISE / PARTNER LOGOS STRIP */}
        {/* ========================================================= */}
        <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(7,21,43,0.03)] py-4 px-6 mb-8 sm:mb-12">
          <div className="flex items-center justify-between flex-wrap gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            
            {/* 1. AWS */}
            <div className="flex-1 flex items-center justify-center px-4 py-2 min-w-[110px]">
              <div className="flex items-center gap-1.5 text-slate-700 hover:text-slate-950 transition-colors">
                <span className="font-extrabold text-lg tracking-tighter text-slate-800">aws</span>
                <div className="w-4 h-1 bg-[#FF9900] rounded-full -mt-0.5" />
              </div>
            </div>

            {/* 2. Razorpay */}
            <div className="flex-1 flex items-center justify-center px-4 py-2 min-w-[110px]">
              <div className="flex items-center gap-1 text-[#0C2340] font-extrabold text-sm sm:text-base tracking-tight">
                <span className="text-[#0C2340]">Razor</span>
                <span className="text-[#00BAF2]">pay</span>
              </div>
            </div>

            {/* 3. Google */}
            <div className="flex-1 flex items-center justify-center px-4 py-2 min-w-[110px]">
              <div className="flex items-center gap-1 text-slate-700 font-bold text-base tracking-tight">
                <span className="text-slate-800 font-bold">Google</span>
              </div>
            </div>

            {/* 4. Microsoft */}
            <div className="flex-1 flex items-center justify-center px-4 py-2 min-w-[110px]">
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-sm sm:text-base">
                <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 flex-shrink-0">
                  <div className="bg-[#F25022]" />
                  <div className="bg-[#7FBA00]" />
                  <div className="bg-[#00A4EF]" />
                  <div className="bg-[#FFB900]" />
                </div>
                <span className="font-semibold text-slate-800 text-sm">Microsoft</span>
              </div>
            </div>

            {/* 5. TATA */}
            <div className="flex-1 flex items-center justify-center px-4 py-2 min-w-[110px]">
              <div className="flex flex-col items-center select-none">
                <span className="font-black text-[#004F9F] text-xs sm:text-sm tracking-widest uppercase">
                  TATA
                </span>
              </div>
            </div>

            {/* 6. Airtel */}
            <div className="flex-1 flex items-center justify-center px-4 py-2 min-w-[110px]">
              <div className="flex items-center gap-1 text-[#E40000] font-bold text-sm sm:text-base">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E40000]" />
                <span className="font-extrabold text-[#E40000]">airtel</span>
              </div>
            </div>

            {/* 7. PhonePe */}
            <div className="flex-1 flex items-center justify-center px-4 py-2 min-w-[110px]">
              <div className="flex items-center gap-1 text-[#5F259F] font-bold text-sm">
                <div className="w-4 h-4 rounded-full bg-[#5F259F] text-white flex items-center justify-center font-bold text-[9px]">
                  पे
                </div>
                <span className="font-bold text-[#5F259F]">PhonePe</span>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* 2X2 PRODUCTS SHOWCASE GRID */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 mb-6 sm:mb-7">
          
          {/* ------------------------------------------------------------- */}
          {/* CARD 1: SimpleKaam (Top-Left) */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-[32px] bg-gradient-to-br from-[#EBF3FF] via-[#F4F8FF] to-white border border-blue-100 p-6 sm:p-8 shadow-[0_4px_25px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            {/* Ambient subtle light blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Details (5.5 cols) */}
              <div className="md:col-span-5 space-y-3 z-10">
                {/* Logo & Badge */}
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1668E8] text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-500/30">
                    S
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#07152B]">SimpleKaam</h3>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1668E8] text-[10px] font-bold">
                      Coming Soon (Oct 2026)
                    </span>
                  </div>
                </div>

                {/* Heading */}
                <h4 className="text-2xl sm:text-[26px] font-extrabold text-[#07152B] tracking-tight leading-tight pt-1">
                  Manage Your Business, Simply.
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  All-in-one business management platform for modern teams.
                </p>

                {/* Arrow Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenProductDemo?.("simplekaam")}
                    className="w-10 h-10 rounded-xl bg-[#07152B] hover:bg-[#1668E8] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Realistic 3D Mockup (6.5 cols) */}
              <div className="md:col-span-7 relative z-10 flex justify-center md:justify-end">
                <div className="w-full max-w-[320px] rounded-2xl bg-white border border-slate-200/90 p-3.5 shadow-2xl transform md:rotate-2 md:scale-105 hover:rotate-0 transition-transform duration-500 space-y-2.5">
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">
                        S
                      </div>
                      <span className="text-[10.5px] font-bold text-slate-800">SimpleKaam</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[9px] text-slate-400 font-mono">Live</span>
                    </div>
                  </div>

                  {/* Mockup Inner Grid: Sidebar + Main Content */}
                  <div className="grid grid-cols-12 gap-2">
                    {/* Sidebar Menu */}
                    <div className="col-span-4 space-y-1 pr-1 border-r border-slate-100 text-[9px] text-slate-500">
                      <div className="px-1.5 py-1 rounded bg-blue-50 text-blue-700 font-bold">Dashboard</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Projects</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Clients</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Tasks</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Invoices</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Team</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Reports</div>
                    </div>

                    {/* Main Content: Stats + Chart + Activity */}
                    <div className="col-span-8 space-y-2">
                      <div className="bg-blue-50/50 p-2 rounded-xl border border-blue-100 flex items-center justify-between">
                        <div>
                          <div className="text-[8px] text-slate-400 font-bold">Total Projects</div>
                          <div className="text-sm font-black text-slate-900">24</div>
                        </div>
                        <span className="text-[9px] font-extrabold text-emerald-600 bg-white px-1.5 py-0.5 rounded shadow-2xs">
                          +12%
                        </span>
                      </div>

                      {/* Mini Bar Chart */}
                      <div className="h-10 flex items-end justify-between gap-1 px-1 bg-slate-50 rounded-lg p-1">
                        {[40, 60, 45, 80, 70, 95].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className={`flex-1 rounded-xs ${
                              i === 5 ? "bg-blue-600" : "bg-blue-300/80"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Recent Activities */}
                      <div className="space-y-1">
                        <span className="text-[8px] font-bold text-slate-400">Recent Activities</span>
                        <div className="flex items-center gap-1.5 text-[8.5px] text-slate-600 bg-white p-1 rounded border border-slate-100">
                          <div className="w-3.5 h-3.5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[7px]">
                            R
                          </div>
                          <span className="truncate">Rohan created Project Alpha</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARD 2: Gurukul Coaching App (Top-Right) */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-[32px] bg-gradient-to-br from-[#F5F0FF] via-[#FAF7FF] to-white border border-purple-100 p-6 sm:p-8 shadow-[0_4px_25px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            {/* Ambient subtle light blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Details (5.5 cols) */}
              <div className="md:col-span-5 space-y-3 z-10">
                {/* Logo & Badge */}
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#7C3AED] text-white font-black text-xl flex items-center justify-center shadow-md shadow-purple-500/30">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#07152B]">Gurukul Coaching App</h3>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 text-[#7C3AED] text-[10px] font-bold">
                      Coming Soon (Oct 2026)
                    </span>
                  </div>
                </div>

                {/* Heading */}
                <h4 className="text-2xl sm:text-[26px] font-extrabold text-[#07152B] tracking-tight leading-tight pt-1">
                  Modern Learning for a Brighter Future.
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Complete coaching &amp; learning management system for institutions, teachers and students.
                </p>

                {/* Arrow Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenProductDemo?.("gurukul")}
                    className="w-10 h-10 rounded-xl bg-[#07152B] hover:bg-[#7C3AED] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Realistic 3D Mockup (6.5 cols) */}
              <div className="md:col-span-7 relative z-10 flex justify-center md:justify-end">
                <div className="w-full max-w-[320px] rounded-2xl bg-white border border-slate-200/90 p-3.5 shadow-2xl transform md:-rotate-2 md:scale-105 hover:rotate-0 transition-transform duration-500 space-y-2.5">
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-purple-600 text-white flex items-center justify-center text-[8px] font-bold">
                        G
                      </div>
                      <span className="text-[10.5px] font-bold text-slate-800">Gurukul</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                      <span className="text-[9px] text-purple-600 font-bold">Live Portal</span>
                    </div>
                  </div>

                  {/* Mockup Inner Grid: Sidebar + Main Content */}
                  <div className="grid grid-cols-12 gap-2">
                    {/* Sidebar Menu */}
                    <div className="col-span-4 space-y-1 pr-1 border-r border-slate-100 text-[9px] text-slate-500">
                      <div className="px-1.5 py-1 rounded bg-purple-50 text-purple-700 font-bold">Dashboard</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Classes</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Students</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Assessments</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Certificates</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Reports</div>
                    </div>

                    {/* Main Content: Live Classes + Schedule */}
                    <div className="col-span-8 space-y-2">
                      <div className="bg-purple-50/70 p-2 rounded-xl border border-purple-100 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] font-bold text-slate-500">Live Classes</span>
                          <span className="text-[8px] font-bold text-purple-700 bg-purple-100 px-1 rounded">
                            Ongoing
                          </span>
                        </div>
                        <div className="h-12 bg-white rounded-lg border border-purple-100 flex items-center justify-center gap-2 p-1.5">
                          <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                            🧑‍🏫
                          </div>
                          <div className="leading-tight">
                            <div className="text-[9px] font-bold text-slate-800">Physics - Grade 12</div>
                            <div className="text-[8px] text-slate-400">42 Students Online</div>
                          </div>
                        </div>
                      </div>

                      {/* Today's Schedule */}
                      <div className="space-y-1">
                        <span className="text-[8px] font-bold text-slate-400">Today&apos;s Schedule</span>
                        <div className="flex items-center gap-1.5 text-[8.5px] text-slate-700 bg-white p-1 rounded border border-slate-100">
                          <Clock className="w-3 h-3 text-purple-600 flex-shrink-0" />
                          <span className="truncate">Maths Mock Exam • 4:00 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARD 3: MakeGSTBill (Middle-Left) */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-[32px] bg-gradient-to-br from-[#FFF3EE] via-[#FFF8F5] to-white border border-orange-100 p-6 sm:p-8 shadow-[0_4px_25px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            {/* Ambient subtle light blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Details (5.5 cols) */}
              <div className="md:col-span-5 space-y-3 z-10">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-xl bg-white border border-orange-200 shadow-xs flex items-center gap-0.5">
                    <span className="font-black text-[#EA4335] text-xs">M</span>
                    <span className="font-black text-[#FBBC05] text-xs">G</span>
                    <span className="font-black text-[#4285F4] text-xs">B</span>
                  </div>
                  <h3 className="text-base font-black text-[#07152B]">MakeGSTBill</h3>
                </div>

                {/* Heading */}
                <h4 className="text-2xl sm:text-[26px] font-extrabold text-[#07152B] tracking-tight leading-tight pt-1">
                  GST Billing Made Easy for Everyone.
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Simple and powerful GST billing &amp; accounting software for Indian businesses.
                </p>

                {/* Arrow Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenProductDemo?.("makegstbill")}
                    className="w-10 h-10 rounded-xl bg-[#07152B] hover:bg-[#EA4335] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Realistic 3D Mockup (6.5 cols) */}
              <div className="md:col-span-7 relative z-10 flex justify-center md:justify-end">
                <div className="w-full max-w-[320px] rounded-2xl bg-white border border-slate-200/90 p-3.5 shadow-2xl transform md:rotate-2 md:scale-105 hover:rotate-0 transition-transform duration-500 space-y-2.5">
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-gradient-to-r from-red-500 to-amber-500 text-white flex items-center justify-center text-[8px] font-bold">
                        M
                      </div>
                      <span className="text-[10.5px] font-bold text-slate-800">MakeGSTBill</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      GST Verified
                    </span>
                  </div>

                  {/* Mockup Inner Grid */}
                  <div className="grid grid-cols-12 gap-2">
                    {/* Sidebar */}
                    <div className="col-span-4 space-y-1 pr-1 border-r border-slate-100 text-[9px] text-slate-500">
                      <div className="px-1.5 py-1 rounded bg-orange-50 text-orange-700 font-bold">Dashboard</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Invoices</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Inventory</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Customers</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Reports</div>
                      <div className="px-1.5 py-0.5 hover:text-slate-800">Settings</div>
                    </div>

                    {/* Main Invoice Form Area */}
                    <div className="col-span-8 space-y-2">
                      <div className="text-[10px] font-black text-slate-900">Create Invoice</div>
                      
                      <div className="space-y-1">
                        <span className="text-[8px] text-slate-400 font-bold">Customer</span>
                        <div className="bg-slate-50 border border-slate-200 rounded p-1 text-[8.5px] text-slate-700 flex justify-between items-center">
                          <span>Select Customer</span>
                          <span className="text-slate-400 text-[7px]">▼</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[8px] text-slate-400 font-bold">Invoice Items</span>
                        <div className="grid grid-cols-2 gap-1 text-[8px]">
                          <div className="bg-slate-50 p-1 rounded border border-slate-100 text-slate-400">HSN/SAC</div>
                          <div className="bg-slate-50 p-1 rounded border border-slate-100 text-slate-400">Item Name</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="w-full py-1 rounded bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Plus className="w-2.5 h-2.5" />
                        <span>+ Add Item</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARD 4: GoldenGST (Middle-Right) */}
          {/* ------------------------------------------------------------- */}
          <div className="rounded-[32px] bg-gradient-to-br from-[#FFF7EA] via-[#FFFDF5] to-white border border-amber-100 p-6 sm:p-8 shadow-[0_4px_25px_rgba(7,21,43,0.04)] relative overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            {/* Ambient subtle light blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Details (5.5 cols) */}
              <div className="md:col-span-5 space-y-3 z-10">
                {/* Logo */}
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#601414] text-amber-400 font-black text-lg flex items-center justify-center shadow-md border border-amber-400/40">
                    G
                  </div>
                  <h3 className="text-base font-black text-[#07152B]">GoldenGST</h3>
                </div>

                {/* Heading */}
                <h4 className="text-2xl sm:text-[26px] font-extrabold text-[#07152B] tracking-tight leading-tight pt-1">
                  Advanced GST &amp; Business Suite.
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  A complete business suite with advanced accounting, multi-branch management and powerful analytics.
                </p>

                {/* Arrow Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenProductDemo?.("goldengst")}
                    className="w-10 h-10 rounded-xl bg-[#07152B] hover:bg-[#D97706] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Realistic 3D Mockup (6.5 cols, Dark Mode ERP) */}
              <div className="md:col-span-7 relative z-10 flex justify-center md:justify-end">
                <div className="w-full max-w-[320px] rounded-2xl bg-[#140D0B] text-white border border-amber-900/50 p-3.5 shadow-2xl transform md:-rotate-2 md:scale-105 hover:rotate-0 transition-transform duration-500 space-y-2.5">
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-amber-900/40">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-amber-600 text-slate-950 flex items-center justify-center text-[8px] font-bold">
                        G
                      </div>
                      <span className="text-[10.5px] font-bold text-amber-200">GoldenGST</span>
                    </div>
                    <span className="text-[9px] font-mono text-amber-400 font-bold">
                      ERP Enterprise
                    </span>
                  </div>

                  {/* Mockup Inner Grid */}
                  <div className="grid grid-cols-12 gap-2">
                    {/* Sidebar */}
                    <div className="col-span-4 space-y-1 pr-1 border-r border-amber-900/40 text-[9px] text-slate-400">
                      <div className="px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 font-bold border border-amber-800/40">Dashboard</div>
                      <div className="px-1.5 py-0.5 hover:text-amber-100">Accounting</div>
                      <div className="px-1.5 py-0.5 hover:text-amber-100">Inventory</div>
                      <div className="px-1.5 py-0.5 hover:text-amber-100">Sales</div>
                      <div className="px-1.5 py-0.5 hover:text-amber-100">Purchase</div>
                      <div className="px-1.5 py-0.5 hover:text-amber-100">Reports</div>
                      <div className="px-1.5 py-0.5 hover:text-amber-100">Compliance</div>
                    </div>

                    {/* Main Content: Sales Overview + Gold Bar Chart */}
                    <div className="col-span-8 space-y-2">
                      <div className="bg-amber-950/30 p-2 rounded-xl border border-amber-900/40">
                        <div className="text-[8px] text-amber-300/80 font-bold">Business Overview</div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-black text-amber-100">₹8,42,000</span>
                          <span className="text-[8px] font-bold text-emerald-400">+12%</span>
                        </div>
                      </div>

                      {/* Gold Bars */}
                      <div className="h-10 flex items-end justify-between gap-1 px-1 bg-black/40 rounded-lg p-1 border border-amber-950">
                        {[30, 45, 60, 50, 75, 90].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className={`flex-1 rounded-xs ${
                              i === 5 ? "bg-amber-400 shadow-xs shadow-amber-400/50" : "bg-amber-600/70"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Recent Transactions */}
                      <div className="space-y-0.5">
                        <span className="text-[7.5px] font-bold text-slate-400 uppercase">Recent Transactions</span>
                        <div className="flex justify-between text-[8px] text-slate-300 bg-amber-950/20 p-1 rounded border border-amber-900/20">
                          <span>INV-2026-09</span>
                          <span className="font-mono text-amber-300 font-bold">₹ 42,500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* CARD 5: FreeDeskPro (Full-Width Cinematic Bottom Banner) */}
        {/* ========================================================= */}
        <div className="rounded-[36px] bg-[#071E2D] text-white border border-teal-900/50 shadow-2xl relative overflow-hidden group">
          
          {/* High-res Photorealistic Workstation Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="/images/products/freedeskpro_desk.jpg"
              alt="FreeDeskPro Ultra-Fast Remote Desktop Workstation"
              fill
              className="object-cover object-center group-hover:scale-102 transition-transform duration-700 opacity-70"
            />
            {/* Cinematic Gradient Scrim: Dark on the left for text legibility, clear in center & right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#051622] via-[#051622]/85 via-40% to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#051622] via-transparent to-transparent z-10" />
          </div>

          {/* Banner Content Container */}
          <div className="relative z-20 p-8 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Description (5.5 cols) */}
            <div className="lg:col-span-5 space-y-4 max-w-xl">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#06B6D4] text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  P
                </div>
                <div>
                  <h3 className="text-xl font-black text-white leading-tight">FreeDeskPro</h3>
                  <span className="text-xs text-cyan-300 font-mono">Ultra Low-Latency Engine</span>
                </div>
              </div>

              {/* Main Headline */}
              <h4 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white tracking-tight leading-[1.12]">
                Secure &amp; Fast <br />
                Remote Access.
              </h4>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                A powerful remote desktop platform for individuals and teams with sub-30ms latency, multi-monitor switching, and bank-grade security.
              </p>

              {/* Action Button */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenProductDemo?.("freedeskpro")}
                  className="w-12 h-12 rounded-2xl bg-[#07152B] hover:bg-[#06B6D4] text-white flex items-center justify-center transition-all shadow-xl active:scale-95 cursor-pointer border border-white/20"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
                <span className="text-xs text-slate-300 font-bold">
                  Click to test live 60 FPS remote connection
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Active Sessions & Quick Connect Floating Glass UI (6.5 cols) */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div className="w-full max-w-[360px] rounded-3xl bg-[#0A1B28]/85 backdrop-blur-xl border border-cyan-500/30 p-5 shadow-2xl text-xs space-y-4">
                
                {/* Top Active Sessions Header */}
                <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-white text-sm">Active Sessions</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-400/30">
                    60 FPS • 18ms
                  </span>
                </div>

                {/* Session Nodes List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-slate-200 font-bold">DESKTOP-001</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      Live
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-slate-200 font-bold">LAPTOP-021</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      Live
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-500" />
                      <span className="font-mono text-slate-400">OFFICE-PC</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                      Idle
                    </span>
                  </div>
                </div>

                {/* Quick Connect Interactive Input */}
                <form onSubmit={handleQuickConnect} className="pt-2 border-t border-cyan-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-cyan-300">Quick Connect</span>
                    <span className="text-[9px] text-slate-400 font-mono">TLS 1.3</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter Device ID (e.g. 892-411)"
                      value={quickConnectId}
                      onChange={(e) => setQuickConnectId(e.target.value)}
                      className="flex-1 bg-slate-950/90 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      disabled={isConnecting}
                      className="px-4 py-2 rounded-xl bg-[#06B6D4] hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95 flex items-center gap-1 cursor-pointer"
                    >
                      {isConnecting ? "Connecting..." : "Connect"}
                    </button>
                  </div>

                  {connectedSession && (
                    <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[10px] flex items-center gap-1.5 animate-in fade-in">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Remote handshake established with {quickConnectId}!</span>
                    </div>
                  )}
                </form>

              </div>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
};
