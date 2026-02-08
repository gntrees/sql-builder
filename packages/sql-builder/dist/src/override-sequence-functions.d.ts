import { XMLFunctionBuilder } from "./override-xml-functions";
import type { Statement } from "./types";
export declare class SequenceFunctionBuilder extends XMLFunctionBuilder {
    nextval(sequence?: Statement): this;
    setval(sequence?: Statement, value?: Statement, isCalled?: Statement): this;
    currval(sequence?: Statement): this;
    lastval(): this;
}
