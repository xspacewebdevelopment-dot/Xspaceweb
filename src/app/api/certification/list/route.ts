import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const list = await db
      .select({
        id: interns.id,
        internshipId: interns.internshipId,
        fullName: interns.fullName,
        role: interns.role,
        department: interns.department,
        internshipType: interns.internshipType,
        startDate: interns.startDate,
        endDate: interns.endDate,
        duration: interns.duration,
        status: interns.status,
      })
      .from(interns)
      .where(eq(interns.isPublished, true))
      .orderBy(desc(interns.createdAt));

    return NextResponse.json({ interns: list });
  } catch (error) {
    console.error("Failed to fetch all interns:", error);
    return NextResponse.json({ interns: [] });
  }
}
