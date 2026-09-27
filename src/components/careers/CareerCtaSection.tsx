"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Send, CheckCircle2, X } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

export const CareerCtaSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="w-full bg-[#F8FAFC] pb-16 sm:pb-24">
      <Container size="wide">
        <div className="relative rounded-3xl bg-[#07152B] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Luminous Neon X Space Graphic in Background */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 lg:opacity-40 pointer-events-none flex items-center justify-end pr-10">
            <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1668E8] to-[#38BDF8] rounded-full blur-3xl opacity-40" />
              <div className="relative w-full h-full flex items-center justify-center font-black text-[220px] text-white/10 select-none tracking-tighter">
                X
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                <span className="text-xs font-bold tracking-wider text-[#38BDF8] uppercase">
                  JOIN OUR TEAM
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Let&apos;s build something great <br />
                <span className="text-[#38BDF8]">together.</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Explore open positions or send us your profile if you don&apos;t see a matching role. We&apos;re always looking for talented people.
              </p>
            </div>

            {/* Right Action Button */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-[#07152B] text-sm sm:text-base font-bold transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <span>Send Your Profile</span>
                <Send className="w-4 h-4 text-[#1668E8] transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* General Profile Submission Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-slate-800">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSubmitted(false);
                }}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#07152B]">
                    Profile Received!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto">
                    Thanks for reaching out to XSPACEWEB. If your skillset matches an upcoming opening, our talent team will contact you.
                  </p>
                  <button
                    onClick={() => {
                      setModalOpen(false);
                      setSubmitted(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#07152B] text-white text-xs font-semibold hover:bg-[#1668E8] transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#1668E8] tracking-wider uppercase">
                      TALENT POOL
                    </span>
                    <h3 className="text-xl font-bold text-[#07152B]">
                      Send Us Your Profile
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tell us about your background and what you love building.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Area of Expertise / Preferred Role *
                    </label>
                    <select
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                    >
                      <option value="">Select Domain...</option>
                      <option value="engineering">Software & Web Engineering</option>
                      <option value="design">UI/UX & Product Design</option>
                      <option value="marketing">Digital & Growth Marketing</option>
                      <option value="sales">Sales & Business Development</option>
                      <option value="internship">Student / Graduate Internship</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Portfolio / GitHub / Resume Link *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-[#1668E8] hover:bg-[#1255c2] text-white text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Profile</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
