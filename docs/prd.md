# Papelera Bertolín — Tienda Online — Documento Maestro del Proyecto

> Versión: 1.0
> Fecha: Octubre 2026
> Autor: Brandon Candia para Papelera Bertolín
> Estado: En desarrollo (prototipo aceptado, ajustes en curso)

---

## 1. El Problema

Papelera Bertolín es un distribuidor mayorista y minorista de papel para gráfica y librerías, fundado en 1980. Tiene más de 5 depósitos en Santa Rita (CABA), taller propio de corte a medida y flota de camiones propia. Tiene una cartera de clientes recurrentes (imprentas, librerías, empresas), pero hoy todo el circuito de venta es manual: los pedidos entran por teléfono (la web publica 6 líneas distintas) y por WhatsApp.

Su web actual es institucional. Muestra la historia, los servicios y los tipos de papel, pero no permite ver precios, stock ni comprar. Cada consulta de precio o disponibilidad ocupa a una persona al teléfono, y cada pedido se anota y se cobra a mano.

Además, vende en todo el país, pero sin un canal online la venta fuera de AMBA depende de que el cliente llame o escriba. El negocio necesita un canal que reciba pedidos las 24 horas, ordenado y con seguimiento, sin sumar gente al teléfono.

---

## 2. La Solución

Una tienda online propia, con diseño a medida de la marca, donde cualquier cliente pueda explorar el catálogo, armar su pedido, pagar por transferencia y subir el comprobante. Detrás hay un panel de administración donde Bertolín gestiona productos, stock, precios, envíos, banners y pedidos sin depender de un técnico.

- Catálogo de ~150 productos en 8 categorías, con variantes (marca, medida, gramaje, cantidad de hojas)
- Portada con carrusel de ofertas y promociones, estilo marketplace
- Compra como invitado, sin registro
- Pago por transferencia bancaria con carga de comprobante en la propia tienda
- Seguimiento del pedido por WhatsApp con el detalle y el número de pedido
- Cotización de cortes a medida a través de un botón de WhatsApp
- Panel admin con notificación de pedidos nuevos, revisión de comprobantes y cambio de estados

---

## 3. Usuario Objetivo

### Usuario primario
**Cliente comprador (imprentas, librerías, empresas y consumidor final).** Compra papel en cantidad, sabe exactamente qué busca (gramaje, medida) y valora la claridad más que la creatividad. Muchos no son usuarios muy digitalizados. Compra desde celular y desde computadora. Hoy resuelve todo llamando o escribiendo por WhatsApp.

### Usuario administrador
**Personal de Bertolín que opera la tienda** (el dueño u otra persona de la oficina). No es técnico. Necesita cargar productos, ajustar stock y precios, configurar costos de envío, revisar comprobantes y cambiar estados de pedidos de forma sencilla.

### Usuarios secundarios (fase 2+)
- **Clientes mayoristas con usuario y contraseña**, que al ingresar ven precios diferenciados.
- Equipo de logística o depósito, si más adelante se suman roles al panel.

---

## 4. Propuesta de Valor

> "El catálogo completo de Bertolín, abierto las 24 horas: el cliente arma su pedido, paga y lo sigue, sin llamar."

- **Simple:** comprar en pocos pasos, sin registrarse
- **Confiable:** la identidad de una empresa familiar con más de 40 años, trasladada a lo digital
- **Autónomo:** el admin carga y gestiona todo sin ayuda técnica
- **Ordenado:** cada pedido tiene estado, comprobante y número de seguimiento
- **A medida:** los cortes especiales y las compras grandes siguen yendo por atención personalizada vía WhatsApp

---

## 5. Funcionalidades

### MVP — Fase 1

