import { SetReturningFunctionBuilder } from "./override-set-returning-functions";
import type { Statement } from "../../types";

export class EnumFunctionBuilder extends SetReturningFunctionBuilder {
    // Enum functions take enum values as data (literals), not type names (identifiers)
    enumFirst(value?: Statement) {
        return this.pushFunction("ENUM_FIRST", value);
    }

    enumLast(value?: Statement) {
        return this.pushFunction("ENUM_LAST", value);
    }

    enumRange(start?: Statement, end?: Statement) {
        return this.pushFunction("ENUM_RANGE", start, end);
    }
}
