"use client";

import React from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

interface Leader {
  num: string;
  name: string;
  roleTitle: string;
  companyTag: string;
  quote: string;
  bio: string;
  photo: string;
  photoPosition?: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    email?: string;
  };
}

const leaders: Leader[] = [
  {
    num: "01",
    name: "Dhrub Kumar Karmkar",
    roleTitle: "Founder & Director",
    companyTag: "@ XSPACEWEB",
    photo: "/images/about/leaders/dhrub_karmkar.png",
    photoPosition: "object-top",
    quote: "“Legacy isn't created overnight, it's engineered with precision.”",
    bio: "Our journey is driven by vision, calculated decisions, and long-term thinking. We build scalable systems and create impact beyond growth.",
    socials: {
      linkedin: "https://www.linkedin.com/in/dhrub-kr-karmkar-36945b235",
      instagram: "https://www.instagram.com/xspaceweb/",
      twitter: "https://twitter.com/xspaceweb",
      email: "info@xspaceweb.com",
    },
  },
  {
    num: "02",
    name: "Shivendra Kumar",
    roleTitle: "Chief Technology Officer (CTO)",
    companyTag: "@ XSPACEWEB",
    photo: "/images/about/leaders/shivendra_kumar.png",
    photoPosition: "object-top",
    quote: "“While others see code, we see the future being written.”",
    bio: "Our technology is driven by innovation, precision, and scalability. We build systems that adapt, perform, and lead in a fast-changing digital world.",
    socials: {
      linkedin: "https://in.linkedin.com/company/xspaceweb",
      instagram: "https://www.instagram.com/xspaceweb/",
      twitter: "https://twitter.com/xspaceweb",
      email: "cto@xspaceweb.com",
    },
  },
  {
    num: "03",
    name: "Debasmita Sahoo",
    roleTitle: "Marketing Manager",
    companyTag: "@ XSPACEWEB",
    photo: "/images/about/leaders/debasmita_sahoo.jpg",
    photoPosition: "object-top",
    quote: "“Behind every bold vision is a balanced strategy.”",
    bio: "Our growth is guided by research-led marketing, fresh ideas, and disciplined financial planning. We turn innovation into sustainable success.",
    socials: {
      linkedin:
        "https://www.linkedin.com/in/debasmita-sahoo-4035a3418?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      instagram: "https://www.instagram.com/xspaceweb/",
      twitter: "https://twitter.com/xspaceweb",
      email: "marketing@xspaceweb.com",
    },
  },
  {
    num: "04",
    name: "Rahul Kumar",
    roleTitle: "Managing Director",
    companyTag: "@ XSPACEWEB",
    photo: "/images/about/leaders/rahul_kumar.jpg",
    photoPosition: "object-top",
    quote: "“Turning ideas into systems, and systems into opportunities.”",
    bio: "We believe sustainable growth comes from the right balance of operations, strategy, technology, and execution. We create meaningful opportunities and turn ambitious ideas into scalable businesses.",
    socials: {
      linkedin: "https://www.linkedin.com/in/rahul-kumar-017a162a6",
      instagram: "https://www.instagram.com/xspaceweb/",
      twitter: "https://twitter.com/xspaceweb",
      email: "director@xspaceweb.com",
    },
  },
];

export const OurLeadershipSection: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-12 sm:py-16 lg:py-20">
      <Container size="wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[12px] sm:text-xs font-bold tracking-[0.2em] text-[#1668E8] uppercase block mb-3">
            OUR LEADERSHIP
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#07152B] tracking-tight leading-tight mb-3">
            People Behind XSPACEWEB
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A team of passionate leaders driving our vision, innovation, and growth.
          </p>
        </div>

        {/* 4 Leadership Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {leaders.map((leader) => (
            <div
              key={leader.num}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#1668E8]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo with Number Badge */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-slate-100 shadow-sm">
                  <Image
                    src={leader.photo}
                    alt={leader.name}
                    fill
                    className={`object-cover ${leader.photoPosition || "object-top"} group-hover:scale-105 transition-transform duration-500`}
                    unoptimized
                  />
                  {/* Subtle Number overlay */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-[11px] font-bold text-white border-b border-white/40">
                    {leader.num}
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg sm:text-[19px] font-extrabold text-[#07152B] tracking-tight leading-snug">
                  {leader.name}
                </h3>

                {/* Role */}
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-0.5 mb-3.5">
                  {leader.roleTitle}{" "}
                  <span className="text-[#1668E8] font-semibold">
                    {leader.companyTag}
                  </span>
                </p>

                {/* Quote Bubble */}
                <div className="bg-[#F0F6FF] rounded-xl p-3 sm:p-3.5 mb-4 border border-[#1668E8]/10">
                  <p className="text-xs sm:text-[12.5px] italic font-medium text-[#1E3A8A] leading-relaxed">
                    {leader.quote}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mb-5">
                  {leader.bio}
                </p>
              </div>

              {/* Social Icon Links */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                {/* LinkedIn */}
                <a
                  href={leader.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${leader.name} LinkedIn`}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1668E8] hover:border-[#1668E8] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0-.01-3.34 1.67 1.67 0 0 0 .01 3.34M7.86 18.5V10.13H5.07V18.5h2.79Z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href={leader.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${leader.name} Instagram`}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#E1306C] hover:border-[#E1306C] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                {/* X (formerly Twitter) */}
                <a
                  href={leader.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${leader.name} X`}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#07152B] hover:border-[#07152B] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* Email */}
                <a
                  href={`mailto:${leader.socials.email}`}
                  aria-label={`Email ${leader.name}`}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#1668E8] hover:border-[#1668E8] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
