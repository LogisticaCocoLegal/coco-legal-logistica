# Arquitetura — Integração com Supabase Auth

## Visão Geral

O portal utiliza **Supabase Auth** como sistema de autenticação. O modelo adota a estratégia de **usuário estendido**: o `auth.users` gerenciado pelo Supabase é vinculado à `tb_usuarios` do schema `public`, que contém os dados operacionais do perfil.

---

## Fluxo de Autenticação

```
┌─────────────┐     email/senha      ┌──────────────────┐
│   Browser   │ ──────────────────▶  │  Supabase Auth   │
│  (Portal)   │                      │  (auth.users)    │
└─────────────┘ ◀──────────────────  └──────────────────┘
                   JWT + session               │
                                               │ auth_user_id
                                               ▼
                                      ┌──────────────────┐
                                      │   tb_usuarios    │
                                      │  (public schema) │
                                      │                  │
                                      │  - nome          │
                                      │  - perfil        │
                                      │  - base_id       │
                                      │  - ativo         │
                                      └──────────────────┘
```

### Etapas

1. Usuário informa e-mail e senha na tela de Login
2. `supabase.auth.signInWithPassword()` autentica via Supabase Auth
3. Supabase retorna **JWT** com `sub = auth_user_id`
4. O portal busca o perfil operacional em `tb_usuarios` filtrando por `auth_user_id`
5. O contexto `AuthProvider` disponibiliza `user`, `perfil` e helpers de permissão para toda a aplicação

---

## Camadas de Segurança

### 1. JWT (Supabase)
- Token gerado com validade de **1 hora**
- Auto-refresh automático pelo SDK (configurado em `config/supabase.js`)
- Contém o papel (`anon` | `authenticated`) e o `user_id`

### 2. Row Level Security (RLS)
- Todas as tabelas têm **RLS ativado**
- Políticas verificam `auth.uid()` em tempo de query
- Nenhuma query de dados é executada sem token válido

### 3. Perfis Operacionais (`tb_usuarios.perfil`)

| Perfil      | Acesso                                             |
|-------------|---------------------------------------------------|
| `CEO`       | Leitura e escrita em todos os módulos             |
| `Supervisão`| Leitura geral + escrita em colaboradores e obs    |
| `Operação`  | Leitura geral + lançamento de movimentações e obs |

---

## Estrutura de Arquivos de Auth

```
portal/src/
├── config/
│   └── supabase.js          ← instância única do cliente Supabase
├── lib/
│   └── auth.js              ← funções: signIn, signOut, getSession, getCurrentUser
├── hooks/
│   └── useAuth.js           ← AuthContext + AuthProvider + useAuth()
└── modules/
    └── autenticacao/
        ├── index.js          ← barrel export
        ├── LoginPage.jsx     ← UI de login
        ├── NovaSenhaPage.jsx ← UI de redefinição de senha
        └── RotaProtegida.jsx ← HOC guard com verificação de perfil
```

---

## Gerenciamento de Sessão

```js
// Verificar se usuário está autenticado
const { isAutenticado, perfil } = useAuth()

// Proteger uma rota apenas para CEO e Supervisão
<RotaProtegida perfisPermitidos={['CEO', 'Supervisão']}>
  <PaginaRestrita />
</RotaProtegida>

// Proteger rota para qualquer usuário autenticado
<RotaProtegida>
  <PaginaGeral />
</RotaProtegida>
```

---

## Redefinição de Senha

1. Usuário solicita reset → `resetPassword(email)` envia e-mail via Supabase
2. Link redireciona para `/auth/nova-senha`
3. `NovaSenhaPage` captura token da URL via `detectSessionInUrl: true`
4. `updatePassword(newPassword)` define a nova senha

---

## Provisão de Usuários

> Usuários são criados manualmente pelo CEO via painel do Supabase (Dashboard) ou pela função administrativa futura.

**Processo:**
1. Criar usuário em **Supabase Auth Dashboard** (Authentication → Users)
2. Inserir registro correspondente em `tb_usuarios` com o `auth_user_id` gerado
3. Definir `perfil` e `base_id` conforme o colaborador

---

## Variáveis de Ambiente

Criar arquivo `.env` na raiz de `portal/`:

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key-aqui>
```

> **Nunca** commitar o arquivo `.env`. Adicione ao `.gitignore`.
