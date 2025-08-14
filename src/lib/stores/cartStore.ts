import { create } from 'zustand'
import { Product } from '@/types/product'
import { useEffect, useState } from 'react'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  customizations?: Record<string, any>
  totalPrice: number
  addedAt: Date
}

interface CartStore {
  // State
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (product: Product, customizations?: Record<string, any>) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void

  // Utils
  getItemById: (itemId: string) => CartItem | undefined
  hasItem: (productId: string) => boolean
}

export const useCartStore = create<CartStore>((set, get) => ({
  // Initial state
  items: [],
  isOpen: false,

  // Actions
  addItem: (product, customizations = {}) => {
    const state = get()
    const existingItemIndex = state.items.findIndex(
      item => item.product.id === product.id &&
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
    )

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const updatedItems = [...state.items]
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1,
        totalPrice: (updatedItems[existingItemIndex].quantity + 1) * product.basePrice
      }

      set({ items: updatedItems })
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        product,
        quantity: 1,
        customizations,
        totalPrice: product.basePrice,
        addedAt: new Date()
      }

      set({ items: [...state.items, newItem] })
    }
  },

  removeItem: (itemId) => {
    set(state => ({
      items: state.items.filter(item => item.id !== itemId)
    }))
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId)
      return
    }

    set(state => ({
      items: state.items.map(item =>
        item.id === itemId
          ? {
            ...item,
            quantity,
            totalPrice: quantity * item.product.basePrice
          }
          : item
      )
    }))
  },

  clearCart: () => {
    set({ items: [], isOpen: false })
  },

  toggleCart: () => {
    set(state => ({ isOpen: !state.isOpen }))
  },

  // Utils
  getItemById: (itemId) => {
    return get().items.find(item => item.id === itemId)
  },

  hasItem: (productId) => {
    return get().items.some(item => item.product.id === productId)
  }
}))

// ✅ SELECTOR HOOKS ESTABLES - Sin cálculos complejos
export const useCartItems = () => useCartStore(state => state.items)

// ✅ Hydration-safe cart count hook
export const useCartCount = () => {
  const [isHydrated, setIsHydrated] = useState(false)
  const items = useCartStore(state => state.items)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Return 0 during SSR/hydration to prevent mismatch
  if (!isHydrated) return 0

  return items.reduce((total, item) => total + item.quantity, 0)
}

export const useCartTotal = () => {
  const items = useCartStore(state => state.items)
  return items.reduce((total, item) => total + item.totalPrice, 0)
}

export const useCartActions = () => {
  const addItem = useCartStore(state => state.addItem)
  const removeItem = useCartStore(state => state.removeItem)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const clearCart = useCartStore(state => state.clearCart)
  const toggleCart = useCartStore(state => state.toggleCart)

  return {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart
  }
}