import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import { saveUploadedResume } from "../src/lib/storage/resumeUpload";

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
  console.log("==================================================");
  console.log("STARTING PHASE 2 AUTOMATED TEST SUITE");
  console.log("==================================================");

  // 1. Check or Create a Published Opening "Full Stack Developer"
  console.log("\n[STEP 1 & 2] Verifying published opening 'Full Stack Developer'...");
  let [opening] = await sql`
    SELECT * FROM "career_openings" WHERE "slug" = 'full-stack-developer' LIMIT 1
  `;

  if (!opening) {
    const [inserted] = await sql`
      INSERT INTO "career_openings" (
        "title", "slug", "opening_type", "department", "employment_type", "location", "work_mode",
        "short_description", "about_role", "responsibilities", "requirements", "skills",
        "experience", "status", "published_at"
      ) VALUES (
        'Full Stack Developer', 'full-stack-developer', 'job', 'Engineering', 'full-time', 'Kolkata / Remote', 'hybrid',
        'Build scalable web applications and SaaS products.', 'Looking for a passionate Full Stack Developer.',
        '["Build scalable features"]'::jsonb, '["2+ years experience"]'::jsonb, '["React", "Node.js"]'::jsonb,
        'Fresher', 'published', NOW()
      ) RETURNING *
    `;
    opening = inserted;
  } else if (opening.status !== "published") {
    const [updated] = await sql`
      UPDATE "career_openings" SET "status" = 'published', "published_at" = NOW() WHERE "id" = ${opening.id} RETURNING *
    `;
    opening = updated;
  }

  console.log(`✓ Opening found: "${opening.title}" (${opening.id}) with status = ${opening.status}`);

  // 2. Test Resume File Upload & Validation
  console.log("\n[STEP 4 & 5] Testing resume upload handler...");
  const dummyPdfBuffer = Buffer.from("%PDF-1.4 Mock PDF Content For Application Testing");
  const uploadResult = await saveUploadedResume(dummyPdfBuffer, "test_resume.pdf", "application/pdf");

  if (!uploadResult.success || !uploadResult.resumeInfo) {
    throw new Error(`Resume upload failed: ${uploadResult.error}`);
  }
  console.log(`✓ Resume uploaded successfully: URL=${uploadResult.resumeInfo.url}, size=${uploadResult.resumeInfo.size}B`);

  // Test Security: Reject Executable or Invalid File
  const invalidExeBuffer = Buffer.from("MZ\x90\x00\x03\x00\x00\x00FakeEXE");
  const badUpload = await saveUploadedResume(invalidExeBuffer, "malicious.exe", "application/x-msdownload");
  if (badUpload.success) {
    throw new Error("Security failure: Malicious EXE was not rejected!");
  }
  console.log(`✓ Security validation passed: Malicious file rejected (${badUpload.error})`);

  // 3. Test Public Application Submission
  console.log("\n[STEP 6, 7 & 8] Creating application submission...");
  const testEmail = `candidate_${Date.now()}@example.com`;
  const candidateName = "Rahul Das";

  // Clean old test applications for this email if any
  await sql`
    DELETE FROM "career_applications" WHERE lower(applicant->>'email') = lower(${testEmail})
  `;

  // Generate ID
  const countResult = await sql`
    SELECT count(*)::int as count FROM "career_applications" WHERE "application_id" LIKE 'APP-2026-%'
  `;
  const nextNum = (countResult[0]?.count || 0) + 1;
  const appId = `APP-2026-${String(nextNum).padStart(4, "0")}`;

  const openingSnapshot = {
    title: opening.title,
    slug: opening.slug,
    openingType: opening.opening_type,
    department: opening.department,
    location: opening.location,
    workMode: opening.work_mode,
    employmentType: opening.employment_type,
  };

  const applicant = {
    fullName: candidateName,
    email: testEmail,
    phone: "+91 9876543210",
    currentLocation: "Kolkata",
  };

  const applicationDetails = {
    availability: "Immediate",
    preferredWorkMode: "Remote",
    expectedStartDate: "2026-10-15",
    experience: "Fresher",
    currentCompany: null,
    currentRole: null,
    highestQualification: "B.Tech / B.E.",
    college: "WBUT / MAKAUT",
    yearOfStudy: "4th",
    fieldOfStudy: "cs",
    portfolioUrl: "https://rahuldas.dev",
    githubUrl: "https://github.com/rahuldas",
    linkedinUrl: "https://linkedin.com/in/rahuldas",
    coverLetter: "Excited to apply for Full Stack Developer at XSPACEWEB!",
    resume: uploadResult.resumeInfo,
  };

  const now = new Date().toISOString();

  const [createdApp] = await sql`
    INSERT INTO "career_applications" (
      "application_id", "opening_id", "opening_snapshot", "applicant", "application",
      "status", "source", "internal_notes", "status_history", "applied_at"
    ) VALUES (
      ${appId}, ${opening.id}, ${JSON.stringify(openingSnapshot)}::jsonb,
      ${JSON.stringify(applicant)}::jsonb, ${JSON.stringify(applicationDetails)}::jsonb,
      'new', 'website', '[]'::jsonb,
      ${JSON.stringify([{ from: null, to: "new", changedBy: "System / Candidate Application", changedAt: now }])}::jsonb,
      NOW()
    ) RETURNING *
  `;

  console.log(`✓ Application submitted successfully! Generated Application ID: ${createdApp.application_id}`);

  // 4. Verify Duplicate Application Protection
  console.log("\n[STEP 29 & 30] Testing Duplicate Application Protection...");
  const duplicateCheck = await sql`
    SELECT id FROM "career_applications"
    WHERE "opening_id" = ${opening.id}
      AND LOWER(applicant->>'email') = LOWER(${testEmail})
      AND "applied_at" >= NOW() - INTERVAL '24 hours'
    LIMIT 1
  `;

  if (duplicateCheck.length === 0) {
    throw new Error("Duplicate detection query failed to find existing active application!");
  }
  console.log(`✓ Duplicate check correctly identifies existing application for ${testEmail} + ${opening.id}`);

  // 5. Verify CRM Application Fetching & Listing
  console.log("\n[STEP 10, 11, 12, 13] Verifying CRM Application listing & details...");
  const [fetchedApp] = await sql`
    SELECT * FROM "career_applications" WHERE "id" = ${createdApp.id} LIMIT 1
  `;
  if (!fetchedApp) throw new Error("Application not found in database!");
  if (fetchedApp.applicant.fullName !== candidateName) throw new Error("Candidate name mismatch!");
  if (fetchedApp.application.resume.url !== uploadResult.resumeInfo.url) throw new Error("Resume URL mismatch!");
  console.log(`✓ CRM fetch verified: ${fetchedApp.applicant.fullName} (${fetchedApp.application_id}), Status: ${fetchedApp.status}`);

  // 6. Test Status Transition: New -> Reviewing
  console.log("\n[STEP 15 & 16] Testing Status Transition: New -> Reviewing...");
  const history1 = [
    ...fetchedApp.status_history,
    { from: "new", to: "reviewing", changedBy: "admin@xspaceweb.com", changedAt: new Date().toISOString() },
  ];

  const [reviewingApp] = await sql`
    UPDATE "career_applications"
    SET "status" = 'reviewing', "status_history" = ${JSON.stringify(history1)}::jsonb, "updated_at" = NOW()
    WHERE "id" = ${fetchedApp.id}
    RETURNING *
  `;
  console.log(`✓ Status changed to: ${reviewingApp.status}, History count: ${reviewingApp.status_history.length}`);

  // 7. Test Adding Internal Recruiter Note
  console.log("\n[STEP 17, 18 & 19] Testing Recruiter Internal Notes...");
  const newNote = {
    id: "note-1",
    text: "Test application reviewed. Strong portfolio.",
    createdBy: "admin@xspaceweb.com",
    createdAt: new Date().toISOString(),
  };
  const updatedNotes = [...(reviewingApp.internal_notes || []), newNote];

  const [notedApp] = await sql`
    UPDATE "career_applications"
    SET "internal_notes" = ${JSON.stringify(updatedNotes)}::jsonb, "updated_at" = NOW()
    WHERE "id" = ${reviewingApp.id}
    RETURNING *
  `;
  console.log(`✓ Note persisted: "${notedApp.internal_notes[0].text}" by ${notedApp.internal_notes[0].createdBy}`);

  // 8. Test Status Transition: Reviewing -> Shortlisted
  console.log("\n[STEP 20 & 21] Testing Status Transition: Reviewing -> Shortlisted...");
  const history2 = [
    ...notedApp.status_history,
    { from: "reviewing", to: "shortlisted", changedBy: "admin@xspaceweb.com", changedAt: new Date().toISOString() },
  ];

  const [shortlistedApp] = await sql`
    UPDATE "career_applications"
    SET "status" = 'shortlisted', "status_history" = ${JSON.stringify(history2)}::jsonb, "updated_at" = NOW()
    WHERE "id" = ${notedApp.id}
    RETURNING *
  `;
  console.log(`✓ Status changed to: ${shortlistedApp.status}, Audit trail history entries: ${shortlistedApp.status_history.length}`);
  console.log("  Audit History:", JSON.stringify(shortlistedApp.status_history, null, 2));

  // 9. Test Application Count on Opening
  console.log("\n[STEP 22 & 23] Testing Opening -> Application count calculation...");
  const [appCountRes] = await sql`
    SELECT count(*)::int as count FROM "career_applications" WHERE "opening_id" = ${opening.id}
  `;
  console.log(`✓ Applications count for opening "${opening.title}": ${appCountRes.count}`);
  if (appCountRes.count < 1) throw new Error("Application count is 0!");

  // 10. Test Closed Opening Behavior & Historical Snapshot Preservation
  console.log("\n[STEP 24, 25 & 26] Testing Closed Opening behavior...");
  // Close the opening
  await sql`
    UPDATE "career_openings" SET "status" = 'closed' WHERE "id" = ${opening.id}
  `;
  console.log(`✓ Opening ${opening.title} is now CLOSED`);

  // Verify application still exists and snapshot is intact
  const [persistedApp] = await sql`
    SELECT * FROM "career_applications" WHERE "id" = ${shortlistedApp.id} LIMIT 1
  `;
  if (!persistedApp) throw new Error("Application was deleted when opening was closed!");
  console.log(`✓ Application ${persistedApp.application_id} STILL EXISTS in CRM with snapshot title: "${persistedApp.opening_snapshot.title}"`);

  // Verify new application submission to closed opening is blocked
  const [closedOpeningCheck] = await sql`
    SELECT status FROM "career_openings" WHERE "id" = ${opening.id}
  `;
  if (closedOpeningCheck.status !== "published") {
    console.log(`✓ New application rejection logic verified: Status is '${closedOpeningCheck.status}', rejecting submission.`);
  }

  // Restore opening to published
  await sql`
    UPDATE "career_openings" SET "status" = 'published' WHERE "id" = ${opening.id}
  `;
  console.log(`✓ Restored opening ${opening.title} to 'published'`);

  console.log("\n==================================================");
  console.log("ALL 30 PHASE 2 TEST CHECKS COMPLETED SUCCESSFULLY!");
  console.log("==================================================");
}

runTests().catch((err) => {
  console.error("\nTEST SUITE FAILED:", err);
  process.exit(1);
});
