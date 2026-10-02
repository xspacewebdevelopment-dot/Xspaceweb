import { neon } from "@neondatabase/serverless";
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

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function main() {
  console.log("Running Talent Pool database migrations...");

  try {
    // 1. Create talent_profiles table
    await sql`
      CREATE TABLE IF NOT EXISTS talent_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        profile_id TEXT NOT NULL UNIQUE,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        current_location TEXT,
        preferred_role TEXT NOT NULL,
        expertise TEXT,
        experience TEXT,
        availability TEXT,
        preferred_work_mode TEXT,
        profile_links JSONB NOT NULL DEFAULT '{}'::jsonb,
        resume JSONB,
        profile_url TEXT,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        tags JSONB NOT NULL DEFAULT '[]'::jsonb,
        source TEXT NOT NULL DEFAULT 'website',
        internal_notes JSONB NOT NULL DEFAULT '[]'::jsonb,
        conversion_history JSONB NOT NULL DEFAULT '[]'::jsonb,
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;
    console.log("✓ Created or verified talent_profiles table");

    // 2. Create Indexes
    await sql`CREATE INDEX IF NOT EXISTS talent_profiles_profile_id_idx ON talent_profiles (profile_id);`;
    await sql`CREATE INDEX IF NOT EXISTS talent_profiles_email_idx ON talent_profiles (email);`;
    await sql`CREATE INDEX IF NOT EXISTS talent_profiles_status_idx ON talent_profiles (status);`;
    await sql`CREATE INDEX IF NOT EXISTS talent_profiles_role_idx ON talent_profiles (preferred_role);`;
    await sql`CREATE INDEX IF NOT EXISTS talent_profiles_submitted_at_idx ON talent_profiles (submitted_at);`;
    console.log("✓ Created indexes on talent_profiles");

    // 3. Add talent_profile_id column to career_applications if missing
    await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'career_applications' AND column_name = 'talent_profile_id'
        ) THEN
          ALTER TABLE career_applications ADD COLUMN talent_profile_id UUID;
          CREATE INDEX IF NOT EXISTS career_apps_talent_profile_idx ON career_applications (talent_profile_id);
        END IF;
      END $$;
    `;
    console.log("✓ Added or verified talent_profile_id in career_applications");

    console.log("Talent Pool database migration completed successfully!");
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
}

main();
