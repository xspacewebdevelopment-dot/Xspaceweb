import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    const [existing] = await db
      .select()
      .from(interns)
      .where(or(eq(interns.id, id), eq(interns.internshipId, id.toUpperCase())));

    if (!existing) {
      return NextResponse.json({ error: "Intern not found" }, { status: 404 });
    }

    const newPublished = !existing.isPublished;

    const [updated] = await db
      .update(interns)
      .set({
        isPublished: newPublished,
        updatedAt: new Date(),
      })
      .where(eq(interns.id, existing.id))
      .returning();

    return NextResponse.json({
      success: true,
      isPublished: updated.isPublished,
      intern: updated,
    });
  } catch (error) {
    console.error("Admin intern publish toggle error:", error);
    return NextResponse.json({ error: "Failed to toggle published status" }, { status: 500 });
  }
}
