import React from "react";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import {
  projectInquiries,
  newsArticles,
  events,
  mediaMentions,
  newsletterSubscribers,
  careerOpenings,
  careerApplications,
} from "@/lib/db/schema";
import { desc, count, eq, and, isNull, gte, asc } from "drizzle-orm";
import { formatSource } from "@/lib/constants";
import {
  Inbox,
  ArrowRight,
  Clock,
  Building,
  Mail,
  Tag,
  Newspaper,
  Calendar,
  MapPin,
  ExternalLink,
  Edit3,
  Sparkles,
  Tv,
  Plus,
  Briefcase,
  FileText,
  Layers,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CrmDashboardPage() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Inquiries counts
  const [projectCountRes] = await db
    .select({ value: count() })
    .from(projectInquiries)
    .where(eq(projectInquiries.inquiryType, "project"));
  const projectCount = projectCountRes?.value ?? 0;

  const [serviceCountRes] = await db
    .select({ value: count() })
    .from(projectInquiries)
    .where(eq(projectInquiries.inquiryType, "service"));
  const serviceCount = serviceCountRes?.value ?? 0;

  const [newCountRes] = await db
    .select({ value: count() })
    .from(projectInquiries)
    .where(eq(projectInquiries.status, "new"));
  const newCount = newCountRes?.value ?? 0;

  // Career counts
  const [openingsCountRes] = await db
    .select({ value: count() })
    .from(careerOpenings)
    .where(eq(careerOpenings.status, "published"));
  const openingsCount = openingsCountRes?.value ?? 0;

  const [applicationsCountRes] = await db
    .select({ value: count() })
    .from(careerApplications);
  const applicationsCount = applicationsCountRes?.value ?? 0;

  // News count
  const [publishedNewsRes] = await db
    .select({ value: count() })
    .from(newsArticles)
    .where(
      and(
        eq(newsArticles.status, "published"),
        isNull(newsArticles.archivedAt)
      )
    );
  const publishedNewsCount = publishedNewsRes?.value ?? 0;

  // Upcoming events count
  const [upcomingEventsRes] = await db
    .select({ value: count() })
    .from(events)
    .where(
      and(
        eq(events.status, "published"),
        isNull(events.archivedAt),
        gte(events.eventDate, startOfToday)
      )
    );
  const upcomingEventsCount = upcomingEventsRes?.value ?? 0;

  // Media mentions count
  const [mediaMentionsRes] = await db
    .select({ value: count() })
    .from(mediaMentions)
    .where(
      and(
        eq(mediaMentions.status, "published"),
        isNull(mediaMentions.archivedAt)
      )
    );
  const mediaMentionsCount = mediaMentionsRes?.value ?? 0;

  // Newsletter subscribers count
  const [subscribersRes] = await db
    .select({ value: count() })
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.status, "subscribed"));
  const subscribersCount = subscribersRes?.value ?? 0;

  // Spotlight upcoming event
  const [nextUpcomingEvent] = await db
    .select()
    .from(events)
    .where(
      and(
        eq(events.status, "published"),
        isNull(events.archivedAt),
        gte(events.eventDate, startOfToday)
      )
    )
    .orderBy(asc(events.eventDate))
    .limit(1);

  // Fetch latest 4 inquiries
  const recentInquiries = await db
    .select()
    .from(projectInquiries)
    .where(isNull(projectInquiries.archivedAt))
    .orderBy(desc(projectInquiries.createdAt))
    .limit(4);

  // Fetch latest 4 news articles
  const recentNews = await db
    .select()
    .from(newsArticles)
    .where(isNull(newsArticles.archivedAt))
    .orderBy(desc(newsArticles.createdAt))
    .limit(4);

  // Fetch latest 4 upcoming events
  const upcomingEventsList = await db
    .select()
    .from(events)
    .where(
      and(
        isNull(events.archivedAt),
        gte(events.eventDate, startOfToday)
      )
    )
    .orderBy(asc(events.eventDate))
    .limit(4);

  // Fetch latest 4 media mentions
  const recentMedia = await db
    .select()
    .from(mediaMentions)
    .where(isNull(mediaMentions.archivedAt))
    .orderBy(desc(mediaMentions.publishedAt))
    .limit(4);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "contacted":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "qualified":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "closed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome to XSPACEWEB CRM. Overview of inquiries, careers, news, events, and media.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/crm/news/new"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1668E8] text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post News</span>
          </Link>
          <Link
            href="/crm/events/new"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event</span>
          </Link>
          <Link
            href="/crm/careers/openings/new"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Opening</span>
          </Link>
          <Link
            href="/crm/media/new"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Media</span>
          </Link>
        </div>
      </div>

      {/* Summary KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {/* Project Inquiries */}
        <Link
          href="/crm/inquiries"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block truncate">
              Projects
            </span>
            <Inbox className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {projectCount}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 truncate">
            {newCount} new pending
          </p>
        </Link>

        {/* Service Requests */}
        <Link
          href="/crm/inquiries/services"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-purple-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block truncate">
              Services
            </span>
            <Layers className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-600 mt-1">
            {serviceCount}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 truncate">Direct requests</p>
        </Link>

        {/* Careers Openings */}
        <Link
          href="/crm/careers/openings"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block truncate">
              Openings
            </span>
            <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-indigo-600 mt-1">
            {openingsCount}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 truncate">{applicationsCount} applications</p>
        </Link>

        {/* Published News */}
        <Link
          href="/crm/news"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block truncate">
              News
            </span>
            <Newspaper className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {publishedNewsCount}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 truncate">Live articles</p>
        </Link>

        {/* Upcoming Events */}
        <Link
          href="/crm/events"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-amber-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block truncate">
              Events
            </span>
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600 mt-1">
            {upcomingEventsCount}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 truncate">Upcoming</p>
        </Link>

        {/* Media & Subscribers */}
        <Link
          href="/crm/media"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-teal-300 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider block truncate">
              Media & Press
            </span>
            <Tv className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-teal-600 mt-1">
            {mediaMentionsCount}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 truncate">{subscribersCount} subscribers</p>
        </Link>
      </div>

      {/* Next Upcoming Event Spotlight Banner (if available) */}
      {nextUpcomingEvent && (
        <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white rounded-2xl border border-blue-100 p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1668E8] text-white flex flex-col items-center justify-center font-bold shrink-0 shadow-xs">
              <span className="text-xs uppercase leading-none">
                {new Date(nextUpcomingEvent.eventDate).toLocaleDateString("en-GB", { month: "short" })}
              </span>
              <span className="text-lg leading-none mt-0.5">
                {new Date(nextUpcomingEvent.eventDate).getDate()}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Next Upcoming Event
                </span>
                {nextUpcomingEvent.isFeatured && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> Featured
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {nextUpcomingEvent.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                {nextUpcomingEvent.startTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {nextUpcomingEvent.startTime}
                  </span>
                )}
                {nextUpcomingEvent.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {nextUpcomingEvent.location}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
            <Link
              href={`/news-and-updates/events/${nextUpcomingEvent.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Page</span>
            </Link>
            <Link
              href={`/crm/events/${nextUpcomingEvent.id}/edit`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1668E8] text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Event</span>
            </Link>
          </div>
        </div>
      )}

      {/* Structured Dashboard Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1668E8] flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Recent Inquiries & Requests</h2>
                <p className="text-xs text-slate-400">Latest submissions across forms</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/crm/inquiries"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#1668E8] hover:text-blue-700 transition-colors"
              >
                <span>Projects</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/crm/inquiries/services"
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
              >
                <span>Services</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="flex-1 divide-y divide-slate-100">
            {recentInquiries.length === 0 ? (
              <div className="py-10 px-4 text-center space-y-2">
                <Inbox className="w-6 h-6 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No inquiries yet</p>
                <p className="text-[11px] text-slate-400">Submissions from contact forms will appear here.</p>
              </div>
            ) : (
              recentInquiries.map((inquiry) => {
                const targetUrl =
                  inquiry.inquiryType === "service"
                    ? "/crm/inquiries/services"
                    : "/crm/inquiries";

                return (
                  <div
                    key={inquiry.id}
                    className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {inquiry.name}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded capitalize ${
                            inquiry.inquiryType === "service"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {inquiry.inquiryType === "service" ? "Service" : "Project"}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${getStatusBadge(
                            inquiry.status
                          )}`}
                        >
                          {inquiry.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-500">
                        <span className="truncate max-w-[180px]">{inquiry.email}</span>
                        {inquiry.service && (
                          <span className="text-slate-400 font-medium truncate">• {inquiry.service}</span>
                        )}
                        <span className="text-slate-400">via {formatSource(inquiry.source)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-right shrink-0">
                      <span className="text-[11px] text-slate-400 whitespace-nowrap">
                        {new Date(inquiry.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                      <Link
                        href={targetUrl}
                        className="p-1 rounded-md text-slate-400 hover:text-[#1668E8] hover:bg-blue-50 transition-colors"
                        title="View inquiry details"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Card 2: Recent News & Updates */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Newspaper className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Recent News & Articles</h2>
                <p className="text-xs text-slate-400">Latest updates in CRM</p>
              </div>
            </div>
            <Link
              href="/crm/news"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1668E8] hover:text-blue-700 transition-colors"
            >
              <span>Manage News</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 divide-y divide-slate-100">
            {recentNews.length === 0 ? (
              <div className="py-10 px-4 text-center space-y-2">
                <Newspaper className="w-6 h-6 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No news articles yet</p>
                <Link
                  href="/crm/news/new"
                  className="text-xs font-bold text-[#1668E8] hover:underline"
                >
                  Create your first article &rarr;
                </Link>
              </div>
            ) : (
              recentNews.map((article) => (
                <div
                  key={article.id}
                  className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      {article.coverImageUrl ? (
                        <Image
                          src={article.coverImageUrl}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Newspaper className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {article.title}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full border ${
                            article.status === "published"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {article.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="text-slate-600 font-medium">{article.category}</span>
                        <span>•</span>
                        <span>
                          {article.publishedAt
                            ? new Date(article.publishedAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })
                            : "Draft"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {article.status === "published" && (
                      <Link
                        href={`/news-and-updates/${article.slug}`}
                        target="_blank"
                        className="p-1 rounded-md text-slate-400 hover:text-[#1668E8] hover:bg-blue-50 transition-colors"
                        title="View live article"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    <Link
                      href={`/crm/news/${article.id}/edit`}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="Edit article"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Card 3: Upcoming Events */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Upcoming Events</h2>
                <p className="text-xs text-slate-400">Webinars & live sessions</p>
              </div>
            </div>
            <Link
              href="/crm/events"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1668E8] hover:text-blue-700 transition-colors"
            >
              <span>Manage Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 divide-y divide-slate-100">
            {upcomingEventsList.length === 0 ? (
              <div className="py-10 px-4 text-center space-y-2">
                <Calendar className="w-6 h-6 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No upcoming events scheduled</p>
                <Link
                  href="/crm/events/new"
                  className="text-xs font-bold text-[#1668E8] hover:underline"
                >
                  Schedule an event &rarr;
                </Link>
              </div>
            ) : (
              upcomingEventsList.map((event) => (
                <div
                  key={event.id}
                  className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 flex flex-col items-center justify-center font-bold shrink-0">
                      <span className="text-[9px] uppercase leading-none">
                        {new Date(event.eventDate).toLocaleDateString("en-GB", { month: "short" })}
                      </span>
                      <span className="text-xs font-extrabold leading-none mt-0.5">
                        {new Date(event.eventDate).getDate()}
                      </span>
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {event.title}
                        </span>
                        {event.isFeatured && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="capitalize text-slate-600 font-medium">
                          {event.locationType === "online" ? "Online" : event.location}
                        </span>
                        {event.startTime && (
                          <>
                            <span>•</span>
                            <span>{event.startTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {event.status === "published" && (
                      <Link
                        href={`/news-and-updates/events/${event.slug}`}
                        target="_blank"
                        className="p-1 rounded-md text-slate-400 hover:text-[#1668E8] hover:bg-blue-50 transition-colors"
                        title="View live event"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    <Link
                      href={`/crm/events/${event.id}/edit`}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="Edit event"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Card 4: Recent Media Coverage */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Tv className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Recent Media Coverage</h2>
                <p className="text-xs text-slate-400">Press & publication features</p>
              </div>
            </div>
            <Link
              href="/crm/media"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#1668E8] hover:text-blue-700 transition-colors"
            >
              <span>Manage Media</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 divide-y divide-slate-100">
            {recentMedia.length === 0 ? (
              <div className="py-10 px-4 text-center space-y-2">
                <Tv className="w-6 h-6 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No media mentions yet</p>
                <Link
                  href="/crm/media/new"
                  className="text-xs font-bold text-[#1668E8] hover:underline"
                >
                  Add press mention &rarr;
                </Link>
              </div>
            ) : (
              recentMedia.map((media) => (
                <div
                  key={media.id}
                  className="p-3.5 sm:p-4 hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center p-1">
                      {media.logoUrl ? (
                        <Image
                          src={media.logoUrl}
                          alt={media.publicationName}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <span className="text-[10px] font-black text-slate-400">
                          {media.publicationName.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {media.publicationName}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full border ${
                            media.status === "published"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          {media.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate" title={media.headline}>
                        {media.headline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={media.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md text-slate-400 hover:text-[#1668E8] hover:bg-blue-50 transition-colors"
                      title="Read original article"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <Link
                      href={`/crm/media/${media.id}/edit`}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                      title="Edit media mention"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
