import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.description || product.name,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const soldOut = product.stock <= 0;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Link
            href="/#catalogo"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-brand-300"
          >
            ← Volver al catálogo
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="animate-fade-up">
              <ProductGallery images={product.image_urls} alt={product.name} />
            </div>

            <div className="lg:py-4">
              <span className="inline-flex rounded-full border border-brand-400/30 bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-300">
                {product.category}
              </span>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 text-3xl font-extrabold text-gradient">
                {formatPrice(product.price_cents)}
              </p>

              {!soldOut ? (
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-brand-400">
                  <span className="h-2 w-2 rounded-full bg-brand-400" />
                  Disponible
                </p>
              ) : (
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500">
                  <span className="h-2 w-2 rounded-full bg-zinc-600" />
                  Agotado por ahora
                </p>
              )}

              {product.description && (
                <p className="mt-5 whitespace-pre-line leading-relaxed text-zinc-400">
                  {product.description}
                </p>
              )}

              {product.sizes.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-white">
                    Tallas disponibles
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <span
                        key={s}
                        className="min-w-[2.75rem] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm font-semibold text-zinc-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 max-w-sm">
                <WhatsAppButton product={product} disabled={soldOut} />
                <p className="mt-2 text-center text-xs text-zinc-500">
                  Te responderemos para coordinar pago y envío.
                </p>
              </div>

              {/* Garantías / confianza */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center">
                <div>
                  <p className="text-lg">💬</p>
                  <p className="mt-1 text-xs font-medium text-zinc-400">
                    Atención directa
                  </p>
                </div>
                <div>
                  <p className="text-lg">🚚</p>
                  <p className="mt-1 text-xs font-medium text-zinc-400">
                    Coordinamos envío
                  </p>
                </div>
                <div>
                  <p className="text-lg">✨</p>
                  <p className="mt-1 text-xs font-medium text-zinc-400">
                    Calidad garantizada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
