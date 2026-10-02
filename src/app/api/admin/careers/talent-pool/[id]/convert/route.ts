import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { talentConvertSchema } from "@/lib/validations/talentPool";
import { convertTalentProfileToApplication } from "@/lib/services/talentPool";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/careers/talent-pool/:id/convert
 * Admin endpoint to convert a talent profile into a career application
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const parseResult = talentConvertSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid conversion payload" },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const adminEmail = session.user?.email || "Admin";

    const conversionResult = await convertTalentProfileToApplication({
      talentProfileId: id,
      openingId: data.openingId,
      convertedByEmail: adminEmail,
      initialStatus: data.status || "reviewing",
      availability: data.availability,
      preferredWorkMode: data.preferredWorkMode,
      experience: data.experience,
      expectedStartDate: data.expectedStartDate,
      currentRole: data.currentRole,
      currentCompany: data.currentCompany,
      highestQualification: data.highestQualification,
      college: data.college,
    });

    if (!conversionResult.success) {
      return NextResponse.json(
        { error: conversionResult.error || "Failed to convert talent profile" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Candidate converted to application for "${conversionResult.openingTitle}"`,
      applicationId: conversionResult.applicationId,
      applicationDbId: conversionResult.applicationDbId,
      openingTitle: conversionResult.openingTitle,
    });
  } catch (error) {
    console.error("Error in convert endpoint:", error);
    return NextResponse.json(
      { error: "Failed to convert talent profile to application" },
      { status: 500 }
    );
  }
}
