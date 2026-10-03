"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Quote } from "lucide-react";
import { ViewAllInternsModal } from "./ViewAllInternsModal";

interface ShowcaseIntern {
  id: string;
  internshipId: string;
  fullName: string;
  role: string;
  department: string;
  image: string;
  quote?: string;
  year?: string;
}

const DEFAULT_INTERNS: ShowcaseIntern[] = [
  {
    id: "1",
    internshipId: "XSW-INTERN-001",
    fullName: "Rohan Kumar",
    role: "Web Development Intern",
    department: "Engineering",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    quote: "Building real-world web applications and collaborating with senior engineers at XSPACEWEB accelerated my technical learning exponentially.",
    year: "2024",
  },
  {
    id: "2",
    internshipId: "XSW-INTERN-002",
    fullName: "Ananya Singh",
    role: "UI/UX Design Intern",
    department: "Design",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    quote: "The internship at XSPACEWEB gave me hands-on experience, real projects, and constant guidance. It helped me build confidence and grow professionally.",
    year: "2024",
  },
  {
    id: "3",
    internshipId: "XSW-INTERN-003",
    fullName: "Aditya Verma",
    role: "Digital Marketing Intern",
    department: "Marketing",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    quote: "Managing actual campaigns and seeing live data conversions taught me more in three months than a year in the classroom.",
    year: "2024",
  },
  {
    id: "4",
    internshipId: "XSW-INTERN-004",
    fullName: "Sneha Patra",
    role: "Content Writing Intern",
    department: "Marketing",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    quote: "Working on real client-facing documentation and publishing company case studies honed my writing and editorial leadership.",
    year: "2024",
  },
  {
    id: "5",
    internshipId: "XSW-INTERN-005",
    fullName: "Karan Malhotra",
    role: "Data Analysis Intern",
    department: "Analytics",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    quote: "From day one, I was given ownership of real data pipelines and analytics dashboards. An extraordinary internship experience.",
    year: "2024",
  },
];

interface CertificationInternsShowcaseProps {
  onSelectIntern: (internshipId: string) => void;
}

export const CertificationInternsShowcase: React.FC<CertificationInternsShowcaseProps> = ({
  onSelectIntern,
}) => {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(1); // Default to Ananya Singh as in design
  const [isModalOpen, setIsModalOpen] = useState(false);
  const interns = DEFAULT_INTERNS;

  const currentIntern = interns[activeQuoteIndex] || interns[1];

  const handlePrev = () => {
    setActiveQuoteIndex((prev) => (prev === 0 ? interns.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveQuoteIndex((prev) => (prev === interns.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-black tracking-widest text-[#1668E8] uppercase">
              OUR INTERNS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#07152B] tracking-tight">
              Meet Our Amazing Interns
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our internship program helps students and professionals gain real-world experience, learn from industry experts, and grow their careers with meaningful projects.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 hover:border-blue-400 text-slate-800 text-xs sm:text-sm font-bold transition-all hover:bg-slate-50 shadow-2xs self-start md:self-auto cursor-pointer"
          >
            <span>View All Interns</span>
            <ArrowRight className="w-4 h-4 text-[#1668E8]" />
          </button>
        </div>

        {/* 5 Interns Cards Row matching design reference */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {interns.map((intern, index) => (
            <div
              key={intern.id}
              onClick={() => {
                onSelectIntern(intern.internshipId);
                setActiveQuoteIndex(index);
              }}
              className="group relative bg-[#F8FAFC] hover:bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Photo */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-200 mb-4">
                <Image
                  src={intern.image}
                  alt={intern.fullName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>

              {/* Info & Arrow */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-extrabold text-[#07152B] truncate group-hover:text-[#1668E8] transition-colors">
                    {intern.fullName}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {intern.role}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-[#1668E8] group-hover:bg-[#1668E8] text-slate-400 group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-200">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Testimonial Slider matching design reference */}
        <div className="max-w-4xl mx-auto pt-6">
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 bg-slate-50/70 rounded-3xl p-6 sm:p-10 border border-slate-200/60 shadow-xs">
            {/* Circular Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
              <Image
                src={currentIntern.image}
                alt={currentIntern.fullName}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>

            {/* Quote content */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
                "{currentIntern.quote}"
              </p>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-[#07152B]">
                  {currentIntern.fullName}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {currentIntern.role} | {currentIntern.year}
                </p>
              </div>
            </div>

            {/* Slider controls: Dots & Arrows */}
            <div className="flex md:flex-col items-center gap-3 shrink-0">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5 order-2 md:order-1">
                {interns.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveQuoteIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === activeQuoteIndex ? "w-6 bg-[#1668E8]" : "w-2 bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next circular arrows */}
              <div className="flex items-center gap-2 order-1 md:order-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-2xs cursor-pointer"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-2xs cursor-pointer"
                  aria-label="Next quote"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View All Interns Directory Modal */}
      <ViewAllInternsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
