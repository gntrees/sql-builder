import { JSONFunctionBuilder } from "./override-json-functions";
import type { StatementValue, StatementValueLiteral } from "./types";

export class StringFunctionBuilder extends JSONFunctionBuilder {
    override btrim(value?: StatementValueLiteral, characters?: StatementValueLiteral) {
        return this.pushFunction("BTRIM",
            value === undefined ? undefined : this.toLiteralValue(value),
            characters === undefined ? undefined : this.toLiteralValue(characters));
    }

    override bitLength(value?: StatementValueLiteral) {
        return this.pushFunction("BIT_LENGTH",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    bitCount(value?: StatementValueLiteral) {
        return this.pushFunction("BIT_COUNT",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    crc32(value?: StatementValueLiteral) {
        return this.pushFunction("CRC32",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    crc32c(value?: StatementValueLiteral) {
        return this.pushFunction("CRC32C",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    getBit(value?: StatementValueLiteral, index?: StatementValueLiteral) {
        return this.pushFunction("GET_BIT",
            value === undefined ? undefined : this.toLiteralValue(value),
            index === undefined ? undefined : this.toLiteralValue(index));
    }

    setBit(value?: StatementValueLiteral, index?: StatementValueLiteral, newValue?: StatementValueLiteral) {
        return this.pushFunction("SET_BIT",
            value === undefined ? undefined : this.toLiteralValue(value),
            index === undefined ? undefined : this.toLiteralValue(index),
            newValue === undefined ? undefined : this.toLiteralValue(newValue));
    }

    override charLength(value?: StatementValueLiteral) {
        return this.pushFunction("CHAR_LENGTH",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override characterLength(value?: StatementValueLiteral) {
        return this.pushFunction("CHARACTER_LENGTH",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override lower(value?: StatementValueLiteral) {
        return this.pushFunction("LOWER",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override lpad(value?: StatementValueLiteral, length?: StatementValueLiteral, fill?: StatementValueLiteral) {
        return this.pushFunction("LPAD",
            value === undefined ? undefined : this.toLiteralValue(value),
            length === undefined ? undefined : this.toLiteralValue(length),
            fill === undefined ? undefined : this.toLiteralValue(fill));
    }

    override ltrim(value?: StatementValueLiteral, characters?: StatementValueLiteral) {
        return this.pushFunction("LTRIM",
            value === undefined ? undefined : this.toLiteralValue(value),
            characters === undefined ? undefined : this.toLiteralValue(characters));
    }

    override normalize(value?: StatementValueLiteral, form?: StatementValueLiteral) {
        return this.pushFunction("NORMALIZE",
            value === undefined ? undefined : this.toLiteralValue(value),
            form === undefined ? undefined : this.toLiteralValue(form));
    }

    override octetLength(value?: StatementValueLiteral) {
        return this.pushFunction("OCTET_LENGTH",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    getByte(value?: StatementValueLiteral, offset?: StatementValueLiteral) {
        return this.pushFunction("GET_BYTE",
            value === undefined ? undefined : this.toLiteralValue(value),
            offset === undefined ? undefined : this.toLiteralValue(offset));
    }

    setByte(value?: StatementValueLiteral, offset?: StatementValueLiteral, newValue?: StatementValueLiteral) {
        return this.pushFunction("SET_BYTE",
            value === undefined ? undefined : this.toLiteralValue(value),
            offset === undefined ? undefined : this.toLiteralValue(offset),
            newValue === undefined ? undefined : this.toLiteralValue(newValue));
    }

    encode(value?: StatementValueLiteral, format?: StatementValueLiteral) {
        return this.pushFunction("ENCODE",
            value === undefined ? undefined : this.toLiteralValue(value),
            format === undefined ? undefined : this.toLiteralValue(format));
    }

    decode(value?: StatementValueLiteral, format?: StatementValueLiteral) {
        return this.pushFunction("DECODE",
            value === undefined ? undefined : this.toLiteralValue(value),
            format === undefined ? undefined : this.toLiteralValue(format));
    }

    override convert(value?: StatementValueLiteral, srcEncoding?: StatementValueLiteral, destEncoding?: StatementValueLiteral) {
        return this.pushFunction("CONVERT",
            value === undefined ? undefined : this.toLiteralValue(value),
            srcEncoding === undefined ? undefined : this.toLiteralValue(srcEncoding),
            destEncoding === undefined ? undefined : this.toLiteralValue(destEncoding));
    }

    convertFrom(value?: StatementValueLiteral, srcEncoding?: StatementValueLiteral) {
        return this.pushFunction("CONVERT_FROM",
            value === undefined ? undefined : this.toLiteralValue(value),
            srcEncoding === undefined ? undefined : this.toLiteralValue(srcEncoding));
    }

    convertTo(value?: StatementValueLiteral, destEncoding?: StatementValueLiteral) {
        return this.pushFunction("CONVERT_TO",
            value === undefined ? undefined : this.toLiteralValue(value),
            destEncoding === undefined ? undefined : this.toLiteralValue(destEncoding));
    }

    override overlay(
        value?: StatementValueLiteral,
        newSubstring?: StatementValueLiteral,
        start?: StatementValueLiteral,
        count?: StatementValueLiteral,
    ) {
        return this.pushFunction("OVERLAY",
            value === undefined ? undefined : this.toLiteralValue(value),
            newSubstring === undefined ? undefined : this.toLiteralValue(newSubstring),
            start === undefined ? undefined : this.toLiteralValue(start),
            count === undefined ? undefined : this.toLiteralValue(count));
    }

    override position(substring?: StatementValueLiteral, value?: StatementValueLiteral) {
        return this.pushFunction("POSITION",
            substring === undefined ? undefined : this.toLiteralValue(substring),
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override rpad(value?: StatementValueLiteral, length?: StatementValueLiteral, fill?: StatementValueLiteral) {
        return this.pushFunction("RPAD",
            value === undefined ? undefined : this.toLiteralValue(value),
            length === undefined ? undefined : this.toLiteralValue(length),
            fill === undefined ? undefined : this.toLiteralValue(fill));
    }

    override rtrim(value?: StatementValueLiteral, characters?: StatementValueLiteral) {
        return this.pushFunction("RTRIM",
            value === undefined ? undefined : this.toLiteralValue(value),
            characters === undefined ? undefined : this.toLiteralValue(characters));
    }

    override substring(value?: StatementValueLiteral, startOrPattern?: StatementValueLiteral, countOrEscape?: StatementValueLiteral) {
        return this.pushFunction("SUBSTRING",
            value === undefined ? undefined : this.toLiteralValue(value),
            startOrPattern === undefined ? undefined : this.toLiteralValue(startOrPattern),
            countOrEscape === undefined ? undefined : this.toLiteralValue(countOrEscape));
    }

    override trim(value?: StatementValueLiteral, characters?: StatementValueLiteral) {
        return this.pushFunction("TRIM",
            value === undefined ? undefined : this.toLiteralValue(value),
            characters === undefined ? undefined : this.toLiteralValue(characters));
    }

    unicodeAssigned(value?: StatementValueLiteral) {
        return this.pushFunction("UNICODE_ASSIGNED",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override upper(value?: StatementValueLiteral) {
        return this.pushFunction("UPPER",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    ascii(value?: StatementValueLiteral) {
        return this.pushFunction("ASCII",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    chr(value?: StatementValueLiteral) {
        return this.pushFunction("CHR",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    concat(...values: StatementValueLiteral[]) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("CONCAT",
            ...filtered.map(v => this.toLiteralValue(v)));
    }

    concatWs(separator?: StatementValueLiteral, ...values: StatementValueLiteral[]) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("CONCAT_WS",
            separator === undefined ? undefined : this.toLiteralValue(separator),
            ...filtered.map(v => this.toLiteralValue(v)));
    }

    byteaConcat(...values: StatementValueLiteral[]) {
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

    override format(formatStr?: StatementValueLiteral, ...values: StatementValueLiteral[]) {
        if (formatStr === undefined && values.length === 0) {
            return super.format();
        }
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("FORMAT",
            formatStr === undefined ? undefined : this.toLiteralValue(formatStr),
            ...filtered.map(v => this.toLiteralValue(v)));
    }

    initcap(value?: StatementValueLiteral) {
        return this.pushFunction("INITCAP",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    casefold(value?: StatementValueLiteral) {
        return this.pushFunction("CASEFOLD",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override left(value?: StatementValueLiteral, count?: StatementValueLiteral) {
        if (value === undefined && count === undefined) {
            return super.left();
        }
        return this.pushFunction("LEFT",
            value === undefined ? undefined : this.toLiteralValue(value),
            count === undefined ? undefined : this.toLiteralValue(count));
    }

    override length(value?: StatementValueLiteral, encoding?: StatementValueLiteral) {
        if (value === undefined && encoding === undefined) {
            return super.length();
        }
        return this.pushFunction("LENGTH",
            value === undefined ? undefined : this.toLiteralValue(value),
            encoding === undefined ? undefined : this.toLiteralValue(encoding));
    }

    md5(value?: StatementValueLiteral) {
        return this.pushFunction("MD5",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    sha224(value?: StatementValueLiteral) {
        return this.pushFunction("SHA224",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    sha256(value?: StatementValueLiteral) {
        return this.pushFunction("SHA256",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    sha384(value?: StatementValueLiteral) {
        return this.pushFunction("SHA384",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    sha512(value?: StatementValueLiteral) {
        return this.pushFunction("SHA512",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    parseIdent(value?: StatementValueLiteral, strictMode?: StatementValueLiteral) {
        return this.pushFunction("PARSE_IDENT",
            value === undefined ? undefined : this.toLiteralValue(value),
            strictMode === undefined ? undefined : this.toLiteralValue(strictMode));
    }

    pgClientEncoding() {
        return this.pushFunction("PG_CLIENT_ENCODING");
    }

    quoteIdent(value?: StatementValueLiteral) {
        return this.pushFunction("QUOTE_IDENT",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    quoteLiteral(value?: StatementValueLiteral) {
        return this.pushFunction("QUOTE_LITERAL",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    quoteNullable(value?: StatementValueLiteral) {
        return this.pushFunction("QUOTE_NULLABLE",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    regexpCount(
        value?: StatementValueLiteral,
        pattern?: StatementValueLiteral,
        start?: StatementValueLiteral,
        flags?: StatementValueLiteral,
    ) {
        return this.pushFunction("REGEXP_COUNT",
            value === undefined ? undefined : this.toLiteralValue(value),
            pattern === undefined ? undefined : this.toLiteralValue(pattern),
            start === undefined ? undefined : this.toLiteralValue(start),
            flags === undefined ? undefined : this.toLiteralValue(flags));
    }

    regexpInstr(
        value?: StatementValueLiteral,
        pattern?: StatementValueLiteral,
        start?: StatementValueLiteral,
        occurrence?: StatementValueLiteral,
        endOption?: StatementValueLiteral,
        flags?: StatementValueLiteral,
        subexpr?: StatementValueLiteral,
    ) {
        return this.pushFunction("REGEXP_INSTR",
            value === undefined ? undefined : this.toLiteralValue(value),
            pattern === undefined ? undefined : this.toLiteralValue(pattern),
            start === undefined ? undefined : this.toLiteralValue(start),
            occurrence === undefined ? undefined : this.toLiteralValue(occurrence),
            endOption === undefined ? undefined : this.toLiteralValue(endOption),
            flags === undefined ? undefined : this.toLiteralValue(flags),
            subexpr === undefined ? undefined : this.toLiteralValue(subexpr));
    }

    regexpLike(value?: StatementValueLiteral, pattern?: StatementValueLiteral, flags?: StatementValueLiteral) {
        return this.pushFunction("REGEXP_LIKE",
            value === undefined ? undefined : this.toLiteralValue(value),
            pattern === undefined ? undefined : this.toLiteralValue(pattern),
            flags === undefined ? undefined : this.toLiteralValue(flags));
    }

    regexpMatch(value?: StatementValueLiteral, pattern?: StatementValueLiteral, flags?: StatementValueLiteral) {
        return this.pushFunction("REGEXP_MATCH",
            value === undefined ? undefined : this.toLiteralValue(value),
            pattern === undefined ? undefined : this.toLiteralValue(pattern),
            flags === undefined ? undefined : this.toLiteralValue(flags));
    }

    regexpMatches(value?: StatementValueLiteral, pattern?: StatementValueLiteral, flags?: StatementValueLiteral) {
        return this.pushFunction("REGEXP_MATCHES",
            value === undefined ? undefined : this.toLiteralValue(value),
            pattern === undefined ? undefined : this.toLiteralValue(pattern),
            flags === undefined ? undefined : this.toLiteralValue(flags));
    }

    regexpReplace(
        value?: StatementValueLiteral,
        pattern?: StatementValueLiteral,
        replacement?: StatementValueLiteral,
        startOrFlags?: StatementValueLiteral,
        occurrence?: StatementValueLiteral,
        flags?: StatementValueLiteral,
    ) {
        if (occurrence === undefined && flags === undefined) {
            return this.pushFunction("REGEXP_REPLACE",
                value === undefined ? undefined : this.toLiteralValue(value),
                pattern === undefined ? undefined : this.toLiteralValue(pattern),
                replacement === undefined ? undefined : this.toLiteralValue(replacement),
                startOrFlags === undefined ? undefined : this.toLiteralValue(startOrFlags));
        }
        return this.pushFunction("REGEXP_REPLACE",
            value === undefined ? undefined : this.toLiteralValue(value),
            pattern === undefined ? undefined : this.toLiteralValue(pattern),
            replacement === undefined ? undefined : this.toLiteralValue(replacement),
            startOrFlags === undefined ? undefined : this.toLiteralValue(startOrFlags),
            occurrence === undefined ? undefined : this.toLiteralValue(occurrence),
            flags === undefined ? undefined : this.toLiteralValue(flags));
    }

    regexpSplitToArray(value?: StatementValueLiteral, pattern?: StatementValueLiteral, flags?: StatementValueLiteral) {
        return this.pushFunction("REGEXP_SPLIT_TO_ARRAY",
            value === undefined ? undefined : this.toLiteralValue(value),
            pattern === undefined ? undefined : this.toLiteralValue(pattern),
            flags === undefined ? undefined : this.toLiteralValue(flags));
    }

    regexpSplitToTable(value?: StatementValueLiteral, pattern?: StatementValueLiteral, flags?: StatementValueLiteral) {
        return this.pushFunction("REGEXP_SPLIT_TO_TABLE",
            value === undefined ? undefined : this.toLiteralValue(value),
            pattern === undefined ? undefined : this.toLiteralValue(pattern),
            flags === undefined ? undefined : this.toLiteralValue(flags));
    }

    regexpSubstr(
        value?: StatementValueLiteral,
        pattern?: StatementValueLiteral,
        start?: StatementValueLiteral,
        occurrence?: StatementValueLiteral,
        flags?: StatementValueLiteral,
        subexpr?: StatementValueLiteral,
    ) {
        return this.pushFunction("REGEXP_SUBSTR",
            value === undefined ? undefined : this.toLiteralValue(value),
            pattern === undefined ? undefined : this.toLiteralValue(pattern),
            start === undefined ? undefined : this.toLiteralValue(start),
            occurrence === undefined ? undefined : this.toLiteralValue(occurrence),
            flags === undefined ? undefined : this.toLiteralValue(flags),
            subexpr === undefined ? undefined : this.toLiteralValue(subexpr));
    }

    repeat(value?: StatementValueLiteral, count?: StatementValueLiteral) {
        return this.pushFunction("REPEAT",
            value === undefined ? undefined : this.toLiteralValue(value),
            count === undefined ? undefined : this.toLiteralValue(count));
    }

    override replace(value?: StatementValueLiteral, from?: StatementValueLiteral, to?: StatementValueLiteral) {
        if (value === undefined && from === undefined && to === undefined) {
            return super.replace();
        }
        return this.pushFunction("REPLACE",
            value === undefined ? undefined : this.toLiteralValue(value),
            from === undefined ? undefined : this.toLiteralValue(from),
            to === undefined ? undefined : this.toLiteralValue(to));
    }

    reverse(value?: StatementValueLiteral) {
        return this.pushFunction("REVERSE",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override right(value?: StatementValueLiteral, count?: StatementValueLiteral) {
        if (value === undefined && count === undefined) {
            return super.right();
        }
        return this.pushFunction("RIGHT",
            value === undefined ? undefined : this.toLiteralValue(value),
            count === undefined ? undefined : this.toLiteralValue(count));
    }

    splitPart(value?: StatementValueLiteral, delimiter?: StatementValueLiteral, index?: StatementValueLiteral) {
        return this.pushFunction("SPLIT_PART",
            value === undefined ? undefined : this.toLiteralValue(value),
            delimiter === undefined ? undefined : this.toLiteralValue(delimiter),
            index === undefined ? undefined : this.toLiteralValue(index));
    }

    startsWith(value?: StatementValueLiteral, prefix?: StatementValueLiteral) {
        return this.pushFunction("STARTS_WITH",
            value === undefined ? undefined : this.toLiteralValue(value),
            prefix === undefined ? undefined : this.toLiteralValue(prefix));
    }

    stringToArray(value?: StatementValueLiteral, delimiter?: StatementValueLiteral, nullString?: StatementValueLiteral) {
        return this.pushFunction("STRING_TO_ARRAY",
            value === undefined ? undefined : this.toLiteralValue(value),
            delimiter === undefined ? undefined : this.toLiteralValue(delimiter),
            nullString === undefined ? undefined : this.toLiteralValue(nullString));
    }

    stringToTable(value?: StatementValueLiteral, delimiter?: StatementValueLiteral, nullString?: StatementValueLiteral) {
        return this.pushFunction("STRING_TO_TABLE",
            value === undefined ? undefined : this.toLiteralValue(value),
            delimiter === undefined ? undefined : this.toLiteralValue(delimiter),
            nullString === undefined ? undefined : this.toLiteralValue(nullString));
    }

    strpos(value?: StatementValueLiteral, substring?: StatementValueLiteral) {
        return this.pushFunction("STRPOS",
            value === undefined ? undefined : this.toLiteralValue(value),
            substring === undefined ? undefined : this.toLiteralValue(substring));
    }

    substr(value?: StatementValueLiteral, start?: StatementValueLiteral, count?: StatementValueLiteral) {
        return this.pushFunction("SUBSTR",
            value === undefined ? undefined : this.toLiteralValue(value),
            start === undefined ? undefined : this.toLiteralValue(start),
            count === undefined ? undefined : this.toLiteralValue(count));
    }

    toAscii(value?: StatementValueLiteral, encoding?: StatementValueLiteral) {
        return this.pushFunction("TO_ASCII",
            value === undefined ? undefined : this.toLiteralValue(value),
            encoding === undefined ? undefined : this.toLiteralValue(encoding));
    }

    toBin(value?: StatementValueLiteral) {
        return this.pushFunction("TO_BIN",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    toHex(value?: StatementValueLiteral) {
        return this.pushFunction("TO_HEX",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    toOct(value?: StatementValueLiteral) {
        return this.pushFunction("TO_OCT",
            value === undefined ? undefined : this.toLiteralValue(value));
    }

    override translate(value?: StatementValueLiteral, from?: StatementValueLiteral, to?: StatementValueLiteral) {
        if (value === undefined && from === undefined && to === undefined) {
            return super.translate();
        }
        return this.pushFunction("TRANSLATE",
            value === undefined ? undefined : this.toLiteralValue(value),
            from === undefined ? undefined : this.toLiteralValue(from),
            to === undefined ? undefined : this.toLiteralValue(to));
    }

    unistr(value?: StatementValueLiteral) {
        return this.pushFunction("UNISTR",
            value === undefined ? undefined : this.toLiteralValue(value));
    }
}
