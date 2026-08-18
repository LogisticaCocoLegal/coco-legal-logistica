import { useState } from 'react'
import { Link } from 'react-router-dom'
import { resetPassword } from '../../lib/auth.js'
import './auth.css'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await resetPassword(email.trim())

    if (error) {
      setError('Erro ao enviar e-mail. Verifique o endereço e tente novamente.')
      setLoading(false)
      return
    }

    setEnviado(true)
    setLoading(false)
  }

  return (
    <div className="auth-layout">
      <div className="auth-bg">
        <div className="auth-bg-orb auth-bg-orb--1" />
        <div className="auth-bg-orb auth-bg-orb--2" />
        <div className="auth-bg-grid" />
      </div>

      <div className="auth-card">
        {/* Marca */}
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

        {!enviado ? (
          <>
            <div className="auth-header">
              <h2 className="auth-title">Recuperar senha</h2>
              <p className="auth-subtitle">
                Informe seu e-mail e enviaremos um link para redefinir sua senha.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label className="field-label" htmlFor="recover-email">E-mail</label>
                <div className="field-input-wrap">
                  <span className="field-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <input
                    id="recover-email"
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

              {error && (
                <div className="auth-error" role="alert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <button
                id="btn-recuperar"
                type="submit"
                className="btn-primary"
                disabled={loading || !email}
              >
                {loading ? (
                  <><span className="btn-spinner" /> Enviando…</>
                ) : (
                  'Enviar link de redefinição'
                )}
              </button>

              <Link to="/login" className="auth-back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Voltar para o login
              </Link>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ marginBottom: 20 }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ margin: '0 auto 16px' }}>
                <circle cx="28" cy="28" r="27" stroke="#22c55e" strokeWidth="1.5" fill="rgba(34,197,94,0.08)"/>
                <path d="M18 28l7 7 13-13" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="auth-title" style={{ marginBottom: 8 }}>E-mail enviado!</h2>
            <p className="auth-subtitle" style={{ marginBottom: 24 }}>
              Verifique sua caixa de entrada em <strong style={{ color: 'var(--clr-text-primary)' }}>{email}</strong> e clique no link para redefinir sua senha.
            </p>
            <div className="auth-info" style={{ textAlign: 'left', marginBottom: 24 }}>
              Não encontrou o e-mail? Verifique a pasta de spam ou aguarde alguns minutos.
            </div>
            <Link to="/login" className="auth-back" style={{ justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Voltar para o login
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
