import React from "react";
import { Metadata } from "next";
import { CrmMediaTable } from "@/components/crm/CrmMediaTable";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Media Mentions | CRM | XSPACEWEB",
};

export default function CrmMediaPage() {
  return <CrmMediaTable />;
}
