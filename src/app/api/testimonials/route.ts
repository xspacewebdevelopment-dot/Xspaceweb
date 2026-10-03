import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq, and, isNull, desc, asc, SQL } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/testimonials
 * Public endpoint to fetch published testimonials (client or intern).
 * Query params:
 *   - type: "client" | "intern" (optional)
 *   - limit: integer (optional)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "client" | "intern"
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Math.max(1, Math.min(100, parseInt(limitParam, 10))) : undefined;

    const conditions: SQL[] = [
      eq(testimonials.status, "published"),
      isNull(testimonials.archivedAt),
    ];

    if (type === "client" || type === "intern") {
      conditions.push(eq(testimonials.testimonialType, type));
    }

    let query = db
      .select()
      .from(testimonials)
      .where(and(...conditions))
      .orderBy(
        desc(testimonials.isFeatured),
        asc(testimonials.displayOrder),
        desc(testimonials.createdAt)
      );

    if (limit) {
      // @ts-expect-error drizzle query limit
      query = query.limit(limit);
    }

    const items = await query;

    return NextResponse.json({ testimonials: items }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch public testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
