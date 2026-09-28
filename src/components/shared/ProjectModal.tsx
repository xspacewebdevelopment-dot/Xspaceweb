"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Sparkles, Building2, User, Mail, Phone, MessageSquare } from "lucide-react";

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const servicesList = [
  "Web Development",
  "App Development",
  "SaaS Products",
  "Branding & UI/UX",
  "Digital Marketing",
  "Creative Direction",
];

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    selectedServices: [] as string[],
    projectDetails: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const resetForm = () => {
    setIsSubmitted(false);
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
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-20"
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
                    Project Request Received!
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-800">{formData.name || "friend"}</span>! Our team at XspaceWeb will review your request and get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-4 px-8 py-3 rounded-full bg-[#1668E8] text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md"
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
                      <span>START A PROJECT</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07152B] tracking-tight">
                      Have a project in mind?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal">
                      Tell us about your goals and let&apos;s build something extraordinary together.
                    </p>
                  </div>

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
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
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
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
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
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
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
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
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
                            onClick={() => toggleService(service)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                              isSelected
                                ? "bg-[#1668E8] text-white shadow-sm ring-2 ring-blue-500/30"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
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
                      <span>Tell us about your project *</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Briefly describe your goals, timeline, or key deliverables..."
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#1668E8] hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
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
