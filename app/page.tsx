'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Box,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  FileText,
  Filter,
  Grid3X3,
  LayoutDashboard,
  Menu,
  Minus,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users,
  X,
  Zap,
} from 'lucide-react'

type Product = {
  id: number
  name: string
  category: string
  detail: string
  price: number
  oldPrice?: number
  stock: number
  color: string
  tag?: string
  image: string
}

const categories = [
  ['Resmitas', 'Oficio y presentación'],
  ['Obra en papel plano', 'Formatos para gráfica'],
  ['Cartulinas color', 'Color y creatividad'],
  ['Cartulinas pesadas', 'Terminaciones premium'],
  ['Cartón gris', 'Base y encuadernación'],
  ['Autoadhesivos', 'Etiquetas y stickers'],
  ['Papel kraft', 'Embalaje y despacho'],
  ['Sobres comerciales', 'Correspondencia'],
]

const products: Product[] = [
  { id: 1, name: 'Resma Boreal A4', category: 'Resmitas', detail: '75 gr · 210 × 297 mm · 500 hojas', price: 8750, oldPrice: 10100, stock: 48, color: 'Blanco', tag: 'Oferta', image: 'paper-white' },
  { id: 2, name: 'Obra blanco natural', category: 'Obra en papel plano', detail: '80 gr · 65 × 95 cm · 100 hojas', price: 22400, stock: 22, color: 'Blanco natural', image: 'paper-stack' },
  { id: 3, name: 'Cartulina color surtida', category: 'Cartulinas color', detail: '180 gr · 50 × 70 cm · Pack x 10', price: 11900, stock: 14, color: 'Surtido', tag: 'Más pedido', image: 'color-paper' },
  { id: 4, name: 'Cartulina ilustración', category: 'Cartulinas pesadas', detail: '300 gr · 70 × 100 cm · Pack x 25', price: 39800, stock: 8, color: 'Blanco', image: 'cardboard' },
  { id: 5, name: 'Cartón gris encuadernación', category: 'Cartón gris', detail: '2 mm · 72 × 102 cm · Pack x 10', price: 18200, stock: 5, color: 'Gris', image: 'grey-board' },
  { id: 6, name: 'Autoadhesivo mate', category: 'Autoadhesivos', detail: '90 gr · 65 × 95 cm · Pack x 25', price: 28900, stock: 19, color: 'Blanco', image: 'sticker' },
]

const money = (value: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value)

function PaperVisual({ type }: { type: string }) {
  return <div className={`paper-visual ${type}`} aria-hidden="true"><span /></div>
}

