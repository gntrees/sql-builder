import type { Statement } from "./types";
import { TriggerFunctionBuilder } from "./override-trigger-functions";

export class EventTriggerFunctionBuilder extends TriggerFunctionBuilder {
    // 9.30. Event Trigger Functions

    pgEventTriggerDdlCommands() {
        return this.pushFunction("PG_EVENT_TRIGGER_DDL_COMMANDS");
    }

    pgEventTriggerDroppedObjects() {
        return this.pushFunction("PG_EVENT_TRIGGER_DROPPED_OBJECTS");
    }

    pgEventTriggerTableRewriteOid() {
        return this.pushFunction("PG_EVENT_TRIGGER_TABLE_REWRITE_OID");
    }

    pgEventTriggerTableRewriteReason() {
        return this.pushFunction("PG_EVENT_TRIGGER_TABLE_REWRITE_REASON");
    }
}
