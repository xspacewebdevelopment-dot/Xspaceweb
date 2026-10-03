"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Trash2,
  ExternalLink,
  Award,
  Calendar,
  Clock,
  Briefcase,
  Building,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  XCircle,
  PauseCircle,
  Copy,
  Check,
  Eye,
  Download,
  Sparkles,
  ShieldCheck,
  Globe,
  Loader2,
} from "lucide-react";
import { Intern } from "@/lib/db/schema";
import { calculateInternshipProgress } from "@/lib/internship-utils";
import { CrmInternDeleteModal } from "./CrmInternDeleteModal";
import { DynamicCertificateView } from "@/components/certification/DynamicCertificateView";
import { CertificationModal } from "@/components/certification/CertificationModal";
import { downloadCertificatePdf, getCertificateSerialNumber } from "@/lib/certificate-generator";

interface CrmInternProfileViewProps {
  intern: Intern;
}

export const CrmInternProfileView: React.FC<CrmInternProfileViewProps> = ({ intern: initialIntern }) => {
  const router = useRouter();
  const [intern, setIntern] = useState<Intern>(initialIntern);
  const [copiedId, setCopiedId] = useState(false);
  const [isTogglingPublish, setIsTogglingPublish] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const hiddenCertificateRef = useRef<HTMLDivElement>(null);

  // Calculate timeline progress
  const progressData = calculateInternshipProgress(intern.startDate, intern.endDate, intern.status);
  const isCompleted = progressData.isCompleted || intern.status === "COMPLETED";

  const certSerial =
    intern.certificateNumber || getCertificateSerialNumber(intern.internshipId, intern.endDate);

  const certData = {
    internshipId: intern.internshipId,
    fullName: intern.fullName,
    role: intern.role,
    department: intern.department,
    startDate: intern.startDate,
    endDate: intern.endDate,
    duration: intern.duration || "3 Months",
    performanceSummary: intern.performanceSummary,
    certificateNumber: certSerial,
    certificateIssuedAt: intern.certificateIssuedAt || intern.endDate,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(intern.internshipId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleTogglePublish = async () => {
    setIsTogglingPublish(true);
    try {
      const res = await fetch(`/api/admin/interns/${intern.id}/publish`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !intern.isPublished }),
      });
      if (res.ok) {
        const data = await res.json();
        setIntern((prev) => ({ ...prev, isPublished: data.isPublished }));
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to toggle publish status", err);
    } finally {
      setIsTogglingPublish(false);
    }
  };

  const handleDeleteIntern = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/interns/${intern.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleteModalOpen(false);
        router.push("/crm/interns");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete intern.");
      }
    } catch (err) {
      console.error("Failed to delete intern", err);
      alert("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!hiddenCertificateRef.current) return;
    setIsDownloadingPdf(true);
    try {
      await downloadCertificatePdf(
        hiddenCertificateRef.current,
        `XSPACEWEB-Certificate-${intern.internshipId}.pdf`
      );
    } catch (err) {
      console.error("Failed to download PDF", err);
      setPreviewModalOpen(true);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Status color pill
  const getStatusBadge = (status: Intern["status"]) => {
    switch (status) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Active
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case "ON_HOLD":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <PauseCircle className="w-3.5 h-3.5" />
            On Hold
          </span>
        );
      case "TERMINATED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" />
            Terminated
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Offscreen element for PDF capture */}
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
          data={certData}
        />
      </div>

      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/crm/interns"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Interns</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>/</span>
            <span className="font-mono font-bold text-slate-700">{intern.internshipId}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            type="button"
            onClick={handleTogglePublish}
            disabled={isTogglingPublish}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shadow-xs cursor-pointer ${
              intern.isPublished
                ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isTogglingPublish ? "Updating..." : intern.isPublished ? "Published (Live)" : "Unpublished (Draft)"}</span>
          </button>

          <Link
            href={`/certification?id=${intern.internshipId}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors shadow-xs"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Page</span>
          </Link>

          <Link
            href={`/crm/interns/${intern.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#1668E8] hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </Link>

          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-colors shadow-xs cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50/60 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          {/* Avatar */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-md shrink-0">
            {intern.profileImage ? (
              <Image
                src={intern.profileImage}
                alt={intern.fullName}
                fill
                className="object-cover"
                sizes="112px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-slate-400 bg-slate-100">
                {intern.fullName.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 space-y-2.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152B] tracking-tight">
                {intern.fullName}
              </h1>

              {/* ID Pill with Copy button */}
              <button
                type="button"
                onClick={copyToClipboard}
                title="Click to copy Internship ID"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono font-bold text-slate-800 transition-colors cursor-pointer"
              >
                <span>{intern.internshipId}</span>
                {copiedId ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              {getStatusBadge(intern.status)}
            </div>

            <p className="text-base font-semibold text-[#1668E8] flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>{intern.role}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-normal">{intern.department}</span>
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href={`mailto:${intern.email}`} className="hover:text-blue-600 transition-colors">
                  {intern.email}
                </a>
              </span>

              {intern.phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`tel:${intern.phone}`} className="hover:text-blue-600 transition-colors">
                    {intern.phone}
                  </a>
                </span>
              )}

              <span className="inline-flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium text-slate-700">{intern.internshipType}</span>
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{intern.duration}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Timeline Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#07152B] uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#1668E8]" />
              <span>Internship Progress & Timeline</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {progressData.isCompleted
                ? "Internship timeline has reached completion."
                : `${progressData.daysRemaining} days remaining in this internship.`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-[#1668E8] font-mono">
              {progressData.progressPercentage}%
            </span>
            <span className="text-xs text-slate-400 font-medium">Completed</span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/60 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              intern.status === "TERMINATED"
                ? "bg-rose-500"
                : intern.status === "ON_HOLD"
                ? "bg-amber-500"
                : progressData.isCompleted
                ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                : "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500"
            }`}
            style={{ width: `${progressData.progressPercentage}%` }}
          />
        </div>

        {/* Timeline Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase">Start Date</p>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {new Date(intern.startDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase">End Date</p>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {new Date(intern.endDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase">Days Completed</p>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {progressData.daysCompleted} / {progressData.totalDays} Days
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase">Time Remaining</p>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {progressData.isCompleted ? (
                <span className="text-emerald-600 font-bold">Finished</span>
              ) : (
                `${progressData.daysRemaining} Days`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Automated Dynamic Certificate + Performance & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Automated Certificate Card (1 Col) */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#07152B] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-[#1668E8]" />
                <span>Dynamic Certificate</span>
              </h3>
              {isCompleted ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" />
                  Auto-Generated
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  <Clock className="w-3 h-3" />
                  In Progress
                </span>
              )}
            </div>

            {/* Certificate Status Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 border border-blue-200/80 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1668E8] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {certSerial}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {isCompleted
                      ? `Ready for download • Completed ${new Date(intern.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`
                      : `Available upon completion on ${new Date(intern.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-xl border border-blue-100">
                ⚡ <strong>100% Automated:</strong> Certificates are auto-generated dynamically from intern details, role, and evaluation. No manual PDF uploads required.
              </div>

              {/* Action Buttons: Preview & Download */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 text-[#1668E8] border border-blue-200 text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf}
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer disabled:opacity-60"
                  title="Download Certificate PDF"
                >
                  {isDownloadingPdf ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              href={`/certification?id=${intern.internshipId}`}
              target="_blank"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              <span>Open Public Verification Page</span>
            </Link>
          </div>
        </div>

        {/* Experience, Skills & Performance (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills Badges */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-3">
            <h3 className="text-sm font-bold text-[#07152B] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#1668E8]" />
              <span>Assigned Skills & Technologies</span>
            </h3>

            {intern.skills && intern.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {intern.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No specific skills listed for this intern.</p>
            )}
          </div>

          {/* Description & Performance Summary */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Internship Role & Project Description
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2 whitespace-pre-line">
                {intern.description || (
                  <span className="text-slate-400 italic">No description provided.</span>
                )}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1668E8]" />
                <span>Performance & Feedback Summary (Printed on Certificate)</span>
              </h4>
              <div className="mt-2 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                  {intern.performanceSummary || (
                    <span className="text-slate-400 italic font-normal">
                      No performance summary has been entered for this intern yet.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Certificate Preview Modal */}
      <CertificationModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        certificateData={certData}
      />

      {/* Delete Confirmation Modal */}
      <CrmInternDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteIntern}
        intern={intern}
        isDeleting={isDeleting}
      />
    </div>
  );
};
