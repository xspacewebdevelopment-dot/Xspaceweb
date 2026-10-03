import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { testimonials, TestimonialStatus } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/testimonials/[id]/publish
 * Toggles publish / unpublish status.
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

    let targetStatus: TestimonialStatus;
    try {
      const body = await req.json();
      targetStatus = body.status;
    } catch {
      // If no body, toggle
      targetStatus = existing.status === "published" ? "unpublished" : "published";
    }

    if (!["draft", "published", "unpublished"].includes(targetStatus)) {
      targetStatus = existing.status === "published" ? "unpublished" : "published";
    }

    const [updated] = await db
      .update(testimonials)
      .set({
        status: targetStatus,
        updatedAt: new Date(),
      })
      .where(eq(testimonials.id, id))
      .returning();

    return NextResponse.json({ testimonial: updated }, { status: 200 });
  } catch (error) {
    console.error("Failed to update publish status:", error);
    return NextResponse.json(
      { error: "Failed to update publish status" },
      { status: 500 }
    );
  }
}
