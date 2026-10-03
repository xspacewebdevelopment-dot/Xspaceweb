"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { Award, ShieldCheck, CheckCircle2, Sparkles, QrCode } from "lucide-react";
import { getCertificateSerialNumber } from "@/lib/certificate-generator";

export interface CertificateData {
  internshipId: string;
  fullName: string;
  role: string;
  department: string;
  startDate: string | Date;
  endDate: string | Date;
  duration?: string;
  performanceSummary?: string | null;
  certificateNumber?: string | null;
  certificateIssuedAt?: string | Date | null;
}

interface DynamicCertificateViewProps {
  data: CertificateData;
  scale?: number;
  className?: string;
}

export const DynamicCertificateView = forwardRef<HTMLDivElement, DynamicCertificateViewProps>(
  ({ data, className = "" }, ref) => {
    const formattedStartDate = new Date(data.startDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedEndDate = new Date(data.endDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedIssueDate = data.certificateIssuedAt
      ? new Date(data.certificateIssuedAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : formattedEndDate;

    const certSerial =
      data.certificateNumber || getCertificateSerialNumber(data.internshipId, data.endDate);

    const firstName = data.fullName.split(" ")[0] || data.fullName;

    return (
      <div
        ref={ref}
        id="official-certificate-container"
        className={`relative w-full max-w-[1040px] aspect-[1040/730] bg-[#FFFFFF] text-[#07152B] p-6 sm:p-10 select-none overflow-hidden shadow-2xl rounded-2xl border-8 border-slate-100 print:shadow-none print:border-none print:m-0 print:p-8 ${className}`}
        style={{
          boxSizing: "border-box",
        }}
      >
        {/* Certificate Outer Ornamental Double Border */}
        <div className="absolute inset-3 sm:inset-4 border-[3px] border-[#1668E8]/70 pointer-events-none rounded-xl" />
        <div className="absolute inset-4 sm:inset-5 border border-[#B45309]/50 pointer-events-none rounded-lg" />
        <div className="absolute inset-5 sm:inset-6 border border-slate-200 pointer-events-none rounded-md" />

        {/* Delicate Corner Filigree Ornaments */}
        <div className="absolute top-5 left-5 w-8 h-8 border-t-4 border-l-4 border-[#1668E8] pointer-events-none" />
        <div className="absolute top-5 right-5 w-8 h-8 border-t-4 border-r-4 border-[#1668E8] pointer-events-none" />
        <div className="absolute bottom-5 left-5 w-8 h-8 border-b-4 border-l-4 border-[#1668E8] pointer-events-none" />
        <div className="absolute bottom-5 right-5 w-8 h-8 border-b-4 border-r-4 border-[#1668E8] pointer-events-none" />

        {/* Subtle Guilloche / Security Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
          <div className="text-center">
            <span className="text-[120px] font-black tracking-widest text-slate-900 block leading-none font-serif">
              XSPACEWEB
            </span>
            <span className="text-2xl font-bold tracking-[1.5em] text-slate-900 block uppercase mt-4">
              EXCELLENCE • INTEGRITY • INNOVATION
            </span>
          </div>
        </div>

        {/* Ambient Corner Accents */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br from-blue-100/40 via-sky-50/20 to-transparent rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-gradient-to-tr from-amber-50/40 via-blue-50/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Inner Content Area */}
        <div className="relative z-10 h-full flex flex-col justify-between text-center px-4 sm:px-8 py-2">
          {/* Header Row: Logo & Corporate Identity */}
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 pt-1">
            <div className="text-left flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#1668E8] text-white flex items-center justify-center font-black text-xl shadow-xs">
                <span>X</span>
              </div>
              <div>
                <h3 className="text-sm font-black tracking-tight text-[#07152B] leading-tight">
                  XSPACEWEB
                </h3>
                <p className="text-[9px] font-bold text-[#1668E8] uppercase tracking-wider">
                  Build. Grow. Succeed.
                </p>
              </div>
            </div>

            <div className="hidden sm:block text-right">
              <p className="text-[9px] font-mono text-slate-400">
                CIN: U62012JH2024PTC022737
              </p>
              <p className="text-[9px] font-semibold text-slate-500 uppercase tracking-widest">
                OFFICIAL RECOGNIZED CREDENTIAL
              </p>
            </div>
          </div>

          {/* Certificate Main Title */}
          <div className="space-y-1.5 my-auto py-2">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1668E8] text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>Official Verification Ledger</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-wider text-[#07152B] uppercase">
              CERTIFICATE OF INTERNSHIP
            </h1>
            <p className="text-[11px] sm:text-xs font-semibold text-[#1668E8] uppercase tracking-[0.25em]">
              COMPLETION & EXCELLENCE
            </p>

            <p className="text-[11px] text-slate-500 italic pt-2">
              This certificate is proudly awarded to
            </p>

            {/* Recipient Full Name */}
            <div className="py-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[#07152B] tracking-wide inline-block relative">
                {data.fullName}
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#1668E8] to-transparent mt-1" />
              </h2>
              <p className="text-[10px] font-mono font-bold text-slate-500 mt-1">
                Internship ID: <span className="text-[#1668E8]">{data.internshipId}</span>
              </p>
            </div>

            {/* Program & Role Details */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl mx-auto font-sans font-medium">
              for successfully completing the rigorous internship program as{" "}
              <strong className="text-[#07152B] font-bold underline decoration-[#1668E8]/40 underline-offset-2">
                {data.role}
              </strong>{" "}
              in the <strong className="text-slate-800">{data.department}</strong> department at{" "}
              <strong className="text-slate-900">XSPACEWEB PRIVATE LIMITED</strong>.
            </p>

            <p className="text-[11px] text-slate-500 font-medium">
              Duration: <span className="font-bold text-slate-800">{data.duration || "3 Months"}</span>{" "}
              ({formattedStartDate} – {formattedEndDate})
            </p>

            {/* Working Performance Summary & Thank you appreciation */}
            <div className="my-2 p-2.5 sm:p-3 bg-slate-50/90 rounded-xl border border-slate-200/70 max-w-2xl mx-auto text-left shadow-2xs">
              <p className="text-[10px] font-bold text-[#1668E8] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Working Performance & Leadership Evaluation:</span>
              </p>
              <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed italic line-clamp-2">
                "{data.performanceSummary ||
                  "Demonstrated exceptional technical capability, problem-solving enthusiasm, and collaborative teamwork throughout all assigned engineering sprints and project deliverables."}"
              </p>
              <p className="text-[10px] text-slate-500 mt-1 font-medium">
                We sincerely thank {firstName} for their valuable contributions and wish them extraordinary success in their career journey.
              </p>
            </div>
          </div>

          {/* Footer Row: Signatures & Official Embossed Seal */}
          <div className="pt-2 border-t border-slate-200/80 flex items-end justify-between gap-4 mt-auto">
            {/* Signature 1: Director & Head of Engineering */}
            <div className="text-left w-48 sm:w-56 space-y-1">
              {/* Realistic cursive signature graphic */}
              <div className="h-9 flex items-end">
                <span className="font-serif italic text-lg sm:text-xl text-[#07152B] font-bold tracking-wider select-none rotate-[-2deg]">
                  S. Karmakar
                </span>
              </div>
              <div className="w-full border-b border-slate-300" />
              <p className="text-[10px] font-bold text-slate-900 leading-tight">
                Subham Karmakar
              </p>
              <p className="text-[8px] text-slate-500 font-medium leading-none">
                Director & Head of Engineering
              </p>
            </div>

            {/* Center: Official Embossed Seal of XSPACEWEB */}
            <div className="relative flex flex-col items-center justify-center shrink-0 -mb-1">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#1668E8] via-[#2563EB] to-[#3B82F6] text-white flex flex-col items-center justify-center shadow-lg border-2 border-amber-300/80">
                {/* Golden star accents */}
                <div className="absolute inset-1 rounded-full border border-dashed border-amber-200/60 pointer-events-none" />
                <Award className="w-6 h-6 sm:w-7 sm:h-7 text-amber-200 drop-shadow-xs" />
                <span className="text-[6px] sm:text-[7px] font-black tracking-widest text-amber-100 uppercase">
                  VERIFIED
                </span>
              </div>
              {/* Ribbon tails */}
              <div className="flex gap-2 -mt-1.5 pointer-events-none">
                <div className="w-2.5 h-4 bg-blue-700 -rotate-12 rounded-b-xs shadow-xs" />
                <div className="w-2.5 h-4 bg-blue-700 rotate-12 rounded-b-xs shadow-xs" />
              </div>
              <p className="text-[7px] font-bold text-slate-500 tracking-wider uppercase mt-0.5">
                OFFICIAL SEAL
              </p>
            </div>

            {/* Signature 2: HR Operations & Verification Details */}
            <div className="text-right w-48 sm:w-56 space-y-1">
              <div className="h-9 flex items-end justify-end">
                <span className="font-serif italic text-lg sm:text-xl text-[#07152B] font-bold tracking-wider select-none rotate-[2deg]">
                  A. Sengupta
                </span>
              </div>
              <div className="w-full border-b border-slate-300" />
              <p className="text-[10px] font-bold text-slate-900 leading-tight">
                Ankita Sengupta
              </p>
              <p className="text-[8px] text-slate-500 font-medium leading-none">
                Head of People & Operations
              </p>
            </div>
          </div>

          {/* Bottom Verification Strip */}
          <div className="pt-2 text-[8px] sm:text-[9px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-100 mt-2">
            <span>Ref: <strong className="text-slate-700">{certSerial}</strong></span>
            <span>Issued: {formattedIssueDate}</span>
            <span className="hidden sm:inline">Verify at: xspaceweb.com/certification?id={data.internshipId}</span>
          </div>
        </div>
      </div>
    );
  }
);

DynamicCertificateView.displayName = "DynamicCertificateView";
