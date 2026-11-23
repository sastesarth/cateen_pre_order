import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, ShieldCheck, Zap, UtensilsCrossed, Users, Star } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

const features = [
  {
    icon: Clock,
    title: 'Skip the Queue',
    description: 'Pre-order during lectures and pick up your food right when the break starts.',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Zap,
    title: 'Quick & Easy',
    description: 'Browse the menu, add items, choose a pickup time — done in under a minute.',
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    icon: ShieldCheck,
    title: 'Order Tracking',
    description: 'Know exactly when your food is being prepared and when it\'s ready to collect.',
    gradient: 'from-green-500 to-emerald-400',
  },
  {
    icon: UtensilsCrossed,
    title: 'Full Canteen Menu',
    description: 'All your canteen favourites — from samosa and chai to thali and biryani.',
    gradient: 'from-emerald-500 to-green-400',
  },
]

const stats = [
  { value: '500+', label: 'Students Served' },
  { value: '18+', label: 'Menu Items' },
  { value: '< 2 min', label: 'Avg Order Time' },
  { value: '4.8', label: 'Rating', icon: Star },
]

const testimonials = [
  { name: 'sarth saste', role: 'B.Tech, AI&DS, 1st Year', text: 'CampusBite saved me so much time! I order during my morning lecture and my paratha is ready when I reach the canteen.', avatar: '👩‍🎓' },
  { name: 'sumit patil', role: 'B.tech,IT, 1st Year', text: 'No more standing in line for 20 minutes. The best thing to happen to our college canteen!', avatar: '👨‍🎓' },
  { name: 'yashika rathod', role: 'B Tech,CSE, 3rd Year', text: 'Love the UI and how smooth the ordering is. The combo meals are a great deal too!', avatar: '👩‍🔬' },
]

export default function Landing() {
  const { currentUser } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animated-gradient opacity-90" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-10 text-6xl opacity-20"
          >🍛</motion.div>
          <motion.div
            animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            className="absolute top-40 right-20 text-5xl opacity-20"
          >☕</motion.div>
          <motion.div
            animate={{ y: [-15, 25, -15], rotate: [0, 15, 0] }}
            transition={{ duration: 9, repeat: Infinity, delay: 2 }}
            className="absolute bottom-32 left-1/4 text-5xl opacity-20"
          >🥘</motion.div>
          <motion.div
            animate={{ y: [25, -15, 25] }}
            transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-20 right-1/3 text-4xl opacity-20"
          >🍵</motion.div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              🎓 Built for College Students
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            Skip the Queue,
            <br />
            <span className="text-yellow-300">Grab Your Bite!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Pre-order your favourite meals from the college canteen during lectures. 
            Your food will be ready exactly when your break starts!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {currentUser ? (
              <>
                <Link to="/menu">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-lg shadow-2xl shadow-black/20 hover:shadow-3xl flex items-center gap-2 group"
                  >
                    Browse Menu
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </motion.button>
                </Link>
                <Link to="/orders">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/20 transition-all"
                  >
                    My Orders
                  </motion.button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-lg shadow-2xl shadow-black/20 hover:shadow-3xl flex items-center gap-2 group"
                  >
                    Get Started Free
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </motion.button>
                </Link>
                <Link to="/menu">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-2xl font-bold text-lg backdrop-blur-sm hover:bg-white/20 transition-all"
                  >
                    Browse Menu
                  </motion.button>
                </Link>
              </>
            )}
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white shadow-sm"
              >
                <div className="text-3xl md:text-4xl font-black gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Why <span className="gradient-text">Munchcue</span>?
            </h2>
            <p className="text-lg text-gray-500 max-w-xl text-left">
              Everything you need for a hassle-free canteen experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white shadow-lg shadow-gray-100 card-hover group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl  mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg text-gray-500">Three simple steps to your meal</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', emoji: '📱', title: 'Browse & Order', desc: 'Open CampusBite during your lecture and pick your favourite items from the menu.' },
              { step: '02', emoji: '⏰', title: 'Choose Pickup Time', desc: 'Select the time you want to collect — we\'ll have it ready right on time.' },
              { step: '03', emoji: '🍛', title: 'Grab & Go', desc: 'Walk to the counter, show your order ID, and pick up your hot, fresh meal!' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Students <span className="gradient-text">Love It</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white shadow-lg shadow-gray-100 card-hover"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{t.avatar}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!currentUser && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-3xl animated-gradient p-12 text-center relative overflow-hidden"
            >
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                  Ready to Skip the Queue?
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
                  Join hundreds of students who are already ordering smarter. Sign up now — it's free!
                </p>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-white text-primary-700 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl inline-flex items-center gap-2 group"
                  >
                    Create Free Account
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
