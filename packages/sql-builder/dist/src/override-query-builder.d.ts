import { StatisticsFunctionBuilder } from "./override-statistics-functions";
import type { QueryBuilder } from "./query-builder";
import type { Statement } from "./types";
export declare class OverrideQueryBuilder extends StatisticsFunctionBuilder {
    escape(value?: Statement): this;
    semicolon(): this;
    sc(): this;
    beginTransaction(): this;
    commitTransaction(): this;
    rollbackTransaction(): this;
    savepointTransaction(name?: string | QueryBuilder): this;
    transaction(...transaction: QueryBuilder[]): this;
    select(...cols: (QueryBuilder | string | {
        [alias: string]: QueryBuilder | string;
    })[]): this;
    selectDistinct(...cols: (QueryBuilder | string | {
        [alias: string]: QueryBuilder | string;
    })[]): this;
    selectDistinctOn(on?: (QueryBuilder | string)[], cols?: (QueryBuilder | string | {
        [alias: string]: QueryBuilder | string;
    })[]): this;
    insertInto(table?: string | QueryBuilder, cols?: (QueryBuilder | string)[]): this;
    values(...values: Array<Statement | Array<Statement>>): this;
    insert<T extends Record<string, string | QueryBuilder>>(table?: string | QueryBuilder, values?: T | T[]): this;
    update(table?: string | QueryBuilder): this;
    delete(table?: string | QueryBuilder): this;
    set(set?: Record<string, string | QueryBuilder>): this;
    onConflictDoNothing(options?: {
        target?: QueryBuilder | string | Array<QueryBuilder | string>;
        targetWhere?: QueryBuilder;
    }): this;
    onConflictDoUpdate(options?: {
        target?: QueryBuilder | string | Array<QueryBuilder | string>;
        targetWhere?: QueryBuilder;
        set?: Record<string, string | QueryBuilder> | Array<Record<string, string | QueryBuilder>>;
        setWhere?: QueryBuilder;
    }): this;
    case(caseExpr?: QueryBuilder, asAlias?: string | QueryBuilder): this;
    when(condition?: QueryBuilder): this;
    then(value?: QueryBuilder): this;
    else(value?: QueryBuilder): this;
    asc(...cols: (QueryBuilder | string)[]): this;
    desc(...cols: (QueryBuilder | string)[]): this;
    as(alias?: string | QueryBuilder): this;
    sub(query?: QueryBuilder): this;
    from(...tables: (QueryBuilder | string)[]): this;
    leftJoin(table?: QueryBuilder | string, on?: QueryBuilder): this;
    leftJoinLateral(table?: QueryBuilder | string, on?: QueryBuilder): this;
    innerJoin(table?: QueryBuilder | string, on?: QueryBuilder): this;
    rightJoin(table?: QueryBuilder | string, on?: QueryBuilder): this;
    innerJoinLateral(table?: QueryBuilder | string, on?: QueryBuilder): this;
    fullJoin(table?: QueryBuilder | string, on?: QueryBuilder): this;
    rightJoinLateral(table?: QueryBuilder | string, on?: QueryBuilder): this;
    crossJoin(table?: QueryBuilder | string): this;
    crossJoinLateral(table?: QueryBuilder | string): this;
    groupBy(...cols: (QueryBuilder | string)[]): this;
    having(condition?: QueryBuilder): this;
    union(...queries: QueryBuilder[]): this;
    unionAll(...queries: QueryBuilder[]): this;
    intersect(...queries: QueryBuilder[]): this;
    intersectAll(...queries: QueryBuilder[]): this;
    except(...queries: QueryBuilder[]): this;
    exceptAll(...queries: QueryBuilder[]): this;
    with(cteName?: string | QueryBuilder, subQuery?: QueryBuilder): this;
    where(condition?: QueryBuilder): this;
    and(...values: QueryBuilder[]): this;
    or(...values: QueryBuilder[]): this;
    comma(...queries: QueryBuilder[]): this;
    orderBy(...cols: (QueryBuilder | string)[]): this;
    returning(col?: string | QueryBuilder): this;
    limit(value?: QueryBuilder | number): this;
    offset(value?: QueryBuilder | number): this;
    fetch(count?: number | QueryBuilder, mode?: "first" | "next", withTies?: boolean): this;
    t(table?: string | QueryBuilder): this;
    column(column?: string | QueryBuilder): this;
    c(column?: string | QueryBuilder): this;
}
