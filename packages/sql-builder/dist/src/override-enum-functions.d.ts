import { SetReturningFunctionBuilder } from "./override-set-returning-functions";
import type { StatementValueLiteral } from "./types";
export declare class EnumFunctionBuilder extends SetReturningFunctionBuilder {
    enumFirst(value?: StatementValueLiteral): this;
    enumLast(value?: StatementValueLiteral): this;
    enumRange(start?: StatementValueLiteral, end?: StatementValueLiteral): this;
}
