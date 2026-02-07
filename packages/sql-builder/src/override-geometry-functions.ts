import { EnumFunctionBuilder } from "./override-enum-functions";
import type { Statement } from "./types";

export class GeometryFunctionBuilder extends EnumFunctionBuilder {
    // Functions (Table 9.37)
    area(value?: Statement) {
        return this.pushFunction("AREA", value);
    }

    center(value?: Statement) {
        return this.pushFunction("CENTER", value);
    }

    diagonal(box?: Statement) {
        return this.pushFunction("DIAGONAL", box);
    }

    diameter(circle?: Statement) {
        return this.pushFunction("DIAMETER", circle);
    }

    height(box?: Statement) {
        return this.pushFunction("HEIGHT", box);
    }

    isclosed(path?: Statement) {
        return this.pushFunction("ISCLOSED", path);
    }

    isopen(path?: Statement) {
        return this.pushFunction("ISOPEN", path);
    }

    override length(value?: Statement) {
        return this.pushFunction("LENGTH", value);
    }

    npoints(value?: Statement) {
        return this.pushFunction("NPOINTS", value);
    }

    pclose(value?: Statement) {
        return this.pushFunction("PCLOSE", value);
    }

    popen(value?: Statement) {
        return this.pushFunction("POPEN", value);
    }

    radius(circle?: Statement) {
        return this.pushFunction("RADIUS", circle);
    }

    slope(p1?: Statement, p2?: Statement) {
        return this.pushFunction("SLOPE", p1, p2);
    }

    width(box?: Statement) {
        return this.pushFunction("WIDTH", box);
    }

    // Geometric type conversion functions (Table 9.38)
    box(v1?: Statement, v2?: Statement) {
        return this.pushFunction("BOX", v1, v2);
    }

    boundBox(b1?: Statement, b2?: Statement) {
        return this.pushFunction("BOUND_BOX", b1, b2);
    }

    circle(v1?: Statement, v2?: Statement) {
        return this.pushFunction("CIRCLE", v1, v2);
    }

    line(p1?: Statement, p2?: Statement) {
        return this.pushFunction("LINE", p1, p2);
    }

    lseg(v1?: Statement, v2?: Statement) {
        return this.pushFunction("LSEG", v1, v2);
    }

    override path(value?: Statement) {
        return this.pushFunction("PATH", value);
    }

    point(x?: Statement, y?: Statement) {
        return this.pushFunction("POINT",
            x === undefined ? undefined : this.toLiteral(x),
            y === undefined ? undefined : this.toLiteral(y));
    }

    polygon(countOrValue?: Statement, circle?: Statement) {
        return this.pushFunction("POLYGON",
            countOrValue === undefined ? undefined : this.toLiteral(countOrValue),
            circle);
    }
}
