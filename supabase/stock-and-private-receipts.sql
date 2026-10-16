-- 1) Bucket de comprobantes privado (el admin los ve con URLs firmadas)
update storage.buckets set public = false where id = 'receipts';

-- 2) Stock: se descuenta cuando el pedido pasa a un estado "comprometido"
--    (Pago Confirmado / En Preparación / Despachado) y se repone si vuelve
--    a un estado anterior o se cancela. Nunca baja de 0.
create or replace function public.order_commits_stock(p_status text) returns boolean
language sql immutable as $$
  select p_status in ('Pago Confirmado', 'En Preparación', 'Despachado')
$$;

create or replace function public.sync_order_stock() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  was boolean := public.order_commits_stock(old.status);
  now_ boolean := public.order_commits_stock(new.status);
begin
  if now_ and not was then
    update products p set stock = greatest(0, p.stock - i.quantity)
      from order_items i where i.order_id = new.id and i.product_id = p.id;
  elsif was and not now_ then
    update products p set stock = p.stock + i.quantity
      from order_items i where i.order_id = new.id and i.product_id = p.id;
  end if;
  return new;
end $$;

drop trigger if exists trg_sync_order_stock on public.orders;
create trigger trg_sync_order_stock
  after update of status on public.orders
  for each row when (old.status is distinct from new.status)
  execute function public.sync_order_stock();
