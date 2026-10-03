"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Upload,
  Loader2,
  Star,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Trash2,
  User,
  Building,
  MapPin,
  Quote,
} from "lucide-react";
import {
  Testimonial,
  TestimonialType,
  TestimonialStatus,
  CardVariant,
} from "@/lib/db/schema";

interface CrmTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (testimonial: Testimonial, isNew: boolean) => void;
  initialData?: Testimonial | null;
  defaultType?: TestimonialType;
}

export const CrmTestimonialModal: React.FC<CrmTestimonialModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  initialData,
  defaultType = "client",
}) => {
  const [type, setType] = useState<TestimonialType>(defaultType);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [headline, setHeadline] = useState("");
  const [testimonialText, setTestimonialText] = useState("");
  const [rating, setRating] = useState<number | null>(5);
  const [cardVariant, setCardVariant] = useState<CardVariant>("standard");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [profileImagePublicId, setProfileImagePublicId] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [status, setStatus] = useState<TestimonialStatus>("published");

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
      setType(initialData.testimonialType as TestimonialType);
      setName(initialData.name || "");
      setDesignation(initialData.designation || "");
      setCompany(initialData.company || "");
      setLocation(initialData.location || "");
      setHeadline(initialData.headline || "");
      setTestimonialText(initialData.testimonialText || "");
      setRating(initialData.rating ?? (initialData.testimonialType === "intern" ? null : 5));
      setCardVariant((initialData.cardVariant as CardVariant) || "standard");
      setProfileImageUrl(initialData.profileImageUrl || "");
      setProfileImagePublicId(initialData.profileImagePublicId || "");
      setIsFeatured(Boolean(initialData.isFeatured));
      setDisplayOrder(initialData.displayOrder || 0);
      setStatus((initialData.status as TestimonialStatus) || "published");
    } else {
      setType(defaultType);
      setName("");
      setDesignation("");
      setCompany("");
      setLocation("");
      setHeadline("");
      setTestimonialText("");
      setRating(defaultType === "intern" ? 5 : 5);
      setCardVariant("standard");
      setProfileImageUrl("");
      setProfileImagePublicId("");
      setIsFeatured(false);
      setDisplayOrder(0);
      setStatus("published");
    }
    setErrorMessage("");
  }, [initialData, defaultType, isOpen]);

  if (!isOpen) return null;

  // Handle Cloudinary image upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage("Image size must be under 8MB.");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/testimonials/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image.");
      }

      setProfileImageUrl(data.url);
      setProfileImagePublicId(data.publicId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload image";
      setErrorMessage(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setProfileImageUrl("");
    setProfileImagePublicId("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit create or edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Name is required.");
      return;
    }

    if (!testimonialText.trim()) {
      setErrorMessage("Testimonial text is required.");
      return;
    }

    if (type === "intern" && !designation.trim()) {
      setErrorMessage("Internship role / designation is required for intern testimonials.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = {
        testimonialType: type,
        name: name.trim(),
        designation: designation.trim() || null,
        company: company.trim() || null,
        location: location.trim() || null,
        headline: headline.trim() || null,
        testimonialText: testimonialText.trim(),
        rating: rating,
        cardVariant: cardVariant,
        profileImageUrl: profileImageUrl.trim() || null,
        profileImagePublicId: profileImagePublicId.trim() || null,
        isFeatured,
        displayOrder,
        status,
      };

      const url = initialData
        ? `/api/admin/testimonials/${initialData.id}`
        : "/api/admin/testimonials";
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save testimonial.");
      }

      onSaved(data.testimonial, !initialData);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save testimonial";
      setErrorMessage(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-base font-extrabold text-[#07152B]">
              {initialData ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
            <p className="text-xs text-slate-500">
              {type === "client" ? "Client Review" : "Internship Testimonial"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Testimonial Type Switcher (only for new) */}
          {!initialData && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Testimonial Type *
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setType("client")}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    type === "client"
                      ? "bg-white text-[#1668E8] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Client Review
                </button>
                <button
                  type="button"
                  onClick={() => setType("intern")}
                  className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    type === "intern"
                      ? "bg-white text-[#1668E8] shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Intern Testimonial
                </button>
              </div>
            </div>
          )}

          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={type === "client" ? "e.g. Anil Sharma" : "e.g. Aman Verma"}
                required
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
              />
            </div>

            {/* Designation / Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {type === "client" ? "Designation" : "Internship Role *"}
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder={type === "client" ? "e.g. Founder & CEO" : "e.g. Frontend Development Intern"}
                required={type === "intern"}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
              />
            </div>
          </div>

          {/* Client Specific: Company & Location */}
          {type === "client" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. PixelTech Technologies"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Ranchi, Jharkhand"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
                />
              </div>
            </div>
          )}

          {/* Intern Specific: Headline & Card Variant */}
          {type === "intern" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Headline (optional)
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. I really appreciate! or Good Job!"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Card Style Variant
                </label>
                <select
                  value={cardVariant}
                  onChange={(e) => setCardVariant(e.target.value as CardVariant)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
                >
                  <option value="standard">Standard (Quote + Bottom Avatar & Name)</option>
                  <option value="centered">Centered (Top Avatar + Stars + Centered Quote)</option>
                  <option value="portrait">Portrait (Large Featured Photo Card)</option>
                  <option value="compact">Compact (Headline + Multi-Avatar Stack)</option>
                </select>
              </div>
            </div>
          )}

          {/* Rating */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Rating {type === "intern" ? "(optional)" : "*"}
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <Star
                    className={`w-5 h-5 ${
                      rating !== null && star <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
              {type === "intern" && (
                <button
                  type="button"
                  onClick={() => setRating(null)}
                  className="ml-3 text-[11px] text-slate-500 hover:underline cursor-pointer"
                >
                  Clear rating
                </button>
              )}
            </div>
          </div>

          {/* Testimonial Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Testimonial / Review Text *
            </label>
            <textarea
              value={testimonialText}
              onChange={(e) => setTestimonialText(e.target.value)}
              rows={4}
              required
              placeholder="Enter client review or intern feedback..."
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all leading-relaxed"
            />
          </div>

          {/* Profile Image Cloudinary Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Profile Photo {type === "intern" && cardVariant === "portrait" ? "(Large photo recommended)" : ""}
            </label>

            {profileImageUrl ? (
              <div className="flex items-center gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-slate-200 bg-slate-200 shrink-0">
                  <Image
                    src={profileImageUrl}
                    alt={name || "Profile"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">
                    Photo uploaded successfully
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {profileImagePublicId ? `ID: ${profileImagePublicId}` : "External URL"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-[#1668E8] bg-slate-50/60 hover:bg-blue-50/30 rounded-xl p-4 text-center cursor-pointer transition-colors"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                />
                {isUploading ? (
                  <div className="flex items-center justify-center gap-2 text-xs text-[#1668E8]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading to Cloudinary...</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                    <p className="text-xs font-medium text-slate-700">
                      Click to upload profile photo to Cloudinary
                    </p>
                    <p className="text-[10px] text-slate-400">
                      JPG, PNG, or WebP (max 8MB)
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Status, Display Order & Featured Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-slate-100">
            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TestimonialStatus)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="unpublished">Unpublished</option>
              </select>
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
              />
            </div>

            {/* Featured Toggle */}
            <div className="flex flex-col justify-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#1668E8] rounded-md border-slate-300 focus:ring-[#1668E8]"
                />
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  Featured
                </span>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              disabled={isSaving}
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="px-5 py-2 text-xs font-bold text-white bg-[#1668E8] hover:bg-blue-700 active:scale-95 rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{isSaving ? "Saving..." : initialData ? "Save Changes" : "Create Testimonial"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
