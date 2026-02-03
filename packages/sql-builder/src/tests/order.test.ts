import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("order queries", () => {
    it("orderQuery", () => {
        const builder = q
            .select("posts.id", "posts.title")
            .from("posts")
            .where(q.i("posts.is_published").op("=").l(true))
            .orderBy("posts.created_at", "posts.id")
            .limit(23)
            .offset(20);

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT posts.id, posts.title FROM posts WHERE posts.is_published = $1 ORDER BY posts.created_at, posts.id LIMIT $2 OFFSET $3");
        expect(parameters).toEqual([true, 23, 20]);
    });

    it("orderDirectionQuery", () => {
        const builder = q
            .select("posts.id", "posts.title")
            .from("posts")
            .orderBy(
                q.asc("posts.created_at", "posts.id"),
                q.desc("posts.title"),
            );

        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT posts.id, posts.title FROM posts ORDER BY posts.created_at ASC, posts.id ASC, posts.title DESC");
        expect(parameters).toEqual([]);
    });
});