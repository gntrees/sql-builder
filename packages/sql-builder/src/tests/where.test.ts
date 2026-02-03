import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("where queries", () => {
    it("whereQuery", () => {
        const builder = q
            .select("*")
            .from("audit_logs")
            .where(
                q.or(
                    q.i("audit_logs.success").op("=").l(true),
                    q.i("audit_logs.action").op(">").l("login"),
                ),
            );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT * FROM audit_logs WHERE audit_logs.success = $1 OR audit_logs.action > $2");
        expect(parameters).toEqual([true, "login"]);
    });
});