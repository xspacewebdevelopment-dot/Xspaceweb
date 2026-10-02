import React from "react";
import { db } from "@/lib/db";
import { projectInquiries } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { CrmInquiriesTable } from "@/components/crm/CrmInquiriesTable";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Service Requests | XSPACEWEB CRM",
};

export default async function CrmServiceRequestsPage() {
  const serviceInquiries = await db
    .select()
    .from(projectInquiries)
    .where(eq(projectInquiries.inquiryType, "service"))
    .orderBy(desc(projectInquiries.createdAt));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Service Requests
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review, filter, and manage service requests submitted from website service CTAs and digital solution forms.
        </p>
      </div>

      {/* Interactive Service Requests Table */}
      <CrmInquiriesTable initialInquiries={serviceInquiries} inquiryType="service" />
    </div>
  );
}
