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
  console.log("Creating career_openings table if not exists...");
  
  await sql`
    CREATE TABLE IF NOT EXISTS "career_openings" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "title" text NOT NULL,
      "slug" text NOT NULL,
      "opening_type" text DEFAULT 'job' NOT NULL,
      "department" text NOT NULL,
      "employment_type" text DEFAULT 'full-time' NOT NULL,
      "location" text NOT NULL,
      "work_mode" text DEFAULT 'hybrid' NOT NULL,
      "short_description" text NOT NULL,
      "about_role" text NOT NULL,
      "responsibilities" jsonb DEFAULT '[]'::jsonb NOT NULL,
      "requirements" jsonb DEFAULT '[]'::jsonb NOT NULL,
      "nice_to_have" jsonb DEFAULT '[]'::jsonb NOT NULL,
      "skills" jsonb DEFAULT '[]'::jsonb NOT NULL,
      "experience" text NOT NULL,
      "salary" jsonb,
      "internship" jsonb,
      "status" text DEFAULT 'draft' NOT NULL,
      "featured" boolean DEFAULT false NOT NULL,
      "published_at" timestamp with time zone,
      "closing_date" timestamp with time zone,
      "created_by" text,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "career_openings_slug_unique" UNIQUE("slug")
    );
  `;
  console.log("Table career_openings verified/created successfully.");

  // Initial Seed Data from existing ALL_CAREERS
  const initialOpenings = [
    {
      title: "Full Stack Developer",
      slug: "full-stack-developer",
      openingType: "job",
      department: "Engineering",
      employmentType: "full-time",
      location: "Kolkata / Remote",
      workMode: "hybrid",
      shortDescription: "Build scalable web applications and SaaS products from frontend to backend.",
      aboutRole: "We are looking for a passionate Full Stack Developer to join our team and work on innovative SaaS products and digital solutions. You will be involved in designing, developing and maintaining web applications from frontend to backend, and play a key role in building scalable, high-performing products used by real businesses and users.",
      responsibilities: JSON.stringify([
        "Design, develop and maintain web applications from frontend to backend.",
        "Write clean, efficient and scalable code.",
        "Collaborate with design and product teams to implement features.",
        "Integrate third-party APIs and services.",
        "Optimize applications for performance, scalability and security.",
        "Participate in code reviews and follow best development practices.",
        "Troubleshoot, debug and resolve issues across the stack."
      ]),
      requirements: JSON.stringify([
        "2+ years of experience in full stack web development (or relevant experience).",
        "Proficiency in HTML, CSS, JavaScript and modern frontend frameworks (React preferred).",
        "Experience with backend technologies (Node.js, PHP, Python or similar).",
        "Experience with databases (MySQL, PostgreSQL, MongoDB).",
        "Understanding of REST APIs and cloud deployment (AWS / Vercel / similar).",
        "Good problem-solving skills and ability to work in a team."
      ]),
      niceToHave: JSON.stringify([
        "Experience with SaaS product development.",
        "Knowledge of DevOps, Docker or CI/CD.",
        "Familiarity with mobile app development (React Native / Flutter).",
        "Contribution to open source projects."
      ]),
      skills: JSON.stringify([
        "JavaScript", "React.js", "Next.js", "Node.js", "HTML", "CSS",
        "MySQL", "PostgreSQL", "MongoDB", "REST APIs", "Git", "Docker",
        "AWS", "Problem Solving", "Team Collaboration"
      ]),
      experience: "2+ Years",
      salary: JSON.stringify({
        min: 600000,
        max: 1200000,
        currency: "INR",
        period: "annual",
        text: "₹6,00,000 – ₹12,00,000"
      }),
      internship: null,
      status: "published",
      featured: true,
      publishedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      title: "UI/UX Designer",
      slug: "ui-ux-designer",
      openingType: "job",
      department: "Design",
      employmentType: "full-time",
      location: "Kolkata / Remote",
      workMode: "hybrid",
      shortDescription: "Design intuitive interfaces and digital experiences for our growing product ecosystem.",
      aboutRole: "We are seeking a talented UI/UX Designer to craft visually compelling, user-centric interfaces across our flagship SaaS products like MakeGSTBill, GoldenGST, and client platforms. You will bridge user empathy with high-polish design systems.",
      responsibilities: JSON.stringify([
        "Create high-fidelity wireframes, interactive prototypes, and modular design systems in Figma.",
        "Conduct user research and usability testing to refine complex user workflows.",
        "Collaborate closely with frontend engineers to ensure pixel-perfect implementation.",
        "Produce brand assets, marketing collaterals, and landing page visual experiences."
      ]),
      requirements: JSON.stringify([
        "Portfolio showcasing end-to-end web & mobile product design cases.",
        "Deep mastery of Figma, auto-layout, design tokens, and interactive prototyping.",
        "Strong understanding of typography, color harmony, layout grids, and accessibility standards.",
        "Empathetic mindset with relentless obsession for micro-interactions and polish."
      ]),
      niceToHave: JSON.stringify([
        "Familiarity with HTML/CSS and design system engineering in Tailwind CSS.",
        "Experience creating micro-animations in Lottie or Rive.",
        "Previous experience designing B2B SaaS dashboards."
      ]),
      skills: JSON.stringify([
        "Figma", "UI/UX Design", "Prototyping", "Design Systems", "User Research",
        "Wireframing", "Visual Design", "Design Tokens", "Creative Suite"
      ]),
      experience: "2+ Years",
      salary: JSON.stringify({
        min: 500000,
        max: 1000000,
        currency: "INR",
        period: "annual",
        text: "₹5,00,000 – ₹10,00,000"
      }),
      internship: null,
      status: "published",
      featured: true,
      publishedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      title: "Digital Marketing Executive",
      slug: "digital-marketing-executive",
      openingType: "job",
      department: "Marketing",
      employmentType: "full-time",
      location: "Kolkata / Remote",
      workMode: "hybrid",
      shortDescription: "Work across SEO, social media, content and performance marketing.",
      aboutRole: "Join our growth team to expand XSPACEWEB's brand presence and product user acquisition. You will run multi-channel campaigns, drive organic search dominance, and build community trust for our SaaS platforms.",
      responsibilities: JSON.stringify([
        "Manage organic SEO strategies, on-page technical optimization, and high-ranking content.",
        "Execute targeted performance ad campaigns on Google Ads and Meta.",
        "Analyze acquisition funnels, conversion rates, CAC, and LTV using Google Analytics.",
        "Manage brand social channels, community engagement, and newsletter marketing."
      ]),
      requirements: JSON.stringify([
        "1-3 years in digital marketing, growth hacking, or digital agency roles.",
        "Hands-on experience with GA4, Search Console, Ahrefs/SEMrush, and ad managers.",
        "Strong copywriting and storytelling skills for technical and business audiences.",
        "Analytical mindset driven by conversion metrics and measurable growth."
      ]),
      niceToHave: JSON.stringify([
        "Experience with B2B SaaS lead generation.",
        "Basic knowledge of email marketing automation tools.",
        "Familiarity with influencer marketing and tech PR."
      ]),
      skills: JSON.stringify([
        "SEO", "Google Ads", "Meta Ads", "Content Strategy", "Google Analytics 4",
        "Copywriting", "Social Media", "Email Marketing", "Conversion Optimization"
      ]),
      experience: "1+ Years",
      salary: JSON.stringify({
        min: 450000,
        max: 800000,
        currency: "INR",
        period: "annual",
        text: "₹4,50,000 – ₹8,00,000"
      }),
      internship: null,
      status: "published",
      featured: false,
      publishedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
    {
      title: "Business Development Executive",
      slug: "business-development-executive",
      openingType: "job",
      department: "Business",
      employmentType: "full-time",
      location: "Kolkata / Remote",
      workMode: "hybrid",
      shortDescription: "Help our products reach new customers, businesses and markets.",
      aboutRole: "We are looking for an energetic Business Development Executive to drive client outreach, conduct software demonstrations, and close partnerships for our SaaS solutions and enterprise digital engineering services.",
      responsibilities: JSON.stringify([
        "Prospect and engage prospective B2B clients, SMBs, retail chains, and enterprises.",
        "Conduct engaging software demonstrations for MakeGSTBill, GoldenGST, and custom solutions.",
        "Manage the sales pipeline from initial lead qualification to contract negotiation and closing.",
        "Collaborate with product and support teams to ensure seamless customer onboarding."
      ]),
      requirements: JSON.stringify([
        "1+ years in B2B sales, client acquisition, or enterprise software sales.",
        "Exceptional communication, presentation, and negotiation skills.",
        "Self-motivated with strong relationship-building and problem-solving abilities.",
        "Familiarity with CRM tools (HubSpot, Zoho) and sales pipeline tracking."
      ]),
      niceToHave: JSON.stringify([
        "Experience selling software or SaaS products to Indian MSMEs.",
        "Knowledge of GST billing and accounting software ecosystems."
      ]),
      skills: JSON.stringify([
        "B2B Sales", "Lead Generation", "Product Demos", "Negotiation",
        "CRM Management", "Client Relations", "Pipeline Management", "Communication"
      ]),
      experience: "1+ Years",
      salary: JSON.stringify({
        min: 400000,
        max: 850000,
        currency: "INR",
        period: "annual",
        text: "₹4,00,000 – ₹8,50,000"
      }),
      internship: null,
      status: "published",
      featured: false,
      publishedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
    {
      title: "Frontend Engineering Intern",
      slug: "frontend-engineering-intern",
      openingType: "internship",
      department: "Engineering",
      employmentType: "internship",
      location: "Kolkata / Remote",
      workMode: "hybrid",
      shortDescription: "Work on live Next.js client products, component libraries, and interactive interfaces.",
      aboutRole: "As a Frontend Intern, you will work side-by-side with senior developers on production codebases, shipping real features to thousands of active users while mastering modern TypeScript, Next.js, and Tailwind CSS.",
      responsibilities: JSON.stringify([
        "Build reusable, accessible UI components using React, Next.js, and Tailwind CSS.",
        "Integrate backend APIs and handle client-side state management.",
        "Collaborate in daily standups and receive code reviews from senior engineers.",
        "Optimize website performance and responsiveness across devices."
      ]),
      requirements: JSON.stringify([
        "Proficiency in JavaScript/TypeScript, React, HTML5, and modern CSS.",
        "Working knowledge of Git version control and GitHub.",
        "Enthusiasm to learn scalable software architecture and clean code best practices."
      ]),
      niceToHave: JSON.stringify([
        "Personal projects deployed on Vercel/Netlify.",
        "Familiarity with Next.js App Router and server components."
      ]),
      skills: JSON.stringify([
        "TypeScript", "React.js", "Next.js", "Tailwind CSS",
        "HTML5", "CSS3", "Git", "REST APIs"
      ]),
      experience: "Fresher / Student",
      salary: null,
      internship: JSON.stringify({
        duration: "6 Months",
        stipend: "₹15,000 – ₹25,000 / month"
      }),
      status: "published",
      featured: true,
      publishedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    {
      title: "UI/UX Design Intern",
      slug: "ui-ux-design-intern",
      openingType: "internship",
      department: "Design",
      employmentType: "internship",
      location: "Kolkata / Remote",
      workMode: "hybrid",
      shortDescription: "Assist in creating wireframes, mobile prototypes, and design system components.",
      aboutRole: "Learn and create real-world design systems, interactive prototypes, and marketing assets for live tech products under the mentorship of senior product designers.",
      responsibilities: JSON.stringify([
        "Assist in user research, wireframing, and Figma design system components.",
        "Create high-fidelity mobile and web mockups for upcoming features.",
        "Design marketing graphics, social media banners, and pitch decks."
      ]),
      requirements: JSON.stringify([
        "Figma design portfolio demonstrating UI sensibility and clean layout principles.",
        "Strong understanding of typography, contrast, and mobile-first design."
      ]),
      niceToHave: JSON.stringify([
        "Experience with Adobe Illustrator / Photoshop.",
        "Basic understanding of web technologies."
      ]),
      skills: JSON.stringify([
        "Figma", "UI Design", "UX Research", "Wireframing", "Prototyping", "Visual Design"
      ]),
      experience: "Fresher / Student",
      salary: null,
      internship: JSON.stringify({
        duration: "6 Months",
        stipend: "₹15,000 – ₹22,000 / month"
      }),
      status: "published",
      featured: false,
      publishedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      title: "Growth & Marketing Intern",
      slug: "growth-marketing-intern",
      openingType: "internship",
      department: "Marketing",
      employmentType: "internship",
      location: "Kolkata / Remote",
      workMode: "hybrid",
      shortDescription: "Support SEO research, content creation, social media campaigns, and user community growth.",
      aboutRole: "Gain hands-on experience in tech marketing, SEO, performance campaigns, and content growth strategies for SaaS products.",
      responsibilities: JSON.stringify([
        "Write engaging tech blog articles, tutorials, and case studies.",
        "Assist with keyword research and competitor SEO audits.",
        "Manage social media posts and community interactions."
      ]),
      requirements: JSON.stringify([
        "Excellent written English communication and content creation skills.",
        "Passion for technology, SaaS businesses, and digital marketing trends."
      ]),
      niceToHave: JSON.stringify([
        "Familiarity with Canva or basic graphic design."
      ]),
      skills: JSON.stringify([
        "Content Writing", "SEO", "Social Media", "Keyword Research", "Blogging"
      ]),
      experience: "Fresher / Student",
      salary: null,
      internship: JSON.stringify({
        duration: "6 Months",
        stipend: "₹12,000 – ₹20,000 / month"
      }),
      status: "published",
      featured: false,
      publishedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
    {
      title: "SaaS Product Operations Intern",
      slug: "saas-product-operations-intern",
      openingType: "internship",
      department: "Product",
      employmentType: "internship",
      location: "Kolkata / Remote",
      workMode: "hybrid",
      shortDescription: "Help test new product releases, write customer documentation, and assist user onboarding.",
      aboutRole: "Work closely with our product managers and QA leads to ensure exceptional software reliability, write user documentation, and gather user feedback.",
      responsibilities: JSON.stringify([
        "Perform quality assurance testing on new feature releases.",
        "Write help center guides, FAQs, and product changelogs.",
        "Assist users with onboarding and product workflow guidance."
      ]),
      requirements: JSON.stringify([
        "Strong attention to detail, problem-solving ability, and clear writing.",
        "Curiosity about software products and user experience."
      ]),
      niceToHave: JSON.stringify([
        "Basic understanding of web technologies and databases."
      ]),
      skills: JSON.stringify([
        "QA Testing", "Documentation", "User Support", "Problem Solving", "Product Ops"
      ]),
      experience: "Fresher / Student",
      salary: null,
      internship: JSON.stringify({
        duration: "6 Months",
        stipend: "₹12,000 – ₹20,000 / month"
      }),
      status: "published",
      featured: false,
      publishedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
  ];

  console.log(`Checking existing records in database...`);
  for (const item of initialOpenings) {
    const existing = await sql`
      SELECT id, title, slug FROM "career_openings" WHERE "slug" = ${item.slug} LIMIT 1;
    `;

    if (existing.length === 0) {
      await sql`
        INSERT INTO "career_openings" (
          "title", "slug", "opening_type", "department", "employment_type",
          "location", "work_mode", "short_description", "about_role",
          "responsibilities", "requirements", "nice_to_have", "skills",
          "experience", "salary", "internship", "status", "featured",
          "published_at"
        ) VALUES (
          ${item.title}, ${item.slug}, ${item.openingType}, ${item.department}, ${item.employmentType},
          ${item.location}, ${item.workMode}, ${item.shortDescription}, ${item.aboutRole},
          ${item.responsibilities}::jsonb, ${item.requirements}::jsonb, ${item.niceToHave}::jsonb, ${item.skills}::jsonb,
          ${item.experience}, ${item.salary}::jsonb, ${item.internship}::jsonb, ${item.status}, ${item.featured},
          ${item.publishedAt}::timestamp with time zone
        );
      `;
      console.log(`+ Inserted: ${item.title} (${item.slug})`);
    } else {
      console.log(`= Exists: ${item.title} (${item.slug})`);
    }
  }

  console.log("Migration and Seed completed successfully!");
}

main().catch((err) => {
  console.error("Migration/seed error:", err);
  process.exit(1);
});
