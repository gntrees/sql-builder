import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../../../pg";
import { expectQuery } from "./test-helpers";

const q = sqlBuilder()
    .setFormatParamHandler("pg")
    .setExecutionHandler(async () => ({}));

describe("event trigger functions", () => {
    it("builds pg_event_trigger_ddl_commands", () => {
        const builder = q.select().pgEventTriggerDdlCommands();
        expectQuery(builder, "eventTrigger", "pg_event_trigger_ddl_commands");
    });

    it("builds pg_event_trigger_dropped_objects", () => {
        const builder = q.select().pgEventTriggerDroppedObjects();
        expectQuery(builder, "eventTrigger", "pg_event_trigger_dropped_objects");
    });

    it("builds pg_event_trigger_table_rewrite_oid", () => {
        const builder = q.select().pgEventTriggerTableRewriteOid();
        expectQuery(builder, "eventTrigger", "pg_event_trigger_table_rewrite_oid");
    });

    it("builds pg_event_trigger_table_rewrite_reason", () => {
        const builder = q.select().pgEventTriggerTableRewriteReason();
        expectQuery(builder, "eventTrigger", "pg_event_trigger_table_rewrite_reason");
    });
});
