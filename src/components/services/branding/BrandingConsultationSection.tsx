"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  ShieldCheck,
  Zap,
  Rocket,
} from "lucide-react";

export const BrandingConsultationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Brand Identity & Visual Architecture",
    budget: "₹5L – ₹15L",
    timeline: "2 – 4 Weeks",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMsg("Please provide your name and work email.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company || undefined,
          service: `${formData.service} (Budget: ${formData.budget}, Timeline: ${formData.timeline})`,
          message: formData.message || "Executive consultation request from Branding Architecture service page",
          inquiry_type: "service",
          source: "branding-services-page",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.details?.[0] || data.error || "Failed to submit request.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("Inquiry submission error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="brand-consultation"
      className="relative w-full bg-transparent text-white py-24 sm:py-32 overflow-hidden border-t border-blue-900/40"
    >
      {/* Background Cosmic Atmosphere with Moving Subtle Nebula */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full bg-blue-700/10 blur-[190px] animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-0 right-10 w-[600px] h-[600px] rounded-full bg-indigo-700/10 blur-[180px]" />
      </div>

      <Container size="wide" className="relative z-10 max-w-6xl space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-cyan-400 text-xs font-mono font-bold shadow-sm backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>MISSION COMMISSIONING PROTOCOL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.12]">
            Ready for Velocity? <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Build the System Before You Accelerate It.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Schedule an executive architecture consultation with our senior brand directors. We&apos;ll review your current category positioning and prepare a bespoke sprint roadmap.
          </p>
        </div>

        {/* Form Container with Materialize Entry Animation */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 30 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-3xl bg-[#07112b]/85 border border-blue-900/60 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-[0_20px_50px_rgba(2,8,23,0.85)] group will-change-transform"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 rounded-3xl opacity-50 pointer-events-none -z-1" />

          {isSubmitted ? (
            <div className="py-16 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Consultation Request Received
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Our Senior Brand Architect will review your positioning and reach out within 24 business hours with initial audit insights and roadmap options.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aryan Mehra"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm outline-none transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Work Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. aryan@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm outline-none transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Contact Number</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm outline-none transition-all"
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Company / Project Name</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Aura Atelier Ltd"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  Primary Brand Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    "Brand Identity & Visual Architecture",
                    "3D Packaging & Industrial CGI",
                    "Living Design System (Tokens)",
                    "Full Omnichannel Transformation",
                  ].map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setFormData({ ...formData, service: srv })}
                      className={`p-3 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                        formData.service === srv
                          ? "bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    Target Budget Tier
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white text-sm outline-none cursor-pointer"
                  >
                    <option value="₹2.5L – ₹5L">₹2.5L – ₹5L (Focused Identity Sprint)</option>
                    <option value="₹5L – ₹15L">₹5L – ₹15L (Identity + 3D Packaging)</option>
                    <option value="₹15L – ₹35L">₹15L – ₹35L (Full Living System + Web)</option>
                    <option value="₹35L+">₹35L+ (Enterprise Category Dominance)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    Deployment Window
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 text-white text-sm outline-none cursor-pointer"
                  >
                    <option value="Immediate (Next 1-2 Weeks)">Immediate (Next 1 – 2 Weeks)</option>
                    <option value="2 – 4 Weeks">2 – 4 Weeks</option>
                    <option value="1 – 2 Months">1 – 2 Months</option>
                    <option value="Flexible / Strategic Planning">Flexible / Strategic Planning</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Project Context &amp; Objectives</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your brand's current positioning, competitors, or target category..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-white placeholder-slate-500 text-sm outline-none transition-all resize-none"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300">
                  {errorMsg}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% NON-DISCLOSURE AGREEMENT PROTECTED</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Protocol...</span>
                  ) : (
                    <>
                      <span>Transmit Consultation Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
};

export default BrandingConsultationSection;
