# ERD V1

```mermaid
flowchart TD

BASES[tb_bases]
COLAB[tb_colaboradores]
CLI[tb_clientes]
USER[tb_usuarios]
FORN[tb_fornecedores]

BASES --> MOV[tb_movimentacao_base]
BASES --> ORIG[tb_origem_rota]

COLAB --> PLANROT[tb_planejamento_rotas]
COLAB --> EXECROT[tb_execucao_rotas]
COLAB --> PREM[tb_premiacao_diaria]
COLAB --> PONTO[tb_ponto]
COLAB --> JORN[tb_jornada_operacional]

CLI --> PLANCLI[tb_clientes_planejados]
CLI --> EXECCLI[tb_clientes_executados]
CLI --> OCOR[tb_ocorrencias]

FORN --> CUSTOS[tb_custos_terceiros]

USER --> IMP[tb_importacoes]
USER --> OBS[tb_observacoes]


# Relacionamentos Principais

## Planejado x Executado

tb_cliente_planejados
+
tb_clientes_executados

Chave de comparação:

Data
+
Cliente
+
CEP

---

## Identificação de Cancelados

Planejado = Sim
Executado = Não

---

## Identificação de Encaixes

Planejado = Não
Executado = Sim

---

## Identificação de Transferidos

Cliente encontrado nos dois arquivos.

Entregador Planejado
≠
Entregador Executado

Resultado:

Transferido para quem perdeu.

---

## Identificação de Recebidos

Cliente encontrado nos dois arquivos.

Entregador Planejado
≠
Entregador Executado

Resultado:

Recebido para quem executou.
