import { MathFunctionBuilder } from "./override-math-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";
export declare class NetworkFunctionBuilder extends MathFunctionBuilder {
    abbrev(value?: StatementValueQueryBuilder): this;
    broadcast(value?: StatementValueQueryBuilder): this;
    host(value?: StatementValueQueryBuilder): this;
    hostmask(value?: StatementValueQueryBuilder): this;
    inetMerge(left?: StatementValueQueryBuilder, right?: StatementValueQueryBuilder): this;
    inetSameFamily(left?: StatementValueQueryBuilder, right?: StatementValueQueryBuilder): this;
    masklen(value?: StatementValueQueryBuilder): this;
    netmask(value?: StatementValueQueryBuilder): this;
    network(value?: StatementValueQueryBuilder): this;
    setMasklen(value?: StatementValueQueryBuilder, length?: StatementValueLiteral): this;
    textInet(value?: StatementValueQueryBuilder): this;
    macaddrTrunc(value?: StatementValueQueryBuilder): this;
    macaddr8Trunc(value?: StatementValueQueryBuilder): this;
    macaddr8Set7bit(value?: StatementValueQueryBuilder): this;
}
