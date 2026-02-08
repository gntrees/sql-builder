"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringFunctionBuilder = void 0;
const override_json_functions_1 = require("./override-json-functions");
class StringFunctionBuilder extends override_json_functions_1.JSONFunctionBuilder {
    btrim(value, characters) {
        return this.pushFunction("BTRIM", value === undefined ? undefined : this.toLiteral(value), characters === undefined ? undefined : this.toLiteral(characters));
    }
    bitLength(value) {
        return this.pushFunction("BIT_LENGTH", value === undefined ? undefined : this.toLiteral(value));
    }
    bitCount(value) {
        return this.pushFunction("BIT_COUNT", value === undefined ? undefined : this.toLiteral(value));
    }
    crc32(value) {
        return this.pushFunction("CRC32", value === undefined ? undefined : this.toLiteral(value));
    }
    crc32c(value) {
        return this.pushFunction("CRC32C", value === undefined ? undefined : this.toLiteral(value));
    }
    getBit(value, index) {
        return this.pushFunction("GET_BIT", value === undefined ? undefined : this.toLiteral(value), index === undefined ? undefined : this.toLiteral(index));
    }
    setBit(value, index, newValue) {
        return this.pushFunction("SET_BIT", value === undefined ? undefined : this.toLiteral(value), index === undefined ? undefined : this.toLiteral(index), newValue === undefined ? undefined : this.toLiteral(newValue));
    }
    charLength(value) {
        return this.pushFunction("CHAR_LENGTH", value === undefined ? undefined : this.toLiteral(value));
    }
    characterLength(value) {
        return this.pushFunction("CHARACTER_LENGTH", value === undefined ? undefined : this.toLiteral(value));
    }
    lower(value) {
        return this.pushFunction("LOWER", value === undefined ? undefined : this.toLiteral(value));
    }
    lpad(value, length, fill) {
        return this.pushFunction("LPAD", value === undefined ? undefined : this.toLiteral(value), length === undefined ? undefined : this.toLiteral(length), fill === undefined ? undefined : this.toLiteral(fill));
    }
    ltrim(value, characters) {
        return this.pushFunction("LTRIM", value === undefined ? undefined : this.toLiteral(value), characters === undefined ? undefined : this.toLiteral(characters));
    }
    normalize(value, form) {
        return this.pushFunction("NORMALIZE", value === undefined ? undefined : this.toLiteral(value), form === undefined ? undefined : this.toLiteral(form));
    }
    octetLength(value) {
        return this.pushFunction("OCTET_LENGTH", value === undefined ? undefined : this.toLiteral(value));
    }
    getByte(value, offset) {
        return this.pushFunction("GET_BYTE", value === undefined ? undefined : this.toLiteral(value), offset === undefined ? undefined : this.toLiteral(offset));
    }
    setByte(value, offset, newValue) {
        return this.pushFunction("SET_BYTE", value === undefined ? undefined : this.toLiteral(value), offset === undefined ? undefined : this.toLiteral(offset), newValue === undefined ? undefined : this.toLiteral(newValue));
    }
    encode(value, format) {
        return this.pushFunction("ENCODE", value === undefined ? undefined : this.toLiteral(value), format === undefined ? undefined : this.toLiteral(format));
    }
    decode(value, format) {
        return this.pushFunction("DECODE", value === undefined ? undefined : this.toLiteral(value), format === undefined ? undefined : this.toLiteral(format));
    }
    convert(value, srcEncoding, destEncoding) {
        return this.pushFunction("CONVERT", value === undefined ? undefined : this.toLiteral(value), srcEncoding === undefined ? undefined : this.toLiteral(srcEncoding), destEncoding === undefined ? undefined : this.toLiteral(destEncoding));
    }
    convertFrom(value, srcEncoding) {
        return this.pushFunction("CONVERT_FROM", value === undefined ? undefined : this.toLiteral(value), srcEncoding === undefined ? undefined : this.toLiteral(srcEncoding));
    }
    convertTo(value, destEncoding) {
        return this.pushFunction("CONVERT_TO", value === undefined ? undefined : this.toLiteral(value), destEncoding === undefined ? undefined : this.toLiteral(destEncoding));
    }
    overlay(value, newSubstring, start, count) {
        return this.pushFunction("OVERLAY", value === undefined ? undefined : this.toLiteral(value), newSubstring === undefined ? undefined : this.toLiteral(newSubstring), start === undefined ? undefined : this.toLiteral(start), count === undefined ? undefined : this.toLiteral(count));
    }
    position(substring, value) {
        return this.pushFunction("POSITION", substring === undefined ? undefined : this.toLiteral(substring), value === undefined ? undefined : this.toLiteral(value));
    }
    rpad(value, length, fill) {
        return this.pushFunction("RPAD", value === undefined ? undefined : this.toLiteral(value), length === undefined ? undefined : this.toLiteral(length), fill === undefined ? undefined : this.toLiteral(fill));
    }
    rtrim(value, characters) {
        return this.pushFunction("RTRIM", value === undefined ? undefined : this.toLiteral(value), characters === undefined ? undefined : this.toLiteral(characters));
    }
    substring(value, startOrPattern, countOrEscape) {
        return this.pushFunction("SUBSTRING", value === undefined ? undefined : this.toLiteral(value), startOrPattern === undefined ? undefined : this.toLiteral(startOrPattern), countOrEscape === undefined ? undefined : this.toLiteral(countOrEscape));
    }
    trim(value, characters) {
        return this.pushFunction("TRIM", value === undefined ? undefined : this.toLiteral(value), characters === undefined ? undefined : this.toLiteral(characters));
    }
    unicodeAssigned(value) {
        return this.pushFunction("UNICODE_ASSIGNED", value === undefined ? undefined : this.toLiteral(value));
    }
    upper(value) {
        return this.pushFunction("UPPER", value === undefined ? undefined : this.toLiteral(value));
    }
    ascii(value) {
        return this.pushFunction("ASCII", value === undefined ? undefined : this.toLiteral(value));
    }
    chr(value) {
        return this.pushFunction("CHR", value === undefined ? undefined : this.toLiteral(value));
    }
    concat(...values) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("CONCAT", ...filtered.map(v => this.toLiteral(v)));
    }
    concatWs(separator, ...values) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("CONCAT_WS", separator === undefined ? undefined : this.toLiteral(separator), ...filtered.map(v => this.toLiteral(v)));
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
        return this.pushFunction("FORMAT", formatStr === undefined ? undefined : this.toLiteral(formatStr), ...filtered.map(v => this.toLiteral(v)));
    }
    initcap(value) {
        return this.pushFunction("INITCAP", value === undefined ? undefined : this.toLiteral(value));
    }
    casefold(value) {
        return this.pushFunction("CASEFOLD", value === undefined ? undefined : this.toLiteral(value));
    }
    left(value, count) {
        if (value === undefined && count === undefined) {
            return super.left();
        }
        return this.pushFunction("LEFT", value === undefined ? undefined : this.toLiteral(value), count === undefined ? undefined : this.toLiteral(count));
    }
    length(value, encoding) {
        if (value === undefined && encoding === undefined) {
            return super.length();
        }
        return this.pushFunction("LENGTH", value === undefined ? undefined : this.toLiteral(value), encoding === undefined ? undefined : this.toLiteral(encoding));
    }
    md5(value) {
        return this.pushFunction("MD5", value === undefined ? undefined : this.toLiteral(value));
    }
    sha224(value) {
        return this.pushFunction("SHA224", value === undefined ? undefined : this.toLiteral(value));
    }
    sha256(value) {
        return this.pushFunction("SHA256", value === undefined ? undefined : this.toLiteral(value));
    }
    sha384(value) {
        return this.pushFunction("SHA384", value === undefined ? undefined : this.toLiteral(value));
    }
    sha512(value) {
        return this.pushFunction("SHA512", value === undefined ? undefined : this.toLiteral(value));
    }
    parseIdent(value, strictMode) {
        return this.pushFunction("PARSE_IDENT", value === undefined ? undefined : this.toLiteral(value), strictMode === undefined ? undefined : this.toLiteral(strictMode));
    }
    pgClientEncoding() {
        return this.pushFunction("PG_CLIENT_ENCODING");
    }
    quoteIdent(value) {
        return this.pushFunction("QUOTE_IDENT", value === undefined ? undefined : this.toLiteral(value));
    }
    quoteLiteral(value) {
        return this.pushFunction("QUOTE_LITERAL", value === undefined ? undefined : this.toLiteral(value));
    }
    quoteNullable(value) {
        return this.pushFunction("QUOTE_NULLABLE", value === undefined ? undefined : this.toLiteral(value));
    }
    regexpCount(value, pattern, start, flags) {
        return this.pushFunction("REGEXP_COUNT", value === undefined ? undefined : this.toLiteral(value), pattern === undefined ? undefined : this.toLiteral(pattern), start === undefined ? undefined : this.toLiteral(start), flags === undefined ? undefined : this.toLiteral(flags));
    }
    regexpInstr(value, pattern, start, occurrence, endOption, flags, subexpr) {
        return this.pushFunction("REGEXP_INSTR", value === undefined ? undefined : this.toLiteral(value), pattern === undefined ? undefined : this.toLiteral(pattern), start === undefined ? undefined : this.toLiteral(start), occurrence === undefined ? undefined : this.toLiteral(occurrence), endOption === undefined ? undefined : this.toLiteral(endOption), flags === undefined ? undefined : this.toLiteral(flags), subexpr === undefined ? undefined : this.toLiteral(subexpr));
    }
    regexpLike(value, pattern, flags) {
        return this.pushFunction("REGEXP_LIKE", value === undefined ? undefined : this.toLiteral(value), pattern === undefined ? undefined : this.toLiteral(pattern), flags === undefined ? undefined : this.toLiteral(flags));
    }
    regexpMatch(value, pattern, flags) {
        return this.pushFunction("REGEXP_MATCH", value === undefined ? undefined : this.toLiteral(value), pattern === undefined ? undefined : this.toLiteral(pattern), flags === undefined ? undefined : this.toLiteral(flags));
    }
    regexpMatches(value, pattern, flags) {
        return this.pushFunction("REGEXP_MATCHES", value === undefined ? undefined : this.toLiteral(value), pattern === undefined ? undefined : this.toLiteral(pattern), flags === undefined ? undefined : this.toLiteral(flags));
    }
    regexpReplace(value, pattern, replacement, startOrFlags, occurrence, flags) {
        if (occurrence === undefined && flags === undefined) {
            return this.pushFunction("REGEXP_REPLACE", value === undefined ? undefined : this.toLiteral(value), pattern === undefined ? undefined : this.toLiteral(pattern), replacement === undefined ? undefined : this.toLiteral(replacement), startOrFlags === undefined ? undefined : this.toLiteral(startOrFlags));
        }
        return this.pushFunction("REGEXP_REPLACE", value === undefined ? undefined : this.toLiteral(value), pattern === undefined ? undefined : this.toLiteral(pattern), replacement === undefined ? undefined : this.toLiteral(replacement), startOrFlags === undefined ? undefined : this.toLiteral(startOrFlags), occurrence === undefined ? undefined : this.toLiteral(occurrence), flags === undefined ? undefined : this.toLiteral(flags));
    }
    regexpSplitToArray(value, pattern, flags) {
        return this.pushFunction("REGEXP_SPLIT_TO_ARRAY", value === undefined ? undefined : this.toLiteral(value), pattern === undefined ? undefined : this.toLiteral(pattern), flags === undefined ? undefined : this.toLiteral(flags));
    }
    regexpSplitToTable(value, pattern, flags) {
        return this.pushFunction("REGEXP_SPLIT_TO_TABLE", value === undefined ? undefined : this.toLiteral(value), pattern === undefined ? undefined : this.toLiteral(pattern), flags === undefined ? undefined : this.toLiteral(flags));
    }
    regexpSubstr(value, pattern, start, occurrence, flags, subexpr) {
        return this.pushFunction("REGEXP_SUBSTR", value === undefined ? undefined : this.toLiteral(value), pattern === undefined ? undefined : this.toLiteral(pattern), start === undefined ? undefined : this.toLiteral(start), occurrence === undefined ? undefined : this.toLiteral(occurrence), flags === undefined ? undefined : this.toLiteral(flags), subexpr === undefined ? undefined : this.toLiteral(subexpr));
    }
    repeat(value, count) {
        return this.pushFunction("REPEAT", value === undefined ? undefined : this.toLiteral(value), count === undefined ? undefined : this.toLiteral(count));
    }
    replace(value, from, to) {
        if (value === undefined && from === undefined && to === undefined) {
            return super.replace();
        }
        return this.pushFunction("REPLACE", value === undefined ? undefined : this.toLiteral(value), from === undefined ? undefined : this.toLiteral(from), to === undefined ? undefined : this.toLiteral(to));
    }
    reverse(value) {
        return this.pushFunction("REVERSE", value === undefined ? undefined : this.toLiteral(value));
    }
    right(value, count) {
        if (value === undefined && count === undefined) {
            return super.right();
        }
        return this.pushFunction("RIGHT", value === undefined ? undefined : this.toLiteral(value), count === undefined ? undefined : this.toLiteral(count));
    }
    splitPart(value, delimiter, index) {
        return this.pushFunction("SPLIT_PART", value === undefined ? undefined : this.toLiteral(value), delimiter === undefined ? undefined : this.toLiteral(delimiter), index === undefined ? undefined : this.toLiteral(index));
    }
    startsWith(value, prefix) {
        return this.pushFunction("STARTS_WITH", value === undefined ? undefined : this.toLiteral(value), prefix === undefined ? undefined : this.toLiteral(prefix));
    }
    stringToArray(value, delimiter, nullString) {
        return this.pushFunction("STRING_TO_ARRAY", value === undefined ? undefined : this.toLiteral(value), delimiter === undefined ? undefined : this.toLiteral(delimiter), nullString === undefined ? undefined : this.toLiteral(nullString));
    }
    stringToTable(value, delimiter, nullString) {
        return this.pushFunction("STRING_TO_TABLE", value === undefined ? undefined : this.toLiteral(value), delimiter === undefined ? undefined : this.toLiteral(delimiter), nullString === undefined ? undefined : this.toLiteral(nullString));
    }
    strpos(value, substring) {
        return this.pushFunction("STRPOS", value === undefined ? undefined : this.toLiteral(value), substring === undefined ? undefined : this.toLiteral(substring));
    }
    substr(value, start, count) {
        return this.pushFunction("SUBSTR", value === undefined ? undefined : this.toLiteral(value), start === undefined ? undefined : this.toLiteral(start), count === undefined ? undefined : this.toLiteral(count));
    }
    toAscii(value, encoding) {
        return this.pushFunction("TO_ASCII", value === undefined ? undefined : this.toLiteral(value), encoding === undefined ? undefined : this.toLiteral(encoding));
    }
    toBin(value) {
        return this.pushFunction("TO_BIN", value === undefined ? undefined : this.toLiteral(value));
    }
    toHex(value) {
        return this.pushFunction("TO_HEX", value === undefined ? undefined : this.toLiteral(value));
    }
    toOct(value) {
        return this.pushFunction("TO_OCT", value === undefined ? undefined : this.toLiteral(value));
    }
    translate(value, from, to) {
        if (value === undefined && from === undefined && to === undefined) {
            return super.translate();
        }
        return this.pushFunction("TRANSLATE", value === undefined ? undefined : this.toLiteral(value), from === undefined ? undefined : this.toLiteral(from), to === undefined ? undefined : this.toLiteral(to));
    }
    unistr(value) {
        return this.pushFunction("UNISTR", value === undefined ? undefined : this.toLiteral(value));
    }
}
exports.StringFunctionBuilder = StringFunctionBuilder;
