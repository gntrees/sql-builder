import { SQL } from "bun";
import { connections, type Dialect } from "./config";

const clients = new Map<Dialect, SQL>();

export function client(dialect: Dialect): SQL {
    let db = clients.get(dialect);
    if (!db) {
        db = new SQL({
            url: connections[dialect],
            allowPublicKeyRetrieval: true,
            max: 1,
        } as any);
        clients.set(dialect, db);
    }
    return db;
}

export async function closeAll(): Promise<void> {
    for (const db of clients.values()) {
        await db.close();
    }
    clients.clear();
}

const tables = ["u", "t", "b", "m", "members", "orders", "posts", "users", "books", "authors"];

export async function resetDb(dialect: Dialect): Promise<void> {
    const db = client(dialect);
    if (dialect === "postgres") {
        await db.unsafe(`TRUNCATE ${tables.join(", ")} RESTART IDENTITY CASCADE`);
    } else {
        for (const table of tables) {
            await db.unsafe(`TRUNCATE TABLE \`${table}\``);
        }
    }
}

export async function seedDb(dialect: Dialect): Promise<void> {
    const db = client(dialect);
    await db.unsafe(
        "INSERT INTO users (name, active, age) VALUES ('alice', true, 30), ('bob', false, 17), ('carol', true, 42), ('dave', false, NULL)",
    );
    await db.unsafe("INSERT INTO posts (user_id, title) VALUES (1, 'hello'), (1, 'world'), (2, 'bob post')");
    await db.unsafe("INSERT INTO orders (user_id, total) VALUES (1, 150), (1, 50), (2, 200)");
    await db.unsafe("INSERT INTO members (uid) VALUES (1), (2)");
    await db.unsafe("INSERT INTO m (uid) VALUES (1), (2)");
    await db.unsafe("INSERT INTO b (ok) VALUES (true), (false)");
    await db.unsafe("INSERT INTO t (x, name, a, b) VALUES (10, 'x', 1, 2), (20, 'y', 3, 4)");
    await db.unsafe("INSERT INTO u (b) VALUES (1), (2)");
    await db.unsafe("INSERT INTO authors (name) VALUES ('aa'), ('bb'), ('cc')");
    await db.unsafe("INSERT INTO books (author_id, title) VALUES (1, 'b1'), (1, 'b2'), (2, 'b3')");
}

export type Built = {
    setDialect: (dialect: string) => Built;
    parse: () => { sql: string; param: (string | number | boolean | null)[] };
};

export async function execute(
    dialect: Dialect,
    built: Built,
): Promise<{ sql: string; param: (string | number | boolean | null)[]; rows: any[] }> {
    const parsed = built.setDialect(dialect) as unknown as Built;
    const { sql, param } = parsed.parse();
    const rows = (param.length > 0 ? await client(dialect).unsafe(sql, param) : await client(dialect).unsafe(sql)) as any[];
    return { sql, param, rows };
}