**⭐ Tienda pública**
- Portada con **carrusel de slides** de ofertas y promociones (el slide principal es una oferta destacada), con las categorías y productos destacados debajo
- Navegación por las 8 categorías: Resmitas, Obra en papel plano, Cartulinas color, Cartulinas pesadas, Cartón gris, Autoadhesivos, Papel kraft, Sobres comerciales
- Buscador de productos y filtros
- Ficha de producto con imágenes, descripción, precio y stock disponible, y selector de variante (marca, medida, gramaje, cantidad de hojas)
- Carrito de compras
- Un único precio por producto (sin diferenciación mayorista/minorista en esta fase)
- Botón de WhatsApp para **pedir cotización de cortes a medida**
- Botón de WhatsApp siempre visible para consultas
- Diseño responsive, pensado primero para celular
- Identidad visual: se mantiene la tipografía y el estilo del prototipo aprobado, incorporando los colores del logo *[pendiente: logo / códigos de color]*

**⭐ Flujo de compra (como invitado)**

1. **Carrito.**
2. **Finalizar compra.** El cliente completa sus datos y el código postal. Se calcula el costo de envío según la zona. *[Datos exactos a pedir: a confirmar]*
3. **"Gracias por tu compra".** Se muestran el número de pedido y los datos de la cuenta bancaria para hacer la transferencia. Más abajo, un campo para **subir el comprobante** y un botón **"Enviar comprobante"**.
4. **Popup de confirmación** al enviar el comprobante: avisa que el pedido está por confirmarse y ofrece dos botones.
   - **"Hacer seguimiento de mi pedido":** abre WhatsApp con un mensaje ya armado que incluye todo lo que pidió y el número de seguimiento.
   - Segundo botón: *[a confirmar, por ejemplo "Volver a la tienda"]*.

**⭐ Estados del pedido**

| Estado | Cuándo ocurre | Quién lo cambia |
|--------|---------------|-----------------|
| Pendiente de pago | El cliente finaliza la compra | Automático |
| En revisión | El cliente sube el comprobante y presiona "Enviar comprobante" | Automático |
| Pago confirmado | El admin revisa el comprobante en el panel y lo valida | Admin |
| Cancelado | Pasan **6 horas** sin que se suba el comprobante | Automático |

**⭐ Panel de administración**
- Login de administrador
- **Notificación de pedido nuevo** apenas un cliente finaliza la compra
- Sección **Pedidos:** listado con estados y filtros, detalle del pedido, visualización del comprobante subido y cambio de estado a "Pago confirmado"
- **Gestión de productos y variantes:** alta, edición y baja, con precio, stock, categoría e imágenes
- **Gestión de categorías**
- **Gestión de stock** con aviso de stock bajo
- **Configuración de envíos:** tabla de costos por zona o código postal, editable de forma sencilla desde el panel *[tabla pendiente de Pablo]*
- **Gestión de banners del carrusel** de la portada (imagen, texto, enlace, orden y activación)
- Comprobante o resumen del pedido para el cliente *[contenido a confirmar]*

**⭐ Carga inicial del catálogo**
- Carga de los ~150 productos con sus variantes (servicio incluido en el presupuesto)
- Productos de arranque ya recibidos de Pablo (resmas): Punax A4 75 g x 500 hojas, Autor A4 80 g x 500 hojas, Boreal oficio 75 g x 500 hojas, Pampa 22x34 70 g x 500 hojas y Chamex color A4 75 g x 500 hojas. La Resma Autor A4 80 g apareció repetida en el listado original de Pablo, por lo que serían 5 productos distintos *[a confirmar]*

### Fase 2

- **Precios mayoristas:** usuario y contraseña entregados por Bertolín a cada cliente mayorista; al ingresar, los precios se ajustan automáticamente
- Más medios de pago: Mercado Pago / tarjeta y pago contraentrega (ver "Fuera de alcance")
- **Notificaciones al cliente** cuando el pedido se despacha (estado "Enviado" y "Entregado")
- Carga masiva de productos por Excel/CSV *[a confirmar si entra en Fase 1]*
- Facturación fuera del sistema por ahora; evaluar emisión desde la tienda más adelante

### Fase 3

