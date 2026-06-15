import type { Product } from "@/lib/types";

// Catálogo de ejemplo para el "modo demo" (cuando Supabase no está configurado).
// Las imágenes son de Unsplash (libres para demo).
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "demo-1",
    created_at: "2026-01-10T00:00:00Z",
    name: "Playera oversize negra",
    slug: "playera-oversize-negra",
    description:
      "Playera de algodón 100% premium, corte oversize unisex. Suave, fresca y con caída moderna. Ideal para el día a día.",
    price_cents: 24900,
    category: "Playeras",
    sizes: ["S", "M", "L", "XL"],
    image_urls: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
    stock: 12,
    is_active: true,
  },
  {
    id: "demo-2",
    created_at: "2026-01-12T00:00:00Z",
    name: "Hoodie beige minimalista",
    slug: "hoodie-beige-minimalista",
    description:
      "Sudadera con capucha en tono beige, interior afelpado. Comodidad total para climas frescos.",
    price_cents: 49900,
    category: "Sudaderas",
    sizes: ["M", "L", "XL"],
    image_urls: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    ],
    stock: 8,
    is_active: true,
  },
  {
    id: "demo-3",
    created_at: "2026-01-15T00:00:00Z",
    name: "Jeans rectos clásicos",
    slug: "jeans-rectos-clasicos",
    description:
      "Pantalón de mezclilla de corte recto, denim resistente y atemporal. Combina con todo.",
    price_cents: 59900,
    category: "Pantalones",
    sizes: ["28", "30", "32", "34", "36"],
    image_urls: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    ],
    stock: 15,
    is_active: true,
  },
  {
    id: "demo-4",
    created_at: "2026-01-18T00:00:00Z",
    name: "Vestido floral verano",
    slug: "vestido-floral-verano",
    description:
      "Vestido ligero con estampado floral, perfecto para días soleados. Tela fresca y vaporosa.",
    price_cents: 69900,
    category: "Vestidos",
    sizes: ["S", "M", "L"],
    image_urls: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    ],
    stock: 0,
    is_active: true,
  },
  {
    id: "demo-5",
    created_at: "2026-01-20T00:00:00Z",
    name: "Chamarra de mezclilla",
    slug: "chamarra-de-mezclilla",
    description:
      "Chamarra de denim clásica con botones metálicos. Una prenda básica que nunca pasa de moda.",
    price_cents: 79900,
    category: "Chamarras",
    sizes: ["S", "M", "L", "XL"],
    image_urls: [
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80",
    ],
    stock: 6,
    is_active: true,
  },
  {
    id: "demo-6",
    created_at: "2026-01-22T00:00:00Z",
    name: "Gorra urbana",
    slug: "gorra-urbana",
    description:
      "Gorra ajustable de algodón con visera curva. Detalle bordado minimalista.",
    price_cents: 19900,
    category: "Accesorios",
    sizes: ["Única"],
    image_urls: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    ],
    stock: 20,
    is_active: true,
  },
];
