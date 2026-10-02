import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { careerApplications, careerOpenings } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/careers/applications/[id]
 * Fetch a single application by UUID or readable applicationId
 */
export async function GET(
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

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    let application;
    if (isUuid) {
      const results = await db
        .select()
        .from(careerApplications)
        .where(or(eq(careerApplications.id, id), eq(careerApplications.applicationId, id)))
        .limit(1);
      application = results[0];
    } else {
      const results = await db
        .select()
        .from(careerApplications)
        .where(eq(careerApplications.applicationId, id))
        .limit(1);
      application = results[0];
    }

    if (!application) {
      return NextResponse.json(
        { success: false, error: "Application not found" },
        { status: 404 }
      );
    }

    // Check if the related opening still exists in the database
    let liveOpening = null;
    if (application.openingId) {
      const liveRes = await db
        .select({
          id: careerOpenings.id,
          title: careerOpenings.title,
          slug: careerOpenings.slug,
          status: careerOpenings.status,
          department: careerOpenings.department,
        })
        .from(careerOpenings)
        .where(eq(careerOpenings.id, application.openingId))
        .limit(1);
      liveOpening = liveRes[0] || null;
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          ...application,
          liveOpening,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch application details:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
