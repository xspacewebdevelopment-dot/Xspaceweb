"use client";

import React, { useState } from "react";
import {
  Mail,
  Headphones,
  Settings,
  Box,
  ShieldAlert,
  Users,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface ChannelItem {
  id: string;
  title: string;
  description: string;
  email: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  cardBg: string;
  cardBorder: string;
  arrowBg: string;
  arrowColor: string;
  emailIconColor: string;
}

const channels: ChannelItem[] = [
  {
    id: "general",
    title: "General Enquiry",
    description: "For general questions, business inquiries and partnerships.",
    email: "info@xspaceweb.com",
    icon: Mail,
    iconBg: "bg-[#DCEAFE]",
    iconColor: "text-[#1668E8]",
    cardBg: "bg-[#F4F8FE]",
    cardBorder: "border-[#E1ECFE]",
    arrowBg: "bg-[#DCEAFE]",
    arrowColor: "text-[#1668E8]",
    emailIconColor: "text-[#1668E8]",
  },
  {
    id: "support",
    title: "Customer Support",
    description: "For existing customers, account support and service assistance.",
    email: "support@xspaceweb.com",
    icon: Headphones,
    iconBg: "bg-[#D6F5E5]",
    iconColor: "text-[#10B981]",
    cardBg: "bg-[#F2FBF7]",
    cardBorder: "border-[#D3F3E3]",
    arrowBg: "bg-[#D6F5E5]",
    arrowColor: "text-[#10B981]",
    emailIconColor: "text-[#10B981]",
  },
  {
    id: "technical",
    title: "Technical Enquiry",
    description: "For technical issues, integrations, API and product related support.",
    email: "technical@xspaceweb.com",
    icon: Settings,
    iconBg: "bg-[#FDE8D0]",
    iconColor: "text-[#F59E0B]",
    cardBg: "bg-[#FEF9F3]",
    cardBorder: "border-[#FDECD8]",
    arrowBg: "bg-[#FDE8D0]",
    arrowColor: "text-[#F59E0B]",
    emailIconColor: "text-[#F59E0B]",
  },
  {
    id: "product",
    title: "Product Enquiry",
    description: "For product details, features, pricing and demo requests.",
    email: "product@xspaceweb.com",
    icon: Box,
    iconBg: "bg-[#EDE0FC]",
    iconColor: "text-[#9333EA]",
    cardBg: "bg-[#FAF6FE]",
    cardBorder: "border-[#EDE0FC]",
    arrowBg: "bg-[#EDE0FC]",
    arrowColor: "text-[#9333EA]",
    emailIconColor: "text-[#9333EA]",
  },
  {
    id: "grievance",
    title: "Grievance",
    description: "For complaints, policy violations or any formal grievances.",
    email: "grievance@xspaceweb.com",
    icon: ShieldAlert,
    iconBg: "bg-[#FDD8D8]",
    iconColor: "text-[#EF4444]",
    cardBg: "bg-[#FEF5F5]",
    cardBorder: "border-[#FDE0E0]",
    arrowBg: "bg-[#FDD8D8]",
    arrowColor: "text-[#EF4444]",
    emailIconColor: "text-[#EF4444]",
  },
  {
    id: "careers",
    title: "Internship & Careers",
    description: "For internship opportunities, hiring related queries and HR support.",
    email: "careers@xspaceweb.com",
    icon: Users,
    iconBg: "bg-[#DBEDFE]",
    iconColor: "text-[#0284C7]",
    cardBg: "bg-[#F4F9FE]",
    cardBorder: "border-[#DDF0FE]",
    arrowBg: "bg-[#DBEDFE]",
    arrowColor: "text-[#0284C7]",
    emailIconColor: "text-[#0284C7]",
  },
];

export function OtherWaysToReachSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (email: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <section className="w-full pt-8 pb-12">
      <Container size="wide">
        {/* Section Header */}
        <div className="text-center space-y-2 mb-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1668E8]" />
            <span className="text-[10px] font-bold tracking-[0.18em] text-slate-700 uppercase">
              MORE WAYS TO CONNECT
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#07152B] tracking-tight leading-tight">
            Other Ways to <span className="text-[#1668E8]">Reach Us</span>
          </h2>

          {/* Subheading */}
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Use the appropriate email address to get faster support and connect with the right team.
          </p>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-[32px] border border-slate-200/85 p-6 sm:p-8 lg:p-10 shadow-[0_4px_30px_-4px_rgba(7,21,43,0.05)] space-y-6 sm:space-y-8">
          {/* 6 Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {channels.map((ch) => {
              const IconComp = ch.icon;
              const isCopied = copiedId === ch.id;

              return (
                <div
                  key={ch.id}
                  className={`${ch.cardBg} ${ch.cardBorder} rounded-2xl p-5 border transition-all duration-200 hover:shadow-md flex flex-col justify-between gap-4 group`}
                >
                  {/* Top Row: Icon + Title/Description + Arrow */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-2xl ${ch.iconBg} ${ch.iconColor} flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-[#07152B] leading-tight">
                          {ch.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-snug">
                          {ch.description}
                        </p>
                      </div>
                    </div>

                    <a
                      href={`mailto:${ch.email}`}
                      title={`Send email to ${ch.email}`}
                      className={`w-7 h-7 rounded-full ${ch.arrowBg} ${ch.arrowColor} flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Bottom Row: Email Box with Copy */}
                  <div className="bg-white rounded-xl border border-slate-200/80 px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-2xs">
                    <a
                      href={`mailto:${ch.email}`}
                      className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#1668E8] transition-colors truncate"
                    >
                      <Mail className={`w-3.5 h-3.5 ${ch.emailIconColor} flex-shrink-0`} />
                      <span className="truncate">{ch.email}</span>
                    </a>

                    <button
                      type="button"
                      onClick={(e) => handleCopy(ch.email, ch.id, e)}
                      title="Copy email to clipboard"
                      className="w-7 h-7 rounded-lg text-slate-400 hover:text-[#1668E8] hover:bg-slate-50 flex items-center justify-center transition-all flex-shrink-0 cursor-pointer"
                    >
                      {isCopied ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
