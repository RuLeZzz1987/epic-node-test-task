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

create table if not exists player_game
(
    id        serial primary key,
    game_id   uuid not null,
    player_id uuid not null,
    unique (game_id, player_id),
    foreign key (game_id) references game (id) on delete restrict on update cascade,
    foreign key (player_id) references player (id) on delete restrict on update cascade
);