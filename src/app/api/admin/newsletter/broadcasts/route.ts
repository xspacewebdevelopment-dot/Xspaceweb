import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { newsletterBroadcasts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const broadcasts = await db
      .select()
      .from(newsletterBroadcasts)
      .orderBy(desc(newsletterBroadcasts.createdAt));

    return NextResponse.json({ broadcasts });
  } catch (error: any) {
    console.error("Admin newsletter broadcasts GET error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch broadcasts" },
      { status: 500 }
    );
  }
}
