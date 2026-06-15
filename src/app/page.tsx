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
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Manchas decorativas */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl animate-floaty" />
          <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
                Nueva colección · Pedidos por WhatsApp
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-zinc-900 sm:text-6xl">
                Viste tu mejor versión con{" "}
                <span className="text-gradient">{STORE_NAME}</span>
              </h1>
              <p className="mt-4 max-w-xl text-base text-zinc-600 sm:text-lg">
                Prendas seleccionadas con cariño. Encuentra tu estilo y cómpralo
                fácil, rápido y directo por WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* Catálogo */}
        <div className="mx-auto max-w-6xl px-4 pb-20">
          {!isSupabaseConfigured && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <strong>Modo demo:</strong> estás viendo productos de ejemplo.
              Configura Supabase (ver README) para administrar tu inventario
              real.
            </div>
          )}

          <Suspense fallback={<div className="h-24" />}>
            <SearchFilters categories={categories} />
          </Suspense>

          <div className="mt-8 flex items-baseline justify-between">
            <h2 className="text-lg font-bold text-zinc-900">
              {category ? category : "Todas las prendas"}
            </h2>
            <span className="text-sm text-zinc-500">
              {products.length}{" "}
              {products.length === 1 ? "producto" : "productos"}
            </span>
          </div>

          <div className="mt-5">
            <ProductGrid products={products} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
