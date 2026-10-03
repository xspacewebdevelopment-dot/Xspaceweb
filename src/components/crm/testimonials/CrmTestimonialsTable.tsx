"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageSquareQuote,
  GraduationCap,
  Plus,
  Search,
  Edit3,
  Trash2,
  Archive,
  ArchiveRestore,
  Eye,
  EyeOff,
  Star,
  MapPin,
  Building,
  CheckCircle2,
  X,
  Loader2,
  Quote,
} from "lucide-react";
import { Testimonial, TestimonialType } from "@/lib/db/schema";
import { CrmTestimonialModal } from "./CrmTestimonialModal";
import { CrmDeleteConfirmModal } from "./CrmDeleteConfirmModal";

interface CrmTestimonialsTableProps {
  type: TestimonialType;
  initialTestimonials: Testimonial[];
  clientCount?: number;
  internCount?: number;
}

export const CrmTestimonialsTable: React.FC<CrmTestimonialsTableProps> = ({
  type,
  initialTestimonials,
  clientCount,
  internCount,
}) => {
  const [items, setItems] = useState<Testimonial[]>(initialTestimonials);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [deleteItem, setDeleteItem] = useState<Testimonial | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const isArchived = Boolean(item.archivedAt);

    // Status filter
    if (statusFilter === "archived") {
      if (!isArchived) return false;
    } else {
      if (isArchived) return false;
      if (statusFilter !== "all" && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
    }

    // Rating filter (for client)
    if (type === "client" && ratingFilter !== "all") {
      if (item.rating !== parseInt(ratingFilter, 10)) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchCompany = item.company?.toLowerCase().includes(q) ?? false;
      const matchDesignation = item.designation?.toLowerCase().includes(q) ?? false;
      const matchHeadline = item.headline?.toLowerCase().includes(q) ?? false;
      const matchLocation = item.location?.toLowerCase().includes(q) ?? false;
      const matchText = item.testimonialText.toLowerCase().includes(q);

      if (!matchName && !matchCompany && !matchDesignation && !matchHeadline && !matchLocation && !matchText) {
        return false;
      }
    }

    return true;
  });

  // Action: Toggle Publish / Unpublish
  const handleTogglePublish = async (item: Testimonial) => {
    const nextStatus = item.status === "published" ? "unpublished" : "published";
    setIsProcessing(item.id);
    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setItems((prev) =>
          prev.map((t) => (t.id === item.id ? data.testimonial : t))
        );
        showToast(
          nextStatus === "published"
            ? "Testimonial published successfully!"
            : "Testimonial unpublished."
        );
      } else {
        showToast("Failed to update status.");
      }
    } catch {
      showToast("Error updating status.");
    } finally {
      setIsProcessing(null);
    }
  };

  // Action: Toggle Archive / Restore
  const handleToggleArchive = async (item: Testimonial) => {
    const willArchive = !item.archivedAt;
    setIsProcessing(item.id);
    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}/archive`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archive: willArchive }),
      });
      if (res.ok) {
        const data = await res.json();
        setItems((prev) =>
          prev.map((t) => (t.id === item.id ? data.testimonial : t))
        );
        showToast(
          willArchive
            ? "Testimonial archived (hidden from public)."
            : "Testimonial restored."
        );
      } else {
        showToast("Failed to update archive status.");
      }
    } catch {
      showToast("Error archiving testimonial.");
    } finally {
      setIsProcessing(null);
    }
  };

  // Action: Toggle Featured
  const handleToggleFeatured = async (item: Testimonial) => {
    const nextVal = !item.isFeatured;
    setIsProcessing(item.id);
    try {
      const res = await fetch(`/api/admin/testimonials/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: nextVal }),
      });
      if (res.ok) {
        const data = await res.json();
        setItems((prev) =>
          prev.map((t) => (t.id === item.id ? data.testimonial : t))
        );
        showToast(nextVal ? "Marked as Featured!" : "Removed from Featured.");
      }
    } catch {
      showToast("Error toggling featured status.");
    } finally {
      setIsProcessing(null);
    }
  };

  // Action: Permanent Delete
  const handleConfirmDelete = async () => {
    if (!deleteItem) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/testimonials/${deleteItem.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems((prev) => prev.filter((t) => t.id !== deleteItem.id));
        showToast("Testimonial permanently deleted.");
        setDeleteItem(null);
      } else {
        showToast("Failed to delete testimonial.");
      }
    } catch {
      showToast("Error deleting testimonial.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle saved from modal
  const handleSaved = (saved: Testimonial, isNew: boolean) => {
    if (isNew) {
      setItems((prev) => [saved, ...prev]);
      showToast("New testimonial added successfully!");
    } else {
      setItems((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
      showToast("Testimonial updated successfully!");
    }
  };

  const isClient = type === "client";

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#07152B] text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* TOP SECTION: Two-view switcher tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/80 self-start">
          <Link
            href="/crm/testimonials"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isClient
                ? "bg-white text-[#1668E8] shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Client Reviews</span>
            {clientCount !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isClient ? "bg-blue-50 text-[#1668E8]" : "bg-slate-200 text-slate-600"
                }`}
              >
                {clientCount}
              </span>
            )}
          </Link>

          <Link
            href="/crm/testimonials/interns"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              !isClient
                ? "bg-white text-[#1668E8] shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Intern Testimonials</span>
            {internCount !== undefined && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  !isClient ? "bg-blue-50 text-[#1668E8]" : "bg-slate-200 text-slate-600"
                }`}
              >
                {internCount}
              </span>
            )}
          </Link>
        </div>

        {/* Action Button: Add Review */}
        <button
          type="button"
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1668E8] text-white text-xs font-bold hover:bg-blue-700 shadow-sm active:scale-95 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isClient ? "Add Client Review" : "Add Intern Testimonial"}</span>
        </button>
      </div>

      {/* Title & Description */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-[#07152B] tracking-tight">
          {isClient ? "Client Reviews" : "Internship Testimonials"}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          {isClient
            ? "Manage customer feedback, ratings, and quotes displayed on the public website."
            : "Manage intern and student experiences showcased in the careers bento layout."}
        </p>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isClient
                  ? "Search by name, company, location, text..."
                  : "Search by name, internship role, headline..."
              }
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
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

          {/* Rating filter (for client) */}
          {isClient && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Rating:</span>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 scrollbar-none">
          {[
            { id: "all", label: "All" },
            { id: "published", label: "Published" },
            { id: "draft", label: "Draft" },
            { id: "unpublished", label: "Unpublished" },
            { id: "archived", label: "Archived" },
          ].map((tab) => {
            const countForTab = items.filter((item) => {
              if (tab.id === "archived") return Boolean(item.archivedAt);
              if (item.archivedAt) return false;
              if (tab.id === "all") return true;
              return item.status.toLowerCase() === tab.id;
            }).length;

            const isSelected = statusFilter === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? "bg-[#07152B] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? "bg-white/20 text-white" : "bg-white text-slate-500"
                  }`}
                >
                  {countForTab}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">{isClient ? "Client" : "Intern"}</th>
                <th className="py-3 px-4">{isClient ? "Role & Company" : "Role & Headline"}</th>
                <th className="py-3 px-4">Rating</th>
                {!isClient && <th className="py-3 px-4">Card Style</th>}
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan={isClient ? 7 : 8}
                    className="py-12 text-center text-slate-400"
                  >
                    <Quote className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-slate-600">No testimonials found</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Try adjusting your search or status filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const isArchived = Boolean(item.archivedAt);
                  const isBusy = isProcessing === item.id;

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/60 transition-colors ${
                        isArchived ? "opacity-60 bg-slate-50/30" : ""
                      }`}
                    >
                      {/* Column 1: Avatar, Name & Location */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                            {item.profileImageUrl ? (
                              <Image
                                src={item.profileImageUrl}
                                alt={item.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xs">
                                {item.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[#07152B] truncate">
                              {item.name}
                            </p>
                            {item.location && (
                              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                                <MapPin className="w-2.5 h-2.5 shrink-0" />
                                <span className="truncate">{item.location}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Role & Company / Headline */}
                      <td className="py-3 px-4">
                        {isClient ? (
                          <div>
                            <p className="font-medium text-slate-700 truncate">
                              {item.designation || "—"}
                            </p>
                            {item.company && (
                              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Building className="w-2.5 h-2.5 shrink-0" />
                                <span>{item.company}</span>
                              </p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium text-slate-700 truncate">
                              {item.designation || "—"}
                            </p>
                            {item.headline && (
                              <p className="text-[10px] text-blue-600 font-semibold truncate">
                                &ldquo;{item.headline}&rdquo;
                              </p>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Column 3: Rating */}
                      <td className="py-3 px-4">
                        {item.rating ? (
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-slate-400">None</span>
                        )}
                      </td>

                      {/* Column 4 (Intern Only): Card Style Variant */}
                      {!isClient && (
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                            {item.cardVariant || "standard"}
                          </span>
                        </td>
                      )}

                      {/* Column 5: Featured */}
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleToggleFeatured(item)}
                          className={`p-1 rounded-lg transition-colors cursor-pointer ${
                            item.isFeatured
                              ? "text-amber-500 hover:bg-amber-50"
                              : "text-slate-300 hover:text-slate-400 hover:bg-slate-100"
                          }`}
                          title={item.isFeatured ? "Featured" : "Click to feature"}
                        >
                          <Star
                            className={`w-4 h-4 ${item.isFeatured ? "fill-current" : ""}`}
                          />
                        </button>
                      </td>

                      {/* Column 6: Order */}
                      <td className="py-3 px-4 font-mono text-slate-600 text-xs">
                        {item.displayOrder}
                      </td>

                      {/* Column 7: Status */}
                      <td className="py-3 px-4">
                        {isArchived ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
                            Archived
                          </span>
                        ) : item.status === "published" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Published
                          </span>
                        ) : item.status === "draft" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                            Draft
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                            Unpublished
                          </span>
                        )}
                      </td>

                      {/* Column 8: Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* Edit button */}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingItem(item);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-slate-500 hover:text-[#1668E8] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Publish/Unpublish toggle */}
                          {!isArchived && (
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => handleTogglePublish(item)}
                              className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                              title={item.status === "published" ? "Unpublish" : "Publish"}
                            >
                              {item.status === "published" ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}

                          {/* Archive/Restore toggle */}
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleToggleArchive(item)}
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                            title={isArchived ? "Restore testimonial" : "Archive testimonial"}
                          >
                            {isArchived ? (
                              <ArchiveRestore className="w-3.5 h-3.5 text-amber-600" />
                            ) : (
                              <Archive className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Delete permanently */}
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => setDeleteItem(item)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Permanently Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create & Edit */}
      <CrmTestimonialModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSaved={handleSaved}
        initialData={editingItem}
        defaultType={type}
      />

      {/* Modal: Delete Confirmation */}
      <CrmDeleteConfirmModal
        isOpen={Boolean(deleteItem)}
        testimonial={deleteItem}
        isDeleting={isDeleting}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
