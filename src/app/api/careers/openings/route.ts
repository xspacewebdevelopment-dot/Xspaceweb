import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { careerOpenings } from "@/lib/db/schema";
import { eq, and, desc, asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/careers/openings
 * Public API to fetch published career openings.
 * Supports query params: ?type=job|internship, ?department=..., ?sort=latest|oldest
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get("type");
    const departmentParam = searchParams.get("department");
    const sortParam = searchParams.get("sort") || "latest";

    // Build conditions - ALWAYS strictly filter status = 'published'
    const conditions = [eq(careerOpenings.status, "published")];

    if (typeParam && (typeParam === "job" || typeParam === "internship")) {
      conditions.push(eq(careerOpenings.openingType, typeParam));
    }

    if (departmentParam && departmentParam.trim()) {
      conditions.push(eq(careerOpenings.department, departmentParam.trim()));
    }

    const orderByClause =
      sortParam === "oldest"
        ? [asc(careerOpenings.publishedAt), asc(careerOpenings.createdAt)]
        : [desc(careerOpenings.publishedAt), desc(careerOpenings.createdAt)];

    const openings = await db
      .select({
        id: careerOpenings.id,
        title: careerOpenings.title,
        slug: careerOpenings.slug,
        openingType: careerOpenings.openingType,
        department: careerOpenings.department,
        employmentType: careerOpenings.employmentType,
        location: careerOpenings.location,
        workMode: careerOpenings.workMode,
        shortDescription: careerOpenings.shortDescription,
        aboutRole: careerOpenings.aboutRole,
        responsibilities: careerOpenings.responsibilities,
        requirements: careerOpenings.requirements,
        niceToHave: careerOpenings.niceToHave,
        skills: careerOpenings.skills,
        experience: careerOpenings.experience,
        salary: careerOpenings.salary,
        internship: careerOpenings.internship,
        status: careerOpenings.status,
        featured: careerOpenings.featured,
        publishedAt: careerOpenings.publishedAt,
        closingDate: careerOpenings.closingDate,
        createdAt: careerOpenings.createdAt,
      })
      .from(careerOpenings)
      .where(and(...conditions))
      .orderBy(...orderByClause);

    return NextResponse.json({ success: true, data: openings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching public career openings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch career openings" },
      { status: 500 }
    );
  }
}
