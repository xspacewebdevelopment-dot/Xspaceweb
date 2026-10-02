"use client";

import React, { useState, useMemo, useTransition, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Users,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Sparkles,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Filter,
  Eye,
  ArrowRight,
  MoreVertical,
  Plus,
  Tag,
  MessageSquare,
  FileText,
  Download,
  Loader2,
  RefreshCw,
  Archive,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { TalentProfile, TalentStatus } from "@/lib/db/schema";
import { formatTalentDate, formatDetailedDateTime } from "@/lib/validations/talentPool";

interface StatsData {
  total: number;
  new: number;
  reviewed: number;
  potential: number;
  contacted: number;
  converted: number;
  archived: number;
}

interface PublishedOpening {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  openingType: string;
  status: string;
}

interface CrmTalentPoolTableProps {
  initialProfiles: TalentProfile[];
  initialStats: StatsData;
  publishedOpenings: PublishedOpening[];
  rolesList: string[];
}

export const CrmTalentPoolTable: React.FC<CrmTalentPoolTableProps> = ({
  initialProfiles,
  initialStats,
  publishedOpenings,
  rolesList,
}) => {
  const [profiles, setProfiles] = useState<TalentProfile[]>(initialProfiles);
  const [stats, setStats] = useState<StatsData>(initialStats);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");
  const [workModeFilter, setWorkModeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "name-asc" | "name-desc">("latest");

  // Selected Profile for Drawer
  const [selectedProfile, setSelectedProfile] = useState<TalentProfile | null>(null);

  // Conversion Modal State
  const [convertCandidate, setConvertCandidate] = useState<TalentProfile | null>(null);
  const [selectedOpeningId, setSelectedOpeningId] = useState<string>("");
  const [convertInitialStatus, setConvertInitialStatus] = useState<string>("reviewing");
  const [convertAvailability, setConvertAvailability] = useState<string>("");
  const [convertWorkMode, setConvertWorkMode] = useState<string>("");
  const [convertExperience, setConvertExperience] = useState<string>("");
  const [convertRole, setConvertRole] = useState<string>("");
  const [convertCompany, setConvertCompany] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState<string | null>(null);

  // Notes & Tags State in Drawer
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");
  const [isUpdatingTags, setIsUpdatingTags] = useState(false);

  // Open Actions Dropdown ID
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const showToast = (text: string, isError = false) => {
    setToastMessage({ text, isError });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = () => setActiveMenuId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // Status Badge Styling Helper
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "reviewed":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "potential":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "contacted":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "converted":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "archived":
        return "bg-slate-100 text-slate-700 border-slate-300";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // Refresh data from API
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/careers/talent-pool?limit=100");
      if (res.ok) {
        const json = await res.json();
        setProfiles(json.data || []);
        if (json.stats) setStats(json.stats);
      }
    } catch {
      showToast("Failed to refresh talent pool data", true);
    } finally {
      setIsLoading(false);
    }
  };

  // Client-side filtering & sorting
  const filteredProfiles = useMemo(() => {
    return profiles
      .filter((p) => {
        // Status filter
        if (statusFilter !== "all" && p.status !== statusFilter) return false;

        // Role filter
        if (roleFilter !== "all" && p.preferredRole !== roleFilter) return false;

        // Experience filter
        if (experienceFilter !== "all" && p.experience !== experienceFilter) return false;

        // Work mode filter
        if (workModeFilter !== "all" && p.preferredWorkMode !== workModeFilter) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchId = p.profileId.toLowerCase().includes(q);
          const matchName = p.fullName.toLowerCase().includes(q);
          const matchEmail = p.email.toLowerCase().includes(q);
          const matchPhone = p.phone.toLowerCase().includes(q);
          const matchRole = p.preferredRole.toLowerCase().includes(q);
          const matchLocation = (p.currentLocation || "").toLowerCase().includes(q);
          const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(q));

          return matchId || matchName || matchEmail || matchPhone || matchRole || matchLocation || matchTags;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "oldest") {
          return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
        }
        if (sortBy === "name-asc") {
          return a.fullName.localeCompare(b.fullName);
        }
        if (sortBy === "name-desc") {
          return b.fullName.localeCompare(a.fullName);
        }
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      });
  }, [profiles, statusFilter, roleFilter, experienceFilter, workModeFilter, searchQuery, sortBy]);

  // Handle Status Update
  const handleStatusChange = async (profileId: string, newStatus: TalentStatus) => {
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`/api/admin/careers/talent-pool/${profileId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update status");
      }

      const { data: updated } = await res.json();

      setProfiles((prev) => prev.map((p) => (p.id === profileId ? updated : p)));
      if (selectedProfile?.id === profileId) {
        setSelectedProfile(updated);
      }

      // Update local stats
      setStats((prev) => {
        const oldStatus = profiles.find((p) => p.id === profileId)?.status as keyof StatsData;
        if (!oldStatus || oldStatus === newStatus) return prev;
        return {
          ...prev,
          [oldStatus]: Math.max(0, (prev[oldStatus] || 0) - 1),
          [newStatus]: (prev[newStatus as keyof StatsData] || 0) + 1,
        };
      });

      showToast(`Candidate status updated to ${newStatus}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error updating status";
      showToast(msg, true);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Handle Add Internal Note
  const handleAddNote = async () => {
    if (!selectedProfile || !newNoteText.trim()) return;

    setIsAddingNote(true);
    try {
      const res = await fetch(`/api/admin/careers/talent-pool/${selectedProfile.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newNoteText.trim() }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add note");
      }

      const { data: updatedNotes } = await res.json();

      const updatedProfile = { ...selectedProfile, internalNotes: updatedNotes };
      setSelectedProfile(updatedProfile);
      setProfiles((prev) => prev.map((p) => (p.id === selectedProfile.id ? updatedProfile : p)));

      setNewNoteText("");
      showToast("Internal note added successfully");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error adding note";
      showToast(msg, true);
    } finally {
      setIsAddingNote(false);
    }
  };

  // Handle Add Tag
  const handleAddTag = async () => {
    if (!selectedProfile || !newTagInput.trim()) return;
    const tag = newTagInput.trim();
    const currentTags = selectedProfile.tags || [];
    if (currentTags.includes(tag)) {
      setNewTagInput("");
      return;
    }

    const updatedTags = [...currentTags, tag];
    await saveTags(updatedTags);
    setNewTagInput("");
  };

  // Handle Remove Tag
  const handleRemoveTag = async (tagToRemove: string) => {
    if (!selectedProfile) return;
    const updatedTags = (selectedProfile.tags || []).filter((t) => t !== tagToRemove);
    await saveTags(updatedTags);
  };

  const saveTags = async (tags: string[]) => {
    if (!selectedProfile) return;
    setIsUpdatingTags(true);
    try {
      const res = await fetch(`/api/admin/careers/talent-pool/${selectedProfile.id}/tags`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update tags");
      }

      const { data: savedTags } = await res.json();
      const updatedProfile = { ...selectedProfile, tags: savedTags };
      setSelectedProfile(updatedProfile);
      setProfiles((prev) => prev.map((p) => (p.id === selectedProfile.id ? updatedProfile : p)));
      showToast("Tags updated");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error updating tags";
      showToast(msg, true);
    } finally {
      setIsUpdatingTags(false);
    }
  };

  // Open Conversion Modal
  const handleOpenConvertModal = (profile: TalentProfile) => {
    setConvertCandidate(profile);
    setSelectedOpeningId(publishedOpenings[0]?.id || "");
    setConvertInitialStatus("reviewing");
    setConvertAvailability(profile.availability || "Immediate");
    setConvertWorkMode(profile.preferredWorkMode || "Flexible");
    setConvertExperience(profile.experience || "Fresher");
    setConvertRole(profile.preferredRole || "");
    setConvertCompany("");
    setConversionError(null);
  };

  // Submit Conversion
  const handleConvertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertCandidate || !selectedOpeningId) {
      setConversionError("Please select a career opening.");
      return;
    }

    setIsConverting(true);
    setConversionError(null);

    try {
      const res = await fetch(`/api/admin/careers/talent-pool/${convertCandidate.id}/convert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          openingId: selectedOpeningId,
          status: convertInitialStatus,
          availability: convertAvailability,
          preferredWorkMode: convertWorkMode,
          experience: convertExperience,
          currentRole: convertRole || null,
          currentCompany: convertCompany || null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setConversionError(data.error || "Conversion failed. Please try again.");
        setIsConverting(false);
        return;
      }

      showToast(`Successfully converted to ${data.openingTitle} (${data.applicationId})!`);

      // Refresh data
      await refreshData();

      // Close modal and drawer
      setConvertCandidate(null);
      if (selectedProfile?.id === convertCandidate.id) {
        // Reload details for drawer
        const freshRes = await fetch(`/api/admin/careers/talent-pool/${convertCandidate.id}`);
        if (freshRes.ok) {
          const freshData = await freshRes.json();
          setSelectedProfile(freshData.data);
        }
      }
    } catch {
      setConversionError("Network error while converting candidate.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200 ${
            toastMessage.isError
              ? "bg-red-50 text-red-800 border-red-200"
              : "bg-emerald-50 text-emerald-800 border-emerald-200"
          }`}
        >
          {toastMessage.isError ? (
            <AlertCircle className="w-4 h-4 text-red-600" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1668E8]" />
            <span className="text-xs font-bold tracking-wider text-[#1668E8] uppercase">
              CAREERS CRM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Talent Pool
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Review profiles submitted by candidates who are interested in future opportunities.
          </p>
        </div>

        <button
          type="button"
          onClick={refreshData}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#1668E8]" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: "Total Profiles", value: stats.total, filterKey: "all", color: "text-slate-900", border: "hover:border-slate-400" },
          { label: "New", value: stats.new, filterKey: "new", color: "text-blue-600", border: "hover:border-blue-400" },
          { label: "Reviewed", value: stats.reviewed, filterKey: "reviewed", color: "text-amber-600", border: "hover:border-amber-400" },
          { label: "Potential", value: stats.potential, filterKey: "potential", color: "text-purple-600", border: "hover:border-purple-400" },
          { label: "Contacted", value: stats.contacted, filterKey: "contacted", color: "text-cyan-600", border: "hover:border-cyan-400" },
          { label: "Converted", value: stats.converted, filterKey: "converted", color: "text-emerald-600", border: "hover:border-emerald-400" },
          { label: "Archived", value: stats.archived, filterKey: "archived", color: "text-slate-500", border: "hover:border-slate-400" },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setStatusFilter(item.filterKey)}
            className={`p-4 rounded-2xl border bg-white transition-all text-left cursor-pointer shadow-2xs ${item.border} ${
              statusFilter === item.filterKey
                ? "ring-2 ring-[#1668E8] border-transparent bg-blue-50/20"
                : "border-slate-200/80"
            }`}
          >
            <span className="text-[11px] font-semibold text-slate-500 block truncate">
              {item.label}
            </span>
            <span className={`text-2xl font-black ${item.color} mt-1 block`}>
              {item.value}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by candidate, email, ID, role, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="potential">Potential</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Role Filter */}
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
            >
              <option value="all">All Roles / Domains</option>
              {rolesList.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "latest" | "oldest" | "name-asc" | "name-desc")}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-asc">Candidate (A-Z)</option>
              <option value="name-desc">Candidate (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Active Filter Clear Helper */}
        {(statusFilter !== "all" || roleFilter !== "all" || experienceFilter !== "all" || workModeFilter !== "all" || searchQuery) && (
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-500">
            <span>
              Showing <strong>{filteredProfiles.length}</strong> of {profiles.length} profiles
            </span>
            <button
              type="button"
              onClick={() => {
                setStatusFilter("all");
                setRoleFilter("all");
                setExperienceFilter("all");
                setWorkModeFilter("all");
                setSearchQuery("");
              }}
              className="text-[#1668E8] hover:underline font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Talent Profiles Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredProfiles.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              {profiles.length === 0
                ? "No profiles have been submitted yet."
                : "No talent profiles match your filters."}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {profiles.length === 0
                ? "Profiles submitted through 'Send Your Profile' on the careers page will appear here."
                : "Try adjusting your search keywords, role selection, or status filters."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Candidate</th>
                  <th className="py-3.5 px-4">Profile ID</th>
                  <th className="py-3.5 px-4">Preferred Role</th>
                  <th className="py-3.5 px-4">Experience</th>
                  <th className="py-3.5 px-4">Submitted On</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredProfiles.map((profile) => (
                  <tr
                    key={profile.id}
                    className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                    onClick={() => setSelectedProfile(profile)}
                  >
                    {/* Candidate */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 group-hover:text-[#1668E8] transition-colors flex items-center gap-1.5">
                          <span>{profile.fullName}</span>
                          {(profile.conversionHistory || []).length > 0 && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700">
                              Converted ({(profile.conversionHistory || []).length})
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
                          <span>{profile.email}</span>
                          <span>•</span>
                          <span>{profile.phone}</span>
                        </div>
                        {profile.currentLocation && (
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{profile.currentLocation}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Profile ID */}
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
                        {profile.profileId}
                      </span>
                    </td>

                    {/* Preferred Role */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800">
                        {profile.preferredRole}
                      </span>
                      {profile.tags && profile.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {profile.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {profile.tags.length > 2 && (
                            <span className="text-[10px] text-slate-400">
                              +{profile.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Experience & Work Mode */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-700 font-medium">
                        {profile.experience || "Fresher"}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {profile.preferredWorkMode || "Flexible"}
                      </div>
                    </td>

                    {/* Submitted Date */}
                    <td className="py-3.5 px-4">
                      <span className="text-slate-600 text-xs">
                        {formatTalentDate(profile.submittedAt)}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${getStatusBadge(
                          profile.status
                        )}`}
                      >
                        {profile.status}
                      </span>
                    </td>

                    {/* Actions Menu */}
                    <td
                      className="py-3.5 px-4 sm:px-6 text-right relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProfile(profile)}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#1668E8] hover:bg-blue-100 text-xs font-bold transition-all cursor-pointer"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenConvertModal(profile)}
                          className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-all cursor-pointer"
                          title="Convert to Application"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Convert</span>
                        </button>

                        {/* 3-Dots Menu */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(activeMenuId === profile.id ? null : profile.id);
                            }}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                            aria-label="More actions"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuId === profile.id && (
                            <div className="absolute right-0 top-8 z-30 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 animate-in fade-in zoom-in-95 text-left text-xs font-medium text-slate-700">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedProfile(profile);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-800 font-semibold"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#1668E8]" />
                                <span>View Details</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  handleOpenConvertModal(profile);
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-emerald-700 font-semibold"
                              >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Convert to Application</span>
                              </button>

                              <div className="my-1 border-t border-slate-100" />

                              <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Set Status
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  handleStatusChange(profile.id, "reviewed");
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-amber-700"
                              >
                                <span>Mark Reviewed</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  handleStatusChange(profile.id, "potential");
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-purple-700"
                              >
                                <span>Mark Potential</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  handleStatusChange(profile.id, "contacted");
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-cyan-700"
                              >
                                <span>Mark Contacted</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  handleStatusChange(profile.id, "archived");
                                  setActiveMenuId(null);
                                }}
                                className="w-full px-3.5 py-1.5 hover:bg-slate-50 flex items-center gap-2 text-slate-500"
                              >
                                <Archive className="w-3.5 h-3.5" />
                                <span>Archive</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* TALENT PROFILE DETAILS DRAWER */}
      {/* ========================================== */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200 text-slate-800">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/60 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#1668E8] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                    {selectedProfile.profileId}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border capitalize ${getStatusBadge(
                      selectedProfile.status
                    )}`}
                  >
                    {selectedProfile.status}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedProfile.fullName}
                </h2>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Submitted on {formatDetailedDateTime(selectedProfile.submittedAt)}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProfile(null)}
                  className="p-2 rounded-full bg-white hover:bg-slate-200 text-slate-600 border border-slate-200 shadow-2xs transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Primary Action Toolbar */}
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-xs font-bold text-[#07152B] block">
                    Recruiter Workflow
                  </span>
                  <span className="text-[11px] text-slate-600">
                    Convert profile to a live career opening or update review status.
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleOpenConvertModal(selectedProfile)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#1668E8] hover:bg-[#1255c2] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Convert to Application</span>
                  </button>

                  <select
                    value={selectedProfile.status}
                    onChange={(e) => handleStatusChange(selectedProfile.id, e.target.value as TalentStatus)}
                    disabled={isUpdatingStatus}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="potential">Potential</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Conversion History Section */}
              {(selectedProfile.conversionHistory || []).length > 0 && (
                <div className="space-y-2 p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Converted Applications ({selectedProfile.conversionHistory.length})</span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {selectedProfile.conversionHistory.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3 rounded-xl border border-emerald-100 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900">
                            {item.openingTitle || "Career Position"}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            Ref: {item.applicationCode || item.applicationId} • Converted on {formatTalentDate(item.convertedAt)}
                          </div>
                        </div>

                        <Link
                          href={`/crm/careers/applications?search=${item.applicationCode || ""}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                        >
                          <span>View Application</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={`mailto:${selectedProfile.email}`}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all group"
                  >
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-[#1668E8] text-xs font-semibold">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mt-1 truncate">
                      {selectedProfile.email}
                    </p>
                  </a>

                  <a
                    href={`tel:${selectedProfile.phone}`}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all group"
                  >
                    <div className="flex items-center gap-2 text-slate-500 group-hover:text-[#1668E8] text-xs font-semibold">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Phone</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mt-1 truncate">
                      {selectedProfile.phone}
                    </p>
                  </a>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Location</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mt-1 truncate">
                      {selectedProfile.currentLocation || "Not Specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Career Preferences */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Candidate Profile & Preferences
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Preferred Role</span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">
                      {selectedProfile.preferredRole}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Experience</span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">
                      {selectedProfile.experience || "Fresher"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Availability</span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">
                      {selectedProfile.availability || "Immediate"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Work Mode</span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5">
                      {selectedProfile.preferredWorkMode || "Flexible"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resume & Profile Links */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Resume & Portfolio Links
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.resume?.url && (
                    <a
                      href={selectedProfile.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#1668E8] text-xs font-bold transition-all shadow-2xs"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Resume Document</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {selectedProfile.profileLinks?.portfolioUrl && (
                    <a
                      href={selectedProfile.profileLinks.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                    >
                      <span>Portfolio</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}

                  {selectedProfile.profileLinks?.githubUrl && (
                    <a
                      href={selectedProfile.profileLinks.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}

                  {selectedProfile.profileLinks?.linkedinUrl && (
                    <a
                      href={selectedProfile.profileLinks.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                    >
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}

                  {selectedProfile.profileUrl && !selectedProfile.profileLinks?.portfolioUrl && (
                    <a
                      href={selectedProfile.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                    >
                      <span>Profile Link</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Bio / Message */}
              {selectedProfile.message && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Candidate Note / Bio
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedProfile.message}
                  </div>
                </div>
              )}

              {/* Tags Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Recruiter Tags
                  </h3>
                  <span className="text-[11px] text-slate-400">Add skills or keywords</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {(selectedProfile.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1668E8] text-xs font-semibold"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove tag"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  {/* Add Tag Inline Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddTag();
                    }}
                    className="inline-flex items-center gap-1"
                  >
                    <input
                      type="text"
                      placeholder="+ Add Tag..."
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-[#1668E8] w-28"
                    />
                    {newTagInput && (
                      <button
                        type="submit"
                        disabled={isUpdatingTags}
                        className="p-1 rounded-full bg-[#1668E8] text-white hover:bg-[#1255c2] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    )}
                  </form>
                </div>
              </div>

              {/* Internal Notes Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Internal Recruiter Notes
                  </h3>
                  <span className="text-[11px] text-slate-400">Visible to team only</span>
                </div>

                {/* Add Note Form */}
                <div className="space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Write a recruiter note (e.g. Strong portfolio, follow up next month)..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8] resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddNote}
                      disabled={isAddingNote || !newNoteText.trim()}
                      className="px-4 py-2 rounded-xl bg-[#1668E8] hover:bg-[#1255c2] disabled:opacity-50 text-white text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      {isAddingNote ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                      <span>Add Note</span>
                    </button>
                  </div>
                </div>

                {/* Notes Timeline List */}
                <div className="space-y-2 pt-2">
                  {(selectedProfile.internalNotes || []).length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No notes recorded yet.</p>
                  ) : (
                    selectedProfile.internalNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 text-xs"
                      >
                        <p className="text-slate-800 font-medium whitespace-pre-wrap">
                          {note.text}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                          <span>{note.createdBy}</span>
                          <span>•</span>
                          <span>{formatDetailedDateTime(note.createdAt)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* CONVERT CANDIDATE TO APPLICATION MODAL */}
      {/* ========================================== */}
      {convertCandidate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto text-slate-800">
            <button
              type="button"
              onClick={() => setConvertCandidate(null)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleConvertSubmit} className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-[#1668E8] tracking-wider uppercase">
                  CONVERSION WORKFLOW
                </span>
                <h3 className="text-xl font-bold text-[#07152B]">
                  Convert Candidate to Application
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assign this talent profile to an active career opening.
                </p>
              </div>

              {conversionError && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{conversionError}</span>
                </div>
              )}

              {/* Candidate Info Summary Card */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">
                    {convertCandidate.fullName}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border">
                    {convertCandidate.profileId}
                  </span>
                </div>
                <p className="text-slate-600">
                  {convertCandidate.email} • {convertCandidate.phone}
                </p>
                <p className="text-slate-500">
                  Preferred Role: <strong>{convertCandidate.preferredRole}</strong>
                </p>
              </div>

              {/* Select Career Opening */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Career Opening *
                </label>
                <select
                  required
                  value={selectedOpeningId}
                  onChange={(e) => setSelectedOpeningId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                >
                  {publishedOpenings.map((op) => (
                    <option key={op.id} value={op.id}>
                      {op.title} ({op.department} • {op.location} • {op.openingType})
                    </option>
                  ))}
                </select>
                {publishedOpenings.length === 0 && (
                  <p className="text-xs text-red-600 mt-1">
                    No published openings available. Please publish an opening first.
                  </p>
                )}
              </div>

              {/* Initial Application Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Initial Application Status
                </label>
                <select
                  value={convertInitialStatus}
                  onChange={(e) => setConvertInitialStatus(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
                >
                  <option value="reviewing">Reviewing (Recommended)</option>
                  <option value="new">New</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Interview</option>
                </select>
              </div>

              {/* Missing / Editable Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Availability
                  </label>
                  <input
                    type="text"
                    value={convertAvailability}
                    onChange={(e) => setConvertAvailability(e.target.value)}
                    placeholder="e.g. Immediate"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work Mode
                  </label>
                  <input
                    type="text"
                    value={convertWorkMode}
                    onChange={(e) => setConvertWorkMode(e.target.value)}
                    placeholder="e.g. Remote / Hybrid"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={convertExperience}
                    onChange={(e) => setConvertExperience(e.target.value)}
                    placeholder="e.g. 2-4 Years"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={convertCompany}
                    onChange={(e) => setConvertCompany(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setConvertCandidate(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isConverting || publishedOpenings.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Creating Application...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Create Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
