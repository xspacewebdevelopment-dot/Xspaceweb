"use client";

import React from "react";
import Link from "next/link";
import { X, Sparkles, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ProductItem } from "./product-data";

interface ProductDemoModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDemoModal: React.FC<ProductDemoModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-demo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 text-slate-900 shadow-2xl space-y-5 border border-slate-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product modal"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Title & Category */}
        <div className="flex items-center gap-3.5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md"
            style={{ backgroundColor: product.accent }}
          >
            {product.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                {product.number}
              </span>
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${product.accent}15`,
                  color: product.accent,
                }}
              >
                {product.category}
              </span>
            </div>
            <h3 id="product-demo-modal-title" className="text-2xl font-black text-slate-900 tracking-tight">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Tagline & Description */}
        <p className="text-sm font-semibold text-slate-800">
          {product.tagline}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {product.description}
        </p>

        {/* Key Features List */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Key Platform Capabilities
          </div>
          <div className="space-y-1.5">
            {product.keyFeatures.map((feat, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle2
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  style={{ color: product.accent }}
                />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics strip */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/60 border border-blue-100/70 text-xs">
          <span className="font-semibold text-blue-900">
            {product.metrics.label}:
          </span>
          <span className="font-mono font-bold text-blue-700">
            {product.metrics.value}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Close
          </button>
          {(product.liveUrl || product.href.startsWith("http")) && (
            <a
              href={product.liveUrl || product.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all hover:opacity-95 active:scale-95 inline-flex items-center gap-1.5 shadow-md cursor-pointer"
              style={{ backgroundColor: product.accent }}
            >
              <span>Visit Live Website</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
            </a>
          )}
          <Link
            href="/contact"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-sm font-semibold transition-all active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Request Demo Access</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
