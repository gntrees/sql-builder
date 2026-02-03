import { SetReturningFunctionBuilder } from "./override-set-returning-functions";
import type { StatementValueLiteral } from "./types";

export class EnumFunctionBuilder extends SetReturningFunctionBuilder {
    // Enum functions take enum values as data (literals), not type names (identifiers)
    enumFirst(value?: StatementValueLiteral) {
        return this.pushFunction("ENUM_FIRST",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    enumLast(value?: StatementValueLiteral) {
        return this.pushFunction("ENUM_LAST",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    enumRange(start?: StatementValueLiteral, end?: StatementValueLiteral) {
        return this.pushFunction("ENUM_RANGE",
            start === undefined ? undefined : this.toLiteralValue(start),
            end === undefined ? undefined : this.toLiteralValue(end));
    }
}
