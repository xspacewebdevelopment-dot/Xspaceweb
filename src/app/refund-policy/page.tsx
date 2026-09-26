"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  FileText,
  Target,
  Shield,
  Monitor,
  Code2,
  Megaphone,
  Database,
  Globe,
  XCircle,
  Ban,
  Mail,
  Clock,
  RefreshCw,
  Phone,
  ShieldCheck,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface TOCItem {
  id: string;
  number: string;
  title: string;
}

const tocItems: TOCItem[] = [
  { id: "intro", number: "01", title: "Introduction" },
  { id: "scope", number: "02", title: "Scope of This Policy" },
  { id: "principles", number: "03", title: "General Refund Principles" },
  { id: "website-consultation", number: "04", title: "Website & Consultation Services" },
  { id: "development-design", number: "05", title: "Development & Design Projects" },
  { id: "digital-marketing", number: "06", title: "Digital Marketing Services" },
  { id: "saas-subscriptions", number: "07", title: "SaaS Products & Subscriptions" },
  { id: "domain-hosting", number: "08", title: "Domain, Hosting & Third-Party Services" },
  { id: "cancellation-policy", number: "09", title: "Cancellation Policy" },
  { id: "non-refundable", number: "10", title: "Non-Refundable Items" },
  { id: "how-to-request", number: "11", title: "How to Request a Refund" },
  { id: "processing-time", number: "12", title: "Refund Processing Time" },
  { id: "changes-to-policy", number: "13", title: "Changes to This Policy" },
  { id: "contact-us", number: "14", title: "Contact Us" },
];

