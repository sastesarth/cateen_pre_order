import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ShoppingCart, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MenuCard from '../components/MenuCard'
import menuItems from '../data/menuItems'
import { useCart } from '../context/CartContext'

const categories = ['All', 'Snacks', 'Meals', 'Beverages', 'Combos']

export default function Menu() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [vegOnly, setVegOnly] = useState(false)
  const { itemCount, total } = useCart()

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const matchesVeg = !vegOnly || item.isVeg
      return matchesSearch && matchesCategory && matchesVeg
    })
  }, [search, activeCategory, vegOnly])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Header */}
      <div className="pt-28 pb-8 px-6 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Our Menu 🍽️</h1>
            <p className="text-primary-100">Pick your favourites and pre-order for your break</p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for samosa, chai, biryani..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-white outline-none text-gray-700 placeholder-gray-400"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                vegOnly
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                  : 'bg-white/90 text-gray-600 hover:bg-white'
              }`}
            >
              <Filter size={16} />
              {vegOnly ? '🟢 Veg Only' : 'Veg Filter'}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{filteredItems.length}</span> items
          </p>
        </div>

        {filteredItems.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No items found</h3>
            <p className="text-gray-500">Try a different search or category</p>
          </motion.div>
        )}
      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 btn-gradient text-white rounded-2xl font-semibold shadow-2xl shadow-primary-500/30 flex items-center gap-3"
              >
                <ShoppingCart size={20} />
                <span>View Cart ({itemCount} items)</span>
                <span className="px-3 py-1 rounded-xl bg-white/20 font-bold">₹{total}</span>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
