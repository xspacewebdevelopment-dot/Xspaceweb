import React from "react";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { CrmEventsTable } from "@/components/crm/CrmEventsTable";

export const dynamic = "force-dynamic";

export default async function CrmEventsPage() {
  const eventList = await db
    .select()
    .from(events)
    .orderBy(desc(events.createdAt));

  return <CrmEventsTable initialEvents={eventList} />;
}
