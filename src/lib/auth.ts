import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "@/lib/auth.config";
import { createServiceClient } from "@/lib/supabase/server";
import type { User } from "@/types/database";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        const supabase = createServiceClient();
        const { data: user, error } = await supabase
          .from("User")
          .select("*")
          .eq("email", email)
          .maybeSingle();

        if (error || !user) return null;

        const record = user as User;
        const valid = await bcrypt.compare(password, record.passwordHash);
        if (!valid) return null;

        return {
          id: record.id,
          email: record.email,
          name: record.name,
          role: record.role,
          emailVerified: record.emailVerified
            ? new Date(record.emailVerified)
            : null,
        };
      },
    }),
  ],
  trustHost: true,
});
