import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { talentProfiles } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/careers/talent-pool/:id
 * Admin endpoint to fetch a single talent profile by ID or profileId
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
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    let profile;
    if (isUuid) {
      const results = await db
        .select()
        .from(talentProfiles)
        .where(eq(talentProfiles.id, id))
        .limit(1);
      profile = results[0];
    } else {
      const results = await db
        .select()
        .from(talentProfiles)
        .where(eq(talentProfiles.profileId, id))
        .limit(1);
      profile = results[0];
    }

    if (!profile) {
      return NextResponse.json(
        { error: "Talent profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Error fetching talent profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch talent profile" },
      { status: 500 }
    );
  }
}
