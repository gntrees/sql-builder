import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("set operations", () => {
    it("setOpsUnionQuery", () => {
        const builder = q.union(
            q.select("admins.id").from("admins"),
            q.select("moderators.id").from("moderators"),
        );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT admins.id FROM admins UNION SELECT moderators.id FROM moderators");
        expect(parameters).toEqual([]);
    });

    it("setOpsChainedQuery", () => {
        const setOpsBaseQuery = q
            .select("users.id")
            .from("users");

        const builder = setOpsBaseQuery
            .union(
                q.select("moderators.id").from("moderators"),
            )
            .unionAll(
                q.select("guests.id").from("guests"),
                q.select("visitors.id").from("visitors"),
            )
            .intersect(
                q.select("staff.id").from("staff"),
                q.select("contractors.id").from("contractors"),
            )
            .intersectAll(
                q.select("vendors.id").from("vendors"),
                q.select("suppliers.id").from("suppliers"),
            )
            .except(
                q.select("banned_users.id").from("banned_users"),
                q.select("blocked_users.id").from("blocked_users"),
            )
            .exceptAll(
                q.select("archived_users.id").from("archived_users"),
                q.select("deleted_users.id").from("deleted_users"),
            );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT users.id FROM users UNION SELECT moderators.id FROM moderators UNION ALL SELECT guests.id FROM guests UNION ALL SELECT visitors.id FROM visitors INTERSECT SELECT staff.id FROM staff INTERSECT SELECT contractors.id FROM contractors INTERSECT ALL SELECT vendors.id FROM vendors INTERSECT ALL SELECT suppliers.id FROM suppliers EXCEPT SELECT banned_users.id FROM banned_users EXCEPT SELECT blocked_users.id FROM blocked_users EXCEPT ALL SELECT archived_users.id FROM archived_users EXCEPT ALL SELECT deleted_users.id FROM deleted_users");
        expect(parameters).toEqual([]);
    });
});