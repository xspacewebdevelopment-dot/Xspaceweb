import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth";
import { CrmLoginForm } from "@/components/crm/CrmLoginForm";

export const metadata = {
  title: "Admin Login | XSPACEWEB CRM",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CrmLoginPage() {
  const session = await verifyAdminSession();

  // If already logged in as approved admin, redirect to CRM dashboard
  if (session) {
    redirect("/crm");
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-[#07152B] to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[250px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Login Card Container */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <Suspense
          fallback={
            <div className="w-full max-w-md p-10 bg-white/10 rounded-3xl animate-pulse text-white text-center">
              Loading admin portal...
            </div>
          }
        >
          <CrmLoginForm />
        </Suspense>
      </div>
    </main>
  );
}
