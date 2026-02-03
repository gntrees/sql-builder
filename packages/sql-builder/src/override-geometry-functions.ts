import { EnumFunctionBuilder } from "./override-enum-functions";
import type { StatementValueQueryBuilder, StatementValueLiteral } from "./types";

export class GeometryFunctionBuilder extends EnumFunctionBuilder {
    // Functions (Table 9.37)
    area(value?: StatementValueQueryBuilder) {
        return this.pushFunction("AREA", value);
    }

    center(value?: StatementValueQueryBuilder) {
        return this.pushFunction("CENTER", value);
    }

    diagonal(box?: StatementValueQueryBuilder) {
        return this.pushFunction("DIAGONAL", box);
    }

    diameter(circle?: StatementValueQueryBuilder) {
        return this.pushFunction("DIAMETER", circle);
    }

    height(box?: StatementValueQueryBuilder) {
        return this.pushFunction("HEIGHT", box);
    }

    isclosed(path?: StatementValueQueryBuilder) {
        return this.pushFunction("ISCLOSED", path);
    }

    isopen(path?: StatementValueQueryBuilder) {
        return this.pushFunction("ISOPEN", path);
    }

    override length(value?: StatementValueQueryBuilder) {
        return this.pushFunction("LENGTH", value);
    }

    npoints(value?: StatementValueQueryBuilder) {
        return this.pushFunction("NPOINTS", value);
    }

    pclose(value?: StatementValueQueryBuilder) {
        return this.pushFunction("PCLOSE", value);
    }

    popen(value?: StatementValueQueryBuilder) {
        return this.pushFunction("POPEN", value);
    }

    radius(circle?: StatementValueQueryBuilder) {
        return this.pushFunction("RADIUS", circle);
    }

    slope(p1?: StatementValueQueryBuilder, p2?: StatementValueQueryBuilder) {
        return this.pushFunction("SLOPE", p1, p2);
    }

    width(box?: StatementValueQueryBuilder) {
        return this.pushFunction("WIDTH", box);
    }

    // Geometric type conversion functions (Table 9.38)
    box(v1?: StatementValueQueryBuilder, v2?: StatementValueQueryBuilder) {
        return this.pushFunction("BOX", v1, v2);
    }

    boundBox(b1?: StatementValueQueryBuilder, b2?: StatementValueQueryBuilder) {
        return this.pushFunction("BOUND_BOX", b1, b2);
    }

    circle(v1?: StatementValueQueryBuilder, v2?: StatementValueQueryBuilder) {
        return this.pushFunction("CIRCLE", v1, v2);
    }

    line(p1?: StatementValueQueryBuilder, p2?: StatementValueQueryBuilder) {
        return this.pushFunction("LINE", p1, p2);
    }

    lseg(v1?: StatementValueQueryBuilder, v2?: StatementValueQueryBuilder) {
        return this.pushFunction("LSEG", v1, v2);
    }

    override path(value?: StatementValueQueryBuilder) {
        return this.pushFunction("PATH", value);
    }

    point(x?: StatementValueLiteral, y?: StatementValueLiteral) {
        return this.pushFunction("POINT",
            x === undefined ? undefined : this.toLiteralValue(x),
            y === undefined ? undefined : this.toLiteralValue(y));
    }

    polygon(countOrValue?: StatementValueLiteral, circle?: StatementValueQueryBuilder) {
        return this.pushFunction("POLYGON",
            countOrValue === undefined ? undefined : this.toLiteralValue(countOrValue),
            circle);
    }
}
