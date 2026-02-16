import { GeometryFunctionBuilder } from "./override-geometry-functions";
import type { Statement } from "../../types";

export class MathFunctionBuilder extends GeometryFunctionBuilder {
    override abs(value?: Statement) {
        return this.pushFunction("ABS",
            value);
    }

    cbrt(value?: Statement) {
        return this.pushFunction("CBRT",
            value);
    }

    override ceil(value?: Statement) {
        return this.pushFunction("CEIL",
            value);
    }

    override ceiling(value?: Statement) {
        return this.pushFunction("CEILING",
            value);
    }

    degrees(value?: Statement) {
        return this.pushFunction("DEGREES",
            value);
    }

    div(numerator?: Statement, denominator?: Statement) {
        return this.pushFunction("DIV",
            numerator,
            denominator);
    }

    erf(value?: Statement) {
        return this.pushFunction("ERF",
            value);
    }

    erfc(value?: Statement) {
        return this.pushFunction("ERFC",
            value);
    }

    override exp(value?: Statement) {
        return this.pushFunction("EXP",
            value);
    }

    factorial(value?: Statement) {
        return this.pushFunction("FACTORIAL",
            value);
    }

    override floor(value?: Statement) {
        return this.pushFunction("FLOOR",
            value);
    }

    gamma(value?: Statement) {
        return this.pushFunction("GAMMA",
            value);
    }

    gcd(left?: Statement, right?: Statement) {
        return this.pushFunction("GCD",
            left,
            right);
    }

    lcm(left?: Statement, right?: Statement) {
        return this.pushFunction("LCM",
            left,
            right);
    }

    lgamma(value?: Statement) {
        return this.pushFunction("LGAMMA",
            value);
    }

    override ln(value?: Statement) {
        return this.pushFunction("LN",
            value);
    }

    override log(base?: Statement, value?: Statement) {
        return this.pushFunction("LOG",
            base,
            value);
    }

    override log10(value?: Statement) {
        return this.pushFunction("LOG10",
            value);
    }

    minScale(value?: Statement) {
        return this.pushFunction("MIN_SCALE",
            value);
    }

    override mod(left?: Statement, right?: Statement) {
        return this.pushFunction("MOD",
            left,
            right);
    }

    pi() {
        return this.pushFunction("PI");
    }

    override power(base?: Statement, exponent?: Statement) {
        return this.pushFunction("POWER",
            base,
            exponent);
    }

    radians(value?: Statement) {
        return this.pushFunction("RADIANS",
            value);
    }

    round(value?: Statement, scale?: Statement) {
        return this.pushFunction("ROUND",
            value,
            scale);
    }

    override scale(value?: Statement) {
        return this.pushFunction("SCALE",
            value);
    }

    sign(value?: Statement) {
        return this.pushFunction("SIGN",
            value);
    }

    override sqrt(value?: Statement) {
        return this.pushFunction("SQRT",
            value);
    }

    trimScale(value?: Statement) {
        return this.pushFunction("TRIM_SCALE",
            value);
    }

    trunc(value?: Statement, scale?: Statement) {
        return this.pushFunction("TRUNC",
            value,
            scale);
    }

    override widthBucket(operand?: Statement, lowOrThresholds?: Statement, high?: Statement, count?: Statement) {
        return this.pushFunction("WIDTH_BUCKET",
            operand,
            lowOrThresholds,
            high,
            count);
    }

    random(min?: Statement, max?: Statement) {
        return this.pushFunction("RANDOM",
            min,
            max);
    }

    randomNormal(mean?: Statement, stddev?: Statement) {
        return this.pushFunction("RANDOM_NORMAL",
            mean,
            stddev);
    }

    setseed(value?: Statement) {
        return this.pushFunction("SETSEED",
            value);
    }

    override acos(value?: Statement) {
        return this.pushFunction("ACOS",
            value);
    }

    acosd(value?: Statement) {
        return this.pushFunction("ACOSD",
            value);
    }

    override asin(value?: Statement) {
        return this.pushFunction("ASIN",
            value);
    }

    asind(value?: Statement) {
        return this.pushFunction("ASIND",
            value);
    }

    override atan(value?: Statement) {
        return this.pushFunction("ATAN",
            value);
    }

    atan2(y?: Statement, x?: Statement) {
        return this.pushFunction("ATAN2",
            y,
            x);
    }

    atan2d(y?: Statement, x?: Statement) {
        return this.pushFunction("ATAN2D",
            y,
            x);
    }

    atand(value?: Statement) {
        return this.pushFunction("ATAND",
            value);
    }

    override cos(value?: Statement) {
        return this.pushFunction("COS",
            value);
    }

    cosd(value?: Statement) {
        return this.pushFunction("COSD",
            value);
    }

    cot(value?: Statement) {
        return this.pushFunction("COT",
            value);
    }

    cotd(value?: Statement) {
        return this.pushFunction("COTD",
            value);
    }

    override sin(value?: Statement) {
        return this.pushFunction("SIN",
            value);
    }

    sind(value?: Statement) {
        return this.pushFunction("SIND",
            value);
    }

    override tan(value?: Statement) {
        return this.pushFunction("TAN",
            value);
    }

    tand(value?: Statement) {
        return this.pushFunction("TAND",
            value);
    }

    override sinh(value?: Statement) {
        return this.pushFunction("SINH",
            value);
    }

    override cosh(value?: Statement) {
        return this.pushFunction("COSH",
            value);
    }

    override tanh(value?: Statement) {
        return this.pushFunction("TANH",
            value);
    }

    asinh(value?: Statement) {
        return this.pushFunction("ASINH",
            value);
    }

    acosh(value?: Statement) {
        return this.pushFunction("ACOSH",
            value);
    }

    atanh(value?: Statement) {
        return this.pushFunction("ATANH",
            value);
    }
}
