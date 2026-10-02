"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsArticle } from "@/lib/db/schema";
import {
  Newspaper,
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  Archive,
  ArchiveRestore,
  Eye,
  EyeOff,
  Star,
  Calendar,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  X,
  Send,
} from "lucide-react";

interface CrmNewsTableProps {
  initialArticles: NewsArticle[];
}

export const CrmNewsTable: React.FC<CrmNewsTableProps> = ({ initialArticles }) => {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Permanent Delete Modal state
  const [deleteModalArticle, setDeleteModalArticle] = useState<NewsArticle | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filter logic
  const filteredArticles = articles.filter((article) => {
    const isArchived = Boolean(article.archivedAt);

    // Filter by status tab
    if (statusFilter === "archived") {
      if (!isArchived) return false;
    } else {
      if (isArchived) return false; // Archived articles only shown in "archived" tab
      if (statusFilter !== "all" && article.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
    }

    // Filter by category
    if (categoryFilter !== "all" && article.category !== categoryFilter) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchCategory = article.category.toLowerCase().includes(q);
      const matchSummary = article.summary.toLowerCase().includes(q);
      const matchSlug = article.slug.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchSummary && !matchSlug) {
        return false;
      }
    }

    return true;
  });

  // Action: Toggle Publish / Unpublish
  const handleTogglePublish = async (article: NewsArticle) => {
    const nextStatus = article.status === "published" ? "unpublished" : "published";
    setIsProcessing(article.id);
    try {
      const res = await fetch(`/api/admin/news/${article.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setArticles((prev) =>
          prev.map((item) => (item.id === article.id ? data.article : item))
        );
        showToast(
          nextStatus === "published"
            ? "Article published successfully!"
            : "Article set to unpublished."
        );
      } else {
        alert("Failed to update status. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating status.");
    } finally {
      setIsProcessing(null);
    }
  };

  // Action: Toggle Archive / Restore
  const handleToggleArchive = async (article: NewsArticle) => {
    const isArchived = Boolean(article.archivedAt);
    setIsProcessing(article.id);
    try {
      const res = await fetch(`/api/admin/news/${article.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isArchived: !isArchived }),
      });
      if (res.ok) {
        const data = await res.json();
        setArticles((prev) =>
          prev.map((item) => (item.id === article.id ? data.article : item))
        );
        showToast(
          !isArchived
            ? "Article archived (hidden from public site)."
            : "Article restored from archive."
        );
      } else {
        alert("Failed to archive/restore article.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while archiving.");
    } finally {
      setIsProcessing(null);
    }
  };

  // Action: Permanent Delete
  const handleConfirmPermanentDelete = async () => {
    if (!deleteModalArticle) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/news/${deleteModalArticle.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setArticles((prev) => prev.filter((item) => item.id !== deleteModalArticle.id));
        showToast("Article permanently deleted.");
        setDeleteModalArticle(null);
      } else {
        alert("Failed to delete article permanently.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while deleting article.");
    } finally {
      setIsDeleting(false);
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Product Updates":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Company Updates":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Events":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Press Coverage":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Achievements":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "CSR":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusBadge = (status: string, isArchived: boolean) => {
    if (isArchived) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <Archive className="w-3 h-3" />
          Archived
        </span>
      );
    }
    switch (status.toLowerCase()) {
      case "published":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Published
          </span>
        );
      case "unpublished":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <EyeOff className="w-3 h-3" />
            Unpublished
          </span>
        );
      case "draft":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Draft
          </span>
        );
    }
  };

  // Counts for tabs
  const activeCount = articles.filter((a) => !a.archivedAt).length;
  const publishedCount = articles.filter((a) => !a.archivedAt && a.status === "published").length;
  const draftCount = articles.filter((a) => !a.archivedAt && a.status === "draft").length;
  const unpublishedCount = articles.filter((a) => !a.archivedAt && a.status === "unpublished").length;
  const archivedCount = articles.filter((a) => a.archivedAt).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            News & Updates
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage company announcements, product updates, and press releases.
          </p>
        </div>

        <Link
          href="/crm/news/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1668E8] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add News</span>
        </Link>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-100">
          {[
            { id: "all", label: "All Active", count: activeCount },
            { id: "published", label: "Published", count: publishedCount },
            { id: "draft", label: "Drafts", count: draftCount },
            { id: "unpublished", label: "Unpublished", count: unpublishedCount },
            { id: "archived", label: "Archived", count: archivedCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? "bg-blue-50 text-[#1668E8] font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                  statusFilter === tab.id
                    ? "bg-blue-200/60 text-[#1668E8]"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Category Filter Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, summary, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="w-full sm:w-56">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] text-slate-700"
            >
              <option value="all">All Categories</option>
              <option value="Company Updates">Company Updates</option>
              <option value="Product Updates">Product Updates</option>
              <option value="Events">Events</option>
              <option value="Press Coverage">Press Coverage</option>
              <option value="Achievements">Achievements</option>
              <option value="CSR">CSR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Newspaper className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium">No news articles found</p>
            <p className="text-xs text-slate-400 mt-1">
              {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your search query or filters."
                : "Get started by adding your first article."}
            </p>
            <Link
              href="/crm/news/new"
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1668E8] text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add News</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Article</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredArticles.map((article) => {
                  const isArchived = Boolean(article.archivedAt);
                  const isBusy = isProcessing === article.id;

                  return (
                    <tr
                      key={article.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Thumbnail & Title */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-11 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                            {article.coverImageUrl ? (
                              <Image
                                src={article.coverImageUrl}
                                alt={article.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <Newspaper className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 max-w-[280px] sm:max-w-xs">
                            <h4 className="font-bold text-slate-900 group-hover:text-[#1668E8] transition-colors truncate">
                              {article.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-mono truncate">
                              /{article.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${getCategoryBadgeClass(
                            article.category
                          )}`}
                        >
                          {article.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getStatusBadge(article.status, isArchived)}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {article.publishedAt
                              ? new Date(article.publishedAt).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "Not published"}
                          </span>
                        </div>
                      </td>

                      {/* Featured */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-center">
                        {article.isFeatured ? (
                          <span className="inline-flex items-center justify-center text-amber-500" title="Featured on homepage">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                          </span>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View on Public Site (if published & not archived) */}
                          {article.status === "published" && !isArchived && (
                            <>
                              <Link
                                href={`/news-and-updates/${article.slug}`}
                                target="_blank"
                                title="View on public site"
                                className="p-1.5 text-slate-400 hover:text-[#1668E8] hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                              <Link
                                href={`/crm/newsletter/send?subject=${encodeURIComponent(
                                  article.title
                                )}&headline=${encodeURIComponent(
                                  article.title
                                )}&content=${encodeURIComponent(
                                  article.summary
                                )}&ctaLabel=${encodeURIComponent(
                                  "Read Full Article"
                                )}&ctaUrl=${encodeURIComponent(
                                  `https://xspaceweb.com/news-and-updates/${article.slug}`
                                )}&imageUrl=${encodeURIComponent(
                                  article.coverImageUrl || ""
                                )}`}
                                title="Send as Newsletter"
                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              >
                                <Send className="w-4 h-4" />
                              </Link>
                            </>
                          )}

                          {/* Quick Publish / Unpublish Toggle */}
                          {!isArchived && (
                            <button
                              disabled={isBusy}
                              onClick={() => handleTogglePublish(article)}
                              title={article.status === "published" ? "Unpublish article" : "Publish article"}
                              className={`p-1.5 rounded-lg transition-colors ${
                                article.status === "published"
                                  ? "text-emerald-600 hover:bg-emerald-50"
                                  : "text-slate-400 hover:text-emerald-600 hover:bg-slate-100"
                              }`}
                            >
                              {isBusy ? (
                                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                              ) : article.status === "published" ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>
                          )}

                          {/* Edit */}
                          <Link
                            href={`/crm/news/${article.id}/edit`}
                            title="Edit article"
                            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          {/* Archive / Restore Toggle */}
                          <button
                            disabled={isBusy}
                            onClick={() => handleToggleArchive(article)}
                            title={isArchived ? "Restore from archive" : "Archive article"}
                            className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            {isArchived ? (
                              <ArchiveRestore className="w-4 h-4 text-purple-600" />
                            ) : (
                              <Archive className="w-4 h-4" />
                            )}
                          </button>

                          {/* Delete Permanently (requires confirmation modal) */}
                          <button
                            disabled={isBusy}
                            onClick={() => setDeleteModalArticle(article)}
                            title="Delete permanently"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* Confirmation Modal for Permanent Delete */}
      {deleteModalArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Delete Permanently?
                </h3>
                <p className="text-xs text-slate-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">
                &ldquo;{deleteModalArticle.title}&rdquo;
              </p>
              <p className="text-slate-500">
                Slug: <span className="font-mono">{deleteModalArticle.slug}</span>
              </p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Permanently deleting will erase the database record and delete its cover image from Cloudinary. For normal removal, consider using{" "}
              <strong className="text-slate-700">Archive</strong> instead.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteModalArticle(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmPermanentDelete}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
