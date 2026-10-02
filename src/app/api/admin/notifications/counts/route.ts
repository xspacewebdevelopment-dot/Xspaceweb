import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  projectInquiries,
  careerApplications,
  talentProfiles,
} from "@/lib/db/schema";
import { count, eq, and, isNull } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await verifyAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      [projectRes],
      [serviceRes],
      [appsRes],
      [talentRes],
    ] = await Promise.all([
      db
        .select({ value: count() })
        .from(projectInquiries)
        .where(
          and(
            eq(projectInquiries.inquiryType, "project"),
            eq(projectInquiries.status, "new"),
            isNull(projectInquiries.archivedAt)
          )
        ),
      db
        .select({ value: count() })
        .from(projectInquiries)
        .where(
          and(
            eq(projectInquiries.inquiryType, "service"),
            eq(projectInquiries.status, "new"),
            isNull(projectInquiries.archivedAt)
          )
        ),
      db
        .select({ value: count() })
        .from(careerApplications)
        .where(eq(careerApplications.status, "new")),
      db
        .select({ value: count() })
        .from(talentProfiles)
        .where(eq(talentProfiles.status, "new")),
    ]);

    const projectInquiriesCount = projectRes?.value ?? 0;
    const serviceRequestsCount = serviceRes?.value ?? 0;
    const applicationsCount = appsRes?.value ?? 0;
    const talentPoolCount = talentRes?.value ?? 0;

    return NextResponse.json({
      projectInquiries: projectInquiriesCount,
      serviceRequests: serviceRequestsCount,
      applications: applicationsCount,
      talentPool: talentPoolCount,
      total:
        projectInquiriesCount +
        serviceRequestsCount +
        applicationsCount +
        talentPoolCount,
    });
  } catch (error) {
    console.error("Failed to fetch notification counts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
