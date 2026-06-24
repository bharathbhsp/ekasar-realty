import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";

/** Browser Supabase client using the publishable key. */
export function createBrowserClient() {
  const { url, key } = getSupabaseEnv();
  return createSupabaseBrowserClient(url, key);
}
