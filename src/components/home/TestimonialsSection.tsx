"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/shared/ui/Container";
import { CustomSelect } from "@/components/shared/ui/CustomSelect";
import BlurText from "@/components/ui/BlurText";
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
  MapPin,
  Quote,
} from "lucide-react";
import { Testimonial } from "@/lib/db/schema";

interface TestimonialSpotlight {
  id: number | string;
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

/* ── Carousel testimonials (for the bottom simple grid carousel) ── */
interface CarouselTestimonial {
  id: number | string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
}

const CAROUSEL_TESTIMONIALS: CarouselTestimonial[] = [
  {
    id: 1,
    name: "Anil Sharma",
    role: "Founder & CEO",
    company: "PixelTech Technologies",
    location: "Ranchi, Jharkhand",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
    quote:
      "XSPACEWEB built our website and mobile app with great professionalism. The team understood our requirements perfectly and delivered a smooth, user-friendly experience. Their digital marketing support has also helped us reach more customers and grow faster.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Marketing Manager",
    company: "WebSky Solutions",
    location: "Bengaluru, Karnataka",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    quote:
      "We partnered with XSPACEWEB for our website development and SEO services. The communication was clear, execution was on time, and the results have been impressive. Our organic traffic has grown significantly in just 3 months!",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohit Verma",
    role: "Director",
    company: "NextGen Solutions",
    location: "Noida, Uttar Pradesh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    quote:
      "The XSPACEWEB team developed our custom mobile app and also handled the UI/UX design. The app is functional, clean and exactly what we envisioned. Their creative team also delivered excellent graphic designs for our brand.",
    rating: 5,
  },
  {
    id: 4,
    name: "Neha Kapoor",
    role: "Business Head",
    company: "BrightPath Media",
    location: "Mumbai, Maharashtra",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    quote:
      "Their digital marketing and content strategy brought real visibility to our brand. We saw a noticeable increase in engagement and leads within a few weeks. Highly recommend them for anyone looking for reliable digital solutions.",
    rating: 5,
  },
  {
    id: 5,
    name: "Vikram Desai",
    role: "Co-Founder",
    company: "InnoTech Labs",
    location: "Pune, Maharashtra",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    quote:
      "XSPACEWEB delivered an outstanding SaaS product for our startup. Their technical expertise and dedication to quality are truly commendable. The platform runs flawlessly and our users love the interface.",
    rating: 5,
  },
  {
    id: 6,
    name: "Sanya Gupta",
    role: "Product Manager",
    company: "CloudNine Digital",
    location: "Hyderabad, Telangana",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    quote:
      "From concept to deployment, the XSPACEWEB team delivered a polished product that exceeded our expectations. Their attention to detail in both design and functionality is remarkable. A truly professional team.",
    rating: 5,
  },
  {
    id: 7,
    name: "Arjun Patel",
    role: "CTO",
    company: "DataFlow Systems",
    location: "Ahmedabad, Gujarat",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    quote:
      "The backend architecture XSPACEWEB built for us handles thousands of concurrent users without breaking a sweat. Scalable, secure, and brilliantly engineered. Their DevOps support has been invaluable.",
    rating: 5,
  },
  {
    id: 8,
    name: "Meera Joshi",
    role: "Creative Director",
    company: "DesignSpark Studio",
    location: "Jaipur, Rajasthan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    quote:
      "As a design-focused agency ourselves, we have high standards. XSPACEWEB impressed us with their pixel-perfect UI implementation and smooth animations. They truly understand modern web aesthetics.",
    rating: 5,
  },
];

const CARDS_PER_PAGE = 4;

interface TestimonialsSectionProps {
  initialReviews?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ initialReviews }) => {
  const reviews: CarouselTestimonial[] = React.useMemo(() => {
    if (initialReviews && initialReviews.length > 0) {
      return initialReviews.map((t) => ({
        id: t.id,
        name: t.name,
        role: t.designation || "",
        company: t.company || "",
        location: t.location || "",
        avatar:
          t.profileImageUrl ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
        quote: t.testimonialText,
        rating: t.rating ?? 5,
      }));
    }
    return CAROUSEL_TESTIMONIALS;
  }, [initialReviews]);

  const spotlightList: TestimonialSpotlight[] = React.useMemo(() => {
    if (initialReviews && initialReviews.length > 0) {
      return initialReviews.slice(0, 5).map((t) => ({
        id: t.id,
        name: t.name,
        role: [t.designation, t.company].filter(Boolean).join(", "),
        avatar:
          t.profileImageUrl ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
        quote: t.testimonialText,
        rating: t.rating ?? 5,
      }));
    }
    return SPOTLIGHT_TESTIMONIALS;
  }, [initialReviews]);

  const totalPages = Math.max(1, Math.ceil(reviews.length / CARDS_PER_PAGE));
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselPage, setCarouselPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const activeTestimonial = spotlightList[activeIndex % spotlightList.length] || spotlightList[0];

  // Listen for prefill events from other homepage CTAs
  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ email: string }>;
      if (customEvent.detail?.email) {
        setFormData((prev) => ({ ...prev, email: customEvent.detail.email }));
      }
    };
    window.addEventListener("prefill-inquiry-email", handlePrefill);
    return () => window.removeEventListener("prefill-inquiry-email", handlePrefill);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + spotlightList.length) % spotlightList.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % spotlightList.length);
  };

  const handleCarouselPrev = () => {
    setSlideDirection(-1);
    setCarouselPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleCarouselNext = () => {
    setSlideDirection(1);
    setCarouselPage((prev) => (prev + 1) % totalPages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company || undefined,
          service: formData.service || undefined,
          message: formData.message || undefined,
          inquiry_type: "project",
          source: "homepage-project",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.details?.[0] || data.error || "Failed to submit inquiry. Please try again.");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      const msg = err instanceof Error ? err.message : "Something went wrong. Please check your information and try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleCards = reviews.slice(
    carouselPage * CARDS_PER_PAGE,
    carouselPage * CARDS_PER_PAGE + CARDS_PER_PAGE
  );

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
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 flex flex-col items-start">
                <BlurText
                  text="What Our"
                  delay={100}
                  animateBy="words"
                  direction="top"
                  stepDuration={0.4}
                  className="text-[#07152B]"
                  as="span"
                />
                <BlurText
                  text="Clients Say"
                  delay={140}
                  animateBy="words"
                  direction="top"
                  stepDuration={0.4}
                  className="text-[#1668E8]"
                  as="span"
                />
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
                    {spotlightList.map((t, idx) => (
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
          <div id="project-inquiry" className="lg:col-span-6 scroll-mt-24">
            <div className="relative bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-2xl shadow-blue-900/10 border border-slate-100/90 overflow-hidden">
              
              {/* Decorative Hand-drawn Loopy Arrow SVG */}
              <div className="absolute top-4 sm:top-5 right-4 sm:right-6 text-[#1668E8] pointer-events-none hidden sm:block">
                <svg width="64" height="64" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Loopy arrow shaft */}
                  <path
                    d="M44 20 C42 12, 48 6, 54 8 C60 10, 62 18, 56 24 C50 30, 42 24, 46 16 C48 10, 56 8, 60 16 C63 24, 58 36, 48 44 C40 50, 28 52, 14 50"
                    stroke="#1668E8"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Arrow Head */}
                  <path
                    d="M26 44 L14 50 L20 60"
                    stroke="#1668E8"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* 3 Accent Burst Lines */}
                  <path
                    d="M27 56 L34 54"
                    stroke="#1668E8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M28 62 L36 64"
                    stroke="#1668E8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 66 L25 73"
                    stroke="#1668E8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
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
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Alert Box */}
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-in fade-in">
                      {errorMessage}
                    </div>
                  )}

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
                        disabled={isSubmitting}
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-[#1668E8] rounded-xl text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#1668E8]/20 transition-all disabled:opacity-60"
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
                        disabled={isSubmitting}
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-[#1668E8] rounded-xl text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#1668E8]/20 transition-all disabled:opacity-60"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        disabled={isSubmitting}
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-[#1668E8] rounded-xl text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#1668E8]/20 transition-all disabled:opacity-60"
                      />
                    </div>

                    {/* Company (Optional) */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Building className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        placeholder="Company (Optional)"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-[#1668E8] rounded-xl text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#1668E8]/20 transition-all disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* Select a Service */}
                  <CustomSelect
                    value={formData.service}
                    onChange={(val) => setFormData({ ...formData, service: val })}
                    placeholder="Select a Service"
                    leadingIcon={<ListFilter className="w-4 h-4" />}
                    triggerClassName="py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border-slate-200/80 rounded-xl text-slate-900 text-sm"
                    options={[
                      { value: "web-development", label: "Web Application Development" },
                      { value: "mobile-app", label: "Mobile App Development" },
                      { value: "ui-ux-design", label: "UI/UX & Digital Design" },
                      { value: "cloud-devops", label: "Cloud & DevOps Engineering" },
                      { value: "custom-saas", label: "Custom Software & SaaS" },
                    ]}
                  />

                  {/* Message Textarea */}
                  <div className="relative">
                    <div className="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      rows={3}
                      disabled={isSubmitting}
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50/80 hover:bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-[#1668E8] rounded-xl text-slate-900 text-sm placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#1668E8]/20 transition-all resize-none disabled:opacity-60"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-[#1668E8] hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-full flex items-center justify-between transition-all duration-300 shadow-lg shadow-blue-500/25 group active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold pl-2">
                      {isSubmitting ? "Sending Message..." : "Send Message"}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white text-[#1668E8] flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform">
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-[#1668E8] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ArrowRight className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* ──────────────────────────────────────────────────────────────── */}
        {/* SIMPLE TESTIMONIAL CARDS CAROUSEL (replaces StaggerTestimonials) */}
        {/* ──────────────────────────────────────────────────────────────── */}
        <div className="pt-8 border-t border-slate-200/80">
          {/* Section title */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07152B] tracking-tight">
                Client Reviews
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Trusted by businesses across industries. Here&apos;s what they have to say.
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleCarouselPrev}
                aria-label="Previous reviews"
                className="w-11 h-11 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-600 hover:border-blue-300 hover:text-[#1668E8] hover:shadow-md active:scale-95 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleCarouselNext}
                aria-label="Next reviews"
                className="w-11 h-11 rounded-full bg-[#1668E8] text-white shadow-md shadow-blue-500/25 flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cards Grid with Slide Animation */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={carouselPage}
                initial={{ opacity: 0, x: slideDirection * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDirection * -80 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {visibleCards.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(7,21,43,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    {/* Top: Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    {/* Avatar + Name + Role + Location */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-[#07152B] text-sm truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium truncate">
                          {testimonial.role}
                        </p>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{testimonial.location}</span>
                        </p>
                      </div>
                    </div>

                    {/* Blue Quote Icon */}
                    <div className="mb-2">
                      <Quote className="w-6 h-6 text-[#1668E8]/40" />
                    </div>

                    {/* Quote Text */}
                    <p className="text-slate-600 text-[13px] leading-relaxed flex-1">
                      {testimonial.quote}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to page ${idx + 1}`}
                onClick={() => {
                  setSlideDirection(idx > carouselPage ? 1 : -1);
                  setCarouselPage(idx);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === carouselPage
                    ? "w-8 bg-[#1668E8]"
                    : "w-5 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
};
