import React from "react";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { eq, asc, desc, count } from "drizzle-orm";
import { CrmTestimonialsTable } from "@/components/crm/testimonials/CrmTestimonialsTable";

export const dynamic = "force-dynamic";

export default async function CrmTestimonialsPage() {
  const [clientCountRes] = await db
    .select({ value: count() })
    .from(testimonials)
    .where(eq(testimonials.testimonialType, "client"));

  const [internCountRes] = await db
    .select({ value: count() })
    .from(testimonials)
    .where(eq(testimonials.testimonialType, "intern"));

  const clientTestimonials = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.testimonialType, "client"))
    .orderBy(asc(testimonials.displayOrder), desc(testimonials.createdAt));

  return (
    <CrmTestimonialsTable
      type="client"
      initialTestimonials={clientTestimonials}
      clientCount={clientCountRes?.value ?? 0}
      internCount={internCountRes?.value ?? 0}
    />
  );
}
