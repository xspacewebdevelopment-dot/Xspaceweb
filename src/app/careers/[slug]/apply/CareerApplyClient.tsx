"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  Send,
  ArrowRight,
  GraduationCap,
  Users,
  Award,
  Laptop,
  Check,
  Target,
  Search,
  MessageSquare,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { CustomSelect } from "@/components/shared/ui/CustomSelect";
import { CareerOpening } from "@/lib/db/schema";
import { formatOpeningDate } from "@/lib/validations/careers";

interface CareerApplyClientProps {
  opening: CareerOpening;
}

export const CareerApplyClient: React.FC<CareerApplyClientProps> = ({ opening }) => {
  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [availability, setAvailability] = useState("Immediate");
  const [preferredWorkMode, setPreferredWorkMode] = useState(opening.workMode || "Hybrid");
  const [expectedStartDate, setExpectedStartDate] = useState("");
  const [experience, setExperience] = useState(opening.experience || "Fresher");
  const [currentRole, setCurrentRole] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [college, setCollege] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Status & Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isInternship = opening.openingType === "internship";
  const isUiUxIntern =
    opening.slug.includes("ui-ux") ||
    opening.slug.includes("uiux") ||
    (isInternship && opening.title.toLowerCase().includes("ui/ux"));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const ext = file.name.split(".").pop()?.toLowerCase();

      if (!["pdf", "doc", "docx"].includes(ext || "")) {
        setErrorMessage("Please select a valid PDF, DOC, or DOCX file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("Resume file size must be less than 5MB.");
        return;
      }

      setErrorMessage(null);
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!resumeFile) {
      setErrorMessage("Please upload your Resume / CV document.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("openingId", opening.id);
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("currentLocation", currentLocation.trim());
      formData.append("availability", availability);
      formData.append("preferredWorkMode", preferredWorkMode);
      if (expectedStartDate) formData.append("expectedStartDate", expectedStartDate);
      formData.append("experience", experience);
      if (currentRole.trim()) formData.append("currentRole", currentRole.trim());
      if (currentCompany.trim()) formData.append("currentCompany", currentCompany.trim());
      if (highestQualification) formData.append("highestQualification", highestQualification);
      if (college.trim()) formData.append("college", college.trim());
      if (yearOfStudy) formData.append("yearOfStudy", yearOfStudy);
      if (fieldOfStudy) formData.append("fieldOfStudy", fieldOfStudy);
      if (portfolioUrl.trim()) formData.append("portfolioUrl", portfolioUrl.trim());
      if (githubUrl.trim()) formData.append("githubUrl", githubUrl.trim());
      if (linkedinUrl.trim()) formData.append("linkedinUrl", linkedinUrl.trim());
      if (coverNote.trim()) formData.append("coverLetter", coverNote.trim());
      formData.append("resume", resumeFile);

      const res = await fetch("/api/careers/applications", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit application");
      }

      setApplicationId(data.applicationId);
      setIsSubmitted(true);

      setTimeout(() => {
        const banner = document.getElementById("success-banner");
        if (banner) {
          banner.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(err?.message || "Unable to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            {isInternship ? "Internships" : "Jobs"}
          </Link>
          <span className="text-slate-300">&gt;</span>
          <Link href={`/careers/${opening.slug}`} className="hover:text-[#1668E8]">
            {opening.title}
          </Link>
          <span className="text-slate-300">&gt;</span>
          <span className="text-[#07152B] font-bold">Apply</span>
        </nav>

        {/* ========================================================= */}
        {/* HERO BANNER */}
        {/* ========================================================= */}
        {isUiUxIntern ? (
          /* Tailored UI/UX Internship Hero */
          <div className="relative rounded-3xl bg-white p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm overflow-hidden mb-8">
            <div className="absolute right-0 top-0 w-full md:w-1/2 h-full bg-gradient-to-l from-[#EFF6FF] via-[#FAF5FF] to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3.5 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5FF] text-[#9333EA] border border-[#E9D5FF]">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span className="text-[10.5px] font-extrabold tracking-wider uppercase">
                    INTERNSHIP APPLICATION
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#07152B] tracking-tight leading-[1.15]">
                  Apply for <span className="text-[#1668E8]">UI/UX</span>{" "}
                  <span className="text-[#9333EA]">Design Intern</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Start your journey with XSPACEWEB and work on real products, with real impact.
                </p>

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
                  Apply for <span className="text-[#1668E8]">{opening.title}</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Join XSPACEWEB and build scalable, world-class digital products with our engineering and design team.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1 text-slate-600 min-w-[220px]">
                <div><strong>Location:</strong> {opening.location}</div>
                <div><strong>Department:</strong> {opening.department}</div>
                <div><strong>Work Mode:</strong> {opening.workMode}</div>
                <div><strong>Employment:</strong> {opening.employmentType}</div>
              </div>
            </div>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start justify-between gap-3 text-xs sm:text-sm font-medium animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Success Screen Banner */}
        {isSubmitted ? (
          <div
            id="success-banner"
            className="p-8 sm:p-12 rounded-3xl bg-white border border-emerald-200 shadow-md text-center space-y-5 animate-in fade-in zoom-in-95 duration-200 mb-10"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Application Submitted Successfully!
              </h2>
              {applicationId && (
                <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-2xl text-slate-700 text-xs sm:text-sm">
                  <span className="text-slate-500 mr-2">Your Application ID:</span>
                  <span className="font-mono font-black text-[#1668E8]">{applicationId}</span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Thank you for applying to <strong>{opening.title}</strong> at XSPACEWEB. Our recruitment team will review your application and reach out via email.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
              >
                <span>Back to Careers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/careers#open-positions"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all"
              >
                <span>View More Openings</span>
              </Link>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* MAIN 2-COLUMN FORM & SIDEBAR GRID */
          /* ========================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
            {/* Left Column: Form (8 cols) */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* STEP 1: Your Information */}
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
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 9876543210"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Current Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={currentLocation}
                        onChange={(e) => setCurrentLocation(e.target.value)}
                        placeholder="e.g. Kolkata, West Bengal"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 2: Position Details */}
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
                        value={opening.title}
                        className="w-full px-4 py-2.5 bg-slate-100/90 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 cursor-not-allowed select-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Availability <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        required
                        defaultValue={availability}
                        onChange={(val) => setAvailability(val)}
                        placeholder="Select availability"
                        triggerClassName="px-4 py-2.5 bg-slate-50 border-slate-200 text-xs sm:text-sm text-slate-800"
                        options={[
                          { value: "Immediate", label: "Immediate" },
                          { value: "Within 15 Days", label: "Within 15 Days" },
                          { value: "Within 30 Days", label: "Within 30 Days" },
                          { value: "Within 60 Days", label: "Within 60 Days" },
                          { value: "Currently Studying / Flexible", label: "Currently Studying / Flexible" },
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
                        defaultValue={preferredWorkMode}
                        onChange={(val) => setPreferredWorkMode(val)}
                        triggerClassName="px-4 py-2.5 bg-slate-50 border-slate-200 text-xs sm:text-sm text-slate-800"
                        options={[
                          { value: "Remote", label: "Remote" },
                          { value: "Hybrid", label: "Hybrid" },
                          { value: "In-Office", label: "In-Office" },
                          { value: "Flexible", label: "Flexible" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Experience <span className="text-red-500">*</span>
                      </label>
                      <CustomSelect
                        required
                        defaultValue={experience}
                        onChange={(val) => setExperience(val)}
                        placeholder="Select experience"
                        triggerClassName="px-4 py-2.5 bg-slate-50 border-slate-200 text-xs sm:text-sm text-slate-800"
                        options={[
                          { value: "Fresher", label: "Fresher" },
                          { value: "0-1 Year", label: "0-1 Year" },
                          { value: "1-2 Years", label: "1-2 Years" },
                          { value: "2-4 Years", label: "2-4 Years" },
                          { value: "4+ Years", label: "4+ Years" },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Expected Start Date
                      </label>
                      <input
                        type="date"
                        value={expectedStartDate}
                        onChange={(e) => setExpectedStartDate(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Current Role (optional)
                      </label>
                      <input
                        type="text"
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                        placeholder="e.g. Frontend Developer"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Current Company (optional)
                      </label>
                      <input
                        type="text"
                        value={currentCompany}
                        onChange={(e) => setCurrentCompany(e.target.value)}
                        placeholder="e.g. Acme Corp"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 3: Education & Academics (Optional/Internship Focus) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
                  <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                    <div className="w-7 h-7 rounded-full bg-[#EC4899] text-white font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-[#07152B] leading-tight">
                        Education &amp; Background
                      </h2>
                      <p className="text-[11px] text-slate-400">
                        Your academic qualifications and institution.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Highest Qualification
                      </label>
                      <CustomSelect
                        placeholder="Select qualification"
                        defaultValue={highestQualification}
                        onChange={(val) => setHighestQualification(val)}
                        triggerClassName="px-4 py-2.5 bg-slate-50 border-slate-200 text-xs sm:text-sm text-slate-800"
                        options={[
                          { value: "B.Tech / B.E.", label: "B.Tech / B.E." },
                          { value: "B.Des / M.Des (Design)", label: "B.Des / M.Des (Design)" },
                          { value: "BCA / B.Sc Computer Science", label: "BCA / B.Sc Computer Science" },
                          { value: "M.Tech / MCA", label: "M.Tech / MCA" },
                          { value: "BBA / MBA", label: "BBA / MBA" },
                          { value: "Other Degree / Diploma", label: "Other Degree / Diploma" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        College / University
                      </label>
                      <input
                        type="text"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="Enter your college or university name"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* STEP 4: Portfolio & Documents */}
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
                        Share your work samples, links, and resume.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://portfolio.com"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        GitHub Profile
                      </label>
                      <input
                        type="url"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder="https://github.com/username"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8] transition-all"
                      />
                    </div>
                  </div>

                  {/* Resume Upload Drag-Drop Box */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Upload Resume / CV (PDF, DOC, DOCX up to 5MB) <span className="text-red-500">*</span>
                    </label>
                    <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 hover:border-[#1668E8] rounded-2xl bg-slate-50/70 hover:bg-[#EFF6FF]/40 transition-colors cursor-pointer group">
                      <input
                        type="file"
                        required
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleFileUpload}
                        className="sr-only"
                      />
                      <div className="w-10 h-10 rounded-full bg-[#EFF6FF] text-[#1668E8] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      {resumeFile ? (
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <Check className="w-4 h-4" /> {resumeFile.name} ({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                      ) : (
                        <>
                          <span className="text-xs font-semibold text-slate-700">
                            Click to upload or drag &amp; drop your resume
                          </span>
                          <span className="text-[10.5px] text-slate-400 mt-0.5">
                            PDF, DOC, DOCX (Max 5MB)
                          </span>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Cover Note */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Cover Letter / Message (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Tell us briefly about why you are interested in this role and what makes you a great fit..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1668E8] transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-[#1668E8] hover:bg-[#1255c2] disabled:opacity-50 active:scale-98 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-[#1668E8]/25 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Opening Information Sidebar & Hiring Highlights (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Dynamic Opening Information Sidebar Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Opening Details
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      isInternship
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-blue-50 text-blue-700 border-blue-200"
                    }`}
                  >
                    {opening.openingType}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-[#07152B]">
                    {opening.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {opening.department} • {opening.location}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Work Mode:</span>
                    <span className="font-semibold text-slate-800 capitalize">{opening.workMode}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Employment:</span>
                    <span className="font-semibold text-slate-800 capitalize">{opening.employmentType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Experience:</span>
                    <span className="font-semibold text-slate-800">{opening.experience}</span>
                  </div>
                  {isInternship && opening.internship && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Duration:</span>
                        <span className="font-semibold text-slate-800">{opening.internship.duration || "6 Months"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Stipend:</span>
                        <span className="font-semibold text-slate-800">{opening.internship.stipend || "Best in Industry"}</span>
                      </div>
                    </>
                  )}
                  {!isInternship && opening.salary && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Compensation:</span>
                      <span className="font-semibold text-slate-800">
                        {opening.salary.text ||
                          (opening.salary.min
                            ? `₹${opening.salary.min.toLocaleString("en-IN")} – ₹${opening.salary.max?.toLocaleString("en-IN")}`
                            : "Competitive")}
                      </span>
                    </div>
                  )}
                  {opening.publishedAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Posted On:</span>
                      <span className="font-semibold text-slate-800">{formatOpeningDate(opening.publishedAt)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Link
                    href={`/careers/${opening.slug}`}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#1668E8] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Full Role Description</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Hiring Highlights Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#07152B] flex items-center gap-2">
                  <Laptop className="w-4 h-4 text-[#1668E8]" />
                  <span>Why Join XSPACEWEB?</span>
                </h3>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Work on high-impact products with real users</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Direct mentorship and pair programming</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Competitive compensation and growth path</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
};
