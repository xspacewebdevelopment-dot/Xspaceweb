import React from "react";
import { Metadata } from "next";
import { CrmMediaForm } from "@/components/crm/CrmMediaForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Add Media Mention | CRM | XSPACEWEB",
};

export default function NewMediaMentionPage() {
  return <CrmMediaForm />;
}
