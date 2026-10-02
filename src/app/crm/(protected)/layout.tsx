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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col lg:flex-row">
      {/* Left Sidebar */}
      <CrmSidebar adminEmail={session.user.email} />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
