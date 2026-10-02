import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/crm/login",
    error: "/crm/login",
  },
  callbacks: {
    async signIn({ user }) {
      const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      const userEmail = user.email?.trim().toLowerCase();

      if (!adminEmail || !userEmail) {
        return false;
      }

      // Strictly allow only the configured single admin email
      return userEmail === adminEmail;
    },
    async session({ session, token }) {
      if (session.user && token?.email) {
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        token.email = user.email;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});

/**
 * Server-side helper to ensure the caller has an active, authorized admin session.
 * Used across /crm pages and /api/admin/* endpoints.
 */
export async function verifyAdminSession() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const userEmail = session?.user?.email?.trim().toLowerCase();

  if (!session || !userEmail || !adminEmail || userEmail !== adminEmail) {
    return null;
  }

  return session;
}
