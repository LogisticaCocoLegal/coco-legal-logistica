import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import LoadingScreen from '../../components/ui/LoadingScreen.jsx'

/**
 * Guarda de rota com redirecionamento automático para /login.
 * Preserva a URL original no state para redirect após login.
 *
 * @param {string[]} [perfisPermitidos] - Se vazio, aceita qualquer usuário autenticado.
 */
export default function RotaProtegida({ children, perfisPermitidos = [] }) {
  const { isAutenticado, perfil, loading } = useAuth()
  const location = useLocation()

  // Enquanto resolve a sessão, mostra spinner
  if (loading) return <LoadingScreen />

  // Não autenticado → redireciona para /login, preservando rota de origem
  if (!isAutenticado) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Perfil sem permissão para esta rota
  if (perfisPermitidos.length > 0 && !perfisPermitidos.includes(perfil?.perfil)) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--clr-text-secondary)' }}>
        Acesso negado. Seu perfil não tem permissão para esta área.
      </div>
    )
  }

  return children
}
