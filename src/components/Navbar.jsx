import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, User, LogOut, Menu, X, ChefHat, ClipboardList, UtensilsCrossed } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const { itemCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  const isActive = (path) => location.pathname === path

  const navLinks = currentUser?.role === 'admin'
    ? [
        { to: '/admin', label: 'Dashboard', icon: ChefHat },
        { to: '/menu', label: 'Menu', icon: UtensilsCrossed },
      ]
    : [
        { to: '/menu', label: 'Menu', icon: UtensilsCrossed },
        { to: '/orders', label: 'My Orders', icon: ClipboardList },
      ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-4">
        <div className="glass rounded-2xl shadow-lg shadow-purple-500/10 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 20 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center"
              >
                <span className="text-xl">🍛</span>
              </motion.div>
              <span className="text-xl font-bold gradient-text">
                guu kha
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {currentUser && navLinks.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive(to)
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {currentUser ? (
                <>
                  {currentUser.role !== 'admin' && (
                    <Link to="/cart">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <ShoppingCart size={22} className="text-gray-600" />
                        {itemCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs flex items-center justify-center font-bold"
                          >
                            {itemCount}
                          </motion.span>
                        )}
                      </motion.div>
                    </Link>
                  )}
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100">
                    <User size={14} className="text-primary-600" />
                    <span className="text-sm font-medium text-primary-700">{currentUser.name}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="hidden md:flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LogOut size={16} />
                  </motion.button>
                </>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-2 text-sm font-medium text-white btn-gradient rounded-xl"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-4 pb-2 border-t border-gray-200/50 mt-3 space-y-1">
                  {currentUser ? (
                    <>
                      <div className="flex items-center gap-2 px-3 py-2 mb-2 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50">
                        <User size={16} className="text-primary-600" />
                        <span className="text-sm font-medium text-primary-700">{currentUser.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-600 ml-auto">{currentUser.role}</span>
                      </div>
                      {navLinks.map(({ to, label, icon: Icon }) => (
                        <Link key={to} to={to} onClick={() => setIsOpen(false)}>
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium ${
                            isActive(to) ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                          }`}>
                            <Icon size={16} />
                            {label}
                          </div>
                        </Link>
                      ))}
                      {currentUser.role !== 'admin' && (
                        <Link to="/cart" onClick={() => setIsOpen(false)}>
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100">
                            <ShoppingCart size={16} />
                            Cart {itemCount > 0 && `(${itemCount})`}
                          </div>
                        </Link>
                      )}
                      <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full">
                        <LogOut size={16} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <div className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100">Login</div>
                      </Link>
                      <Link to="/signup" onClick={() => setIsOpen(false)}>
                        <div className="px-3 py-2 rounded-xl text-sm font-medium text-white btn-gradient text-center">Sign Up</div>
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  )
}
