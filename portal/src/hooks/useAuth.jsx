import { useState, useEffect, createContext, useContext } from 'react'
import { getCurrentUser, onAuthStateChange, signIn, signOut } from '../lib/auth.js'

// ─────────────────────────────────────────
// Context
// ─────────────────────────────────────────
const AuthContext = createContext(null)

// ─────────────────────────────────────────
// Provider
// ─────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadUser() {
      const { user, perfil } = await getCurrentUser()
      if (isMounted) {
        setUser(user)
        setPerfil(perfil)
        setLoading(false)
      }
    }
    loadUser()

    const unsubscribe = onAuthStateChange(async (event, session) => {
      if (session) {
        const { user, perfil } = await getCurrentUser()
        if (isMounted) {
          setUser(user)
          setPerfil(perfil)
          setLoading(false)
        }
      } else {
        if (isMounted) {
          setUser(null)
          setPerfil(null)
          setLoading(false)
        }
      }
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  async function login(email, password) {
    const { data, error } = await signIn(email, password)
    return { data, error }
  }

  async function logout() {
    await signOut()
    setUser(null)
    setPerfil(null)
  }

  const isCEO = perfil?.perfil === 'CEO'
  const isSupervisao = perfil?.perfil === 'Supervisão'
  const isOperacao = ['Operação', 'Operacional'].includes(perfil?.perfil) || !perfil?.perfil
  const isAutenticado = !!user

  return (
    <AuthContext.Provider
      value={{ user, perfil, loading, login, logout, isCEO, isSupervisao, isOperacao, isAutenticado }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ─────────────────────────────────────────
// Hook
// ─────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
  return context
}

