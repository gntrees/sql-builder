import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("join queries", () => {
    it("leftJoinQuery", () => {
        const builder = q
            .select("users.id", "profiles.bio")
            .from("users")
            .leftJoin("profiles", q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        
        expect(sql).toBe("SELECT users.id, profiles.bio FROM users LEFT JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("leftJoinLateralQuery", () => {
        const lateralSubquery = q
            .select("orders.user_id", q.r`COUNT(*)`)
            .from("orders")
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy("orders.user_id");

        const builder = q
            .select("users.id", "user_orders.count")
            .from("users")
            .leftJoinLateral(q.sub(lateralSubquery).as("user_orders"), q.null());

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, user_orders.count FROM users LEFT JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON NULL");
        expect(parameters).toEqual([]);
    });

    it("innerJoinQuery", () => {
        const builder = q
            .select("users.id", "profiles.bio")
            .from("users")
            .innerJoin("profiles", q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, profiles.bio FROM users INNER JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("rightJoinQuery", () => {
        const builder = q
            .select("profiles.user_id", "users.name")
            .from("users")
            .rightJoin("profiles", q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT profiles.user_id, users.name FROM users RIGHT JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("innerJoinLateralQuery", () => {
        const lateralSubquery = q
            .select("orders.user_id", q.r`COUNT(*)`)
            .from("orders")
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy("orders.user_id");

        const builder = q
            .select("users.id", "user_orders.count")
            .from("users")
            .innerJoinLateral(q.sub(lateralSubquery).as("user_orders"), q.true());

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, user_orders.count FROM users INNER JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON TRUE");
        expect(parameters).toEqual([]);
    });

    it("fullJoinQuery", () => {
        const builder = q
            .select("users.id", "profiles.bio")
            .from("users")
            .fullJoin("profiles", q.i("profiles.user_id").op("=").i(`users.id`));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, profiles.bio FROM users FULL JOIN profiles ON profiles.user_id = users.id");
        expect(parameters).toEqual([]);
    });

    it("crossJoinQuery", () => {
        const builder = q
            .select("users.id", "roles.name")
            .from("users")
            .crossJoin("roles");

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, roles.name FROM users CROSS JOIN roles");
        expect(parameters).toEqual([]);
    });

    it("rightJoinLateralQuery", () => {
        const lateralSubquery = q
            .select("orders.user_id", q.r`COUNT(*)`)
            .from("orders")
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy("orders.user_id");

        const builder = q
            .select("users.id", "user_orders.count")
            .from("users")
            .rightJoinLateral(q.sub(lateralSubquery).as("user_orders"), q.true());

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, user_orders.count FROM users RIGHT JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders ON TRUE");
        expect(parameters).toEqual([]);
    });

    it("crossJoinLateralQuery", () => {
        const lateralSubquery = q
            .select("orders.user_id", q.r`COUNT(*)`)
            .from("orders")
            .where(q.i("orders.user_id").op("=").i(`users.id`))
            .groupBy("orders.user_id");

        const builder = q
            .select("users.id", "user_orders.count")
            .from("users")
            .crossJoinLateral(q.sub(lateralSubquery).as("user_orders"));

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id, user_orders.count FROM users CROSS JOIN LATERAL (SELECT orders.user_id, COUNT(*) FROM orders WHERE orders.user_id = users.id GROUP BY orders.user_id) AS user_orders");
        expect(parameters).toEqual([]);
    });
});