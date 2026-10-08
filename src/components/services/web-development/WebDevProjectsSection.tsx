"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Globe2,
  Lock,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { WEB_PROJECTS, WebProjectItem } from "./webDevData";

export interface WebDevProjectsSectionProps {
  onStartProject?: () => void;
  className?: string;
}

const CATEGORIES = [
  "All Platforms",
  "SaaS Platform",
  "Enterprise Web App",
  "WebRTC Real-time",
  "E-Commerce",
] as const;

export const WebDevProjectsSection: React.FC<WebDevProjectsSectionProps> = ({
  onStartProject,
  className = "",
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All Platforms");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All Platforms") return WEB_PROJECTS;
    return WEB_PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="featured-web-projects"
      className={`relative w-full bg-[#020204] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/5 ${className}`}
    >
      {/* Background ambient gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, rgba(99, 102, 241, 0.03) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#38BDF8] mb-4">
              <Globe2 className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="tracking-wider uppercase">Production Deployments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Flagship Web Systems Operating in Production.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              Every system below is live, processing real user traffic, transactions, or low-latency media streams with rigorous reliability.
            </p>
          </div>

          {/* Live Status Counter */}
          <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>6 High-Scale Platforms</span>
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All Platforms"
                ? WEB_PROJECTS.length
                : WEB_PROJECTS.filter((p) => p.category === cat).length;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#38BDF8] text-black font-bold shadow-md shadow-cyan-500/20"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected ? "bg-black/20 text-black font-bold" : "bg-white/10 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Browser Mockup Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project: WebProjectItem) => (
            <div
              key={project.id}
              className="group relative flex flex-col rounded-2xl bg-[#0b0e14] border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#38BDF8]/50 hover:shadow-[0_16px_40px_rgba(56,189,248,0.12)] hover:-translate-y-1.5 flex-1"
            >
              {/* macOS Browser Chrome Header */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0e121a] border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                </div>

                {/* Simulated URL bar */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/60 border border-white/10 text-[11px] font-mono text-slate-400 max-w-[180px] sm:max-w-[210px] truncate">
                  <Lock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">https://{project.domainUrl}</span>
                </div>

                <div className="w-6 flex justify-end">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Operational" />
                </div>
              </div>

              {/* Viewport Frame with Real Image */}
              <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-950">
                <Image
                  src={project.image}
                  alt={`${project.name} Web Platform`}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent opacity-85" />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-black/75 backdrop-blur-md border border-white/15 text-slate-200">
                    {project.category}
                  </span>
                </div>

                {/* Direct Live Link Button */}
                {project.liveUrl && (
                  <div className="absolute top-3 right-3 z-10">
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-black/75 hover:bg-[#38BDF8] text-white hover:text-black flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-200 shadow-md group/btn"
                      aria-label={`Open ${project.name} live in new tab`}
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Card Meta & Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold text-[#818CF8] mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {/* Architecture Feature Highlight */}
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                    <span className="truncate text-[11.5px] font-medium">{project.highlight}</span>
                  </div>

                  {/* Performance SLA Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                          {m.label}
                        </span>
                        <span className="text-xs font-bold text-white font-mono mt-0.5">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-white/5 text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Link & Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  {project.liveUrl ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-semibold text-white hover:text-[#38BDF8] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Visit Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  ) : (
                    <span className="text-xs font-mono text-slate-500">Internal Enterprise Hub</span>
                  )}

                  {onStartProject && (
                    <button
                      type="button"
                      onClick={onStartProject}
                      className="text-xs font-mono font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      Inquire Similar →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
