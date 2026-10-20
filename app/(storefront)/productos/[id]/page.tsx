'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { canOptimizeImage } from '@/lib/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { supabase } from '@/lib/supabase'

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop'

type ProductView = {
  title: string
  cat: string
  price: number
  stock: number
  images: string[]
  sku: string
  desc: string
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params)
  const router = useRouter()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<ProductView | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'not-found'>('loading')
  const [activeThumb, setActiveThumb] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(unwrappedParams.id)
        let query = supabase.from('products').select('*, categories(name)')
        query = isUUID
          ? query.or(`id.eq.${unwrappedParams.id},slug.eq.${unwrappedParams.id}`)
          : query.eq('slug', unwrappedParams.id)
        const { data, error } = await query.eq('is_active', true).single()

        if (error || !data) {
          setStatus('not-found')
          return
        }
        const images = (data.images || []).filter(Boolean)
        setProduct({
          title: data.name,
          cat: data.categories?.name || 'General',
          price: Number(data.price),
          stock: Number(data.stock || 0),
          images: images.length ? images : [PLACEHOLDER_IMG],
          sku: data.sku || '',
          desc: data.description || data.specs || '',
        })
        setStatus('ready')
      } catch {
        setStatus('not-found')
      }
    }
    fetchProduct()
  }, [unwrappedParams.id])

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

  if (status !== 'ready' || !product) {
    return (
      <main className="w-full pt-[72px] lg:pt-[132px] bg-surface min-h-[calc(100vh-280px)] flex items-center justify-center px-margin-sm">
        {status === 'loading' ? (
          <span className="material-symbols-outlined animate-spin text-primary text-[32px]">progress_activity</span>
        ) : (
          <div className="text-center py-space-xl">
            <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
            <h1 className="font-headline-md text-headline-md text-on-surface mt-space-sm">Producto no encontrado</h1>
            <p className="text-body-md text-on-surface-variant mt-1">Puede que ya no esté disponible.</p>
            <Link href="/productos" className="inline-flex mt-space-md bg-primary text-on-primary px-space-lg py-space-sm rounded-lg font-label-md text-label-md">
              Ver catálogo
            </Link>
          </div>
        )}
      </main>
    )
  }

  // The price stored in the database: the server charges exactly this
  const grandTotal = product.price * quantity
  const mainImage = product.images[activeThumb] ?? product.images[0]

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: unwrappedParams.id,
        name: product.title,
        category: product.cat,
        price: product.price,
        image: product.images[0],
      })
    }
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  // "Comprar ahora": add the selected quantity, then go straight to checkout
  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/checkout')
  }

  return (
    <main className="w-full pt-[72px] lg:pt-[132px] bg-surface min-h-[calc(100vh-280px)]">
      <div className="max-w-[1280px] w-full mx-auto px-margin-sm md:px-gutter py-space-md">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-body-sm text-on-surface-variant mb-space-md overflow-hidden">
          <Link href="/productos" className="hover:text-primary shrink-0">Catálogo</Link>
          <span className="material-symbols-outlined text-[16px] shrink-0">chevron_right</span>
          <span className="truncate">{product.cat}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* LEFT COLUMN: Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-space-sm">
            <div className="w-full aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm flex items-center justify-center p-space-md">
              <div className="relative w-full h-full">
                <Image
                  fill
                  priority
                  src={mainImage}
                  alt={product.title}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  unoptimized={!canOptimizeImage(mainImage)}
                  className="object-contain"
                />
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-space-sm overflow-x-auto pb-1">
                {product.images.map((src, idx) => (
                  <button
                    key={src + idx}
                    onClick={() => setActiveThumb(idx)}
                    aria-label={`Ver imagen ${idx + 1}`}
                    className={`w-16 h-16 shrink-0 p-1 rounded-lg bg-surface-container-lowest shadow-sm transition-all ${activeThumb === idx ? 'ring-2 ring-primary' : 'hover:bg-surface-container'}`}
                  >
                    <img className="w-full h-full object-contain rounded" src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-6 flex flex-col gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between flex-wrap gap-space-xs">
                <span className="bg-secondary-fixed text-on-secondary-fixed-variant px-space-sm py-0.5 rounded font-label-eyebrow text-label-eyebrow uppercase tracking-wider font-bold">
                  {product.cat}
                </span>
                {product.sku && (
                  <span className="text-on-surface-variant font-data-tabular text-body-sm">
                    SKU: <strong className="text-on-surface">{product.sku}</strong>
                  </span>
                )}
              </div>
              <h1 className="font-headline-lg text-[26px] leading-tight sm:text-headline-lg text-on-surface mt-1">{product.title}</h1>
              {product.stock > 0 ? (
                <div className="flex items-center gap-1.5 text-secondary mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span className="font-label-md text-label-md font-semibold">En stock ({product.stock} disponibles)</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-on-surface-variant mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                  <span className="font-label-md text-label-md font-semibold">Consultar disponibilidad</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
              <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Precio por unidad</span>
              <div className="flex items-baseline gap-space-sm mt-0.5">
                <span className="font-headline-xl text-headline-xl text-primary font-normal leading-none">{formatMoney(product.price)}</span>
                <span className="font-label-md text-label-md text-on-surface-variant">IVA incl.</span>
              </div>
              <span className="font-body-sm text-body-sm text-secondary font-medium mt-1 block">Factura A o B</span>
            </div>

            {/* Add to Cart Actions (desktop; mobile uses the sticky bar) */}
            <div className="hidden lg:flex bg-surface-container-lowest rounded-xl p-space-md shadow-md flex-col gap-space-md">
              <div className="flex items-center justify-between gap-space-md">
                <div className="flex flex-col">
                  <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Cantidad</span>
                  <div className="flex items-center bg-surface-container rounded-lg p-1 mt-1 shadow-inner">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Restar" className="w-10 h-10 rounded bg-surface-container-lowest hover:bg-surface-container-high transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">remove</span>
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      aria-label="Cantidad"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center bg-transparent font-headline-sm text-headline-sm text-on-surface font-bold focus:outline-none"
                    />
                    <button onClick={() => setQuantity(quantity + 1)} aria-label="Sumar" className="w-10 h-10 rounded bg-surface-container-lowest hover:bg-surface-container-high transition-colors shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Subtotal</span>
                  <div className="font-headline-xl text-headline-xl text-primary font-bold leading-tight">{formatMoney(grandTotal)}</div>
                  <span className="font-data-tabular text-[11px] text-on-surface-variant">Incluye IVA 21%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <button onClick={handleAddToCart} className="w-full bg-primary hover:bg-primary-container text-on-primary py-space-md px-gutter rounded-lg font-label-md text-label-md flex items-center justify-center gap-space-sm transition-all shadow-md">
                  <span className="material-symbols-outlined text-[20px]">{justAdded ? 'check' : 'add_shopping_cart'}</span>
                  <span>{justAdded ? 'Agregado al carrito' : 'Agregar al Carrito'}</span>
                </button>
                <button onClick={handleBuyNow} className="w-full bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary py-space-md px-gutter rounded-lg font-label-md text-label-md flex items-center justify-center gap-space-sm transition-all shadow-md">
                  <span className="material-symbols-outlined text-[20px]">flash_on</span>
                  <span>Comprar Ahora</span>
                </button>
              </div>
            </div>

            {/* Description: only what the admin loaded for this product */}
            {product.desc && (
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">Descripción</h2>
                <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-line">{product.desc}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky purchase bar (globals.css pads the footer so it is not covered) */}
      <div data-sticky-bar className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-t border-surface-container shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-margin-sm pt-space-sm pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center bg-surface-container rounded-lg shrink-0">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Restar" className="w-11 h-11 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <span className="w-7 text-center font-data-tabular text-[16px] font-bold">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} aria-label="Sumar" className="w-11 h-11 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-headline-sm text-[18px] text-primary font-bold leading-tight truncate">{formatMoney(grandTotal)}</div>
            <div className="text-[11px] text-on-surface-variant">Incluye IVA</div>
          </div>
          <button
            onClick={handleAddToCart}
            className={`h-12 px-space-md rounded-lg font-label-md text-label-md font-bold flex items-center gap-1 shrink-0 transition-colors ${justAdded ? 'bg-secondary text-on-secondary' : 'bg-primary text-on-primary'}`}
          >
            <span className="material-symbols-outlined text-[20px]">{justAdded ? 'check' : 'add_shopping_cart'}</span>
            {justAdded ? 'Listo' : 'Agregar'}
          </button>
        </div>
        <button onClick={handleBuyNow} className="w-full mt-space-xs h-10 text-secondary font-label-md text-label-md font-bold flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-[18px]">flash_on</span>
          Comprar ahora
        </button>
      </div>
    </main>
  )
}
