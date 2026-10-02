import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { projectInquiries } from "@/lib/db/schema";
import { desc, count, eq } from "drizzle-orm";
import { Inbox, ArrowRight, Clock, Building, Mail, Phone, Tag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CrmDashboardPage() {
  // Fetch total inquiries count
  const [totalRes] = await db.select({ value: count() }).from(projectInquiries);
  const totalCount = totalRes?.value ?? 0;

  // Fetch status breakdown counts
  const [newCountRes] = await db
    .select({ value: count() })
    .from(projectInquiries)
    .where(eq(projectInquiries.status, "new"));
  const newCount = newCountRes?.value ?? 0;

  // Fetch latest 5 inquiries
  const recentInquiries = await db
    .select()
    .from(projectInquiries)
    .orderBy(desc(projectInquiries.createdAt))
    .limit(5);

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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Welcome to XSPACEWEB CRM. Manage and track project inquiries.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Project Inquiries
          </span>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {totalCount}
          </div>
          <p className="text-xs text-slate-400 mt-1">Total received to date</p>
        </div>

        {/* New / Action Required */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            New Inquiries
          </span>
          <div className="text-3xl font-black text-blue-600 mt-2">
            {newCount}
          </div>
          <p className="text-xs text-slate-400 mt-1">Awaiting initial contact</p>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Inquiries</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest submissions from website forms
            </p>
          </div>
          {recentInquiries.length > 0 && (
            <Link
              href="/crm/inquiries"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1668E8] hover:text-blue-700 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {recentInquiries.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No inquiries yet.</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              When visitors submit the &quot;Have a Project in Mind?&quot; form on the website, they will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {inquiry.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                        inquiry.status
                      )}`}
                    >
                      {inquiry.status}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      via {inquiry.source}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      {inquiry.email}
                    </span>
                    {inquiry.company && (
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400" />
                        {inquiry.company}
                      </span>
                    )}
                    {inquiry.service && (
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3 text-slate-400" />
                        {inquiry.service}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(inquiry.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    href={`/crm/inquiries`}
                    className="text-xs font-semibold text-[#1668E8] hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
