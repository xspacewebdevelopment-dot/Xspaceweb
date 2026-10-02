import React from "react";
import { Metadata } from "next";
import { CrmSubscribersTable } from "@/components/crm/CrmSubscribersTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Newsletter Subscribers | CRM | XSPACEWEB",
};

export default function CrmNewsletterSubscribersPage() {
  return <CrmSubscribersTable />;
}
