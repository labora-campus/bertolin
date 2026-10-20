'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { OPEN_SEARCH_EVENT } from '@/components/layout/BottomNav'

export function Header() {
  const router = useRouter()
  const { cart, cartTotal, setIsCartOpen } = useCart()
  const [query, setQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const mobileInputRef = useRef<HTMLInputElement>(null)

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

  // Calulate total units (bultos)
  const totalUnits = cart.reduce((acc, item) => acc + item.quantity, 0)

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    setIsSearchOpen(false)
    router.push(q ? `/productos?q=${encodeURIComponent(q)}` : '/productos')
  }

  useEffect(() => {
    if (isSearchOpen) mobileInputRef.current?.focus()
  }, [isSearchOpen])

  // The mobile bottom nav "Buscar" button opens this overlay
  useEffect(() => {
    const open = () => setIsSearchOpen(true)
    window.addEventListener(OPEN_SEARCH_EVENT, open)
    return () => window.removeEventListener(OPEN_SEARCH_EVENT, open)
  }, [])

  return (
    <>
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 lg:h-20 max-w-[1280px] mx-auto px-margin-sm md:px-gutter flex items-center justify-between gap-space-sm lg:gap-gutter">
        <Link href="/" className="flex items-center gap-space-sm lg:gap-space-md min-w-0">
          <img alt="Papelera Bertolín Logo" className="h-7 lg:h-8 w-auto object-contain shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvhEtDfpUxvGczxTH_yXR1V4W5TxGvLcKu71HuMueHD3qSm-OjLI209ltDHhzBUqRb8N3MbTu_kXoaBpExKbVeEmO7Uy0oHt0uqPNQaYDwMQDWHfOQNB96o9vuhiXH8Z4-KG_YE9yjc5sVbO6RvL-MiBkEv2AUPD-yiheRGccnrYXIlZ29VFAAEQGz5QwlwMEvn5SKh6TI_fNyfQ3yu_6jmJXBzp1hfZ-gNckws0CE97U_6u36E8tkzg" />
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-[16px] lg:text-headline-sm text-primary tracking-tight truncate">Papelera Bertolín</span>
            <span className="hidden sm:block font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase">Desde 1980 · Buenos Aires</span>
          </div>
        </Link>
        <form onSubmit={submitSearch} className="hidden lg:flex flex-1 max-w-xl mx-space-md" role="search">
          <div className="w-full flex items-center bg-surface-container-lowest rounded-lg p-space-xs shadow-[0_1px_3px_0_rgba(74,74,74,0.03)] border border-surface-container">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-space-sm py-space-xs bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none"
              placeholder="Buscar papeles, resmas, cartulinas..."
              type="search"
            />
            <button aria-label="Buscar en catálogo" className="p-space-xs text-primary hover:text-primary-container transition-colors shrink-0" type="submit">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>
        </form>
        <div className="flex items-center gap-space-xs sm:gap-space-md shrink-0">
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Buscar productos"
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>
          <button className="hidden sm:flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" type="button" title="Mi Cuenta">
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Abrir carrito (${totalUnits} bultos)`}
            className="relative flex items-center gap-space-sm bg-primary text-on-primary hover:bg-primary-container h-11 px-3 sm:px-space-md sm:h-auto sm:py-space-sm rounded-lg transition-colors shadow-[0_2px_8px_-2px_rgba(74,74,74,0.05)]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {totalUnits > 0 && (
              <span className="sm:hidden absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-secondary text-on-secondary text-[11px] font-bold flex items-center justify-center">
                {totalUnits}
              </span>
            )}
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-label-md text-label-md leading-none">{formatMoney(cartTotal)}</span>
              <span className="font-label-eyebrow text-[10px] text-primary-fixed leading-tight">{totalUnits} bultos</span>
            </div>
          </button>
        </div>
      </div>
      <div className="hidden lg:block bg-surface-container-low border-t border-surface-container">
        <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter flex items-center justify-between">
          <nav className="flex items-center gap-gutter overflow-x-auto py-space-sm whitespace-nowrap">
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="/">Inicio</Link>
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="/productos">Catálogo de Productos</Link>
          </nav>
        </div>
      </div>
    </header>

      {/* Mobile search overlay (outside <header>: its backdrop-filter would trap position:fixed) */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-surface flex flex-col">
          <form onSubmit={submitSearch} role="search" className="flex items-center gap-space-sm p-space-sm border-b border-surface-container">
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Cerrar búsqueda"
              className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container shrink-0"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <input
              ref={mobileInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              enterKeyHint="search"
              placeholder="Buscar papeles, resmas, cartulinas..."
              className="flex-1 min-w-0 h-11 bg-surface-container-low rounded-lg px-space-md text-[16px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button type="submit" aria-label="Buscar" className="w-11 h-11 flex items-center justify-center rounded-full bg-primary text-on-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>
          </form>
          <div className="p-space-md">
            <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-surface-variant tracking-wider">Búsquedas frecuentes</span>
            <div className="flex flex-wrap gap-space-sm mt-space-sm">
              {['Resma A4', 'Cartulina', 'Kraft', 'Autoadhesivo', 'Cartón gris', 'Sobres'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setQuery(term)
                    setIsSearchOpen(false)
                    router.push(`/productos?q=${encodeURIComponent(term)}`)
                  }}
                  className="px-space-md py-2 rounded-full bg-surface-container-low border border-surface-container text-body-md text-on-surface hover:border-primary/40"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
