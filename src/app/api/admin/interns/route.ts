import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { interns, NewIntern } from "@/lib/db/schema";
import { desc, asc, ilike, eq, and, or, sql } from "drizzle-orm";
import {
  generateNextInternshipId,
  calculateDuration,
  normalizeInternshipId,
  isValidInternshipId,
} from "@/lib/internship-utils";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim();
    const status = searchParams.get("status")?.trim();
    const department = searchParams.get("department")?.trim();
    const published = searchParams.get("published")?.trim();

    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(interns.fullName, `%${search}%`),
          ilike(interns.email, `%${search}%`),
          ilike(interns.role, `%${search}%`),
          ilike(interns.internshipId, `%${search}%`)
        )
      );
    }

    if (status && status !== "all") {
      conditions.push(eq(interns.status, status));
    }

    if (department && department !== "all") {
      conditions.push(eq(interns.department, department));
    }

    if (published === "true") {
      conditions.push(eq(interns.isPublished, true));
    } else if (published === "false") {
      conditions.push(eq(interns.isPublished, false));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const allInterns = await db
      .select()
      .from(interns)
      .where(whereClause)
      .orderBy(desc(interns.createdAt));

    return NextResponse.json({
      interns: allInterns,
      total: allInterns.length,
    });
  } catch (error) {
    console.error("Admin interns GET error:", error);
    return NextResponse.json({ error: "Failed to fetch interns" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      profileImage,
      profileImagePublicId,
      role,
      department,
      internshipType = "Remote",
      startDate,
      endDate,
      duration: customDuration,
      status = "ACTIVE",
      skills = [],
      description,
      performanceSummary,
      certificateFile,
      certificatePublicId,
      certificateNumber,
      certificateIssuedAt,
      isPublished = true,
      customInternshipId,
    } = body;

    // Validate Required Fields
    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!email || !email.trim() || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!role || !role.trim()) {
      return NextResponse.json({ error: "Intern role is required." }, { status: 400 });
    }
    if (!department || !department.trim()) {
      return NextResponse.json({ error: "Department is required." }, { status: 400 });
    }
    if (!startDate || !endDate) {
      return NextResponse.json({ error: "Both start date and end date are required." }, { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json({ error: "Invalid start or end date." }, { status: 400 });
    }

    if (end.getTime() < start.getTime()) {
      return NextResponse.json({ error: "End date cannot be earlier than start date." }, { status: 400 });
    }

    // Determine or generate unique Internship ID
    let finalInternshipId = "";

    if (customInternshipId && customInternshipId.trim()) {
      const normalized = normalizeInternshipId(customInternshipId);
      if (!isValidInternshipId(normalized)) {
        return NextResponse.json(
          { error: "Invalid Internship ID format. Must match XSW-INTERN-XXX (e.g. XSW-INTERN-001)." },
          { status: 400 }
        );
      }
      // Check uniqueness
      const [existing] = await db
        .select({ id: interns.id })
        .from(interns)
        .where(eq(interns.internshipId, normalized));

      if (existing) {
        return NextResponse.json(
          { error: `Internship ID ${normalized} already exists. Please use a unique ID.` },
          { status: 400 }
        );
      }
      finalInternshipId = normalized;
    } else {
      // Auto-generate sequentially: query all existing IDs
      const allIds = await db
        .select({ internshipId: interns.internshipId })
        .from(interns);
      finalInternshipId = generateNextInternshipId(allIds.map((r) => r.internshipId));
    }

    // Auto calculate duration if not specified
    const duration = customDuration && customDuration.trim()
      ? customDuration.trim()
      : calculateDuration(start, end);

    // Skills array sanitization
    const sanitizedSkills: string[] = Array.isArray(skills)
      ? skills.map((s: unknown) => String(s).trim()).filter(Boolean)
      : typeof skills === "string"
      ? skills.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const newRecord: NewIntern = {
      internshipId: finalInternshipId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      profileImage: profileImage || null,
      profileImagePublicId: profileImagePublicId || null,
      role: role.trim(),
      department: department.trim(),
      internshipType,
      startDate: start,
      endDate: end,
      duration,
      status,
      skills: sanitizedSkills,
      description: description ? description.trim() : null,
      performanceSummary: performanceSummary ? performanceSummary.trim() : null,
      certificateFile: certificateFile || null,
      certificatePublicId: certificatePublicId || null,
      certificateNumber: certificateNumber ? certificateNumber.trim() : null,
      certificateIssuedAt: certificateIssuedAt ? new Date(certificateIssuedAt) : null,
      isPublished: Boolean(isPublished),
    };

    const [created] = await db.insert(interns).values(newRecord).returning();

    return NextResponse.json({ success: true, intern: created }, { status: 201 });
  } catch (error) {
    console.error("Admin interns POST error:", error);
    return NextResponse.json(
      { error: "Failed to create intern", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
