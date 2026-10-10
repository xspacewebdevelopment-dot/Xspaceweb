"use client";

import React, { useState } from "react";
import {
  Server,
  Zap,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Activity,
  Layers,
  Code2,
} from "lucide-react";
import { ARCHITECTURAL_TIERS, ArchitecturalTier } from "./webDevData";

export interface WebDevCapabilitiesSectionProps {
  onStartProject?: () => void;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "edge-ssr": Server,
  "realtime-webrtc": Zap,
  "saas-multitenant": ShieldCheck,
  "headless-ecommerce": ShoppingBag,
};

export const WebDevCapabilitiesSection: React.FC<WebDevCapabilitiesSectionProps> = ({
  onStartProject,
  className = "",
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>("edge-ssr");
  const [consoleView, setConsoleView] = useState<"flow" | "code">("flow");
  const [hasCopied, setHasCopied] = useState(false);

  const activeTier: ArchitecturalTier =
    ARCHITECTURAL_TIERS.find((t) => t.id === selectedTierId) || ARCHITECTURAL_TIERS[0];

  const handleCopyCode = () => {
    if (!activeTier.codeSample?.code) return;
    navigator.clipboard.writeText(activeTier.codeSample.code);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <section
      id="engineering-architecture"
      className={`relative w-full bg-gradient-to-b from-white via-slate-50/70 to-white text-slate-900 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-slate-200/80 ${className}`}
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-blue-700 mb-4">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span className="tracking-wider uppercase">System Architecture Lab</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Full-Stack Architectures Built for High Throughput.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              We design web systems tailored to strict performance SLAs. Switch between our core architectural archetypes to inspect their live request topology and production code blueprints.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Production Ready
            </span>
          </div>
        </div>

        {/* Archetype Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {ARCHITECTURAL_TIERS.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            const Icon = iconMap[tier.id] || Server;
            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`group relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-white border-blue-600 shadow-[0_4px_20px_rgba(37,99,235,0.12)] ring-1 ring-blue-600"
                    : "bg-white/80 border-slate-200/80 hover:border-blue-300 hover:bg-white text-slate-700 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-500 group-hover:text-blue-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                    )}
                  </div>
                  <h3
                    className={`text-sm sm:text-base font-bold transition-colors ${
                      isSelected ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                    }`}
                  >
                    {tier.badge}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-500 mt-2 block truncate">
                  {tier.metrics[0].label}: {tier.metrics[0].value}
                  {tier.metrics[0].unit}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Architecture Console Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Architecture Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 backdrop-blur-md">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-mono font-medium mb-3">
                <span>{activeTier.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                {activeTier.title}
              </h3>
              <p className="text-xs font-semibold text-blue-600 font-mono mb-4">
                {activeTier.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {activeTier.summary}
              </p>

              {/* Architectural Highlights */}
              <div className="space-y-2.5 pt-4 border-t border-slate-200/80">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                  Core Engineering Guarantees
                </span>
                {activeTier.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-200/80">
                {activeTier.metrics.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      {m.label}
                    </span>
                    <span className="text-lg font-mono font-bold text-blue-600 mt-0.5 block">
                      {m.value}
                      <span className="text-xs text-slate-500 ml-0.5">{m.unit}</span>
                    </span>
                  </div>
                ))}
              </div>

              {onStartProject && (
                <button
                  type="button"
                  onClick={onStartProject}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/20 active:scale-[0.98]"
                >
                  <span>Build with this Architecture</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Interactive Dark Console / Flow Terminal */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0a0f1d] border border-slate-800 overflow-hidden shadow-2xl">
              {/* macOS Window Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                    {activeTier.id}.arch.console
                  </span>
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950 border border-slate-800">
                  <button
                    onClick={() => setConsoleView("flow")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                      consoleView === "flow"
                        ? "bg-blue-600 text-white font-bold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Activity className="w-3 h-3" />
                    <span>Flow Topology</span>
                  </button>
                  <button
                    onClick={() => setConsoleView("code")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                      consoleView === "code"
                        ? "bg-blue-600 text-white font-bold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Code2 className="w-3 h-3" />
                    <span>Blueprint Code</span>
                  </button>
                </div>
              </div>

              {/* Console Body: Flow Topology */}
              {consoleView === "flow" && (
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/5">
                    <span>LIVE REQUEST PIPELINE</span>
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Latency: ~{activeTier.metrics[0].value}
                      {activeTier.metrics[0].unit}
                    </span>
                  </div>

                  {/* Visual Node Diagram */}
                  <div className="space-y-4">
                    {activeTier.pipelineNodes.map((node, nIdx) => (
                      <div key={nIdx} className="relative">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#38BDF8]/40 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center font-mono text-xs font-bold text-[#38BDF8]">
                              0{nIdx + 1}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white font-mono">
                                {node.label}
                              </div>
                              <div className="text-xs text-slate-400 mt-0.5">
                                {node.sublabel}
                              </div>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-emerald-400">
                            {node.status}
                          </span>
                        </div>

                        {/* Connection link indicator between nodes */}
                        {nIdx < activeTier.pipelineNodes.length - 1 && (
                          <div className="flex justify-center my-1">
                            <div className="w-0.5 h-4 bg-gradient-to-b from-[#38BDF8]/60 to-[#818CF8]/60" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Benchmark Output Box */}
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-slate-300">
                    <div className="text-slate-500 mb-1">$ curl -I -w "@timing.txt" https://edge.xspaceweb.dev/health</div>
                    <div className="text-emerald-400">HTTP/2 200 OK</div>
                    <div className="text-slate-400">x-cache: HIT (Edge-Cloudflare-PoP)</div>
                    <div className="text-slate-400">time_connect: 0.012s | time_starttransfer: 0.038s</div>
                    <div className="text-emerald-400">result: PASSED 100/100 Core Web Vitals audit</div>
                  </div>
                </div>
              )}

              {/* Console Body: Code Blueprint */}
              {consoleView === "code" && (
                <div className="relative">
                  {/* File Header */}
                  <div className="flex items-center justify-between px-5 py-2.5 bg-[#0b0e14] border-b border-white/10 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>{activeTier.codeSample.filename}</span>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
                      title="Copy code"
                    >
                      {hasCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Code snippet */}
                  <pre className="p-5 sm:p-6 text-xs sm:text-[13px] font-mono leading-relaxed text-slate-200 overflow-x-auto max-h-[460px] bg-[#05070a]">
                    <code>{activeTier.codeSample.code}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
