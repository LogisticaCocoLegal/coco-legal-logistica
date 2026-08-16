# KM e Geolocalização

## Objetivo

Permitir o cálculo da distância percorrida pelos entregadores.

O sistema deverá calcular:

- KM por Rota
- KM por Entregador
- KM por Base
- KM por Cidade
- KM por Prestador

---

# Conceitos

## Base Escalada

Base em que o colaborador estava programado para atuar.

Exemplo:

Marcus Lima

Base Escalada:

Barra da Tijuca

---

## Base Executada

Base onde o colaborador realmente trabalhou.

Exemplo:

Planejado:

Barra da Tijuca

Executado:

Copacabana

---

## Origem da Rota

Local real utilizado para iniciar o roteiro.

A origem da rota não precisa ser necessariamente uma base.

Exemplos:

- Rio Comprido CD
- Barra da Tijuca
- Posto Shell
- Ponto de Apoio
- Localização GPS
- Endereço Informado Manualmente

---

# Prioridade da Origem

O sistema utilizará a seguinte prioridade:

1. GPS do abastecimento
2. Origem Manual
3. Base cadastrada

---

# Origem via GPS

Quando houver clique de abastecimento:

Registrar:

- Data
- Hora
- Latitude
- Longitude
- Endereço

Essa informação será utilizada como ponto inicial do cálculo de KM.

---

# Origem Manual

Quando necessário o usuário poderá informar:

- Endereço
- Latitude
- Longitude

Exemplo:

Origem:

Ponto de Apoio Recreio

---

# Cadastro de Bases

Tabela:

tb_bases

Campos:

- nome
- endereco
- cidade

Bases:

- Rio Comprido - CD
- Barra da Tijuca
- Leblon
- Niterói
- Copacabana

---

# Cadastro de Clientes

Tabela:

tb_clientes

Campos:

- cliente
- cep
- rua
- numero
- complemento
- bairro
- latitude
- longitude

---

# Geolocalização Automática

Quando importar Clientes Planejados:

Cliente não existe:

- Criar cliente
- Gerar latitude
- Gerar longitude

Cliente já existe:

- Utilizar dados cadastrados

Cliente mudou endereço:

- Atualizar cadastro
- Atualizar latitude
- Atualizar longitude
- Registrar histórico

---

# Cálculo do KM

O cálculo deverá seguir a ordem:

Origem da Rota

↓

Primeira Entrega

↓

Segunda Entrega

↓

Terceira Entrega

↓

Última Entrega

A ordem será definida pela:

Hr Entrega

---

# Indicadores

## Operação

- KM Total
- KM por Base
- KM por Rota
- KM por Entregador

---

## Produtividade

- Litros por KM
- Pedidos por KM
- Valor por KM

---

## Dashboard CEO

- KM Total do Dia
- KM Total do Mês
- KM por Base
- KM por Cidade
- Ranking de Entregadores por KM

---

# Evolução Futura

Preparar sistema para:

- Google Maps
- Geocodificação automática
- Rotas otimizadas
- KM Real
- Rastreamento GPS
