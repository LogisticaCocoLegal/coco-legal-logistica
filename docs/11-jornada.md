# Jornada de Trabalho

## Objetivo

Controlar a jornada operacional dos colaboradores.

O módulo permitirá:

- Importação de ponto
- Controle de entrada
- Controle de saída
- Registro de almoço
- Primeiro carregamento
- Última entrega
- Horas trabalhadas
- Indicadores de produtividade

---

# Ponto

Origem:

Importação de Arquivo

Objetivo:

Registrar horários de entrada e saída.

Campos principais:

- Colaborador
- Data
- Hora Entrada
- Hora Saída

---

# Almoço

Origem:

Aplicativo

Objetivo:

Registrar horário de almoço.

Campos:

- Colaborador
- Data
- Início Almoço
- Fim Almoço

---

# Primeiro Carregamento

Objetivo:

Identificar quando a operação iniciou.

Origem:

Sistema de abastecimento
ou
Registro manual

Exemplo:

07:15

---

# Última Entrega

Objetivo:

Identificar quando a operação terminou.

Origem:

Maior horário encontrado em Hr Entrega.

Exemplo:

16:42

---

# Indicadores

## Tempo de Preparação

Hora Entrada

↓

Primeiro Carregamento

---

## Tempo Operacional

Primeiro Carregamento

↓

Última Entrega

---

## Tempo de Encerramento

Última Entrega

↓

Hora Saída

---

## Tempo de Almoço

Início Almoço

↓

Fim Almoço

---

## Tempo Líquido Trabalhado

Hora Saída
-
Hora Entrada
-
Tempo de Almoço

---

# Dashboard Supervisor

Indicadores:

- Entrada
- Saída
- Primeiro Carregamento
- Última Entrega
- Tempo Operacional
- Tempo de Almoço

---

# Dashboard CEO

Indicadores:

- Média de Horário de Entrada
- Média de Horário de Saída
- Média de Tempo de Almoço
- Tempo Médio Operacional
- Horas Trabalhadas por Base
- Horas Trabalhadas por Função

---

# Integração com Premiação

Permitir análise de:

- Faltas
- Atrasos
- Horas Trabalhadas
- Jornadas Incompletas

para suporte à decisão da premiação.
