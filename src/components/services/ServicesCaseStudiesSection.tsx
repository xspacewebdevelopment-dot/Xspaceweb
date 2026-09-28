"use client";

import React from "react";
import { Sparkles, ArrowRight, ExternalLink, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  serviceUsed: string;
  badgeColor: string;
  title: string;
  challenge: string;
  solution: string;
  results: { value: string; metric: string }[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "fintech-erp",
    client: "Apex FinTech Network",
    industry: "Financial SaaS & ERP",
    serviceUsed: "Full-Stack Web & Next.js Architecture",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    title: "Re-architecting an Indian GST and Invoicing Engine for 100K+ Daily Transactions",
    challenge:
      "Legacy monolithic infrastructure was bottlenecking invoice generation during tax filing cycles with slow database response times and frequent server timeout crashes.",
    solution:
      "Engineered an event-driven Next.js App Router and Node.js microservices backend with real-time IRN generation, multi-godown caching, and automated failover.",
    results: [
      { value: "340%", metric: "User Growth in 6 Months" },
      { value: "99.99%", metric: "Uptime During Tax Audits" },
      { value: "< 240ms", metric: "Average Invoice API Latency" },
    ],
  },
  {
    id: "ecommerce-scale",
    client: "Velvet Luxe Apparel",
    industry: "Direct-to-Consumer E-Commerce",
    serviceUsed: "UI/UX Redesign & Performance Marketing",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    title: "Scaling a Fashion DTC Brand from ₹20L to ₹1.8Cr Monthly Revenue with High-Converting UX",
    challenge:
      "High bounce rate on mobile checkout funnel and skyrocketing customer acquisition costs (CAC) across Meta and Google ad campaigns.",
    solution:
      "Redesigned the complete mobile-first checkout experience with 1-click UPI payments, optimized Core Web Vitals to 98/100, and restructured the paid ad creative strategy.",
    results: [
      { value: "4.8x", metric: "Blended Return on Ad Spend (ROAS)" },
      { value: "62%", metric: "Checkout Drop-off Reduction" },
      { value: "₹15Cr+", metric: "Annual Gross Merchandise Value" },
    ],
  },
  {
    id: "edtech-mobile",
    client: "Saraswati Learn Hub",
    industry: "EdTech & Coaching LMS",
    serviceUsed: "Cross-Platform Mobile App & SEO",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    title: "Delivering Interactive Live Classrooms and Test Assessments to 80K+ Students",
    challenge:
      "Needed a seamless cross-platform mobile app capable of live HD video streaming in low-bandwidth rural networks with automated grading and instant fee payments.",
    solution:
      "Built a unified Flutter mobile application with adaptive video streaming, offline test caching, automated WhatsApp parent alerts, and integrated UPI fee collection.",
    results: [
      { value: "100K+", metric: "Active Mobile App Learners" },
      { value: "4.9 ★", metric: "Average App Store & Play Store Rating" },
      { value: "90%", metric: "Parent Engagement Rate" },
    ],
  },
];

export const ServicesCaseStudiesSection: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#F8FAFC] relative border-y border-slate-200/80">
      <Container size="wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1668E8] text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight">
            Real Impact. Verified Numbers. <br className="hidden sm:inline" />
            <span className="text-[#1668E8]">Client Success Stories</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            See how our tailored technology and digital growth services transformed businesses across industries.
          </p>
        </div>

        {/* Case Studies Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {study.industry}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${study.badgeColor}`}
                  >
                    {study.client}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-[#07152B] leading-snug mb-4">
                  {study.title}
                </h3>

                <div className="space-y-3 mb-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-900 font-semibold">Challenge: </strong>
                    {study.challenge}
                  </p>
                  <p>
                    <strong className="text-slate-900 font-semibold">Our Solution: </strong>
                    {study.solution}
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="pt-6 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {study.results.map((res, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-base sm:text-lg font-black text-[#1668E8]">{res.value}</div>
                      <div className="text-[10px] text-slate-500 font-medium leading-tight mt-1">
                        {res.metric}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
