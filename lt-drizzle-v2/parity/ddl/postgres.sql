-- Fixture DDL for the drizzle port roundtrip.
--
-- Hand-written equivalent of the drizzle schema used in the v2 differential
-- fixtures. Generating this with drizzle-kit is the next step (K3); until
-- then both sides are checked against this file, so a drift shows up as a
-- failing roundtrip, not as silently different tables.
drop table if exists lt_drizzle_users;

create table lt_drizzle_users (
  id serial primary key,
  name text not null,
  age integer
);
