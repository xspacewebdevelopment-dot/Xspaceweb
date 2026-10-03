import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { testimonials, TestimonialType, TestimonialStatus, CardVariant } from "@/lib/db/schema";
import { desc, asc, eq, and, isNull, isNotNull, or, ilike, SQL } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/testimonials
 * Lists testimonials with filtering by type, status, rating, and search query.
 */
export async function GET(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "client" | "intern" | "all"
    const status = searchParams.get("status") || "all"; // "all" | "published" | "draft" | "unpublished" | "archived"
    const search = searchParams.get("search")?.trim() || "";
    const ratingParam = searchParams.get("rating");

    const conditions: SQL[] = [];

    // Filter by testimonial type
    if (type && type !== "all") {
      conditions.push(eq(testimonials.testimonialType, type));
    }

    // Filter by status / archive
    if (status === "archived") {
      conditions.push(isNotNull(testimonials.archivedAt));
    } else {
      conditions.push(isNull(testimonials.archivedAt));

      if (status === "draft") {
        conditions.push(eq(testimonials.status, "draft"));
      } else if (status === "published") {
        conditions.push(eq(testimonials.status, "published"));
      } else if (status === "unpublished") {
        conditions.push(eq(testimonials.status, "unpublished"));
      }
    }

    // Filter by rating
    if (ratingParam && !isNaN(parseInt(ratingParam, 10))) {
      const ratingVal = parseInt(ratingParam, 10);
      conditions.push(eq(testimonials.rating, ratingVal));
    }

    // Search by name, company, designation, headline, text
    if (search) {
      const searchCondition = or(
        ilike(testimonials.name, `%${search}%`),
        ilike(testimonials.company, `%${search}%`),
        ilike(testimonials.designation, `%${search}%`),
        ilike(testimonials.headline, `%${search}%`),
        ilike(testimonials.location, `%${search}%`)
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    const items = await db
      .select()
      .from(testimonials)
      .where(and(...conditions))
      .orderBy(
        desc(testimonials.isFeatured),
        asc(testimonials.displayOrder),
        desc(testimonials.createdAt)
      );

    return NextResponse.json({ testimonials: items }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch admin testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/testimonials
 * Creates a new testimonial (client review or intern testimonial).
 */
export async function POST(req: NextRequest) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const testimonialType: TestimonialType = body.testimonialType === "intern" ? "intern" : "client";
    const name = body.name?.trim();
    const designation = body.designation?.trim() || null;
    const company = body.company?.trim() || null;
    const location = body.location?.trim() || null;
    const headline = body.headline?.trim() || null;
    const testimonialText = body.testimonialText?.trim();
    const rating = body.rating !== undefined && body.rating !== null ? parseInt(body.rating, 10) : 5;
    const profileImageUrl = body.profileImageUrl?.trim() || null;
    const profileImagePublicId = body.profileImagePublicId?.trim() || null;
    const cardVariant: CardVariant = body.cardVariant || "standard";
    const isFeatured = Boolean(body.isFeatured);
    const displayOrder = parseInt(body.displayOrder, 10) || 0;
    const status: TestimonialStatus = ["draft", "published", "unpublished"].includes(body.status)
      ? body.status
      : "published";

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!testimonialText) {
      return NextResponse.json({ error: "Testimonial text is required" }, { status: 400 });
    }

    if (testimonialType === "intern" && !designation) {
      return NextResponse.json(
        { error: "Internship role / designation is required for intern testimonials" },
        { status: 400 }
      );
    }

    const [created] = await db
      .insert(testimonials)
      .values({
        testimonialType,
        name,
        designation,
        company,
        location,
        rating: isNaN(rating) ? null : rating,
        headline,
        testimonialText,
        profileImageUrl,
        profileImagePublicId,
        cardVariant,
        isFeatured,
        displayOrder,
        status,
        archivedAt: null,
      })
      .returning();

    return NextResponse.json({ testimonial: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to create testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
