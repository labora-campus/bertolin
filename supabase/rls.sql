-- Papelera Bertolín: autenticación admin + RLS
-- Ejecutar en Supabase > SQL Editor.

-- 1) Quién es admin: usuarios con app_metadata.role = 'admin'
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
$$;

-- 2) Activar RLS
alter table public.banners          enable row level security;
alter table public.categories       enable row level security;
alter table public.products         enable row level security;
alter table public.product_variants enable row level security;
alter table public.shipping_zones   enable row level security;
alter table public.orders           enable row level security;
alter table public.order_items      enable row level security;

-- 3) Catálogo: lectura pública, escritura solo admin
do $$
declare t text;
begin
  foreach t in array array['banners','categories','products','product_variants','shipping_zones'] loop
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);
    execute format('create policy "admin write" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- 4) Pedidos: solo admin accede directo; los clientes usan las funciones de abajo
drop policy if exists "admin all" on public.orders;
drop policy if exists "admin all" on public.order_items;
create policy "admin all" on public.orders      for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all" on public.order_items for all using (public.is_admin()) with check (public.is_admin());

-- 5) Crear pedido como invitado (devuelve el id)
create or replace function public.create_order(p_order jsonb, p_items jsonb)
returns text
language plpgsql security definer set search_path = public as $$
declare
  new_id text;
  it jsonb;
begin
  insert into orders (customer_name, customer_email, customer_phone, customer_cuit,
    shipping_address, shipping_city, shipping_postal_code, shipping_cost,
    subtotal, total, status, payment_method)
  values (p_order->>'customer_name', p_order->>'customer_email', p_order->>'customer_phone',
    p_order->>'customer_cuit', p_order->>'shipping_address', p_order->>'shipping_city',
    p_order->>'shipping_postal_code', (p_order->>'shipping_cost')::numeric,
    (p_order->>'subtotal')::numeric, (p_order->>'total')::numeric,
    'Pendiente Pago', 'Transferencia Bancaria')
  returning id::text into new_id;

  for it in select * from jsonb_array_elements(p_items) loop
    insert into order_items (order_id, product_name, product_image, unit_price, quantity, subtotal)
    values (new_id, it->>'product_name', it->>'product_image',
      (it->>'unit_price')::numeric, (it->>'quantity')::int, (it->>'subtotal')::numeric);
  end loop;
  return new_id;
end $$;

-- 6) Adjuntar comprobante (solo si el pedido sigue en "Pendiente Pago")
create or replace function public.attach_receipt(p_order_id text, p_receipt_url text)
returns void
language sql security definer set search_path = public as $$
  update orders
     set status = 'Comprobante Subido', receipt_url = p_receipt_url,
         receipt_uploaded_at = now()
   where id::text = p_order_id and status = 'Pendiente Pago';
$$;

revoke all on function public.create_order(jsonb, jsonb) from public;
revoke all on function public.attach_receipt(text, text) from public;
grant execute on function public.create_order(jsonb, jsonb) to anon, authenticated;
grant execute on function public.attach_receipt(text, text) to anon, authenticated;

-- 7) Storage: cualquiera sube comprobantes; solo admin los lista/borra
drop policy if exists "receipts upload" on storage.objects;
drop policy if exists "receipts admin" on storage.objects;
create policy "receipts upload" on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'receipts');
create policy "receipts admin" on storage.objects for all
  using (bucket_id = 'receipts' and public.is_admin())
  with check (bucket_id = 'receipts' and public.is_admin());

-- 8) Después de crear el usuario admin en Authentication > Users:
-- update auth.users
--    set raw_app_meta_data = coalesce(raw_app_meta_data,'{}'::jsonb) || '{"role":"admin"}'
--  where email = 'TU_EMAIL_ADMIN';
