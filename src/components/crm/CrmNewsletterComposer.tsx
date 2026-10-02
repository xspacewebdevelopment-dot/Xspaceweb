"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Eye,
  Edit3,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Users,
  Calendar,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { NewsletterBroadcast } from "@/lib/db/schema";

export const CrmNewsletterComposer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form State (initialized from query params if passed from news/event)
  const [subject, setSubject] = useState(searchParams.get("subject") || "");
  const [previewText, setPreviewText] = useState(searchParams.get("previewText") || "");
  const [headline, setHeadline] = useState(searchParams.get("headline") || "");
  const [content, setContent] = useState(searchParams.get("content") || "");
  const [ctaLabel, setCtaLabel] = useState(searchParams.get("ctaLabel") || "Read Full Story");
  const [ctaUrl, setCtaUrl] = useState(searchParams.get("ctaUrl") || "");

  // Optional Image State
  const [imageUrl, setImageUrl] = useState(searchParams.get("imageUrl") || "");
  const [imagePublicId, setImagePublicId] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  // Active Tab: "compose" or "preview"
  const [activeTab, setActiveTab] = useState<"compose" | "preview">("compose");

  // Subscriber count
  const [activeSubscriberCount, setActiveSubscriberCount] = useState<number>(0);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);

  // Past broadcasts history
  const [broadcasts, setBroadcasts] = useState<NewsletterBroadcast[]>([]);
  const [loadingBroadcasts, setLoadingBroadcasts] = useState(true);

  // Send Confirmation Modal State
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch active subscriber count
    const fetchAudience = async () => {
      try {
        setLoadingSubscribers(true);
        const res = await fetch("/api/admin/newsletter/subscribers?filter=subscribed");
        const data = await res.json();
        setActiveSubscriberCount(data.activeCount ?? 0);
      } catch (err) {
        console.error("Failed to load audience count:", err);
      } finally {
        setLoadingSubscribers(false);
      }
    };

    // Fetch broadcast history
    const fetchBroadcastHistory = async () => {
      try {
        setLoadingBroadcasts(true);
        const res = await fetch("/api/admin/newsletter/broadcasts");
        const data = await res.json();
        if (data.broadcasts) {
          setBroadcasts(data.broadcasts);
        }
      } catch (err) {
        console.error("Failed to load broadcasts:", err);
      } finally {
        setLoadingBroadcasts(false);
      }
    };

    fetchAudience();
    fetchBroadcastHistory();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setImageUploadError(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/newsletter/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      setImageUrl(data.url);
      setImagePublicId(data.publicId);
    } catch (err: any) {
      console.error("Image upload error:", err);
      setImageUploadError(err.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setImagePublicId("");
  };

  const handleOpenConfirmModal = (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    setSendSuccess(null);

    if (!subject.trim()) {
      setSendError("Subject is required.");
      return;
    }
    if (!headline.trim()) {
      setSendError("Headline is required.");
      return;
    }
    if (!content.trim()) {
      setSendError("Content is required.");
      return;
    }

    setConfirmModalOpen(true);
  };

  const handleExecuteSend = async () => {
    try {
      setSending(true);
      setSendError(null);

      const payload = {
        subject: subject.trim(),
        previewText: previewText.trim() || undefined,
        headline: headline.trim(),
        content: content.trim(),
        ctaLabel: ctaLabel.trim() || undefined,
        ctaUrl: ctaUrl.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        imagePublicId: imagePublicId.trim() || undefined,
      };

      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch newsletter broadcast");
      }

      setConfirmModalOpen(false);
      setSendSuccess(
        data.message ||
          `Newsletter broadcast successfully sent to ${data.recipientCount} subscribers.`
      );

      // Reset form
      setSubject("");
      setPreviewText("");
      setHeadline("");
      setContent("");
      setCtaUrl("");
      setImageUrl("");
      setImagePublicId("");
      setActiveTab("compose");

      // Refresh broadcast list
      const updatedRes = await fetch("/api/admin/newsletter/broadcasts");
      const updatedData = await updatedRes.json();
      if (updatedData.broadcasts) {
        setBroadcasts(updatedData.broadcasts);
      }
    } catch (err: any) {
      console.error("Failed to execute newsletter broadcast:", err);
      setSendError(err.message || "Failed to send newsletter broadcast.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/crm/newsletter"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Subscribers</span>
        </Link>

        {/* Audience badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-[#1668E8]">
          <Users className="w-3.5 h-3.5" />
          <span>
            {loadingSubscribers ? "Checking audience..." : `${activeSubscriberCount} Active Subscribers`}
          </span>
        </div>
      </div>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Compose & Send Newsletter
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Create branded email broadcasts to send to all active newsletter subscribers via Resend.
        </p>
      </div>

      {sendSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
          <span className="font-semibold">{sendSuccess}</span>
        </div>
      )}

      {sendError && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{sendError}</span>
        </div>
      )}

      {/* Tab Switcher: Compose vs Preview */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("compose")}
          className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "compose"
              ? "border-[#1668E8] text-[#1668E8]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Compose Content</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "preview"
              ? "border-[#1668E8] text-[#1668E8]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live Email Preview</span>
        </button>
      </div>

      {/* COMPOSE TAB */}
      {activeTab === "compose" && (
        <form onSubmit={handleOpenConfirmModal} className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
            {/* Subject & Preview Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Email Subject Line *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Exciting New Platform Releases & Upcoming Webinars"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1668E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Inbox Preview Text (Optional)
                </label>
                <input
                  type="text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="e.g. Read the latest announcements from XSPACEWEB"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1668E8]"
                />
              </div>
            </div>

            {/* Headline */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Newsletter Headline *
              </label>
              <input
                type="text"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Accelerating Digital Innovation Across India"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1668E8]"
              />
            </div>

            {/* Campaign Image Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Hero Image (Optional)
              </label>

              {imageUrl ? (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                  <div className="relative w-24 h-16 rounded-lg bg-white border border-slate-200 overflow-hidden flex items-center justify-center">
                    <Image
                      src={imageUrl}
                      alt="Campaign image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-slate-800 block truncate">
                      Newsletter Banner uploaded to Cloudinary
                    </span>
                    <span className="text-[11px] text-slate-400 truncate block">
                      {imageUrl}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove Image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-[#1668E8] rounded-xl p-5 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-blue-50/20"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {uploadingImage ? (
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                      <Loader2 className="w-6 h-6 animate-spin text-[#1668E8]" />
                      <span className="text-xs font-semibold">Uploading to Cloudinary...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1 text-slate-500">
                      <Upload className="w-5 h-5 text-[#1668E8] mb-0.5" />
                      <span className="text-xs font-bold text-slate-700">
                        Click to add banner image
                      </span>
                      <span className="text-[11px] text-slate-400">
                        JPG, PNG, WebP up to 5MB (stored in xspaceweb/newsletter)
                      </span>
                    </div>
                  )}
                </div>
              )}

              {imageUploadError && (
                <p className="text-xs text-red-600 mt-1.5 font-medium">{imageUploadError}</p>
              )}
            </div>

            {/* Content Body */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Newsletter Content *
              </label>
              <textarea
                required
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your newsletter message here. Separate paragraphs with empty lines..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1668E8] leading-relaxed font-sans"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Paragraphs will be automatically styled with generous spacing in the recipient inbox.
              </p>
            </div>

            {/* Call To Action (Button) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  CTA Button Label (Optional)
                </label>
                <input
                  type="text"
                  value={ctaLabel}
                  onChange={(e) => setCtaLabel(e.target.value)}
                  placeholder="e.g. Read Full Story, Register Online"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#1668E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  CTA Button Destination URL
                </label>
                <input
                  type="url"
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                  placeholder="https://xspaceweb.com/news-and-updates/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#1668E8]"
                />
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              <span>Preview Email First</span>
            </button>

            <button
              type="submit"
              disabled={uploadingImage || !subject || !headline || !content}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1668E8] text-white text-xs sm:text-sm font-bold hover:bg-blue-700 transition-all shadow-2xs cursor-pointer disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span>Continue to Send &rarr;</span>
            </button>
          </div>
        </form>
      )}

      {/* PREVIEW TAB */}
      {activeTab === "preview" && (
        <div className="space-y-6">
          <div className="bg-slate-100 p-4 sm:p-8 rounded-2xl border border-slate-200 flex justify-center">
            {/* Mock Email Frame */}
            <div className="bg-white rounded-2xl max-w-xl w-full shadow-lg border border-slate-200/80 overflow-hidden text-left">
              {/* Inbox Mock Header */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>From: XSPACEWEB &lt;news@xspaceweb.com&gt;</span>
                  <span>{new Date().toLocaleDateString("en-GB", { month: "short", day: "numeric" })}</span>
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  {subject || "Untitled Newsletter Subject"}
                </div>
                {previewText && (
                  <div className="text-[11px] text-slate-500 italic">
                    Preview: {previewText}
                  </div>
                )}
              </div>

              {/* Email Content Frame */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Header Branding */}
                <div className="bg-[#07152B] p-5 rounded-xl text-white">
                  <span className="text-lg font-extrabold tracking-tight">XSPACEWEB</span>
                  <span className="block text-[10px] text-slate-300 font-bold uppercase tracking-wider mt-0.5">
                    Official Newsletter & Updates
                  </span>
                </div>

                {/* Hero Image */}
                {imageUrl && (
                  <div className="relative w-full h-56 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                    <Image
                      src={imageUrl}
                      alt={headline}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Headline */}
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#07152B] leading-snug">
                  {headline || "Your Newsletter Headline"}
                </h2>

                {/* Content */}
                <div className="text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
                  {content || "Your newsletter body text will appear formatted here."}
                </div>

                {/* CTA Button */}
                {ctaLabel && ctaUrl && (
                  <div className="pt-2">
                    <a
                      href={ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1668E8] text-white font-bold text-xs sm:text-sm shadow-md"
                    >
                      <span>{ctaLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                {/* Email Footer */}
                <div className="pt-6 border-t border-slate-100 text-center text-xs text-slate-400 space-y-1">
                  <p>You received this email because you subscribed to XSPACEWEB updates.</p>
                  <p className="text-[11px] text-slate-400">
                    &copy; {new Date().getFullYear()} XSPACEWEB Technologies &bull;{" "}
                    <span className="underline cursor-pointer">Unsubscribe</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveTab("compose")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-slate-500" />
              <span>Back to Editing</span>
            </button>

            <button
              type="button"
              onClick={() => setConfirmModalOpen(true)}
              disabled={!subject || !headline || !content}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1668E8] text-white text-xs sm:text-sm font-bold hover:bg-blue-700 transition-all shadow-2xs cursor-pointer disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span>Confirm & Dispatch Broadcast</span>
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL BEFORE SEND */}
      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-[#1668E8]">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5 text-[#1668E8]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Send Newsletter Broadcast?</h3>
                <p className="text-xs text-slate-500">Explicit confirmation required.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
              <div>
                <span className="text-slate-400 block uppercase text-[10px] font-bold">Subject</span>
                <strong className="text-slate-800 font-semibold">{subject}</strong>
              </div>
              <div>
                <span className="text-slate-400 block uppercase text-[10px] font-bold">Target Audience</span>
                <span className="font-bold text-emerald-600">
                  This newsletter will be sent to {activeSubscriberCount} active subscribers.
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Once sent, Resend will immediately dispatch the broadcast to all subscribed contacts.
              Unsubscribed users are automatically excluded.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConfirmModalOpen(false)}
                disabled={sending}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteSend}
                disabled={sending}
                className="px-5 py-2 rounded-xl bg-[#1668E8] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {sending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{sending ? "Sending..." : "Send Newsletter"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECENT BROADCASTS HISTORY */}
      <div className="pt-8 border-t border-slate-200 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Broadcasts History</h2>
          <p className="text-xs text-slate-500">Past newsletters dispatched to subscribers.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          {loadingBroadcasts ? (
            <div className="p-8 text-center text-xs text-slate-400">Loading broadcast history...</div>
          ) : broadcasts.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No newsletter broadcasts sent yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {broadcasts.map((b) => (
                <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{b.subject}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{b.headline}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-slate-600">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {b.recipientCount} Recipients
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {b.sentAt
                        ? new Date(b.sentAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "Draft"}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
