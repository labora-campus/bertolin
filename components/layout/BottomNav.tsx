'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'

// Opens the search overlay owned by <Header />
export const OPEN_SEARCH_EVENT = 'bertolin:open-search'

// Pages with their own sticky bottom bar (purchase / confirm) don't show the nav
const hiddenOn = (path: string) => path.startsWith('/checkout') || /^\/productos\/[^/]+/.test(path)

export function BottomNav() {
  const pathname = usePathname()
  const { totalItems, setIsCartOpen } = useCart()

  if (hiddenOn(pathname)) return null

  const item = 'flex-1 flex flex-col items-center justify-center gap-0.5 min-h-14 text-[11px] font-label-md transition-colors'
  const active = 'text-primary'
  const idle = 'text-on-surface-variant'

  return (
    <nav
      data-bottom-nav
      aria-label="Navegación principal"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-md border-t border-surface-container shadow-[0_-4px_16px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex">
        <Link href="/" className={`${item} ${pathname === '/' ? active : idle}`} aria-current={pathname === '/' ? 'page' : undefined}>
          <span className="material-symbols-outlined text-[24px]">home</span>
          Inicio
        </Link>
        <Link href="/productos" className={`${item} ${pathname === '/productos' ? active : idle}`} aria-current={pathname === '/productos' ? 'page' : undefined}>
          <span className="material-symbols-outlined text-[24px]">grid_view</span>
          Catálogo
        </Link>
        <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))} className={`${item} ${idle}`}>
          <span className="material-symbols-outlined text-[24px]">search</span>
          Buscar
        </button>
        <button type="button" onClick={() => setIsCartOpen(true)} className={`${item} ${idle}`} aria-label={`Carrito (${totalItems})`}>
          <span className="relative">
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </span>
          Carrito
        </button>
      </div>
    </nav>
  )
}
