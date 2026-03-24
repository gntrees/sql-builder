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
export function normalizeSql(sql) {
    let normalized = sql;
    normalized = normalized.trim();
    // Normalize optional AS keywords in table aliases (FROM table AS alias -> FROM table alias)
    // normalized = normalized.replace(/\sAS\s+/gi, " ");
    normalized = normalized.replace(/\s+/g, " ");
    // const words = normalized.split(/(\s+|[(),])/);
    // // normalized = words.map(word => {
    //     const upperWord = word.toUpperCase();
    //     if (SQL_KEYWORDS.has(upperWord) || /^[A-Z_]+$/.test(upperWord)) {
    //         return upperWord;
    //     }
    //     return word;
    // }).join("");
    // normalized = normalized.replace(/\(\s*/g, "(").replace(/\s*\)/g, ")");
    // normalized = normalized.replace(/\s*,\s*/g, ",");
    return normalized;
}
/**
 * Normalizes a ParseResult by adding location_start, location_end, and sql attributes to each node.
 * Uses a checkpoint system that first collects all locations from the AST, then uses them
 * to accurately determine end positions for each node.
 *
 * @param parseResult - The ParseResult to normalize
 * @param sql - The original SQL string
 * @returns ParseResult with location_start, location_end, and sql added to each node
 */
export function normalizeLocationsNode(parseResult, sql) {
    if (!parseResult.stmts || parseResult.stmts.length === 0) {
        return parseResult;
    }
    // First pass: Collect all locations (checkpoints) from the entire AST
    const checkpoints = collectAllLocations(parseResult);
    const processedStmts = parseResult.stmts.map((rawStmt) => {
        const stmtLocation = rawStmt.stmt_location ?? 0;
        const stmtLen = rawStmt.stmt_len ?? 0;
        const stmtEnd = stmtLocation + stmtLen;
        const processedStmt = processNode(rawStmt.stmt, stmtLocation, stmtEnd, sql, checkpoints);
        return {
            ...rawStmt,
            stmt: processedStmt,
            location_start: stmtLocation,
            location_end: stmtEnd,
            sql: sql.substring(stmtLocation, stmtEnd),
        };
    });
    return {
        ...parseResult,
        stmts: processedStmts,
    };
}
/**
 * Collects all location values from the entire AST into a sorted set.
 * These serve as "checkpoints" for determining accurate end positions.
 */
function collectAllLocations(parseResult) {
    const locations = new Set();
    function traverse(node) {
        if (!node || typeof node !== "object") {
            return;
        }
        if (Array.isArray(node)) {
            node.forEach(traverse);
            return;
        }
        const nodeKey = Object.keys(node)[0];
        if (!nodeKey) {
            return;
        }
        const nodeValue = node[nodeKey];
        if (!nodeValue || typeof nodeValue !== "object") {
            return;
        }
        // Collect location and stmt_location
        if (typeof nodeValue.location === "number" && nodeValue.location >= 0) {
            locations.add(nodeValue.location);
        }
        if (typeof nodeValue.stmt_location === "number" && nodeValue.stmt_location >= 0) {
            locations.add(nodeValue.stmt_location);
        }
        // Recursively traverse all properties
        for (const key of Object.keys(nodeValue)) {
            if (key !== "location" && key !== "stmt_location") {
                traverse(nodeValue[key]);
            }
        }
    }
    // Add statement boundaries from RawStmt nodes
    parseResult.stmts?.forEach((rawStmt) => {
        if (typeof rawStmt.stmt_location === "number" && rawStmt.stmt_location >= 0) {
            locations.add(rawStmt.stmt_location);
        }
        const stmtLen = rawStmt.stmt_len ?? 0;
        const stmtLocation = rawStmt.stmt_location ?? 0;
        locations.add(stmtLocation + stmtLen); // Add end of statement
        traverse(rawStmt.stmt);
    });
    return locations;
}
/**
 * Finds the next checkpoint location after a given position.
 * Returns the fallback if no checkpoint is found.
 */
function findNextCheckpoint(position, checkpoints, fallback) {
    let nextCheckpoint = fallback;
    for (const checkpoint of checkpoints) {
        if (checkpoint > position && checkpoint < nextCheckpoint) {
            nextCheckpoint = checkpoint;
        }
    }
    return nextCheckpoint;
}
/**
 * Recursively processes a node, adding location_start, location_end, and sql.
 * Uses checkpoints to determine accurate end positions.
 * For location_start: uses node's location attribute if available, otherwise uses parent's location_start.
 */
