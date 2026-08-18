import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import './auth.css'

export default function LoginPage() {
  const { login, isAutenticado } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Se já autenticado, redireciona para a página de destino ou home
  useEffect(() => {
    if (isAutenticado) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [isAutenticado, navigate, location])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await login(email.trim(), password)

    if (error) {
      setError(getMensagemErro(error.message))
      setLoading(false)
      return
    }

    const from = location.state?.from?.pathname || '/'
    navigate(from, { replace: true })
  }

  return (
    <div className="auth-layout">
      {/* Background decorativo */}
      <div className="auth-bg">
        <div className="auth-bg-orb auth-bg-orb--1" />
        <div className="auth-bg-orb auth-bg-orb--2" />
        <div className="auth-bg-grid" />
      </div>

      {/* Card de login */}
      <div className="auth-card">
        {/* Logo / Marca */}
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 3C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3z" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="1.5"/>
              <path d="M11 16.5l3.5 3.5 6.5-7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="auth-brand-title">Coco Legal</h1>
            <p className="auth-brand-sub">Portal Operacional</p>
          </div>
        </div>

        {/* Título */}
        <div className="auth-header">
          <h2 className="auth-title">Bem-vindo de volta</h2>
          <p className="auth-subtitle">Entre com suas credenciais para acessar o portal</p>
        </div>

        {/* Formulário */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* E-mail */}
          <div className="field">
            <label className="field-label" htmlFor="login-email">E-mail</label>
            <div className="field-input-wrap">
              <span className="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              <input
                id="login-email"
                className="field-input"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Senha */}
          <div className="field">
            <div className="field-label-row">
              <label className="field-label" htmlFor="login-password">Senha</label>
              <Link to="/recuperar-senha" className="field-link">Esqueceu a senha?</Link>
            </div>
            <div className="field-input-wrap">
              <span className="field-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                id="login-password"
                className="field-input field-input--has-toggle"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="field-toggle"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Erro */}
          {error && (
            <div className="auth-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Botão */}
          <button
            id="btn-login"
            type="submit"
            className="btn-primary"
            disabled={loading || !email || !password}
          >
            {loading ? (
              <>
                <span className="btn-spinner" />
                Entrando…
              </>
            ) : (
              'Entrar no Portal'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Tradução dos erros Supabase → PT-BR ──────────────────────
function getMensagemErro(msg) {
  if (!msg) return 'Erro inesperado. Tente novamente.'
  if (msg.includes('Invalid login credentials')) return 'E-mail ou senha incorretos.'
  if (msg.includes('Email not confirmed')) return 'Confirme seu e-mail antes de entrar.'
  if (msg.includes('Too many requests')) return 'Muitas tentativas. Aguarde alguns minutos.'
  if (msg.includes('User not found')) return 'Usuário não encontrado.'
  if (msg.includes('network')) return 'Sem conexão com o servidor. Verifique a internet.'
  return 'Erro ao entrar. Tente novamente.'
}
