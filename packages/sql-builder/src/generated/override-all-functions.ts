// AUTO-GENERATED - DO NOT EDIT.
import { BaseQueryBuilder } from "./base-query-builder";
import type { Statement } from "../types";

export class AllFunctionBuilder extends BaseQueryBuilder {
    abbrev(...params: Statement[]) {
          return super.pushFunction({ name: "ABBREV", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override abs(...params: Statement[]) {
        if (params.length == 0) {
            return super.abs();
        }
          return super.pushFunction({ name: "ABS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override acos(...params: Statement[]) {
        if (params.length == 0) {
            return super.acos();
        }
          return super.pushFunction({ name: "ACOS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    acosd(...params: Statement[]) {
          return super.pushFunction({ name: "ACOSD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    acosh(...params: Statement[]) {
          return super.pushFunction({ name: "ACOSH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    age(...params: Statement[]) {
          return super.pushFunction({ name: "AGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    area(...params: Statement[]) {
          return super.pushFunction({ name: "AREA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayToTsvector(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_TO_TSVECTOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    ascii(...params: Statement[]) {
          return super.pushFunction({ name: "ASCII", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override asin(...params: Statement[]) {
        if (params.length == 0) {
            return super.asin();
        }
          return super.pushFunction({ name: "ASIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    asind(...params: Statement[]) {
          return super.pushFunction({ name: "ASIND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    asinh(...params: Statement[]) {
          return super.pushFunction({ name: "ASINH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override atan(...params: Statement[]) {
        if (params.length == 0) {
            return super.atan();
        }
          return super.pushFunction({ name: "ATAN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    atan2(...params: Statement[]) {
          return super.pushFunction({ name: "ATAN2", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    atan2d(...params: Statement[]) {
          return super.pushFunction({ name: "ATAN2D", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    atand(...params: Statement[]) {
          return super.pushFunction({ name: "ATAND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    atanh(...params: Statement[]) {
          return super.pushFunction({ name: "ATANH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    bitCount(...params: Statement[]) {
          return super.pushFunction({ name: "BIT_COUNT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override bitLength(...params: Statement[]) {
        if (params.length == 0) {
            return super.bitLength();
        }
          return super.pushFunction({ name: "BIT_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    boundBox(...params: Statement[]) {
          return super.pushFunction({ name: "BOUND_BOX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    box(...params: Statement[]) {
          return super.pushFunction({ name: "BOX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    broadcast(...params: Statement[]) {
          return super.pushFunction({ name: "BROADCAST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override btrim(...params: Statement[]) {
        if (params.length == 0) {
            return super.btrim();
        }
          return super.pushFunction({ name: "BTRIM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    casefold(...params: Statement[]) {
          return super.pushFunction({ name: "CASEFOLD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    cbrt(...params: Statement[]) {
          return super.pushFunction({ name: "CBRT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override ceil(...params: Statement[]) {
        if (params.length == 0) {
            return super.ceil();
        }
          return super.pushFunction({ name: "CEIL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override ceiling(...params: Statement[]) {
        if (params.length == 0) {
            return super.ceiling();
        }
          return super.pushFunction({ name: "CEILING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    center(...params: Statement[]) {
          return super.pushFunction({ name: "CENTER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override characterLength(...params: Statement[]) {
        if (params.length == 0) {
            return super.characterLength();
        }
          return super.pushFunction({ name: "CHARACTER_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override charLength(...params: Statement[]) {
        if (params.length == 0) {
            return super.charLength();
        }
          return super.pushFunction({ name: "CHAR_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    chr(...params: Statement[]) {
          return super.pushFunction({ name: "CHR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    circle(...params: Statement[]) {
          return super.pushFunction({ name: "CIRCLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    clockTimestamp(...params: Statement[]) {
          return super.pushFunction({ name: "CLOCK_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    concat(...params: Statement[]) {
          return super.pushFunction({ name: "CONCAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    concatWs(...params: Statement[]) {
          return super.pushFunction({ name: "CONCAT_WS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override convert(...params: Statement[]) {
        if (params.length == 0) {
            return super.convert();
        }
          return super.pushFunction({ name: "CONVERT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    convertFrom(...params: Statement[]) {
          return super.pushFunction({ name: "CONVERT_FROM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    convertTo(...params: Statement[]) {
          return super.pushFunction({ name: "CONVERT_TO", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override cos(...params: Statement[]) {
        if (params.length == 0) {
            return super.cos();
        }
          return super.pushFunction({ name: "COS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    cosd(...params: Statement[]) {
          return super.pushFunction({ name: "COSD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override cosh(...params: Statement[]) {
        if (params.length == 0) {
            return super.cosh();
        }
          return super.pushFunction({ name: "COSH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    cot(...params: Statement[]) {
          return super.pushFunction({ name: "COT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    cotd(...params: Statement[]) {
          return super.pushFunction({ name: "COTD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    crc32(...params: Statement[]) {
          return super.pushFunction({ name: "CRC32", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    crc32c(...params: Statement[]) {
          return super.pushFunction({ name: "CRC32C", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override currentDate(...params: Statement[]) {
        if (params.length == 0) {
            return super.currentDate();
        }
          return super.pushFunction({ name: "CURRENT_DATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override currentTime(...params: Statement[]) {
        if (params.length == 0) {
            return super.currentTime();
        }
          return super.pushFunction({ name: "CURRENT_TIME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override currentTimestamp(...params: Statement[]) {
        if (params.length == 0) {
            return super.currentTimestamp();
        }
          return super.pushFunction({ name: "CURRENT_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    cursorToXml(...params: Statement[]) {
          return super.pushFunction({ name: "CURSOR_TO_XML", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    cursorToXmlschema(...params: Statement[]) {
          return super.pushFunction({ name: "CURSOR_TO_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    databaseToXml(...params: Statement[]) {
          return super.pushFunction({ name: "DATABASE_TO_XML", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    databaseToXmlAndXmlschema(...params: Statement[]) {
          return super.pushFunction({ name: "DATABASE_TO_XML_AND_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    databaseToXmlschema(...params: Statement[]) {
          return super.pushFunction({ name: "DATABASE_TO_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    dateAdd(...params: Statement[]) {
          return super.pushFunction({ name: "DATE_ADD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    dateBin(...params: Statement[]) {
          return super.pushFunction({ name: "DATE_BIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    datePart(...params: Statement[]) {
          return super.pushFunction({ name: "DATE_PART", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    dateSubtract(...params: Statement[]) {
          return super.pushFunction({ name: "DATE_SUBTRACT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    dateTrunc(...params: Statement[]) {
          return super.pushFunction({ name: "DATE_TRUNC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    decode(...params: Statement[]) {
          return super.pushFunction({ name: "DECODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    degrees(...params: Statement[]) {
          return super.pushFunction({ name: "DEGREES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    diagonal(...params: Statement[]) {
          return super.pushFunction({ name: "DIAGONAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    diameter(...params: Statement[]) {
          return super.pushFunction({ name: "DIAMETER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    div(...params: Statement[]) {
          return super.pushFunction({ name: "DIV", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    encode(...params: Statement[]) {
          return super.pushFunction({ name: "ENCODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    enumFirst(...params: Statement[]) {
          return super.pushFunction({ name: "ENUM_FIRST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    enumLast(...params: Statement[]) {
          return super.pushFunction({ name: "ENUM_LAST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    enumRange(...params: Statement[]) {
          return super.pushFunction({ name: "ENUM_RANGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    erf(...params: Statement[]) {
          return super.pushFunction({ name: "ERF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    erfc(...params: Statement[]) {
          return super.pushFunction({ name: "ERFC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override exp(...params: Statement[]) {
        if (params.length == 0) {
            return super.exp();
        }
          return super.pushFunction({ name: "EXP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override extract(...params: Statement[]) {
        if (params.length == 0) {
            return super.extract();
        }
          return super.pushFunction({ name: "EXTRACT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    factorial(...params: Statement[]) {
          return super.pushFunction({ name: "FACTORIAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override family(...params: Statement[]) {
        if (params.length == 0) {
            return super.family();
        }
          return super.pushFunction({ name: "FAMILY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override floor(...params: Statement[]) {
        if (params.length == 0) {
            return super.floor();
        }
          return super.pushFunction({ name: "FLOOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override format(...params: Statement[]) {
        if (params.length == 0) {
            return super.format();
        }
          return super.pushFunction({ name: "FORMAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    gamma(...params: Statement[]) {
          return super.pushFunction({ name: "GAMMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    gcd(...params: Statement[]) {
          return super.pushFunction({ name: "GCD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    genRandomUuid(...params: Statement[]) {
          return super.pushFunction({ name: "GEN_RANDOM_UUID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    getBit(...params: Statement[]) {
          return super.pushFunction({ name: "GET_BIT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    getByte(...params: Statement[]) {
          return super.pushFunction({ name: "GET_BYTE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    getCurrentTsConfig(...params: Statement[]) {
          return super.pushFunction({ name: "GET_CURRENT_TS_CONFIG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    height(...params: Statement[]) {
          return super.pushFunction({ name: "HEIGHT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    host(...params: Statement[]) {
          return super.pushFunction({ name: "HOST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hostmask(...params: Statement[]) {
          return super.pushFunction({ name: "HOSTMASK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    inetMerge(...params: Statement[]) {
          return super.pushFunction({ name: "INET_MERGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    inetSameFamily(...params: Statement[]) {
          return super.pushFunction({ name: "INET_SAME_FAMILY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    initcap(...params: Statement[]) {
          return super.pushFunction({ name: "INITCAP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    isclosed(...params: Statement[]) {
          return super.pushFunction({ name: "ISCLOSED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    isfinite(...params: Statement[]) {
          return super.pushFunction({ name: "ISFINITE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    isopen(...params: Statement[]) {
          return super.pushFunction({ name: "ISOPEN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbToTsvector(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_TO_TSVECTOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonToTsvector(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_TO_TSVECTOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    justifyDays(...params: Statement[]) {
          return super.pushFunction({ name: "JUSTIFY_DAYS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    justifyHours(...params: Statement[]) {
          return super.pushFunction({ name: "JUSTIFY_HOURS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    justifyInterval(...params: Statement[]) {
          return super.pushFunction({ name: "JUSTIFY_INTERVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    lcm(...params: Statement[]) {
          return super.pushFunction({ name: "LCM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override left(...params: Statement[]) {
        if (params.length == 0) {
            return super.left();
        }
          return super.pushFunction({ name: "LEFT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override length(...params: Statement[]) {
        if (params.length == 0) {
            return super.length();
        }
          return super.pushFunction({ name: "LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    lgamma(...params: Statement[]) {
          return super.pushFunction({ name: "LGAMMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    line(...params: Statement[]) {
          return super.pushFunction({ name: "LINE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override ln(...params: Statement[]) {
        if (params.length == 0) {
            return super.ln();
        }
          return super.pushFunction({ name: "LN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override localtime(...params: Statement[]) {
        if (params.length == 0) {
            return super.localtime();
        }
          return super.pushFunction({ name: "LOCALTIME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override localtimestamp(...params: Statement[]) {
        if (params.length == 0) {
            return super.localtimestamp();
        }
          return super.pushFunction({ name: "LOCALTIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override log(...params: Statement[]) {
        if (params.length == 0) {
            return super.log();
        }
          return super.pushFunction({ name: "LOG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override log10(...params: Statement[]) {
        if (params.length == 0) {
            return super.log10();
        }
          return super.pushFunction({ name: "LOG10", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override lower(...params: Statement[]) {
        if (params.length == 0) {
            return super.lower();
        }
          return super.pushFunction({ name: "LOWER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override lpad(...params: Statement[]) {
        if (params.length == 0) {
            return super.lpad();
        }
          return super.pushFunction({ name: "LPAD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    lseg(...params: Statement[]) {
          return super.pushFunction({ name: "LSEG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override ltrim(...params: Statement[]) {
        if (params.length == 0) {
            return super.ltrim();
        }
          return super.pushFunction({ name: "LTRIM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    macaddr8Set7bit(...params: Statement[]) {
          return super.pushFunction({ name: "MACADDR8_SET7BIT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    makeDate(...params: Statement[]) {
          return super.pushFunction({ name: "MAKE_DATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    makeInterval(...params: Statement[]) {
          return super.pushFunction({ name: "MAKE_INTERVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    makeTime(...params: Statement[]) {
          return super.pushFunction({ name: "MAKE_TIME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    makeTimestamp(...params: Statement[]) {
          return super.pushFunction({ name: "MAKE_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    makeTimestamptz(...params: Statement[]) {
          return super.pushFunction({ name: "MAKE_TIMESTAMPTZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    masklen(...params: Statement[]) {
          return super.pushFunction({ name: "MASKLEN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    md5(...params: Statement[]) {
          return super.pushFunction({ name: "MD5", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    minScale(...params: Statement[]) {
          return super.pushFunction({ name: "MIN_SCALE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override mod(...params: Statement[]) {
        if (params.length == 0) {
            return super.mod();
        }
          return super.pushFunction({ name: "MOD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    netmask(...params: Statement[]) {
          return super.pushFunction({ name: "NETMASK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    network(...params: Statement[]) {
          return super.pushFunction({ name: "NETWORK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override normalize(...params: Statement[]) {
        if (params.length == 0) {
            return super.normalize();
        }
          return super.pushFunction({ name: "NORMALIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    now(...params: Statement[]) {
          return super.pushFunction({ name: "NOW", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    npoints(...params: Statement[]) {
          return super.pushFunction({ name: "NPOINTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    numnode(...params: Statement[]) {
          return super.pushFunction({ name: "NUMNODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override octetLength(...params: Statement[]) {
        if (params.length == 0) {
            return super.octetLength();
        }
          return super.pushFunction({ name: "OCTET_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override overlay(...params: Statement[]) {
        if (params.length == 0) {
            return super.overlay();
        }
          return super.pushFunction({ name: "OVERLAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    parseIdent(...params: Statement[]) {
          return super.pushFunction({ name: "PARSE_IDENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override path(...params: Statement[]) {
        if (params.length == 0) {
            return super.path();
        }
          return super.pushFunction({ name: "PATH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pclose(...params: Statement[]) {
          return super.pushFunction({ name: "PCLOSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgClientEncoding(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CLIENT_ENCODING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSleep(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SLEEP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSleepFor(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SLEEP_FOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSleepUntil(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SLEEP_UNTIL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    phrasetoTsquery(...params: Statement[]) {
          return super.pushFunction({ name: "PHRASETO_TSQUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pi(...params: Statement[]) {
          return super.pushFunction({ name: "PI", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    plaintoTsquery(...params: Statement[]) {
          return super.pushFunction({ name: "PLAINTO_TSQUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    point(...params: Statement[]) {
          return super.pushFunction({ name: "POINT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    polygon(...params: Statement[]) {
          return super.pushFunction({ name: "POLYGON", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    popen(...params: Statement[]) {
          return super.pushFunction({ name: "POPEN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override position(...params: Statement[]) {
        if (params.length == 0) {
            return super.position();
        }
          return super.pushFunction({ name: "POSITION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override power(...params: Statement[]) {
        if (params.length == 0) {
            return super.power();
        }
          return super.pushFunction({ name: "POWER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    queryToXml(...params: Statement[]) {
          return super.pushFunction({ name: "QUERY_TO_XML", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    queryToXmlAndXmlschema(...params: Statement[]) {
          return super.pushFunction({ name: "QUERY_TO_XML_AND_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    queryToXmlschema(...params: Statement[]) {
          return super.pushFunction({ name: "QUERY_TO_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    querytree(...params: Statement[]) {
          return super.pushFunction({ name: "QUERYTREE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    quoteIdent(...params: Statement[]) {
          return super.pushFunction({ name: "QUOTE_IDENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    quoteLiteral(...params: Statement[]) {
          return super.pushFunction({ name: "QUOTE_LITERAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    quoteNullable(...params: Statement[]) {
          return super.pushFunction({ name: "QUOTE_NULLABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    radians(...params: Statement[]) {
          return super.pushFunction({ name: "RADIANS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    radius(...params: Statement[]) {
          return super.pushFunction({ name: "RADIUS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    random(...params: Statement[]) {
          return super.pushFunction({ name: "RANDOM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    randomNormal(...params: Statement[]) {
          return super.pushFunction({ name: "RANDOM_NORMAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    regexpCount(...params: Statement[]) {
          return super.pushFunction({ name: "REGEXP_COUNT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    regexpInstr(...params: Statement[]) {
          return super.pushFunction({ name: "REGEXP_INSTR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    regexpLike(...params: Statement[]) {
          return super.pushFunction({ name: "REGEXP_LIKE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    regexpMatch(...params: Statement[]) {
          return super.pushFunction({ name: "REGEXP_MATCH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    regexpMatches(...params: Statement[]) {
          return super.pushFunction({ name: "REGEXP_MATCHES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    regexpReplace(...params: Statement[]) {
          return super.pushFunction({ name: "REGEXP_REPLACE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    regexpSplitToArray(...params: Statement[]) {
          return super.pushFunction({ name: "REGEXP_SPLIT_TO_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    regexpSplitToTable(...params: Statement[]) {
          return super.pushFunction({ name: "REGEXP_SPLIT_TO_TABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    regexpSubstr(...params: Statement[]) {
          return super.pushFunction({ name: "REGEXP_SUBSTR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    repeat(...params: Statement[]) {
          return super.pushFunction({ name: "REPEAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override replace(...params: Statement[]) {
        if (params.length == 0) {
            return super.replace();
        }
          return super.pushFunction({ name: "REPLACE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    reverse(...params: Statement[]) {
          return super.pushFunction({ name: "REVERSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override right(...params: Statement[]) {
        if (params.length == 0) {
            return super.right();
        }
          return super.pushFunction({ name: "RIGHT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    round(...params: Statement[]) {
          return super.pushFunction({ name: "ROUND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override rpad(...params: Statement[]) {
        if (params.length == 0) {
            return super.rpad();
        }
          return super.pushFunction({ name: "RPAD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override rtrim(...params: Statement[]) {
        if (params.length == 0) {
            return super.rtrim();
        }
          return super.pushFunction({ name: "RTRIM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override scale(...params: Statement[]) {
        if (params.length == 0) {
            return super.scale();
        }
          return super.pushFunction({ name: "SCALE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    schemaToXml(...params: Statement[]) {
          return super.pushFunction({ name: "SCHEMA_TO_XML", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    schemaToXmlAndXmlschema(...params: Statement[]) {
          return super.pushFunction({ name: "SCHEMA_TO_XML_AND_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    schemaToXmlschema(...params: Statement[]) {
          return super.pushFunction({ name: "SCHEMA_TO_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    setBit(...params: Statement[]) {
          return super.pushFunction({ name: "SET_BIT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    setByte(...params: Statement[]) {
          return super.pushFunction({ name: "SET_BYTE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    setMasklen(...params: Statement[]) {
          return super.pushFunction({ name: "SET_MASKLEN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    setseed(...params: Statement[]) {
          return super.pushFunction({ name: "SETSEED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    setweight(...params: Statement[]) {
          return super.pushFunction({ name: "SETWEIGHT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    sha224(...params: Statement[]) {
          return super.pushFunction({ name: "SHA224", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    sha256(...params: Statement[]) {
          return super.pushFunction({ name: "SHA256", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    sha384(...params: Statement[]) {
          return super.pushFunction({ name: "SHA384", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    sha512(...params: Statement[]) {
          return super.pushFunction({ name: "SHA512", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    sign(...params: Statement[]) {
          return super.pushFunction({ name: "SIGN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override sin(...params: Statement[]) {
        if (params.length == 0) {
            return super.sin();
        }
          return super.pushFunction({ name: "SIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    sind(...params: Statement[]) {
          return super.pushFunction({ name: "SIND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override sinh(...params: Statement[]) {
        if (params.length == 0) {
            return super.sinh();
        }
          return super.pushFunction({ name: "SINH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    slope(...params: Statement[]) {
          return super.pushFunction({ name: "SLOPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    splitPart(...params: Statement[]) {
          return super.pushFunction({ name: "SPLIT_PART", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override sqrt(...params: Statement[]) {
        if (params.length == 0) {
            return super.sqrt();
        }
          return super.pushFunction({ name: "SQRT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    startsWith(...params: Statement[]) {
          return super.pushFunction({ name: "STARTS_WITH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    statementTimestamp(...params: Statement[]) {
          return super.pushFunction({ name: "STATEMENT_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    stringToArray(...params: Statement[]) {
          return super.pushFunction({ name: "STRING_TO_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    stringToTable(...params: Statement[]) {
          return super.pushFunction({ name: "STRING_TO_TABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override strip(...params: Statement[]) {
        if (params.length == 0) {
            return super.strip();
        }
          return super.pushFunction({ name: "STRIP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    strpos(...params: Statement[]) {
          return super.pushFunction({ name: "STRPOS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    substr(...params: Statement[]) {
          return super.pushFunction({ name: "SUBSTR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override substring(...params: Statement[]) {
        if (params.length == 0) {
            return super.substring();
        }
          return super.pushFunction({ name: "SUBSTRING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tableToXml(...params: Statement[]) {
          return super.pushFunction({ name: "TABLE_TO_XML", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tableToXmlAndXmlschema(...params: Statement[]) {
          return super.pushFunction({ name: "TABLE_TO_XML_AND_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tableToXmlschema(...params: Statement[]) {
          return super.pushFunction({ name: "TABLE_TO_XMLSCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override tan(...params: Statement[]) {
        if (params.length == 0) {
            return super.tan();
        }
          return super.pushFunction({ name: "TAN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tand(...params: Statement[]) {
          return super.pushFunction({ name: "TAND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override tanh(...params: Statement[]) {
        if (params.length == 0) {
            return super.tanh();
        }
          return super.pushFunction({ name: "TANH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    timeofday(...params: Statement[]) {
          return super.pushFunction({ name: "TIMEOFDAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toAscii(...params: Statement[]) {
          return super.pushFunction({ name: "TO_ASCII", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toBin(...params: Statement[]) {
          return super.pushFunction({ name: "TO_BIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toChar(...params: Statement[]) {
          return super.pushFunction({ name: "TO_CHAR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toDate(...params: Statement[]) {
          return super.pushFunction({ name: "TO_DATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toHex(...params: Statement[]) {
          return super.pushFunction({ name: "TO_HEX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toNumber(...params: Statement[]) {
          return super.pushFunction({ name: "TO_NUMBER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toOct(...params: Statement[]) {
          return super.pushFunction({ name: "TO_OCT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toText(...params: Statement[]) {
          return super.pushFunction({ name: "TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CAST" }, ...params);
          }

    toTimestamp(...params: Statement[]) {
          return super.pushFunction({ name: "TO_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toTsquery(...params: Statement[]) {
          return super.pushFunction({ name: "TO_TSQUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toTsvector(...params: Statement[]) {
          return super.pushFunction({ name: "TO_TSVECTOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    transactionTimestamp(...params: Statement[]) {
          return super.pushFunction({ name: "TRANSACTION_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override translate(...params: Statement[]) {
        if (params.length == 0) {
            return super.translate();
        }
          return super.pushFunction({ name: "TRANSLATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override trim(...params: Statement[]) {
        if (params.length == 0) {
            return super.trim();
        }
          return super.pushFunction({ name: "TRIM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    trimScale(...params: Statement[]) {
          return super.pushFunction({ name: "TRIM_SCALE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    trunc(...params: Statement[]) {
          return super.pushFunction({ name: "TRUNC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsDebug(...params: Statement[]) {
          return super.pushFunction({ name: "TS_DEBUG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsDelete(...params: Statement[]) {
          return super.pushFunction({ name: "TS_DELETE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsFilter(...params: Statement[]) {
          return super.pushFunction({ name: "TS_FILTER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsHeadline(...params: Statement[]) {
          return super.pushFunction({ name: "TS_HEADLINE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsLexize(...params: Statement[]) {
          return super.pushFunction({ name: "TS_LEXIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsParse(...params: Statement[]) {
          return super.pushFunction({ name: "TS_PARSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsqueryPhrase(...params: Statement[]) {
          return super.pushFunction({ name: "TSQUERY_PHRASE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsRank(...params: Statement[]) {
          return super.pushFunction({ name: "TS_RANK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsRankCd(...params: Statement[]) {
          return super.pushFunction({ name: "TS_RANK_CD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsRewrite(...params: Statement[]) {
          return super.pushFunction({ name: "TS_REWRITE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsStat(...params: Statement[]) {
          return super.pushFunction({ name: "TS_STAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsTokenType(...params: Statement[]) {
          return super.pushFunction({ name: "TS_TOKEN_TYPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsvectorToArray(...params: Statement[]) {
          return super.pushFunction({ name: "TSVECTOR_TO_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    unicodeAssigned(...params: Statement[]) {
          return super.pushFunction({ name: "UNICODE_ASSIGNED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    unistr(...params: Statement[]) {
          return super.pushFunction({ name: "UNISTR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override upper(...params: Statement[]) {
        if (params.length == 0) {
            return super.upper();
        }
          return super.pushFunction({ name: "UPPER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    uuidExtractTimestamp(...params: Statement[]) {
          return super.pushFunction({ name: "UUID_EXTRACT_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    uuidExtractVersion(...params: Statement[]) {
          return super.pushFunction({ name: "UUID_EXTRACT_VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    uuidv4(...params: Statement[]) {
          return super.pushFunction({ name: "UUIDV4", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    uuidv7(...params: Statement[]) {
          return super.pushFunction({ name: "UUIDV7", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    websearchToTsquery(...params: Statement[]) {
          return super.pushFunction({ name: "WEBSEARCH_TO_TSQUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    width(...params: Statement[]) {
          return super.pushFunction({ name: "WIDTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override widthBucket(...params: Statement[]) {
        if (params.length == 0) {
            return super.widthBucket();
        }
          return super.pushFunction({ name: "WIDTH_BUCKET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmlagg(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmlagg();
        }
          return super.pushFunction({ name: "XMLAGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmlattributes(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmlattributes();
        }
          return super.pushFunction({ name: "XMLATTRIBUTES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmlcomment(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmlcomment();
        }
          return super.pushFunction({ name: "XMLCOMMENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmlconcat(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmlconcat();
        }
          return super.pushFunction({ name: "XMLCONCAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmlelement(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmlelement();
        }
          return super.pushFunction({ name: "XMLELEMENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmlexists(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmlexists();
        }
          return super.pushFunction({ name: "XMLEXISTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmlforest(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmlforest();
        }
          return super.pushFunction({ name: "XMLFOREST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    xmlIsWellFormed(...params: Statement[]) {
          return super.pushFunction({ name: "XML_IS_WELL_FORMED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    xmlIsWellFormedContent(...params: Statement[]) {
          return super.pushFunction({ name: "XML_IS_WELL_FORMED_CONTENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    xmlIsWellFormedDocument(...params: Statement[]) {
          return super.pushFunction({ name: "XML_IS_WELL_FORMED_DOCUMENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmlparse(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmlparse();
        }
          return super.pushFunction({ name: "XMLPARSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmlpi(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmlpi();
        }
          return super.pushFunction({ name: "XMLPI", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmlroot(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmlroot();
        }
          return super.pushFunction({ name: "XMLROOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmlserialize(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmlserialize();
        }
          return super.pushFunction({ name: "XMLSERIALIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override xmltext(...params: Statement[]) {
        if (params.length == 0) {
            return super.xmltext();
        }
          return super.pushFunction({ name: "XMLTEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    xpath(...params: Statement[]) {
          return super.pushFunction({ name: "XPATH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    xpathExists(...params: Statement[]) {
          return super.pushFunction({ name: "XPATH_EXISTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }
}