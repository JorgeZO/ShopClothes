import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import ProductGrid from "@/components/ProductGrid";
import { getProducts, getCategories } from "@/lib/products";
import { isSupabaseConfigured } from "@/lib/config";

export const dynamic = "force-dynamic";

const BENEFITS = [
  { icon: "⚡", t: "Respuesta inmediata", s: "Te atendemos por WhatsApp" },
  { icon: "🚚", t: "Envíos a todo México", s: "Coordinamos tu entrega" },
  { icon: "🔥", t: "Drops exclusivos", s: "Piezas en cantidad limitada" },
];

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
        {/* Hero compacto (estilo catálogo) */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl animate-floaty" />
          <div className="pointer-events-none absolute -left-20 top-8 h-60 w-60 rounded-full bg-accent-500/15 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
            <div className="max-w-2xl animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-300 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
                Nueva colección · Cantidades limitadas
              </span>

              <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl">
                Tu estilo, <span className="text-gradient">tus reglas.</span>
              </h1>

              <p className="mt-4 max-w-lg text-base text-zinc-400 sm:text-lg">
                Encuentra tu estilo y cómpralo fácil, rápido y directo por
                WhatsApp.
              </p>

              <Link
                href="#catalogo"
                className="mt-6 inline-flex rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-6 py-3 text-sm font-bold text-ink-950 shadow-soft transition-all hover:brightness-110"
              >
                Ver catálogo ↓
              </Link>
            </div>
          </div>
        </section>

        {/* Catálogo (arriba, lo principal) */}
        <div id="catalogo" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16">
          {!isSupabaseConfigured && (
            <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
              <strong>Modo demo:</strong> estás viendo productos de ejemplo.
              Configura Supabase (ver README) para administrar tu inventario
              real.
            </div>
          )}

          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                {category ? category : "Catálogo"}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                {products.length}{" "}
                {products.length === 1
                  ? "producto disponible"
                  : "productos disponibles"}
              </p>
            </div>
          </div>

          <Suspense fallback={<div className="h-24" />}>
            <SearchFilters categories={categories} />
          </Suspense>

          <div className="mt-6">
            <ProductGrid products={products} />
          </div>
        </div>

        {/* Franja de beneficios (abajo) */}
        <section className="border-t border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {BENEFITS.map((b) => (
              <div
                key={b.t}
                className="flex items-center justify-center gap-3 px-4 py-6 text-center sm:text-left"
              >
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{b.t}</p>
                  <p className="text-xs text-zinc-500">{b.s}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
