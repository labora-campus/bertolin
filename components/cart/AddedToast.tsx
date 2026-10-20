'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'

export function AddedToast() {
  const { lastAdded, setIsCartOpen, isCartOpen } = useCart()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!lastAdded) return
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 2800)
    return () => clearTimeout(t)
  }, [lastAdded])

  if (!visible || !lastAdded || isCartOpen) return null

  return (
    <div
      role="status"
      aria-live="polite"
      // Above the mobile bottom nav / purchase bars; bottom-right on desktop
      className="fixed z-[45] left-3 right-3 bottom-[calc(7.5rem+env(safe-area-inset-bottom))] lg:left-auto lg:right-6 lg:bottom-6 lg:w-96 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="flex items-center gap-space-sm bg-inverse-surface text-inverse-on-surface rounded-xl shadow-2xl px-space-md py-space-sm">
        <span className="material-symbols-outlined text-[22px] text-secondary-fixed shrink-0">check_circle</span>
        <div className="flex-1 min-w-0">
          <p className="font-label-md text-label-md">Agregado al carrito</p>
          <p className="text-[12px] opacity-80 truncate">{lastAdded.name}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setVisible(false)
            setIsCartOpen(true)
          }}
          className="shrink-0 min-h-11 px-space-sm font-label-md text-label-md font-bold text-primary-fixed underline-offset-2 hover:underline"
        >
          Ver carrito
        </button>
      </div>
    </div>
  )
}
