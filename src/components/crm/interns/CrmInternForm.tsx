"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Trash2,
  FileText,
  Award,
  Calendar,
  User,
  Mail,
  Phone,
  Briefcase,
  Building,
  Globe,
  Plus,
  X,
  ExternalLink,
} from "lucide-react";
import { Intern, InternStatus, InternshipType } from "@/lib/db/schema";
import { calculateDuration, normalizeInternshipId } from "@/lib/internship-utils";

interface CrmInternFormProps {
  initialData?: Intern | null;
  suggestedInternshipId?: string;
  isEdit?: boolean;
}

const COMMON_DEPARTMENTS = [
  "Engineering",
  "Design",
  "Marketing",
  "Product",
  "Operations",
  "Content",
  "Business Development",
];

const COMMON_ROLES = [
  "Frontend Developer Intern",
  "Backend Developer Intern",
  "Full Stack Developer Intern",
  "UI/UX Design Intern",
  "Product Design Intern",
  "Digital Marketing Intern",
  "Content Writing Intern",
  "Data Analysis Intern",
  "AI/ML Engineering Intern",
  "QA & Testing Intern",
];

export const CrmInternForm: React.FC<CrmInternFormProps> = ({
  initialData,
  suggestedInternshipId,
  isEdit = false,
}) => {
  const router = useRouter();

  const [internshipId, setInternshipId] = useState(
    initialData?.internshipId || suggestedInternshipId || "XSW-INTERN-001"
  );
  const [fullName, setFullName] = useState(initialData?.fullName || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [department, setDepartment] = useState(initialData?.department || "Engineering");
  const [internshipType, setInternshipType] = useState<InternshipType>(
    (initialData?.internshipType as InternshipType) || "Remote"
  );
  const [startDate, setStartDate] = useState(
    initialData?.startDate
      ? new Date(initialData.startDate).toISOString().split("T")[0]
      : ""
  );
  const [endDate, setEndDate] = useState(
    initialData?.endDate
      ? new Date(initialData.endDate).toISOString().split("T")[0]
      : ""
  );
  const [duration, setDuration] = useState(initialData?.duration || "");
  const [status, setStatus] = useState<InternStatus>(
    (initialData?.status as InternStatus) || "ACTIVE"
  );
  const [skills, setSkills] = useState<string[]>(
    Array.isArray(initialData?.skills) ? initialData.skills : []
  );
  const [skillInput, setSkillInput] = useState("");
  const [description, setDescription] = useState(initialData?.description || "");
  const [performanceSummary, setPerformanceSummary] = useState(
    initialData?.performanceSummary || ""
  );

  // Profile Image state
  const [profileImage, setProfileImage] = useState(initialData?.profileImage || "");
  const [profileImagePublicId, setProfileImagePublicId] = useState(
    initialData?.profileImagePublicId || ""
  );
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [isPublished, setIsPublished] = useState(
    initialData ? Boolean(initialData.isPublished) : true
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);

  // Auto-calculate duration when start or end date changes
  useEffect(() => {
    if (startDate && endDate) {
      const s = new Date(startDate);
      const e = new Date(endDate);
      if (!isNaN(s.getTime()) && !isNaN(e.getTime()) && e.getTime() >= s.getTime()) {
        const calculated = calculateDuration(s, e);
        setDuration(calculated);
      }
    }
  }, [startDate, endDate]);

  // Handle Skill Tag Addition
  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Upload Profile Image to Cloudinary
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    setIsUploadingPhoto(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "profile");

      const res = await fetch("/api/admin/interns/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload photo");

      setProfileImage(data.url);
      setProfileImagePublicId(data.publicId);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Photo upload failed");
    } finally {
      setIsUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = "";
    }
  };


  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Please enter the intern's full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!role.trim()) {
      setErrorMessage("Please select or enter the intern role.");
      return;
    }
    if (!startDate || !endDate) {
      setErrorMessage("Both start date and end date are required.");
      return;
    }

    const s = new Date(startDate);
    const eDate = new Date(endDate);
    if (eDate.getTime() < s.getTime()) {
      setErrorMessage("End date cannot be earlier than start date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || null,
        role: role.trim(),
        department: department.trim(),
        internshipType,
        startDate: s.toISOString(),
        endDate: eDate.toISOString(),
        duration: duration.trim(),
        status,
        skills,
        description: description.trim() || null,
        performanceSummary: performanceSummary.trim() || null,
        profileImage: profileImage || null,
        profileImagePublicId: profileImagePublicId || null,
        isPublished,
        customInternshipId: !isEdit ? normalizeInternshipId(internshipId) : undefined,
      };

      const url = isEdit && initialData
        ? `/api/admin/interns/${initialData.id}`
        : "/api/admin/interns";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save intern record.");

      setSuccessMessage(
        isEdit ? "Intern record updated successfully!" : "New intern added successfully!"
      );

      setTimeout(() => {
        router.push(isEdit && initialData ? `/crm/interns/${initialData.id}` : "/crm/interns");
        router.refresh();
      }, 1200);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/crm/interns"
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isEdit ? "Edit Intern Record" : "Add New Intern"}
            </h1>
            <p className="text-xs text-slate-500">
              {isEdit
                ? `Updating details for ${initialData?.fullName} (${initialData?.internshipId})`
                : "Create a verified intern record with automated credential ID."}
            </p>
          </div>
        </div>

        {/* Status / Publish Indicator */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <label className="flex items-center gap-2 cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-semibold text-slate-700">Published Publicly</span>
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-4 h-4 text-[#1668E8] rounded focus:ring-blue-500 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Error / Success Notifications */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Core Credentials & Identity */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-4 h-4 text-[#1668E8]" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Identity & Credentials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Profile Photo Uploader */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-5 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-center space-y-3">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center group">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt={fullName || "Intern"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <User className="w-12 h-12 text-slate-400" />
                )}

                {isUploadingPhoto && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs font-bold text-slate-800">Profile Photo</p>
                <p className="text-[11px] text-slate-400">JPG, PNG, WebP (Max 5MB)</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  disabled={isUploadingPhoto}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1668E8] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {profileImage ? "Change Photo" : "Upload Photo"}
                </button>
                {profileImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setProfileImage("");
                      setProfileImagePublicId("");
                    }}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    title="Remove photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Core Fields */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Internship ID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Internship ID (Unique Public ID) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={internshipId}
                    onChange={(e) => setInternshipId(e.target.value.toUpperCase())}
                    disabled={isEdit}
                    placeholder="XSW-INTERN-001"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono font-bold text-[#1668E8] tracking-wider focus:outline-none focus:ring-2 focus:ring-[#1668E8] disabled:opacity-75 disabled:bg-slate-100"
                    required
                  />
                  {!isEdit && (
                    <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-sans font-medium">
                      Auto-generated
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Format: XSW-INTERN-XXX (Used for public certificate lookup)
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Internship Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as InternStatus)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                >
                  <option value="ACTIVE">ACTIVE (In Progress)</option>
                  <option value="COMPLETED">COMPLETED (Finished)</option>
                  <option value="ON_HOLD">ON_HOLD (Paused)</option>
                  <option value="TERMINATED">TERMINATED (Discontinued)</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1">
                  If current date exceeds end date, system automatically treats timeline as finished.
                </p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rohan Kumar"
                    required
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rohan.kumar@example.com"
                    required
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                  />
                </div>
              </div>

              {/* Work Mode */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Internship Type *
                </label>
                <select
                  value={internshipType}
                  onChange={(e) => setInternshipType(e.target.value as InternshipType)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Role, Department & Timeline */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Briefcase className="w-4 h-4 text-[#1668E8]" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Role & Timeline
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Role */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Intern Role *
              </label>
              <input
                type="text"
                list="roles-list"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Developer Intern"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
              />
              <datalist id="roles-list">
                {COMMON_ROLES.map((r) => (
                  <option key={r} value={r} />
                ))}
              </datalist>
            </div>

            {/* Department */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Department *
              </label>
              <input
                type="text"
                list="departments-list"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Engineering"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
              />
              <datalist id="departments-list">
                {COMMON_DEPARTMENTS.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                End Date *
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
              />
            </div>

            {/* Duration */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Duration (Auto-calculated)
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 3 Months"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Skills & Internship Scope */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <FileText className="w-4 h-4 text-[#1668E8]" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Skills & Experience Details
            </h2>
          </div>

          {/* Skills Chip Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Skills Acquired / Applied (Press Enter or Add)
            </label>
            <div className="flex items-center gap-2 mb-2.5">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Type skill (e.g. Next.js, Figma, SQL) and press Enter"
                className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Add Skill
              </button>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-1.5 min-h-[36px] p-2.5 bg-slate-50/50 rounded-xl border border-slate-200/80">
              {skills.length === 0 ? (
                <span className="text-xs text-slate-400 italic">No skills added yet.</span>
              ) : (
                skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-[#1668E8] border border-blue-200 text-xs font-bold shadow-2xs"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-red-600 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Internship Scope / Role Summary
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Overview of the projects, modules, or deliverables the intern contributed to..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1668E8] leading-relaxed"
            />
          </div>

          {/* Performance Summary */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Official Performance Summary & Evaluation
            </label>
            <textarea
              rows={3}
              value={performanceSummary}
              onChange={(e) => setPerformanceSummary(e.target.value)}
              placeholder="Administrative evaluation, key achievements, work ethics, and mentor feedback..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1668E8] leading-relaxed"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              This summary is displayed on the public verified certification view.
            </p>
          </div>
        </div>

        {/* Section 4: Automated Certificate System Notice */}
        <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white p-6 sm:p-7 rounded-2xl border border-blue-200/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-[#1668E8]">
            <Award className="w-5 h-5" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Automated Dynamic Certification
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            Official certificates are 100% automated by XSPACEWEB. Once an intern completes their tenure or their status is marked as Completed, their official certificate of completion is dynamically generated with their name, role, unique ID, working performance evaluation, authorized signatures, and official seal. Interns can immediately view and download high-resolution PDFs directly from the public verification portal without manual administrative uploads.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Link
            href="/crm/interns"
            className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-blue-500/20 hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Record...</span>
              </>
            ) : (
              <span>{isEdit ? "Update Intern Record" : "Create Intern Record"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
