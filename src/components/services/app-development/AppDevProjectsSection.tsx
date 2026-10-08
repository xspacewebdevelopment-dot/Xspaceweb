"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Smartphone, CheckCircle2 } from "lucide-react";
import { APP_PROJECTS, AppProjectItem } from "./appDevData";

export interface AppDevProjectsSectionProps {
  onStartProject?: () => void;
  className?: string;
}

export const AppDevProjectsSection: React.FC<AppDevProjectsSectionProps> = ({
  onStartProject,
  className = "",
}) => {
  return (
    <section
      id="featured-app-projects"
      className={`relative w-full bg-[#020204] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-12 ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(22, 104, 232, 0.12) 0%, rgba(99, 102, 241, 0.06) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-10 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(219, 39, 119, 0.10) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Intro */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.3)] mb-4 backdrop-blur-md">
            <Smartphone className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[10.5px] sm:text-[11px] font-semibold tracking-[0.20em] text-[#38BDF8] uppercase font-mono">
              FLAGSHIP MOBILE & SAAS APPS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Engineered for Scale.{" "}
            <span className="block sm:inline bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#EC4899] bg-clip-text text-transparent">
              Deployed for Impact.
            </span>
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            Explore our flagship mobile applications, SaaS platforms, and enterprise solutions architected, built, and deployed by XSPACEWEB.
          </p>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
          {APP_PROJECTS.map((project: AppProjectItem, idx: number) => {
            const isExt = project.isExternal;
            const CardLink = isExt ? "a" : Link;
            const linkProps = isExt
              ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
              : { href: project.href };

            return (
              <div
                key={project.id}
                id={`app-project-card-${idx}`}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800/90 overflow-hidden shadow-[0_16px_36px_rgba(0,0,0,0.4)] hover:shadow-[0_24px_50px_rgba(22,104,232,0.18)] hover:border-slate-700 hover:-translate-y-1.5 transition-all duration-300 backdrop-blur-sm"
              >
                {/* Card Top: Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/70 border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                    <span className="w-2 h-2 rounded-full bg-slate-800" />
                    <span className="w-2 h-2 rounded-full bg-slate-800" />
                  </div>

                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="text-[9.5px] font-mono font-semibold tracking-wider text-slate-300 uppercase">
                      {project.number} // {project.badge}
                    </span>
                  </div>

                  <span className="text-[9px] font-mono text-slate-500">
                    APP
                  </span>
                </div>

                {/* Project Image Preview */}
                <div className="relative w-full aspect-[16/10] bg-slate-950 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src={project.imageSrc}
                    alt={`${project.title} App Preview`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                  {/* Subtle Gradient Scrim at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Metric Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 border border-white/10 text-[10px] font-mono font-semibold text-white shadow-lg backdrop-blur-md flex items-center gap-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span>{project.metric}</span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#38BDF8] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                        {project.category}
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/60 text-slate-300 border border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <CardLink
                      {...(linkProps as any)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#38BDF8] hover:text-white transition-colors group/link cursor-pointer"
                    >
                      <span>Launch Experience</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </CardLink>

                    <span className="text-[10px] font-mono text-slate-500">
                      {isExt ? "Live Domain" : "Internal App"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-purple-950/40 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-2xl">
          <div>
            <span className="text-xs font-mono font-semibold text-[#38BDF8] uppercase tracking-wider">
              HAVE A CUSTOM APP CONCEPT?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Let&apos;s build and scale your next mobile application.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              From MVP architecture to multi-tenant deployment, our senior mobile engineers deliver cross-platform apps that perform.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartProject}
            className="px-6 py-3 rounded-full bg-[#1668E8] text-white text-xs sm:text-sm font-semibold hover:bg-[#1255C0] shadow-[0_4px_20px_rgba(22,104,232,0.35)] transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            Start Your App Project
          </button>
        </div>
      </div>
    </section>
  );
};
