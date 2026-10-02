import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { careerOpenings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { CareerOpeningForm } from "@/components/crm/careers/CareerOpeningForm";

export const dynamic = "force-dynamic";

interface EditOpeningPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Edit Career Opening | XSPACEWEB CRM",
};

export default async function EditCareerOpeningPage({ params }: EditOpeningPageProps) {
  const { id } = await params;

  const [opening] = await db
    .select()
    .from(careerOpenings)
    .where(eq(careerOpenings.id, id))
    .limit(1);

  if (!opening) {
    notFound();
  }

  return <CareerOpeningForm initialData={opening} isEdit={true} />;
}
