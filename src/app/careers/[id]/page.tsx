"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Code2,
  Palette,
  BarChart3,
  Users,
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  IndianRupee,
  Layers,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  Share2,
  Send,
  CheckCircle2,
  X,
  Mail,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { ALL_CAREERS, JobDetail } from "@/lib/careersData";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function JobDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const job = ALL_CAREERS.find((item) => item.id === resolvedParams.id);

  const [isSaved, setIsSaved] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!job) {
    notFound();
  }

  // Find currentIndex and prev/next job for navigation
  const currentIndex = ALL_CAREERS.findIndex((j) => j.id === job.id);
  const prevJob =
    currentIndex > 0 ? ALL_CAREERS[currentIndex - 1] : ALL_CAREERS[ALL_CAREERS.length - 1];
  const nextJob =
    currentIndex < ALL_CAREERS.length - 1 ? ALL_CAREERS[currentIndex + 1] : ALL_CAREERS[0];

  const getRoleIcon = (type: JobDetail["iconType"]) => {
    switch (type) {
      case "code":
        return <Code2 className="w-6 h-6 text-[#1668E8]" />;
      case "design":
        return <Palette className="w-6 h-6 text-[#9333EA]" />;
      case "marketing":
        return <BarChart3 className="w-6 h-6 text-[#16A34A]" />;
      case "business":
        return <Users className="w-6 h-6 text-[#E11D48]" />;
      default:
        return <Briefcase className="w-6 h-6 text-[#1668E8]" />;
    }
  };

  const getRoleBg = (type: JobDetail["iconType"]) => {
    switch (type) {
      case "code":
        return "bg-[#EBF3FE]";
      case "design":
        return "bg-[#F3E8FF]";
      case "marketing":
        return "bg-[#DCFCE7]";
      case "business":
        return "bg-[#FFE4E6]";
      default:
        return "bg-[#EBF3FE]";
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] pt-6 pb-20">
      <Container size="wide">
        {/* Top Breadcrumb & Back Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-[#1668E8] flex items-center gap-1">
              <span>🏠</span>
            </Link>
            <span className="text-slate-300">:</span>
            <Link href="/careers" className="hover:text-[#1668E8]">
              Careers
            </Link>
            <span className="text-slate-300">&gt;</span>
            <Link href="/careers#open-positions" className="hover:text-[#1668E8]">
              {job.type === "internship" ? "Internships" : "Jobs"}
            </Link>
            <span className="text-slate-300">&gt;</span>
            <span className="text-[#07152B] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {job.title}
            </span>
          </nav>

          {/* Controls: Back button & Prev/Next arrows */}
          <div className="flex items-center gap-2">
            <Link
              href="/careers#open-positions"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#1668E8] hover:border-[#1668E8]/40 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Jobs</span>
            </Link>

            <div className="flex items-center gap-1">
              <Link
                href={`/careers/${prevJob.id}`}
                aria-label="Previous Job"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1668E8] hover:bg-slate-50 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <Link
                href={`/careers/${nextJob.id}`}
                aria-label="Next Job"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1668E8] hover:bg-slate-50 transition-colors shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Role Card Banner */}
        <div className="relative rounded-3xl bg-white p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm overflow-hidden mb-8">
          {/* Subtle Decorative Ambient Glow on top right */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-[#1668E8]/10 via-transparent to-transparent rounded-bl-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left Header info */}
            <div className="flex items-start gap-4 sm:gap-6">
              <div
                className={cn(
                  "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm",
                  getRoleBg(job.iconType)
                )}
              >
                {getRoleIcon(job.iconType)}
              </div>

              <div className="space-y-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#07152B] tracking-tight">
                    {job.title}
                  </h1>
                  <p className="text-xs font-bold tracking-wider text-slate-400 uppercase mt-0.5">
                    {job.company}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1668E8]" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-[#1668E8]" />
                    {job.workType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#1668E8]" />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#1668E8]" />
                    Posted {job.postedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                  isSaved
                    ? "bg-[#1668E8]/10 text-[#1668E8] border-[#1668E8]/30"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-[#07152B]"
                )}
              >
                <Bookmark className={cn("w-4 h-4", isSaved ? "fill-current" : "")} />
                <span>{isSaved ? "Saved" : "Save"}</span>
              </button>

              <Link
                href={`/careers/${job.id}/apply`}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#1668E8] hover:bg-[#1255c2] active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#1668E8]/30 cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Main Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* About the Role */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#07152B] tracking-tight">
                About the Role
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {job.aboutRole}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#07152B] tracking-tight">
                Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8] mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#07152B] tracking-tight">
                Requirements
              </h2>
              <ul className="space-y-3">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8] mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to Have */}
            {job.niceToHave && job.niceToHave.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-[#07152B] tracking-tight">
                  Nice to Have
                </h2>
                <ul className="space-y-3">
                  {job.niceToHave.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8] mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#07152B] tracking-tight">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2 pt-1">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-lg bg-[#F1F5F9] text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* About XSPACEWEB Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-6">
              <div className="space-y-3 flex-1">
                <h2 className="text-xl font-bold text-[#07152B] tracking-tight">
                  About XSPACEWEB
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  XSPACEWEB PRIVATE LIMITED is a technology and digital solutions company building innovative SaaS products and digital experiences for businesses and individuals. We&apos;re a team of creators, problem-solvers and doers who believe in technology for a better tomorrow.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1668E8] hover:text-[#0D2344] transition-colors pt-1"
                >
                  <span>Learn more about us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="relative w-full sm:w-48 h-36 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100">
                <Image
                  src="/images/news/gallery_office_reception.jpg"
                  alt="XSPACEWEB Office Reception"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Related Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#07152B] tracking-tight">
                Related Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Resource 1 */}
                <Link
                  href="/news-and-updates"
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#1668E8]/40 transition-all flex items-center gap-4 group"
                >
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                    <Image
                      src="/images/news/news_laptop_code.jpg"
                      alt="Life at XSPACEWEB"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#1668E8] uppercase tracking-wider">
                      Blog
                    </span>
                    <h4 className="text-xs font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-snug line-clamp-2">
                      Life at XSPACEWEB: Building Products Together
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1668E8] group-hover:translate-x-1 transition-all flex-shrink-0 ml-auto" />
                </Link>

                {/* Resource 2 */}
                <Link
                  href="/news-and-updates"
                  className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#1668E8]/40 transition-all flex items-center gap-4 group"
                >
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                    <Image
                      src="/images/news/gallery_meeting.jpg"
                      alt="Scale SaaS Products"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#1668E8] uppercase tracking-wider">
                      Blog
                    </span>
                    <h4 className="text-xs font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-snug line-clamp-2">
                      How We Build and Scale SaaS Products
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1668E8] group-hover:translate-x-1 transition-all flex-shrink-0 ml-auto" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Job Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
              <h3 className="text-base sm:text-lg font-bold text-[#07152B]">
                Job Overview
              </h3>

              <div className="space-y-4">
                {/* Salary */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#1668E8] flex-shrink-0">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#07152B]">
                      {job.salary}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {job.salarySubtext}
                    </p>
                  </div>
                </div>

                {/* Job Type */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#1668E8] flex-shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Job Type
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#07152B]">
                      {job.workType}
                    </p>
                  </div>
                </div>

                {/* Department */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#1668E8] flex-shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Department
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#07152B]">
                      {job.department}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#1668E8] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Location
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#07152B]">
                      {job.location}
                    </p>
                  </div>
                </div>

                {/* Posted On */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#1668E8] flex-shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Posted On
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#07152B]">
                      {job.postedDate}
                    </p>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#1668E8] flex-shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Experience
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#07152B]">
                      {job.experience}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hiring Team Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#07152B]">
                Hiring Team
              </h3>
              <div className="flex items-center -space-x-2 pt-1">
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                  <Image src="/images/careers/intern_hero_portrait.jpg" alt="Recruiter 1" fill className="object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                  <Image src="/images/news/news_hero_centered.jpg" alt="Recruiter 2" fill className="object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                  <Image src="/images/news/gallery_outdoor_team.jpg" alt="Recruiter 3" fill className="object-cover" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-sm">
                  <Image src="/images/news/gallery_team_event.jpg" alt="Recruiter 4" fill className="object-cover" />
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our team is growing and we&apos;d love to have you with us.
              </p>
            </div>

            {/* Latest Jobs Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#07152B]">
                  Latest Jobs
                </h3>
                <Link
                  href="/careers#open-positions"
                  className="text-xs font-semibold text-[#1668E8] hover:underline"
                >
                  View All &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                {ALL_CAREERS.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    href={`/careers/${item.id}`}
                    className={cn(
                      "p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 group",
                      item.id === job.id
                        ? "bg-[#EBF3FE]/50 border-[#1668E8]/30 shadow-sm"
                        : "border-slate-100 hover:border-[#1668E8]/20 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs",
                          getRoleBg(item.iconType)
                        )}
                      >
                        {getRoleIcon(item.iconType)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-tight">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {item.department} &bull; {item.workType}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1668E8] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Have Questions? Card */}
            <div className="bg-[#EBF3FE] rounded-3xl p-6 border border-[#1668E8]/20 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#1668E8] text-white flex items-center justify-center mx-auto shadow-md">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#07152B]">
                Have Questions?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Feel free to reach out to our recruitment team.
              </p>
              <a
                href="mailto:careers@xspaceweb.com"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-[#1668E8]/30 text-[#1668E8] hover:bg-[#1668E8] hover:text-white text-xs font-semibold transition-all shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>careers@xspaceweb.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Application Modal */}
        {applyModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => {
                  setApplyModalOpen(false);
                  setSubmitted(false);
                }}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#07152B]">
                    Application Submitted!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                    Thank you for applying to <strong>{job.title}</strong> at XSPACEWEB. Our recruitment team will review your application and respond within 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setApplyModalOpen(false);
                      setSubmitted(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#1668E8] text-white text-xs font-semibold hover:bg-[#1255c2] transition-colors"
                  >
                    Done
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
                    <span className="text-[10px] font-bold text-[#1668E8] uppercase tracking-wider">
                      APPLICATION FORM
                    </span>
                    <h3 className="text-xl font-bold text-[#07152B]">
                      Apply for {job.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill out your details to submit your candidature.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        LinkedIn / Portfolio URL *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Resume / CV Link (Google Drive, Dropbox, etc.) *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/file/..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Cover Note / Why do you want to join?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief note about your background and interests..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-[#1668E8] hover:bg-[#1255c2] text-white text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
