"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  User,
  ArrowRight,
  ShieldCheck,
  Award,
  BarChart3,
  Lock,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { normalizeInternshipId, isValidInternshipId } from "@/lib/internship-utils";

interface CertificationHeroProps {
  onSearch: (internshipId: string) => Promise<void>;
  isLoading: boolean;
  initialId?: string;
  errorMessage?: string | null;
  clearError?: () => void;
}

export const CertificationHero: React.FC<CertificationHeroProps> = ({
  onSearch,
  isLoading,
  initialId = "",
  errorMessage,
  clearError,
}) => {
  const [inputValue, setInputValue] = useState(initialId);
  const [localValidationWarning, setLocalValidationWarning] = useState<string | null>(null);

  useEffect(() => {
    if (initialId) {
      setInputValue(initialId);
    }
  }, [initialId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalValidationWarning(null);
    if (clearError) clearError();

    const normalized = normalizeInternshipId(inputValue);
    setInputValue(normalized);

    if (!normalized) {
      setLocalValidationWarning("Please enter your unique Internship ID.");
      return;
    }

    if (!isValidInternshipId(normalized)) {
      setLocalValidationWarning(
        "Please enter a valid Internship ID, for example XSW-INTERN-001."
      );
      return;
    }

    onSearch(normalized);
  };

  return (
    <section className="relative w-full pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#F0F6FE] via-[#F8FAFD] to-white">
      {/* Decorative ambient blurred spheres matching design reference */}
      <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[550px] h-[550px] bg-indigo-400/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Search & Feature Highlights */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-[#1668E8] text-xs font-black tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERNSHIP CERTIFICATION</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#07152B] tracking-tight leading-[1.12]">
              Verify Your <br />
              <span className="text-[#1668E8]">Internship</span> Record
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Enter your unique Intern ID to view complete details, performance record, and download your official internship certificate.
            </p>

            {/* Big Search Bar Form */}
            <div className="max-w-xl space-y-3">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center bg-white rounded-full p-2 sm:p-2.5 shadow-xl shadow-blue-900/5 border border-slate-200/90 hover:border-blue-400/60 focus-within:border-[#1668E8] focus-within:ring-4 focus-within:ring-blue-500/15 transition-all"
              >
                <div className="pl-3.5 pr-2 text-slate-400">
                  <User className="w-5 h-5 text-slate-400" />
                </div>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value.toUpperCase());
                    if (localValidationWarning) setLocalValidationWarning(null);
                    if (clearError) clearError();
                  }}
                  placeholder="e.g. XSW-INTERN-001"
                  className="flex-1 bg-transparent py-2 px-2 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-hidden"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1668E8] hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer shrink-0"
                  aria-label="Search Internship ID"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  )}
                </button>
              </form>

              {/* Error messages */}
              {(localValidationWarning || errorMessage) && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-700 font-medium animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{localValidationWarning || errorMessage}</span>
                </div>
              )}
            </div>

            {/* 4 Feature Badges (Pills) matching reference image */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 max-w-xl">
              <div className="flex items-center gap-2.5 p-2 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#1668E8] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  Verified Records
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#1668E8] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  Official Certificates
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#1668E8] flex items-center justify-center shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  Performance Details
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#1668E8] flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  Secure & Authentic
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Floating Certificate Illustration */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[420px] h-[460px] sm:h-[500px]">
              {/* Back Card 1: Slate "DEVELOP LEARN GROW" tablet */}
              <div className="absolute top-4 left-0 w-64 h-80 bg-[#1E293B] rounded-3xl p-5 text-white/90 shadow-2xl rotate-[-8deg] border border-slate-700/60 flex flex-col justify-between transform transition-transform hover:rotate-[-6deg]">
                <div className="space-y-1">
                  <p className="text-[11px] font-mono tracking-widest text-blue-300 uppercase">
                    DEVELOP
                  </p>
                  <p className="text-sm font-black tracking-wider text-slate-100">
                    LEARN
                  </p>
                  <p className="text-[11px] font-mono tracking-widest text-emerald-300 uppercase">
                    GROW
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl text-blue-400 font-light">↗</span>
                </div>
              </div>

              {/* Back Card 2: Soft Blue "From Learning To Growing" card */}
              <div className="absolute top-0 right-2 w-64 h-72 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-3xl p-6 text-white shadow-xl rotate-[10deg] flex flex-col justify-between transform transition-transform hover:rotate-[8deg] opacity-90">
                <div className="space-y-1">
                  <p className="text-xs font-medium italic text-blue-100">From</p>
                  <p className="text-xl font-bold tracking-tight">Learning</p>
                  <p className="text-xs font-medium italic text-blue-100">To</p>
                  <p className="text-xl font-bold tracking-tight">Growing</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Front Main White Certificate Mockup */}
              <div className="absolute top-16 left-6 right-6 sm:left-10 sm:right-10 bg-white rounded-3xl p-6 sm:p-7 shadow-2xl shadow-blue-900/15 border border-slate-100 rotate-[2deg] flex flex-col justify-between h-[360px] transform hover:rotate-0 transition-transform duration-300">
                {/* Header */}
                <div className="text-center space-y-2 border-b border-slate-100 pb-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#07152B] tracking-tight">
                    <span className="text-[#1668E8] font-black text-sm">✦</span>
                    <span>XSPACEWEB</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-800 tracking-wider uppercase">
                    INTERNSHIP CERTIFICATE
                  </h4>
                </div>

                {/* Body skeleton */}
                <div className="space-y-2.5 py-3">
                  <div className="h-2 w-3/4 bg-slate-100 rounded-full mx-auto" />
                  <div className="h-2 w-1/2 bg-blue-50 rounded-full mx-auto" />
                  <div className="h-2 w-2/3 bg-slate-100 rounded-full mx-auto" />
                </div>

                {/* Seal & Signature Row */}
                <div className="flex items-end justify-between pt-2">
                  <div className="space-y-1">
                    <div className="w-20 border-b border-slate-300 h-5" />
                    <p className="text-[9px] text-slate-400 font-mono">Authorized Signatory</p>
                  </div>

                  {/* Blue Ribbon Seal */}
                  <div className="relative w-12 h-12 rounded-full bg-[#1668E8] text-white flex items-center justify-center shadow-lg font-black text-base">
                    <span>X</span>
                    <div className="absolute -bottom-2 -left-1 w-4 h-4 bg-blue-700 rotate-45 -z-10" />
                    <div className="absolute -bottom-2 -right-1 w-4 h-4 bg-blue-700 rotate-45 -z-10" />
                  </div>
                </div>
              </div>

              {/* Floating Real Skills Pill Badge */}
              <div className="absolute bottom-2 right-0 sm:right-2 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-slate-200/80 text-[10px] font-black tracking-wider text-slate-700 uppercase space-y-0.5">
                <p className="text-slate-400">REAL SKILLS</p>
                <p className="text-[#1668E8]">REAL IMPACT</p>
                <p className="text-emerald-600">REAL GROWTH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