function processNode(node, parentLocationStart, parentEnd, sql, checkpoints) {
    if (!node || typeof node !== "object") {
        return node;
    }
    // Handle arrays
    if (Array.isArray(node)) {
        return node.map((item, index) => {
            const nextItem = node[index + 1];
            // For each item: use its own location, or parent's location_start as fallback
            const itemStart = getNodeStart(item, parentLocationStart);
            const itemEnd = nextItem
                ? getNodeStart(nextItem, parentLocationStart)
                : parentEnd;
            return processNode(item, itemStart, itemEnd, sql, checkpoints);
        });
    }
    // Get the actual node value from discriminated union
    const nodeKey = Object.keys(node)[0];
    if (!nodeKey) {
        return node;
    }
    const nodeValue = node[nodeKey];
    if (!nodeValue || typeof nodeValue !== "object") {
        return node;
    }
    console.log("Parent location_start:", parentLocationStart, "Parent end:", parentEnd, "Node key:", nodeKey);
    // Calculate location_start: use node's location if available, otherwise use parent's location_start
    const nodeStart = getNodeStart(node, parentLocationStart);
    const nodeEnd = calculateNodeEnd(node, nodeValue, nodeStart, parentEnd, checkpoints);
    // Extract SQL substring for this node
    const nodeSql = sql.substring(nodeStart, nodeEnd);
    // Process children recursively - pass parent's location_start as fallback
    const processedChildren = processChildren(nodeValue, nodeStart, nodeEnd, sql, checkpoints);
    // Add location_start, location_end, and sql to the node
    const result = {
        ...processedChildren,
        location_start: nodeStart,
        location_end: nodeEnd,
        sql: nodeSql,
    };
    return { [nodeKey]: result };
}
/**
 * Gets the start location of a node from its location or stmt_location property.
 */
function getNodeStart(node, fallback) {
    if (!node || typeof node !== "object") {
        return fallback;
    }
    const nodeKey = Object.keys(node)[0];
    if (!nodeKey) {
        return fallback;
    }
    const nodeValue = node[nodeKey];
    if (nodeValue && typeof nodeValue === "object") {
        if (typeof nodeValue.location === "number" && nodeValue.location >= 0) {
            return nodeValue.location;
        }
        if (typeof nodeValue.stmt_location === "number" && nodeValue.stmt_location >= 0) {
            return nodeValue.stmt_location;
        }
    }
    return fallback;
}
/**
 * Calculates the end position of a node using the checkpoint system.
 * For Stmt nodes: priority is 1. stmt location + length, 2. parent end, 3. next checkpoint.
 * For non-Stmt nodes: priority is 1. next checkpoint, 2. parent end.
 */
function calculateNodeEnd(node, nodeValue, nodeStart, parentEnd, checkpoints) {
    const nodeKey = Object.keys(node)[0] ?? "";
    const isStmt = nodeKey.includes("Stmt");
    if (isStmt) {
        // // Priority for Stmt nodes: 1. stmt location + length, 2. parent end, 3. next checkpoint
        // const stmtLocation = typeof nodeValue.stmt_location === "number" ? nodeValue.stmt_location : nodeStart;
        // const stmtLen = typeof nodeValue.stmt_len === "number" ? nodeValue.stmt_len : 0;
        // const stmtEnd = stmtLocation + stmtLen;
        // console.log("key:", nodeKey, "stmtLocation:", stmtLocation, "stmtLen:", stmtLen, "stmtEnd:", stmtEnd, "parentEnd:", parentEnd);
        // if (stmtEnd > nodeStart) {
        //     return stmtEnd;
        // }
        // if (parentEnd > nodeStart) {
        //     return parentEnd;
        // }
        if (nodeValue.stmt_location !== undefined && nodeValue.stmt_len !== undefined) {
            const stmtLocation = nodeValue.stmt_location;
            const stmtLen = nodeValue.stmt_len;
            const stmtEnd = stmtLocation + stmtLen;
            if (stmtEnd > nodeStart) {
                return stmtEnd;
            }
        }
        else if (parentEnd > nodeStart) {
            return parentEnd;
        }
        return findNextCheckpoint(nodeStart, checkpoints, parentEnd);
    }
    // Priority for non-Stmt nodes: 1. next checkpoint, 2. parent end
    const nextCheckpoint = findNextCheckpoint(nodeStart, checkpoints, parentEnd);
    if (nextCheckpoint > nodeStart) {
        return nextCheckpoint;
    }
    return parentEnd;
}
/**
 * Processes all children of a node recursively using checkpoints.
 * For each child: uses child's own location if available, otherwise uses parent's location_start.
 */
function processChildren(nodeValue, parentLocationStart, parentEnd, sql, checkpoints) {
    const result = {};
    for (const key of Object.keys(nodeValue)) {
        const value = nodeValue[key];
        if (key === "location" || key === "location_start" || key === "location_end" || key === "sql") {
            result[key] = value;
        }
        else if (Array.isArray(value)) {
            result[key] = value.map((item, index) => {
                const nextItem = value[index + 1];
                // For each item: use its own location, or parent's location_start as fallback
                const itemStart = getNodeStart(item, parentLocationStart);
                const itemEnd = nextItem
                    ? getNodeStart(nextItem, parentLocationStart)
                    : findNextCheckpoint(itemStart, checkpoints, parentEnd);
                return processNode(item, itemStart, itemEnd, sql, checkpoints);
            });
        }
        else if (value && typeof value === "object") {
            // For child object: use its own location, or parent's location_start as fallback
            const childStart = getNodeStart({ [key]: value }, parentLocationStart);
            const childEnd = findNextCheckpoint(childStart, checkpoints, parentEnd);
            result[key] = processNode({ [key]: value }, childStart, childEnd, sql, checkpoints)[key];
        }
        else {
            result[key] = value;
        }
    }
    return result;
}
