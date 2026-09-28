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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
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
      {/* Background Image: Cropped Clean Creation of Adam Human & AI Hand in Cosmic Space without black bars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/services/cosmic_adam_ai.jpg"
          alt="Creation of Adam Human and AI Hand Touching"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />

        {/* Minimal soft contrast overlay */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
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
        <div className="w-full max-w-5xl mx-auto rounded-[24px] sm:rounded-[28px] bg-[#07152B]/75 backdrop-blur-2xl border border-white/20 p-5 sm:p-7 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-2 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Message Received!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
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
                className="mt-2 text-xs text-blue-400 hover:text-blue-300 font-semibold underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
              {/* Left Column: Heading & Subtitle */}
              <div className="lg:col-span-4 space-y-1.5 text-left">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-blue-400 uppercase block">
                  LET&apos;S CONNECT
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Have a Project in Mind?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tell us about your idea and our team will get back to you shortly with the best solution.
                </p>
              </div>

              {/* Right Column: Input Grid */}
              <div className="lg:col-span-8 space-y-2.5">
                {/* Row 1: Name, Email, Service Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Name Input */}
                  <div className="relative flex items-center">
                    <User className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition-all"
                    />
                  </div>

                  {/* Select Service Dropdown */}
                  <CustomSelect
                    value={selectedService}
                    onChange={setSelectedService}
                    placeholder="Select Service"
                    leadingIcon={<LayoutGrid className="w-3.5 h-3.5 text-slate-400" />}
                    triggerClassName="bg-white/10 hover:bg-white/15 focus:bg-white/20 border-white/20 text-white rounded-xl py-2 px-3 text-xs h-[36px]"
                    options={[
                      "Google My Business",
                      "Web Development",
                      "Mobile App Development",
                      "Digital Marketing",
                      "Branding",
                      "UI/UX Design",
                      "Animation VFX",
                      "Cloud & Enterprise Solutions",
                    ]}
                  />
                </div>

                {/* Row 2: Message Input + Send Message Button */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <div className="relative flex items-center w-full">
                    <MessageSquare className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Project Details / Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/15 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#07152B] font-bold text-xs transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center gap-1.5 flex-shrink-0 cursor-pointer disabled:opacity-70"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
