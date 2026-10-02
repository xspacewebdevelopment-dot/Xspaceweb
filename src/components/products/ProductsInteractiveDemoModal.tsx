"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Crown,
  Receipt,
  Monitor,
  Heart,
  Leaf,
  Zap,
  ShieldCheck,
  TrendingUp,
  Download,
  Share2,
  RefreshCw,
  Sliders,
  Send,
} from "lucide-react";
export interface FullProduct {
  id: string;
  number: string;
  name: string;
  tagline: string;
  category: "fintech" | "remote" | "social" | "wellness" | "automation";
  categoryLabel: string;
  badge?: string;
  isPopular?: boolean;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  description: string;
  keyFeatures: string[];
  metrics: { label: string; value: string };
  launchStatus: "Live & Active" | "Enterprise Beta" | "Early Access";
  iconComponent: React.ReactNode;
}

interface ProductsInteractiveDemoModalProps {
  product: FullProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

const productLiveUrls: Record<string, string> = {
  makegstbill: "https://makegstbill.com/",
  goldengst: "https://www.goldengst.com/",
  freedeskpro: "https://freedeskpro.com/",
  simplekaam: "http://simplekaam.com/",
};

export const ProductsInteractiveDemoModal: React.FC<ProductsInteractiveDemoModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "interactive" | "specs">("interactive");
  const [invoiceCustomer, setInvoiceCustomer] = useState("Acme Retail Corp");
  const [invoiceAmount, setInvoiceAmount] = useState("18,500");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  // FreeDeskPro interactive test state
  const [remoteSessionCode, setRemoteSessionCode] = useState("892-411-098");
  const [isConnected, setIsConnected] = useState(false);
  const [connectionFps, setConnectionFps] = useState(60);

  if (!isOpen || !product) return null;

  const handleSimulateInvoice = () => {
    setIsGenerating(true);
    setGeneratedSuccess(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedSuccess(true);
    }, 1000);
  };

  const handleToggleConnect = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-[32px] bg-white text-slate-900 shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3.5">
            {product.iconComponent}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  {product.launchStatus}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {product.name} Live Interactive Demo
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview modal"
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors border border-slate-200 shadow-xs cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex items-center gap-3 px-6 sm:px-7 pt-4 border-b border-slate-100 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab("interactive")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "interactive"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            ✨ Live Sandbox Simulation
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Product Overview & Architecture
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "specs"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Technical Specifications & SLA
          </button>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {activeTab === "interactive" && (
            <div className="space-y-5">
              {/* Product specific interactive simulations */}
              {product.id === "goldengst" || product.id === "makegstbill" ? (
                <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Try Quick Invoice &amp; e-Way Bill Generator
                      </h4>
                      <p className="text-xs text-slate-500">
                        Test how quickly invoices are calculated, validated and ready to dispatch.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded-lg border border-blue-200 text-blue-700">
                      GSTIN Validated ✓
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Client / Buyer Name</label>
                      <input
                        type="text"
                        value={invoiceCustomer}
                        onChange={(e) => setInvoiceCustomer(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Taxable Total (₹)</label>
                      <input
                        type="text"
                        value={invoiceAmount}
                        onChange={(e) => setInvoiceAmount(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>CGST (9%)</span>
                      <span className="font-mono font-bold">₹ {(parseFloat(invoiceAmount.replace(/,/g, "")) * 0.09 || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>SGST (9%)</span>
                      <span className="font-mono font-bold">₹ {(parseFloat(invoiceAmount.replace(/,/g, "")) * 0.09 || 0).toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex justify-between font-extrabold text-slate-900 text-sm">
                      <span>Total Invoice Amount (Incl. GST)</span>
                      <span className="font-mono text-blue-600">
                        ₹ {(parseFloat(invoiceAmount.replace(/,/g, "")) * 1.18 || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSimulateInvoice}
                      disabled={isGenerating}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Processing E-Invoice...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5" />
                          <span>Generate &amp; Sign Tax Invoice</span>
                        </>
                      )}
                    </button>

                    {generatedSuccess && (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>IRN Generated &amp; Signed Digitally!</span>
                      </span>
                    )}
                  </div>
                </div>
              ) : product.id === "freedeskpro" ? (
                <div className="rounded-2xl border border-sky-200 bg-sky-50/40 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        FreeDeskPro Low-Latency Remote Session Tester
                      </h4>
                      <p className="text-xs text-slate-500">
                        Simulate instantaneous connection to remote endpoint with 60 FPS feedback.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200">
                      TLS 1.3 Active
                    </span>
                  </div>

                  <div className="bg-slate-950 text-white rounded-2xl p-4 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                      <span>Endpoint Session ID: {remoteSessionCode}</span>
                      <span className="text-cyan-400">{connectionFps} FPS | 18ms Latency</span>
                    </div>

                    <div className="h-28 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center flex-col gap-2">
                      {isConnected ? (
                        <div className="text-center space-y-1">
                          <div className="w-3 h-3 rounded-full bg-emerald-400 mx-auto animate-ping" />
                          <div className="text-emerald-400 font-bold">Remote Desktop Connected</div>
                          <div className="text-[11px] text-slate-400">Resolution: 2560x1440 @ 60Hz</div>
                        </div>
                      ) : (
                        <div className="text-center space-y-1 text-slate-400">
                          <div>Target Machine: Mumbai AWS Host-04</div>
                          <div className="text-[11px] text-slate-500">Click &quot;Establish Session&quot; to test connection</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleConnect}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer ${
                      isConnected
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>{isConnected ? "Disconnect Session" : "Establish Secure Session"}</span>
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900">
                    Live Cloud Sandbox Environment
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This product is configured for instant enterprise rollout. Our specialized solutions engineering team can provision a dedicated sandbox instance for your organization within 1 hour.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Instance Tier:</span>
                    <span className="font-bold text-slate-800">High-Availability Pan-India Cluster</span>
                  </div>
                </div>
              )}

              {/* Product Key Advantages Matrix */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Engineered Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.keyFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "overview" && (
            <div className="space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                {product.description}
              </p>
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>XSPACEWEB Core Architecture</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Built on modern multi-tenant cloud microservices with sub-millisecond database replicas in Mumbai and Bangalore, ensuring zero downtime and 100% data residency compliance with Indian IT regulations.
                </p>
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-bold uppercase text-[10px]">Data Encryption</div>
                  <div className="font-bold text-slate-900 mt-0.5">AES-256 GCM + TLS 1.3</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-bold uppercase text-[10px]">Service Level Agreement</div>
                  <div className="font-bold text-slate-900 mt-0.5">99.99% Uptime SLA Guarantee</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-bold uppercase text-[10px]">Cloud Regions</div>
                  <div className="font-bold text-slate-900 mt-0.5">Mumbai, Pune &amp; Bangalore</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-bold uppercase text-[10px]">Backup &amp; Recovery</div>
                  <div className="font-bold text-slate-900 mt-0.5">Continuous Point-in-Time Backup</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close Preview
          </button>

          <div className="flex items-center gap-2.5">
            {product && productLiveUrls[product.id] && (
              <a
                href={productLiveUrls[product.id]}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#1668E8] text-white text-xs sm:text-sm font-bold hover:bg-blue-700 transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
              >
                <span>Visit Live Website</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </a>
            )}

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-[#07152B] text-white text-xs sm:text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <span>Request Enterprise Access</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
