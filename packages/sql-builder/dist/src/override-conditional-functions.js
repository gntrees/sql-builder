"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionalFunctionBuilder = void 0;
const override_string_functions_1 = require("./override-string-functions");
class ConditionalFunctionBuilder extends override_string_functions_1.StringFunctionBuilder {
    /**
     * COALESCE(value [, ...])
     * Returns the first of its arguments that is not null.
     * Null is returned only if all arguments are null.
     */
    coalesce(...values) {
        const filtered = values.filter(v => v !== undefined);
        return this.pushFunction("COALESCE", ...filtered);
    }
    /**
     * NULLIF(value1, value2)
     * Returns null if value1 equals value2; otherwise returns value1.
     */
    nullif(value1, value2) {
        return this.pushFunction("NULLIF", value1, value2);
    }
    /**
     * GREATEST(value [, ...])
     * Selects the largest value from a list of any number of expressions.
     * NULL values in the argument list are ignored.
     */
    greatest(...values) {
        const filtered = values.filter(v => v !== undefined);
        return this.pushFunction("GREATEST", ...filtered);
    }
    /**
     * LEAST(value [, ...])
     * Selects the smallest value from a list of any number of expressions.
     * NULL values in the argument list are ignored.
     */
    least(...values) {
        const filtered = values.filter(v => v !== undefined);
        return this.pushFunction("LEAST", ...filtered);
    }
}
exports.ConditionalFunctionBuilder = ConditionalFunctionBuilder;
