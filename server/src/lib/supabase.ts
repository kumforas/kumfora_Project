import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config } from "../config";

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = config.supabase.url;
  const key = config.supabase.serviceRoleKey;

  if (!url || !key || url.startsWith("your-")) {
    throw new Error(
      "Supabase env vars not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env"
    );
  }

  client = createClient(url, key);
  return client;
}
