"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumFunctionBuilder = void 0;
const override_set_returning_functions_1 = require("./override-set-returning-functions");
class EnumFunctionBuilder extends override_set_returning_functions_1.SetReturningFunctionBuilder {
    // Enum functions take enum values as data (literals), not type names (identifiers)
    enumFirst(value) {
        return this.pushFunction("ENUM_FIRST", value === undefined ? undefined : this.toLiteralValue(value));
    }
    enumLast(value) {
        return this.pushFunction("ENUM_LAST", value === undefined ? undefined : this.toLiteralValue(value));
    }
    enumRange(start, end) {
        return this.pushFunction("ENUM_RANGE", start === undefined ? undefined : this.toLiteralValue(start), end === undefined ? undefined : this.toLiteralValue(end));
    }
}
exports.EnumFunctionBuilder = EnumFunctionBuilder;
