import { JSONFunctionBuilder } from "./override-json-functions";
import type { Statement } from "../../types";

export class StringFunctionBuilder extends JSONFunctionBuilder {
    override btrim(value?: Statement, characters?: Statement) {
        return this.pushFunction("BTRIM",
            value,
            characters);
    }

    override bitLength(value?: Statement) {
        return this.pushFunction("BIT_LENGTH",
            value);
    }

    bitCount(value?: Statement) {
        return this.pushFunction("BIT_COUNT",
            value);
    }

    crc32(value?: Statement) {
        return this.pushFunction("CRC32",
            value);
    }

    crc32c(value?: Statement) {
        return this.pushFunction("CRC32C",
            value);
    }

    getBit(value?: Statement, index?: Statement) {
        return this.pushFunction("GET_BIT",
            value,
            index);
    }

    setBit(value?: Statement, index?: Statement, newValue?: Statement) {
        return this.pushFunction("SET_BIT",
            value,
            index,
            newValue);
    }

    override charLength(value?: Statement) {
        return this.pushFunction("CHAR_LENGTH",
            value);
    }

    override characterLength(value?: Statement) {
        return this.pushFunction("CHARACTER_LENGTH",
            value);
    }

    override lower(value?: Statement) {
        return this.pushFunction("LOWER",
            value);
    }

    override lpad(value?: Statement, length?: Statement, fill?: Statement) {
        return this.pushFunction("LPAD",
            value,
            length,
            fill);
    }

    override ltrim(value?: Statement, characters?: Statement) {
        return this.pushFunction("LTRIM",
            value,
            characters);
    }

    override normalize(value?: Statement, form?: Statement) {
        return this.pushFunction("NORMALIZE",
            value,
            form);
    }

    override octetLength(value?: Statement) {
        return this.pushFunction("OCTET_LENGTH",
            value);
    }

    getByte(value?: Statement, offset?: Statement) {
        return this.pushFunction("GET_BYTE",
            value,
            offset);
    }

    setByte(value?: Statement, offset?: Statement, newValue?: Statement) {
        return this.pushFunction("SET_BYTE",
            value,
            offset,
            newValue);
    }

    encode(value?: Statement, format?: Statement) {
        return this.pushFunction("ENCODE",
            value,
            format);
    }

    decode(value?: Statement, format?: Statement) {
        return this.pushFunction("DECODE",
            value,
            format);
    }

    override convert(value?: Statement, srcEncoding?: Statement, destEncoding?: Statement) {
        return this.pushFunction("CONVERT",
            value,
            srcEncoding,
            destEncoding);
    }

    convertFrom(value?: Statement, srcEncoding?: Statement) {
        return this.pushFunction("CONVERT_FROM",
            value,
            srcEncoding);
    }

    convertTo(value?: Statement, destEncoding?: Statement) {
        return this.pushFunction("CONVERT_TO",
            value,
            destEncoding);
    }

    override overlay(
        value?: Statement,
        newSubstring?: Statement,
        start?: Statement,
        count?: Statement,
    ) {
        return this.pushFunction("OVERLAY",
            value,
            newSubstring,
            start,
            count);
    }

    override position(substring?: Statement, value?: Statement) {
        return this.pushFunction("POSITION",
            substring,
            value);
    }

    override rpad(value?: Statement, length?: Statement, fill?: Statement) {
        return this.pushFunction("RPAD",
            value,
            length,
            fill);
    }

    override rtrim(value?: Statement, characters?: Statement) {
        return this.pushFunction("RTRIM",
            value,
            characters);
    }

    override substring(value?: Statement, startOrPattern?: Statement, countOrEscape?: Statement) {
        return this.pushFunction("SUBSTRING",
            value,
            startOrPattern,
            countOrEscape);
    }

    override trim(value?: Statement, characters?: Statement) {
        return this.pushFunction("TRIM",
            value,
            characters);
    }

    unicodeAssigned(value?: Statement) {
        return this.pushFunction("UNICODE_ASSIGNED",
            value);
    }

    override upper(value?: Statement) {
        return this.pushFunction("UPPER",
            value);
    }

    ascii(value?: Statement) {
        return this.pushFunction("ASCII",
            value);
    }

    chr(value?: Statement) {
        return this.pushFunction("CHR",
            value);
    }

    concat(...values: Statement[]) {
        return this.pushFunction("CONCAT",
            ...values);
    }

    concatWs(separator?: Statement, ...values: Statement[]) {
        return this.pushFunction("CONCAT_WS",
            separator,
            ...values);
    }

    byteaConcat(...values: Statement[]) {
        const resolvedValues = values
            .map((value) => this.resolveStatement(value))
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
        return this.pushFunction("FORMAT",
            formatStr,
            ...values);
    }

    initcap(value?: Statement) {
        return this.pushFunction("INITCAP",
            value);
    }

    casefold(value?: Statement) {
        return this.pushFunction("CASEFOLD",
            value);
    }

    override left(value?: Statement, count?: Statement) {
        if (value === undefined && count === undefined) {
            return super.left();
        }
        return this.pushFunction("LEFT",
            value,
            count);
    }

    override length(value?: Statement, encoding?: Statement) {
        if (value === undefined && encoding === undefined) {
            return super.length();
        }
        return this.pushFunction("LENGTH",
            value,
            encoding);
    }

