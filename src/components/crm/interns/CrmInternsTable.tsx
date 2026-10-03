"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Search,
  Plus,
  Eye,
  Edit3,
  Trash2,
  Award,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Globe,
  Loader2,
  Filter,
} from "lucide-react";
import { Intern, InternStatus } from "@/lib/db/schema";
import { CrmInternDeleteModal } from "./CrmInternDeleteModal";
import { CertificationModal } from "@/components/certification/CertificationModal";
import { getCertificateSerialNumber } from "@/lib/certificate-generator";

interface CrmInternsTableProps {
  initialInterns: Intern[];
}

export const CrmInternsTable: React.FC<CrmInternsTableProps> = ({
  initialInterns,
}) => {
  const [internList, setInternList] = useState<Intern[]>(initialInterns);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modals state
  const [deleteIntern, setDeleteIntern] = useState<Intern | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedInternForCert, setSelectedInternForCert] = useState<Intern | null>(null);

  // Inline action state
  const [togglingPublishId, setTogglingPublishId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyId = (idText: string) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(idText);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle Published
  const handleTogglePublish = async (intern: Intern) => {
    setTogglingPublishId(intern.id);
    try {
      const res = await fetch(`/api/admin/interns/${intern.id}/publish`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update publish state");

      setInternList((prev) =>
        prev.map((item) =>
          item.id === intern.id ? { ...item, isPublished: data.isPublished } : item
        )
      );
      showToast(
        data.isPublished
          ? `${intern.fullName} is now searchable publicly.`
          : `${intern.fullName} is now hidden from public search.`
      );
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Error toggling status");
    } finally {
      setTogglingPublishId(null);
    }
  };

  // Delete Intern Confirm
  const handleConfirmDelete = async () => {
    if (!deleteIntern) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/interns/${deleteIntern.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete intern record");

      setInternList((prev) => prev.filter((item) => item.id !== deleteIntern.id));
      showToast(`Intern ${deleteIntern.fullName} deleted permanently.`);
      setDeleteIntern(null);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Deletion failed");
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered List
  const filteredInterns = internList.filter((intern) => {
    if (statusFilter !== "all" && intern.status !== statusFilter) {
      return false;
    }
    if (departmentFilter !== "all" && intern.department !== departmentFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = intern.fullName.toLowerCase().includes(q);
      const matchEmail = intern.email.toLowerCase().includes(q);
      const matchRole = intern.role.toLowerCase().includes(q);
      const matchId = intern.internshipId.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchRole && !matchId) {
        return false;
      }
    }
    return true;
  });

  // Unique departments for filter
  const departments = Array.from(
    new Set(internList.map((i) => i.department).filter(Boolean))
  );

  // Counts
  const totalCount = internList.length;
  const activeCount = internList.filter((i) => i.status === "ACTIVE").length;
  const completedCount = internList.filter((i) => i.status === "COMPLETED").length;
  const certCount = internList.filter((i) => Boolean(i.certificateFile)).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "ON_HOLD":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "TERMINATED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-semibold shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Internship Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage student cohorts, official completion certificates, and public verification credentials.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/crm/interns/certificates"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors shadow-2xs"
          >
            <Award className="w-4 h-4 text-[#1668E8]" />
            <span>Certificates Overview</span>
          </Link>

          <Link
            href="/crm/interns/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Intern</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Interns
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalCount}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-blue-500 uppercase tracking-wider block">
            Active Cohort
          </span>
          <div className="text-2xl font-black text-blue-600 mt-1">{activeCount}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider block">
            Completed
          </span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{completedCount}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider block">
            Certificates Issued
          </span>
          <div className="text-2xl font-black text-indigo-600 mt-1">{certCount}</div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID, email, role..."
              className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1668E8]"
            />
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer"
            >
              <option value="all">All Departments</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap border-t border-slate-100 pt-3">
          {[
            { key: "all", label: "All Interns", count: totalCount },
            { key: "ACTIVE", label: "Active", count: activeCount },
            { key: "COMPLETED", label: "Completed", count: completedCount },
            {
              key: "ON_HOLD",
              label: "On Hold",
              count: internList.filter((i) => i.status === "ON_HOLD").length,
            },
            {
              key: "TERMINATED",
              label: "Terminated",
              count: internList.filter((i) => i.status === "TERMINATED").length,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                statusFilter === tab.key
                  ? "bg-[#1668E8] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  statusFilter === tab.key ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4">Intern</th>
                <th className="py-3.5 px-4">Internship ID</th>
                <th className="py-3.5 px-4">Role & Dept</th>
                <th className="py-3.5 px-4">Timeline</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Certificate</th>
                <th className="py-3.5 px-4">Published</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredInterns.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No intern records found</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {searchQuery
                        ? "Try adjusting your search query or filter."
                        : "Click 'Add Intern' above to create the first record."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredInterns.map((intern) => (
                  <tr
                    key={intern.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Intern Photo + Name + Contact */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-200">
                          {intern.profileImage ? (
                            <Image
                              src={intern.profileImage}
                              alt={intern.fullName}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 bg-slate-100">
                              {intern.fullName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/crm/interns/${intern.id}`}
                            className="font-bold text-slate-900 hover:text-[#1668E8] transition-colors truncate block"
                          >
                            {intern.fullName}
                          </Link>
                          <span className="text-[11px] text-slate-400 truncate block">
                            {intern.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Internship ID with Copy */}
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleCopyId(intern.internshipId)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-[#1668E8] font-mono font-bold text-xs tracking-wider transition-colors cursor-pointer group/btn"
                        title="Click to copy ID"
                      >
                        <span>{intern.internshipId}</span>
                        {copiedId === intern.internshipId ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400 group-hover/btn:text-slate-600" />
                        )}
                      </button>
                    </td>

                    {/* Role & Department */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{intern.role}</div>
                      <div className="text-[10px] text-slate-400">
                        {intern.department} • {intern.internshipType}
                      </div>
                    </td>

                    {/* Dates & Duration */}
                    <td className="py-3.5 px-4">
                      <div className="text-slate-700 font-medium">
                        {new Date(intern.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        →{" "}
                        {new Date(intern.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {intern.duration || "3 Months"}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getStatusBadge(
                          intern.status
                        )}`}
                      >
                        {intern.status}
                      </span>
                    </td>

                    {/* Certificate Status */}
                    <td className="py-3.5 px-4">
                      {new Date().getTime() >= new Date(intern.endDate).getTime() ||
                      intern.status === "COMPLETED" ? (
                        <button
                          type="button"
                          onClick={() => setSelectedInternForCert(intern)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[10px] font-bold transition-colors cursor-pointer"
                          title="Preview Auto-Generated Certificate"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Auto-Ready</span>
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-medium">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span>In Progress</span>
                        </span>
                      )}
                    </td>

                    {/* Published Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        disabled={togglingPublishId === intern.id}
                        onClick={() => handleTogglePublish(intern)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer disabled:opacity-50 ${
                          intern.isPublished
                            ? "bg-blue-50 text-[#1668E8] border-blue-200 hover:bg-blue-100"
                            : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                        }`}
                      >
                        {togglingPublishId === intern.id ? (
                          <Loader2 className="w-3 h-3 animate-spin inline mr-1" />
                        ) : null}
                        {intern.isPublished ? "Published" : "Hidden"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/crm/interns/${intern.id}`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#1668E8] hover:bg-blue-50 transition-colors"
                          title="View Profile & Manage Certificate"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/crm/interns/${intern.id}/edit`}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="Edit Intern"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/certification?id=${intern.internshipId}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="View Public Verification"
                        >
                          <Globe className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setDeleteIntern(intern)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Intern"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <CrmInternDeleteModal
        isOpen={Boolean(deleteIntern)}
        onClose={() => setDeleteIntern(null)}
        onConfirm={handleConfirmDelete}
        intern={deleteIntern}
        isDeleting={isDeleting}
      />

      {/* Certificate Preview Modal */}
      {selectedInternForCert && (
        <CertificationModal
          isOpen={Boolean(selectedInternForCert)}
          onClose={() => setSelectedInternForCert(null)}
          certificateData={{
            internshipId: selectedInternForCert.internshipId,
            fullName: selectedInternForCert.fullName,
            role: selectedInternForCert.role,
            department: selectedInternForCert.department,
            startDate: selectedInternForCert.startDate,
            endDate: selectedInternForCert.endDate,
            duration: selectedInternForCert.duration || "3 Months",
            performanceSummary: selectedInternForCert.performanceSummary,
            certificateNumber:
              selectedInternForCert.certificateNumber ||
              getCertificateSerialNumber(selectedInternForCert.internshipId, selectedInternForCert.endDate),
            certificateIssuedAt: selectedInternForCert.certificateIssuedAt || selectedInternForCert.endDate,
          }}
        />
      )}
    </div>
  );
};
