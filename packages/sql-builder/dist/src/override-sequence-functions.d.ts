import { XMLFunctionBuilder } from "./override-xml-functions";
import type { StatementValue, StatementValueLiteral } from "./types";
export declare class SequenceFunctionBuilder extends XMLFunctionBuilder {
    nextval(sequence?: StatementValue): this;
    setval(sequence?: StatementValue, value?: StatementValueLiteral, isCalled?: StatementValueLiteral): this;
    currval(sequence?: StatementValue): this;
    lastval(): this;
}
