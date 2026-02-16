import { AdminFunctionBuilder } from "./override-admin-functions";
import type { Statement } from "../../types";

export class TriggerFunctionBuilder extends AdminFunctionBuilder {
    // 9.29. Trigger Functions

    suppressRedundantUpdatesTrigger() {
        return this.pushFunction("suppress_redundant_updates_trigger");
    }

    tsvectorUpdateTrigger(
        tsvcol?: Statement,
        configName?: Statement,
        ...columns: Statement[]
    ) {
        return this.pushFunction("tsvector_update_trigger",tsvcol,configName,...columns);
    }

    tsvectorUpdateTriggerColumn(
        tsvcol?: Statement,
        tsconfigcol?: Statement,
        ...columns: Statement[]
    ) {
        return this.pushFunction("tsvector_update_trigger_column", tsvcol, tsconfigcol, ...columns);
    }
}
