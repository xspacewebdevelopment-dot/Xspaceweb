"use client";

import React from "react";
import { X, Download, ExternalLink, Award, FileText } from "lucide-react";

interface CrmCertificatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateUrl: string | null;
  certificateNumber?: string | null;
  internName?: string;
  internshipId?: string;
}

export const CrmCertificatePreviewModal: React.FC<CrmCertificatePreviewModalProps> = ({
  isOpen,
  onClose,
  certificateUrl,
  certificateNumber,
  internName,
  internshipId,
}) => {
  if (!isOpen || !certificateUrl) return null;

  const isPdf = certificateUrl.toLowerCase().includes(".pdf");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1668E8] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#07152B] leading-tight">
                {internName ? `${internName}'s Certificate` : "Internship Certificate"}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {internshipId} {certificateNumber ? `• ${certificateNumber}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Original</span>
            </a>
            <a
              href={certificateUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1668E8] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewer Body */}
        <div className="flex-1 overflow-auto bg-slate-100 p-4 sm:p-6 flex items-center justify-center min-h-[400px]">
          {isPdf ? (
            <iframe
              src={`${certificateUrl}#toolbar=0`}
              className="w-full h-full min-h-[550px] rounded-xl border border-slate-200 shadow-inner bg-white"
              title="Certificate PDF Preview"
            />
          ) : (
            <div className="relative max-w-full max-h-[600px] rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-white p-2">
              <img
                src={certificateUrl}
                alt="Certificate Preview"
                className="max-h-[580px] w-auto object-contain mx-auto rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
