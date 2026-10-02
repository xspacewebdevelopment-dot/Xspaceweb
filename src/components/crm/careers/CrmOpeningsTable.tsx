"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CareerOpening, OpeningStatus } from "@/lib/db/schema";
import { formatOpeningDate, isOpeningNew } from "@/lib/validations/careers";
import {
  Search,
  Plus,
  Edit,
  Eye,
  CheckCircle2,
  XCircle,
  Trash2,
  AlertTriangle,
  Loader2,
  ExternalLink,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight,
  X,
  FileText,
  Star,
  Check,
  Building,
  DollarSign,
  Tag,
  ArrowRight,
  Filter,
  MoreVertical,
} from "lucide-react";

interface CrmOpeningsTableProps {
  initialOpenings: CareerOpening[];
  departments: string[];
}

export const CrmOpeningsTable: React.FC<CrmOpeningsTableProps> = ({
  initialOpenings,
  departments,
}) => {
  const [openings, setOpenings] = useState<CareerOpening[]>(initialOpenings);
  const [selectedOpening, setSelectedOpening] = useState<CareerOpening | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "title-asc">("latest");

  // Action states
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);

  // Deletion Modal
  const [deleteModalItem, setDeleteModalItem] = useState<CareerOpening | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Active Three-dots action dropdown
  const [openActionDropdownId, setOpenActionDropdownId] = useState<string | null>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    const handleClickOutside = () => setOpenActionDropdownId(null);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenActionDropdownId(null);
    };

    if (openActionDropdownId) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openActionDropdownId]);

  // Status Action Modal (e.g. Close, Archive, Publish confirm)
  const [statusConfirmItem, setStatusConfirmItem] = useState<{
    opening: CareerOpening;
    targetStatus: OpeningStatus;
    actionLabel: string;
  } | null>(null);

  const showToast = (message: string, isError = false) => {
    if (isError) {
      setActionErrorMessage(message);
      setTimeout(() => setActionErrorMessage(null), 3500);
    } else {
      setActionSuccessMessage(message);
      setTimeout(() => setActionSuccessMessage(null), 3500);
    }
  };

  // Filter & Sort Logic
  const filteredOpenings = openings
    .filter((opening) => {
      // 1. Type Filter
      if (typeFilter !== "all" && opening.openingType !== typeFilter) {
        return false;
      }

      // 2. Status Filter
      if (statusFilter !== "all" && opening.status !== statusFilter) {
        return false;
      }

      // 3. Department Filter
      if (departmentFilter !== "all" && opening.department !== departmentFilter) {
        return false;
      }

      // 4. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = opening.title.toLowerCase().includes(query);
        const matchesDept = opening.department.toLowerCase().includes(query);
        const matchesLoc = opening.location.toLowerCase().includes(query);
        const matchesDesc = opening.shortDescription.toLowerCase().includes(query);
        const matchesSkills = (opening.skills || []).some((s) =>
          s.toLowerCase().includes(query)
        );
        return matchesTitle || matchesDept || matchesLoc || matchesDesc || matchesSkills;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      // Latest first (default)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // Calculate dynamic stats
  const totalCount = openings.length;
  const publishedCount = openings.filter((o) => o.status === "published").length;
  const draftCount = openings.filter((o) => o.status === "draft").length;
  const closedCount = openings.filter((o) => o.status === "closed").length;
  const archivedCount = openings.filter((o) => o.status === "archived").length;

  // Handle status transitions (Publish, Move to Draft, Close, Archive)
  const handleUpdateStatus = async (openingId: string, newStatus: OpeningStatus) => {
    try {
      setIsUpdating(openingId);
      const res = await fetch(`/api/admin/careers/openings/${openingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update status");
      }

      const updated = data.data as CareerOpening;
      setOpenings((prev) => prev.map((o) => (o.id === openingId ? updated : o)));
      if (selectedOpening?.id === openingId) {
        setSelectedOpening(updated);
      }

      setStatusConfirmItem(null);
      showToast(data.message || `Status updated to ${newStatus}`);
    } catch (err: unknown) {
      console.error("Status update error:", err);
      const message = err instanceof Error ? err.message : "Failed to update status";
      showToast(message, true);
    } finally {
      setIsUpdating(null);
    }
  };

  // Handle Permanent Delete for any opening
  const handlePermanentDelete = async () => {
    if (!deleteModalItem) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/careers/openings/${deleteModalItem.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete opening");
      }

      setOpenings((prev) => prev.filter((o) => o.id !== deleteModalItem.id));
      if (selectedOpening?.id === deleteModalItem.id) {
        setSelectedOpening(null);
        setPreviewModalOpen(false);
      }

      const deletedTitle = deleteModalItem.title;
      setDeleteModalItem(null);
      showToast(`Opening "${deletedTitle}" deleted successfully`);
    } catch (err: unknown) {
      console.error("Delete opening error:", err);
      const message = err instanceof Error ? err.message : "Failed to delete opening";
      showToast(message, true);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "draft":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "closed":
        return "bg-slate-100 text-slate-700 border-slate-200/80";
      case "archived":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getDepartmentBadge = (department: string) => {
    switch (department.toLowerCase()) {
      case "engineering":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "design":
        return "bg-purple-50 text-purple-700 border-purple-200/60";
      case "marketing":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "business":
        return "bg-rose-50 text-rose-700 border-rose-200/60";
      case "product":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/60";
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {actionSuccessMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs sm:text-sm font-semibold">{actionSuccessMessage}</span>
        </div>
      )}

      {actionErrorMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-red-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <span className="text-xs sm:text-sm font-semibold">{actionErrorMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span>Career Openings</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1668E8]">
              {totalCount}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage job and internship opportunities published on the website.
          </p>
        </div>

        <Link
          href="/crm/careers/openings/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-98 flex-shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Opening</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Total */}
        <div
          onClick={() => {
            setStatusFilter("all");
            setTypeFilter("all");
          }}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "all"
              ? "bg-white border-[#1668E8] shadow-xs ring-1 ring-[#1668E8]/20"
              : "bg-white border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Openings
            </span>
            <Briefcase className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {totalCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">All career records</p>
        </div>

        {/* Published */}
        <div
          onClick={() => setStatusFilter("published")}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "published"
              ? "bg-white border-emerald-500 shadow-xs ring-1 ring-emerald-500/20"
              : "bg-white border-slate-200 hover:border-emerald-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Published
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">
            {publishedCount}
          </div>
          <p className="text-[11px] text-emerald-600/70 mt-1">Live on public website</p>
        </div>

        {/* Draft */}
        <div
          onClick={() => setStatusFilter("draft")}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "draft"
              ? "bg-white border-amber-500 shadow-xs ring-1 ring-amber-500/20"
              : "bg-white border-slate-200 hover:border-amber-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Draft
            </span>
            <FileText className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-2">
            {draftCount}
          </div>
          <p className="text-[11px] text-amber-600/70 mt-1">Unpublished &amp; editable</p>
        </div>

        {/* Closed */}
        <div
          onClick={() => setStatusFilter("closed")}
          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "closed"
              ? "bg-white border-slate-500 shadow-xs ring-1 ring-slate-500/20"
              : "bg-white border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Closed
            </span>
            <XCircle className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-700 mt-2">
            {closedCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">No longer accepting</p>
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
              placeholder="Search by title, department, location, skills..."
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
              onChange={(e) => setSortBy(e.target.value as "latest" | "oldest" | "title-asc")}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#1668E8]"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title-asc">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Type, Status & Department Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
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

          {/* Status Filter */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            {[
              { id: "all", label: "All Status" },
              { id: "published", label: "Published" },
              { id: "draft", label: "Draft" },
              { id: "closed", label: "Closed" },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStatusFilter(st.id)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all capitalize cursor-pointer ${
                  statusFilter === st.id
                    ? "bg-[#1668E8] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Department Filter Dropdown */}
          {departments.length > 0 && (
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-xs text-slate-400 font-semibold">Dept:</span>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none focus:border-[#1668E8]"
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
        </div>
      </div>

      {/* Openings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredOpenings.length === 0 ? (
          <div className="py-16 px-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No career openings found</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                ? "Try adjusting your search query or filters."
                : "No career openings have been created yet."}
            </p>
            {openings.length === 0 && (
              <div className="pt-2">
                <Link
                  href="/crm/careers/openings/new"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1668E8] text-white text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create your first opening</span>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 sm:px-6">Opening</th>
                  <th className="py-3 px-4 sm:px-6">Type</th>
                  <th className="py-3 px-4 sm:px-6">Department</th>
                  <th className="py-3 px-4 sm:px-6">Location &amp; Mode</th>
                  <th className="py-3 px-4 sm:px-6">Status</th>
                  <th className="py-3 px-4 sm:px-6 text-center">Applications</th>
                  <th className="py-3 px-4 sm:px-6">Published On</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOpenings.map((opening) => {
                  const isNew = isOpeningNew(opening.publishedAt);
                  const isCurrentlyUpdating = isUpdating === opening.id;
                  const appCount = (opening as any).applicationsCount || 0;

                  return (
                    <tr
                      key={opening.id}
                      className="hover:bg-blue-50/30 transition-colors group"
                    >
                      {/* Title & Slug */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-start gap-2.5">
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-slate-900 group-hover:text-[#1668E8] transition-colors">
                                {opening.title}
                              </span>
                              {opening.featured && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                                  <Star className="w-2.5 h-2.5 fill-current" />
                                  Featured
                                </span>
                              )}
                              {isNew && opening.status === "published" && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                              <span>/{opening.slug}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            opening.openingType === "internship"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {opening.openingType === "internship" ? (
                            <GraduationCap className="w-3 h-3" />
                          ) : (
                            <Briefcase className="w-3 h-3" />
                          )}
                          <span>{opening.openingType}</span>
                        </span>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getDepartmentBadge(
                            opening.department
                          )}`}
                        >
                          {opening.department}
                        </span>
                      </td>

                      {/* Location & Mode */}
                      <td className="py-3.5 px-4 sm:px-6 text-slate-600 text-xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1 font-medium text-slate-800">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {opening.location}
                          </span>
                          <span className="text-[11px] text-slate-400 capitalize">
                            {opening.workMode} • {opening.employmentType}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                            opening.status
                          )}`}
                        >
                          {opening.status}
                        </span>
                      </td>

                      {/* Applications Count */}
                      <td className="py-3.5 px-4 sm:px-6 text-center">
                        <Link
                          href={`/crm/careers/applications?openingId=${opening.id}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1668E8] font-bold text-xs border border-blue-200/60 transition-all hover:scale-105"
                          title="View applications for this opening"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{appCount}</span>
                        </Link>
                      </td>

                      {/* Published Date */}
                      <td className="py-3.5 px-4 sm:px-6 text-slate-500 font-medium text-xs whitespace-nowrap">
                        {opening.publishedAt ? (
                          formatOpeningDate(opening.publishedAt)
                        ) : (
                          <span className="text-slate-300 font-mono">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <div className="relative inline-block text-left">
                          {/* Three Dots Menu Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenActionDropdownId(
                                openActionDropdownId === opening.id ? null : opening.id
                              );
                            }}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${
                              openActionDropdownId === opening.id
                                ? "bg-blue-50 text-[#1668E8] shadow-xs ring-1 ring-blue-200"
                                : "text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                            }`}
                            title="Opening actions"
                            aria-expanded={openActionDropdownId === opening.id}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {/* Floating Dropdown Menu */}
                          {openActionDropdownId === opening.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 mt-1 w-52 rounded-2xl bg-white shadow-xl border border-slate-200/90 py-1.5 z-40 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-100 text-left"
                            >
                              {/* View & Edit */}
                              <div className="py-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenActionDropdownId(null);
                                    setSelectedOpening(opening);
                                    setPreviewModalOpen(true);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#1668E8] transition-colors cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                                  <span>Preview Details</span>
                                </button>

                                <Link
                                  href={`/crm/careers/openings/${opening.id}/edit`}
                                  onClick={() => setOpenActionDropdownId(null)}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-pointer"
                                >
                                  <Edit className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Edit Opening</span>
                                </Link>

                                <Link
                                  href={`/crm/careers/applications?openingId=${opening.id}`}
                                  onClick={() => setOpenActionDropdownId(null)}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#1668E8] transition-colors cursor-pointer"
                                >
                                  <FileText className="w-3.5 h-3.5 text-blue-500" />
                                  <span>View Applications ({(opening as any).applicationsCount || 0})</span>
                                </Link>
                              </div>

                              {/* Status Actions */}
                              <div className="py-1">
                                {opening.status === "draft" && (
                                  <button
                                    type="button"
                                    disabled={isCurrentlyUpdating}
                                    onClick={() => {
                                      setOpenActionDropdownId(null);
                                      setStatusConfirmItem({
                                        opening,
                                        targetStatus: "published",
                                        actionLabel: "Publish Opening",
                                      });
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Publish Opening</span>
                                  </button>
                                )}

                                {opening.status === "published" && (
                                  <>
                                    <button
                                      type="button"
                                      disabled={isCurrentlyUpdating}
                                      onClick={() => {
                                        setOpenActionDropdownId(null);
                                        setStatusConfirmItem({
                                          opening,
                                          targetStatus: "draft",
                                          actionLabel: "Move to Draft",
                                        });
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50 transition-colors cursor-pointer"
                                    >
                                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                                      <span>Move to Draft</span>
                                    </button>
                                    <button
                                      type="button"
                                      disabled={isCurrentlyUpdating}
                                      onClick={() => {
                                        setOpenActionDropdownId(null);
                                        setStatusConfirmItem({
                                          opening,
                                          targetStatus: "closed",
                                          actionLabel: "Close Opening",
                                        });
                                      }}
                                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                                    >
                                      <XCircle className="w-3.5 h-3.5 text-slate-500" />
                                      <span>Close Opening</span>
                                    </button>
                                  </>
                                )}

                                {opening.status === "closed" && (
                                  <button
                                    type="button"
                                    disabled={isCurrentlyUpdating}
                                    onClick={() => {
                                      setOpenActionDropdownId(null);
                                      setStatusConfirmItem({
                                        opening,
                                        targetStatus: "published",
                                        actionLabel: "Re-Publish Opening",
                                      });
                                    }}
                                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Re-Publish Opening</span>
                                  </button>
                                )}
                              </div>

                              {/* Delete Option */}
                              <div className="py-1">
                                <button
                                  type="button"
                                  disabled={isCurrentlyUpdating}
                                  onClick={() => {
                                    setOpenActionDropdownId(null);
                                    setDeleteModalItem(opening);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                  <span>Delete Opening</span>
                                </button>
                              </div>
                            </div>
                          )}
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

      {/* Preview Modal */}
      {previewModalOpen && selectedOpening && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 relative">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setPreviewModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    selectedOpening.openingType === "internship"
                      ? "bg-purple-100 text-purple-800 border-purple-200"
                      : "bg-blue-100 text-blue-800 border-blue-200"
                  }`}
                >
                  {selectedOpening.openingType}
                </span>

                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${getDepartmentBadge(
                    selectedOpening.department
                  )}`}
                >
                  {selectedOpening.department}
                </span>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                    selectedOpening.status
                  )}`}
                >
                  {selectedOpening.status}
                </span>

                {selectedOpening.featured && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {selectedOpening.title}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                <span>Slug: /{selectedOpening.slug}</span>
                <span>•</span>
                <span>Experience: {selectedOpening.experience}</span>
              </p>
            </div>

            {/* Applications Banner */}
            <div className="flex items-center justify-between p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-2xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#1668E8] text-white flex items-center justify-center font-bold text-xs">
                  {(selectedOpening as any).applicationsCount || 0}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Candidate Applications</span>
                  <span className="text-[11px] text-slate-500">
                    {(selectedOpening as any).applicationsCount || 0} candidates applied for this opening
                  </span>
                </div>
              </div>
              <Link
                href={`/crm/careers/applications?openingId=${selectedOpening.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-[#1668E8] border border-blue-200 text-xs font-bold transition-all shadow-2xs"
              >
                <span>View Applications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Location &amp; Mode
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {selectedOpening.location} ({selectedOpening.workMode})
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Employment Type
                </span>
                <p className="font-semibold text-slate-800 mt-0.5 capitalize">
                  {selectedOpening.employmentType}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  {selectedOpening.openingType === "internship" ? "Stipend / Duration" : "Salary"}
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {selectedOpening.openingType === "internship"
                    ? `${selectedOpening.internship?.stipend || "Not specified"} (${
                        selectedOpening.internship?.duration || "6 Months"
                      })`
                    : selectedOpening.salary?.text ||
                      (selectedOpening.salary?.min
                        ? `₹${selectedOpening.salary.min.toLocaleString("en-IN")} – ₹${selectedOpening.salary.max?.toLocaleString("en-IN")}`
                        : "Competitive")}
                </p>
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Short Description
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-3 rounded-xl border border-slate-100">
                {selectedOpening.shortDescription}
              </p>
            </div>

            {/* About Role */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                About the Role
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/60 p-3.5 rounded-xl border border-slate-100 whitespace-pre-wrap">
                {selectedOpening.aboutRole}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Responsibilities ({(selectedOpening.responsibilities || []).length})
              </span>
              <ul className="space-y-1 list-disc list-inside text-xs sm:text-sm text-slate-700 bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
                {(selectedOpening.responsibilities || []).map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Requirements ({(selectedOpening.requirements || []).length})
              </span>
              <ul className="space-y-1 list-disc list-inside text-xs sm:text-sm text-slate-700 bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
                {(selectedOpening.requirements || []).map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            {(selectedOpening.skills || []).length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Skills &amp; Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedOpening.skills || []).map((sk, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1668E8] text-xs font-semibold border border-blue-100"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {selectedOpening.status === "published" && (
                <Link
                  href={`/careers/${selectedOpening.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1668E8] hover:underline"
                >
                  <span>View on Public Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    const itemToDelete = selectedOpening;
                    setPreviewModalOpen(false);
                    setDeleteModalItem(itemToDelete);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold border border-red-200 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Opening</span>
                </button>
                <Link
                  href={`/crm/careers/openings/${selectedOpening.id}/edit`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1668E8] text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Opening</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Confirmation Modal */}
      {statusConfirmItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 sm:p-7 space-y-5 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#1668E8] flex items-center justify-center mx-auto shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-slate-900">
                {statusConfirmItem.actionLabel}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Change status of{" "}
                <span className="font-bold text-slate-900">
                  {statusConfirmItem.opening.title}
                </span>{" "}
                to <span className="font-bold capitalize">{statusConfirmItem.targetStatus}</span>?
                {statusConfirmItem.targetStatus === "published" && (
                  <span className="block mt-1 text-emerald-600 font-medium">
                    This will make the opening visible to all public visitors.
                  </span>
                )}
                {statusConfirmItem.targetStatus === "closed" && (
                  <span className="block mt-1 text-slate-500 font-medium">
                    This will remove the opening from public view.
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStatusConfirmItem(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() =>
                  handleUpdateStatus(
                    statusConfirmItem.opening.id,
                    statusConfirmItem.targetStatus
                  )
                }
                className="px-4 py-2.5 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deletion Confirmation Modal */}
      {deleteModalItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 sm:p-7 space-y-5 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-slate-900">Permanently delete opening?</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This action cannot be undone. Are you sure you want to permanently delete the opening{" "}
                <span className="font-bold text-slate-900">{deleteModalItem.title}</span>?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteModalItem(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handlePermanentDelete}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Permanently</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
