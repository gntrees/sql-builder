"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathFunctionBuilder = void 0;
const override_geometry_functions_1 = require("./override-geometry-functions");
class MathFunctionBuilder extends override_geometry_functions_1.GeometryFunctionBuilder {
    abs(value) {
        return this.pushFunction("ABS", value === undefined ? undefined : this.toLiteralValue(value));
    }
    cbrt(value) {
        return this.pushFunction("CBRT", value === undefined ? undefined : this.toLiteralValue(value));
    }
    ceil(value) {
        return this.pushFunction("CEIL", value === undefined ? undefined : this.toLiteralValue(value));
    }
    ceiling(value) {
        return this.pushFunction("CEILING", value === undefined ? undefined : this.toLiteralValue(value));
    }
    degrees(value) {
        return this.pushFunction("DEGREES", value === undefined ? undefined : this.toLiteralValue(value));
    }
    div(numerator, denominator) {
        return this.pushFunction("DIV", numerator === undefined ? undefined : this.toLiteralValue(numerator), denominator === undefined ? undefined : this.toLiteralValue(denominator));
    }
    erf(value) {
        return this.pushFunction("ERF", value === undefined ? undefined : this.toLiteralValue(value));
    }
    erfc(value) {
        return this.pushFunction("ERFC", value === undefined ? undefined : this.toLiteralValue(value));
    }
    exp(value) {
        return this.pushFunction("EXP", value === undefined ? undefined : this.toLiteralValue(value));
    }
    factorial(value) {
        return this.pushFunction("FACTORIAL", value === undefined ? undefined : this.toLiteralValue(value));
    }
    floor(value) {
        return this.pushFunction("FLOOR", value === undefined ? undefined : this.toLiteralValue(value));
    }
    gamma(value) {
        return this.pushFunction("GAMMA", value === undefined ? undefined : this.toLiteralValue(value));
    }
    gcd(left, right) {
        return this.pushFunction("GCD", left === undefined ? undefined : this.toLiteralValue(left), right === undefined ? undefined : this.toLiteralValue(right));
    }
    lcm(left, right) {
        return this.pushFunction("LCM", left === undefined ? undefined : this.toLiteralValue(left), right === undefined ? undefined : this.toLiteralValue(right));
    }
    lgamma(value) {
        return this.pushFunction("LGAMMA", value === undefined ? undefined : this.toLiteralValue(value));
    }
    ln(value) {
        return this.pushFunction("LN", value === undefined ? undefined : this.toLiteralValue(value));
    }
    log(base, value) {
        return this.pushFunction("LOG", base === undefined ? undefined : this.toLiteralValue(base), value === undefined ? undefined : this.toLiteralValue(value));
    }
    log10(value) {
        return this.pushFunction("LOG10", value === undefined ? undefined : this.toLiteralValue(value));
    }
    minScale(value) {
        return this.pushFunction("MIN_SCALE", value === undefined ? undefined : this.toLiteralValue(value));
    }
    mod(left, right) {
        return this.pushFunction("MOD", left === undefined ? undefined : this.toLiteralValue(left), right === undefined ? undefined : this.toLiteralValue(right));
    }
    pi() {
        return this.pushFunction("PI");
    }
    power(base, exponent) {
        return this.pushFunction("POWER", base === undefined ? undefined : this.toLiteralValue(base), exponent === undefined ? undefined : this.toLiteralValue(exponent));
    }
    radians(value) {
        return this.pushFunction("RADIANS", value === undefined ? undefined : this.toLiteralValue(value));
    }
    round(value, scale) {
        return this.pushFunction("ROUND", value === undefined ? undefined : this.toLiteralValue(value), scale === undefined ? undefined : this.toLiteralValue(scale));
    }
    scale(value) {
        return this.pushFunction("SCALE", value === undefined ? undefined : this.toLiteralValue(value));
    }
    sign(value) {
        return this.pushFunction("SIGN", value === undefined ? undefined : this.toLiteralValue(value));
    }
    sqrt(value) {
        return this.pushFunction("SQRT", value === undefined ? undefined : this.toLiteralValue(value));
    }
    trimScale(value) {
        return this.pushFunction("TRIM_SCALE", value === undefined ? undefined : this.toLiteralValue(value));
    }
    trunc(value, scale) {
        return this.pushFunction("TRUNC", value === undefined ? undefined : this.toLiteralValue(value), scale === undefined ? undefined : this.toLiteralValue(scale));
    }
    widthBucket(operand, lowOrThresholds, high, count) {
        return this.pushFunction("WIDTH_BUCKET", operand === undefined ? undefined : this.toLiteralValue(operand), lowOrThresholds === undefined ? undefined : this.toLiteralValue(lowOrThresholds), high === undefined ? undefined : this.toLiteralValue(high), count === undefined ? undefined : this.toLiteralValue(count));
    }
    random(min, max) {
        return this.pushFunction("RANDOM", min === undefined ? undefined : this.toLiteralValue(min), max === undefined ? undefined : this.toLiteralValue(max));
    }
    randomNormal(mean, stddev) {
        return this.pushFunction("RANDOM_NORMAL", mean === undefined ? undefined : this.toLiteralValue(mean), stddev === undefined ? undefined : this.toLiteralValue(stddev));
    }
    setseed(value) {
        return this.pushFunction("SETSEED", value === undefined ? undefined : this.toLiteralValue(value));
    }
    acos(value) {
        return this.pushFunction("ACOS", value === undefined ? undefined : this.toLiteralValue(value));
    }
    acosd(value) {
        return this.pushFunction("ACOSD", value === undefined ? undefined : this.toLiteralValue(value));
    }
    asin(value) {
        return this.pushFunction("ASIN", value === undefined ? undefined : this.toLiteralValue(value));
    }
    asind(value) {
        return this.pushFunction("ASIND", value === undefined ? undefined : this.toLiteralValue(value));
    }
    atan(value) {
        return this.pushFunction("ATAN", value === undefined ? undefined : this.toLiteralValue(value));
    }
    atan2(y, x) {
        return this.pushFunction("ATAN2", y === undefined ? undefined : this.toLiteralValue(y), x === undefined ? undefined : this.toLiteralValue(x));
    }
    atan2d(y, x) {
        return this.pushFunction("ATAN2D", y === undefined ? undefined : this.toLiteralValue(y), x === undefined ? undefined : this.toLiteralValue(x));
    }
    atand(value) {
        return this.pushFunction("ATAND", value === undefined ? undefined : this.toLiteralValue(value));
    }
    cos(value) {
        return this.pushFunction("COS", value === undefined ? undefined : this.toLiteralValue(value));
    }
    cosd(value) {
        return this.pushFunction("COSD", value === undefined ? undefined : this.toLiteralValue(value));
    }
    cot(value) {
        return this.pushFunction("COT", value === undefined ? undefined : this.toLiteralValue(value));
    }
    cotd(value) {
        return this.pushFunction("COTD", value === undefined ? undefined : this.toLiteralValue(value));
    }
    sin(value) {
        return this.pushFunction("SIN", value === undefined ? undefined : this.toLiteralValue(value));
    }
    sind(value) {
        return this.pushFunction("SIND", value === undefined ? undefined : this.toLiteralValue(value));
    }
    tan(value) {
        return this.pushFunction("TAN", value === undefined ? undefined : this.toLiteralValue(value));
    }
    tand(value) {
        return this.pushFunction("TAND", value === undefined ? undefined : this.toLiteralValue(value));
    }
    sinh(value) {
        return this.pushFunction("SINH", value === undefined ? undefined : this.toLiteralValue(value));
    }
    cosh(value) {
        return this.pushFunction("COSH", value === undefined ? undefined : this.toLiteralValue(value));
    }
    tanh(value) {
        return this.pushFunction("TANH", value === undefined ? undefined : this.toLiteralValue(value));
    }
    asinh(value) {
        return this.pushFunction("ASINH", value === undefined ? undefined : this.toLiteralValue(value));
    }
    acosh(value) {
        return this.pushFunction("ACOSH", value === undefined ? undefined : this.toLiteralValue(value));
    }
    atanh(value) {
        return this.pushFunction("ATANH", value === undefined ? undefined : this.toLiteralValue(value));
    }
}
exports.MathFunctionBuilder = MathFunctionBuilder;
