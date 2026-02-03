import { EnumFunctionBuilder } from "./override-enum-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";
export declare class GeometryFunctionBuilder extends EnumFunctionBuilder {
    area(value?: StatementValueQueryBuilder): this;
    center(value?: StatementValueQueryBuilder): this;
    diagonal(box?: StatementValueQueryBuilder): this;
    diameter(circle?: StatementValueQueryBuilder): this;
    height(box?: StatementValueQueryBuilder): this;
    isclosed(path?: StatementValueQueryBuilder): this;
    isopen(path?: StatementValueQueryBuilder): this;
    length(value?: StatementValueQueryBuilder): this;
    npoints(value?: StatementValueQueryBuilder): this;
    pclose(value?: StatementValueQueryBuilder): this;
    popen(value?: StatementValueQueryBuilder): this;
    radius(circle?: StatementValueQueryBuilder): this;
    slope(p1?: StatementValueQueryBuilder, p2?: StatementValueQueryBuilder): this;
    width(box?: StatementValueQueryBuilder): this;
    box(v1?: StatementValueQueryBuilder, v2?: StatementValueQueryBuilder): this;
    boundBox(b1?: StatementValueQueryBuilder, b2?: StatementValueQueryBuilder): this;
    circle(v1?: StatementValueQueryBuilder, v2?: StatementValueQueryBuilder): this;
    line(p1?: StatementValueQueryBuilder, p2?: StatementValueQueryBuilder): this;
    lseg(v1?: StatementValueQueryBuilder, v2?: StatementValueQueryBuilder): this;
    path(value?: StatementValueQueryBuilder): this;
    point(x?: StatementValueLiteral, y?: StatementValueLiteral): this;
    polygon(countOrValue?: StatementValueLiteral, circle?: StatementValueQueryBuilder): this;
}
