import fs from "fs";
import path from "path";

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
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) process.env[key] = val;
        }
      }
    }
  }
} catch {}

import { db } from "../src/lib/db";
import {
  talentProfiles,
  careerOpenings,
  careerApplications,
} from "../src/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import {
  generateTalentProfileId,
  isDuplicateTalentProfile,
  convertTalentProfileToApplication,
} from "../src/lib/services/talentPool";

async function runTalentPoolTests() {
  console.log("==================================================");
  console.log("STARTING PHASE 3 TALENT POOL AUTOMATED TEST SUITE");
  console.log("==================================================\n");

  const testEmail = `talent_test_${Date.now()}@example.com`;
  let testProfileId = "";
  let opening1Id = "";
  let opening2Id = "";
  let closedOpeningId = "";

  try {
    // --------------------------------------------------
    // SETUP: Ensure 2 Published Openings and 1 Closed Opening
    // --------------------------------------------------
    console.log("Setup: Preparing test Career Openings...");
    
    // Opening 1 (Full Stack Developer)
    const [op1] = await db
      .insert(careerOpenings)
      .values({
        title: `Full Stack Developer Test (${Date.now()})`,
        slug: `fsd-test-${Date.now()}`,
        openingType: "job",
        department: "Engineering",
        employmentType: "full-time",
        location: "Kolkata, India",
        workMode: "hybrid",
        shortDescription: "Test opening 1 for conversion",
        aboutRole: "Build scalable web applications",
        responsibilities: ["Develop React & Node.js code"],
        requirements: ["2+ years experience"],
        skills: ["React", "Node.js", "TypeScript"],
        experience: "2+ Years",
        status: "published",
      })
      .returning();
    opening1Id = op1.id;

    // Opening 2 (Backend Developer)
    const [op2] = await db
      .insert(careerOpenings)
      .values({
        title: `Backend Developer Test (${Date.now()})`,
        slug: `backend-test-${Date.now()}`,
        openingType: "job",
        department: "Engineering",
        employmentType: "full-time",
        location: "Remote",
        workMode: "remote",
        shortDescription: "Test opening 2 for second conversion",
        aboutRole: "Design robust APIs",
        responsibilities: ["Build REST and GraphQL APIs"],
        requirements: ["PostgreSQL & DB optimization"],
        skills: ["Node.js", "PostgreSQL", "Docker"],
        experience: "3+ Years",
        status: "published",
      })
      .returning();
    opening2Id = op2.id;

    // Closed Opening
    const [opClosed] = await db
      .insert(careerOpenings)
      .values({
        title: `Closed Opening Test (${Date.now()})`,
        slug: `closed-test-${Date.now()}`,
        openingType: "job",
        department: "Design",
        employmentType: "full-time",
        location: "Onsite",
        workMode: "onsite",
        shortDescription: "Test closed opening",
        aboutRole: "Design",
        responsibilities: ["UI Design"],
        requirements: ["Figma"],
        skills: ["Figma"],
        experience: "1+ Years",
        status: "closed",
      })
      .returning();
    closedOpeningId = opClosed.id;

    console.log(`✓ Created test openings: [${op1.title}], [${op2.title}], [${opClosed.title} (closed)]\n`);

    // --------------------------------------------------
    // TEST SCENARIO 1: Public Profile Submission & ID Generation
    // --------------------------------------------------
    console.log("Scenario 1: Testing Profile Submission & ID Generation...");
    const profileIdCode = await generateTalentProfileId();
    console.log(`- Generated Profile ID: ${profileIdCode}`);
    if (!profileIdCode.startsWith("TP-")) {
      throw new Error(`Profile ID ${profileIdCode} does not start with TP-`);
    }

    const now = new Date();
    const [createdProfile] = await db
      .insert(talentProfiles)
      .values({
        profileId: profileIdCode,
        fullName: "Arijeet Banerjee",
        email: testEmail,
        phone: "+91 9876543210",
        currentLocation: "Kolkata, India",
        preferredRole: "Full Stack Development",
        experience: "Fresher",
        availability: "Immediate",
        preferredWorkMode: "Remote",
        profileLinks: {
          githubUrl: "https://github.com/arijeet",
          portfolioUrl: "https://arijeet.dev",
        },
        resume: {
          url: "/uploads/resumes/demo_resume.pdf",
          fileName: "Arijeet_Resume.pdf",
          mimeType: "application/pdf",
          size: 102400,
        },
        status: "new",
        source: "website",
        submittedAt: now,
      })
      .returning();

    testProfileId = createdProfile.id;
    console.log(`✓ Profile created successfully in DB (DB ID: ${testProfileId}, Profile ID: ${createdProfile.profileId}, Status: ${createdProfile.status})\n`);

    // --------------------------------------------------
    // TEST SCENARIO 2: Duplicate Profile Cooldown (24h)
    // --------------------------------------------------
    console.log("Scenario 2: Testing Duplicate Profile Cooldown Protection...");
    const isDuplicate = await isDuplicateTalentProfile(testEmail);
    console.log(`- Duplicate check for ${testEmail}: ${isDuplicate}`);
    if (!isDuplicate) {
      throw new Error("Duplicate check failed: Expected duplicate profile detection within 24h.");
    }
    console.log("✓ Duplicate profile check prevented spam successfully.\n");

    // --------------------------------------------------
    // TEST SCENARIO 3: CRM Status, Notes, and Tags Management
    // --------------------------------------------------
    console.log("Scenario 3: Testing Status Update, Internal Notes, and Tags...");
    
    // Status update
    await db
      .update(talentProfiles)
      .set({ status: "reviewed" })
      .where(eq(talentProfiles.id, testProfileId));

    // Internal Note
    const sampleNote = {
      id: `note-${Date.now()}`,
      text: "Candidate has strong GitHub contributions. Suitable for frontend or fullstack.",
      createdBy: "admin@xspaceweb.com",
      createdAt: new Date().toISOString(),
    };
    await db
      .update(talentProfiles)
      .set({
        internalNotes: [sampleNote],
        tags: ["React", "TypeScript", "Node.js", "Immediate"],
      })
      .where(eq(talentProfiles.id, testProfileId));

    const [updatedProfile] = await db
      .select()
      .from(talentProfiles)
      .where(eq(talentProfiles.id, testProfileId));

    if (updatedProfile.status !== "reviewed") throw new Error("Status update failed");
    if ((updatedProfile.internalNotes || []).length !== 1) throw new Error("Internal notes failed");
    if ((updatedProfile.tags || []).length !== 4) throw new Error("Tags failed");
    console.log(`✓ Status: ${updatedProfile.status}, Notes count: ${updatedProfile.internalNotes.length}, Tags: [${updatedProfile.tags.join(", ")}]\n`);

    // --------------------------------------------------
    // TEST SCENARIO 4: Convert Candidate to First Opening
    // --------------------------------------------------
    console.log("Scenario 4: Converting Talent Profile to First Opening (Full Stack Developer)...");
    const convResult1 = await convertTalentProfileToApplication({
      talentProfileId: testProfileId,
      openingId: opening1Id,
      convertedByEmail: "recruiter@xspaceweb.com",
      initialStatus: "reviewing",
      availability: "Immediate",
      preferredWorkMode: "Hybrid",
      experience: "1-2 Years",
    });

    if (!convResult1.success) {
      throw new Error(`Conversion 1 failed: ${convResult1.error}`);
    }

    console.log(`- Created Application ID: ${convResult1.applicationId} for Opening: "${convResult1.openingTitle}"`);

    // Verify CareerApplication record
    const [appRecord1] = await db
      .select()
      .from(careerApplications)
      .where(eq(careerApplications.applicationId, convResult1.applicationId!));

    if (!appRecord1) throw new Error("CareerApplication not found in DB");
    if (appRecord1.source !== "talent-pool") throw new Error(`Expected source 'talent-pool', got ${appRecord1.source}`);
    if (appRecord1.talentProfileId !== testProfileId) throw new Error("talentProfileId mismatch");
    if (appRecord1.openingId !== opening1Id) throw new Error("openingId mismatch");

    // Verify TalentProfile status & conversion history
    const [profileAfterConv1] = await db
      .select()
      .from(talentProfiles)
      .where(eq(talentProfiles.id, testProfileId));

    if (profileAfterConv1.status !== "converted") throw new Error(`Expected profile status 'converted', got ${profileAfterConv1.status}`);
    if ((profileAfterConv1.conversionHistory || []).length !== 1) throw new Error("Conversion history length mismatch");
    console.log(`✓ Converted CareerApplication created with source 'talent-pool' and linked to profile ${profileAfterConv1.profileId}.\n`);

    // --------------------------------------------------
    // TEST SCENARIO 5: Duplicate Conversion Prevention (Same Opening)
    // --------------------------------------------------
    console.log("Scenario 5: Testing Duplicate Conversion Prevention for the SAME Opening...");
    const dupConvResult = await convertTalentProfileToApplication({
      talentProfileId: testProfileId,
      openingId: opening1Id,
      convertedByEmail: "recruiter@xspaceweb.com",
    });

    if (dupConvResult.success) {
      throw new Error("Duplicate conversion to the same opening should have been rejected, but it succeeded.");
    }
    console.log(`✓ Duplicate conversion correctly blocked: "${dupConvResult.error}"\n`);

    // --------------------------------------------------
    // TEST SCENARIO 6: Multi-Opening Conversion (Second Different Opening)
    // --------------------------------------------------
    console.log("Scenario 6: Testing Multi-Opening Conversion to a SECOND Opening (Backend Developer)...");
    const convResult2 = await convertTalentProfileToApplication({
      talentProfileId: testProfileId,
      openingId: opening2Id,
      convertedByEmail: "recruiter@xspaceweb.com",
      initialStatus: "reviewing",
    });

    if (!convResult2.success) {
      throw new Error(`Second conversion failed: ${convResult2.error}`);
    }

    console.log(`- Created Application ID: ${convResult2.applicationId} for Opening: "${convResult2.openingTitle}"`);

    const [profileAfterConv2] = await db
      .select()
      .from(talentProfiles)
      .where(eq(talentProfiles.id, testProfileId));

    if ((profileAfterConv2.conversionHistory || []).length !== 2) {
      throw new Error(`Expected 2 conversion history entries, found ${(profileAfterConv2.conversionHistory || []).length}`);
    }
    console.log(`✓ Multi-opening conversion succeeded. Candidate now has ${profileAfterConv2.conversionHistory.length} linked applications:\n` +
      profileAfterConv2.conversionHistory.map(c => `  • ${c.openingTitle} (${c.applicationCode})`).join("\n") + "\n"
    );

    // --------------------------------------------------
    // TEST SCENARIO 7: Invalid / Closed Opening Conversion Rejection
    // --------------------------------------------------
    console.log("Scenario 7: Testing Closed Opening Rejection...");
    const closedConvResult = await convertTalentProfileToApplication({
      talentProfileId: testProfileId,
      openingId: closedOpeningId,
      convertedByEmail: "recruiter@xspaceweb.com",
    });

    if (closedConvResult.success) {
      throw new Error("Conversion to closed opening should have failed, but succeeded.");
    }
    console.log(`✓ Closed opening correctly rejected: "${closedConvResult.error}"\n`);

    console.log("==================================================");
    console.log("ALL 7 PHASE 3 TEST SCENARIOS PASSED WITH 100% SUCCESS!");
    console.log("==================================================");

  } catch (error) {
    console.error("❌ Test Suite Error:", error);
    process.exit(1);
  } finally {
    // Clean up test records
    try {
      if (testProfileId) {
        await db.delete(careerApplications).where(eq(careerApplications.talentProfileId, testProfileId));
        await db.delete(talentProfiles).where(eq(talentProfiles.id, testProfileId));
      }
      if (opening1Id) await db.delete(careerOpenings).where(eq(careerOpenings.id, opening1Id));
      if (opening2Id) await db.delete(careerOpenings).where(eq(careerOpenings.id, opening2Id));
      if (closedOpeningId) await db.delete(careerOpenings).where(eq(careerOpenings.id, closedOpeningId));
      console.log("✓ Cleaned up test database records");
    } catch {
      // ignore cleanup errors
    }
  }
}

runTalentPoolTests();
