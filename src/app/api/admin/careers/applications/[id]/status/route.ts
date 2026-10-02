import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { careerApplications, StatusHistoryEntry } from "@/lib/db/schema";
import { applicationStatusUpdateSchema } from "@/lib/validations/applications";
import { eq, or } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/admin/careers/applications/[id]/status
 * Update application status and log history entry
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
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Application identifier is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = applicationStatusUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid status value",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const newStatus = parsed.data.status;
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

    const previousStatus = application.status;
    if (previousStatus === newStatus) {
      return NextResponse.json({
        success: true,
        message: `Status is already ${newStatus}`,
        data: application,
      });
    }

    const changedBy = session.user?.email || session.user?.name || "Admin";
    const historyEntry: StatusHistoryEntry = {
      from: previousStatus,
      to: newStatus,
      changedBy,
      changedAt: new Date().toISOString(),
    };

    const existingHistory = Array.isArray(application.statusHistory)
      ? application.statusHistory
      : [];
    const updatedHistory = [...existingHistory, historyEntry];

    const [updated] = await db
      .update(careerApplications)
      .set({
        status: newStatus,
        statusHistory: updatedHistory,
        updatedAt: new Date(),
      })
      .where(eq(careerApplications.id, application.id))
      .returning();

    return NextResponse.json({
      success: true,
      message: `Status updated from ${previousStatus} to ${newStatus}`,
      data: updated,
    });
  } catch (error) {
    console.error("Failed to update application status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update status" },
      { status: 500 }
    );
  }
}
