# Roadmap — Portal Operacional Coco Legal

**Atualizado em:** Agosto 2026  
**Stack:** Supabase (Auth + PostgreSQL + Storage) + React (Vite)

---

## Status Global

| Fase | Nome                     | Status         |
|------|--------------------------|----------------|
| 0    | Estrutura do Projeto     | ✅ Concluída   |
| 1    | Autenticação             | 🔄 Em andamento|
| 2    | Colaboradores            | ⬜ Pendente    |
| 3    | Bases                    | ⬜ Pendente    |
| 4    | Motivos                  | ⬜ Pendente    |
| 5    | Movimentações            | ⬜ Pendente    |
| 6    | Alteração de Referência  | ⬜ Pendente    |
| 7    | Observações              | ⬜ Pendente    |
| 8    | Indicadores (base)       | ⬜ Pendente    |
| 9    | Importações              | ⬜ Pendente    |
| 10   | Jornada e Premiação      | ⬜ Pendente    |
| 11   | Dashboard Executivo      | ⬜ Pendente    |
| 12   | Chat Operacional         | ⬜ Pendente    |
| 13   | Aplicativo (PWA)         | ⬜ Pendente    |

---

## Fase 0 — Estrutura do Projeto ✅

**Objetivo:** Fundação técnica do projeto

### Entregas
- [x] Repositório GitHub configurado
- [x] Estrutura de pastas do portal (`portal/src/modules/...`)
- [x] Estrutura Supabase (`migrations/`, `seeds/`, `policies/`, `functions/`)
- [x] Documentação de regras de negócio
- [x] Documentação de arquitetura Auth
- [x] Tipos e constantes do domínio (`types/index.js`)
- [x] Seed de dados iniciais (bases e motivos)
- [x] Migrations iniciais (001–005)

---

## Fase 1 — Autenticação 🔄

**Objetivo:** Acesso seguro ao portal com controle de perfil

### Entregas
- [x] `config/supabase.js` — cliente Supabase configurado
- [x] `lib/auth.js` — serviço de autenticação
- [x] `hooks/useAuth.js` — AuthContext + AuthProvider
- [x] `modules/autenticacao/RotaProtegida.jsx` — guard de rotas
- [ ] `modules/autenticacao/LoginPage.jsx` — tela de login
- [ ] `modules/autenticacao/NovaSenhaPage.jsx` — redefinição de senha
- [ ] Variáveis de ambiente (`.env`)
- [ ] Teste de login e logout end-to-end

---

## Fase 2 — Colaboradores

**Objetivo:** Gestão completa do quadro de colaboradores

### Entregas
- [ ] Listagem de colaboradores com filtros (base, cargo, status)
- [ ] Formulário de cadastro e edição
- [ ] Ativação / desativação de colaboradores
- [ ] Visualização de histórico de referência

---

## Fase 3 — Bases

**Objetivo:** Gestão das bases operacionais

### Entregas
- [ ] Listagem de bases
- [ ] Formulário de cadastro e edição
- [ ] Ativação / desativação de base
- [ ] Vinculação de colaboradores por base

---

## Fase 4 — Motivos

**Objetivo:** Catálogo de motivos para observações e ocorrências

### Entregas
- [ ] Listagem de motivos por categoria
- [ ] Formulário de cadastro e edição
- [ ] Ativação / desativação de motivo

---

## Fase 5 — Movimentações

**Objetivo:** Registro e visualização das movimentações operacionais

### Entregas
- [ ] Importação de arquivo Planejado (CSV/XLSX)
- [ ] Importação de arquivo Executado (CSV/XLSX)
- [ ] Algoritmo de conciliação (chave: Data + Cliente + CEP)
- [ ] Classificação automática: Cancelado, Encaixe, Transferido, Recebido
- [ ] Visualização por data e colaborador

---

## Fase 6 — Alteração de Referência

**Objetivo:** Controle de mudanças de código de colaborador sem perder histórico

### Entregas
- [ ] Interface de alteração de referência
- [ ] Registro automático em `tb_historico_referencia`
- [ ] Exibição de histórico de alterações por colaborador

---

## Fase 7 — Observações

**Objetivo:** Anotações operacionais diárias por colaborador

### Entregas
- [ ] Formulário de registro de observação (colaborador + data + motivo + descrição)
- [ ] Listagem com filtros (colaborador, base, data, motivo)
- [ ] Edição de observações pelo autor

---

## Fase 8 — Indicadores (Base)

**Objetivo:** Cálculo e armazenamento dos KPIs operacionais

### Entregas
- [ ] Função de cálculo de indicadores por data/base
- [ ] Armazenamento em `tb_indicadores`
- [ ] API de consulta de indicadores por período

---

## Fase 9 — Importações

**Objetivo:** Módulo centralizado de importação de arquivos

### Entregas
- [ ] Upload de arquivos (Supabase Storage)
- [ ] Validação de hash para prevenir duplicatas
- [ ] Log de importação (`tb_importacoes`)
- [ ] Suporte a: Planejado, Executado, Ponto, LalaMove RJ, LalaMove SP

---

## Fase 10 — Jornada e Premiação

**Objetivo:** Controle de jornada e cálculo de premiações mensais

### Entregas
- [ ] Importação de ponto (entrada/saída)
- [ ] Registro de almoço (primeiro carregamento / última entrega)
- [ ] Cálculo automático de premiação por cargo
- [ ] Premiação manual de Motoboys (R$ 0 / R$ 20 / R$ 50)

---

## Fase 11 — Dashboard Executivo

**Objetivo:** Painéis por perfil (CEO, Supervisão, Operação)

### Entregas
- [ ] Dashboard CEO (visão consolidada)
- [ ] Dashboard Supervisão (por base)
- [ ] Dashboard Operação (por colaborador)

---

## Fase 12 — Chat Operacional

**Objetivo:** Comunicação interna por base

### Entregas
- [ ] Chat em tempo real (Supabase Realtime)
- [ ] Envio de fotos e arquivos
- [ ] Canais por base

---

## Fase 13 — Aplicativo (PWA)

**Objetivo:** Portal mobile para colaboradores em campo

### Entregas
- [ ] Login mobile
- [ ] Registro de almoço
- [ ] Registro de ocorrências
- [ ] Chat
- [ ] Indicadores pessoais
- [ ] Preparação para APK Android

---

## Princípios de Priorização

1. **Dados antes de interface** — migrations e seeds antes de telas
2. **Segurança desde o início** — RLS ativo desde a primeira migration
3. **Histórico preservado** — nenhum registro é deletado fisicamente
4. **Mobile-first** — todas as telas devem funcionar em telas pequenas
