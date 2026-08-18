-- =============================================================
-- PROJETO: COCO LEGAL LOGÍSTICA
-- ARQUIVO: Supabase/policies/rls_overview.sql
-- DESCRIÇÃO: Visão consolidada das políticas RLS por módulo
-- =============================================================

/*
  MATRIZ DE ACESSO — Row Level Security

  ┌──────────────────────────┬───────┬────────────┬─────────┐
  │ Tabela                   │  CEO  │ Supervisão │ Operação│
  ├──────────────────────────┼───────┼────────────┼─────────┤
  │ tb_bases                 │ R/W   │ R          │ R       │
  │ tb_colaboradores         │ R/W   │ R/W        │ R       │
  │ tb_usuarios              │ R/W   │ R (próprio)│ R(props)│
  │ tb_movimentacoes         │ R/W   │ R/W        │ R/W     │
  │ tb_importacoes           │ R/W   │ R/W        │ R       │
  │ tb_motivos               │ R/W   │ R/W        │ R       │
  │ tb_observacoes           │ R/W   │ R/W        │ R/W     │
  │ tb_historico_referencia  │ R/W   │ R/W        │ R       │
  │ tb_indicadores           │ R     │ R          │ R       │
  └──────────────────────────┴───────┴────────────┴─────────┘

  R = SELECT | W = INSERT, UPDATE, DELETE

  NOTA: As políticas estão definidas individualmente em cada migration.
  Este arquivo serve como referência centralizada.
*/
