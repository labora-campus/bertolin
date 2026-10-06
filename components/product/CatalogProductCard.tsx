'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

type CatalogProductCardProps = {
  id: string
  refCode: string
  brand: string
  title: string
  specs: string[]
  price: number
  bulkPrice: string
  stockMsg: string
  tag1: string
  tag2: string
  img: string
}

export function CatalogProductCard({ id, refCode, brand, title, specs, price, bulkPrice, stockMsg, tag1, tag2, img }: CatalogProductCardProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

  const handleAdd = () => {
    // Add multiple quantities by calling addToCart with the item.
    // Our context currently adds 1, but we can modify it or just add 1 for the prototype.
    // To support quantity in context, we would need to pass quantity. Let's just pass the item.
    for (let i = 0; i < quantity; i++) {
       addToCart({ id, name: title, category: brand, price, image: img })
    }
    setQuantity(1)
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div className="space-y-space-sm">
        {/* Visual Card Header */}
        <div className="relative bg-surface-container-low rounded-lg p-space-md overflow-hidden flex items-center justify-center min-h-[160px]">
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {tag1 && <span className="bg-secondary text-on-secondary font-label-eyebrow text-label-eyebrow uppercase px-2 py-0.5 rounded shadow-xs">{tag1}</span>}
            {tag2 && <span className="bg-tertiary-container text-on-tertiary font-label-eyebrow text-label-eyebrow uppercase px-2 py-0.5 rounded shadow-xs">{tag2}</span>}
          </div>
          <Link href={`/productos/${id}`}>
            <img className="w-32 h-28 object-contain drop-shadow-md group-hover:scale-105 transition-transform cursor-pointer" src={img} alt={title} />
          </Link>
          <Link href={`/productos/${id}`} className="absolute bottom-2 right-2 bg-surface-container-lowest/90 hover:bg-primary hover:text-on-primary text-on-surface p-1.5 rounded-full shadow-sm transition-colors" title="Vista rápida">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
          </Link>
        </div>
        
        {/* Metadata & Title */}
        <div>
          <div className="flex items-center justify-between text-label-eyebrow font-label-eyebrow text-on-surface-variant uppercase mb-1">
            <span>{brand}</span>
            <span className="text-secondary font-bold">{refCode}</span>
          </div>
          <Link href={`/productos/${id}`}>
            <h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors leading-snug cursor-pointer">
              {title}
            </h2>
          </Link>
          <div className="flex items-center gap-space-xs text-data-tabular font-data-tabular text-on-surface-variant pt-1.5 flex-wrap">
            {specs.map((spec, i) => (
              <span key={i} className="bg-surface-container px-2 py-0.5 rounded">{spec}</span>
            ))}
          </div>
        </div>
        
        {/* Pricing */}
        <div className="bg-surface-container-low p-space-xs rounded-lg space-y-0.5">
          <div className="flex items-baseline justify-between">
            <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant">Precio Base</span>
            <span className="font-headline-md text-headline-md text-primary font-bold">{formatMoney(price)}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
            <span>Mayorista:</span>
            <span className="font-bold text-on-surface">{bulkPrice}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-space-sm space-y-space-xs">
        <div className="flex items-center gap-space-xs">
          <div className="flex items-center bg-surface-container rounded-lg p-0.5 shrink-0">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-7 h-7 flex items-center justify-center hover:bg-surface-container-high rounded text-on-surface font-bold text-sm">-</button>
            <span className="w-8 text-center font-data-tabular text-data-tabular font-bold">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-surface-container-high rounded text-on-surface font-bold text-sm">+</button>
          </div>
          <button onClick={handleAdd} className="flex-1 flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary py-2 px-space-sm rounded-lg transition-colors font-label-md text-label-md shadow-xs">
            <span className="material-symbols-outlined text-[17px]">shopping_bag</span>
            <span>Agregar</span>
          </button>
        </div>
        <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant px-1">
          <span className="flex items-center gap-1 text-[11px] text-secondary font-medium"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{stockMsg}</span>
          <a className="text-[11px] text-primary hover:underline flex items-center gap-0.5" href="#">
            <span className="material-symbols-outlined text-[12px]">content_cut</span> Cotizar corte
          </a>
        </div>
      </div>
    </div>
  )
}
