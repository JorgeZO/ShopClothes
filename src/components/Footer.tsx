import { LogoMark } from "@/components/Logo";
import { STORE_NAME } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-ink-950/60">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <LogoMark className="h-9 w-9" />
            <div>
              <p className="font-extrabold uppercase tracking-[0.2em] text-white">
                {STORE_NAME}
              </p>
              <p className="text-xs font-medium text-brand-400">
                Estilo que impone.
              </p>
            </div>
          </div>
          <div className="text-xs text-zinc-500">
            <p>
              © {new Date().getFullYear()} {STORE_NAME}. Todos los derechos
              reservados.
            </p>
            <p className="mt-0.5 font-medium text-zinc-400">
              Pedidos y atención por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
