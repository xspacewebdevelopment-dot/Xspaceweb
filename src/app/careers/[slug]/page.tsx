import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { careerOpenings, CareerOpening } from "@/lib/db/schema";
import { eq, and, desc, or } from "drizzle-orm";
import { CareerDetailClient } from "./CareerDetailClient";

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
      title: "Opening Not Found | XSPACEWEB Careers",
      description: "The requested career opening could not be found.",
    };
  }

  return {
    title: `${opening.title} | XSPACEWEB Careers`,
    description: opening.shortDescription,
    openGraph: {
      title: `${opening.title} | XSPACEWEB Careers`,
      description: opening.shortDescription,
    },
  };
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const slugCondition = isUuid(slug)
    ? or(eq(careerOpenings.slug, slug), eq(careerOpenings.id, slug))
    : eq(careerOpenings.slug, slug);

  // 1. Fetch current opening
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

  // 2. Fetch all published openings for sibling navigation and sidebar
  const allPublished = await db
    .select()
    .from(careerOpenings)
    .where(eq(careerOpenings.status, "published"))
    .orderBy(desc(careerOpenings.publishedAt), desc(careerOpenings.createdAt));

  const currentIndex = allPublished.findIndex((j) => j.id === opening.id);
  const prevOpening =
    currentIndex > 0
      ? allPublished[currentIndex - 1]
      : allPublished[allPublished.length - 1];
  const nextOpening =
    currentIndex < allPublished.length - 1
      ? allPublished[currentIndex + 1]
      : allPublished[0];

  return (
    <CareerDetailClient
      opening={opening}
      allOpenings={allPublished}
      prevOpening={prevOpening}
      nextOpening={nextOpening}
    />
  );
}
