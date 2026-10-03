import React from "react";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { careerOpenings, testimonials } from "@/lib/db/schema";
import { eq, desc, asc, and, isNull } from "drizzle-orm";
import { CareerHero } from "@/components/careers/CareerHero";
import { OpenPositionsSection } from "@/components/careers/OpenPositionsSection";
import { CareerCertificationsBanner } from "@/components/careers/CareerCertificationsBanner";
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

  let internTestimonials: any[] = [];
  try {
    internTestimonials = await db
      .select()
      .from(testimonials)
      .where(
        and(
          eq(testimonials.testimonialType, "intern"),
          eq(testimonials.status, "published"),
          isNull(testimonials.archivedAt)
        )
      )
      .orderBy(desc(testimonials.isFeatured), asc(testimonials.displayOrder), desc(testimonials.createdAt));
  } catch (err) {
    console.error("Failed to fetch intern testimonials from DB:", err);
  }

  return (
    <main className="min-h-screen bg-white">
      <CareerHero />
      <OpenPositionsSection initialOpenings={publishedOpenings} />
      <CareerCertificationsBanner />
      <InternTestimonialsSection initialTestimonials={internTestimonials} />
      <CareerCtaSection />
    </main>
  );
}
