"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  FileText,
  User,
  ShieldCheck,
  Settings,
  Users,
  CreditCard,
  Shield,
  Code2,
  Link2,
  Server,
  Ban,
  Lock,
  Eye,
  Database,
  MessageSquare,
  Megaphone,
  Award,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface TOCItem {
  id: string;
  number: string;
  title: string;
}

const tocItems: TOCItem[] = [
  { id: "intro", number: "01", title: "Introduction" },
  { id: "definitions", number: "02", title: "Definitions" },
  { id: "acceptance", number: "03", title: "Acceptance of Terms" },
  { id: "our-services", number: "04", title: "Our Services" },
  { id: "engagement", number: "05", title: "Project Engagement" },
  { id: "client-responsibilities", number: "06", title: "Client Responsibilities" },
  { id: "fees-payments", number: "07", title: "Fees & Payments" },
  { id: "intellectual-property", number: "08", title: "Intellectual Property" },
  { id: "source-code", number: "09", title: "Source Code & Software" },
  { id: "third-party", number: "10", title: "Third-Party Services" },
  { id: "availability", number: "11", title: "Website & Software Availability" },
  { id: "acceptable-use", number: "12", title: "Acceptable Use" },
  { id: "cybersecurity", number: "13", title: "Cybersecurity" },
  { id: "confidentiality", number: "14", title: "Confidentiality" },
  { id: "data-privacy", number: "15", title: "Data Protection & Privacy" },
  { id: "user-content", number: "16", title: "User Content" },
  { id: "feedback", number: "17", title: "Feedback" },
  { id: "marketing-rights", number: "18", title: "Marketing & Portfolio Rights" },
  { id: "warranties", number: "19", title: "Warranties" },
];

