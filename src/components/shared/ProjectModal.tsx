"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCircle2,
  Sparkles,
  Building2,
  User,
  Mail,
  Phone,
  MessageSquare,
  AlertCircle,
  Loader2,
} from "lucide-react";

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryType?: "project" | "service";
  source?: string;
  initialEmail?: string;
  initialService?: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
}

const servicesList = [
  "Web Development",
  "App Development",
  "SaaS Products",
  "Branding & UI/UX",
  "Digital Marketing",
  "Creative Direction",
];

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  inquiryType = "project",
  source,
  initialEmail = "",
  initialService = "",
  title,
  subtitle,
  eyebrow,
}) => {
  const isService = inquiryType === "service";

  const [formData, setFormData] = useState({
    name: "",
    email: initialEmail || "",
    phone: "",
    company: "",
    selectedServices: initialService ? [initialService] : ([] as string[]),
    projectDetails: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync initial props whenever modal opens or props change
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setErrorMessage("");
      setFormData((prev) => {
        let currentServices = prev.selectedServices;
        if (initialService) {
          // Normalize service match or add directly
          const matched = servicesList.find(
            (s) => s.toLowerCase() === initialService.toLowerCase()
          );
          currentServices = [matched || initialService];
        }

        return {
          ...prev,
          email: initialEmail !== undefined && initialEmail !== "" ? initialEmail : prev.email,
          selectedServices: currentServices,
        };
      });
    }
  }, [isOpen, initialEmail, initialService]);

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(service);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((s) => s !== service)
          : [...prev.selectedServices, service],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    const resolvedSource =
      source || (isService ? "services-page" : "homepage-project");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          company: formData.company || undefined,
          service: formData.selectedServices.join(", ") || undefined,
          message: formData.projectDetails,
          inquiry_type: inquiryType,
          source: resolvedSource,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.details?.[0] || data.error || "Failed to submit inquiry. Please try again."
        );
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("Inquiry submission error:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to submit inquiry. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrorMessage("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      selectedServices: [],
      projectDetails: "",
    });
    onClose();
  };

  // Dynamic titles and copy based on inquiryType
  const displayEyebrow = eyebrow || (isService ? "START A PROJECT" : "START A PROJECT");
  const displayHeading = title || (isService ? "Have a service in mind?" : "Have a project in mind?");
  const displaySubtitle =
    subtitle ||
    (isService
      ? "Tell us what you need and let's build the right solution together."
      : "Tell us about your goals and let's build something extraordinary together.");
  const displayDetailsLabel = isService
    ? "Project / Requirement Description *"
    : "Tell us about your project *";
  const displayDetailsPlaceholder = isService
    ? "Briefly describe your requirements, timeline, or key deliverables..."
    : "Briefly describe your goals, timeline, or key deliverables...";
  const displaySuccessTitle = isService
    ? "Service Request Received!"
    : "Project Request Received!";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-2xl rounded-3xl bg-white text-slate-900 shadow-2xl overflow-hidden border border-slate-200/90 z-10 my-auto"
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-2 bg-gradient-to-r from-[#1668E8] via-blue-500 to-indigo-600 w-full" />

            {/* Close Button */}
            <button
              type="button"
              onClick={resetForm}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
              {isSubmitted ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07152B]">
                    {displaySuccessTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you,{" "}
                    <span className="font-bold text-slate-800">
                      {formData.name || "friend"}
                    </span>
                    ! Our team at XspaceWeb will review your request and get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-4 px-8 py-3 rounded-full bg-[#1668E8] hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                /* Form State */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Header */}
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1668E8] uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>{displayEyebrow}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07152B] tracking-tight">
                      {displayHeading}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal">
                      {displaySubtitle}
                    </p>
                  </div>

                  {/* Error Alert Box */}
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Input Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600" />
                        <span>Your Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-60"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-blue-600" />
                        <span>Your Email *</span>
                      </label>
                      <input
                        type="email"
                        required
                        disabled={isSubmitting}
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-60"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        disabled={isSubmitting}
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-60"
                      />
                    </div>

                    {/* Company (Optional) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Company Name <span className="font-normal text-slate-400">(Optional)</span></span>
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* Select Services Pills */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      Select Required Services
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {servicesList.map((service) => {
                        const isSelected = formData.selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            disabled={isSubmitting}
                            onClick={() => toggleService(service)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#1668E8] text-white shadow-sm ring-2 ring-blue-500/30"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            } disabled:opacity-60`}
                          >
                            {isSelected ? `✓ ${service}` : `+ ${service}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Details Textarea */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                      <span>{displayDetailsLabel}</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      disabled={isSubmitting}
                      placeholder={displayDetailsPlaceholder}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none disabled:opacity-60"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#1668E8] hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

