'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { canOptimizeImage } from '@/lib/image'
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
  const [justAdded, setJustAdded] = useState(false)

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

  const handleAdd = () => {
    addToCart({ id, name: title, category: cat, price, image: img })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="bg-surface-container-lowest rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden group min-w-0">
      <div className="relative bg-surface p-space-sm sm:p-space-md flex items-center justify-center aspect-square sm:aspect-[4/3] overflow-hidden">
        {tag && (
          <span className={`absolute top-space-xs left-space-xs text-on-tertiary px-space-xs py-[2px] rounded text-[10px] font-bold uppercase tracking-wider z-10 ${tag === 'Oferta' ? 'bg-tertiary' : 'bg-tertiary-container text-on-tertiary-container'}`}>
            {tag}
          </span>
        )}
        <Link href={`/productos/${id}`} className="relative block w-[85%] h-[85%] sm:w-3/4 sm:h-3/4 mx-auto sm:mt-4">
          <Image
            fill
            src={img}
            alt={title}
            sizes="(max-width: 640px) 45vw, (max-width: 1280px) 30vw, 300px"
            unoptimized={!canOptimizeImage(img)}
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <button
          onClick={handleAdd}
          aria-label="Añadir a lista rápida"
          className="hidden sm:flex absolute bottom-space-xs right-space-xs w-10 h-10 rounded bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary items-center justify-center shadow-sm transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
      </div>
      <div className="p-space-sm sm:p-space-md flex flex-col flex-1 justify-between">
        <div>
          <span className="font-label-eyebrow text-[10px] sm:text-label-eyebrow text-on-surface-variant uppercase tracking-wider block mb-space-xs truncate">{cat}</span>
          <Link href={`/productos/${id}`}>
            <h3 className="font-headline-sm text-[15px] leading-5 sm:text-headline-sm text-on-surface group-hover:text-primary transition-colors cursor-pointer line-clamp-2">{title}</h3>
          </Link>
          <p className="hidden sm:block font-data-tabular text-data-tabular text-on-surface-variant mt-space-xs line-clamp-2">{desc}</p>
        </div>
        <div className="mt-space-sm sm:mt-space-md sm:pt-space-sm flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm">
          <div className="min-w-0">
            <span className="font-headline-sm text-[17px] sm:text-headline-sm text-on-surface font-semibold block">{formatMoney(price)}</span>
            <span className="font-body-sm text-[11px] text-secondary flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span> {stock}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className={`w-full sm:w-auto min-h-11 sm:min-h-0 flex items-center justify-center gap-1 px-space-md py-space-xs rounded font-label-md text-label-md transition-colors ${
              justAdded ? 'bg-secondary text-on-secondary' : 'bg-primary sm:bg-surface-container text-on-primary sm:text-on-surface hover:bg-primary hover:text-on-primary'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] sm:hidden">{justAdded ? 'check' : 'add_shopping_cart'}</span>
            {justAdded ? 'Agregado' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  )
}
