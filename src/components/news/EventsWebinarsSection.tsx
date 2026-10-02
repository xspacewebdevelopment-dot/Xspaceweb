"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Globe, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/ui/Container";
import { EventItem } from "@/lib/db/schema";

interface EventsWebinarsSectionProps {
  initialEvents?: EventItem[];
}

export const EventsWebinarsSection: React.FC<EventsWebinarsSectionProps> = ({
  initialEvents = [],
}) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Filter only published and non-archived upcoming events
  const upcomingEvents = initialEvents
    .filter((e) => {
      const isPublished = e.status === "published" && !e.archivedAt;
      const isUpcoming = new Date(e.eventDate).getTime() >= startOfToday.getTime();
      return isPublished && isUpcoming;
    })
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  // Featured Event: closest upcoming event with isFeatured=true, fallback to closest upcoming
  const featuredEvent =
    upcomingEvents.find((e) => e.isFeatured) || upcomingEvents[0] || null;

  // Remaining upcoming events (exclude the featured event to avoid duplication, up to 3)
  const remainingEvents = featuredEvent
    ? upcomingEvents.filter((e) => e.id !== featuredEvent.id).slice(0, 3)
    : [];

  const formatEventDateParts = (date: Date | string) => {
    const d = new Date(date);
    const day = d.toLocaleDateString("en-GB", { day: "2-digit" });
    const month = d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
    const full = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).toUpperCase();
    return { day, month, full };
  };

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
            <Link
              href="/news-and-updates/events"
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1668E8] hover:text-[#0D2344] transition-colors"
            >
              <span>View All Events</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Dynamic Events Layout */}
        {!featuredEvent ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
            <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No Upcoming Events Scheduled</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              We are planning our next series of summits, webinars, and developer sessions. Check back soon or browse past events.
            </p>
            <Link
              href="/news-and-updates/events"
              className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1668E8] text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>Browse All Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 ${
              remainingEvents.length === 0
                ? "max-w-3xl mx-auto"
                : "lg:grid-cols-12 gap-8 items-stretch"
            }`}
          >
            {/* Left Column: Large Featured Event Card */}
            <div
              className={`${
                remainingEvents.length === 0 ? "w-full" : "lg:col-span-6"
              } relative rounded-3xl overflow-hidden shadow-xl bg-[#07152B] text-white flex flex-col justify-end min-h-[440px] sm:min-h-[480px] p-6 sm:p-8 md:p-10 group`}
            >
              {/* Background Image with Overlay */}
              <Image
                src={featuredEvent.coverImageUrl || "/images/news/news_conference_stage.jpg"}
                alt={featuredEvent.title}
                fill
                priority
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
                    {formatEventDateParts(featuredEvent.eventDate).full}
                  </span>
                </div>

                {/* Title & Location */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                    <Link
                      href={`/news-and-updates/events/${featuredEvent.slug}`}
                      className="hover:text-blue-300 transition-colors"
                    >
                      {featuredEvent.title}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-300 text-xs sm:text-sm">
                    {featuredEvent.locationType === "online" ? (
                      <Globe className="w-4 h-4 text-[#38BDF8]" />
                    ) : (
                      <MapPin className="w-4 h-4 text-[#38BDF8]" />
                    )}
                    <span>{featuredEvent.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed max-w-lg line-clamp-3">
                  {featuredEvent.shortDescription}
                </p>

                {/* CTA Action */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {featuredEvent.registrationUrl ? (
                    <a
                      href={featuredEvent.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1668E8] hover:bg-[#1255c2] text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-[#1668E8]/40 active:scale-95 cursor-pointer"
                    >
                      <span>Register Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : null}

                  <Link
                    href={`/news-and-updates/events/${featuredEvent.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold backdrop-blur-xs transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Remaining Event Cards */}
            {remainingEvents.length > 0 && (
              <div className="lg:col-span-6 flex flex-col justify-between gap-4 sm:gap-5">
                {remainingEvents.map((item) => {
                  const { day, month } = formatEventDateParts(item.eventDate);

                  return (
                    <Link
                      key={item.id}
                      href={`/news-and-updates/events/${item.slug}`}
                      className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#1668E8]/40 transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer"
                    >
                      <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                        {/* Date Badge Box */}
                        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#EBF3FE] border border-[#1668E8]/20 flex flex-col items-center justify-center text-[#1668E8] group-hover:bg-[#1668E8] group-hover:text-white transition-colors duration-300">
                          <span className="text-xl sm:text-2xl font-black leading-none">
                            {day}
                          </span>
                          <span className="text-[11px] sm:text-xs font-bold tracking-wider mt-0.5">
                            {month}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="min-w-0">
                          <h4 className="text-base sm:text-lg font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors leading-snug mb-1 truncate">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
                            {item.locationType === "online" ? (
                              <Globe className="w-3.5 h-3.5 text-[#1668E8] flex-shrink-0" />
                            ) : (
                              <MapPin className="w-3.5 h-3.5 text-[#1668E8] flex-shrink-0" />
                            )}
                            <span className="truncate">{item.location}</span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-slate-500 line-clamp-1">
                            {item.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Arrow Icon in circle */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#1668E8] group-hover:text-white group-hover:border-[#1668E8] transition-all duration-200">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
};
