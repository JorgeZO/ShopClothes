// Configuración central de la tienda. Lee variables de entorno con valores por defecto.

export const STORE_NAME =
  process.env.NEXT_PUBLIC_STORE_NAME?.trim() || "Mi Tienda";

// Solo dígitos, con código de país. Ej: 5215512345678
export const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""
).replace(/\D/g, "");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

// La app funciona en "modo demo" (datos de ejemplo) si Supabase no está configurado.
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabaseEnv = {
  url: SUPABASE_URL ?? "",
  anonKey: SUPABASE_ANON_KEY ?? "",
};

export const PRODUCT_BUCKET = "product-images";
