export type Dialect = "postgres" | "mysql";

export const DB_TESTS = process.env.DB_TESTS === "1";

export const dialects: Dialect[] = ["postgres", "mysql"];

export const connections: Record<Dialect, string> = {
    postgres: process.env.POSTGRES_URL ?? "postgres://gntrees:gntrees@localhost:5433/gntrees_test",
    mysql: process.env.MYSQL_URL ?? "mysql://gntrees:gntrees@localhost:3307/gntrees_test",
};

export type Feature =
    | "returning"
    | "onConflict"
    | "ilike"
    | "fullJoin"
    | "rightJoin"
    | "cte"
    | "values"
    | "transaction";

const mysqlUnsupported: Feature[] = ["returning", "fullJoin", "transaction"];

const reasons: Partial<Record<Feature, string>> = {
    returning: "builder rejects RETURNING for mysql instead of emitting invalid syntax",
    fullJoin: "mysql has no FULL JOIN; the builder throws for that dialect",
    transaction: "Bun MySQL driver does not execute multi-statement batches (the emitted SQL is valid)",
};

export function supports(dialect: Dialect, feature: Feature): boolean {
    return dialect === "mysql" ? !mysqlUnsupported.includes(feature) : true;
}

export function unsupportedReason(dialect: Dialect, feature: Feature): string {
    return reasons[feature] ?? `${feature} is not supported for ${dialect}`;
}
