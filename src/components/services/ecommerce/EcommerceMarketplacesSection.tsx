"use client";

import React, { useState } from "react";
import {
  Layers,
  RefreshCw,
  TrendingUp,
  Truck,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  BarChart3,
  ShieldCheck,
  Zap,
  Globe2,
} from "lucide-react";
import {
  MarketplaceBrandLogo,
  MarketplaceId,
} from "./MarketplaceBrandLogo";

interface PlatformDetail {
  id: MarketplaceId;
  name: string;
  tagline: string;
  fulfillment: string;
  syncLatency: string;
  features: string[];
  protocol: string;
}

const platformsData: PlatformDetail[] = [
  {
    id: "amazon",
    name: "Amazon India & Global",
    tagline: "Prime FBA & Global Selling syndication",
    fulfillment: "FBA (Fulfillment by Amazon) / Easy Ship",
    syncLatency: "< 450ms SP-API Webhooks",
    protocol: "Amazon Selling Partner REST API (SP-API)",
    features: [
      "Automated Buy Box algorithmic repricing engine",
      "A+ Content design & Brand Story integration",
      "Sponsored Products & DSP programmatic ads",
      "Multi-region FBA inventory replenishment alerts",
    ],
  },
  {
    id: "flipkart",
    name: "Flipkart",
    tagline: "Flipkart Assured & Big Billion Days readiness",
    fulfillment: "Flipkart Fulfilled (F-Assured) / Smart Fulfillment",
    syncLatency: "< 600ms Real-Time Push API",
    protocol: "Flipkart Marketplace Unified v3 API",
    features: [
      "Tiered pricing & super-coin promotion syndication",
      "Bulk catalog attribute enrichment & QC passing",
      "Automated dispatch breach mitigation",
      "Flipkart Ads performance campaign management",
    ],
  },
  {
    id: "meesho",
    name: "Meesho",
    tagline: "High-velocity social commerce distribution",
    fulfillment: "Meesho Integrated 3PL Logistics",
    syncLatency: "< 800ms Batch Sync",
    protocol: "Meesho Supplier Hub Bridge",
    features: [
      "Zero-commission pricing optimization",
      "Tier 2 & Tier 3 regional logistics optimization",
      "Automated return to origin (RTO) reduction scoring",
      "High-velocity batch order dispatch processing",
    ],
  },
  {
    id: "ajio",
    name: "AJIO & Reliance",
    tagline: "Premium fashion, lifestyle & curated retail",
    fulfillment: "Reliance JIT (Just-In-Time) / Dropship",
    syncLatency: "< 1.2s Managed Bridge",
    protocol: "AJIO B2B / B2C Supplier Gateway",
    features: [
      "Curated apparel size-chart & imagery compliance",
      "Reliance Retail omnichannel store integration",
      "Strict SLA fulfillment monitoring & automated ASN",
      "Seasonal fashion catalog rolling refreshes",
    ],
  },
  {
    id: "myntra",
    name: "Myntra",
    tagline: "Trendsetting apparel & luxury brand showcase",
    fulfillment: "PPMP (Pure Play) / JIT / Omni-store",
    syncLatency: "< 750ms Partner API",
    protocol: "Myntra Omni-Partner Integration (MOPI)",
    features: [
      "Style cataloging & editorial lookbook compliance",
      "Real-time store pickup & local fulfillment mapping",
      "End of Reason Sale (EORS) surge infrastructure",
      "Influencer & Myntra Studio marketing integration",
    ],
  },
  {
    id: "shopify",
    name: "Shopify Plus",
    tagline: "High-converting headless D2C flagship store",
    fulfillment: "Custom Multi-Warehouse / Shiprocket / Delhivery",
    syncLatency: "< 250ms GraphQL Webhooks",
    protocol: "Shopify Storefront & Admin GraphQL API",
    features: [
      "Sub-second page load times with Next.js headless",
      "Custom checkout extensions & upsell triggers",
      "Direct ERP & multi-marketplace bi-directional bridge",
      "Customer retention & automated WhatsApp re-engagement",
    ],
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    tagline: "Flexible open-source commerce architecture",
    fulfillment: "Self-Managed / 3PL Hybrid Gateway",
    syncLatency: "< 500ms REST v3 API",
    protocol: "WooCommerce High-Speed REST API",
    features: [
      "Headless WordPress decoupled architecture",
      "Zero proprietary platform recurring fees",
      "Custom B2B wholesale pricing tiers & gateways",
      "Multi-currency & localized payment gateways",
    ],
  },
];

