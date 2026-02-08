"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathFunctionBuilder = void 0;
const override_geometry_functions_1 = require("./override-geometry-functions");
class MathFunctionBuilder extends override_geometry_functions_1.GeometryFunctionBuilder {
    abs(value) {
        return this.pushFunction("ABS", value === undefined ? undefined : this.toLiteral(value));
    }
    cbrt(value) {
        return this.pushFunction("CBRT", value === undefined ? undefined : this.toLiteral(value));
    }
    ceil(value) {
        return this.pushFunction("CEIL", value === undefined ? undefined : this.toLiteral(value));
    }
    ceiling(value) {
        return this.pushFunction("CEILING", value === undefined ? undefined : this.toLiteral(value));
    }
    degrees(value) {
        return this.pushFunction("DEGREES", value === undefined ? undefined : this.toLiteral(value));
    }
    div(numerator, denominator) {
        return this.pushFunction("DIV", numerator === undefined ? undefined : this.toLiteral(numerator), denominator === undefined ? undefined : this.toLiteral(denominator));
    }
    erf(value) {
        return this.pushFunction("ERF", value === undefined ? undefined : this.toLiteral(value));
    }
    erfc(value) {
        return this.pushFunction("ERFC", value === undefined ? undefined : this.toLiteral(value));
    }
    exp(value) {
        return this.pushFunction("EXP", value === undefined ? undefined : this.toLiteral(value));
    }
    factorial(value) {
        return this.pushFunction("FACTORIAL", value === undefined ? undefined : this.toLiteral(value));
    }
    floor(value) {
        return this.pushFunction("FLOOR", value === undefined ? undefined : this.toLiteral(value));
    }
    gamma(value) {
        return this.pushFunction("GAMMA", value === undefined ? undefined : this.toLiteral(value));
    }
    gcd(left, right) {
        return this.pushFunction("GCD", left === undefined ? undefined : this.toLiteral(left), right === undefined ? undefined : this.toLiteral(right));
    }
    lcm(left, right) {
        return this.pushFunction("LCM", left === undefined ? undefined : this.toLiteral(left), right === undefined ? undefined : this.toLiteral(right));
    }
    lgamma(value) {
        return this.pushFunction("LGAMMA", value === undefined ? undefined : this.toLiteral(value));
    }
    ln(value) {
        return this.pushFunction("LN", value === undefined ? undefined : this.toLiteral(value));
    }
    log(base, value) {
        return this.pushFunction("LOG", base === undefined ? undefined : this.toLiteral(base), value === undefined ? undefined : this.toLiteral(value));
    }
    log10(value) {
        return this.pushFunction("LOG10", value === undefined ? undefined : this.toLiteral(value));
    }
    minScale(value) {
        return this.pushFunction("MIN_SCALE", value === undefined ? undefined : this.toLiteral(value));
    }
    mod(left, right) {
        return this.pushFunction("MOD", left === undefined ? undefined : this.toLiteral(left), right === undefined ? undefined : this.toLiteral(right));
    }
    pi() {
        return this.pushFunction("PI");
    }
    power(base, exponent) {
        return this.pushFunction("POWER", base === undefined ? undefined : this.toLiteral(base), exponent === undefined ? undefined : this.toLiteral(exponent));
    }
    radians(value) {
        return this.pushFunction("RADIANS", value === undefined ? undefined : this.toLiteral(value));
    }
    round(value, scale) {
        return this.pushFunction("ROUND", value === undefined ? undefined : this.toLiteral(value), scale === undefined ? undefined : this.toLiteral(scale));
    }
    scale(value) {
        return this.pushFunction("SCALE", value === undefined ? undefined : this.toLiteral(value));
    }
    sign(value) {
        return this.pushFunction("SIGN", value === undefined ? undefined : this.toLiteral(value));
    }
    sqrt(value) {
        return this.pushFunction("SQRT", value === undefined ? undefined : this.toLiteral(value));
    }
    trimScale(value) {
        return this.pushFunction("TRIM_SCALE", value === undefined ? undefined : this.toLiteral(value));
    }
    trunc(value, scale) {
        return this.pushFunction("TRUNC", value === undefined ? undefined : this.toLiteral(value), scale === undefined ? undefined : this.toLiteral(scale));
    }
    widthBucket(operand, lowOrThresholds, high, count) {
        return this.pushFunction("WIDTH_BUCKET", operand === undefined ? undefined : this.toLiteral(operand), lowOrThresholds === undefined ? undefined : this.toLiteral(lowOrThresholds), high === undefined ? undefined : this.toLiteral(high), count === undefined ? undefined : this.toLiteral(count));
    }
    random(min, max) {
        return this.pushFunction("RANDOM", min === undefined ? undefined : this.toLiteral(min), max === undefined ? undefined : this.toLiteral(max));
    }
    randomNormal(mean, stddev) {
        return this.pushFunction("RANDOM_NORMAL", mean === undefined ? undefined : this.toLiteral(mean), stddev === undefined ? undefined : this.toLiteral(stddev));
    }
    setseed(value) {
        return this.pushFunction("SETSEED", value === undefined ? undefined : this.toLiteral(value));
    }
    acos(value) {
        return this.pushFunction("ACOS", value === undefined ? undefined : this.toLiteral(value));
    }
    acosd(value) {
        return this.pushFunction("ACOSD", value === undefined ? undefined : this.toLiteral(value));
    }
    asin(value) {
        return this.pushFunction("ASIN", value === undefined ? undefined : this.toLiteral(value));
    }
    asind(value) {
        return this.pushFunction("ASIND", value === undefined ? undefined : this.toLiteral(value));
    }
    atan(value) {
        return this.pushFunction("ATAN", value === undefined ? undefined : this.toLiteral(value));
    }
    atan2(y, x) {
        return this.pushFunction("ATAN2", y === undefined ? undefined : this.toLiteral(y), x === undefined ? undefined : this.toLiteral(x));
    }
    atan2d(y, x) {
        return this.pushFunction("ATAN2D", y === undefined ? undefined : this.toLiteral(y), x === undefined ? undefined : this.toLiteral(x));
    }
    atand(value) {
        return this.pushFunction("ATAND", value === undefined ? undefined : this.toLiteral(value));
    }
    cos(value) {
        return this.pushFunction("COS", value === undefined ? undefined : this.toLiteral(value));
    }
    cosd(value) {
        return this.pushFunction("COSD", value === undefined ? undefined : this.toLiteral(value));
    }
    cot(value) {
        return this.pushFunction("COT", value === undefined ? undefined : this.toLiteral(value));
    }
    cotd(value) {
        return this.pushFunction("COTD", value === undefined ? undefined : this.toLiteral(value));
    }
    sin(value) {
        return this.pushFunction("SIN", value === undefined ? undefined : this.toLiteral(value));
    }
    sind(value) {
        return this.pushFunction("SIND", value === undefined ? undefined : this.toLiteral(value));
    }
    tan(value) {
        return this.pushFunction("TAN", value === undefined ? undefined : this.toLiteral(value));
    }
    tand(value) {
        return this.pushFunction("TAND", value === undefined ? undefined : this.toLiteral(value));
    }
    sinh(value) {
        return this.pushFunction("SINH", value === undefined ? undefined : this.toLiteral(value));
    }
    cosh(value) {
        return this.pushFunction("COSH", value === undefined ? undefined : this.toLiteral(value));
    }
    tanh(value) {
        return this.pushFunction("TANH", value === undefined ? undefined : this.toLiteral(value));
    }
    asinh(value) {
        return this.pushFunction("ASINH", value === undefined ? undefined : this.toLiteral(value));
    }
    acosh(value) {
        return this.pushFunction("ACOSH", value === undefined ? undefined : this.toLiteral(value));
    }
    atanh(value) {
        return this.pushFunction("ATANH", value === undefined ? undefined : this.toLiteral(value));
    }
}
exports.MathFunctionBuilder = MathFunctionBuilder;
