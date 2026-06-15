import { WHATSAPP_NUMBER, STORE_NAME } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

// Construye el enlace de WhatsApp con un mensaje pre-llenado para un producto.
export function buildWhatsAppLink(product: Product, pageUrl?: string): string {
  const lines = [
    `¡Hola ${STORE_NAME}! 👋`,
    `Me interesa este producto:`,
    `*${product.name}* — ${formatPrice(product.price_cents)}`,
  ];
  if (pageUrl) lines.push(pageUrl);
  lines.push(`¿Sigue disponible?`);

  const text = encodeURIComponent(lines.join("\n"));

  if (!WHATSAPP_NUMBER) {
    // Sin número configurado: abre WhatsApp para que el usuario elija contacto.
    return `https://wa.me/?text=${text}`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const isWhatsAppConfigured = Boolean(WHATSAPP_NUMBER);
