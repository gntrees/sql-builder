import { JSONFunctionBuilder } from "./override-json-functions";
import type { Statement } from "./types";

export class StringFunctionBuilder extends JSONFunctionBuilder {
    override btrim(value?: Statement, characters?: Statement) {
        return this.pushFunction("BTRIM",
            value === undefined ? undefined : this.toLiteral(value),
            characters === undefined ? undefined : this.toLiteral(characters));
    }

    override bitLength(value?: Statement) {
        return this.pushFunction("BIT_LENGTH",
            value === undefined ? undefined : this.toLiteral(value));
    }

    bitCount(value?: Statement) {
        return this.pushFunction("BIT_COUNT",
            value === undefined ? undefined : this.toLiteral(value));
    }

    crc32(value?: Statement) {
        return this.pushFunction("CRC32",
            value === undefined ? undefined : this.toLiteral(value));
    }

    crc32c(value?: Statement) {
        return this.pushFunction("CRC32C",
            value === undefined ? undefined : this.toLiteral(value));
    }

    getBit(value?: Statement, index?: Statement) {
        return this.pushFunction("GET_BIT",
            value === undefined ? undefined : this.toLiteral(value),
            index === undefined ? undefined : this.toLiteral(index));
    }

    setBit(value?: Statement, index?: Statement, newValue?: Statement) {
        return this.pushFunction("SET_BIT",
            value === undefined ? undefined : this.toLiteral(value),
            index === undefined ? undefined : this.toLiteral(index),
            newValue === undefined ? undefined : this.toLiteral(newValue));
    }

