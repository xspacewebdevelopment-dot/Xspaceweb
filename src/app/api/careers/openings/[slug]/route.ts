import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { careerOpenings } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/careers/openings/[slug]
 * Public API to fetch a single published opening by slug.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug parameter is required" },
        { status: 400 }
      );
    }

    const [opening] = await db
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
      .where(
        and(
          eq(careerOpenings.slug, slug),
          eq(careerOpenings.status, "published")
        )
      )
      .limit(1);

    if (!opening) {
      return NextResponse.json(
        { success: false, error: "Career opening not found or is not published" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: opening }, { status: 200 });
  } catch (error) {
    console.error("Error fetching single career opening:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch career opening" },
      { status: 500 }
    );
  }
}
