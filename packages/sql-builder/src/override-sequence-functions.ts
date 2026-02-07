import { MathFunctionBuilder } from "./override-math-functions";
import { XMLFunctionBuilder } from "./override-xml-functions";
import type { Statement } from "./types";

export class SequenceFunctionBuilder extends XMLFunctionBuilder {
    // Sequence name is flexible - can be string literal or identifier
    nextval(sequence?: Statement) {
        return this.pushFunction("NEXTVAL",
            sequence === undefined ? undefined : this.toLiteral(sequence));
    }

    setval(sequence?: Statement, value?: Statement, isCalled?: Statement) {
        return this.pushFunction("SETVAL",
            sequence === undefined ? undefined : this.toLiteral(sequence),
            value === undefined ? undefined : this.toLiteral(value),
            isCalled === undefined ? undefined : this.toLiteral(isCalled));
    }

    currval(sequence?: Statement) {
        return this.pushFunction("CURRVAL",
            sequence === undefined ? undefined : this.toLiteral(sequence));
    }

    lastval() {
        return this.pushFunction("LASTVAL");
    }
}
