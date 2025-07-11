"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { toast } from "@/hooks/use-toast"

export interface CartItem {
  id: string
  name: string
  price: number
  size: string
  sizeCategory?: string // Added sizeCategory
  quantity: number
  image?: string
  type?: "regular" | "custom"
  customDetails?: any // For custom orders
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateItemQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isClient])

  const addItem = useCallback(
    (item: CartItem) => {
      setItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === item.id && i.size === item.size)
        if (existingItem) {
          toast({
            title: "Item already in cart",
            description: "Quantity updated.",
            variant: "default",
          })
          return prevItems.map((i) =>
            i.id === item.id && i.size === item.size ? { ...i, quantity: i.quantity + item.quantity } : i,
          )
        } else {
          toast({
            title: "Item added to cart!",
            description: `${item.name} (Size: ${item.size}) has been added.`,
            variant: "default",
          })
          return [...prevItems, item]
        }
      })
    },
    [toast],
  )

  const removeItem = useCallback(
    (id: string) => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id))
      toast({
        title: "Item removed from cart.",
        variant: "default",
      })
    },
    [toast],
  )

  const updateItemQuantity = useCallback((id: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)).filter((item) => item.quantity > 0),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    if (isClient) {
      localStorage.removeItem("cart")
    }
  }, [isClient])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateItemQuantity, clearCart, total, itemCount }}>
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
