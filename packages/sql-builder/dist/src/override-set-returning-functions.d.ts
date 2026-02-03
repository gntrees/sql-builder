import { DateTimeFunctionBuilder } from "./override-date-time-function";
import type { StatementValueQueryBuilder } from "./types";
export declare class SetReturningFunctionBuilder extends DateTimeFunctionBuilder {
    /**
     * PostgreSQL generate_series - generates a series of values
     * @param start - Starting value (number, timestamp, timestamptz)
     * @param stop - Ending value
     * @param step - Step increment (optional for numeric, required for timestamp/timestamptz)
     * @param timezone - Timezone name (only for timestamptz variant)
     */
    generateSeries(start?: StatementValueQueryBuilder, stop?: StatementValueQueryBuilder, step?: StatementValueQueryBuilder, timezone?: StatementValueQueryBuilder): this;
    /**
     * PostgreSQL generate_subscripts - generates valid subscripts for an array dimension
     * @param array - The array to generate subscripts for
     * @param dim - The array dimension
     * @param reverse - Optional: true to generate in reverse order
     */
    generateSubscripts(array?: StatementValueQueryBuilder, dim?: StatementValueQueryBuilder, reverse?: StatementValueQueryBuilder): this;
}
