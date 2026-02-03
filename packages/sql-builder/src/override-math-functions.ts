import { GeometryFunctionBuilder } from "./override-geometry-functions";
import type { StatementValueLiteral } from "./types";

export class MathFunctionBuilder extends GeometryFunctionBuilder {
    override abs(value?: StatementValueLiteral) {
        return this.pushFunction("ABS",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    cbrt(value?: StatementValueLiteral) {
        return this.pushFunction("CBRT",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override ceil(value?: StatementValueLiteral) {
        return this.pushFunction("CEIL",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override ceiling(value?: StatementValueLiteral) {
        return this.pushFunction("CEILING",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    degrees(value?: StatementValueLiteral) {
        return this.pushFunction("DEGREES",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    div(numerator?: StatementValueLiteral, denominator?: StatementValueLiteral) {
        return this.pushFunction("DIV",
            numerator === undefined ? undefined : this.toLiteralValue(numerator),
            denominator === undefined ? undefined : this.toLiteralValue(denominator));
    }

    erf(value?: StatementValueLiteral) {
        return this.pushFunction("ERF",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    erfc(value?: StatementValueLiteral) {
        return this.pushFunction("ERFC",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override exp(value?: StatementValueLiteral) {
        return this.pushFunction("EXP",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    factorial(value?: StatementValueLiteral) {
        return this.pushFunction("FACTORIAL",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override floor(value?: StatementValueLiteral) {
        return this.pushFunction("FLOOR",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    gamma(value?: StatementValueLiteral) {
        return this.pushFunction("GAMMA",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    gcd(left?: StatementValueLiteral, right?: StatementValueLiteral) {
        return this.pushFunction("GCD",
            left === undefined ? undefined : this.toLiteralValue(left),
            right === undefined ? undefined : this.toLiteralValue(right));
    }

    lcm(left?: StatementValueLiteral, right?: StatementValueLiteral) {
        return this.pushFunction("LCM",
            left === undefined ? undefined : this.toLiteralValue(left),
            right === undefined ? undefined : this.toLiteralValue(right));
    }

    lgamma(value?: StatementValueLiteral) {
        return this.pushFunction("LGAMMA",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override ln(value?: StatementValueLiteral) {
        return this.pushFunction("LN",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override log(base?: StatementValueLiteral, value?: StatementValueLiteral) {
        return this.pushFunction("LOG",
            base === undefined ? undefined : this.toLiteralValue(base),
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override log10(value?: StatementValueLiteral) {
        return this.pushFunction("LOG10",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    minScale(value?: StatementValueLiteral) {
        return this.pushFunction("MIN_SCALE",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override mod(left?: StatementValueLiteral, right?: StatementValueLiteral) {
        return this.pushFunction("MOD",
            left === undefined ? undefined : this.toLiteralValue(left),
            right === undefined ? undefined : this.toLiteralValue(right));
    }

    pi() {
        return this.pushFunction("PI");
    }

    override power(base?: StatementValueLiteral, exponent?: StatementValueLiteral) {
        return this.pushFunction("POWER",
            base === undefined ? undefined : this.toLiteralValue(base),
            exponent === undefined ? undefined : this.toLiteralValue(exponent));
    }

    radians(value?: StatementValueLiteral) {
        return this.pushFunction("RADIANS",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    round(value?: StatementValueLiteral, scale?: StatementValueLiteral) {
        return this.pushFunction("ROUND",
            value === undefined ? undefined : this.toLiteralValue(value),
            scale === undefined ? undefined : this.toLiteralValue(scale));
    }

    override scale(value?: StatementValueLiteral) {
        return this.pushFunction("SCALE",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    sign(value?: StatementValueLiteral) {
        return this.pushFunction("SIGN",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override sqrt(value?: StatementValueLiteral) {
        return this.pushFunction("SQRT",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    trimScale(value?: StatementValueLiteral) {
        return this.pushFunction("TRIM_SCALE",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    trunc(value?: StatementValueLiteral, scale?: StatementValueLiteral) {
        return this.pushFunction("TRUNC",
            value === undefined ? undefined : this.toLiteralValue(value),
            scale === undefined ? undefined : this.toLiteralValue(scale));
    }

    override widthBucket(operand?: StatementValueLiteral, lowOrThresholds?: StatementValueLiteral, high?: StatementValueLiteral, count?: StatementValueLiteral) {
        return this.pushFunction("WIDTH_BUCKET",
            operand === undefined ? undefined : this.toLiteralValue(operand),
            lowOrThresholds === undefined ? undefined : this.toLiteralValue(lowOrThresholds),
            high === undefined ? undefined : this.toLiteralValue(high),
            count === undefined ? undefined : this.toLiteralValue(count));
    }

    random(min?: StatementValueLiteral, max?: StatementValueLiteral) {
        return this.pushFunction("RANDOM",
            min === undefined ? undefined : this.toLiteralValue(min),
            max === undefined ? undefined : this.toLiteralValue(max));
    }

    randomNormal(mean?: StatementValueLiteral, stddev?: StatementValueLiteral) {
        return this.pushFunction("RANDOM_NORMAL",
            mean === undefined ? undefined : this.toLiteralValue(mean),
            stddev === undefined ? undefined : this.toLiteralValue(stddev));
    }

    setseed(value?: StatementValueLiteral) {
        return this.pushFunction("SETSEED",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override acos(value?: StatementValueLiteral) {
        return this.pushFunction("ACOS",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    acosd(value?: StatementValueLiteral) {
        return this.pushFunction("ACOSD",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override asin(value?: StatementValueLiteral) {
        return this.pushFunction("ASIN",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    asind(value?: StatementValueLiteral) {
        return this.pushFunction("ASIND",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override atan(value?: StatementValueLiteral) {
        return this.pushFunction("ATAN",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    atan2(y?: StatementValueLiteral, x?: StatementValueLiteral) {
        return this.pushFunction("ATAN2",
            y === undefined ? undefined : this.toLiteralValue(y),
            x === undefined ? undefined : this.toLiteralValue(x));
    }

    atan2d(y?: StatementValueLiteral, x?: StatementValueLiteral) {
        return this.pushFunction("ATAN2D",
            y === undefined ? undefined : this.toLiteralValue(y),
            x === undefined ? undefined : this.toLiteralValue(x));
    }

    atand(value?: StatementValueLiteral) {
        return this.pushFunction("ATAND",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override cos(value?: StatementValueLiteral) {
        return this.pushFunction("COS",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    cosd(value?: StatementValueLiteral) {
        return this.pushFunction("COSD",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    cot(value?: StatementValueLiteral) {
        return this.pushFunction("COT",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    cotd(value?: StatementValueLiteral) {
        return this.pushFunction("COTD",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override sin(value?: StatementValueLiteral) {
        return this.pushFunction("SIN",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    sind(value?: StatementValueLiteral) {
        return this.pushFunction("SIND",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override tan(value?: StatementValueLiteral) {
        return this.pushFunction("TAN",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    tand(value?: StatementValueLiteral) {
        return this.pushFunction("TAND",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override sinh(value?: StatementValueLiteral) {
        return this.pushFunction("SINH",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override cosh(value?: StatementValueLiteral) {
        return this.pushFunction("COSH",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override tanh(value?: StatementValueLiteral) {
        return this.pushFunction("TANH",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    asinh(value?: StatementValueLiteral) {
        return this.pushFunction("ASINH",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    acosh(value?: StatementValueLiteral) {
        return this.pushFunction("ACOSH",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    atanh(value?: StatementValueLiteral) {
        return this.pushFunction("ATANH",
            value === undefined ? undefined : this.toLiteralValue(value));
    }
}
