-- =============================================================
-- PROJETO: COCO LEGAL LOGÍSTICA
-- ARQUIVO: Supabase/migrations/002_bases.sql
-- DESCRIÇÃO: Tabela de bases operacionais
-- =============================================================

CREATE TABLE IF NOT EXISTS public.tb_bases (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome          TEXT NOT NULL UNIQUE,
  endereco      TEXT,
  cidade        TEXT NOT NULL DEFAULT 'Rio de Janeiro',
  ativo         BOOLEAN NOT NULL DEFAULT true,
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tb_bases IS 'Bases operacionais da Coco Legal.';

CREATE TRIGGER trg_bases_atualizado_em
  BEFORE UPDATE ON public.tb_bases
  FOR EACH ROW EXECUTE FUNCTION public.set_atualizado_em();

ALTER TABLE public.tb_bases ENABLE ROW LEVEL SECURITY;

-- Todos os usuários autenticados podem ler bases
CREATE POLICY "bases_select_autenticado" ON public.tb_bases
  FOR SELECT USING (auth.role() = 'authenticated');

-- Apenas CEO pode inserir/atualizar/deletar
CREATE POLICY "bases_write_ceo" ON public.tb_bases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.tb_usuarios u
      WHERE u.auth_user_id = auth.uid() AND u.perfil = 'CEO'
    )
  );
