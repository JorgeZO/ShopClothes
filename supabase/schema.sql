-- ============================================================
--  Esquema de la tienda de ropa para Supabase
--  Pega TODO esto en: Supabase > SQL Editor > New query > Run
-- ============================================================

-- 1) Tabla de productos
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  slug        text not null unique,
  description text not null default '',
  price_cents integer not null default 0,
  category    text not null default 'General',
  sizes       text[] not null default '{}',
  image_urls  text[] not null default '{}',
  stock       integer not null default 0,
  is_active   boolean not null default true
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_active_idx on public.products (is_active);

-- 2) Seguridad a nivel de fila (RLS)
alter table public.products enable row level security;

-- Lectura pública: cualquiera puede ver productos activos
drop policy if exists "Lectura publica de productos activos" on public.products;
create policy "Lectura publica de productos activos"
  on public.products for select
  using (is_active = true);

-- El admin autenticado puede ver TODO (incluye inactivos)
drop policy if exists "Admin lee todo" on public.products;
create policy "Admin lee todo"
  on public.products for select
  to authenticated
  using (true);

-- Solo usuarios autenticados pueden crear/editar/borrar
drop policy if exists "Admin inserta" on public.products;
create policy "Admin inserta"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "Admin actualiza" on public.products;
create policy "Admin actualiza"
  on public.products for update
  to authenticated
  using (true) with check (true);

drop policy if exists "Admin borra" on public.products;
create policy "Admin borra"
  on public.products for delete
  to authenticated
  using (true);

-- 3) Storage: bucket público para imágenes de productos
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Lectura pública de las imágenes
drop policy if exists "Imagenes publicas" on storage.objects;
create policy "Imagenes publicas"
  on storage.objects for select
  using (bucket_id = 'product-images');

-- Subida/edición/borrado de imágenes solo para autenticados
drop policy if exists "Admin sube imagenes" on storage.objects;
create policy "Admin sube imagenes"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "Admin edita imagenes" on storage.objects;
create policy "Admin edita imagenes"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Admin borra imagenes" on storage.objects;
create policy "Admin borra imagenes"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

-- 4) (Opcional) Productos de ejemplo para arrancar con algo
insert into public.products (name, slug, description, price_cents, category, sizes, stock, is_active)
values
  ('Playera oversize negra', 'playera-oversize-negra', 'Algodón premium, corte oversize unisex.', 24900, 'Playeras', '{S,M,L,XL}', 12, true),
  ('Jeans rectos clásicos', 'jeans-rectos-clasicos', 'Mezclilla resistente, corte recto atemporal.', 59900, 'Pantalones', '{28,30,32,34}', 15, true)
on conflict (slug) do nothing;
