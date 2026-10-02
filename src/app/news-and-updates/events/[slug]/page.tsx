import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { and, eq, isNull, ne, asc } from "drizzle-orm";
import { Container } from "@/components/shared/ui/Container";
import { MastheadHeader } from "@/components/news/MastheadHeader";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Globe,
  ExternalLink,
  Share2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

const DEFAULT_EVENT_IMAGE = "/images/news/news_conference_stage.jpg";

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [event] = await db
    .select({
      title: events.title,
      shortDescription: events.shortDescription,
      coverImageUrl: events.coverImageUrl,
    })
    .from(events)
    .where(
      and(
        eq(events.slug, slug),
        eq(events.status, "published"),
        isNull(events.archivedAt)
      )
    )
    .limit(1);

  if (!event) {
    return {
      title: "Event Not Found | XSPACEWEB",
    };
  }

  return {
    title: `${event.title} | XSPACEWEB Events`,
    description: event.shortDescription,
    openGraph: {
      title: event.title,
      description: event.shortDescription,
      images: [{ url: event.coverImageUrl || DEFAULT_EVENT_IMAGE }],
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;

  // Strict check: published and non-archived
  const [event] = await db
    .select()
    .from(events)
    .where(
      and(
        eq(events.slug, slug),
        eq(events.status, "published"),
        isNull(events.archivedAt)
      )
    )
    .limit(1);

  if (!event) {
    notFound();
  }

  // Fetch next upcoming events to showcase in related section
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const upcomingRelatedEvents = await db
    .select()
    .from(events)
    .where(
      and(
        ne(events.id, event.id),
        eq(events.status, "published"),
        isNull(events.archivedAt)
      )
    )
    .orderBy(asc(events.eventDate))
    .limit(3);

  const eventDateObj = new Date(event.eventDate);
  const isPast = eventDateObj.getTime() < startOfToday.getTime();

  const formattedDate = eventDateObj.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-white">
      <MastheadHeader />

      <article className="py-10 sm:py-16">
        <Container size="default" className="max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-500 mb-8">
            <Link
              href="/news-and-updates/events"
              className="text-[#1668E8] hover:text-[#0D2344] transition-colors inline-flex items-center gap-1.5 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>All Events</span>
            </Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-xs">{event.title}</span>
          </div>

          {/* Event Header & Badges */}
          <header className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#1668E8] text-white shadow-2xs flex items-center gap-1.5">
                {event.locationType === "online" ? (
                  <>
                    <Globe className="w-3.5 h-3.5" />
                    Online Event
                  </>
                ) : (
                  <>
                    <MapPin className="w-3.5 h-3.5" />
                    In-Person Event
                  </>
                )}
              </span>

              {isPast && (
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-100 text-slate-600 border border-slate-200">
                  Concluded
                </span>
              )}

              {event.isFeatured && (
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                  Featured Event
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#07152B] tracking-tight leading-[1.15]">
              {event.title}
            </h1>

            {/* Quick Metadata Info Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1668E8] flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-slate-400 font-medium text-[11px] uppercase tracking-wider">Date</span>
                  <strong className="text-[#07152B] font-semibold">{formattedDate}</strong>
                </div>
              </div>

              {(event.startTime || event.endTime) && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1668E8] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-slate-400 font-medium text-[11px] uppercase tracking-wider">Time</span>
                    <strong className="text-[#07152B] font-semibold">
                      {event.startTime} {event.endTime ? `- ${event.endTime}` : ""}
                    </strong>
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1668E8] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-slate-400 font-medium text-[11px] uppercase tracking-wider">
                      {event.locationType === "online" ? "Platform" : "Venue"}
                    </span>
                    <strong className="text-[#07152B] font-semibold">{event.location}</strong>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Cover Image */}
          <div className="relative w-full h-[280px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden mb-10 shadow-lg border border-slate-100 bg-slate-100">
            <Image
              src={event.coverImageUrl || DEFAULT_EVENT_IMAGE}
              alt={event.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* CTA Box (Floating/Sticky Banner or inline action) */}
          {event.registrationUrl && !isPast && (
            <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-[#07152B] to-[#0D2344] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div>
                <h3 className="text-lg font-bold">Reserve Your Spot</h3>
                <p className="text-xs text-slate-300">
                  Registration is open. Secure your ticket or webinar link today.
                </p>
              </div>
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1668E8] text-white text-sm font-bold hover:bg-blue-600 transition-colors shrink-0 shadow-lg"
              >
                <span>Register Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Short Description Lead Quote */}
          {event.shortDescription && (
            <div className="text-base sm:text-lg text-[#556987] leading-relaxed border-l-4 border-[#1668E8] pl-4 py-2 font-medium bg-slate-50/70 rounded-r-xl mb-8">
              {event.shortDescription}
            </div>
          )}

          {/* Full Description & Agenda Body */}
          <div className="prose prose-slate max-w-none text-[#1E293B] text-base sm:text-lg leading-relaxed space-y-6 border-b border-slate-100 pb-12">
            <h2 className="text-2xl font-bold text-[#07152B]">About this Event</h2>
            {event.fullDescription ? (
              event.fullDescription.split("\n\n").map((para, idx) => {
                const trimmed = para.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith("### ")) {
                  return (
                    <h3 key={idx} className="text-xl font-bold text-[#07152B] pt-3">
                      {trimmed.replace(/^###\s*/, "")}
                    </h3>
                  );
                }
                if (trimmed.startsWith("## ")) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold text-[#07152B] pt-4">
                      {trimmed.replace(/^##\s*/, "")}
                    </h2>
                  );
                }
                if (trimmed.startsWith("- ")) {
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-1 text-slate-700">
                      {trimmed
                        .split("\n")
                        .map((li, liIdx) => (
                          <li key={liIdx}>{li.replace(/^-\s*/, "")}</li>
                        ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="whitespace-pre-line leading-relaxed text-slate-700">
                    {trimmed}
                  </p>
                );
              })
            ) : (
              <p className="text-slate-600">{event.shortDescription}</p>
            )}
          </div>

          {/* Registration link again at bottom if available */}
          {event.registrationUrl && !isPast && (
            <div className="py-8 flex items-center justify-between border-b border-slate-100">
              <div>
                <span className="text-sm font-bold text-[#07152B] block">Ready to participate?</span>
                <span className="text-xs text-slate-500">Don&apos;t miss this opportunity to connect.</span>
              </div>
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1668E8] text-white text-xs sm:text-sm font-bold hover:bg-[#0D2344] transition-colors"
              >
                <span>Register Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Back Navigation Bar */}
          <div className="py-8 flex items-center justify-between">
            <Link
              href="/news-and-updates/events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Events</span>
            </Link>
            <Link
              href="/news-and-updates"
              className="text-xs font-semibold text-[#1668E8] hover:underline"
            >
              Visit News & Events Hub &rarr;
            </Link>
          </div>

          {/* Related Events Section */}
          {upcomingRelatedEvents.length > 0 && (
            <section className="pt-10 border-t border-slate-200">
              <h3 className="text-xl sm:text-2xl font-bold text-[#07152B] tracking-tight mb-6">
                Other Upcoming Events
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {upcomingRelatedEvents.map((rel) => {
                  const relDate = new Date(rel.eventDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  return (
                    <Link
                      key={rel.id}
                      href={`/news-and-updates/events/${rel.slug}`}
                      className="group bg-white rounded-xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col hover:-translate-y-1"
                    >
                      <div className="relative w-full h-36 bg-slate-100 overflow-hidden">
                        <Image
                          src={rel.coverImageUrl || DEFAULT_EVENT_IMAGE}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white/90 text-slate-800 shadow-xs">
                            {rel.locationType === "online" ? "Online" : "In-Person"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="text-[11px] text-slate-400 font-medium block mb-1">
                            {relDate}
                          </span>
                          <h4 className="text-sm font-bold text-[#07152B] group-hover:text-[#1668E8] transition-colors line-clamp-2 mb-2 leading-snug">
                            {rel.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                            {rel.shortDescription}
                          </p>
                        </div>
                        <span className="text-[11px] font-semibold text-[#1668E8] flex items-center gap-1 group-hover:underline">
                          View Event <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </Container>
      </article>
    </main>
  );
}
