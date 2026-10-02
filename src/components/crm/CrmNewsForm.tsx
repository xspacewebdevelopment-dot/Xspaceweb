"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { NewsArticle, newsCategories } from "@/lib/db/schema";
import {
  ArrowLeft,
  Upload,
  AlertCircle,
  Loader2,
  Trash2,
} from "lucide-react";

interface CrmNewsFormProps {
  initialArticle?: NewsArticle;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const CrmNewsForm: React.FC<CrmNewsFormProps> = ({ initialArticle }) => {
  const router = useRouter();
  const isEditing = Boolean(initialArticle);

  // Form states
  const [title, setTitle] = useState(initialArticle?.title || "");
  const [slug, setSlug] = useState(initialArticle?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(Boolean(initialArticle?.slug));
  const [category, setCategory] = useState(initialArticle?.category || "Company Updates");
  const [summary, setSummary] = useState(initialArticle?.summary || "");
  const [content, setContent] = useState(initialArticle?.content || "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialArticle?.coverImageUrl || "");
  const [coverImagePublicId, setCoverImagePublicId] = useState<string | null>(
    initialArticle?.coverImagePublicId || null
  );
  const [status, setStatus] = useState<"draft" | "published" | "unpublished">(
    (initialArticle?.status as "draft" | "published" | "unpublished") || "draft"
  );
  const [isFeatured, setIsFeatured] = useState(initialArticle?.isFeatured || false);
  const [displayOrder, setDisplayOrder] = useState<number>(initialArticle?.displayOrder ?? 0);
  const [publishedAt, setPublishedAt] = useState<string>(
    initialArticle?.publishedAt
      ? new Date(initialArticle.publishedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [notifySubscribers, setNotifySubscribers] = useState(false);

  // UI state
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [contentTab, setContentTab] = useState<"write" | "preview">("write");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle title change & auto slug
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManuallyEdited) {
      setSlug(slugify(val));
    }
  };

  // Upload image to Cloudinary via backend
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file (PNG, JPG, WebP).");
      return;
    }
    setIsUploading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/news/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setCoverImageUrl(data.url);
        setCoverImagePublicId(data.publicId || null);
      } else {
        setErrorMessage(data.error || "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Image upload failed. Check network connection.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Submit Handler
  const handleSubmit = async (submitStatus?: "draft" | "published") => {
    const finalStatus = submitStatus || status;
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage("Title is required.");
      return;
    }
    if (!summary.trim()) {
      setErrorMessage("Summary is required.");
      return;
    }
    if (!content.trim()) {
      setErrorMessage("Full article content is required.");
      return;
    }
    if (!coverImageUrl.trim()) {
      setErrorMessage("Please upload or provide a cover image.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      category,
      summary: summary.trim(),
      content: content.trim(),
      coverImageUrl: coverImageUrl.trim(),
      coverImagePublicId,
      status: finalStatus,
      isFeatured,
      displayOrder: Number(displayOrder) || 0,
      publishedAt: finalStatus === "published" ? new Date(publishedAt).toISOString() : null,
      notifySubscribers,
    };

    try {
      const url =
        isEditing && initialArticle
          ? `/api/admin/news/${initialArticle.id}`
          : "/api/admin/news";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/crm/news");
        router.refresh();
      } else {
        setErrorMessage(data.error || "Failed to save article.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/crm/news"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News & Updates</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("draft")}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("published")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#1668E8] text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isEditing ? "Update & Publish" : "Publish Article"}</span>
          </button>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid: Form Left, Settings Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Core Article Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Article Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. MakeGSTBill New Features Released"
                className="w-full px-4 py-2.5 text-base sm:text-lg font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-600">
                  URL Slug
                </label>
                <span className="text-[11px] text-slate-400">
                  /news-and-updates/{slug || "slug"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setIsSlugManuallyEdited(true);
                  }}
                  placeholder="custom-article-slug"
                  className="w-full px-3 py-1.5 font-mono text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSlug(slugify(title));
                    setIsSlugManuallyEdited(false);
                  }}
                  className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg bg-white whitespace-nowrap"
                  title="Reset slug from title"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {/* Short Summary */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Short Summary / Card Description <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  {summary.length} characters
                </span>
              </div>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="A compelling 1-3 sentence summary displayed on the news card and article header..."
                className="w-full px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all leading-relaxed"
              />
            </div>

            {/* Full Article Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Full Article Content <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setContentTab("write")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      contentTab === "write"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentTab("preview")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      contentTab === "preview"
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {contentTab === "write" ? (
                <div>
                  <textarea
                    rows={14}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write the full news story here... Separate paragraphs with blank lines. Supports markdown headings (# Heading), bullets (- bullet), bold (**text**), and quotes (> quote)."
                    className="w-full px-4 py-3 font-mono text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all leading-relaxed"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tip: Use blank lines between paragraphs for readable web formatting.
                  </p>
                </div>
              ) : (
                <div className="min-h-[350px] p-5 bg-white border border-slate-200 rounded-xl text-slate-800 prose prose-slate max-w-none text-sm leading-relaxed whitespace-pre-line">
                  {content ? (
                    content
                  ) : (
                    <span className="text-slate-400 italic">No content written yet.</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Cover Image & Publishing Meta */}
        <div className="space-y-6">
          {/* Cover Image Upload (Cloudinary) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Cover Image <span className="text-rose-500">*</span>
            </label>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] ${
                coverImageUrl
                  ? "border-slate-200 bg-slate-50/50"
                  : "border-slate-300 hover:border-[#1668E8] bg-slate-50 hover:bg-blue-50/20"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />

              {isUploading ? (
                <div className="py-6 flex flex-col items-center gap-2 text-slate-600">
                  <Loader2 className="w-8 h-8 animate-spin text-[#1668E8]" />
                  <span className="text-xs font-medium">Uploading to Cloudinary...</span>
                </div>
              ) : coverImageUrl ? (
                <div className="relative w-full h-36 rounded-lg overflow-hidden border border-slate-200 group">
                  <Image
                    src={coverImageUrl}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                    <Upload className="w-4 h-4" />
                    <span>Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1668E8] flex items-center justify-center mx-auto">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      PNG, JPG, or WebP (Cloudinary secure)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Image URL input */}
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Or Image URL
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={coverImageUrl}
                  onChange={(e) => {
                    setCoverImageUrl(e.target.value);
                    setCoverImagePublicId(null);
                  }}
                  placeholder="https://... or /images/..."
                  className="w-full px-3 py-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8]"
                />
                {coverImageUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImageUrl("");
                      setCoverImagePublicId(null);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                    title="Remove image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Publishing Settings Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Publication Settings
            </h3>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] text-slate-800"
              >
                {newsCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as "draft" | "published" | "unpublished")
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] text-slate-800"
              >
                <option value="draft">Draft (Not public)</option>
                <option value="published">Published (Visible publicly)</option>
                <option value="unpublished">Unpublished (Hidden from public)</option>
              </select>
            </div>

            {/* Publication Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Publication Date
              </label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] text-slate-800"
              />
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value, 10) || 0)}
                placeholder="0"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] text-slate-800"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Lower numbers appear first on the site.
              </p>
            </div>

            {/* Featured toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Featured Article
                </span>
                <span className="text-[11px] text-slate-400">
                  Prioritize at top of Latest News
                </span>
              </div>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-[#1668E8] rounded border-slate-300 focus:ring-[#1668E8]"
              />
            </div>

            {/* Notify Newsletter Subscribers Checkbox */}
            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notifySubscribers}
                  onChange={(e) => setNotifySubscribers(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-[#1668E8] focus:ring-[#1668E8]"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Email Newsletter Subscribers
                  </span>
                  <span className="text-[11px] text-slate-500 block leading-tight">
                    Automatically dispatch branded email update to active subscribers upon publishing
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
