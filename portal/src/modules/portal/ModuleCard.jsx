import { Link } from 'react-router-dom'
import './portal.css'

export default function ModuleCard({ modulo, index }) {
  const { titulo, descricao, href, cor, corDim, icon, em_breve } = modulo

  const content = (
    <div
      className={`module-card ${em_breve ? 'module-card--soon' : ''}`}
      style={{
        '--card-color': cor,
        '--card-color-dim': corDim,
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div className="module-card-icon" style={{ background: corDim, color: cor }}>
        {icon}
      </div>

      <div className="module-card-body">
        <div className="module-card-title-row">
          <h2 className="module-card-title">{titulo}</h2>
          {em_breve && <span className="module-card-badge">Em breve</span>}
        </div>
        <p className="module-card-desc">{descricao}</p>
      </div>

      <div className="module-card-arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
        </svg>
      </div>

      {/* Borda colorida no hover */}
      <div className="module-card-glow" />
    </div>
  )

  if (em_breve) return content

  return <Link to={href} id={`card-${modulo.id}`}>{content}</Link>
}
