"use client";

import React, { useRef, useState } from "react";
import { X, Download, Printer, Award, ShieldCheck, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { DynamicCertificateView, CertificateData } from "./DynamicCertificateView";
import { downloadCertificatePdf } from "@/lib/certificate-generator";

interface CertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateData: CertificateData;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({
  isOpen,
  onClose,
  certificateData,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      await downloadCertificatePdf(
        certificateRef.current,
        `XSPACEWEB-Certificate-${certificateData.internshipId}.pdf`
      );
    } catch (err) {
      console.error("Failed to generate PDF", err);
      alert("Failed to download PDF. Please try printing or use another browser.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/90 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#1668E8] flex items-center justify-center font-bold shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-[#07152B] leading-tight">
                  Official Certificate of Completion
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Auto-Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {certificateData.fullName} • {certificateData.internshipId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-60"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Body */}
        <div className="flex-1 overflow-auto bg-slate-900/5 p-4 sm:p-8 flex items-center justify-center">
          <div className="w-full flex items-center justify-center">
            <DynamicCertificateView
              ref={certificateRef}
              data={certificateData}
              className="mx-auto"
            />
          </div>
        </div>

        {/* Footer verification note */}
        <div className="px-6 py-3 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official verified digital certificate auto-generated by XSPACEWEB.</span>
          </div>
          <span className="font-mono text-slate-400 text-[11px]">{certificateData.internshipId}</span>
        </div>
      </div>
    </div>
  );
};
