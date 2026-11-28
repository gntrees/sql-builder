-- migrate:up
-- Mirror of the Postgres schema-feature migration. MySQL stores the enum on
-- the column instead of in a named type.
alter table users
    add column email varchar(320) unique,
    add column role enum('admin', 'user') not null default 'user';

alter table posts
    add constraint fk_posts_user_id
    foreign key (user_id) references users (id) on delete cascade;

alter table orders
    add constraint fk_orders_user_id
    foreign key (user_id) references users (id);

alter table books
    add constraint fk_books_author_id
    foreign key (author_id) references authors (id);

-- migrate:down
alter table books drop foreign key fk_books_author_id;
alter table orders drop foreign key fk_orders_user_id;
alter table posts drop foreign key fk_posts_user_id;

alter table users
    drop index email,
    drop column email,
    drop column role;
