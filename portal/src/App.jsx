import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth.jsx'

// Páginas de autenticação
import LoginPage from './modules/autenticacao/LoginPage.jsx'
import RecuperarSenhaPage from './modules/autenticacao/RecuperarSenhaPage.jsx'
import NovaSenhaPage from './modules/autenticacao/NovaSenhaPage.jsx'

// Rota protegida
import RotaProtegida from './modules/autenticacao/RotaProtegida.jsx'

// Portal
import PortalPage from './modules/portal/PortalPage.jsx'

// Loading global
import LoadingScreen from './components/ui/LoadingScreen.jsx'

export default function App() {
  const { loading } = useAuth()

  if (loading) return <LoadingScreen />

  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
      <Route path="/nova-senha" element={<NovaSenhaPage />} />

      {/* Protegidas */}
      <Route
        path="/"
        element={
          <RotaProtegida>
            <PortalPage />
          </RotaProtegida>
        }
      />

      {/* Catch-all → redireciona para home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
