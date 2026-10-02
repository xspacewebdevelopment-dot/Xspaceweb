import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { talentProfiles, InternalNote } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { talentNoteCreateSchema } from "@/lib/validations/talentPool";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/careers/talent-pool/:id/notes
 * Admin endpoint to add internal recruiter note to a talent profile
 */
export async function POST(
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

    const parseResult = talentNoteCreateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid note text" },
        { status: 400 }
      );
    }

    const { text } = parseResult.data;

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
    const newNote: InternalNote = {
      id: `note-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      text: text.trim(),
      createdBy: session.user?.email || "Admin",
      createdAt: now.toISOString(),
    };

    const updatedNotes = [newNote, ...(profile.internalNotes || [])];

    const [updated] = await db
      .update(talentProfiles)
      .set({
        internalNotes: updatedNotes,
        updatedAt: now,
      })
      .where(eq(talentProfiles.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      data: updated.internalNotes,
      message: "Note added successfully",
    });
  } catch (error) {
    console.error("Error adding internal note:", error);
    return NextResponse.json(
      { error: "Failed to add note to talent profile" },
      { status: 500 }
    );
  }
}
