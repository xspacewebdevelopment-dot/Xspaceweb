"use client";

import React from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Testimonial } from "@/lib/db/schema";

interface CrmDeleteConfirmModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const CrmDeleteConfirmModal: React.FC<CrmDeleteConfirmModalProps> = ({
  testimonial,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !testimonial) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-3 text-rose-600">
          <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#07152B]">
              Permanently Delete Testimonial?
            </h3>
            <p className="text-xs text-slate-500">
              This action is permanent and cannot be undone.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
          You are about to permanently delete the testimonial by{" "}
          <strong className="text-slate-900 font-semibold">{testimonial.name}</strong>
          {testimonial.company ? ` from ${testimonial.company}` : ""}.
          {testimonial.profileImagePublicId ? (
            <span className="block mt-1 text-slate-500 text-[11px]">
              Its associated photo on Cloudinary will also be cleaned up.
            </span>
          ) : null}
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
          >
            {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{isDeleting ? "Deleting..." : "Permanently Delete"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
