import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { interns } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";

export async function POST(
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

    const {
      certificateFile,
      certificatePublicId,
      certificateNumber,
      certificateIssuedAt,
    } = body;

    if (!certificateFile) {
      return NextResponse.json({ error: "Certificate file URL is required." }, { status: 400 });
    }

    // Clean up previous certificate if replaced
    if (
      certificatePublicId &&
      existing.certificatePublicId &&
      certificatePublicId !== existing.certificatePublicId
    ) {
      try {
        await deleteCloudinaryAsset(existing.certificatePublicId);
      } catch (err) {
        console.warn("Failed to delete old certificate from Cloudinary:", err);
      }
    }

    const [updated] = await db
      .update(interns)
      .set({
        certificateFile,
        certificatePublicId: certificatePublicId || null,
        certificateNumber: certificateNumber ? certificateNumber.trim() : existing.certificateNumber,
        certificateIssuedAt: certificateIssuedAt ? new Date(certificateIssuedAt) : new Date(),
        updatedAt: new Date(),
      })
      .where(eq(interns.id, existing.id))
      .returning();

    return NextResponse.json({ success: true, intern: updated });
  } catch (error) {
    console.error("Admin attach certificate error:", error);
    return NextResponse.json(
      { error: "Failed to attach certificate", details: error instanceof Error ? error.message : String(error) },
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

    // Delete Cloudinary asset if present
    if (existing.certificatePublicId) {
      try {
        await deleteCloudinaryAsset(existing.certificatePublicId);
      } catch (err) {
        console.warn("Failed to delete certificate asset from Cloudinary:", err);
      }
    }

    const [updated] = await db
      .update(interns)
      .set({
        certificateFile: null,
        certificatePublicId: null,
        certificateNumber: null,
        certificateIssuedAt: null,
        updatedAt: new Date(),
      })
      .where(eq(interns.id, existing.id))
      .returning();

    return NextResponse.json({ success: true, intern: updated });
  } catch (error) {
    console.error("Admin remove certificate error:", error);
    return NextResponse.json(
      { error: "Failed to remove certificate", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
