import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/testimonials/[id]
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const [item] = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id))
      .limit(1);

    if (!item) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ testimonial: item }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch testimonial:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/testimonials/[id]
 * Updates testimonial fields and handles Cloudinary cleanup when replacing an image.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const [existing] = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    const body = await req.json();
    const updateData: Partial<typeof testimonials.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (body.testimonialType !== undefined) {
      updateData.testimonialType = body.testimonialType === "intern" ? "intern" : "client";
    }
    if (body.name !== undefined) {
      updateData.name = body.name.trim();
    }
    if (body.designation !== undefined) {
      updateData.designation = body.designation ? body.designation.trim() : null;
    }
    if (body.company !== undefined) {
      updateData.company = body.company ? body.company.trim() : null;
    }
    if (body.location !== undefined) {
      updateData.location = body.location ? body.location.trim() : null;
    }
    if (body.headline !== undefined) {
      updateData.headline = body.headline ? body.headline.trim() : null;
    }
    if (body.testimonialText !== undefined) {
      updateData.testimonialText = body.testimonialText.trim();
    }
    if (body.rating !== undefined) {
      updateData.rating = body.rating !== null && !isNaN(parseInt(body.rating, 10))
        ? parseInt(body.rating, 10)
        : null;
    }
    if (body.cardVariant !== undefined) {
      updateData.cardVariant = body.cardVariant;
    }
    if (body.isFeatured !== undefined) {
      updateData.isFeatured = Boolean(body.isFeatured);
    }
    if (body.displayOrder !== undefined) {
      updateData.displayOrder = parseInt(body.displayOrder, 10) || 0;
    }
    if (body.status !== undefined) {
      updateData.status = body.status;
    }

    // Image update and previous Cloudinary asset cleanup
    if (body.profileImageUrl !== undefined) {
      updateData.profileImageUrl = body.profileImageUrl ? body.profileImageUrl.trim() : null;
    }
    if (body.profileImagePublicId !== undefined) {
      const newPublicId = body.profileImagePublicId ? body.profileImagePublicId.trim() : null;
      // If previous public ID exists and is different from new public ID, clean up old asset
      if (existing.profileImagePublicId && existing.profileImagePublicId !== newPublicId) {
        try {
          await deleteCloudinaryAsset(existing.profileImagePublicId);
        } catch (delErr) {
          console.error("Failed to delete previous Cloudinary asset:", delErr);
        }
      }
      updateData.profileImagePublicId = newPublicId;
    }

    const [updated] = await db
      .update(testimonials)
      .set(updateData)
      .where(eq(testimonials.id, id))
      .returning();

    return NextResponse.json({ testimonial: updated }, { status: 200 });
  } catch (error) {
    console.error("Failed to update testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/testimonials/[id]
 * Permanently deletes testimonial and cleans up its Cloudinary asset if present.
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const [existing] = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id))
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // Remove Cloudinary image if it was uploaded to Cloudinary
    if (existing.profileImagePublicId) {
      try {
        await deleteCloudinaryAsset(existing.profileImagePublicId);
      } catch (delErr) {
        console.error("Failed to delete Cloudinary asset during deletion:", delErr);
      }
    }

    await db.delete(testimonials).where(eq(testimonials.id, id));

    return NextResponse.json(
      { success: true, message: "Testimonial permanently deleted." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to permanently delete testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
