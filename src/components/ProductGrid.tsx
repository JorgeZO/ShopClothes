import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-zinc-500">
        <p className="text-lg font-semibold text-zinc-300">
          No encontramos productos
        </p>
        <p className="mt-1 text-sm">Prueba con otra búsqueda o categoría.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
