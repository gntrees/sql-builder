"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowFunctionBuilder = void 0;
const override_aggregate_functions_1 = require("./override-aggregate-functions");
class WindowFunctionBuilder extends override_aggregate_functions_1.AggregateFunctionBuilder {
    // ============================================================
    // TABLE 9.60 - GENERAL-PURPOSE WINDOW FUNCTIONS
    // https://www.postgresql.org/docs/current/functions-window.html
    // ============================================================
    rowNumber() {
        return this.pushFunction("ROW_NUMBER");
    }
    ntile(numBuckets) {
        return this.pushFunction("NTILE", numBuckets);
    }
    lag(value, offset, defaultValue) {
        return this.pushFunction("LAG", value, offset, defaultValue);
    }
    lead(value, offset, defaultValue) {
        return this.pushFunction("LEAD", value, offset, defaultValue);
    }
    firstValue(value) {
        return this.pushFunction("FIRST_VALUE", value);
    }
    lastValue(value) {
        return this.pushFunction("LAST_VALUE", value);
    }
    nthValue(value, n) {
        return this.pushFunction("NTH_VALUE", value, n);
    }
}
exports.WindowFunctionBuilder = WindowFunctionBuilder;
