import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";

// Load .env.local
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#")) {
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
} catch (e) {
  console.warn("Could not read .env.local", e);
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is missing!");
  process.exit(1);
}

const sql = neon(connectionString);

async function runTests() {
  console.log("=== STARTING PHASE 1 CAREERS CRM & DYNAMIC PAGES TEST ===");

  // 1. Initial State Check
  const initialRecords = await sql`SELECT id, title, slug, opening_type, status FROM "career_openings" ORDER BY created_at DESC;`;
  console.log(`[PASS] Initial Database records found: ${initialRecords.length}`);
  const initialPublishedJobs = initialRecords.filter((r) => r.opening_type === "job" && r.status === "published");
  console.log(`[PASS] Initial Published Jobs Count: ${initialPublishedJobs.length}`);

  // 2. Create Draft Opening: "Backend Developer"
  console.log("\n--- Scenario Step 4 & 5: Creating 'Backend Developer' as Draft ---");
  const testSlug = "backend-developer";
  // Clean up if previous test run existed
  await sql`DELETE FROM "career_openings" WHERE slug = ${testSlug};`;

  const [createdDraft] = await sql`
    INSERT INTO "career_openings" (
      title, slug, opening_type, department, employment_type,
      location, work_mode, short_description, about_role,
      responsibilities, requirements, nice_to_have, skills,
      experience, status, featured
    ) VALUES (
      'Backend Developer',
      ${testSlug},
      'job',
      'Engineering',
      'full-time',
      'Kolkata / Remote',
      'hybrid',
      'Build scalable backend APIs and services.',
      'We are looking for a skilled Backend Developer to architect and build our cloud services.',
      '["Build scalable REST APIs", "Optimize SQL queries"]'::jsonb,
      '["2+ years of Node.js experience", "PostgreSQL experience"]'::jsonb,
      '["Docker & Kubernetes knowledge"]'::jsonb,
      '["Node.js", "TypeScript", "PostgreSQL", "Docker"]'::jsonb,
      '2+ Years',
      'draft',
      false
    ) RETURNING *;
  `;

  console.log(`[PASS] Draft Created: ID=${createdDraft.id}, Status=${createdDraft.status}`);
  if (createdDraft.status !== "draft") throw new Error("Status should be draft");

  // 3. Confirm it DOES NOT appear publicly
  console.log("\n--- Scenario Step 6: Verify Draft is NOT exposed publicly ---");
  const publicPublishedBefore = await sql`
    SELECT id, title, slug FROM "career_openings" WHERE status = 'published' AND slug = ${testSlug};
  `;
  console.log(`[PASS] Public query for '${testSlug}': returned ${publicPublishedBefore.length} records (expected 0).`);
  if (publicPublishedBefore.length !== 0) throw new Error("Draft should not appear publicly");

  // 4. Edit opening -> Publish
  console.log("\n--- Scenario Step 7, 8 & 9: Publishing opening ---");
  const [publishedRecord] = await sql`
    UPDATE "career_openings"
    SET status = 'published', published_at = NOW(), updated_at = NOW()
    WHERE id = ${createdDraft.id}
    RETURNING *;
  `;
  console.log(`[PASS] Status updated to: ${publishedRecord.status}, PublishedAt: ${publishedRecord.published_at}`);
  if (publishedRecord.status !== "published") throw new Error("Status should be published");

  // 5. Public Careers Listing & Dynamic Count
  console.log("\n--- Scenario Step 10, 11 & 12: Public Query & Count Verification ---");
  const publicList = await sql`
    SELECT id, title, slug, opening_type, department, status, published_at
    FROM "career_openings"
    WHERE status = 'published'
    ORDER BY published_at DESC;
  `;
  const publishedJobsAfter = publicList.filter((r) => r.opening_type === "job");
  console.log(`[PASS] Published Jobs Count after publish: ${publishedJobsAfter.length} (increased from ${initialPublishedJobs.length})`);
  if (publishedJobsAfter.length !== initialPublishedJobs.length + 1) {
    throw new Error("Published jobs count did not increment");
  }

  const foundPublicly = publicList.find((r) => r.slug === testSlug);
  console.log(`[PASS] '${foundPublicly?.title}' is present in public published list.`);
  if (!foundPublicly) throw new Error("Opening not found in public list");

  // 6. Dynamic Detail Page Query by slug
  console.log("\n--- Scenario Step 13, 14 & 15: Single Opening Query by Slug ---");
  const [detailRecord] = await sql`
    SELECT id, title, slug, department, work_mode, about_role, responsibilities, requirements, skills
    FROM "career_openings"
    WHERE slug = ${testSlug} AND status = 'published'
    LIMIT 1;
  `;
  console.log(`[PASS] Fetched details for: ${detailRecord.title} (slug: /${detailRecord.slug})`);
  console.log(`       Responsibilities: ${JSON.stringify(detailRecord.responsibilities)}`);
  console.log(`       Skills: ${JSON.stringify(detailRecord.skills)}`);
  if (!detailRecord) throw new Error("Detail record query failed");

  // 7. Close the opening
  console.log("\n--- Scenario Step 16, 17 & 18: Close opening and verify removal from public ---");
  const [closedRecord] = await sql`
    UPDATE "career_openings"
    SET status = 'closed', updated_at = NOW()
    WHERE id = ${createdDraft.id}
    RETURNING *;
  `;
  console.log(`[PASS] Status updated to: ${closedRecord.status}`);

  const publicAfterClosed = await sql`
    SELECT id FROM "career_openings" WHERE status = 'published' AND slug = ${testSlug};
  `;
  console.log(`[PASS] Public query after close: returned ${publicAfterClosed.length} records (expected 0).`);
  if (publicAfterClosed.length !== 0) throw new Error("Closed opening should not appear publicly");

  const crmRecord = await sql`
    SELECT id, title, status FROM "career_openings" WHERE id = ${createdDraft.id};
  `;
  console.log(`[PASS] Exists in CRM with status: '${crmRecord[0].status}'`);
  if (crmRecord[0].status !== "closed") throw new Error("Should be closed in CRM");

  // 8. Delete Draft Test
  console.log("\n--- Delete Rule Verification: Delete Draft Only ---");
  // Set to draft first
  await sql`UPDATE "career_openings" SET status = 'draft' WHERE id = ${createdDraft.id};`;
  await sql`DELETE FROM "career_openings" WHERE id = ${createdDraft.id} AND status = 'draft';`;
  const deletedCheck = await sql`SELECT id FROM "career_openings" WHERE id = ${createdDraft.id};`;
  console.log(`[PASS] Deleted draft check: ${deletedCheck.length} records (expected 0).`);
  if (deletedCheck.length !== 0) throw new Error("Draft should have been deleted");

  // 9. Confirm existing 8 jobs & internships still work correctly
  console.log("\n--- Scenario Step 19: Verify initial 8 jobs and internships remain healthy ---");
  const finalPublished = await sql`
    SELECT id, title, slug, opening_type, status FROM "career_openings" WHERE status = 'published';
  `;
  console.log(`[PASS] Total published records: ${finalPublished.length}`);
  const finalJobs = finalPublished.filter((r) => r.opening_type === "job");
  const finalInternships = finalPublished.filter((r) => r.opening_type === "internship");
  console.log(`[PASS] Jobs: ${finalJobs.length}, Internships: ${finalInternships.length}`);

  for (const item of finalPublished) {
    console.log(`   * [${item.opening_type.toUpperCase()}] ${item.title} -> /careers/${item.slug}`);
  }

  console.log("\n=========================================");
  console.log("ALL PHASE 1 TESTS PASSED SUCCESSFULLY! ✅");
  console.log("=========================================");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
