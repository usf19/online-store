"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import {
  type Product,
  type User,
  type Order,
  type CartItem,
  sampleProducts,
  sampleUsers,
  sampleOrders,
} from "@/lib/store-data"

interface StoreContextType {
  products: Product[]
  users: User[]
  orders: Order[]
  cart: CartItem[]
  currentUser: User | null
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  addUser: (user: User) => void
  deleteUser: (id: string) => void
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  checkout: () => void
  login: (email: string, role: "admin" | "seller" | "user") => void
  logout: () => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [users, setUsers] = useState<User[]>(sampleUsers)
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [cart, setCart] = useState<CartItem[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const addProduct = useCallback((product: Product) => {
    setProducts((prev) => [...prev, product])
  }, [])

  const updateProduct = useCallback((product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)))
  }, [])

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const addUser = useCallback((user: User) => {
    setUsers((prev) => [...prev, user])
  }, [])

  const deleteUser = useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }, [])

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId))
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    )
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const checkout = useCallback(() => {
    if (cart.length === 0) return
    const newOrder: Order = {
      id: `o${Date.now()}`,
      userId: currentUser?.id || "guest",
      userName: currentUser?.name || "Guest",
      products: cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    }
    setOrders((prev) => [...prev, newOrder])
    setCart([])
  }, [cart, currentUser])

  const login = useCallback(
    (email: string, role: "admin" | "seller" | "user") => {
      const user = users.find((u) => u.email === email)
      if (user) {
        setCurrentUser(user)
      } else {
        const newUser: User = {
          id: `u${Date.now()}`,
          name: email.split("@")[0],
          email,
          role,
          joined: new Date().toISOString().split("T")[0],
          status: "active",
        }
        setUsers((prev) => [...prev, newUser])
        setCurrentUser(newUser)
      }
    },
    [users]
  )

  const logout = useCallback(() => {
    setCurrentUser(null)
  }, [])

  const updateOrderStatus = useCallback((orderId: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)))
  }, [])

  return (
    <StoreContext.Provider
      value={{
        products,
        users,
        orders,
        cart,
        currentUser,
        addProduct,
        updateProduct,
        deleteProduct,
        addUser,
        deleteUser,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        checkout,
        login,
        logout,
        updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
