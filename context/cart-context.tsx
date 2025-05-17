"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type CartItem = {
  id: string
  service: string
  plan: string
  price: number
  color: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Error parsing cart from localStorage", e)
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (item: CartItem) => {
    // Verificar si el item ya existe
    const existingItemIndex = items.findIndex((i) => i.id === item.id)

    if (existingItemIndex >= 0) {
      // Si ya existe, no hacemos nada (o podríamos actualizar la cantidad si tuviéramos esa propiedad)
      return
    }

    setItems((prev) => [...prev, item])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price, 0)
  }

  const getItemCount = () => {
    return items.length
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, getTotal, getItemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
