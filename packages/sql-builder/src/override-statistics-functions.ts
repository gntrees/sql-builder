import { EventTriggerFunctionBuilder } from "./override-event-trigger-functions";
import type { StatementValueLiteral } from "./types";

export class StatisticsFunctionBuilder extends EventTriggerFunctionBuilder {
    /**
     * pg_mcv_list_items(pg_mcv_list) → setof record
     * Returns a set of records describing all items stored in a multi-column MCV list.
     */
    pgMcvListItems(mcvList?: StatementValueLiteral) {
        return this.pushFunction("PG_MCV_LIST_ITEMS",
            mcvList === undefined ? undefined : this.toLiteralValue(mcvList));
    }
}
