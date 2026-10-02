import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { newsArticles } from "../src/lib/db/schema";

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
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
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

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const seedItems = [
  {
    title: "MakeGSTBill New Features Released",
    slug: "makegstbill-update",
    category: "Product Updates",
    summary: "Introducing advanced reporting, multi-user access and new customization options.",
    content: `MakeGSTBill has launched its comprehensive 3.0 update, bringing enterprise-grade GST billing, multi-user role management, auto-reconciliation with the GST portal, and customizable invoice templates tailored for Indian businesses and retail chains.

With this release, business owners can easily generate compliant e-invoices, manage inventory across multiple store locations, and track payment dues in real-time. The new analytics suite provides deep insights into cash flows, tax liabilities, and sales trends.

Key enhancements included in MakeGSTBill 3.0:
- Instant GSTIN auto-fill and validation
- Multi-currency and multi-warehouse support
- Automated payment reminders via WhatsApp & Email
- Seamless export to Tally and ERP platforms`,
    coverImageUrl: "/images/news/news_laptop_code.jpg",
    coverImagePublicId: null,
    status: "published",
    isFeatured: true,
    displayOrder: 1,
    publishedAt: new Date("2026-09-09T10:00:00Z"),
  },
  {
    title: "Strategic Collaboration with Industry Leaders",
    slug: "strategic-partnership",
    category: "Company Updates",
    summary: "XSPACEWEB partners with leading organizations to deliver innovative digital solutions.",
    content: `XSPACEWEB announced strategic alliances with key national technology partners and cloud providers to accelerate digital transformation, custom SaaS architecture, and omnichannel digital strategies for enterprises across India and global markets.

Through these collaborations, our engineering teams gain dedicated access to cutting-edge cloud infrastructure, enterprise security frameworks, and AI acceleration pipelines.

"This partnership represents an important step in our mission to empower modern enterprises with world-class engineering and scalable digital solutions," said the executive team at XSPACEWEB.`,
    coverImageUrl: "/images/news/news_handshake.jpg",
    coverImagePublicId: null,
    status: "published",
    isFeatured: true,
    displayOrder: 2,
    publishedAt: new Date("2026-09-05T10:00:00Z"),
  },
  {
    title: "Tech Innovators Meet 2026 - A Grand Success",
    slug: "tech-innovators-meet",
    category: "Events",
    summary: "A day full of insights, networking and exciting opportunities.",
    content: `The flagship annual Tech Innovators Meet 2026 brought together over 500 startup founders, engineers, and product designers. Keynotes covered AI-driven SaaS workflows, modern cloud web architectures, and high-performance product scaling.

Attendees participated in interactive workshops on next-generation web technologies, full-stack product management, and agile software development.

Highlights included hands-on coding demos, panel sessions with seasoned venture investors, and product showcases highlighting cutting-edge Indian tech ventures.`,
    coverImageUrl: "/images/news/news_conference_stage.jpg",
    coverImagePublicId: null,
    status: "published",
    isFeatured: false,
    displayOrder: 3,
    publishedAt: new Date("2026-08-28T10:00:00Z"),
  },
  {
    title: "XSPACEWEB Featured in Leading News Platform",
    slug: "press-featured",
    category: "Press Coverage",
    summary: "Our journey and vision covered by top media publications.",
    content: `Leading Indian business publications spotlighted XSPACEWEB's rapid journey from Dhanbad and Kolkata into a premier software and SaaS powerhouse, celebrating our commitment to MSME digital enablement and boundary-pushing web engineering.

The feature explored our culture of high-velocity delivery, customer-centric product craftsmanship, and continuous innovation in enterprise software.

We extend heartfelt gratitude to all our clients, community partners, and passionate team members who make this vision a reality every day.`,
    coverImageUrl: "/images/news/news_press_clip.jpg",
    coverImagePublicId: null,
    status: "published",
    isFeatured: false,
    displayOrder: 4,
    publishedAt: new Date("2026-07-15T10:00:00Z"),
  },
];

async function seed() {
  console.log("Checking and seeding news articles...");
  for (const item of seedItems) {
    const existing = await db
      .select({ id: newsArticles.id })
      .from(newsArticles)
      .where(eq(newsArticles.slug, item.slug))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(newsArticles).values(item);
      console.log(`✓ Inserted: ${item.title} (${item.slug})`);
    } else {
      console.log(`- Already exists: ${item.slug}`);
    }
  }
  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Failed to seed:", err);
  process.exit(1);
});
