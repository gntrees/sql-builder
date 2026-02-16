import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("trigger functions", () => {
    it("builds suppress_redundant_updates_trigger", () => {
        const builder = q.select().suppressRedundantUpdatesTrigger();
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT suppress_redundant_updates_trigger()");
        expect(parameters).toEqual([]);
    });

    it("builds tsvector_update_trigger with config name", () => {
        const builder = q.select()
            .tsvectorUpdateTrigger("search_vector", "pg_catalog.english", "title", "body");
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT tsvector_update_trigger($1, $2, $3, $4)");
        expect(parameters).toEqual(["search_vector", "pg_catalog.english", "title", "body"]);
    });

    it("builds tsvector_update_trigger_column with config column", () => {
        const builder = q.select()
            .tsvectorUpdateTriggerColumn("search_vector", "config_column", "title", "content");
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT tsvector_update_trigger_column($1, $2, $3, $4)");
        expect(parameters).toEqual(["search_vector", "config_column", "title", "content"]);
    });

    it("builds tsvector_update_trigger with variable columns", () => {
        const builder = q.select()
            .tsvectorUpdateTrigger("sv", "english", "a", "b", "c", "d");
        const sql = builder.getSql();
        const parameters = builder.getParameters();
        expect(sql).toBe("SELECT tsvector_update_trigger($1, $2, $3, $4, $5, $6)");
        expect(parameters).toEqual(["sv", "english", "a", "b", "c", "d"]);
    });
});
