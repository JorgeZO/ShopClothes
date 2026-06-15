import { STORE_NAME } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          © {new Date().getFullYear()} {STORE_NAME}. Todos los derechos
          reservados.
        </p>
        <p>Hecho con cariño · Atención por WhatsApp</p>
      </div>
    </footer>
  );
}
