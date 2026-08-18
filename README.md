# Portal Operacional — Coco Legal Logística

Sistema de gestão operacional com Supabase + React.

## Estrutura do Projeto

```
coco-legal-logistica/
│
├── docs/                          ← Documentação do projeto
│   ├── 15-arquitetura-auth.md     ← Arquitetura Supabase Auth
│   ├── 16-regras-negocio-portal.md← Regras de negócio dos módulos
│   └── 17-roadmap-portal.md       ← Roadmap de desenvolvimento
│
├── Supabase/                      ← Assets do Supabase
│   ├── migrations/                ← Scripts SQL versionados
│   │   ├── 001_usuarios.sql
│   │   ├── 002_bases.sql
│   │   ├── 003_colaboradores.sql
│   │   ├── 004_movimentacoes.sql
│   │   └── 005_ocorrencias.sql
│   ├── seeds/                     ← Dados iniciais
│   │   └── 001_dados_iniciais.sql
│   ├── policies/                  ← Referência de políticas RLS
│   │   └── rls_overview.sql
│   └── functions/                 ← Edge Functions (futuro)
│
└── portal/                        ← Frontend React (Vite)
    ├── .env.example               ← Template de variáveis de ambiente
    └── src/
        ├── config/
        │   └── supabase.js        ← Instância do cliente Supabase
        ├── lib/
        │   └── auth.js            ← Serviço de autenticação
        ├── hooks/
        │   └── useAuth.js         ← AuthContext + AuthProvider + useAuth()
        ├── types/
        │   └── index.js           ← Enums, constantes e tipos do domínio
        ├── components/
        │   ├── ui/                ← Componentes reutilizáveis (Button, Input…)
        │   └── layout/            ← Layouts (Sidebar, Header, MainLayout…)
        ├── styles/                ← CSS global e tokens de design
        ├── utils/                 ← Funções utilitárias puras
        └── modules/
            ├── README.md          ← Convenção de estrutura de módulos
            ├── autenticacao/      ← Login, logout, guard de rotas
            ├── colaboradores/     ← CRUD de colaboradores
            ├── bases/             ← Gestão de bases
            ├── movimentacoes/     ← Importação e conciliação de entregas
            ├── alteracao-referencia/ ← Histórico de referência
            ├── observacoes/       ← Anotações operacionais
            ├── motivos/           ← Catálogo de motivos
            └── indicadores/       ← KPIs (fase posterior)
```

## Próximos Passos

1. Criar o projeto Vite em `portal/`
2. Instalar `@supabase/supabase-js`
3. Configurar `.env` com URL e chave do Supabase
4. Rodar migrations no Supabase (em ordem: 001 → 005)
5. Rodar seed `001_dados_iniciais.sql`
6. Implementar `LoginPage.jsx`

## Documentação

| Documento | Link |
|-----------|------|
| Roadmap | [17-roadmap-portal.md](docs/17-roadmap-portal.md) |
| Regras de Negócio | [16-regras-negocio-portal.md](docs/16-regras-negocio-portal.md) |
| Arquitetura Auth | [15-arquitetura-auth.md](docs/15-arquitetura-auth.md) |
| Módulos (convenção) | [portal/src/modules/README.md](portal/src/modules/README.md) |
