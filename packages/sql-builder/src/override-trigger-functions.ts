import { AdminFunctionBuilder } from "./override-admin-functions";
import type { StatementValueLiteral } from "./types";

export class TriggerFunctionBuilder extends AdminFunctionBuilder {
    // 9.29. Trigger Functions

    suppressRedundantUpdatesTrigger() {
        return this.pushFunction("suppress_redundant_updates_trigger");
    }

    tsvectorUpdateTrigger(
        tsvcol?: StatementValueLiteral,
        configName?: StatementValueLiteral,
        ...columns: StatementValueLiteral[]
    ) {
        const args = [tsvcol, configName, ...columns]
            .filter((arg) => arg !== undefined && arg !== null)
            .map((arg) => this.toLiteralValue(arg as StatementValueLiteral));
        return this.pushFunction("tsvector_update_trigger", ...args);
    }

    tsvectorUpdateTriggerColumn(
        tsvcol?: StatementValueLiteral,
        tsconfigcol?: StatementValueLiteral,
        ...columns: StatementValueLiteral[]
    ) {
        const args = [tsvcol, tsconfigcol, ...columns]
            .filter((arg) => arg !== undefined && arg !== null)
            .map((arg) => this.toLiteralValue(arg as StatementValueLiteral));
        return this.pushFunction("tsvector_update_trigger_column", ...args);
    }
}
