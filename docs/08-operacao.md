# Operação

## Objetivo

Este módulo é o núcleo operacional do sistema.

Será responsável por armazenar:

- Clientes Planejados
- Clientes Executados
- Planejamento de Rotas
- Execução de Rotas

Através da comparação dessas tabelas serão gerados:

- Planejados
- Executados
- Cancelados
- Encaixes
- Transferidos
- Recebidos
- Litros
- Valor
- KM
- Indicadores de Premiação

---

# Chave de Conciliação

A identificação de uma entrega será realizada através de:

- Data
- Cliente
- CEP

Essa chave será utilizada para:

- Cancelados
- Encaixes
- Transferidos
- Recebidos
- Entregas Executadas

---

# tb_clientes_planejados

Origem:

Clientes Planejados

Frequência:

Diária

Objetivo:

Armazenar todas as entregas planejadas.

Campos Principais:

- data_entrega
- rota
- cliente
- bolsas
- unds
- litros
- valor
- tipo_produto
- cep
- rua
- numero
- complemento
- bairro
- hr_original
- tipo_janela
- janela_inicio
- janela_fim

Observações:

- Ignorar registros do tipo TRANSFERENCIA.
- Atualizar cadastro de clientes automaticamente.
- Capturar latitude e longitude quando necessário.

---

# tb_clientes_executados

Origem:

Clientes Executados

Frequência:

Diária

Objetivo:

Armazenar todas as entregas executadas.

Campos Principais:

- data_entrega
- rota
- cliente
- bolsas
- unds
- litros
- valor
- tipo_produto
- cep
- rua
- numero
- complemento
- bairro
- hr_original
- hr_entrega

Observações:

- Utilizada para cálculo de produtividade.
- Utilizada para verificação de entregas fora da janela.
- Utilizada para cálculo de KM.

---

# tb_planejamento_rotas

Origem:

Planejamento de Rotas

Frequência:

Diária

Objetivo:

Armazenar a programação operacional do dia.

Campos Principais:

- data_operacao
- rota
- entregador_referencia
- motorista
- tipo_veiculo
- pedidos
- litros
- bolsas

Regras:

- Relacionar com clientes através do campo rota.
- Determinar o entregador planejado.
- Determinar o motorista planejado.
- Utilizada para cálculo de transferências.

---

# tb_execucao_rotas

Origem:

Execução de Rotas

Frequência:

Diária

Objetivo:

Armazenar a execução real do dia.

Campos Principais:

- data_operacao
- rota
- entregador_referencia
- motorista
- tipo_veiculo
- pedidos
- litros
- bolsas

Regras:

- Determinar quem executou a rota.
- Determinar transferências.
- Determinar recebimentos.
- Gerar indicadores de produtividade
