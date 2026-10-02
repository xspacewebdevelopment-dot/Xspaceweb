"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MediaMentionItem } from "@/lib/db/schema";
import {
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Archive,
  RotateCcw,
  Trash2,
  AlertTriangle,
  Loader2,
  Newspaper,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type FilterTab = "all" | "published" | "draft" | "unpublished" | "archived";

export const CrmMediaTable: React.FC = () => {
  const [mentions, setMentions] = useState<MediaMentionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<MediaMentionItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMentions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeTab !== "all") params.set("filter", activeTab);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/admin/media?${params.toString()}`);
      const data = await res.json();
      if (data.mentions) {
        setMentions(data.mentions);
      }
    } catch (err) {
      console.error("Failed to fetch media mentions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentions();
  }, [activeTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMentions();
  };

  const handleTogglePublish = async (item: MediaMentionItem) => {
    const newStatus = item.status === "published" ? "unpublished" : "published";
    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/media/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        await fetchMentions();
      }
    } catch (err) {
      console.error("Failed to toggle publish status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleArchive = async (item: MediaMentionItem) => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/media/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "archive" }),
      });
      if (res.ok) {
        await fetchMentions();
      }
    } catch (err) {
      console.error("Failed to archive mention:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestore = async (item: MediaMentionItem) => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/media/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore" }),
      });
      if (res.ok) {
        await fetchMentions();
      }
    } catch (err) {
      console.error("Failed to restore mention:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/media/${itemToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleteModalOpen(false);
        setItemToDelete(null);
        await fetchMentions();
      }
    } catch (err) {
      console.error("Failed to delete mention:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All Active" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Draft" },
    { key: "unpublished", label: "Unpublished" },
    { key: "archived", label: "Archived" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Add Mention button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Media Mentions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage press coverage, publication quotes, and external media features.
          </p>
        </div>
        <Link
          href="/crm/media/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1668E8] text-white text-xs sm:text-sm font-bold hover:bg-blue-700 transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Mention</span>
        </Link>
      </div>

      {/* Tabs & Search Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? "bg-[#1668E8] text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 md:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search publication or headline..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1668E8]"
          />
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-[#1668E8]" />
            <span className="text-xs">Loading media mentions...</span>
          </div>
        ) : mentions.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Newspaper className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No media mentions found.</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Add a new press mention or adjust your search filters to view coverage.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Publication</th>
                  <th className="py-3 px-4">Headline</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {mentions.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Publication & Logo */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                          {item.logoUrl ? (
                            <Image
                              src={item.logoUrl}
                              alt={item.publicationName}
                              fill
                              className="object-contain p-0.5"
                            />
                          ) : (
                            <span className="font-serif font-black text-xs text-slate-600 uppercase">
                              {item.publicationName.slice(0, 2)}
                            </span>
                          )}
                        </div>
                        <span className="font-bold text-slate-900 line-clamp-1">
                          {item.publicationName}
                        </span>
                      </div>
                    </td>

                    {/* Headline */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <a
                        href={item.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-slate-800 hover:text-[#1668E8] transition-colors line-clamp-2 leading-snug flex items-start gap-1 group"
                      >
                        <span>{item.headline}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#1668E8] shrink-0 mt-0.5" />
                      </a>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>

                    {/* Display Order */}
                    <td className="py-3.5 px-4 text-slate-500 font-mono font-semibold">
                      {item.displayOrder}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.archivedAt ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                          Archived
                        </span>
                      ) : item.status === "published" ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Published
                        </span>
                      ) : item.status === "unpublished" ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                          Unpublished
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Publish / Unpublish Toggle */}
                        {!item.archivedAt && (
                          <button
                            type="button"
                            onClick={() => handleTogglePublish(item)}
                            disabled={actionLoading}
                            title={item.status === "published" ? "Unpublish" : "Publish"}
                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                              item.status === "published"
                                ? "border-amber-200 text-amber-600 hover:bg-amber-50"
                                : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                            }`}
                          >
                            {item.status === "published" ? (
                              <XCircle className="w-3.5 h-3.5" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}

                        {/* Edit */}
                        <Link
                          href={`/crm/media/${item.id}/edit`}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-[#1668E8] hover:border-blue-200 hover:bg-blue-50 transition-colors"
                          title="Edit Mention"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>

                        {/* Archive or Restore */}
                        {item.archivedAt ? (
                          <button
                            type="button"
                            onClick={() => handleRestore(item)}
                            disabled={actionLoading}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-colors cursor-pointer"
                            title="Restore Mention"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleArchive(item)}
                            disabled={actionLoading}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-colors cursor-pointer"
                            title="Archive Mention"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete permanently */}
                        <button
                          type="button"
                          onClick={() => {
                            setItemToDelete(item);
                            setDeleteModalOpen(true);
                          }}
                          disabled={actionLoading}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Permanently Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Media Mention?</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-slate-900 font-bold">&quot;{itemToDelete.headline}&quot;</strong>{" "}
              from <span className="font-semibold">{itemToDelete.publicationName}</span>?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setItemToDelete(null);
                }}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                {actionLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
