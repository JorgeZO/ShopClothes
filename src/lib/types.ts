export type Product = {
  id: string;
  created_at: string;
  name: string;
  slug: string;
  description: string;
  price_cents: number;
  category: string;
  sizes: string[];
  image_urls: string[];
  stock: number;
  is_active: boolean;
};

// Datos del formulario de admin (sin campos generados por la base de datos).
export type ProductInput = {
  name: string;
  description: string;
  price_cents: number;
  category: string;
  sizes: string[];
  image_urls: string[];
  stock: number;
  is_active: boolean;
};
