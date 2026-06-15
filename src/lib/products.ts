import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/config";
import { SAMPLE_PRODUCTS } from "@/lib/sample-data";
import type { Product } from "@/lib/types";

type CatalogFilters = {
  q?: string;
  category?: string;
};

function filterSamples(filters: CatalogFilters): Product[] {
  let items = SAMPLE_PRODUCTS.filter((p) => p.is_active);
  if (filters.category) {
    items = items.filter((p) => p.category === filters.category);
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }
  return items;
}

// Catálogo público (solo productos activos).
export async function getProducts(
  filters: CatalogFilters = {}
): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return filterSamples(filters);
  }

  const supabase = createClient();
  let query = supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.q) query = query.ilike("name", `%${filters.q}%`);

  const { data, error } = await query;
  if (error) {
    console.error("Error cargando productos:", error.message);
    return [];
  }
  return (data as Product[]) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return SAMPLE_PRODUCTS.find((p) => p.slug === slug && p.is_active) ?? null;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Error cargando producto:", error.message);
    return null;
  }
  return (data as Product) ?? null;
}

export async function getCategories(): Promise<string[]> {
  if (!isSupabaseConfigured) {
    return Array.from(
      new Set(SAMPLE_PRODUCTS.filter((p) => p.is_active).map((p) => p.category))
    ).sort();
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("category")
    .eq("is_active", true);

  if (error || !data) return [];
  return Array.from(new Set(data.map((r) => r.category as string))).sort();
}

// Todos los productos (para el panel admin, incluye inactivos).
export async function getAllProductsAdmin(): Promise<Product[]> {
  if (!isSupabaseConfigured) return SAMPLE_PRODUCTS;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando productos (admin):", error.message);
    return [];
  }
  return (data as Product[]) ?? [];
}

export async function getProductByIdAdmin(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return SAMPLE_PRODUCTS.find((p) => p.id === id) ?? null;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) return null;
  return (data as Product) ?? null;
}
