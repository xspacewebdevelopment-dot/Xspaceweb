import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { and, eq, isNull, gte, lt, asc, desc, SQL } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/events
 * Public endpoint to fetch published and non-archived events.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "upcoming"; // upcoming | past | all
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10), 1), 50) : 50;

    const conditions: SQL[] = [
      eq(events.status, "published"),
      isNull(events.archivedAt),
    ];

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (filter === "upcoming") {
      conditions.push(gte(events.eventDate, startOfToday));
    } else if (filter === "past") {
      conditions.push(lt(events.eventDate, startOfToday));
    }

    const eventList = await db
      .select()
      .from(events)
      .where(and(...conditions))
      .orderBy(
        filter === "upcoming"
          ? asc(events.eventDate)
          : desc(events.eventDate)
      )
      .limit(limit);

    return NextResponse.json({ events: eventList }, { status: 200 });
  } catch (error) {
    console.error("Public events fetch error:", error);
    return NextResponse.json({ error: "Failed to load events" }, { status: 500 });
  }
}
