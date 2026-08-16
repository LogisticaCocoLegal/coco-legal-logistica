# Modelo de Dados - Coco Legal

## tb_bases

Cadastro das bases operacionais.

Campos:

- id
- nome
- endereco
- cidade
- ativo

Bases:

- Rio Comprido - CD
- Barra da Tijuca
- Leblon
- Niterói
- Copacabana

---

## tb_colaboradores

Cadastro principal dos colaboradores.

Campos:

- referencia
- nome_completo
- cargo_principal
- status
- data_admissao
- data_desligamento

Cargos:

- Motoboy
- Ciclista
- Motorista
- Ajudante
- Logística
- Expedição

Status:

- Ativo
- Férias Período
- Atestado Período
- Desligado

---

## tb_clientes

Cadastro mestre de clientes.

Campos:

- nome_cliente
- cep
- rua
- numero
- complemento
- bairro
- latitude
- longitude

Regras:

- Criar automaticamente ao importar o Planejado.
- Não duplicar clientes.
- Atualizar endereço automaticamente.
- Registrar histórico de alterações.

---

## tb_usuarios

Usuários do sistema.

Perfis:

- CEO
- Supervisão
- Operação

---

## tb_fornecedores

Fornecedores e terceiros.

Exemplos:

- LalaMove RJ
- LalaMove SP
- Transnato
- Transthuller
- Caminhão 3/4

---

## tb_importacoes

Histórico de importações.

Campos:

- arquivo
- tipo_importacao
- hash_arquivo
- quantidade_registros
- status
- usuario

---

## tb_custos_terceiros

Controle de custos de terceiros.

Campos:

- data_referencia
- fornecedor
- cidade
- quantidade_entregas
- litros
- km
- custo_total
- observacao

Fontes:

- LalaMove RJ
- LalaMove SP
- Transnato
- Transthuller
- Caminhão 3/4
