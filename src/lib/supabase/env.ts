/** Shared Supabase env — only these two vars per Supabase Next.js setup. */
export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const missing: string[] = [];
  if (!url) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!key) missing.push("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

  if (missing.length > 0) {
    throw new Error(
      `Missing Supabase env: ${missing.join(", ")}. Add them to .env.local — see https://supabase.com/docs/guides/getting-started/api-keys`
    );
  }

  return { url: url!, key: key! };
}
