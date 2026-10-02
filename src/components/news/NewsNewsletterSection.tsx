"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export const NewsNewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe. Please try again.");
      }

      setIsSubmitted(true);
      setResponseMsg(data.message || "Thank you! You're subscribed to XSPACEWEB updates.");
      setEmail("");

      setTimeout(() => {
        setIsSubmitted(false);
        setResponseMsg("");
      }, 6000);
    } catch (err: any) {
      console.error("Newsletter subscribe error:", err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#F8FAFC] pb-16 sm:pb-20">
      <Container size="wide">
        <div className="relative rounded-3xl bg-[#07152B] text-white p-8 sm:p-10 md:p-12 overflow-hidden shadow-2xl">
          {/* Glowing blue gradient accent on the right */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#1668E8]/40 via-[#1668E8]/10 to-transparent pointer-events-none rounded-r-3xl" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[#1668E8]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex items-start gap-4 sm:gap-5">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1668E8] flex items-center justify-center text-white shadow-lg shadow-[#1668E8]/30">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#38BDF8] uppercase">
                  STAY UPDATED
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Get the latest news, product updates and event invites straight to your inbox.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-5 space-y-2">
              {isSubmitted ? (
                <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-full px-5 py-3.5 flex items-center gap-3 text-emerald-300 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                  <span className="text-xs sm:text-sm font-semibold">
                    {responseMsg}
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 backdrop-blur-md p-1.5 sm:p-2 rounded-full border border-white/20 shadow-inner"
                >
                  <div className="flex-grow w-full px-3">
                    <input
                      type="email"
                      required
                      value={email}
                      disabled={loading}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full bg-transparent text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !email}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1668E8] hover:bg-[#1255c2] active:scale-95 text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer flex-shrink-0 disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {errorMsg && (
                <div className="flex items-center gap-1.5 px-3 text-xs text-red-400 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
