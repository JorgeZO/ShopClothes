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
            href="/"
            className="text-sm text-zinc-500 hover:text-brand-600 transition-colors"
          >
            ← Volver al catálogo
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <ProductGallery images={product.image_urls} alt={product.name} />

            <div className="lg:py-4">
              <p className="text-sm font-medium text-brand-600">
                {product.category}
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900">
                {product.name}
              </h1>
              <p className="mt-3 text-3xl font-bold text-zinc-900">
                {formatPrice(product.price_cents)}
              </p>

              {product.description && (
                <p className="mt-5 whitespace-pre-line leading-relaxed text-zinc-600">
                  {product.description}
                </p>
              )}

              {product.sizes.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-zinc-900">
                    Tallas disponibles
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 max-w-sm">
                <WhatsAppButton product={product} disabled={soldOut} />
                <p className="mt-2 text-center text-xs text-zinc-400">
                  Te responderemos para coordinar pago y envío.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
