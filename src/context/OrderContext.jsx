import { createContext, useContext, useState, useEffect } from 'react'

const OrderContext = createContext(null)
const ORDERS_KEY = 'campusbite_orders'

function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders)

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
    } catch {
      // ignore
    }
  }, [orders])

  const placeOrder = (cartItems, total, pickupTime, userId, userName) => {
    const newOrder = {
      id: 'ORD-' + Date.now().toString(36).toUpperCase(),
      items: [...cartItems],
      total,
      pickupTime,
      userId,
      userName,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    )
  }

  const getUserOrders = (userId) => {
    return orders.filter((o) => o.userId === userId)
  }

  return (
    <OrderContext.Provider value={{ orders, placeOrder, updateOrderStatus, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}

export default OrderContext
