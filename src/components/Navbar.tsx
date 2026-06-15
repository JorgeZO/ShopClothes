import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="transition-transform hover:scale-[1.02]">
          <Logo />
        </Link>
        <nav className="flex items-center gap-2 text-sm font-semibold">
          <Link
            href="/"
            className="hidden rounded-full px-3.5 py-1.5 text-zinc-600 transition-colors hover:bg-brand-50 hover:text-brand-700 sm:block"
          >
            Catálogo
          </Link>
          <Link
            href="/#catalogo"
            className="rounded-full bg-zinc-900 px-4 py-2 text-white shadow-sm transition-all hover:bg-brand-700"
          >
            Comprar ahora
          </Link>
        </nav>
      </div>
    </header>
  );
}
