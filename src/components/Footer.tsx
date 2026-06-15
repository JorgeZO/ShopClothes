import { STORE_NAME } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200/70 bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 text-sm font-bold text-white">
              {STORE_NAME.charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="font-semibold text-zinc-900">{STORE_NAME}</p>
              <p className="text-xs text-zinc-500">
                Ropa seleccionada con cariño
              </p>
            </div>
          </div>
          <div className="text-xs text-zinc-500">
            <p>
              © {new Date().getFullYear()} {STORE_NAME}. Todos los derechos
              reservados.
            </p>
            <p className="mt-0.5">Atención y pedidos por WhatsApp 💬</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
