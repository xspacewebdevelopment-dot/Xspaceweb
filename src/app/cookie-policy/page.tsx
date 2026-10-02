"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  FileText,
  Cookie,
  Settings,
  LayoutGrid,
  Table as TableIcon,
  Share2,
  Sliders,
  ShieldCheck,
  Shield,
  Ban,
  RefreshCw,
  Mail,
  Phone,
  ArrowRight,
  BarChart3,
  Megaphone,
  CheckCircle2,
  Database,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface TOCItem {
  id: string;
  number: string;
  title: string;
}

const tocItems: TOCItem[] = [
  { id: "intro", number: "01", title: "Introduction" },
  { id: "what-are-cookies", number: "02", title: "What Are Cookies?" },
  { id: "how-we-use", number: "03", title: "How We Use Cookies" },
  { id: "types-of-cookies", number: "04", title: "Types of Cookies We Use" },
  { id: "detailed-info", number: "05", title: "Detailed Cookie Information" },
  { id: "third-party", number: "06", title: "Third-Party Cookies" },
  { id: "managing-preferences", number: "07", title: "Managing Your Preferences" },
  { id: "consent-control", number: "08", title: "Consent and Control" },
  { id: "disabling-cookies", number: "09", title: "Impact of Disabling Cookies" },
  { id: "updates", number: "10", title: "Updates to This Policy" },
  { id: "contact-us", number: "11", title: "Contact Us" },
];

