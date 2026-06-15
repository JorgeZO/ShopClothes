import { STORE_NAME } from "@/lib/config";

// Marca de Vesta: emblema "spark" en degradado + wordmark.
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 shadow-soft ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-1/2 w-1/2 text-white">
        <path d="M12 1.5c.6 5.7 3.3 8.4 9 9-5.7.6-8.4 3.3-9 9-.6-5.7-3.3-8.4-9-9 5.7-.6 8.4-3.3 9-9Z" />
      </svg>
    </span>
  );
}

export default function Logo({
  markClassName = "h-9 w-9",
  textClassName = "text-lg",
}: {
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className={markClassName} />
      <span
        className={`font-extrabold uppercase tracking-[0.18em] text-zinc-900 ${textClassName}`}
      >
        {STORE_NAME}
      </span>
    </span>
  );
}
