# Índice — Módulos do Portal Operacional

Este arquivo descreve a estrutura de cada módulo em `portal/src/modules/`.

---

## Convenção de Estrutura por Módulo

```
modules/<nome>/
├── index.js          ← barrel export (exports públicos)
├── <Nome>Page.jsx    ← página principal (listagem / visão geral)
├── <Nome>Form.jsx    ← formulário de criação e edição
├── <Nome>Detail.jsx  ← detalhe de um registro (quando necessário)
├── use<Nome>.js      ← hook dedicado (queries, mutations, estado local)
└── <nome>.service.js ← chamadas diretas ao Supabase (queries SQL)
```

---

## Módulos

### `autenticacao/`
Gerencia login, logout, redefinição de senha e guarda de rotas.

**Arquivos planejados:**
- `LoginPage.jsx`
- `NovaSenhaPage.jsx`
- `RotaProtegida.jsx` ✅

---

### `colaboradores/`
CRUD completo de colaboradores. Filtros por base, cargo e status.

**Arquivos planejados:**
- `ColaboradoresPage.jsx`
- `ColaboradorForm.jsx`
- `ColaboradorDetail.jsx`
- `useColaboradores.js`
- `colaboradores.service.js`

---

### `bases/`
Gestão das bases operacionais.

**Arquivos planejados:**
- `BasesPage.jsx`
- `BaseForm.jsx`
- `useBases.js`
- `bases.service.js`

---

### `movimentacoes/`
Importação, conciliação e visualização de entregas (Planejado x Executado).

**Arquivos planejados:**
- `MovimentacoesPage.jsx`
- `ImportacaoForm.jsx`
- `MovimentacaoDetail.jsx`
- `useMovimentacoes.js`
- `movimentacoes.service.js`
- `conciliacao.js` ← lógica de negócio pura (sem Supabase)

---

### `alteracao-referencia/`
Alterar referência de colaborador com rastreabilidade completa.

**Arquivos planejados:**
- `AlteracaoReferenciaPage.jsx`
- `AlteracaoReferenciaForm.jsx`
- `HistoricoReferencia.jsx`
- `useAlteracaoReferencia.js`
- `alteracao-referencia.service.js`

---

### `observacoes/`
Registro e listagem de observações operacionais diárias.

**Arquivos planejados:**
- `ObservacoesPage.jsx`
- `ObservacaoForm.jsx`
- `useObservacoes.js`
- `observacoes.service.js`

---

### `motivos/`
Catálogo de motivos para observações e ocorrências.

**Arquivos planejados:**
- `MotivosPage.jsx`
- `MotivoForm.jsx`
- `useMotivos.js`
- `motivos.service.js`

---

### `indicadores/`
Consulta e exibição de KPIs por período e base.

> Fase posterior — não criar telas ainda.

**Arquivos planejados:**
- `IndicadoresPage.jsx`
- `useIndicadores.js`
- `indicadores.service.js`
