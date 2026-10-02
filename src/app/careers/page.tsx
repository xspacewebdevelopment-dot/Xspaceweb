import React from "react";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { careerOpenings } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { CareerHero } from "@/components/careers/CareerHero";
import { OpenPositionsSection } from "@/components/careers/OpenPositionsSection";
import { InternTestimonialsSection } from "@/components/careers/InternTestimonialsSection";
import { CareerCtaSection } from "@/components/careers/CareerCtaSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers & Internships | XSPACEWEB",
  description:
    "Find your opportunity at XSPACEWEB. Join our team of passionate engineers, designers, and innovators building impactful SaaS products and digital solutions.",
  openGraph: {
    title: "Careers & Internships | XSPACEWEB",
    description:
      "Find your opportunity at XSPACEWEB. Join our team of passionate engineers, designers, and innovators building impactful SaaS products and digital solutions.",
  },
};

export default async function CareersPage() {
  const publishedOpenings = await db
    .select()
    .from(careerOpenings)
    .where(eq(careerOpenings.status, "published"))
    .orderBy(desc(careerOpenings.publishedAt), desc(careerOpenings.createdAt));

  return (
    <main className="min-h-screen bg-white">
      <CareerHero />
      <OpenPositionsSection initialOpenings={publishedOpenings} />
      <InternTestimonialsSection />
      <CareerCtaSection />
    </main>
  );
}
