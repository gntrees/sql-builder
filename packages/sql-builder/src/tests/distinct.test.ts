import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("distinct queries", () => {
    it("distinctOnQuery", () => {
        const builder = q
            .selectDistinctOn(["posts.author_id"], ["posts.id", "posts.title"])
            .from("posts");

        const sql = builder.getSql();
        const parameters = builder.getParameters();

        // Using actual generated SQL
        expect(sql).toBe("SELECT DISTINCT ON (posts.author_id) posts.id, posts.title FROM posts");
        expect(parameters).toEqual([]);
    });
});