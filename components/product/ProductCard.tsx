'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

type ProductCardProps = {
  id: string
  cat: string
  title: string
  desc: string
  price: number
  stock: string
  tag: string
  img: string
}

export function ProductCard({ id, cat, title, desc, price, stock, tag, img }: ProductCardProps) {
  const { addToCart } = useCart()

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group">
      <div className="relative bg-surface p-space-md flex items-center justify-center aspect-[4/3] overflow-hidden">
        {tag && (
          <span className={`absolute top-space-xs left-space-xs text-on-tertiary px-space-xs py-[2px] rounded text-[10px] font-bold uppercase tracking-wider z-10 ${tag === 'Oferta' ? 'bg-tertiary' : 'bg-tertiary-container text-on-tertiary-container'}`}>
            {tag}
          </span>
        )}
        <Link href={`/productos/${id}`}>
          <img className="w-3/4 h-3/4 object-contain group-hover:scale-105 transition-transform duration-300 mx-auto mt-4" src={img} alt={title} />
        </Link>
        <button 
          onClick={() => addToCart({ id, name: title, category: cat, price, image: img })}
          aria-label="Añadir a lista rápida" 
          className="absolute bottom-space-xs right-space-xs w-8 h-8 rounded bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary flex items-center justify-center shadow-sm transition-colors" 
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
      </div>
      <div className="p-space-md flex flex-col flex-1 justify-between">
        <div>
          <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase tracking-wider block mb-space-xs">{cat}</span>
          <Link href={`/productos/${id}`}>
            <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors cursor-pointer">{title}</h3>
          </Link>
          <p className="font-data-tabular text-data-tabular text-on-surface-variant mt-space-xs">{desc}</p>
        </div>
        <div className="mt-space-md pt-space-sm flex items-end justify-between">
          <div>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold block">{formatMoney(price)}</span>
            <span className="font-body-sm text-[11px] text-secondary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> {stock}
            </span>
          </div>
          <button 
            onClick={() => addToCart({ id, name: title, category: cat, price, image: img })}
            className="bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface px-space-md py-space-xs rounded font-label-md text-label-md transition-colors" 
            type="button"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}
