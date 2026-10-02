import React from "react";
import { CrmNewsForm } from "@/components/crm/CrmNewsForm";

export const dynamic = "force-dynamic";

export default function NewNewsArticlePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create News Article
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Publish a new announcement, product update, or event highlight.
        </p>
      </div>

      <CrmNewsForm />
    </div>
  );
}
