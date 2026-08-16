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
