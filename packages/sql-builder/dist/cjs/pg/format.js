"use strict";
/*
 * Browser-safe port of node-pg-format (MIT)
 * Source: https://github.com/cphillips/node-pg-format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteIdent = quoteIdent;
exports.quoteLiteral = quoteLiteral;
exports.quoteString = quoteString;
exports.config = config;
exports.formatWithArray = formatWithArray;
exports.format = format;
const fmtPattern = {
    ident: "I",
    literal: "L",
    string: "s",
};
// PostgreSQL reserved words (copied from node-pg-format reserved.js)
const RESERVED_WORDS = {
    AES128: true,
    AES256: true,
    ALL: true,
    ALLOWOVERWRITE: true,
    ANALYSE: true,
    ANALYZE: true,
    AND: true,
    ANY: true,
    ARRAY: true,
    AS: true,
    ASC: true,
    ASYMMETRIC: true,
    AUTHORIZATION: true,
    BACKUP: true,
    BETWEEN: true,
    BINARY: true,
    BLANKSASNULL: true,
    BOTH: true,
    BYTEDICT: true,
    CASE: true,
    CAST: true,
    CHECK: true,
    COLLATE: true,
    COLUMN: true,
    CONSTRAINT: true,
    CREATE: true,
    CREDENTIALS: true,
    CROSS: true,
    CURRENT_CATALOG: true,
    CURRENT_DATE: true,
    CURRENT_ROLE: true,
    CURRENT_TIME: true,
    CURRENT_TIMESTAMP: true,
    CURRENT_USER: true,
    CURRENT_USER_ID: true,
    DEFAULT: true,
    DEFERRABLE: true,
    DEFLATE: true,
    DEFRAG: true,
    DELTA: true,
    DELTA32K: true,
    DESC: true,
    DISABLE: true,
    DISTINCT: true,
    DO: true,
    ELSE: true,
    EMPTYASNULL: true,
    ENABLE: true,
    ENCODE: true,
    ENCRYPT: true,
    ENCRYPTION: true,
    END: true,
    EXCEPT: true,
    EXPLICIT: true,
    FALSE: true,
    FETCH: true,
    FOR: true,
    FOREIGN: true,
    FREEZE: true,
    FROM: true,
    FULL: true,
    GLOBALDICT256: true,
    GLOBALDICT64K: true,
    GRANT: true,
    GROUP: true,
    GZIP: true,
    HAVING: true,
    IDENTITY: true,
    IGNORE: true,
    ILIKE: true,
    IN: true,
    INITIALLY: true,
    INNER: true,
    INTERSECT: true,
    INTO: true,
    IS: true,
    ISNULL: true,
    JOIN: true,
    LATERAL: true,
    LEADING: true,
    LEFT: true,
    LIKE: true,
    LIMIT: true,
    LOCALTIME: true,
    LOCALTIMESTAMP: true,
    LUN: true,
    LUNS: true,
    LZO: true,
    LZOP: true,
    MINUS: true,
    MOSTLY13: true,
    MOSTLY32: true,
    MOSTLY8: true,
    NATURAL: true,
    NEW: true,
    NOT: true,
    NOTNULL: true,
    NULL: true,
    NULLS: true,
    OFF: true,
    OFFLINE: true,
    OFFSET: true,
    OLD: true,
    ON: true,
    ONLY: true,
    OPEN: true,
    OR: true,
    ORDER: true,
    OUTER: true,
    OVERLAPS: true,
    PARALLEL: true,
    PARTITION: true,
    PERCENT: true,
    PLACING: true,
    PRIMARY: true,
    RAW: true,
    READRATIO: true,
    RECOVER: true,
    REFERENCES: true,
    REJECTLOG: true,
    RESORT: true,
    RESTORE: true,
    RETURNING: true,
    RIGHT: true,
    SELECT: true,
    SESSION_USER: true,
    SIMILAR: true,
    SOME: true,
    SYMMETRIC: true,
    SYSDATE: true,
    SYSTEM: true,
    TABLE: true,
    TAG: true,
    TDES: true,
    TEXT255: true,
    TEXT32K: true,
    THEN: true,
    TO: true,
    TOP: true,
    TRAILING: true,
    TRUE: true,
    TRUNCATECOLUMNS: true,
    UNION: true,
    UNIQUE: true,
    USER: true,
    USING: true,
    VARIADIC: true,
    VERBOSE: true,
    WALLET: true,
    WHEN: true,
    WHERE: true,
    WINDOW: true,
    WITH: true,
    WITHOUT: true,
};
function formatDate(value) {
    return value.replace("T", " ").replace("Z", "+00");
}
function isReserved(value) {
    return Boolean(RESERVED_WORDS[value.toUpperCase()]);
}
function arrayToList(useSpace, array, formatter) {
    let sql = "";
    sql += useSpace ? " (" : "(";
    for (let i = 0; i < array.length; i += 1) {
        sql += (i === 0 ? "" : ", ") + formatter(array[i]);
    }
    sql += ")";
    return sql;
}
function isBinary(value) {
    return typeof Uint8Array !== "undefined" && value instanceof Uint8Array;
}
function toHex(bytes) {
    let result = "";
    for (let i = 0; i < bytes.length; i += 1) {
        result += bytes[i].toString(16).padStart(2, "0");
    }
    return result;
}
function quoteIdent(value) {
    if (value === undefined || value === null) {
        throw new Error("SQL identifier cannot be null or undefined");
    }
    if (value === false) {
        return '"f"';
    }
    if (value === true) {
        return '"t"';
    }
    if (value instanceof Date) {
        return '"' + formatDate(value.toISOString()) + '"';
    }
    if (isBinary(value)) {
        throw new Error("SQL identifier cannot be a buffer");
    }
    if (Array.isArray(value)) {
        const temp = [];
        for (let i = 0; i < value.length; i += 1) {
            if (Array.isArray(value[i])) {
                throw new Error("Nested array to grouped list conversion is not supported for SQL identifier");
            }
            temp.push(quoteIdent(value[i]));
        }
        return temp.toString();
    }
    if (value === Object(value)) {
        throw new Error("SQL identifier cannot be an object");
    }
    const ident = value.toString().slice(0);
    if (/^[a-z_][a-z0-9_$.]*$/.test(ident) && isReserved(ident) === false) {
        // cek jika ada titik maka harus di quote
        const parts = ident.split(".");
        if (parts.length > 1) {
            return parts.map((part) => quoteIdent(part)).join(".");
        }
        // return ident;
    }
    let quoted = '"';
    for (let i = 0; i < ident.length; i += 1) {
        const c = ident[i];
        quoted += c === '"' ? c + c : c;
    }
    quoted += '"';
    return quoted;
}
function quoteLiteral(value) {
    let literal = "";
    let explicitCast = null;
    if (value === undefined || value === null) {
        return "NULL";
    }
    if (typeof value === "bigint") {
        return BigInt(value).toString();
    }
    if (value === Number.POSITIVE_INFINITY) {
        return "'Infinity'";
    }
    if (value === Number.NEGATIVE_INFINITY) {
        return "'-Infinity'";
    }
    if (Number.isNaN(value)) {
        return "'NaN'";
    }
    if (typeof value === "number") {
        return Number(value).toString();
    }
    if (value === false) {
        return "'f'";
    }
    if (value === true) {
        return "'t'";
    }
    if (value instanceof Date) {
        return "'" + formatDate(value.toISOString()) + "'";
    }
    if (isBinary(value)) {
        return "E'\\x" + toHex(value) + "'";
    }
    if (Array.isArray(value)) {
        const temp = [];
        for (let i = 0; i < value.length; i += 1) {
            if (Array.isArray(value[i])) {
                temp.push(arrayToList(i !== 0, value[i], quoteLiteral));
            }
            else {
                temp.push(quoteLiteral(value[i]));
            }
        }
        return temp.toString();
    }
    if (value === Object(value)) {
        explicitCast = "jsonb";
        literal = JSON.stringify(value);
    }
    else {
        literal = value.toString().slice(0);
    }
    let hasBackslash = false;
    let quoted = "'";
    for (let i = 0; i < literal.length; i += 1) {
        const c = literal[i];
        if (c === "'") {
            quoted += c + c;
        }
        else if (c === "\\") {
            quoted += c + c;
            hasBackslash = true;
        }
        else {
            quoted += c;
        }
    }
    quoted += "'";
    if (hasBackslash) {
        quoted = "E" + quoted;
    }
    if (explicitCast) {
        quoted += "::" + explicitCast;
    }
    return quoted;
}
function quoteString(value) {
    if (value === undefined || value === null) {
        return "";
    }
    if (value === false) {
        return "f";
    }
    if (value === true) {
        return "t";
    }
    if (value instanceof Date) {
        return formatDate(value.toISOString());
    }
    if (isBinary(value)) {
        return "\\x" + toHex(value);
    }
    if (Array.isArray(value)) {
        const temp = [];
        for (let i = 0; i < value.length; i += 1) {
            if (value[i] !== null && value[i] !== undefined) {
                if (Array.isArray(value[i])) {
                    temp.push(arrayToList(i !== 0, value[i], quoteString));
                }
                else {
                    temp.push(quoteString(value[i]));
                }
            }
        }
        return temp.toString();
    }
    if (value === Object(value)) {
        return JSON.stringify(value);
    }
    return value.toString().slice(0);
}
function config(cfg) {
    fmtPattern.ident = "I";
    fmtPattern.literal = "L";
    fmtPattern.string = "s";
    if (cfg?.pattern) {
        if (cfg.pattern.ident) {
            fmtPattern.ident = cfg.pattern.ident;
        }
        if (cfg.pattern.literal) {
            fmtPattern.literal = cfg.pattern.literal;
        }
        if (cfg.pattern.string) {
            fmtPattern.string = cfg.pattern.string;
        }
    }
}
function formatWithArray(fmt, parameters) {
    let index = 0;
    let params = parameters;
    let reText = "%(%|(\\d+\\$)?[";
    reText += fmtPattern.ident;
    reText += fmtPattern.literal;
    reText += fmtPattern.string;
    reText += "])";
    const re = new RegExp(reText, "g");
    return fmt.replace(re, (_, type) => {
        if (type === "%") {
            return "%";
        }
        let position = index;
        const tokens = type.split("$");
        if (tokens.length > 1) {
            position = parseInt(tokens[0], 10) - 1;
            type = tokens[1];
        }
        if (position < 0) {
            throw new Error("specified argument 0 but arguments start at 1");
        }
        if (position > params.length - 1) {
            throw new Error("too few arguments");
        }
        index = position + 1;
        if (type === fmtPattern.ident) {
            return quoteIdent(params[position]);
        }
        if (type === fmtPattern.literal) {
            return quoteLiteral(params[position]);
        }
        if (type === fmtPattern.string) {
            return quoteString(params[position]);
        }
        return "";
    });
}
function format(fmt, ...args) {
    return formatWithArray(fmt, args);
}
exports.default = {
    config,
    format,
    formatWithArray,
    quoteIdent,
    quoteLiteral,
    quoteString,
};