- Portal B2B para mayoristas: historial de compras, recompras y pedidos recurrentes
- Cotizador automático de cortes a medida
- Asistente de WhatsApp con IA para consultas de stock y precio
- Dashboard de ventas y stock unificado por depósito

---

## 6. Roadmap de Desarrollo

| Etapa | Nombre | Entregable | Tiempo estimado |
|-------|--------|------------|-----------------|
| 1 | Idea & Validación | Propuesta aceptada, reunión con el cliente, prototipo aprobado | ✅ Hecho |
| 2 | Documento maestro | Este PRD validado con el cliente | Semana 1 |
| 3 | Diseño UI | Ajustes del prototipo: carrusel de ofertas, colores del logo, flujo de compra | Semana 1-2 |
| 4 | Base de Datos | Productos con variantes, pedidos, comprobantes, banners, zonas de envío | Semana 2 |
| 5 | Desarrollo de la tienda | Catálogo, carrito, checkout, gracias + comprobante, WhatsApp | Semana 2-4 |
| 6 | Panel de administración | Pedidos, productos, stock, envíos, banners, notificaciones | Semana 3-5 |
| 7 | Carga del catálogo | ~150 productos con imágenes y variantes | Semana 5-6 |
| 8 | Pruebas y ajustes | Pruebas con el cliente, correcciones | Semana 6 |
| 9 | Deploy y capacitación | Dominio, hosting, puesta en producción, capacitación al admin | Semana 7 |

*[Tiempos tentativos: ajustar y fijar fechas por sprint al hacer el kickoff]*

---

## 7. Alcance y Entregables

### Entregables incluidos
- Diseño y desarrollo completo de la tienda online (ajustes sobre el prototipo aprobado)
- Carrusel de ofertas y promociones en la portada
- Flujo de compra como invitado con pago por transferencia y carga de comprobante
- Panel de administración (pedidos, productos, categorías, stock, envíos, banners)
- Botones de WhatsApp (seguimiento de pedido, cotización de cortes a medida, consultas)
- Carga inicial de los ~150 productos
- Puesta en producción, configuración de dominio y hosting
- Documentación y 1-2 reuniones de capacitación; acceso a materiales por Drive

### Fuera de alcance
- **Mercado Pago / tarjeta y pago contraentrega:** la propuesta original los incluía, pero el cliente confirmó que por ahora solo acepta transferencia bancaria. *[A confirmar por escrito con el cliente: si pasan a una segunda etapa y si se suman al presupuesto o se cobran aparte]*
- Precios diferenciados mayorista/minorista (Fase 2)
- Emisión de facturas electrónicas desde la tienda (se hacen por fuera)
- Notificaciones de despacho al cliente (Fase 2)
- Cotizador automático de cortes a medida (se resuelve por WhatsApp)
- Producción de fotografías de producto y del logo (el cliente debe proveerlos)

### Condiciones de entrega
- Criterio de aceptación: el flujo completo funciona de punta a punta (carrito → checkout → comprobante → revisión → pago confirmado) y el admin puede operar el panel sin ayuda
- Entregas por sprints semanales con demo
- Comunicación por WhatsApp y reunión semanal fija
- 1 mes de garantía de ajustes sin cargo tras la entrega

### Honorarios y forma de pago
| Concepto | Monto |
|----------|-------|
| Desarrollo de la tienda online | $650.000 ARS |
| Carga de catálogo (150+ productos) | $100.000 ARS |
| **Total** | **$750.000 ARS** |

- Estructura de pago: 50% de adelanto ($375.000 ARS, **abonado**) y 50% al finalizar el desarrollo ($375.000 ARS)
- **Mantenimiento mensual** posterior a la garantía: $35.000 ARS/mes (soporte, actualizaciones de seguridad, cambios menores, monitoreo y carga de nuevos productos)
- **Costos de terceros, a cargo del cliente:** dominio (USD 10-20 por año según disponibilidad) y hosting (USD 84 por año)

