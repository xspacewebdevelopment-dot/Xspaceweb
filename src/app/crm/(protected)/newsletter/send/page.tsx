import React, { Suspense } from "react";
import { Metadata } from "next";
import { CrmNewsletterComposer } from "@/components/crm/CrmNewsletterComposer";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Send Newsletter Broadcast | CRM | XSPACEWEB",
};

export default function SendNewsletterPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin text-[#1668E8]" />
          <span className="text-xs">Loading newsletter composer...</span>
        </div>
      }
    >
      <CrmNewsletterComposer />
    </Suspense>
  );
}
