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

    acldefault(...params: Statement[]) {
          return super.pushFunction({ name: "ACLDEFAULT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    aclexplode(...params: Statement[]) {
          return super.pushFunction({ name: "ACLEXPLODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override anyValue(...params: Statement[]) {
        if (params.length == 0) {
            return super.anyValue();
        }
          return super.pushFunction({ name: "ANY_VALUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    area(...params: Statement[]) {
          return super.pushFunction({ name: "AREA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override arrayAgg(...params: Statement[]) {
        if (params.length == 0) {
            return super.arrayAgg();
        }
          return super.pushFunction({ name: "ARRAY_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayAppend(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_APPEND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayCat(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_CAT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayDims(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_DIMS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayFill(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_FILL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayLength(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayLower(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_LOWER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayNdims(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_NDIMS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayPosition(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_POSITION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayPositions(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_POSITIONS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayPrepend(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_PREPEND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayRemove(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_REMOVE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayReplace(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_REPLACE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayReverse(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_REVERSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arraySample(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_SAMPLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayShuffle(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_SHUFFLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arraySort(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_SORT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayToJson(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_TO_JSON", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayToString(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_TO_STRING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayToTsvector(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_TO_TSVECTOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    arrayUpper(...params: Statement[]) {
          return super.pushFunction({ name: "ARRAY_UPPER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override avg(...params: Statement[]) {
        if (params.length == 0) {
            return super.avg();
        }
          return super.pushFunction({ name: "AVG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    bitAnd(...params: Statement[]) {
          return super.pushFunction({ name: "BIT_AND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    bitOr(...params: Statement[]) {
          return super.pushFunction({ name: "BIT_OR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    bitXor(...params: Statement[]) {
          return super.pushFunction({ name: "BIT_XOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    boolAnd(...params: Statement[]) {
          return super.pushFunction({ name: "BOOL_AND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    boolOr(...params: Statement[]) {
          return super.pushFunction({ name: "BOOL_OR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    boundBox(...params: Statement[]) {
          return super.pushFunction({ name: "BOUND_BOX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    box(...params: Statement[]) {
          return super.pushFunction({ name: "BOX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    brinDesummarizeRange(...params: Statement[]) {
          return super.pushFunction({ name: "BRIN_DESUMMARIZE_RANGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    brinSummarizeNewValues(...params: Statement[]) {
          return super.pushFunction({ name: "BRIN_SUMMARIZE_NEW_VALUES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    brinSummarizeRange(...params: Statement[]) {
          return super.pushFunction({ name: "BRIN_SUMMARIZE_RANGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override cardinality(...params: Statement[]) {
        if (params.length == 0) {
            return super.cardinality();
        }
          return super.pushFunction({ name: "CARDINALITY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override coalesce(...params: Statement[]) {
        if (params.length == 0) {
            return super.coalesce();
        }
          return super.pushFunction({ name: "COALESCE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    colDescription(...params: Statement[]) {
          return super.pushFunction({ name: "COL_DESCRIPTION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    collationFor(...params: Statement[]) {
          return super.pushFunction({ name: "COLLATION_FOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override corr(...params: Statement[]) {
        if (params.length == 0) {
            return super.corr();
        }
          return super.pushFunction({ name: "CORR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override count(...params: Statement[]) {
        if (params.length == 0) {
            return super.count();
        }
          return super.pushFunction({ name: "COUNT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override covarPop(...params: Statement[]) {
        if (params.length == 0) {
            return super.covarPop();
        }
          return super.pushFunction({ name: "COVAR_POP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override covarSamp(...params: Statement[]) {
        if (params.length == 0) {
            return super.covarSamp();
        }
          return super.pushFunction({ name: "COVAR_SAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    crc32(...params: Statement[]) {
          return super.pushFunction({ name: "CRC32", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    crc32c(...params: Statement[]) {
          return super.pushFunction({ name: "CRC32C", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override cumeDist(...params: Statement[]) {
        if (params.length == 0) {
            return super.cumeDist();
        }
          return super.pushFunction({ name: "CUME_DIST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    currentDatabase(...params: Statement[]) {
          return super.pushFunction({ name: "CURRENT_DATABASE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override currentDate(...params: Statement[]) {
        if (params.length == 0) {
            return super.currentDate();
        }
          return super.pushFunction({ name: "CURRENT_DATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    currentQuery(...params: Statement[]) {
          return super.pushFunction({ name: "CURRENT_QUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override currentSchema(...params: Statement[]) {
        if (params.length == 0) {
            return super.currentSchema();
        }
          return super.pushFunction({ name: "CURRENT_SCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    currentSchemas(...params: Statement[]) {
          return super.pushFunction({ name: "CURRENT_SCHEMAS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    currentSetting(...params: Statement[]) {
          return super.pushFunction({ name: "CURRENT_SETTING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    currval(...params: Statement[]) {
          return super.pushFunction({ name: "CURRVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override denseRank(...params: Statement[]) {
        if (params.length == 0) {
            return super.denseRank();
        }
          return super.pushFunction({ name: "DENSE_RANK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override every(...params: Statement[]) {
        if (params.length == 0) {
            return super.every();
        }
          return super.pushFunction({ name: "EVERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override firstValue(...params: Statement[]) {
        if (params.length == 0) {
            return super.firstValue();
        }
          return super.pushFunction({ name: "FIRST_VALUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    formatType(...params: Statement[]) {
          return super.pushFunction({ name: "FORMAT_TYPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    gamma(...params: Statement[]) {
          return super.pushFunction({ name: "GAMMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    gcd(...params: Statement[]) {
          return super.pushFunction({ name: "GCD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    generateSeries(...params: Statement[]) {
          return super.pushFunction({ name: "GENERATE_SERIES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    generateSubscripts(...params: Statement[]) {
          return super.pushFunction({ name: "GENERATE_SUBSCRIPTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    ginCleanPendingList(...params: Statement[]) {
          return super.pushFunction({ name: "GIN_CLEAN_PENDING_LIST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override greatest(...params: Statement[]) {
        if (params.length == 0) {
            return super.greatest();
        }
          return super.pushFunction({ name: "GREATEST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override grouping(...params: Statement[]) {
        if (params.length == 0) {
            return super.grouping();
        }
          return super.pushFunction({ name: "GROUPING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasAnyColumnPrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_ANY_COLUMN_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasColumnPrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_COLUMN_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasDatabasePrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_DATABASE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasForeignDataWrapperPrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_FOREIGN_DATA_WRAPPER_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasFunctionPrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_FUNCTION_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasLanguagePrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_LANGUAGE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasLargeobjectPrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_LARGEOBJECT_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasParameterPrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_PARAMETER_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasSchemaPrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_SCHEMA_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasSequencePrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_SEQUENCE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasServerPrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_SERVER_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasTablePrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_TABLE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasTablespacePrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_TABLESPACE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    hasTypePrivilege(...params: Statement[]) {
          return super.pushFunction({ name: "HAS_TYPE_PRIVILEGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    icuUnicodeVersion(...params: Statement[]) {
          return super.pushFunction({ name: "ICU_UNICODE_VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    inetClientAddr(...params: Statement[]) {
          return super.pushFunction({ name: "INET_CLIENT_ADDR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    inetClientPort(...params: Statement[]) {
          return super.pushFunction({ name: "INET_CLIENT_PORT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    inetMerge(...params: Statement[]) {
          return super.pushFunction({ name: "INET_MERGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    inetSameFamily(...params: Statement[]) {
          return super.pushFunction({ name: "INET_SAME_FAMILY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    inetServerAddr(...params: Statement[]) {
          return super.pushFunction({ name: "INET_SERVER_ADDR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    inetServerPort(...params: Statement[]) {
          return super.pushFunction({ name: "INET_SERVER_PORT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    initcap(...params: Statement[]) {
          return super.pushFunction({ name: "INITCAP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    isclosed(...params: Statement[]) {
          return super.pushFunction({ name: "ISCLOSED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    isempty(...params: Statement[]) {
          return super.pushFunction({ name: "ISEMPTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    isfinite(...params: Statement[]) {
          return super.pushFunction({ name: "ISFINITE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    isopen(...params: Statement[]) {
          return super.pushFunction({ name: "ISOPEN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonAgg(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonAggStrict(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_AGG_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override jsonArray(...params: Statement[]) {
        if (params.length == 0) {
            return super.jsonArray();
        }
          return super.pushFunction({ name: "JSON_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override jsonArrayagg(...params: Statement[]) {
        if (params.length == 0) {
            return super.jsonArrayagg();
        }
          return super.pushFunction({ name: "JSON_ARRAYAGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonArrayElements(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_ARRAY_ELEMENTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonArrayElementsText(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_ARRAY_ELEMENTS_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonArrayLength(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_ARRAY_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbAgg(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbAggStrict(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_AGG_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbArrayElements(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_ARRAY_ELEMENTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbArrayElementsText(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_ARRAY_ELEMENTS_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbArrayLength(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_ARRAY_LENGTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbBuildArray(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_BUILD_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbBuildObject(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_BUILD_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbEach(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_EACH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbEachText(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_EACH_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbExtractPath(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_EXTRACT_PATH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbExtractPathText(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_EXTRACT_PATH_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbInsert(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_INSERT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbObject(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbObjectAgg(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_OBJECT_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbObjectAggStrict(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_OBJECT_AGG_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbObjectAggUnique(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_OBJECT_AGG_UNIQUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbObjectAggUniqueStrict(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_OBJECT_AGG_UNIQUE_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbObjectKeys(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_OBJECT_KEYS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPathExists(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_PATH_EXISTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPathExistsTz(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_PATH_EXISTS_TZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPathMatch(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_PATH_MATCH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPathMatchTz(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_PATH_MATCH_TZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPathQuery(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_PATH_QUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPathQueryArray(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_PATH_QUERY_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPathQueryArrayTz(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_PATH_QUERY_ARRAY_TZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPathQueryFirst(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_PATH_QUERY_FIRST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPathQueryFirstTz(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_PATH_QUERY_FIRST_TZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPathQueryTz(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_PATH_QUERY_TZ", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPopulateRecord(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_POPULATE_RECORD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPopulateRecordset(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_POPULATE_RECORDSET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPopulateRecordValid(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_POPULATE_RECORD_VALID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbPretty(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_PRETTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbSet(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_SET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbSetLax(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_SET_LAX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbStripNulls(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_STRIP_NULLS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbToRecord(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_TO_RECORD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbToRecordset(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_TO_RECORDSET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbToTsvector(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_TO_TSVECTOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonbTypeof(...params: Statement[]) {
          return super.pushFunction({ name: "JSONB_TYPEOF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonBuildArray(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_BUILD_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonBuildObject(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_BUILD_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonEach(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_EACH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonEachText(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_EACH_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override jsonExists(...params: Statement[]) {
        if (params.length == 0) {
            return super.jsonExists();
        }
          return super.pushFunction({ name: "JSON_EXISTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonExtractPath(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_EXTRACT_PATH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonExtractPathText(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_EXTRACT_PATH_TEXT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override jsonObject(...params: Statement[]) {
        if (params.length == 0) {
            return super.jsonObject();
        }
          return super.pushFunction({ name: "JSON_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override jsonObjectagg(...params: Statement[]) {
        if (params.length == 0) {
            return super.jsonObjectagg();
        }
          return super.pushFunction({ name: "JSON_OBJECTAGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonObjectAgg(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_OBJECT_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonObjectAggStrict(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_OBJECT_AGG_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonObjectAggUnique(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_OBJECT_AGG_UNIQUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonObjectAggUniqueStrict(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_OBJECT_AGG_UNIQUE_STRICT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonObjectKeys(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_OBJECT_KEYS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonPopulateRecord(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_POPULATE_RECORD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonPopulateRecordset(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_POPULATE_RECORDSET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override jsonQuery(...params: Statement[]) {
        if (params.length == 0) {
            return super.jsonQuery();
        }
          return super.pushFunction({ name: "JSON_QUERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override jsonScalar(...params: Statement[]) {
        if (params.length == 0) {
            return super.jsonScalar();
        }
          return super.pushFunction({ name: "JSON_SCALAR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override jsonSerialize(...params: Statement[]) {
        if (params.length == 0) {
            return super.jsonSerialize();
        }
          return super.pushFunction({ name: "JSON_SERIALIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonStripNulls(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_STRIP_NULLS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonToRecord(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_TO_RECORD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonToRecordset(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_TO_RECORDSET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonToTsvector(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_TO_TSVECTOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    jsonTypeof(...params: Statement[]) {
          return super.pushFunction({ name: "JSON_TYPEOF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override jsonValue(...params: Statement[]) {
        if (params.length == 0) {
            return super.jsonValue();
        }
          return super.pushFunction({ name: "JSON_VALUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override lag(...params: Statement[]) {
        if (params.length == 0) {
            return super.lag();
        }
          return super.pushFunction({ name: "LAG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    lastval(...params: Statement[]) {
          return super.pushFunction({ name: "LASTVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override lastValue(...params: Statement[]) {
        if (params.length == 0) {
            return super.lastValue();
        }
          return super.pushFunction({ name: "LAST_VALUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    lcm(...params: Statement[]) {
          return super.pushFunction({ name: "LCM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override lead(...params: Statement[]) {
        if (params.length == 0) {
            return super.lead();
        }
          return super.pushFunction({ name: "LEAD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override least(...params: Statement[]) {
        if (params.length == 0) {
            return super.least();
        }
          return super.pushFunction({ name: "LEAST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    lowerInc(...params: Statement[]) {
          return super.pushFunction({ name: "LOWER_INC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    lowerInf(...params: Statement[]) {
          return super.pushFunction({ name: "LOWER_INF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    makeaclitem(...params: Statement[]) {
          return super.pushFunction({ name: "MAKEACLITEM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override max(...params: Statement[]) {
        if (params.length == 0) {
            return super.max();
        }
          return super.pushFunction({ name: "MAX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    md5(...params: Statement[]) {
          return super.pushFunction({ name: "MD5", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override mergeAction(...params: Statement[]) {
          return super.pushFunction({ name: "MERGE_ACTION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override min(...params: Statement[]) {
        if (params.length == 0) {
            return super.min();
        }
          return super.pushFunction({ name: "MIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override mode(...params: Statement[]) {
        if (params.length == 0) {
            return super.mode();
        }
          return super.pushFunction({ name: "MODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    multirange(...params: Statement[]) {
          return super.pushFunction({ name: "MULTIRANGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    mxidAge(...params: Statement[]) {
          return super.pushFunction({ name: "MXID_AGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    netmask(...params: Statement[]) {
          return super.pushFunction({ name: "NETMASK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    network(...params: Statement[]) {
          return super.pushFunction({ name: "NETWORK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    nextval(...params: Statement[]) {
          return super.pushFunction({ name: "NEXTVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override nthValue(...params: Statement[]) {
        if (params.length == 0) {
            return super.nthValue();
        }
          return super.pushFunction({ name: "NTH_VALUE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override ntile(...params: Statement[]) {
        if (params.length == 0) {
            return super.ntile();
        }
          return super.pushFunction({ name: "NTILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override nullif(...params: Statement[]) {
        if (params.length == 0) {
            return super.nullif();
        }
          return super.pushFunction({ name: "NULLIF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    numnode(...params: Statement[]) {
          return super.pushFunction({ name: "NUMNODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    objDescription(...params: Statement[]) {
          return super.pushFunction({ name: "OBJ_DESCRIPTION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override percentileCont(...params: Statement[]) {
        if (params.length == 0) {
            return super.percentileCont();
        }
          return super.pushFunction({ name: "PERCENTILE_CONT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override percentileDisc(...params: Statement[]) {
        if (params.length == 0) {
            return super.percentileDisc();
        }
          return super.pushFunction({ name: "PERCENTILE_DISC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override percentRank(...params: Statement[]) {
        if (params.length == 0) {
            return super.percentRank();
        }
          return super.pushFunction({ name: "PERCENT_RANK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgAdvisoryLock(...params: Statement[]) {
          return super.pushFunction({ name: "PG_ADVISORY_LOCK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgAdvisoryLockShared(...params: Statement[]) {
          return super.pushFunction({ name: "PG_ADVISORY_LOCK_SHARED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgAdvisoryUnlock(...params: Statement[]) {
          return super.pushFunction({ name: "PG_ADVISORY_UNLOCK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgAdvisoryUnlockAll(...params: Statement[]) {
          return super.pushFunction({ name: "PG_ADVISORY_UNLOCK_ALL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgAdvisoryUnlockShared(...params: Statement[]) {
          return super.pushFunction({ name: "PG_ADVISORY_UNLOCK_SHARED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgAdvisoryXactLock(...params: Statement[]) {
          return super.pushFunction({ name: "PG_ADVISORY_XACT_LOCK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgAdvisoryXactLockShared(...params: Statement[]) {
          return super.pushFunction({ name: "PG_ADVISORY_XACT_LOCK_SHARED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgAvailableWalSummaries(...params: Statement[]) {
          return super.pushFunction({ name: "PG_AVAILABLE_WAL_SUMMARIES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgBackendPid(...params: Statement[]) {
          return super.pushFunction({ name: "PG_BACKEND_PID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgBackupStart(...params: Statement[]) {
          return super.pushFunction({ name: "PG_BACKUP_START", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgBackupStop(...params: Statement[]) {
          return super.pushFunction({ name: "PG_BACKUP_STOP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgBasetype(...params: Statement[]) {
          return super.pushFunction({ name: "PG_BASETYPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgBlockingPids(...params: Statement[]) {
          return super.pushFunction({ name: "PG_BLOCKING_PIDS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCancelBackend(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CANCEL_BACKEND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCharToEncoding(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CHAR_TO_ENCODING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgClearAttributeStats(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CLEAR_ATTRIBUTE_STATS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgClearRelationStats(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CLEAR_RELATION_STATS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgClientEncoding(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CLIENT_ENCODING", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCollationActualVersion(...params: Statement[]) {
          return super.pushFunction({ name: "PG_COLLATION_ACTUAL_VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCollationIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_COLLATION_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgColumnCompression(...params: Statement[]) {
          return super.pushFunction({ name: "PG_COLUMN_COMPRESSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgColumnSize(...params: Statement[]) {
          return super.pushFunction({ name: "PG_COLUMN_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgColumnToastChunkId(...params: Statement[]) {
          return super.pushFunction({ name: "PG_COLUMN_TOAST_CHUNK_ID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgConfLoadTime(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CONF_LOAD_TIME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgControlCheckpoint(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CONTROL_CHECKPOINT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgControlInit(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CONTROL_INIT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgControlRecovery(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CONTROL_RECOVERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgControlSystem(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CONTROL_SYSTEM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgConversionIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CONVERSION_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCopyLogicalReplicationSlot(...params: Statement[]) {
          return super.pushFunction({ name: "PG_COPY_LOGICAL_REPLICATION_SLOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCopyPhysicalReplicationSlot(...params: Statement[]) {
          return super.pushFunction({ name: "PG_COPY_PHYSICAL_REPLICATION_SLOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCreateLogicalReplicationSlot(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CREATE_LOGICAL_REPLICATION_SLOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCreatePhysicalReplicationSlot(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CREATE_PHYSICAL_REPLICATION_SLOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCreateRestorePoint(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CREATE_RESTORE_POINT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCurrentLogfile(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CURRENT_LOGFILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCurrentSnapshot(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CURRENT_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCurrentWalFlushLsn(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CURRENT_WAL_FLUSH_LSN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCurrentWalInsertLsn(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CURRENT_WAL_INSERT_LSN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCurrentWalLsn(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CURRENT_WAL_LSN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCurrentXactId(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CURRENT_XACT_ID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgCurrentXactIdIfAssigned(...params: Statement[]) {
          return super.pushFunction({ name: "PG_CURRENT_XACT_ID_IF_ASSIGNED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgDatabaseCollationActualVersion(...params: Statement[]) {
          return super.pushFunction({ name: "PG_DATABASE_COLLATION_ACTUAL_VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgDatabaseSize(...params: Statement[]) {
          return super.pushFunction({ name: "PG_DATABASE_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgDescribeObject(...params: Statement[]) {
          return super.pushFunction({ name: "PG_DESCRIBE_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgDropReplicationSlot(...params: Statement[]) {
          return super.pushFunction({ name: "PG_DROP_REPLICATION_SLOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgEncodingToChar(...params: Statement[]) {
          return super.pushFunction({ name: "PG_ENCODING_TO_CHAR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgEventTriggerDdlCommands(...params: Statement[]) {
          return super.pushFunction({ name: "PG_EVENT_TRIGGER_DDL_COMMANDS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgEventTriggerDroppedObjects(...params: Statement[]) {
          return super.pushFunction({ name: "PG_EVENT_TRIGGER_DROPPED_OBJECTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgEventTriggerTableRewriteOid(...params: Statement[]) {
          return super.pushFunction({ name: "PG_EVENT_TRIGGER_TABLE_REWRITE_OID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgEventTriggerTableRewriteReason(...params: Statement[]) {
          return super.pushFunction({ name: "PG_EVENT_TRIGGER_TABLE_REWRITE_REASON", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgExportSnapshot(...params: Statement[]) {
          return super.pushFunction({ name: "PG_EXPORT_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgFilenodeRelation(...params: Statement[]) {
          return super.pushFunction({ name: "PG_FILENODE_RELATION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgFunctionIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_FUNCTION_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetAcl(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_ACL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetCatalogForeignKeys(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_CATALOG_FOREIGN_KEYS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetConstraintdef(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_CONSTRAINTDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetExpr(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_EXPR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetFunctionArguments(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_FUNCTION_ARGUMENTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetFunctiondef(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_FUNCTIONDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetFunctionIdentityArguments(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_FUNCTION_IDENTITY_ARGUMENTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetFunctionResult(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_FUNCTION_RESULT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetIndexdef(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_INDEXDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetKeywords(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_KEYWORDS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetLoadedModules(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_LOADED_MODULES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetMultixactMembers(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_MULTIXACT_MEMBERS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetObjectAddress(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_OBJECT_ADDRESS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetPartitionConstraintdef(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_PARTITION_CONSTRAINTDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetPartkeydef(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_PARTKEYDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetRuledef(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_RULEDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetSerialSequence(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_SERIAL_SEQUENCE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetStatisticsobjdef(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_STATISTICSOBJDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetTriggerdef(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_TRIGGERDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetUserbyid(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_USERBYID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetViewdef(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_VIEWDEF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetWalReplayPauseState(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_WAL_REPLAY_PAUSE_STATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetWalResourceManagers(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_WAL_RESOURCE_MANAGERS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgGetWalSummarizerState(...params: Statement[]) {
          return super.pushFunction({ name: "PG_GET_WAL_SUMMARIZER_STATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgHasRole(...params: Statement[]) {
          return super.pushFunction({ name: "PG_HAS_ROLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgIdentifyObject(...params: Statement[]) {
          return super.pushFunction({ name: "PG_IDENTIFY_OBJECT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgIdentifyObjectAsAddress(...params: Statement[]) {
          return super.pushFunction({ name: "PG_IDENTIFY_OBJECT_AS_ADDRESS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgImportSystemCollations(...params: Statement[]) {
          return super.pushFunction({ name: "PG_IMPORT_SYSTEM_COLLATIONS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgIndexamHasProperty(...params: Statement[]) {
          return super.pushFunction({ name: "PG_INDEXAM_HAS_PROPERTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgIndexColumnHasProperty(...params: Statement[]) {
          return super.pushFunction({ name: "PG_INDEX_COLUMN_HAS_PROPERTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgIndexesSize(...params: Statement[]) {
          return super.pushFunction({ name: "PG_INDEXES_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgIndexHasProperty(...params: Statement[]) {
          return super.pushFunction({ name: "PG_INDEX_HAS_PROPERTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgInputErrorInfo(...params: Statement[]) {
          return super.pushFunction({ name: "PG_INPUT_ERROR_INFO", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgInputIsValid(...params: Statement[]) {
          return super.pushFunction({ name: "PG_INPUT_IS_VALID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgIsInRecovery(...params: Statement[]) {
          return super.pushFunction({ name: "PG_IS_IN_RECOVERY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgIsOtherTempSchema(...params: Statement[]) {
          return super.pushFunction({ name: "PG_IS_OTHER_TEMP_SCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgIsWalReplayPaused(...params: Statement[]) {
          return super.pushFunction({ name: "PG_IS_WAL_REPLAY_PAUSED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgJitAvailable(...params: Statement[]) {
          return super.pushFunction({ name: "PG_JIT_AVAILABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLastCommittedXact(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LAST_COMMITTED_XACT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLastWalReceiveLsn(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LAST_WAL_RECEIVE_LSN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLastWalReplayLsn(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LAST_WAL_REPLAY_LSN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLastXactReplayTimestamp(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LAST_XACT_REPLAY_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgListeningChannels(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LISTENING_CHANNELS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLogBackendMemoryContexts(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LOG_BACKEND_MEMORY_CONTEXTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLogicalEmitMessage(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LOGICAL_EMIT_MESSAGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLogicalSlotGetBinaryChanges(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LOGICAL_SLOT_GET_BINARY_CHANGES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLogicalSlotGetChanges(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LOGICAL_SLOT_GET_CHANGES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLogicalSlotPeekBinaryChanges(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LOGICAL_SLOT_PEEK_BINARY_CHANGES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLogicalSlotPeekChanges(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LOGICAL_SLOT_PEEK_CHANGES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLogStandbySnapshot(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LOG_STANDBY_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLsArchiveStatusdir(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LS_ARCHIVE_STATUSDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLsDir(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LS_DIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLsLogdir(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LS_LOGDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLsLogicalmapdir(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LS_LOGICALMAPDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLsLogicalsnapdir(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LS_LOGICALSNAPDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLsReplslotdir(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LS_REPLSLOTDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLsSummariesdir(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LS_SUMMARIESDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLsTmpdir(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LS_TMPDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgLsWaldir(...params: Statement[]) {
          return super.pushFunction({ name: "PG_LS_WALDIR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgMcvListItems(...params: Statement[]) {
          return super.pushFunction({ name: "PG_MCV_LIST_ITEMS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgMyTempSchema(...params: Statement[]) {
          return super.pushFunction({ name: "PG_MY_TEMP_SCHEMA", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgNotificationQueueUsage(...params: Statement[]) {
          return super.pushFunction({ name: "PG_NOTIFICATION_QUEUE_USAGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgNumaAvailable(...params: Statement[]) {
          return super.pushFunction({ name: "PG_NUMA_AVAILABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgOpclassIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_OPCLASS_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgOperatorIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_OPERATOR_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgOpfamilyIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_OPFAMILY_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgOptionsToTable(...params: Statement[]) {
          return super.pushFunction({ name: "PG_OPTIONS_TO_TABLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgPartitionAncestors(...params: Statement[]) {
          return super.pushFunction({ name: "PG_PARTITION_ANCESTORS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgPartitionRoot(...params: Statement[]) {
          return super.pushFunction({ name: "PG_PARTITION_ROOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgPartitionTree(...params: Statement[]) {
          return super.pushFunction({ name: "PG_PARTITION_TREE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgPostmasterStartTime(...params: Statement[]) {
          return super.pushFunction({ name: "PG_POSTMASTER_START_TIME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgPromote(...params: Statement[]) {
          return super.pushFunction({ name: "PG_PROMOTE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReadBinaryFile(...params: Statement[]) {
          return super.pushFunction({ name: "PG_READ_BINARY_FILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReadFile(...params: Statement[]) {
          return super.pushFunction({ name: "PG_READ_FILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgRelationFilenode(...params: Statement[]) {
          return super.pushFunction({ name: "PG_RELATION_FILENODE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgRelationFilepath(...params: Statement[]) {
          return super.pushFunction({ name: "PG_RELATION_FILEPATH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgRelationSize(...params: Statement[]) {
          return super.pushFunction({ name: "PG_RELATION_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReloadConf(...params: Statement[]) {
          return super.pushFunction({ name: "PG_RELOAD_CONF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationOriginAdvance(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_ORIGIN_ADVANCE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationOriginCreate(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_ORIGIN_CREATE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationOriginDrop(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_ORIGIN_DROP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationOriginOid(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_ORIGIN_OID", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationOriginProgress(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_ORIGIN_PROGRESS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationOriginSessionIsSetup(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_ORIGIN_SESSION_IS_SETUP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationOriginSessionProgress(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_ORIGIN_SESSION_PROGRESS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationOriginSessionReset(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_ORIGIN_SESSION_RESET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationOriginSessionSetup(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_ORIGIN_SESSION_SETUP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationOriginXactReset(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_ORIGIN_XACT_RESET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationOriginXactSetup(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_ORIGIN_XACT_SETUP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgReplicationSlotAdvance(...params: Statement[]) {
          return super.pushFunction({ name: "PG_REPLICATION_SLOT_ADVANCE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgRestoreAttributeStats(...params: Statement[]) {
          return super.pushFunction({ name: "PG_RESTORE_ATTRIBUTE_STATS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgRestoreRelationStats(...params: Statement[]) {
          return super.pushFunction({ name: "PG_RESTORE_RELATION_STATS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgRotateLogfile(...params: Statement[]) {
          return super.pushFunction({ name: "PG_ROTATE_LOGFILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSafeSnapshotBlockingPids(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SAFE_SNAPSHOT_BLOCKING_PIDS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSettingsGetFlags(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SETTINGS_GET_FLAGS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSizeBytes(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SIZE_BYTES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSizePretty(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SIZE_PRETTY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    pgSnapshotXip(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SNAPSHOT_XIP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSnapshotXmax(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SNAPSHOT_XMAX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSnapshotXmin(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SNAPSHOT_XMIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSplitWalfileName(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SPLIT_WALFILE_NAME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgStatFile(...params: Statement[]) {
          return super.pushFunction({ name: "PG_STAT_FILE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgStatisticsObjIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_STATISTICS_OBJ_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSwitchWal(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SWITCH_WAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgSyncReplicationSlots(...params: Statement[]) {
          return super.pushFunction({ name: "PG_SYNC_REPLICATION_SLOTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTableIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TABLE_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTableSize(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TABLE_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTablespaceDatabases(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TABLESPACE_DATABASES", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTablespaceLocation(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TABLESPACE_LOCATION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTablespaceSize(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TABLESPACE_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTerminateBackend(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TERMINATE_BACKEND", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTotalRelationSize(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TOTAL_RELATION_SIZE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTriggerDepth(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TRIGGER_DEPTH", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTryAdvisoryLock(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TRY_ADVISORY_LOCK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTryAdvisoryLockShared(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TRY_ADVISORY_LOCK_SHARED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTryAdvisoryXactLock(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TRY_ADVISORY_XACT_LOCK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTryAdvisoryXactLockShared(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TRY_ADVISORY_XACT_LOCK_SHARED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTsConfigIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TS_CONFIG_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTsDictIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TS_DICT_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTsParserIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TS_PARSER_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTsTemplateIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TS_TEMPLATE_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTypeIsVisible(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TYPE_IS_VISIBLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgTypeof(...params: Statement[]) {
          return super.pushFunction({ name: "PG_TYPEOF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgVisibleInSnapshot(...params: Statement[]) {
          return super.pushFunction({ name: "PG_VISIBLE_IN_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgWalfileName(...params: Statement[]) {
          return super.pushFunction({ name: "PG_WALFILE_NAME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgWalfileNameOffset(...params: Statement[]) {
          return super.pushFunction({ name: "PG_WALFILE_NAME_OFFSET", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgWalLsnDiff(...params: Statement[]) {
          return super.pushFunction({ name: "PG_WAL_LSN_DIFF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgWalReplayPause(...params: Statement[]) {
          return super.pushFunction({ name: "PG_WAL_REPLAY_PAUSE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgWalReplayResume(...params: Statement[]) {
          return super.pushFunction({ name: "PG_WAL_REPLAY_RESUME", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgWalSummaryContents(...params: Statement[]) {
          return super.pushFunction({ name: "PG_WAL_SUMMARY_CONTENTS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgXactCommitTimestamp(...params: Statement[]) {
          return super.pushFunction({ name: "PG_XACT_COMMIT_TIMESTAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgXactCommitTimestampOrigin(...params: Statement[]) {
          return super.pushFunction({ name: "PG_XACT_COMMIT_TIMESTAMP_ORIGIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    pgXactStatus(...params: Statement[]) {
          return super.pushFunction({ name: "PG_XACT_STATUS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    rangeAgg(...params: Statement[]) {
          return super.pushFunction({ name: "RANGE_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    rangeIntersectAgg(...params: Statement[]) {
          return super.pushFunction({ name: "RANGE_INTERSECT_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    rangeMerge(...params: Statement[]) {
          return super.pushFunction({ name: "RANGE_MERGE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override rank(...params: Statement[]) {
        if (params.length == 0) {
            return super.rank();
        }
          return super.pushFunction({ name: "RANK", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override regrAvgx(...params: Statement[]) {
        if (params.length == 0) {
            return super.regrAvgx();
        }
          return super.pushFunction({ name: "REGR_AVGX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override regrAvgy(...params: Statement[]) {
        if (params.length == 0) {
            return super.regrAvgy();
        }
          return super.pushFunction({ name: "REGR_AVGY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override regrCount(...params: Statement[]) {
        if (params.length == 0) {
            return super.regrCount();
        }
          return super.pushFunction({ name: "REGR_COUNT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override regrIntercept(...params: Statement[]) {
        if (params.length == 0) {
            return super.regrIntercept();
        }
          return super.pushFunction({ name: "REGR_INTERCEPT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override regrR2(...params: Statement[]) {
        if (params.length == 0) {
            return super.regrR2();
        }
          return super.pushFunction({ name: "REGR_R2", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override regrSlope(...params: Statement[]) {
        if (params.length == 0) {
            return super.regrSlope();
        }
          return super.pushFunction({ name: "REGR_SLOPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override regrSxx(...params: Statement[]) {
        if (params.length == 0) {
            return super.regrSxx();
        }
          return super.pushFunction({ name: "REGR_SXX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override regrSxy(...params: Statement[]) {
        if (params.length == 0) {
            return super.regrSxy();
        }
          return super.pushFunction({ name: "REGR_SXY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override regrSyy(...params: Statement[]) {
        if (params.length == 0) {
            return super.regrSyy();
        }
          return super.pushFunction({ name: "REGR_SYY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override rowNumber(...params: Statement[]) {
          return super.pushFunction({ name: "ROW_NUMBER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    rowSecurityActive(...params: Statement[]) {
          return super.pushFunction({ name: "ROW_SECURITY_ACTIVE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    rowToJson(...params: Statement[]) {
          return super.pushFunction({ name: "ROW_TO_JSON", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    setConfig(...params: Statement[]) {
          return super.pushFunction({ name: "SET_CONFIG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    setMasklen(...params: Statement[]) {
          return super.pushFunction({ name: "SET_MASKLEN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    setseed(...params: Statement[]) {
          return super.pushFunction({ name: "SETSEED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    setval(...params: Statement[]) {
          return super.pushFunction({ name: "SETVAL", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    shobjDescription(...params: Statement[]) {
          return super.pushFunction({ name: "SHOBJ_DESCRIPTION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    stddev(...params: Statement[]) {
          return super.pushFunction({ name: "STDDEV", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override stddevPop(...params: Statement[]) {
        if (params.length == 0) {
            return super.stddevPop();
        }
          return super.pushFunction({ name: "STDDEV_POP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override stddevSamp(...params: Statement[]) {
        if (params.length == 0) {
            return super.stddevSamp();
        }
          return super.pushFunction({ name: "STDDEV_SAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    stringAgg(...params: Statement[]) {
          return super.pushFunction({ name: "STRING_AGG", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override sum(...params: Statement[]) {
        if (params.length == 0) {
            return super.sum();
        }
          return super.pushFunction({ name: "SUM", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    suppressRedundantUpdatesTrigger(...params: Statement[]) {
          return super.pushFunction({ name: "SUPPRESS_REDUNDANT_UPDATES_TRIGGER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    toJson(...params: Statement[]) {
          return super.pushFunction({ name: "TO_JSON", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toJsonb(...params: Statement[]) {
          return super.pushFunction({ name: "TO_JSONB", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toNumber(...params: Statement[]) {
          return super.pushFunction({ name: "TO_NUMBER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toOct(...params: Statement[]) {
          return super.pushFunction({ name: "TO_OCT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toRegclass(...params: Statement[]) {
          return super.pushFunction({ name: "TO_REGCLASS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toRegcollation(...params: Statement[]) {
          return super.pushFunction({ name: "TO_REGCOLLATION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toRegnamespace(...params: Statement[]) {
          return super.pushFunction({ name: "TO_REGNAMESPACE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toRegoper(...params: Statement[]) {
          return super.pushFunction({ name: "TO_REGOPER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toRegoperator(...params: Statement[]) {
          return super.pushFunction({ name: "TO_REGOPERATOR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toRegproc(...params: Statement[]) {
          return super.pushFunction({ name: "TO_REGPROC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toRegprocedure(...params: Statement[]) {
          return super.pushFunction({ name: "TO_REGPROCEDURE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toRegrole(...params: Statement[]) {
          return super.pushFunction({ name: "TO_REGROLE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toRegtype(...params: Statement[]) {
          return super.pushFunction({ name: "TO_REGTYPE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    toRegtypemod(...params: Statement[]) {
          return super.pushFunction({ name: "TO_REGTYPEMOD", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    override trimArray(...params: Statement[]) {
        if (params.length == 0) {
            return super.trimArray();
        }
          return super.pushFunction({ name: "TRIM_ARRAY", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    tsvectorUpdateTrigger(...params: Statement[]) {
          return super.pushFunction({ name: "TSVECTOR_UPDATE_TRIGGER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    tsvectorUpdateTriggerColumn(...params: Statement[]) {
          return super.pushFunction({ name: "TSVECTOR_UPDATE_TRIGGER_COLUMN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    txidCurrent(...params: Statement[]) {
          return super.pushFunction({ name: "TXID_CURRENT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    txidCurrentIfAssigned(...params: Statement[]) {
          return super.pushFunction({ name: "TXID_CURRENT_IF_ASSIGNED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    txidCurrentSnapshot(...params: Statement[]) {
          return super.pushFunction({ name: "TXID_CURRENT_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    txidSnapshotXip(...params: Statement[]) {
          return super.pushFunction({ name: "TXID_SNAPSHOT_XIP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    txidSnapshotXmax(...params: Statement[]) {
          return super.pushFunction({ name: "TXID_SNAPSHOT_XMAX", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    txidSnapshotXmin(...params: Statement[]) {
          return super.pushFunction({ name: "TXID_SNAPSHOT_XMIN", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    txidStatus(...params: Statement[]) {
          return super.pushFunction({ name: "TXID_STATUS", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    txidVisibleInSnapshot(...params: Statement[]) {
          return super.pushFunction({ name: "TXID_VISIBLE_IN_SNAPSHOT", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    unicodeAssigned(...params: Statement[]) {
          return super.pushFunction({ name: "UNICODE_ASSIGNED", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    unicodeVersion(...params: Statement[]) {
          return super.pushFunction({ name: "UNICODE_VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    unistr(...params: Statement[]) {
          return super.pushFunction({ name: "UNISTR", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override unnest(...params: Statement[]) {
        if (params.length == 0) {
            return super.unnest();
        }
          return super.pushFunction({ name: "UNNEST", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override upper(...params: Statement[]) {
        if (params.length == 0) {
            return super.upper();
        }
          return super.pushFunction({ name: "UPPER", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    upperInc(...params: Statement[]) {
          return super.pushFunction({ name: "UPPER_INC", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    upperInf(...params: Statement[]) {
          return super.pushFunction({ name: "UPPER_INF", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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

    variance(...params: Statement[]) {
          return super.pushFunction({ name: "VARIANCE", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override varPop(...params: Statement[]) {
        if (params.length == 0) {
            return super.varPop();
        }
          return super.pushFunction({ name: "VAR_POP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override varSamp(...params: Statement[]) {
        if (params.length == 0) {
            return super.varSamp();
        }
          return super.pushFunction({ name: "VAR_SAMP", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
          }

    override version(...params: Statement[]) {
        if (params.length == 0) {
            return super.version();
        }
          return super.pushFunction({ name: "VERSION", args: [{ name: "params", variadic: true }], format: "COERCE_EXPLICIT_CALL" }, ...params);
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