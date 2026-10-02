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

async function main() {
  console.log("Creating career_applications table if not exists...");
  
  await sql`
    CREATE TABLE IF NOT EXISTS "career_applications" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "application_id" text NOT NULL,
      "opening_id" uuid,
      "opening_snapshot" jsonb NOT NULL,
      "applicant" jsonb NOT NULL,
      "application" jsonb NOT NULL,
      "status" text DEFAULT 'new' NOT NULL,
      "source" text DEFAULT 'website' NOT NULL,
      "internal_notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
      "status_history" jsonb DEFAULT '[]'::jsonb NOT NULL,
      "applied_at" timestamp with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "career_applications_application_id_unique" UNIQUE("application_id")
    );
  `;

  console.log("Creating indexes for career_applications...");

  await sql`
    CREATE INDEX IF NOT EXISTS "career_apps_opening_idx" ON "career_applications" ("opening_id");
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS "career_apps_status_idx" ON "career_applications" ("status");
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS "career_apps_applied_at_idx" ON "career_applications" ("applied_at");
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS "career_apps_app_id_idx" ON "career_applications" ("application_id");
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS "career_apps_email_opening_idx" ON "career_applications" ("opening_id", ((applicant->>'email')));
  `;

  console.log("Table career_applications and all indexes created successfully!");
}

main().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
