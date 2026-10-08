"use client";

import React, { useState } from "react";
import {
  Terminal,
  Cpu,
  Database,
  Cloud,
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  role: string;
  architectureRole: string;
  tags: string[];
  benchmark: string;
}

const TECH_CATALOG: TechItem[] = [
  // Frontend
  {
    name: "Next.js 15",
    category: "frontend",
    role: "Full-Stack Core Framework",
    architectureRole: "Server Actions, React Server Components (RSC), Streaming SSR & Partial Prerendering (PPR).",
    tags: ["RSC", "SSR", "App Router"],
    benchmark: "Sub-50ms TTFB",
  },
  {
    name: "React 19",
    category: "frontend",
    role: "UI Primitive Library",
    architectureRole: "Action hooks, Suspense boundaries, and React Compiler for automatic memoization without useMemo bloat.",
    tags: ["Compiler", "Suspense", "Hooks"],
    benchmark: "Zero Re-render Overheads",
  },
  {
    name: "TypeScript 5+",
    category: "frontend",
    role: "Strict Type Safety",
    architectureRole: "End-to-end schema validation with Zod schemas shared across API routes and client forms.",
    tags: ["Strict Mode", "Zod", "Type-Safe"],
    benchmark: "Zero Runtime Type Errors",
  },
  {
    name: "Tailwind CSS v4",
    category: "frontend",
    role: "Zero-Runtime Styling",
    architectureRole: "Modular CSS variables, custom token systems, and lightning-fast compile times with zero bundle overhead.",
    tags: ["Utility", "Tokens", "Fluid Typography"],
    benchmark: "<15kb Gzipped CSS",
  },
  {
    name: "Three.js & WebGL",
    category: "frontend",
    role: "3D Graphics & Shaders",
    architectureRole: "GPU-accelerated custom GLSL shaders, procedural geometries, and 60 FPS viewport rendering.",
    tags: ["GLSL", "Shaders", "Hardware Accel"],
    benchmark: "Solid 60 FPS Canvas",
  },
  {
    name: "Motion & GSAP",
    category: "frontend",
    role: "Physics & Choreography",
    architectureRole: "Spring-based physics, smooth layout animations, and hardware-accelerated transform compositing.",
    tags: ["Physics", "ScrollTrigger", "Layout Motion"],
    benchmark: "Jank-Free Transitions",
  },

  // Backend
  {
    name: "Node.js & Express",
    category: "backend",
    role: "High-Throughput Runtime",
    architectureRole: "Non-blocking event loop handling concurrent REST/GraphQL requests with fast JSON serialization.",
    tags: ["Event Loop", "Express", "Microservices"],
    benchmark: "12,000+ Req/Sec",
  },
  {
    name: "Go (Golang)",
    category: "backend",
    role: "High-Concurrency Services",
    architectureRole: "Goroutine concurrency for background workers, video transcoding pipes, and data crunching.",
    tags: ["Goroutines", "Binaries", "Low Memory"],
    benchmark: "<1ms Execution Overhead",
  },
  {
    name: "WebSockets & WebRTC",
    category: "backend",
    role: "Bidirectional Real-Time",
    architectureRole: "Sub-30ms P2P data channels and Redis Pub/Sub backbones for low-latency live synchronization.",
    tags: ["P2P", "STUN/TURN", "Pub/Sub"],
    benchmark: "<28ms Round-Trip Time",
  },
  {
    name: "GraphQL & tRPC",
    category: "backend",
    role: "Type-Safe API Contracts",
    architectureRole: "Zero-boilerplate type-safe client-server RPC calls with automatic autocompletion and batching.",
    tags: ["Type-Safe", "Batching", "No Overfetch"],
    benchmark: "40% Less Network Payload",
  },

  // Databases
  {
    name: "PostgreSQL",
    category: "database",
    role: "Relational Persistence",
    architectureRole: "ACID compliance, JSONB document indexing, row-level security policies, and PgBouncer connection pooling.",
    tags: ["ACID", "JSONB", "RLS Security"],
    benchmark: "<1.5ms Query Latency",
  },
  {
    name: "Redis",
    category: "database",
    role: "In-Memory Cache & Queues",
    architectureRole: "Distributed session storage, sliding-window rate limiting, and BullMQ background task workers.",
    tags: ["In-Memory", "BullMQ", "Rate Limiting"],
    benchmark: "<0.4ms Read Latency",
  },
  {
    name: "Neon & Supabase",
    category: "database",
    role: "Serverless Edge Postgres",
    architectureRole: "Branching databases for CI environments, instant connection pooling, and real-time CDC subscriptions.",
    tags: ["Serverless", "Branching", "Edge DB"],
    benchmark: "Auto-Scaling Compute",
  },

  // DevOps
  {
    name: "AWS Infrastructure",
    category: "devops",
    role: "Global Cloud Architecture",
    architectureRole: "ECS Fargate containers, S3 object storage, CloudFront edge distribution, and IAM least-privilege security.",
    tags: ["ECS", "CloudFront", "S3", "IAM"],
    benchmark: "99.99% Availability",
  },
  {
    name: "Docker & Containerization",
    category: "devops",
    role: "Reproducible Builds",
    architectureRole: "Multi-stage hermetic container images reducing deployment artifacts from 1GB to <80MB alpine images.",
    tags: ["Hermetic", "Alpine", "Zero Drift"],
    benchmark: "<80MB Production Images",
  },
  {
    name: "GitHub Actions CI/CD",
    category: "devops",
    role: "Automated Deployment Pipeline",
    architectureRole: "Parallel unit tests, ESLint verification, automated PR preview deployments, and zero-downtime rollouts.",
    tags: ["CI/CD", "Preview Envs", "Automated Tests"],
    benchmark: "<90s Pipeline Execution",
  },
];

export const WebDevTechStackSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "frontend" | "backend" | "database" | "devops">("all");

  const filteredTech =
    activeCategory === "all"
      ? TECH_CATALOG
      : TECH_CATALOG.filter((item) => item.category === activeCategory);

  return (
    <section
      id="enterprise-tech-stack"
      className="relative w-full bg-[#020204] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-white/5"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#38BDF8] mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="tracking-wider uppercase">Engineering Tech Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Modern Tech Standards. Zero Legacy Debt.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            We select modern primitives that eliminate runtime bloat, enhance developer velocity, and deliver rock-solid reliability across the entire stack.
          </p>
        </div>

        {/* 2. Interactive Tech Stack Matrix */}
        <div>
          {/* Category Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {[
              { id: "all", label: "All Engineering Stack" },
              { id: "frontend", label: "Frontend & UI" },
              { id: "backend", label: "Backend & Realtime" },
              { id: "database", label: "Database & Cache" },
              { id: "devops", label: "DevOps & Edge" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-[#38BDF8] text-black font-bold shadow-md shadow-cyan-500/20"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tech Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredTech.map((tech, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 hover:border-[#38BDF8]/40 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      {tech.name}
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {tech.benchmark}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#818CF8] mb-2 font-mono">
                    {tech.role}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {tech.architectureRole}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5 mt-auto">
                  {tech.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-white/5 text-slate-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