const architecturePillars = [
  {
    icon: Layers,
    title: "Unified Catalog Management",
    description:
      "Manage 100,000+ SKUs from a single source of truth. Automated category mapping, attribute enrichment, and 1-click publishing across all marketplaces.",
    stat: "1-Click",
    statLabel: "Cross-platform publishing",
  },
  {
    icon: RefreshCw,
    title: "Zero-Overselling Inventory Lock",
    description:
      "Sub-second bi-directional inventory locking. When a product sells on Amazon, stock levels update immediately on Flipkart, Meesho, and your D2C store.",
    stat: "< 850ms",
    statLabel: "Multi-node lock latency",
  },
  {
    icon: TrendingUp,
    title: "Algorithmic Repricing Engines",
    description:
      "Rule-based and AI-driven pricing algorithms that adjust margins, monitor competitor pricing 24/7, and protect your margins while dominating Buy Boxes.",
    stat: "99.8%",
    statLabel: "Buy box retention",
  },
  {
    icon: Truck,
    title: "Omnichannel Logistics & Routing",
    description:
      "Automated order routing to the closest regional 3PL/FBA warehouse. Integrated return mitigation and non-delivery report (NDR) automation.",
    stat: "-34%",
    statLabel: "RTO return reduction",
  },
  {
    icon: ShoppingBag,
    title: "Headless D2C Store Engineering",
    description:
      "Custom Next.js & Shopify Plus storefronts engineered for sub-second performance, instant mobile checkout, and maximum conversion rates.",
    stat: "+42%",
    statLabel: "Checkout conversion rate",
  },
  {
    icon: Sparkles,
    title: "Full-Funnel Marketplace Ads",
    description:
      "End-to-end sponsored product management, DSP campaigns, and premium A+ brand content designed to maximize return on ad spend (RoAS).",
    stat: "4.2x",
    statLabel: "Average campaign RoAS",
  },
];

interface EcommerceMarketplacesSectionProps {
  onOpenConsultation?: () => void;
}

