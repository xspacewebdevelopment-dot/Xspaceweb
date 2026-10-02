"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { EventItem } from "@/lib/db/schema";
import {
  Calendar,
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
  MapPin,
  Clock,
  Globe,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  X,
  Send,
} from "lucide-react";

interface CrmEventsTableProps {
  initialEvents: EventItem[];
}

export const CrmEventsTable: React.FC<CrmEventsTableProps> = ({ initialEvents }) => {
  const [eventList, setEventList] = useState<EventItem[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<string>("all");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Permanent Delete Modal
  const [deleteModalEvent, setDeleteModalEvent] = useState<EventItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Filter items
  const filteredEvents = eventList.filter((event) => {
    const isArchived = Boolean(event.archivedAt);
    const eventTime = new Date(event.eventDate).getTime();
    const isUpcoming = eventTime >= startOfToday.getTime();
    const isPast = eventTime < startOfToday.getTime();

    if (filterTab === "archived") {
      if (!isArchived) return false;
    } else {
      if (isArchived) return false;

      if (filterTab === "upcoming" && !isUpcoming) return false;
      if (filterTab === "past" && !isPast) return false;
      if (filterTab === "draft" && event.status !== "draft") return false;
      if (filterTab === "published" && event.status !== "published") return false;
      if (filterTab === "unpublished" && event.status !== "unpublished") return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = event.title.toLowerCase().includes(q);
      const matchLocation = event.location.toLowerCase().includes(q);
      const matchDesc = event.shortDescription.toLowerCase().includes(q);
      if (!matchTitle && !matchLocation && !matchDesc) return false;
    }

    return true;
  });

  // Action: Toggle Publish / Unpublish
  const handleTogglePublish = async (event: EventItem) => {
    const nextStatus = event.status === "published" ? "unpublished" : "published";
    setIsProcessing(event.id);
    try {
      const res = await fetch(`/api/admin/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        const data = await res.json();
        setEventList((prev) =>
          prev.map((item) => (item.id === event.id ? data.event : item))
        );
        showToast(
          nextStatus === "published"
            ? "Event published successfully!"
            : "Event unpublished."
        );
      } else {
        alert("Failed to update event status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while updating status.");
    } finally {
      setIsProcessing(null);
    }
  };

  // Action: Toggle Archive / Restore
  const handleToggleArchive = async (event: EventItem) => {
    const isArchived = Boolean(event.archivedAt);
    setIsProcessing(event.id);
    try {
      const res = await fetch(`/api/admin/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isArchived: !isArchived }),
      });
      if (res.ok) {
        const data = await res.json();
        setEventList((prev) =>
          prev.map((item) => (item.id === event.id ? data.event : item))
        );
        showToast(
          !isArchived
            ? "Event archived (removed from public site)."
            : "Event restored from archive."
        );
      } else {
        alert("Failed to archive/restore event.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while archiving event.");
    } finally {
      setIsProcessing(null);
    }
  };

  // Action: Permanent Delete
  const handleConfirmPermanentDelete = async () => {
    if (!deleteModalEvent) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/events/${deleteModalEvent.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEventList((prev) => prev.filter((item) => item.id !== deleteModalEvent.id));
        showToast("Event permanently deleted.");
        setDeleteModalEvent(null);
      } else {
        alert("Failed to permanently delete event.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while deleting event.");
    } finally {
      setIsDeleting(false);
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

  // Tab counts
  const activeCount = eventList.filter((e) => !e.archivedAt).length;
  const upcomingCount = eventList.filter(
    (e) => !e.archivedAt && new Date(e.eventDate).getTime() >= startOfToday.getTime()
  ).length;
  const pastCount = eventList.filter(
    (e) => !e.archivedAt && new Date(e.eventDate).getTime() < startOfToday.getTime()
  ).length;
  const publishedCount = eventList.filter((e) => !e.archivedAt && e.status === "published").length;
  const draftCount = eventList.filter((e) => !e.archivedAt && e.status === "draft").length;
  const archivedCount = eventList.filter((e) => e.archivedAt).length;

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
            Events & Webinars
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage conferences, live showcases, online workshops, and partner meets.
          </p>
        </div>

        <Link
          href="/crm/events/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1668E8] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </Link>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-100">
          {[
            { id: "all", label: "All Active", count: activeCount },
            { id: "upcoming", label: "Upcoming", count: upcomingCount },
            { id: "past", label: "Past", count: pastCount },
            { id: "published", label: "Published", count: publishedCount },
            { id: "draft", label: "Drafts", count: draftCount },
            { id: "archived", label: "Archived", count: archivedCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTab(tab.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                filterTab === tab.id
                  ? "bg-blue-50 text-[#1668E8] font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                  filterTab === tab.id
                    ? "bg-blue-200/60 text-[#1668E8]"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events by title, location, or summary..."
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
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {filteredEvents.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Calendar className="w-10 h-10 mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-medium">No events found</p>
            <p className="text-xs text-slate-400 mt-1">
              {searchQuery || filterTab !== "all"
                ? "Try adjusting your search or tab filters."
                : "Get started by scheduling your first event."}
            </p>
            <Link
              href="/crm/events/new"
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1668E8] text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Event</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4">Date &amp; Time</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredEvents.map((event) => {
                  const isArchived = Boolean(event.archivedAt);
                  const isBusy = isProcessing === event.id;
                  const eventDateObj = new Date(event.eventDate);
                  const isPast = eventDateObj.getTime() < startOfToday.getTime();

                  return (
                    <tr
                      key={event.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Thumbnail & Title */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-11 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                            {event.coverImageUrl ? (
                              <Image
                                src={event.coverImageUrl}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <Calendar className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 max-w-[280px]">
                            <h4 className="font-bold text-slate-900 group-hover:text-[#1668E8] transition-colors truncate">
                              {event.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 font-mono truncate">
                              /{event.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                            <span>
                              {eventDateObj.toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                            {isPast && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-100 text-slate-500 uppercase">
                                Past
                              </span>
                            )}
                          </div>
                          {(event.startTime || event.endTime) && (
                            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                              <Clock className="w-3 h-3" />
                              <span>
                                {event.startTime}
                                {event.endTime ? ` - ${event.endTime}` : ""}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 max-w-[200px] truncate">
                          {event.locationType === "online" ? (
                            <Globe className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          )}
                          <span className="truncate">{event.location}</span>
                        </div>
                      </td>

                      {/* Featured */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-center">
                        {event.isFeatured ? (
                          <span className="inline-flex items-center justify-center text-amber-500" title="Featured prominently on events section">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                          </span>
                        ) : (
                          <span className="text-slate-300 text-xs">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getStatusBadge(event.status, isArchived)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View on Public Site */}
                          {event.status === "published" && !isArchived && (
                            <>
                              <Link
                                href={`/news-and-updates/events/${event.slug}`}
                                target="_blank"
                                title="View on public site"
                                className="p-1.5 text-slate-400 hover:text-[#1668E8] hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>
                              <Link
                                href={`/crm/newsletter/send?subject=${encodeURIComponent(
                                  `Upcoming Event: ${event.title}`
                                )}&headline=${encodeURIComponent(
                                  event.title
                                )}&content=${encodeURIComponent(
                                  `${event.shortDescription}\n\nDate: ${new Date(
                                    event.eventDate
                                  ).toLocaleDateString("en-GB", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}\nLocation: ${event.location}`
                                )}&ctaLabel=${encodeURIComponent(
                                  "View Event & Register"
                                )}&ctaUrl=${encodeURIComponent(
                                  `https://xspaceweb.com/news-and-updates/events/${event.slug}`
                                )}&imageUrl=${encodeURIComponent(
                                  event.coverImageUrl || ""
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
                              onClick={() => handleTogglePublish(event)}
                              title={event.status === "published" ? "Unpublish event" : "Publish event"}
                              className={`p-1.5 rounded-lg transition-colors ${
                                event.status === "published"
                                  ? "text-emerald-600 hover:bg-emerald-50"
                                  : "text-slate-400 hover:text-emerald-600 hover:bg-slate-100"
                              }`}
                            >
                              {isBusy ? (
                                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                              ) : event.status === "published" ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>
                          )}

                          {/* Edit */}
                          <Link
                            href={`/crm/events/${event.id}/edit`}
                            title="Edit event"
                            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>

                          {/* Archive / Restore Toggle */}
                          <button
                            disabled={isBusy}
                            onClick={() => handleToggleArchive(event)}
                            title={isArchived ? "Restore from archive" : "Archive event"}
                            className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            {isArchived ? (
                              <ArchiveRestore className="w-4 h-4 text-purple-600" />
                            ) : (
                              <Archive className="w-4 h-4" />
                            )}
                          </button>

                          {/* Delete Permanently */}
                          <button
                            disabled={isBusy}
                            onClick={() => setDeleteModalEvent(event)}
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
      {deleteModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Delete Event Permanently?
                </h3>
                <p className="text-xs text-slate-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">
                &ldquo;{deleteModalEvent.title}&rdquo;
              </p>
              <p className="text-slate-500">
                Date: {new Date(deleteModalEvent.eventDate).toLocaleDateString()}
              </p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Permanently deleting will erase the database record, delete its cover image from Cloudinary, and safely detach any associated gallery photos. For normal removal, consider using{" "}
              <strong className="text-slate-700">Archive</strong> instead.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteModalEvent(null)}
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
