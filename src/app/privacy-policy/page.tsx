"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  FileText,
  User,
  Settings,
  Cookie,
  Share2,
  ShieldCheck,
  Lock,
  ExternalLink,
  Users,
  RefreshCw,
  Phone,
  Mail,
  Shield,
  Database,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface TOCItem {
  id: string;
  title: string;
}

const tocItems: TOCItem[] = [
  { id: "intro", title: "Introduction" },
  { id: "info-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Information" },
  { id: "cookies-tracking", title: "Cookies & Tracking" },
  { id: "data-sharing", title: "Data Sharing" },
  { id: "data-security", title: "Data Security" },
  { id: "your-rights", title: "Your Rights" },
  { id: "third-party", title: "Third-Party Links" },
  { id: "children-privacy", title: "Children's Privacy" },
  { id: "updates", title: "Updates to This Policy" },
  { id: "contact-us", title: "Contact Us" },
];

export default function PrivacyPolicyPage() {
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
      {/* HERO BANNER: LIGHT LUMINOUS CYAN/BLUE GRADIENT */}
      {/* ========================================================= */}
      <section className="w-full bg-gradient-to-r from-[#F0F6FF] via-[#EAF2FE] to-[#F5F9FF] text-[#0A1128] pt-10 sm:pt-14 pb-12 sm:pb-16 relative overflow-hidden border-b border-blue-100/60">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Summary */}
            <div className="lg:col-span-7 space-y-3.5 z-10">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-[0.2em] text-[#556987] uppercase select-none">
                  LEGAL
                </span>
                <div className="w-12 h-[1px] bg-slate-300" />
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] text-[#07152B]">
                Privacy <span className="text-[#1668E8]">Policy</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#556987] leading-relaxed max-w-xl pt-1">
                At XSPACEWEB, your privacy matters. This policy explains how we collect, use, protect and manage your information across our website, products and services.
              </p>

              {/* Last Updated Badge */}
              <div className="flex items-center gap-2 text-xs text-[#718096] pt-2 font-medium">
                <span>Last updated: 24 September 2026</span>
              </div>
            </div>

            {/* Right Column: 3D Shield Graphic with 'Your Data Our Priority' badge */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[440px] h-[220px] sm:h-[260px] rounded-2xl overflow-hidden shadow-xl border border-white/60">
                <Image
                  src="/images/legal/privacy_hero.jpg"
                  alt="Privacy policy 3D security shield illustration"
                  fill
                  className="object-cover object-center"
                  priority
                />

                {/* Handwritten Floating Badge on Top Right */}
                <div className="absolute top-3 right-4 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/80 shadow-md transform rotate-2 pointer-events-none">
                  <p className="text-[11px] font-bold text-[#07152B] leading-tight font-serif italic">
                    Your Data <br />
                    <span className="text-[#1668E8]">Our Priority</span>
                  </p>
                  <div className="w-8 h-[2px] bg-[#1668E8] mt-0.5 rounded-full" />
                </div>
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
                        <span className="truncate">{item.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* RIGHT MAIN CONTENT: The 11 Detailed Policy Sections (8.5 Cols) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-4 sm:space-y-5">
              
              {/* 1. Introduction */}
              <div
                id="intro"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      1. Introduction
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      XSPACEWEB PRIVATE LIMITED (&ldquo;XSPACEWEB&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website, use our products or services, or interact with us in any other way.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Information We Collect */}
              <div
                id="info-collect"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      2. Information We Collect
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We may collect personal information such as your name, email address, phone number, company details and payment information when you contact us, register for an account, use our services, or subscribe to our communications. We also collect technical information like IP address, browser type, device information and usage data to improve our services.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. How We Use Information */}
              <div
                id="how-we-use"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Settings className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      3. How We Use Information
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We use your information to provide and maintain our services, process transactions, respond to your inquiries, improve our products, send important updates and marketing communications (with your consent), and ensure the security and proper functioning of our website and platforms.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Cookies & Tracking Technologies */}
              <div
                id="cookies-tracking"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Cookie className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      4. Cookies & Tracking Technologies
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, personalize content and understand user behavior. You can manage your cookie preferences through your browser settings.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. Data Sharing */}
              <div
                id="data-sharing"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Share2 className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      5. Data Sharing
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We do not sell your personal information. We may share your data with trusted third-party service providers who help us operate our website, process payments, deliver services, or analyze usage. We may also disclose information when required by law or to protect our rights and security.
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. Data Security */}
              <div
                id="data-security"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      6. Data Security
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure or destruction. However, no method of transmission over the internet is 100% secure.
                    </p>
                  </div>
                </div>
              </div>

              {/* 7. Your Rights */}
              <div
                id="your-rights"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      7. Your Rights
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      You have the right to access, update or delete your personal information. You can also opt-out of marketing communications at any time. To exercise these rights, please contact us using the details provided below.
                    </p>
                  </div>
                </div>
              </div>

              {/* 8. Third-Party Links */}
              <div
                id="third-party"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ExternalLink className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      8. Third-Party Links
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review their privacy policies before sharing any information.
                    </p>
                  </div>
                </div>
              </div>

              {/* 9. Children's Privacy */}
              <div
                id="children-privacy"
                className="bg-white rounded-[22px] border border-slate-200/80 p-5 sm:p-6 shadow-xs scroll-mt-24 transition-all hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      9. Children&apos;s Privacy
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      Our website and services are not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately.
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
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <RefreshCw className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      10. Updates to This Policy
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
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
                  <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h2 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                      11. Contact Us
                    </h2>
                    <p className="text-xs sm:text-[13px] text-[#556987] leading-relaxed">
                      If you have questions, concerns or requests regarding this Privacy Policy or your data, please contact us at:
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
      {/* BOTTOM BANNERS: IMPORTANT NOTICE (DARK NAVY) + WE ARE HERE TO HELP (DARK BLUE) */}
      {/* ========================================================= */}
      <section className="w-full pt-2 pb-6">
        <Container size="wide" className="space-y-4">
          
          {/* Banner 1: Important Notice (Dark Navy Background #07152B) */}
          <div className="rounded-[20px] bg-[#07152B] text-white border border-slate-800 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                <ShieldCheck className="w-6 h-6 text-[#1668E8]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">
                  Important Notice
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  By using our website and services, you agree to the collection and use of information in accordance with this Privacy Policy.
                </p>
              </div>
            </div>

            {/* 3 Quick Features on Right */}
            <div className="flex items-center gap-5 sm:gap-6 flex-shrink-0 text-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Shield className="w-4 h-4 text-[#1668E8]" />
                <span>Privacy Focused</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Database className="w-4 h-4 text-[#1668E8]" />
                <span>Data Protection</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <FileText className="w-4 h-4 text-[#1668E8]" />
                <span>User Transparency</span>
              </div>
            </div>
          </div>

          {/* Banner 2: We are here to help (Rich Dark Blue Card) */}
          <div className="rounded-[20px] bg-[#0A2558] text-white border border-blue-900/60 p-4 sm:p-5 flex flex-col lg:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-0.5">
              <h3 className="text-base sm:text-lg font-black text-white">
                We are here to help.
              </h3>
              <p className="text-xs text-blue-100/80">
                If you have any questions or concerns about your privacy, feel free to reach out.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Email */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-400/30">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <a href="mailto:support@xspaceweb.com" className="text-xs font-bold text-white hover:underline block leading-tight">
                    support@xspaceweb.com
                  </a>
                  <span className="text-[10px] text-blue-200/70">General Inquiries</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-400/30">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">
                    +91 8292526386 / +91 7979099017
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1668E8] hover:bg-[#1255C0] text-white text-xs sm:text-[13px] font-bold shadow-sm transition-all active:scale-[0.98]"
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
