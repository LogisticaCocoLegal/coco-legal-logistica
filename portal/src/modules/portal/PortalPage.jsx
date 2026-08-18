import { useAuth } from '../../hooks/useAuth.jsx'
import AppHeader from '../../components/layout/AppHeader.jsx'
import ModuleCard from './ModuleCard.jsx'
import './portal.css'

const MODULOS = [
  {
    id: 'colaboradores',
    titulo: 'Colaboradores',
    descricao: 'Gestão do quadro de colaboradores, cargos, status e bases.',
    href: '/colaboradores',
    cor: '#6366f1',
    corDim: 'rgba(99,102,241,0.12)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    id: 'bases',
    titulo: 'Bases',
    descricao: 'Cadastro e gestão das bases operacionais da Coco Legal.',
    href: '/bases',
    cor: '#f59e0b',
    corDim: 'rgba(245,158,11,0.12)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'movimentacoes',
    titulo: 'Movimentações',
    descricao: 'Importação e conciliação de entregas: Planejado vs Executado.',
    href: '/movimentacoes',
    cor: '#22c55e',
    corDim: 'rgba(34,197,94,0.12)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    id: 'alteracao-referencia',
    titulo: 'Alteração de Referência',
    descricao: 'Alteração do código de referência de colaboradores com rastreabilidade.',
    href: '/alteracao-referencia',
    cor: '#ec4899',
    corDim: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
  },
  {
    id: 'observacoes',
    titulo: 'Observações',
    descricao: 'Anotações operacionais diárias por colaborador e base.',
    href: '/observacoes',
    cor: '#14b8a6',
    corDim: 'rgba(20,184,166,0.12)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    id: 'motivos',
    titulo: 'Motivos',
    descricao: 'Catálogo de motivos para observações e ocorrências operacionais.',
    href: '/motivos',
    cor: '#f97316',
    corDim: 'rgba(249,115,22,0.12)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/>
        <line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/>
        <line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
  {
    id: 'indicadores',
    titulo: 'Indicadores',
    descricao: 'Acompanhamento de KPIs operacionais por período e base.',
    href: '/indicadores',
    cor: '#a855f7',
    corDim: 'rgba(168,85,247,0.12)',
    em_breve: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
]

export default function PortalPage() {
  const { user, perfil } = useAuth()

  const saudacao = getSaudacao()

  return (
    <div className="portal-layout">
      <AppHeader />

      <main className="portal-main">
        {/* Hero de boas-vindas */}
        <section className="portal-hero">
          <div className="portal-hero-text">
            <p className="portal-hero-greeting">{saudacao}</p>
            <h1 className="portal-hero-title">
              {perfil?.nome ? perfil.nome.split(' ')[0] : (user?.email ? user.email.split('@')[0] : 'Operador')}
            </h1>
            <p className="portal-hero-sub">
              Selecione um módulo para começar
              {perfil?.perfil && (
                <span className="portal-hero-perfil"> · {perfil.perfil}</span>
              )}
            </p>
          </div>
        </section>

        {/* Grid de módulos */}
        <section className="portal-grid-section">
          <div className="portal-grid">
            {MODULOS.map((mod, i) => (
              <ModuleCard key={mod.id} modulo={mod} index={i} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function getSaudacao() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia,'
  if (h < 18) return 'Boa tarde,'
  return 'Boa noite,'
}
