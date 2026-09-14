import { createClient } from "@supabase/supabase-js";

const env = import.meta.env as Record<string, string | undefined>;
const supabaseUrl = env["VITE_SUPABASE_URL"];
const supabaseKey = env["VITE_SUPABASE_PUBLISHABLE_KEY"];

if (!supabaseUrl || !supabaseKey) {
  // Fail soft: the site still works (WhatsApp ordering) without the database.
  console.warn(
    "[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY — order saving is disabled.",
  );
}

/**
 * Public (publishable-key) Supabase client.
 *
 * Uses the anon/publishable key, so Row Level Security policies on the
 * Supabase side decide what this client may read/write. Make sure the
 * `customers`, `customer_addresses`, `orders`, `order_items` and
 * `whatsapp_leads` tables have INSERT policies for `anon` before going live.
 */
export const supabase = createClient(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseKey ?? "placeholder-key",
  // Sessions are persisted so the private admin panel can keep admins logged
  // in. The customer flow is anonymous and unaffected.
  { auth: { persistSession: true, autoRefreshToken: true } },
);

/** True when real Supabase credentials are configured. */
export const supabaseConfigured = Boolean(supabaseUrl && supabaseKey);
