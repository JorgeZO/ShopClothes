import Link from "next/link";
import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link href="/admin" className="text-sm text-zinc-500 hover:text-brand-600">
          ← Volver al panel
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-zinc-900">Nuevo producto</h1>
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
          <ProductForm mode="create" action={createProduct} />
        </div>
      </div>
    </main>
  );
}
