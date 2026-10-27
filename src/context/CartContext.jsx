import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { foods, DELIVERY_FEE } from '../data/foods.js'

const CartContext = createContext(null)
const STORAGE_KEY = 'bitebox-cart-v2'

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!Array.isArray(raw)) return []
    return raw.filter((i) => foods.some((f) => f.id === i.id) && Number.isInteger(i.qty) && i.qty > 0)
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadCart)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lines)) } catch { /* storage unavailable */ }
  }, [lines])

  const addItem = useCallback((id) => {
    const food = foods.find((f) => f.id === id)
    if (!food) return
    setLines((prev) =>
      prev.some((l) => l.id === id)
        ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
        : [...prev, { id, qty: 1 }]
    )
    setToast({ key: Date.now() + Math.random(), name: food.name })
  }, [])

  const changeQty = useCallback((id, delta) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0))
  }, [])

  const removeItem = useCallback((id) => setLines((prev) => prev.filter((l) => l.id !== id)), [])
  const clearCart = useCallback(() => setLines([]), [])

  const value = useMemo(() => {
    const items = lines.map((l) => ({ ...foods.find((f) => f.id === l.id), qty: l.qty }))
    const count = items.reduce((n, i) => n + i.qty, 0)
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0)
    const deliveryFee = items.length ? DELIVERY_FEE : 0
    return { items, count, subtotal, deliveryFee, total: subtotal + deliveryFee, toast, addItem, changeQty, removeItem, clearCart }
  }, [lines, toast, addItem, changeQty, removeItem, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
