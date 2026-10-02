"use client";

import React, { useState, useEffect, useMemo, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  X,
  FileText,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Clock,
  Sparkles,
  ChevronRight,
  UserCheck,
  Building,
  Globe,
  Download,
  Send,
  MessageSquare,
  History,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  Eye,
  ArrowRight,
  ArrowUpRight,
  FileDown,
} from "lucide-react";
import { CareerApplication, ApplicationStatus } from "@/lib/db/schema";
import { formatApplicationDate, formatDetailedDateTime } from "@/lib/validations/applications";

interface StatsData {
  total: number;
  new: number;
  reviewing: number;
  shortlisted: number;
  interview: number;
  selected: number;
  rejected: number;
  withdrawn: number;
}

interface CrmApplicationsTableProps {
  initialApplications: CareerApplication[];
  initialStats: StatsData;
  departments: string[];
  openingsList: { id: string; title: string; slug: string }[];
}

export const CrmApplicationsTable: React.FC<CrmApplicationsTableProps> = ({
  initialApplications,
  initialStats,
  departments,
  openingsList,
}) => {
  const searchParams = useSearchParams();
  const openingIdParam = searchParams.get("openingId") || "all";

  const [applications, setApplications] = useState<CareerApplication[]>(initialApplications);
  const [stats, setStats] = useState<StatsData>(initialStats);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedOpeningId, setSelectedOpeningId] = useState<string>(openingIdParam);
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "candidate-asc" | "candidate-desc">("latest");

  // Detail Modal / Drawer
  const [selectedApp, setSelectedApp] = useState<CareerApplication | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const showToast = (text: string, isError = false) => {
    setToastMessage({ text, isError });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Status Badge Styling Helper
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "reviewing":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "shortlisted":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "interview":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "selected":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "rejected":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "withdrawn":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // Fetch updated data from API when openingIdParam or other primary filters change
  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (typeFilter !== "all") params.append("type", typeFilter);
      if (selectedOpeningId !== "all") params.append("openingId", selectedOpeningId);
      if (departmentFilter !== "all") params.append("department", departmentFilter);
      if (searchQuery) params.append("search", searchQuery);
      params.append("sort", sortBy);

      const res = await fetch(`/api/admin/careers/applications?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Sync state if URL search param changes
  useEffect(() => {
    if (openingIdParam && openingIdParam !== selectedOpeningId) {
      setSelectedOpeningId(openingIdParam);
    }
  }, [openingIdParam]);

  // Client-side Filtered and Sorted Applications
  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        // Status filter
        if (statusFilter !== "all" && app.status !== statusFilter) {
          return false;
        }
        // Type filter
        if (typeFilter !== "all" && app.openingSnapshot.openingType !== typeFilter) {
          return false;
        }
        // Opening filter
        if (selectedOpeningId !== "all") {
          if (app.openingId !== selectedOpeningId && app.openingSnapshot.slug !== selectedOpeningId) {
            return false;
          }
        }
        // Department filter
        if (departmentFilter !== "all" && app.openingSnapshot.department !== departmentFilter) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = app.applicant.fullName.toLowerCase().includes(q);
          const matchEmail = app.applicant.email.toLowerCase().includes(q);
          const matchAppId = app.applicationId.toLowerCase().includes(q);
          const matchTitle = app.openingSnapshot.title.toLowerCase().includes(q);
          const matchPhone = app.applicant.phone.toLowerCase().includes(q);
          return matchName || matchEmail || matchAppId || matchTitle || matchPhone;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "oldest") {
          return new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
        }
        if (sortBy === "candidate-asc") {
          return a.applicant.fullName.localeCompare(b.applicant.fullName);
        }
        if (sortBy === "candidate-desc") {
          return b.applicant.fullName.localeCompare(a.applicant.fullName);
        }
        // Latest first (default)
        return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
      });
  }, [applications, statusFilter, typeFilter, selectedOpeningId, departmentFilter, searchQuery, sortBy]);

  // Handle Application Status Update
  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => {
    try {
      setIsUpdatingStatus(true);
      const res = await fetch(`/api/admin/careers/applications/${appId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update status");
      }

      const updated = data.data as CareerApplication;
      setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));

      // Update in selected drawer if open
      if (selectedApp && (selectedApp.id === updated.id || selectedApp.applicationId === updated.applicationId)) {
        setSelectedApp(updated);
      }

      // Update stats counters
      setStats((prev) => {
        const nextStats = { ...prev };
        if (selectedApp && selectedApp.status in nextStats) {
          (nextStats as any)[selectedApp.status] = Math.max(0, (nextStats as any)[selectedApp.status] - 1);
        }
        if (newStatus in nextStats) {
          (nextStats as any)[newStatus] = ((nextStats as any)[newStatus] || 0) + 1;
        }
        return nextStats;
      });

      showToast(`Status updated to ${newStatus.toUpperCase()}`);
    } catch (err: any) {
      console.error("Status update error:", err);
      showToast(err?.message || "Failed to update status", true);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Handle Adding Internal Recruiter Note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !newNoteText.trim()) return;

    try {
      setIsAddingNote(true);
      const res = await fetch(`/api/admin/careers/applications/${selectedApp.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newNoteText.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to add note");
      }

      const updated = data.data as CareerApplication;
      setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
      setSelectedApp(updated);
      setNewNoteText("");
      showToast("Internal note added successfully");
    } catch (err: any) {
      console.error("Add note error:", err);
      showToast(err?.message || "Failed to add note", true);
    } finally {
      setIsAddingNote(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl border text-sm font-bold transition-all animate-in fade-in slide-in-from-bottom-3 ${
            toastMessage.isError
              ? "bg-red-50 text-red-700 border-red-200"
              : "bg-emerald-50 text-emerald-800 border-emerald-200"
          }`}
        >
          {toastMessage.isError ? (
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Applications
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1668E8] font-bold text-xs">
              {stats.total} Total
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Review and manage candidates applying through the careers website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/crm/careers/openings"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Briefcase className="w-4 h-4 text-slate-500" />
            <span>Manage Openings</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Total */}
        <div
          onClick={() => setStatusFilter("all")}
          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "all"
              ? "bg-white border-blue-500 shadow-xs ring-1 ring-blue-500/20"
              : "bg-white border-slate-200 hover:border-blue-200"
          }`}
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Total
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {stats.total}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">All candidates</p>
        </div>

        {/* New */}
        <div
          onClick={() => setStatusFilter("new")}
          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "new"
              ? "bg-white border-blue-500 shadow-xs ring-1 ring-blue-500/20"
              : "bg-white border-slate-200 hover:border-blue-200"
          }`}
        >
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
            New
          </span>
          <div className="text-xl sm:text-2xl font-black text-blue-600 mt-1">
            {stats.new}
          </div>
          <p className="text-[10px] text-blue-500/70 mt-0.5">Needs review</p>
        </div>

        {/* Reviewing */}
        <div
          onClick={() => setStatusFilter("reviewing")}
          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "reviewing"
              ? "bg-white border-amber-500 shadow-xs ring-1 ring-amber-500/20"
              : "bg-white border-slate-200 hover:border-amber-200"
          }`}
        >
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
            Reviewing
          </span>
          <div className="text-xl sm:text-2xl font-black text-amber-600 mt-1">
            {stats.reviewing}
          </div>
          <p className="text-[10px] text-amber-500/70 mt-0.5">In evaluation</p>
        </div>

        {/* Shortlisted */}
        <div
          onClick={() => setStatusFilter("shortlisted")}
          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "shortlisted"
              ? "bg-white border-indigo-500 shadow-xs ring-1 ring-indigo-500/20"
              : "bg-white border-slate-200 hover:border-indigo-200"
          }`}
        >
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
            Shortlisted
          </span>
          <div className="text-xl sm:text-2xl font-black text-indigo-600 mt-1">
            {stats.shortlisted}
          </div>
          <p className="text-[10px] text-indigo-500/70 mt-0.5">Top profiles</p>
        </div>

        {/* Interview */}
        <div
          onClick={() => setStatusFilter("interview")}
          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "interview"
              ? "bg-white border-purple-500 shadow-xs ring-1 ring-purple-500/20"
              : "bg-white border-slate-200 hover:border-purple-200"
          }`}
        >
          <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">
            Interview
          </span>
          <div className="text-xl sm:text-2xl font-black text-purple-600 mt-1">
            {stats.interview}
          </div>
          <p className="text-[10px] text-purple-500/70 mt-0.5">Rounds ongoing</p>
        </div>

        {/* Selected */}
        <div
          onClick={() => setStatusFilter("selected")}
          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "selected"
              ? "bg-white border-emerald-500 shadow-xs ring-1 ring-emerald-500/20"
              : "bg-white border-slate-200 hover:border-emerald-200"
          }`}
        >
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
            Selected
          </span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
            {stats.selected}
          </div>
          <p className="text-[10px] text-emerald-500/70 mt-0.5">Hired / Offered</p>
        </div>

        {/* Rejected */}
        <div
          onClick={() => setStatusFilter("rejected")}
          className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "rejected"
              ? "bg-white border-rose-500 shadow-xs ring-1 ring-rose-500/20"
              : "bg-white border-slate-200 hover:border-rose-200"
          }`}
        >
          <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
            Rejected
          </span>
          <div className="text-xl sm:text-2xl font-black text-rose-600 mt-1">
            {stats.rejected}
          </div>
          <p className="text-[10px] text-rose-500/70 mt-0.5">Not selected</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search candidate name, email, application ID, opening..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "latest" | "oldest" | "candidate-asc" | "candidate-desc")
              }
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#1668E8]"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="candidate-asc">Candidate (A-Z)</option>
              <option value="candidate-desc">Candidate (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Secondary Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
          {/* Type Filter */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            {[
              { id: "all", label: "All Types" },
              { id: "job", label: "Jobs" },
              { id: "internship", label: "Internships" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTypeFilter(t.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  typeFilter === t.id
                    ? "bg-white text-[#1668E8] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Opening Dropdown Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Opening:</span>
            <select
              value={selectedOpeningId}
              onChange={(e) => setSelectedOpeningId(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-[#1668E8] max-w-[200px] truncate"
            >
              <option value="all">All Openings</option>
              {openingsList.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.title}
                </option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          {departments.length > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Department:</span>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-[#1668E8]"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Reset Filters */}
          {(statusFilter !== "all" ||
            typeFilter !== "all" ||
            selectedOpeningId !== "all" ||
            departmentFilter !== "all" ||
            searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setStatusFilter("all");
                setTypeFilter("all");
                setSelectedOpeningId("all");
                setDepartmentFilter("all");
                setSearchQuery("");
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-bold ml-auto flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredApplications.length === 0 ? (
          <div className="py-16 px-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              {applications.length === 0
                ? "No applications yet."
                : "No applications match your filters."}
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {applications.length === 0
                ? "Applications submitted through the Careers page will appear here."
                : "Try adjusting your search criteria or resetting filters."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Candidate</th>
                  <th className="py-3.5 px-4 sm:px-6">Application ID</th>
                  <th className="py-3.5 px-4 sm:px-6">Opening</th>
                  <th className="py-3.5 px-4 sm:px-6">Type</th>
                  <th className="py-3.5 px-4 sm:px-6">Applied On</th>
                  <th className="py-3.5 px-4 sm:px-6">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((app) => {
                  const resumeUrl = app.application.resume?.url;

                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                      onClick={() => setSelectedApp(app)}
                    >
                      {/* Candidate Name & Contact */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-slate-900 group-hover:text-[#1668E8] transition-colors block text-sm">
                              {app.applicant.fullName}
                            </span>
                            {app.source === "talent-pool" && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
                                Talent Pool
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1 font-mono">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {app.applicant.email}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {app.applicant.currentLocation}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Application ID */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <span className="font-mono font-bold text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
                          {app.applicationId}
                        </span>
                      </td>

                      {/* Opening Snapshot */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-slate-800 block truncate max-w-[200px]">
                            {app.openingSnapshot.title}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {app.openingSnapshot.department}
                          </span>
                        </div>
                      </td>

                      {/* Opening Type */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            app.openingSnapshot.openingType === "internship"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {app.openingSnapshot.openingType === "internship" ? (
                            <GraduationCap className="w-3 h-3" />
                          ) : (
                            <Briefcase className="w-3 h-3" />
                          )}
                          <span>{app.openingSnapshot.openingType}</span>
                        </span>
                      </td>

                      {/* Applied On */}
                      <td className="py-3.5 px-4 sm:px-6 text-slate-600 font-medium text-xs whitespace-nowrap">
                        {formatApplicationDate(app.appliedAt)}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 sm:px-6" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value as ApplicationStatus)
                          }
                          className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border outline-none cursor-pointer ${getStatusBadge(
                            app.status
                          )}`}
                        >
                          <option value="new">New</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="interview">Interview</option>
                          <option value="selected">Selected</option>
                          <option value="rejected">Rejected</option>
                          <option value="withdrawn">Withdrawn</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Resume View Link */}
                          {resumeUrl && (
                            <a
                              href={resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-slate-500 hover:text-[#1668E8] hover:bg-blue-50 rounded-lg transition-colors"
                              title="Open Resume / CV"
                            >
                              <FileText className="w-4 h-4" />
                            </a>
                          )}

                          {/* View Full Detail Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedApp(app)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1668E8] font-bold text-xs transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Candidate Application Detail Drawer / Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-bold text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md border border-blue-200">
                    {selectedApp.applicationId}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                      selectedApp.status
                    )}`}
                  >
                    {selectedApp.status}
                  </span>
                  {selectedApp.source === "talent-pool" && (
                    <Link
                      href={`/crm/careers/talent-pool?search=${encodeURIComponent(selectedApp.applicant.email)}`}
                      className="inline-flex items-center gap-1 text-[10px] font-bold bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200 px-2 py-0.5 rounded-full transition-colors"
                      title="View originating Talent Pool profile"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Source: Talent Pool</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  )}
                  <span className="text-xs text-slate-400">
                    Applied: {formatDetailedDateTime(selectedApp.appliedAt)}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  {selectedApp.applicant.fullName}
                </h2>
                <p className="text-xs text-slate-500 flex items-center gap-3">
                  <span className="flex items-center gap-1 font-mono">
                    <Mail className="w-3 h-3 text-slate-400" />
                    {selectedApp.applicant.email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    {selectedApp.applicant.phone}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {selectedApp.applicant.currentLocation}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center border border-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800 flex-1">
              {/* Opening Information Box */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                    Target Opening
                  </span>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {selectedApp.openingSnapshot.title}
                    </h3>
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                        selectedApp.openingSnapshot.openingType === "internship"
                          ? "bg-purple-100 text-purple-800 border-purple-200"
                          : "bg-blue-100 text-blue-800 border-blue-200"
                      }`}
                    >
                      {selectedApp.openingSnapshot.openingType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {selectedApp.openingSnapshot.department} • {selectedApp.openingSnapshot.location}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/careers/${selectedApp.openingSnapshot.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-[#1668E8] text-xs font-bold border border-blue-200 shadow-2xs transition-all"
                  >
                    <span>View Public Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Application Details Grid */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Candidate Experience &amp; Availability
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Experience
                    </span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {selectedApp.application.experience || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Availability
                    </span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {selectedApp.application.availability || "Immediate"}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">
                      Preferred Work Mode
                    </span>
                    <p className="font-semibold text-slate-800 mt-0.5 capitalize">
                      {selectedApp.application.preferredWorkMode || "Flexible"}
                    </p>
                  </div>

                  {selectedApp.application.currentRole && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">
                        Current Role
                      </span>
                      <p className="font-semibold text-slate-800 mt-0.5">
                        {selectedApp.application.currentRole}
                      </p>
                    </div>
                  )}

                  {selectedApp.application.currentCompany && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">
                        Current Company
                      </span>
                      <p className="font-semibold text-slate-800 mt-0.5">
                        {selectedApp.application.currentCompany}
                      </p>
                    </div>
                  )}

                  {selectedApp.application.expectedStartDate && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">
                        Expected Start Date
                      </span>
                      <p className="font-semibold text-slate-800 mt-0.5">
                        {selectedApp.application.expectedStartDate}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Resume & Profile Links */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Resume &amp; Profile Links
                </h4>
                <div className="flex flex-wrap items-center gap-3">
                  {/* Resume Card */}
                  {selectedApp.application.resume?.url ? (
                    <a
                      href={selectedApp.application.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Resume / CV</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">No resume file attached</span>
                  )}

                  {/* Portfolio */}
                  {selectedApp.application.portfolioUrl && (
                    <a
                      href={selectedApp.application.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-slate-500" />
                      <span>Portfolio</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}

                  {/* GitHub */}
                  {selectedApp.application.githubUrl && (
                    <a
                      href={selectedApp.application.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current text-slate-800" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}

                  {/* LinkedIn */}
                  {selectedApp.application.linkedinUrl && (
                    <a
                      href={selectedApp.application.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current text-blue-600" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0-.01-3.34 1.67 1.67 0 0 0 .01 3.34M7.86 18.5V10.13H5.07V18.5h2.79Z" />
                      </svg>
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              {selectedApp.application.coverLetter && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Cover Letter / Message
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedApp.application.coverLetter}
                  </div>
                </div>
              )}

              {/* Status Update Control */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Update Applicant Status
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      "new",
                      "reviewing",
                      "shortlisted",
                      "interview",
                      "selected",
                      "rejected",
                      "withdrawn",
                    ] as ApplicationStatus[]
                  ).map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={isUpdatingStatus}
                      onClick={() => handleStatusChange(selectedApp.id, st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        selectedApp.status === st
                          ? "bg-[#1668E8] text-white shadow-sm ring-2 ring-blue-400/30"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status History Timeline */}
              {selectedApp.statusHistory && selectedApp.statusHistory.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" />
                    <span>Status History</span>
                  </h4>
                  <div className="space-y-2 border-l-2 border-slate-200 pl-3 ml-2">
                    {selectedApp.statusHistory.map((item, index) => (
                      <div key={index} className="relative text-xs space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800 capitalize">
                            {item.from ? `${item.from} → ${item.to}` : `Initial status: ${item.to}`}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            by {item.changedBy}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block">
                          {formatDetailedDateTime(item.changedAt)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recruiter Internal Notes */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>Internal Recruiter Notes ({selectedApp.internalNotes?.length || 0})</span>
                </h4>

                {/* Existing Notes List */}
                <div className="space-y-2.5">
                  {(!selectedApp.internalNotes || selectedApp.internalNotes.length === 0) ? (
                    <p className="text-xs text-slate-400 italic">
                      No internal notes recorded yet. Add notes for recruiter team review.
                    </p>
                  ) : (
                    selectedApp.internalNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between text-[11px] text-amber-900 font-bold">
                          <span>{note.createdBy}</span>
                          <span className="font-normal text-slate-400">
                            {formatDetailedDateTime(note.createdAt)}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{note.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="space-y-2 pt-2">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add a recruiter note (e.g. 'Strong portfolio, invite for technical round')..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-[#1668E8] focus:bg-white resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isAddingNote || !newNoteText.trim()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1668E8] hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isAddingNote ? "Adding..." : "Add Note"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Candidate: {selectedApp.applicant.email}
              </span>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
