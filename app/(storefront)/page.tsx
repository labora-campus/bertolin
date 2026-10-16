'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProductCard } from '@/components/product/ProductCard'
import { BannerCarousel } from '@/components/home/BannerCarousel'
import { supabase } from '@/lib/supabase'

export default function Page() {
  const [selectedCat, setSelectedCat] = useState<string>('Todos')
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    async function loadFeatured() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, categories(name)')
          .eq('is_active', true)
          .order('is_featured', { ascending: false })
          .limit(8)

        if (!error && data && data.length > 0) {
          setProducts(data.map((p: any) => ({
            id: p.slug || p.id,
            cat: p.categories?.name || 'General',
            title: p.name,
            desc: p.specs || p.description || '',
            price: Number(p.price),
            stock: p.stock > 0 ? `${p.stock} disp.` : 'Consultar',
            tag: p.tag || '',
            img: (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop'
          })))
        }
      } catch (e) {
        console.error('Error fetching featured products:', e)
      }
    }
    loadFeatured()
  }, [])

  const filteredProducts = selectedCat === 'Todos' 
    ? products 
    : products.filter(p => p.cat.toLowerCase() === selectedCat.toLowerCase())

  const handleCategoryClick = (catTitle: string) => {
    setSelectedCat(catTitle)
    // Scroll smoothly to catalog section
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="w-full pt-[132px] bg-surface min-h-[calc(100vh-280px)]">
      {/* HERO CAROUSEL SECTION */}
      <BannerCarousel />

      {/* CATEGORY GRID */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter">
          <div className="flex items-baseline justify-between mb-space-lg">
            <div>
              <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase tracking-widest block mb-space-xs">
                Encontrá lo que buscás
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Comprar por categoría
              </h2>
            </div>
            <Link className="font-label-md text-label-md text-primary hover:text-primary-container flex items-center gap-space-xs transition-colors" href="/productos">
              <span>Ver todo el catálogo</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {[
              { id: '01', title: 'Resmitas', desc: 'Oficio, A4 y presentación' },
              { id: '02', title: 'Obra en papel plano', desc: 'Formatos 65×95, 82×118' },
              { id: '03', title: 'Cartulinas color', desc: 'Color y creatividad' },
              { id: '04', title: 'Cartulinas pesadas', desc: 'Triplex, ilustración, encapadas' },
              { id: '05', title: 'Cartón gris', desc: 'Base y encuadernación 1.5 a 3mm' },
              { id: '06', title: 'Autoadhesivos', desc: 'Etiquetas, fasones y OPP' },
              { id: '07', title: 'Papel kraft', desc: 'Embalaje y bobinas puras' },
              { id: '08', title: 'Sobres comerciales', desc: 'Bolsa, carta y fuelles' },
            ].map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => handleCategoryClick(cat.title)}
                className="group bg-surface-container-lowest hover:bg-surface-container-low p-space-md rounded-lg shadow-sm transition-all flex flex-col justify-between h-36 text-left w-full border border-transparent hover:border-primary/20"
              >
                <div className="flex items-start justify-between w-full">
                  <span className="font-label-eyebrow text-label-eyebrow text-primary">{cat.id}</span>
                  <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary group-hover:translate-x-1 transition-all">south_east</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">{cat.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{cat.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="w-full py-space-xl bg-surface-container-low" id="catalogo">
        <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-space-sm mb-space-lg">
            <div>
              <span className="font-label-eyebrow text-label-eyebrow text-primary uppercase tracking-widest block mb-space-xs">
                Catálogo Online
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface flex items-center gap-2">
                Productos destacados
                {selectedCat !== 'Todos' && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold ml-2">
                    {selectedCat}
                  </span>
                )}
              </h2>
            </div>
            <div className="flex items-center gap-space-md self-stretch sm:self-auto justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant">{filteredProducts.length} productos en vista</span>
              <button className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded shadow-sm text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors" type="button">
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Filtros</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            <div className="lg:col-span-3 space-y-space-md">
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                <h3 className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant mb-space-md tracking-wider flex justify-between items-center">
                  Categorías
                  {selectedCat !== 'Todos' && (
                    <button onClick={() => setSelectedCat('Todos')} className="text-primary hover:underline lowercase text-[10px]">
                      Borrar filtro
                    </button>
                  )}
                </h3>
                <ul className="space-y-space-xs font-body-sm text-body-sm">
                  <li>
                    <button 
                      onClick={() => setSelectedCat('Todos')}
                      className={`w-full flex items-center justify-between py-space-xs px-space-sm rounded text-left transition-colors ${selectedCat === 'Todos' ? 'bg-primary-fixed text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`} 
                      type="button"
                    >
                      <span>Todos los productos</span>
                      <span className="font-data-tabular text-data-tabular">24</span>
                    </button>
                  </li>
                  {[
                    ['Resmitas', '3'],
                    ['Obra en papel plano', '3'],
                    ['Cartulinas color', '3'],
                    ['Cartulinas pesadas', '3'],
                    ['Cartón gris', '3'],
                    ['Autoadhesivos', '3'],
                    ['Papel kraft', '3'],
                    ['Sobres comerciales', '3'],
                  ].map((cat) => (
                    <li key={cat[0]}>
                      <button 
                        onClick={() => setSelectedCat(cat[0])}
                        className={`w-full flex items-center justify-between py-space-xs px-space-sm rounded text-left transition-colors ${selectedCat === cat[0] ? 'bg-primary-fixed text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`} 
                        type="button"
                      >
                        <span>{cat[0]}</span>
                        <span className={`font-data-tabular text-data-tabular ${selectedCat === cat[0] ? 'text-primary' : 'text-outline'}`}>{cat[1]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-secondary-container text-on-secondary-fixed p-space-md rounded-lg shadow-sm relative overflow-hidden hidden lg:block">
                <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center mb-space-sm">
                  <span className="material-symbols-outlined text-[20px]">content_cut</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-secondary-fixed mb-space-xs">
                  ¿Necesitás una medida especial?
                </h4>
                <p className="font-body-sm text-body-sm text-on-secondary-container mb-space-md">
                  Fraccionamos y guillotinamos cualquier papel de nuestro catálogo según el pliego exacto de tu máquina.
                </p>
                <Link className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-secondary-fixed font-semibold hover:underline" href="#servicios">
                  <span>Conocer servicio</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-md">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} {...prod} />
                ))
              ) : (
                <div className="col-span-full bg-surface-container-lowest p-8 rounded-lg text-center border border-outline/20">
                  <span className="material-symbols-outlined text-[48px] text-outline mb-2">inventory_2</span>
                  <h3 className="font-headline-sm text-on-surface mb-2">No hay productos destacados aquí</h3>
                  <p className="text-on-surface-variant text-sm">Pronto agregaremos más productos a esta categoría.</p>
                  <button onClick={() => setSelectedCat('Todos')} className="mt-4 text-primary font-bold hover:underline">
                    Ver todos los productos
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE PILLARS */}
      <section className="w-full py-space-xl bg-surface" id="servicios">
        <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-5">
              <span className="font-label-eyebrow text-label-eyebrow text-primary uppercase tracking-widest block mb-space-xs">
                Más que papel
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-md">
                Resolvemos lo que tu negocio necesita.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Desde una resma para oficina hasta una compra industrial por pallet cerrado. Te asesoramos para que elijas el material técnico correcto y lo recibas directo en tus talleres sin contratiempos.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-space-md">
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex items-start gap-space-md">
                <div className="w-12 h-12 rounded bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">square_foot</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Corte a medida</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Medidas especiales, cortes precisos en escuadra y terminación prolija para alimentar offset, serigrafía y packaging digital sin desperdicio.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex items-start gap-space-md">
                <div className="w-12 h-12 rounded bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Logística propia</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Entregas diarias programadas en AMBA con camiones propios acondicionados para resguardo de humedad, y despachos diarios a expresos de todo el país.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex items-start gap-space-md">
                <div className="w-12 h-12 rounded bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">support_agent</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Atención personalizada</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Asesoramiento técnico directo por especialistas en gramajes, fibras, rendimiento de pliegos y cotizaciones en escala mayorista.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL HERO BANNER */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter">
          <div className="bg-on-secondary-fixed-variant text-on-secondary rounded-xl p-space-lg lg:p-space-xl shadow-md relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center relative z-10">
              <div className="lg:col-span-7">
                <span className="font-label-eyebrow text-label-eyebrow text-secondary-fixed uppercase tracking-widest block mb-space-xs">
                  Papelera Bertolín
                </span>
                <h2 className="font-headline-xl text-headline-xl text-on-secondary leading-tight mb-space-sm">
                  Una empresa familiar, un servicio de siempre.
                </h2>
                <p className="font-body-md text-body-md text-secondary-fixed max-w-xl">
                  Desde 1980 trabajamos junto a imprentas, librerías y empresas de todo el país. Contamos con más de 5 depósitos propios y una flota que garantiza que nunca te falte el papel para seguir produciendo.
                </p>
              </div>
              <div className="lg:col-span-5 flex lg:justify-end">
                <Link className="bg-surface-container-lowest text-on-surface hover:bg-surface-container px-space-lg py-space-sm rounded font-label-md text-label-md transition-colors shadow-sm flex items-center gap-space-xs" href="#contacto">
                  <span>Conocer la empresa</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Link aria-label="Contactar por WhatsApp" className="fixed bottom-space-lg right-space-lg z-50 flex items-center gap-space-sm bg-secondary text-on-secondary px-space-md py-space-sm rounded-full shadow-[0_12px_24px_-6px_rgba(74,74,74,0.08)] hover:bg-on-secondary-fixed-variant transition-all" href="#">
        <span className="material-symbols-outlined text-[20px]">chat</span>
        <span className="font-label-md text-label-md hidden sm:inline">Asesor en línea</span>
      </Link>
    </main>
  )
}
