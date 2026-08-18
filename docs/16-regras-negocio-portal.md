# Regras de Negócio — Portal Operacional

## 1. Autenticação

- Acesso exclusivo por **e-mail e senha** via Supabase Auth
- Sessão persiste no navegador (`localStorage`) com auto-refresh de token JWT
- Ao expirar ou fazer logout, o usuário é redirecionado para `/login`
- Usuários inativos (`ativo = false`) são bloqueados na camada de `RotaProtegida`

---

## 2. Colaboradores

### Cadastro
- O campo **referência** é a chave primária de negócio — deve ser único e imutável no sistema de origem
- Um colaborador pode ter apenas **um cargo principal**
- Um colaborador pode ser vinculado a uma **base operacional**

### Status
| Status              | Descrição                                         |
|---------------------|--------------------------------------------------|
| `Ativo`             | Em operação normal                               |
| `Férias Período`    | Afastado por férias                              |
| `Atestado Período`  | Afastado por atestado médico                     |
| `Desligado`         | Vínculo encerrado — manter histórico de entregas |

### Regra de Desligamento
- Colaborador desligado **não aparece** em novas escalas
- Histórico de movimentações **é preservado**
- Data de desligamento deve ser informada

---

## 3. Bases

- Bases são cadastradas **manualmente** pelo CEO
- Cada usuário do perfil `Operação` é vinculado a uma base
- Uma base pode ter **mais de um endereço** (futuro)
- Bases iniciais: Rio Comprido - CD, Barra da Tijuca, Leblon, Niterói, Copacabana

---

## 4. Movimentações

### Chave de Conciliação
A conciliação entre Planejado e Executado usa a tripla:
```
Data + Cliente + CEP
```

### Tipos de Movimentação

| Tipo         | Planejado | Executado | Descrição                                        |
|--------------|-----------|-----------|--------------------------------------------------|
| `Executada`  | ✅        | ✅        | Entrega normal concluída pelo entregador planejado |
| `Cancelado`  | ✅        | ❌        | Planejado mas não realizado                      |
| `Encaixe`    | ❌        | ✅        | Realizado sem estar no planejamento              |
| `Transferido`| ✅        | ✅        | Entregador planejado ≠ entregador executado      |
| `Recebido`   | ✅        | ✅        | Recebida de outro entregador (perspectiva do executor) |

### Fórmula de Executadas
```
Executadas = Planejadas - Canceladas - Transferidas + Recebidas + Encaixes
```

---

## 5. Alteração de Referência

- A **referência** do colaborador é o código único vindo dos sistemas externos (Opentech, planilhas)
- Quando um colaborador troca de referência, o histórico deve ser **preservado**
- Toda alteração registra: referência antiga, referência nova, motivo e usuário responsável
- Movimentações históricas mantêm vínculo pela referência original

---

## 6. Observações

- Observações são anotações livres vinculadas a um **colaborador** e uma **data de referência**
- Devem ter um **motivo** selecionado do catálogo (`tb_motivos`)
- Qualquer usuário autenticado pode registrar observações
- Observações **não se excluem** — apenas se editam (audit trail mantido por `atualizado_em`)

---

## 7. Motivos

- O catálogo de motivos é gerenciado por CEO e Supervisão
- Motivos podem ser **ativados/desativados** (sem exclusão física)
- Categorias disponíveis: `Operacional`, `Qualidade`, `Pessoas`, `Outro`
- Motivos são reutilizados em Observações e futuramente em Ocorrências

---

## 8. Indicadores

> Os indicadores são gerados a partir das movimentações. Não possuem tela própria nesta fase.

### Categorias de Indicadores

| Categoria      | Métricas Principais                                      |
|----------------|----------------------------------------------------------|
| Operação       | Qtd planejada, executada, taxa de cancelamento           |
| Qualidade      | Reclamações, ocorrências, taxa de encaixe                |
| Pessoas        | Faltas, atestados, produtividade por entregador          |
| Custos         | Custo por entrega, custo por KM (fase futura)            |
| Premiação      | Valor calculado por cargo e desempenho                   |
| KM             | KM percorrido por rota e por entregador                  |
| Produtividade  | Entregas por hora, por KM, por colaborador               |

---

## 9. Regras Gerais de Dados

### Integridade
- Nenhum registro é excluído fisicamente — usar `ativo = false` ou status `Desligado`
- Todo registro tem `criado_em` e `atualizado_em`
- Importações com arquivo duplicado (mesmo hash) são **rejeitadas**

### Rastreabilidade
- Toda ação de escrita registra o `usuario_id` responsável
- Alterações críticas (referência de colaborador) possuem tabela de histórico dedicada

### Concorrência
- O RLS do Supabase garante que cada usuário acessa apenas os dados autorizados
- Não há locks manuais — usar `UPSERT` nas importações para evitar duplicatas
