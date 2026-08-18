// =============================================================
// PROJETO: COCO LEGAL LOGÍSTICA
// ARQUIVO: config/supabase.js
// DESCRIÇÃO: Instância e configuração do cliente Supabase
// =============================================================

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas.')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Persistência da sessão no localStorage
    persistSession: true,
    // Detectar sessão na URL (para magic links e OAuth)
    detectSessionInUrl: true,
    // Auto refresh do token JWT antes de expirar
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'x-app-name': 'coco-legal-portal',
    },
  },
})

export default supabase
