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
  console.log("Creating testimonials table if not exists...");

  await sql`
    CREATE TABLE IF NOT EXISTS "testimonials" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "testimonial_type" text DEFAULT 'client' NOT NULL,
      "name" text NOT NULL,
      "designation" text,
      "company" text,
      "location" text,
      "rating" integer DEFAULT 5,
      "headline" text,
      "testimonial_text" text NOT NULL,
      "profile_image_url" text,
      "profile_image_public_id" text,
      "card_variant" text DEFAULT 'standard',
      "is_featured" boolean DEFAULT false NOT NULL,
      "display_order" integer DEFAULT 0 NOT NULL,
      "status" text DEFAULT 'published' NOT NULL,
      "archived_at" timestamp with time zone,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `;

  console.log("Creating indexes for testimonials...");

  await sql`
    CREATE INDEX IF NOT EXISTS "testimonials_type_idx" ON "testimonials" ("testimonial_type");
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS "testimonials_status_idx" ON "testimonials" ("status");
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS "testimonials_display_order_idx" ON "testimonials" ("display_order");
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS "testimonials_created_at_idx" ON "testimonials" ("created_at");
  `;

  console.log("Checking existing testimonials count...");
  const existingRows = await sql`SELECT count(*)::int as count FROM "testimonials"`;
  const count = existingRows[0]?.count ?? 0;
  console.log(`Current testimonials count in DB: ${count}`);

  if (count === 0) {
    console.log("Seeding initial Client Reviews and Intern Testimonials...");

    // 1. Client Reviews
    const clientReviews = [
      {
        name: "Jayant Kumar",
        designation: "Business Owner, MakeGSTBill Customer",
        company: "MakeGSTBill",
        location: "India",
        rating: 5,
        testimonial_text:
          "MakeGSTBill has made our day-to-day billing much easier. Creating GST invoices is simple, and managing our billing from one place saves us a lot of time. It’s been really useful for our business.",
        profile_image_url: "/images/clientImages/jayant_kumar.jpeg",
        display_order: 1,
        is_featured: true,
      },
      {
        name: "Sachin",
        designation: "Business Owner, GoldenGST Customer",
        company: "GoldenGST",
        location: "India",
        rating: 5,
        testimonial_text:
          "GoldenGST has made our billing and GST work much more organised. The software is easy to use, and having everything in one place makes our daily work much easier. Overall, it has been a really good experience.",
        profile_image_url: "/images/clientImages/sachin.jpeg",
        display_order: 2,
        is_featured: true,
      },
      {
        name: "Ritik Saw",
        designation: "Business Owner, GoldenGST Customer",
        company: "GoldenGST",
        location: "India",
        rating: 5,
        testimonial_text:
          "We started using GoldenGST to make our billing process easier, and it has worked really well for us. The interface is simple, the billing process is quick, and it saves us a lot of unnecessary paperwork and effort.",
        profile_image_url: "/images/clientImages/Ritik.jpeg",
        display_order: 3,
        is_featured: true,
      },
      {
        name: "Abhishek Chandra",
        designation: "MakeGSTBill Customer",
        company: "MakeGSTBill",
        location: "India",
        rating: 5,
        testimonial_text:
          "MakeGSTBill has made our regular billing work much easier. Creating GST invoices is quick and straightforward, and I don’t have to spend much time managing everything manually. It’s a simple and useful solution for day-to-day business billing.",
        profile_image_url: "/images/clientImages/Abhishek_chandra.jpeg",
        display_order: 4,
        is_featured: true,
      },
      {
        name: "Anil Sharma",
        designation: "Founder & CEO",
        company: "PixelTech Technologies",
        location: "Ranchi, Jharkhand",
        rating: 5,
        testimonial_text:
          "XSPACEWEB built our website and mobile app with great professionalism. The team understood our requirements perfectly and delivered a smooth, user-friendly experience. Their digital marketing support has also helped us reach more customers and grow faster.",
        profile_image_url:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
        display_order: 5,
        is_featured: true,
      },
      {
        name: "Priya Nair",
        designation: "Marketing Manager",
        company: "WebSky Solutions",
        location: "Bengaluru, Karnataka",
        rating: 5,
        testimonial_text:
          "We partnered with XSPACEWEB for our website development and SEO services. The communication was clear, execution was on time, and the results have been impressive. Our organic traffic has grown significantly in just 3 months!",
        profile_image_url:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
        display_order: 2,
        is_featured: false,
      },
      {
        name: "Rohit Verma",
        designation: "Director",
        company: "NextGen Solutions",
        location: "Noida, Uttar Pradesh",
        rating: 5,
        testimonial_text:
          "The XSPACEWEB team developed our custom mobile app and also handled the UI/UX design. The app is functional, clean and exactly what we envisioned. Their creative team also delivered excellent graphic designs for our brand.",
        profile_image_url:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
        display_order: 3,
        is_featured: false,
      },
      {
        name: "Neha Kapoor",
        designation: "Business Head",
        company: "BrightPath Media",
        location: "Mumbai, Maharashtra",
        rating: 5,
        testimonial_text:
          "Their digital marketing and content strategy brought real visibility to our brand. We saw a noticeable increase in engagement and leads within a few weeks. Highly recommend them for anyone looking for reliable digital solutions.",
        profile_image_url:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
        display_order: 4,
        is_featured: false,
      },
      {
        name: "Vikram Desai",
        designation: "Co-Founder",
        company: "InnoTech Labs",
        location: "Pune, Maharashtra",
        rating: 5,
        testimonial_text:
          "XSPACEWEB delivered an outstanding SaaS product for our startup. Their technical expertise and dedication to quality are truly commendable. The platform runs flawlessly and our users love the interface.",
        profile_image_url:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
        display_order: 5,
        is_featured: false,
      },
      {
        name: "Sanya Gupta",
        designation: "Product Manager",
        company: "CloudNine Digital",
        location: "Hyderabad, Telangana",
        rating: 5,
        testimonial_text:
          "From concept to deployment, the XSPACEWEB team delivered a polished product that exceeded our expectations. Their attention to detail in both design and functionality is remarkable. A truly professional team.",
        profile_image_url:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
        display_order: 6,
        is_featured: false,
      },
      {
        name: "Arjun Patel",
        designation: "CTO",
        company: "DataFlow Systems",
        location: "Ahmedabad, Gujarat",
        rating: 5,
        testimonial_text:
          "The backend architecture XSPACEWEB built for us handles thousands of concurrent users without breaking a sweat. Scalable, secure, and brilliantly engineered. Their DevOps support has been invaluable.",
        profile_image_url:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
        display_order: 7,
        is_featured: false,
      },
      {
        name: "Meera Joshi",
        designation: "Creative Director",
        company: "DesignSpark Studio",
        location: "Jaipur, Rajasthan",
        rating: 5,
        testimonial_text:
          "As a design-focused agency ourselves, we have high standards. XSPACEWEB impressed us with their pixel-perfect UI implementation and smooth animations. They truly understand modern web aesthetics.",
        profile_image_url:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
        display_order: 8,
        is_featured: false,
      },
    ];

    for (const c of clientReviews) {
      await sql`
        INSERT INTO "testimonials" (
          "testimonial_type",
          "name",
          "designation",
          "company",
          "location",
          "rating",
          "testimonial_text",
          "profile_image_url",
          "card_variant",
          "is_featured",
          "display_order",
          "status"
        ) VALUES (
          'client',
          ${c.name},
          ${c.designation},
          ${c.company},
          ${c.location},
          ${c.rating},
          ${c.testimonial_text},
          ${c.profile_image_url},
          'standard',
          ${c.is_featured},
          ${c.display_order},
          'published'
        )
      `;
    }
    console.log(`Seeded ${clientReviews.length} client reviews.`);

    // 2. Intern Testimonials
    const internReviews = [
      {
        name: "Aman Verma",
        designation: "Frontend Development Intern",
        headline: null,
        rating: 5,
        testimonial_text:
          "XSPACEWEB gave me a great learning experience. The team is very supportive and always encourages new ideas.",
        profile_image_url: "/images/news/gallery_outdoor_team.jpg",
        card_variant: "standard",
        is_featured: false,
        display_order: 1,
      },
      {
        name: "Victoria Wilson",
        designation: "Product Design Intern",
        headline: null,
        rating: 5,
        testimonial_text:
          "I got massive exposure at XSPACEWEB working on real projects. I learned modern tools, improved my technical skills and gained confidence. The mentors are very helpful and the work culture is amazing.",
        profile_image_url: "/images/news/news_hero_centered.jpg",
        card_variant: "standard",
        is_featured: false,
        display_order: 2,
      },
      {
        name: "Nishi Karmakar",
        designation: "Marketing Intern",
        headline: "I really appreciate!",
        rating: 5,
        testimonial_text:
          "XSPACEWEB has an amazing team and a great learning environment. I learned a lot during my internship.",
        profile_image_url: "/images/careers/intern_hero_portrait.jpg",
        card_variant: "centered",
        is_featured: false,
        display_order: 3,
      },
      {
        name: "Team Appreciation",
        designation: "Internship Cohort",
        headline: "I was very impressed!",
        rating: 5,
        testimonial_text:
          "The team is talented, the work environment is positive, and there are always opportunities to learn. XSPACEWEB is the perfect place for students who want real industry exposure.",
        profile_image_url: "/images/careers/intern_hero_portrait.jpg",
        card_variant: "compact",
        is_featured: false,
        display_order: 4,
      },
      {
        name: "Sarah Khan",
        designation: "Software Engineer Intern",
        headline: null,
        rating: 5,
        testimonial_text:
          "Much more than just an intern. A place to learn, grow and be yourself.",
        profile_image_url: "/images/careers/intern_hero_portrait.jpg",
        card_variant: "portrait",
        is_featured: true,
        display_order: 5,
      },
      {
        name: "Riya Sharma",
        designation: "Frontend Intern",
        headline: "Good Job!",
        rating: 5,
        testimonial_text:
          "Supportive team and excellent guidance. Helped me improve my skills and gain real industry experience.",
        profile_image_url: "/images/careers/intern_hero_portrait.jpg",
        card_variant: "centered",
        is_featured: false,
        display_order: 6,
      },
      {
        name: "Ravi Mishra",
        designation: "Co-Founder Intern",
        headline: null,
        rating: 5,
        testimonial_text:
          "The internship at XSPACEWEB helped me explore new technologies and work on real client projects. The team is supportive and always open to feedback. It was a great learning journey.",
        profile_image_url: "/images/news/gallery_outdoor_team.jpg",
        card_variant: "standard",
        is_featured: false,
        display_order: 7,
      },
    ];

    for (const intern of internReviews) {
      await sql`
        INSERT INTO "testimonials" (
          "testimonial_type",
          "name",
          "designation",
          "headline",
          "rating",
          "testimonial_text",
          "profile_image_url",
          "card_variant",
          "is_featured",
          "display_order",
          "status"
        ) VALUES (
          'intern',
          ${intern.name},
          ${intern.designation},
          ${intern.headline},
          ${intern.rating},
          ${intern.testimonial_text},
          ${intern.profile_image_url},
          ${intern.card_variant},
          ${intern.is_featured},
          ${intern.display_order},
          'published'
        )
      `;
    }
    console.log(`Seeded ${internReviews.length} intern testimonials.`);
  }

  console.log("Migration and seeding complete!");
}

main().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
