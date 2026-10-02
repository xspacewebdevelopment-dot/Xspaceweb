import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { careerOpenings } from "@/lib/db/schema";
import { eq, and, or } from "drizzle-orm";
import { CareerApplyClient } from "./CareerApplyClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const isUuid = (val: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const slugCondition = isUuid(slug)
    ? or(eq(careerOpenings.slug, slug), eq(careerOpenings.id, slug))
    : eq(careerOpenings.slug, slug);

  const [opening] = await db
    .select({
      title: careerOpenings.title,
      shortDescription: careerOpenings.shortDescription,
    })
    .from(careerOpenings)
    .where(
      and(
        slugCondition,
        eq(careerOpenings.status, "published")
      )
    )
    .limit(1);

  if (!opening) {
    return {
      title: "Apply | XSPACEWEB Careers",
    };
  }

  return {
    title: `Apply for ${opening.title} | XSPACEWEB Careers`,
    description: opening.shortDescription,
  };
}

export default async function CareerApplyPage({ params }: PageProps) {
  const { slug } = await params;

  const slugCondition = isUuid(slug)
    ? or(eq(careerOpenings.slug, slug), eq(careerOpenings.id, slug))
    : eq(careerOpenings.slug, slug);

  const [opening] = await db
    .select()
    .from(careerOpenings)
    .where(
      and(
        slugCondition,
        eq(careerOpenings.status, "published")
      )
    )
    .limit(1);

  if (!opening) {
    notFound();
  }

  return <CareerApplyClient opening={opening} />;
}
