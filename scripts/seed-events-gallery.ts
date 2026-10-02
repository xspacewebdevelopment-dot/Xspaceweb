import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { events, eventGalleryImages } from "../src/lib/db/schema";

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

const seedEvents = [
  {
    title: "Tech Innovators Meet 2026",
    slug: "tech-innovators-meet-2026",
    shortDescription:
      "Join us for a day of innovation, networking and new opportunities with industry experts, SaaS founders, and digital leaders.",
    fullDescription: `The flagship annual Tech Innovators Meet 2026 brings together over 500 startup founders, engineers, and product designers. Keynotes cover AI-driven SaaS workflows, modern cloud web architectures, and high-performance product scaling.

Attendees participate in interactive workshops on next-generation web technologies, full-stack product management, and agile software development.

Highlights include hands-on coding demos, panel sessions with seasoned venture investors, and product showcases highlighting cutting-edge Indian tech ventures.`,
    eventDate: new Date("2026-10-25T10:00:00Z"),
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    locationType: "offline",
    location: "Kolkata, India (Hyatt Regency Grand Ballroom)",
    registrationUrl: "https://forms.gle/xspaceweb-event",
    coverImageUrl: "/images/news/news_conference_stage.jpg",
    coverImagePublicId: null,
    isFeatured: true,
    status: "published",
    displayOrder: 1,
  },
  {
    title: "Web & SaaS Growth Workshop",
    slug: "web-saas-growth-workshop",
    shortDescription: "A hands-on session for businesses to scale digitally.",
    fullDescription:
      "Master modern SaaS growth architectures, organic client acquisition, and high-conversion web development strategies with XSPACEWEB senior engineers.",
    eventDate: new Date("2026-11-12T14:00:00Z"),
    startTime: "02:00 PM",
    endTime: "05:00 PM",
    locationType: "online",
    location: "Online Event (Google Meet)",
    registrationUrl: "https://forms.gle/xspaceweb-workshop",
    coverImageUrl: "/images/news/news_laptop_code.jpg",
    coverImagePublicId: null,
    isFeatured: false,
    status: "published",
    displayOrder: 2,
  },
  {
    title: "XSPACEWEB Product Showcase",
    slug: "xspaceweb-product-showcase",
    shortDescription: "Explore our latest products, features and roadmap.",
    fullDescription:
      "An exclusive live demo of MakeGSTBill 3.0, GoldenGST enterprise edition, and upcoming AI productivity tools from the XSPACEWEB engineering lab.",
    eventDate: new Date("2026-12-05T11:00:00Z"),
    startTime: "11:00 AM",
    endTime: "04:00 PM",
    locationType: "offline",
    location: "Kolkata, India",
    registrationUrl: "https://forms.gle/xspaceweb-showcase",
    coverImageUrl: "/images/news/news_handshake.jpg",
    coverImagePublicId: null,
    isFeatured: false,
    status: "published",
    displayOrder: 3,
  },
  {
    title: "Partner Meet 2027",
    slug: "partner-meet-2027",
    shortDescription: "An exclusive meet with our partners and collaborators.",
    fullDescription:
      "Join senior leadership, strategic ecosystem partners, and digital agency leaders in Bengaluru for collaborative growth initiatives.",
    eventDate: new Date("2027-01-18T10:00:00Z"),
    startTime: "10:00 AM",
    endTime: "03:00 PM",
    locationType: "offline",
    location: "Bengaluru, India",
    registrationUrl: "https://forms.gle/xspaceweb-partner",
    coverImageUrl: "/images/news/gallery_team_event.jpg",
    coverImagePublicId: null,
    isFeatured: false,
    status: "published",
    displayOrder: 4,
  },
];

const seedGallery = [
  {
    title: "Team Outing & Ideation Day",
    caption: "XSPACEWEB core engineering and design team at Tech Park.",
    imageUrl: "/images/news/gallery_outdoor_team.jpg",
    isFeatured: true,
    displayOrder: 1,
  },
  {
    title: "Corporate Headquarters Reception",
    caption: "Our modern technology and studio facilities in Kolkata & Dhanbad.",
    imageUrl: "/images/news/gallery_office_reception.jpg",
    isFeatured: true,
    displayOrder: 2,
  },
  {
    title: "National Tech Summit 2026",
    caption: "Product teams representing XSPACEWEB across multi-track sessions.",
    imageUrl: "/images/news/gallery_team_event.jpg",
    isFeatured: true,
    displayOrder: 3,
  },
  {
    title: "Keynote at Grand Auditorium",
    caption: "CEO delivering the keynote on the future of web architecture and SaaS.",
    imageUrl: "/images/news/news_conference_stage.jpg",
    isFeatured: true,
    displayOrder: 4,
  },
  {
    title: "Sprint Planning & UI/UX Lab",
    caption: "Cross-functional collaborative session designing next-gen SaaS interfaces.",
    imageUrl: "/images/news/gallery_meeting.jpg",
    isFeatured: true,
    displayOrder: 5,
  },
];

async function seed() {
  console.log("Seeding events...");
  const eventIds: Record<string, string> = {};

  for (const item of seedEvents) {
    const existing = await db
      .select({ id: events.id })
      .from(events)
      .where(eq(events.slug, item.slug))
      .limit(1);

    if (existing.length === 0) {
      const [inserted] = await db.insert(events).values(item).returning({ id: events.id });
      eventIds[item.slug] = inserted.id;
      console.log(`✓ Inserted event: ${item.title}`);
    } else {
      eventIds[item.slug] = existing[0].id;
      console.log(`- Event already exists: ${item.slug}`);
    }
  }

  console.log("Seeding event gallery images...");
  for (const item of seedGallery) {
    const existing = await db
      .select({ id: eventGalleryImages.id })
      .from(eventGalleryImages)
      .where(eq(eventGalleryImages.imageUrl, item.imageUrl))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(eventGalleryImages).values({
        ...item,
        eventId: eventIds["tech-innovators-meet-2026"] || null,
      });
      console.log(`✓ Inserted gallery image: ${item.title}`);
    } else {
      console.log(`- Gallery image already exists: ${item.imageUrl}`);
    }
  }

  console.log("Events and Gallery seeding complete!");
}

seed().catch(console.error);
