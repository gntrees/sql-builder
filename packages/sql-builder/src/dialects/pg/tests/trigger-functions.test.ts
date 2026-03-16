import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("trigger functions", () => {
    it("builds SUPPRESS_REDUNDANT_UPDATES_TRIGGER", () => {
        const builder = q.select().suppressRedundantUpdatesTrigger();
        expectQuery(builder, "trigger", "SUPPRESS_REDUNDANT_UPDATES_TRIGGER");
    });

    it("builds TSVECTOR_UPDATE_TRIGGER with config name", () => {
        const builder = q.select()
            .tsvectorUpdateTrigger("search_vector", "pg_catalog.english", "title", "body");
        expectQuery(builder, "trigger", "TSVECTOR_UPDATE_TRIGGER with config name");
    });

    it("builds TSVECTOR_UPDATE_TRIGGER_column with config column", () => {
        const builder = q.select()
            .tsvectorUpdateTriggerColumn("search_vector", "config_column", "title", "content");
        expectQuery(builder, "trigger", "TSVECTOR_UPDATE_TRIGGER_column with config column");
    });

    it("builds TSVECTOR_UPDATE_TRIGGER with variable columns", () => {
        const builder = q.select()
            .tsvectorUpdateTrigger("sv", "english", "a", "b", "c", "d");
        expectQuery(builder, "trigger", "TSVECTOR_UPDATE_TRIGGER with variable columns");
    });
});
