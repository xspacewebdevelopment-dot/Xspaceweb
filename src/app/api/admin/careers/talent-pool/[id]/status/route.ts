import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { talentProfiles, InternalNote } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { talentStatusUpdateSchema } from "@/lib/validations/talentPool";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/admin/careers/talent-pool/:id/status
 * Admin endpoint to update talent profile status
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const parseResult = talentStatusUpdateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid status payload" },
        { status: 400 }
      );
    }

    const { status, note } = parseResult.data;

    // Fetch existing profile
    const [profile] = await db
      .select()
      .from(talentProfiles)
      .where(eq(talentProfiles.id, id))
      .limit(1);

    if (!profile) {
      return NextResponse.json({ error: "Talent profile not found" }, { status: 404 });
    }

    const now = new Date();
    const updatedNotes: InternalNote[] = [...(profile.internalNotes || [])];

    if (note && note.trim()) {
      updatedNotes.unshift({
        id: `note-${Date.now()}`,
        text: `Status changed to ${status}: ${note.trim()}`,
        createdBy: session.user?.email || "Admin",
        createdAt: now.toISOString(),
      });
    }

    const [updated] = await db
      .update(talentProfiles)
      .set({
        status,
        internalNotes: updatedNotes,
        updatedAt: now,
      })
      .where(eq(talentProfiles.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      data: updated,
      message: `Status updated to ${status}`,
    });
  } catch (error) {
    console.error("Error updating talent profile status:", error);
    return NextResponse.json(
      { error: "Failed to update talent profile status" },
      { status: 500 }
    );
  }
}
