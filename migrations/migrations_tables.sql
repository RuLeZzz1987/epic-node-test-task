CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS player
(
    id           uuid                         default uuid_generate_v4() primary key,
    last_seen    timestamp,
    created_date timestamp           not null default now(),
    display_name varchar(128) unique not null,
    email        varchar(256) unique not null
);

create table if not exists game
(
    id           uuid                        default uuid_generate_v4() primary key,
    developer_id uuid               not null,
    publisher_id uuid               not null,
    name         varchar(64)        not null,
    slug         varchar(64) unique not null,
    created_date timestamp          not null default now()
);

create table if not exists developer
(
    id           uuid                        default uuid_generate_v4() primary key,
    slug         varchar(64) unique not null,
    name         varchar(64)        not null,
    created_date timestamp          not null default now()
);

create table if not exists publisher
(
    id           uuid                        default uuid_generate_v4() primary key,
    slug         varchar(64) unique not null,
    name         varchar(64)        not null,
    created_date timestamp          not null default now()
);