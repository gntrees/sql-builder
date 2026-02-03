import { describe, expect, it } from "bun:test";
import { sqlBuilder } from "../../index";

const q = sqlBuilder({
    formatParamHandler: "pg",
    execHandler: async () => ({}),
});

describe("event trigger functions", () => {
    it("builds pg_event_trigger_ddl_commands", () => {
        const builder = q.select().pgEventTriggerDdlCommands();
        expect(builder.getSql()).toBe("SELECT PG_EVENT_TRIGGER_DDL_COMMANDS()");
        expect(builder.getParameters()).toEqual([]);
    });

    it("builds pg_event_trigger_dropped_objects", () => {
        const builder = q.select().pgEventTriggerDroppedObjects();
        expect(builder.getSql()).toBe("SELECT PG_EVENT_TRIGGER_DROPPED_OBJECTS()");
        expect(builder.getParameters()).toEqual([]);
    });

    it("builds pg_event_trigger_table_rewrite_oid", () => {
        const builder = q.select().pgEventTriggerTableRewriteOid();
        expect(builder.getSql()).toBe("SELECT PG_EVENT_TRIGGER_TABLE_REWRITE_OID()");
        expect(builder.getParameters()).toEqual([]);
    });

    it("builds pg_event_trigger_table_rewrite_reason", () => {
        const builder = q.select().pgEventTriggerTableRewriteReason();
        expect(builder.getSql()).toBe("SELECT PG_EVENT_TRIGGER_TABLE_REWRITE_REASON()");
        expect(builder.getParameters()).toEqual([]);
    });
});
