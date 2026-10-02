import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { talentProfiles } from "@/lib/db/schema";
import { desc, asc, eq, and, or, ilike, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/careers/talent-pool
 * Admin endpoint to list talent profiles with search, filter, pagination, and KPI stats.
 */
export async function GET(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();
    const status = searchParams.get("status")?.trim();
    const role = searchParams.get("role")?.trim();
    const experience = searchParams.get("experience")?.trim();
    const workMode = searchParams.get("workMode")?.trim();
    const sort = searchParams.get("sort") || "latest";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "20", 10)));
    const offset = (page - 1) * limit;

    // Build query conditions
    const conditions = [];

    if (status && status !== "all") {
      conditions.push(eq(talentProfiles.status, status));
    }

    if (role && role !== "all") {
      conditions.push(eq(talentProfiles.preferredRole, role));
    }

    if (experience && experience !== "all") {
      conditions.push(eq(talentProfiles.experience, experience));
    }

    if (workMode && workMode !== "all") {
      conditions.push(eq(talentProfiles.preferredWorkMode, workMode));
    }

    if (search) {
      conditions.push(
        or(
          ilike(talentProfiles.profileId, `%${search}%`),
          ilike(talentProfiles.fullName, `%${search}%`),
          ilike(talentProfiles.email, `%${search}%`),
          ilike(talentProfiles.phone, `%${search}%`),
          ilike(talentProfiles.preferredRole, `%${search}%`),
          sql`${talentProfiles.tags}::text ILIKE ${`%${search}%`}`
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Sorting
    let orderByClause;
    if (sort === "oldest") {
      orderByClause = asc(talentProfiles.submittedAt);
    } else if (sort === "candidate-asc") {
      orderByClause = asc(talentProfiles.fullName);
    } else if (sort === "candidate-desc") {
      orderByClause = desc(talentProfiles.fullName);
    } else {
      orderByClause = desc(talentProfiles.submittedAt);
    }

    // 1. Fetch paginated records
    const records = await db
      .select()
      .from(talentProfiles)
      .where(whereClause)
      .orderBy(orderByClause)
      .limit(limit)
      .offset(offset);

    // 2. Fetch total matching records count
    const totalCountResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(talentProfiles)
      .where(whereClause);

    const total = totalCountResult[0]?.count || 0;
    const totalPages = Math.ceil(total / limit) || 1;

    // 3. Compute KPI summary stats
    const statsResult = await db
      .select({
        total: sql<number>`count(*)::int`,
        newCount: sql<number>`count(*) filter (where ${talentProfiles.status} = 'new')::int`,
        reviewedCount: sql<number>`count(*) filter (where ${talentProfiles.status} = 'reviewed')::int`,
        potentialCount: sql<number>`count(*) filter (where ${talentProfiles.status} = 'potential')::int`,
        contactedCount: sql<number>`count(*) filter (where ${talentProfiles.status} = 'contacted')::int`,
        convertedCount: sql<number>`count(*) filter (where ${talentProfiles.status} = 'converted')::int`,
        archivedCount: sql<number>`count(*) filter (where ${talentProfiles.status} = 'archived')::int`,
      })
      .from(talentProfiles);

    const stats = {
      total: statsResult[0]?.total || 0,
      new: statsResult[0]?.newCount || 0,
      reviewed: statsResult[0]?.reviewedCount || 0,
      potential: statsResult[0]?.potentialCount || 0,
      contacted: statsResult[0]?.contactedCount || 0,
      converted: statsResult[0]?.convertedCount || 0,
      archived: statsResult[0]?.archivedCount || 0,
    };

    return NextResponse.json({
      success: true,
      data: records,
      stats,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching admin talent profiles:", error);
    return NextResponse.json(
      { error: "Failed to fetch talent profiles" },
      { status: 500 }
    );
  }
}
