import { AdminFunctionBuilder } from "./override-admin-functions";
import type { StatementValueLiteral } from "./types";
export declare class TriggerFunctionBuilder extends AdminFunctionBuilder {
    suppressRedundantUpdatesTrigger(): this;
    tsvectorUpdateTrigger(tsvcol?: StatementValueLiteral, configName?: StatementValueLiteral, ...columns: StatementValueLiteral[]): this;
    tsvectorUpdateTriggerColumn(tsvcol?: StatementValueLiteral, tsconfigcol?: StatementValueLiteral, ...columns: StatementValueLiteral[]): this;
}
