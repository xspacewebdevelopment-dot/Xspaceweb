import { db } from "../src/lib/db";
import { mediaMentions } from "../src/lib/db/schema";
import { eq } from "drizzle-orm";

async function seedMediaMentions() {
  console.log("Seeding media mentions...");

  const existing = await db.select().from(mediaMentions);
  if (existing.length > 0) {
    console.log(`Media mentions already seeded (${existing.length} records). Skipping.`);
    return;
  }

  const initialMentions = [
    {
      publicationName: "Business Standard",
      headline: "XSPACEWEB's SaaS Solutions Gain Momentum in Indian Market",
      articleUrl: "https://www.business-standard.com",
      logoUrl: "",
      publishedAt: new Date("2026-08-12T00:00:00Z"),
      status: "published" as const,
      displayOrder: 1,
    },
    {
      publicationName: "The Economic Times",
      headline: "XSPACEWEB Focuses on Digital Transformation for MSMEs",
      articleUrl: "https://economictimes.indiatimes.com",
      logoUrl: "",
      publishedAt: new Date("2026-07-28T00:00:00Z"),
      status: "published" as const,
      displayOrder: 2,
    },
    {
      publicationName: "YourStory",
      headline: "XSPACEWEB: Building Digital Experiences Beyond Boundaries",
      articleUrl: "https://yourstory.com",
      logoUrl: "",
      publishedAt: new Date("2026-06-15T00:00:00Z"),
      status: "published" as const,
      displayOrder: 3,
    },
    {
      publicationName: "Dailyhunt",
      headline: "XSPACEWEB Featured for Innovation in Digital Solutions",
      articleUrl: "https://dailyhunt.in",
      logoUrl: "",
      publishedAt: new Date("2026-07-10T00:00:00Z"),
      status: "published" as const,
      displayOrder: 4,
    },
  ];

  for (const mention of initialMentions) {
    await db.insert(mediaMentions).values(mention);
    console.log(`Inserted mention: ${mention.publicationName} - ${mention.headline}`);
  }

  console.log("Media mentions seeded successfully!");
}

seedMediaMentions()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error seeding media mentions:", err);
    process.exit(1);
  });
