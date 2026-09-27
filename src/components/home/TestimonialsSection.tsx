"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import {
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  ListFilter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface TestimonialSpotlight {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

const SPOTLIGHT_TESTIMONIALS: TestimonialSpotlight[] = [
  {
    id: 1,
    name: "Rohan Mehta",
    role: "Founder & CEO, GameDay Health",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    quote:
      "Working with their team was a game-changer for our business. They understood our requirements perfectly and delivered beyond our expectations. The entire process was smooth, transparent and highly professional.",
    rating: 5,
  },
  {
    id: 2,
    name: "Amit Shah",
    role: "CTO, SecureNet India",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    quote:
      "The attention to detail in UI/UX and motion design is unmatched. Our conversion rates jumped 180% after launch! Highly recommended for any web application project.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "COO, Innovate Labs",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    quote:
      "XspaceWeb turned our complex SaaS platform requirements into a sleek, lightning-fast digital product. The team went above and beyond at every phase.",
    rating: 5,
  },
  {
    id: 4,
    name: "Ananya Roy",
    role: "VP of Engineering, CloudMasters",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    quote:
      "XspaceWeb's products made scaling our web infrastructure seamless. Can't recommend their engineering and design team enough!",
    rating: 5,
  },
  {
    id: 5,
    name: "Alex Vance",
    role: "VP of Growth, TechCorp",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    quote:
      "The scalability of XspaceWeb's backend and API integrations is remarkable. It handles high concurrent user volume without any latency.",
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const activeTestimonial = SPOTLIGHT_TESTIMONIALS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SPOTLIGHT_TESTIMONIALS.length) % SPOTLIGHT_TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SPOTLIGHT_TESTIMONIALS.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="testimonials" className="w-full bg-[#F6F9FD] py-16 sm:py-24 relative overflow-hidden">
      {/* Background Soft Blue Blob Backdrop Accent */}
      <div className="absolute top-1/4 -right-36 w-[500px] h-[500px] bg-[#D0E3FF]/50 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 -left-36 w-[450px] h-[450px] bg-[#E3EEFF]/60 rounded-full blur-3xl pointer-events-none -z-0" />

      <Container size="wide" className="relative z-10">
        
        {/* Main 2-Column Split Section (Testimonials + Project Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* LEFT COLUMN: Testimonials Feedback */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full pt-2">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-4 select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1668E8]" />
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-slate-500 uppercase">
                  TESTIMONIALS
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#07152B] tracking-tight leading-[1.1] mb-5">
                What Our <br />
                <span className="text-[#1668E8]">Clients Say</span>
              </h2>

              {/* Subtitle */}
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Real stories from businesses we&apos;ve helped grow through technology, design and innovation.
              </p>

              {/* Avatars Row & Navigation Controls */}
              <div className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200/70">
                {/* Overlapping Avatars + Badge */}
                <div className="flex items-center">
                  <div className="flex -space-x-3 overflow-hidden p-1">
                    {SPOTLIGHT_TESTIMONIALS.map((t, idx) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`inline-block h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-2 ring-white transition-all duration-300 ${
                          idx === activeIndex
                            ? "ring-[#1668E8] scale-110 z-20 shadow-md"
                            : "opacity-80 hover:opacity-100 hover:scale-105 z-10"
                        }`}
                      >
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="h-full w-full rounded-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <span className="ml-3 px-3 py-1 bg-[#E8F1FD] text-[#1668E8] text-xs font-bold rounded-full select-none">
                    +20
                  </span>
                </div>

                {/* Arrow Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-700 hover:border-blue-300 hover:text-[#1668E8] active:scale-95 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-10 h-10 rounded-full bg-[#1668E8] text-white shadow-md shadow-blue-500/25 flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Testimonial Quote Spotlight Display */}
              <div className="relative min-h-[220px]">
                {/* Big Blue Decorative Quote Mark */}
                <div className="mb-4">
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-[#1668E8]"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36 1 24.512 4.456 28 9.064 28c3.84 0 6.624-2.784 6.624-6.432 0-3.648-2.496-6.144-5.952-6.144-.672 0-1.632.096-2.112.288.672-3.84 3.744-8.064 7.2-10.272L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.152 3.456 8.64 8.064 8.64 3.84 0 6.624-2.784 6.624-6.432 0-3.648-2.496-6.144-5.952-6.144-.672 0-1.632.096-2.112.288.672-3.84 3.744-8.064 7.2-10.272L25.864 4z" />
                  </svg>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Quote Text */}
                    <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed italic">
                      &ldquo;{activeTestimonial.quote}&rdquo;
                    </p>

                    {/* Reviewer Details */}
                    <div className="flex items-center gap-4 pt-2">
                      <img
                        src={activeTestimonial.avatar}
                        alt={activeTestimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div>
                        <h4 className="font-bold text-[#07152B] text-base">
                          {activeTestimonial.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">
                          {activeTestimonial.role}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block" />

                      {/* Star Rating */}
                      <div className="hidden sm:flex items-center gap-1 text-amber-400">
                        {[...Array(activeTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Project Form Card */}
          <div className="lg:col-span-6">
            <div className="relative bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-2xl shadow-blue-900/10 border border-slate-100/90 overflow-hidden">
              
              {/* Decorative Hand-drawn Arrow SVG in top-right */}
              <div className="absolute top-6 right-6 text-[#1668E8] opacity-80 pointer-events-none hidden sm:block">
                <svg width="48" height="48" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 18C20 8 38 8 42 22C44 30 35 38 28 32C22 26 28 14 38 18" stroke="#1668E8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3"/>
                  <path d="M30 34L26 31L29 27" stroke="#1668E8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Form Card Header */}
              <div className="mb-6">
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 block">
                  LET&apos;S WORK TOGETHER
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07152B]">
                  Have a <span className="text-[#1668E8]">Project in Mind?</span>
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Whether it&apos;s a website, mobile app, digital marketing or a custom solution — we&apos;re here to help.
                </p>
              </div>

              {/* Form Body */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-blue-50 text-[#1668E8] rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">Message Received!</h4>
                  <p className="text-slate-600 text-sm max-w-xs mx-auto">
                    Thank you, <span className="font-semibold">{formData.name || "there"}</span>! Our team will review your inquiry and get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Grid Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Your Name */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-[#1668E8] rounded-xl text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#1668E8]/20 transition-all"
                      />
                    </div>

                    {/* Your Email */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-[#1668E8] rounded-xl text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#1668E8]/20 transition-all"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-[#1668E8] rounded-xl text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#1668E8]/20 transition-all"
                      />
                    </div>

                    {/* Company (Optional) */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Building className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Company (Optional)"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-[#1668E8] rounded-xl text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#1668E8]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Select a Service */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <ListFilter className="w-4 h-4" />
                    </div>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full pl-10 pr-10 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-[#1668E8] rounded-xl text-slate-900 text-sm outline-none focus:ring-2 focus:ring-[#1668E8]/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-slate-400">
                        Select a Service
                      </option>
                      <option value="web-development">Web Application Development</option>
                      <option value="mobile-app">Mobile App Development</option>
                      <option value="ui-ux-design">UI/UX &amp; Digital Design</option>
                      <option value="cloud-devops">Cloud &amp; DevOps Engineering</option>
                      <option value="custom-saas">Custom Software &amp; SaaS</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="relative">
                    <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-[#1668E8] rounded-xl text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#1668E8]/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#1668E8] hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-full flex items-center justify-between transition-all duration-300 shadow-lg shadow-blue-500/25 group active:scale-[0.99]"
                  >
                    <span className="text-sm sm:text-base font-bold pl-2">Send Message</span>
                    <div className="w-9 h-9 rounded-full bg-white text-[#1668E8] flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Section Divider & Title for Interactive 3D Staggered Testimonials */}
        <div className="pt-8 border-t border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07152B] tracking-tight">
              Explore All <span className="text-[#1668E8]">Client Reviews</span>
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Click any card below to cycle through 15+ verified reviews from industry leaders.
            </p>
          </div>

          {/* Staggered Animated Testimonials Carousel */}
          <div className="relative w-full max-w-6xl mx-auto rounded-3xl bg-white border border-slate-200/90 shadow-xl overflow-hidden p-2 sm:p-4">
            <StaggerTestimonials />
          </div>
        </div>

      </Container>
    </section>
  );
};

