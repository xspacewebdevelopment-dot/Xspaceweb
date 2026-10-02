"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { EventItem } from "@/lib/db/schema";
import {
  ArrowLeft,
  Upload,
  AlertCircle,
  Loader2,
  Trash2,
  Globe,
  MapPin,
} from "lucide-react";

interface CrmEventFormProps {
  initialEvent?: EventItem;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const CrmEventForm: React.FC<CrmEventFormProps> = ({ initialEvent }) => {
  const router = useRouter();
  const isEditing = Boolean(initialEvent);

  const [title, setTitle] = useState(initialEvent?.title || "");
  const [slug, setSlug] = useState(initialEvent?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(Boolean(initialEvent?.slug));
  const [shortDescription, setShortDescription] = useState(initialEvent?.shortDescription || "");
  const [fullDescription, setFullDescription] = useState(initialEvent?.fullDescription || "");
  const [eventDate, setEventDate] = useState<string>(
    initialEvent?.eventDate
      ? new Date(initialEvent.eventDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [startTime, setStartTime] = useState(initialEvent?.startTime || "");
  const [endTime, setEndTime] = useState(initialEvent?.endTime || "");
  const [locationType, setLocationType] = useState<"online" | "offline">(
    (initialEvent?.locationType as "online" | "offline") || "offline"
  );
  const [location, setLocation] = useState(initialEvent?.location || "");
  const [registrationUrl, setRegistrationUrl] = useState(initialEvent?.registrationUrl || "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialEvent?.coverImageUrl || "");
  const [coverImagePublicId, setCoverImagePublicId] = useState<string | null>(
    initialEvent?.coverImagePublicId || null
  );
  const [status, setStatus] = useState<"draft" | "published" | "unpublished">(
    (initialEvent?.status as "draft" | "published" | "unpublished") || "draft"
  );
  const [isFeatured, setIsFeatured] = useState(initialEvent?.isFeatured || false);
  const [displayOrder, setDisplayOrder] = useState<number>(initialEvent?.displayOrder ?? 0);
  const [notifySubscribers, setNotifySubscribers] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManuallyEdited) {
      setSlug(slugify(val));
    }
  };

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
      const res = await fetch("/api/admin/events/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setCoverImageUrl(data.url);
        setCoverImagePublicId(data.publicId || null);
      } else {
        setErrorMessage(data.error || "Failed to upload cover image.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (submitStatus?: "draft" | "published") => {
    const finalStatus = submitStatus || status;
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage("Event title is required.");
      return;
    }
    if (!shortDescription.trim()) {
      setErrorMessage("Short description is required.");
      return;
    }
    if (!eventDate) {
      setErrorMessage("Event date is required.");
      return;
    }
    if (!location.trim()) {
      setErrorMessage("Event location or platform name is required.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim() || null,
      eventDate: new Date(eventDate).toISOString(),
      startTime: startTime.trim() || null,
      endTime: endTime.trim() || null,
      locationType,
      location: location.trim(),
      registrationUrl: registrationUrl.trim() || null,
      coverImageUrl: coverImageUrl.trim() || null,
      coverImagePublicId,
      status: finalStatus,
      isFeatured,
      displayOrder: Number(displayOrder) || 0,
      notifySubscribers,
    };

    try {
      const url =
        isEditing && initialEvent
          ? `/api/admin/events/${initialEvent.id}`
          : "/api/admin/events";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/crm/events");
        router.refresh();
      } else {
        setErrorMessage(data.error || "Failed to save event.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred while saving event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/crm/events"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events & Webinars</span>
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
            <span>{isEditing ? "Update & Publish" : "Publish Event"}</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs sm:text-sm font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid: Form Left, Settings Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Event Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
            {/* Event Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Event Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Tech Innovators Meet 2026"
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
                  /news-and-updates/events/{slug || "slug"}
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
                  placeholder="custom-event-slug"
                  className="w-full px-3 py-1.5 font-mono text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSlug(slugify(title));
                    setIsSlugManuallyEdited(false);
                  }}
                  className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-900 border border-slate-200 rounded-lg bg-white whitespace-nowrap"
                >
                  Regenerate
                </button>
              </div>
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Event Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Start Time
                </label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="e.g. 10:00 AM"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  End Time
                </label>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="e.g. 05:00 PM"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] text-slate-800"
                />
              </div>
            </div>

            {/* Event Type & Location */}
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Event Format
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setLocationType("offline")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      locationType === "offline"
                        ? "bg-blue-50 border-[#1668E8] text-[#1668E8]"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>In-Person / Offline</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType("online")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      locationType === "online"
                        ? "bg-blue-50 border-[#1668E8] text-[#1668E8]"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>Online / Webinar</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {locationType === "online"
                    ? "Online Platform / Meeting Link *"
                    : "Venue & City Location *"}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={
                    locationType === "online"
                      ? "e.g. Online Event (Google Meet / Zoom)"
                      : "e.g. Kolkata, India (Hyatt Regency Ballroom)"
                  }
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] text-slate-800"
                />
              </div>
            </div>

            {/* Registration URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Registration Link
              </label>
              <input
                type="url"
                value={registrationUrl}
                onChange={(e) => setRegistrationUrl(e.target.value)}
                placeholder="https://forms.gle/... or https://typeform.com/..."
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] text-slate-800"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Visitors clicking &quot;Register Now&quot; will be redirected to this link.
              </p>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Short Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="A 1-2 sentence overview shown on the event card..."
                className="w-full px-3.5 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all leading-relaxed"
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Description &amp; Agenda
              </label>
              <textarea
                rows={8}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Detailed event overview, speaker lineup, workshop topics, and participant instructions..."
                className="w-full px-4 py-3 font-mono text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] transition-all leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Cover Image & Settings */}
        <div className="space-y-6">
          {/* Cover Image Upload (Cloudinary) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Event Cover Image
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] border-slate-300 hover:border-[#1668E8] bg-slate-50 hover:bg-blue-50/20"
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
                    alt="Event cover"
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
                      Upload Event Cover
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Cloudinary secure (xspaceweb/events)
                    </p>
                  </div>
                </div>
              )}
            </div>

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
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Publication Settings */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
              Event Status &amp; Visibility
            </h3>

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
                <option value="draft">Draft (Private in CRM)</option>
                <option value="published">Published (Visible on site)</option>
                <option value="unpublished">Unpublished (Hidden from site)</option>
              </select>
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
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 focus:border-[#1668E8] text-slate-800"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Lower numbers appear first within the same date.
              </p>
            </div>

            {/* Featured toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Featured Event
                </span>
                <span className="text-[11px] text-slate-400">
                  Highlight in the large card on left
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
                    Automatically dispatch branded event invitation to active subscribers upon publishing
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
