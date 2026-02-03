import { MathFunctionBuilder } from "./override-math-functions";
import { XMLFunctionBuilder } from "./override-xml-functions";
import type { StatementValue, StatementValueLiteral } from "./types";

export class SequenceFunctionBuilder extends XMLFunctionBuilder {
    // Sequence name is flexible - can be string literal or identifier
    nextval(sequence?: StatementValue) {
        return this.pushFunction("NEXTVAL",
            sequence === undefined ? undefined : this.toLiteral(sequence));
    }

    setval(sequence?: StatementValue, value?: StatementValueLiteral, isCalled?: StatementValueLiteral) {
        return this.pushFunction("SETVAL",
            sequence === undefined ? undefined : this.toLiteral(sequence),
            value === undefined ? undefined : this.toLiteralValue(value),
            isCalled === undefined ? undefined : this.toLiteralValue(isCalled));
    }

    currval(sequence?: StatementValue) {
        return this.pushFunction("CURRVAL",
            sequence === undefined ? undefined : this.toLiteral(sequence));
    }

    lastval() {
        return this.pushFunction("LASTVAL");
    }
}
