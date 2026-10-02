import React from "react";
import { CrmEventForm } from "@/components/crm/CrmEventForm";

export const dynamic = "force-dynamic";

export default function NewEventPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Event or Webinar
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Publish a new conference, virtual workshop, product showcase, or summit.
        </p>
      </div>

      <CrmEventForm />
    </div>
  );
}
