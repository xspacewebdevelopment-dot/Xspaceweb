"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  Building,
  Briefcase,
  Award,
  Download,
  Eye,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  XCircle,
  PauseCircle,
  FileCheck2,
  Share2,
  Printer,
  Loader2,
} from "lucide-react";
import { CertificationModal } from "./CertificationModal";
import { DynamicCertificateView } from "./DynamicCertificateView";
import { downloadCertificatePdf, getCertificateSerialNumber } from "@/lib/certificate-generator";

export interface VerifiedInternData {
  internshipId: string;
  fullName: string;
  profileImage: string | null;
  role: string;
  department: string;
  internshipType: string;
  startDate: string | Date;
  endDate: string | Date;
  duration: string;
  status: "ACTIVE" | "COMPLETED" | "TERMINATED" | "ON_HOLD";
  skills: string[];
  description: string | null;
  performanceSummary: string | null;
  progress: {
    progressPercentage: number;
    daysCompleted: number;
    totalDays: number;
    daysRemaining: number;
    isCompleted: boolean;
    isPending: boolean;
    isInProgress: boolean;
  };
  certificate?: {
    certificateFile?: string | null;
    certificateNumber?: string | null;
    certificateIssuedAt?: string | Date | null;
  } | null;
  hasCertificateUploaded?: boolean;
  isTerminated: boolean;
  isOnHold: boolean;
}

interface CertificationResultCardProps {
  intern: VerifiedInternData;
}

