import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

let serverClient: SupabaseClient | null = null;

/**
 * Server-side Supabase client using the publishable key.
 * @see https://supabase.com/docs/guides/auth/server-side/creating-a-client
 */
export function createServiceClient(): SupabaseClient {
  if (serverClient) return serverClient;

  const { url, key } = getSupabaseEnv();
  serverClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return serverClient;
}
