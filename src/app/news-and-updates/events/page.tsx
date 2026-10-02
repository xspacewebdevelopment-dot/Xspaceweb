import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MastheadHeader } from "@/components/news/MastheadHeader";
import { Container } from "@/components/shared/ui/Container";
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Globe, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { and, eq, isNull, asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

const DEFAULT_EVENT_IMAGE = "/images/news/news_conference_stage.jpg";

export const metadata: Metadata = {
  title: "All Events & Webinars | XSPACEWEB",
  description:
    "Explore our complete schedule of upcoming and past webinars, technology meetups, workshops, and community events.",
};

export default async function ViewAllEventsPage() {
  const allEvents = await db
    .select()
    .from(events)
    .where(
      and(
        eq(events.status, "published"),
        isNull(events.archivedAt)
      )
    )
    .orderBy(asc(events.eventDate));

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const upcomingEvents = allEvents.filter(
    (e) => new Date(e.eventDate).getTime() >= startOfToday.getTime()
  );

  const pastEvents = allEvents
    .filter((e) => new Date(e.eventDate).getTime() < startOfToday.getTime())
    .reverse(); // most recent past first

  const formatEventDate = (date: Date | string) => {
    const d = new Date(date);
    return {
      day: d.toLocaleDateString("en-GB", { day: "2-digit" }),
      month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
      full: d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <MastheadHeader />

      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200/80 py-12">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Link
                href="/news-and-updates"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1668E8] hover:underline mb-3"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to News & Events Hub</span>
              </Link>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#07152B] tracking-tight">
                All Events & Webinars
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Browse our complete schedule of online summits, technical workshops, hands-on demos, and in-person meetups.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
                {upcomingEvents.length} Upcoming &bull; {pastEvents.length} Past
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <div className="py-12 sm:py-16 space-y-16">
        {/* UPCOMING EVENTS */}
        <section>
          <Container size="wide">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1668E8]" />
              <h2 className="text-2xl font-bold text-[#07152B]">
                Upcoming Events ({upcomingEvents.length})
              </h2>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-10 text-center max-w-xl mx-auto shadow-xs">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#07152B] mb-1">
                  No upcoming events scheduled right now
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  We are preparing exciting new workshops and community meetups. Check back soon or explore our past events below!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((evt) => {
                  const { day, month, full } = formatEventDate(evt.eventDate);
                  return (
                    <div
                      key={evt.id}
                      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group hover:-translate-y-1"
                    >
                      {/* Event Cover Image */}
                      <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                        <Image
                          src={evt.coverImageUrl || DEFAULT_EVENT_IMAGE}
                          alt={evt.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Date overlay badge */}
                        <div className="absolute top-3 left-3 bg-[#07152B]/90 backdrop-blur-md text-white rounded-xl p-2.5 flex flex-col items-center justify-center min-w-[50px] shadow-md border border-white/10">
                          <span className="text-sm font-black leading-none">{day}</span>
                          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{month}</span>
                        </div>

                        {/* Online/Offline tag */}
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 text-slate-800 backdrop-blur-sm shadow-xs flex items-center gap-1">
                            {evt.locationType === "online" ? (
                              <>
                                <Globe className="w-3 h-3 text-[#1668E8]" />
                                Online
                              </>
                            ) : (
                              <>
                                <MapPin className="w-3 h-3 text-emerald-600" />
                                In-Person
                              </>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1 justify-between">
                        <div>
                          {/* Time & Location meta */}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-2 font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {full}
                            </span>
                            {evt.startTime && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                {evt.startTime} {evt.endTime ? `- ${evt.endTime}` : ""}
                              </span>
                            )}
                          </div>

                          <h3 className="text-lg font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors line-clamp-2 mb-2 leading-snug">
                            {evt.title}
                          </h3>

                          {evt.location && (
                            <p className="text-xs text-slate-500 flex items-center gap-1 mb-2 font-medium">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{evt.location}</span>
                            </p>
                          )}

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                            {evt.shortDescription}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <Link
                            href={`/news-and-updates/events/${evt.slug}`}
                            className="text-xs font-bold text-[#1668E8] hover:text-[#0D2344] flex items-center gap-1 transition-colors group-hover:underline"
                          >
                            Details & Agenda <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          {evt.registrationUrl ? (
                            <a
                              href={evt.registrationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1668E8] text-white text-xs font-bold hover:bg-[#0D2344] transition-colors shadow-xs"
                            >
                              <span>Register</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium italic">
                              Info Only
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </section>

        {/* PAST EVENTS */}
        <section>
          <Container size="wide">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <h2 className="text-2xl font-bold text-[#07152B]">
                Past Events ({pastEvents.length})
              </h2>
            </div>

            {pastEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center max-w-xl mx-auto text-xs text-slate-500">
                No past event archives available yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((evt) => {
                  const { full } = formatEventDate(evt.eventDate);
                  return (
                    <div
                      key={evt.id}
                      className="bg-white/90 rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <div className="relative w-full h-40 bg-slate-100 grayscale hover:grayscale-0 transition-all duration-300">
                        <Image
                          src={evt.coverImageUrl || DEFAULT_EVENT_IMAGE}
                          alt={evt.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2.5 right-2.5">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-800/80 text-white backdrop-blur-xs">
                            Concluded
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1 justify-between">
                        <div>
                          <div className="text-xs text-slate-400 font-medium mb-1.5 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{full}</span>
                          </div>

                          <h3 className="text-base font-bold text-[#07152B] mb-2 leading-snug">
                            {evt.title}
                          </h3>

                          {evt.location && (
                            <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{evt.location}</span>
                            </p>
                          )}

                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                            {evt.shortDescription}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <Link
                            href={`/news-and-updates/events/${evt.slug}`}
                            className="text-xs font-semibold text-slate-600 hover:text-[#1668E8] flex items-center gap-1 transition-colors"
                          >
                            View Recap <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <span className="text-[11px] text-slate-400">Past Event</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </section>
      </div>
    </main>
  );
}