export const CertificationResultCard: React.FC<CertificationResultCardProps> = ({ intern }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const hiddenCertificateRef = useRef<HTMLDivElement>(null);

  const { progress, isTerminated, isOnHold } = intern;
  const isCompletedTimeline = progress.isCompleted || intern.status === "COMPLETED";

  const certSerial =
    intern.certificate?.certificateNumber ||
    getCertificateSerialNumber(intern.internshipId, intern.endDate);

  const certificateData = {
    internshipId: intern.internshipId,
    fullName: intern.fullName,
    role: intern.role,
    department: intern.department,
    startDate: intern.startDate,
    endDate: intern.endDate,
    duration: intern.duration,
    performanceSummary: intern.performanceSummary,
    certificateNumber: certSerial,
    certificateIssuedAt: intern.certificate?.certificateIssuedAt || intern.endDate,
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(intern.internshipId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/certification?id=${encodeURIComponent(intern.internshipId)}`;
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDownloadPdf = async () => {
    const target = hiddenCertificateRef.current || document.getElementById("official-certificate-container");
    if (!target) return;
    setIsDownloading(true);
    try {
      await downloadCertificatePdf(
        target,
        `XSPACEWEB-Certificate-${intern.internshipId}.pdf`
      );
    } catch (err) {
      console.error("Failed to generate PDF", err);
      // Fallback: open modal
      setModalOpen(true);
    } finally {
      setIsDownloading(false);
    }
  };

  const formattedStartDate = new Date(intern.startDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedEndDate = new Date(intern.endDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all duration-300">
      {/* Offscreen high-resolution container for direct PDF export */}
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
          data={certificateData}
        />
      </div>

      {/* Top Banner Status Bar */}
      <div
        className={`px-6 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-bold ${
          isTerminated
            ? "bg-rose-50 text-rose-800 border-b border-rose-200"
            : isOnHold
            ? "bg-amber-50 text-amber-800 border-b border-amber-200"
            : isCompletedTimeline
            ? "bg-emerald-50 text-emerald-800 border-b border-emerald-200"
            : "bg-blue-50 text-blue-800 border-b border-blue-200"
        }`}
      >
        <div className="flex items-center gap-2">
          {isTerminated ? (
            <XCircle className="w-4 h-4 text-rose-600" />
          ) : isOnHold ? (
            <PauseCircle className="w-4 h-4 text-amber-600" />
          ) : isCompletedTimeline ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          )}

          <span>
            {isTerminated
              ? "Internship Record • Terminated"
              : isOnHold
              ? "Internship Record • On Hold"
              : isCompletedTimeline
              ? "Internship Completed • Verified Record"
              : "Internship In Progress • Active Record"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 text-[#1668E8] bg-white px-2.5 py-1 rounded-full border border-blue-100 shadow-2xs font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>ID: {intern.internshipId}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title="Share verified link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">{copiedLink ? "Link Copied!" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Main Intern Profile Header */}
      <div className="p-6 sm:p-8 lg:p-10 relative">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8">
          {/* Avatar with Verified Ring */}
          <div className="relative shrink-0">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-md">
              {intern.profileImage ? (
                <Image
                  src={intern.profileImage}
                  alt={intern.fullName}
                  fill
                  className="object-cover"
                  sizes="112px"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-black text-2xl text-slate-400 bg-slate-100">
                  {intern.fullName.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Verified Badge Icon */}
            <div
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#1668E8] text-white flex items-center justify-center shadow-md border-2 border-white"
              title="Verified Internship Record"
            >
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2.5">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-black text-[#07152B] tracking-tight">
                {intern.fullName}
              </h2>

              <button
                type="button"
                onClick={handleCopyId}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono font-bold text-slate-700 transition-colors cursor-pointer"
                title="Click to copy ID"
              >
                <span>{intern.internshipId}</span>
                {copiedId ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400" />
                )}
              </button>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1668E8] border border-blue-200">
                <FileCheck2 className="w-3.5 h-3.5" />
                Verified Internship
              </span>
            </div>

            {/* Role and Department */}
            <p className="text-base sm:text-lg font-bold text-[#1668E8] flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>{intern.role}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-medium">{intern.department}</span>
            </p>

            {/* Meta attributes */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1.5">
                <Building className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-700">{intern.internshipType}</span>
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{intern.duration}</span>
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>
                  {formattedStartDate} — {formattedEndDate}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Progress & Timeline Section */}
        <div className="mt-8 p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#1668E8]" />
                <span>Internship Timeline & Progress</span>
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
                {isTerminated
                  ? "This internship was terminated before completion."
                  : isOnHold
                  ? "This internship is currently on hold."
                  : isCompletedTimeline
                  ? "Internship tenure successfully completed."
                  : `${progress.daysRemaining} days remaining in this internship.`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-[#1668E8] font-mono">
                {progress.progressPercentage}%
              </span>
              <span className="text-xs font-medium text-slate-400">Completed</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                isTerminated
                  ? "bg-rose-500"
                  : isOnHold
                  ? "bg-amber-500"
                  : isCompletedTimeline
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                  : "bg-gradient-to-r from-[#1668E8] via-indigo-600 to-sky-400"
              }`}
              style={{ width: `${progress.progressPercentage}%` }}
            />
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-center">
            <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Start Date</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{formattedStartDate}</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">End Date</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{formattedEndDate}</p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Days Completed</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">
                {progress.daysCompleted} / {progress.totalDays} Days
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Remaining</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">
                {isCompletedTimeline ? (
                  <span className="text-emerald-600">Completed</span>
                ) : (
                  `${progress.daysRemaining} Days`
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Certificate Section: Dynamic Auto-Generation System */}
        <div className="mt-8">
          {/* Case 1: Active Internship (In Progress) */}
          {!isCompletedTimeline && !isTerminated ? (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-blue-50/60 p-6 rounded-2xl border border-blue-200/80">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1668E8] flex items-center justify-center shrink-0 shadow-xs">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-[#07152B]">
                    Internship Currently In Progress
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                    Your internship is currently in progress. Your official auto-generated certificate will become available immediately upon successfully completing the internship on{" "}
                    <strong className="text-slate-800">{formattedEndDate}</strong>.
                  </p>
                  <p className="text-xs font-mono font-bold text-[#1668E8] pt-1">
                    Internship Progress: {progress.progressPercentage}% • {progress.daysRemaining} days remaining
                  </p>
                </div>
              </div>

              {/* Notice pill - NO download button */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-blue-200 text-xs font-bold text-blue-700 shadow-2xs shrink-0 self-start md:self-auto">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span>Certificate will be available after completion</span>
              </div>
            </div>
          ) : isTerminated ? (
            /* Case 2: Terminated */
            <div className="flex items-center gap-4 bg-rose-50 p-6 rounded-2xl border border-rose-200 text-rose-800">
              <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
              <div>
                <h4 className="text-sm font-bold">Certificate Unavailable</h4>
                <p className="text-xs text-rose-600 mt-0.5">
                  This internship record is marked as terminated and is not eligible for certificate issuance.
                </p>
              </div>
            </div>
          ) : (
            /* Case 3: Completed with Auto-Generated Certificate */
            <div className="space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-white p-6 rounded-2xl border border-emerald-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-extrabold text-[#07152B]">
                        Official Certificate of Completion (Auto-Generated)
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600">
                      This official digital credential has been automatically generated and cryptographically tied to unique ID{" "}
                      <strong className="font-mono text-slate-800">{intern.internshipId}</strong>.
                    </p>
                    <p className="text-xs font-mono text-slate-500 pt-0.5">
                      Certificate Serial: <span className="font-bold text-slate-700">{certSerial}</span>
                      {" "}• Completed: {formattedEndDate}
                    </p>
                  </div>
                </div>

                {/* Action Buttons: View & Download PDF */}
                <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-[#1668E8]" />
                    <span>View Certificate</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer disabled:opacity-60"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generating PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Certificate</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Inline Certificate Preview Component */}
              <div className="bg-slate-50/70 p-4 sm:p-6 rounded-3xl border border-slate-200/80 overflow-hidden flex flex-col items-center">
                <div className="w-full flex items-center justify-between pb-3 text-xs text-slate-500">
                  <span className="font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#1668E8]" />
                    <span>Live Authenticated Certificate Preview</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="text-xs font-bold text-[#1668E8] hover:underline cursor-pointer"
                  >
                    Click to view full screen
                  </button>
                </div>

                <div className="w-full max-w-4xl overflow-x-auto py-2">
                  <DynamicCertificateView data={certificateData} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Experience, Skills & Performance Section */}
        <div className="mt-8 pt-8 border-t border-slate-100 space-y-6">
          {/* Skills Badges */}
          {intern.skills && intern.skills.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1668E8]" />
                <span>Skills & Technologies Practiced</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {intern.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200/80 shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {intern.description && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Internship Scope & Project Overview
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {intern.description}
              </p>
            </div>
          )}

          {/* Performance Summary (From Admin) */}
          {intern.performanceSummary && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1668E8]" />
                <span>Performance & Feedback Summary</span>
              </h4>
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-100">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium italic">
                  "{intern.performanceSummary}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal viewer for Fullscreen / Print / High-Res View */}
      <CertificationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        certificateData={certificateData}
      />
    </div>
  );
};
