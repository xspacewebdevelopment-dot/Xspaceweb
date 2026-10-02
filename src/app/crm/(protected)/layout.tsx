import React from "react";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import { CrmSidebar } from "@/components/crm/CrmSidebar";

export const metadata = {
  title: "XSPACEWEB CRM",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CrmProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminSession();

  if (!session || !session.user?.email) {
    redirect("/crm/login?error=AccessDenied");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row">
      <CrmSidebar adminEmail={session.user.email} />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
