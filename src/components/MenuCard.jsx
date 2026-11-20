import { motion } from 'framer-motion'
import { Plus, Minus, Clock, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function MenuCard({ item }) {
  const { items, addItem, updateQuantity } = useCart()
  const cartItem = items.find((i) => i.id === item.id)
  const quantity = cartItem?.quantity || 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 card-hover group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${
            item.isVeg ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-white/90 text-gray-700 flex items-center gap-1">
            <Clock size={12} /> {item.prepTime} min
          </span>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1.5 rounded-xl text-sm font-bold bg-white/95 text-gray-900 shadow-lg">
            ₹{item.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-600 font-medium whitespace-nowrap">
            {item.category}
          </span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.description}</p>

        {/* Add to Cart */}
        {quantity === 0 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addItem(item)}
            className="w-full py-2.5 btn-gradient text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </motion.button>
        ) : (
          <div className="flex items-center justify-between bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-1">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => updateQuantity(item.id, quantity - 1)}
              className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors"
            >
              <Minus size={16} />
            </motion.button>
            <motion.span
              key={quantity}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="text-lg font-bold text-primary-700"
            >
              {quantity}
            </motion.span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => addItem(item)}
              className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 shadow-sm flex items-center justify-center text-white hover:shadow-lg transition-all"
            >
              <Plus size={16} />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
