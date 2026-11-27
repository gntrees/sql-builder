-- Fixture database for schema codegen.
--
-- This is intentionally separate from db/migrations. It exercises the shapes
-- the generator must handle: ordinary tables, an enum, a foreign key, a
-- composite primary key, nullability/defaults, unsupported column types, and a
-- non-public schema.

create schema if not exists auth;

create type role as enum ('admin', 'user');

create table organizations (
  id serial primary key,
  name varchar(255) not null
);

create table users (
  id serial primary key,
  email varchar(320) not null unique,
  display_name text,
  role role not null default 'user',
  created_at timestamp(3) not null default now(),
  org_id integer not null references organizations (id) on delete cascade on update cascade,
  external_id uuid,
  balance numeric(65, 30) not null default 0,
  metadata jsonb,
  unique (email, org_id)
);

create index users_email_idx on users (email);

create table memberships (
  user_id integer not null,
  org_id integer not null,
  primary key (user_id, org_id)
);

create table auth.audit (
  id serial primary key,
  action text not null
);
