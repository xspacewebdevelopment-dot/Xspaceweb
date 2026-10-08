"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export const BrandingConsultationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Brand Identity & Omnichannel Launch",
    monthlyGmv: "₹10L – ₹50L",
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
          service: `${formData.service} (Est GMV: ${formData.monthlyGmv})`,
          message: formData.message || "Consultation request from Branding & eCommerce Architecture page",
          inquiry_type: "service",
          source: "branding-ecommerce-page",
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
      className="relative w-full bg-[#020412] text-white py-20 sm:py-28 overflow-hidden border-t border-slate-900/90"
    >
      {/* Background Cosmic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-purple-600/15 via-blue-600/10 to-transparent blur-[160px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-cyan-600/10 blur-[170px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(56,189,248,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.7) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      <Container size="wide" className="relative z-10 max-w-6xl space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Pitch & Trust */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-cyan-400 text-xs font-mono font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>LAUNCH YOUR BRAND ARCHITECTURE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              Ready to Scale <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Beyond Boundaries?
              </span>
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed">
              Schedule a strategic architecture session with our commerce specialists. We’ll audit your brand, evaluate marketplace opportunities, and build an actionable roadmap for profitable scale.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>NDA Protected &amp; Full IP Copyright Ownership</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Sub-Second Sync Architecture Blueprint Provided</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>Direct Consultation with Senior Solutions Architects</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl space-y-1">
              <div className="text-xs font-bold text-white">Rapid Response Guarantee</div>
              <div className="text-[11px] text-slate-400">Our architecture squad reviews requests and responds within 4 business hours.</div>
            </div>
          </div>

          {/* Right Column: Interactive Cosmic Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">Consultation Request Received!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-white">{formData.name}</span>. Our lead commerce architect is reviewing your details and will get in touch shortly at <span className="text-cyan-400 font-medium">{formData.email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        company: "",
                        service: "Brand Identity & Omnichannel Launch",
                        monthlyGmv: "₹10L – ₹50L",
                        message: "",
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Rohit Sharma"
                          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rohit@yourbrand.com"
                          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Brand / Company Name
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Acme Retail Ltd"
                          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Primary Scope
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                      >
                        <option value="Brand Identity & Omnichannel Launch">Brand Identity &amp; Omnichannel Launch</option>
                        <option value="Headless Storefront & 1-Click Checkout">Headless Storefront &amp; 1-Click Checkout</option>
                        <option value="Marketplace API Syndication (Amazon/Flipkart)">Marketplace API Syndication (Amazon/Flipkart)</option>
                        <option value="3D Product Packaging & CGI Visuals">3D Product Packaging &amp; CGI Visuals</option>
                        <option value="Algorithmic Repricing & DSP Advertising">Algorithmic Repricing &amp; DSP Advertising</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Current Monthly GMV
                      </label>
                      <select
                        value={formData.monthlyGmv}
                        onChange={(e) => setFormData({ ...formData, monthlyGmv: e.target.value })}
                        className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                      >
                        <option value="Pre-launch / New Venture">Pre-launch / New Venture</option>
                        <option value="₹5L – ₹20L">₹5L – ₹20L</option>
                        <option value="₹20L – ₹1Cr">₹20L – ₹1Cr</option>
                        <option value="₹1Cr – ₹5Cr+">₹1Cr – ₹5Cr+ (Enterprise Scale)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      Project Goals &amp; Channels
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your brand vision, target marketplaces, and current bottlenecks..."
                      className="w-full bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Transmitting Architecture Blueprint..." : "Request Strategic Architecture Blueprint"}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
