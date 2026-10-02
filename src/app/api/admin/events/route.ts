import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { desc, asc, eq, and, isNull, isNotNull, or, ilike, gte, lt, SQL } from "drizzle-orm";
import { sendEventNotificationBroadcast } from "@/lib/resend";

export const dynamic = "force-dynamic";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * GET /api/admin/events
 * Lists events with status/date filtering and search.
 */
export async function GET(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "all"; // all, upcoming, past, draft, published, unpublished, archived
    const search = searchParams.get("search")?.trim() || "";

    const conditions: SQL[] = [];
    const now = new Date();
    // Start of current day for clean upcoming/past calculation
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (filter === "archived") {
      conditions.push(isNotNull(events.archivedAt));
    } else {
      // Exclude archived for all active views
      conditions.push(isNull(events.archivedAt));

      if (filter === "upcoming") {
        conditions.push(gte(events.eventDate, startOfToday));
      } else if (filter === "past") {
        conditions.push(lt(events.eventDate, startOfToday));
      } else if (filter === "draft") {
        conditions.push(eq(events.status, "draft"));
      } else if (filter === "published") {
        conditions.push(eq(events.status, "published"));
      } else if (filter === "unpublished") {
        conditions.push(eq(events.status, "unpublished"));
      }
    }

    if (search) {
      const searchCondition = or(
        ilike(events.title, `%${search}%`),
        ilike(events.location, `%${search}%`),
        ilike(events.shortDescription, `%${search}%`)
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const eventList = await db
      .select()
      .from(events)
      .where(whereClause)
      .orderBy(filter === "upcoming" ? asc(events.eventDate) : desc(events.eventDate));

    return NextResponse.json({ events: eventList }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch admin events:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * POST /api/admin/events
 * Creates a new event.
 */
export async function POST(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      slug: customSlug,
      shortDescription,
      fullDescription,
      eventDate,
      startTime,
      endTime,
      locationType = "offline",
      location,
      registrationUrl,
      coverImageUrl,
      coverImagePublicId,
      isFeatured = false,
      status = "draft",
      displayOrder = 0,
    } = body;

    if (!title?.trim() || !shortDescription?.trim() || !eventDate || !location?.trim()) {
      return NextResponse.json(
        { error: "Event Title, Short Description, Event Date, and Location are required." },
        { status: 400 }
      );
    }

    let baseSlug = slugify(customSlug || title);
    if (!baseSlug) {
      baseSlug = `event-${Date.now()}`;
    }

    // Ensure unique slug
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (true) {
      const existing = await db
        .select({ id: events.id })
        .from(events)
        .where(eq(events.slug, uniqueSlug))
        .limit(1);

      if (existing.length === 0) break;
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const [inserted] = await db
      .insert(events)
      .values({
        title: title.trim(),
        slug: uniqueSlug,
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription ? fullDescription.trim() : null,
        eventDate: new Date(eventDate),
        startTime: startTime ? startTime.trim() : null,
        endTime: endTime ? endTime.trim() : null,
        locationType: ["online", "offline"].includes(locationType) ? locationType : "offline",
        location: location.trim(),
        registrationUrl: registrationUrl ? registrationUrl.trim() : null,
        coverImageUrl: coverImageUrl ? coverImageUrl.trim() : null,
        coverImagePublicId: coverImagePublicId || null,
        isFeatured: Boolean(isFeatured),
        status: ["draft", "published", "unpublished"].includes(status) ? status : "draft",
        displayOrder: Number(displayOrder) || 0,
      })
      .returning();

    // Notify newsletter subscribers if requested
    if (body.notifySubscribers === true && inserted.status === "published") {
      try {
        await sendEventNotificationBroadcast({
          title: inserted.title,
          slug: inserted.slug,
          shortDescription: inserted.shortDescription,
          eventDate: inserted.eventDate,
          location: inserted.location,
          startTime: inserted.startTime,
          endTime: inserted.endTime,
          locationType: inserted.locationType,
          coverImageUrl: inserted.coverImageUrl,
        });
      } catch (notifyErr) {
        console.error("Failed to broadcast event to subscribers:", notifyErr);
      }
    }

    return NextResponse.json({ event: inserted }, { status: 201 });
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
