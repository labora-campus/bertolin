'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/product/ProductCard'
import { supabase } from '@/lib/supabase'

type ProductItem = {
  id: string
  cat: string
  title: string
  desc: string
  price: number
  stock: string
  tag: string
  img: string
}

type CategoryItem = {
  id: string
  name: string
  slug: string
  count: number
}

export default function ProductosPage() {
  // useSearchParams needs a Suspense boundary for static prerendering
  return (
    <Suspense>
      <ProductosContent />
    </Suspense>
  )
}

function ProductosContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<ProductItem[]>([])
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [selectedCat, setSelectedCat] = useState<string>('Todos')
  const [sortBy, setSortBy] = useState<string>('relevantes')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  // Search coming from the header (?q=...)
  const urlQuery = searchParams.get('q') ?? ''
  useEffect(() => {
    setSearchQuery(urlQuery)
  }, [urlQuery])

  // Lock page scroll while the mobile filters sheet is open
  useEffect(() => {
    document.body.style.overflow = isFiltersOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isFiltersOpen])

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        // 1. Fetch categories
        const { data: catData } = await supabase
          .from('categories')
          .select('id, name, slug')
          .eq('is_active', true)
          .order('order_index', { ascending: true })

        // 2. Fetch products
        const { data: prodData, error } = await supabase
          .from('products')
          .select('*, categories(name, slug)')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (!error && prodData) {
          const mapped: ProductItem[] = prodData.map((p: any) => ({
            id: p.slug || p.id,
            cat: p.categories?.name || 'General',
            title: p.name,
            desc: p.specs || p.description || '',
            price: Number(p.price),
            stock: p.stock > 0 ? `${p.stock} disp.` : 'Consultar',
            tag: p.tag || '',
            img: (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop'
          }))
          setProducts(mapped)

          if (catData) {
            const mappedCats: CategoryItem[] = catData.map((c: any) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              count: mapped.filter((p) => p.cat.toLowerCase() === c.name.toLowerCase()).length
            }))
            setCategories(mappedCats)
          }
        }
      } catch (err) {
        console.error('Error fetching from Supabase:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter products
  let filtered = products.filter((p) => {
    const matchesCat = selectedCat === 'Todos' || p.cat.toLowerCase() === selectedCat.toLowerCase()
    const matchesSearch = searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cat.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  // Sort
  if (sortBy === 'menor-precio') {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'mayor-precio') {
    filtered.sort((a, b) => b.price - a.price)
  }

  const filtersPanel = (
    <>
      {/* Buscador */}
      <div>
        <h3 className="font-label-md text-label-md uppercase text-primary font-bold mb-space-sm tracking-wider flex items-center gap-2 border-b border-primary/20 pb-2">
          <span className="material-symbols-outlined text-[18px]">search</span>
          Buscar
        </h3>
        <input
          type="text"
          placeholder="Buscar en catálogo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mt-2 bg-surface border border-outline rounded-lg px-3 py-2 text-[16px] lg:text-body-sm text-on-surface focus:outline-none focus:border-primary"
        />
      </div>

      {/* Categorías */}
      <div>
        <h3 className="font-label-md text-label-md uppercase text-primary font-bold mb-space-sm tracking-wider flex items-center gap-2 border-b border-primary/20 pb-2">
          <span className="material-symbols-outlined text-[18px]">category</span>
          Categorías
        </h3>
        <ul className="space-y-1 font-body-sm text-body-sm mt-3">
          <li>
            <button
              onClick={() => { setSelectedCat('Todos'); setIsFiltersOpen(false) }}
              className={`w-full flex items-center justify-between px-3 py-3 lg:py-2 rounded-md font-semibold text-left transition-colors ${selectedCat === 'Todos' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
            >
              <span>Todos los productos</span>
              <span className="bg-primary text-on-primary px-1.5 py-0.5 rounded-full text-[10px]">{products.length}</span>
            </button>
          </li>
          {(categories.length > 0 ? categories : [
            { id: '1', name: 'Resmitas', count: 3 },
            { id: '2', name: 'Obra en papel plano', count: 2 },
            { id: '3', name: 'Cartulinas pesadas', count: 1 },
            { id: '4', name: 'Cartón gris', count: 1 },
            { id: '5', name: 'Autoadhesivos', count: 1 },
            { id: '6', name: 'Papel kraft', count: 1 },
          ]).map((cat: any) => (
            <li key={cat.id || cat.name}>
              <button
                onClick={() => { setSelectedCat(cat.name); setIsFiltersOpen(false) }}
                className={`w-full flex items-center justify-between px-3 py-3 lg:py-2 rounded-md transition-colors text-left group ${selectedCat.toLowerCase() === cat.name.toLowerCase() ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
              >
                <span className="group-hover:translate-x-1 transition-transform">{cat.name}</span>
                {cat.count !== undefined && (
                  <span className="text-outline text-[11px] font-data-tabular">{cat.count}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Formato */}
      <div>
        <h3 className="font-label-md text-label-md uppercase text-primary font-bold mb-space-sm tracking-wider flex items-center gap-2 border-b border-primary/20 pb-2">
          <span className="material-symbols-outlined text-[18px]">aspect_ratio</span>
          Formato
        </h3>
        <ul className="space-y-1 font-body-sm text-body-sm mt-3">
          {[
            'Pliego 65×95',
            'Pliego 70×100',
            'Pliego 82×118',
            'Resmas A4 / Oficio',
            'Bobinas'
          ].map((format) => (
            <li key={format}>
              <label className="flex items-center gap-3 cursor-pointer text-on-surface hover:text-primary transition-colors px-2 py-3 lg:py-1.5 rounded-md hover:bg-surface-container-low">
                <input
                  type="checkbox"
                  onChange={(e) => setSearchQuery(e.target.checked ? format.split(' ')[0] : '')}
                  className="accent-primary w-5 h-5 lg:w-4 lg:h-4 rounded-sm border-outline"
                />
                <span>{format}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

    </>
  )

  return (
    <main className="w-full pt-[72px] lg:pt-[132px] bg-surface min-h-[calc(100vh-280px)]">
      <div className="flex flex-col w-full">
        {/* Header Section */}
        <section className="w-full px-margin-sm md:px-gutter pt-space-lg pb-space-md sm:pt-space-xl sm:pb-space-lg bg-gradient-to-r from-primary to-[#5a1030] text-on-primary shadow-inner">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-end gap-space-sm">
            <div>
              <span className="font-label-eyebrow text-label-eyebrow text-primary-container uppercase tracking-widest block mb-space-xs opacity-90">
                Catálogo Online
              </span>
              <h1 className="font-headline-lg text-[28px] sm:text-[42px] font-extrabold tracking-tight">Todos los Productos</h1>
            </div>
            <div className="hidden sm:block bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
              <span className="font-label-md text-on-primary font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                Envíos a todo el país
              </span>
            </div>
          </div>
        </section>

        {/* Main Content Layout (Sidebar + Product Grid) */}
        <div className="w-full px-margin-sm md:px-gutter py-space-md lg:py-space-xl">
          <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start gap-gutter">

            {/* LEFT SIDEBAR: Clean, editorial filters */}
            <aside className="hidden lg:block w-[260px] shrink-0 space-y-space-lg bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container">
              {filtersPanel}
            </aside>

            {/* RIGHT COLUMN: Product Grid */}
            <div className="flex-1 w-full space-y-space-md">

              {/* Mobile toolbar: search + filters + sort, sticky under the header */}
              <div className="lg:hidden sticky top-[64px] z-30 -mx-margin-sm px-margin-sm py-space-sm bg-surface/95 backdrop-blur-md border-b border-surface-container space-y-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="flex-1 min-w-0 relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">search</span>
                    <input
                      type="search"
                      enterKeyHint="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar en catálogo..."
                      className="w-full h-11 bg-surface-container-lowest border border-outline-variant rounded-lg pl-10 pr-3 text-[16px] text-on-surface focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFiltersOpen(true)}
                    className="h-11 px-space-md flex items-center gap-1 rounded-lg bg-surface-container-lowest border border-outline-variant font-label-md text-label-md text-on-surface shrink-0"
                  >
                    <span className="material-symbols-outlined text-[20px]">tune</span>
                    Filtros
                    {selectedCat !== 'Todos' && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-space-sm">
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    <strong className="text-primary">{filtered.length}</strong> productos
                    {selectedCat !== 'Todos' && <> en <strong className="text-primary">{selectedCat}</strong></>}
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Ordenar por"
                    className="h-9 bg-transparent text-[14px] font-semibold text-on-surface focus:outline-none shrink-0"
                  >
                    <option value="relevantes">Más relevantes</option>
                    <option value="menor-precio">Menor precio</option>
                    <option value="mayor-precio">Mayor precio</option>
                  </select>
                </div>
              </div>

              {/* Results Toolbar */}
              <div className="hidden lg:flex items-center justify-between pb-space-sm border-b border-surface-container bg-surface-container-lowest p-4 rounded-xl shadow-sm border">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Mostrando <strong className="text-on-surface font-semibold text-primary">{filtered.length}</strong> resultados
                  {selectedCat !== 'Todos' && <span className="ml-1 text-primary">en <strong>{selectedCat}</strong></span>}
                </span>
                <div className="flex items-center gap-3 font-body-sm text-body-sm">
                  <span className="text-on-surface-variant font-medium hidden sm:inline">Ordenar por:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-surface border border-outline-variant text-on-surface font-semibold focus:outline-none focus:border-primary cursor-pointer px-4 py-2 rounded-lg appearance-none pr-8 transition-colors hover:border-primary/50"
                    >
                      <option value="relevantes">Más relevantes</option>
                      <option value="menor-precio">Menor precio</option>
                      <option value="mayor-precio">Mayor precio</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* PRODUCT CARDS GRID */}
              {filtered.length === 0 ? (
                <div className="text-center py-16 bg-surface-container-lowest rounded-xl border border-surface-container p-8">
                  <span className="material-symbols-outlined text-[48px] text-outline mb-2">search_off</span>
                  <h3 className="font-headline-sm text-on-surface">No se encontraron productos</h3>
                  <p className="font-body-sm text-on-surface-variant mt-1">Intentá con otra categoría o término de búsqueda.</p>
                  <button
                    onClick={() => { setSelectedCat('Todos'); setSearchQuery('') }}
                    className="mt-4 bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-container"
                  >
                    Ver todos
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-space-sm sm:gap-space-md">
                  {filtered.map((prod) => (
                    <ProductCard key={prod.id} {...prod} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mobile filters bottom sheet */}
      {isFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-[70] flex flex-col justify-end">
          <div className="absolute inset-0 bg-on-surface/40" onClick={() => setIsFiltersOpen(false)} />
          <div className="relative bg-surface-container-lowest rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-space-md py-space-sm border-b border-surface-container">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Filtros</h2>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                aria-label="Cerrar filtros"
                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="overflow-y-auto p-space-md space-y-space-lg">{filtersPanel}</div>
            <div className="p-space-md border-t border-surface-container flex gap-space-sm">
              <button
                type="button"
                onClick={() => {
                  setSelectedCat('Todos')
                  setSearchQuery('')
                }}
                className="flex-1 h-12 rounded-lg border border-outline text-on-surface font-label-md text-label-md"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="flex-[2] h-12 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold"
              >
                Ver {filtered.length} productos
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
