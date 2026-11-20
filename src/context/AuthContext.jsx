import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'campusbite_users'
const SESSION_KEY = 'campusbite_session'

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore (private browsing, storage full, etc.)
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadJSON(USERS_KEY, []))
  const [currentUser, setCurrentUser] = useState(() => loadJSON(SESSION_KEY, null))

  useEffect(() => {
    saveJSON(USERS_KEY, users)
  }, [users])

  useEffect(() => {
    saveJSON(SESSION_KEY, currentUser)
  }, [currentUser])

  const signup = (name, email, password) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (existing) {
      return { success: false, error: 'Email already registered' }
    }
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: email.toLowerCase() === 'admin@canteen.com' ? 'admin' : 'student',
    }
    setUsers((prev) => [...prev, newUser])
    setCurrentUser(newUser)
    return { success: true }
  }

  const login = (email, password) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!user) {
      return { success: false, error: 'Invalid email or password' }
    }
    setCurrentUser(user)
    return { success: true }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
