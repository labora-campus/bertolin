# Estado de Avance del Proyecto: Papelera Bertolín

## 🚀 Fase 1 Completada: Interfaz de Usuario y Prototipado Interactivo

Hemos finalizado toda la maqueta visual y el flujo de navegación de la plataforma, logrando un equilibrio entre el "Minimalismo Editorial" que representa los 40 años de la marca y las mejores prácticas de conversión de E-commerce.

### 1. Tienda Pública (Storefront)
- **Diseño General:** Implementación de paleta de colores Material Design 3 (Vino tinto y Ámbar).
- **Inicio (`/`):** 
  - Carrusel de Banners de alto impacto (estilo Mercado Libre).
  - Grilla de categorías.
  - Filtrado dinámico funcional: al hacer clic en las categorías, el catálogo de abajo se filtra automáticamente y scrollea suavemente.
- **Catálogo (`/productos`):** 
  - Rediseño enfocado en E-commerce premium. 
  - Cabecera con gradiente de marca y destacados.
  - Barra lateral de filtros limpia e interactiva.
  - Tarjetas de producto simplificadas sin saturación visual.
- **Detalle de Producto (`/productos/[id]`):** 
  - Vista de producto individual conectada dinámicamente con una base de datos local simulada (Prototipo Fase 1). Muestra información real (título, precio, imagen, SKU, categoría) específica del producto seleccionado.
  - Se agregaron productos reales extraídos de Mercado Libre (Ej: Resma Autor A4 y Boreal Oficio Blanco) para probar el flujo de datos.
- **Carrito de Compras:** Cajón lateral (Drawer) funcional que permite sumar productos y calcula el subtotal.
- **Checkout:** Flujo de compra como invitado implementado visualmente (formulario de datos, cálculo de envío simulado, y pantalla para subir comprobante de transferencia bancaria).

### 2. Panel de Administración (`/admin`)
- **Layout y Navegación:** Barra lateral colapsable, diseño de Dashboard estadístico.
- **Módulo de Pedidos:** 
  - Tabla de últimos pedidos con filtros de estados.
  - **Modal de Detalle:** Implementado visualmente para poder revisar qué compró el cliente, datos de contacto, dirección y estado del comprobante.
- **Módulo de Productos:** 
  - Grilla de stock.
  - **Modal de Nuevo Producto:** Formulario de alta completo estructurado (foto, precio, SKU, categoría).
- **Otros Módulos Creados:** Páginas de gestión preparadas para Categorías, Envíos y Banners.

---

## ✅ Fase 2 (en curso): Backend con Supabase

Hecho:
- Tienda, checkout y panel admin leen/escriben en Supabase (sin datos simulados).
- Login admin con Supabase Auth (rol `admin` en app_metadata) y RLS en todas las tablas (`supabase/rls.sql`).
- Pedidos de invitados vía RPC `create_order` (recalcula precios y envío en el servidor) y `attach_receipt` (`supabase/shipping-and-orders.sql`).
- Admin de productos: alta, edición, baja, subida de imagen a Storage e importación por CSV (`docs/productos-ejemplo.csv`).
- Envíos por zona/código postal y banners administrables desde el panel.

SQL a ejecutar en orden: `rls.sql`, `storage-products.sql`, `shipping-and-orders.sql`, `stock-and-private-receipts.sql`.

## ⏳ Pendiente
1. Importar el catálogo real (~150 productos) por CSV y subir imágenes.
2. Emails de confirmación al cliente (pedido recibido, pago confirmado, despachado).
3. Pruebas end-to-end (login, compra de invitado, cambio de estado).
