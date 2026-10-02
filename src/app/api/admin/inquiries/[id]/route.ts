import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { projectInquiries, inquiryStatusEnum, InquiryStatus } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const dynamic = "force-dynamic";

const patchSchema = z.object({
  status: z.enum(inquiryStatusEnum).optional(),
  archived: z.boolean().optional(),
});

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/inquiries/[id]
 * Fetch single inquiry details. Strictly protected.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const [inquiry] = await db
      .select()
      .from(projectInquiries)
      .where(eq(projectInquiries.id, id))
      .limit(1);

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ inquiry }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch inquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/inquiries/[id]
 * Update status or archive/restore an inquiry. Strictly protected.
 */
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { status, archived } = parsed.data;

    const updateFields: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (status !== undefined) {
      updateFields.status = status;
    }

    if (archived !== undefined) {
      updateFields.archivedAt = archived ? new Date() : null;
    }

    const [updated] = await db
      .update(projectInquiries)
      .set(updateFields)
      .where(eq(projectInquiries.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated }, { status: 200 });
  } catch (error) {
    console.error("Failed to update inquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/inquiries/[id]
 * Permanent deletion. Strictly protected.
 */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const [deleted] = await db
      .delete(projectInquiries)
      .where(eq(projectInquiries.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "Inquiry permanently deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

