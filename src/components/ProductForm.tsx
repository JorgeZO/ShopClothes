"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUploader from "@/components/ImageUploader";
import { isSupabaseConfigured } from "@/lib/config";
import type { Product } from "@/lib/types";
import type { ActionResult } from "@/app/admin/actions";

type Props = {
  mode: "create" | "edit";
  action: (formData: FormData) => Promise<ActionResult>;
  product?: Product;
};

export default function ProductForm({ mode, action, product }: Props) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>(product?.image_urls ?? []);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.set("image_urls", JSON.stringify(images));

    if (!isSupabaseConfigured) {
      setError("Supabase no está configurado. No se puede guardar (ver README).");
      return;
    }

    startTransition(async () => {
      // En éxito, la acción hace redirect (lanza NEXT_REDIRECT y no retorna).
      const res = await action(formData);
      if (res && !res.ok) setError(res.error ?? "No se pudo guardar.");
    });
  }

  const priceDefault = product ? (product.price_cents / 100).toFixed(2) : "";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Field label="Nombre del producto" required>
        <input
          name="name"
          required
          defaultValue={product?.name}
          placeholder="Ej. Playera oversize negra"
          className={inputCls}
        />
      </Field>

      <Field label="Descripción">
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description}
          placeholder="Material, corte, detalles…"
          className={inputCls}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Precio (MXN)" required>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={priceDefault}
            placeholder="249.00"
            className={inputCls}
          />
        </Field>
        <Field label="Categoría">
          <input
            name="category"
            defaultValue={product?.category ?? ""}
            placeholder="Playeras, Pantalones…"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tallas (separadas por coma)">
          <input
            name="sizes"
            defaultValue={product?.sizes.join(", ")}
            placeholder="S, M, L, XL"
            className={inputCls}
          />
        </Field>
        <Field label="Stock (cantidad)">
          <input
            name="stock"
            type="number"
            min="0"
            defaultValue={product?.stock ?? 0}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Imágenes">
        <ImageUploader value={images} onChange={setImages} />
      </Field>

      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={product ? product.is_active : true}
          className="h-4 w-4 rounded border-zinc-300 text-brand-600"
        />
        Mostrar en el catálogo (visible para clientes)
      </label>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60 transition-colors"
        >
          {pending
            ? "Guardando…"
            : mode === "create"
              ? "Crear producto"
              : "Guardar cambios"}
        </button>
        <Link
          href="/admin"
          className="rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-600 hover:text-zinc-900"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-zinc-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
