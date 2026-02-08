import { EventTriggerFunctionBuilder } from "./override-event-trigger-functions";
import type { Statement } from "./types";
export declare class StatisticsFunctionBuilder extends EventTriggerFunctionBuilder {
    /**
     * pg_mcv_list_items(pg_mcv_list) → setof record
     * Returns a set of records describing all items stored in a multi-column MCV list.
     */
    pgMcvListItems(mcvList?: Statement): this;
}
