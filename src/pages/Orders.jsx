import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Package, ChefHat, CheckCircle2, ArrowLeft, ShoppingBag } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'

const statusConfig = {
  pending: {
    label: 'Order Placed',
    icon: Package,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    gradient: 'from-amber-400 to-orange-400',
    step: 1,
  },
  preparing: {
    label: 'Being Prepared',
    icon: ChefHat,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    gradient: 'from-blue-400 to-cyan-400',
    step: 2,
  },
  ready: {
    label: 'Ready for Pickup',
    icon: CheckCircle2,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    gradient: 'from-green-400 to-emerald-400',
    step: 3,
  },
  collected: {
    label: 'Collected',
    icon: CheckCircle2,
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    gradient: 'from-gray-400 to-gray-500',
    step: 4,
  },
}

const steps = ['Placed', 'Preparing', 'Ready', 'Collected']

export default function Orders() {
  const { currentUser } = useAuth()
  const { getUserOrders } = useOrders()

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-28 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-7xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Login Required</h2>
            <p className="text-gray-500 mb-6">Please log in to view your orders</p>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 btn-gradient text-white rounded-xl font-semibold"
              >
                Log In
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  const myOrders = getUserOrders(currentUser.id)

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
            <h1 className="text-3xl font-black text-gray-900">My Orders</h1>
            <p className="text-gray-500">{myOrders.length} {myOrders.length === 1 ? 'order' : 'orders'} placed</p>
          </div>
        </div>

        {myOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-7xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Your order history will appear here</p>
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 btn-gradient text-white rounded-xl font-semibold inline-flex items-center gap-2"
              >
                <ShoppingBag size={18} />
                Start Ordering
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {myOrders.map((order, idx) => {
              const config = statusConfig[order.status]
              const StatusIcon = config.icon
              const currentStep = config.step

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Order Header */}
                  <div className={`px-6 py-4 ${config.bg} ${config.border} border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center`}>
                        <StatusIcon size={20} className="text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-gray-900">{order.id}</span>
                        <span className={`ml-3 text-sm font-medium ${config.color}`}>{config.label}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> Pickup: {order.pickupTime}
                      </span>
                    </div>
                  </div>

                  <div className="px-6 py-5">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-6 px-4">
                      {steps.map((step, i) => (
                        <div key={step} className="flex items-center flex-1">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              i + 1 <= currentStep
                                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                                : 'bg-gray-200 text-gray-400'
                            }`}>
                              {i + 1 <= currentStep ? '✓' : i + 1}
                            </div>
                            <span className={`text-xs mt-1 ${i + 1 <= currentStep ? 'text-primary-600 font-medium' : 'text-gray-400'}`}>
                              {step}
                            </span>
                          </div>
                          {i < steps.length - 1 && (
                            <div className={`flex-1 h-1 mx-2 rounded-full ${
                              i + 1 < currentStep ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="text-sm font-medium text-gray-700">
                              {item.name} <span className="text-gray-400">× {item.quantity}</span>
                            </span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-dashed mt-4 pt-4 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-black text-lg gradient-text">₹{order.total}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
