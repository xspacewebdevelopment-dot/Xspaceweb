"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Globe,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  User,
  Building,
  Tag,
  MessageSquare,
  MessageSquareText,
  Smartphone,
  Palette,
  BarChart3,
  Box,
  MoreHorizontal,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

const projectTypes = [
  { id: "web-dev", label: "Website Development", icon: Globe },
  { id: "app-dev", label: "Application Development", icon: Smartphone },
  { id: "saas", label: "SaaS Product", icon: Box },
  { id: "ui-ux", label: "UI/UX Design", icon: Palette },
  { id: "marketing", label: "Digital Marketing", icon: BarChart3 },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

const faqs = [
  {
    id: "faq-1",
    question: "What services does XSPACEWEB provide?",
    answer:
      "We offer web development, mobile app development, UI/UX design, digital marketing and IT consultation services for businesses of all sizes.",
  },
  {
    id: "faq-2",
    question: "Can I discuss a custom project?",
    answer:
      "Absolutely! We love custom projects. Reach out to us with your idea, and we'll provide a tailored solution and estimate.",
  },
  {
    id: "faq-3",
    question: "Do you work with international clients?",
    answer:
      "Yes, we work with clients across India and globally, offering flexible engagement models and time zone support.",
  },
  {
    id: "faq-4",
    question: "How do I get a quote?",
    answer:
      "Simply fill out the contact form or email us at support@xspaceweb.com. We'll get back to you within 24 hours.",
  },
];

export default function ContactPage() {
  const [currentTime, setCurrentTime] = useState("12:37 PM (IST)");
  const [selectedProjectType, setSelectedProjectType] = useState<string>("web-dev");
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  // Keep IST time live
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      setCurrentTime(`${now.toLocaleTimeString("en-US", options)} (IST)`);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
      setSelectedProjectType("web-dev");
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <div className="w-full bg-[#FAFCFF] text-[#0A1128] pt-2 sm:pt-4 pb-14 overflow-x-hidden">
      
      {/* ========================================================= */}
      {/* SECTION 1: HERO & OUR PRESENCE ACROSS INDIA (SINGLE SLIDE FIT) */}
      {/* ========================================================= */}
      <section className="w-full pt-2 pb-8 relative overflow-hidden">
        <Container size="wide">
          
          {/* Header 3-Column Row: Left Title | Center Dotted Network Map | Right Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center mb-5 sm:mb-6">
            
            {/* Left Title Area (5 Cols) */}
            <div className="lg:col-span-5 space-y-1.5 z-10">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-bold tracking-[0.2em] text-[#1668E8] uppercase select-none">
                <span className="w-2 h-2 rounded-full bg-[#1668E8]" />
                <span>OUR OFFICES</span>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#07152B] tracking-tight leading-[1.12]">
                Our Presence Across <span className="text-[#1668E8]">India.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-[13.5px] text-[#556987] leading-relaxed max-w-md">
                XSPACEWEB operates from multiple locations to serve our clients, partners and global customers.
              </p>
            </div>

            {/* Center Dotted Network Map Graphic (4 Cols) */}
            <div className="hidden lg:flex lg:col-span-4 items-center justify-center select-none">
              <div className="w-full max-w-[360px] h-[110px] relative">
                <svg className="w-full h-full" viewBox="0 0 380 130" fill="none">
                  {/* Dotted World Continent Matrix */}
                  <g fill="#CBD5E1" opacity="0.65">
                    <circle cx="80" cy="30" r="1.5" /><circle cx="90" cy="30" r="1.5" /><circle cx="100" cy="30" r="1.5" /><circle cx="110" cy="30" r="1.5" /><circle cx="120" cy="30" r="1.5" />
                    <circle cx="70" cy="40" r="1.5" /><circle cx="80" cy="40" r="1.5" /><circle cx="90" cy="40" r="1.5" /><circle cx="100" cy="40" r="1.5" /><circle cx="110" cy="40" r="1.5" /><circle cx="120" cy="40" r="1.5" /><circle cx="130" cy="40" r="1.5" />
                    <circle cx="60" cy="50" r="1.5" /><circle cx="70" cy="50" r="1.5" /><circle cx="80" cy="50" r="1.5" /><circle cx="90" cy="50" r="1.5" /><circle cx="100" cy="50" r="1.5" /><circle cx="110" cy="50" r="1.5" /><circle cx="120" cy="50" r="1.5" /><circle cx="130" cy="50" r="1.5" /><circle cx="140" cy="50" r="1.5" />
                    <circle cx="170" cy="35" r="1.5" /><circle cx="180" cy="35" r="1.5" /><circle cx="190" cy="35" r="1.5" /><circle cx="200" cy="35" r="1.5" /><circle cx="210" cy="35" r="1.5" /><circle cx="220" cy="35" r="1.5" />
                    <circle cx="160" cy="45" r="1.5" /><circle cx="170" cy="45" r="1.5" /><circle cx="180" cy="45" r="1.5" /><circle cx="190" cy="45" r="1.5" /><circle cx="200" cy="45" r="1.5" /><circle cx="210" cy="45" r="1.5" /><circle cx="220" cy="45" r="1.5" /><circle cx="230" cy="45" r="1.5" />
                    <circle cx="170" cy="55" r="1.5" /><circle cx="180" cy="55" r="1.5" /><circle cx="190" cy="55" r="1.5" /><circle cx="200" cy="55" r="1.5" /><circle cx="210" cy="55" r="1.5" /><circle cx="220" cy="55" r="1.5" /><circle cx="230" cy="55" r="1.5" /><circle cx="240" cy="55" r="1.5" />
                    <circle cx="180" cy="65" r="1.5" /><circle cx="190" cy="65" r="1.5" /><circle cx="200" cy="65" r="1.5" /><circle cx="210" cy="65" r="1.5" /><circle cx="220" cy="65" r="1.5" /><circle cx="230" cy="65" r="1.5" /><circle cx="240" cy="65" r="1.5" />
                    <circle cx="190" cy="75" r="1.5" /><circle cx="200" cy="75" r="1.5" /><circle cx="210" cy="75" r="1.5" /><circle cx="220" cy="75" r="1.5" /><circle cx="230" cy="75" r="1.5" />
                    <circle cx="200" cy="85" r="1.5" /><circle cx="205" cy="85" r="1.5" /><circle cx="210" cy="85" r="1.5" />
                    <circle cx="205" cy="95" r="1.5" />
                    <circle cx="270" cy="45" r="1.5" /><circle cx="280" cy="45" r="1.5" /><circle cx="290" cy="45" r="1.5" /><circle cx="300" cy="45" r="1.5" />
                    <circle cx="260" cy="55" r="1.5" /><circle cx="270" cy="55" r="1.5" /><circle cx="280" cy="55" r="1.5" /><circle cx="290" cy="55" r="1.5" /><circle cx="300" cy="55" r="1.5" />
                  </g>
                  {/* Curved Connection Arcs */}
                  <path d="M150,75 Q180,20 210,70" stroke="#3B82F6" strokeWidth="1.2" opacity="0.8" fill="none" />
                  <path d="M180,50 Q205,15 250,55" stroke="#3B82F6" strokeWidth="1.2" opacity="0.7" fill="none" />
                  <path d="M210,70 Q235,25 280,60" stroke="#3B82F6" strokeWidth="1.2" opacity="0.8" fill="none" />
                  <path d="M210,70 Q235,85 270,105" stroke="#3B82F6" strokeWidth="1.2" opacity="0.7" fill="none" />
                  {/* Glowing Nodes */}
                  <circle cx="150" cy="75" r="3" fill="#1668E8" />
                  <circle cx="180" cy="50" r="2.5" fill="#1668E8" />
                  <circle cx="210" cy="70" r="6" fill="#1668E8" fillOpacity="0.2" />
                  <circle cx="210" cy="70" r="3.5" fill="#1668E8" />
                  <circle cx="250" cy="55" r="2.5" fill="#1668E8" />
                  <circle cx="280" cy="60" r="3" fill="#1668E8" />
                  <circle cx="270" cy="105" r="2.5" fill="#1668E8" />
                </svg>
              </div>
            </div>

            {/* Right Clean Vertical Stats (3 Cols) */}
            <div className="lg:col-span-3 flex lg:flex-col justify-between sm:justify-start lg:justify-center gap-3 sm:gap-3.5 pl-0 lg:pl-6">
              {/* Stat 1 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4 fill-[#1668E8]/20" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-[#07152B] leading-none">2</div>
                  <div className="text-[11px] text-[#556987] font-medium mt-0.5">Locations</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-[#07152B] leading-none">1</div>
                  <div className="text-[11px] text-[#556987] font-medium mt-0.5">Company</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 shadow-xs">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-[13.5px] font-extrabold text-[#07152B] leading-none">PAN India</div>
                  <div className="text-[11px] text-[#556987] font-medium mt-0.5">Presence</div>
                </div>
              </div>
            </div>

          </div>

          {/* 2 Locations Cards (Kolkata & Dhanbad) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            
            {/* Card 1: Kolkata, West Bengal */}
            <div className="rounded-[22px] bg-white border border-slate-200/80 p-4.5 sm:p-5 shadow-[0_4px_20px_-2px_rgba(7,21,43,0.04)] flex flex-col justify-between transition-all hover:shadow-md hover:border-blue-200">
              <div>
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] text-[11px] font-bold select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span>Operational Office</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-[11px] font-bold select-none">
                    <MapPin className="w-3 h-3 text-[#1D4ED8] fill-[#1D4ED8]/20" />
                    <span>Our Office</span>
                  </div>
                </div>

                {/* City Title & Local Time */}
                <div className="mb-2.5">
                  <h2 className="text-xl sm:text-[22px] font-black text-[#07152B] tracking-tight">
                    Kolkata, West Bengal
                  </h2>
                  <div className="flex items-center gap-1 text-[11px] text-[#556987] font-medium mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{currentTime}</span>
                  </div>
                </div>

                {/* City Banner Image */}
                <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3.5 group">
                  <Image
                    src="/images/contact/kolkata.jpg"
                    alt="Kolkata skyline with Howrah Bridge and Victoria Memorial"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Bottom Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 pt-2 border-t border-slate-100">
                  {/* Left: Address */}
                  <div className="sm:col-span-7 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 fill-[#1668E8]/20" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold text-[#556987]">
                        Address
                      </div>
                      <p className="text-[11.5px] text-[#07152B] font-medium leading-snug">
                        Floor No.: 0, Holding number 131 (95), 131, Jangalpur Road, Airport Gate No. 03, International Airport, Kolkata, North Twenty Four Parganas, West Bengal – 700081
                      </p>
                    </div>
                  </div>

                  {/* Right: GSTIN & Actions */}
                  <div className="sm:col-span-5 flex items-start gap-2.5 pl-0 sm:pl-1">
                    <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div>
                        <div className="text-[10.5px] font-bold text-[#556987]">
                          GSTIN (West Bengal)
                        </div>
                        <div className="text-[11.5px] font-black text-[#07152B]">
                          19AAACX5026C1ZK
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10.5px] font-bold text-[#556987]">
                          Get In Touch
                        </div>
                        <div className="flex items-center gap-1.5">
                          <a
                            href="tel:+918292526386"
                            aria-label="Call Kolkata office"
                            className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1668E8] hover:bg-[#1668E8] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                          >
                            <Phone className="w-3 h-3" />
                          </a>
                          <a
                            href="mailto:support@xspaceweb.com"
                            aria-label="Email Kolkata office"
                            className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1668E8] hover:bg-[#1668E8] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                          >
                            <Mail className="w-3 h-3" />
                          </a>
                          <a
                            href="https://maps.google.com/?q=Kolkata+Airport+Jangalpur+Road"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="View Kolkata on map"
                            className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1668E8] hover:bg-[#1668E8] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                          >
                            <MapPin className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Dhanbad, Jharkhand */}
            <div className="rounded-[22px] bg-white border border-slate-200/80 p-4.5 sm:p-5 shadow-[0_4px_20px_-2px_rgba(7,21,43,0.04)] flex flex-col justify-between transition-all hover:shadow-md hover:border-blue-200">
              <div>
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-[11px] font-bold select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8]" />
                    <span>Registered Office</span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-[11px] font-bold select-none">
                    <MapPin className="w-3 h-3 text-[#1D4ED8] fill-[#1D4ED8]/20" />
                    <span>Registered Office</span>
                  </div>
                </div>

                {/* City Title & Local Time */}
                <div className="mb-2.5">
                  <h2 className="text-xl sm:text-[22px] font-black text-[#07152B] tracking-tight">
                    Dhanbad, Jharkhand
                  </h2>
                  <div className="flex items-center gap-1 text-[11px] text-[#556987] font-medium mt-0.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{currentTime}</span>
                  </div>
                </div>

                {/* City Banner Image */}
                <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3.5 group">
                  <Image
                    src="/images/contact/dhanbad.jpg"
                    alt="Dhanbad Jharkhand landscape"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Bottom Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 pt-2 border-t border-slate-100">
                  {/* Left: Address */}
                  <div className="sm:col-span-7 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 fill-[#1668E8]/20" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[11px] font-bold text-[#556987]">
                        Address
                      </div>
                      <p className="text-[11.5px] text-[#07152B] font-medium leading-snug">
                        Floor No.: 0, Plot no. 766 & 767, C/O- Khepa Kumar, Post Pochari, Near Petrol Pump, New Colony, Muraidih, Dhanbad, Jharkhand – 828306
                      </p>
                    </div>
                  </div>

                  {/* Right: CIN, GSTIN & Actions */}
                  <div className="sm:col-span-5 flex items-start gap-2.5 pl-0 sm:pl-1">
                    <div className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div>
                        <div className="text-[10px] font-bold text-[#556987]">
                          CIN
                        </div>
                        <div className="text-[11px] font-black text-[#07152B] break-all leading-tight">
                          U62012JH2024PTC022737
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold text-[#556987]">
                          GSTIN (JHARKHAND)
                        </div>
                        <div className="text-[11px] font-black text-[#07152B] leading-tight">
                          20AAACX5026C1Z1
                        </div>
                      </div>

                      <div className="space-y-1 pt-0.5">
                        <div className="text-[10px] font-bold text-[#556987]">
                          Get In Touch
                        </div>
                        <div className="flex items-center gap-1.5">
                          <a
                            href="tel:+917979099017"
                            aria-label="Call Dhanbad office"
                            className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1668E8] hover:bg-[#1668E8] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                          >
                            <Phone className="w-3 h-3" />
                          </a>
                          <a
                            href="mailto:support@xspaceweb.com"
                            aria-label="Email Dhanbad office"
                            className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1668E8] hover:bg-[#1668E8] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                          >
                            <Mail className="w-3 h-3" />
                          </a>
                          <a
                            href="https://maps.google.com/?q=Dhanbad+Muraidih+Jharkhand"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="View Dhanbad on map"
                            className="w-7 h-7 rounded-full bg-[#EFF6FF] text-[#1668E8] hover:bg-[#1668E8] hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                          >
                            <MapPin className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: SEND US A MESSAGE / COMPACT SINGLE-SLIDE FORM */}
      {/* ========================================================= */}
      <section className="w-full py-4 sm:py-6 scroll-mt-6" id="form-section">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
            
            {/* LEFT COMPACT FORM CARD (Col 1-6) */}
            <div className="lg:col-span-6 bg-white rounded-[22px] border border-slate-200/90 p-4.5 sm:p-5.5 shadow-[0_4px_20px_-2px_rgba(7,21,43,0.04)]">
              
              {/* Header */}
              <div className="flex items-start gap-3 mb-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1668E8] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <MessageSquareText className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-[22px] font-extrabold text-[#07152B] tracking-tight">
                    Send us a Message
                  </h2>
                  <p className="text-[11.5px] text-[#556987] mt-0.5">
                    Fill out the form below and our team will get back to you soon.
                  </p>
                </div>
              </div>

              {formSubmitted && (
                <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-xs font-medium animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Thank you! Your message has been sent. We&apos;ll get back to you soon.</span>
                </div>
              )}

              {/* Compact Form Fields */}
              <form onSubmit={handleFormSubmit} className="space-y-3">
                {/* Row 1: Your Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[11.5px] font-semibold text-[#07152B] flex items-center gap-0.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl py-1.5 pl-8.5 pr-3 text-xs text-[#07152B] placeholder-slate-400 focus:outline-none focus:border-[#1668E8] transition-all h-[36px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11.5px] font-semibold text-[#07152B] flex items-center gap-0.5">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl py-1.5 pl-8.5 pr-3 text-xs text-[#07152B] placeholder-slate-400 focus:outline-none focus:border-[#1668E8] transition-all h-[36px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone Number & Company / Business */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[11.5px] font-semibold text-[#07152B]">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl py-1.5 pl-8.5 pr-3 text-xs text-[#07152B] placeholder-slate-400 focus:outline-none focus:border-[#1668E8] transition-all h-[36px]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11.5px] font-semibold text-[#07152B]">
                      Company / Business
                    </label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Your Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl py-1.5 pl-8.5 pr-3 text-xs text-[#07152B] placeholder-slate-400 focus:outline-none focus:border-[#1668E8] transition-all h-[36px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Subject */}
                <div className="space-y-1">
                  <label className="text-[11.5px] font-semibold text-[#07152B] flex items-center gap-0.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl py-1.5 pl-3 pr-8 text-xs text-[#07152B] focus:outline-none focus:border-[#1668E8] transition-all appearance-none cursor-pointer h-[36px]"
                    >
                      <option value="">Select a subject</option>
                      <option value="web-dev">Web Development Project</option>
                      <option value="app-dev">Application Development</option>
                      <option value="saas">SaaS Product Solutions</option>
                      <option value="ui-ux">UI/UX Design & Branding</option>
                      <option value="marketing">Digital Marketing & SEO</option>
                      <option value="general">General Inquiry & Discussion</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Row 4: What can we help you with? Textarea */}
                <div className="space-y-1">
                  <label className="text-[11.5px] font-semibold text-[#07152B] flex items-center gap-0.5">
                    What can we help you with? <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <textarea
                      required
                      rows={2}
                      placeholder="Tell us about your project, requirement or business challenge..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-8.5 pr-3 text-xs text-[#07152B] placeholder-slate-400 focus:outline-none focus:border-[#1668E8] transition-all resize-none h-[64px]"
                    />
                  </div>
                </div>

                {/* Row 5: Project Type (Optional) */}
                <div className="space-y-1 pt-0.5">
                  <label className="text-[11px] font-semibold text-[#556987]">
                    Project Type (Optional)
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {projectTypes.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedProjectType === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedProjectType(item.id)}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl border text-[11px] font-medium transition-all text-left cursor-pointer ${
                            isSelected
                              ? "bg-blue-50/90 border-[#1668E8] text-[#1668E8] font-semibold shadow-2xs"
                              : "bg-white border-slate-200 text-[#556987] hover:border-slate-300 hover:text-[#07152B]"
                          }`}
                        >
                          <Icon className={`w-3 h-3 flex-shrink-0 ${isSelected ? "text-[#1668E8]" : "text-slate-400"}`} />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-[#1668E8] text-white text-xs sm:text-[13px] font-bold hover:bg-[#1255C0] shadow-[0_4px_16px_rgba(22,104,232,0.25)] hover:shadow-[0_6px_20px_rgba(22,104,232,0.35)] transition-all duration-200 active:scale-[0.99] cursor-pointer"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

            </div>

            {/* RIGHT SIDEBAR: 2 Compact Stacked Cards (Col 7-12) */}
            <div className="lg:col-span-6 space-y-3.5">
              
              {/* Card 1: Get in Touch Directly */}
              <div className="bg-white rounded-[22px] border border-slate-200/90 p-4 sm:p-4.5 shadow-[0_4px_20px_-2px_rgba(7,21,43,0.04)]">
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1668E8] flex items-center justify-center flex-shrink-0">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#07152B] tracking-tight">
                      Get in Touch Directly
                    </h3>
                    <p className="text-[11px] text-[#556987]">
                      For general enquiries, partnerships or business discussions.
                    </p>
                  </div>
                </div>

                {/* 3 Horizontal Contact Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* Email Chip */}
                  <div className="bg-[#EEF5FE]/90 rounded-xl p-2.5 border border-blue-100 flex flex-col justify-between">
                    <div>
                      <div className="w-6 h-6 rounded-lg bg-white text-[#1668E8] flex items-center justify-center mb-1.5 shadow-2xs">
                        <Mail className="w-3 h-3" />
                      </div>
                      <div className="text-[10.5px] font-bold text-[#07152B]">Email</div>
                      <a
                        href="mailto:support@xspaceweb.com"
                        className="text-[11px] font-bold text-[#1668E8] hover:underline block break-all leading-tight mt-0.5"
                      >
                        support@xspaceweb.com
                      </a>
                    </div>
                    <div className="text-[9.5px] text-[#556987] mt-1.5">
                      General Enquiries
                    </div>
                  </div>

                  {/* Phone Chip */}
                  <div className="bg-[#F0FDF4]/90 rounded-xl p-2.5 border border-emerald-100 flex flex-col justify-between">
                    <div>
                      <div className="w-6 h-6 rounded-lg bg-white text-emerald-600 flex items-center justify-center mb-1.5 shadow-2xs">
                        <Phone className="w-3 h-3" />
                      </div>
                      <div className="text-[10.5px] font-bold text-[#07152B]">Phone</div>
                      <div className="text-[11px] font-bold text-[#07152B] leading-snug mt-0.5">
                        <a href="tel:+918292526386" className="hover:text-[#1668E8] block">+91 8292526386</a>
                        <a href="tel:+917979099017" className="hover:text-[#1668E8] block">+91 7979099017</a>
                      </div>
                    </div>
                    <div className="text-[9.5px] text-[#556987] mt-1 leading-tight">
                      Mon - Sat, 9:00 AM - 7:00 PM
                    </div>
                  </div>

                  {/* Response Time Chip */}
                  <div className="bg-[#FAF5FF]/90 rounded-xl p-2.5 border border-purple-100 flex flex-col justify-between">
                    <div>
                      <div className="w-6 h-6 rounded-lg bg-white text-[#9333EA] flex items-center justify-center mb-1.5 shadow-2xs">
                        <Clock className="w-3 h-3" />
                      </div>
                      <div className="text-[10.5px] font-bold text-[#07152B]">Response Time</div>
                      <div className="text-[10.5px] font-bold text-[#07152B] leading-tight mt-0.5">
                        We usually respond within <span className="text-[#9333EA]">24 hours</span>
                      </div>
                    </div>
                    <div className="text-[9.5px] text-[#556987] mt-1">
                      (Business Days)
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Our Office Locations with Realistic Mini Maps */}
              <div className="bg-white rounded-[22px] border border-slate-200/90 p-4 sm:p-4.5 shadow-[0_4px_20px_-2px_rgba(7,21,43,0.04)] space-y-3">
                {/* Header */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1668E8] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#07152B] tracking-tight">
                      Our Office Locations
                    </h3>
                    <p className="text-[11px] text-[#556987]">
                      Two locations. One vision.
                    </p>
                  </div>
                </div>

                {/* Subcard 1: Registered Office (Dhanbad) */}
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#07152B]">
                      <Building2 className="w-3 h-3 text-[#1668E8]" />
                      <span>Registered Office</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Dhanbad+Muraidih+Jharkhand"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10.5px] font-bold text-[#1668E8] hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>View on Google Maps</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  <div className="flex items-start justify-between gap-2.5">
                    <div className="space-y-0.5 text-xs text-[#556987]">
                      <div className="font-bold text-[#07152B] text-[11.5px]">
                        XSPACEWEB PRIVATE LIMITED
                      </div>
                      <p className="text-[11px] leading-snug text-[#556987]">
                        Muraidih, Dhanbad,<br />
                        Jharkhand, India 828306
                      </p>
                      <div className="text-[10px] font-semibold text-slate-400 pt-0.5">
                        CIN: U62012JH2024PTC022737
                      </div>
                    </div>

                    {/* Styled Realistic Mini Map Graphic */}
                    <div className="w-32 h-16 rounded-lg border border-slate-200 bg-[#E8EDF2] relative overflow-hidden flex-shrink-0 shadow-2xs">
                      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#F1EFEA" />
                        <path d="M0,0 L25,0 L15,30 L0,20 Z" fill="#D8E8D5" />
                        <path d="M80,40 L128,30 L128,64 L70,64 Z" fill="#D8E8D5" />
                        <path d="M0,35 L128,28" stroke="#FFFFFF" strokeWidth="5" />
                        <path d="M0,35 L128,28" stroke="#FBD38D" strokeWidth="2.5" />
                        <path d="M50,0 L60,64" stroke="#FFFFFF" strokeWidth="4" />
                        <path d="M50,0 L60,64" stroke="#E2E8F0" strokeWidth="2" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center gap-1">
                        <MapPin className="w-4 h-4 text-red-500 fill-red-500 drop-shadow-2xs" />
                        <div className="bg-white/95 px-1 py-0.5 rounded shadow-2xs border border-slate-200/80 text-[8px] font-black text-[#07152B] leading-none">
                          <div>Muraidih</div>
                          <div className="text-slate-500 text-[7px]">Dhanbad</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subcard 2: Corporate Office (Kolkata) */}
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#07152B]">
                      <User className="w-3 h-3 text-[#1668E8]" />
                      <span>Corporate Office</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Kolkata+Airport+Jangalpur+Road"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10.5px] font-bold text-[#1668E8] hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>View on Google Maps</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  <div className="flex items-start justify-between gap-2.5">
                    <div className="space-y-0.5 text-xs text-[#556987]">
                      <div className="font-bold text-[#07152B] text-[11.5px]">
                        XSPACEWEB PRIVATE LIMITED
                      </div>
                      <p className="text-[11px] leading-snug text-[#556987]">
                        Airport Gate, Holding number 131 (95), 131,<br />
                        03, Jangalpur Rd, International Airport,<br />
                        Kolkata, West Bengal 700081
                      </p>
                    </div>

                    {/* Styled Realistic Mini Map Graphic */}
                    <div className="w-32 h-16 rounded-lg border border-slate-200 bg-[#E8EDF2] relative overflow-hidden flex-shrink-0 shadow-2xs">
                      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#F1EFEA" />
                        <path d="M0,0 Q25,30 8,64 L0,64 Z" fill="#C6E2FF" />
                        <path d="M85,0 L128,0 L128,28 L75,15 Z" fill="#D8E8D5" />
                        <path d="M8,20 L128,45" stroke="#FFFFFF" strokeWidth="5" />
                        <path d="M8,20 L128,45" stroke="#FBD38D" strokeWidth="2.5" />
                        <path d="M75,0 L65,64" stroke="#FFFFFF" strokeWidth="4" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center gap-1">
                        <MapPin className="w-4 h-4 text-red-500 fill-red-500 drop-shadow-2xs" />
                        <div className="bg-white/95 px-1 py-0.5 rounded shadow-2xs border border-slate-200/80 text-[7.5px] font-black text-[#07152B] leading-none">
                          <div>Kolkata</div>
                          <div className="text-slate-500 text-[6.5px]">Intl Airport</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </Container>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: FAQ ACCORDIONS */}
      {/* ========================================================= */}
      <section className="w-full pt-4 pb-4">
        <Container size="wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5 sm:mb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] text-[#1668E8] uppercase select-none">
                <span className="w-2 h-2 rounded-full bg-[#1668E8]" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#07152B] tracking-tight">
                Have an idea worth <span className="text-[#1668E8]">building?</span>
              </h2>
              <p className="text-xs text-[#556987]">
                Let&apos;s turn it into something great.
              </p>
            </div>

            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-200 text-[#1668E8] text-xs font-bold hover:bg-blue-50 transition-colors w-fit"
            >
              <span>View All FAQs</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-slate-200/90 bg-white p-3.5 sm:p-4 transition-all duration-200 hover:border-blue-200 shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-start justify-between gap-3 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8] flex-shrink-0" />
                      <span className="text-xs sm:text-[13.5px] font-extrabold text-[#07152B]">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#1668E8]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-2 pl-3.5 text-[11.5px] text-[#556987] leading-relaxed animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

    </div>
  );
}
