"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsFunctionBuilder = void 0;
const override_event_trigger_functions_1 = require("./override-event-trigger-functions");
class StatisticsFunctionBuilder extends override_event_trigger_functions_1.EventTriggerFunctionBuilder {
    /**
     * pg_mcv_list_items(pg_mcv_list) → setof record
     * Returns a set of records describing all items stored in a multi-column MCV list.
     */
    pgMcvListItems(mcvList) {
        return this.pushFunction("PG_MCV_LIST_ITEMS", mcvList === undefined ? undefined : this.toLiteral(mcvList));
    }
}
exports.StatisticsFunctionBuilder = StatisticsFunctionBuilder;
