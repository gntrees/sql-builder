import { GeometryFunctionBuilder } from "./override-geometry-functions";
import type { Statement } from "./types";

export class MathFunctionBuilder extends GeometryFunctionBuilder {
    override abs(value?: Statement) {
        return this.pushFunction("ABS",
            value === undefined ? undefined : this.toLiteral(value));
    }

    cbrt(value?: Statement) {
        return this.pushFunction("CBRT",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override ceil(value?: Statement) {
        return this.pushFunction("CEIL",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override ceiling(value?: Statement) {
        return this.pushFunction("CEILING",
            value === undefined ? undefined : this.toLiteral(value));
    }

    degrees(value?: Statement) {
        return this.pushFunction("DEGREES",
            value === undefined ? undefined : this.toLiteral(value));
    }

    div(numerator?: Statement, denominator?: Statement) {
        return this.pushFunction("DIV",
            numerator === undefined ? undefined : this.toLiteral(numerator),
            denominator === undefined ? undefined : this.toLiteral(denominator));
    }

    erf(value?: Statement) {
        return this.pushFunction("ERF",
            value === undefined ? undefined : this.toLiteral(value));
    }

    erfc(value?: Statement) {
        return this.pushFunction("ERFC",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override exp(value?: Statement) {
        return this.pushFunction("EXP",
            value === undefined ? undefined : this.toLiteral(value));
    }

    factorial(value?: Statement) {
        return this.pushFunction("FACTORIAL",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override floor(value?: Statement) {
        return this.pushFunction("FLOOR",
            value === undefined ? undefined : this.toLiteral(value));
    }

    gamma(value?: Statement) {
        return this.pushFunction("GAMMA",
            value === undefined ? undefined : this.toLiteral(value));
    }

    gcd(left?: Statement, right?: Statement) {
        return this.pushFunction("GCD",
            left === undefined ? undefined : this.toLiteral(left),
            right === undefined ? undefined : this.toLiteral(right));
    }

    lcm(left?: Statement, right?: Statement) {
        return this.pushFunction("LCM",
            left === undefined ? undefined : this.toLiteral(left),
            right === undefined ? undefined : this.toLiteral(right));
    }

    lgamma(value?: Statement) {
        return this.pushFunction("LGAMMA",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override ln(value?: Statement) {
        return this.pushFunction("LN",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override log(base?: Statement, value?: Statement) {
        return this.pushFunction("LOG",
            base === undefined ? undefined : this.toLiteral(base),
            value === undefined ? undefined : this.toLiteral(value));
    }

    override log10(value?: Statement) {
        return this.pushFunction("LOG10",
            value === undefined ? undefined : this.toLiteral(value));
    }

    minScale(value?: Statement) {
        return this.pushFunction("MIN_SCALE",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override mod(left?: Statement, right?: Statement) {
        return this.pushFunction("MOD",
            left === undefined ? undefined : this.toLiteral(left),
            right === undefined ? undefined : this.toLiteral(right));
    }

    pi() {
        return this.pushFunction("PI");
    }

    override power(base?: Statement, exponent?: Statement) {
        return this.pushFunction("POWER",
            base === undefined ? undefined : this.toLiteral(base),
            exponent === undefined ? undefined : this.toLiteral(exponent));
    }

    radians(value?: Statement) {
        return this.pushFunction("RADIANS",
            value === undefined ? undefined : this.toLiteral(value));
    }

    round(value?: Statement, scale?: Statement) {
        return this.pushFunction("ROUND",
            value === undefined ? undefined : this.toLiteral(value),
            scale === undefined ? undefined : this.toLiteral(scale));
    }

    override scale(value?: Statement) {
        return this.pushFunction("SCALE",
            value === undefined ? undefined : this.toLiteral(value));
    }

    sign(value?: Statement) {
        return this.pushFunction("SIGN",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override sqrt(value?: Statement) {
        return this.pushFunction("SQRT",
            value === undefined ? undefined : this.toLiteral(value));
    }

    trimScale(value?: Statement) {
        return this.pushFunction("TRIM_SCALE",
            value === undefined ? undefined : this.toLiteral(value));
    }

    trunc(value?: Statement, scale?: Statement) {
        return this.pushFunction("TRUNC",
            value === undefined ? undefined : this.toLiteral(value),
            scale === undefined ? undefined : this.toLiteral(scale));
    }

    override widthBucket(operand?: Statement, lowOrThresholds?: Statement, high?: Statement, count?: Statement) {
        return this.pushFunction("WIDTH_BUCKET",
            operand === undefined ? undefined : this.toLiteral(operand),
            lowOrThresholds === undefined ? undefined : this.toLiteral(lowOrThresholds),
            high === undefined ? undefined : this.toLiteral(high),
            count === undefined ? undefined : this.toLiteral(count));
    }

    random(min?: Statement, max?: Statement) {
        return this.pushFunction("RANDOM",
            min === undefined ? undefined : this.toLiteral(min),
            max === undefined ? undefined : this.toLiteral(max));
    }

    randomNormal(mean?: Statement, stddev?: Statement) {
        return this.pushFunction("RANDOM_NORMAL",
            mean === undefined ? undefined : this.toLiteral(mean),
            stddev === undefined ? undefined : this.toLiteral(stddev));
    }

    setseed(value?: Statement) {
        return this.pushFunction("SETSEED",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override acos(value?: Statement) {
        return this.pushFunction("ACOS",
            value === undefined ? undefined : this.toLiteral(value));
    }

    acosd(value?: Statement) {
        return this.pushFunction("ACOSD",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override asin(value?: Statement) {
        return this.pushFunction("ASIN",
            value === undefined ? undefined : this.toLiteral(value));
    }

    asind(value?: Statement) {
        return this.pushFunction("ASIND",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override atan(value?: Statement) {
        return this.pushFunction("ATAN",
            value === undefined ? undefined : this.toLiteral(value));
    }

    atan2(y?: Statement, x?: Statement) {
        return this.pushFunction("ATAN2",
            y === undefined ? undefined : this.toLiteral(y),
            x === undefined ? undefined : this.toLiteral(x));
    }

    atan2d(y?: Statement, x?: Statement) {
        return this.pushFunction("ATAN2D",
            y === undefined ? undefined : this.toLiteral(y),
            x === undefined ? undefined : this.toLiteral(x));
    }

    atand(value?: Statement) {
        return this.pushFunction("ATAND",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override cos(value?: Statement) {
        return this.pushFunction("COS",
            value === undefined ? undefined : this.toLiteral(value));
    }

    cosd(value?: Statement) {
        return this.pushFunction("COSD",
            value === undefined ? undefined : this.toLiteral(value));
    }

    cot(value?: Statement) {
        return this.pushFunction("COT",
            value === undefined ? undefined : this.toLiteral(value));
    }

    cotd(value?: Statement) {
        return this.pushFunction("COTD",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override sin(value?: Statement) {
        return this.pushFunction("SIN",
            value === undefined ? undefined : this.toLiteral(value));
    }

    sind(value?: Statement) {
        return this.pushFunction("SIND",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override tan(value?: Statement) {
        return this.pushFunction("TAN",
            value === undefined ? undefined : this.toLiteral(value));
    }

    tand(value?: Statement) {
        return this.pushFunction("TAND",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override sinh(value?: Statement) {
        return this.pushFunction("SINH",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override cosh(value?: Statement) {
        return this.pushFunction("COSH",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override tanh(value?: Statement) {
        return this.pushFunction("TANH",
            value === undefined ? undefined : this.toLiteral(value));
    }

    asinh(value?: Statement) {
        return this.pushFunction("ASINH",
            value === undefined ? undefined : this.toLiteral(value));
    }

    acosh(value?: Statement) {
        return this.pushFunction("ACOSH",
            value === undefined ? undefined : this.toLiteral(value));
    }

    atanh(value?: Statement) {
        return this.pushFunction("ATANH",
            value === undefined ? undefined : this.toLiteral(value));
    }
}
