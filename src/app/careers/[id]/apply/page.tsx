"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Palette,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  Send,
  ArrowRight,
  GraduationCap,
  Users,
  Award,
  Laptop,
  Check,
  Edit2,
  Target,
  Search,
  MessageSquare,
  Globe,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { CustomSelect } from "@/components/shared/ui/CustomSelect";
import { ALL_CAREERS } from "@/lib/careersData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CareerApplyPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const job = ALL_CAREERS.find((item) => item.id === resolvedParams.id);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [coverNote, setCoverNote] = useState("");
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);

  if (!job) {
    notFound();
  }

  const isInternship = job.type === "internship" || job.id.includes("intern");
  const isUiUxIntern = job.id === "uiux-intern" || (isInternship && job.title.includes("UI/UX"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Smoothly scroll to the success banner at the bottom or top
    const banner = document.getElementById("success-banner");
    if (banner) {
      banner.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFileName(e.target.files[0].name);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFD] pt-4 pb-20">
      <Container size="wide">
        {/* ========================================================= */}
        {/* BREADCRUMBS */}
        {/* ========================================================= */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-5 pb-3 border-b border-slate-200/80">
          <Link href="/" className="hover:text-[#1668E8] flex items-center gap-1">
            <span>🏠</span>
          </Link>
          <span className="text-slate-300">:</span>
          <Link href="/careers" className="hover:text-[#1668E8]">
            Careers
          </Link>
          <span className="text-slate-300">&gt;</span>
          <Link href="/careers#open-positions" className="hover:text-[#1668E8]">
            {isInternship ? "Internship" : "Jobs"}
          </Link>
          <span className="text-slate-300">&gt;</span>
          <Link href={`/careers/${job.id}`} className="hover:text-[#1668E8]">
            {job.title}
          </Link>
          <span className="text-slate-300">&gt;</span>
          <span className="text-[#07152B] font-bold">Apply</span>
        </nav>

        {/* ========================================================= */}
        {/* HERO BANNER */}
        {/* ========================================================= */}
        {isUiUxIntern ? (
          /* Tailored UI/UX Internship Hero with 3D Illustration matching Reference Image */
          <div className="relative rounded-3xl bg-white p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm overflow-hidden mb-8">
            {/* Ambient Pastel Gradient Glow */}
            <div className="absolute right-0 top-0 w-full md:w-1/2 h-full bg-gradient-to-l from-[#EFF6FF] via-[#FAF5FF] to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Content */}
              <div className="space-y-3.5 max-w-xl">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5FF] text-[#9333EA] border border-[#E9D5FF]">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span className="text-[10.5px] font-extrabold tracking-wider uppercase">
                    INTERNSHIP APPLICATION
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#07152B] tracking-tight leading-[1.15]">
                  Apply for <span className="text-[#1668E8]">UI/UX</span>{" "}
                  <span className="text-[#9333EA]">Design Intern</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Start your journey with XSPACEWEB and work on real products, with real impact.
                </p>

                {/* 4 Benefit Pills in a Row */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-[#9333EA] text-xs font-semibold">
                    <Users className="w-3.5 h-3.5" /> Learn from experts
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#1668E8] text-xs font-semibold">
                    <Calendar className="w-3.5 h-3.5" /> Work on real projects
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-[#9333EA] text-xs font-semibold">
                    <Briefcase className="w-3.5 h-3.5" /> Flexible work options
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-[#DBEAFE] text-[#1668E8] text-xs font-semibold">
                    <Award className="w-3.5 h-3.5" /> Get a certificate
                  </span>
                </div>
              </div>

              {/* Right 3D Visual Art (Exact Reference Illustration) */}
              <div className="flex items-center justify-center lg:justify-end relative flex-shrink-0">
                <div className="relative w-[300px] sm:w-[360px] h-[200px] sm:h-[220px]">
                  <Image
                    src="/images/careers/uiux_hero_3d_girl.png"
                    alt="UI/UX Design Intern 3D Graphic"
                    fill
                    className="object-contain drop-shadow-md select-none"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Job Hero for Full-time Roles */
          <div className="relative rounded-3xl bg-white p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm overflow-hidden mb-8">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1668E8] border border-blue-200">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span className="text-[10.5px] font-bold tracking-wider uppercase">
                    {isInternship ? "INTERNSHIP APPLICATION" : "JOB APPLICATION"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-[#07152B] tracking-tight">
                  Apply for <span className="text-[#1668E8]">{job.title}</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Join XSPACEWEB and build scalable, world-class digital products with our engineering and design team.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1 text-slate-600">
                <div><strong>Location:</strong> {job.location}</div>
                <div><strong>Department:</strong> {job.department}</div>
                <div><strong>Type:</strong> {job.type === "internship" ? "Internship" : "Full-Time"}</div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MAIN 2-COLUMN FORM & SIDEBAR GRID */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Left Column: 4 Numbered Steps Form (8 cols) */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ---------------------------------------------------- */}
              {/* STEP 1: Your Information (Solid Blue Badge) */}
              {/* ---------------------------------------------------- */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#1668E8] text-white font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#07152B] leading-tight">
                      Your Information
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Tell us a bit about yourself.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 focus-within:ring-2 focus-within:ring-[#1668E8] focus-within:bg-white">
                      <span className="text-xs font-semibold text-slate-600 flex items-center gap-1 select-none flex-shrink-0">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="98765 43210"
                        className="w-full py-1.5 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Current Location <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      required
                      defaultValue="Kolkata, West Bengal"
                      triggerClassName="px-4 py-2.5 bg-slate-50 border-slate-200 text-xs sm:text-sm text-slate-800"
                      options={[
                        "📍 Kolkata, West Bengal",
                        "📍 Dhanbad, Jharkhand",
                        "📍 Bengaluru, Karnataka",
                        "📍 Delhi NCR",
                        "📍 Mumbai, Maharashtra",
                        "📍 Remote / Other India",
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* STEP 2: About Your Internship (Solid Purple Badge) */}
              {/* ---------------------------------------------------- */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#9333EA] text-white font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#07152B] leading-tight">
                      {isInternship ? "About Your Internship" : "About Your Application"}
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Help us understand your background and interests.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Applying For <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={isUiUxIntern ? "UI/UX Design Intern" : job.title}
                      className="w-full px-4 py-2.5 bg-slate-100/90 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 cursor-not-allowed select-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Availability <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      required
                      placeholder="Select availability"
                      triggerClassName="px-4 py-2.5 bg-slate-50 border-slate-200 text-xs sm:text-sm text-slate-800"
                      options={[
                        { value: "fulltime", label: "Full-time (40 hrs/week)" },
                        { value: "parttime", label: "Part-time (20 hrs/week)" },
                        { value: "flexible", label: "Flexible / University Schedule" },
                      ]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Preferred Work Mode <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      required
                      defaultValue="Kolkata / Remote"
                      triggerClassName="px-4 py-2.5 bg-slate-50 border-slate-200 text-xs sm:text-sm text-slate-800"
                      options={[
                        "Kolkata / Remote",
                        "Full Remote",
                        "In-Office (Kolkata)",
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Expected Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-[#1668E8] focus-within:bg-white">
                      <span className="text-xs text-slate-500 mr-2 select-none">📅</span>
                      <input
                        type="date"
                        required
                        className="w-full bg-transparent text-xs sm:text-sm text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* STEP 3: Education (Solid Pink/Rose Badge) */}
              {/* ---------------------------------------------------- */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#EC4899] text-white font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#07152B] leading-tight">
                      Education
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Your academic background and study field.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Highest Qualification <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      required
                      placeholder="Select qualification"
                      triggerClassName="px-4 py-2.5 bg-slate-50 border-slate-200 text-xs sm:text-sm text-slate-800"
                      options={[
                        { value: "btech", label: "B.Tech / B.E." },
                        { value: "bdes", label: "B.Des / M.Des (Design)" },
                        { value: "bca", label: "BCA / B.Sc Computer Science" },
                        { value: "mtech", label: "M.Tech / MCA" },
                        { value: "bba", label: "BBA / MBA" },
                        { value: "other", label: "Other Degree / Diploma" },
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      College / University <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your college name"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Year of Study <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      required
                      placeholder="Select year"
                      triggerClassName="px-4 py-2.5 bg-slate-50 border-slate-200 text-xs sm:text-sm text-slate-800"
                      options={[
                        { value: "1st", label: "1st Year" },
                        { value: "2nd", label: "2nd Year" },
                        { value: "3rd", label: "3rd Year" },
                        { value: "4th", label: "4th Year (Final Year)" },
                        { value: "graduated", label: "Graduated / Recent Passout" },
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Field of Study <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      required
                      placeholder="Select field"
                      triggerClassName="px-4 py-2.5 bg-slate-50 border-slate-200 text-xs sm:text-sm text-slate-800"
                      options={[
                        { value: "design", label: "UI/UX & Product Design" },
                        { value: "cs", label: "Computer Science & Engineering" },
                        { value: "it", label: "Information Technology" },
                        { value: "multimedia", label: "Animation & Graphic Design" },
                        { value: "other", label: "Other Related Field" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* STEP 4: Portfolio & Documents (Solid Green Badge) */}
              {/* ---------------------------------------------------- */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-full bg-[#10B981] text-white font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#07152B] leading-tight">
                      Portfolio &amp; Documents
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Show us your work and tell us more about yourself.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Upload Resume Box */}
                  <div className="md:col-span-6 flex flex-col">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Upload Resume <span className="text-red-500">*</span>
                    </label>
                    <label className="relative flex-1 border-2 border-dashed border-blue-200 hover:border-[#1668E8] bg-[#F6F9FD] hover:bg-[#EFF6FF] rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[170px]">
                      {/* Cloud Upload Icon */}
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-[#1668E8] flex items-center justify-center mb-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                          <path d="M12 12v9" />
                          <path d="m8 16 4-4 4 4" />
                        </svg>
                      </div>

                      <span className="text-xs font-bold text-[#07152B]">
                        {resumeFileName ? resumeFileName : "Drag & drop your resume here"}
                      </span>
                      <span className="text-[11px] text-[#1668E8] font-medium mt-0.5">
                        or click to browse
                      </span>
                      <span className="text-[9.5px] text-slate-400 mt-2">
                        PDF, DOC, DOCX (Max 5 MB)
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Portfolio URLs: Portfolio, Behance, Dribbble */}
                  <div className="md:col-span-6 space-y-2.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Portfolio / Behance / Dribbble / Website <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>

                    {/* Website */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-[#1668E8] focus-within:bg-white">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 text-[#1668E8] flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="url"
                        placeholder="https://yourportfolio.com"
                        className="w-full bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>

                    {/* Behance */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-[#1668E8] focus-within:bg-white">
                      <div className="w-6 h-6 rounded-lg bg-[#0057FF] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-black select-none">
                        Bē
                      </div>
                      <input
                        type="url"
                        placeholder="https://behance.net/yourname"
                        className="w-full bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>

                    {/* Dribbble */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-[#1668E8] focus-within:bg-white">
                      <div className="w-6 h-6 rounded-lg bg-[#EA4C89] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-black select-none">
                        🏀
                      </div>
                      <input
                        type="url"
                        placeholder="https://dribbble.com/yourname"
                        className="w-full bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Cover Message */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Cover Message <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <span className="text-[10.5px] text-slate-400">
                      {coverNote.length}/500
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Tell us why you&apos;re a great fit for this internship.
                  </p>
                  <textarea
                    rows={4}
                    maxLength={500}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Write a short message about yourself, your skills, your interests and why you want to join XSPACEWEB..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8] transition-all"
                  />
                </div>

                {/* Submit Application Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#1668E8] hover:bg-[#1255c2] active:scale-[0.99] text-white text-sm sm:text-base font-bold transition-all shadow-md shadow-[#1668E8]/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2.5">
                    By submitting this application, you agree to our{" "}
                    <Link href="/terms-conditions" className="text-[#1668E8] hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" className="text-[#1668E8] hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Sidebar matching Image 1 (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* ---------------------------------------------------- */}
            {/* CARD 1: Internship Details */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-[#07152B]">
                  Internship Details
                </h3>
                <Link
                  href={`/careers/${job.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#1668E8] hover:underline"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </Link>
              </div>

              {/* Role Title & Icon */}
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-center text-[#9333EA] flex-shrink-0 shadow-2xs">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#07152B] leading-tight">
                    {isUiUxIntern ? "UI/UX Design Intern" : job.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">
                    XSPACEWEB PRIVATE LIMITED
                  </p>
                </div>
              </div>

              {/* Spec Rows */}
              <div className="space-y-3 pt-1 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100/80">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Department
                  </span>
                  <span className="font-bold text-[#07152B]">Design</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100/80">
                  <span className="text-slate-400 flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-slate-400" /> Type
                  </span>
                  <span className="font-bold text-[#07152B]">Internship</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100/80">
                  <span className="text-slate-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location
                  </span>
                  <span className="font-bold text-[#07152B]">Kolkata / Remote</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100/80">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> Duration
                  </span>
                  <span className="font-bold text-[#07152B]">3 – 6 Months</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100/80">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-slate-400" /> Stipend
                  </span>
                  <span className="font-bold text-[#07152B]">Performance Based</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Posted On
                  </span>
                  <span className="font-medium text-slate-600">2 days ago</span>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* CARD 2: Why Join Us? with squiggle accent */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4 relative overflow-hidden">
              {/* Purple Squiggle Vector */}
              <div className="absolute top-6 right-6 text-[#9333EA] opacity-90 pointer-events-none">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 20C6 8 14 4 18 14C22 24 27 8 30 4" stroke="#9333EA" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>

              <h3 className="text-base font-bold text-[#07152B]">
                Why Join Us?
              </h3>

              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-center text-[#9333EA] flex-shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#07152B]">
                      Work on real products
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      Get hands-on experience with live projects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-center text-[#9333EA] flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#07152B]">
                      Learn from experienced team
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      Work closely with designers &amp; developers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-center text-[#9333EA] flex-shrink-0 mt-0.5">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#07152B]">
                      Flexible work options
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      Remote or office - choose what works for you.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-center text-[#9333EA] flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#07152B]">
                      Certificate &amp; LOR
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      Get an internship certificate and Letter of Recommendation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-center text-[#9333EA] flex-shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#07152B]">
                      Growth opportunities
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      Top performers may get a full-time offer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* CARD 3: Our Hiring Process Timeline */}
            {/* ---------------------------------------------------- */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#07152B]">
                Our Hiring Process
              </h3>

              <div className="space-y-4 relative pl-1">
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EBF3FE] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#07152B]">Apply</h4>
                    <p className="text-[11px] text-slate-400">
                      Submit your application on this page.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EBF3FE] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#07152B]">Review</h4>
                    <p className="text-[11px] text-slate-400">
                      Our team will review your profile.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EBF3FE] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#07152B]">Short Conversation</h4>
                    <p className="text-[11px] text-slate-400">
                      A quick chat to know you better.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#EBF3FE] text-[#1668E8] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#07152B]">Decision</h4>
                    <p className="text-[11px] text-slate-400">
                      We&apos;ll get back to you with the next steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CELEBRATION / SUCCESS BANNER (Matching Reference Image) */}
        {/* ========================================================= */}
        <div
          id="success-banner"
          className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden"
        >
          {/* Confetti decorations */}
          <div className="absolute top-2 left-4 text-emerald-400 text-xs select-none pointer-events-none">✨</div>
          <div className="absolute bottom-2 left-10 text-pink-400 text-xs select-none pointer-events-none">✦</div>
          <div className="absolute top-3 right-24 text-blue-400 text-xs select-none pointer-events-none">🎉</div>
          <div className="absolute bottom-3 right-8 text-amber-400 text-xs select-none pointer-events-none">✨</div>

          <div className="flex items-center gap-4.5 z-10">
            <div className="w-12 h-12 rounded-full bg-[#10B981] text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#07152B] tracking-tight">
                Application Submitted <span className="text-[#10B981]">Successfully!</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 max-w-xl leading-relaxed">
                Thank you for applying for the {isUiUxIntern ? "UI/UX Design Intern" : job.title} position at XSPACEWEB. We&apos;ve received your application and will review it shortly. Our team will get back to you via email.
              </p>
            </div>
          </div>

          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-blue-200 text-[#1668E8] hover:bg-blue-50 text-xs font-bold transition-all shadow-2xs flex-shrink-0 z-10"
          >
            <span>Back to Careers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </main>
  );
}
