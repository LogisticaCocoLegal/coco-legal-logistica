# Chat e Aplicativo

## Objetivo

Disponibilizar uma plataforma operacional para comunicação, registro de atividades e acompanhamento da operação logística.

A solução deverá funcionar inicialmente como PWA e futuramente como aplicativo Android (APK).

---

# Login

Todos os usuários terão acesso através de:

- E-mail
- Senha

Autenticação:

- Supabase Auth

---

# Perfis de Acesso

## CEO

Permissões:

- Visualizar dashboards
- Visualizar indicadores
- Visualizar premiações
- Visualizar ocorrências
- Visualizar custos

---

## Supervisão

Permissões:

- Visualizar operação completa
- Aprovar premiações
- Tratar ocorrências
- Movimentar colaboradores
- Gerenciar bases

---

## Operação

Permissões:

- Importar arquivos
- Registrar ocorrências
- Gerenciar dados operacionais
- Acompanhar indicadores

---

## Colaborador

Permissões:

- Visualizar informações próprias
- Participar do chat
- Registrar almoço
- Registrar ocorrências
- Visualizar indicadores pessoais

---

# Chat por Base

Cada base possuirá seu próprio canal de comunicação.

Bases iniciais:

- Rio Comprido - CD
- Barra da Tijuca
- Leblon
- Niterói
- Copacabana

---

# Funcionalidades do Chat

Permitir:

- Envio de mensagens
- Envio de fotos
- Envio de arquivos
- Histórico de conversas
- Pesquisa de mensagens

---

# Mensagens Operacionais

Exemplo:

Rota 202 transferida para Rafael.

Motivo:

Problema mecânico.

---

# Envio de Fotos

Utilização para:

- Problemas mecânicos
- Comprovantes
- Ocorrências operacionais
- Evidências de atendimento
- Registros de campo

---

# Registro de Ocorrências

Permitir criar ocorrências diretamente pelo aplicativo.

Campos:

- Tipo
- Descrição
- Foto
- Data
- Hora

---

# Registro de Almoço

## Iniciar Almoço

Registrar automaticamente:

- Data
- Hora

---

## Finalizar Almoço

Registrar automaticamente:

- Data
- Hora

---

## Indicadores

- Início do almoço
- Fim do almoço
- Tempo total de almoço

---

# Registro de Início de Rota

Objetivo:

Capturar o ponto real de partida da operação.

Registrar:

- Data
- Hora
- Latitude
- Longitude
- Endereço

Origem:

- Clique de abastecimento
- Registro manual

---

# Registro de Fim de Rota

Objetivo:

Registrar o encerramento da operação.

Registrar:

- Data
- Hora
- Latitude
- Longitude
- Endereço

---

# Registro de Presença na Base

## Cheguei na Base

Registrar:

- Base
- Data
- Hora
- Localização

---

## Saí da Base

Registrar:

- Base
- Data
- Hora
- Localização

---

## Indicadores

- Horário de chegada
- Horário de saída
- Permanência na base
- Histórico de registros

---

# Minhas Informações

O colaborador poderá visualizar:

- Base Atual
- Base Planejada
- Função Exercida
- Rotas do Dia
- Indicadores
- Ocorrências
- Premiações

---

# Indicadores do Colaborador

- Planejadas
- Executadas
- Canceladas
- Encaixes
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
- Histórico de Premiações

---

# Notificações

Permitir envio de:

- Mudança de Base
- Transferência de Rota
- Avisos Operacionais
- Ocorrências
- Mensagens da Supervisão

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
- Geolocalização em Tempo Real
