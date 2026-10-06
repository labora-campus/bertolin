'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (!isCartOpen) return null

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount)

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <aside className="relative w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-space-md border-b border-surface-container">
          <div>
            <span className="font-label-eyebrow text-label-eyebrow text-primary uppercase tracking-widest block mb-1">
              Tu Compra
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Carrito <span className="text-on-surface-variant font-normal">({cart.length})</span>
            </h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-space-md space-y-space-md">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-space-md text-on-surface-variant opacity-60">
              <span className="material-symbols-outlined text-[64px]">shopping_cart</span>
              <p className="font-body-lg text-body-lg">Tu carrito está vacío.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-space-md bg-surface p-space-sm rounded-lg border border-surface-container">
                <div className="w-20 h-20 bg-surface-container-low rounded flex items-center justify-center overflow-hidden shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-outline">image</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface">{item.name}</h4>
                      <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-outline hover:text-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="w-8 text-center font-data-tabular text-[13px]">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                    <span className="font-label-md text-label-md">{formatMoney(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="border-t border-surface-container p-space-md bg-surface">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-body-md text-body-md text-on-surface-variant">Subtotal</span>
              <span className="font-headline-sm text-headline-sm text-on-surface">{formatMoney(cartTotal)}</span>
            </div>
            <p className="font-body-sm text-[11px] text-on-surface-variant mb-space-md">Envío a coordinar según localidad</p>
            <div className="space-y-space-xs">
              <Link 
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-space-sm rounded hover:bg-primary-container transition-colors font-label-md text-label-md shadow-sm"
              >
                <span>Continuar compra</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-full py-space-sm text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors"
              >
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
