"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { loginWithGoogle } from "@/app/crm/login/actions";
import { ShieldAlert, ShieldCheck, Lock, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

export const CrmLoginForm: React.FC = () => {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const [isLoading, setIsLoading] = useState(false);

  const isAccessDenied = errorParam === "AccessDenied" || errorParam === "OAuthSignin";

  const handleAction = async (formData: FormData) => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
    } catch (err) {
      // In Next.js, redirect() throws a NEXT_REDIRECT error which should be allowed to propagate
      if ((err as Error)?.message?.includes("NEXT_REDIRECT")) {
        throw err;
      }
      console.error("Sign in error:", err);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 21st.dev Inspired Minimal Admin Login Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(7,21,43,0.08)] p-8 sm:p-10 relative overflow-hidden">
        
        {/* Subtle top accent gradient */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1668E8] via-blue-500 to-indigo-600" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          {/* Logo Badge */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#07152B] to-[#1668E8] text-white flex items-center justify-center shadow-lg shadow-blue-600/20 border border-white/20">
            <Lock className="w-7 h-7 text-white" />
          </div>

          <div>
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#1668E8] uppercase block mb-1">
              Admin Access
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152B] tracking-tight">
              XSPACEWEB CRM
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
            Authorized administrator portal. Please authenticate with your approved Google account to continue.
          </p>
        </div>

        {/* Error Alert Box (if unauthorized account attempted login) */}
        {isAccessDenied && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50/95 border border-red-200 text-red-900 text-xs sm:text-[13px] leading-relaxed flex items-start gap-3 shadow-xs animate-in fade-in duration-300">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-red-950 uppercase tracking-wider text-[11px]">
                403 &middot; Access Denied / Forbidden
              </p>
              <p className="font-bold text-red-900 text-sm">
                You are forbidden to enter XSPACEWEB CRM.
              </p>
              <p className="text-red-700 text-xs leading-normal">
                Access denied. This Google account is not authorized to access XSPACEWEB CRM. Only the designated administrator account configured in environment variables has access.
              </p>
            </div>
          </div>
        )}

        {/* Single Action: Continue with Google */}
        <form action={handleAction} className="space-y-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-300/90 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#1668E8]" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                {/* Official Google 4-Color Vector Logo */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform ml-auto" />
              </>
            )}
          </button>
        </form>

        {/* Security Notice Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-xs text-center">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Restricted to single approved admin account</span>
        </div>

      </div>
    </div>
  );
};
