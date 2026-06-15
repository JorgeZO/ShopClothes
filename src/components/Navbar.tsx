import Link from "next/link";
import { STORE_NAME } from "@/lib/config";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 font-bold text-white shadow-soft transition-transform group-hover:scale-105">
            {STORE_NAME.charAt(0).toUpperCase()}
          </span>
          <span className="text-lg font-extrabold tracking-tight text-zinc-900">
            {STORE_NAME}
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className="rounded-full px-3.5 py-1.5 text-zinc-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
          >
            Catálogo
          </Link>
        </nav>
      </div>
    </header>
  );
}
