import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import './AppHeader.css'

export default function AppHeader() {
  const { user, perfil, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  const userDisplayName = perfil?.nome || user?.email || 'Usuário'
  const userRole = perfil?.perfil || 'Operação'

  return (
    <header className="app-header">
      <div className="app-header-container">
        {/* Brand/Logo */}
        <div className="app-header-brand">
          <div className="app-header-logo">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3z" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1.5"/>
              <path d="M11 16.5l3.5 3.5 6.5-7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="app-header-title-wrap">
            <span className="app-header-title">Coco Legal</span>
            <span className="app-header-subtitle">Portal Operacional</span>
          </div>
        </div>

        {/* User profile & Logout */}
        <div className="app-header-user-zone">
          <div className="app-header-user-info">
            <div className="app-header-avatar">
              {userDisplayName.charAt(0).toUpperCase()}
            </div>
            <div className="app-header-user-details">
              <span className="app-header-user-name">{userDisplayName}</span>
              <span className="app-header-user-role">{userRole}</span>
            </div>
          </div>

          <button
            type="button"
            className="app-header-logout-btn"
            onClick={handleLogout}
            title="Encerrar sessão"
            id="btn-logout"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  )
}
