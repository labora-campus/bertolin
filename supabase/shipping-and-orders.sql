-- Envíos por zona + create_order que recalcula precios y envío en el servidor.
-- Ejecutar en Supabase > SQL Editor (después de rls.sql).

-- Zonas iniciales (solo si la tabla está vacía)
-- postal_codes admite rangos "1000-1499" y valores sueltos "1650"
insert into public.shipping_zones (name, price, estimated_days, postal_codes, is_active)
select * from (values
  ('CABA',       15000, '24-48 hs', array['1000-1499'], true),
  ('GBA Norte',  24640, '48-72 hs', array['1600-1699'], true),
  ('GBA Oeste',  28000, '48-72 hs', array['1700-1799'], true),
  ('GBA Sur',    24640, '48-72 hs', array['1800-1899'], true)
) v(name, price, estimated_days, postal_codes, is_active)
where not exists (select 1 from public.shipping_zones);

-- Costo de envío para un CP (null = sin zona, a coordinar)
create or replace function public.shipping_cost_for(p_cp text) returns numeric
language plpgsql stable security definer set search_path = public as $$
declare
  cp int;
  z record;
  entry text;
  lo int; hi int;
begin
  cp := nullif(regexp_replace(coalesce(p_cp, ''), '\D', '', 'g'), '')::int;
  if cp is null then return null; end if;
  for z in select price, postal_codes from shipping_zones where is_active order by price loop
    foreach entry in array coalesce(z.postal_codes, '{}') loop
      if entry like '%-%' then
        lo := split_part(entry, '-', 1)::int;
        hi := split_part(entry, '-', 2)::int;
        if cp between lo and hi then return z.price; end if;
      elsif nullif(trim(entry), '') is not null and trim(entry)::int = cp then
        return z.price;
      end if;
    end loop;
  end loop;
  return null;
end $$;

-- p_items: [{ "product_id": "<uuid>", "quantity": 2 }]. Los precios se leen de la base.
create or replace function public.create_order(p_order jsonb, p_items jsonb)
returns text
language plpgsql security definer set search_path = public as $$
declare
  new_id text;
  it jsonb;
  prod record;
  qty int;
  sub numeric := 0;
  ship numeric;
  note text := null;
begin
  if jsonb_array_length(coalesce(p_items, '[]'::jsonb)) = 0 then
    raise exception 'El carrito está vacío';
  end if;

  -- 1) validar productos y calcular subtotal con precios de la base
  for it in select * from jsonb_array_elements(p_items) loop
    qty := (it->>'quantity')::int;
    select * into prod from products where (id::text = it->>'product_id' or slug = it->>'product_id') and is_active;
    if not found or qty is null or qty < 1 or qty > 10000 then
      raise exception 'Producto o cantidad inválida';
    end if;
    sub := sub + prod.price * qty;
  end loop;

  -- 2) envío según CP
  ship := public.shipping_cost_for(p_order->>'shipping_postal_code');
  if ship is null then
    ship := 0;
    note := 'Envío a coordinar (CP sin zona de reparto configurada)';
  end if;

  insert into orders (customer_name, customer_email, customer_phone, customer_cuit,
    shipping_address, shipping_city, shipping_postal_code, shipping_cost,
    subtotal, total, status, payment_method, notes)
  values (p_order->>'customer_name', p_order->>'customer_email', p_order->>'customer_phone',
    p_order->>'customer_cuit', p_order->>'shipping_address', p_order->>'shipping_city',
    p_order->>'shipping_postal_code', ship, sub, sub + ship,
    'Pendiente Pago', 'Transferencia Bancaria', note)
  returning id::text into new_id;

  for it in select * from jsonb_array_elements(p_items) loop
    qty := (it->>'quantity')::int;
    select * into prod from products where (id::text = it->>'product_id' or slug = it->>'product_id') and is_active;
    insert into order_items (order_id, product_id, product_name, product_sku, product_image,
      unit_price, quantity, subtotal)
    select o.id, prod.id, prod.name, prod.sku, prod.images[1],
      prod.price, qty, prod.price * qty from orders o where o.id::text = new_id;
  end loop;

  return new_id;
end $$;

revoke all on function public.shipping_cost_for(text) from public;
grant execute on function public.shipping_cost_for(text) to anon, authenticated;
grant execute on function public.create_order(jsonb, jsonb) to anon, authenticated;
