// Formato de moneda en pesos mexicanos a partir de centavos.
const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

export function formatPrice(cents: number): string {
  return mxn.format((cents || 0) / 100);
}

// Convierte un texto de precio ("199.90") a centavos enteros.
export function priceToCents(value: string | number): number {
  const n = typeof value === "number" ? value : parseFloat(value);
  if (Number.isNaN(n) || n < 0) return 0;
  return Math.round(n * 100);
}

// Genera un slug legible para URLs a partir del nombre.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita acentos/diacríticos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 60);
}
