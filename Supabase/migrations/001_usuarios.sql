-- =============================================================
-- PROJETO: COCO LEGAL LOGÍSTICA
-- ARQUIVO: Supabase/migrations/001_usuarios.sql
-- DESCRIÇÃO: Tabela de usuários vinculada ao Supabase Auth
-- =============================================================

-- Extensão UUID (já ativa no Supabase por padrão)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────
-- tb_usuarios
-- ─────────────────────────────────────────
-- Estende o auth.users do Supabase com dados de perfil operacional.
-- A relação é 1:1: cada auth.user tem exatamente um registro em tb_usuarios.

CREATE TABLE IF NOT EXISTS public.tb_usuarios (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id  UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nome          TEXT NOT NULL,
  email         TEXT NOT NULL,
  perfil        TEXT NOT NULL CHECK (perfil IN ('CEO', 'Supervisão', 'Operação')),
  base_id       UUID REFERENCES public.tb_bases(id) ON DELETE SET NULL,
  ativo         BOOLEAN NOT NULL DEFAULT true,
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.tb_usuarios IS 'Perfis operacionais vinculados ao Supabase Auth.';
COMMENT ON COLUMN public.tb_usuarios.auth_user_id IS 'FK para auth.users — gerado pelo Supabase Auth.';
COMMENT ON COLUMN public.tb_usuarios.perfil IS 'Nível de acesso: CEO, Supervisão ou Operação.';
COMMENT ON COLUMN public.tb_usuarios.base_id IS 'Base vinculada ao usuário (obrigatório para perfil Operação).';

-- ─────────────────────────────────────────
-- TRIGGER: atualiza atualizado_em automaticamente
-- ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.set_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_usuarios_atualizado_em
  BEFORE UPDATE ON public.tb_usuarios
  FOR EACH ROW EXECUTE FUNCTION public.set_atualizado_em();

-- ─────────────────────────────────────────
-- RLS (Row Level Security)
-- ─────────────────────────────────────────

ALTER TABLE public.tb_usuarios ENABLE ROW LEVEL SECURITY;

-- Usuário vê apenas o próprio perfil
CREATE POLICY "usuarios_select_proprio" ON public.tb_usuarios
  FOR SELECT USING (auth.uid() = auth_user_id);

-- CEO pode ver todos
CREATE POLICY "usuarios_select_ceo" ON public.tb_usuarios
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tb_usuarios u
      WHERE u.auth_user_id = auth.uid() AND u.perfil = 'CEO'
    )
  );