export default function Page() {
  const [admin, setAdmin] = useState(false)
  const [category, setCategory] = useState('Todos')
  const [cart, setCart] = useState<Product[]>([products[0]])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [orderSent, setOrderSent] = useState(false)

  const filtered = useMemo(() => products.filter((p) => (category === 'Todos' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase())), [category, search])
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const addToCart = (product: Product) => {
    setCart((current) => [...current, product])
    setCartOpen(true)
  }

  if (admin) return <Admin onBack={() => setAdmin(false)} />

  return (
    <main className="site-shell">
      <div className="top-strip"><div className="page-width top-strip-inner"><span><Truck size={14} /> Envíos a todo el país · Logística propia en AMBA</span><span className="top-hide">Atención mayorista: (011) 4201-1180</span></div></div>
      <header className="header page-width">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú"><Menu /></button>
        <div className="brand" onClick={() => { setCategory('Todos'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}><div className="brand-mark">PB</div><div><strong>Papelera<br />Bertolín</strong><small>Desde 1980</small></div></div>
        <nav className={menuOpen ? 'main-nav mobile-nav' : 'main-nav'}><button onClick={() => { setCategory('Todos'); setMenuOpen(false) }}>Productos</button><button onClick={() => { document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }}>Servicios</button><button onClick={() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })}>La empresa</button><button>Contacto</button></nav>
        <div className="header-actions"><div className="search-wrap"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar productos..." aria-label="Buscar productos" /></div><button className="icon-button" onClick={() => setCartOpen(true)} aria-label="Abrir carrito"><ShoppingCart /><span>{cart.length}</span></button></div>
      </header>

      <section className="hero page-width"><div className="hero-copy"><p className="eyebrow">PAPEL PARA HACERLO POSIBLE</p><h1>Todo el papel que<br /><em>tu negocio necesita.</em></h1><p className="hero-text">Distribución mayorista y minorista para imprentas, librerías y empresas. Más de 40 años acompañando tus proyectos.</p><div className="hero-actions"><button className="button primary" onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}>Ver catálogo <ArrowRight size={16} /></button><button className="button ghost" onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}>Conocé nuestros servicios</button></div><div className="hero-proof"><span><Check size={15} /> Stock permanente</span><span><Check size={15} /> Corte a medida</span><span><Check size={15} /> Entrega propia</span></div></div><div className="hero-art"><div className="hero-paper one" /><div className="hero-paper two" /><div className="hero-paper three" /><div className="hero-stamp">DESDE<br /><b>1980</b></div></div></section>

      <section className="category-section page-width"><div className="section-heading"><div><p className="eyebrow">ENCONTRÁ LO QUE BUSCÁS</p><h2>Comprar por categoría</h2></div><button className="text-button" onClick={() => setCategory('Todos')}>Ver todo <ChevronRight size={16} /></button></div><div className="category-grid">{categories.map(([name, sub], i) => <button key={name} className="category-card" onClick={() => { setCategory(name); document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }) }}><span className={`category-number n${i + 1}`}>0{i + 1}</span><strong>{name}</strong><small>{sub}</small><ChevronRight size={17} /></button>)}</div></section>

      <section id="catalogo" className="catalog-section"><div className="page-width"><div className="section-heading catalog-heading"><div><p className="eyebrow">CATÁLOGO ONLINE</p><h2>{category === 'Todos' ? 'Productos destacados' : category}</h2></div><div className="catalog-tools"><span className="result-count">{filtered.length} productos</span><button className="filter-button"><Filter size={15} /> Filtros <ChevronDown size={15} /></button></div></div><div className="catalog-layout"><aside className="filter-panel"><strong>Categorías</strong><button className={category === 'Todos' ? 'active' : ''} onClick={() => setCategory('Todos')}>Todos los productos <span>24</span></button>{categories.map(([name]) => <button key={name} className={category === name ? 'active' : ''} onClick={() => setCategory(name)}>{name}<span>3</span></button>)}<div className="cut-callout"><Zap size={17} /><strong>¿Necesitás una medida especial?</strong><p>Consultá por nuestro servicio de corte a medida.</p><button onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}>Conocer servicio <ArrowRight size={14} /></button></div></aside><div className="products-grid">{filtered.map((product) => <article className="product-card" key={product.id}><div className="product-image">{product.tag && <span className="product-tag">{product.tag}</span>}<PaperVisual type={product.image} /><button className="quick-add" onClick={() => addToCart(product)} aria-label={`Agregar ${product.name}`}><Plus /></button></div><div className="product-info"><span className="product-category">{product.category}</span><h3>{product.name}</h3><p>{product.detail}</p><div className="product-bottom"><div><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}<small><span className="stock-dot" /> {product.stock} disponibles</small></div><button className="add-button" onClick={() => addToCart(product)}>Agregar</button></div></div></article>)}</div></div></div></section>

      <section id="servicios" className="services page-width"><div className="service-intro"><p className="eyebrow">MÁS QUE PAPEL</p><h2>Resolvemos lo que tu negocio necesita.</h2><p>Desde una resma hasta una compra industrial. Te asesoramos para que elijas el material correcto y lo recibas donde lo necesitás.</p></div><div className="service-list"><div><span className="service-icon"><Zap /></span><div><strong>Corte a medida</strong><p>Medidas especiales, cortes precisos y terminación prolija.</p></div></div><div><span className="service-icon"><Truck /></span><div><strong>Logística propia</strong><p>Entregamos en AMBA con nuestra propia flota de camiones.</p></div></div><div><span className="service-icon"><Users /></span><div><strong>Atención personalizada</strong><p>Asesoramiento para compras mayoristas y proyectos especiales.</p></div></div></div></section>

      <section id="nosotros" className="trust-band"><div className="page-width trust-inner"><div><p className="eyebrow">PAPELERA BERTOLÍN</p><h2>Una empresa familiar,<br />un servicio de siempre.</h2></div><div className="trust-copy"><p>Desde 1980 trabajamos junto a imprentas, librerías y empresas de todo el país. Contamos con más de 5 depósitos y una flota propia para que nunca te falte el papel.</p><button className="button light">Conocer la empresa <ArrowRight size={16} /></button></div></div></section>

      <footer><div className="page-width footer-inner"><div className="brand footer-brand"><div className="brand-mark">PB</div><div><strong>Papelera Bertolín</strong><small>Desde 1980 · Buenos Aires, Argentina</small></div></div><div className="footer-contact"><span>¿Tenés una consulta?</span><a href="https://wa.me/5491142011180">Escribinos por WhatsApp <ArrowRight size={15} /></a></div><div className="footer-bottom"><span>© 2024 Papelera Bertolín. Todos los derechos reservados.</span><button onClick={() => setAdmin(true)}><Settings size={14} /> Acceso administrador</button></div></div></footer>

      <button className="whatsapp-float" aria-label="Contactar por WhatsApp" onClick={() => window.open('https://wa.me/5491142011180', '_blank')}><span>¿Necesitás ayuda?</span><strong>WhatsApp</strong></button>
      {cartOpen && <CartDrawer cart={cart} total={total} onClose={() => setCartOpen(false)} onCheckout={() => { setCartOpen(false); setCheckout(true) }} onRemove={(index) => setCart((current) => current.filter((_, i) => i !== index))} />}
      {checkout && <Checkout total={total} onClose={() => setCheckout(false)} onDone={() => { setCheckout(false); setOrderSent(true) }} />}
      {orderSent && <div className="success-overlay"><div className="success-card"><div className="success-icon"><Check /></div><p className="eyebrow">PEDIDO RECIBIDO</p><h2>¡Gracias por elegirnos!</h2><p>Te contactaremos para confirmar disponibilidad y coordinar la entrega.</p><button className="button primary" onClick={() => setOrderSent(false)}>Volver a la tienda</button></div></div>}
    </main>
  )
}

