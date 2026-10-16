-- Bucket público para imágenes de productos (solo admin escribe)
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;

drop policy if exists "products admin" on storage.objects;
create policy "products admin" on storage.objects for all
  using (bucket_id = 'products' and public.is_admin())
  with check (bucket_id = 'products' and public.is_admin());
-- La lectura pública funciona por ser un bucket público.
