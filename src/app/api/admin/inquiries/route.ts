import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectInquiries } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/inquiries
 * Retrieves all project inquiries. Strictly protected by admin session.
 */
export async function GET() {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const inquiries = await db
      .select()
      .from(projectInquiries)
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
