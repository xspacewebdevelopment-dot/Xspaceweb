import React from "react";
import { db } from "@/lib/db";
import { projectInquiries } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { CrmInquiriesTable } from "@/components/crm/CrmInquiriesTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Project Inquiries | XSPACEWEB CRM",
};

export default async function CrmInquiriesPage() {
  const inquiries = await db
    .select()
    .from(projectInquiries)
    .orderBy(desc(projectInquiries.createdAt));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Project Inquiries
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review, filter, and manage client inquiries submitted from the website.
        </p>
      </div>

      {/* Interactive Inquiries Table */}
      <CrmInquiriesTable initialInquiries={inquiries} />
    </div>
  );
}
