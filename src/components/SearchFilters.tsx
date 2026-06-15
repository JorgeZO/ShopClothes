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
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          defaultValue={query}
          placeholder="Buscar prendas…"
          onChange={(e) => updateParams({ q: e.target.value })}
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-brand-400/60 focus:ring-4 focus:ring-brand-500/15"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams({ category: "" })}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
            activeCategory === ""
              ? "bg-gradient-to-r from-brand-500 to-accent-500 text-ink-950 shadow-soft"
              : "border border-white/10 bg-white/5 text-zinc-300 hover:border-brand-400/40 hover:text-white"
          }`}
        >
          Todo
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => updateParams({ category: cat })}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-brand-500 to-accent-500 text-ink-950 shadow-soft"
                : "border border-white/10 bg-white/5 text-zinc-300 hover:border-brand-400/40 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
