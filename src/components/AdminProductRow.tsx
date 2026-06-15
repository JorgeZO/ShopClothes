"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteProduct, toggleActive } from "@/app/admin/actions";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function AdminProductRow({ product }: { product: Product }) {
  const router = useRouter();
  const [active, setActive] = useState(product.is_active);
  const [removed, setRemoved] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const cover = product.image_urls?.[0];

  function handleToggle() {
    const next = !active;
    setActive(next);
    setError(null);
    startTransition(async () => {
      const res = await toggleActive(product.id, next);
      if (!res.ok) {
        setActive(!next);
        setError(res.error ?? "No se pudo actualizar.");
      } else {
        router.refresh();
      }
    });
  }

  function handleDelete() {
    if (!confirm(`¿Borrar "${product.name}"? Esta acción no se puede deshacer.`))
      return;
    setError(null);
    startTransition(async () => {
      const res = await deleteProduct(product.id);
      if (!res.ok) {
        setError(res.error ?? "No se pudo borrar.");
      } else {
        setRemoved(true); // quita la fila al instante
        router.refresh(); // sincroniza con el servidor
      }
    });
  }

  if (removed) return null;

  return (
    <li className="flex items-center gap-4 p-3 sm:p-4">
      <div className="relative h-16 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-100">
        {cover ? (
          <Image
            src={cover}
            alt={product.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-zinc-400">
            Sin foto
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-zinc-900">{product.name}</p>
        <p className="text-sm text-zinc-500">
          {formatPrice(product.price_cents)} · {product.category} · Stock{" "}
          {product.stock}
        </p>
        {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
      </div>

      <button
        onClick={handleToggle}
        disabled={pending}
        className={`hidden sm:inline-flex rounded-full px-2.5 py-1 text-xs font-semibold transition-colors disabled:opacity-50 ${
          active
            ? "bg-green-100 text-green-700"
            : "bg-zinc-200 text-zinc-600"
        }`}
        title="Mostrar u ocultar del catálogo"
      >
        {active ? "Visible" : "Oculto"}
      </button>

      <Link
        href={`/admin/editar/${product.id}`}
        className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:border-brand-400"
      >
        Editar
      </Link>
      <button
        onClick={handleDelete}
        disabled={pending}
        className="rounded-lg px-2 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
      >
        Borrar
      </button>
    </li>
  );
}
