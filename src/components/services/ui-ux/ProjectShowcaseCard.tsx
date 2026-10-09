"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { UiUxProjectCardData } from "./projectsData";

export interface ProjectShowcaseCardProps {
  project: UiUxProjectCardData;
  index: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Section 4 Dedicated Project Showcase Card
 * Scoped specifically for Section 4's diagonal square editorial composition.
 * Completely distinct from Section 1–3 ServiceCards.
 */
export const ProjectShowcaseCard = forwardRef<HTMLDivElement, ProjectShowcaseCardProps>(
  ({ project, index, style, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        id={`s4-project-card-${index}`}
        data-project-id={project.id}
        style={style}
        className={`absolute left-1/2 top-1/2 w-[180px] xs:w-[195px] sm:w-[215px] md:w-[235px] lg:w-[250px] xl:w-[265px] rounded-2xl bg-white border border-slate-200/90 shadow-[0_12px_32px_rgba(15,23,42,0.09)] overflow-hidden select-none will-change-transform transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.15)] ${className}`}
      >
        {/* Window Header Bar */}
        <div className="flex items-center justify-between px-2.5 py-1 sm:py-1.5 bg-slate-50/90 border-b border-slate-100">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>

          <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-white border border-slate-200/60">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: project.colorAccent }}
            />
            <span className="text-[8.5px] sm:text-[9px] font-mono font-semibold tracking-wide text-slate-700 uppercase">
              {`${project.number} // ${project.tag}`}
            </span>
          </div>

          <span className="text-[8px] font-mono text-slate-400">
            PROJ
          </span>
        </div>

        {/* Project Artwork Image */}
        <div className="relative w-full aspect-[16/9.5] bg-slate-100 overflow-hidden">
          <Image
            src={project.imageSrc}
            alt={project.alt}
            fill
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 265px"
            className="object-cover object-top"
          />
        </div>

        {/* Bottom Project Caption & Metrics */}
        <div className="px-3 py-1.5 sm:py-2 bg-white border-t border-slate-100/90 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-1">
            <h3 className="text-[10.5px] xs:text-[11px] sm:text-[11.5px] font-extrabold text-[#07152B] tracking-tight uppercase truncate">
              {project.title}
            </h3>
            <span
              className="text-[8px] sm:text-[8.5px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0"
              style={{ borderLeft: `2px solid ${project.colorAccent}` }}
            >
              {project.metric}
            </span>
          </div>
          <p className="text-[9px] sm:text-[9.5px] text-[#556987] leading-snug truncate mt-0.5">
            {project.category}
          </p>
        </div>
      </div>
    );
  }
);

ProjectShowcaseCard.displayName = "ProjectShowcaseCard";
