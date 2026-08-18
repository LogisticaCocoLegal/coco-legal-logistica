-- =============================================================
-- PROJETO: COCO LEGAL LOGÍSTICA
-- ARQUIVO: Supabase/migrations/006_usuarios_auth_link.sql
-- DESCRIÇÃO: Alinha a tb_usuarios existente no banco (schema legado)
--            ao modelo de usuário estendido do Supabase Auth.
--
-- MOTIVO: A tabela tb_usuarios criada em produção usa o schema antigo
--         (id, nome, email, perfil, ativo, created_at) e NÃO possui as
--         colunas auth_user_id e base_id exigidas pelo portal
--         (src/lib/auth.js:62-66). Isso causa HTTP 400 (código 42703).
--         Nenhuma tabela nova é criada aqui: apenas colunas, comentários
--         e políticas RLS são adicionados à tabela já existente.
-- =============================================================

-- ─────────────────────────────────────────
-- Colunas faltantes (divergência com migração 001)
-- ─────────────────────────────────────────

ALTER TABLE public.tb_usuarios
  ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS base_id UUID REFERENCES public.tb_bases(id) ON DELETE SET NULL;

COMMENT ON COLUMN public.tb_usuarios.auth_user_id IS 'FK para auth.users — gerado pelo Supabase Auth.';
COMMENT ON COLUMN public.tb_usuarios.base_id IS 'Base vinculada ao usuário (obrigatório para perfil Operação).';

-- ─────────────────────────────────────────
-- RLS (Row Level Security) — mesmas políticas da migração 001
-- ─────────────────────────────────────────

ALTER TABLE public.tb_usuarios ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "usuarios_select_proprio" ON public.tb_usuarios;
CREATE POLICY "usuarios_select_proprio" ON public.tb_usuarios
  FOR SELECT USING (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "usuarios_select_ceo" ON public.tb_usuarios;
CREATE POLICY "usuarios_select_ceo" ON public.tb_usuarios
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tb_usuarios u
      WHERE u.auth_user_id = auth.uid() AND u.perfil = 'CEO'
    )
  );

-- ─────────────────────────────────────────
-- PÓS-EXECUÇÃO (manualmente, via Dashboard do Supabase):
-- 1. Cadastrar/ajustar registros de tb_usuarios com o auth_user_id
--    do usuário criado em Authentication → Users.
--    UPDATE public.tb_usuarios SET auth_user_id = '<uuid-do-auth.users>'
--    WHERE email = '<email-do-usuario>';
-- ─────────────────────────────────────────