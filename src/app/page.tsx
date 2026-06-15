import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getCategories } from "@/lib/products";
import { STORE_NAME, isSupabaseConfigured } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const q = searchParams.q?.trim() || undefined;
  const category = searchParams.category?.trim() || undefined;

  const [products, categories] = await Promise.all([
    getProducts({ q, category }),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-brand-50 to-transparent">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
              {STORE_NAME}
            </h1>
            <p className="mt-2 text-zinc-600 max-w-xl">
              Ropa seleccionada con cariño. Encuentra tu prenda favorita y
              cómprala fácil por WhatsApp.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 pb-16">
          {!isSupabaseConfigured && (
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <strong>Modo demo:</strong> estás viendo productos de ejemplo.
              Configura Supabase (ver README) para administrar tu inventario
              real.
            </div>
          )}

          <Suspense fallback={<div className="h-24" />}>
            <SearchFilters categories={categories} />
          </Suspense>

          <div className="mt-8">
            <ProductGrid products={products} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
