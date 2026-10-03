"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Clock, Calendar, Briefcase, UserCheck } from "lucide-react";

export interface InternListItem {
  id: string;
  fullName: string;
  role: string;
  department?: string;
  timing: string;
  finishDate: string;
  status?: string;
}

const DEFAULT_ACTIVE_INTERNS: InternListItem[] = [
  {
    id: "1",
    fullName: "Ananya Singh",
    role: "UI/UX Design Intern",
    department: "Design",
    timing: "10:00 AM – 6:00 PM IST (Remote • 3 Months)",
    finishDate: "Nov 24, 2026",
    status: "Active",
  },
  {
    id: "2",
    fullName: "Aditya Verma",
    role: "Digital Marketing Intern",
    department: "Marketing",
    timing: "10:00 AM – 6:00 PM IST (Remote • 3 Months)",
    finishDate: "Dec 18, 2026",
    status: "Active",
  },
  {
    id: "3",
    fullName: "Rohan Kumar",
    role: "Web Development Intern",
    department: "Engineering",
    timing: "09:30 AM – 5:30 PM IST (Hybrid • 3 Months)",
    finishDate: "Oct 30, 2026",
    status: "Active",
  },
  {
    id: "4",
    fullName: "Sneha Patra",
    role: "Content Writing Intern",
    department: "Marketing",
    timing: "10:00 AM – 6:00 PM IST (Remote • 3 Months)",
    finishDate: "Jan 10, 2027",
    status: "Active",
  },
  {
    id: "5",
    fullName: "Karan Malhotra",
    role: "Data Analysis Intern",
    department: "Analytics",
    timing: "10:00 AM – 6:00 PM IST (Remote • 3 Months)",
    finishDate: "Dec 15, 2026",
    status: "Active",
  },
  {
    id: "6",
    fullName: "Priya Sharma",
    role: "Frontend Developer Intern",
    department: "Engineering",
    timing: "09:30 AM – 5:30 PM IST (Remote • 3 Months)",
    finishDate: "Jan 05, 2027",
    status: "Active",
  },
  {
    id: "7",
    fullName: "Arjun Mehta",
    role: "Backend Engineering Intern",
    department: "Engineering",
    timing: "10:00 AM – 6:00 PM IST (Hybrid • 3 Months)",
    finishDate: "Dec 20, 2026",
    status: "Active",
  },
];

function formatFinishDate(dateVal: string | Date | undefined): string {
  if (!dateVal) return "Ongoing";
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return String(dateVal);
  }
}

interface ViewAllInternsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ViewAllInternsModal: React.FC<ViewAllInternsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [interns, setInterns] = useState<InternListItem[]>(DEFAULT_ACTIVE_INTERNS);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch live published interns if available
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    async function fetchInterns() {
      setLoading(true);
      try {
        const res = await fetch("/api/certification/list");
        if (res.ok) {
          const data = await res.json();
          if (data.interns && Array.isArray(data.interns) && data.interns.length > 0) {
            const mapped: InternListItem[] = data.interns.map((item: any) => ({
              id: item.id || item.internshipId,
              fullName: item.fullName,
              role: item.role,
              department: item.department,
              timing: `${item.duration || "3 Months"} (${item.internshipType || "Remote"} • 10:00 AM – 6:00 PM IST)`,
              finishDate: formatFinishDate(item.endDate),
              status: item.status === "ACTIVE" ? "Active" : "Completed",
            }));
            if (isMounted) {
              setInterns(mapped);
            }
            return;
          }
        }
      } catch (err) {
        // Fall back gracefully to DEFAULT_ACTIVE_INTERNS
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchInterns();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const [filterTab, setFilterTab] = useState<"current" | "all">("current");

  const filteredInterns = interns.filter((i) => {
    if (filterTab === "current" && i.status !== "Active") return false;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      i.fullName.toLowerCase().includes(q) ||
      i.role.toLowerCase().includes(q) ||
      (i.department && i.department.toLowerCase().includes(q))
    );
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07152B]/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 flex flex-col max-h-[88vh]"
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1668E8] text-[11px] font-bold">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Active Interns Directory</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {filteredInterns.length} {filteredInterns.length === 1 ? "Intern" : "Interns"}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#07152B] tracking-tight mt-1.5">
                  Currently Active Interns
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  List of interns currently in the program with their role, timing, and completion date.
                </p>
              </div>

              {/* Close Button & Search */}
              <div className="flex items-center gap-3">
                <div className="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setFilterTab("current")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      filterTab === "current"
                        ? "bg-[#1668E8] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Currently In
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterTab("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      filterTab === "all"
                        ? "bg-[#1668E8] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All Interns
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-40 sm:w-48 transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-200/60 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body - Interns List */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-3">
              {loading ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  Loading interns list...
                </div>
              ) : filteredInterns.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  No interns found matching &quot;{searchQuery}&quot;.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {/* Table Header for larger screens */}
                  <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <div className="col-span-4">Name</div>
                    <div className="col-span-3">Job Role</div>
                    <div className="col-span-3">Timing</div>
                    <div className="col-span-2 text-right">Finish Date</div>
                  </div>

                  {filteredInterns.map((intern) => (
                    <div
                      key={intern.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex flex-col md:grid md:grid-cols-12 md:gap-4 md:items-center gap-2.5 shadow-2xs"
                    >
                      {/* Name */}
                      <div className="md:col-span-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-[#1668E8] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                          {intern.fullName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-[#07152B] truncate">
                            {intern.fullName}
                          </h4>
                          {intern.department && (
                            <p className="text-[10px] text-slate-400 uppercase font-semibold">
                              {intern.department}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Job Role */}
                      <div className="md:col-span-3 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                        <Briefcase className="w-3.5 h-3.5 text-[#1668E8] shrink-0 md:hidden" />
                        <span className="truncate">{intern.role}</span>
                      </div>

                      {/* Timing */}
                      <div className="md:col-span-3 flex items-center gap-1.5 text-xs text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{intern.timing}</span>
                      </div>

                      {/* When they are going to finish */}
                      <div className="md:col-span-2 flex items-center md:justify-end gap-1.5 text-xs font-bold text-slate-800">
                        <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0 md:hidden" />
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold whitespace-nowrap">
                          {intern.finishDate}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Official active internships managed by XSPACEWEB
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer shadow-2xs"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
