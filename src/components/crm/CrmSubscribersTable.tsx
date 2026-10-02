"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NewsletterSubscriber } from "@/lib/db/schema";
import {
  Mail,
  Search,
  Send,
  Trash2,
  AlertTriangle,
  Loader2,
  UserCheck,
  UserX,
  Users,
  RefreshCw,
} from "lucide-react";

type FilterTab = "all" | "subscribed" | "unsubscribed";

export const CrmSubscribersTable: React.FC = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const [totalCount, setTotalCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [unsubscribedCount, setUnsubscribedCount] = useState(0);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<NewsletterSubscriber | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeTab !== "all") params.set("filter", activeTab);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/admin/newsletter/subscribers?${params.toString()}`);
      const data = await res.json();
      if (data.subscribers) {
        setSubscribers(data.subscribers);
        setTotalCount(data.totalCount || 0);
        setActiveCount(data.activeCount || 0);
        setUnsubscribedCount(data.unsubscribedCount || 0);
      }
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [activeTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubscribers();
  };

  const handleToggleStatus = async (subscriber: NewsletterSubscriber) => {
    const newStatus = subscriber.status === "subscribed" ? "unsubscribed" : "subscribed";
    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/newsletter/subscribers/${subscriber.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        await fetchSubscribers();
      }
    } catch (err) {
      console.error("Failed to toggle subscriber status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/newsletter/subscribers/${itemToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleteModalOpen(false);
        setItemToDelete(null);
        await fetchSubscribers();
      }
    } catch (err) {
      console.error("Failed to delete subscriber:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: `All (${totalCount})` },
    { key: "subscribed", label: `Active (${activeCount})` },
    { key: "unsubscribed", label: `Unsubscribed (${unsubscribedCount})` },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Compose Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Newsletter Subscribers
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Audience list synced with Neon and Resend Contacts.
          </p>
        </div>
        <Link
          href="/crm/newsletter/send"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1668E8] text-white text-xs sm:text-sm font-bold hover:bg-blue-700 transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Send Newsletter</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Audience
            </span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">{totalCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Total email signups</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Active Subscribers
            </span>
            <UserCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 mt-2">{activeCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Eligible for broadcasts</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Unsubscribed
            </span>
            <UserX className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 mt-2">{unsubscribedCount}</div>
          <p className="text-[11px] text-slate-400 mt-1">Opted out from emails</p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
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

        <form onSubmit={handleSearchSubmit} className="relative flex-1 md:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscriber by email..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1668E8]"
          />
        </form>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-[#1668E8]" />
            <span className="text-xs">Loading subscribers...</span>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No subscribers found.</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              When website visitors enter their email into the newsletter form, they will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Subscribed Date</th>
                  <th className="py-3 px-4">Resend Contact</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {subscribers.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Email */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.email}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.status === "subscribed" ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Subscribed
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                          Unsubscribed
                        </span>
                      )}
                    </td>

                    {/* Subscribed Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(item.subscribedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Resend Contact ID */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {item.resendContactId ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                          Synced
                        </span>
                      ) : (
                        <span className="text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          Local
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        {/* Toggle Subscribe / Unsubscribe */}
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item)}
                          disabled={actionLoading}
                          title={item.status === "subscribed" ? "Mark Unsubscribed" : "Mark Subscribed"}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer text-xs font-semibold ${
                            item.status === "subscribed"
                              ? "border-amber-200 text-amber-600 hover:bg-amber-50"
                              : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                          }`}
                        >
                          {item.status === "subscribed" ? "Opt Out" : "Re-subscribe"}
                        </button>

                        {/* Delete permanently */}
                        <button
                          type="button"
                          onClick={() => {
                            setItemToDelete(item);
                            setDeleteModalOpen(true);
                          }}
                          disabled={actionLoading}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Subscriber"
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
                <h3 className="text-base font-bold text-slate-900">Delete Subscriber?</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently remove{" "}
              <strong className="text-slate-900 font-bold">{itemToDelete.email}</strong> from your
              subscriber list?
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
                <span>Delete Subscriber</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
