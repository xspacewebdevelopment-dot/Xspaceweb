"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  User,
  Mail,
  LayoutGrid,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { CustomSelect } from "@/components/shared/ui/CustomSelect";

interface ServicesCosmicContactSectionProps {
  onExploreServicesClick?: () => void;
}

export const ServicesCosmicContactSection: React.FC<ServicesCosmicContactSectionProps> = ({
  onExploreServicesClick,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          service: selectedService || undefined,
          message: message || undefined,
          inquiry_type: "service",
          source: "services-page",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.details?.[0] || data.error || "Failed to submit inquiry.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("Cosmic contact submission error:", err);
      const msg = err instanceof Error ? err.message : "Failed to submit inquiry.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollToServices = () => {
    if (onExploreServicesClick) {
      onExploreServicesClick();
    } else {
      const el = document.getElementById("services-solutions");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative w-full min-h-[580px] md:min-h-[660px] lg:min-h-[720px] flex flex-col justify-between pt-8 sm:pt-12 pb-8 sm:pb-12 overflow-hidden select-none">
      {/* Background Image: Scenic rolling green hills matching services hero video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/services/services_bliss_bg.jpg"
          alt="Digital Solutions Rolling Green Hills Landscape"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />

        {/* Balanced contrast overlay for crisp text readability and vibrant meadow */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/25 pointer-events-none" />
      </div>

      {/* TOP HEADLINE & CTA */}
      <Container size="wide" className="relative z-10 pt-2 sm:pt-4 text-center flex flex-col items-center">
        {/* Small Brand Eyebrow */}
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/95 uppercase block mb-2 drop-shadow">
          XSPACEWEB
        </span>

        {/* Main Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-extrabold text-white tracking-tight leading-[1.14] max-w-3xl mx-auto drop-shadow-md">
          Digital Solutions <br />
          for a{" "}
          <span className="bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#00D2FF] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(56,189,248,0.7)]">
            Brighter Tomorrow
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-[15px] text-white/90 max-w-xl mx-auto font-normal leading-relaxed drop-shadow">
          From strategy to design, development and marketing — we provide end-to-end digital services to help your business grow and scale.
        </p>

        {/* Center Pill Button: Explore Our Services -> */}
        <div className="mt-4 sm:mt-5">
          <button
            type="button"
            onClick={handleScrollToServices}
            className="px-6 sm:px-7 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#07152B] font-bold text-xs sm:text-sm transition-all duration-200 shadow-xl active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer group"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </Container>

      {/* BOTTOM CONTACT BOX: "Have a Project in Mind?" */}
      <Container size="wide" className="relative z-10 pt-8 sm:pt-12">
        <div className="w-full max-w-5xl mx-auto rounded-[24px] sm:rounded-[28px] bg-white/20 backdrop-blur-md border border-white/35 p-5 sm:p-7 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition-all duration-300">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-2 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-white/25 border border-white/40 text-white flex items-center justify-center mx-auto shadow-lg backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-xl font-extrabold text-white drop-shadow-sm">Message Received!</h3>
              <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto leading-relaxed drop-shadow-sm">
                Thank you, <strong className="text-white">{name}</strong>. Our digital solutions consultant will reach out to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                  setSelectedService("");
                }}
                className="mt-2 text-xs text-sky-200 hover:text-white font-semibold underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
              {/* Left Column: Heading & Subtitle */}
              <div className="lg:col-span-4 space-y-1.5 text-left">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-sky-200 uppercase block drop-shadow-sm">
                  LET&apos;S CONNECT
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-sm">
                  Have a Project in Mind?
                </h3>
                <p className="text-xs text-white/90 leading-relaxed drop-shadow-sm">
                  Tell us about your idea and our team will get back to you shortly with the best solution.
                </p>
              </div>

              {/* Right Column: Input Grid */}
              <div className="lg:col-span-8 space-y-2.5">
                {/* Row 1: Name, Email, Service Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Name Input */}
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-3.5 h-3.5 text-white/80 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-white/15 border border-white/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/75 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 focus:bg-white/25 transition-all shadow-inner"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-3.5 h-3.5 text-white/80 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/15 border border-white/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/75 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 focus:bg-white/25 transition-all shadow-inner"
                    />
                  </div>

                  {/* Select Service Dropdown */}
                  <CustomSelect
                    value={selectedService}
                    onChange={setSelectedService}
                    placeholder="Select Service"
                    leadingIcon={<LayoutGrid className="w-3.5 h-3.5 text-white/80" />}
                    triggerClassName="bg-white/15 hover:bg-white/20 focus:bg-white/25 border-white/30 text-white rounded-xl py-2 px-3 text-xs h-[36px]"
                    options={[
                      "Google My Business",
                      "Web Development",
                      "Mobile App Development",
                      "Digital Marketing",
                      "Branding",
                      "UI/UX Design",
                      "Animation VFX",
                      "Studio XSW",
                    ]}
                  />
                </div>

                {/* Row 2: Message Input + Send Message Button */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <div className="relative flex items-center w-full">
                    <MessageSquare className="absolute left-3 w-3.5 h-3.5 text-white/80 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Project Details / Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/15 border border-white/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/75 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 focus:bg-white/25 transition-all shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#07152B] font-bold text-xs transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer disabled:opacity-70 group"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
};
