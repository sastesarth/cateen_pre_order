import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Package, ChefHat, CheckCircle2, ArrowRight, Users, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'

const statusFlow = ['pending', 'preparing', 'ready', 'collected']

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: Package,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    btnGradient: 'from-blue-500 to-cyan-400',
    nextLabel: 'Start Preparing',
  },
  preparing: {
    label: 'Preparing',
    icon: ChefHat,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    btnGradient: 'from-green-500 to-emerald-400',
    nextLabel: 'Mark Ready',
  },
  ready: {
    label: 'Ready',
    icon: CheckCircle2,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    btnGradient: 'from-gray-500 to-gray-600',
    nextLabel: 'Mark Collected',
  },
  collected: {
    label: 'Collected',
    icon: CheckCircle2,
    color: 'text-gray-500',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    btnGradient: '',
    nextLabel: '',
  },
}

export default function Admin() {
  const { currentUser } = useAuth()
  const { orders, updateOrderStatus } = useOrders()
  const [filter, setFilter] = useState('all')

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-28 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="text-7xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Admin Access Only</h2>
            <p className="text-gray-500 mb-6">
              This page is for canteen staff only. Sign up with <strong>admin@canteen.com</strong> to access the admin panel.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/login">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 btn-gradient text-white rounded-xl font-semibold">
                  Log In as Admin
                </motion.button>
              </Link>
              <Link to="/menu">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200">
                  Back to Menu
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const handleAdvanceStatus = (orderId, currentStatus) => {
    const idx = statusFlow.indexOf(currentStatus)
    if (idx < statusFlow.length - 1) {
      updateOrderStatus(orderId, statusFlow[idx + 1])
    }
  }

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((o) => o.status === filter)

  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const preparingCount = orders.filter((o) => o.status === 'preparing').length
  const readyCount = orders.filter((o) => o.status === 'ready').length
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-28 max-w-6xl mx-auto px-6 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage canteen orders in real-time</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: orders.length, icon: ShoppingBag, gradient: 'from-primary-500 to-accent-500' },
            { label: 'Pending', value: pendingCount, icon: Package, gradient: 'from-amber-400 to-orange-400' },
            { label: 'Preparing', value: preparingCount, icon: ChefHat, gradient: 'from-blue-400 to-cyan-400' },
            { label: 'Revenue', value: `₹${totalRevenue}`, icon: TrendingUp, gradient: 'from-green-400 to-emerald-400' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-sm card-hover"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3`}>
                <stat.icon size={18} className="text-white" />
              </div>
              <div className="text-2xl font-black text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'pending', label: `Pending (${pendingCount})` },
            { key: 'preparing', label: `Preparing (${preparingCount})` },
            { key: 'ready', label: `Ready (${readyCount})` },
            { key: 'collected', label: 'Collected' },
          ].map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filter === tab.key
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No orders found</h3>
            <p className="text-gray-500">
              {filter === 'all' ? 'Orders will appear here when students place them' : `No ${filter} orders right now`}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredOrders.map((order, idx) => {
                const config = statusConfig[order.status]
                const StatusIcon = config.icon
                const isLast = order.status === 'collected'

                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
                  >
                    <div className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                            <StatusIcon size={18} className={config.color} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900">{order.id}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} ${config.border} border font-medium`}>
                                {config.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                              <span className="flex items-center gap-1"><Users size={12} /> {order.userName}</span>
                              <span className="flex items-center gap-1"><Clock size={12} /> Pickup: {order.pickupTime}</span>
                            </div>
                          </div>
                        </div>

                        {!isLast && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAdvanceStatus(order.id, order.status)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${config.btnGradient} shadow-md flex items-center gap-1`}
                          >
                            {config.nextLabel}
                            <ArrowRight size={14} />
                          </motion.button>
                        )}
                      </div>

                      {/* Items */}
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 text-sm">
                            <img src={item.image} alt={item.name} className="w-6 h-6 rounded object-cover" />
                            <span className="text-gray-700">{item.name}</span>
                            <span className="text-gray-400">×{item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                        <span className="font-bold gradient-text">₹{order.total}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
