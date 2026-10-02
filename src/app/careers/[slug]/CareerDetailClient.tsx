"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Send,
  CheckCircle2,
  X,
  Mail,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { CareerOpening } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/validations/careers";

interface CareerDetailClientProps {
  opening: CareerOpening;
  allOpenings: CareerOpening[];
  prevOpening?: CareerOpening;
  nextOpening?: CareerOpening;
}

export const CareerDetailClient: React.FC<CareerDetailClientProps> = ({
  opening,
  allOpenings,
  prevOpening,
  nextOpening,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Helper for department icon & color mapping
  const getDepartmentStyle = (department: string) => {
    switch (department.toLowerCase()) {
      case "engineering":
        return {
          icon: Code2,
          iconBg: "bg-[#EBF3FE]",
          iconColor: "text-[#1668E8]",
        };
      case "design":
        return {
          icon: Palette,
          iconBg: "bg-[#F3E8FF]",
          iconColor: "text-[#9333EA]",
        };
      case "marketing":
        return {
          icon: BarChart3,
          iconBg: "bg-[#DCFCE7]",
          iconColor: "text-[#16A34A]",
        };
      case "business":
        return {
          icon: Users,
          iconBg: "bg-[#FFE4E6]",
          iconColor: "text-[#E11D48]",
        };
      case "product":
        return {
          icon: Sparkles,
          iconBg: "bg-[#FEF3C7]",
          iconColor: "text-[#D97706]",
        };
      default:
        return {
          icon: Briefcase,
          iconBg: "bg-[#EBF3FE]",
          iconColor: "text-[#1668E8]",
        };
    }
  };

  const { icon: MainIcon, iconBg, iconColor } = getDepartmentStyle(opening.department);

  // Format Salary / Stipend Text
  let formattedSalary = "Competitive Salary";
  let salarySubtext = "Annual Compensation (Based on experience)";

  if (opening.openingType === "internship") {
    formattedSalary = opening.internship?.stipend || "₹15,000 – ₹25,000 / month";
    salarySubtext = `Monthly Stipend (${opening.internship?.duration || "6 Months"}) + PPO Opportunity`;
  } else if (opening.salary) {
    if (opening.salary.text) {
      formattedSalary = opening.salary.text;
    } else if (opening.salary.min && opening.salary.max) {
      formattedSalary = `₹${opening.salary.min.toLocaleString("en-IN")} – ₹${opening.salary.max.toLocaleString("en-IN")}`;
      salarySubtext =
        opening.salary.period === "monthly"
          ? "Monthly Salary (Based on experience)"
          : "Annual CTC (Based on experience)";
    } else if (opening.salary.min) {
      formattedSalary = `From ₹${opening.salary.min.toLocaleString("en-IN")}`;
    }
  }

  const postedDateFormatted = formatRelativeTime(opening.publishedAt || opening.createdAt);

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
              {opening.openingType === "internship" ? "Internships" : "Jobs"}
            </Link>
            <span className="text-slate-300">&gt;</span>
            <span className="text-[#07152B] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {opening.title}
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

            {prevOpening && nextOpening && (
              <div className="flex items-center gap-1">
                <Link
                  href={`/careers/${prevOpening.slug}`}
                  aria-label="Previous Job"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1668E8] hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Link>
                <Link
                  href={`/careers/${nextOpening.slug}`}
                  aria-label="Next Job"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1668E8] hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
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
                  iconBg,
                  iconColor
                )}
              >
                <MainIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <div className="space-y-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#07152B] tracking-tight">
                    {opening.title}
                  </h1>
                  <p className="text-xs font-bold tracking-wider text-slate-400 uppercase mt-0.5">
                    XSPACEWEB PRIVATE LIMITED
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1668E8]" />
                    {opening.location}
                  </span>
                  <span className="flex items-center gap-1 capitalize">
                    <Briefcase className="w-3.5 h-3.5 text-[#1668E8]" />
                    {opening.employmentType.replace("-", " ")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#1668E8]" />
                    {opening.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#1668E8]" />
                    Posted {postedDateFormatted}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
              <button
                type="button"
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
                href={`/careers/${opening.slug}/apply`}
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
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {opening.aboutRole}
              </p>
            </div>

            {/* Key Responsibilities */}
            {(opening.responsibilities || []).length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-[#07152B] tracking-tight">
                  Key Responsibilities
                </h2>
                <ul className="space-y-3">
                  {opening.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8] mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {(opening.requirements || []).length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-[#07152B] tracking-tight">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {opening.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8] mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nice to Have */}
            {opening.niceToHave && opening.niceToHave.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-[#07152B] tracking-tight">
                  Nice to Have
                </h2>
                <ul className="space-y-3">
                  {opening.niceToHave.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1668E8] mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills */}
            {(opening.skills || []).length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-[#07152B] tracking-tight">
                  Skills &amp; Technologies
                </h2>
                <div className="flex flex-wrap gap-2 pt-1">
                  {opening.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-lg bg-[#F1F5F9] text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
          </div>

          {/* Right Column - Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Job Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
              <h3 className="text-base sm:text-lg font-bold text-[#07152B]">
                {opening.openingType === "internship" ? "Internship Overview" : "Job Overview"}
              </h3>

              <div className="space-y-4">
                {/* Salary / Stipend */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FE] flex items-center justify-center text-[#1668E8] flex-shrink-0">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#07152B]">
                      {formattedSalary}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {salarySubtext}
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
                      Employment Type
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#07152B] capitalize">
                      {opening.employmentType.replace("-", " ")} ({opening.workMode})
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
                      {opening.department}
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
                      {opening.location}
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
                      {postedDateFormatted}
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
                      {opening.experience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar Apply CTA Button */}
              <div className="pt-2">
                <Link
                  href={`/careers/${opening.slug}/apply`}
                  className="w-full py-3 rounded-xl bg-[#1668E8] hover:bg-[#1255c2] text-white font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply For This Position</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
                  Latest Positions
                </h3>
                <Link
                  href="/careers#open-positions"
                  className="text-xs font-semibold text-[#1668E8] hover:underline"
                >
                  View All &rarr;
                </Link>
              </div>

              <div className="space-y-3">
                {allOpenings.slice(0, 5).map((item) => {
                  const { icon: SideIcon, iconBg: sBg, iconColor: sCol } = getDepartmentStyle(item.department);
                  return (
                    <Link
                      key={item.id}
                      href={`/careers/${item.slug}`}
                      className={cn(
                        "p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 group",
                        item.id === opening.id
                          ? "bg-[#EBF3FE]/50 border-[#1668E8]/30 shadow-sm"
                          : "border-slate-100 hover:border-[#1668E8]/20 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs",
                            sBg,
                            sCol
                          )}
                        >
                          <SideIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-tight">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 capitalize">
                            {item.department} &bull; {item.employmentType.replace("-", " ")}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1668E8] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </Link>
                  );
                })}
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
      </Container>
    </main>
  );
};
