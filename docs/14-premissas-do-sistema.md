# Premissas do Sistema

## Objetivo

Documentar regras técnicas e operacionais que servirão como base para o desenvolvimento da plataforma.

---

# Base de Dados

Banco de dados:

- Supabase
- PostgreSQL

Autenticação:

- Supabase Auth

Arquivos:

- Supabase Storage

---

# Clientes

## Cadastro Automático

Ao importar Clientes Planejados:

Se o cliente não existir:

- Criar automaticamente

Se o cliente já existir:

- Reutilizar cadastro

---

## Alteração de Endereço

Caso o endereço seja diferente:

- Atualizar cadastro
- Atualizar latitude
- Atualizar longitude
- Registrar histórico
- Exibir aviso na importação

---

## Geolocalização

Todos os clientes deverão possuir:

- Latitude
- Longitude

Origem:

- Geocodificação automática
- Atualização manual

---

# Bases

As bases serão cadastradas manualmente.

Bases iniciais:

- Rio Comprido - CD
- Barra da Tijuca
- Leblon
- Niterói
- Copacabana

Uma base poderá possuir mais de um endereço.

---

# Operação

## Chave de Conciliação

Identificação de uma entrega:

- Data
- Cliente
- CEP

Objetivo:

- Cancelados
- Encaixes
- Transferidos
- Recebidos

---

## Cancelado

Existe no Planejado.

Não existe no Executado.

---

## Encaixe

Não existe no Planejado.

Existe no Executado.

---

## Transferido

Planejado para um entregador.

Executado por outro entregador.

---

## Recebido

Entrega recebida de outro entregador.

---

# KM

## Prioridade da Origem

1. GPS
2. Origem Manual
3. Base

---

## Origem GPS

Capturada pelo clique de abastecimento.

Registrar:

- Data
- Hora
- Latitude
- Longitude
- Endereço

---

## Origem Manual

Permitida alteração manual.

Registrar histórico das alterações.

---

## Cálculo

Origem

↓

Clientes Executados

↓

KM Total

---

# Ocorrências

## Status

- Pendente
- Em Análise
- Tratada
- Encerrada

---

## Tratativas

Toda ocorrência deve permitir:

- Responsável
- Data
- Ação executada

---

# Jornada

## Ponto

Origem:

Importação

Campos:

- Entrada
- Saída

---

## Almoço

Origem:

Aplicativo

Campos:

- Início
- Fim

---

## Operação

Campos:

- Primeiro Carregamento
- Última Entrega

---

# Premiação

## Logística

R$ 280,00

---

## Expedição

R$ 280,00

---

## Motorista

R$ 480,00

---

## Ajudante

R$ 480,00

---

## Ciclista

R$ 480,00

---

## Motoboy

Definição manual.

Opções:

- Sem prêmio
- R$ 20,00
- R$ 50,00

---

# Terceiros

## Importação

- LalaMove RJ
- LalaMove SP

---

## Manual

- Transnato
- Transthuller
- Caminhão 3/4
- Outros

---

# Aplicativo

Funcionar inicialmente como:

- PWA

Preparar para:

- APK Android

---

# Dashboard

Públicos:

- CEO
- Supervisão
- Operação

Indicadores:

- Operação
- Qualidade
- Pessoas
- Custos
- Premiação
- KM
- Produtividade
