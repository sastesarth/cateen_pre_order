import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ArrowLeft, Clock, ShoppingBag, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'

const timeSlots = [
  '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
  '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
]

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, total, itemCount } = useCart()
  const { currentUser } = useAuth()
  const { placeOrder } = useOrders()
  const navigate = useNavigate()
  const [selectedTime, setSelectedTime] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)

  const handlePlaceOrder = () => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    if (!selectedTime) return

    const order = placeOrder(items, total, selectedTime, currentUser.id, currentUser.name)
    setPlacedOrder(order)
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced && placedOrder) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-28 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-5xl">✅</span>
            </motion.div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h1>
            <p className="text-gray-500 mb-6">Your order has been successfully placed</p>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Order ID</span>
                <span className="font-bold text-primary-600">{placedOrder.id}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Pickup Time</span>
                <span className="font-semibold flex items-center gap-1">
                  <Clock size={14} /> {placedOrder.pickupTime}
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">Items</span>
                <span className="font-semibold">{placedOrder.items.length} items</span>
              </div>
              <div className="border-t pt-4 flex items-center justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-black text-xl gradient-text">₹{placedOrder.total}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link to="/orders" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 btn-gradient text-white rounded-xl font-semibold"
                >
                  Track Order
                </motion.button>
              </Link>
              <Link to="/menu" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Order More
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-28 max-w-4xl mx-auto px-6 pb-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/menu">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </motion.button>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Your Cart</h1>
            <p className="text-gray-500">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
          </div>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-7xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some delicious items from the menu!</p>
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 btn-gradient text-white rounded-xl font-semibold"
              >
                Browse Menu
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="bg-white rounded-2xl p-4 shadow-sm flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900">{item.name}</h3>
                          <span className={`text-xs font-medium ${item.isVeg ? 'text-green-600' : 'text-red-500'}`}>
                            {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                          </span>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-md bg-white shadow-sm flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus size={14} />
                          </motion.button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-md bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-sm flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>
                        <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1 hover:underline"
              >
                <Trash2 size={14} /> Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-28">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} × {item.quantity}</span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-black text-xl gradient-text">₹{total}</span>
                  </div>
                </div>

                {/* Pickup Time */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-1">
                    <Clock size={14} /> Select Pickup Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <motion.button
                        key={time}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-2 rounded-lg text-xs font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {!currentUser && (
                  <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2">
                    <AlertCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700">
                      Please <Link to="/login" className="font-bold underline">log in</Link> to place your order
                    </p>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePlaceOrder}
                  disabled={!selectedTime || !currentUser}
                  className="w-full py-3.5 btn-gradient text-white rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <ShoppingBag size={18} />
                  Place Order — ₹{total}
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
