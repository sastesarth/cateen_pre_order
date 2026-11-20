import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, UtensilsCrossed } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🍽️
          </motion.div>
          <h1 className="text-6xl font-black gradient-text mb-3">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">This plate's empty</h2>
          <p className="text-gray-500 mb-8">
            The page you're looking for isn't on the menu. Let's get you back somewhere tasty.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 btn-gradient text-white rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Home size={18} />
                Back Home
              </motion.button>
            </Link>
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <UtensilsCrossed size={18} />
                Browse Menu
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
