"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Code2,
  Smartphone,
  TrendingUp,
  Palette,
  Megaphone,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export interface ServiceDetail {
  id: string;
  number: string;
  title: string;
  category: "all" | "engineering" | "design" | "growth";
  tagline: string;
  description: string;
  iconGlowColor: string;
  iconBorderColor: string;
  iconBgColor: string;
  badge: string;
  accentColor: string;
  highlights: string[];
  deliverables: string[];
  technologies: string[];
  metrics: { value: string; label: string };
  renderIcon: () => React.ReactNode;
}

export const servicesData: ServiceDetail[] = [
  {
    id: "digital-marketing",
    number: "01",
    title: "Digital Marketing",
    category: "growth",
    tagline: "Performance-driven campaigns engineered for hyper-growth & ROI.",
    description:
      "We design and execute data-backed marketing strategies across Meta Ads, Google PPC, LinkedIn B2B campaigns, and conversion funnel optimization to bring high-intent customers to your business.",
    badge: "High Growth ROI",
    accentColor: "#9333EA",
    iconGlowColor: "rgba(168, 85, 247, 0.2)",
    iconBorderColor: "rgba(168, 85, 247, 0.3)",
    iconBgColor: "bg-purple-50",
    highlights: [
      "Precision Meta (Facebook/Instagram) & Google Ads management",
      "Full-funnel conversion rate optimization (CRO) & landing page testing",
      "B2B LinkedIn outreach and account-based marketing",
      "Omnichannel retargeting and automated email drip sequences",
    ],
    deliverables: [
      "Weekly Ad Performance Dashboards",
      "Creative Ad Visuals & Copywriting",
      "Customer Acquisition Funnels",
      "A/B Testing & Attribution Reports",
    ],
    technologies: ["Google Ads", "Meta Business Suite", "HubSpot", "Google Analytics 4", "Semrush"],
    metrics: { value: "4.8x", label: "Average ROAS Achieved" },
    renderIcon: () => (
      <svg className="w-8 h-8 text-[#9333EA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        <path d="M6 14.5V18a2 2 0 0 0 2 2h.5" />
        <path d="M19 7a4 4 0 0 1 0 10" />
      </svg>
    ),
  },
  {
    id: "website-development",
    number: "02",
    title: "Website Development",
    category: "engineering",
    tagline: "Ultra-fast, scalable and modern web applications that convert.",
    description:
      "From bespoke corporate websites to complex SaaS web applications, our engineering squad builds responsive, accessible, and high-converting web solutions with modern React & Next.js frameworks.",
    badge: "Most Popular",
    accentColor: "#2563EB",
    iconGlowColor: "rgba(37, 99, 235, 0.2)",
    iconBorderColor: "rgba(37, 99, 235, 0.3)",
    iconBgColor: "bg-blue-50",
    highlights: [
      "Next.js App Router, React 19, TypeScript & Tailwind CSS architecture",
      "Sub-second page load times with 95+ Google Lighthouse speed score",
      "Custom headless CMS integrations (Sanity, Strapi, WordPress)",
      "Enterprise security, SSL enforcement and automated CI/CD pipelines",
    ],
    deliverables: [
      "Full Source Code & GitHub Repository",
      "Production-Ready Cloud Deployment",
      "Responsive Desktop, Tablet & Mobile Views",
      "Admin CMS & Analytics Dashboard",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel"],
    metrics: { value: "< 500ms", label: "Average Page Load Time" },
    renderIcon: () => (
      <svg className="w-8 h-8 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
        <circle cx="6" cy="7" r="1" fill="currentColor" />
        <circle cx="9" cy="7" r="1" fill="currentColor" />
        <path d="m9 12 2-2-2-2" />
        <path d="M13 14h2" />
      </svg>
    ),
  },
  {
    id: "mobile-app-development",
    number: "03",
    title: "Mobile App Development",
    category: "engineering",
    tagline: "Seamless native and cross-platform apps for iOS & Android.",
    description:
      "We build robust, intuitive mobile applications engineered for high performance, smooth gestures, offline synchronization, and rapid deployment on the Apple App Store and Google Play Store.",
    badge: "Cross-Platform",
    accentColor: "#7C3AED",
    iconGlowColor: "rgba(124, 58, 237, 0.2)",
    iconBorderColor: "rgba(124, 58, 237, 0.3)",
    iconBgColor: "bg-indigo-50",
    highlights: [
      "Flutter and React Native cross-platform unified development",
      "Native iOS (Swift) & Android (Kotlin) specialized performance modules",
      "Real-time websocket notifications, biometrics & in-app payments",
      "App Store & Google Play submission and compliance assistance",
    ],
    deliverables: [
      "Production iOS & Android Binary Builds",
      "REST & GraphQL Backend APIs",
      "App Store Publishing & Review Setup",
      "Post-Launch Maintenance SLA",
    ],
    technologies: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "Fastlane", "Supabase"],
    metrics: { value: "99.9%", label: "Crash-Free Sessions" },
    renderIcon: () => (
      <svg className="w-8 h-8 text-[#7C3AED]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2.5" />
        <path d="M12 18h.01" strokeWidth="2.5" />
        <circle cx="12" cy="7" r="1.5" />
        <rect width="6" height="5" x="9" y="10" rx="1" />
      </svg>
    ),
  },
  {
    id: "seo",
    number: "04",
    title: "Search Engine Optimization (SEO)",
    category: "growth",
    tagline: "Rank on Page #1 for competitive high-volume search queries.",
    description:
      "Transform search engines into an unstoppable customer acquisition engine. We handle technical SEO, semantic keyword architecture, authoritative link building, schema markup, and speed audits.",
    badge: "Organic Inbound",
    accentColor: "#10B981",
    iconGlowColor: "rgba(16, 185, 129, 0.2)",
    iconBorderColor: "rgba(16, 185, 129, 0.3)",
    iconBgColor: "bg-emerald-50",
    highlights: [
      "Comprehensive site crawl, indexation audit & Core Web Vitals fix",
      "High-intent commercial keyword mapping & competitive gap analysis",
      "Schema.org structured data, rich snippets & local map pack ranking",
      "High-authority backlink outreach & PR syndication",
    ],
    deliverables: [
      "Full 100-Point Technical SEO Audit",
      "Quarterly Keyword Roadmap & Strategy",
      "Monthly Organic Ranking & Traffic Reports",
      "On-Page Optimization Playbook",
    ],
    technologies: ["Ahrefs", "Semrush", "Google Search Console", "Screaming Frog", "Schema Markup"],
    metrics: { value: "+340%", label: "Average Organic Traffic Lift" },
    renderIcon: () => (
      <svg className="w-8 h-8 text-[#10B981]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <rect x="6" y="13" width="3" height="5" rx="0.5" fill="currentColor" fillOpacity="0.2" />
        <rect x="11" y="9" width="3" height="9" rx="0.5" fill="currentColor" fillOpacity="0.2" />
        <rect x="16" y="5" width="3" height="13" rx="0.5" fill="currentColor" fillOpacity="0.2" />
        <path d="m6 13 5-4 5-4 4-2" />
        <path d="M17 3h4v4" />
      </svg>
    ),
  },
  {
    id: "ui-ux-design",
    number: "05",
    title: "UI/UX Design & Prototyping",
    category: "design",
    tagline: "Human-centered interfaces crafted with obsessive attention to detail.",
    description:
      "We design digital products that look stunning and feel natural to use. From user journeys and wireframing to pixel-perfect design systems in Figma with interactive micro-animations.",
    badge: "Design Excellence",
    accentColor: "#EC4899",
    iconGlowColor: "rgba(236, 72, 153, 0.2)",
    iconBorderColor: "rgba(236, 72, 153, 0.3)",
    iconBgColor: "bg-rose-50",
    highlights: [
      "User research, competitive benchmarking & persona mapping",
      "High-fidelity clickable prototypes with micro-interactions in Figma",
      "Scalable Design Systems with typography tokens, components & variants",
      "Usability testing and heuristic evaluations for friction-free UX",
    ],
    deliverables: [
      "Complete Figma Design Files & Assets",
      "Reusable Component Design System",
      "Interactive Clickable Prototype",
      "Developer Hand-off Documentation & Specs",
    ],
    technologies: ["Figma", "Framer", "Adobe XD", "Principle", "Lottie", "Storybook"],
    metrics: { value: "3.2x", label: "User Task Completion Rate" },
    renderIcon: () => (
      <svg className="w-8 h-8 text-[#EC4899]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19 7-7 3 3-7 7-3-3z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="m2 2 7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    id: "graphic-design",
    number: "06",
    title: "Graphic Design & Brand Identity",
    category: "design",
    tagline: "Memorable brand identities, visual assets and marketing collateral.",
    description:
      "Elevate your brand's presence with world-class visual identities, custom vector illustrations, 3D product visuals, pitch decks, and cohesive marketing assets tailored for multi-channel impact.",
    badge: "Creative Impact",
    accentColor: "#8B5CF6",
    iconGlowColor: "rgba(139, 92, 246, 0.2)",
    iconBorderColor: "rgba(139, 92, 246, 0.3)",
    iconBgColor: "bg-purple-50",
    highlights: [
      "Brand identity creation: Logo, color palette, typography & voice guide",
      "Custom vector illustrations, icons & 3D promotional renders",
      "Social media marketing kits, presentation pitch decks & print media",
      "Packaging, brand stationery, business cards & merchandise design",
    ],
    deliverables: [
      "Vector Logo Formats (SVG, EPS, PNG, PDF)",
      "Comprehensive Brand Style Guide",
      "Social Media Templates (Canva/PSD)",
      "Print-Ready Collateral Files",
    ],
    technologies: ["Adobe Illustrator", "Photoshop", "After Effects", "Blender 3D", "InDesign"],
    metrics: { value: "100%", label: "Vector Quality & IP Ownership" },
    renderIcon: () => (
      <svg className="w-8 h-8 text-[#8B5CF6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
];

interface ServicesOverviewSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesOverviewSection: React.FC<ServicesOverviewSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<"all" | "engineering" | "design" | "growth">("all");
  const [activeServiceId, setActiveServiceId] = useState<string>("website-development");

  const filteredServices =
    activeCategory === "all"
      ? servicesData
      : servicesData.filter((s) => s.category === activeCategory);

  const selectedService = servicesData.find((s) => s.id === activeServiceId) || servicesData[1];

  return (
    <section id="explore-services" className="w-full py-16 sm:py-24 bg-white relative">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-slate-100 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1668E8] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Spectrum Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight">
              Services Designed to <br className="hidden sm:inline" />
              <span className="text-[#1668E8]">Scale Your Business</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore our core capabilities across design, technology, and organic growth. Every solution is tailored to your business goals.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 self-start md:self-end">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === "all"
                  ? "bg-white text-[#07152B] shadow-sm"
                  : "text-slate-600 hover:text-[#07152B]"
              }`}
            >
              All Services (6)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("engineering")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === "engineering"
                  ? "bg-white text-[#07152B] shadow-sm"
                  : "text-slate-600 hover:text-[#07152B]"
              }`}
            >
              Engineering & Web
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("design")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === "design"
                  ? "bg-white text-[#07152B] shadow-sm"
                  : "text-slate-600 hover:text-[#07152B]"
              }`}
            >
              Design & Brand
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory("growth")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === "growth"
                  ? "bg-white text-[#07152B] shadow-sm"
                  : "text-slate-600 hover:text-[#07152B]"
              }`}
            >
              Growth & SEO
            </button>
          </div>
        </div>

        {/* 6 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredServices.map((service) => {
            const isSelected = activeServiceId === service.id;

            return (
              <div
                key={service.id}
                id={service.id}
                onClick={() => setActiveServiceId(service.id)}
                className={`group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? "bg-gradient-to-b from-blue-50/50 to-white border-blue-400 shadow-[0_12px_32px_-4px_rgba(22,104,232,0.15)] ring-2 ring-blue-500/20 -translate-y-1"
                    : "bg-white border-slate-200/90 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                <div>
                  {/* Top Row: Icon Badge & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${service.iconBgColor} flex items-center justify-center border transition-transform duration-300 group-hover:scale-110`}
                      style={{
                        borderColor: service.iconBorderColor,
                        boxShadow: `0 8px 20px -4px ${service.iconGlowColor}`,
                      }}
                    >
                      {service.renderIcon()}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {service.badge}
                      </span>
                      <span className="text-xs font-extrabold text-slate-300">
                        {service.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#07152B] mb-2 group-hover:text-[#1668E8] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#1668E8] mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Key Highlights Bullet Points */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Core Highlights
                    </span>
                    {service.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 4 && (
                      <span className="text-[11px] font-medium px-2 py-1 rounded-lg bg-slate-100 text-slate-500">
                        +{service.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Metric & Action Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto">
                  <div>
                    <div className="text-lg font-extrabold text-[#07152B]">{service.metrics.value}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{service.metrics.label}</div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectService) onSelectService(service.title);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#07152B] text-white text-xs font-bold hover:bg-[#1668E8] transition-all shadow-sm active:scale-95"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlighted Deep-Dive Modal / Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#07152B] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-wide">
                <Zap className="w-3.5 h-3.5 text-blue-400" />
                <span>Featured Deep Dive: {selectedService.title}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {selectedService.tagline}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {selectedService.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {selectedService.deliverables.map((del, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-4">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 w-full text-center">
                <div className="text-3xl font-extrabold text-blue-400 mb-1">
                  {selectedService.metrics.value}
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  {selectedService.metrics.label}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onSelectService) onSelectService(selectedService.title);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Request {selectedService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
