const SQL_KEYWORDS = new Set([
    "SELECT", "FROM", "WHERE", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "OUTER",
    "ON", "AND", "OR", "NOT", "IN", "AS", "ORDER", "BY", "GROUP", "HAVING",
    "LIMIT", "OFFSET", "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE",
    "CREATE", "TABLE", "DROP", "ALTER", "INDEX", "UNION", "INTERSECT", "EXCEPT",
    "CASE", "WHEN", "THEN", "ELSE", "END", "EXISTS", "BETWEEN", "LIKE", "IS",
    "NULL", "DISTINCT", "ALL", "ANY", "SOME", "ASC", "DESC", "WITH", "RECURSIVE",
    "CROSS", "NATURAL", "USING", "PRIMARY", "KEY", "REFERENCES", "FOREIGN",
    "CONSTRAINT", "UNIQUE", "CHECK", "DEFAULT", "CASCADE", "RESTRICT", "NO",
    "ACTION", "RETURNING", "OVER", "PARTITION", "ROWS", "RANGE", "UNBOUNDED",
    "PRECEDING", "FOLLOWING", "CURRENT", "ROW", "FILTER", "WITHIN", "GROUP",
    "EXCLUDE", "NO", "OTHERS", "TIES", "NULLS", "FIRST", "LAST", "FOR", "UPDATE",
    "SHARE", "NOWAIT", "SKIP", "LOCKED", "OF", "TO", "GRANT", "REVOKE", "ROLE",
    "SCHEMA", "PUBLIC", "TEMPORARY", "TEMP", "LOCAL", "GLOBAL", "SESSION",
    "TRANSACTION", "BEGIN", "COMMIT", "ROLLBACK", "SAVEPOINT", "RELEASE",
    "IF", "EXISTS", "COLLATE", "COLUMN", "EXTRACT", "POSITION", "SUBSTRING",
    "TRIM", "LEADING", "TRAILING", "BOTH", "CAST", "ARRAY", "ROW", "REPLACE",
    "REGEXP", "RLIKE", "SIMILAR", "TRUE", "FALSE", "UNKNOWN", "COALESCE",
    "NULLIF", "GREATEST", "LEAST", "INTERVAL", "TIME", "DATE", "TIMESTAMP",
    "ZONE", "HOUR", "MINUTE", "SECOND", "YEAR", "MONTH", "DAY", "WEEK",
    "QUARTER", "DECADE", "CENTURY", "MILLENNIUM", "EPOCH", "AGE", "ISFINITE",
    "ISNULL", "NOTNULL", "CURRENT_DATE", "CURRENT_TIME", "CURRENT_TIMESTAMP",
]);

export function normalizeSql(sql: string): string {
    let normalized = sql;

    normalized = normalized.trim();

    // Normalize optional AS keywords in table aliases (FROM table AS alias -> FROM table alias)
    normalized = normalized.replace(/\sAS\s+/gi, " ");

    normalized = normalized.replace(/\s+/g, " ");

    const words = normalized.split(/(\s+|[(),])/);
    normalized = words.map(word => {
        const upperWord = word.toUpperCase();
        if (SQL_KEYWORDS.has(upperWord) || /^[A-Z_]+$/.test(upperWord)) {
            return upperWord;
        }
        return word;
    }).join("");

    normalized = normalized.replace(/\(\s*/g, "(").replace(/\s*\)/g, ")");
    normalized = normalized.replace(/\s*,\s*/g, ",");

    return normalized;
}
