"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Code2,
  Palette,
  BarChart3,
  Users,
  Briefcase,
  GraduationCap,
  Bookmark,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  X,
  CheckCircle2,
  Send,
  Loader2,
} from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { cn } from "@/lib/utils";
import { CareerOpening } from "@/lib/db/schema";
import { isOpeningNew } from "@/lib/validations/careers";

interface OpenPositionsSectionProps {
  initialOpenings?: CareerOpening[];
}

export const OpenPositionsSection: React.FC<OpenPositionsSectionProps> = ({
  initialOpenings = [],
}) => {
  const [openings, setOpenings] = useState<CareerOpening[]>(initialOpenings);
  const [loading, setLoading] = useState(initialOpenings.length === 0);
  const [activeTab, setActiveTab] = useState<"job" | "internship">("job");
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [selectedRole, setSelectedRole] = useState<CareerOpening | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [submittedRole, setSubmittedRole] = useState<string | null>(null);

  // Fetch from API if initialOpenings was not provided
  useEffect(() => {
    if (initialOpenings.length > 0) {
      setOpenings(initialOpenings);
      setLoading(false);
      return;
    }

    async function fetchOpenings() {
      try {
        setLoading(true);
        const res = await fetch("/api/careers/openings");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setOpenings(json.data);
        }
      } catch (err) {
        console.error("Failed to load public openings:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOpenings();
  }, [initialOpenings]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

  // Dynamic counts for published items
  const jobsCount = openings.filter((item) => item.openingType === "job").length;
  const internshipsCount = openings.filter((item) => item.openingType === "internship").length;

  // Filter by tab and sort
  const filteredPositions = openings
    .filter((item) => item.openingType === activeTab)
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : new Date(a.createdAt).getTime();
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : new Date(b.createdAt).getTime();
      return sortBy === "oldest" ? dateA - dateB : dateB - dateA;
    });

  return (
    <section id="open-positions" className="w-full bg-white py-8 sm:py-12 border-b border-slate-200/80">
      <Container size="wide">
        {/* Toggle Pills Centered at Top */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-full bg-[#F1F5F9] border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveTab("job")}
              className={cn(
                "inline-flex items-center gap-2 px-5 sm:px-7 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
                activeTab === "job"
                  ? "bg-[#1668E8] text-white shadow-sm"
                  : "text-[#556987] hover:text-[#07152B]"
              )}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Jobs ({jobsCount})</span>
            </button>
            <button
              onClick={() => setActiveTab("internship")}
              className={cn(
                "inline-flex items-center gap-2 px-5 sm:px-7 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer",
                activeTab === "internship"
                  ? "bg-[#1668E8] text-white shadow-sm"
                  : "text-[#556987] hover:text-[#07152B]"
              )}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Internship ({internshipsCount})</span>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#07152B] tracking-tight">
              Open Positions
            </h2>
            <p className="text-xs text-slate-500">
              Find the right role and help us build the future.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "latest" | "oldest")}
              className="font-semibold text-[#07152B] bg-[#F8FAFC] border border-slate-200 px-2.5 py-1 rounded-md text-xs outline-none cursor-pointer hover:border-slate-300 transition-colors"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 sm:p-4.5 border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-slate-200 flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 rounded w-1/3" />
                    <div className="h-3 bg-slate-100 rounded w-2/3" />
                  </div>
                </div>
                <div className="w-28 h-8 bg-slate-100 rounded-lg flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : filteredPositions.length === 0 ? (
          /* Empty State */
          <div className="py-16 px-4 text-center rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-200/70 text-slate-500 flex items-center justify-center mx-auto">
              {activeTab === "job" ? (
                <Briefcase className="w-6 h-6" />
              ) : (
                <GraduationCap className="w-6 h-6" />
              )}
            </div>
            <p className="text-sm font-bold text-slate-800">
              {activeTab === "job"
                ? "No job openings available right now."
                : "No internship openings available right now."}
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Please check back soon or explore other opportunities at XSPACEWEB.
            </p>
          </div>
        ) : (
          /* Role Cards List - Streamlined matching existing design */
          <div className="space-y-3">
            {filteredPositions.map((role) => {
              const { icon: Icon, iconBg, iconColor } = getDepartmentStyle(role.department);
              const isBookmarked = bookmarked[role.id];
              const isNew = isOpeningNew(role.publishedAt);

              return (
                <div
                  key={role.id}
                  className="bg-white rounded-xl p-4 sm:p-4.5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#1668E8]/40 transition-all duration-200 group flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left Part: Icon + Info (Clickable Link) */}
                  <Link
                    href={`/careers/${role.slug}`}
                    className="flex items-center gap-3.5 sm:gap-4 flex-1 cursor-pointer"
                  >
                    {/* Category Icon */}
                    <div
                      className={cn(
                        "w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105",
                        iconBg,
                        iconColor
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Title & Metadata */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-tight">
                          {role.title}
                        </h3>
                        {isNew && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-emerald-100 text-emerald-700 uppercase">
                            New
                          </span>
                        )}
                        {/* Tag Pills */}
                        <div className="hidden sm:flex items-center gap-1.5 text-[10.5px] text-slate-500 ml-1">
                          <span className="px-2 py-0.5 rounded bg-[#F1F5F9] font-medium text-slate-700">
                            {role.department}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#F1F5F9] font-medium text-slate-700 capitalize">
                            {role.employmentType.replace("-", " ")}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#F1F5F9] font-medium text-slate-700">
                            {role.location}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-500 leading-snug truncate max-w-2xl">
                        {role.shortDescription}
                      </p>
                    </div>
                  </Link>

                  {/* Right Part: Bookmark + View Details Button */}
                  <div className="flex items-center justify-end gap-2.5 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={(e) => toggleBookmark(role.id, e)}
                      aria-label="Bookmark this role"
                      className={cn(
                        "p-2 rounded-lg border transition-colors cursor-pointer",
                        isBookmarked
                          ? "bg-[#1668E8]/10 text-[#1668E8] border-[#1668E8]/30"
                          : "bg-white text-slate-400 border-slate-200 hover:text-[#07152B] hover:bg-slate-50"
                      )}
                    >
                      <Bookmark
                        className={cn(
                          "w-3.5 h-3.5",
                          isBookmarked ? "fill-current" : ""
                        )}
                      />
                    </button>

                    <Link
                      href={`/careers/${role.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#1668E8] text-[#1668E8] hover:bg-[#1668E8] hover:text-white text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer group/btn"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Job Detail & Application Modal */}
        {selectedRole && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => {
                  setSelectedRole(null);
                  setIsApplying(false);
                }}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-4 mb-6 pr-8">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                    getDepartmentStyle(selectedRole.department).iconBg,
                    getDepartmentStyle(selectedRole.department).iconColor
                  )}
                >
                  {React.createElement(getDepartmentStyle(selectedRole.department).icon, {
                    className: "w-6 h-6",
                  })}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#07152B]">
                    {selectedRole.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
                    <span className="font-semibold text-[#1668E8] bg-[#EBF3FE] px-2.5 py-0.5 rounded-md">
                      {selectedRole.department}
                    </span>
                    <span className="flex items-center gap-1 capitalize">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedRole.employmentType.replace("-", " ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedRole.location}
                    </span>
                  </div>
                </div>
              </div>

              {!isApplying ? (
                <div className="space-y-6 text-sm text-slate-700">
                  <div>
                    <h4 className="font-bold text-[#07152B] mb-2">Role Overview</h4>
                    <p className="leading-relaxed text-slate-600">
                      {selectedRole.shortDescription} {selectedRole.aboutRole}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#07152B] mb-2">Key Responsibilities</h4>
                    <ul className="space-y-2 list-disc list-inside text-slate-600">
                      {(selectedRole.responsibilities || []).map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#07152B] mb-2">What We Are Looking For</h4>
                    <ul className="space-y-2 list-disc list-inside text-slate-600">
                      {(selectedRole.requirements || []).map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex gap-3">
                    <Link
                      href={`/careers/${selectedRole.slug}/apply`}
                      className="w-full py-3 rounded-full bg-[#1668E8] hover:bg-[#1255c2] text-white font-semibold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Apply For This Position</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : submittedRole === selectedRole.id ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#07152B]">
                    Application Submitted!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you for applying to <strong>{selectedRole.title}</strong>. Our recruiting team will review your application and contact you within 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRole(null);
                      setIsApplying(false);
                      setSubmittedRole(null);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#07152B] text-white text-xs font-semibold hover:bg-[#1668E8] transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmittedRole(selectedRole.id);
                  }}
                  className="space-y-4"
                >
                  <h4 className="font-bold text-[#07152B]">
                    Submit Your Application
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        LinkedIn / Portfolio URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Note / Cover Letter
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us briefly why you'd be a great fit..."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsApplying(false)}
                      className="w-1/3 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#07152B] text-xs font-semibold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-2.5 rounded-full bg-[#1668E8] hover:bg-[#1255c2] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Application</span>
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
