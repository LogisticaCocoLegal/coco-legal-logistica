-- =============================================================
-- PROJETO: COCO LEGAL LOGÍSTICA
-- ARQUIVO: Supabase/migrations/004_movimentacoes.sql
-- DESCRIÇÃO: Tabelas de movimentações operacionais (planejado x executado)
-- =============================================================

-- ─────────────────────────────────────────
-- tb_movimentacoes
-- ─────────────────────────────────────────
-- Registra todas as movimentações diárias de entregas.
-- Tipos derivados da conciliação entre Planejado e Executado.

CREATE TABLE IF NOT EXISTS public.tb_movimentacoes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_referencia     DATE NOT NULL,
  colaborador_id      UUID REFERENCES public.tb_colaboradores(id) ON DELETE SET NULL,
  base_id             UUID REFERENCES public.tb_bases(id) ON DELETE SET NULL,

  -- Planejado
  planejado           BOOLEAN NOT NULL DEFAULT false,
  qtd_planejada       INT NOT NULL DEFAULT 0,

  -- Executado
  executado           BOOLEAN NOT NULL DEFAULT false,
  qtd_executada       INT NOT NULL DEFAULT 0,

  -- Tipo derivado (calculado ou informado)
  tipo                TEXT CHECK (tipo IN (
    'Executada', 'Cancelado', 'Encaixe', 'Transferido', 'Recebido'
  )),

  -- Conciliação
  colaborador_planejado_id UUID REFERENCES public.tb_colaboradores(id) ON DELETE SET NULL,
  colaborador_executado_id UUID REFERENCES public.tb_colaboradores(id) ON DELETE SET NULL,

  -- Metadados
  importacao_id       UUID REFERENCES public.tb_importacoes(id) ON DELETE SET NULL,
  criado_em           TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em       TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tb_movimentacoes IS 'Movimentações diárias — conciliação Planejado x Executado.';
COMMENT ON COLUMN public.tb_movimentacoes.tipo IS 
  'Cancelado: planejado sem executado. Encaixe: executado sem planejado. Transferido: entregadores diferentes.';

CREATE TRIGGER trg_movimentacoes_atualizado_em
  BEFORE UPDATE ON public.tb_movimentacoes
  FOR EACH ROW EXECUTE FUNCTION public.set_atualizado_em();

-- RLS
ALTER TABLE public.tb_movimentacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "movimentacoes_select" ON public.tb_movimentacoes
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "movimentacoes_write" ON public.tb_movimentacoes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.tb_usuarios u
      WHERE u.auth_user_id = auth.uid() AND u.perfil IN ('CEO', 'Supervisão', 'Operação')
    )
  );

-- ─────────────────────────────────────────
-- tb_importacoes
-- ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.tb_importacoes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  arquivo             TEXT NOT NULL,
  tipo_importacao     TEXT NOT NULL CHECK (tipo_importacao IN (
    'Planejado', 'Executado', 'Ponto', 'LalaMove RJ', 'LalaMove SP'
  )),
  hash_arquivo        TEXT NOT NULL UNIQUE,
  quantidade_registros INT,
  status              TEXT NOT NULL DEFAULT 'Processando' CHECK (status IN (
    'Processando', 'Concluído', 'Erro'
  )),
  usuario_id          UUID REFERENCES public.tb_usuarios(id),
  data_referencia     DATE,
  criado_em           TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tb_importacoes IS 'Histórico e controle de todas as importações do sistema.';
COMMENT ON COLUMN public.tb_importacoes.hash_arquivo IS 'Hash MD5/SHA256 do arquivo — previne importação duplicada.';

ALTER TABLE public.tb_importacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "importacoes_select" ON public.tb_importacoes
  FOR SELECT USING (auth.role() = 'authenticated');
