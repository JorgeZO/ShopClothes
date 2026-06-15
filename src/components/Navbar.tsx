import Link from "next/link";
import Logo from "@/components/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="transition-transform hover:scale-[1.02]">
          <Logo />
        </Link>
        <nav className="flex items-center gap-2 text-sm font-semibold">
          <Link
            href="#catalogo"
            className="hidden rounded-full px-3.5 py-1.5 text-zinc-300 transition-colors hover:text-white sm:block"
          >
            Catálogo
          </Link>
          <Link
            href="#catalogo"
            className="rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-4 py-2 font-bold text-ink-950 shadow-soft transition-all hover:brightness-110"
          >
            Comprar ahora
          </Link>
        </nav>
      </div>
    </header>
  );
}
