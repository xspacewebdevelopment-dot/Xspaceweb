import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const publishedInterns = await db
      .select({
        id: interns.id,
        internshipId: interns.internshipId,
        fullName: interns.fullName,
        profileImage: interns.profileImage,
        role: interns.role,
        department: interns.department,
        status: interns.status,
      })
      .from(interns)
      .where(eq(interns.isPublished, true))
      .orderBy(desc(interns.createdAt))
      .limit(8);

    return NextResponse.json({ interns: publishedInterns });
  } catch (error) {
    console.error("Public featured interns error:", error);
    return NextResponse.json({ interns: [] });
  }
}
