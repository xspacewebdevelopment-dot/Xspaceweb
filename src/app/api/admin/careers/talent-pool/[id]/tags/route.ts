import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { talentProfiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { talentTagsUpdateSchema } from "@/lib/validations/talentPool";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/admin/careers/talent-pool/:id/tags
 * Admin endpoint to update tags on a talent profile
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

    const parseResult = talentTagsUpdateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid tags payload" },
        { status: 400 }
      );
    }

    const { tags } = parseResult.data;

    // Deduplicate and clean tags
    const cleanTags = Array.from(
      new Set(tags.map((t) => t.trim()).filter((t) => t.length > 0))
    );

    const [profile] = await db
      .select()
      .from(talentProfiles)
      .where(eq(talentProfiles.id, id))
      .limit(1);

    if (!profile) {
      return NextResponse.json({ error: "Talent profile not found" }, { status: 404 });
    }

    const now = new Date();

    const [updated] = await db
      .update(talentProfiles)
      .set({
        tags: cleanTags,
        updatedAt: now,
      })
      .where(eq(talentProfiles.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      data: updated.tags,
      message: "Tags updated successfully",
    });
  } catch (error) {
    console.error("Error updating tags:", error);
    return NextResponse.json(
      { error: "Failed to update tags" },
      { status: 500 }
    );
  }
}
