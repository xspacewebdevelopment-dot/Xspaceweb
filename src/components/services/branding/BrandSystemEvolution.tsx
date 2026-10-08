"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import {
  Sparkles,
  ArrowRight,
  Layers,
  Box,
  Palette,
  Cpu,
  Globe,
  CheckCircle2,
} from "lucide-react";

interface EvolutionScene {
  id: string;
  step: string;
  name: string;
  headline: string;
  copy: string;
  image: string;
  accent: string;
  tags: string[];
  specs: { label: string; value: string }[];
}

const scenes: EvolutionScene[] = [
  {
    id: "foundation",
    step: "01",
    name: "FOUNDATION",
    headline: "Positioning becomes visual structure.",
    copy: "Before aesthetics, there is mathematics. We define geometric axes, optical kerning ratios, bespoke display ligatures, and an unshakeable chromatic hierarchy that will anchor all future assets.",
    image: "/images/services/branding/visual_identity.jpg",
    accent: "#38bdf8",
    tags: ["Mathematical Grid", "Bézier Precision", "Chromatic Psychology", "Vector Bible"],
    specs: [
      { label: "Geometry", value: "100% Vector" },
      { label: "Scalability", value: "16px to 50ft" },
    ],
  },
  {
    id: "identity",
    step: "02",
    name: "IDENTITY",
    headline: "The identity learns to speak consistently.",
    copy: "The atomic mark expands into tangible real-world collateral: luxury business stationery, editorial guidelines, social identity kits, and iconic packaging seals that build immediate brand authority.",
    image: "/images/services/branding/luxury_packaging.jpg",
    accent: "#818cf8",
    tags: ["Brand Guidelines", "Stationery Suite", "Social Master Kit", "Packaging Insigne"],
    specs: [
      { label: "Asset Pack", value: "60+ Files" },
      { label: "IP Clearance", value: "100% Granted" },
    ],
  },
  {
    id: "system",
    step: "03",
    name: "SYSTEM",
    headline: "Design becomes infrastructure.",
    copy: "Figma design tokens directly synchronize with production CSS variables. Spacing units, typographic ramps, dark/light chromatic pairings, and motion curves become living code infrastructure.",
    image: "/images/services/branding/design_tokens.jpg",
    accent: "#a855f7",
    tags: ["400+ Figma Tokens", "Tailwind Theme Sync", "Motion Curves", "Component Catalog"],
    specs: [
      { label: "Code Handoff", value: "-65% Time" },
      { label: "Sync Velocity", value: "Sub-Second" },
    ],
  },
  {
    id: "market",
    step: "04",
    name: "MARKET",
    headline: "One system. Every touchpoint.",
    copy: "Digital storefronts, mobile checkouts, physical retail dielines, social video stings, and investor decks all draw from the exact same living system. Complete market coherence creates unstoppable brand velocity.",
    image: "/images/services/branding/omnichannel_showcase.jpg",
    accent: "#10b981",
    tags: ["Next.js Storefront", "Industrial Dielines", "Amazon A+ Sync", "Kinetic 3D Video"],
    specs: [
      { label: "AOV Lift", value: "+48%" },
      { label: "Conversion", value: "3.2x CTR" },
    ],
  },
];

interface StackingCardProps {
  scene: EvolutionScene;
  index: number;
  totalCards: number;
  containerProgress: MotionValue<number>;
}

const StackingCard: React.FC<StackingCardProps> = ({
  scene,
  index,
  totalCards,
  containerProgress,
}) => {
  // Scale down previous cards as following cards scroll on top (Stacking Cards pattern from 21st.dev)
  const startRange = index / totalCards;
  const endRange = 1;
  const targetScale = 1 - (totalCards - 1 - index) * 0.035;

  const scale = useTransform(
    containerProgress,
    [startRange, endRange],
    [1, targetScale]
  );

  const opacity = useTransform(
    containerProgress,
    [startRange + 0.15, endRange],
    [1, index === totalCards - 1 ? 1 : 0.65]
  );

  return (
    <div
      id={`evolution-scene-${index}`}
      className="sticky top-24 sm:top-28 w-full mb-12 sm:mb-16 will-change-transform"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          transformOrigin: "top center",
        }}
        className="w-full rounded-3xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.9)] relative group"
      >
        {/* Subtle Outer Neon Aura */}
        <div
          className="absolute -inset-0.5 rounded-3xl opacity-25 pointer-events-none -z-1 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at top left, ${scene.accent} 0%, transparent 65%)`,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-mono font-bold px-3 py-1 rounded-full border shadow-sm"
                  style={{
                    borderColor: `${scene.accent}50`,
                    color: scene.accent,
                    backgroundColor: `${scene.accent}15`,
                  }}
                >
                  SCENE {scene.step} // {scene.name}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  STAGE {index + 1} OF 4
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {scene.headline}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {scene.copy}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {scene.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800/80 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Specs / Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/80">
              {scene.specs.map((spec, sIdx) => (
                <div key={sIdx} className="space-y-0.5">
                  <div
                    className="text-2xl sm:text-3xl font-black tracking-tight"
                    style={{ color: scene.accent }}
                  >
                    {spec.value}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Artwork Showcase */}
          <div className="lg:col-span-6">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800/90 bg-slate-900/60 shadow-2xl group-hover:border-slate-700 transition-colors">
              <Image
                src={scene.image}
                alt={scene.name}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Technical Overlay Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-cyan-400 backdrop-blur-md">
                // SPEC: 100% VECTOR MESH
              </div>

              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300 backdrop-blur-md">
                {scene.name} PROTOCOL
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const BrandSystemEvolution: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeTab, setActiveTab] = useState(0);

  const scrollToScene = (idx: number) => {
    setActiveTab(idx);
    const element = document.getElementById(`evolution-scene-${idx}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="brand-system-evolution"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 border-t border-slate-900/80"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full blur-[200px] opacity-20 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #38bdf8 0%, #818cf8 35%, transparent 70%)",
            }}
          />
        </div>
      </div>

      <Container size="wide" className="relative z-10 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-cyan-400 text-xs font-mono font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>BRAND SYSTEM EVOLUTION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12]">
              From a Mark to a <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Market System.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Four progressive architectural stages that systematically transform initial geometry into an unstoppable omnichannel market moat.
            </p>
          </div>

          {/* Interactive Stage Jump Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-xl shadow-xl">
            {scenes.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToScene(idx)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  activeTab === idx
                    ? "bg-slate-900 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Stacking Cards Scroll Track */}
        <div className="relative w-full max-w-6xl mx-auto pt-4 pb-12">
          {scenes.map((scene, idx) => (
            <StackingCard
              key={scene.id}
              scene={scene}
              index={idx}
              totalCards={scenes.length}
              containerProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom Mission Anchor */}
        <div className="text-center pt-8 border-t border-slate-800/70">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950/90 border border-cyan-500/40 text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase shadow-[0_0_20px_rgba(56,189,248,0.25)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>FROM A MARK TO A MARKET SYSTEM.</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrandSystemEvolution;
