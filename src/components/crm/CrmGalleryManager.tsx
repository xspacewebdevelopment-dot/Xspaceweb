"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Images,
  Plus,
  Trash2,
  Edit3,
  Star,
  Upload,
  Loader2,
  CheckCircle2,
  Calendar,
  X,
  AlertTriangle,
} from "lucide-react";

export interface GalleryImageWithEvent {
  id: string;
  eventId: string | null;
  title: string | null;
  caption: string | null;
  imageUrl: string;
  imagePublicId: string | null;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: Date | string;
  eventTitle: string | null;
}

interface AvailableEvent {
  id: string;
  title: string;
}

interface CrmGalleryManagerProps {
  initialImages: GalleryImageWithEvent[];
  availableEvents: AvailableEvent[];
}

export const CrmGalleryManager: React.FC<CrmGalleryManagerProps> = ({
  initialImages,
  availableEvents,
}) => {
  const [images, setImages] = useState<GalleryImageWithEvent[]>(initialImages);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Add Image Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Add form fields
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImagePublicId, setNewImagePublicId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newEventId, setNewEventId] = useState("");
  const [newIsFeatured, setNewIsFeatured] = useState(true);
  const [newDisplayOrder, setNewDisplayOrder] = useState(0);

  // Edit Modal state
  const [editingImage, setEditingImage] = useState<GalleryImageWithEvent | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editEventId, setEditEventId] = useState("");
  const [editIsFeatured, setEditIsFeatured] = useState(false);
  const [editDisplayOrder, setEditDisplayOrder] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete Confirmation Modal
  const [deleteModalImage, setDeleteModalImage] = useState<GalleryImageWithEvent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Upload to Cloudinary
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose a valid image file.");
      return;
    }
    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/events/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setNewImageUrl(data.url);
        setNewImagePublicId(data.publicId || null);
      } else {
        setUploadError(data.error || "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      setUploadError("Upload failed. Check network connection.");
    } finally {
      setIsUploading(false);
    }
  };

  // Save New Gallery Image
  const handleSaveNewImage = async () => {
    if (!newImageUrl.trim()) {
      setUploadError("Please upload an image or provide an image URL.");
      return;
    }

    setIsSaving(true);
    setUploadError(null);

    try {
      const res = await fetch("/api/admin/events/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: newImageUrl.trim(),
          imagePublicId: newImagePublicId,
          title: newTitle.trim() || null,
          caption: newCaption.trim() || null,
          eventId: newEventId || null,
          isFeatured: newIsFeatured,
          displayOrder: Number(newDisplayOrder) || 0,
        }),
      });

      const data = await res.json();
      if (res.ok && data.images && data.images[0]) {
        const linkedEvent = availableEvents.find((e) => e.id === newEventId);
        const createdWithMeta: GalleryImageWithEvent = {
          ...data.images[0],
          eventTitle: linkedEvent ? linkedEvent.title : null,
        };
        setImages((prev) => [createdWithMeta, ...prev]);
        showToast("Image added to event gallery!");
        setIsAddModalOpen(false);
        // Reset form
        setNewImageUrl("");
        setNewImagePublicId(null);
        setNewTitle("");
        setNewCaption("");
        setNewEventId("");
        setNewIsFeatured(true);
        setNewDisplayOrder(0);
      } else {
        setUploadError(data.error || "Failed to save gallery image.");
      }
    } catch (err) {
      console.error(err);
      setUploadError("Error saving image.");
    } finally {
      setIsSaving(false);
    }
  };

  // Quick Feature Toggle
  const handleToggleFeature = async (img: GalleryImageWithEvent) => {
    try {
      const res = await fetch(`/api/admin/events/gallery/${img.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !img.isFeatured }),
      });
      if (res.ok) {
        setImages((prev) =>
          prev.map((it) => (it.id === img.id ? { ...it, isFeatured: !it.isFeatured } : it))
        );
        showToast(!img.isFeatured ? "Marked as featured!" : "Removed from featured.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (img: GalleryImageWithEvent) => {
    setEditingImage(img);
    setEditTitle(img.title || "");
    setEditCaption(img.caption || "");
    setEditEventId(img.eventId || "");
    setEditIsFeatured(img.isFeatured);
    setEditDisplayOrder(img.displayOrder);
  };

  // Save Edit
  const handleSaveEdit = async () => {
    if (!editingImage) return;
    setIsUpdating(true);

    try {
      const res = await fetch(`/api/admin/events/gallery/${editingImage.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.trim() || null,
          caption: editCaption.trim() || null,
          eventId: editEventId || null,
          isFeatured: editIsFeatured,
          displayOrder: Number(editDisplayOrder) || 0,
        }),
      });

      if (res.ok) {
        const linkedEvent = availableEvents.find((e) => e.id === editEventId);
        setImages((prev) =>
          prev.map((it) =>
            it.id === editingImage.id
              ? {
                  ...it,
                  title: editTitle.trim() || null,
                  caption: editCaption.trim() || null,
                  eventId: editEventId || null,
                  eventTitle: linkedEvent ? linkedEvent.title : null,
                  isFeatured: editIsFeatured,
                  displayOrder: Number(editDisplayOrder) || 0,
                }
              : it
          )
        );
        showToast("Gallery image updated!");
        setEditingImage(null);
      } else {
        alert("Failed to update image details.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating image.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Confirm Permanent Delete
  const handleConfirmDelete = async () => {
    if (!deleteModalImage) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/events/gallery/${deleteModalImage.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setImages((prev) => prev.filter((it) => it.id !== deleteModalImage.id));
        showToast("Image permanently deleted from gallery and Cloudinary.");
        setDeleteModalImage(null);
      } else {
        alert("Failed to delete gallery image.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Event Gallery
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage photos from past conferences, workshops, and milestones. The top 5 featured images appear on the public site.
          </p>
        </div>

        <button
          onClick={() => {
            setUploadError(null);
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1668E8] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Images</span>
        </button>
      </div>

      {/* Visual Grid of Images */}
      {images.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center text-slate-500">
          <Images className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="text-base font-semibold text-slate-700">No gallery images yet</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Upload photos from events and workshops to showcase them on the public Event Gallery.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#1668E8] text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col group hover:shadow-md transition-all"
            >
              {/* Image Preview Container */}
              <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title || "Gallery image"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Featured Badge */}
                {item.isFeatured && (
                  <div className="absolute top-2.5 left-2.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-bold tracking-wider uppercase shadow-sm">
                      <Star className="w-3 h-3 fill-white" />
                      Featured
                    </span>
                  </div>
                )}

                {/* Order Badge */}
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono">
                    #{item.displayOrder}
                  </span>
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {item.title || "Untitled Photo"}
                  </h4>
                  {item.caption && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                  {item.eventTitle && (
                    <div className="pt-1 flex items-center gap-1 text-[11px] text-[#1668E8] font-medium">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{item.eventTitle}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => handleToggleFeature(item)}
                    className={`inline-flex items-center gap-1 font-semibold px-2 py-1 rounded-lg transition-colors ${
                      item.isFeatured
                        ? "text-amber-600 bg-amber-50 hover:bg-amber-100"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <Star
                      className={`w-3.5 h-3.5 ${
                        item.isFeatured ? "fill-amber-500 text-amber-500" : ""
                      }`}
                    />
                    <span>{item.isFeatured ? "Featured" : "Feature"}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      title="Edit photo details"
                      className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteModalImage(item)}
                      title="Delete photo permanently"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add Image */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Add Gallery Image</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                {uploadError}
              </div>
            )}

            {/* Cloudinary Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative border-2 border-dashed border-slate-300 hover:border-[#1668E8] rounded-xl p-4 text-center cursor-pointer transition-all bg-slate-50 flex flex-col items-center justify-center min-h-[140px]"
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
                <div className="py-4 flex flex-col items-center gap-2 text-slate-600">
                  <Loader2 className="w-7 h-7 animate-spin text-[#1668E8]" />
                  <span className="text-xs font-medium">Uploading to Cloudinary...</span>
                </div>
              ) : newImageUrl ? (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 group">
                  <Image src={newImageUrl} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                    <Upload className="w-4 h-4" />
                    <span>Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="py-2 space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-[#1668E8] flex items-center justify-center mx-auto">
                    <Upload className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-slate-700">Click to upload photo</p>
                  <p className="text-[11px] text-slate-400">Stores directly in Cloudinary (xspaceweb/event-gallery)</p>
                </div>
              )}
            </div>

            {/* Or Image URL */}
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">
                Or Image URL
              </label>
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => {
                  setNewImageUrl(e.target.value);
                  setNewImagePublicId(null);
                }}
                placeholder="https://... or /images/..."
                className="w-full px-3 py-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20"
              />
            </div>

            {/* Photo Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Photo Title / Headline
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Keynote at Grand Auditorium"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 text-slate-800"
              />
            </div>

            {/* Caption */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Caption
              </label>
              <textarea
                rows={2}
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="Short description displayed when clicking the image in lightbox..."
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 text-slate-800"
              />
            </div>

            {/* Link to Event */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Associated Event (Optional)
              </label>
              <select
                value={newEventId}
                onChange={(e) => setNewEventId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 text-slate-800"
              >
                <option value="">None / General Gallery</option>
                {availableEvents.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured & Display Order */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newIsFeatured}
                  onChange={(e) => setNewIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#1668E8] rounded border-slate-300 focus:ring-[#1668E8]"
                />
                <span>Featured (Top 5 on Homepage)</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Order:</span>
                <input
                  type="number"
                  value={newDisplayOrder}
                  onChange={(e) => setNewDisplayOrder(parseInt(e.target.value, 10) || 0)}
                  className="w-16 px-2 py-1 text-xs border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSaveNewImage}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1668E8] hover:bg-blue-700 transition-colors shadow-sm"
              >
                {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save to Gallery</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Image */}
      {editingImage && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Edit Photo Details</h3>
              <button
                onClick={() => setEditingImage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-200">
              <Image
                src={editingImage.imageUrl}
                alt="Editing"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Photo Title
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Caption
              </label>
              <textarea
                rows={2}
                value={editCaption}
                onChange={(e) => setEditCaption(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Associated Event
              </label>
              <select
                value={editEventId}
                onChange={(e) => setEditEventId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1668E8]/20 text-slate-800"
              >
                <option value="">None / General Gallery</option>
                {availableEvents.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editIsFeatured}
                  onChange={(e) => setEditIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#1668E8] rounded border-slate-300 focus:ring-[#1668E8]"
                />
                <span>Featured (Top 5 on Homepage)</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Order:</span>
                <input
                  type="number"
                  value={editDisplayOrder}
                  onChange={(e) => setEditDisplayOrder(parseInt(e.target.value, 10) || 0)}
                  className="w-16 px-2 py-1 text-xs border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingImage(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleSaveEdit}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1668E8] hover:bg-blue-700 transition-colors shadow-sm"
              >
                {isUpdating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Permanent Delete Confirmation */}
      {deleteModalImage && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Delete Gallery Image?
                </h3>
                <p className="text-xs text-slate-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200">
              <Image
                src={deleteModalImage.imageUrl}
                alt="Delete preview"
                fill
                className="object-cover"
              />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Permanently deleting will remove this image record from the database and delete its corresponding asset from Cloudinary.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteModalImage(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-sm"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
