import { TriggerFunctionBuilder } from "./override-trigger-functions";
export declare class EventTriggerFunctionBuilder extends TriggerFunctionBuilder {
    pgEventTriggerDdlCommands(): this;
    pgEventTriggerDroppedObjects(): this;
    pgEventTriggerTableRewriteOid(): this;
    pgEventTriggerTableRewriteReason(): this;
}
