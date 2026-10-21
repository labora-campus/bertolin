# Estado de Avance del Proyecto: Papelera Bertolín

**Estado general:** plataforma completa y funcionando (tienda + panel admin + base de datos + despliegue en Vercel). **Lo único pendiente para salir a producción es cargar el catálogo real de productos.**

---

## ✅ Fase 1: Interfaz y prototipo (completada)

Maqueta visual y flujo de navegación con estética "Minimalismo Editorial" (paleta Material Design 3: vino tinto y ámbar).

- **Tienda pública:** inicio con carrusel de banners y categorías, catálogo con filtros, detalle de producto, carrito y checkout como invitado.
- **Panel admin (`/admin`):** dashboard, pedidos, productos, categorías, envíos y banners.

---

## ✅ Fase 2: Backend con Supabase (completada)

### Base de datos y seguridad
- Tablas: `products`, `categories`, `product_variants`, `orders`, `order_items`, `shipping_zones`, `banners`.
- **Login de administrador** con Supabase Auth. Solo los usuarios con rol `admin` (en `app_metadata`) entran al panel; el resto es redirigido a `/admin/login`. Incluye cierre de sesión.
- **RLS activado en todas las tablas:** el catálogo es de lectura pública y solo el admin escribe; los pedidos solo los ve el admin.
- Las claves de Supabase ya no están en el código: se leen de variables de entorno.

### Pedidos y checkout
- Los pedidos de invitados se crean con la función `create_order`: **el servidor recalcula precios, subtotal y envío** a partir de la base, de modo que el cliente no puede alterar los montos.
- **Envío por zona y código postal** (rangos como `1000-1499` o valores sueltos). Si el CP no tiene zona, el pedido queda como "Envío a coordinar".
- **Comprobantes de transferencia** en un bucket privado de Storage. El admin los abre con una URL firmada de 2 minutos.
- **Stock automático:** se descuenta cuando el pedido pasa a *Pago Confirmado / En Preparación / Despachado* y se repone si vuelve atrás o se cancela (nunca baja de 0).

### Panel de administración
- **Productos:** alta, edición, baja, subida de imagen a Storage e **importación masiva por CSV** (actualiza por SKU, crea categorías faltantes).
- **Pedidos:** lista, detalle, cambio de estado y visualización del comprobante.
- **Categorías, Envíos y Banners:** gestión completa (crear, editar, activar/desactivar, eliminar). Los banners y productos permiten subir imagen.
- Se eliminaron los datos de ejemplo del prototipo (productos, pedidos y banners ficticios).

### Archivos SQL (ejecutar en este orden en el SQL Editor de Supabase)
1. `supabase/rls.sql`
2. `supabase/storage-products.sql`
3. `supabase/shipping-and-orders.sql`
4. `supabase/stock-and-private-receipts.sql`

---

## ✅ Fase 3: Optimización mobile-first (completada)

Solo para la vista de celular; el escritorio no se modificó.

**Etapa 1 – Compra sin fricción**
- Buscador en celular (pantalla completa con búsquedas frecuentes) y buscador de escritorio conectado al catálogo (`/productos?q=`).
- Catálogo con productos primero, barra fija de búsqueda/filtros/orden y panel de filtros que sube desde abajo.
- Productos en 2 columnas con tarjeta compacta.
- Detalle de producto con **barra fija de compra** (cantidad, total y "Agregar").
- "Comprar ahora" ahora agrega el producto antes de ir al checkout.
- Botones táctiles de 44 px.

**Etapa 2 – Pulido**
- Encabezado compacto, portada más corta (categorías en grilla 2×4), checkout con indicador de pasos de una línea, resumen plegable, botón de confirmar fijo abajo y teclados/autocompletado correctos.
- Títulos más chicos e inputs de 16 px (evita el zoom del iPhone).
- Botón de WhatsApp con link real (se activa con `NEXT_PUBLIC_WHATSAPP_NUMBER`).

**Etapa 3 – Experiencia tipo app**
- Menú inferior (Inicio, Catálogo, Buscar, Carrito).
- Carrito como panel desde abajo en celular.
- Aviso "Agregado al carrito" en lugar de abrir el carrito en cada compra.
- **El carrito se guarda en el navegador** (no se vacía al recargar).
- Imágenes optimizadas con `next/image` (tamaño adecuado por dispositivo y formato WebP).

**Banners:** las imágenes subidas desde el admin se ven completas, sin deformarse, sea cual sea su tamaño o proporción.

**Detalle de producto:** ahora muestra solo datos reales (stock, precio, descripción y fotos cargadas). Se quitaron los descuentos por volumen, el corte a medida y las especificaciones inventadas del prototipo.

---

## 🚀 Despliegue

- Repositorio en GitHub (`labora-campus/bertolin`, rama `main`) conectado a Vercel.
- Gestor de paquetes: **pnpm 12.3.4** (Vercel usa `pnpm-lock.yaml`; si se agrega una dependencia, hay que regenerarlo con `pnpm install`).
- Variables de entorno necesarias en Vercel y en `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER` (opcional; con código de país y sin espacios, ej. `5491144556677`)
- En Supabase → Authentication → URL Configuration: agregar el dominio de Vercel como Site URL.

---

## ⏳ Pendiente

1. **Cargar el catálogo real (~150 productos)** desde Admin → Productos → *Importar CSV*
   - Columnas: `sku, nombre, categoria, precio, stock, descripcion, imagen_url` (ver `docs/productos-ejemplo.csv`).
   - El precio es el final con IVA incluido. `imagen_url` puede ir vacío y subirse luego desde el panel.
   - Si el SKU ya existe, se actualiza en lugar de duplicarse.
2. **Subir las fotos de los productos** (desde el panel, producto por producto, o con un script si se nombran por SKU).
3. **Datos del negocio a confirmar:** alias y CUIT para transferencias, teléfono de asistencia, número de WhatsApp y datos del pie de página (algunos vienen del prototipo).
4. **Categorías de la portada:** las 8 categorías de la grilla están escritas en el código; conviene conectarlas a la tabla `categories`.
5. **Emails de confirmación** al cliente (pedido recibido, pago confirmado, despachado). Requiere elegir proveedor (Resend, SMTP, etc.).
6. **Mejoras opcionales:** reserva de stock al crear el pedido, quitar `ignoreBuildErrors` de `next.config.mjs` (el código ya compila sin errores de tipos), cuentas de cliente e historial de pedidos.
