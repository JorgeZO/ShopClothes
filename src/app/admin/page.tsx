import Link from "next/link";
import { getAllProductsAdmin } from "@/lib/products";
import { isSupabaseConfigured, STORE_NAME } from "@/lib/config";
import { signOut } from "@/app/admin/actions";
import AdminProductRow from "@/components/AdminProductRow";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const products = await getAllProductsAdmin();

  return (
    <main className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-zinc-900">Panel · {STORE_NAME}</h1>
            <Link href="/" className="text-xs text-zinc-500 hover:text-brand-600">
              Ver tienda →
            </Link>
          </div>
          <form action={signOut}>
            <button className="text-sm font-medium text-zinc-600 hover:text-red-600">
              Cerrar sesión
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        {!isSupabaseConfigured && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <strong>Modo demo:</strong> estás viendo productos de ejemplo y no
            podrás guardar cambios hasta configurar Supabase. Sigue los pasos
            del README.
          </div>
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">
            Productos ({products.length})
          </h2>
          <Link
            href="/admin/nuevo"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            + Nuevo producto
          </Link>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {products.length === 0 ? (
            <div className="p-10 text-center text-zinc-500">
              <p>Aún no hay productos.</p>
              <Link
                href="/admin/nuevo"
                className="mt-3 inline-block text-brand-600 font-medium hover:underline"
              >
                Agrega el primero
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {products.map((p) => (
                <AdminProductRow key={p.id} product={p} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
