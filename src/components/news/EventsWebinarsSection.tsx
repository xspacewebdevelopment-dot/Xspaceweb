"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, CheckCircle2, X } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";

const upcomingEventsList = [
  {
    id: "growth-workshop",
    day: "12",
    month: "NOV",
    title: "Web & SaaS Growth Workshop",
    location: "Online Event",
    description: "A hands-on session for businesses to scale digitally.",
    details:
      "Master modern SaaS growth architectures, organic client acquisition, and high-conversion web development strategies with XSPACEWEB senior engineers.",
  },
  {
    id: "product-showcase",
    day: "05",
    month: "DEC",
    title: "XSPACEWEB Product Showcase",
    location: "Kolkata, India",
    description: "Explore our latest products, features and roadmap.",
    details:
      "An exclusive live demo of MakeGSTBill 3.0, GoldenGST enterprise edition, and upcoming AI productivity tools from the XSPACEWEB engineering lab.",
  },
  {
    id: "partner-meet",
    day: "18",
    month: "JAN",
    title: "Partner Meet 2027",
    location: "Bengaluru, India",
    description: "An exclusive meet with our partners and collaborators.",
    details:
      "Join senior leadership, strategic ecosystem partners, and digital agency leaders in Bengaluru for collaborative growth initiatives.",
  },
];

export const EventsWebinarsSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [registered, setRegistered] = useState(false);

  return (
    <section id="events" className="w-full bg-[#F8FAFC] py-16 sm:py-20 border-t border-slate-100">
      <Container size="wide">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#1668E8]" />
            <span className="text-xs font-bold tracking-wider text-[#1668E8] uppercase">
              Upcoming Events
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#07152B] tracking-tight">
              Events & Webinars
            </h2>
            <a
              href="#events"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors"
            >
              <span>View All Events</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* 2-Column Events Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Large Featured Event Card */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl bg-[#07152B] text-white flex flex-col justify-end min-h-[440px] sm:min-h-[480px] p-6 sm:p-8 md:p-10 group">
            {/* Background Image with Overlay */}
            <Image
              src="/images/news/news_conference_stage.jpg"
              alt="Tech Innovators Meet 2026"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07152B] via-[#07152B]/75 to-transparent pointer-events-none" />

            {/* Content on top */}
            <div className="relative z-10 space-y-4">
              <span className="inline-block px-3 py-1 rounded-md bg-[#1668E8] text-white text-[11px] font-bold tracking-wider uppercase shadow">
                FEATURED EVENT
              </span>

              {/* Big Date */}
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white block">
                  25 OCT 2026
                </span>
              </div>

              {/* Title & Location */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                  Tech Innovators Meet 2026
                </h3>
                <div className="flex items-center gap-1.5 text-slate-300 text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 text-[#38BDF8]" />
                  <span>Kolkata, India (Hyatt Regency Grand Ballroom)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
                Join us for a day of innovation, networking and new opportunities with industry experts, SaaS founders, and digital leaders.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  onClick={() => setRegistered(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1668E8] hover:bg-[#1255c2] text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-[#1668E8]/40 active:scale-95 cursor-pointer"
                >
                  <span>{registered ? "✓ Registered Successfully" : "Register Now"}</span>
                  {!registered && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: List of 3 Event Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-4 sm:gap-5">
            {upcomingEventsList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedEvent(item.id)}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#1668E8]/40 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer"
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                  {/* Date Badge Box */}
                  <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#EBF3FE] border border-[#1668E8]/20 flex flex-col items-center justify-center text-[#1668E8] group-hover:bg-[#1668E8] group-hover:text-white transition-colors duration-300">
                    <span className="text-xl sm:text-2xl font-black leading-none">
                      {item.day}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold tracking-wider mt-0.5">
                      {item.month}
                    </span>
                  </div>

                  {/* Details */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-snug mb-1">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#1668E8]" />
                      <span>{item.location}</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-500 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Arrow Icon in circle */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#1668E8] group-hover:text-white group-hover:border-[#1668E8] transition-all duration-200">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Event Details */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {(() => {
                const event = upcomingEventsList.find((e) => e.id === selectedEvent);
                if (!event) return null;
                return (
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EBF3FE] text-[#1668E8] text-xs font-bold mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {event.day} {event.month} 2026/27
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#07152B] mb-2">
                      {event.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                      <MapPin className="w-4 h-4 text-[#1668E8]" />
                      <span>{event.location}</span>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {event.details}
                    </p>

                    <button
                      onClick={() => {
                        alert("Thank you! You have been registered for " + event.title);
                        setSelectedEvent(null);
                      }}
                      className="w-full py-3 rounded-full bg-[#1668E8] hover:bg-[#1255c2] text-white text-sm font-semibold transition-all shadow-md"
                    >
                      Confirm Registration
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
