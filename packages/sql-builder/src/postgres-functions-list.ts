export type PGFunction = {
    name: string;
    args: {
        name: string;
        variadic?: boolean;
    }[];
    format: "COERCE_EXPLICIT_CALL" | "COERCE_EXPLICIT_CAST"
}
const pgFunctionList:PGFunction[] = [
    // ==================== Mathematical Functions ====================
    { name: "ABS", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CBRT", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CEIL", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CEILING", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DEGREES", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DIV", args: [{ name: "y" }, { name: "x" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ERF", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ERFC", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "EXP", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "FACTORIAL", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "FLOOR", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "GAMMA", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "GCD", args: [{ name: "y" }, { name: "x" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LCM", args: [{ name: "y" }, { name: "x" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LGAMMA", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LN", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LOG", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LOG", args: [{ name: "base" }, { name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LOG10", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MIN_SCALE", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MOD", args: [{ name: "y" }, { name: "x" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PI", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "POWER", args: [{ name: "a" }, { name: "b" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "RADIANS", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ROUND", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ROUND", args: [{ name: "value" }, { name: "decimals" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SCALE", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SIGN", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SQRT", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TRIM_SCALE", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TRUNC", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TRUNC", args: [{ name: "value" }, { name: "decimals" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "WIDTH_BUCKET", args: [{ name: "operand" }, { name: "low" }, { name: "high" }, { name: "count" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "WIDTH_BUCKET", args: [{ name: "operand" }, { name: "thresholds", variadic: true }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Trigonometric Functions ====================
    { name: "ACOS", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ACOSD", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ASIN", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ASIND", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ATAN", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ATAND", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ATAN2", args: [{ name: "y" }, { name: "x" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ATAN2D", args: [{ name: "y" }, { name: "x" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "COS", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "COSD", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "COT", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "COTD", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SIN", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SIND", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TAN", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TAND", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Hyperbolic Functions ====================
    { name: "SINH", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "COSH", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TANH", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ASINH", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ACOSH", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ATANH", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Random Functions ====================
    { name: "RANDOM", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "RANDOM", args: [{ name: "min" }, { name: "max" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "RANDOM", args: [{ name: "min" }, { name: "max" }, { name: "numeric" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "RANDOM_NORMAL", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "RANDOM_NORMAL", args: [{ name: "mean" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "RANDOM_NORMAL", args: [{ name: "mean" }, { name: "stddev" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SETSEED", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== String Functions ====================
    
    // String Length & Encoding Functions
    { name: "BIT_LENGTH", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CHAR_LENGTH", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CHARACTER_LENGTH", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LENGTH", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "OCTET_LENGTH", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PG_CLIENT_ENCODING", args: [], format: "COERCE_EXPLICIT_CALL" },
    
    // String Case Functions
    { name: "UPPER", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LOWER", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "INITCAP", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CASEFOLD", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    
    // String Padding & Trimming Functions
    { name: "LPAD", args: [{ name: "string" }, { name: "length" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LPAD", args: [{ name: "string" }, { name: "length" }, { name: "fill" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "RPAD", args: [{ name: "string" }, { name: "length" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "RPAD", args: [{ name: "string" }, { name: "length" }, { name: "fill" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LTRIM", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LTRIM", args: [{ name: "string" }, { name: "characters" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "RTRIM", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "RTRIM", args: [{ name: "string" }, { name: "characters" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "BTRIM", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "BTRIM", args: [{ name: "string" }, { name: "characters" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TRIM", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TRIM", args: [{ name: "characters" }, { name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    
    // String Search & Position Functions
    { name: "POSITION", args: [{ name: "substring" }, { name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "STRPOS", args: [{ name: "string" }, { name: "substring" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "STARTS_WITH", args: [{ name: "string" }, { name: "prefix" }], format: "COERCE_EXPLICIT_CALL" },
    
    // String Substring & Extraction Functions
    { name: "SUBSTRING", args: [{ name: "string" }, { name: "start" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SUBSTRING", args: [{ name: "string" }, { name: "start" }, { name: "count" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SUBSTRING", args: [{ name: "string" }, { name: "pattern" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SUBSTRING", args: [{ name: "string" }, { name: "pattern" }, { name: "escape" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SUBSTR", args: [{ name: "string" }, { name: "start" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SUBSTR", args: [{ name: "string" }, { name: "start" }, { name: "count" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LEFT", args: [{ name: "string" }, { name: "n" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "RIGHT", args: [{ name: "string" }, { name: "n" }], format: "COERCE_EXPLICIT_CALL" },
    
    // String Transformation Functions
    { name: "REVERSE", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REPLACE", args: [{ name: "string" }, { name: "from" }, { name: "to" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REPEAT", args: [{ name: "string" }, { name: "number" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TRANSLATE", args: [{ name: "string" }, { name: "from" }, { name: "to" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "OVERLAY", args: [{ name: "string" }, { name: "newsubstring" }, { name: "start" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "OVERLAY", args: [{ name: "string" }, { name: "newsubstring" }, { name: "start" }, { name: "count" }], format: "COERCE_EXPLICIT_CALL" },
    
    // String Concatenation Functions
    { name: "CONCAT", args: [{ name: "val1", variadic: true }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CONCAT_WS", args: [{ name: "sep" }, { name: "val1", variadic: true }], format: "COERCE_EXPLICIT_CALL" },
    { name: "FORMAT", args: [{ name: "formatstr" }, { name: "formatarg", variadic: true }], format: "COERCE_EXPLICIT_CALL" },
    
    // Regular Expression Functions
    { name: "REGEXP_COUNT", args: [{ name: "string" }, { name: "pattern" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_COUNT", args: [{ name: "string" }, { name: "pattern" }, { name: "start" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_COUNT", args: [{ name: "string" }, { name: "pattern" }, { name: "start" }, { name: "flags" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_INSTR", args: [{ name: "string" }, { name: "pattern" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_INSTR", args: [{ name: "string" }, { name: "pattern" }, { name: "start" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_INSTR", args: [{ name: "string" }, { name: "pattern" }, { name: "start" }, { name: "n" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_INSTR", args: [{ name: "string" }, { name: "pattern" }, { name: "start" }, { name: "n" }, { name: "endoption" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_INSTR", args: [{ name: "string" }, { name: "pattern" }, { name: "start" }, { name: "n" }, { name: "endoption" }, { name: "flags" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_INSTR", args: [{ name: "string" }, { name: "pattern" }, { name: "start" }, { name: "n" }, { name: "endoption" }, { name: "flags" }, { name: "subexpr" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_LIKE", args: [{ name: "string" }, { name: "pattern" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_LIKE", args: [{ name: "string" }, { name: "pattern" }, { name: "flags" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_MATCH", args: [{ name: "string" }, { name: "pattern" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_MATCH", args: [{ name: "string" }, { name: "pattern" }, { name: "flags" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_MATCHES", args: [{ name: "string" }, { name: "pattern" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_MATCHES", args: [{ name: "string" }, { name: "pattern" }, { name: "flags" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_REPLACE", args: [{ name: "string" }, { name: "pattern" }, { name: "replacement" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_REPLACE", args: [{ name: "string" }, { name: "pattern" }, { name: "replacement" }, { name: "flags" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_REPLACE", args: [{ name: "string" }, { name: "pattern" }, { name: "replacement" }, { name: "start" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_REPLACE", args: [{ name: "string" }, { name: "pattern" }, { name: "replacement" }, { name: "start" }, { name: "n" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_REPLACE", args: [{ name: "string" }, { name: "pattern" }, { name: "replacement" }, { name: "start" }, { name: "n" }, { name: "flags" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_SPLIT_TO_ARRAY", args: [{ name: "string" }, { name: "pattern" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_SPLIT_TO_ARRAY", args: [{ name: "string" }, { name: "pattern" }, { name: "flags" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_SPLIT_TO_TABLE", args: [{ name: "string" }, { name: "pattern" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_SPLIT_TO_TABLE", args: [{ name: "string" }, { name: "pattern" }, { name: "flags" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_SUBSTR", args: [{ name: "string" }, { name: "pattern" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_SUBSTR", args: [{ name: "string" }, { name: "pattern" }, { name: "start" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_SUBSTR", args: [{ name: "string" }, { name: "pattern" }, { name: "start" }, { name: "n" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_SUBSTR", args: [{ name: "string" }, { name: "pattern" }, { name: "start" }, { name: "n" }, { name: "flags" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "REGEXP_SUBSTR", args: [{ name: "string" }, { name: "pattern" }, { name: "start" }, { name: "n" }, { name: "flags" }, { name: "subexpr" }], format: "COERCE_EXPLICIT_CALL" },
    
    // String Splitting Functions
    { name: "SPLIT_PART", args: [{ name: "string" }, { name: "delimiter" }, { name: "n" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "STRING_TO_ARRAY", args: [{ name: "string" }, { name: "delimiter" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "STRING_TO_ARRAY", args: [{ name: "string" }, { name: "delimiter" }, { name: "null_string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "STRING_TO_TABLE", args: [{ name: "string" }, { name: "delimiter" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "STRING_TO_TABLE", args: [{ name: "string" }, { name: "delimiter" }, { name: "null_string" }], format: "COERCE_EXPLICIT_CALL" },
    
    // String Conversion Functions
    { name: "ASCII", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CHR", args: [{ name: "integer" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_ASCII", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_ASCII", args: [{ name: "string" }, { name: "encoding" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_HEX", args: [{ name: "integer" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_BIN", args: [{ name: "integer" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_OCT", args: [{ name: "integer" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ENCODE", args: [{ name: "data" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DECODE", args: [{ name: "string" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    
    // Other String Functions
    { name: "MD5", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PARSE_IDENT", args: [{ name: "qualified_identifier" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PARSE_IDENT", args: [{ name: "qualified_identifier" }, { name: "strict_mode" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "QUOTE_IDENT", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "QUOTE_LITERAL", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "QUOTE_NULLABLE", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "UNISTR", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "NORMALIZE", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "NORMALIZE", args: [{ name: "string" }, { name: "form" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "UNICODE_ASSIGNED", args: [{ name: "string" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Binary String Functions ====================
    
    // Binary String Length Functions
    { name: "BIT_COUNT", args: [{ name: "bytes" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LENGTH", args: [{ name: "bytes" }, { name: "encoding" }], format: "COERCE_EXPLICIT_CALL" },
    
    // Binary String Get/Set Functions
    { name: "GET_BIT", args: [{ name: "bytes" }, { name: "n" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "GET_BYTE", args: [{ name: "bytes" }, { name: "n" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SET_BIT", args: [{ name: "bytes" }, { name: "n" }, { name: "newvalue" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SET_BYTE", args: [{ name: "bytes" }, { name: "n" }, { name: "newvalue" }], format: "COERCE_EXPLICIT_CALL" },
    
    // Binary String Hash Functions
    { name: "CRC32", args: [{ name: "bytes" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CRC32C", args: [{ name: "bytes" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SHA224", args: [{ name: "bytes" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SHA256", args: [{ name: "bytes" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SHA384", args: [{ name: "bytes" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SHA512", args: [{ name: "bytes" }], format: "COERCE_EXPLICIT_CALL" },
    
    // Binary String Conversion Functions
    { name: "CONVERT", args: [{ name: "bytes" }, { name: "src_encoding" }, { name: "dest_encoding" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CONVERT_FROM", args: [{ name: "bytes" }, { name: "src_encoding" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CONVERT_TO", args: [{ name: "string" }, { name: "dest_encoding" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Bit String Functions ====================
    
    // Bit String Length Functions
    { name: "BIT_COUNT", args: [{ name: "bits" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "BIT_LENGTH", args: [{ name: "bits" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LENGTH", args: [{ name: "bits" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "OCTET_LENGTH", args: [{ name: "bits" }], format: "COERCE_EXPLICIT_CALL" },
    
    // Bit String Get/Set Functions
    { name: "GET_BIT", args: [{ name: "bits" }, { name: "n" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SET_BIT", args: [{ name: "bits" }, { name: "n" }, { name: "newvalue" }], format: "COERCE_EXPLICIT_CALL" },
    
    // Bit String Manipulation Functions
    { name: "OVERLAY", args: [{ name: "bits" }, { name: "newsubstring" }, { name: "start" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "OVERLAY", args: [{ name: "bits" }, { name: "newsubstring" }, { name: "start" }, { name: "count" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "POSITION", args: [{ name: "substring" }, { name: "bits" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SUBSTRING", args: [{ name: "bits" }, { name: "start" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SUBSTRING", args: [{ name: "bits" }, { name: "start" }, { name: "count" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Data Type Formatting Functions ====================
    
    // TO_CHAR - Type to String Formatting
    { name: "TO_char", args: [{ name: "timestamp" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "to_char", args: [{ name: "timestamp" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_CHAR", args: [{ name: "timestamp" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_CHAR", args: [{ name: "interval" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_CHAR", args: [{ name: "interval" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_CHAR", args: [{ name: "numeric" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_CHAR", args: [{ name: "numeric" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    
    // TO_DATE - String to Date Formatting
    { name: "TO_DATE", args: [{ name: "string" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "to_date", args: [{ name: "string" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    
    // TO_NUMBER - String to Numeric Formatting
    { name: "TO_NUMBER", args: [{ name: "string" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "to_number", args: [{ name: "string" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    
    // TO_TIMESTAMP - String to Timestamp Formatting
    { name: "TO_TIMESTAMP", args: [{ name: "string" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "to_timestamp", args: [{ name: "string" }, { name: "format" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Date/Time Functions ====================
    
    // Age Functions
    { name: "AGE", args: [{ name: "timestamp1" }, { name: "timestamp2" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "age", args: [{ name: "timestamp" }], format: "COERCE_EXPLICIT_CALL" },
    
    // Current Date/Time Functions
    { name: "CLOCK_TIMESTAMP", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "CURRENT_DATE", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "CURRENT_TIME", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "CURRENT_TIME", args: [{ name: "precision" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CURRENT_TIMESTAMP", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "CURRENT_TIMESTAMP", args: [{ name: "precision" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LOCALTIME", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "LOCALTIME", args: [{ name: "precision" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LOCALTIMESTAMP", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "LOCALTIMESTAMP", args: [{ name: "precision" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "NOW", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "now", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "STATEMENT_TIMESTAMP", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "statement_timestamp", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "TIMEOFDAY", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "timeofday", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "TRANSACTION_TIMESTAMP", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "transaction_timestamp", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_TIMESTAMP", args: [{ name: "double" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "to_timestamp", args: [{ name: "double" }], format: "COERCE_EXPLICIT_CALL" },
    
    // Date Arithmetic Functions
    { name: "DATE_ADD", args: [{ name: "timestamp" }, { name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DATE_ADD", args: [{ name: "timestamp" }, { name: "interval" }, { name: "timezone" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "date_add", args: [{ name: "timestamp" }, { name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "date_add", args: [{ name: "timestamp" }, { name: "interval" }, { name: "timezone" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DATE_BIN", args: [{ name: "interval" }, { name: "source" }, { name: "origin" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "date_bin", args: [{ name: "interval" }, { name: "source" }, { name: "origin" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DATE_PART", args: [{ name: "field" }, { name: "source" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "date_part", args: [{ name: "field" }, { name: "source" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DATE_SUBTRACT", args: [{ name: "timestamp" }, { name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DATE_SUBTRACT", args: [{ name: "timestamp" }, { name: "interval" }, { name: "timezone" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "date_subtract", args: [{ name: "timestamp" }, { name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "date_subtract", args: [{ name: "timestamp" }, { name: "interval" }, { name: "timezone" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DATE_TRUNC", args: [{ name: "field" }, { name: "source" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DATE_TRUNC", args: [{ name: "field" }, { name: "source" }, { name: "timezone" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "date_trunc", args: [{ name: "field" }, { name: "source" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "date_trunc", args: [{ name: "field" }, { name: "source" }, { name: "timezone" }], format: "COERCE_EXPLICIT_CALL" },
    
    // EXTRACT Function
    { name: "EXTRACT", args: [{ name: "field" }, { name: "from" }, { name: "source" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "extract", args: [{ name: "field" }, { name: "from" }, { name: "source" }], format: "COERCE_EXPLICIT_CALL" },
    
    // Finite Test Functions
    { name: "ISFINITE", args: [{ name: "date" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "isfinite", args: [{ name: "date" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ISFINITE", args: [{ name: "timestamp" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "isfinite", args: [{ name: "timestamp" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ISFINITE", args: [{ name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "isfinite", args: [{ name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    
    // Interval Adjustment Functions
    { name: "JUSTIFY_DAYS", args: [{ name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "JUSTIFY_DAYS", args: [{ name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "JUSTIFY_HOURS", args: [{ name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "JUSTIFY_HOURS", args: [{ name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "JUSTIFY_INTERVAL", args: [{ name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "JUSTIFY_INTERVAL", args: [{ name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    
    // Date/Time Construction Functions
    { name: "MAKE_DATE", args: [{ name: "year" }, { name: "month" }, { name: "day" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_DATE", args: [{ name: "year" }, { name: "month" }, { name: "day" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }, { name: "weeks" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }, { name: "weeks" }, { name: "days" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }, { name: "weeks" }, { name: "days" }, { name: "hours" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }, { name: "weeks" }, { name: "days" }, { name: "hours" }, { name: "mins" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }, { name: "weeks" }, { name: "days" }, { name: "hours" }, { name: "mins" }, { name: "secs" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }, { name: "weeks" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }, { name: "weeks" }, { name: "days" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }, { name: "weeks" }, { name: "days" }, { name: "hours" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }, { name: "weeks" }, { name: "days" }, { name: "hours" }, { name: "mins" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_INTERVAL", args: [{ name: "years" }, { name: "months" }, { name: "weeks" }, { name: "days" }, { name: "hours" }, { name: "mins" }, { name: "secs" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_TIME", args: [{ name: "hour" }, { name: "min" }, { name: "sec" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "make_time", args: [{ name: "hour" }, { name: "min" }, { name: "sec" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_TIMESTAMP", args: [{ name: "year" }, { name: "month" }, { name: "day" }, { name: "hour" }, { name: "min" }, { name: "sec" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "make_timestamp", args: [{ name: "year" }, { name: "month" }, { name: "day" }, { name: "hour" }, { name: "min" }, { name: "sec" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_TIMESTAMPTZ", args: [{ name: "year" }, { name: "month" }, { name: "day" }, { name: "hour" }, { name: "min" }, { name: "sec" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MAKE_TIMESTAMPTZ", args: [{ name: "year" }, { name: "month" }, { name: "day" }, { name: "hour" }, { name: "min" }, { name: "sec" }, { name: "timezone" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "make_timestamptz", args: [{ name: "year" }, { name: "month" }, { name: "day" }, { name: "hour" }, { name: "min" }, { name: "sec" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "make_timestamptz", args: [{ name: "year" }, { name: "month" }, { name: "day" }, { name: "hour" }, { name: "min" }, { name: "sec" }, { name: "timezone" }], format: "COERCE_EXPLICIT_CALL" },

    // Delaying Execution Functions
    { name: "PG_SLEEP", args: [{ name: "seconds" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PG_SLEEP_FOR", args: [{ name: "interval" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PG_SLEEP_UNTIL", args: [{ name: "timestamp" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Enum Functions ====================
    { name: "ENUM_FIRST", args: [{ name: "enum" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ENUM_LAST", args: [{ name: "enum" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ENUM_RANGE", args: [{ name: "enum" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ENUM_RANGE", args: [{ name: "start" }, { name: "end" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Geometric Functions ====================
    // Geometric Functions (Table 9.37)
    { name: "AREA", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CENTER", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DIAGONAL", args: [{ name: "box" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DIAMETER", args: [{ name: "circle" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "HEIGHT", args: [{ name: "box" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ISCLOSED", args: [{ name: "path" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ISOPEN", args: [{ name: "path" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "NPOINTS", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PCLOSE", args: [{ name: "path" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "POPEN", args: [{ name: "path" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "RADIUS", args: [{ name: "circle" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SLOPE", args: [{ name: "p1" }, { name: "p2" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "WIDTH", args: [{ name: "box" }], format: "COERCE_EXPLICIT_CALL" },

    // Geometric Type Conversion Functions (Table 9.38)
    { name: "BOX", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "BOX", args: [{ name: "v1" }, { name: "v2" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "BOUND_BOX", args: [{ name: "b1" }, { name: "b2" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CIRCLE", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CIRCLE", args: [{ name: "v1" }, { name: "v2" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LINE", args: [{ name: "p1" }, { name: "p2" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LSEG", args: [{ name: "v1" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "LSEG", args: [{ name: "v1" }, { name: "v2" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PATH", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "POINT", args: [{ name: "x" }, { name: "y" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "POLYGON", args: [{ name: "value" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "POLYGON", args: [{ name: "count" }, { name: "circle" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Network Address Functions ====================
    // IP Address Functions (Table 9.40)
    { name: "ABBREV", args: [{ name: "inet" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "ABBREV", args: [{ name: "cidr" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "BROADCAST", args: [{ name: "inet" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "FAMILY", args: [{ name: "inet" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "HOST", args: [{ name: "inet" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "HOSTMASK", args: [{ name: "inet" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "INET_MERGE", args: [{ name: "inet1" }, { name: "inet2" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "INET_SAME_FAMILY", args: [{ name: "inet1" }, { name: "inet2" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MASKLEN", args: [{ name: "inet" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "NETMASK", args: [{ name: "inet" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "NETWORK", args: [{ name: "inet" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SET_MASKLEN", args: [{ name: "inet" }, { name: "length" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SET_MASKLEN", args: [{ name: "cidr" }, { name: "length" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TEXT", args: [{ name: "inet" }], format: "COERCE_EXPLICIT_CAST" },

    // MAC Address Functions (Table 9.41)
    { name: "TRUNC", args: [{ name: "macaddr" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TRUNC", args: [{ name: "macaddr8" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "MACADDR8_SET7BIT", args: [{ name: "macaddr8" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Text Search Functions ====================
    // Vector/Query Conversion
    { name: "ARRAY_TO_TSVECTOR", args: [{ name: "array" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "GET_CURRENT_TS_CONFIG", args: [], format: "COERCE_EXPLICIT_CALL" },

    // Vector Length
    { name: "LENGTH", args: [{ name: "tsvector" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_TSVECTOR", args: [{ name: "config" }, { name: "document" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_TSVECTOR", args: [{ name: "document" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_TSQUERY", args: [{ name: "config" }, { name: "query" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TO_TSQUERY", args: [{ name: "query" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PLAINTO_TSQUERY", args: [{ name: "config" }, { name: "query" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PLAINTO_TSQUERY", args: [{ name: "query" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PHRASETO_TSQUERY", args: [{ name: "config" }, { name: "query" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "PHRASETO_TSQUERY", args: [{ name: "query" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "WEBSEARCH_TO_TSQUERY", args: [{ name: "config" }, { name: "query" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "WEBSEARCH_TO_TSQUERY", args: [{ name: "query" }], format: "COERCE_EXPLICIT_CALL" },

    // Vector Manipulation
    { name: "SETWEIGHT", args: [{ name: "vector" }, { name: "weight" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SETWEIGHT", args: [{ name: "vector" }, { name: "weight" }, { name: "lexemes" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "STRIP", args: [{ name: "tsvector" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_DELETE", args: [{ name: "vector" }, { name: "lexeme" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_DELETE", args: [{ name: "vector" }, { name: "lexemes" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_FILTER", args: [{ name: "vector" }, { name: "weights" }], format: "COERCE_EXPLICIT_CALL" },

    // Search & Ranking
    { name: "TS_HEADLINE", args: [{ name: "config" }, { name: "document" }, { name: "query" }, { name: "options" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_HEADLINE", args: [{ name: "document" }, { name: "query" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_RANK", args: [{ name: "weights" }, { name: "vector" }, { name: "query" }, { name: "normalization" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_RANK", args: [{ name: "vector" }, { name: "query" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_RANK_CD", args: [{ name: "weights" }, { name: "vector" }, { name: "query" }, { name: "normalization" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_RANK_CD", args: [{ name: "vector" }, { name: "query" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_REWRITE", args: [{ name: "query" }, { name: "target" }, { name: "substitute" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_REWRITE", args: [{ name: "query" }, { name: "select" }], format: "COERCE_EXPLICIT_CALL" },

    // Query Analysis
    { name: "QUERYTREE", args: [{ name: "tsquery" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "NUMNODE", args: [{ name: "tsquery" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TSQUERY_PHRASE", args: [{ name: "query1" }, { name: "query2" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TSQUERY_PHRASE", args: [{ name: "query1" }, { name: "query2" }, { name: "distance" }], format: "COERCE_EXPLICIT_CALL" },

    // JSON Integration
    { name: "JSON_TO_TSVECTOR", args: [{ name: "config" }, { name: "document" }, { name: "filter" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "JSON_TO_TSVECTOR", args: [{ name: "document" }, { name: "filter" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "JSONB_TO_TSVECTOR", args: [{ name: "config" }, { name: "document" }, { name: "filter" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "JSONB_TO_TSVECTOR", args: [{ name: "document" }, { name: "filter" }], format: "COERCE_EXPLICIT_CALL" },

    // Other
    { name: "TSVECTOR_TO_ARRAY", args: [{ name: "tsvector" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== Text Search Debugging Functions ====================
    // Configuration Debugging
    { name: "TS_DEBUG", args: [{ name: "config" }, { name: "document" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_DEBUG", args: [{ name: "document" }], format: "COERCE_EXPLICIT_CALL" },

    // Lexeme Testing
    { name: "TS_LEXIZE", args: [{ name: "config" }, { name: "token" }], format: "COERCE_EXPLICIT_CALL" },

    // Parser Testing
    { name: "TS_PARSE", args: [{ name: "parser_name" }, { name: "document" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_PARSE", args: [{ name: "parser_oid" }, { name: "document" }], format: "COERCE_EXPLICIT_CALL" },

    // Token Type Information
    { name: "TS_TOKEN_TYPE", args: [{ name: "parser_name" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_TOKEN_TYPE", args: [{ name: "parser_oid" }], format: "COERCE_EXPLICIT_CALL" },

    // Statistics
    { name: "TS_STAT", args: [{ name: "sqlquery" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TS_STAT", args: [{ name: "sqlquery" }, { name: "weights" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== UUID Functions ====================
    { name: "GEN_RANDOM_UUID", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "UUIDV4", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "UUIDV7", args: [], format: "COERCE_EXPLICIT_CALL" },
    { name: "UUIDV7", args: [{ name: "shift" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "UUID_EXTRACT_TIMESTAMP", args: [{ name: "uuid" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "UUID_EXTRACT_VERSION", args: [{ name: "uuid" }], format: "COERCE_EXPLICIT_CALL" },

    // ==================== XML Functions ====================
    // XML Parsing and Serialization
    { name: "XMLPARSE", args: [{ name: "document" }, { name: "text" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XMLPARSE", args: [{ name: "content" }, { name: "text" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XMLSERIALIZE", args: [{ name: "xml" }, { name: "type" }], format: "COERCE_EXPLICIT_CALL" },

    // XML Content Creation
    { name: "XMLTEXT", args: [{ name: "text" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XMLCOMMENT", args: [{ name: "text" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XMLCONCAT", args: [{ name: "xml", variadic: true }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XMLELEMENT", args: [{ name: "name" }, { name: "attributes" }, { name: "content", variadic: true }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XMLATTRIBUTES", args: [{ name: "value", variadic: true }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XMLFOREST", args: [{ name: "content", variadic: true }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XMLPI", args: [{ name: "name" }, { name: "content" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XMLROOT", args: [{ name: "xml" }, { name: "version" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XMLROOT", args: [{ name: "xml" }, { name: "version" }, { name: "standalone" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XMLAGG", args: [{ name: "xml" }], format: "COERCE_EXPLICIT_CALL" },

    // XML Predicates
    { name: "XMLEXISTS", args: [{ name: "xpath" }, { name: "xml" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XML_IS_WELL_FORMED", args: [{ name: "text" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XML_IS_WELL_FORMED_DOCUMENT", args: [{ name: "text" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XML_IS_WELL_FORMED_CONTENT", args: [{ name: "text" }], format: "COERCE_EXPLICIT_CALL" },

    // XML Processing
    { name: "XPATH", args: [{ name: "xpath" }, { name: "xml" }, { name: "nsarray" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XPATH", args: [{ name: "xpath" }, { name: "xml" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XPATH_EXISTS", args: [{ name: "xpath" }, { name: "xml" }, { name: "nsarray" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "XPATH_EXISTS", args: [{ name: "xpath" }, { name: "xml" }], format: "COERCE_EXPLICIT_CALL" },

    // XML Mapping Functions
    { name: "TABLE_TO_XML", args: [{ name: "table" }, { name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "QUERY_TO_XML", args: [{ name: "query" }, { name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CURSOR_TO_XML", args: [{ name: "cursor" }, { name: "count" }, { name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TABLE_TO_XMLSCHEMA", args: [{ name: "table" }, { name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "QUERY_TO_XMLSCHEMA", args: [{ name: "query" }, { name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "CURSOR_TO_XMLSCHEMA", args: [{ name: "cursor" }, { name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "TABLE_TO_XML_AND_XMLSCHEMA", args: [{ name: "table" }, { name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "QUERY_TO_XML_AND_XMLSCHEMA", args: [{ name: "query" }, { name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SCHEMA_TO_XML", args: [{ name: "schema" }, { name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SCHEMA_TO_XMLSCHEMA", args: [{ name: "schema" }, { name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "SCHEMA_TO_XML_AND_XMLSCHEMA", args: [{ name: "schema" }, { name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DATABASE_TO_XML", args: [{ name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DATABASE_TO_XMLSCHEMA", args: [{ name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
    { name: "DATABASE_TO_XML_AND_XMLSCHEMA", args: [{ name: "nulls" }, { name: "tableforest" }, { name: "targetns" }], format: "COERCE_EXPLICIT_CALL" },
]
export default pgFunctionList
