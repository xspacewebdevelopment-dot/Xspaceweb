"use client";

import React from "react";
import Image from "next/image";

export interface ShowcaseIntern {
  id: string;
  internshipId: string;
  fullName: string;
  role: string;
  department: string;
  image: string;
}

export const DEFAULT_INTERNS: ShowcaseIntern[] = [
  {
    id: "1",
    internshipId: "XSW-INTERN-001",
    fullName: "Amarendra Kumar Saxena",
    role: "Web Development Intern",
    department: "Engineering",
    image: "/images/InternImages/Amrendra_Kumar_Saxena.jpeg",
  },
  {
    id: "2",
    internshipId: "XSW-INTERN-002",
    fullName: "Arijit Banerjee",
    role: "Software Development Intern",
    department: "Engineering",
    image: "/images/InternImages/Arijeet_Banerjee.jpeg",
  },
  {
    id: "3",
    internshipId: "XSW-INTERN-003",
    fullName: "Nancy Verma",
    role: "Web Development Intern",
    department: "Engineering",
    image: "/images/InternImages/Nancy_Verma.jpeg",
  },
  {
    id: "4",
    internshipId: "XSW-INTERN-004",
    fullName: "Priya Kumari",
    role: "Software Development Intern",
    department: "Engineering",
    image: "/images/InternImages/Priya_Kumari.jpeg",
  },
];

interface CertificationInternsShowcaseProps {
  onSelectIntern?: (internshipId: string) => void;
  initialInterns?: ShowcaseIntern[];
}

export const CertificationInternsShowcase: React.FC<CertificationInternsShowcaseProps> = ({
  initialInterns,
}) => {
  const interns = initialInterns && initialInterns.length > 0 ? initialInterns : DEFAULT_INTERNS;

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
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

        {/* 4 Interns Cards Grid: Only photo, name, and role with subtle hover zoom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {interns.map((intern) => (
            <div
              key={intern.id}
              className="bg-[#F8FAFC] rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Photo: zooms in a very little bit (scale-105) on hover only */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-200 mb-4 shadow-2xs">
                <Image
                  src={intern.image}
                  alt={intern.fullName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Info: Name & Role */}
              <div className="pt-1">
                <h3 className="text-base font-extrabold text-[#07152B] truncate">
                  {intern.fullName}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 truncate mt-1">
                  {intern.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

