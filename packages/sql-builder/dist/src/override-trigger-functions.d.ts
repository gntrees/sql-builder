import { AdminFunctionBuilder } from "./override-admin-functions";
import type { Statement } from "./types";
export declare class TriggerFunctionBuilder extends AdminFunctionBuilder {
    suppressRedundantUpdatesTrigger(): this;
    tsvectorUpdateTrigger(tsvcol?: Statement, configName?: Statement, ...columns: Statement[]): this;
    tsvectorUpdateTriggerColumn(tsvcol?: Statement, tsconfigcol?: Statement, ...columns: Statement[]): this;
}
