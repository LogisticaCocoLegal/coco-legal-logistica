# Chat e Aplicativo

## Objetivo

Disponibilizar um aplicativo operacional para comunicação, registro de informações e acompanhamento da operação.

O aplicativo deverá funcionar inicialmente como PWA e futuramente gerar APK Android.

---

# Login

Todos os usuários terão acesso através de:

- E-mail
- Senha

Autenticação:

- Supabase Auth

---

# Perfis

## CEO

Permissões:

- Visualizar todos os dashboards
- Visualizar indicadores
- Visualizar premiações
- Visualizar ocorrências

---

## Supervisão

Permissões:

- Visualizar toda a operação
- Aprovar premiações
- Tratar ocorrências
- Registrar movimentações

---

## Operação

Permissões:

- Importar arquivos
- Registrar ocorrências
- Gerenciar bases
- Acompanhar execução

---

## Colaborador

Permissões:

- Visualizar informações próprias
- Utilizar chat
- Registrar almoço
- Registrar ocorrências
- Visualizar indicadores pessoais

---

# Chat por Base

Cada base possuirá um canal próprio.

Exemplos:

- Rio Comprido - CD
- Barra da Tijuca
- Leblon
- Niterói
- Copacabana

---

# Funcionalidades do Chat

Permitir:

- Mensagens
- Fotos
- Arquivos
- Histórico
- Pesquisa

---

# Mensagens Operacionais

Exemplo:

Rota 202 transferida para Rafael.

Motivo:

Problema mecânico.

---

# Envio de Fotos

Permitir envio de:

- Problemas mecânicos
- Comprovantes
- Ocorrências operacionais
- Evidências de atendimento

---

# Registro de Ocorrências

Permitir criar ocorrências pelo aplicativo.

Campos:

- Tipo
- Descrição
- Foto
- Data
- Hora

---

# Registro de Almoço

Botão:

Iniciar Almoço

Resultado:

Registrar horário automaticamente.

---

Botão:

Finalizar Almoço

Resultado:

Registrar horário automaticamente.

---

# Registro de Início de Rota

Objetivo:

Capturar o ponto real de partida.

Registrar:

- Data
- Hora
- Latitude
- Longitude
- Endereço

Origem:

Clique de abastecimento.

---

# Registro de Fim de Rota

Objetivo:

Registrar encerramento operacional.

Registrar:

- Data
- Hora
- Localização

---

# Minhas Informações

O colaborador poderá visualizar:

- Base Atual
- Função Exercida
- Rotas
- Indicadores
- Premiações

---

# Indicadores do Colaborador

Exemplos:

- Planejadas
- Executadas
- Canceladas
- Recebidas
- Transferidas
- Litros
- KM
- Ocorrências

---

# Histórico de Premiação

Visualizar:

- Valor Diário
- Valor Mensal
- Histórico

---

# Notificações

Permitir envio de:

- Mudança de Base
- Transferência de Rota
- Avisos Operacionais
- Ocorrências

---

# Armazenamento

Utilizar Supabase Storage para:

- Fotos
- Arquivos
- Comprovantes
- Imagens de ocorrências

---

# Evolução Futura

Preparar para:

- APK Android
- Áudios no Chat
- Assinatura Digital
- Rastreamento GPS
- Notificações Push
- Comprovante de Entrega
