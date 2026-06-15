import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { updateProduct } from "@/app/admin/actions";
import { getProductByIdAdmin } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductByIdAdmin(params.id);
  if (!product) notFound();

  // Liga el id del producto a la acción de actualización.
  const updateAction = updateProduct.bind(null, product.id);

  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link href="/admin" className="text-sm text-zinc-500 hover:text-brand-600">
          ← Volver al panel
        </Link>
        <h1 className="mt-3 text-2xl font-bold text-zinc-900">
          Editar producto
        </h1>
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
          <ProductForm mode="edit" action={updateAction} product={product} />
        </div>
      </div>
    </main>
  );
}