---

## 8. Estrategia de Lanzamiento del Cliente

### Plan de onboarding
- Bertolín entrega logo, fotos de productos, catálogo con variantes, datos bancarios para transferencias, número de WhatsApp para pedidos y la tabla de costos de envío
- Se define quién del equipo opera el panel día a día
- Se publica primero con un grupo reducido de productos y clientes de confianza, y luego se abre al catálogo completo

### Capacitación
- 1-2 reuniones de capacitación sobre: carga y edición de productos, stock, banners, tabla de envíos y revisión de comprobantes
- Manual corto de uso del panel

### Hitos post-entrega
- 1 mes de garantía de ajustes
- Mantenimiento mensual con contacto regular
- Revisión de datos de uso (productos más vistos, abandono de carrito) para proponer mejoras
- Primera mejora natural: precios mayoristas con usuario y contraseña
- Fecha clave: la vuelta a clases (febrero-marzo) es el pico de ventas del rubro, así que conviene tener la tienda funcionando antes

---

## 9. Competencia

| Competidor | Problema |
|-----------|----------|
| Venta telefónica / WhatsApp (situación actual de Bertolín) | Depende de personas, no escala, sin registro ordenado de pedidos |
| Mercado Libre | Compite por precio, comisiones altas, el cliente no queda en la base del negocio |
| Otras papeleras con web institucional | Solo catálogo informativo, sin compra ni precios online |

La ventaja de esta tienda es que le da a Bertolín un canal propio, con su identidad y sus condiciones, donde el cliente compra a cualquier hora y el negocio mantiene la relación y los datos. A diferencia de un marketplace, los cortes a medida y las compras grandes conservan la atención personalizada que es el sello de la empresa.

---

## 10. Métricas Clave (KPIs)

### Para el cliente
- Cantidad de pedidos online por semana y por mes
- Ticket promedio
- Porcentaje de pedidos que suben comprobante vs. los cancelados a las 6 horas
- Tiempo desde que se sube el comprobante hasta que se confirma el pago
- Productos y categorías más vendidos
- Consultas de cotización de cortes a medida recibidas por WhatsApp
- Reducción de llamadas y consultas manuales para pedidos simples

### Del proyecto
- Entregas por sprint cumplidas en fecha
- Catálogo cargado (% de los ~150 productos)
- Pedidos de ajustes post-entrega

---

## 11. Próximos Pasos Inmediatos

- [ ] Confirmar con Pablo, por escrito, que por ahora solo hay transferencia y qué pasa con Mercado Pago y contraentrega (etapa 2, costo)
- [ ] Verificar el nombre del contacto del cliente (figura como "Pablo Ascención" en la propuesta y "Pablo Aser" en el chat); el cliente es Papelera Bertolín
- [ ] Pedir a Pablo: logo en buena calidad (PNG/SVG) o códigos de color de la marca
- [ ] Pedir a Pablo: tabla de costos de envío por zona o código postal
- [ ] Pedir a Pablo: datos bancarios para transferencias y número de WhatsApp para los pedidos
- [ ] Pedir a Pablo: listado de productos con variantes (planilla) y fotos
- [ ] Definir qué datos pide el checkout (nombre, teléfono, dirección, CUIT / razón social si hace falta) y qué dice el comprobante
- [ ] Definir qué pasa si el admin rechaza un comprobante, y si el cliente sube el comprobante después de las 6 horas
- [ ] Confirmar si el stock se reserva al finalizar la compra y se libera al cancelar
- [ ] Confirmar si el stock se lleva como un número total por producto (recomendado para empezar)
- [ ] Armar los slides del carrusel con promociones de ejemplo hasta que haya ofertas reales
- [ ] Definir roadmap por sprints con fechas y agendar el kickoff
- [ ] Diseñar la base de datos y pasar a construir las pantallas del panel

---

*Documento generado como base para desarrollo. Actualizar con cada iteración del producto.*