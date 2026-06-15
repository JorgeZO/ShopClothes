"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SearchFilters({
  categories,
}: {
  categories: string[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const activeCategory = params.get("category") ?? "";
  const query = params.get("q") ?? "";

  const updateParams = useCallback(
    (next: Record<string, string>) => {
      const sp = new URLSearchParams(params.toString());
      Object.entries(next).forEach(([key, value]) => {
        if (value) sp.set(key, value);
        else sp.delete(key);
      });
      const qs = sp.toString();
      router.push(qs ? `/?${qs}` : "/", { scroll: false });
    },
    [params, router]
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="search"
          defaultValue={query}
          placeholder="Buscar prendas…"
          onChange={(e) => updateParams({ q: e.target.value })}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams({ category: "" })}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === ""
              ? "bg-brand-600 text-white"
              : "bg-white border border-zinc-300 text-zinc-700 hover:border-brand-400"
          }`}
        >
          Todo
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => updateParams({ category: cat })}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-brand-600 text-white"
                : "bg-white border border-zinc-300 text-zinc-700 hover:border-brand-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
