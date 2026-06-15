import Link from "next/link";
import { STORE_NAME } from "@/lib/config";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">
            {STORE_NAME.charAt(0).toUpperCase()}
          </span>
          <span className="text-lg font-bold tracking-tight text-zinc-900">
            {STORE_NAME}
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-zinc-600">
          <Link href="/" className="hover:text-brand-600 transition-colors">
            Catálogo
          </Link>
          <Link
            href="/admin"
            className="hover:text-brand-600 transition-colors"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
