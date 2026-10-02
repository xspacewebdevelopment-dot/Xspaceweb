import { db } from "@/lib/db";
import { careerApplications } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

/**
 * Generate a readable unique Application ID like APP-2026-0001
 * Server-only database helper
 */
export async function generateApplicationId(): Promise<string> {
  const currentYear = new Date().getFullYear();
  const prefix = `APP-${currentYear}-`;

  try {
    // Count existing applications for the current year
    const result = await db
      .select({
        count: sql<number>`count(*)::int`,
      })
      .from(careerApplications)
      .where(sql`${careerApplications.applicationId} LIKE ${prefix + "%"}`);

    const nextNumber = (result[0]?.count || 0) + 1;
    const formattedNumber = String(nextNumber).padStart(4, "0");
    const candidateId = `${prefix}${formattedNumber}`;

    // Verify uniqueness
    const exists = await db
      .select({ id: careerApplications.id })
      .from(careerApplications)
      .where(sql`${careerApplications.applicationId} = ${candidateId}`)
      .limit(1);

    if (exists.length > 0) {
      // Fallback with random suffix if collision
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      return `${prefix}${formattedNumber}-${randomSuffix}`;
    }

    return candidateId;
  } catch {
    // Fallback if db query fails
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomSuffix}`;
  }
}

/**
 * Check for duplicate application (same email + same opening within last 24 hours)
 * Server-only database helper
 */
export async function isDuplicateApplication(
  openingId: string,
  email: string
): Promise<boolean> {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const existing = await db
      .select({ id: careerApplications.id })
      .from(careerApplications)
      .where(
        sql`${careerApplications.openingId} = ${openingId}::uuid AND LOWER(${careerApplications.applicant}->>'email') = ${normalizedEmail} AND ${careerApplications.appliedAt} >= ${twentyFourHoursAgo}`
      )
      .limit(1);

    return existing.length > 0;
  } catch (err) {
    console.error("Error checking duplicate application:", err);
    return false;
  }
}
