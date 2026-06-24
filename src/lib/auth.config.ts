import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/auth/sign-in",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as import("@/types").Role;
        session.user.emailVerified = token.emailVerified as Date | null;
      }
      return session;
    },
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;

      if (pathname.startsWith("/account")) {
        return isLoggedIn;
      }

      if (pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false;
        const role = auth?.user?.role;
        return role === "EDITOR" || role === "ADMIN";
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
