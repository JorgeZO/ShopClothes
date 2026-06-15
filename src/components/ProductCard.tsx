import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock <= 0;
  const cover = product.image_urls?.[0];

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-glow"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
        {cover ? (
          <Image
            src={cover}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            Sin imagen
          </div>
        )}

        {/* Velo inferior para legibilidad al hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {soldOut ? (
          <span className="absolute left-3 top-3 rounded-full bg-zinc-900/85 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            Agotado
          </span>
        ) : (
          <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-700 backdrop-blur">
            {product.category}
          </span>
        )}

        {/* Pista de "ver" al hover */}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-3 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-zinc-900 opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Ver detalles
        </span>
      </div>

      <div className="p-3.5">
        <h3 className="line-clamp-1 font-semibold text-zinc-900">
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-extrabold text-gradient">
          {formatPrice(product.price_cents)}
        </p>
      </div>
    </Link>
  );
}
