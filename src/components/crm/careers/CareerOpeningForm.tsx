"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CareerOpening, OpeningType, EmploymentType, WorkMode } from "@/lib/db/schema";
import {
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  X,
  Sparkles,
  ArrowLeft,
  Loader2,
  Check,
  AlertCircle,
  Calendar,
  DollarSign,
  Star,
  Info,
} from "lucide-react";

interface CareerOpeningFormProps {
  initialData?: CareerOpening | null;
  isEdit?: boolean;
}

export const CareerOpeningForm: React.FC<CareerOpeningFormProps> = ({
  initialData,
  isEdit = false,
}) => {
  const router = useRouter();

  // Basic Info State
  const [openingType, setOpeningType] = useState<OpeningType>(
    (initialData?.openingType as OpeningType) || "job"
  );
  const [title, setTitle] = useState(initialData?.title || "");
  const [department, setDepartment] = useState(initialData?.department || "Engineering");
  const [employmentType, setEmploymentType] = useState<EmploymentType>(
    (initialData?.employmentType as EmploymentType) || (openingType === "internship" ? "internship" : "full-time")
  );
  const [location, setLocation] = useState(initialData?.location || "Kolkata / Remote");
  const [workMode, setWorkMode] = useState<WorkMode>(
    (initialData?.workMode as WorkMode) || "hybrid"
  );
  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || ""
  );

  // Role Details State
  const [aboutRole, setAboutRole] = useState(initialData?.aboutRole || "");
  const [responsibilities, setResponsibilities] = useState<string[]>(
    initialData?.responsibilities && initialData.responsibilities.length > 0
      ? initialData.responsibilities
      : [""]
  );
  const [requirements, setRequirements] = useState<string[]>(
    initialData?.requirements && initialData.requirements.length > 0
      ? initialData.requirements
      : [""]
  );
  const [niceToHave, setNiceToHave] = useState<string[]>(
    initialData?.niceToHave && initialData.niceToHave.length > 0
      ? initialData.niceToHave
      : [""]
  );

  // Skills Tag State
  const [skills, setSkills] = useState<string[]>(initialData?.skills || []);
  const [skillInput, setSkillInput] = useState("");

  // Experience & Compensation State
  const [experience, setExperience] = useState(
    initialData?.experience || (openingType === "internship" ? "Fresher / Student" : "2+ Years")
  );

  // Job Salary
  const [salaryMin, setSalaryMin] = useState<string>(
    initialData?.salary?.min ? String(initialData.salary.min) : ""
  );
  const [salaryMax, setSalaryMax] = useState<string>(
    initialData?.salary?.max ? String(initialData.salary.max) : ""
  );
  const [salaryCurrency, setSalaryCurrency] = useState(
    initialData?.salary?.currency || "INR"
  );
  const [salaryPeriod, setSalaryPeriod] = useState<"monthly" | "annual">(
    initialData?.salary?.period || "annual"
  );

  // Internship fields
  const [internshipDuration, setInternshipDuration] = useState(
    initialData?.internship?.duration || "6 Months"
  );
  const [internshipStipend, setInternshipStipend] = useState(
    initialData?.internship?.stipend || "₹15,000 – ₹25,000 / month"
  );

  // Publishing State
  const [status, setStatus] = useState<"draft" | "published" | "closed" | "archived">(
    (initialData?.status as "draft" | "published" | "closed" | "archived") || "draft"
  );
  const [featured, setFeatured] = useState<boolean>(initialData?.featured || false);
  const [closingDate, setClosingDate] = useState<string>(
    initialData?.closingDate
      ? new Date(initialData.closingDate).toISOString().split("T")[0]
      : ""
  );

  // Form submission / UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Skill Tag Handlers
  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Dynamic Array Handlers
  const handleArrayChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleAddArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const handleRemoveArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter((prev) => {
      if (prev.length <= 1) return [""];
      return prev.filter((_, i) => i !== index);
    });
  };

  // Form Validation & Submit
  const handleSubmit = async (overrideStatus?: "draft" | "published") => {
    setErrorMsg(null);

    const targetStatus = overrideStatus || status;

    // Filter clean dynamic lists
    const cleanResponsibilities = responsibilities.map((r) => r.trim()).filter(Boolean);
    const cleanRequirements = requirements.map((r) => r.trim()).filter(Boolean);
    const cleanNiceToHave = niceToHave.map((n) => n.trim()).filter(Boolean);

    // Client-side validations
    if (!title.trim()) {
      setErrorMsg("Title is required");
      return;
    }
    if (!department.trim()) {
      setErrorMsg("Department is required");
      return;
    }
    if (!location.trim()) {
      setErrorMsg("Location is required");
      return;
    }
    if (!shortDescription.trim() || shortDescription.trim().length < 10) {
      setErrorMsg("Short description must be at least 10 characters");
      return;
    }
    if (!aboutRole.trim() || aboutRole.trim().length < 30) {
      setErrorMsg("About the role must be at least 30 characters");
      return;
    }
    if (cleanResponsibilities.length === 0) {
      setErrorMsg("Please add at least 1 responsibility");
      return;
    }
    if (cleanRequirements.length === 0) {
      setErrorMsg("Please add at least 1 requirement");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        title: title.trim(),
        openingType,
        department: department.trim(),
        employmentType,
        location: location.trim(),
        workMode,
        shortDescription: shortDescription.trim(),
        aboutRole: aboutRole.trim(),
        responsibilities: cleanResponsibilities,
        requirements: cleanRequirements,
        niceToHave: cleanNiceToHave,
        skills,
        experience: experience.trim(),
        salary:
          openingType === "job" && (salaryMin || salaryMax)
            ? {
                min: salaryMin ? Number(salaryMin) : null,
                max: salaryMax ? Number(salaryMax) : null,
                currency: salaryCurrency,
                period: salaryPeriod,
              }
            : null,
        internship:
          openingType === "internship"
            ? {
                duration: internshipDuration.trim(),
                stipend: internshipStipend.trim(),
              }
            : null,
        status: targetStatus,
        featured,
        closingDate: closingDate ? new Date(closingDate).toISOString() : null,
      };

      const url = isEdit && initialData
        ? `/api/admin/careers/openings/${initialData.id}`
        : `/api/admin/careers/openings`;

      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save career opening");
      }

      // Redirect back to openings list
      router.push("/crm/careers/openings");
      router.refresh();
    } catch (err: unknown) {
      console.error("Save opening error:", err);
      const message = err instanceof Error ? err.message : "Failed to save career opening";
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/crm/careers/openings"
            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isEdit ? "Edit Career Opening" : "Create Career Opening"}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEdit
                ? `Editing ${initialData?.title} (/${initialData?.slug})`
                : "Add a new job or internship opportunity for public listing."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("draft")}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("published")}
            className="px-5 py-2 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Publish Opening</span>
            )}
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
          <div className="text-xs sm:text-sm font-semibold">{errorMsg}</div>
        </div>
      )}

      {/* ========================================================
          1. BASIC INFORMATION
      ======================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1668E8] flex items-center justify-center font-bold text-xs">
            1
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Basic Information</h2>
            <p className="text-xs text-slate-400">Position type, title, department, and work location</p>
          </div>
        </div>

        {/* Opening Type Toggle */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Opening Type *
          </label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              type="button"
              onClick={() => {
                setOpeningType("job");
                if (employmentType === "internship") setEmploymentType("full-time");
              }}
              className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                openingType === "job"
                  ? "bg-blue-50/70 border-[#1668E8] text-[#1668E8] shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70"
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <div>
                <div className="font-bold text-xs sm:text-sm">Job</div>
                <div className="text-[11px] text-slate-500">Full-time / Part-time / Contract</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setOpeningType("internship");
                setEmploymentType("internship");
              }}
              className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                openingType === "internship"
                  ? "bg-purple-50/70 border-purple-600 text-purple-700 shadow-xs"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70"
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              <div>
                <div className="font-bold text-xs sm:text-sm">Internship</div>
                <div className="text-[11px] text-slate-500">Stipend + PPO opportunity</div>
              </div>
            </button>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Role Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Full Stack Developer, UI/UX Design Intern"
            className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Department, Employment Type & Work Mode */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Department */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Department *
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none transition-all font-semibold"
            >
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
              <option value="Product">Product</option>
              <option value="Operations">Operations</option>
            </select>
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Employment Type *
            </label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
              className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none transition-all font-semibold"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Work Mode *
            </label>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value as WorkMode)}
              className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none transition-all font-semibold"
            >
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">Onsite</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Location *
          </label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Kolkata / Remote, Bangalore, India"
            className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Short Description (Card Summary) *
          </label>
          <input
            type="text"
            required
            maxLength={300}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Brief 1-2 sentence overview shown on position cards..."
            className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
          <p className="text-[11px] text-slate-400 mt-1 text-right">
            {shortDescription.length}/300 characters
          </p>
        </div>
      </section>

      {/* ========================================================
          2. ROLE DETAILS
      ======================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Role Details</h2>
            <p className="text-xs text-slate-400">About role, responsibilities, requirements, and required skills</p>
          </div>
        </div>

        {/* About the Role */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            About the Role *
          </label>
          <textarea
            rows={4}
            required
            value={aboutRole}
            onChange={(e) => setAboutRole(e.target.value)}
            placeholder="Detailed description of what this role entails, the team, and what the candidate will be building..."
            className="w-full px-4 py-3 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 transition-all leading-relaxed"
          />
        </div>

        {/* Dynamic Responsibilities */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Responsibilities * ({responsibilities.length})
            </label>
            <button
              type="button"
              onClick={() => handleAddArrayItem(setResponsibilities)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1668E8] hover:text-blue-700 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {responsibilities.map((resp, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => handleArrayChange(setResponsibilities, idx, e.target.value)}
                  placeholder={`Responsibility #${idx + 1}`}
                  className="flex-1 px-3.5 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem(setResponsibilities, idx)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Requirements */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Requirements * ({requirements.length})
            </label>
            <button
              type="button"
              onClick={() => handleAddArrayItem(setRequirements)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1668E8] hover:text-blue-700 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleArrayChange(setRequirements, idx, e.target.value)}
                  placeholder={`Requirement #${idx + 1}`}
                  className="flex-1 px-3.5 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem(setRequirements, idx)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Nice to Have */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Nice to Have (Optional) ({niceToHave.length})
            </label>
            <button
              type="button"
              onClick={() => handleAddArrayItem(setNiceToHave)}
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {niceToHave.map((nth, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={nth}
                  onChange={(e) => handleArrayChange(setNiceToHave, idx, e.target.value)}
                  placeholder={`Bonus / Nice to have #${idx + 1}`}
                  className="flex-1 px-3.5 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveArrayItem(setNiceToHave, idx)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Tag Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Key Skills &amp; Technologies
          </label>
          <div className="flex gap-2 mb-2.5">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="e.g. React, Next.js, Node.js (Press Enter or Add)"
              className="flex-1 px-3.5 py-2 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none transition-all"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Add Skill
            </button>
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-slate-50/70 rounded-2xl border border-slate-100">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          3. EXPERIENCE / COMPENSATION
      ======================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
            3
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Experience &amp; Compensation</h2>
            <p className="text-xs text-slate-400">Experience requirement and salary or internship stipend</p>
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Required Experience *
          </label>
          <input
            type="text"
            required
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="e.g. 2+ Years, 0-2 Years, Fresher / Student"
            className="w-full px-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Conditional Fields: Job Salary vs Internship Stipend */}
        {openingType === "job" ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Annual / Monthly Salary (Optional)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Salary Min (₹)
                </label>
                <input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  placeholder="e.g. 600000"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Salary Max (₹)
                </label>
                <input
                  type="number"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  placeholder="e.g. 1200000"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  value={salaryCurrency}
                  onChange={(e) => setSalaryCurrency(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Period
                </label>
                <select
                  value={salaryPeriod}
                  onChange={(e) => setSalaryPeriod(e.target.value as "monthly" | "annual")}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 outline-none font-semibold"
                >
                  <option value="annual">Annual (Per Annum)</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/50 border border-purple-200/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>Internship Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Duration *
                </label>
                <input
                  type="text"
                  value={internshipDuration}
                  onChange={(e) => setInternshipDuration(e.target.value)}
                  placeholder="e.g. 6 Months, 3-6 Months"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Stipend *
                </label>
                <input
                  type="text"
                  value={internshipStipend}
                  onChange={(e) => setInternshipStipend(e.target.value)}
                  placeholder="e.g. ₹15,000 – ₹25,000 / month, Performance Based"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================
          4. PUBLISHING & VISIBILITY
      ======================================================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
            4
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Publishing &amp; Visibility</h2>
            <p className="text-xs text-slate-400">Status, featured promotion, and closing date</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Status Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Status *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "draft", label: "Draft", desc: "Hidden from public" },
                { id: "published", label: "Published", desc: "Live on website" },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setStatus(st.id as "draft" | "published")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    status === st.id
                      ? "bg-[#1668E8]/10 border-[#1668E8] text-[#1668E8]"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-xs font-bold">{st.label}</div>
                  <div className="text-[10px] text-slate-400">{st.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Closing Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Closing Date (Optional)
            </label>
            <input
              type="date"
              value={closingDate}
              onChange={(e) => setClosingDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 outline-none"
            />
          </div>
        </div>

        {/* Featured Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">Featured Position</div>
              <div className="text-xs text-slate-400">Showcase with special highlight badge</div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1668E8]"></div>
          </label>
        </div>
      </section>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-40 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-between gap-3">
        <Link
          href="/crm/careers/openings"
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-bold transition-all"
        >
          Cancel
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("draft")}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("published")}
            className="px-6 py-2.5 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <span>Publish Opening</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
