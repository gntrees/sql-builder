"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetReturningFunctionBuilder = void 0;
const override_date_time_function_1 = require("./override-date-time-function");
class SetReturningFunctionBuilder extends override_date_time_function_1.DateTimeFunctionBuilder {
    /**
     * PostgreSQL generate_series - generates a series of values
     * @param start - Starting value (number, timestamp, timestamptz)
     * @param stop - Ending value
     * @param step - Step increment (optional for numeric, required for timestamp/timestamptz)
     * @param timezone - Timezone name (only for timestamptz variant)
     */
    generateSeries(start, stop, step, timezone) {
        return this.pushFunction("GENERATE_SERIES", start, stop, step, timezone);
    }
    /**
     * PostgreSQL generate_subscripts - generates valid subscripts for an array dimension
     * @param array - The array to generate subscripts for
     * @param dim - The array dimension
     * @param reverse - Optional: true to generate in reverse order
     */
    generateSubscripts(array, dim, reverse) {
        return this.pushFunction("GENERATE_SUBSCRIPTS", array, dim, reverse);
    }
}
exports.SetReturningFunctionBuilder = SetReturningFunctionBuilder;
