"use client";

import React from "react";
import { Container } from "@/components/shared/ui/Container";
import { Cpu, Globe, Database, Shield, Zap, RefreshCw } from "lucide-react";

interface TechCategory {
  category: string;
  description: string;
  tools: { name: string; role: string; highlight: string }[];
}

const techCategories: TechCategory[] = [
  {
    category: "HEADLESS COMMERCE & D2C",
    description: "Sub-second storefront architecture engineered for maximum checkout conversion.",
    tools: [
      { name: "Next.js 15 & React", role: "SSR & Edge Storefront Core", highlight: "Sub-second FCP" },
      { name: "Shopify Plus / Headless", role: "Enterprise Merchant Backend", highlight: "99.99% Uptime" },
      { name: "Three.js & WebGL", role: "Interactive 3D Product Viewers", highlight: "Zero Lag Renders" },
      { name: "Tailwind CSS & Framer", role: "Custom Fluid Design System", highlight: "Pixel Perfection" },
    ],
  },
  {
    category: "MARKETPLACE APIS & SYNDICATION",
    description: "Deep direct webhooks and low-latency API bridges into top marketplaces.",
    tools: [
      { name: "Amazon Selling Partner (SP-API)", role: "Direct Order & Inventory Sync", highlight: "< 450ms Latency" },
      { name: "Flipkart Marketplace v3 REST", role: "Real-Time Catalog & Pricing Push", highlight: "Assured Ready" },
      { name: "Meesho Supplier Hub Bridge", role: "High-Velocity Bulk Dispatch", highlight: "Zero-Commission" },
      { name: "AJIO & Myntra Enterprise Gateways", role: "Fashion SLA & Catalog Enricher", highlight: "PPMP Integrated" },
    ],
  },
  {
    category: "CLOUD INFRASTRUCTURE & SECURITY",
    description: "Enterprise scalability with automated failovers and multi-godown locking.",
    tools: [
      { name: "AWS & Vercel Edge Network", role: "Global Multi-Region CDN Hosting", highlight: "100k+ Concurrency" },
      { name: "PostgreSQL & Drizzle ORM", role: "Type-Safe Enterprise Telemetry", highlight: "Zero Data Loss" },
      { name: "Upstash Redis Caching", role: "Sub-millisecond Inventory Lock", highlight: "Anti-Oversell" },
      { name: "SOC-2 & 256-Bit SSL", role: "Financial & PII Data Encryption", highlight: "Bank-Grade Safety" },
    ],
  },
];

export const BrandingTechStackSection: React.FC = () => {
  return (
    <section
      id="brand-tech-stack"
      className="relative w-full bg-[#020412] text-white py-20 sm:py-28 overflow-hidden border-t border-slate-900/90"
    >
      {/* Background Cosmic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-700/10 blur-[170px]" />
      </div>

      <Container size="wide" className="relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-400 text-xs font-mono font-bold shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENTERPRISE ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            Powered by Modern <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Commerce Technologies.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We don’t rely on fragile plugins. We architect high-performance, resilient technology stacks that handle flash sales, Big Billion Days, and millions in transactions without breaking a sweat.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {techCategories.map((cat, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl bg-slate-950/70 border border-slate-800/90 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase block">
                  {cat.category}
                </span>
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
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 flex-shrink-0">
                      {tool.highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
