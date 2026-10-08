"use client";

import React, { useState } from "react";
import {
  Compass,
  GitBranch,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Terminal,
  ArrowRight,
  GitCommit,
  Layers,
} from "lucide-react";

interface PipelineStep {
  step: string;
  title: string;
  badge: string;
  shortDesc: string;
  deepDive: string;
  deliverables: string[];
  gitLogs: { command: string; output: string }[];
  icon: React.ComponentType<{ className?: string }>;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    step: "01",
    title: "Technical Blueprint & Schema ERD",
    badge: "Architecture Phase",
    shortDesc: "Database modeling, OpenAPI schemas, and SLA definitions before coding.",
    deepDive:
      "We eliminate architectural rework by modeling database entity relationships (ERDs), establishing multi-tenant tenant isolation policies, mapping state transitions, and defining REST/GraphQL API specifications.",
    deliverables: [
      "Entity Relationship Diagram (ERD)",
      "OpenAPI 3.0 Type-Safe Specifications",
      "Infrastructure Architecture Diagram",
      "Performance SLAs (TTFB, Latency, Uptime)",
    ],
    gitLogs: [
      { command: "init --blueprint architecture/v1.0", output: "✓ Schema validated: 14 models, 32 relations" },
      { command: "security-check --compliance", output: "✓ Row-Level Security policies generated" },
    ],
    icon: Compass,
  },
  {
    step: "02",
    title: "Design Tokens & Atomic Components",
    badge: "UI Engineering",
    shortDesc: "Translating Figma designs into accessible React 19 component tokens.",
    deepDive:
      "We create a reusable design system in code with strict typography tokens, fluid layout calculations, dark/light theme variables, and WCAG 2.1 AA accessibility standards.",
    deliverables: [
      "Atomic Component Library (Button, Input, Modal)",
      "Design Token Variables (CSS Variables)",
      "Responsive Grid Breakpoint Rules",
      "WCAG 2.1 AA Contrast Validation",
    ],
    gitLogs: [
      { command: "build-tokens --figma-sync", output: "✓ 64 tokens compiled to CSS variables" },
      { command: "a11y-audit --strict", output: "✓ 0 contrast errors, full keyboard navigation ready" },
    ],
    icon: GitBranch,
  },
  {
    step: "03",
    title: "Sprint Execution & PR Gating",
    badge: "Agile Development",
    shortDesc: "Two-week agile sprints with automated GitHub Actions CI checks.",
    deepDive:
      "Our engineers build feature modules in 2-week agile sprints. Every Pull Request must pass strict TypeScript checks, unit test suites, and automated preview deployments before merging to main.",
    deliverables: [
      "Modular Next.js / React Source Code",
      "Automated GitHub Actions CI Workflows",
      "Branch-Specific Staging Previews",
      "Weekly Sprint Demonstrations",
    ],
    gitLogs: [
      { command: "git push origin feature/cart-redis-atomic", output: "✓ PR #42 created: Automated checks running..." },
      { command: "npm test -- --coverage", output: "✓ 88 test suites passed (94.2% test coverage)" },
      { command: "tsc --noEmit", output: "✓ 0 TypeScript errors found" },
    ],
    icon: Code2,
  },
  {
    step: "04",
    title: "Rigorous QA & Security Penetration",
    badge: "Quality Assurance",
    shortDesc: "OWASP Top 10 auditing, stress testing, and Lighthouse CI.",
    deepDive:
      "We stress-test applications up to 10,000 simulated concurrent users, run OWASP penetration checks against SQL injection and CSRF, and verify that mobile Lighthouse scores exceed 95+.",
    deliverables: [
      "Lighthouse CI Performance Audit (95+)",
      "Artillery / k6 High-Concurrency Stress Report",
      "OWASP Security Vulnerability Scan",
      "Cross-Browser Compatibility Matrix",
    ],
    gitLogs: [
      { command: "k6 run --vus 5000 test-concurrency.js", output: "✓ 5,000 VUs: 0% error rate, p99 < 85ms" },
      { command: "owasp-zap --target https://staging.app", output: "✓ 0 High/Critical vulnerabilities detected" },
    ],
    icon: ShieldCheck,
  },
  {
    step: "05",
    title: "Zero-Downtime Blue-Green Deployment",
    badge: "Production Launch",
    shortDesc: "Global edge CDN routing with automated rollbacks and Sentry telemetry.",
    deepDive:
      "We roll out releases with zero downtime using blue-green canary traffic shifting. Production telemetry monitors Core Web Vitals, API error rates, and database connections 24/7.",
    deliverables: [
      "Live Production Cloud Deployment",
      "Global Edge CDN Routing & Automated SSL",
      "Sentry & Datadog Real-Time Telemetry",
      "Full Codebase & Deployment Documentation",
    ],
    gitLogs: [
      { command: "deploy --prod --traffic-shift canary:10->100", output: "✓ Traffic shifted cleanly. Active pods: 12" },
      { command: "sentry-cli releases finalize v2.4.0", output: "✓ Release healthy: error rate 0.001%" },
    ],
    icon: Rocket,
  },
];

export const WebDevProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = PIPELINE_STEPS[activeStepIndex];

  return (
    <section
      id="development-lifecycle"
      className="relative w-full bg-[#020204] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/5"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#38BDF8] mb-4">
              <Rocket className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="tracking-wider uppercase">Engineering Delivery Track</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Disciplined 5-Stage Engineering Pipeline.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              We replace guesswork with repeatable software engineering practices: strict Git branching, automated CI testing, and blue-green rollouts.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              Zero-Downtime Guarantee
            </span>
          </div>
        </div>

        {/* Stepper Timeline Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {PIPELINE_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            const Icon = step.icon;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-white/[0.08] border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.18)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      STAGE {step.step}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected ? "bg-[#38BDF8] text-black" : "bg-white/5 text-slate-400"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h3
                    className={`text-xs sm:text-sm font-bold line-clamp-2 ${
                      isSelected ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>

                <span className="text-[10.5px] font-mono text-[#38BDF8] mt-2 block">
                  {step.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep-Dive Card */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#090c12] border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Stage Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-mono font-black text-[#38BDF8]">
                  {currentStep.step}
                </span>
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    {currentStep.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {currentStep.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentStep.deepDive}
              </p>

              {/* Tangible Deliverables */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  STAGE DELIVERABLES & ARTIFACTS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentStep.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Terminal CI/CD Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-[#05070a] border border-white/10 overflow-hidden shadow-lg">
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0e121a] border-b border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                    <span className="ml-2 text-[11px] font-mono text-slate-400">
                      ci-pipeline-stage-{currentStep.step}.log
                    </span>
                  </div>
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <div className="p-4 font-mono text-xs space-y-3 leading-relaxed">
                  <div className="text-slate-500">$ git checkout -b stage/{currentStep.step}</div>
                  {currentStep.gitLogs.map((log, lIdx) => (
                    <div key={lIdx} className="space-y-1">
                      <div className="text-slate-300">$ {log.command}</div>
                      <div className="text-emerald-400 pl-3">{log.output}</div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-white/5 text-slate-500">
                    [Pipeline Status: READY TO ADVANCE]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
