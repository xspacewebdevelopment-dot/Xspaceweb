import React from "react";
import { CareerOpeningForm } from "@/components/crm/careers/CareerOpeningForm";

export const metadata = {
  title: "Create Career Opening | XSPACEWEB CRM",
};

export default function CreateCareerOpeningPage() {
  return <CareerOpeningForm isEdit={false} />;
}