const cookieTableData = [
  {
    type: "Essential Cookies",
    purpose: "Required for core website functionality, security and performance.",
    examples: "Session ID, Security Tokens",
    duration: "Session / Persistent",
  },
  {
    type: "Analytics Cookies",
    purpose: "Help us analyse website traffic, user behaviour and improve our site.",
    examples: "Google Analytics, Page Views",
    duration: "Persistent (up to 2 years)",
  },
  {
    type: "Functional Cookies",
    purpose: "Remember your preferences and settings (e.g. language, region).",
    examples: "User Preferences, Theme Settings",
    duration: "Persistent (up to 1 year)",
  },
  {
    type: "Marketing Cookies",
    purpose: "Used to show relevant ads and measure campaign performance.",
    examples: "Google Ads, Meta Pixel, LinkedIn Insight Tag",
    duration: "Persistent (up to 1 year)",
  },
];

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("intro");

  // Scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full bg-[#FAFCFF] text-[#0A1128] pb-16">
      
      {/* ========================================================= */}
      {/* HERO BANNER: DARK NAVY WITH 3D GLASS COOKIE GRAPHIC */}
      {/* ========================================================= */}
      <section className="w-full bg-[#07152B] text-white pt-8 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Ambient Blue Background Lighting */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Summary */}
            <div className="lg:col-span-7 space-y-3.5 z-10">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase select-none">
                  LEGAL
                </span>
                <div className="w-12 h-[1px] bg-slate-600/70" />
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1]">
                Cookie <span className="text-[#1668E8]">Policy</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl pt-1">
                This Cookie Policy explains how XSPACEWEB uses cookies and similar technologies on our website and platform to enhance your browsing experience, understand usage, and improve our services.
              </p>

              {/* Last Updated Badge */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 font-medium">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Last updated: 01 October 2026</span>
              </div>
            </div>

            {/* Right Column: 3D Cookie Graphic */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[440px] h-[220px] sm:h-[260px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/images/legal/cookie_hero.jpg"
                  alt="Cookie policy security illustration"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ========================================================= */}
      {/* MAIN BODY: STICKY TOC SIDEBAR + 11 SECTIONS */}
      {/* ========================================================= */}
      <section className="w-full pt-10 sm:pt-12 pb-10">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR: "On This Page" Table of Contents (3.5 Cols) */}
            <div className="lg:col-span-4 xl:col-span-3 sticky top-24 hidden lg:block">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                <h3 className="text-xs font-black tracking-[0.15em] text-[#07152B] uppercase mb-3.5">
                  On This Page
                </h3>

                <nav className="space-y-1">
                  {tocItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#EFF6FF] text-[#1668E8] font-bold shadow-2xs"
                            : "text-[#556987] hover:bg-slate-50 hover:text-[#07152B]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            isActive ? "bg-[#1668E8]" : "bg-slate-300"
                          }`}
                        />
                        <span className="text-[11px] opacity-75">{item.number}.</span>
                        <span className="truncate">{item.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* RIGHT MAIN CONTENT: The 11 Detailed Policy Sections (8.5 Cols) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              
              {/* 01. Introduction */}
              <div
                id="intro"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      01
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Introduction
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      At XSPACEWEB, we use cookies and similar technologies to make our website work properly, enhance your experience, analyse usage, and help us improve our services, products and marketing. This Cookie Policy explains what cookies are, how we use them, and how you can manage your preferences.
                    </p>
                  </div>
                </div>
              </div>

              {/* 02. What Are Cookies? */}
              <div
                id="what-are-cookies"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      02
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Cookie className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      What Are Cookies?
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Cookies are small text files that are stored on your device (computer, mobile phone or tablet) when you visit a website. They help the website remember your actions and preferences (for a certain period of time) so you don&apos;t have to re-enter them every time you visit.
                    </p>
                  </div>
                </div>
              </div>

              {/* 03. How We Use Cookies */}
              <div
                id="how-we-use"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      03
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      How We Use Cookies
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We use cookies to ensure our website functions properly, remember your preferences, understand how visitors use our website, improve our products and services, and deliver relevant content and communications.
                    </p>
                  </div>
                </div>
              </div>

              {/* 04. Types of Cookies We Use (With 4 Grid Feature Cards) */}
              <div
                id="types-of-cookies"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200 space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      04
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Types of Cookies We Use
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We use different types of cookies, each serving a specific purpose.
                    </p>
                  </div>
                </div>

                {/* 4 Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 pt-1">
                  {/* Card 1: Essential */}
                  <div className="bg-[#EFF6FF]/70 rounded-xl p-3.5 border border-blue-100 flex flex-col justify-between">
                    <div>
                      <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center mb-2 shadow-2xs">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-[#07152B]">
                        Essential Cookies
                      </h4>
                      <p className="text-[11px] text-[#556987] leading-snug mt-1">
                        Necessary for the website to function properly.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Analytics */}
                  <div className="bg-[#ECFDF5]/70 rounded-xl p-3.5 border border-emerald-100 flex flex-col justify-between">
                    <div>
                      <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center mb-2 shadow-2xs">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-[#07152B]">
                        Analytics Cookies
                      </h4>
                      <p className="text-[11px] text-[#556987] leading-snug mt-1">
                        Help us understand how visitors use our website.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Marketing */}
                  <div className="bg-[#FAF5FF]/70 rounded-xl p-3.5 border border-purple-100 flex flex-col justify-between">
                    <div>
                      <div className="w-7 h-7 rounded-lg bg-purple-500 text-white flex items-center justify-center mb-2 shadow-2xs">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-[#07152B]">
                        Marketing Cookies
                      </h4>
                      <p className="text-[11px] text-[#556987] leading-snug mt-1">
                        Used to deliver relevant ads and measure performance.
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Functional */}
                  <div className="bg-[#FFFBEB]/70 rounded-xl p-3.5 border border-amber-100 flex flex-col justify-between">
                    <div>
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center mb-2 shadow-2xs">
                        <Settings className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-[#07152B]">
                        Functional Cookies
                      </h4>
                      <p className="text-[11px] text-[#556987] leading-snug mt-1">
                        Remember your preferences and customize experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 05. Detailed Cookie Information (Structured Responsive Table) */}
              <div
                id="detailed-info"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200 space-y-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      05
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <TableIcon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Detailed Cookie Information
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Below are the main categories of cookies we use on our website and their purposes:
                    </p>
                  </div>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto rounded-xl border border-slate-200/90">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[#07152B] font-black">
                        <th className="py-2.5 px-3.5">Cookie Type</th>
                        <th className="py-2.5 px-3.5">Purpose</th>
                        <th className="py-2.5 px-3.5">Examples</th>
                        <th className="py-2.5 px-3.5">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[#556987]">
                      {cookieTableData.map((row) => (
                        <tr key={row.type} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-2.5 px-3.5 font-bold text-[#07152B] whitespace-nowrap">
                            {row.type}
                          </td>
                          <td className="py-2.5 px-3.5 leading-snug">
                            {row.purpose}
                          </td>
                          <td className="py-2.5 px-3.5 leading-snug">
                            {row.examples}
                          </td>
                          <td className="py-2.5 px-3.5 whitespace-nowrap font-medium text-[#07152B]">
                            {row.duration}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 06. Third-Party Cookies */}
              <div
                id="third-party"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      06
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Share2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Third-Party Cookies
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We may use third-party services such as Google Analytics, Google Ads, Meta (Facebook/Instagram), LinkedIn and other trusted partners who may set cookies on your device. These third parties have their own privacy and cookie policies.
                    </p>
                  </div>
                </div>
              </div>

              {/* 07. Managing Your Preferences */}
              <div
                id="managing-preferences"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      07
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Sliders className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Managing Your Preferences
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      You can manage or disable cookies through your browser settings. You can also use our cookie consent banner to accept or reject non-essential cookies.
                    </p>
                  </div>
                </div>
              </div>

              {/* 08. Consent and Control */}
              <div
                id="consent-control"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      08
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Consent and Control
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      When you first visit our website, we ask for your consent to use non-essential cookies (such as analytics and marketing cookies). You can change or withdraw your consent at any time through the cookie settings on our website.
                    </p>
                  </div>
                </div>
              </div>

              {/* 09. Impact of Disabling Cookies */}
              <div
                id="disabling-cookies"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      09
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Ban className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Impact of Disabling Cookies
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      If you disable certain cookies, some features of our website may not function properly, and your overall experience may be limited.
                    </p>
                  </div>
                </div>
              </div>

              {/* 10. Updates to This Policy */}
              <div
                id="updates"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      10
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Updates to This Policy
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We may update this Cookie Policy from time to time to reflect changes in our practices, technology or legal requirements. Any updates will be posted on this page with a revised effective date.
                    </p>
                  </div>
                </div>
              </div>

              {/* 11. Contact Us */}
              <div
                id="contact-us"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      11
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Contact Us
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      If you have any questions about our use of cookies, please contact us:
                    </p>
                    <div className="pt-1 text-xs text-[#07152B] font-semibold flex flex-wrap gap-x-4 gap-y-1">
                      <span>Email: <a href="mailto:support@xspaceweb.com" className="text-[#1668E8] hover:underline">support@xspaceweb.com</a></span>
                      <span>Phone: <a href="tel:+918292526386" className="hover:text-[#1668E8]">+91 8292526386</a> | <a href="tel:+917979099017" className="hover:text-[#1668E8]">+91 7979099017</a></span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </section>

      {/* ========================================================= */}
      {/* BOTTOM BANNERS: IMPORTANT NOTICE + WE ARE HERE TO HELP */}
      {/* ========================================================= */}
      <section className="w-full pt-2 pb-6">
        <Container size="wide" className="space-y-4">
          
          {/* Banner 1: Important Notice */}
          <div className="rounded-[20px] bg-[#EEF5FE] border border-blue-200/80 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#07152B]">
                  Important Notice
                </h3>
                <p className="text-xs text-[#556987] mt-0.5">
                  By using our website and services, you agree to the use of cookies in accordance with this Cookie Policy.
                </p>
              </div>
            </div>

            {/* 3 Quick Features on Right */}
            <div className="flex items-center gap-5 sm:gap-6 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#07152B]">
                <Settings className="w-4 h-4 text-[#1668E8]" />
                <span>Your Choice</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#07152B]">
                <Shield className="w-4 h-4 text-[#1668E8]" />
                <span>Privacy Focused</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#07152B]">
                <Database className="w-4 h-4 text-[#1668E8]" />
                <span>Transparent Use</span>
              </div>
            </div>
          </div>

          {/* Banner 2: We are here to help Strip */}
          <div className="rounded-[20px] bg-white border border-slate-200/90 p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-lg font-black text-[#07152B]">
                We are here to <span className="text-[#1668E8]">help.</span>
              </h3>
              <p className="text-xs text-[#556987]">
                If you have any questions or concerns about our Cookie Policy, feel free to reach out.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Email */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1668E8] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <a href="mailto:support@xspaceweb.com" className="text-xs font-bold text-[#1668E8] hover:underline block leading-tight">
                    support@xspaceweb.com
                  </a>
                  <span className="text-[10px] text-[#556987]">General Inquiries</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1668E8] flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#07152B] leading-tight">
                    +91 8292526386 / +91 7979099017
                  </div>
                  <span className="text-[10px] text-[#556987]">Mon - Sat Support</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1668E8] text-white text-xs sm:text-[13px] font-bold hover:bg-[#1255C0] shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Contact Us Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </Container>
      </section>

    </div>
  );
}
