import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { careerOpenings, careerApplications, CareerOpening } from "@/lib/db/schema";
import { careerOpeningSchema, generateSlug } from "@/lib/validations/careers";
import { desc, asc, eq, and, or, ilike, count, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * Helper to ensure a unique slug when creating or renaming an opening
 */
async function getUniqueSlug(baseTitle: string, currentId?: string): Promise<string> {
  let baseSlug = generateSlug(baseTitle);
  if (!baseSlug) baseSlug = "career-opening";

  let slugCandidate = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await db
      .select({ id: careerOpenings.id, slug: careerOpenings.slug })
      .from(careerOpenings)
      .where(eq(careerOpenings.slug, slugCandidate))
      .limit(1);

    if (existing.length === 0 || (currentId && existing[0].id === currentId)) {
      return slugCandidate;
    }

    counter++;
    slugCandidate = `${baseSlug}-${counter}`;
  }
}

/**
 * GET /api/admin/careers/openings
 * Admin endpoint to list all career openings with filter and stats metadata.
 */
export async function GET(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();
    const type = searchParams.get("type")?.trim();
    const status = searchParams.get("status")?.trim();
    const department = searchParams.get("department")?.trim();
    const sort = searchParams.get("sort") || "latest";

    // Build conditions
    const conditions = [];

    if (type && type !== "all" && (type === "job" || type === "internship")) {
      conditions.push(eq(careerOpenings.openingType, type));
    }

    if (status && status !== "all") {
      conditions.push(eq(careerOpenings.status, status));
    }

    if (department && department !== "all") {
      conditions.push(eq(careerOpenings.department, department));
    }

    if (search) {
      conditions.push(
        or(
          ilike(careerOpenings.title, `%${search}%`),
          ilike(careerOpenings.department, `%${search}%`),
          ilike(careerOpenings.location, `%${search}%`),
          ilike(careerOpenings.shortDescription, `%${search}%`)
        )
      );
    }

    // Determine sorting
    let orderByClause;
    if (sort === "oldest") {
      orderByClause = [asc(careerOpenings.createdAt)];
    } else if (sort === "title-asc") {
      orderByClause = [asc(careerOpenings.title)];
    } else if (sort === "title-desc") {
      orderByClause = [desc(careerOpenings.title)];
    } else {
      orderByClause = [desc(careerOpenings.createdAt)];
    }

    const query = db.select().from(careerOpenings);
    const openings =
      conditions.length > 0
        ? await query.where(and(...conditions)).orderBy(...orderByClause)
        : await query.orderBy(...orderByClause);

    // Fetch Application counts for each opening
    const appCounts = await db
      .select({
        openingId: careerApplications.openingId,
        count: sql<number>`count(*)::int`,
      })
      .from(careerApplications)
      .groupBy(careerApplications.openingId);

    const countMap = new Map(
      appCounts
        .filter((c) => c.openingId !== null)
        .map((c) => [c.openingId as string, c.count])
    );

    const openingsWithCounts = openings.map((o) => ({
      ...o,
      applicationsCount: countMap.get(o.id) || 0,
    }));

    // Fetch Stats Counters
    const allOpenings = await db
      .select({
        status: careerOpenings.status,
        openingType: careerOpenings.openingType,
        department: careerOpenings.department,
      })
      .from(careerOpenings);

    const stats = {
      total: allOpenings.length,
      published: allOpenings.filter((o) => o.status === "published").length,
      draft: allOpenings.filter((o) => o.status === "draft").length,
      closed: allOpenings.filter((o) => o.status === "closed").length,
      archived: allOpenings.filter((o) => o.status === "archived").length,
      jobs: allOpenings.filter((o) => o.openingType === "job" && o.status === "published").length,
      internships: allOpenings.filter((o) => o.openingType === "internship" && o.status === "published").length,
    };

    // Get unique departments for filter dropdown
    const departments = Array.from(new Set(allOpenings.map((o) => o.department))).filter(Boolean);

    return NextResponse.json(
      {
        success: true,
        data: openingsWithCounts,
        stats,
        departments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch admin career openings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch openings" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/careers/openings
 * Admin endpoint to create a new career opening.
 */
export async function POST(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = careerOpeningSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Generate unique slug
    const uniqueSlug = await getUniqueSlug(data.title);

    // Set publishedAt if published
    const isPublished = data.status === "published";
    const publishedAt = isPublished ? new Date() : null;

    const closingDate = data.closingDate ? new Date(data.closingDate) : null;

    const [created] = await db
      .insert(careerOpenings)
      .values({
        title: data.title,
        slug: uniqueSlug,
        openingType: data.openingType,
        department: data.department,
        employmentType: data.employmentType,
        location: data.location,
        workMode: data.workMode,
        shortDescription: data.shortDescription,
        aboutRole: data.aboutRole,
        responsibilities: data.responsibilities,
        requirements: data.requirements,
        niceToHave: data.niceToHave || [],
        skills: data.skills || [],
        experience: data.experience,
        salary: data.salary || null,
        internship: data.internship || null,
        status: data.status,
        featured: data.featured ?? false,
        publishedAt,
        closingDate,
        createdBy: session.user?.email || "admin",
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        message: isPublished ? "Opening published successfully" : "Opening created as draft",
        data: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create career opening:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error creating opening" },
      { status: 500 }
    );
  }
}
