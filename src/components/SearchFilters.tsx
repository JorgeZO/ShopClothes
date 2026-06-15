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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          defaultValue={query}
          placeholder="Buscar prendas…"
          onChange={(e) => updateParams({ q: e.target.value })}
          className="w-full rounded-2xl border border-zinc-200 bg-white/80 py-3 pl-11 pr-4 text-sm shadow-sm outline-none backdrop-blur transition-all focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams({ category: "" })}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            activeCategory === ""
              ? "bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-soft"
              : "border border-zinc-200 bg-white/70 text-zinc-700 hover:border-brand-300 hover:text-brand-700"
          }`}
        >
          Todo
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => updateParams({ category: cat })}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-soft"
                : "border border-zinc-200 bg-white/70 text-zinc-700 hover:border-brand-300 hover:text-brand-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
