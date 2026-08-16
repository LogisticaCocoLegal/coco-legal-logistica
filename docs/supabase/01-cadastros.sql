/*
==================================================
PROJETO: COCO LEGAL LOGÍSTICA
ARQUIVO: 01-cadastros.sql

TABELAS MESTRES:

- tb_bases
- tb_colaboradores
- tb_clientes
- tb_usuarios
- tb_fornecedores
- tb_importacoes

==================================================
*/

-- ==================================================
-- BASES
-- ==================================================

create table tb_bases (
    id uuid primary key default gen_random_uuid(),
    nome text not null,
    endereco text,
    cidade text default 'Rio de Janeiro',
    ativo boolean default true,
    created_at timestamp default now()
);

-- ==================================================
-- COLABORADORES
-- ==================================================

create table tb_colaboradores (
    id uuid primary key default gen_random_uuid(),
    referencia text not null unique,
    nome_completo text not null,
    cargo_principal text not null,
    status text default 'Ativo',
    data_admissao date,
    data_desligamento date,
    created_at timestamp default now()
);

-- ==================================================
-- CLIENTES
-- ==================================================

create table tb_clientes (
    id uuid primary key default gen_random_uuid(),
    nome_cliente text not null,
    cep text,
    rua text,
    numero text,
    complemento text,
    bairro text,
    latitude numeric(12,8),
    longitude numeric(12,8),
    ativo boolean default true,
    created_at timestamp default now(),
    updated_at timestamp default now()
);

-- ==================================================
-- USUÁRIOS
-- ==================================================

create table tb_usuarios (
    id uuid primary key default gen_random_uuid(),
    nome text not null,
    email text unique,
    perfil text not null,
    ativo boolean default true,
    created_at timestamp default now()
);

-- ==================================================
-- FORNECEDORES
-- ==================================================

create table tb_fornecedores (
    id uuid primary key default gen_random_uuid(),
    nome text not null,
    tipo text,
    cidade text,
    ativo boolean default true,
    created_at timestamp default now()
);

-- ==================================================
-- IMPORTAÇÕES
-- ==================================================

create table tb_importacoes (
    id uuid primary key default gen_random_uuid(),
    arquivo text not null,
    tipo_importacao text not null,
    hash_arquivo text,
    quantidade_registros integer,
    status text,
    usuario text,
    created_at timestamp default now()
);
