import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { and, eq, isNull, ne, asc, gte } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/events/[slug]
 * Public endpoint to fetch an individual published event by slug.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

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
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Fetch up to 3 other upcoming events
    const upcomingEvents = await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.status, "published"),
          isNull(events.archivedAt),
          gte(events.eventDate, startOfToday),
          ne(events.id, event.id)
        )
      )
      .orderBy(asc(events.eventDate))
      .limit(3);

    return NextResponse.json({ event, upcomingEvents }, { status: 200 });
  } catch (error) {
    console.error("Public event detail fetch error:", error);
    return NextResponse.json({ error: "Failed to load event details" }, { status: 500 });
  }
}
