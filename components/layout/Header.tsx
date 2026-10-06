'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export function Header() {
  const { cart, cartTotal, setIsCartOpen } = useCart()

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

  // Calulate total units (bultos)
  const totalUnits = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1280px] mx-auto px-margin-sm md:px-gutter flex items-center justify-between gap-gutter">
        <Link href="/" className="flex items-center gap-space-md shrink-0">
          <img alt="Papelera Bertolín Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvhEtDfpUxvGczxTH_yXR1V4W5TxGvLcKu71HuMueHD3qSm-OjLI209ltDHhzBUqRb8N3MbTu_kXoaBpExKbVeEmO7Uy0oHt0uqPNQaYDwMQDWHfOQNB96o9vuhiXH8Z4-KG_YE9yjc5sVbO6RvL-MiBkEv2AUPD-yiheRGccnrYXIlZ29VFAAEQGz5QwlwMEvn5SKh6TI_fNyfQ3yu_6jmJXBzp1hfZ-gNckws0CE97U_6u36E8tkzg" />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight">Papelera Bertolín</span>
            <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase">Desde 1980 · Buenos Aires</span>
          </div>
        </Link>
        <div className="hidden lg:flex flex-1 max-w-xl mx-space-md">
          <div className="w-full flex items-center bg-surface-container-lowest rounded-lg p-space-xs shadow-[0_1px_3px_0_rgba(74,74,74,0.03)] border border-surface-container">
            <input className="w-full px-space-sm py-space-xs bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none" placeholder="Buscar papeles, resmas, cartulinas..." type="text" />
            <button aria-label="Buscar en catálogo" className="p-space-xs text-primary hover:text-primary-container transition-colors shrink-0" type="button">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-space-md shrink-0">
          <button className="hidden sm:flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" type="button" title="Mi Cuenta">
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-space-sm bg-primary text-on-primary hover:bg-primary-container px-space-md py-space-sm rounded-lg transition-colors shadow-[0_2px_8px_-2px_rgba(74,74,74,0.05)]" 
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <div className="flex flex-col text-left">
              <span className="font-label-md text-label-md leading-none">{formatMoney(cartTotal)}</span>
              <span className="font-label-eyebrow text-[10px] text-primary-fixed leading-tight">{totalUnits} bultos</span>
            </div>
          </button>
        </div>
      </div>
      <div className="bg-surface-container-low border-t border-surface-container">
        <div className="max-w-[1280px] mx-auto px-margin-sm md:px-gutter flex items-center justify-between">
          <nav className="flex items-center gap-gutter overflow-x-auto py-space-sm whitespace-nowrap">
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="/">Inicio</Link>
            <Link className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="/productos">Catálogo de Productos</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