    md5(value?: Statement) {
        return this.pushFunction("MD5",
            value);
    }

    sha224(value?: Statement) {
        return this.pushFunction("SHA224",
            value);
    }

    sha256(value?: Statement) {
        return this.pushFunction("SHA256",
            value);
    }

    sha384(value?: Statement) {
        return this.pushFunction("SHA384",
            value);
    }

    sha512(value?: Statement) {
        return this.pushFunction("SHA512",
            value);
    }

    parseIdent(value?: Statement, strictMode?: Statement) {
        return this.pushFunction("PARSE_IDENT",
            value,
            strictMode);
    }

    pgClientEncoding() {
        return this.pushFunction("PG_CLIENT_ENCODING");
    }

    quoteIdent(value?: Statement) {
        return this.pushFunction("QUOTE_IDENT",
            value);
    }

    quoteLiteral(value?: Statement) {
        return this.pushFunction("QUOTE_LITERAL",
            value);
    }

    quoteNullable(value?: Statement) {
        return this.pushFunction("QUOTE_NULLABLE",
            value);
    }

    regexpCount(
        value?: Statement,
        pattern?: Statement,
        start?: Statement,
        flags?: Statement,
    ) {
        return this.pushFunction("REGEXP_COUNT",
            value,
            pattern,
            start,
            flags);
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
            value,
            pattern,
            start,
            occurrence,
            endOption,
            flags,
            subexpr);
    }

    regexpLike(value?: Statement, pattern?: Statement, flags?: Statement) {
        return this.pushFunction("REGEXP_LIKE",
            value,
            pattern,
            flags);
    }

    regexpMatch(value?: Statement, pattern?: Statement, flags?: Statement) {
        return this.pushFunction("REGEXP_MATCH",
            value,
            pattern,
            flags);
    }

    regexpMatches(value?: Statement, pattern?: Statement, flags?: Statement) {
        return this.pushFunction("REGEXP_MATCHES",
            value,
            pattern,
            flags);
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
                value,
                pattern,
                replacement,
                startOrFlags);
        }
        return this.pushFunction("REGEXP_REPLACE",
            value,
            pattern,
            replacement,
            startOrFlags,
            occurrence,
            flags);
    }

    regexpSplitToArray(value?: Statement, pattern?: Statement, flags?: Statement) {
        return this.pushFunction("REGEXP_SPLIT_TO_ARRAY",
            value,
            pattern,
            flags);
    }

    regexpSplitToTable(value?: Statement, pattern?: Statement, flags?: Statement) {
        return this.pushFunction("REGEXP_SPLIT_TO_TABLE",
            value,
            pattern,
            flags);
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
            value,
            pattern,
            start,
            occurrence,
            flags,
            subexpr);
    }

    repeat(value?: Statement, count?: Statement) {
        return this.pushFunction("REPEAT",
            value,
            count);
    }

    override replace(value?: Statement, from?: Statement, to?: Statement) {
        if (value === undefined && from === undefined && to === undefined) {
            return super.replace();
        }
        return this.pushFunction("REPLACE",
            value,
            from,
            to);
    }

    reverse(value?: Statement) {
        return this.pushFunction("REVERSE",
            value);
    }

    override right(value?: Statement, count?: Statement) {
        if (value === undefined && count === undefined) {
            return super.right();
        }
        return this.pushFunction("RIGHT",
            value,
            count);
    }

    splitPart(value?: Statement, delimiter?: Statement, index?: Statement) {
        return this.pushFunction("SPLIT_PART",
            value,
            delimiter,
            index);
    }

    startsWith(value?: Statement, prefix?: Statement) {
        return this.pushFunction("STARTS_WITH",
            value,
            prefix);
    }

    stringToArray(value?: Statement, delimiter?: Statement, nullString?: Statement) {
        return this.pushFunction("STRING_TO_ARRAY",
            value,
            delimiter,
            nullString);
    }

    stringToTable(value?: Statement, delimiter?: Statement, nullString?: Statement) {
        return this.pushFunction("STRING_TO_TABLE",
            value,
            delimiter,
            nullString);
    }

    strpos(value?: Statement, substring?: Statement) {
        return this.pushFunction("STRPOS",
            value,
            substring);
    }

    substr(value?: Statement, start?: Statement, count?: Statement) {
        return this.pushFunction("SUBSTR",
            value,
            start,
            count);
    }

    toAscii(value?: Statement, encoding?: Statement) {
        return this.pushFunction("TO_ASCII",
            value,
            encoding);
    }

    toBin(value?: Statement) {
        return this.pushFunction("TO_BIN",
            value);
    }

    toHex(value?: Statement) {
        return this.pushFunction("TO_HEX",
            value);
    }

    toOct(value?: Statement) {
        return this.pushFunction("TO_OCT",
            value);
    }

    override translate(value?: Statement, from?: Statement, to?: Statement) {
        if (value === undefined && from === undefined && to === undefined) {
            return super.translate();
        }
        return this.pushFunction("TRANSLATE",
            value,
            from,
            to);
    }

    unistr(value?: Statement) {
        return this.pushFunction("UNISTR",
            value);
    }
}
