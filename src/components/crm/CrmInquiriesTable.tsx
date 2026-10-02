"use client";

import React, { useState } from "react";
import { ProjectInquiry, InquiryStatus, inquiryStatusEnum } from "@/lib/db/schema";
import { formatSource } from "@/lib/constants";
import {
  Inbox,
  Search,
  X,
  Mail,
  Phone,
  Building,
  Tag,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Archive,
  RotateCcw,
  Trash2,
  AlertTriangle,
  Loader2,
  Layers,
} from "lucide-react";

interface CrmInquiriesTableProps {
  initialInquiries: ProjectInquiry[];
  inquiryType?: "project" | "service" | "all";
  showTypeBadge?: boolean;
}

export const CrmInquiriesTable: React.FC<CrmInquiriesTableProps> = ({
  initialInquiries,
  inquiryType = "all",
  showTypeBadge = false,
}) => {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewTab, setViewTab] = useState<"active" | "archived">("active");

  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Filter based on viewTab (active vs archived), inquiryType, status, and search query
  const filteredInquiries = inquiries.filter((inquiry) => {
    // 1. Archive filter
    const isArchived = Boolean(inquiry.archivedAt);
    if (viewTab === "active" && isArchived) return false;
    if (viewTab === "archived" && !isArchived) return false;

    // 2. Type filter
    if (inquiryType !== "all" && inquiry.inquiryType !== inquiryType) {
      return false;
    }

    // 3. Search query filter
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inquiry.company && inquiry.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inquiry.service && inquiry.service.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inquiry.source && formatSource(inquiry.source).toLowerCase().includes(searchQuery.toLowerCase()));

    // 4. Status filter
    const matchesStatus =
      statusFilter === "all" || inquiry.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const activeCount = inquiries.filter(
    (i) => !i.archivedAt && (inquiryType === "all" || i.inquiryType === inquiryType)
  ).length;

  const archivedCount = inquiries.filter(
    (i) => Boolean(i.archivedAt) && (inquiryType === "all" || i.inquiryType === inquiryType)
  ).length;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "contacted":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "qualified":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "closed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const handleStatusChange = async (inquiryId: string, newStatus: InquiryStatus) => {
    try {
      setIsUpdatingStatus(true);
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      const data = await res.json();
      const updatedInquiry = data.inquiry as ProjectInquiry;

      // Update state in table list
      setInquiries((prev) =>
        prev.map((item) => (item.id === inquiryId ? updatedInquiry : item))
      );

      // Update selected drawer inquiry
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(updatedInquiry);
      }

      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 2000);
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleToggleArchive = async (inquiryId: string, shouldArchive: boolean) => {
    try {
      setIsArchiving(true);
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archived: shouldArchive }),
      });

      if (!res.ok) {
        throw new Error("Failed to update archive status");
      }

      const data = await res.json();
      const updatedInquiry = data.inquiry as ProjectInquiry;

      // Update state in table list
      setInquiries((prev) =>
        prev.map((item) => (item.id === inquiryId ? updatedInquiry : item))
      );

      // Close drawer or update selected
      setSelectedInquiry(null);
    } catch (err) {
      console.error("Archive update error:", err);
      alert("Failed to update archive status. Please try again.");
    } finally {
      setIsArchiving(false);
    }
  };

  const handlePermanentDelete = async (inquiryId: string) => {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete inquiry");
      }

      // Remove from state
      setInquiries((prev) => prev.filter((item) => item.id !== inquiryId));
      setSelectedInquiry(null);
      setDeleteModalOpen(false);
    } catch (err) {
      console.error("Delete inquiry error:", err);
      alert("Failed to permanently delete inquiry. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar: View Tabs + Search + Status Filters */}
      <div className="flex flex-col gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Row 1: Active / Archived Switch & Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Active / Archived Tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setViewTab("active")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewTab === "active"
                  ? "bg-white text-[#1668E8] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Active ({activeCount})
            </button>
            <button
              type="button"
              onClick={() => setViewTab("archived")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewTab === "archived"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Archived ({archivedCount})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, company, service, source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#1668E8] rounded-xl text-xs sm:text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Row 2: Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <span>Status:</span>
          </span>
          {["all", "new", "contacted", "qualified", "closed"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all capitalize whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? "bg-[#1668E8] text-white shadow-2xs"
                  : "bg-slate-100/80 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredInquiries.length === 0 ? (
          <div className="py-16 px-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No inquiries found</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || statusFilter !== "all"
                ? "Try clearing your search or filter to see more inquiries."
                : viewTab === "archived"
                ? "No archived inquiries."
                : "No inquiries have been submitted yet in this view."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 sm:px-6">Name</th>
                  <th className="py-3 px-4 sm:px-6">Email</th>
                  <th className="py-3 px-4 sm:px-6">Company</th>
                  <th className="py-3 px-4 sm:px-6">Service</th>
                  <th className="py-3 px-4 sm:px-6">Source</th>
                  <th className="py-3 px-4 sm:px-6">Status</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    onClick={() => setSelectedInquiry(inquiry)}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 flex items-center gap-2">
                      <span>{inquiry.name}</span>
                      {showTypeBadge && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded capitalize ${
                            inquiry.inquiryType === "service"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {inquiry.inquiryType}
                        </span>
                      )}
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all ml-auto sm:ml-0" />
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-600 font-mono text-xs">
                      {inquiry.email}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                      {inquiry.company || <span className="text-slate-300">—</span>}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                      {inquiry.service || <span className="text-slate-300">—</span>}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-600 text-xs">
                      <span className="inline-block bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-700">
                        {formatSource(inquiry.source)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                          inquiry.status
                        )}`}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right text-slate-500 font-medium text-xs whitespace-nowrap">
                      {new Date(inquiry.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Slide-Over / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 relative">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {/* Type Badge */}
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    selectedInquiry.inquiryType === "service"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedInquiry.inquiryType === "service" ? "Service Request" : "Project Inquiry"}
                </span>

                {/* Source Badge */}
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  Source: {formatSource(selectedInquiry.source)}
                </span>

                {/* Status Badge */}
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                    selectedInquiry.status
                  )}`}
                >
                  {selectedInquiry.status}
                </span>

                {/* Archived Badge if applicable */}
                {selectedInquiry.archivedAt && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    Archived
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {selectedInquiry.name}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  Submitted on{" "}
                  {new Date(selectedInquiry.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
            </div>

            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Email</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="font-semibold text-[#1668E8] hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{selectedInquiry.email}</span>
                </a>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Phone</span>
                {selectedInquiry.phone ? (
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="font-semibold text-slate-800 hover:text-blue-600 flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedInquiry.phone}</span>
                  </a>
                ) : (
                  <span className="text-slate-400">Not provided</span>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Company</span>
                <p className="font-semibold text-slate-800 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedInquiry.company || "Not specified"}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  {selectedInquiry.inquiryType === "service" ? "Selected Service(s)" : "Requested Service"}
                </span>
                <p className="font-semibold text-slate-800 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedInquiry.service || "General Inquiry"}</span>
                </p>
              </div>
            </div>

            {/* Project / Requirement Message */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {selectedInquiry.inquiryType === "service"
                  ? "Requirement / Project Description"
                  : "Project Details / Message"}
              </span>
              <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 text-slate-800 text-sm whitespace-pre-wrap leading-relaxed">
                {selectedInquiry.message || "No additional details provided."}
              </div>
            </div>

            {/* Update Status Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Change Status</span>
                {updateSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Status Updated!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {inquiryStatusEnum.map((st) => {
                  const isCurrent = selectedInquiry.status === st;
                  return (
                    <button
                      key={st}
                      type="button"
                      disabled={isUpdatingStatus || isCurrent}
                      onClick={() => handleStatusChange(selectedInquiry.id, st)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer border ${
                        isCurrent
                          ? "bg-[#1668E8] text-white border-[#1668E8] shadow-xs cursor-default"
                          : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"
                      } disabled:opacity-50`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Record Management: Archive / Restore / Permanent Delete */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
              {selectedInquiry.archivedAt ? (
                /* Restore Option */
                <button
                  type="button"
                  disabled={isArchiving}
                  onClick={() => handleToggleArchive(selectedInquiry.id, false)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Request</span>
                </button>
              ) : (
                /* Archive Option */
                <button
                  type="button"
                  disabled={isArchiving}
                  onClick={() => handleToggleArchive(selectedInquiry.id, true)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Archive Request</span>
                </button>
              )}

              {/* Permanent Delete Option */}
              <button
                type="button"
                onClick={() => setDeleteModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Permanently</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Permanent Deletion Confirmation Modal */}
      {deleteModalOpen && selectedInquiry && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md p-6 sm:p-7 space-y-5 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-slate-900">Delete permanently?</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This action cannot be undone. Are you sure you want to permanently delete the inquiry from{" "}
                <span className="font-bold text-slate-900">{selectedInquiry.name}</span>?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handlePermanentDelete(selectedInquiry.id)}
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

