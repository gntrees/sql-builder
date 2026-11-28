-- migrate:up
-- Exercise the schema features the codegen promises to carry: a database
-- enum, a single-column unique constraint, and foreign keys with actions.
create type user_role as enum ('admin', 'user');

alter table users
    add column email varchar(320) unique,
    add column role user_role not null default 'user';

alter table posts
    add constraint posts_user_id_fkey
    foreign key (user_id) references users (id) on delete cascade;

alter table orders
    add constraint orders_user_id_fkey
    foreign key (user_id) references users (id);

alter table books
    add constraint books_author_id_fkey
    foreign key (author_id) references authors (id);

-- migrate:down
alter table books drop constraint books_author_id_fkey;
alter table orders drop constraint orders_user_id_fkey;
alter table posts drop constraint posts_user_id_fkey;

alter table users
    drop column email,
    drop column role;

drop type user_role;