function CartDrawer({ cart, total, onClose, onCheckout, onRemove }: { cart: Product[]; total: number; onClose: () => void; onCheckout: () => void; onRemove: (i: number) => void }) { return <div className="overlay"><aside className="cart-drawer"><div className="drawer-header"><div><p className="eyebrow">TU COMPRA</p><h2>Carrito <span>({cart.length})</span></h2></div><button onClick={onClose} aria-label="Cerrar carrito"><X /></button></div><div className="cart-items">{cart.length ? cart.map((item, i) => <div className="cart-item" key={`${item.id}-${i}`}><PaperVisual type={item.image} /><div><strong>{item.name}</strong><p>{item.detail}</p><b>{money(item.price)}</b></div><button onClick={() => onRemove(i)} aria-label="Quitar producto"><X /></button></div>) : <div className="empty-cart"><ShoppingCart size={28} /><p>Tu carrito está vacío.</p></div>}</div>{cart.length > 0 && <div className="cart-summary"><div><span>Subtotal</span><strong>{money(total)}</strong></div><small>Envío a coordinar según localidad</small><button className="button primary full" onClick={onCheckout}>Continuar compra <ArrowRight size={16} /></button><button className="continue-button" onClick={onClose}>Seguir comprando</button></div>}</aside></div> }

function Checkout({ total, onClose, onDone }: { total: number; onClose: () => void; onDone: () => void }) { const [method, setMethod] = useState('contraentrega'); return <div className="overlay"><div className="checkout-modal"><button className="modal-close" onClick={onClose}><X /></button><div className="checkout-progress"><span className="done">1</span><i /><span className="current">2</span><i /><span>3</span></div><p className="eyebrow">FINALIZAR PEDIDO</p><h2>Datos de entrega</h2><p className="modal-subtitle">Completá tus datos y elegí cómo querés pagar.</p><div className="checkout-fields"><label>Nombre y apellido<input placeholder="Ej. Juan Pérez" /></label><label>WhatsApp o teléfono<input placeholder="Ej. 11 5555 5555" /></label><label className="wide">Dirección de entrega<input placeholder="Calle, número, localidad" /></label></div><div className="payment-title">Medio de pago</div><div className="payment-options"><button className={method === 'contraentrega' ? 'selected' : ''} onClick={() => setMethod('contraentrega')}><span className="payment-radio">{method === 'contraentrega' && <Check size={12} />}</span><span><strong>Pago contraentrega</strong><small>Coordinamos el pago al recibir tu pedido</small></span><Truck /></button><button className={method === 'online' ? 'selected' : ''} onClick={() => setMethod('online')}><span className="payment-radio">{method === 'online' && <Check size={12} />}</span><span><strong>Pago online</strong><small>Tarjeta de crédito o débito</small></span><Box /></button></div><div className="checkout-total"><span>Total estimado</span><strong>{money(total)}</strong></div><button className="button primary full" onClick={onDone}>Confirmar pedido <ArrowRight size={16} /></button></div></div> }

