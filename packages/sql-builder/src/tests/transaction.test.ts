import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("transaction queries", () => {
    it("beginTransactionQuery", () => {
        const builder = q.beginTransaction();

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("BEGIN;");
        expect(parameters).toEqual([]);
    });

    it("commitTransactionQuery", () => {
        const builder = q.commitTransaction();

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("COMMIT;");
        expect(parameters).toEqual([]);
    });

    it("rollbackTransactionQuery", () => {
        const builder = q.rollbackTransaction();

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("ROLLBACK;");
        expect(parameters).toEqual([]);
    });

    it("savepointTransactionQuery", () => {
        const builder = q.savepointTransaction("sp1");

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SAVEPOINT sp1;");
        expect(parameters).toEqual([]);
    });

    it("transactionQuery", () => {
        const builder = q.transaction(
            q.insert("users", {
                name: "hana",
                email: "hana@example.com",
            }),
            q.savepointTransaction("sp_insert_profile"),
            q.update("users")
                .set({
                    updated_at: q.r`NOW()`,
                })
                .where(q.i("users.email").op("=").l("hana@example.com")),
        );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("BEGIN; INSERT INTO users (name, email) VALUES ($1, $2); SAVEPOINT sp_insert_profile; UPDATE users SET updated_at = NOW() WHERE users.email = $3; COMMIT;");
        expect(parameters).toEqual(["hana", "hana@example.com", "hana@example.com"]);
    });

    it("rawLimitOffsetQuery", () => {
        const builder = q
            .select("*")
            .from("posts")
            .limit(q.rs("ALL"))
            .offset(q.rs("10"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM posts LIMIT ALL OFFSET 10");
        expect(parameters).toEqual([]);
    });
});