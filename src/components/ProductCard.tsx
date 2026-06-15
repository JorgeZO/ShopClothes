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
      className="group block overflow-hidden rounded-2xl bg-white border border-zinc-200 hover:border-brand-300 hover:shadow-lg transition-all"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
        {cover ? (
          <Image
            src={cover}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400 text-sm">
            Sin imagen
          </div>
        )}
        {soldOut && (
          <span className="absolute top-2 left-2 rounded-full bg-zinc-900/85 text-white text-xs font-semibold px-2.5 py-1">
            Agotado
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-brand-600 font-medium">{product.category}</p>
        <h3 className="mt-0.5 font-semibold text-zinc-900 line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-bold text-zinc-900">
          {formatPrice(product.price_cents)}
        </p>
      </div>
    </Link>
  );
}
