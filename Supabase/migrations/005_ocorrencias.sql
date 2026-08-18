-- =============================================================
-- PROJETO: COCO LEGAL LOGÍSTICA
-- ARQUIVO: Supabase/migrations/005_ocorrencias.sql
-- DESCRIÇÃO: Módulos de observações, motivos e ocorrências
-- =============================================================

-- ─────────────────────────────────────────
-- tb_motivos
-- ─────────────────────────────────────────
-- Tabela de catálogo de motivos para ocorrências.

CREATE TABLE IF NOT EXISTS public.tb_motivos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  descricao   TEXT NOT NULL UNIQUE,
  categoria   TEXT CHECK (categoria IN ('Operacional', 'Qualidade', 'Pessoas', 'Outro')),
  ativo       BOOLEAN NOT NULL DEFAULT true,
  criado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tb_motivos IS 'Catálogo de motivos para observações e ocorrências.';

ALTER TABLE public.tb_motivos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "motivos_select" ON public.tb_motivos
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "motivos_write_ceo" ON public.tb_motivos
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.tb_usuarios u
      WHERE u.auth_user_id = auth.uid() AND u.perfil IN ('CEO', 'Supervisão')
    )
  );

-- ─────────────────────────────────────────
-- tb_observacoes
-- ─────────────────────────────────────────
-- Observações livres por colaborador / data.

CREATE TABLE IF NOT EXISTS public.tb_observacoes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  colaborador_id  UUID REFERENCES public.tb_colaboradores(id) ON DELETE CASCADE,
  data_referencia DATE NOT NULL,
  motivo_id       UUID REFERENCES public.tb_motivos(id) ON DELETE SET NULL,
  descricao       TEXT NOT NULL,
  usuario_id      UUID REFERENCES public.tb_usuarios(id),
  criado_em       TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em   TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tb_observacoes IS 'Observações operacionais diárias por colaborador.';

CREATE TRIGGER trg_observacoes_atualizado_em
  BEFORE UPDATE ON public.tb_observacoes
  FOR EACH ROW EXECUTE FUNCTION public.set_atualizado_em();

ALTER TABLE public.tb_observacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "observacoes_select" ON public.tb_observacoes
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "observacoes_write" ON public.tb_observacoes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.tb_usuarios u
      WHERE u.auth_user_id = auth.uid() AND u.perfil IN ('CEO', 'Supervisão', 'Operação')
    )
  );

-- ─────────────────────────────────────────
-- tb_indicadores
-- ─────────────────────────────────────────
-- Snapshots de indicadores calculados por período.

CREATE TABLE IF NOT EXISTS public.tb_indicadores (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data_referencia  DATE NOT NULL,
  base_id          UUID REFERENCES public.tb_bases(id) ON DELETE SET NULL,
  colaborador_id   UUID REFERENCES public.tb_colaboradores(id) ON DELETE SET NULL,
  tipo             TEXT NOT NULL CHECK (tipo IN (
    'Operação', 'Qualidade', 'Pessoas', 'Custos', 'Premiação', 'KM', 'Produtividade'
  )),
  metrica          TEXT NOT NULL,  -- Nome da métrica (ex: 'qtd_planejada')
  valor            NUMERIC,
  criado_em        TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tb_indicadores IS 'Snapshots de KPIs calculados — base para dashboards.';
COMMENT ON COLUMN public.tb_indicadores.metrica IS 'Nome da métrica armazenada (ex: qtd_planejada, qtd_executada, taxa_cancelamento).';

ALTER TABLE public.tb_indicadores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "indicadores_select" ON public.tb_indicadores
  FOR SELECT USING (auth.role() = 'authenticated');
