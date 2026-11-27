-- Fixture DDL for the drizzle port roundtrip (MySQL).
drop table if exists lt_drizzle_users;

create table lt_drizzle_users (
  id int auto_increment primary key,
  name varchar(255) not null,
  age int
);
