"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Send, CheckCircle2, X, UploadCloud, FileText, AlertCircle, Loader2 } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { CustomSelect } from "@/components/shared/ui/CustomSelect";

export const CareerCtaSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState("");
  const [preferredWorkMode, setPreferredWorkMode] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [message, setMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCurrentLocation("");
    setSelectedRole("");
    setExperience("");
    setAvailability("");
    setPreferredWorkMode("");
    setPortfolioUrl("");
    setGithubUrl("");
    setLinkedinUrl("");
    setProfileUrl("");
    setMessage("");
    setResumeFile(null);
    setErrorMessage(null);
    setReferenceId(null);
    setIsSubmitting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size must be under 5MB.");
        return;
      }
      setResumeFile(file);
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedRole) {
      setErrorMessage("Please select your area of expertise / preferred role.");
      return;
    }

    if (!resumeFile && !portfolioUrl && !githubUrl && !linkedinUrl && !profileUrl) {
      setErrorMessage("Please upload your resume or provide at least one profile / portfolio link.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      if (currentLocation.trim()) formData.append("currentLocation", currentLocation.trim());
      formData.append("preferredRole", selectedRole);
      if (experience) formData.append("experience", experience);
      if (availability) formData.append("availability", availability);
      if (preferredWorkMode) formData.append("preferredWorkMode", preferredWorkMode);
      if (portfolioUrl.trim()) formData.append("portfolioUrl", portfolioUrl.trim());
      if (githubUrl.trim()) formData.append("githubUrl", githubUrl.trim());
      if (linkedinUrl.trim()) formData.append("linkedinUrl", linkedinUrl.trim());
      if (profileUrl.trim()) formData.append("profileUrl", profileUrl.trim());
      if (message.trim()) formData.append("message", message.trim());
      if (resumeFile) formData.append("resume", resumeFile);

      const res = await fetch("/api/careers/talent-pool", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to submit profile. Please check your information.");
        setIsSubmitting(false);
        return;
      }

      setReferenceId(data.profileId);
    } catch {
      setErrorMessage("Network error. Please try submitting again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#F8FAFC] pb-16 sm:pb-24">
      <Container size="wide">
        <div className="relative rounded-3xl bg-[#07152B] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Luminous Neon X Space Graphic in Background */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 lg:opacity-40 pointer-events-none flex items-center justify-end pr-10">
            <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1668E8] to-[#38BDF8] rounded-full blur-3xl opacity-40" />
              <div className="relative w-full h-full flex items-center justify-center font-black text-[220px] text-white/10 select-none tracking-tighter">
                X
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                <span className="text-xs font-bold tracking-wider text-[#38BDF8] uppercase">
                  JOIN OUR TEAM
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Let&apos;s build something great <br />
                <span className="text-[#38BDF8]">together.</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Explore open positions or send us your profile if you don&apos;t see a matching role. We&apos;re always looking for talented people.
              </p>
            </div>

            {/* Right Action Button */}
            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setModalOpen(true);
                }}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-[#07152B] text-sm sm:text-base font-bold transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <span>Send Your Profile</span>
                <Send className="w-4 h-4 text-[#1668E8] transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* General Profile Submission Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-slate-800 my-8 max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  resetForm();
                }}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {referenceId ? (
                <div className="py-8 text-center space-y-5">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-bold text-[#07152B]">
                      Profile Submitted Successfully
                    </h4>
                    <p className="text-xs text-slate-500">
                      We have added your profile to our talent pool.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50/80 border border-blue-100 rounded-2xl max-w-sm mx-auto text-center space-y-1">
                    <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                      Reference ID
                    </span>
                    <p className="text-xl font-mono font-bold text-[#1668E8]">
                      {referenceId}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you for sharing your profile with XSPACEWEB. Our team will review your background and may contact you when a matching opportunity opens up.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setModalOpen(false);
                        resetForm();
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                    <Link
                      href="/careers#open-positions"
                      onClick={() => {
                        setModalOpen(false);
                        resetForm();
                      }}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1668E8] hover:bg-[#1255c2] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>View Open Positions</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold text-[#1668E8] tracking-wider uppercase">
                      TALENT POOL
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#07152B]">
                      Send Us Your Profile
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tell us about your background and what you love building.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Arijeet Banerjee"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="arijeet@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                  </div>

                  {/* Location & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Current Location
                      </label>
                      <input
                        type="text"
                        value={currentLocation}
                        onChange={(e) => setCurrentLocation(e.target.value)}
                        placeholder="e.g. Kolkata, India"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Area of Expertise / Role *
                      </label>
                      <CustomSelect
                        value={selectedRole}
                        onChange={setSelectedRole}
                        placeholder="Select Role..."
                        required
                        options={[
                          { value: "Full Stack Development", label: "Full Stack Development" },
                          { value: "Frontend Development", label: "Frontend Development" },
                          { value: "Backend Development", label: "Backend Development" },
                          { value: "UI/UX & Product Design", label: "UI/UX & Product Design" },
                          { value: "Mobile Development (iOS/Android)", label: "Mobile Development" },
                          { value: "AI / Machine Learning", label: "AI / Machine Learning" },
                          { value: "Digital & Growth Marketing", label: "Digital Marketing" },
                          { value: "Business Development & Sales", label: "Business Development" },
                          { value: "QA & Automation Testing", label: "QA & Automation Testing" },
                          { value: "Student / Graduate Internship", label: "Internship" },
                          { value: "Other", label: "Other" },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Experience, Availability, Work Mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Experience
                      </label>
                      <CustomSelect
                        value={experience}
                        onChange={setExperience}
                        placeholder="Select..."
                        options={[
                          { value: "Fresher", label: "Fresher" },
                          { value: "0-1 Year", label: "0-1 Year" },
                          { value: "1-2 Years", label: "1-2 Years" },
                          { value: "2-4 Years", label: "2-4 Years" },
                          { value: "4+ Years", label: "4+ Years" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Availability
                      </label>
                      <CustomSelect
                        value={availability}
                        onChange={setAvailability}
                        placeholder="Select..."
                        options={[
                          { value: "Immediate", label: "Immediate" },
                          { value: "Within 15 Days", label: "Within 15 Days" },
                          { value: "Within 30 Days", label: "Within 30 Days" },
                          { value: "Within 60 Days", label: "Within 60 Days" },
                          { value: "Flexible", label: "Flexible" },
                        ]}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Mode
                      </label>
                      <CustomSelect
                        value={preferredWorkMode}
                        onChange={setPreferredWorkMode}
                        placeholder="Select..."
                        options={[
                          { value: "Remote", label: "Remote" },
                          { value: "Hybrid", label: "Hybrid" },
                          { value: "Onsite", label: "Onsite" },
                          { value: "Flexible", label: "Flexible" },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Resume / CV Document (PDF, DOC, DOCX — Max 5MB)
                    </label>
                    <div className="border-2 border-dashed border-slate-200 hover:border-[#1668E8] transition-colors rounded-xl p-3 text-center bg-slate-50/60 relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {resumeFile ? (
                        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <span className="truncate max-w-[280px]">{resumeFile.name}</span>
                          <span className="text-[10px] text-slate-400">
                            ({(resumeFile.size / (1024 * 1024)).toFixed(1)} MB)
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                          <UploadCloud className="w-4 h-4 text-[#1668E8]" />
                          <span>Click or drag to upload Resume / CV</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Profile Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Portfolio / Website Link
                      </label>
                      <input
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://myportfolio.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        GitHub / LinkedIn / Other Link
                      </label>
                      <input
                        type="url"
                        value={githubUrl || linkedinUrl || profileUrl}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val.includes("github.com")) {
                            setGithubUrl(val);
                          } else if (val.includes("linkedin.com")) {
                            setLinkedinUrl(val);
                          } else {
                            setProfileUrl(val);
                          }
                        }}
                        placeholder="https://github.com/... or linkedin.com/in/..."
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                  </div>

                  {/* Short Note / Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Brief Message or Bio (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share anything you'd like us to know about your work or aspirations..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-full bg-[#1668E8] hover:bg-[#1255c2] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Profile...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Profile</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
