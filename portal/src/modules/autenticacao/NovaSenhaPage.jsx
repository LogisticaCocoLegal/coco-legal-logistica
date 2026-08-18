import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../config/supabase.js'
import { updatePassword } from '../../lib/auth.js'
import './auth.css'

export default function NovaSenhaPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)

  // O Supabase detecta o token na URL automaticamente via detectSessionInUrl
  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true)
      }
    })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.')
      return
    }

    if (password !== confirm) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    const { error } = await updatePassword(password)

    if (error) {
      setError('Erro ao atualizar a senha. O link pode ter expirado.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setTimeout(() => navigate('/login'), 3000)
  }

  if (!sessionReady) {
    return (
      <div className="auth-layout">
        <div className="auth-bg">
          <div className="auth-bg-orb auth-bg-orb--1" />
          <div className="auth-bg-orb auth-bg-orb--2" />
          <div className="auth-bg-grid" />
        </div>
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <p className="auth-subtitle">Verificando link de redefinição…</p>
          <p style={{ marginTop: 12, fontSize: '0.8125rem', color: 'var(--clr-text-muted)' }}>
            Se você chegou aqui sem um link válido, <Link to="/recuperar-senha" className="field-link">solicite um novo</Link>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-layout">
      <div className="auth-bg">
        <div className="auth-bg-orb auth-bg-orb--1" />
        <div className="auth-bg-orb auth-bg-orb--2" />
        <div className="auth-bg-grid" />
      </div>

      <div className="auth-card">
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

        {success ? (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ margin: '0 auto 20px' }}>
              <circle cx="28" cy="28" r="27" stroke="#22c55e" strokeWidth="1.5" fill="rgba(34,197,94,0.08)"/>
              <path d="M18 28l7 7 13-13" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="auth-title" style={{ marginBottom: 8 }}>Senha atualizada!</h2>
            <p className="auth-subtitle">Redirecionando para o login…</p>
          </div>
        ) : (
          <>
            <div className="auth-header">
              <h2 className="auth-title">Nova senha</h2>
              <p className="auth-subtitle">Defina uma nova senha para sua conta.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* Nova senha */}
              <div className="field">
                <label className="field-label" htmlFor="nova-senha">Nova senha</label>
                <div className="field-input-wrap">
                  <span className="field-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    id="nova-senha"
                    className="field-input field-input--has-toggle"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button type="button" className="field-toggle" onClick={() => setShowPassword(v => !v)}>
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirmar senha */}
              <div className="field">
                <label className="field-label" htmlFor="confirmar-senha">Confirmar senha</label>
                <div className="field-input-wrap">
                  <span className="field-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    id="confirmar-senha"
                    className="field-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Repita a nova senha"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {error && (
                <div className="auth-error" role="alert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <button id="btn-nova-senha" type="submit" className="btn-primary" disabled={loading || !password || !confirm}>
                {loading ? <><span className="btn-spinner" /> Salvando…</> : 'Salvar nova senha'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
