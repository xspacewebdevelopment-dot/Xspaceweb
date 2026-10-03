"use client";

import React from "react";
import { Trash2, AlertTriangle, X, Loader2 } from "lucide-react";
import { Intern } from "@/lib/db/schema";

interface CrmInternDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  intern: Intern | null;
  isDeleting: boolean;
}

export const CrmInternDeleteModal: React.FC<CrmInternDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  intern,
  isDeleting,
}) => {
  if (!isOpen || !intern) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-7 space-y-5">
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100 shadow-inner">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-slate-900">
            Delete Intern Record?
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            You are about to permanently delete <strong className="text-slate-800">{intern.fullName}</strong> (<span className="font-mono text-blue-600 font-bold">{intern.internshipId}</span>). This will also remove any associated certificate and profile image.
          </p>
        </div>

        <div className="p-3 bg-red-50/70 border border-red-200/80 rounded-xl text-[11px] text-red-700 font-medium">
          Warning: This action is permanent and cannot be undone. Public certificate lookup for this ID will cease immediately.
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Delete Intern</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
