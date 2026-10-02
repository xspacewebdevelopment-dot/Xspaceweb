import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { CrmEventForm } from "@/components/crm/CrmEventForm";

export const dynamic = "force-dynamic";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;

  const [event] = await db
    .select()
    .from(events)
    .where(eq(events.id, id))
    .limit(1);

  if (!event) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Edit Event
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Update event details, timing, registration URL, or publishing status.
        </p>
      </div>

      <CrmEventForm initialEvent={event} />
    </div>
  );
}