export const EcommerceMarketplacesSection: React.FC<EcommerceMarketplacesSectionProps> = ({
  onOpenConsultation,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformDetail>(platformsData[0]);

  return (
    <section
      id="marketplaces-ecosystem"
      className="relative w-full bg-[#020412] text-white py-20 sm:py-28 overflow-hidden border-t border-slate-900/80"
    >
      {/* Background Cosmic Atmosphere & Ambient Nebula Accents */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Connecting Nebula Veil */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-indigo-600/20 via-purple-600/12 to-transparent blur-[140px]" />
        
        {/* Left Cosmic Violet Nebula Glow */}
        <div className="absolute top-1/3 -left-32 w-[600px] h-[600px] rounded-full bg-purple-600/12 blur-[160px]" />
        
        {/* Right Celestial Blue & Cyan Nebula Glow */}
        <div className="absolute bottom-10 right-0 w-[700px] h-[700px] rounded-full bg-blue-600/15 blur-[160px]" />
        
        {/* Ambient Center Star Glow */}
        <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[130px]" />

        {/* Subtle Cosmic Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(56,189,248,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.6) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />

        {/* Radial Depth Vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 space-y-20 sm:space-y-24">
        {/* =========================================================
            SECTION HEADER
            ========================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-400 text-xs font-mono font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>ONE PARTNER // MULTIPLE MARKETPLACES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Unified Commerce Architecture. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Zero Operational Chaos.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Managing individual marketplaces in silos leads to stockouts, price erosion,
            and wasted ad spend. We engineer a single unified ecosystem that unifies
            catalog syndication, algorithmic repricing, automated order routing, and brand
            equity across every channel.
          </p>
        </div>

        {/* =========================================================
            6 CORE ARCHITECTURE PILLARS (Clean modern technical cards)
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {architecturePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative rounded-2xl bg-slate-950/70 border border-slate-800/80 p-6 backdrop-blur-sm hover:border-slate-700 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(30,58,138,0.2)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-cyan-400 flex items-center justify-center transition-colors group-hover:bg-cyan-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-2">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-900 flex items-baseline justify-between">
                  <div>
                    <div className="text-xl font-extrabold text-white">{pillar.stat}</div>
                    <div className="text-[10px] text-slate-400">{pillar.statLabel}</div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================
            INTERACTIVE PLATFORM MATRIX EXPLORER
            ========================================================= */}
        <div className="rounded-3xl bg-slate-950/80 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                INTEGRATED CHANNELS MATRIX
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Deep Native Integrations with Every Major Platform
              </h3>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Click any platform to inspect technical integration protocols &amp; capabilities
            </div>
          </div>

          {/* Platform Tab Badges */}
          <div className="flex flex-wrap gap-2.5">
            {platformsData.map((plat) => {
              const isSelected = selectedPlatform.id === plat.id;
              return (
                <button
                  key={plat.id}
                  type="button"
                  onClick={() => setSelectedPlatform(plat)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 border-cyan-500/80 text-white shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900/60"
                  }`}
                >
                  <MarketplaceBrandLogo id={plat.id} size={16} />
                  <span>{plat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Platform Detail Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            {/* Left 5 Cols: Platform Overview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <MarketplaceBrandLogo id={selectedPlatform.id} size={28} />
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                  CONNECTED
                </span>
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  {selectedPlatform.name}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {selectedPlatform.tagline}
                </p>
              </div>

              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400">Sync Latency:</span>
                  <span className="font-mono font-bold text-cyan-400">
                    {selectedPlatform.syncLatency}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400">Fulfillment Model:</span>
                  <span className="font-semibold text-slate-200">
                    {selectedPlatform.fulfillment}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400">Integration Protocol:</span>
                  <span className="font-mono text-[11px] text-slate-300 truncate max-w-[200px]">
                    {selectedPlatform.protocol}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Specific Features Checklist */}
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                KEY CAPABILITIES &amp; ARCHITECTURE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedPlatform.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 font-medium leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            PROVEN IMPACT METRICS BAR
            ========================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-6 border-y border-slate-800/90">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              ₹120M+
            </div>
            <div className="text-xs font-semibold text-cyan-400">Cumulative GMV Scaled</div>
            <div className="text-[10px] text-slate-400">Across client marketplace stores</div>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              99.98%
            </div>
            <div className="text-xs font-semibold text-emerald-400">Order Fulfillment Accuracy</div>
            <div className="text-[10px] text-slate-400">Sub-second multi-channel sync</div>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              3.4x
            </div>
            <div className="text-xs font-semibold text-blue-400">Average Revenue Velocity</div>
            <div className="text-[10px] text-slate-400">Within first 90 days of launch</div>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              0
            </div>
            <div className="text-xs font-semibold text-indigo-400">Account Health Strikes</div>
            <div className="text-[10px] text-slate-400">100% marketplace SLA compliance</div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM CALL TO ACTION BANNER
            ========================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 via-slate-950 to-indigo-950 border border-blue-500/30 p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
              GET STARTED TODAY
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to Turn Your Store Into an Omnichannel Ecosystem?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Schedule a strategic consultation with our eCommerce architects. We&apos;ll
              audit your current setup and provide a blueprint to launch and scale across
              all major platforms.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Schedule Architecture Consultation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
