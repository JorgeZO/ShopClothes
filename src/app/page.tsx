import { Suspense } from "react";
import Link from "next/link";
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
          <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl animate-floaty" />
          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-accent-400/25 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
            <div className="max-w-2xl animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-700 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-500" />
                Nueva colección · Cantidades limitadas
              </span>

              <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight text-zinc-900 sm:text-7xl">
                Estilo que <span className="text-gradient">impone</span>,
                <br className="hidden sm:block" /> actitud que se nota.
              </h1>

              <p className="mt-6 max-w-lg text-base text-zinc-600 sm:text-lg">
                Prendas seleccionadas para los que no pasan desapercibidos.
                Encuéntralas, pruébatelas y pídelas al instante por WhatsApp.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#catalogo"
                  className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all hover:bg-brand-700 hover:shadow-glow"
                >
                  Explorar catálogo
                </Link>
                <span className="text-sm font-medium text-zinc-500">
                  {products.length}+ prendas disponibles
                </span>
              </div>
            </div>
          </div>

          {/* Franja de beneficios */}
          <div className="border-y border-zinc-200/60 bg-white/50 backdrop-blur">
            <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-zinc-200/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                { icon: "⚡", t: "Respuesta inmediata", s: "Te atendemos por WhatsApp" },
                { icon: "🚚", t: "Envíos a todo México", s: "Coordinamos tu entrega" },
                { icon: "🔥", t: "Drops exclusivos", s: "Piezas en cantidad limitada" },
              ].map((b) => (
                <div
                  key={b.t}
                  className="flex items-center justify-center gap-3 px-4 py-4 text-center sm:text-left"
                >
                  <span className="text-xl">{b.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{b.t}</p>
                    <p className="text-xs text-zinc-500">{b.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Catálogo */}
        <div id="catalogo" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
          {!isSupabaseConfigured && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <strong>Modo demo:</strong> estás viendo productos de ejemplo.
              Configura Supabase (ver README) para administrar tu inventario
              real.
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900">
              {category ? category : "El catálogo"}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Encuentra tu próxima prenda favorita.
            </p>
          </div>

          <Suspense fallback={<div className="h-24" />}>
            <SearchFilters categories={categories} />
          </Suspense>

          <div className="mt-6 flex items-baseline justify-between">
            <span className="text-sm font-medium text-zinc-500">
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
