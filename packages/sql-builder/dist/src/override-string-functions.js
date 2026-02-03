"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringFunctionBuilder = void 0;
const override_json_functions_1 = require("./override-json-functions");
class StringFunctionBuilder extends override_json_functions_1.JSONFunctionBuilder {
    btrim(value, characters) {
        return this.pushFunction("BTRIM", value === undefined ? undefined : this.toLiteralValue(value), characters === undefined ? undefined : this.toLiteralValue(characters));
    }
    bitLength(value) {
        return this.pushFunction("BIT_LENGTH", value === undefined ? undefined : this.toLiteralValue(value));
    }
    bitCount(value) {
        return this.pushFunction("BIT_COUNT", value === undefined ? undefined : this.toLiteralValue(value));
    }
    crc32(value) {
        return this.pushFunction("CRC32", value === undefined ? undefined : this.toLiteralValue(value));
    }
    crc32c(value) {
        return this.pushFunction("CRC32C", value === undefined ? undefined : this.toLiteralValue(value));
    }
    getBit(value, index) {
        return this.pushFunction("GET_BIT", value === undefined ? undefined : this.toLiteralValue(value), index === undefined ? undefined : this.toLiteralValue(index));
    }
    setBit(value, index, newValue) {
        return this.pushFunction("SET_BIT", value === undefined ? undefined : this.toLiteralValue(value), index === undefined ? undefined : this.toLiteralValue(index), newValue === undefined ? undefined : this.toLiteralValue(newValue));
    }
    charLength(value) {
        return this.pushFunction("CHAR_LENGTH", value === undefined ? undefined : this.toLiteralValue(value));
    }
    characterLength(value) {
        return this.pushFunction("CHARACTER_LENGTH", value === undefined ? undefined : this.toLiteralValue(value));
    }
    lower(value) {
        return this.pushFunction("LOWER", value === undefined ? undefined : this.toLiteralValue(value));
    }
    lpad(value, length, fill) {
        return this.pushFunction("LPAD", value === undefined ? undefined : this.toLiteralValue(value), length === undefined ? undefined : this.toLiteralValue(length), fill === undefined ? undefined : this.toLiteralValue(fill));
    }
    ltrim(value, characters) {
        return this.pushFunction("LTRIM", value === undefined ? undefined : this.toLiteralValue(value), characters === undefined ? undefined : this.toLiteralValue(characters));
    }
    normalize(value, form) {
        return this.pushFunction("NORMALIZE", value === undefined ? undefined : this.toLiteralValue(value), form === undefined ? undefined : this.toLiteralValue(form));
    }
    octetLength(value) {
        return this.pushFunction("OCTET_LENGTH", value === undefined ? undefined : this.toLiteralValue(value));
    }
    getByte(value, offset) {
        return this.pushFunction("GET_BYTE", value === undefined ? undefined : this.toLiteralValue(value), offset === undefined ? undefined : this.toLiteralValue(offset));
    }
    setByte(value, offset, newValue) {
        return this.pushFunction("SET_BYTE", value === undefined ? undefined : this.toLiteralValue(value), offset === undefined ? undefined : this.toLiteralValue(offset), newValue === undefined ? undefined : this.toLiteralValue(newValue));
    }
    encode(value, format) {
        return this.pushFunction("ENCODE", value === undefined ? undefined : this.toLiteralValue(value), format === undefined ? undefined : this.toLiteralValue(format));
    }
    decode(value, format) {
        return this.pushFunction("DECODE", value === undefined ? undefined : this.toLiteralValue(value), format === undefined ? undefined : this.toLiteralValue(format));
    }
    convert(value, srcEncoding, destEncoding) {
        return this.pushFunction("CONVERT", value === undefined ? undefined : this.toLiteralValue(value), srcEncoding === undefined ? undefined : this.toLiteralValue(srcEncoding), destEncoding === undefined ? undefined : this.toLiteralValue(destEncoding));
    }
    convertFrom(value, srcEncoding) {
        return this.pushFunction("CONVERT_FROM", value === undefined ? undefined : this.toLiteralValue(value), srcEncoding === undefined ? undefined : this.toLiteralValue(srcEncoding));
    }
    convertTo(value, destEncoding) {
        return this.pushFunction("CONVERT_TO", value === undefined ? undefined : this.toLiteralValue(value), destEncoding === undefined ? undefined : this.toLiteralValue(destEncoding));
    }
    overlay(value, newSubstring, start, count) {
        return this.pushFunction("OVERLAY", value === undefined ? undefined : this.toLiteralValue(value), newSubstring === undefined ? undefined : this.toLiteralValue(newSubstring), start === undefined ? undefined : this.toLiteralValue(start), count === undefined ? undefined : this.toLiteralValue(count));
    }
    position(substring, value) {
        return this.pushFunction("POSITION", substring === undefined ? undefined : this.toLiteralValue(substring), value === undefined ? undefined : this.toLiteralValue(value));
    }
    rpad(value, length, fill) {
        return this.pushFunction("RPAD", value === undefined ? undefined : this.toLiteralValue(value), length === undefined ? undefined : this.toLiteralValue(length), fill === undefined ? undefined : this.toLiteralValue(fill));
    }
    rtrim(value, characters) {
        return this.pushFunction("RTRIM", value === undefined ? undefined : this.toLiteralValue(value), characters === undefined ? undefined : this.toLiteralValue(characters));
    }
    substring(value, startOrPattern, countOrEscape) {
        return this.pushFunction("SUBSTRING", value === undefined ? undefined : this.toLiteralValue(value), startOrPattern === undefined ? undefined : this.toLiteralValue(startOrPattern), countOrEscape === undefined ? undefined : this.toLiteralValue(countOrEscape));
    }
    trim(value, characters) {
        return this.pushFunction("TRIM", value === undefined ? undefined : this.toLiteralValue(value), characters === undefined ? undefined : this.toLiteralValue(characters));
    }
    unicodeAssigned(value) {
        return this.pushFunction("UNICODE_ASSIGNED", value === undefined ? undefined : this.toLiteralValue(value));
    }
    upper(value) {
        return this.pushFunction("UPPER", value === undefined ? undefined : this.toLiteralValue(value));
    }
    ascii(value) {
        return this.pushFunction("ASCII", value === undefined ? undefined : this.toLiteralValue(value));
    }
    chr(value) {
        return this.pushFunction("CHR", value === undefined ? undefined : this.toLiteralValue(value));
    }
    concat(...values) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("CONCAT", ...filtered.map(v => this.toLiteralValue(v)));
    }
    concatWs(separator, ...values) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("CONCAT_WS", separator === undefined ? undefined : this.toLiteralValue(separator), ...filtered.map(v => this.toLiteralValue(v)));
    }
    byteaConcat(...values) {
        const resolvedValues = values
            .map((value, index) => this.resolveStatement(value, index))
            .filter((tokens) => tokens.length > 0);
        if (resolvedValues.length === 0) {
            return this;
        }
        resolvedValues.forEach((tokens, index) => {
            if (index > 0) {
                this.query.sql.push("||");
            }
            this.query.sql.push(...tokens);
        });
        return this;
    }
    format(formatStr, ...values) {
        if (formatStr === undefined && values.length === 0) {
            return super.format();
        }
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("FORMAT", formatStr === undefined ? undefined : this.toLiteralValue(formatStr), ...filtered.map(v => this.toLiteralValue(v)));
    }
    initcap(value) {
        return this.pushFunction("INITCAP", value === undefined ? undefined : this.toLiteralValue(value));
    }
    casefold(value) {
        return this.pushFunction("CASEFOLD", value === undefined ? undefined : this.toLiteralValue(value));
    }
    left(value, count) {
        if (value === undefined && count === undefined) {
            return super.left();
        }
        return this.pushFunction("LEFT", value === undefined ? undefined : this.toLiteralValue(value), count === undefined ? undefined : this.toLiteralValue(count));
    }
    length(value, encoding) {
        if (value === undefined && encoding === undefined) {
            return super.length();
        }
        return this.pushFunction("LENGTH", value === undefined ? undefined : this.toLiteralValue(value), encoding === undefined ? undefined : this.toLiteralValue(encoding));
    }
    md5(value) {
        return this.pushFunction("MD5", value === undefined ? undefined : this.toLiteralValue(value));
    }
    sha224(value) {
        return this.pushFunction("SHA224", value === undefined ? undefined : this.toLiteralValue(value));
    }
    sha256(value) {
        return this.pushFunction("SHA256", value === undefined ? undefined : this.toLiteralValue(value));
    }
    sha384(value) {
        return this.pushFunction("SHA384", value === undefined ? undefined : this.toLiteralValue(value));
    }
    sha512(value) {
        return this.pushFunction("SHA512", value === undefined ? undefined : this.toLiteralValue(value));
    }
    parseIdent(value, strictMode) {
        return this.pushFunction("PARSE_IDENT", value === undefined ? undefined : this.toLiteralValue(value), strictMode === undefined ? undefined : this.toLiteralValue(strictMode));
    }
    pgClientEncoding() {
        return this.pushFunction("PG_CLIENT_ENCODING");
    }
    quoteIdent(value) {
        return this.pushFunction("QUOTE_IDENT", value === undefined ? undefined : this.toLiteralValue(value));
    }
    quoteLiteral(value) {
        return this.pushFunction("QUOTE_LITERAL", value === undefined ? undefined : this.toLiteralValue(value));
    }
    quoteNullable(value) {
        return this.pushFunction("QUOTE_NULLABLE", value === undefined ? undefined : this.toLiteralValue(value));
    }
    regexpCount(value, pattern, start, flags) {
        return this.pushFunction("REGEXP_COUNT", value === undefined ? undefined : this.toLiteralValue(value), pattern === undefined ? undefined : this.toLiteralValue(pattern), start === undefined ? undefined : this.toLiteralValue(start), flags === undefined ? undefined : this.toLiteralValue(flags));
    }
    regexpInstr(value, pattern, start, occurrence, endOption, flags, subexpr) {
        return this.pushFunction("REGEXP_INSTR", value === undefined ? undefined : this.toLiteralValue(value), pattern === undefined ? undefined : this.toLiteralValue(pattern), start === undefined ? undefined : this.toLiteralValue(start), occurrence === undefined ? undefined : this.toLiteralValue(occurrence), endOption === undefined ? undefined : this.toLiteralValue(endOption), flags === undefined ? undefined : this.toLiteralValue(flags), subexpr === undefined ? undefined : this.toLiteralValue(subexpr));
    }
    regexpLike(value, pattern, flags) {
        return this.pushFunction("REGEXP_LIKE", value === undefined ? undefined : this.toLiteralValue(value), pattern === undefined ? undefined : this.toLiteralValue(pattern), flags === undefined ? undefined : this.toLiteralValue(flags));
    }
    regexpMatch(value, pattern, flags) {
        return this.pushFunction("REGEXP_MATCH", value === undefined ? undefined : this.toLiteralValue(value), pattern === undefined ? undefined : this.toLiteralValue(pattern), flags === undefined ? undefined : this.toLiteralValue(flags));
    }
    regexpMatches(value, pattern, flags) {
        return this.pushFunction("REGEXP_MATCHES", value === undefined ? undefined : this.toLiteralValue(value), pattern === undefined ? undefined : this.toLiteralValue(pattern), flags === undefined ? undefined : this.toLiteralValue(flags));
    }
    regexpReplace(value, pattern, replacement, startOrFlags, occurrence, flags) {
        if (occurrence === undefined && flags === undefined) {
            return this.pushFunction("REGEXP_REPLACE", value === undefined ? undefined : this.toLiteralValue(value), pattern === undefined ? undefined : this.toLiteralValue(pattern), replacement === undefined ? undefined : this.toLiteralValue(replacement), startOrFlags === undefined ? undefined : this.toLiteralValue(startOrFlags));
        }
        return this.pushFunction("REGEXP_REPLACE", value === undefined ? undefined : this.toLiteralValue(value), pattern === undefined ? undefined : this.toLiteralValue(pattern), replacement === undefined ? undefined : this.toLiteralValue(replacement), startOrFlags === undefined ? undefined : this.toLiteralValue(startOrFlags), occurrence === undefined ? undefined : this.toLiteralValue(occurrence), flags === undefined ? undefined : this.toLiteralValue(flags));
    }
    regexpSplitToArray(value, pattern, flags) {
        return this.pushFunction("REGEXP_SPLIT_TO_ARRAY", value === undefined ? undefined : this.toLiteralValue(value), pattern === undefined ? undefined : this.toLiteralValue(pattern), flags === undefined ? undefined : this.toLiteralValue(flags));
    }
    regexpSplitToTable(value, pattern, flags) {
        return this.pushFunction("REGEXP_SPLIT_TO_TABLE", value === undefined ? undefined : this.toLiteralValue(value), pattern === undefined ? undefined : this.toLiteralValue(pattern), flags === undefined ? undefined : this.toLiteralValue(flags));
    }
    regexpSubstr(value, pattern, start, occurrence, flags, subexpr) {
        return this.pushFunction("REGEXP_SUBSTR", value === undefined ? undefined : this.toLiteralValue(value), pattern === undefined ? undefined : this.toLiteralValue(pattern), start === undefined ? undefined : this.toLiteralValue(start), occurrence === undefined ? undefined : this.toLiteralValue(occurrence), flags === undefined ? undefined : this.toLiteralValue(flags), subexpr === undefined ? undefined : this.toLiteralValue(subexpr));
    }
    repeat(value, count) {
        return this.pushFunction("REPEAT", value === undefined ? undefined : this.toLiteralValue(value), count === undefined ? undefined : this.toLiteralValue(count));
    }
    replace(value, from, to) {
        if (value === undefined && from === undefined && to === undefined) {
            return super.replace();
        }
        return this.pushFunction("REPLACE", value === undefined ? undefined : this.toLiteralValue(value), from === undefined ? undefined : this.toLiteralValue(from), to === undefined ? undefined : this.toLiteralValue(to));
    }
    reverse(value) {
        return this.pushFunction("REVERSE", value === undefined ? undefined : this.toLiteralValue(value));
    }
    right(value, count) {
        if (value === undefined && count === undefined) {
            return super.right();
        }
        return this.pushFunction("RIGHT", value === undefined ? undefined : this.toLiteralValue(value), count === undefined ? undefined : this.toLiteralValue(count));
    }
    splitPart(value, delimiter, index) {
        return this.pushFunction("SPLIT_PART", value === undefined ? undefined : this.toLiteralValue(value), delimiter === undefined ? undefined : this.toLiteralValue(delimiter), index === undefined ? undefined : this.toLiteralValue(index));
    }
    startsWith(value, prefix) {
        return this.pushFunction("STARTS_WITH", value === undefined ? undefined : this.toLiteralValue(value), prefix === undefined ? undefined : this.toLiteralValue(prefix));
    }
    stringToArray(value, delimiter, nullString) {
        return this.pushFunction("STRING_TO_ARRAY", value === undefined ? undefined : this.toLiteralValue(value), delimiter === undefined ? undefined : this.toLiteralValue(delimiter), nullString === undefined ? undefined : this.toLiteralValue(nullString));
    }
    stringToTable(value, delimiter, nullString) {
        return this.pushFunction("STRING_TO_TABLE", value === undefined ? undefined : this.toLiteralValue(value), delimiter === undefined ? undefined : this.toLiteralValue(delimiter), nullString === undefined ? undefined : this.toLiteralValue(nullString));
    }
    strpos(value, substring) {
        return this.pushFunction("STRPOS", value === undefined ? undefined : this.toLiteralValue(value), substring === undefined ? undefined : this.toLiteralValue(substring));
    }
    substr(value, start, count) {
        return this.pushFunction("SUBSTR", value === undefined ? undefined : this.toLiteralValue(value), start === undefined ? undefined : this.toLiteralValue(start), count === undefined ? undefined : this.toLiteralValue(count));
    }
    toAscii(value, encoding) {
        return this.pushFunction("TO_ASCII", value === undefined ? undefined : this.toLiteralValue(value), encoding === undefined ? undefined : this.toLiteralValue(encoding));
    }
    toBin(value) {
        return this.pushFunction("TO_BIN", value === undefined ? undefined : this.toLiteralValue(value));
    }
    toHex(value) {
        return this.pushFunction("TO_HEX", value === undefined ? undefined : this.toLiteralValue(value));
    }
    toOct(value) {
        return this.pushFunction("TO_OCT", value === undefined ? undefined : this.toLiteralValue(value));
    }
    translate(value, from, to) {
        if (value === undefined && from === undefined && to === undefined) {
            return super.translate();
        }
        return this.pushFunction("TRANSLATE", value === undefined ? undefined : this.toLiteralValue(value), from === undefined ? undefined : this.toLiteralValue(from), to === undefined ? undefined : this.toLiteralValue(to));
    }
    unistr(value) {
        return this.pushFunction("UNISTR", value === undefined ? undefined : this.toLiteralValue(value));
    }
}
exports.StringFunctionBuilder = StringFunctionBuilder;
