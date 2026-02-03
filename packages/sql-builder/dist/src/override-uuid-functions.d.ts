import { TextSearchFunctionBuilder } from "./override-textsearch-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";
export declare class UUIDFunctionBuilder extends TextSearchFunctionBuilder {
    genRandomUuid(): this;
    uuidv4(): this;
    uuidv7(shift?: StatementValueLiteral): this;
    uuidExtractTimestamp(uuid?: StatementValueQueryBuilder): this;
    uuidExtractVersion(uuid?: StatementValueQueryBuilder): this;
}
