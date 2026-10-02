import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { careerOpenings, careerApplications } from "@/lib/db/schema";
import { careerOpeningSchema, generateSlug } from "@/lib/validations/careers";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * Helper to ensure a unique slug when updating an opening
 */
async function getUniqueSlug(baseTitle: string, currentId: string): Promise<string> {
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

    if (existing.length === 0 || existing[0].id === currentId) {
      return slugCandidate;
    }

    counter++;
    slugCandidate = `${baseSlug}-${counter}`;
  }
}

/**
 * GET /api/admin/careers/openings/[id]
 * Fetch single opening for admin view or edit.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const [opening] = await db
      .select()
      .from(careerOpenings)
      .where(eq(careerOpenings.id, id))
      .limit(1);

    if (!opening) {
      return NextResponse.json(
        { success: false, error: "Opening not found" },
        { status: 404 }
      );
    }

    // Get application count
    const countRes = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(careerApplications)
      .where(eq(careerApplications.openingId, opening.id));

    const applicationsCount = countRes[0]?.count || 0;

    return NextResponse.json(
      {
        success: true,
        data: {
          ...opening,
          applicationsCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch career opening:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/careers/openings/[id]
 * Update opening details or change status (Publish, Move to Draft, Close, Archive).
 */
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const [existing] = await db
      .select()
      .from(careerOpenings)
      .where(eq(careerOpenings.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Opening not found" },
        { status: 404 }
      );
    }

    const body = await req.json();

    // Partial schema for quick status changes or full edit
    const updateSchema = careerOpeningSchema.partial();
    const parsed = updateSchema.safeParse(body);

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
    const updateFields: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (data.title !== undefined) {
      updateFields.title = data.title;
      // If title changed, update slug
      if (data.title !== existing.title) {
        updateFields.slug = await getUniqueSlug(data.title, id);
      }
    }

    if (data.openingType !== undefined) updateFields.openingType = data.openingType;
    if (data.department !== undefined) updateFields.department = data.department;
    if (data.employmentType !== undefined) updateFields.employmentType = data.employmentType;
    if (data.location !== undefined) updateFields.location = data.location;
    if (data.workMode !== undefined) updateFields.workMode = data.workMode;
    if (data.shortDescription !== undefined) updateFields.shortDescription = data.shortDescription;
    if (data.aboutRole !== undefined) updateFields.aboutRole = data.aboutRole;
    if (data.responsibilities !== undefined) updateFields.responsibilities = data.responsibilities;
    if (data.requirements !== undefined) updateFields.requirements = data.requirements;
    if (data.niceToHave !== undefined) updateFields.niceToHave = data.niceToHave;
    if (data.skills !== undefined) updateFields.skills = data.skills;
    if (data.experience !== undefined) updateFields.experience = data.experience;
    if (data.salary !== undefined) updateFields.salary = data.salary;
    if (data.internship !== undefined) updateFields.internship = data.internship;
    if (data.featured !== undefined) updateFields.featured = data.featured;

    if (data.closingDate !== undefined) {
      updateFields.closingDate = data.closingDate ? new Date(data.closingDate) : null;
    }

    if (data.status !== undefined) {
      updateFields.status = data.status;

      // When publishing for the first time, set publishedAt
      if (data.status === "published" && !existing.publishedAt) {
        updateFields.publishedAt = new Date();
      }
    }

    const [updated] = await db
      .update(careerOpenings)
      .set(updateFields)
      .where(eq(careerOpenings.id, id))
      .returning();

    let successMessage = "Opening updated successfully";
    if (data.status === "published" && existing.status !== "published") {
      successMessage = "Opening published successfully";
    } else if (data.status === "closed" && existing.status !== "closed") {
      successMessage = "Opening closed successfully";
    } else if (data.status === "archived" && existing.status !== "archived") {
      successMessage = "Opening archived successfully";
    } else if (data.status === "draft" && existing.status !== "draft") {
      successMessage = "Opening moved to draft successfully";
    }

    return NextResponse.json(
      {
        success: true,
        message: successMessage,
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update career opening:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error updating opening" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/careers/openings/[id]
 * Permanently delete opening. ONLY allowed for Draft status openings!
 */
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const [opening] = await db
      .select()
      .from(careerOpenings)
      .where(eq(careerOpenings.id, id))
      .limit(1);

    if (!opening) {
      return NextResponse.json(
        { success: false, error: "Opening not found" },
        { status: 404 }
      );
    }

    // Unlink openingId on associated applications so their snapshot and history remain safe
    await db
      .update(careerApplications)
      .set({ openingId: null })
      .where(eq(careerApplications.openingId, id));

    // Delete the opening
    await db.delete(careerOpenings).where(eq(careerOpenings.id, id));

    return NextResponse.json(
      { success: true, message: `Opening "${opening.title}" deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete career opening:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error deleting opening" },
      { status: 500 }
    );
  }
}
