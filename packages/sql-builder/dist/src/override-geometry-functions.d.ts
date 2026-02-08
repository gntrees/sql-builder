import { EnumFunctionBuilder } from "./override-enum-functions";
import type { Statement } from "./types";
export declare class GeometryFunctionBuilder extends EnumFunctionBuilder {
    area(value?: Statement): this;
    center(value?: Statement): this;
    diagonal(box?: Statement): this;
    diameter(circle?: Statement): this;
    height(box?: Statement): this;
    isclosed(path?: Statement): this;
    isopen(path?: Statement): this;
    length(value?: Statement): this;
    npoints(value?: Statement): this;
    pclose(value?: Statement): this;
    popen(value?: Statement): this;
    radius(circle?: Statement): this;
    slope(p1?: Statement, p2?: Statement): this;
    width(box?: Statement): this;
    box(v1?: Statement, v2?: Statement): this;
    boundBox(b1?: Statement, b2?: Statement): this;
    circle(v1?: Statement, v2?: Statement): this;
    line(p1?: Statement, p2?: Statement): this;
    lseg(v1?: Statement, v2?: Statement): this;
    path(value?: Statement): this;
    point(x?: Statement, y?: Statement): this;
    polygon(countOrValue?: Statement, circle?: Statement): this;
}
