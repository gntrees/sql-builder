import { SetReturningFunctionBuilder } from "./override-set-returning-functions";
import type { Statement } from "./types";
export declare class EnumFunctionBuilder extends SetReturningFunctionBuilder {
    enumFirst(value?: Statement): this;
    enumLast(value?: Statement): this;
    enumRange(start?: Statement, end?: Statement): this;
}
