import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectInquiries } from "@/lib/db/schema";
import { desc, and, eq, isNull, isNotNull, SQL } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/inquiries
 * Retrieves project / service inquiries with optional filtering.
 * Strictly protected by admin session.
 */
export async function GET(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const typeParam = searchParams.get("type"); // "project" | "service" | "all"
  const archivedParam = searchParams.get("archived"); // "true" | "false" | "all"

  try {
    const conditions: SQL[] = [];

    if (typeParam && (typeParam === "project" || typeParam === "service")) {
      conditions.push(eq(projectInquiries.inquiryType, typeParam));
    }

    if (archivedParam === "true") {
      conditions.push(isNotNull(projectInquiries.archivedAt));
    } else if (archivedParam !== "all") {
      // Default: active (not archived)
      conditions.push(isNull(projectInquiries.archivedAt));
    }

    const inquiries = await db
      .select()
      .from(projectInquiries)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(projectInquiries.createdAt));

    return NextResponse.json({ inquiries }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

