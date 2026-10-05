"use client";

import React from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface Leader {
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin?: string;
  email?: string;
}

const companyLeaders: Leader[] = [
  {
    name: "Dhrub Kumar Karmkar",
    role: "Founder & Director",
    photo: "/images/about/leaders/dhrub_karmkar.png",
    bio: "The journey of XSPACEWEB began with a vision to build technology and digital solutions that create meaningful value for businesses.",
    linkedin: "https://www.linkedin.com/in/dhrub-kr-karmkar-36945b235",
    email: "info@xspaceweb.com",
  },
  {
    name: "Rahul Kumar",
    role: "Director & Co-Founder",
    photo: "/images/about/leaders/rahul_kumar.png",
    bio: "Rahul Kumar contributes to the company's growth and long-term direction, supporting XSPACEWEB's evolution as a technology and digital solutions company.",
    linkedin: "https://www.linkedin.com/in/rahul-kumar-017a162a6",
    email: "md@xspaceweb.com",
  },
];

export const CompanyLeadershipSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FAFBFD] py-14 sm:py-20 border-b border-slate-100">
      <Container size="wide">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-2">
            OUR LEADERSHIP
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-[#07152B] tracking-tight leading-tight">
            The People Behind XSPACEWEB
          </h2>
        </div>

        {/* 2 Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {companyLeaders.map((leader, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-[0_2px_16px_rgba(7,21,43,0.03)] hover:shadow-xl hover:border-[#1668E8]/30 transition-all duration-300 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start group"
            >
              {/* Circular Avatar */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-100 shadow-sm group-hover:border-[#1668E8]/40 transition-colors bg-slate-100">
                <Image
                  src={leader.photo}
                  alt={leader.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Leader Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg sm:text-[20px] font-extrabold text-[#07152B] tracking-tight">
                    {leader.name}
                  </h3>
                  {leader.linkedin && (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${leader.name} LinkedIn`}
                      className="w-7 h-7 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-[#1668E8] flex items-center justify-center transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0-.01-3.34 1.67 1.67 0 0 0 .01 3.34M7.86 18.5V10.13H5.07V18.5h2.79Z" />
                      </svg>
                    </a>
                  )}
                </div>

                <p className="text-xs sm:text-[13px] font-semibold text-[#1668E8] mb-3">
                  {leader.role}
                </p>

                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mb-4">
                  {leader.bio}
                </p>

                {leader.email && (
                  <div className="pt-3 border-t border-slate-100">
                    <a
                      href={`mailto:${leader.email}`}
                      className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#1668E8] transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{leader.email}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
