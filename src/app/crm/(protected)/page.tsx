import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { projectInquiries } from "@/lib/db/schema";
import { desc, count, eq, and, isNull, isNotNull } from "drizzle-orm";
import { formatSource } from "@/lib/constants";
import {
  Inbox,
  ArrowRight,
  Clock,
  Building,
  Mail,
  Tag,
  Layers,
  Sparkles,
  Archive,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CrmDashboardPage() {
  // Fetch active project inquiries count
  const [projectCountRes] = await db
    .select({ value: count() })
    .from(projectInquiries)
    .where(and(eq(projectInquiries.inquiryType, "project"), isNull(projectInquiries.archivedAt)));
  const projectCount = projectCountRes?.value ?? 0;

  // Fetch active service requests count
  const [serviceCountRes] = await db
    .select({ value: count() })
    .from(projectInquiries)
    .where(and(eq(projectInquiries.inquiryType, "service"), isNull(projectInquiries.archivedAt)));
  const serviceCount = serviceCountRes?.value ?? 0;

  // Fetch active new / action required count
  const [newCountRes] = await db
    .select({ value: count() })
    .from(projectInquiries)
    .where(and(eq(projectInquiries.status, "new"), isNull(projectInquiries.archivedAt)));
  const newCount = newCountRes?.value ?? 0;

  // Fetch archived count
  const [archivedCountRes] = await db
    .select({ value: count() })
    .from(projectInquiries)
    .where(isNotNull(projectInquiries.archivedAt));
  const archivedCount = archivedCountRes?.value ?? 0;

  // Fetch latest 6 active inquiries
  const recentInquiries = await db
    .select()
    .from(projectInquiries)
    .where(isNull(projectInquiries.archivedAt))
    .orderBy(desc(projectInquiries.createdAt))
    .limit(6);

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
          Welcome to XSPACEWEB CRM. Manage and track project inquiries &amp; service requests.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Project Inquiries */}
        <Link
          href="/crm/inquiries"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Project Inquiries
            </span>
            <Inbox className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">
            {projectCount}
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span>View all project inquiries</span>
            <ArrowRight className="w-3 h-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </Link>

        {/* Service Requests */}
        <Link
          href="/crm/inquiries/services"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-purple-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
              Service Requests
            </span>
            <Layers className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-purple-600 mt-2">
            {serviceCount}
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span>View all service requests</span>
            <ArrowRight className="w-3 h-3 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </Link>

        {/* New / Action Required */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              New Inquiries
            </span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-blue-600 mt-2">
            {newCount}
          </div>
          <p className="text-xs text-slate-400 mt-1">Awaiting initial contact</p>
        </div>

        {/* Archived Requests */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Archived
            </span>
            <Archive className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-black text-slate-600 mt-2">
            {archivedCount}
          </div>
          <p className="text-xs text-slate-400 mt-1">Archived records</p>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Inquiries &amp; Requests</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest submissions across project and service forms
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/crm/inquiries"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1668E8] hover:text-blue-700 transition-colors"
            >
              <span>Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              href="/crm/inquiries/services"
              className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
            >
              <span>Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No inquiries yet.</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              When visitors submit forms on the website, they will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentInquiries.map((inquiry) => {
              const targetUrl =
                inquiry.inquiryType === "service"
                  ? "/crm/inquiries/services"
                  : "/crm/inquiries";

              return (
                <div
                  key={inquiry.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {inquiry.name}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded capitalize ${
                          inquiry.inquiryType === "service"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {inquiry.inquiryType === "service" ? "Service" : "Project"}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                          inquiry.status
                        )}`}
                      >
                        {inquiry.status}
                      </span>
                      <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {formatSource(inquiry.source)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
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
                      href={targetUrl}
                      className="text-xs font-semibold text-[#1668E8] hover:underline flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

