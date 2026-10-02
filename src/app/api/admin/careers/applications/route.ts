import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { careerApplications } from "@/lib/db/schema";
import { desc, asc, eq, and, or, ilike, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/careers/applications
 * Admin endpoint to list applications with search, filter, pagination, and KPI counts.
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
    const type = searchParams.get("type")?.trim();
    const openingId = searchParams.get("openingId")?.trim();
    const department = searchParams.get("department")?.trim();
    const sort = searchParams.get("sort") || "latest";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get("limit") || "20", 10)));
    const offset = (page - 1) * limit;

    // Build conditions
    const conditions = [];

    if (status && status !== "all") {
      conditions.push(eq(careerApplications.status, status));
    }

    if (type && type !== "all" && (type === "job" || type === "internship")) {
      conditions.push(
        sql`${careerApplications.openingSnapshot}->>'openingType' = ${type}`
      );
    }

    if (openingId && openingId !== "all") {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(openingId);
      if (isUuid) {
        conditions.push(eq(careerApplications.openingId, openingId));
      } else {
        conditions.push(
          sql`${careerApplications.openingSnapshot}->>'slug' = ${openingId}`
        );
      }
    }

    if (department && department !== "all") {
      conditions.push(
        sql`${careerApplications.openingSnapshot}->>'department' = ${department}`
      );
    }

    if (search) {
      conditions.push(
        or(
          ilike(careerApplications.applicationId, `%${search}%`),
          sql`LOWER(${careerApplications.applicant}->>'fullName') LIKE LOWER(${`%${search}%`})`,
          sql`LOWER(${careerApplications.applicant}->>'email') LIKE LOWER(${`%${search}%`})`,
          sql`LOWER(${careerApplications.openingSnapshot}->>'title') LIKE LOWER(${`%${search}%`})`
        )
      );
    }

    // Determine sorting
    let orderByClause;
    if (sort === "oldest") {
      orderByClause = [asc(careerApplications.appliedAt)];
    } else if (sort === "candidate-asc") {
      orderByClause = [asc(sql`${careerApplications.applicant}->>'fullName'`)];
    } else if (sort === "candidate-desc") {
      orderByClause = [desc(sql`${careerApplications.applicant}->>'fullName'`)];
    } else {
      orderByClause = [desc(careerApplications.appliedAt)];
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Total Count for Pagination
    const totalCountRes = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(careerApplications)
      .where(whereClause);
    const total = totalCountRes[0]?.count || 0;
    const totalPages = Math.ceil(total / limit) || 1;

    // Fetch Paginated Applications
    const applications = await db
      .select()
      .from(careerApplications)
      .where(whereClause)
      .orderBy(...orderByClause)
      .limit(limit)
      .offset(offset);

    // Fetch Global Stats for KPI Cards
    const allAppsSummary = await db
      .select({
        status: careerApplications.status,
        openingType: sql<string>`${careerApplications.openingSnapshot}->>'openingType'`,
        department: sql<string>`${careerApplications.openingSnapshot}->>'department'`,
      })
      .from(careerApplications);

    const stats = {
      total: allAppsSummary.length,
      new: allAppsSummary.filter((a) => a.status === "new").length,
      reviewing: allAppsSummary.filter((a) => a.status === "reviewing").length,
      shortlisted: allAppsSummary.filter((a) => a.status === "shortlisted").length,
      interview: allAppsSummary.filter((a) => a.status === "interview").length,
      selected: allAppsSummary.filter((a) => a.status === "selected").length,
      rejected: allAppsSummary.filter((a) => a.status === "rejected").length,
      withdrawn: allAppsSummary.filter((a) => a.status === "withdrawn").length,
    };

    const departments = Array.from(
      new Set(allAppsSummary.map((a) => a.department).filter(Boolean))
    );

    return NextResponse.json(
      {
        success: true,
        data: applications,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
        stats,
        departments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch admin career applications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}
