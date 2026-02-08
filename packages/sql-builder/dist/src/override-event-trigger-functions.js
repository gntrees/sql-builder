"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTriggerFunctionBuilder = void 0;
const override_trigger_functions_1 = require("./override-trigger-functions");
class EventTriggerFunctionBuilder extends override_trigger_functions_1.TriggerFunctionBuilder {
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
exports.EventTriggerFunctionBuilder = EventTriggerFunctionBuilder;
