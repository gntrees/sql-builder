import { AdminFunctionBuilder } from "./override-admin-functions";
import type { Statement } from "./types";

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
        const args = [tsvcol, configName, ...columns]
            .filter((arg) => arg !== undefined && arg !== null)
            .map((arg) => this.toLiteral(arg as Statement));
        return this.pushFunction("tsvector_update_trigger", ...args);
    }

    tsvectorUpdateTriggerColumn(
        tsvcol?: Statement,
        tsconfigcol?: Statement,
        ...columns: Statement[]
    ) {
        const args = [tsvcol, tsconfigcol, ...columns]
            .filter((arg) => arg !== undefined && arg !== null)
            .map((arg) => this.toLiteral(arg as Statement));
        return this.pushFunction("tsvector_update_trigger_column", ...args);
    }
}
