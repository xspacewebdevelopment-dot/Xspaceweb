import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { desc, ilike, eq, count, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "all";
    const search = searchParams.get("search") || "";

    // Total and active subscriber counts
    const [totalRes] = await db
      .select({ value: count() })
      .from(newsletterSubscribers);
    const totalCount = totalRes?.value ?? 0;

    const [activeRes] = await db
      .select({ value: count() })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.status, "subscribed"));
    const activeCount = activeRes?.value ?? 0;

    const unsubscribedCount = totalCount - activeCount;

    const conditions = [];

    if (filter === "subscribed") {
      conditions.push(eq(newsletterSubscribers.status, "subscribed"));
    } else if (filter === "unsubscribed") {
      conditions.push(eq(newsletterSubscribers.status, "unsubscribed"));
    }

    if (search.trim()) {
      const q = `%${search.trim()}%`;
      conditions.push(ilike(newsletterSubscribers.email, q));
    }

    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(newsletterSubscribers.subscribedAt));

    return NextResponse.json({
      subscribers,
      totalCount,
      activeCount,
      unsubscribedCount,
    });
  } catch (error: any) {
    console.error("Admin newsletter subscribers GET error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
