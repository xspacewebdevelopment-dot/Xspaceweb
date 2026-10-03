"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Award,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Eye,
  Download,
  ExternalLink,
  ChevronRight,
  Filter,
  RefreshCw,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Intern } from "@/lib/db/schema";
import { calculateInternshipProgress } from "@/lib/internship-utils";
import { CertificationModal } from "@/components/certification/CertificationModal";
import { DynamicCertificateView } from "@/components/certification/DynamicCertificateView";
import { downloadCertificatePdf, getCertificateSerialNumber } from "@/lib/certificate-generator";

interface CrmCertificatesTableProps {
  initialInterns: Intern[];
}

export const CrmCertificatesTable: React.FC<CrmCertificatesTableProps> = ({ initialInterns }) => {
  const router = useRouter();
  const [internsList] = useState<Intern[]>(initialInterns);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"ALL" | "READY" | "IN_PROGRESS">("ALL");

  // Certificate Preview Modal State
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedInternForPreview, setSelectedInternForPreview] = useState<Intern | null>(null);

  // Download PDF state
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const hiddenCertificateRef = useRef<HTMLDivElement>(null);
  const [activeDownloadIntern, setActiveDownloadIntern] = useState<Intern | null>(null);

  // Filter interns
  const filteredInterns = useMemo(() => {
    return internsList.filter((intern) => {
      const progress = calculateInternshipProgress(intern.startDate, intern.endDate, intern.status);
      const isCompleted = progress.isCompleted || intern.status === "COMPLETED";

      if (filterTab === "READY" && !isCompleted) return false;
      if (filterTab === "IN_PROGRESS" && isCompleted) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = intern.fullName.toLowerCase().includes(query);
        const matchesId = intern.internshipId.toLowerCase().includes(query);
        const matchesRole = intern.role.toLowerCase().includes(query);
        const matchesDept = intern.department.toLowerCase().includes(query);
        return matchesName || matchesId || matchesRole || matchesDept;
      }

      return true;
    });
  }, [internsList, searchQuery, filterTab]);

  // Statistics counts
  const stats = useMemo(() => {
    let ready = 0;
    let inProgress = 0;

    internsList.forEach((intern) => {
      const progress = calculateInternshipProgress(intern.startDate, intern.endDate, intern.status);
      const isCompleted = progress.isCompleted || intern.status === "COMPLETED";

      if (isCompleted) {
        ready++;
      } else {
        inProgress++;
      }
    });

    return { total: internsList.length, ready, inProgress };
  }, [internsList]);

  const handleDownloadPdf = async (intern: Intern) => {
    setActiveDownloadIntern(intern);
    setDownloadingId(intern.id);

    setTimeout(async () => {
      if (hiddenCertificateRef.current) {
        try {
          await downloadCertificatePdf(
            hiddenCertificateRef.current,
            `XSPACEWEB-Certificate-${intern.internshipId}.pdf`
          );
        } catch (err) {
          console.error("PDF download failed", err);
          setSelectedInternForPreview(intern);
          setPreviewModalOpen(true);
        } finally {
          setDownloadingId(null);
          setActiveDownloadIntern(null);
        }
      } else {
        setDownloadingId(null);
        setActiveDownloadIntern(null);
      }
    }, 150);
  };

  const selectedCertData = selectedInternForPreview
    ? {
        internshipId: selectedInternForPreview.internshipId,
        fullName: selectedInternForPreview.fullName,
        role: selectedInternForPreview.role,
        department: selectedInternForPreview.department,
        startDate: selectedInternForPreview.startDate,
        endDate: selectedInternForPreview.endDate,
        duration: selectedInternForPreview.duration || "3 Months",
        performanceSummary: selectedInternForPreview.performanceSummary,
        certificateNumber:
          selectedInternForPreview.certificateNumber ||
          getCertificateSerialNumber(selectedInternForPreview.internshipId, selectedInternForPreview.endDate),
        certificateIssuedAt: selectedInternForPreview.certificateIssuedAt || selectedInternForPreview.endDate,
      }
    : null;

  const downloadCertData = activeDownloadIntern
    ? {
        internshipId: activeDownloadIntern.internshipId,
        fullName: activeDownloadIntern.fullName,
        role: activeDownloadIntern.role,
        department: activeDownloadIntern.department,
        startDate: activeDownloadIntern.startDate,
        endDate: activeDownloadIntern.endDate,
        duration: activeDownloadIntern.duration || "3 Months",
        performanceSummary: activeDownloadIntern.performanceSummary,
        certificateNumber:
          activeDownloadIntern.certificateNumber ||
          getCertificateSerialNumber(activeDownloadIntern.internshipId, activeDownloadIntern.endDate),
        certificateIssuedAt: activeDownloadIntern.certificateIssuedAt || activeDownloadIntern.endDate,
      }
    : null;

  return (
    <div className="space-y-6 pb-12">
      {/* Offscreen element for direct PDF export */}
      {downloadCertData && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: "-99999px",
            width: "1040px",
            pointerEvents: "none",
            opacity: 1,
            zIndex: -9999,
          }}
        >
          <DynamicCertificateView
            ref={hiddenCertificateRef}
            data={downloadCertData}
          />
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#1668E8] flex items-center justify-center font-bold shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#07152B] tracking-tight">
                Internship Certificates (Automated System)
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Official certificates are auto-generated dynamically by XSPACEWEB upon internship completion.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/certification"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            <span>Public Certification Portal</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Intern Records</p>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">{stats.total}</p>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Auto-Generated (Ready)</span>
          </p>
          <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">{stats.ready}</p>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>In Progress (Scheduled)</span>
          </p>
          <p className="text-2xl font-black text-blue-600 mt-1 font-mono">{stats.inProgress}</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ID, role..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {[
            { id: "ALL", label: `All Interns (${stats.total})` },
            { id: "READY", label: `Ready (${stats.ready})` },
            { id: "IN_PROGRESS", label: `In Progress (${stats.inProgress})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterTab(tab.id as typeof filterTab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                filterTab === tab.id
                  ? "bg-[#1668E8] text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Intern</th>
                <th className="py-3.5 px-4">Internship ID</th>
                <th className="py-3.5 px-4">Role & Dept</th>
                <th className="py-3.5 px-4">Timeline / Progress</th>
                <th className="py-3.5 px-4">Certificate Status</th>
                <th className="py-3.5 px-4">Reference / Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredInterns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Award className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No intern records found</p>
                    <p className="text-[11px] mt-1">Try adjusting your search query or filters.</p>
                  </td>
                </tr>
              ) : (
                filteredInterns.map((intern) => {
                  const progress = calculateInternshipProgress(intern.startDate, intern.endDate, intern.status);
                  const isCompleted = progress.isCompleted || intern.status === "COMPLETED";
                  const certSerial =
                    intern.certificateNumber ||
                    getCertificateSerialNumber(intern.internshipId, intern.endDate);

                  return (
                    <tr key={intern.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Intern */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                            {intern.profileImage ? (
                              <Image
                                src={intern.profileImage}
                                alt={intern.fullName}
                                fill
                                className="object-cover"
                                sizes="36px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-xs text-slate-400">
                                {intern.fullName.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <Link
                              href={`/crm/interns/${intern.id}`}
                              className="font-bold text-slate-900 hover:text-blue-600 transition-colors"
                            >
                              {intern.fullName}
                            </Link>
                            <p className="text-[11px] text-slate-400">{intern.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Internship ID */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 text-[11px]">
                          {intern.internshipId}
                        </span>
                      </td>

                      {/* Role & Dept */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800">{intern.role}</div>
                        <div className="text-[11px] text-slate-400">{intern.department}</div>
                      </td>

                      {/* Timeline / Progress */}
                      <td className="py-3.5 px-4 min-w-[140px]">
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                          <span className="text-slate-500 font-sans">
                            {isCompleted ? "Completed" : `${progress.daysRemaining}d left`}
                          </span>
                          <span className="font-bold text-slate-700">{progress.progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isCompleted
                                ? "bg-emerald-500"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600"
                            }`}
                            style={{ width: `${progress.progressPercentage}%` }}
                          />
                        </div>
                      </td>

                      {/* Certificate Status */}
                      <td className="py-3.5 px-4">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            Auto-Generated
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            <Clock className="w-3 h-3" />
                            Scheduled
                          </span>
                        )}
                      </td>

                      {/* Reference / Date */}
                      <td className="py-3.5 px-4 text-[11px]">
                        <div>
                          <p className="font-mono font-bold text-slate-700">
                            {certSerial}
                          </p>
                          <p className="text-slate-400">
                            {new Date(intern.endDate).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </td>

                      {/* Actions: Preview, Download PDF, View Profile */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedInternForPreview(intern);
                              setPreviewModalOpen(true);
                            }}
                            title="Preview Dynamic Certificate"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDownloadPdf(intern)}
                            disabled={downloadingId === intern.id}
                            title="Download Certificate PDF"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            {downloadingId === intern.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-[#1668E8]" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                          </button>

                          <Link
                            href={`/crm/interns/${intern.id}`}
                            title="View Intern Profile"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Link>
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

      {/* Certificate Preview Modal */}
      {selectedCertData && (
        <CertificationModal
          isOpen={previewModalOpen}
          onClose={() => {
            setPreviewModalOpen(false);
            setSelectedInternForPreview(null);
          }}
          certificateData={selectedCertData}
        />
      )}
    </div>
  );
};
