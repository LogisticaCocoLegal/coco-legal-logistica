// =============================================================
// PROJETO: COCO LEGAL LOGÍSTICA
// ARQUIVO: types/index.js
// DESCRIÇÃO: Tipos, enums e constantes do domínio
// =============================================================

// ─────────────────────────────────────────
// PERFIS DE USUÁRIO
// ─────────────────────────────────────────

export const PERFIS = {
  CEO: 'CEO',
  SUPERVISAO: 'Supervisão',
  OPERACAO: 'Operação',
}

// ─────────────────────────────────────────
// STATUS DE COLABORADOR
// ─────────────────────────────────────────

export const STATUS_COLABORADOR = {
  ATIVO: 'Ativo',
  FERIAS: 'Férias Período',
  ATESTADO: 'Atestado Período',
  DESLIGADO: 'Desligado',
}

// ─────────────────────────────────────────
// CARGOS
// ─────────────────────────────────────────

export const CARGOS = {
  MOTOBOY: 'Motoboy',
  CICLISTA: 'Ciclista',
  MOTORISTA: 'Motorista',
  AJUDANTE: 'Ajudante',
  LOGISTICA: 'Logística',
  EXPEDICAO: 'Expedição',
}

// ─────────────────────────────────────────
// BASES OPERACIONAIS
// ─────────────────────────────────────────

export const BASES = [
  'Rio Comprido - CD',
  'Barra da Tijuca',
  'Leblon',
  'Niterói',
  'Copacabana',
]

// ─────────────────────────────────────────
// STATUS DE OCORRÊNCIAS
// ─────────────────────────────────────────

export const STATUS_OCORRENCIA = {
  PENDENTE: 'Pendente',
  EM_ANALISE: 'Em Análise',
  TRATADA: 'Tratada',
  ENCERRADA: 'Encerrada',
}

// ─────────────────────────────────────────
// TIPOS DE MOVIMENTAÇÃO
// ─────────────────────────────────────────

export const TIPO_MOVIMENTACAO = {
  CANCELADO: 'Cancelado',    // Planejado=Sim, Executado=Não
  ENCAIXE: 'Encaixe',        // Planejado=Não, Executado=Sim
  TRANSFERIDO: 'Transferido', // Entregador planejado ≠ executado
  RECEBIDO: 'Recebido',      // Recebida de outro entregador
  EXECUTADA: 'Executada',    // Entrega normal concluída
}

// ─────────────────────────────────────────
// FORNECEDORES / TERCEIROS
// ─────────────────────────────────────────

export const FORNECEDORES = {
  LALA_RJ: 'LalaMove RJ',
  LALA_SP: 'LalaMove SP',
  TRANSNATO: 'Transnato',
  TRANSTHULLER: 'Transthuller',
  CAMINHAO: 'Caminhão 3/4',
}

// ─────────────────────────────────────────
// PREMIAÇÕES (valores base)
// ─────────────────────────────────────────

export const PREMIACAO_BASE = {
  [CARGOS.LOGISTICA]: 280.0,
  [CARGOS.EXPEDICAO]: 280.0,
  [CARGOS.MOTORISTA]: 480.0,
  [CARGOS.AJUDANTE]: 480.0,
  [CARGOS.CICLISTA]: 480.0,
  [CARGOS.MOTOBOY]: null, // Definição manual: null | 20.00 | 50.00
}

export const PREMIACAO_MOTOBOY_OPCOES = [0, 20, 50]

// ─────────────────────────────────────────
// ORIGEM DO KM
// ─────────────────────────────────────────

export const ORIGEM_KM = {
  GPS: 'GPS',
  MANUAL: 'Manual',
  BASE: 'Base',
}