export default function RefundPolicyPage() {
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
      {/* HERO BANNER: DARK NAVY WITH 3D REFUND WALLET GRAPHIC */}
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
                Refund <span className="text-[#1668E8]">Policy</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl pt-1">
                We believe in transparency and fair business practices. This Refund Policy explains the terms and conditions for cancellations and refunds for our services and products.
              </p>

              {/* Last Updated Badge */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 font-medium">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Last updated: 01 October 2026</span>
              </div>
            </div>

            {/* Right Column: 3D Refund Graphic */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[440px] h-[220px] sm:h-[260px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/images/legal/refund_hero.jpg"
                  alt="Refund policy 3D illustration"
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
      {/* MAIN BODY: STICKY TOC SIDEBAR + 14 SECTIONS */}
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

            {/* RIGHT MAIN CONTENT: The 14 Detailed Refund Policy Sections (8.5 Cols) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-4 sm:space-y-5">
              
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
                      At XSPACEWEB, we strive to provide high-quality digital services and products. We understand that certain circumstances may require a cancellation or refund. This Refund Policy explains our refund and cancellation terms in a clear and transparent manner.
                    </p>
                  </div>
                </div>
              </div>

              {/* 02. Scope of This Policy */}
              <div
                id="scope"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      02
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Target className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Scope of This Policy
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      This policy applies to all services and products offered by XSPACEWEB PRIVATE LIMITED, including website development, application development, digital marketing, design services, consulting, SaaS products, domain/hosting services (where applicable), and any other paid services listed on our website or offered through our team.
                    </p>
                  </div>
                </div>
              </div>

              {/* 03. General Refund Principles */}
              <div
                id="principles"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      03
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Shield className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      General Refund Principles
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Refunds are provided only under circumstances specified in this policy. Each service or product may have different refund conditions based on the nature of the work, resources involved and third-party dependencies. Refunds are not guaranteed for all purchases or services.
                    </p>
                  </div>
                </div>
              </div>

              {/* 04. Website & Consultation Services */}
              <div
                id="website-consultation"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      04
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Monitor className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Website & Consultation Services
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      For consultation services or small website packages, refund eligibility (if any) will be mentioned in the specific proposal, quotation or invoice. If work has already started or significant resources have been allocated, a refund may not be possible.
                    </p>
                  </div>
                </div>
              </div>

              {/* 05. Development & Design Projects */}
              <div
                id="development-design"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      05
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Code2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Development & Design Projects
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      For custom development, app development, UI/UX design, or other project-based services, refunds are generally not available once work has commenced. However, if a project is cancelled before work starts, we may consider a partial or full refund depending on the situation.
                    </p>
                  </div>
                </div>
              </div>

              {/* 06. Digital Marketing Services */}
              <div
                id="digital-marketing"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      06
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Megaphone className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Digital Marketing Services
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Digital marketing services such as SEO, social media marketing, Google Ads, Meta Ads, etc. are monthly and ongoing services. Due to the nature of these services and third-party platform costs, refunds are generally not provided for completed work or ad spend. Unused ad balance (if any) may be handled as per platform policies.
                    </p>
                  </div>
                </div>
              </div>

              {/* 07. SaaS Products & Subscriptions */}
              <div
                id="saas-subscriptions"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      07
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Database className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      SaaS Products & Subscriptions
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      For XSPACEWEB&apos;s SaaS products, refunds (if applicable) will be mentioned on the product pricing or subscription page. In most cases, subscription fees are non-refundable due to immediate access to digital services and infrastructure costs. In certain cases, we may offer a refund within a specific period (e.g., 7 days from purchase) if the product is not used, as specified at the time of purchase.
                    </p>
                  </div>
                </div>
              </div>

              {/* 08. Domain, Hosting & Third-Party Services */}
              <div
                id="domain-hosting"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      08
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Domain, Hosting & Third-Party Services
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Services such as domain registration, hosting, cloud infrastructure, email services or other third-party services are subject to the refund policies of the respective providers. XSPACEWEB does not control the refund policies of third-party providers and cannot guarantee refunds for such services.
                    </p>
                  </div>
                </div>
              </div>

              {/* 09. Cancellation Policy */}
              <div
                id="cancellation-policy"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      09
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <XCircle className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Cancellation Policy
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      You may request a cancellation as per the terms mentioned in your proposal, agreement or product page. Cancellation requests must be submitted in writing via email. Approval of cancellation is at the sole discretion of XSPACEWEB.
                    </p>
                  </div>
                </div>
              </div>

              {/* 10. Non-Refundable Items */}
              <div
                id="non-refundable"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200 space-y-3"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      10
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Ban className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Non-Refundable Items
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Refunds will generally not be provided for:
                    </p>
                    <ul className="space-y-1.5 pt-1">
                      {[
                        "Completed work or delivered digital products",
                        "Customised projects and bespoke development",
                        "Third-party costs (domain, hosting, software licences, ad spend, etc.)",
                        "Late cancellation after work has started",
                        "Change of mind or personal reasons",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#556987]">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 11. How to Request a Refund */}
              <div
                id="how-to-request"
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
                      How to Request a Refund
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      To request a refund, please email us at{" "}
                      <a href="mailto:support@xspaceweb.com" className="text-[#1668E8] font-bold hover:underline">
                        support@xspaceweb.com
                      </a>{" "}
                      with your order details, reason for the request and any relevant information. Our team will review your request and respond within the specified timeframe.
                    </p>
                  </div>
                </div>
              </div>

              {/* 12. Refund Processing Time */}
              <div
                id="processing-time"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      12
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Refund Processing Time
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      If a refund is approved, the amount (if applicable) will be processed within 7-14 business days to the original payment method, depending on your bank or payment provider.
                    </p>
                  </div>
                </div>
              </div>

              {/* 13. Changes to This Policy */}
              <div
                id="changes-to-policy"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      13
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Changes to This Policy
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We may update this Refund Policy from time to time to reflect changes in our services, pricing, technology or legal requirements. Any changes will be posted on this page with an updated effective date.
                    </p>
                  </div>
                </div>
              </div>

              {/* 14. Contact Us */}
              <div
                id="contact-us"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      14
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Contact Us
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      If you have any questions about this Refund Policy, please contact us:
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
                  Refunds are provided only under the terms mentioned in this policy and applicable agreements. Please read this policy carefully before making a purchase or engaging our services.
                </p>
              </div>
            </div>

            {/* 3 Quick Features on Right */}
            <div className="flex items-center gap-5 sm:gap-6 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#07152B]">
                <FileText className="w-4 h-4 text-[#1668E8]" />
                <span>Transparent Policy</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#07152B]">
                <Shield className="w-4 h-4 text-[#1668E8]" />
                <span>Fair & Clear Process</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#07152B]">
                <UserCheck className="w-4 h-4 text-[#1668E8]" />
                <span>Customer Support</span>
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
                If you have any questions or concerns about our Refund Policy, feel free to reach out.
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
