"use client";

import React, { useState } from "react";
import { Copy, Check, FileText, Send } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export const CompanyLegalDetailsSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  return (
    <section className="relative w-full bg-[#FAFBFD] py-14 sm:py-20 border-b border-slate-100">
      <Container size="wide">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-2">
            LEGAL INFORMATION
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#07152B] tracking-tight leading-tight">
            Registration Details
          </h2>
        </div>

        {/* 3 Registration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Card 1: CIN (Dark Blue Featured Card) */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#0B1E38] via-[#0D2342] to-[#122F5A] p-6 sm:p-7 text-white shadow-xl flex flex-col justify-between group overflow-hidden border border-blue-900/40">
            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#1668E8]/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-blue-300">
                  <FileText className="w-5 h-5" />
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy("U62012JH2024PTC022737", "cin")}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-all cursor-pointer"
                  title="Copy CIN"
                  aria-label="Copy Corporate Identification Number"
                >
                  {copiedKey === "cin" ? (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-200/80 block mb-1">
                Corporate Identification Number (CIN)
              </span>

              <p className="font-mono text-lg sm:text-[20px] font-extrabold tracking-wide text-white mb-4 select-all">
                U62012JH2024PTC022737
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-blue-200/70 font-medium">
                XSPACEWEB Pvt Limited
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                Verified
              </span>
            </div>
          </div>

          {/* Card 2: GST Jharkhand */}
          <div className="relative rounded-2xl bg-white p-6 sm:p-7 border border-slate-100 shadow-[0_2px_12px_rgba(7,21,43,0.03)] hover:shadow-lg hover:border-[#1668E8]/25 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1668E8]">
                  <Send className="w-5 h-5 -rotate-45" />
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy("20AAACX5026C1Z1", "gst-jh")}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-[#07152B] transition-all cursor-pointer"
                  title="Copy GSTIN"
                  aria-label="Copy Jharkhand GST Number"
                >
                  {copiedKey === "gst-jh" ? (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                GST Registration – Jharkhand
              </span>

              <p className="font-mono text-lg sm:text-[20px] font-extrabold tracking-wide text-[#07152B] mb-4 select-all">
                20AAACX5026C1Z1
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                State: Jharkhand
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#1668E8] font-semibold border border-blue-100">
                Active
              </span>
            </div>
          </div>

          {/* Card 3: GST West Bengal */}
          <div className="relative rounded-2xl bg-white p-6 sm:p-7 border border-slate-100 shadow-[0_2px_12px_rgba(7,21,43,0.03)] hover:shadow-lg hover:border-[#1668E8]/25 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1668E8]">
                  <Send className="w-5 h-5 -rotate-45" />
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy("19AAACX5026C1ZK", "gst-wb")}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-[#07152B] transition-all cursor-pointer"
                  title="Copy GSTIN"
                  aria-label="Copy West Bengal GST Number"
                >
                  {copiedKey === "gst-wb" ? (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                GST Registration – West Bengal
              </span>

              <p className="font-mono text-lg sm:text-[20px] font-extrabold tracking-wide text-[#07152B] mb-4 select-all">
                19AAACX5026C1ZK
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                State: West Bengal
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#1668E8] font-semibold border border-blue-100">
                Active
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
