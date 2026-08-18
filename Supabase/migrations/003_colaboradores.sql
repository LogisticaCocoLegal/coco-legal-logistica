-- =============================================================
-- PROJETO: COCO LEGAL LOGÍSTICA
-- ARQUIVO: Supabase/migrations/003_colaboradores.sql
-- DESCRIÇÃO: Tabela de colaboradores e histórico de referência
-- =============================================================

CREATE TABLE IF NOT EXISTS public.tb_colaboradores (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referencia         TEXT NOT NULL UNIQUE,
  nome_completo      TEXT NOT NULL,
  cargo_principal    TEXT NOT NULL CHECK (cargo_principal IN (
    'Motoboy', 'Ciclista', 'Motorista', 'Ajudante', 'Logística', 'Expedição'
  )),
  base_id            UUID REFERENCES public.tb_bases(id) ON DELETE SET NULL,
  status             TEXT NOT NULL DEFAULT 'Ativo' CHECK (status IN (
    'Ativo', 'Férias Período', 'Atestado Período', 'Desligado'
  )),
  data_admissao      DATE,
  data_desligamento  DATE,
  criado_em          TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tb_colaboradores IS 'Cadastro master de colaboradores operacionais.';
COMMENT ON COLUMN public.tb_colaboradores.referencia IS 'Código único do colaborador — usado como chave de conciliação nos sistemas externos.';

-- ─────────────────────────────────────────
-- Histórico de alteração de referência
-- ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.tb_historico_referencia (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  colaborador_id    UUID NOT NULL REFERENCES public.tb_colaboradores(id) ON DELETE CASCADE,
  referencia_antiga TEXT NOT NULL,
  referencia_nova   TEXT NOT NULL,
  motivo            TEXT,
  alterado_por      UUID REFERENCES public.tb_usuarios(id),
  criado_em         TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tb_historico_referencia IS 'Rastreia mudanças na referência do colaborador — módulo Alteração de Referência.';

CREATE TRIGGER trg_colaboradores_atualizado_em
  BEFORE UPDATE ON public.tb_colaboradores
  FOR EACH ROW EXECUTE FUNCTION public.set_atualizado_em();

-- RLS
ALTER TABLE public.tb_colaboradores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tb_historico_referencia ENABLE ROW LEVEL SECURITY;

CREATE POLICY "colaboradores_select_autenticado" ON public.tb_colaboradores
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "colaboradores_write_supervisao" ON public.tb_colaboradores
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.tb_usuarios u
      WHERE u.auth_user_id = auth.uid() AND u.perfil IN ('CEO', 'Supervisão')
    )
  );

CREATE POLICY "historico_ref_select" ON public.tb_historico_referencia
  FOR SELECT USING (auth.role() = 'authenticated');
