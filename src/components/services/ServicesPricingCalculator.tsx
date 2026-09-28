"use client";

import React, { useState } from "react";
import { Sparkles, Calculator, Check, ArrowRight, ShieldCheck, Clock, Layers } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface ServicesPricingCalculatorProps {
  onRequestQuote: (details: {
    services: string[];
    timeline: string;
    teamTier: string;
    estimatedCost: string;
  }) => void;
}

const serviceOptions = [
  { id: "web", name: "Custom Web App / Next.js", basePrice: 35000, durationWeeks: 4 },
  { id: "mobile", name: "Mobile App (iOS & Android)", basePrice: 45000, durationWeeks: 6 },
  { id: "uiux", name: "UI/UX & Design System", basePrice: 20000, durationWeeks: 2 },
  { id: "seo", name: "Technical SEO & Growth", basePrice: 15000, durationWeeks: 3 },
  { id: "marketing", name: "Performance Ad Campaigns", basePrice: 18000, durationWeeks: 2 },
  { id: "branding", name: "Brand Identity & 3D Assets", basePrice: 15000, durationWeeks: 2 },
];

const timelineMultipliers = [
  { id: "standard", name: "Standard (Recommended)", multiplier: 1.0, label: "Normal Pace" },
  { id: "express", name: "Fast-Track Sprint", multiplier: 1.25, label: "Accelerated Delivery" },
  { id: "enterprise", name: "Enterprise Custom Roadmap", multiplier: 1.5, label: "Dedicated Pod" },
];

export const ServicesPricingCalculator: React.FC<ServicesPricingCalculatorProps> = ({ onRequestQuote }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(["web", "uiux"]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>("standard");

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    );
  };

  // Calculate pricing
  const baseTotal = selectedServices.reduce((sum, id) => {
    const item = serviceOptions.find((s) => s.id === id);
    return sum + (item ? item.basePrice : 0);
  }, 0);

  const selectedMultiplier =
    timelineMultipliers.find((t) => t.id === selectedTimeline)?.multiplier || 1.0;

  const finalCost = Math.round(baseTotal * selectedMultiplier);

  // Calculate estimated total weeks
  const maxWeeks = Math.max(
    ...selectedServices.map((id) => serviceOptions.find((s) => s.id === id)?.durationWeeks || 2)
  );
  const adjustedWeeks = selectedTimeline === "express" ? Math.max(2, Math.round(maxWeeks * 0.7)) : maxWeeks;

  const handleClaimQuote = () => {
    const serviceNames = selectedServices.map(
      (id) => serviceOptions.find((s) => s.id === id)?.name || id
    );
    const timelineName = timelineMultipliers.find((t) => t.id === selectedTimeline)?.name || "Standard";

    onRequestQuote({
      services: serviceNames,
      timeline: timelineName,
      teamTier: selectedTimeline === "enterprise" ? "Enterprise Pod" : "Agile Squad",
      estimatedCost: `₹${finalCost.toLocaleString("en-IN")}+`,
    });
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-white relative">
      <Container size="wide">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1668E8] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#07152B] tracking-tight">
            Estimate Your Project Scope <br className="hidden sm:inline" />
            <span className="text-[#1668E8]">& Timeline in Seconds</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select the services and delivery velocity you need to calculate an instant ballpark budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Selectors */}
          <div className="lg:col-span-7 space-y-8 bg-[#F8FAFC] p-6 sm:p-8 rounded-3xl border border-slate-200/90">
            {/* 1. Select Services */}
            <div>
              <label className="block text-sm font-bold text-[#07152B] uppercase tracking-wider mb-4">
                1. Select Services Needed (Multi-select)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map((opt) => {
                  const isChecked = selectedServices.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleService(opt.id)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isChecked
                          ? "bg-blue-50 border-blue-400 text-[#07152B] shadow-sm font-semibold ring-1 ring-blue-500/30"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs sm:text-sm">{opt.name}</div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          isChecked ? "bg-[#1668E8] text-white" : "border border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Select Timeline Delivery Pace */}
            <div>
              <label className="block text-sm font-bold text-[#07152B] uppercase tracking-wider mb-4">
                2. Select Delivery Timeline
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {timelineMultipliers.map((pace) => {
                  const isSelected = selectedTimeline === pace.id;
                  return (
                    <button
                      key={pace.id}
                      type="button"
                      onClick={() => setSelectedTimeline(pace.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-50 border-blue-400 text-[#07152B] shadow-sm ring-1 ring-blue-500/30"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{pace.name}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{pace.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inclusions Guarantee */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% IP & Source Code Ownership</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Fixed Milestone Delivery Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Estimate Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#07152B] to-[#0B254E] text-white p-7 sm:p-9 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
                  Estimated Investment
                </span>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full border border-blue-400/30">
                  {selectedServices.length} Services Selected
                </span>
              </div>

              {/* Price Calculation Output */}
              <div className="my-6">
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  ₹{finalCost.toLocaleString("en-IN")}
                  <span className="text-lg sm:text-xl font-medium text-slate-400"> / est.</span>
                </div>
                <div className="text-xs text-slate-400 mt-2">
                  *Ballpark estimate based on standard feature requirements and testing scope.
                </div>
              </div>

              {/* Timeline Output */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Estimated Delivery</div>
                  <div className="text-lg font-extrabold text-blue-400 mt-0.5">
                    ~{adjustedWeeks} {adjustedWeeks === 1 ? "Week" : "Weeks"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Team Model</div>
                  <div className="text-lg font-extrabold text-white mt-0.5">
                    Dedicated Squad
                  </div>
                </div>
              </div>

              {/* Selected List Summary */}
              <div className="space-y-2 mb-6 text-xs text-slate-300">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Included in Estimate:
                </span>
                {selectedServices.map((id) => {
                  const s = serviceOptions.find((item) => item.id === id);
                  return (
                    <div key={id} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                      <span>{s?.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              onClick={handleClaimQuote}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1668E8] hover:bg-blue-500 text-white font-bold text-sm sm:text-[15px] transition-all duration-200 shadow-lg active:scale-[0.98] cursor-pointer"
            >
              <span>Get Detailed Formal Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};
