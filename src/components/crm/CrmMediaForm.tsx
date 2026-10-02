"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MediaMentionItem, mediaMentionStatusEnum } from "@/lib/db/schema";
import {
  ArrowLeft,
  Upload,
  AlertCircle,
  Loader2,
  Trash2,
  ExternalLink,
} from "lucide-react";

interface CrmMediaFormProps {
  initialMention?: MediaMentionItem;
}

export const CrmMediaForm: React.FC<CrmMediaFormProps> = ({ initialMention }) => {
  const router = useRouter();
  const isEditing = !!initialMention;

  const [publicationName, setPublicationName] = useState(
    initialMention?.publicationName || ""
  );
  const [headline, setHeadline] = useState(initialMention?.headline || "");
  const [articleUrl, setArticleUrl] = useState(initialMention?.articleUrl || "");
  const [publishedAt, setPublishedAt] = useState(
    initialMention?.publishedAt
      ? new Date(initialMention.publishedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [status, setStatus] = useState<string>(
    initialMention?.status || "published"
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    initialMention?.displayOrder ?? 0
  );

  // Logo state
  const [logoUrl, setLogoUrl] = useState(initialMention?.logoUrl || "");
  const [logoPublicId, setLogoPublicId] = useState(
    initialMention?.logoPublicId || ""
  );
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState<string | null>(null);

  // Submit state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingLogo(true);
      setLogoUploadError(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload logo");
      }

      setLogoUrl(data.url);
      setLogoPublicId(data.publicId);
    } catch (err: any) {
      console.error("Logo upload error:", err);
      setLogoUploadError(err.message || "Failed to upload logo to Cloudinary");
    } finally {
      setUploadingLogo(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveLogo = () => {
    setLogoUrl("");
    setLogoPublicId("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!publicationName.trim()) {
      setError("Publication name is required.");
      return;
    }
    if (!headline.trim()) {
      setError("Headline is required.");
      return;
    }
    if (!articleUrl.trim()) {
      setError("Article URL is required.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        publicationName: publicationName.trim(),
        headline: headline.trim(),
        articleUrl: articleUrl.trim(),
        publishedAt: new Date(publishedAt).toISOString(),
        logoUrl: logoUrl.trim(),
        logoPublicId: logoPublicId.trim() || null,
        status,
        displayOrder: Number(displayOrder) || 0,
      };

      const url = isEditing
        ? `/api/admin/media/${initialMention.id}`
        : "/api/admin/media";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save media mention");
      }

      router.push("/crm/media");
      router.refresh();
    } catch (err: any) {
      console.error("Save media mention error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/crm/media"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Media Mentions</span>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isEditing ? "Edit Media Mention" : "Add New Media Mention"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {isEditing
            ? `Editing publication feature for "${initialMention?.publicationName}".`
            : "Feature a press release, online news coverage, or external media article."}
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          {/* Publication Name & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Publication / Outlet Name *
              </label>
              <input
                type="text"
                required
                value={publicationName}
                onChange={(e) => setPublicationName(e.target.value)}
                placeholder="e.g. The Economic Times, YourStory"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1668E8]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Publication Date *
              </label>
              <input
                type="date"
                required
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#1668E8]"
              />
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Headline / Feature Title *
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. XSPACEWEB Focuses on Digital Transformation for MSMEs"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1668E8]"
            />
          </div>

          {/* Article URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              External Article URL *
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={articleUrl}
                onChange={(e) => setArticleUrl(e.target.value)}
                placeholder="https://economictimes.indiatimes.com/..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1668E8]"
              />
              {articleUrl && (
                <a
                  href={articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1668E8]"
                  title="Test link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Visitors will be redirected to this external article when clicking &quot;Read Article&quot;.
            </p>
          </div>

          {/* Publication Logo Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Publication Logo (Optional)
            </label>

            {logoUrl ? (
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                <div className="relative w-16 h-12 rounded-lg bg-white border border-slate-200 overflow-hidden flex items-center justify-center p-1">
                  <Image
                    src={logoUrl}
                    alt="Logo preview"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold text-slate-800 block truncate">
                    Logo uploaded to Cloudinary
                  </span>
                  <span className="text-[11px] text-slate-400 truncate block">
                    {logoUrl}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove Logo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-[#1668E8] rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                {uploadingLogo ? (
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin text-[#1668E8]" />
                    <span className="text-xs font-semibold">Uploading logo to Cloudinary...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#1668E8] flex items-center justify-center mb-1">
                      <Upload className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      Click to upload publication logo
                    </span>
                    <span className="text-[11px] text-slate-400">
                      PNG, SVG, JPG, or WebP up to 5MB (stored in xspaceweb/media-mentions)
                    </span>
                  </div>
                )}
              </div>
            )}

            {logoUploadError && (
              <p className="text-xs text-red-600 mt-1.5 font-medium">{logoUploadError}</p>
            )}
          </div>

          {/* Status & Display Order */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Publication Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#1668E8]"
              >
                {mediaMentionStatusEnum.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                placeholder="0"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#1668E8]"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Lower numbers display first on the public website.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/crm/media"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || uploadingLogo}
            className="px-6 py-2.5 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-all shadow-2xs inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isEditing ? "Save Changes" : "Create Mention"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