export default function TermsConditionsPage() {
  const [activeSection, setActiveSection] = useState<string>("intro");

  // Scroll spy to highlight active section in TOC
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
      {/* HERO BANNER: DARK NAVY WITH 3D LEGAL DOCUMENT GRAPHIC */}
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
                Terms &amp; <span className="text-[#1668E8]">Conditions</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl pt-1">
                These Terms &amp; Conditions govern your use of the XSPACEWEB website, products, services and all related platforms. Please read them carefully before using our services.
              </p>

              {/* Last Updated Badge */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 font-medium">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span>Last updated: 01 October 2026</span>
              </div>
            </div>

            {/* Right Column: 3D Holographic Legal Tablet Graphic */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[440px] h-[220px] sm:h-[260px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/images/legal/terms_hero.jpg"
                  alt="Terms and conditions 3D legal agreement illustration"
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
      {/* MAIN BODY: STICKY TOC SIDEBAR + 19 SECTIONS */}
      {/* ========================================================= */}
      <section className="w-full pt-10 sm:pt-12 pb-10">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR: "On This Page" Table of Contents (3.5 Cols) */}
            <div className="lg:col-span-4 xl:col-span-3 sticky top-24 hidden lg:block">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs max-h-[calc(100vh-120px)] overflow-y-auto">
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

            {/* RIGHT MAIN CONTENT: The 19 Detailed Terms & Conditions Sections (8.5 Cols) */}
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
                      XSPACEWEB PRIVATE LIMITED (&ldquo;XSPACEWEB&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This Data Privacy policy explains how we collect, use, store, share and safeguard your information when you visit our website, use our products or services, or interact with us in any other way.
                    </p>
                  </div>
                </div>
              </div>

              {/* 02. Definitions */}
              <div
                id="definitions"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      02
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Definitions
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      In this section, we define key terms used in these Terms &amp; Conditions, including Company, Website, Services, Client, User, Project, Deliverables, Intellectual Property and Third-Party Services, to ensure clarity and consistent understanding.
                    </p>
                  </div>
                </div>
              </div>

              {/* 03. Acceptance of Terms */}
              <div
                id="acceptance"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      03
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Acceptance of Terms
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      By using our website or services, you confirm that you have read, understood and agreed to these Terms &amp; Conditions, and that you will use our website and services lawfully and in accordance with these terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* 04. Our Services */}
              <div
                id="our-services"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      04
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Our Services
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      XSPACEWEB provides a wide range of technology and digital services including website development, application development, digital marketing, branding, cloud solutions, automation, consulting and more, as detailed on our website and in project-specific agreements.
                    </p>
                  </div>
                </div>
              </div>

              {/* 05. Project Engagement */}
              <div
                id="engagement"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      05
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Project Engagement
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We work with clients based on proposals, quotations, Statements of Work (SOW) or other agreements. This section explains how a project starts, the required approvals, timelines, deliverables and payment conditions.
                    </p>
                  </div>
                </div>
              </div>

              {/* 06. Client Responsibilities */}
              <div
                id="client-responsibilities"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      06
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Client Responsibilities
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Clients are responsible for providing accurate information, content, credentials, timely feedback and approvals, and ensuring that all materials supplied do not infringe third-party rights.
                    </p>
                  </div>
                </div>
              </div>

              {/* 07. Fees & Payments */}
              <div
                id="fees-payments"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      07
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Fees &amp; Payments
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      All fees are communicated through proposals, quotations or agreements. This section covers payment schedules, taxes, advance payments, third-party costs and consequences of delayed or failed payments.
                    </p>
                  </div>
                </div>
              </div>

              {/* 08. Intellectual Property */}
              <div
                id="intellectual-property"
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
                      Intellectual Property
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      This section explains ownership of client materials, XSPACEWEB&apos;s pre-existing materials, and the rights relating to final deliverables, trademarks, source code, designs and other intellectual property.
                    </p>
                  </div>
                </div>
              </div>

              {/* 09. Source Code & Software */}
              <div
                id="source-code"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      09
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Code2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Source Code &amp; Software
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Where software development is involved, this section covers source code access, transfer, third-party libraries, open-source licences and XSPACEWEB&apos;s proprietary frameworks and technology.
                    </p>
                  </div>
                </div>
              </div>

              {/* 10. Third-Party Services */}
              <div
                id="third-party"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      10
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Link2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Third-Party Services
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Our projects may use third-party platforms such as hosting providers, cloud services, payment gateways, domain registrars and APIs. We do not control these services and are not responsible for their availability or policy changes.
                    </p>
                  </div>
                </div>
              </div>

              {/* 11. Website & Software Availability */}
              <div
                id="availability"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      11
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Server className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Website &amp; Software Availability
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We aim to maintain reliable services but do not guarantee uninterrupted availability of our website, software or services. Scheduled maintenance, upgrades and third-party outages may temporarily affect availability.
                    </p>
                  </div>
                </div>
              </div>

              {/* 12. Acceptable Use */}
              <div
                id="acceptable-use"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      12
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Ban className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Acceptable Use
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      You must not use our website or services for unlawful activities, distribute malware, violate intellectual property rights, or attempt to disrupt or compromise our systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* 13. Cybersecurity */}
              <div
                id="cybersecurity"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      13
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Lock className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Cybersecurity
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      You must not attempt to gain unauthorised access, perform penetration testing without permission, exploit vulnerabilities or deploy malicious code. Authorised security testing may be conducted only with prior written permission.
                    </p>
                  </div>
                </div>
              </div>

              {/* 14. Confidentiality */}
              <div
                id="confidentiality"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      14
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Confidentiality
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Both parties must protect confidential information shared during a project or engagement. Confidentiality obligations may be further governed by a separate Non-Disclosure Agreement (NDA).
                    </p>
                  </div>
                </div>
              </div>

              {/* 15. Data Protection & Privacy */}
              <div
                id="data-privacy"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      15
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Database className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Data Protection &amp; Privacy
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We collect and process personal information in accordance with our Privacy Policy and applicable data protection laws, including the Digital Personal Data Protection Act, 2023 and relevant rules.
                    </p>
                  </div>
                </div>
              </div>

              {/* 16. User Content */}
              <div
                id="user-content"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      16
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      User Content
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      If you submit content, documents, images or other materials to XSPACEWEB, you confirm that you have the necessary rights and that such content does not violate any law or third-party rights.
                    </p>
                  </div>
                </div>
              </div>

              {/* 17. Feedback */}
              <div
                id="feedback"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      17
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Feedback
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Any suggestions, ideas or feedback you provide may be used by XSPACEWEB to improve our products and services, without creating an obligation to compensate you, unless otherwise agreed in writing.
                    </p>
                  </div>
                </div>
              </div>

              {/* 18. Marketing & Portfolio Rights */}
              <div
                id="marketing-rights"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      18
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Megaphone className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Marketing &amp; Portfolio Rights
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Unless expressly prohibited, XSPACEWEB may showcase completed work in our portfolio, website or marketing materials. Confidential information will not be disclosed without permission.
                    </p>
                  </div>
                </div>
              </div>

              {/* 19. Warranties */}
              <div
                id="warranties"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1668E8] font-black text-xs flex items-center justify-center">
                      19
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-[#1668E8] flex items-center justify-center">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      Warranties
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We will perform services with reasonable professional care and skill. Except as expressly stated, we do not guarantee specific business outcomes such as revenue, rankings, leads or conversions.
                    </p>
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
                  By using our website and services, you agree to the collection and use of information in accordance with these Terms &amp; Conditions.
                </p>
              </div>
            </div>

            {/* 3 Quick Features on Right */}
            <div className="flex items-center gap-5 sm:gap-6 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#07152B]">
                <Shield className="w-4 h-4 text-[#1668E8]" />
                <span>Clear Terms</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#07152B]">
                <Database className="w-4 h-4 text-[#1668E8]" />
                <span>Fair Usage</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#07152B]">
                <FileText className="w-4 h-4 text-[#1668E8]" />
                <span>Legal Compliance</span>
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
                If you have any questions or concerns about these Terms &amp; Conditions, feel free to reach out.
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
