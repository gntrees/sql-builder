"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeometryFunctionBuilder = void 0;
const override_enum_functions_1 = require("./override-enum-functions");
class GeometryFunctionBuilder extends override_enum_functions_1.EnumFunctionBuilder {
    // Functions (Table 9.37)
    area(value) {
        return this.pushFunction("AREA", value);
    }
    center(value) {
        return this.pushFunction("CENTER", value);
    }
    diagonal(box) {
        return this.pushFunction("DIAGONAL", box);
    }
    diameter(circle) {
        return this.pushFunction("DIAMETER", circle);
    }
    height(box) {
        return this.pushFunction("HEIGHT", box);
    }
    isclosed(path) {
        return this.pushFunction("ISCLOSED", path);
    }
    isopen(path) {
        return this.pushFunction("ISOPEN", path);
    }
    length(value) {
        return this.pushFunction("LENGTH", value);
    }
    npoints(value) {
        return this.pushFunction("NPOINTS", value);
    }
    pclose(value) {
        return this.pushFunction("PCLOSE", value);
    }
    popen(value) {
        return this.pushFunction("POPEN", value);
    }
    radius(circle) {
        return this.pushFunction("RADIUS", circle);
    }
    slope(p1, p2) {
        return this.pushFunction("SLOPE", p1, p2);
    }
    width(box) {
        return this.pushFunction("WIDTH", box);
    }
    // Geometric type conversion functions (Table 9.38)
    box(v1, v2) {
        return this.pushFunction("BOX", v1, v2);
    }
    boundBox(b1, b2) {
        return this.pushFunction("BOUND_BOX", b1, b2);
    }
    circle(v1, v2) {
        return this.pushFunction("CIRCLE", v1, v2);
    }
    line(p1, p2) {
        return this.pushFunction("LINE", p1, p2);
    }
    lseg(v1, v2) {
        return this.pushFunction("LSEG", v1, v2);
    }
    path(value) {
        return this.pushFunction("PATH", value);
    }
    point(x, y) {
        return this.pushFunction("POINT", x === undefined ? undefined : this.toLiteralValue(x), y === undefined ? undefined : this.toLiteralValue(y));
    }
    polygon(countOrValue, circle) {
        return this.pushFunction("POLYGON", countOrValue === undefined ? undefined : this.toLiteralValue(countOrValue), circle);
    }
}
exports.GeometryFunctionBuilder = GeometryFunctionBuilder;
