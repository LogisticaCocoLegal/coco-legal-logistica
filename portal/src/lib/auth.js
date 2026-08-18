// =============================================================
// PROJETO: COCO LEGAL LOGÍSTICA
// ARQUIVO: lib/auth.js
// DESCRIÇÃO: Serviço de autenticação via Supabase Auth
// =============================================================

import { supabase } from '../config/supabase.js'

// Perfil padrão exibido quando o usuário do auth.users ainda não possui
// cadastro complementar em tb_usuarios (ou quando a consulta falha/não encontra registro).
const PERFIL_PADRAO = { nome: null, perfil: 'Operação', base_id: null }

// Caches e desduplicação de requisições em memória
let cachedUserId = null
let cachedPerfil = null
let inFlightCurrentUserPromise = null

// ─────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────

/**
 * Autentica o usuário com e-mail e senha.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ data, error }>}
 */
export async function signIn(email, password) {
  // Limpa cache anterior ao tentar novo login
  cachedUserId = null
  cachedPerfil = null
  inFlightCurrentUserPromise = null

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

// ─────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────

/**
 * Encerra a sessão do usuário e limpa o cache.
 * @returns {Promise<{ error }>}
 */
export async function signOut() {
  cachedUserId = null
  cachedPerfil = null
  inFlightCurrentUserPromise = null

  const { error } = await supabase.auth.signOut()
  return { error }
}

// ─────────────────────────────────────────
// SESSÃO ATUAL
// ─────────────────────────────────────────

/**
 * Retorna a sessão ativa ou null.
 * @returns {Promise<Session|null>}
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

/**
 * Retorna o usuário autenticado com perfil estendido da tb_usuarios.
 * Sem registro em tb_usuarios (ou em caso de erro HTTP 406/42703/RLS na consulta),
 * retorna o perfil padrão 'Operação' (sem erro), permitindo login normal
 * de qualquer usuário do auth.users e usando o e-mail como identificador visual.
 * 
 * Evita requisições repetidas via desduplicação de chamadas simultâneas
 * e cache em memória por usuário.
 * 
 * @returns {Promise<{ user, perfil, error }>}
 */
export async function getCurrentUser() {
  if (inFlightCurrentUserPromise) {
    return inFlightCurrentUserPromise
  }

  inFlightCurrentUserPromise = (async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError || !user) {
        cachedUserId = null
        cachedPerfil = null
        return { user: null, perfil: null, error: authError }
      }

      // Se é o mesmo usuário já em cache, reaproveita sem nova query
      if (cachedUserId === user.id && cachedPerfil) {
        return { user, perfil: cachedPerfil, error: null }
      }

      let perfilFinal = PERFIL_PADRAO

      try {
        // Consulta tb_usuarios usando limit(1).maybeSingle() para evitar HTTP 406 (PGRST116)
        // caso existam múltiplos registros com o mesmo e-mail no schema antigo/legado.
        const { data: perfilData, error: perfilError } = await supabase
          .from('tb_usuarios')
          .select('id, nome, perfil, ativo')
          .ilike('email', user.email)
          .limit(1)
          .maybeSingle()

        if (perfilError) {
          console.warn(
            'Aviso: Não foi possível obter perfil complementar em tb_usuarios. Usando fallback Operação.',
            perfilError.message || perfilError
          )
        } else if (perfilData) {
          perfilFinal = {
            id: perfilData.id,
            nome: perfilData.nome || null,
            perfil: perfilData.perfil || 'Operação',
            ativo: perfilData.ativo ?? true,
          }
        }
      } catch (err) {
        console.warn('Exceção ao consultar tb_usuarios (usando fallback Operação):', err)
      }

      cachedUserId = user.id
      cachedPerfil = perfilFinal

      return { user, perfil: perfilFinal, error: null }
    } finally {
      inFlightCurrentUserPromise = null
    }
  })()

  return inFlightCurrentUserPromise
}

// ─────────────────────────────────────────
// MUDANÇA DE SENHA
// ─────────────────────────────────────────

/**
 * Envia e-mail de redefinição de senha.
 * @param {string} email
 * @returns {Promise<{ error }>}
 */
export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/nova-senha`,
  })
  return { error }
}

/**
 * Atualiza a senha do usuário autenticado.
 * @param {string} newPassword
 * @returns {Promise<{ error }>}
 */
export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  return { error }
}

// ─────────────────────────────────────────
// LISTENER DE ESTADO DE AUTENTICAÇÃO
// ─────────────────────────────────────────

/**
 * Inscreve um callback para mudanças de estado de auth.
 * @param {Function} callback - (event, session) => void
 * @returns {Function} unsubscribe
 */
export function onAuthStateChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      cachedUserId = null
      cachedPerfil = null
      inFlightCurrentUserPromise = null
    }
    callback(event, session)
  })

  return () => subscription.unsubscribe()
}

