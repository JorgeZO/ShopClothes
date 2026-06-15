"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/config";
import { priceToCents, slugify } from "@/lib/format";
import type { ProductInput } from "@/lib/types";

export type ActionResult = { ok: boolean; error?: string };

function parseForm(formData: FormData): ProductInput {
  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price_cents = priceToCents(String(formData.get("price") || "0"));
  const category = String(formData.get("category") || "General").trim() || "General";
  const sizes = String(formData.get("sizes") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const stock = parseInt(String(formData.get("stock") || "0"), 10) || 0;
  const is_active = formData.get("is_active") === "on";

  // image_urls llega como JSON string desde el formulario (ya subidas al cliente).
  let image_urls: string[] = [];
  try {
    image_urls = JSON.parse(String(formData.get("image_urls") || "[]"));
  } catch {
    image_urls = [];
  }

  return { name, description, price_cents, category, sizes, image_urls, stock, is_active };
}

async function uniqueSlug(
  supabase: ReturnType<typeof createClient>,
  base: string,
  excludeId?: string
): Promise<string> {
  let slug = base || "producto";
  let n = 1;
  // Busca colisiones y agrega sufijo numérico.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data } = await supabase
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!data || data.id === excludeId) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

// Confirma que hay una sesión válida antes de escribir. Devuelve un error claro
// en vez de fallar en silencio (que es lo que pasa cuando RLS bloquea por falta
// de sesión: la operación "tiene éxito" pero no afecta ninguna fila).
async function requireUser(supabase: ReturnType<typeof createClient>) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

const NO_SESSION =
  "Tu sesión expiró. Cierra sesión y vuelve a entrar al panel para continuar.";

export async function createProduct(formData: FormData): Promise<ActionResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: "Supabase no está configurado. Revisa el README." };
  }
  const input = parseForm(formData);
  if (!input.name) return { ok: false, error: "El nombre es obligatorio." };

  const supabase = createClient();
  if (!(await requireUser(supabase))) return { ok: false, error: NO_SESSION };

  const slug = await uniqueSlug(supabase, slugify(input.name));

  const { data, error } = await supabase
    .from("products")
    .insert({ ...input, slug })
    .select("id");
  if (error) return { ok: false, error: error.message };
  if (!data || data.length === 0)
    return { ok: false, error: "No se pudo crear el producto (permisos/RLS)." };

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProduct(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: "Supabase no está configurado. Revisa el README." };
  }
  const input = parseForm(formData);
  if (!input.name) return { ok: false, error: "El nombre es obligatorio." };

  const supabase = createClient();
  if (!(await requireUser(supabase))) return { ok: false, error: NO_SESSION };

  const slug = await uniqueSlug(supabase, slugify(input.name), id);

  const { data, error } = await supabase
    .from("products")
    .update({ ...input, slug })
    .eq("id", id)
    .select("id");
  if (error) return { ok: false, error: error.message };
  if (!data || data.length === 0)
    return { ok: false, error: "No se pudo guardar (permisos/RLS)." };

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: "Supabase no está configurado." };
  }
  const supabase = createClient();
  if (!(await requireUser(supabase))) return { ok: false, error: NO_SESSION };

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) return { ok: false, error: error.message };
  if (!data || data.length === 0)
    return {
      ok: false,
      error: "No se borró ninguna fila. Revisa que tengas sesión activa.",
    };

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}

export async function toggleActive(
  id: string,
  next: boolean
): Promise<ActionResult> {
  if (!isSupabaseConfigured) {
    return { ok: false, error: "Supabase no está configurado." };
  }
  const supabase = createClient();
  if (!(await requireUser(supabase))) return { ok: false, error: NO_SESSION };

  const { data, error } = await supabase
    .from("products")
    .update({ is_active: next })
    .eq("id", id)
    .select("id");
  if (error) return { ok: false, error: error.message };
  if (!data || data.length === 0)
    return { ok: false, error: "No se pudo actualizar (permisos/RLS)." };

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true };
}

export async function signOut(): Promise<void> {
  if (isSupabaseConfigured) {
    const supabase = createClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}
