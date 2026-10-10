"use client";

import React, { useState } from "react";
import { Container } from "@/components/shared/ui/Container";
import { Cpu, Orbit, Sparkles, Layers, Box, Terminal } from "lucide-react";

interface TechCategory {
  id: string;
  category: string;
  shortLabel: string;
  description: string;
  tools: { name: string; role: string; highlight: string }[];
  accent: string;
}

const techCategories: TechCategory[] = [
  {
    id: "identity",
    category: "BRAND IDENTITY & VECTOR GEOMETRY",
    shortLabel: "DESIGN // VECTOR",
    description: "Mathematical precision tools for enduring identity systems and vector design.",
    tools: [
      { name: "Figma Enterprise", role: "Design Systems & Token Architecture", highlight: "Living Tokens" },
      { name: "Adobe Illustrator CC", role: "Precision Bézier & Vector Logomarks", highlight: "100% Vector" },
      { name: "Glyphs 3 & FontLab", role: "Custom Display Typography & Kerning", highlight: "Proprietary Fonts" },
      { name: "Pantone Connect", role: "Multi-Spectrum Chromatic Calibration", highlight: "CMYK / Spot" },
    ],
    accent: "#38bdf8",
  },
  {
    id: "packaging",
    category: "3D PACKAGING & INDUSTRIAL CGI",
    shortLabel: "3D // PACKAGING",
    description: "Studio-grade photorealistic rendering and packaging production engineering.",
    tools: [
      { name: "Cinema 4D & Octane", role: "8K Photorealistic Lighting & Materials", highlight: "GPU Raytracing" },
      { name: "Blender 4.x Spatial", role: "Interactive 3D Meshes & Asset Exports", highlight: "GLTF / USDZ" },
      { name: "Esko ArtiosCAD", role: "Structural Dieline Engineering & Testing", highlight: "Zero Production Flaw" },
      { name: "Substance 3D Painter", role: "Tactile Foil, Glass & Texture Shaders", highlight: "Physical Materials" },
    ],
    accent: "#818cf8",
  },
  {
    id: "tokens",
    category: "DIGITAL DESIGN TOKENS & WEBGL",
    shortLabel: "WEB // TOKENS",
    description: "Bridging the gap between brand design and sub-second digital storefronts.",
    tools: [
      { name: "Tokens Studio & Tailwind", role: "Automated CSS Variable Export", highlight: "Instant Dev Sync" },
      { name: "Three.js & WebGL", role: "Interactive 3D In-Browser Product Canvases", highlight: "60 FPS Smooth" },
      { name: "Next.js 15 App Core", role: "Sub-Second Omnichannel Digital UX", highlight: "99+ Performance" },
      { name: "Storybook 8 Enterprise", role: "Isolated Living Component Catalog", highlight: "Zero Regressions" },
    ],
    accent: "#a855f7",
  },
];

export const BrandingTechStackSection: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section
      id="brand-tech-stack"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 overflow-hidden border-t border-blue-900/40 [perspective:1200px]"
    >
      {/* Background Cosmic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full bg-blue-700/10 blur-[180px]" />
      </div>

      <Container size="wide" className="relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-cyan-400 text-xs font-mono font-bold shadow-sm backdrop-blur-xl">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>STUDIO ARSENAL &amp; PRODUCTION STACK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12]">
            Powered by World-Class <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Brand &amp; 3D Technologies.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We don’t rely on shallow web templates. We deploy industry-standard industrial CAD, GPU raytracing, and living design token pipelines to create flawless brand assets that scale across factories and screens.
          </p>
        </div>

        {/* Central Production Core Hub Indicator */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-950/90 border border-cyan-500/40 text-xs font-mono shadow-[0_0_25px_rgba(56,189,248,0.25)] backdrop-blur-2xl">
            <Orbit className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: "14s" }} />
            <span className="text-slate-300 font-bold">XSPACEWEB PRODUCTION CORE</span>
            <span className="text-slate-600">//</span>
            <span className="text-cyan-400">DEPTH ARSENAL ARCHITECTURE</span>
          </div>
        </div>

        {/* Studio Arsenal Categories Grid with Subtle Depth Physics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {techCategories.map((cat) => {
            const isHovered = hoveredCategory === cat.id;
            const isAnyHovered = hoveredCategory !== null;
            const isOther = isAnyHovered && !isHovered;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`relative rounded-3xl bg-[#07112b]/85 border border-blue-900/60 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between transition-all duration-300 cursor-default ${
                  isHovered
                    ? "border-cyan-500/60 shadow-[0_20px_45px_rgba(6,182,212,0.2)] -translate-y-1.5 scale-[1.01]"
                    : isOther
                    ? "opacity-60"
                    : "hover:border-blue-700"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Subtle Inner Glow */}
                <div
                  className="absolute -inset-0.5 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none -z-1"
                  style={{
                    opacity: isHovered ? 0.3 : 0,
                    background: `radial-gradient(circle at top left, ${cat.accent} 0%, transparent 70%)`,
                  }}
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[11px] font-mono font-bold tracking-widest uppercase block"
                      style={{ color: cat.accent }}
                    >
                      {cat.shortLabel}
                    </span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.accent }} />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {cat.category}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {cat.tools.map((tool, tIdx) => (
                    <div
                      key={tIdx}
                      className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-white tracking-tight">
                          {tool.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{tool.role}</div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-cyan-300 flex-shrink-0">
                        {tool.highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default BrandingTechStackSection;
