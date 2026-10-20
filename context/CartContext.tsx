'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Product = {
  id: string
  name: string
  price: number
  image: string
  category: string
  quantity: number
}

interface CartContextType {
  cart: Product[]
  addToCart: (product: Omit<Product, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  cartTotal: number
  totalItems: number
  /** Last product added (drives the "Agregado al carrito" toast); key changes on every add */
  lastAdded: { name: string; key: number } | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState<{ name: string; key: number } | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Persist the cart so a reload (very common on mobile) does not empty it
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bertolin-cart')
      if (saved) setCart(JSON.parse(saved))
    } catch {
      // storage unavailable or corrupt: start empty
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem('bertolin-cart', JSON.stringify(cart))
    } catch {
      // storage full or blocked: cart still works in memory
    }
  }, [cart, hydrated])

  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (product: Omit<Product, 'quantity'>) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    // Don't open the drawer on every add (disruptive on mobile); show a toast instead
    setLastAdded({ name: product.name, key: Date.now() })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        totalItems,
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