function Admin({ onBack }: { onBack: () => void }) { const [tab, setTab] = useState('Resumen'); return <main className="admin-shell"><aside className="admin-sidebar"><div className="brand admin-brand"><div className="brand-mark">PB</div><div><strong>Papelera<br />Bertolín</strong><small>Panel de gestión</small></div></div><nav>{[['Resumen', LayoutDashboard], ['Productos', Package], ['Pedidos', ClipboardList], ['Categorías', Grid3X3], ['Clientes', Users]].map(([label, Icon]) => <button className={tab === label ? 'selected' : ''} key={label as string} onClick={() => setTab(label as string)}><Icon size={18} />{label as string}</button>)}</nav><button className="back-store" onClick={onBack}><ArrowRight size={16} /> Ver tienda</button></aside><section className="admin-content"><header className="admin-header"><div><p className="eyebrow">PANEL DE ADMINISTRACIÓN</p><h1>{tab}</h1></div><div className="admin-user"><span>AB</span><div><strong>Administrador</strong><small>Sesión activa</small></div><ChevronDown size={16} /></div></header>{tab === 'Resumen' ? <><div className="stats-grid"><div className="stat-card"><span>Pedidos este mes</span><strong>128</strong><small className="positive">+12,5% vs. mes anterior</small><ClipboardList /></div><div className="stat-card"><span>Ventas del mes</span><strong>$ 4.820.500</strong><small className="positive">+8,2% vs. mes anterior</small><FileText /></div><div className="stat-card warning"><span>Stock bajo</span><strong>8</strong><small>Productos requieren atención</small><Package /></div><div className="stat-card"><span>Clientes activos</span><strong>342</strong><small>23 nuevos este mes</small><Users /></div></div><div className="admin-grid"><div className="admin-panel"><div className="panel-heading"><div><h2>Pedidos recientes</h2><p>Últimos movimientos de la tienda</p></div><button>Ver todos <ArrowRight size={14} /></button></div><table><thead><tr><th>Pedido</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th></tr></thead><tbody>{[['#PB-1048','Gráfica Sur','Hoy, 10:42','$ 86.400','Nuevo'],['#PB-1047','Librería El Ateneo','Ayer, 16:20','$ 142.800','En preparación'],['#PB-1046','Imprenta Norte','Ayer, 11:05','$ 318.500','Entregado'],['#PB-1045','María González','12 Jun, 14:30','$ 24.600','Entregado']].map((r) => <tr key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><span className={`status ${r[4].replace(' ', '-').toLowerCase()}`}>{r[4]}</span></td></tr>)}</tbody></table></div><div className="admin-panel stock-panel"><div className="panel-heading"><div><h2>Stock bajo</h2><p>Reponer pronto</p></div><button>Ver stock <ArrowRight size={14} /></button></div>{[['Cartón gris 2 mm','5 unidades','critical'],['Cartulina ilustración 300 gr','8 unidades','low'],['Sobre comercial oficio','12 unidades','low'],['Papel kraft 80 gr','15 unidades','low']].map((r) => <div className="stock-row" key={r[0]}><span className={`stock-bar ${r[2]}`} /><div><strong>{r[0]}</strong><small>{r[1]}</small></div><ChevronRight size={16} /></div>)}</div></div></> : <div className="admin-panel placeholder-admin"><Package size={30} /><h2>Gestión de {tab.toLowerCase()}</h2><p>Esta vista está lista para conectar con el catálogo real.</p><button className="button primary" onClick={() => setTab('Resumen')}>Volver al resumen</button></div>}</section></main> }
