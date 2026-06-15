import { createBrowserClient } from "@supabase/ssr";
import { supabaseEnv } from "@/lib/config";

// Cliente de Supabase para Client Components (corre en el navegador).
export function createClient() {
  return createBrowserClient(supabaseEnv.url, supabaseEnv.anonKey);
}
