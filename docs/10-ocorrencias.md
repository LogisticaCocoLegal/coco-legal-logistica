# Ocorrências

## Objetivo

Controlar ocorrências operacionais, reclamações de clientes e ocorrências relacionadas aos colaboradores.

O módulo permitirá:

- Registrar reclamações
- Registrar faltas
- Registrar atestados
- Registrar atrasos
- Registrar tratativas
- Acompanhar status
- Gerar indicadores de qualidade

---

# Reclamações

Origem:

Importação de Ocorrências

Objetivo:

Registrar reclamações realizadas pelos clientes.

Campos principais:

- Número da Ocorrência
- Cliente
- Data do Pedido
- Data/Hora da Ocorrência
- Usuário que registrou
- Motivo
- Observação Original
- Observação Tratada

---

# Motivos Prioritários

Tratar principalmente:

- ERRO DE LANCAMENTO NO SISTEMA
- ENTREGA FORA DO HORARIO DETERMINADO PELO CLIENTE

Demais motivos serão armazenados apenas para consulta.

---

# Tratamento das Observações

O sistema deverá:

- Manter a observação original
- Permitir uma versão tratada

Exemplo:

Original:

CLT informou que não recebeu no hr combinado

Tratada:

Cliente informou que não recebeu a entrega no horário combinado.

---

# Status da Ocorrência

Possíveis status:

## PENDENTE

Ocorrência importada e ainda não analisada.

---

## EM ANALISE

Ocorrência em processo de investigação.

---

## TRATADA

Ação executada pela operação.

---

## ENCERRADA

Ocorrência concluída.

---

# Tratativa

Toda ocorrência poderá possuir:

- Responsável
- Data da tratativa
- Descrição da ação executada

Exemplo:

Cliente contatado.

Justificativa apresentada.

Ocorrência encerrada.

---

# Ocorrências de Colaboradores

## Falta

Registrar:

- Colaborador
- Data
- Observação

---

## Atestado

Registrar:

- Colaborador
- Data Inicial
- Data Final
- Observação

---

## Atraso

Registrar:

- Colaborador
- Data
- Horário Previsto
- Horário Real
- Observação

---

# Indicadores

## Operação

- Quantidade de Ocorrências
