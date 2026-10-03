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
  console.log("Creating interns table if not exists...");

  await sql`
    CREATE TABLE IF NOT EXISTS "interns" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "internship_id" text NOT NULL UNIQUE,
      "full_name" text NOT NULL,
      "email" text NOT NULL,
      "phone" text,
      "profile_image" text,
      "profile_image_public_id" text,
      "role" text NOT NULL,
      "department" text NOT NULL,
      "internship_type" text DEFAULT 'Remote' NOT NULL,
      "start_date" timestamp with time zone NOT NULL,
      "end_date" timestamp with time zone NOT NULL,
      "duration" text,
      "status" text DEFAULT 'ACTIVE' NOT NULL,
      "skills" jsonb DEFAULT '[]'::jsonb,
      "description" text,
      "performance_summary" text,
      "certificate_file" text,
      "certificate_public_id" text,
      "certificate_number" text UNIQUE,
      "certificate_issued_at" timestamp with time zone,
      "is_published" boolean DEFAULT true NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `;

  await sql`CREATE INDEX IF NOT EXISTS "interns_internship_id_idx" ON "interns" ("internship_id");`;
  await sql`CREATE INDEX IF NOT EXISTS "interns_status_idx" ON "interns" ("status");`;
  await sql`CREATE INDEX IF NOT EXISTS "interns_is_published_idx" ON "interns" ("is_published");`;
  await sql`CREATE INDEX IF NOT EXISTS "interns_email_idx" ON "interns" ("email");`;
  await sql`CREATE INDEX IF NOT EXISTS "interns_created_at_idx" ON "interns" ("created_at");`;

  console.log("Checking existing interns...");
  const existing = await sql`SELECT count(*)::int as count FROM "interns";`;
  const count = existing[0]?.count ?? 0;

  if (count === 0) {
    console.log("Seeding development demo intern records...");

    const now = new Date();
    const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();
    const daysFromNow = (d: number) => new Date(now.getTime() + d * 24 * 60 * 60 * 1000).toISOString();

    const demoInterns = [
      {
        internship_id: "XSW-INTERN-001",
        full_name: "Rohan Kumar",
        email: "rohan.kumar@example.com",
        phone: "+91 98765 43210",
        profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        role: "Web Development Intern",
        department: "Engineering",
        internship_type: "Remote",
        start_date: daysAgo(120),
        end_date: daysAgo(30),
        duration: "3 Months",
        status: "COMPLETED",
        skills: JSON.stringify(["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"]),
        description: "Contributed to modern full-stack web application development, responsive UI components, and API route integration under senior engineering mentorship.",
        performance_summary: "Demonstrated exceptional problem-solving abilities, clean coding standards, and proactive collaboration. Successfully delivered full-stack dashboard modules with high efficiency.",
        certificate_file: "https://res.cloudinary.com/demo/image/upload/v1690000000/sample.pdf",
        certificate_number: "CERT-XSW-2024-001",
        certificate_issued_at: daysAgo(29),
        is_published: true,
      },
      {
        internship_id: "XSW-INTERN-002",
        full_name: "Ananya Singh",
        email: "ananya.singh@example.com",
        phone: "+91 98765 43211",
        profile_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        role: "UI/UX Design Intern",
        department: "Design",
        internship_type: "Hybrid",
        start_date: daysAgo(60),
        end_date: daysFromNow(30),
        duration: "3 Months",
        status: "ACTIVE",
        skills: JSON.stringify(["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems"]),
        description: "Designed high-fidelity user workflows, design tokens, mobile-first responsive screens, and interactive micro-interactions for SaaS product modules.",
        performance_summary: "Highly creative with strong attention to visual hierarchy and usability guidelines. Communicates design rationale effectively with engineering teams.",
        certificate_file: null,
        certificate_number: null,
        certificate_issued_at: null,
        is_published: true,
      },
      {
        internship_id: "XSW-INTERN-003",
        full_name: "Aditya Verma",
        email: "aditya.verma@example.com",
        phone: "+91 98765 43212",
        profile_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        role: "Digital Marketing Intern",
        department: "Marketing",
        internship_type: "Remote",
        start_date: daysAgo(45),
        end_date: daysFromNow(45),
        duration: "3 Months",
        status: "ACTIVE",
        skills: JSON.stringify(["SEO Strategy", "Google Analytics", "Social Media Marketing", "Content Creation"]),
        description: "Optimized organic keyword rankings, developed social media outreach campaigns, and conducted weekly performance audits.",
        performance_summary: "Consistently delivers engaging social copies and campaign reports. Drove significant growth in organic blog engagement during the first half of the internship.",
        certificate_file: null,
        certificate_number: null,
        certificate_issued_at: null,
        is_published: true,
      },
      {
        internship_id: "XSW-INTERN-004",
        full_name: "Sneha Patra",
        email: "sneha.patra@example.com",
        phone: "+91 98765 43213",
        profile_image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        role: "Content Writing Intern",
        department: "Marketing",
        internship_type: "Remote",
        start_date: daysAgo(100),
        end_date: daysAgo(10),
        duration: "3 Months",
        status: "COMPLETED",
        skills: JSON.stringify(["Copywriting", "Technical Documentation", "SEO Writing", "Blog Management"]),
        description: "Authored technical product guides, client case studies, and engineering blog posts for XSPACEWEB public resources.",
        performance_summary: "Exceptional written voice with an ability to distill complex technical ideas into reader-friendly articles. Delivered all deliverables ahead of schedule.",
        certificate_file: "https://res.cloudinary.com/demo/image/upload/v1690000000/sample.pdf",
        certificate_number: "CERT-XSW-2024-004",
        certificate_issued_at: daysAgo(9),
        is_published: true,
      },
      {
        internship_id: "XSW-INTERN-005",
        full_name: "Karan Malhotra",
        email: "karan.malhotra@example.com",
        phone: "+91 98765 43214",
        profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
        role: "Data Analysis Intern",
        department: "Engineering",
        internship_type: "Remote",
        start_date: daysAgo(30),
        end_date: daysFromNow(60),
        duration: "3 Months",
        status: "ACTIVE",
        skills: JSON.stringify(["Python", "Pandas", "SQL", "Tableau", "Data Pipelines"]),
        description: "Analyzed platform usage telemetry, constructed performance reporting dashboards, and identified key operational metrics.",
        performance_summary: "Solid analytical foundation, quick to grasp business logic, and constructs informative data visualizations with minimal oversight.",
        certificate_file: null,
        certificate_number: null,
        certificate_issued_at: null,
        is_published: true,
      },
    ];

    for (const intern of demoInterns) {
      await sql`
        INSERT INTO "interns" (
          "internship_id",
          "full_name",
          "email",
          "phone",
          "profile_image",
          "role",
          "department",
          "internship_type",
          "start_date",
          "end_date",
          "duration",
          "status",
          "skills",
          "description",
          "performance_summary",
          "certificate_file",
          "certificate_number",
          "certificate_issued_at",
          "is_published"
        ) VALUES (
          ${intern.internship_id},
          ${intern.full_name},
          ${intern.email},
          ${intern.phone},
          ${intern.profile_image},
          ${intern.role},
          ${intern.department},
          ${intern.internship_type},
          ${intern.start_date},
          ${intern.end_date},
          ${intern.duration},
          ${intern.status},
          ${intern.skills}::jsonb,
          ${intern.description},
          ${intern.performance_summary},
          ${intern.certificate_file},
          ${intern.certificate_number},
          ${intern.certificate_issued_at},
          ${intern.is_published}
        );
      `;
    }

    console.log(`Successfully seeded ${demoInterns.length} demo intern records.`);
  } else {
    console.log(`Interns table already contains ${count} records. Skipping seed.`);
  }

  console.log("Migration complete!");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
