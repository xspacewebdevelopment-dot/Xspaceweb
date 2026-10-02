import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaMentions } from "@/lib/db/schema";
import { and, eq, isNull, asc, desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const mentions = await db
      .select()
      .from(mediaMentions)
      .where(
        and(
          eq(mediaMentions.status, "published"),
          isNull(mediaMentions.archivedAt)
        )
      )
      .orderBy(asc(mediaMentions.displayOrder), desc(mediaMentions.publishedAt));

    return NextResponse.json({ mentions });
  } catch (error: any) {
    console.error("Public media mentions GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch media mentions" },
      { status: 500 }
    );
  }
}
