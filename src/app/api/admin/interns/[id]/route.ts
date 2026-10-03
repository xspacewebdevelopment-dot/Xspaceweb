import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";
import { calculateDuration } from "@/lib/internship-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    const [intern] = await db
      .select()
      .from(interns)
      .where(or(eq(interns.id, id), eq(interns.internshipId, id.toUpperCase())));

    if (!intern) {
      return NextResponse.json({ error: "Intern not found" }, { status: 404 });
    }

    return NextResponse.json({ intern });
  } catch (error) {
    console.error("Admin intern GET by ID error:", error);
    return NextResponse.json({ error: "Failed to fetch intern" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    const [existing] = await db
      .select()
      .from(interns)
      .where(or(eq(interns.id, id), eq(interns.internshipId, id.toUpperCase())));

    if (!existing) {
      return NextResponse.json({ error: "Intern not found" }, { status: 404 });
    }

    // Handle Cloudinary image cleanup if profile image replaced
    if (
      body.profileImagePublicId &&
      existing.profileImagePublicId &&
      body.profileImagePublicId !== existing.profileImagePublicId
    ) {
      try {
        await deleteCloudinaryAsset(existing.profileImagePublicId);
      } catch (err) {
        console.warn("Failed to delete previous profile image from Cloudinary:", err);
      }
    }

    // Handle Cloudinary certificate cleanup if certificate file replaced
    if (
      body.certificatePublicId &&
      existing.certificatePublicId &&
      body.certificatePublicId !== existing.certificatePublicId
    ) {
      try {
        await deleteCloudinaryAsset(existing.certificatePublicId);
      } catch (err) {
        console.warn("Failed to delete previous certificate from Cloudinary:", err);
      }
    }

    const start = body.startDate ? new Date(body.startDate) : existing.startDate;
    const end = body.endDate ? new Date(body.endDate) : existing.endDate;

    if (end.getTime() < start.getTime()) {
      return NextResponse.json({ error: "End date cannot be earlier than start date." }, { status: 400 });
    }

    const duration = body.duration !== undefined
      ? body.duration
      : calculateDuration(start, end);

    const sanitizedSkills: string[] | undefined = body.skills !== undefined
      ? Array.isArray(body.skills)
        ? body.skills.map((s: unknown) => String(s).trim()).filter(Boolean)
        : typeof body.skills === "string"
        ? body.skills.split(",").map((s: string) => s.trim()).filter(Boolean)
        : []
      : undefined;

    const [updated] = await db
      .update(interns)
      .set({
        fullName: body.fullName !== undefined ? body.fullName.trim() : existing.fullName,
        email: body.email !== undefined ? body.email.trim().toLowerCase() : existing.email,
        phone: body.phone !== undefined ? (body.phone ? body.phone.trim() : null) : existing.phone,
        profileImage: body.profileImage !== undefined ? body.profileImage : existing.profileImage,
        profileImagePublicId: body.profileImagePublicId !== undefined ? body.profileImagePublicId : existing.profileImagePublicId,
        role: body.role !== undefined ? body.role.trim() : existing.role,
        department: body.department !== undefined ? body.department.trim() : existing.department,
        internshipType: body.internshipType !== undefined ? body.internshipType : existing.internshipType,
        startDate: start,
        endDate: end,
        duration,
        status: body.status !== undefined ? body.status : existing.status,
        skills: sanitizedSkills !== undefined ? sanitizedSkills : existing.skills,
        description: body.description !== undefined ? (body.description ? body.description.trim() : null) : existing.description,
        performanceSummary: body.performanceSummary !== undefined ? (body.performanceSummary ? body.performanceSummary.trim() : null) : existing.performanceSummary,
        certificateFile: body.certificateFile !== undefined ? body.certificateFile : existing.certificateFile,
        certificatePublicId: body.certificatePublicId !== undefined ? body.certificatePublicId : existing.certificatePublicId,
        certificateNumber: body.certificateNumber !== undefined ? (body.certificateNumber ? body.certificateNumber.trim() : null) : existing.certificateNumber,
        certificateIssuedAt: body.certificateIssuedAt !== undefined ? (body.certificateIssuedAt ? new Date(body.certificateIssuedAt) : null) : existing.certificateIssuedAt,
        isPublished: body.isPublished !== undefined ? Boolean(body.isPublished) : existing.isPublished,
        updatedAt: new Date(),
      })
      .where(eq(interns.id, existing.id))
      .returning();

    return NextResponse.json({ success: true, intern: updated });
  } catch (error) {
    console.error("Admin intern PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update intern", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;

    const [existing] = await db
      .select()
      .from(interns)
      .where(or(eq(interns.id, id), eq(interns.internshipId, id.toUpperCase())));

    if (!existing) {
      return NextResponse.json({ error: "Intern not found" }, { status: 404 });
    }

    // Clean up Cloudinary assets
    if (existing.profileImagePublicId) {
      try {
        await deleteCloudinaryAsset(existing.profileImagePublicId);
      } catch (err) {
        console.warn("Failed to delete intern profile image from Cloudinary:", err);
      }
    }

    if (existing.certificatePublicId) {
      try {
        await deleteCloudinaryAsset(existing.certificatePublicId);
      } catch (err) {
        console.warn("Failed to delete intern certificate from Cloudinary:", err);
      }
    }

    await db.delete(interns).where(eq(interns.id, existing.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin intern DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete intern", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
