import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isCrmRoute = nextUrl.pathname.startsWith("/crm");
  const isCrmLogin = nextUrl.pathname === "/crm/login";
  const isAdminApi = nextUrl.pathname.startsWith("/api/admin");

  // Allow public website completely unrestricted
  if (!isCrmRoute && !isAdminApi) {
    return NextResponse.next();
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const userEmail = req.auth?.user?.email?.trim().toLowerCase();
  const isAuthorizedAdmin = !!(req.auth && userEmail && adminEmail && userEmail === adminEmail);

  // If visiting /crm/login while already authenticated as authorized admin, go to /crm
  if (isCrmLogin) {
    if (isAuthorizedAdmin) {
      return NextResponse.redirect(new URL("/crm", nextUrl));
    }
    return NextResponse.next();
  }

  // Protect /crm/* and /api/admin/*
  if (!isAuthorizedAdmin) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Forbidden: Not an authorized admin" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/crm/login?error=AccessDenied", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/crm/:path*", "/api/admin/:path*"],
};
