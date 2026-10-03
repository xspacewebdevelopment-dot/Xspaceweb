"use client";

import React, { useState } from "react";
import { Code2, Sparkles, Cpu, Layers, Database, Smartphone, Globe, Shield } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface TechCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  technologies: { name: string; tag: string; description: string }[];
}

const techCategories: TechCategory[] = [
  {
    id: "frontend",
    name: "Frontend & Web",
    icon: <Globe className="w-5 h-5" />,
    technologies: [
      { name: "Next.js 15", tag: "App Router", description: "Production SSR, SSG & Server Components" },
      { name: "React 19", tag: "UI Framework", description: "Modular reactive component state architecture" },
      { name: "TypeScript", tag: "Type Safety", description: "Robust strict typing for enterprise reliability" },
      { name: "Tailwind CSS", tag: "Styling", description: "High-speed utility-first responsive styling" },
      { name: "Framer Motion", tag: "Animations", description: "Fluid, 60fps micro-interactions & physics" },
    ],
  },
  {
    id: "mobile",
    name: "Mobile Ecosystem",
    icon: <Smartphone className="w-5 h-5" />,
    technologies: [
      { name: "Flutter", tag: "Cross-Platform", description: "High-fidelity iOS & Android compiled code" },
      { name: "React Native", tag: "Cross-Platform", description: "Native JS bridge with deep device hooks" },
      { name: "Swift / iOS", tag: "Native Apple", description: "Optimized performance & Apple SDK APIs" },
      { name: "Kotlin / Android", tag: "Native Google", description: "Modern Android ecosystem & Play Services" },
    ],
  },
  {
    id: "backend",
    name: "Backend & Cloud",
    icon: <Database className="w-5 h-5" />,
    technologies: [
      { name: "Node.js & Express", tag: "Backend Runtime", description: "High-concurrency event-driven microservices" },
      { name: "Python & FastAPI", tag: "API & Data", description: "High-speed async APIs & AI/ML processing" },
      { name: "PostgreSQL", tag: "Relational DB", description: "ACID-compliant enterprise transactional data" },
      { name: "Redis", tag: "In-Memory Cache", description: "Sub-millisecond latency session caching" },
      { name: "AWS & Vercel", tag: "Cloud Infrastructure", description: "Global edge CDN & serverless scaling" },
    ],
  },
  {
    id: "design-growth",
    name: "Design & Growth Tools",
    icon: <Sparkles className="w-5 h-5" />,
    technologies: [
      { name: "Figma & Framer", tag: "UI/UX Design", description: "Collaborative design systems & prototyping" },
      { name: "Google Analytics 4", tag: "Web Analytics", description: "Event-based user journey tracking" },
      { name: "Semrush & Ahrefs", tag: "SEO Intelligence", description: "Competitor gap analysis & keyword ranking" },
      { name: "Meta Business Manager", tag: "Paid Advertising", description: "Pixel tracking & algorithm-driven ad scaling" },
    ],
  },
];

export const ServicesTechStackSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("frontend");

  const currentCategory = techCategories.find((c) => c.id === activeTab) || techCategories[0];

  return (
    <section className="w-full py-16 sm:py-24 bg-white relative">
      <Container size="wide">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1668E8] text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Modern Engineering Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight">
            Built with the Best <br className="hidden sm:inline" />
            <span className="text-[#1668E8]">Technologies & Tools</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We don&apos;t settle for legacy stacks. We build on battle-tested, high-performance technology ecosystems.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {techCategories.map((category) => {
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#07152B] text-white shadow-md scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Technologies Grid (2 columns on mobile, responsive for desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {currentCategory.technologies.map((tech, idx) => (
            <div
              key={idx}
              className="p-3.5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 mb-2 sm:mb-3">
                <h4 className="text-sm sm:text-lg font-extrabold text-[#07152B]">{tech.name}</h4>
                <span className="self-start text-[9.5px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#1668E8]">
                  {tech.tag}
                </span>
              </div>
              <p className="text-[11px] sm:text-sm text-slate-600 leading-relaxed">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
