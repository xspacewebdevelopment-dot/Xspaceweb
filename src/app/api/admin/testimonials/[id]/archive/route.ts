import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/testimonials/[id]/archive
 * Toggles archive / restore status.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const [existing] = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    let shouldArchive: boolean;
    try {
      const body = await req.json();
      shouldArchive = body.archive !== undefined ? Boolean(body.archive) : !existing.archivedAt;
    } catch {
      shouldArchive = !existing.archivedAt;
    }

    const [updated] = await db
      .update(testimonials)
      .set({
        archivedAt: shouldArchive ? new Date() : null,
        updatedAt: new Date(),
      })
      .where(eq(testimonials.id, id))
      .returning();

    return NextResponse.json(
      {
        testimonial: updated,
        isArchived: shouldArchive,
        message: shouldArchive ? "Testimonial archived." : "Testimonial restored.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update archive status:", error);
    return NextResponse.json(
      { error: "Failed to update archive status" },
      { status: 500 }
    );
  }
}
