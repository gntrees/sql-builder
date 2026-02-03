import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("update queries", () => {
    it("updateQuery", () => {
        const builder = q
            .update("users")
            .set({
                "cities.name": "budhapest",
                updated_at: q.r`NOW()`,
            })
            .from("cities")
            .where(q.i("users.city_id").op("=").r`cities.id`);

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("UPDATE users SET cities.name = $1, updated_at = NOW() FROM cities WHERE users.city_id = cities.id");
        expect(parameters).toEqual(["budhapest"]);
    });
});