    override charLength(value?: Statement) {
        return this.pushFunction("CHAR_LENGTH",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override characterLength(value?: Statement) {
        return this.pushFunction("CHARACTER_LENGTH",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override lower(value?: Statement) {
        return this.pushFunction("LOWER",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override lpad(value?: Statement, length?: Statement, fill?: Statement) {
        return this.pushFunction("LPAD",
            value === undefined ? undefined : this.toLiteral(value),
            length === undefined ? undefined : this.toLiteral(length),
            fill === undefined ? undefined : this.toLiteral(fill));
    }

    override ltrim(value?: Statement, characters?: Statement) {
        return this.pushFunction("LTRIM",
            value === undefined ? undefined : this.toLiteral(value),
            characters === undefined ? undefined : this.toLiteral(characters));
    }

    override normalize(value?: Statement, form?: Statement) {
        return this.pushFunction("NORMALIZE",
            value === undefined ? undefined : this.toLiteral(value),
            form === undefined ? undefined : this.toLiteral(form));
    }

    override octetLength(value?: Statement) {
        return this.pushFunction("OCTET_LENGTH",
            value === undefined ? undefined : this.toLiteral(value));
    }

    getByte(value?: Statement, offset?: Statement) {
        return this.pushFunction("GET_BYTE",
            value === undefined ? undefined : this.toLiteral(value),
            offset === undefined ? undefined : this.toLiteral(offset));
    }

    setByte(value?: Statement, offset?: Statement, newValue?: Statement) {
        return this.pushFunction("SET_BYTE",
            value === undefined ? undefined : this.toLiteral(value),
            offset === undefined ? undefined : this.toLiteral(offset),
            newValue === undefined ? undefined : this.toLiteral(newValue));
    }

    encode(value?: Statement, format?: Statement) {
        return this.pushFunction("ENCODE",
            value === undefined ? undefined : this.toLiteral(value),
            format === undefined ? undefined : this.toLiteral(format));
    }

    decode(value?: Statement, format?: Statement) {
        return this.pushFunction("DECODE",
            value === undefined ? undefined : this.toLiteral(value),
            format === undefined ? undefined : this.toLiteral(format));
    }

    override convert(value?: Statement, srcEncoding?: Statement, destEncoding?: Statement) {
        return this.pushFunction("CONVERT",
            value === undefined ? undefined : this.toLiteral(value),
            srcEncoding === undefined ? undefined : this.toLiteral(srcEncoding),
            destEncoding === undefined ? undefined : this.toLiteral(destEncoding));
    }

    convertFrom(value?: Statement, srcEncoding?: Statement) {
        return this.pushFunction("CONVERT_FROM",
            value === undefined ? undefined : this.toLiteral(value),
            srcEncoding === undefined ? undefined : this.toLiteral(srcEncoding));
    }

    convertTo(value?: Statement, destEncoding?: Statement) {
        return this.pushFunction("CONVERT_TO",
            value === undefined ? undefined : this.toLiteral(value),
            destEncoding === undefined ? undefined : this.toLiteral(destEncoding));
    }

    override overlay(
        value?: Statement,
        newSubstring?: Statement,
        start?: Statement,
        count?: Statement,
    ) {
        return this.pushFunction("OVERLAY",
            value === undefined ? undefined : this.toLiteral(value),
            newSubstring === undefined ? undefined : this.toLiteral(newSubstring),
            start === undefined ? undefined : this.toLiteral(start),
            count === undefined ? undefined : this.toLiteral(count));
    }

    override position(substring?: Statement, value?: Statement) {
        return this.pushFunction("POSITION",
            substring === undefined ? undefined : this.toLiteral(substring),
            value === undefined ? undefined : this.toLiteral(value));
    }

    override rpad(value?: Statement, length?: Statement, fill?: Statement) {
        return this.pushFunction("RPAD",
            value === undefined ? undefined : this.toLiteral(value),
            length === undefined ? undefined : this.toLiteral(length),
            fill === undefined ? undefined : this.toLiteral(fill));
    }

    override rtrim(value?: Statement, characters?: Statement) {
        return this.pushFunction("RTRIM",
            value === undefined ? undefined : this.toLiteral(value),
            characters === undefined ? undefined : this.toLiteral(characters));
    }

    override substring(value?: Statement, startOrPattern?: Statement, countOrEscape?: Statement) {
        return this.pushFunction("SUBSTRING",
            value === undefined ? undefined : this.toLiteral(value),
            startOrPattern === undefined ? undefined : this.toLiteral(startOrPattern),
            countOrEscape === undefined ? undefined : this.toLiteral(countOrEscape));
    }

    override trim(value?: Statement, characters?: Statement) {
        return this.pushFunction("TRIM",
            value === undefined ? undefined : this.toLiteral(value),
            characters === undefined ? undefined : this.toLiteral(characters));
    }

    unicodeAssigned(value?: Statement) {
        return this.pushFunction("UNICODE_ASSIGNED",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override upper(value?: Statement) {
        return this.pushFunction("UPPER",
            value === undefined ? undefined : this.toLiteral(value));
    }

    ascii(value?: Statement) {
        return this.pushFunction("ASCII",
            value === undefined ? undefined : this.toLiteral(value));
    }

    chr(value?: Statement) {
        return this.pushFunction("CHR",
            value === undefined ? undefined : this.toLiteral(value));
    }

    concat(...values: Statement[]) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("CONCAT",
            ...filtered.map(v => this.toLiteral(v)));
    }

    concatWs(separator?: Statement, ...values: Statement[]) {
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("CONCAT_WS",
            separator === undefined ? undefined : this.toLiteral(separator),
            ...filtered.map(v => this.toLiteral(v)));
    }

    byteaConcat(...values: Statement[]) {
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

    override format(formatStr?: Statement, ...values: Statement[]) {
        if (formatStr === undefined && values.length === 0) {
            return super.format();
        }
        const filtered = values.filter(v => v !== undefined && v !== null);
        return this.pushFunction("FORMAT",
            formatStr === undefined ? undefined : this.toLiteral(formatStr),
            ...filtered.map(v => this.toLiteral(v)));
    }

    initcap(value?: Statement) {
        return this.pushFunction("INITCAP",
            value === undefined ? undefined : this.toLiteral(value));
    }

    casefold(value?: Statement) {
        return this.pushFunction("CASEFOLD",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override left(value?: Statement, count?: Statement) {
        if (value === undefined && count === undefined) {
            return super.left();
        }
        return this.pushFunction("LEFT",
            value === undefined ? undefined : this.toLiteral(value),
            count === undefined ? undefined : this.toLiteral(count));
    }

    override length(value?: Statement, encoding?: Statement) {
        if (value === undefined && encoding === undefined) {
            return super.length();
        }
        return this.pushFunction("LENGTH",
            value === undefined ? undefined : this.toLiteral(value),
            encoding === undefined ? undefined : this.toLiteral(encoding));
    }

    md5(value?: Statement) {
        return this.pushFunction("MD5",
            value === undefined ? undefined : this.toLiteral(value));
    }

    sha224(value?: Statement) {
        return this.pushFunction("SHA224",
            value === undefined ? undefined : this.toLiteral(value));
    }

    sha256(value?: Statement) {
        return this.pushFunction("SHA256",
            value === undefined ? undefined : this.toLiteral(value));
    }

    sha384(value?: Statement) {
        return this.pushFunction("SHA384",
            value === undefined ? undefined : this.toLiteral(value));
    }

    sha512(value?: Statement) {
        return this.pushFunction("SHA512",
            value === undefined ? undefined : this.toLiteral(value));
    }

    parseIdent(value?: Statement, strictMode?: Statement) {
        return this.pushFunction("PARSE_IDENT",
            value === undefined ? undefined : this.toLiteral(value),
            strictMode === undefined ? undefined : this.toLiteral(strictMode));
    }

    pgClientEncoding() {
        return this.pushFunction("PG_CLIENT_ENCODING");
    }

    quoteIdent(value?: Statement) {
        return this.pushFunction("QUOTE_IDENT",
            value === undefined ? undefined : this.toLiteral(value));
    }

    quoteLiteral(value?: Statement) {
        return this.pushFunction("QUOTE_LITERAL",
            value === undefined ? undefined : this.toLiteral(value));
    }

    quoteNullable(value?: Statement) {
        return this.pushFunction("QUOTE_NULLABLE",
            value === undefined ? undefined : this.toLiteral(value));
    }

    regexpCount(
        value?: Statement,
        pattern?: Statement,
        start?: Statement,
        flags?: Statement,
    ) {
        return this.pushFunction("REGEXP_COUNT",
            value === undefined ? undefined : this.toLiteral(value),
            pattern === undefined ? undefined : this.toLiteral(pattern),
            start === undefined ? undefined : this.toLiteral(start),
            flags === undefined ? undefined : this.toLiteral(flags));
    }

    regexpInstr(
        value?: Statement,
        pattern?: Statement,
        start?: Statement,
        occurrence?: Statement,
        endOption?: Statement,
        flags?: Statement,
        subexpr?: Statement,
    ) {
        return this.pushFunction("REGEXP_INSTR",
            value === undefined ? undefined : this.toLiteral(value),
            pattern === undefined ? undefined : this.toLiteral(pattern),
            start === undefined ? undefined : this.toLiteral(start),
            occurrence === undefined ? undefined : this.toLiteral(occurrence),
            endOption === undefined ? undefined : this.toLiteral(endOption),
            flags === undefined ? undefined : this.toLiteral(flags),
            subexpr === undefined ? undefined : this.toLiteral(subexpr));
    }

    regexpLike(value?: Statement, pattern?: Statement, flags?: Statement) {
        return this.pushFunction("REGEXP_LIKE",
            value === undefined ? undefined : this.toLiteral(value),
            pattern === undefined ? undefined : this.toLiteral(pattern),
            flags === undefined ? undefined : this.toLiteral(flags));
    }

    regexpMatch(value?: Statement, pattern?: Statement, flags?: Statement) {
        return this.pushFunction("REGEXP_MATCH",
            value === undefined ? undefined : this.toLiteral(value),
            pattern === undefined ? undefined : this.toLiteral(pattern),
            flags === undefined ? undefined : this.toLiteral(flags));
    }

    regexpMatches(value?: Statement, pattern?: Statement, flags?: Statement) {
        return this.pushFunction("REGEXP_MATCHES",
            value === undefined ? undefined : this.toLiteral(value),
            pattern === undefined ? undefined : this.toLiteral(pattern),
            flags === undefined ? undefined : this.toLiteral(flags));
    }

    regexpReplace(
        value?: Statement,
        pattern?: Statement,
        replacement?: Statement,
        startOrFlags?: Statement,
        occurrence?: Statement,
        flags?: Statement,
    ) {
        if (occurrence === undefined && flags === undefined) {
            return this.pushFunction("REGEXP_REPLACE",
                value === undefined ? undefined : this.toLiteral(value),
                pattern === undefined ? undefined : this.toLiteral(pattern),
                replacement === undefined ? undefined : this.toLiteral(replacement),
                startOrFlags === undefined ? undefined : this.toLiteral(startOrFlags));
        }
        return this.pushFunction("REGEXP_REPLACE",
            value === undefined ? undefined : this.toLiteral(value),
            pattern === undefined ? undefined : this.toLiteral(pattern),
            replacement === undefined ? undefined : this.toLiteral(replacement),
            startOrFlags === undefined ? undefined : this.toLiteral(startOrFlags),
            occurrence === undefined ? undefined : this.toLiteral(occurrence),
            flags === undefined ? undefined : this.toLiteral(flags));
    }

    regexpSplitToArray(value?: Statement, pattern?: Statement, flags?: Statement) {
        return this.pushFunction("REGEXP_SPLIT_TO_ARRAY",
            value === undefined ? undefined : this.toLiteral(value),
            pattern === undefined ? undefined : this.toLiteral(pattern),
            flags === undefined ? undefined : this.toLiteral(flags));
    }

    regexpSplitToTable(value?: Statement, pattern?: Statement, flags?: Statement) {
        return this.pushFunction("REGEXP_SPLIT_TO_TABLE",
            value === undefined ? undefined : this.toLiteral(value),
            pattern === undefined ? undefined : this.toLiteral(pattern),
            flags === undefined ? undefined : this.toLiteral(flags));
    }

    regexpSubstr(
        value?: Statement,
        pattern?: Statement,
        start?: Statement,
        occurrence?: Statement,
        flags?: Statement,
        subexpr?: Statement,
    ) {
        return this.pushFunction("REGEXP_SUBSTR",
            value === undefined ? undefined : this.toLiteral(value),
            pattern === undefined ? undefined : this.toLiteral(pattern),
            start === undefined ? undefined : this.toLiteral(start),
            occurrence === undefined ? undefined : this.toLiteral(occurrence),
            flags === undefined ? undefined : this.toLiteral(flags),
            subexpr === undefined ? undefined : this.toLiteral(subexpr));
    }

    repeat(value?: Statement, count?: Statement) {
        return this.pushFunction("REPEAT",
            value === undefined ? undefined : this.toLiteral(value),
            count === undefined ? undefined : this.toLiteral(count));
    }

    override replace(value?: Statement, from?: Statement, to?: Statement) {
        if (value === undefined && from === undefined && to === undefined) {
            return super.replace();
        }
        return this.pushFunction("REPLACE",
            value === undefined ? undefined : this.toLiteral(value),
            from === undefined ? undefined : this.toLiteral(from),
            to === undefined ? undefined : this.toLiteral(to));
    }

    reverse(value?: Statement) {
        return this.pushFunction("REVERSE",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override right(value?: Statement, count?: Statement) {
        if (value === undefined && count === undefined) {
            return super.right();
        }
        return this.pushFunction("RIGHT",
            value === undefined ? undefined : this.toLiteral(value),
            count === undefined ? undefined : this.toLiteral(count));
    }

    splitPart(value?: Statement, delimiter?: Statement, index?: Statement) {
        return this.pushFunction("SPLIT_PART",
            value === undefined ? undefined : this.toLiteral(value),
            delimiter === undefined ? undefined : this.toLiteral(delimiter),
            index === undefined ? undefined : this.toLiteral(index));
    }

    startsWith(value?: Statement, prefix?: Statement) {
        return this.pushFunction("STARTS_WITH",
            value === undefined ? undefined : this.toLiteral(value),
            prefix === undefined ? undefined : this.toLiteral(prefix));
    }

    stringToArray(value?: Statement, delimiter?: Statement, nullString?: Statement) {
        return this.pushFunction("STRING_TO_ARRAY",
            value === undefined ? undefined : this.toLiteral(value),
            delimiter === undefined ? undefined : this.toLiteral(delimiter),
            nullString === undefined ? undefined : this.toLiteral(nullString));
    }

    stringToTable(value?: Statement, delimiter?: Statement, nullString?: Statement) {
        return this.pushFunction("STRING_TO_TABLE",
            value === undefined ? undefined : this.toLiteral(value),
            delimiter === undefined ? undefined : this.toLiteral(delimiter),
            nullString === undefined ? undefined : this.toLiteral(nullString));
    }

    strpos(value?: Statement, substring?: Statement) {
        return this.pushFunction("STRPOS",
            value === undefined ? undefined : this.toLiteral(value),
            substring === undefined ? undefined : this.toLiteral(substring));
    }

    substr(value?: Statement, start?: Statement, count?: Statement) {
        return this.pushFunction("SUBSTR",
            value === undefined ? undefined : this.toLiteral(value),
            start === undefined ? undefined : this.toLiteral(start),
            count === undefined ? undefined : this.toLiteral(count));
    }

    toAscii(value?: Statement, encoding?: Statement) {
        return this.pushFunction("TO_ASCII",
            value === undefined ? undefined : this.toLiteral(value),
            encoding === undefined ? undefined : this.toLiteral(encoding));
    }

    toBin(value?: Statement) {
        return this.pushFunction("TO_BIN",
            value === undefined ? undefined : this.toLiteral(value));
    }

    toHex(value?: Statement) {
        return this.pushFunction("TO_HEX",
            value === undefined ? undefined : this.toLiteral(value));
    }

    toOct(value?: Statement) {
        return this.pushFunction("TO_OCT",
            value === undefined ? undefined : this.toLiteral(value));
    }

    override translate(value?: Statement, from?: Statement, to?: Statement) {
        if (value === undefined && from === undefined && to === undefined) {
            return super.translate();
        }
        return this.pushFunction("TRANSLATE",
            value === undefined ? undefined : this.toLiteral(value),
            from === undefined ? undefined : this.toLiteral(from),
            to === undefined ? undefined : this.toLiteral(to));
    }

    unistr(value?: Statement) {
        return this.pushFunction("UNISTR",
            value === undefined ? undefined : this.toLiteral(value));
    }
}
