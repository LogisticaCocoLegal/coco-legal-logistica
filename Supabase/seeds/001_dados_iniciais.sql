-- =============================================================
-- PROJETO: COCO LEGAL LOGÍSTICA
-- ARQUIVO: Supabase/seeds/001_dados_iniciais.sql
-- DESCRIÇÃO: Dados iniciais para desenvolvimento e homologação
-- =============================================================

-- ─────────────────────────────────────────
-- BASES OPERACIONAIS
-- ─────────────────────────────────────────

INSERT INTO public.tb_bases (nome, cidade, ativo) VALUES
  ('Rio Comprido - CD', 'Rio de Janeiro', true),
  ('Barra da Tijuca',   'Rio de Janeiro', true),
  ('Leblon',            'Rio de Janeiro', true),
  ('Niterói',           'Niterói',        true),
  ('Copacabana',        'Rio de Janeiro', true)
ON CONFLICT (nome) DO NOTHING;

-- ─────────────────────────────────────────
-- MOTIVOS PADRÃO
-- ─────────────────────────────────────────

INSERT INTO public.tb_motivos (descricao, categoria) VALUES
  ('Falta sem justificativa',       'Pessoas'),
  ('Atestado médico',               'Pessoas'),
  ('Atraso na saída',               'Operacional'),
  ('Reclamação de cliente',         'Qualidade'),
  ('Avaria de produto',             'Qualidade'),
  ('Falha no aplicativo',           'Operacional'),
  ('Acidente de trânsito',          'Operacional'),
  ('Encaixe autorizado',            'Operacional'),
  ('Transferência de rota',         'Operacional'),
  ('Alteração de referência',       'Pessoas'),
  ('Outros',                        'Outro')
ON CONFLICT (descricao) DO NOTHING;
