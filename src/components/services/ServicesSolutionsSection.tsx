"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Users,
  TrendingUp,
  Play,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface ServicesSolutionsSectionProps {
  onExploreService?: (serviceName: string) => void;
}

export const ServicesSolutionsSection: React.FC<ServicesSolutionsSectionProps> = ({
  onExploreService,
}) => {
  const handleServiceClick = (serviceName: string) => {
    if (onExploreService) {
      onExploreService(serviceName);
    }
  };

  return (
    <section className="w-full pt-8 sm:pt-12 pb-12 sm:pb-16 bg-white relative">
      <Container size="wide">
        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-5 border-b border-slate-100">
          <div className="space-y-1.5 max-w-xl">
            {/* Eyebrow */}
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#556987] uppercase select-none block">
              OUR SERVICES
            </span>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#07152B] tracking-tight leading-[1.15]">
              Solutions for <br className="hidden sm:inline" />
              Every Business Need.
            </h2>
          </div>

          {/* Subtitle with accent dash */}
          <div className="max-w-md text-xs sm:text-sm text-[#556987] leading-relaxed self-start md:self-end">
            <p>
              We provide a complete range of digital services to help you build, scale and stay ahead. Explore our expertise and find the right solution for your business.
            </p>
            <div className="w-7 h-[2px] bg-[#1668E8] mt-2.5" />
          </div>
        </div>

        {/* 8 SERVICES ROWS (Tightly spaced and balanced) */}
        <div className="space-y-6 sm:space-y-8">
          {/* =========================================================
              ROW 01: Google My Business
              ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-5 rounded-2xl hover:bg-slate-50/60 transition-colors">
            {/* Left: Info */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-300 block select-none">
                01
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#07152B] tracking-tight">
                Google My Business
              </h3>
              <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
                Get discovered locally and grow your business on Google. We help you optimize, manage and scale your Google Business Profile for higher visibility, more calls and real customers.
              </p>
              <div className="pt-1">
                <Link
                  href="/services/google-my-business"
                  scroll={true}
                  className="inline-flex items-center gap-1.5 text-[#1668E8] font-bold text-xs sm:text-sm hover:text-[#1255C0] transition-colors group cursor-pointer"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Center: GMB Visual Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white p-1.5 transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/services/gmb_mockup.jpg"
                    alt="Google My Business Phone Mockup"
                    fill
                    sizes="(max-width: 640px) 280px, 384px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right: Feature Badges */}
            <div className="lg:col-span-3 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100/80">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Local Visibility</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100/80">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">More Customers</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100/80">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Business Growth</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              ROW 02: Web Development
              ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-5 rounded-2xl hover:bg-slate-50/60 transition-colors">
            {/* Left: Tech Stack Floating Badges */}
            <div className="lg:col-span-3 flex lg:flex-col flex-wrap justify-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white shadow-sm border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-[#21759B] text-white flex items-center justify-center font-bold text-xs">
                  W
                </div>
                <span className="text-xs font-bold text-[#07152B]">WordPress</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white shadow-sm border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-[#00D8FF] text-slate-900 flex items-center justify-center font-bold text-xs">
                  ⚛
                </div>
                <span className="text-xs font-bold text-[#07152B]">React / Next.js</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white shadow-sm border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-[#68A063] text-white flex items-center justify-center font-bold text-xs">
                  JS
                </div>
                <span className="text-xs font-bold text-[#07152B]">Node.js</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white shadow-sm border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-[#DD0031] text-white flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <span className="text-xs font-bold text-[#07152B]">Angular</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white shadow-sm border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-[#F7DF1E] text-black flex items-center justify-center font-bold text-xs">
                  JS
                </div>
                <span className="text-xs font-bold text-[#07152B]">JavaScript</span>
              </div>
            </div>

            {/* Center: Laptop Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white p-1.5 transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/services/laptop_mockup.jpg"
                    alt="Web Development Laptop Mockup"
                    fill
                    sizes="(max-width: 640px) 280px, 384px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-300 block select-none">
                02
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#07152B] tracking-tight">
                Web Development
              </h3>
              <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
                High-performance websites and web applications tailored to your business needs. From corporate sites to complex web apps, we build fast, secure and scalable solutions.
              </p>
              <div className="pt-1">
                <Link
                  href="/services/web-development"
                  scroll={true}
                  className="inline-flex items-center gap-1.5 text-[#1668E8] font-bold text-xs sm:text-sm hover:text-[#1255C0] transition-colors group cursor-pointer"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* =========================================================
              ROW 03: Mobile App Development
              ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-5 rounded-2xl hover:bg-slate-50/60 transition-colors">
            {/* Left: Info */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-300 block select-none">
                03
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#07152B] tracking-tight">
                Mobile App Development
              </h3>
              <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
                Engaging mobile apps for iOS, Android and cross-platform environments. We create intuitive and scalable apps that deliver exceptional user experiences.
              </p>
              <div className="pt-1">
                <Link
                  href="/services/app-development"
                  scroll={true}
                  className="inline-flex items-center gap-1.5 text-[#1668E8] font-bold text-xs sm:text-sm hover:text-[#1255C0] transition-colors group cursor-pointer"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Center: Dual Smartphone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white p-1.5 transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/services/mobile_phones.jpg"
                    alt="Mobile App Development Smartphones"
                    fill
                    sizes="(max-width: 640px) 280px, 384px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right: Feature Badges */}
            <div className="lg:col-span-3 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-orange-50/70 border border-orange-100/80">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  ⚡
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">iOS Development</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sky-50/70 border border-sky-100/80">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  📱
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Android Development</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-purple-50/70 border border-purple-100/80">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  🔄
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Cross-platform Apps</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100/80">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  🛡️
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Scalable & Secure</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              ROW 04: Digital Marketing
              ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-5 rounded-2xl hover:bg-slate-50/60 transition-colors">
            {/* Left & Center: Megaphone & Marketing Visuals */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white p-1.5 transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/services/marketing_megaphone.jpg"
                    alt="Digital Marketing 3D Megaphone and Analytics"
                    fill
                    sizes="(max-width: 640px) 280px, 384px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-300 block select-none">
                04
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#07152B] tracking-tight">
                Digital Marketing
              </h3>
              <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
                Data-driven marketing strategies to grow your brand online. From social media, ads and content to email marketing, we help you reach the right audience and drive real results.
              </p>
              <div className="pt-1">
                <Link
                  href="/services/digital-marketing"
                  scroll={true}
                  className="inline-flex items-center gap-1.5 text-[#1668E8] font-bold text-xs sm:text-sm hover:text-[#1255C0] transition-colors group cursor-pointer"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* =========================================================
              ROW 05: Branding
              ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-5 rounded-2xl hover:bg-slate-50/60 transition-colors">
            {/* Left: Info */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-300 block select-none">
                05
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#07152B] tracking-tight">
                Branding
              </h3>
              <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
                Build a strong and memorable brand identity. From logo design to brand strategy, we create visuals and communication that set you apart.
              </p>
              <div className="pt-1">
                <Link
                  href="/services/branding"
                  scroll={true}
                  className="inline-flex items-center gap-1.5 text-[#1668E8] font-bold text-xs sm:text-sm hover:text-[#1255C0] transition-colors group cursor-pointer"
                >
                  <span>Explore Branding</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Center: Branding Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white p-1.5 transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/services/branding_mockup.jpg"
                    alt="Branding Identity Stationery"
                    fill
                    sizes="(max-width: 640px) 280px, 384px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right: Features */}
            <div className="lg:col-span-3 flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-[#1668E8] flex items-center justify-center font-bold text-xs shadow-sm">
                  🎨
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Logo Design</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-[#1668E8] flex items-center justify-center font-bold text-xs shadow-sm">
                  🎯
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Brand Strategy</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-[#1668E8] flex items-center justify-center font-bold text-xs shadow-sm">
                  👁️
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Visual Identity</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-[#1668E8] flex items-center justify-center font-bold text-xs shadow-sm">
                  📖
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Brand Guidelines</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              ROW 06: UI/UX Design
              ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-5 rounded-2xl hover:bg-slate-50/60 transition-colors">
            {/* Left / Center: UI/UX Wireframe App Mockup */}
            <div className="lg:col-span-7 flex justify-center">
              <Link
                href="/services/ui-ux"
                scroll={true}
                className="block relative w-full max-w-xs sm:max-w-sm h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white p-1.5 transition-transform duration-300 hover:scale-[1.02] cursor-pointer group"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/images/services/uiux_mockup.jpg"
                    alt="UI/UX Design for People App Mockup"
                    fill
                    sizes="(max-width: 640px) 280px, 384px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-300 block select-none">
                06
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#07152B] tracking-tight">
                UI/UX Design
              </h3>
              <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
                User-centered designs that combine aesthetics with functionality. We create intuitive and engaging experiences that attract, retain and convert users.
              </p>
              <div className="pt-1">
                <Link
                  href="/services/ui-ux"
                  scroll={true}
                  className="inline-flex items-center gap-1.5 text-[#1668E8] font-bold text-xs sm:text-sm hover:text-[#1255C0] transition-colors group cursor-pointer"
                >
                  <span>Explore UI/UX</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* =========================================================
              ROW 07: Animation VFX
              ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-5 rounded-2xl hover:bg-slate-50/60 transition-colors">
            {/* Left: Info */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-300 block select-none">
                07
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#07152B] tracking-tight">
                Animation VFX
              </h3>
              <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
                Bring your ideas to life with stunning animation and visual effects. From 2D/3D animation to motion graphics and VFX, we create captivating visual content for web, apps and ads.
              </p>
              <div className="pt-1">
                <Link
                  href="/services/animation-vfx"
                  scroll={true}
                  className="inline-flex items-center gap-1.5 text-[#1668E8] font-bold text-xs sm:text-sm hover:text-[#1255C0] transition-colors group cursor-pointer"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Center: 3D Astronaut Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-gradient-to-br from-blue-900 to-indigo-950 p-1.5 transition-transform duration-300 hover:scale-[1.02] group">
                <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/services/vfx_astronaut.jpg"
                    alt="3D VFX Animation Astronaut"
                    fill
                    sizes="(max-width: 640px) 280px, 384px"
                    className="object-cover"
                    loading="lazy"
                  />
                  {/* Floating Video Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Tool Badges & Feature Items */}
            <div className="lg:col-span-3 flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">Blender</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">Ae</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700">Pr</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">C4D</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-lg bg-white text-[#1668E8] flex items-center justify-center font-bold text-xs shadow-sm">
                  🎬
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">2D/3D Animation</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-lg bg-white text-[#1668E8] flex items-center justify-center font-bold text-xs shadow-sm">
                  ✨
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Motion Graphics</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-lg bg-white text-[#1668E8] flex items-center justify-center font-bold text-xs shadow-sm">
                  💥
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Visual Effects (VFX)</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-7 h-7 rounded-lg bg-white text-[#1668E8] flex items-center justify-center font-bold text-xs shadow-sm">
                  📹
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#07152B]">Video Content</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              ROW 08: Studio XSW
              ========================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center p-4 sm:p-5 rounded-2xl hover:bg-slate-50/60 transition-colors">
            {/* Left / Center: Studio Showcase Image + Creative Badges */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white p-1.5 transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                  <Image
                    src="/images/services/studio_xsw.webp"
                    alt="Studio XSW Visual & Cinematic Archive"
                    fill
                    sizes="(max-width: 640px) 280px, 384px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Studio Creative Badges */}
              <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-[11px]">
                  Cinematic 8K
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-extrabold text-[11px]">
                  Wildlife Archive
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-extrabold text-[11px]">
                  Natural Encounters
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-extrabold text-[11px]">
                  Field Production
                </span>
              </div>
            </div>

            {/* Right: Info */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-300 block select-none">
                08
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#07152B] tracking-tight">
                Studio XSW
              </h3>
              <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
                Cinematic wildlife archives, natural history documentation, and high-end visual production. Capturing authentic natural encounters through extreme patience, advanced camera trapping, and zero environmental intervention.
              </p>
              <div className="pt-1">
                <Link
                  href="/services/studio-xsw"
                  scroll={true}
                  className="inline-flex items-center gap-1.5 text-[#1668E8] font-bold text-xs sm:text-sm hover:text-[#1255C0] transition-colors group cursor-pointer"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM CONVERSION CARD: "Ready to Transform Your Business?"
            ========================================================= */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#EBF3FE] via-[#EDF5FF] to-[#E3EFFF] border border-blue-200/80 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
          {/* Subtle Right Ribbon Decorative Silhouette */}
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-blue-300/30 to-transparent pointer-events-none" />

          {/* Left Text */}
          <div className="space-y-1.5 relative z-10 max-w-xl">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#1668E8] uppercase block">
              LET&apos;S BUILD TOGETHER
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#07152B] tracking-tight">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xs sm:text-sm text-[#556987] leading-relaxed">
              Get a free consultation and discover how our services can help you achieve your goals.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 relative z-10 flex-shrink-0 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={() => handleServiceClick("General Consultation")}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-[#1668E8] hover:bg-[#1255C0] text-white text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <Link
              href="/contact"
              className="px-5 sm:px-6 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#07152B] border border-slate-200 text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
