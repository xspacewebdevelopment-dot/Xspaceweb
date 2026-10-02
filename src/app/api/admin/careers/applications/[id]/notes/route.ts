import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { careerApplications, InternalNote } from "@/lib/db/schema";
import { internalNoteCreateSchema } from "@/lib/validations/applications";
import { eq, or } from "drizzle-orm";
import crypto from "crypto";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/careers/applications/[id]/notes
 * Append recruiter internal note to an application
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
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Application identifier is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = internalNoteCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Note cannot be empty",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const noteText = parsed.data.text.trim();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    // Fetch existing application
    const results = await db
      .select()
      .from(careerApplications)
      .where(
        isUuid
          ? or(eq(careerApplications.id, id), eq(careerApplications.applicationId, id))
          : eq(careerApplications.applicationId, id)
      )
      .limit(1);

    const application = results[0];
    if (!application) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    const author = session.user?.email || session.user?.name || "Recruiter";
    const newNote: InternalNote = {
      id: crypto.randomUUID(),
      text: noteText,
      createdBy: author,
      createdAt: new Date().toISOString(),
    };

    const existingNotes = Array.isArray(application.internalNotes)
      ? application.internalNotes
      : [];
    const updatedNotes = [...existingNotes, newNote];

    const [updated] = await db
      .update(careerApplications)
      .set({
        internalNotes: updatedNotes,
        updatedAt: new Date(),
      })
      .where(eq(careerApplications.id, application.id))
      .returning();

    return NextResponse.json({
      success: true,
      message: "Internal note added successfully",
      data: updated,
      note: newNote,
    });
  } catch (error) {
    console.error("Failed to add internal note:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add note" },
      { status: 500 }
    );
  }
}
