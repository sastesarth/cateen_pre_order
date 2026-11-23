import { Heart, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Footer() {
  const { currentUser } = useAuth()

  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-xl">🍛</span>
              </div>
              <span className="text-xl font-bold text-white">Munchcue</span>
            </div>
            <p className="text-sm max-w-sm leading-relaxed">
              Skip the queue, pre-order your favourite meals from the college canteen and pick them up ready. No more waiting in long lines!
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="hover:text-primary-400 transition-colors">Menu</Link></li>
              {currentUser ? (
                <>
                  <li><Link to="/orders" className="hover:text-primary-400 transition-colors">My Orders</Link></li>
                  <li><Link to="/cart" className="hover:text-primary-400 transition-colors">Cart</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="hover:text-primary-400 transition-colors">Login</Link></li>
                  <li><Link to="/signup" className="hover:text-primary-400 transition-colors">Sign Up</Link></li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Mail size={14} /> canteen@college.edu</li>
              <li>Mon - Sat: 8AM - 6PM</li>
              <li>PICT(we will add respective college name)</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Munchcue Team
          </p>
        </div>
      </div>
    </footer>
  )
}
